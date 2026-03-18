import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive:   true,
        validFrom:  { lte: now },
        validUntil: { gte: now },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        code:          true,
        description:   true,
        type:          true,
        value:         true,
        minOrderValue: true,
      },
    });

    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    console.error('Active coupon error:', error);
    return NextResponse.json({ success: false, data: null });
  }
}
