import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './table-data/columns';
import { useState } from 'react';
import { useGetProducts } from './useGetProducts';
import usehooks from 'usehooks-ts/dist/cjs/index.js';
const { useSessionStorage } = usehooks;

export const useProductListTable = () => {
  const { data } = useGetProducts();
  const products = data?.data?.products ?? [];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    useSessionStorage<ColumnFiltersState>('column-filters', []);
  const [columnVisibility, setColumnVisibility] =
    useSessionStorage<VisibilityState>('column-visibility', {});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return { table, columns };
};
