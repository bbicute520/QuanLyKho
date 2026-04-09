import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, DownloadCloud, ShieldCheck } from 'lucide-react';
import { stockService } from '../../services/stockService';
import { toast } from 'sonner';

export default function Reports() {
  // 1. Quản lý trạng thái bộ lọc
  const [dateRange, setDateRange] = useState({ from: '2026-04-01', to: '2026-04-30' });
  const [fileFormat, setFileFormat] = useState('xlsx');

  const reportTypes = [
    { id: 'inventory', title: 'Báo cáo tồn kho tổng thể', desc: 'Chi tiết số lượng, giá trị vốn và vị trí.', icon: 'inventory_2' },
    { id: 'inward', title: 'Báo cáo nhập kho định kỳ', desc: 'Thống kê tất cả các phiếu nhập hàng.', icon: 'input' },
    { id: 'outward', title: 'Phân tích lưu lượng xuất kho', desc: 'Theo dõi mặt hàng xuất đi và dự báo.', icon: 'output' },
  ];

  // BỔ SUNG LOGIC: Hàm xử lý khi bấm nút "Làm mới"
  const handleRefresh = () => {
    setDateRange({ from: '2026-04-01', to: '2026-04-30' });
    setFileFormat('xlsx');
    toast.success("Đã làm mới bộ lọc!");
  };

  // 2. Hàm xử lý tải báo cáo từ API
  const handleDownload = async (reportId) => {
    try {
      toast.info("Hệ thống đang trích xuất dữ liệu...");
      const blob = await stockService.downloadReport(reportId, { ...dateRange, format: fileFormat });
      
      // Tạo link tải file tự động
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Báo_cáo_${reportId}_${Date.now()}.${fileFormat}`);
      document.body.appendChild(link);
      link.click();
      toast.success("Tải báo cáo thành công!");
    } catch (error) {
      toast.error("Lỗi khi tạo báo cáo!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-3 uppercase tracking-tight">Trung tâm báo cáo</h2>
        <p className="text-slate-500 font-medium">Trích xuất dữ liệu sang Excel để phân tích chuyên sâu.</p>
      </div>

      {/* Bộ lọc thật */}
      <div className="bg-white p-6 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 border border-slate-200 shadow-sm">
        <div className="flex-1 w-full space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400">Khoảng thời gian</label>
          <div className="flex items-center gap-3">
            <input 
              type="date" value={dateRange.from} 
              onChange={e => setDateRange({...dateRange, from: e.target.value})}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 outline-none w-full" 
            />
            <span className="font-bold text-slate-300">→</span>
            <input 
              type="date" value={dateRange.to} 
              onChange={e => setDateRange({...dateRange, to: e.target.value})}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 outline-none w-full" 
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400">Định dạng</label>
          <select 
            value={fileFormat} onChange={e => setFileFormat(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
          >
            <option value="xlsx">Microsoft Excel (.xlsx)</option>
            <option value="csv">CSV (Comma Separated)</option>
            <option value="pdf">PDF Report (A4)</option>
          </select>
        </div>
        {/* BỔ SUNG: Gắn sự kiện onClick vào nút */}
        <button 
          onClick={handleRefresh}
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-blue-700 transition-all shadow-md"
        >
          <RefreshCw size={18} /> LÀM MỚI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <motion.div 
            key={report.id} 
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 group hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">{report.icon}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{report.title}</h3>
            <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{report.desc}</p>
            <button 
              onClick={() => handleDownload(report.id)}
              className="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <DownloadCloud size={18} /> TẢI XUỐNG BẢN {fileFormat.toUpperCase()}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}