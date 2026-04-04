import React from 'react';

export default function StockOut() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary font-semibold mb-2 cursor-pointer w-fit hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="text-xs uppercase tracking-widest font-bold">Quay lại danh sách</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Tạo phiếu xuất kho</h2>
        <p className="text-on-surface-variant text-sm max-w-2xl">Khởi tạo quy trình xuất hàng đi. Đảm bảo tất cả thông tin SKU và số lượng đã được đối soát chính xác với tồn kho thực tế.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* General Info Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-primary mb-6">Thông-tin chung</h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Mã đơn xuất</label>
                <input className="w-full bg-surface-container-low border-0 border-b border-outline-variant/20 focus:ring-0 focus:border-primary font-mono text-sm py-2 outline-none" type="text" defaultValue="OUT-2023-8842" readOnly />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Khách hàng / Dự án</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-0 border-b border-outline-variant/20 focus:ring-0 focus:border-primary text-sm py-2 outline-none" placeholder="Chọn đối tác..." type="text" />
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">expand_more</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Ngày xuất</label>
                <input className="w-full bg-surface-container-low border-0 border-b border-outline-variant/20 focus:ring-0 focus:border-primary text-sm py-2 outline-none" type="date" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Lý do xuất</label>
                <textarea className="w-full bg-surface-container-low border-0 border-b border-outline-variant/20 focus:ring-0 focus:border-primary text-sm py-2 resize-none outline-none" placeholder="Ghi chú lý do xuất hàng..." rows="3"></textarea>
              </div>
            </div>
          </section>

          {/* Summary Widget */}
          <div className="bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-9xl">inventory</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Tổng sản phẩm xuất</p>
            <h4 className="text-4xl font-black mb-4">0 <span className="text-lg font-medium opacity-60">SKUs</span></h4>
            <div className="flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>Trạng thái: Đang soạn thảo</span>
            </div>
          </div>
        </div>

        {/* Products Table Area */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-outline-variant/10">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Danh sách sản phẩm xuất</h3>
              <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary-fixed px-3 py-1.5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-sm">add_circle</span>
                THÊM SẢN PHẨM
              </button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-outline">Mã SKU</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-outline">Tên sản phẩm</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-outline text-right">Tồn kho hiện tại</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-outline text-right">Số lượng xuất</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-outline text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="group hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-5 font-mono text-xs text-primary font-semibold">SKU-9021-X</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-on-surface">Precision Sensor Node v4</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">Hardware / Electronics</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-sm font-medium text-slate-500">1,240</span>
                    </td>
                    <td className="px-6 py-5 text-right w-32">
                      <input className="w-full text-right bg-surface-container-low border-0 border-b border-primary/30 focus:ring-0 focus:border-primary font-bold text-sm py-1 outline-none" type="number" defaultValue="0" />
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-error/40 hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="group hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-5 font-mono text-xs text-primary font-semibold">SKU-4412-B</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-on-surface">Kinetic Actuator 500N</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">Robotics / Components</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-sm font-medium text-slate-500">85</span>
                    </td>
                    <td className="px-6 py-5 text-right w-32">
                      <input className="w-full text-right bg-surface-container-low border-0 border-b border-primary/30 focus:ring-0 focus:border-primary font-bold text-sm py-1 outline-none" type="number" defaultValue="0" />
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-error/40 hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-surface-container border-t border-outline-variant/10 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:scale-95">
                  Lưu bản nháp
                </button>
                <button className="px-6 py-3 text-sm font-bold text-error hover:bg-error-container/20 rounded-lg transition-all active:scale-95">
                  Hủy bỏ
                </button>
              </div>
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-3 hover:shadow-xl active:scale-95 transition-all">
                <span>Xác nhận xuất kho</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help / Metadata Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary-container/20 border border-secondary-container/10">
          <span className="material-symbols-outlined text-secondary">info</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-on-secondary-container mb-1">Lưu ý xuất kho</h4>
            <p className="text-xs text-on-secondary-container/80 leading-relaxed">Đơn hàng xuất sẽ được tự động trừ vào số lượng tồn kho ngay khi bấm xác nhận.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-tertiary-fixed/20 border border-tertiary-fixed/10">
          <span className="material-symbols-outlined text-tertiary">priority_high</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-on-tertiary-fixed-variant mb-1">Kiểm tra số lượng</h4>
            <p className="text-xs text-on-tertiary-fixed-variant/80 leading-relaxed">Hệ thống sẽ báo lỗi nếu số lượng xuất vượt quá tồn kho hiện tại có sẵn trong khu vực.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-highest/30 border border-outline-variant/10">
          <span className="material-symbols-outlined text-slate-500">history</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-700 mb-1">Lịch sử xuất kho</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Bạn có thể xem lại các phiếu xuất đã thực hiện trong tab Logs ở thanh điều hướng trên cùng.</p>
          </div>
        </div>
      </div>
    </div>
  );
}