'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BillboardColumn } from './columns';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

interface CellActionsProps {
  data: BillboardColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard ID copied to the billboard');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="h-4 w-5 mr-2" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="h-4 w-5 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="h-4 w-5 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
