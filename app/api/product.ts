import { BASE_URL } from '@/lib';
import axios from 'axios';

export const createProduct = async ({ data }: { data: FormData }) => {
  const response = await axios.post(`${BASE_URL}/products`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getProducts = async (): Promise<
  APIResponse<{ products: Product[] }> | undefined
> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};
