import axios, { AxiosError } from 'axios';
import { ApiError } from '../types/api.types';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const normalizedError: ApiError = {
      success: false,
      message: error.response?.data?.message || 'Unable to connect. Please check your internet connection.',
      errors: error.response?.data?.errors,
    };
    return Promise.reject(normalizedError);
  }
);

export default apiClient;
