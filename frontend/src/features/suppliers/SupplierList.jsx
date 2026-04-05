import React from 'react';

export default function SupplierList() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
            <span>WMS</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Suppliers</span>
          </nav>
          <h2 className="text-3xl font-black text-on-surface tracking-tight">Danh sách nhà cung cấp</h2>
          <p className="text-on-surface-variant text-sm mt-1">Quản lý thông tin và tình trạng hợp tác với các đối tác cung ứng.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary px-6 py-3 rounded-xl text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform">
          <span className="material-symbols-outlined">person_add</span>
          Thêm nhà cung cấp mới
        </button>
      </div>

      {/* KPI Summary (Contextual Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-primary">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng đối tác</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-on-surface tracking-tighter">124</span>
            <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-secondary-container">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Đang hoạt động</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-on-surface tracking-tighter">118</span>
            <span className="text-xs font-bold text-secondary text-on-secondary-container bg-secondary-container px-2 py-1 rounded-full">95%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-tertiary-container">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Chờ gia hạn</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-on-surface tracking-tighter">4</span>
            <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-1 rounded-full">Cần xử lý</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-error">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tạm dừng</p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-on-surface tracking-tighter">2</span>
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
          <div className="relative w-full md:w-96 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Tìm kiếm nhà cung cấp, mã số hoặc địa chỉ..." type="text" />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Bộ lọc nâng cao
            </button>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Tên nhà cung cấp</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Người liên hệ</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Số điện thoại</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Địa chỉ</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Tình trạng</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">KA</div>
                    <div>
                      <p className="font-bold text-on-surface">Kinetic Alliance Ltd.</p>
                      <p className="text-xs text-slate-400">ID: SUP-2024-001</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Lê Minh Tuấn</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-mono">090 123 4567</td>
                <td className="px-6 py-5 text-sm text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer">tuan.lm@kinetic.com</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">123 Đường Công Nghệ, Q.9, TP. HCM</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">Đang hợp tác</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">GL</div>
                    <div>
                      <p className="font-bold text-on-surface">Global Logistics Co.</p>
                      <p className="text-xs text-slate-400">ID: SUP-2024-042</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Nguyễn Thị Hồng</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-mono">091 888 9999</td>
                <td className="px-6 py-5 text-sm text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer">hong.nt@globallog.vn</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">45 Cảng Cát Lái, Q.2, TP. HCM</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">Đang hợp tác</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">SC</div>
                    <div>
                      <p className="font-bold text-on-surface">SupplyChain Pro</p>
                      <p className="text-xs text-slate-400">ID: SUP-2023-115</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Trần Đại Quang</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-mono">098 555 1234</td>
                <td className="px-6 py-5 text-sm text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer">quang.td@scpro.com</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">Khu Công Nghiệp VSIP II, Bình Dương</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed">Đang gia hạn</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">BP</div>
                    <div>
                      <p className="font-bold text-on-surface">Blue Print Packaging</p>
                      <p className="text-xs text-slate-400">ID: SUP-2022-089</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Phạm Văn Nam</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-mono">094 222 3333</td>
                <td className="px-6 py-5 text-sm text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer">nam.pv@blueprint.vn</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">789 Đường Thăng Long, Hà Nội</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-error-container text-on-error-container">Tạm dừng</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-slate-200/50">
          <span className="text-xs font-medium text-slate-500">Hiển thị 1 - 4 của 124 nhà cung cấp</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs shadow-md shadow-primary/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-white transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-white transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-transform z-50">
        <span className="material-symbols-outlined">mail</span>
      </button>
    </div>
  );
}