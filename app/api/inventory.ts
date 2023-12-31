import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

export const getInventory = async (): Promise<Inventory> => {
  const response = await axios.get(`${BASE_URL}/inventory`);
  return response.data;
};
