import { getProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
