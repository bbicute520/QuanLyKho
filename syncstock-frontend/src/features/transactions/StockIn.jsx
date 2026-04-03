import React from 'react';

export default function StockIn() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-on-surface mb-2">Tạo phiếu nhập kho</h2>
          <p className="text-on-surface-variant max-w-md">Khởi tạo quy trình nhập kho mới cho hệ thống vận hành Kinetic Architect.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-high transition-all">
            Hủy bỏ
          </button>
          <button className="px-8 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Xác nhận nhập kho
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* General Info Form (Bento Style) */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h3 className="text-label-sm font-bold tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span> Thông tin chung
            </h3>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Mã phiếu nhập</label>
                <input 
                  className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary px-0 py-2 text-on-surface font-medium transition-all outline-none" 
                  readOnly 
                  type="text" 
                  value="GRN-2023-00452" 
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Ngày nhập</label>
                <input 
                  className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary px-0 py-2 text-on-surface font-medium transition-all outline-none" 
                  type="date" 
                  defaultValue="2023-11-20" 
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Nhà cung cấp</label>
                <select className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary px-0 py-2 text-on-surface font-medium transition-all appearance-none outline-none">
                  <option>Global Logistics Solutions Co.</option>
                  <option>North Star Manufacturing</option>
                  <option>TechStream Electronics</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Ghi chú</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary px-0 py-2 text-on-surface font-medium transition-all resize-none outline-none" 
                  placeholder="Nhập ghi chú chi tiết về lô hàng..." 
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Visual Accent Card */}
          <div className="bg-primary-container p-8 rounded-xl text-on-primary-container relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: '"FILL" 1' }}>warehouse</span>
              <h4 className="text-xl font-black mb-2">Hiệu suất vận hành</h4>
              <p className="text-sm opacity-80 leading-relaxed">Phiếu nhập kho này sẽ tự động cập nhật tồn kho thực tế và thông báo cho bộ phận kiểm định.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Products Table */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
              <h3 className="text-label-sm font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">list_alt</span> Danh sách sản phẩm
              </h3>
              <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary-fixed px-3 py-1.5 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-sm">add_circle</span> Thêm sản phẩm
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã SKU</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sản phẩm</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Số lượng</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Đơn giá</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thành tiền</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">KA-MOD-202</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">Module Cảm Biến X-Alpha</p>
                      <p className="text-[10px] text-slate-400">Thiết bị IoT công nghiệp</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-right py-1 px-2 focus:ring-1 focus:ring-primary outline-none" type="number" defaultValue="150" />
                    </td>
                    <td className="px-6 py-5 text-right font-medium text-slate-600">450.000 đ</td>
                    <td className="px-6 py-5 text-right font-bold text-primary">67.500.000 đ</td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-error hover:bg-error-container/30 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">KA-PWR-500</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">Nguồn 500W Dynamic</p>
                      <p className="text-[10px] text-slate-400">Phụ kiện hệ thống truyền động</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-right py-1 px-2 focus:ring-1 focus:ring-primary outline-none" type="number" defaultValue="45" />
                    </td>
                    <td className="px-6 py-5 text-right font-medium text-slate-600">1.250.000 đ</td>
                    <td className="px-6 py-5 text-right font-bold text-primary">56.250.000 đ</td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-error hover:bg-error-container/30 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">KA-CAB-XL</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">Cáp Tín Hiệu Bọc Kim</p>
                      <p className="text-[10px] text-slate-400">Vật tư kết nối</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-right py-1 px-2 focus:ring-1 focus:ring-primary outline-none" type="number" defaultValue="1000" />
                    </td>
                    <td className="px-6 py-5 text-right font-medium text-slate-600">15.000 đ</td>
                    <td className="px-6 py-5 text-right font-bold text-primary">15.000.000 đ</td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-error hover:bg-error-container/30 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-surface-container-high/30">
                    <td className="px-6 py-6 text-right font-bold text-on-surface-variant uppercase tracking-wider" colSpan="4">Tổng cộng thành tiền:</td>
                    <td className="px-6 py-6 text-right">
                      <span className="text-2xl font-black text-primary">138.750.000 đ</span>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Additional Details / Summary Bento */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">inventory</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tổng số mặt hàng</p>
                <p className="text-2xl font-black text-on-surface">1,195 <span className="text-xs font-medium text-slate-400">units</span></p>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trạng thái phiếu</p>
                <p className="text-sm font-bold bg-white px-3 py-1 rounded-full text-tertiary shadow-sm inline-block mt-1">Bản nháp (Draft)</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}