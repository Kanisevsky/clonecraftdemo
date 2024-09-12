'use client';
import { useParams, useRouter } from 'next/navigation';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CategoryColumn, columns } from './columns';
import { DataTable } from '@/components/ui/dataTable';
import ApiList from '@/components/ui/apiList';

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data?.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entitiyIdName="categoriesId" />
    </>
  );
};

export default CategoryClient;
