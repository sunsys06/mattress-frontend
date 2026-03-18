import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CouponType } from '@prisma/client';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    console.error('Get coupons error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching coupons' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, description, type, value, minOrderValue, maxDiscount, usageLimit, validFrom, validUntil, isActive } = body;

    if (!code || !type || value === undefined || !validFrom || !validUntil)
      return NextResponse.json({ success: false, message: 'code, type, value, validFrom, validUntil are required' }, { status: 400 });

    const coupon = await prisma.coupon.create({
      data: {
        code:          code.toUpperCase().trim(),
        description:   description || null,
        type:          type as CouponType,
        value,
        minOrderValue: minOrderValue || null,
        maxDiscount:   maxDiscount   || null,
        usageLimit:    usageLimit    || null,
        validFrom:     new Date(validFrom),
        validUntil:    new Date(validUntil),
        isActive:      isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, data: coupon }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create coupon error:', error);
    const isUnique = (error as { code?: string }).code === 'P2002';
    return NextResponse.json({ success: false, message: isUnique ? 'Coupon code already exists' : 'Error creating coupon' }, { status: 500 });
  }
}
