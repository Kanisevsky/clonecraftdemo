'use client';

import { Store } from '@prisma/client';
import { Popover, PopoverTrigger } from './ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [isOpen, setisOpen] = useState(false);
  const storeModal = useStoreModal;
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const onStoreSelect = (store: { value: string; label: string }) => {
    setisOpen(false);
    router.push(`/${store.value}`);
  };
  return <Popover></Popover>;
};
export default StoreSwitcher;
