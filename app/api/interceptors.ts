import { useNavigate } from '@remix-run/react';
import axios from 'axios';
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
  }, [navigate]);
}

function useInterceptor() {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null;

      if (status === 401) {
        // Handle unauthorized access
        if (error.response.status === 401) {
          navigate('/u/login');
        }
      } else if (status === 404) {
        // Handle not found errors
      } else {
        // Handle other errors
      }

      return Promise.reject(error);
    }
  );

  //   // Creating an interceptor and storing its reference
  // const axiosInterceptor = axios.interceptors.request.use(config => {
  //   // Modify the request config
  //   return config;
  // });

  // // Removing the interceptor
  // axios.interceptors.request.eject(axiosInterceptor);
}
