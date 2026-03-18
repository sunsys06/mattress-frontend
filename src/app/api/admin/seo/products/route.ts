import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        metaTitle: true,
        images: { select: { url: true }, take: 1, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Product SEO list error:', error);
    return NextResponse.json({ success: false, message: 'Error loading products' }, { status: 500 });
  }
}
