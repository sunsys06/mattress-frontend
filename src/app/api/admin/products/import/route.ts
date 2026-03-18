import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { prisma } from '@/lib/prisma';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function parseDecimal(value: string): number | null {
  if (!value || value === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

function parseBool(value: string | number | boolean): boolean {
  return value === '1' || value === 1 || value === true;
}

function parseWcId(value: string): number | null {
  if (!value || value === '') return null;
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

function parseParentId(value: string): number | null {
  if (!value || value === '') return null;
  const match = value.match(/id:(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function parseList(value: string): string[] {
  if (!value || value === '') return [];
  return value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let csvContent = await file.text();
    // Remove BOM if present
    if (csvContent.charCodeAt(0) === 0xfeff) {
      csvContent = csvContent.slice(1);
    }

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
      bom: true,
    });

    // Resolve ID column name (may have BOM prefix)
    const firstRowKeys = records.length > 0 ? Object.keys(records[0] as object) : [];
    const idCol = firstRowKeys.find((k: string) => k.replace(/^\uFEFF/, '') === 'ID') || 'ID';

    const parentProducts: any[] = records.filter((r: any) => r['Type'] === 'variable' || r['Type'] === 'simple');
    const variations: any[] = records.filter((r: any) => r['Type'] === 'variation');

    // --- Step 1: Categories ---
    const allCategoryNames = new Set<string>();
    for (const row of parentProducts) {
      parseList(row['Categories']).forEach((c: string) => allCategoryNames.add(c));
    }

    const categoryMap: Record<string, string> = {}; // name -> id
    for (const name of allCategoryNames) {
      const slug = slugify(name);
      let cat = await prisma.category.findUnique({ where: { slug } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name, slug } });
      }
      categoryMap[name] = cat.id;
    }

    // --- Step 2: Products ---
    const productMap: Record<number, string> = {}; // wcId -> product.id
    let importedCount = 0;

    for (const row of parentProducts) {
      const wcId = parseWcId(row[idCol]);
      if (!wcId) continue;

      const name = row['Name'] || '';
      let slug = slugify(name);

      const existingSlug = await prisma.product.findUnique({ where: { slug } });
      if (existingSlug && existingSlug.wcId !== wcId) {
        slug = `${slug}-${wcId}`;
      }

      let product = await prisma.product.findUnique({ where: { wcId } });

      const productData: any = {
        wcId,
        name,
        slug,
        type: row['Type'] || 'variable',
        description: row['Description'] || null,
        shortDescription: row['Short description'] || null,
        isPublished: parseBool(row['Published']),
        isFeatured: parseBool(row['Is featured?']),
        visibility: row['Visibility in catalog'] || 'visible',
        taxStatus: row['Tax status'] || 'taxable',
        taxClass: row['Tax class'] || null,
        inStock: parseBool(row['In stock?']),
        stock: parseInt(row['Stock'] || '0', 10) || 0,
        allowReviews: parseBool(row['Allow customer reviews?']),
        sizeGroups: row['Attribute 1 value(s)'] || null,
        dimensions: row['Attribute 2 value(s)'] || null,
        firmness: row['Attribute 3 value(s)'] || null,
        metaTitle: row['Meta: rank_math_title'] || null,
        metaDescription: row['Meta: rank_math_description'] || null,
        metaKeywords: row['Meta: rank_math_focus_keyword'] || null,
        viewCount: parseInt(row['Meta: _eael_post_view_count'] || '0', 10) || 0,
      };

      if (product) {
        product = await prisma.product.update({ where: { wcId }, data: productData });
      } else {
        product = await prisma.product.create({ data: productData });
      }

      productMap[wcId] = product.id;
      importedCount++;

      // Link categories
      await prisma.productCategory.deleteMany({ where: { productId: product.id } });
      const categoryNames = parseList(row['Categories']);
      for (const catName of categoryNames) {
        const catId = categoryMap[catName];
        if (catId) {
          await prisma.productCategory.create({
            data: { productId: product.id, categoryId: catId },
          });
        }
      }

      // Import images
      const imageUrls = parseList(row['Images']);
      await prisma.productImage.deleteMany({ where: { productId: product.id } });
      for (let i = 0; i < imageUrls.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: imageUrls[i],
            altText: name,
            sortOrder: i,
            isPrimary: i === 0,
          },
        });
      }
    }

    // --- Step 3: Variants ---
    let variantCount = 0;
    for (const row of variations) {
      const wcId = parseWcId(row[idCol]);
      const parentWcId = parseParentId(row['Parent']);
      if (!parentWcId || !productMap[parentWcId]) continue;

      const productId = productMap[parentWcId];
      const regularPrice = parseDecimal(row['Regular price']);
      if (!regularPrice) continue;

      const variantData: any = {
        wcId,
        productId,
        parentWcId,
        sizeGroup: row['Attribute 1 value(s)'] || null,
        size: row['Attribute 2 value(s)'] || '',
        price: regularPrice,
        salePrice: parseDecimal(row['Sale price']),
        inStock: parseBool(row['In stock?']),
        stock: parseInt(row['Stock'] || '0', 10) || 0,
        sortOrder: parseInt(row['Position'] || '0', 10) || 0,
      };

      if (wcId) {
        const existing = await prisma.productVariant.findUnique({ where: { wcId } });
        if (existing) {
          await prisma.productVariant.update({ where: { wcId }, data: variantData });
        } else {
          await prisma.productVariant.create({ data: variantData });
        }
      } else {
        await prisma.productVariant.create({ data: variantData });
      }
      variantCount++;
    }

    return NextResponse.json({
      success: true,
      importedCount,
      variantCount,
      categoryCount: Object.keys(categoryMap).length,
    });
  } catch (error: any) {
    console.error('Error importing CSV:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import CSV' },
      { status: 500 }
    );
  }
}
