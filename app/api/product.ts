import { BASE_URL } from '@/lib';
import axios from 'axios';

export const createProduct = async ({ data }: { data: FormData }) => {
  const response = await axios.post(`${BASE_URL}/products`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
