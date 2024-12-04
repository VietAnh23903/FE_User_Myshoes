import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '', 
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Ngrok-Skip-Browser-Warning'] = '1';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
