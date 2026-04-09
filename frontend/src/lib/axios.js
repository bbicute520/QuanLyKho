import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: { 'Content-Type': 'application/json' },
});

// Tự động gắn Token access_token vào Header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Dùng đúng tên chìa khóa access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // Xuất ra tên axiosInstance cho thống nhất