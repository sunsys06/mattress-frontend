import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

async function getUser(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  const data  = token ? verifyToken(token) : null;
  if (!data) return null;
  return prisma.user.findUnique({ where: { id: data.sub } });
}

// PATCH update address or set as default
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();

    // If setting as default, unset others first
    if (body.isDefault) {
      await prisma.address.updateMany({ where: { userId: user.id }, data: { isDefault: false } });
    }

    const address = await prisma.address.update({
      where: { id: params.id, userId: user.id },
      data: {
        fullName:     body.fullName     ?? undefined,
        phone:        body.phone        ?? undefined,
        addressLine1: body.addressLine1 ?? undefined,
        addressLine2: body.addressLine2 !== undefined ? (body.addressLine2 || null) : undefined,
        city:         body.city         ?? undefined,
        state:        body.state        ?? undefined,
        pincode:      body.pincode      ?? undefined,
        landmark:     body.landmark     !== undefined ? (body.landmark || null) : undefined,
        isDefault:    body.isDefault    ?? undefined,
      },
    });
    return NextResponse.json({ success: true, data: address });
  } catch (error) {
    console.error('Update address error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update address' }, { status: 500 });
  }
}

// DELETE remove address
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.address.delete({ where: { id: params.id, userId: user.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete address error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete address' }, { status: 500 });
  }
}
