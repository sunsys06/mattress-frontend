import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const [product, globalRows] = await Promise.all([
      prisma.product.findUnique({
        where: { slug: params.slug },
        select: {
          name: true, metaTitle: true, metaDescription: true, metaKeywords: true,
          ogTitle: true, ogDescription: true, ogImage: true,
          robotsIndex: true, robotsFollow: true,
          images: { select: { url: true }, take: 1, orderBy: { sortOrder: 'asc' } },
        },
      }),
      prisma.setting.findMany({
        where: { key: { in: ['seo_site_name', 'seo_og_image', 'seo_canonical_url'] } },
      }),
    ]);

    if (!product) return { title: 'Product Not Found' };

    const g: Record<string, string> = {};
    for (const r of globalRows) g[r.key] = r.value;

    const siteName  = g.seo_site_name    || 'Mattress Factory';
    const globalOg  = g.seo_og_image     || '';
    const base      = g.seo_canonical_url || '';

    const title       = product.metaTitle       || product.name;
    const description = product.metaDescription || undefined;
    const keywords    = product.metaKeywords    || undefined;
    const ogTitle     = product.ogTitle         || title;
    const ogDesc      = product.ogDescription   || description;
    const ogImage     = product.ogImage || product.images[0]?.url || globalOg;
    const canonical   = base ? `${base.replace(/\/$/, '')}/products/${params.slug}` : undefined;
    const robotsIdx   = product.robotsIndex !== false;
    const robotsFol   = product.robotsFollow !== false;

    return {
      title,
      ...(description ? { description } : {}),
      ...(keywords    ? { keywords }    : {}),
      robots: {
        index:  robotsIdx,
        follow: robotsFol,
        googleBot: { index: robotsIdx, follow: robotsFol },
      },
      openGraph: {
        title:    ogTitle,
        siteName,
        type:     'website',
        ...(ogDesc  ? { description: ogDesc } : {}),
        ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
        ...(canonical ? { url: canonical } : {}),
      },
      twitter: {
        card:  'summary_large_image',
        title: ogTitle,
        ...(ogDesc  ? { description: ogDesc } : {}),
        ...(ogImage ? { images: [ogImage] }   : {}),
      },
      ...(canonical ? { alternates: { canonical } } : {}),
    };
  } catch {
    return { title: params.slug };
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
