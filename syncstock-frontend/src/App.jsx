import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import ProductList from './features/inventory/ProductList'; 
import StockIn from './features/transactions/StockIn';
import StockOut from './features/transactions/StockOut';
import SupplierList from './features/suppliers/SupplierList';
import Dashboard from './features/dashboard/Dashboard';

// 1. IMPORT COMPONENT BÁO CÁO VÀO ĐÂY
import Reports from './features/dashboard/Reports'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="stock-in" element={<StockIn />} />
          <Route path="stock-out" element={<StockOut />} />
          <Route path="suppliers" element={<SupplierList />} />
          
          {/* 2. THAY THẾ PLACEHOLDER BẰNG REPORTS */}
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}