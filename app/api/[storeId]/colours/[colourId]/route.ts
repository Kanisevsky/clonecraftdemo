import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { colourId: string } }
) {
  try {
    if (!params.colourId) {
      return new NextResponse('Colour Id is Required', { status: 400 });
    }

    const colour = await prismadb.colour.findUnique({
      where: { id: params.colourId },
    });

    return NextResponse.json(colour);
  } catch (error) {
    console.log('[COLOUR_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colourId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }
    if (!value) {
      return new NextResponse('Colour Value is Required', { status: 400 });
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
    const colour = await prismadb.colour.updateMany({
      where: { id: params.colourId },
      data: { name, value },
    });
    return NextResponse.json(colour);
  } catch (error) {
    console.log('[COLOUR_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colourId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.colourId) {
      return new NextResponse('ColourId is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const size = await prismadb.size.deleteMany({
      where: { id: params.colourId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log('[COLOUR_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
