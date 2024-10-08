import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Dashboardlayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect('/');

  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default Dashboardlayout;
