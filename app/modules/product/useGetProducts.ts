import { getProduct, getProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
  });
};
