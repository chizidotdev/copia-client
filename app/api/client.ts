import { BASE_URL } from '@/lib/constants';
import type { Axios } from 'axios';
import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// TODO: Migrate this to an axios client
const client = {
  async get<T>(...args: Parameters<Axios['get']>) {
    const response = await AxiosClient.get(...args);
    return response.data as T;
  },
  async post<T>(...args: Parameters<Axios['post']>) {
    const response = await AxiosClient.post<T>(...args);
    return response.data;
  },
  async put<T>(...args: Parameters<Axios['put']>) {
    const response = await AxiosClient.post<T>(...args);
    return response.data;
  },
  async delete<T>(...args: Parameters<Axios['post']>) {
    const response = await AxiosClient.post<T>(...args);
    return response.data;
  },
};

export default client;
