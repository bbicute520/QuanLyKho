import axios from 'axios';

// 1. Tạo một instance (phiên bản) của axios với cấu hình mặc định
const api = axios.create({
  // Tạm thời để localhost, sau này Tuấn up server lên mạng thì mình đổi link ở đây là xong toàn bộ web
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. INTERCEPTOR (Người gác cổng) - Tự động gắn Token trước khi gửi yêu cầu
api.interceptors.request.use(
  (config) => {
    // Lấy chìa khóa (token) từ kho lưu trữ của trình duyệt (localStorage)
    const token = localStorage.getItem('token');
    
    // Nếu có chìa khóa, tự động nhét vào Header của yêu cầu
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. (Tùy chọn) Bắt lỗi nếu Token hết hạn thì tự động đá văng ra trang Login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 là mã lỗi Backend báo "Không có quyền" hoặc "Token hết hạn"
      localStorage.removeItem('token');
      window.location.href = '/login'; // Đá về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default api;