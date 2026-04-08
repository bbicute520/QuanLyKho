import React from 'react';

export default function ProductList() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header & Actions */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface mb-3">Danh sách sản phẩm</h2>
          <p className="text-on-surface-variant text-base max-w-lg">Quản lý kho hàng kỹ thuật số với độ chính xác cao. Theo dõi tồn kho và luồng hàng hóa theo thời gian thực.</p>
        </div>
      </div>

      {/* Dashboard Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Tổng sản phẩm</p>
          <p className="text-5xl font-black text-on-surface tracking-tighter">1,284</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-secondary">
            <span className="material-symbols-outlined text-sm">trending_up</span> +12% tháng này
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Sắp hết hàng</p>
          <p className="text-5xl font-black text-on-surface tracking-tighter text-tertiary">42</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-tertiary">
            <span className="material-symbols-outlined text-sm">warning</span> Cần nhập thêm
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-error"></div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Đã hết hàng</p>
          <p className="text-5xl font-black text-on-surface tracking-tighter text-error">12</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-error">
            <span className="material-symbols-outlined text-sm">error</span> Ngừng kinh doanh
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-surface-tint"></div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Giá trị kho</p>
          <p className="text-5xl font-black text-on-surface tracking-tighter">2.4B</p>
          <p className="mt-3 text-[11px] font-bold text-slate-400">VNĐ (Ước tính)</p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-8">
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4 group focus-within:border-primary/50 transition-all">
          <div className="flex-1 flex items-center gap-3 px-4">
            <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-base py-2 placeholder:text-slate-400 text-on-surface font-medium outline-none" 
              placeholder="Tìm kiếm sản phẩm, SKU hoặc nhà cung cấp..." 
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

      {/* Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/60">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider w-28">Hình ảnh</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã SKU</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Số lượng tồn</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=W&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">WAT-K22-421</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Đồng hồ Kinetic Series 5</p>
                  <p className="text-xs text-slate-400">Edition: Midnight Silver</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Phụ kiện</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">142</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=A&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">AUD-P99-900</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Tai nghe Studio Pro Wireless</p>
                  <p className="text-xs text-slate-400">Noise Cancelling v2</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Âm thanh</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">0</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-error-container text-error">
                    Hết hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=S&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">SHO-X2-RED</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Giày thể thao Swift Runner</p>
                  <p className="text-xs text-slate-400">Performance Collection</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Thời trang</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">85</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=C&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">CAM-Z1-PRO</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Camera An Ninh 360</p>
                  <p className="text-xs text-slate-400">Smart Home Vision</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Điện tử</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">25</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed">
                    Sắp hết
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=B&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">BAG-L09-BLK</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Balo Chống Nước Urban</p>
                  <p className="text-xs text-slate-400">Travel Series</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Phụ kiện</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">210</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 6 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=T&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">TAB-S8-128</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Máy Tính Bảng NovaPad</p>
                  <p className="text-xs text-slate-400">128GB - 5G LTE</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Điện tử</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">0</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-error-container text-error">
                    Hết hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 7 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=K&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">KEY-MCH-RGB</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Bàn Phím Cơ MechPro</p>
                  <p className="text-xs text-slate-400">Blue Switch / RGB</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Phụ kiện</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">56</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 8 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=M&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">MIK-PDC-V2</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Micro Thu Âm Podcast</p>
                  <p className="text-xs text-slate-400">Studio Grade</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Âm thanh</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">12</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed">
                    Sắp hết
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 9 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=D&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">MNT-U27-4K</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Màn Hình 27" UltraHD</p>
                  <p className="text-xs text-slate-400">IPS / 144Hz</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Điện tử</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">89</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 10 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://ui-avatars.com/api/?name=L&background=random" alt="Product" />
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">LAP-X14-M2</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-base mb-1">Laptop DevBook 14</p>
                  <p className="text-xs text-slate-400">16GB RAM / 512GB SSD</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600 bg-surface-container-high px-3 py-1.5 rounded-md">Điện tử</span>
                </td>
                <td className="px-6 py-4 font-bold text-base text-slate-700">45</td>
                <td className="px-6 py-4">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container">
                    Còn hàng
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary-fixed transition-all"><span className="material-symbols-outlined text-xl">edit</span></button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-error hover:bg-error-container/50 transition-all"><span className="material-symbols-outlined text-xl">delete</span></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/10 bg-surface-container-lowest mt-auto">
          
          {/* Cụm thông tin & Chọn số hàng hiển thị */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500 font-medium">
              Hiển thị <span className="text-slate-900 font-bold">1-10</span> trong tổng số <span className="text-slate-900 font-bold">1,284</span> sản phẩm
            </p>
            <div className="hidden md:flex items-center gap-2 border-l border-outline-variant/20 pl-6">
              <span className="text-sm text-slate-500 font-medium">Số hàng mỗi trang:</span>
              <select className="bg-surface-container-low border border-outline-variant/30 text-sm font-bold text-slate-700 rounded-lg px-3 py-1.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-all">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          {/* Cụm nút chuyển trang */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-surface-container-low transition-all disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white text-sm font-bold shadow-md shadow-primary/20">1</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">2</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">3</button>
            <span className="px-3 text-slate-400 text-lg">...</span>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">129</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Tooltip for Quick Actions */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-on-background text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
        </button>
      </div>
    </div>
  );
}