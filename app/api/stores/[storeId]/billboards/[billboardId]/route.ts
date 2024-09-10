import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is Required', { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse('Image URL is Required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store Id is Required', { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse('Billboard Id is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[Billboard_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('BillboardId is required', { status: 400 });
    }
    const store = await prismadb.store.deleteMany({
      where: { id: params.storeId, userId },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
