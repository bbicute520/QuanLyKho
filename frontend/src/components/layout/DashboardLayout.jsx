import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../lib/authStore"; 

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 1. Logic mở/đóng menu profile
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // 2. Lấy hàm logout từ Zustand Store
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        setIsProfileOpen(false); // Đóng menu trước khi logout
        logout(); 
        navigate("/login"); 
    };

    // 3. Đóng menu khi click ra ngoài vùng dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Tổng quan", path: "/dashboard", icon: "dashboard" },
        { name: "Sản phẩm", path: "/products", icon: "inventory_2" },
        { name: "Nhập kho", path: "/stock-in", icon: "input" },
        { name: "Xuất kho", path: "/stock-out", icon: "output" },
        { name: "Nhà cung cấp", path: "/suppliers", icon: "local_shipping" },
    ];

    return (
        <div className="flex min-h-screen bg-[#f9f9ff]">
            {/* SIDEBAR - GIỮ NGUYÊN GIAO DIỆN CỦA SẾP */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-100/70 backdrop-blur-xl border-r border-slate-200/20 z-40">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#003d9b] to-[#0052cc] rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span className="material-symbols-outlined">architecture</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tighter text-slate-900">SyncStock</h1>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Trung tâm điều phối kho</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-r-full font-bold transition-all ${
                                    location.pathname === item.path
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* KHU VỰC BÊN PHẢI */}
            <main className="ml-64 flex-1">
                {/* TOPBAR */}
                <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/20">
                    <div className="flex items-center gap-8">
                        <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-bold cursor-pointer transition-colors ${isActive ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-slate-600 hover:text-blue-600"}`}>Phân tích</NavLink>
                        <NavLink to="/reports" className={({ isActive }) => `text-sm font-bold cursor-pointer transition-colors ${isActive ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-slate-600 hover:text-blue-600"}`}>Báo cáo</NavLink>
                        <NavLink to="/stock-history" className={({ isActive }) => `text-sm font-bold cursor-pointer transition-colors ${isActive ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-slate-600 hover:text-blue-600"}`}>Nhật ký</NavLink>
                    </div>

                    <div className="flex items-center gap-4" ref={profileRef}>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

                        {/* DROPDOWN PROFILE */}
                        <div className="relative">
                            <div 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-opacity select-none"
                            >
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-900">Chi nhánh Quận 1</p>
                                    <p className="text-[10px] text-blue-700 font-medium">Kho chính</p>
                                </div>
                                <span className={`material-symbols-outlined text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </div>

                            {/* MENU DROPDOWN */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <button 
                                        onClick={() => { 
                                            setIsProfileOpen(false); 
                                            navigate("/profile"); // CHỖ NÀY LÀ LOGIC CHUYỂN TRANG
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors text-left"
                                    >
                                        <span className="material-symbols-outlined text-lg">account_circle</span>
                                        Thông tin
                                    </button>
                                    <div className="h-px bg-slate-100 my-1 mx-4"></div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* KHU VỰC HIỂN THỊ NỘI DUNG TRANG */}
                <div className="pt-24 px-8 pb-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}