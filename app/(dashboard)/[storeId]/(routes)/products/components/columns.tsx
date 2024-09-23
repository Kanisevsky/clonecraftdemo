'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './cellActions';

export type ProductColumn = {
  id: string;
  name: string;
  createdAt: string;
  size: string;
  colour: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'isArchive',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'colour',
    header: 'Colour',
    cell: ({ row }) => (
      <div className="flex iems-center gap-x-2">
        {row.original.colour}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.colour }}
        />
      </div>
    ),
  },

  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
