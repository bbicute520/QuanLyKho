import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import SupplierFilterForm from './SupplierFilterForm';

export default function SupplierList() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        status: 'Tất cả',
        region: 'Tất cả'
    });

    const mockSuppliers = [
        { 
            id: 'SUP-2024-001', 
            name: 'Kinetic Alliance Ltd.', 
            contact: 'Lê Minh Tuấn', 
            phone: '090 123 4567', 
            email: 'tuan.lm@kinetic.com',
            categories: ['Điện tử', 'Âm thanh'], 
            status: 'Đang hợp tác' 
        },
        { 
            id: 'SUP-2024-042', 
            name: 'Global Logistics Co.', 
            contact: 'Nguyễn Thị Hồng', 
            phone: '091 888 9999', 
            email: 'hong.nt@globallog.vn',
            categories: ['Vận tải'], 
            status: 'Đang hợp tác' 
        },
        { 
            id: 'SUP-2023-115', 
            name: 'Fashion Hub Supply', 
            contact: 'Trần Đại Quang', 
            phone: '098 555 1234', 
            email: 'quang.td@fashion.com',
            categories: ['Thời trang', 'Phụ kiện', 'Gia dụng'], 
            status: 'Đang gia hạn' 
        }
    ];

    return (
        <div className="max-w-7xl mx-auto not-italic">
            {/* Header */}
            <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">Danh sách đối tác</h2>
                <p className="text-slate-500 font-medium">Hệ thống quản lý chuỗi cung ứng và quan hệ nhà cung cấp SyncStock.</p>
            </div>

            {/* KPI Summary (giữ nguyên cấu trúc của sếp) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* ... (Các khối KPI sếp đã viết) */}
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-8">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 focus-within:border-[#003d9b]/50 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={20} className="text-slate-300" />
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-base py-2 text-slate-900 font-bold outline-none"
                            placeholder="Tìm kiếm theo tên, mã hoặc ngành hàng..."
                            type="text"
                        />
                    </div>
                    <button 
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                            (activeFilters.categories.length > 0 || activeFilters.status !== 'Tất cả')
                            ? 'bg-[#003d9b] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                    >
                        <Filter size={16} /> Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhà cung cấp</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngành hàng</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Liên hệ</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tình trạng</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockSuppliers.map((sup) => (
                                <tr key={sup.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-900 text-base uppercase tracking-tight">{sup.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sup.id}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                                            {sup.categories.map(cat => (
                                                <span key={cat} className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase bg-blue-50 text-[#003d9b] border border-blue-100">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-slate-700">{sup.contact}</p>
                                        <p className="text-xs text-slate-400 font-medium">{sup.email}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            sup.status === 'Đang hợp tác' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                        }`}>
                                            {sup.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={20}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hiển thị <span className="text-slate-900">3</span> / 124 đối tác</p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-slate-200 bg-white opacity-30" disabled><ChevronLeft size={18}/></button>
                        <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50"><ChevronRight size={18}/></button>
                    </div>
                </div>
            </div>

            {/* Modal Lọc */}
            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Lọc nhà cung cấp"
            >
                <SupplierFilterForm 
                    initialFilters={activeFilters}
                    onApply={(f) => { setActiveFilters(f); setIsFilterModalOpen(false); }}
                    onReset={() => setActiveFilters({ categories: [], status: 'Tất cả', region: 'Tất cả' })}
                    onClose={() => setIsFilterModalOpen(false)}
                />
            </Modal>
        </div>
    );
}