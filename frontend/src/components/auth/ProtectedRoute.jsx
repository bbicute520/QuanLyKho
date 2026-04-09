import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // SỬA Ở ĐÂY: Phải lấy đúng cái tên 'access_token' sếp đã đặt trong authStore
  const token = localStorage.getItem('access_token'); 

  if (!token) {
    // Nếu KHÔNG có token -> "Đá" về trang Login
    return <Navigate to="/login" replace />;
  }

  // Nếu CÓ token -> Cho phép đi tiếp vào các trang con
  return <Outlet />;
};

export default ProtectedRoute;