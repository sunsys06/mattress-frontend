import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, description } = await request.json();
    if (!name?.trim()) return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });

    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
    const category = await prisma.category.update({
      where: { id: params.id },
      data: { name: name.trim(), slug, description: description?.trim() || null },
    });
    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ success: false, message: 'Category name already exists' }, { status: 409 });
    return NextResponse.json({ success: false, message: 'Error updating category' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.productCategory.deleteMany({ where: { categoryId: params.id } });
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error deleting category' }, { status: 500 });
  }
}
