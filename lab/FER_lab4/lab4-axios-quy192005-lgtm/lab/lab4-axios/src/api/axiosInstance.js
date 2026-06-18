import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: tự gắn token nếu có.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: xử lý lỗi tập trung.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;