import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

// TODO: Migrate this to an axios client
const api = {
  async get<T>(url?: string) {
    const response = await axios.get<T>(BASE_URL + url);

    return response.data;
  },
  async post<T>(url?: string) {
    const response = await axios.post<T>(BASE_URL + url);

    return response.data;
  },
  async put<T>(url?: string) {
    const response = await axios.post<T>(BASE_URL + url);

    return response.data;
  },
  async delete<T>(url?: string) {
    const response = await axios.post<T>(BASE_URL + url);

    return response.data;
  },
};

export default api;

export const getError = (error: any): ErrorResponse => {
  return (
    error.response?.data?.error || {
      message: 'Something went wrong',
    }
  );
};
