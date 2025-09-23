import axios from 'axios';
import { getCookie } from 'cookies-next';

const API_URL = 'https://myportfolio-ewtufvor.b4a.run';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
