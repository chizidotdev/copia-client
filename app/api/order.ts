import api from '@/api';
import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

export const getOrders = async (): Promise<Order[]> => {
  return await api.get('/orders');
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  if (!id) return;
  const response = await axios.get(`${BASE_URL}/orders/${id}`);
  return response.data;
};

export const newOrder = async (order: Order): Promise<Order> => {
  const response = await axios.post(`${BASE_URL}/orders`, order);
  return response.data;
};

export const updateOrder = async (
  order: Order & { id: string }
): Promise<Order> => {
  const { id, ...rest } = order;
  const response = await axios.put(`${BASE_URL}/orders/${id}`, rest);
  return response.data;
};

export const deleteOrder = async (id: string): Promise<string> => {
  const response = await axios.delete(`${BASE_URL}/orders/${id}`);
  return response.data;
};
