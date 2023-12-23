import { RxCaretSort } from 'react-icons/rx/index.js';
import type { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { ActionOptions } from '@/modules/product/components/action-options';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <RxCaretSort className='ml-2 h-4 w-4' />
        </div>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'SKU',
    header: 'SKU',
    cell: ({ row }) => <div>{row.getValue('SKU')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'quantityInStock',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center justify-end'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quantity
          <RxCaretSort className='ml-2 h-4 w-4' />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('quantityInStock')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: () => <div className='text-right'>Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));

      // Format the amount as a naira amount
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionOptions row={row} />,
  },
];
