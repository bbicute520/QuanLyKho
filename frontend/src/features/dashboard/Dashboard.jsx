import React from 'react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* 1. Header: Tiêu đề trang - To, rõ theo chuẩn 4xl */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight text-[#091c35] mb-3">Trung tâm điều phối</h2>
        <p className="text-[#434654] text-base">Chào buổi sáng, hệ thống đang vận hành với hiệu suất 98%.</p>
      </div>

      {/* 2. KPI Bento Grid: Các con số thống kê quan trọng */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {/* Card lớn: Giá trị kho */}
        <div className="col-span-1 md:col-span-2 bg-[#003d9b] text-white p-10 rounded-xl shadow-xl shadow-[#003d9b]/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-4">Giá trị kho hiện tại</p>
            <h3 className="text-6xl font-black tracking-tighter mb-8 italic">4.820.500.000 <span className="text-xl opacity-60 font-medium not-italic uppercase">VND</span></h3>
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                <p className="text-xs opacity-70 uppercase font-bold mb-1">Nhập tháng này</p>
                <p className="text-2xl font-black">+12.5%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                <p className="text-xs opacity-70 uppercase font-bold mb-1">Xuất tháng này</p>
                <p className="text-2xl font-black">-8.2%</p>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-12 -bottom-12 text-[280px] opacity-10 rotate-12 transition-transform group-hover:scale-110 duration-700">monitoring</span>
        </div>

        {/* Card cảnh báo tồn kho */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/10 flex flex-col justify-between group hover:shadow-md transition-all">
          <div>
            <div className="w-14 h-14 bg-[#ffdbcf] rounded-xl flex items-center justify-center text-[#380d00] mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Cảnh báo tồn kho</p>
            <h4 className="text-5xl font-black text-[#091c35] mb-2">32</h4>
          </div>
          <p className="text-sm text-[#7b2600] font-black uppercase tracking-tighter italic">Sản phẩm sắp hết hàng</p>
        </div>

        {/* Card vận chuyển */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/10 flex flex-col justify-between group hover:shadow-md transition-all">
          <div>
            <div className="w-14 h-14 bg-[#b6c8fe] rounded-xl flex items-center justify-center text-[#415382] mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Đang vận chuyển</p>
            <h4 className="text-5xl font-black text-[#091c35] mb-2">08</h4>
          </div>
          <p className="text-sm text-[#4c5d8d] font-black uppercase tracking-tighter italic">Lô hàng đang tới kho</p>
        </div>
      </div>

      {/* 3. Đồ thị & Hoạt động gần đây */}
      <div className="grid grid-cols-12 gap-8">
        {/* Biểu đồ giả lập */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/10 h-full">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">equalizer</span> Lưu lượng hàng hóa (7 ngày qua)
              </h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs font-bold text-[#003d9b]"><div className="w-3 h-3 bg-[#003d9b] rounded-full"></div> Nhập</span>
                <span className="flex items-center gap-2 text-xs font-bold text-[#4c5d8d]"><div className="w-3 h-3 bg-[#4c5d8d] rounded-full"></div> Xuất</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4 px-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 items-center h-full justify-end group">
                  <div className="w-full bg-[#003d9b]/10 rounded-t-lg relative flex items-end justify-center overflow-hidden h-full">
                    <div style={{ height: `${h}%` }} className="w-full bg-[#003d9b] rounded-t-md transition-all group-hover:brightness-110 cursor-pointer"></div>
                  </div>
                  <div className="w-full bg-[#4c5d8d]/10 rounded-t-lg relative flex items-end justify-center overflow-hidden h-full">
                    <div style={{ height: `${h-20}%` }} className="w-full bg-[#4c5d8d] rounded-t-md transition-all group-hover:brightness-110 cursor-pointer"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-4 whitespace-nowrap uppercase">Thứ {i+2}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/10 flex flex-col h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Hoạt động gần đây</h3>
            <div className="space-y-8 flex-1">
              {[
                { type: 'in', user: 'Admin', code: 'GRN-452', time: '10 phút trước' },
                { type: 'out', user: 'Tuấn Lê', code: 'OUT-884', time: '1 giờ trước' },
                { type: 'in', user: 'Admin', code: 'GRN-451', time: '3 giờ trước' },
                { type: 'alert', user: 'Hệ thống', code: 'SKU-902', time: '5 giờ trước' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${
                    item.type === 'in' ? 'bg-[#003d9b] shadow-[#003d9b]/20' : item.type === 'out' ? 'bg-[#4c5d8d] shadow-[#4c5d8d]/20' : 'bg-[#ba1a1a] shadow-[#ba1a1a]/20'
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                      {item.type === 'in' ? 'south_west' : item.type === 'out' ? 'north_east' : 'priority_high'}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-black text-[#091c35] leading-tight mb-1">
                      {item.type === 'in' ? 'Nhập kho' : item.type === 'out' ? 'Xuất kho' : 'Cảnh báo tồn kho'}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{item.user} đã xử lý {item.code}</p>
                    <p className="text-xs text-[#003d9b] font-bold mt-2 uppercase tracking-tighter">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 text-sm font-bold text-[#003d9b] bg-[#dae2ff] hover:bg-[#c4d2ff] rounded-xl transition-all active:scale-95 uppercase tracking-widest">
              Xem tất cả nhật ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}