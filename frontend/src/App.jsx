import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Reports from "./features/dashboard/Reports";
import ProductList from "./features/inventory/ProductList";
import SupplierList from "./features/suppliers/SupplierList";
import StockIn from "./features/transactions/StockIn";
import StockInHistory from "./features/transactions/StockInHistory";
import StockOut from "./features/transactions/StockOut";
import Profile from "./features/account/Profile";

// 1. IMPORT TRANG LOGIN
import Login from "./features/auth/Login";

// 2. IMPORT ÔNG BẢO VỆ (KIỂM TRA ĐĂNG NHẬP)
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* TRANG LOGIN: Ai cũng vào được */}
                <Route path="/login" element={<Login />} />

                {/* CỤM TRANG NỘI BỘ: Phải đi qua ProtectedRoute mới được vào */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route
                            index
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="stock-in" element={<StockIn />} />
                        <Route path="stock-out" element={<StockOut />} />
                        <Route path="suppliers" element={<SupplierList />} />
                        <Route path="stock-history" element={<StockInHistory />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>

                {/* REDIRECT: Nếu nhập sai URL thì về login */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}