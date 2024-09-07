'use client';

import { Store } from '@prisma/client';
import { PopoverTrigger } from './ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal;
  const params = useParams();
  const router = useRouter();
  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  return <div>StreSwitcher</div>;
};

export default StoreSwitcher;
