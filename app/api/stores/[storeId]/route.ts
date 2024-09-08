import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { body } = await req.json();
    const { name } = body;
    if (!userId) new NextResponse('Unauthenticated', { status: 401 });
    if (!name) new NextResponse('Name Is Required', { status: 400 });
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
