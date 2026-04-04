import React from 'react';

export default function Reports() {
  const reportTypes = [
    { id: 1, title: 'Báo cáo tồn kho tổng thể', desc: 'Chi tiết số lượng, giá trị vốn và vị trí của tất cả sản phẩm.', icon: 'inventory_2', lastGen: '03/04/2026' },
    { id: 2, title: 'Báo cáo nhập kho định kỳ', desc: 'Thống kê tất cả các phiếu nhập và biến động tăng tài sản.', icon: 'input', lastGen: '01/04/2026' },
    { id: 3, title: 'Phân tích lưu lượng xuất kho', desc: 'Theo dõi các mặt hàng xuất đi nhiều nhất và dự báo nhu cầu.', icon: 'output', lastGen: '02/04/2026' },
    { id: 4, title: 'Hiệu suất nhà cung cấp', desc: 'Đánh giá thời gian giao hàng và tỷ lệ hàng lỗi của đối tác.', icon: 'local_shipping', lastGen: '28/03/2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black tracking-tight text-on-surface mb-2">Trung tâm báo cáo</h2>
        <p className="text-on-surface-variant max-w-2xl">Trích xuất dữ liệu kho hàng sang định dạng Excel để phục vụ phân tích chuyên sâu và lưu trữ ngoại tuyến.</p>
      </div>

      {/* Filter Section (Bento Box) */}
      <div className="bg-surface-container-low p-6 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 border border-outline-variant/10">
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Khoảng thời gian báo cáo</label>
          <div className="flex items-center gap-4">
            <input type="date" className="bg-white border-none rounded-xl px-4 py-2 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-primary/20 w-full" defaultValue="2026-03-01" />
            <span className="text-slate-400 font-bold">→</span>
            <input type="date" className="bg-white border-none rounded-xl px-4 py-2 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-primary/20 w-full" defaultValue="2026-03-31" />
          </div>
        </div>
        <div className="w-full md:w-64">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Định dạng file</label>
          <select className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-primary/20 w-full appearance-none">
            <option>Microsoft Excel (.xlsx)</option>
            <option>CSV (Comma Separated)</option>
            <option>PDF Report (A4)</option>
          </select>
        </div>
        <button className="w-full md:w-auto mt-6 md:mt-0 bg-on-background text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-sm">refresh</span>
          Làm mới dữ liệu
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/5 group hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">{report.icon}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lần cuối tạo</p>
                <p className="text-xs font-bold text-on-surface">{report.lastGen}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-on-surface mb-2">{report.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-8">{report.desc}</p>
            
            {/* Nhúng link tải Excel theo yêu cầu */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert('Đang khởi tạo file Excel... Trình duyệt sẽ tự động tải xuống sau giây lát.'); }}
              className="inline-flex items-center gap-3 bg-primary-fixed text-primary px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Tải xuống bản Excel
            </a>
          </div>
        ))}
      </div>

      {/* Visual Information Bar */}
      <div className="mt-12 p-6 rounded-2xl bg-secondary-container/20 border border-secondary-container/10 flex items-center gap-4">
        <span className="material-symbols-outlined text-secondary">verified_user</span>
        <p className="text-xs text-on-secondary-container font-medium">
          Tất cả báo cáo được bảo mật và đóng dấu xác thực bởi hệ thống <strong>SyncStock WMS</strong>. Dữ liệu được trích xuất trực tiếp từ cơ sở dữ liệu thời gian thực.
        </p>
      </div>
    </div>
  );
}