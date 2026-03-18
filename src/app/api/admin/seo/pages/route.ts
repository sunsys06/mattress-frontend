import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Default pages seeded on first load
const DEFAULT_PAGES = [
  { pageSlug: 'home',     pageLabel: 'Home Page' },
  { pageSlug: 'about',    pageLabel: 'About Us' },
  { pageSlug: 'products', pageLabel: 'Products Listing' },
  { pageSlug: 'contact',  pageLabel: 'Contact Us' },
  { pageSlug: 'cart',     pageLabel: 'Cart Page' },
  { pageSlug: 'checkout', pageLabel: 'Checkout Page' },
];

export async function GET() {
  try {
    // Ensure all default pages exist
    await Promise.all(
      DEFAULT_PAGES.map(p =>
        prisma.pageSeo.upsert({
          where:  { pageSlug: p.pageSlug },
          update: {},
          create: p,
        })
      )
    );

    const pages = await prisma.pageSeo.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error('Page SEO GET error:', error);
    return NextResponse.json({ success: false, message: 'Error loading pages' }, { status: 500 });
  }
}
