import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserStatus, UserRole, Prisma } from '@prisma/client';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, status, role } = body as {
      firstName?: string; lastName?: string; email?: string;
      phone?: string; status?: UserStatus; role?: UserRole;
    };

    const data: Prisma.UserUpdateInput = {};
    if (firstName !== undefined) data.firstName = firstName;
    if (lastName  !== undefined) data.lastName  = lastName;
    if (email     !== undefined) data.email     = email;
    if (phone     !== undefined) data.phone     = phone;
    if (status    !== undefined) data.status    = status;
    if (role      !== undefined) data.role      = role;

    const updated = await prisma.user.update({
      where: { id: params.id },
      data,
      select: {
        id: true, firstName: true, lastName: true,
        email: true, phone: true, role: true, status: true,
        emailVerified: true, createdAt: true, updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('User update error:', error);
    const isPrismaUniqueError = (error as { code?: string }).code === 'P2002';
    const message = isPrismaUniqueError ? 'Email already in use by another user' : 'Error updating user';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            shippingAddress: true,
            payment: true,
            statusHistory: { orderBy: { createdAt: 'asc' } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('User detail error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching user' }, { status: 500 });
  }
}
