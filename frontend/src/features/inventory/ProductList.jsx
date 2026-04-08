import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Package, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import ProductFilterForm from './ProductFilterForm';

export default function ProductList() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        category: 'Tất cả',
        status: 'Tất cả',
        minStock: '',
    });

    const mockProducts = [
        { 
            id: 1, 
            sku: 'WAT-K22-421', 
            name: 'Đồng hồ Kinetic Series 5', 
            category: 'Phụ kiện', 
            stock: 142, 
            price: '2.500.000',
            status: 'Còn hàng' 
        },
        { 
            id: 2, 
            sku: 'AUD-P99-900', 
            name: 'Tai nghe Studio Pro Wireless', 
            category: 'Âm thanh', 
            stock: 0, 
            price: '4.200.000',
            status: 'Hết hàng' 
        },
        { 
            id: 3, 
            sku: 'SHO-X2-RED', 
            name: 'Giày thể thao Swift Runner', 
            category: 'Thời trang', 
            stock: 12, 
            price: '1.850.000',
            status: 'Sắp hết' 
        }
    ];

    return (
        <div className="max-w-7xl mx-auto not-italic">
            {/* Page Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">
                        Danh sách sản phẩm
                    </h2>
                    <p className="text-slate-500 text-base max-w-lg font-medium">
                        Quản lý kho hàng kỹ thuật số với độ chính xác cao. Theo dõi tồn kho và luồng hàng hóa theo thời gian thực.
                    </p>
                </div>
            </div>

            {/* KPI Summary (Y hệt SupplierList) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* Tổng sản phẩm */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-primary relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tổng sản phẩm</p>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">1.284</span>
                        <span className="text-sm font-bold text-primary bg-primary-fixed px-3 py-1 rounded-md">+12%</span>
                    </div>
                </div>

                {/* Sắp hết hàng */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-tertiary-container relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sắp hết hàng</p>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter text-tertiary">42</span>
                        <span className="text-sm font-bold text-tertiary bg-tertiary-fixed px-3 py-1 rounded-md">Cần nhập</span>
                    </div>
                </div>

                {/* Đã hết hàng */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-error relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Đã hết hàng</p>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter text-error">12</span>
                        <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
                    </div>
                </div>

                {/* Giá trị kho */}
                <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary-container relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Giá trị kho</p>
                    <div className="flex items-end justify-between">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase">2.4B</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">VNĐ</span>
                    </div>
                </div>
            </div>

            {/* Search Bar Section */}
            <div className="mb-8">
                <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4 group focus-within:border-primary/50 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={20} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-base py-2 placeholder:text-slate-400 text-on-surface font-bold outline-none"
                            placeholder="Tìm kiếm theo mã SKU, tên sản phẩm hoặc danh mục..."
                            type="text"
                        />
                    </div>
                    <div className="h-10 w-px bg-outline-variant/20 hidden md:block"></div>
                    <button 
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${
                            (activeFilters.category !== 'Tất cả' || activeFilters.status !== 'Tất cả')
                            ? 'bg-[#003d9b] text-white shadow-lg shadow-blue-900/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                        }`}
                    >
                        <Filter size={16} /> Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-container-low/60">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sản phẩm</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh mục</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Tồn kho</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Giá nhập</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Trạng thái</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {mockProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-surface-container-low/40 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center font-black text-lg text-primary uppercase">
                                                {product.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-base mb-1 uppercase tracking-tight">
                                                    {product.name}
                                                </p>
                                                <p className="text-[10px] text-[#003d9b] font-black font-mono tracking-widest">
                                                    SKU: {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center text-lg font-black text-slate-700">
                                        {product.stock}
                                    </td>
                                    <td className="px-8 py-6 text-right text-base font-bold text-slate-600 font-mono">
                                        {product.price}
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`whitespace-nowrap inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            product.status === 'Còn hàng' ? 'bg-emerald-50 text-emerald-600' : 
                                            product.status === 'Sắp hết' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Y hệt SupplierList) */}
                <div className="p-8 border-t border-outline-variant/10 bg-surface-container-lowest mt-auto flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Hiển thị <span className="text-slate-900 font-black">1-3</span> trong tổng số <span className="text-slate-900 font-black">1.284</span> sản phẩm
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-surface-container-low transition-all disabled:opacity-30" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white text-sm font-bold shadow-md shadow-primary/20">1</button>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low text-sm font-bold transition-all">2</button>
                        <span className="px-3 text-slate-400 text-lg">...</span>
                        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-surface-container-low transition-all">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Lọc (Gắn ProductFilterForm của sếp vào đây) */}
            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Bộ lọc nâng cao"
            >
                <ProductFilterForm 
                    initialFilters={activeFilters}
                    onApply={(f) => { setActiveFilters(f); setIsFilterModalOpen(false); }}
                    onReset={() => setActiveFilters({ category: 'Tất cả', status: 'Tất cả', minStock: '' })}
                    onClose={() => setIsFilterModalOpen(false)}
                />
            </Modal>
        </div>
    );
}