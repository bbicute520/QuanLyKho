import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, DownloadCloud, Loader2, RefreshCw, Search } from 'lucide-react';
import { reportService } from '../../services/reportService';
import { toast } from 'sonner';

export default function Reports() {
  const [dateRange, setDateRange] = useState({ from: '2026-04-01', to: '2026-04-30' });
  const [fileFormat, setFileFormat] = useState('xlsx');
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLogType, setActiveLogType] = useState('ALL');

  const reportTypes = [
    { id: 'inventory', title: 'Báo cáo tồn kho tổng thể', desc: 'Chi tiết số lượng, giá trị vốn và vị trí.', icon: 'inventory_2' },
    { id: 'inward', title: 'Báo cáo nhập kho định kỳ', desc: 'Thống kê tất cả các phiếu nhập hàng.', icon: 'input' },
    { id: 'outward', title: 'Phân tích lưu lượng xuất kho', desc: 'Theo dõi mặt hàng xuất đi và dự báo.', icon: 'output' },
  ];

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['report-transactions', dateRange.from, dateRange.to],
    queryFn: async () => {
      const response = await reportService.getTransactions({
        from: dateRange.from,
        to: dateRange.to,
        limit: 500
      });
      return Array.isArray(response?.data) ? response.data : [];
    }
  });

  const filteredLogs = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const rawType = String(transaction.type || transaction.transactionType || '').toUpperCase();
      const txType = rawType.includes('IMPORT') || rawType.includes('IN') || rawType.includes('NHAP') ? 'IN' : 'OUT';

      const matchesType = activeLogType === 'ALL' || txType === activeLogType;

      const matchesSearch =
        keyword === '' ||
        String(transaction.id || '').includes(keyword) ||
        String(transaction.productName || '').toLowerCase().includes(keyword) ||
        String(transaction.note || '').toLowerCase().includes(keyword);

      return matchesType && matchesSearch;
    });
  }, [transactions, searchTerm, activeLogType]);

  const handleRefresh = () => {
    setDateRange({ from: '2026-04-01', to: '2026-04-30' });
    setFileFormat('xlsx');
    setSearchTerm('');
    setActiveLogType('ALL');
    toast.success('Đã làm mới bộ lọc');
  };

  const handleDownload = async (reportId) => {
    const defaultName = `Bao_cao_${reportId}_${Date.now()}`;

    const triggerDownload = (blobData, extension) => {
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${defaultName}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    };

    try {
      setDownloadingId(reportId);
      toast.info('Hệ thống đang trích xuất dữ liệu');

      const response = await reportService.exportExcel({
        from: dateRange.from,
        to: dateRange.to,
        reportType: reportId,
        format: fileFormat,
      });
      triggerDownload(response.data, fileFormat);
      toast.success('Tải báo cáo thành công');
    } catch {
      try {
        const fallback = await reportService.exportFallbackCsv({
          from: dateRange.from,
          to: dateRange.to,
          reportType: reportId,
        });
        triggerDownload(fallback.blob, fallback.extension || 'csv');
        toast.success('Report Service chưa sẵn sàng, đã tải bản CSV dự phòng');
      } catch {
        toast.error('Không thể tải báo cáo. Vui lòng kiểm tra Report Service');
      }
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-3 uppercase tracking-tight">Trung tâm báo cáo & nhật ký</h2>
        <p className="text-slate-500 font-medium">Một màn hình cho cả xuất báo cáo và tra cứu logs nhập xuất.</p>
      </div>

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
            <option value="xlsx">Tệp Excel (.xlsx)</option>
            <option value="csv">Tệp CSV (phân tách dấu phẩy)</option>
          </select>
        </div>
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
              disabled={downloadingId === report.id}
              className="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <DownloadCloud size={18} /> {downloadingId === report.id ? 'ĐANG TẢI...' : `TẢI XUỐNG BẢN ${fileFormat.toUpperCase()}`}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Nhật ký giao dịch</h3>
          <div className="inline-flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveLogType('ALL')}
              className={`px-3 py-2 text-xs font-black uppercase rounded-md ${activeLogType === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveLogType('IN')}
              className={`px-3 py-2 text-xs font-black uppercase rounded-md inline-flex items-center gap-1 ${activeLogType === 'IN' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
            >
              <ArrowDownLeft size={14} /> Nhập
            </button>
            <button
              onClick={() => setActiveLogType('OUT')}
              className={`px-3 py-2 text-xs font-black uppercase rounded-md inline-flex items-center gap-1 ${activeLogType === 'OUT' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}
            >
              <ArrowUpRight size={14} /> Xuất
            </button>
          </div>
        </div>

        <div className="mb-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Tìm theo ID giao dịch, tên sản phẩm, ghi chú..."
            className="w-full pl-10 pr-3 h-11 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse">
            <colgroup>
              <col className="w-[90px]" />
              <col className="w-[280px]" />
              <col className="w-[120px]" />
              <col className="w-[120px]" />
              <col className="w-[220px]" />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black">Mã GD</th>
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black">Sản phẩm</th>
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black">Loại</th>
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black text-right">Số lượng</th>
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black">Thời gian</th>
                <th className="px-2 py-3 text-[11px] uppercase tracking-widest text-slate-500 font-black">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center">
                    <Loader2 className="mx-auto animate-spin text-blue-700" size={24} />
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs font-black uppercase tracking-widest">
                    Không có giao dịch phù hợp
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item, index) => {
                  const rawType = String(item.type || item.transactionType || '').toUpperCase();
                  const isIn = rawType.includes('IMPORT') || rawType.includes('IN') || rawType.includes('NHAP');
                  const txDate = item.date || item.transactionDate;

                  return (
                    <tr key={`${item.id || index}-${txDate || ''}`} className="border-b border-slate-100">
                      <td className="px-2 py-3 text-sm font-mono font-bold text-slate-700">{item.id}</td>
                      <td className="px-2 py-3 text-sm font-bold text-slate-900">{item.productName || '-'}</td>
                      <td className="px-2 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-black ${isIn ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                          {isIn ? 'Nhập' : 'Xuất'}
                        </span>
                      </td>
                      <td className="px-2 py-3 text-right text-sm font-black text-slate-800">{item.quantity || 0}</td>
                      <td className="px-2 py-3 text-sm text-slate-600 whitespace-nowrap">{txDate ? new Date(txDate).toLocaleString() : '-'}</td>
                      <td className="px-2 py-3 text-sm text-slate-500">{item.note || '-'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}