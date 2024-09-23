import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      categoryId: string;
      colourId: string;
      sizeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colourId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is Required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category Id is Required', { status: 400 });
    }
    if (!params.colourId) {
      return new NextResponse('Colour Id is Required', { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse('Size Id is Required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store Id is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[Billboard_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store Id is Required', { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[Billboard_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
