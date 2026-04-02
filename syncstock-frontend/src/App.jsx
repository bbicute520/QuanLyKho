import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Routes>
            {/* Tự động điều hướng từ trang chủ vào login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Định nghĩa các trang */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
