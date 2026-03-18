import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function getPageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  try {
    const [page, global] = await Promise.all([
      prisma.pageSeo.findUnique({ where: { pageSlug: slug } }),
      prisma.setting.findMany({
        where: { key: { in: ['seo_site_name', 'seo_title_template', 'seo_og_image', 'seo_canonical_url'] } },
      }),
    ]);

    const g: Record<string, string> = {};
    for (const r of global) g[r.key] = r.value;

    const siteName = g.seo_site_name  || 'Mattress Factory';
    const template = g.seo_title_template || `%s | ${siteName}`;
    const globalOg = g.seo_og_image   || '';
    const base     = g.seo_canonical_url || '';

    const title       = page?.title       || fallbackTitle;
    const description = page?.description || undefined;
    const keywords    = page?.keywords    || undefined;
    const ogTitle     = page?.ogTitle     || title;
    const ogDesc      = page?.ogDescription || description;
    const ogImage     = page?.ogImage     || globalOg;
    const canonical   = page?.canonicalUrl || (base ? `${base.replace(/\/$/, '')}/${slug === 'home' ? '' : slug}` : undefined);
    const robotsIdx   = page?.robotsIndex  !== false;
    const robotsFol   = page?.robotsFollow !== false;

    const metadata: Metadata = {
      title,
      ...(description ? { description } : {}),
      ...(keywords    ? { keywords }    : {}),
      robots: {
        index:  robotsIdx,
        follow: robotsFol,
        googleBot: { index: robotsIdx, follow: robotsFol },
      },
      openGraph: {
        title:       ogTitle,
        siteName,
        ...(ogDesc   ? { description: ogDesc } : {}),
        ...(ogImage  ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
        ...(canonical? { url: canonical } : {}),
      },
      twitter: {
        card:  'summary_large_image',
        title: ogTitle,
        ...(ogDesc  ? { description: ogDesc } : {}),
        ...(ogImage ? { images: [ogImage] }   : {}),
      },
      ...(canonical ? { alternates: { canonical } } : {}),
    };

    return metadata;
  } catch {
    return { title: fallbackTitle };
  }
}
