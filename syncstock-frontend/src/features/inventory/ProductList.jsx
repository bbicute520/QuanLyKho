import React from 'react';

export default function ProductList() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Danh sách sản phẩm</h2>
          <p className="text-on-surface-variant max-w-md">Quản lý kho hàng kỹ thuật số với độ chính xác cao. Theo dõi tồn kho và luồng hàng hóa theo thời gian thực.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:translate-y-[-2px] active:translate-y-0 transition-all">
            <span className="material-symbols-outlined">add</span>
            + Thêm sản phẩm mới
          </button>
        </div>
      </div>

      {/* Dashboard Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Tổng sản phẩm</p>
          <p className="text-3xl font-black text-on-surface tracking-tighter">1,284</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-secondary">
            <span className="material-symbols-outlined text-xs">trending_up</span> +12% tháng này
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Sắp hết hàng</p>
          <p className="text-3xl font-black text-on-surface tracking-tighter text-tertiary">42</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-tertiary">
            <span className="material-symbols-outlined text-xs">warning</span> Cần nhập thêm
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Đã hết hàng</p>
          <p className="text-3xl font-black text-on-surface tracking-tighter text-error">12</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-error">
            <span className="material-symbols-outlined text-xs">error</span> Ngừng kinh doanh
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-surface-tint"></div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Giá trị kho</p>
          <p className="text-3xl font-black text-on-surface tracking-tighter">2.4B</p>
          <p className="mt-2 text-[10px] font-bold text-slate-400">VNĐ (Ước tính)</p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-6">
        <div className="bg-surface-container-lowest p-2 rounded-2xl shadow-sm border border-slate-200/50 flex items-center gap-4 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <div className="flex-1 flex items-center gap-3 px-4">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 placeholder:text-slate-400 text-on-surface font-medium outline-none" 
              placeholder="Tìm kiếm sản phẩm, SKU hoặc nhà cung cấp..." 
              type="text"
            />
          </div>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          <button className="px-6 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-bold text-xs rounded-xl transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Bộ lọc nâng cao
          </button>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 w-24">Hình ảnh</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Mã SKU</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Tên sản phẩm</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Danh mục</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Số lượng tồn</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Trạng thái</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              
              {/* Row 1 */}
              <tr className="group hover:bg-surface-container-high/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=W&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">WAT-K22-421</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface text-sm">Đồng hồ Kinetic Series 5</p>
                  <p className="text-[10px] text-slate-500">Edition: Midnight Silver</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Phụ kiện</span>
                </td>
                <td className="px-6 py-4 font-bold text-sm">142</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="group hover:bg-surface-container-high/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=H&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">AUD-P99-900</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface text-sm">Tai nghe Studio Pro Wireless</p>
                  <p className="text-[10px] text-slate-500">Noise Cancelling v2</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Âm thanh</span>
                </td>
                <td className="px-6 py-4 font-bold text-sm">0</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-error-container text-error">
                    Hết hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="group hover:bg-surface-container-high/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=S&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">SHO-X2-RED</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface text-sm">Giày thể thao Swift Runner</p>
                  <p className="text-[10px] text-slate-500">Performance Collection</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Thời trang</span>
                </td>
                <td className="px-6 py-4 font-bold text-sm">85</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low/30">
          <p className="text-xs text-slate-500 font-medium">Hiển thị <span className="text-slate-900">1-3</span> trong tổng số <span className="text-slate-900">1,284</span> sản phẩm</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white transition-all disabled:opacity-30" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white text-xs font-bold shadow-md shadow-primary/20">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white text-xs font-bold transition-all">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white text-xs font-bold transition-all">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white text-xs font-bold transition-all">42</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Tooltip for Quick Actions */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-on-background text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
        </button>
      </div>
    </div>
  );
}