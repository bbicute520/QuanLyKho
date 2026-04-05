import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation();

  // Danh sách menu để dễ quản lý và đổi màu active
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: 'dashboard' },
    { name: 'Products', path: '/products', icon: 'inventory_2' },
    { name: 'Stock In', path: '/stock-in', icon: 'input' },
    { name: 'Stock Out', path: '/stock-out', icon: 'output' },
    { name: 'Suppliers', path: '/suppliers', icon: 'local_shipping' },
    { name: 'Reports', path: '/reports', icon: 'description' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f9ff]">
      {/* --- SIDEBAR CỐ ĐỊNH --- */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-100/70 backdrop-blur-xl border-r border-slate-200/20 z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#003d9b] to-[#0052cc] rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">architecture</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-slate-900">SyncStock</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">WMS Control Center</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-r-full font-bold transition-all ${
                  location.pathname === item.path 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- KHU VỰC BÊN PHẢI --- */}
      <main className="ml-64 flex-1">
        {/* TOPBAR CỐ ĐỊNH */}
        <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/20">
          <div className="flex items-center gap-8">
            <span className="text-blue-700 font-bold border-b-2 border-blue-700 pb-1 text-sm cursor-pointer">Analytics</span>
            <span className="text-slate-600 hover:text-blue-600 text-sm font-bold cursor-pointer">Reports</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-slate-500 cursor-pointer">notifications</span>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-200"></div>
          </div>
        </header>

        {/* NỘI DUNG THAY ĐỔI THEO ROUTE (DASHBOARD, PRODUCTS...) */}
        <div className="pt-24 px-8 pb-12">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}