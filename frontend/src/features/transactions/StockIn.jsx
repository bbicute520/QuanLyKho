import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StockIn() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight text-on-surface mb-3">Tạo phiếu nhập kho</h2>
        <p className="text-on-surface-variant text-base max-w-lg">Khởi tạo quy trình nhập kho mới cho hệ thống vận hành Kinetic Architect.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* CỘT TRÁI: Form thông tin & Khối màu xanh */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Thông tin chung */}
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-primary mb-8">
              Thông tin chung
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="ma-nhap" className="text-xs font-bold text-outline uppercase tracking-wider">Mã phiếu nhập</Label>
                <Input id="ma-nhap" readOnly defaultValue="GRN-2023-00452" className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-mono text-base h-12 shadow-sm" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="ngay-nhap" className="text-xs font-bold text-outline uppercase tracking-wider">Ngày nhập</Label>
                <Input id="ngay-nhap" type="date" defaultValue="2023-11-20" className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary text-base h-12 shadow-sm block" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="nha-cung-cap" className="text-xs font-bold text-outline uppercase tracking-wider">Nhà cung cấp</Label>
                <select id="nha-cung-cap" className="flex h-12 w-full rounded-md border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer">
                  <option>Global Logistics Solutions Co.</option>
                  <option>North Star Manufacturing</option>
                </select>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="ghi-chu" className="text-xs font-bold text-outline uppercase tracking-wider">Ghi chú</Label>
                <textarea id="ghi-chu" className="flex w-full rounded-md border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none" placeholder="Nhập ghi chú chi tiết về lô hàng..." rows="4"></textarea>
              </div>
            </div>
          </section>

          {/* Khối màu xanh (Hiệu suất vận hành) */}
          <div className="bg-primary text-white p-8 rounded-xl shadow-lg relative overflow-hidden flex-1">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: '"FILL" 1' }}>warehouse</span>
              <h4 className="text-2xl font-black mb-3">Hiệu suất vận hành</h4>
              <p className="text-base opacity-90 leading-relaxed">Phiếu nhập kho này sẽ tự động cập nhật tồn kho thực tế.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* CỘT PHẢI: Bảng sản phẩm & Nút bấm */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex flex-col h-full overflow-hidden">
            {/* Header Bảng */}
            <div className="p-8 flex justify-between items-center border-b border-outline-variant/10">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">list_alt</span> Danh sách sản phẩm
              </h3>
              <button className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary-fixed px-4 py-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">add_circle</span> Thêm sản phẩm
              </button>
            </div>

            {/* Nội dung Bảng */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Mã SKU</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Tên sản phẩm</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Số lượng</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Đơn giá</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Thành tiền</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-8 py-6 font-mono text-sm font-bold text-primary">KA-MOD-202</td>
                    <td className="px-8 py-6">
                      <p className="text-base font-bold text-slate-900 mb-1">Module Cảm Biến X-Alpha</p>
                      <p className="text-xs text-slate-400 uppercase">Thiết bị IoT công nghiệp</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <Input type="number" defaultValue="150" className="w-24 h-10 mx-auto text-center bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-bold text-base shadow-sm" />
                    </td>
                    <td className="px-8 py-6 text-right font-medium text-slate-700 text-base">450.000 đ</td>
                    <td className="px-8 py-6 text-right font-bold text-primary text-base">67.500.000 đ</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-error/50 hover:text-error transition-colors"><span className="material-symbols-outlined text-xl">delete</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cụm Nút bấm Footer */}
            <div className="p-8 border-t border-outline-variant/10 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-6">
                <button className="text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">
                  Lưu bản nháp
                </button>
                <button className="text-base font-bold text-error hover:text-red-700 transition-colors">
                  Hủy bỏ
                </button>
              </div>
              <button className="bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/30 flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                Xác nhận nhập kho
                <span className="material-symbols-outlined text-xl">save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}