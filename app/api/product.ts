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

export const getProduct = async (
  id: string
): Promise<APIResponse<Product> | undefined> => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const editProduct = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}): Promise<APIResponse<{ product: Product }> | undefined> => {
  const response = await axios.put(`${BASE_URL}/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateQuantity = async ({
  data,
  id,
}: {
  data: { newQuantity: number };
  id: string;
}): Promise<APIResponse<{ product: Product }> | undefined> => {
  const response = await axios.patch(`${BASE_URL}/products/${id}/quantity`, data);
  return response.data;
};
