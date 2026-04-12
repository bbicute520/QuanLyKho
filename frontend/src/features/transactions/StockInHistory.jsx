import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Loader2, History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { stockService } from '../../services/stockService';

export default function StockInHistory() {
    // 1. State điều khiển Tab và Thanh tìm kiếm
    const [activeTab, setActiveTab] = useState('IN'); // Mặc định mở tab Nhập kho ('IN')
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Lấy dữ liệu từ "Database giả"
    const { data: history = [], isLoading } = useQuery({
        queryKey: ['stock-history'],
        queryFn: async () => {
            const res = await stockService.getHistory();
            return res.data;
        }
    });

    // 3. Logic Lọc dữ liệu 2 lớp: Vừa theo Tab, vừa theo chữ sếp gõ
    const filteredHistory = history.filter(ticket => {
        const matchTab = ticket.type === activeTab;
        const matchSearch = ticket.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (ticket.partner && ticket.partner.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchTab && matchSearch;
    });

    return (
        <div className="max-w-7xl mx-auto not-italic">
            {/* --- Tiêu đề trang --- */}
            <div className="mb-8">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase flex items-center gap-3">
                    Nhật ký giao dịch
                </h2>
                <p className="text-slate-500 text-base max-w-lg font-medium">
                    Tra cứu và kiểm soát toàn bộ luồng hàng hóa nhập và xuất khỏi hệ thống.
                </p>
            </div>

            {/* --- HAI TAB ĐIỀU KHIỂN (NHẬP / XUẤT) --- */}
            <div className="flex border-b border-outline-variant/20 mb-8 gap-8">
                <button 
                    onClick={() => setActiveTab('IN')}
                    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                        activeTab === 'IN' ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    <ArrowDownLeft size={18} /> Lịch sử Nhập kho
                    {activeTab === 'IN' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-700 rounded-t-full"></div>}
                </button>
                <button 
                    onClick={() => setActiveTab('OUT')}
                    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                        activeTab === 'OUT' ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    <ArrowUpRight size={18} /> Lịch sử Xuất kho
                    {activeTab === 'OUT' && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-600 rounded-t-full"></div>}
                </button>
            </div>

            {/* --- THANH TÌM KIẾM --- */}
            <div className="mb-8">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group focus-within:border-blue-500/50 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={20} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-base py-2 placeholder:text-slate-400 text-slate-900 font-bold outline-none"
                            placeholder="Tìm kiếm theo mã phiếu, tên đối tác..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                    <button className="px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100">
                        <Filter size={16} /> Bộ lọc
                    </button>
                </div>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50/60">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Mã phiếu</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Đối tác / Chi nhánh</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Mặt hàng</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Tổng giá trị</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Trạng thái</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-blue-600 mb-2" size={32} />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Đang tải...</p>
                                    </td>
                                </tr>
                            ) : filteredHistory.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                        Không tìm thấy giao dịch nào phù hợp
                                    </td>
                                </tr>
                            ) : (
                                filteredHistory.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'IN' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    <History size={20} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-base mb-1 uppercase tracking-tight">
                                                        {ticket.ticketCode}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 font-black font-mono tracking-widest">
                                                        {ticket.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-slate-700">{ticket.partner || 'Không xác định'}</span>
                                        </td>
                                        <td className="px-8 py-6 text-center text-lg font-black text-slate-700">
                                            {ticket.itemsCount}
                                        </td>
                                        <td className="px-8 py-6 text-right text-base font-bold text-slate-600 font-mono">
                                            {ticket.totalValue?.toLocaleString()} đ
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`whitespace-nowrap inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                ticket.status === 'Hoàn tất' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}