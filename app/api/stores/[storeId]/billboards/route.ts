import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is Required', { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse('ImageUrl is Required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store Id is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[Billboard_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
