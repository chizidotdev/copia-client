import axios from 'axios';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export function useInterceptors() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.request.use(async (config) => {
      config.headers['Content-Type'] = 'application/json';
      config.withCredentials = true;
      return config;
    });

    // navigate to login page if 401 error
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate('/u/login');
        }
        return Promise.reject(error);
      }
    );
  }, []);
}
