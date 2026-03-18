import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

async function getUser(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  const data  = token ? verifyToken(token) : null;
  if (!data) return null;
  return prisma.user.findUnique({ where: { id: data.sub } });
}

// GET all addresses
export async function GET(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });
  return NextResponse.json({ success: true, data: addresses });
}

// POST create new address
export async function POST(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, landmark, isDefault } = await request.json();

    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      return NextResponse.json({ success: false, message: 'Please fill all required fields' }, { status: 400 });
    }

    // If setting as default, unset others first
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: user.id }, data: { isDefault: false } });
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        fullName,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        landmark: landmark || null,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json({ success: true, data: address });
  } catch (error) {
    console.error('Create address error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save address' }, { status: 500 });
  }
}
