import { GoKebabHorizontal } from 'react-icons/go/index.js';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditProduct } from '../components/edit-product';
import { type Row } from '@tanstack/table-core';
import { UpdateQuantity } from './update-quantity';

export const ActionOptions = ({ row }: { row: Row<Product> }) => {
  const item = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center justify-center'>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <GoKebabHorizontal className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(item.SKU)}
        >
          Copy Product Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <UpdateQuantity item={item} />
        <EditProduct item={item} />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
