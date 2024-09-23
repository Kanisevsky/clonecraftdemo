'use client';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import ApiList from '@/components/ui/apiList';
import { columns, ProductColumn } from './columns';

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data?.length})`}
          description="Manage Products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entitiyIdName="productId" />
    </>
  );
};

export default ProductClient;
