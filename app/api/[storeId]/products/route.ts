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

    if (!images || !images.lenght) {
      return new NextResponse('Images are Required', { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colourId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: { ...images.map((image: { url: string }) => image) },
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colourId = searchParams.get('colourId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store Id is Required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colourId,
        sizeId,
        isFeatured: isFeatured ? true : false,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        colour: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
