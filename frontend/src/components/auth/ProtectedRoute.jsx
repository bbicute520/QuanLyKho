import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Kiểm tra xem trong máy có lưu "token" đăng nhập chưa
  const token = localStorage.getItem('token');

  // Nếu KHÔNG có token -> "Đá" về trang Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu CÓ token -> Cho phép đi tiếp vào các trang con (Dashboard, Products...)
  return <Outlet />;
};

export default ProtectedRoute;