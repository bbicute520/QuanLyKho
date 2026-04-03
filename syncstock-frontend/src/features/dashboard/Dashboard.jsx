import React from 'react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Chào mừng */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight text-on-surface mb-2">Trung tâm điều phối</h2>
        <p className="text-on-surface-variant text-sm">Chào buổi sáng, hệ thống đang vận hành với hiệu suất 98%.</p>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-2">Giá trị kho hiện tại</p>
            <h3 className="text-5xl font-black tracking-tighter mb-6">4.820.500.000 <span className="text-lg opacity-60 font-medium">VNĐ</span></h3>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] opacity-70 uppercase font-bold">Nhập tháng này</p>
                <p className="text-lg font-bold">+12.5%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] opacity-70 uppercase font-bold">Xuất tháng này</p>
                <p className="text-lg font-bold">-8.2%</p>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[200px] opacity-10 rotate-12">monitoring</span>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <div className="w-12 h-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-on-tertiary-fixed mb-6">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Cảnh báo tồn kho</p>
          <h4 className="text-4xl font-black text-on-surface mb-2">32</h4>
          <p className="text-xs text-tertiary font-bold">Sản phẩm sắp hết hàng</p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-6">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Đang vận chuyển</p>
          <h4 className="text-4xl font-black text-on-surface mb-2">08</h4>
          <p className="text-xs text-secondary font-bold">Lô hàng đang tới kho</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Biểu đồ giả lập (Visual Placeholder) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Lưu lượng hàng hóa (7 ngày qua)</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-primary"><div className="w-2 h-2 bg-primary rounded-full"></div> Nhập</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-secondary"><div className="w-2 h-2 bg-secondary rounded-full"></div> Xuất</span>
              </div>
            </div>
            {/* Thanh biểu đồ giả bằng Tailwind */}
            <div className="flex items-end justify-between h-48 gap-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                  <div className="w-full bg-primary/10 rounded-t-lg relative group">
                    <div style={{ height: `${h}%` }} className="bg-primary rounded-t-lg transition-all group-hover:brightness-110"></div>
                  </div>
                  <div className="w-full bg-secondary/10 rounded-t-lg relative group">
                    <div style={{ height: `${h-20}%` }} className="bg-secondary rounded-t-lg transition-all group-hover:brightness-110"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2">Thứ {i+2}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Hoạt động gần đây</h3>
            <div className="space-y-6">
              {[
                { type: 'in', user: 'Admin', code: 'GRN-452', time: '10 phút trước' },
                { type: 'out', user: 'Tuấn Lê', code: 'OUT-884', time: '1 giờ trước' },
                { type: 'in', user: 'Admin', code: 'GRN-451', time: '3 giờ trước' },
                { type: 'alert', user: 'Hệ thống', code: 'SKU-902', time: '5 giờ trước' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                    item.type === 'in' ? 'bg-primary' : item.type === 'out' ? 'bg-secondary' : 'bg-error'
                  }`}>
                    <span className="material-symbols-outlined text-sm">
                      {item.type === 'in' ? 'south_west' : item.type === 'out' ? 'north_east' : 'priority_high'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">
                      {item.type === 'in' ? 'Nhập kho' : item.type === 'out' ? 'Xuất kho' : 'Cảnh báo hết hàng'}
                    </p>
                    <p className="text-[10px] text-slate-500">{item.user} xử lý đơn {item.code}</p>
                    <p className="text-[10px] text-primary font-medium mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-xs font-bold text-primary bg-primary-fixed hover:bg-primary-container/20 rounded-xl transition-colors">
              Xem tất cả nhật ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}