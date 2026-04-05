import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import ProductList from './features/inventory/ProductList'; 
import StockIn from './features/transactions/StockIn';
import StockOut from './features/transactions/StockOut';
import SupplierList from './features/suppliers/SupplierList';
import Dashboard from './features/dashboard/Dashboard';
import Reports from './features/dashboard/Reports'; 
import ProtectedRoute from './components/auth/ProtectedRoute';

// 1. IMPORT TRANG LOGIN TỪ THƯ MỤC AUTH MỚI TẠO
import Login from './features/auth/Login'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TRANG LOGIN: Nằm riêng biệt, không có Sidebar/Topbar */}
        <Route path="/login" element={<Login />} />

        {/* CỤM TRANG DASHBOARD: Có DashboardLayout bao quanh */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="stock-in" element={<StockIn />} />
          <Route path="stock-out" element={<StockOut />} />
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* REDIRECT: Nếu người dùng nhập sai đường dẫn, tự động đẩy về dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}