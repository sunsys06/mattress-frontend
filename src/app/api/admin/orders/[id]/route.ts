import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  sendOrderConfirmedEmail,
  sendOrderShippedEmail,
  sendOrderDeliveredEmail,
  sendOrderCancelledEmail,
} from '@/lib/email';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        payment: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Admin order detail error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching order' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status, adminNotes, trackingNumber } = body;

    // Fetch current order + customer details for email
    const existing = status
      ? await prisma.order.findUnique({
          where: { id: params.id },
          select: {
            orderNumber: true,
            trackingNumber: true,
            user: { select: { email: true, firstName: true, lastName: true } },
          },
        })
      : null;

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(trackingNumber !== undefined && { trackingNumber }),
        ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
        statusHistory: status
          ? { create: { status, notes: `Status changed to ${status}` } }
          : undefined,
      },
    });

    // Send status email (non-blocking)
    if (status && existing?.user) {
      const { email, firstName, lastName } = existing.user;
      const name = [firstName, lastName].filter(Boolean).join(' ') || email;
      const orderNumber = existing.orderNumber;
      const tracking = trackingNumber ?? existing.trackingNumber;

      if (status === 'CONFIRMED')  sendOrderConfirmedEmail(email, name, orderNumber);
      if (status === 'SHIPPED')    sendOrderShippedEmail(email, name, orderNumber, tracking);
      if (status === 'DELIVERED')  sendOrderDeliveredEmail(email, name, orderNumber);
      if (status === 'CANCELLED')  sendOrderCancelledEmail(email, name, orderNumber);
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ success: false, message: 'Error updating order' }, { status: 500 });
  }
}
