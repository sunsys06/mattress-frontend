import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { code, orderTotal } = await req.json();

    if (!code) return NextResponse.json({ success: false, message: 'Coupon code is required' }, { status: 400 });

    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase().trim() } });

    if (!coupon)        return NextResponse.json({ success: false, message: 'Invalid coupon code' }, { status: 404 });
    if (!coupon.isActive) return NextResponse.json({ success: false, message: 'This coupon is no longer active' }, { status: 400 });

    const now = new Date();
    if (now < coupon.validFrom)  return NextResponse.json({ success: false, message: 'Coupon is not yet valid' }, { status: 400 });
    if (now > coupon.validUntil) return NextResponse.json({ success: false, message: 'Coupon has expired' }, { status: 400 });

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit)
      return NextResponse.json({ success: false, message: 'Coupon usage limit reached' }, { status: 400 });

    if (coupon.minOrderValue && Number(orderTotal) < Number(coupon.minOrderValue))
      return NextResponse.json({ success: false, message: `Minimum order value ₹${Number(coupon.minOrderValue).toLocaleString('en-IN')} required` }, { status: 400 });

    // Per-user: each user can use a coupon only once
    const authHeader = req.headers.get('Authorization');
    const tokenStr   = authHeader?.replace('Bearer ', '');
    const tokenData  = tokenStr ? verifyToken(tokenStr) : null;
    if (tokenData?.sub) {
      const alreadyUsed = await prisma.couponUsage.findUnique({
        where: { couponCode_userId: { couponCode: coupon.code, userId: tokenData.sub } },
      });
      if (alreadyUsed)
        return NextResponse.json({ success: false, message: 'You have already used this coupon' }, { status: 400 });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = Math.round((Number(orderTotal) * Number(coupon.value)) / 100);
      if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
    } else {
      discount = Math.min(Number(coupon.value), Number(orderTotal));
    }

    return NextResponse.json({
      success: true,
      data: {
        code:        coupon.code,
        type:        coupon.type,
        value:       Number(coupon.value),
        discount,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ success: false, message: 'Error validating coupon' }, { status: 500 });
  }
}
