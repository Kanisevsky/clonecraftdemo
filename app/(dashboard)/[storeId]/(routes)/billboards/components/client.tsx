'use client';
import { useParams, useRouter } from 'next/navigation';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface BillboardClientProps {
  data: Billboard[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data?.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
