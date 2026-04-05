import React from 'react';

export default function SupplierList() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface mb-3">Danh sách nhà cung cấp</h2>
          <p className="text-on-surface-variant text-base max-w-lg">Quản lý thông tin và tình trạng hợp tác với các đối tác cung ứng.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-xl">person_add</span>
            + Thêm nhà cung cấp
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-primary relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tổng đối tác</p>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-black text-on-surface tracking-tighter">124</span>
            <span className="text-sm font-bold text-primary bg-primary-fixed px-3 py-1 rounded-md">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary-container relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Đang hoạt động</p>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-black text-on-surface tracking-tighter">118</span>
            <span className="text-sm font-bold text-secondary text-on-secondary-container bg-secondary-container px-3 py-1 rounded-md">95%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-tertiary-container relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Chờ gia hạn</p>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-black text-on-surface tracking-tighter">4</span>
            <span className="text-sm font-bold text-tertiary bg-tertiary-fixed px-3 py-1 rounded-md">Cần xử lý</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-error relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tạm dừng</p>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-black text-on-surface tracking-tighter">2</span>
            <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-8">
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4 group focus-within:border-primary/50 transition-all">
          <div className="flex-1 flex items-center gap-3 px-4">
            <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-base py-2 placeholder:text-slate-400 text-on-surface font-medium outline-none" 
              placeholder="Tìm kiếm nhà cung cấp, mã số hoặc địa chỉ..." 
              type="text"
            />
          </div>
          <div className="h-10 w-px bg-outline-variant/20 hidden md:block"></div>
          <button className="px-6 py-3 bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-bold text-sm rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Bộ lọc nâng cao
          </button>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/60">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên nhà cung cấp</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Người liên hệ</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Địa chỉ</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tình trạng</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary">KA</div>
                    <div>
                      <p className="font-bold text-slate-900 text-base mb-1">Kinetic Alliance Ltd.</p>
                      <p className="text-xs text-slate-500 font-mono">ID: SUP-2024-001</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-base font-medium text-slate-700">Lê Minh Tuấn</td>
                <td className="px-6 py-6 text-base text-slate-600 font-mono">090 123 4567</td>
                <td className="px-6 py-6 text-base text-primary hover:underline cursor-pointer">tuan.lm@kinetic.com</td>
                <td className="px-6 py-6 text-base text-slate-600 max-w-[200px] truncate">123 Đường Công Nghệ, Q.9, TP. HCM</td>
                <td className="px-6 py-6">
                  <span className="whitespace-nowrap inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Đang hợp tác
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary">GL</div>
                    <div>
                      <p className="font-bold text-slate-900 text-base mb-1">Global Logistics Co.</p>
                      <p className="text-xs text-slate-500 font-mono">ID: SUP-2024-042</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-base font-medium text-slate-700">Nguyễn Thị Hồng</td>
                <td className="px-6 py-6 text-base text-slate-600 font-mono">091 888 9999</td>
                <td className="px-6 py-6 text-base text-primary hover:underline cursor-pointer">hong.nt@globallog.vn</td>
                <td className="px-6 py-6 text-base text-slate-600 max-w-[200px] truncate">45 Cảng Cát Lái, Q.2, TP. HCM</td>
                <td className="px-6 py-6">
                  <span className="whitespace-nowrap inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Đang hợp tác
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary">SC</div>
                    <div>
                      <p className="font-bold text-slate-900 text-base mb-1">SupplyChain Pro</p>
                      <p className="text-xs text-slate-500 font-mono">ID: SUP-2023-115</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-base font-medium text-slate-700">Trần Đại Quang</td>
                <td className="px-6 py-6 text-base text-slate-600 font-mono">098 555 1234</td>
                <td className="px-6 py-6 text-base text-primary hover:underline cursor-pointer">quang.td@scpro.com</td>
                <td className="px-6 py-6 text-base text-slate-600 max-w-[200px] truncate">Khu Công Nghiệp VSIP II, Bình Dương</td>
                <td className="px-6 py-6">
                  <span className="whitespace-nowrap inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed">
                    Đang gia hạn
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 md:p-8 flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest mt-auto">
          <p className="text-sm text-slate-500 font-medium">Hiển thị <span className="text-slate-900 font-bold">1-3</span> trong tổng số <span className="text-slate-900 font-bold">124</span> nhà cung cấp</p>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-surface-container-low transition-all disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white text-sm font-bold shadow-md shadow-primary/20">1</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">2</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">3</button>
            <span className="px-3 text-slate-400 text-lg">...</span>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}