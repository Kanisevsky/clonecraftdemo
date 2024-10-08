import { UserButton } from '@clerk/nextjs';
import MainNav from './mainNav';
import StoreSwitcher from './storeSwitcher';
import { auth } from '@clerk/nextjs/server';
import prismadb from '@/lib/prismadb';

const Navbar = async () => {
  const { userId } = auth();

  const stores = await prismadb.store.findMany({
    where: { userId: userId ?? undefined },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
