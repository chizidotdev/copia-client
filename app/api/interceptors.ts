import axios from 'axios';

export function interceptors() {
  axios.interceptors.request.use(async (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.withCredentials = true;
    return config;
  });

  // navigate to login page if 401 error
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response.status === 401 &&
        !window.location.href.includes('/u/')
      ) {
        window.location.href = '/u/login';
      }
      return Promise.reject(error);
    }
  );
}
