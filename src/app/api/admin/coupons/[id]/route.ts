import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CouponType } from '@prisma/client';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { code, description, type, value, minOrderValue, maxDiscount, usageLimit, validFrom, validUntil, isActive } = body;

    const coupon = await prisma.coupon.update({
      where: { id: params.id },
      data: {
        ...(code          !== undefined && { code: code.toUpperCase().trim() }),
        ...(description   !== undefined && { description }),
        ...(type          !== undefined && { type: type as CouponType }),
        ...(value         !== undefined && { value }),
        ...(minOrderValue !== undefined && { minOrderValue: minOrderValue || null }),
        ...(maxDiscount   !== undefined && { maxDiscount:   maxDiscount   || null }),
        ...(usageLimit    !== undefined && { usageLimit:    usageLimit    || null }),
        ...(validFrom     !== undefined && { validFrom:     new Date(validFrom) }),
        ...(validUntil    !== undefined && { validUntil:    new Date(validUntil) }),
        ...(isActive      !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ success: true, data: coupon });
  } catch (error) {
    console.error('Update coupon error:', error);
    return NextResponse.json({ success: false, message: 'Error updating coupon' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.coupon.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete coupon error:', error);
    return NextResponse.json({ success: false, message: 'Error deleting coupon' }, { status: 500 });
  }
}
