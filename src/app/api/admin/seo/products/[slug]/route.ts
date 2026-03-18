import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      select: {
        id: true, name: true, slug: true,
        metaTitle: true, metaDescription: true, metaKeywords: true,
        ogTitle: true, ogDescription: true, ogImage: true,
        robotsIndex: true, robotsFollow: true,
        images: { select: { url: true }, take: 1, orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!product) return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Product SEO GET error:', error);
    return NextResponse.json({ success: false, message: 'Error loading product SEO' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const {
      metaTitle, metaDescription, metaKeywords,
      ogTitle, ogDescription, ogImage,
      robotsIndex, robotsFollow,
    } = body;

    const product = await prisma.product.update({
      where: { slug: params.slug },
      data: {
        metaTitle:       metaTitle       ?? null,
        metaDescription: metaDescription ?? null,
        metaKeywords:    metaKeywords    ?? null,
        ogTitle:         ogTitle         ?? null,
        ogDescription:   ogDescription   ?? null,
        ogImage:         ogImage         ?? null,
        robotsIndex:     robotsIndex     !== undefined ? Boolean(robotsIndex)  : true,
        robotsFollow:    robotsFollow    !== undefined ? Boolean(robotsFollow) : true,
      },
      select: {
        id: true, name: true, slug: true,
        metaTitle: true, metaDescription: true, metaKeywords: true,
        ogTitle: true, ogDescription: true, ogImage: true,
        robotsIndex: true, robotsFollow: true,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Product SEO PUT error:', error);
    return NextResponse.json({ success: false, message: 'Error saving product SEO' }, { status: 500 });
  }
}
