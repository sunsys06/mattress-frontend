import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SEO_KEYS = [
  'seo_site_name',
  'seo_tagline',
  'seo_title_template',
  'seo_default_description',
  'seo_default_keywords',
  'seo_og_image',
  'seo_canonical_url',
  'seo_google_analytics_id',
  'seo_google_site_verification',
  'seo_robots_txt',
  'social_facebook',
  'social_instagram',
  'social_twitter',
  'social_youtube',
  'social_whatsapp',
];

export async function GET() {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: SEO_KEYS } } });
    const data: Record<string, string> = {};
    for (const key of SEO_KEYS) {
      data[key] = rows.find(r => r.key === key)?.value ?? '';
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('SEO GET error:', error);
    return NextResponse.json({ success: false, message: 'Error loading SEO settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Record<string, string> = await req.json();

    await Promise.all(
      SEO_KEYS.map(key =>
        prisma.setting.upsert({
          where:  { key },
          update: { value: body[key] ?? '', type: 'string' },
          create: { key, value: body[key] ?? '', type: 'string' },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SEO POST error:', error);
    return NextResponse.json({ success: false, message: 'Error saving SEO settings' }, { status: 500 });
  }
}
