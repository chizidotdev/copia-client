import axios from 'axios';

export function interceptors() {
    axios.interceptors.request.use(
        async (config) => {
            config.headers['Content-Type'] = 'application/json';
            config.withCredentials = true;
            return config;
        },
    );
}
