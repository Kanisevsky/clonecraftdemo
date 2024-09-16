'use client';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import ApiList from '@/components/ui/apiList';
import { ColourColumn, columns } from './columns';

interface ColourClientProps {
  data: ColourColumn[];
}

const ColourClient: React.FC<ColourClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colours (${data?.length})`}
          description="Manage Colours for your product"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colours/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Colours" />
      <Separator />
      <ApiList entityName="colours" entitiyIdName="colourId" />
    </>
  );
};

export default ColourClient;
