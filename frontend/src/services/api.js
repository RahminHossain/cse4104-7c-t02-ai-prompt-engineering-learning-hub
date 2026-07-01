import axios from 'axios';
import toast from 'react-hot-toast';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: 'https://teem-01.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';

    // If the token is invalid or expired, log the user out globally
    if (error.response?.status === 401) {
      store.dispatch(logout());
      toast.error('Session expired. Please login again.');
    } else {
      // For other errors, just show a toast if it's not handled specifically
      // (Optional: We might not want to toast EVERY error globally if components handle them,
      // but it's good for a robust fallback).
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
