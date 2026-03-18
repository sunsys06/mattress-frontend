import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Token and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const record = await prisma.passwordReset.findFirst({
      where: { token, used: false },
    });

    if (!record) {
      return NextResponse.json({ success: false, message: 'Invalid or expired reset link' }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ success: false, message: 'Reset link has expired. Please request a new one.' }, { status: 400 });
    }

    await prisma.user.update({
      where: { email: record.email },
      data: { password: hashPassword(password) },
    });

    await prisma.passwordReset.update({
      where: { id: record.id },
      data: { used: true },
    });

    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ success: false, message: 'Failed to reset password' }, { status: 500 });
  }
}
