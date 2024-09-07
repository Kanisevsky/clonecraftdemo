import { UserButton } from '@clerk/nextjs';
import MainNav from './mainNav';

const navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="">This will be a store switcher</div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default navbar;
