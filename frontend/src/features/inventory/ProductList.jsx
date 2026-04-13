import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Thêm useMutation, useQueryClient
import { 
  Search, Filter, MoreVertical, ChevronLeft, ChevronRight, 
  Loader2, AlertCircle, TrendingUp 
} from 'lucide-react';
import { toast } from 'sonner';

import Modal from '../../components/ui/Modal';
import ProductFilterForm from './ProductFilterForm';
import { productService } from '../../services/productService'; 

export default function ProductList() {
    const queryClient = useQueryClient(); // Khởi tạo bộ làm mới data
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        category: 'Tất cả',
        status: 'Tất cả',
        minStock: '',
    });

    // 1. API: Lấy danh sách sản phẩm
    const { data: products = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await productService.getAll({ pageNumber: 1, pageSize: 100 });
            return response?.data?.data || [];
        },
        onError: () => toast.error("Không thể kết nối máy chủ!")
    });

    // 2. API: Xóa sản phẩm
    const deleteMutation = useMutation({
        mutationFn: (id) => productService.delete(id),
        onSuccess: () => {
            toast.success("Xóa thành công!");
            queryClient.invalidateQueries(['products']); // Tự động load lại bảng
        },
        onError: () => toast.error("Lỗi khi xóa sản phẩm!")
    });

    // 3. Lọc dữ liệu
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return []; // Đề phòng lỗi crash map()

        return products.filter(product => {
            const matchesSearch = 
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(product.id || '').includes(searchTerm.toLowerCase());

            const matchesCategory = 
                activeFilters.category === 'Tất cả' || product.category === activeFilters.category;

            let matchesStatus = true;
            if (activeFilters.status === 'Hết hàng') matchesStatus = product.stock === 0;
            else if (activeFilters.status === 'Sắp hết') matchesStatus = product.stock > 0 && product.stock <= product.minStock;
            else if (activeFilters.status === 'Còn hàng') matchesStatus = product.stock > product.minStock;

            const matchesMinStock = 
                activeFilters.minStock === '' || product.stock >= parseInt(activeFilters.minStock);

            return matchesSearch && matchesCategory && matchesStatus && matchesMinStock;
        });
    }, [products, searchTerm, activeFilters]);

    // Thao tác nhanh (Đã cắm API Xóa)
    const handleAction = (action, id, name) => {
        if (action === 'delete') {
            if(window.confirm(`Xác nhận xóa sản phẩm: ${name}?`)) {
                deleteMutation.mutate(id);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto not-italic">
            {/* Page Header */}
            <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">
                    Danh sách sản phẩm
                </h2>
                <p className="text-slate-500 text-base max-w-lg font-medium">
                    Quản lý kho hàng với dữ liệu thời gian thực từ hệ thống.
                </p>
            </div>

            {/* KPI Summary (Giữ nguyên của sếp) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-primary">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tổng sản phẩm</p>
                    <span className="text-4xl font-black text-slate-900">{products.length}</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 focus-within:border-primary/50 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={20} className="text-slate-400" />
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-base py-2 font-bold outline-none"
                            placeholder="Tìm kiếm theo SKU, tên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`px-6 py-3 font-black text-[10px] uppercase rounded-lg flex items-center gap-2 ${
                            (activeFilters.category !== 'Tất cả' || activeFilters.status !== 'Tất cả')
                            ? 'bg-[#003d9b] text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                    >
                        <Filter size={16} /> Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/60">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sản phẩm</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Tồn kho</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Mức tối thiểu</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Trạng thái</th>
                                <th className="px-8 py-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* TRẠNG THÁI LOADING */}
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-primary mb-2" size={32} />
                                        <p className="text-xs font-black uppercase text-slate-400">Đang đồng bộ dữ liệu...</p>
                                    </td>
                                </tr>
                            )}

                            {/* TRẠNG THÁI LỖI */}
                            {isError && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-red-500">
                                        <AlertCircle className="mx-auto mb-2" size={32} />
                                        <p className="font-bold">Mất kết nối API. Vui lòng kiểm tra lại.</p>
                                    </td>
                                </tr>
                            )}

                            {/* RENDER DỮ LIỆU */}
                            {!isLoading && !isError && filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-black text-primary uppercase border border-slate-200">
                                                {product.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-base uppercase">{product.name}</p>
                                                <p className="text-[10px] text-[#003d9b] font-black font-mono">MA: SP-{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center text-lg font-black text-slate-700">{product.stock}</td>
                                    <td className="px-8 py-6 text-right font-mono font-bold text-slate-600">{product.minStock}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                                            product.stock > product.minStock ? 'bg-emerald-50 text-emerald-600' : 
                                            product.stock > 0 ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {product.stock > product.minStock ? 'Còn hàng' : product.stock > 0 ? 'Sắp hết' : 'Hết hàng'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {/* NÚT THAO TÁC (Đã gắn hàm gọi API xóa) */}
                                        <button 
                                            onClick={() => handleAction('delete', product.id, product.name)}
                                            className="p-2 text-slate-300 hover:text-slate-900 transition-colors"
                                        >
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Hiển thị <span className="text-slate-900">{filteredProducts.length}</span> / {products.length} sản phẩm
                    </p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-slate-200 bg-white" onClick={() => refetch()}><TrendingUp size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Modal Lọc */}
            <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Bộ lọc nâng cao">
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