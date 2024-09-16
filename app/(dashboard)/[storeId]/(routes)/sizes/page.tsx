import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import ColourClient from '../colours/components/client';
import { ColourColumn } from '../colours/components/columns';

const Colours = async ({ params }: { params: { storeId: string } }) => {
  const colours = await prismadb.colour.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });
  const formattedSizes: ColourColumn[] = colours.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColourClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Colours;
