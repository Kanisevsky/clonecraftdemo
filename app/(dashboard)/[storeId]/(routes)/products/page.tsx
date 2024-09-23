import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import BillboardClient from './components/client';
import { ProductColumn } from './components/columns';
import { formatter } from '@/lib/utils';

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      colour: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    colour: item.colour.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
