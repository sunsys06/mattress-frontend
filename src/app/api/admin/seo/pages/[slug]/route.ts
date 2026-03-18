import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const page = await prisma.pageSeo.findUnique({ where: { pageSlug: params.slug } });
    if (!page) return NextResponse.json({ success: false, message: 'Page not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error('Page SEO GET error:', error);
    return NextResponse.json({ success: false, message: 'Error loading page SEO' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const {
      title, description, keywords,
      ogTitle, ogDescription, ogImage,
      robotsIndex, robotsFollow, canonicalUrl,
    } = body;

    const page = await prisma.pageSeo.upsert({
      where:  { pageSlug: params.slug },
      update: {
        title:        title        ?? null,
        description:  description  ?? null,
        keywords:     keywords     ?? null,
        ogTitle:      ogTitle      ?? null,
        ogDescription: ogDescription ?? null,
        ogImage:      ogImage      ?? null,
        robotsIndex:  robotsIndex  !== undefined ? Boolean(robotsIndex)  : true,
        robotsFollow: robotsFollow !== undefined ? Boolean(robotsFollow) : true,
        canonicalUrl: canonicalUrl ?? null,
      },
      create: {
        pageSlug:  params.slug,
        pageLabel: params.slug,
        title, description, keywords,
        ogTitle, ogDescription, ogImage,
        robotsIndex:  robotsIndex  !== undefined ? Boolean(robotsIndex)  : true,
        robotsFollow: robotsFollow !== undefined ? Boolean(robotsFollow) : true,
        canonicalUrl,
      },
    });

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error('Page SEO PUT error:', error);
    return NextResponse.json({ success: false, message: 'Error saving page SEO' }, { status: 500 });
  }
}
