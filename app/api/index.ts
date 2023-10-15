import axios from 'axios';
import { BASE_URL } from '~/lib/constants';

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
