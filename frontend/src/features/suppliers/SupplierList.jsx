import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'; // BỔ SUNG: Dùng để gọi API
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import SupplierFilterForm from './SupplierFilterForm';
import { supplierService } from '../../services/supplierService'; // BỔ SUNG: Import Service

export default function SupplierList() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // BỔ SUNG: State cho thanh tìm kiếm
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        status: 'Tất cả',
        region: 'Tất cả'
    });

    // CẮM DÂY API: Kéo danh sách đối tác từ API Gateway
    const { data: suppliers = [], isLoading, isError } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const response = await supplierService.getAll();
            return response.data || response;
        }
    });

    // LOGIC LỌC DỮ LIỆU TẠI FRONTEND
    const filteredSuppliers = useMemo(() => {
        if (!Array.isArray(suppliers)) return [];
        
        return suppliers.filter(sup => {
            // Lọc theo text gõ vào ô search
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                sup.name?.toLowerCase().includes(searchLower) ||
                sup.id?.toLowerCase().includes(searchLower) ||
                sup.categories?.some(c => c.toLowerCase().includes(searchLower));

            // Lọc theo trạng thái & khu vực
            const matchesStatus = activeFilters.status === 'Tất cả' || sup.status === activeFilters.status;
            const matchesRegion = activeFilters.region === 'Tất cả' || sup.region === activeFilters.region;

            // Lọc theo mảng ngành hàng
            const matchesCategory = activeFilters.categories.length === 0 || 
                sup.categories?.some(c => activeFilters.categories.includes(c));

            return matchesSearch && matchesStatus && matchesRegion && matchesCategory;
        });
    }, [suppliers, searchTerm, activeFilters]);

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
                            value={searchTerm} // GẮN STATE
                            onChange={(e) => setSearchTerm(e.target.value)} // GẮN SỰ KIỆN GÕ PHÍM
                        />
                    </div>
                    <button 
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                            (activeFilters.categories.length > 0 || activeFilters.status !== 'Tất cả' || activeFilters.region !== 'Tất cả')
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
                            {/* RENDER TRẠNG THÁI ĐANG TẢI / LỖI */}
                            {isLoading && (
                                <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#003d9b]" size={32} /></td></tr>
                            )}
                            {isError && (
                                <tr><td colSpan="5" className="py-20 text-center text-red-500"><AlertCircle className="mx-auto" size={32} /><p className="font-bold mt-2">Lỗi kết nối API!</p></td></tr>
                            )}
                            {!isLoading && !isError && filteredSuppliers.length === 0 && (
                                <tr><td colSpan="5" className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Không tìm thấy đối tác nào</td></tr>
                            )}

                            {/* RENDER DỮ LIỆU ĐÃ LỌC TỪ API */}
                            {!isLoading && !isError && filteredSuppliers.map((sup) => (
                                <tr key={sup.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-900 text-base uppercase tracking-tight">{sup.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sup.id}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                                            {(sup.categories || []).map(cat => (
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
                                            sup.status === 'Đang hợp tác' ? 'bg-emerald-50 text-emerald-600' : 
                                            sup.status === 'Tạm dừng' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
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

                {/* Pagination (Cập nhật số đếm bằng số liệu thật) */}
                <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Hiển thị <span className="text-slate-900">{filteredSuppliers.length}</span> / {suppliers.length} đối tác
                    </p>
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