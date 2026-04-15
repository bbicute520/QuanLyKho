import React, { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Loader2, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../../components/ui/Modal';
import SupplierFilterForm from './SupplierFilterForm';
import { supplierService } from '../../services/supplierService';

export default function SupplierList() {
    const queryClient = useQueryClient();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [createForm, setCreateForm] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        isActive: true
    });
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        status: 'Tất cả',
        region: 'Tất cả'
    });

    const { data: suppliers = [], isLoading, isError } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const response = await supplierService.getAll();
            return response.data || [];
        }
    });

    const createSupplierMutation = useMutation({
        mutationFn: (payload) => supplierService.create(payload),
        onSuccess: () => {
            toast.success('Thêm nhà cung cấp thành công');
            setCreateForm({
                name: '',
                contactPerson: '',
                phone: '',
                email: '',
                address: '',
                isActive: true
            });
            setIsCreateModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            queryClient.invalidateQueries({ queryKey: ['supplier-categories'] });
        },
        onError: (error) => {
            const message = error?.response?.data?.title || error?.response?.data || 'Không thể thêm nhà cung cấp';
            toast.error(String(message));
        }
    });

    const handleCreateInput = (field, value) => {
        setCreateForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreateSupplier = (event) => {
        event.preventDefault();

        const name = createForm.name.trim();
        if (!name) {
            toast.warning('Vui lòng nhập tên nhà cung cấp');
            return;
        }

        createSupplierMutation.mutate({
            name,
            contactPerson: createForm.contactPerson.trim() || null,
            phone: createForm.phone.trim() || null,
            email: createForm.email.trim() || null,
            address: createForm.address.trim() || null,
            isActive: createForm.isActive
        });
    };

    const filteredSuppliers = useMemo(() => {
        if (!Array.isArray(suppliers)) return [];

        return suppliers.filter((sup) => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                sup.name?.toLowerCase().includes(searchLower) ||
                String(sup.id || '').includes(searchLower) ||
                sup.contactPerson?.toLowerCase().includes(searchLower) ||
                sup.phone?.toLowerCase().includes(searchLower) ||
                sup.email?.toLowerCase().includes(searchLower) ||
                sup.address?.toLowerCase().includes(searchLower);

            const statusLabel = sup.isActive ? 'Đang hợp tác' : 'Tạm dừng';
            const matchesStatus = activeFilters.status === 'Tất cả' || statusLabel === activeFilters.status;
            const matchesRegion = activeFilters.region === 'Tất cả' || (sup.address || '').includes(activeFilters.region);
            const matchesCategory =
                activeFilters.categories.length === 0 ||
                activeFilters.categories.some((c) => (sup.address || '').includes(c));

            return matchesSearch && matchesStatus && matchesRegion && matchesCategory;
        });
    }, [suppliers, searchTerm, activeFilters]);

    return (
        <div className="max-w-7xl mx-auto not-italic">
            <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">Danh sách đối tác</h2>
                    <p className="text-slate-500 font-medium">Hệ thống quản lý chuỗi cung ứng và quan hệ nhà cung cấp SyncStock.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#003d9b] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} /> Thêm nhà cung cấp
                </button>
            </div>

            <div className="mb-8">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 focus-within:border-[#003d9b]/50 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search size={20} className="text-slate-300" />
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-base py-2 text-slate-900 font-bold outline-none"
                            placeholder="Tìm kiếm theo tên, mã hoặc thông tin liên hệ..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                            (activeFilters.categories.length > 0 || activeFilters.status !== 'Tất cả' || activeFilters.region !== 'Tất cả')
                                ? 'bg-[#003d9b] text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                    >
                        <Filter size={16} /> Bộ lọc nâng cao
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhà cung cấp</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Liên hệ</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Địa chỉ</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tình trạng</th>
                                <th className="px-8 py-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading && (
                                <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#003d9b]" size={32} /></td></tr>
                            )}
                            {isError && (
                                <tr><td colSpan="5" className="py-20 text-center text-red-500"><AlertCircle className="mx-auto" size={32} /><p className="font-bold mt-2">Lỗi kết nối API!</p></td></tr>
                            )}
                            {!isLoading && !isError && filteredSuppliers.length === 0 && (
                                <tr><td colSpan="5" className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Không tìm thấy đối tác nào</td></tr>
                            )}

                            {!isLoading && !isError && filteredSuppliers.map((sup) => (
                                <tr key={sup.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-900 text-base uppercase tracking-tight">{sup.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {sup.id}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-slate-700">{sup.contactPerson || 'Chưa có'}</p>
                                        <p className="text-xs text-slate-400 font-medium">{sup.phone || sup.email || 'Chưa có'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm text-slate-600 font-medium">{sup.address || 'Chưa có địa chỉ'}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            sup.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {sup.isActive ? 'Đang hợp tác' : 'Tạm dừng'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Hiển thị <span className="text-slate-900">{filteredSuppliers.length}</span> / {suppliers.length} đối tác
                    </p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-slate-200 bg-white opacity-30" disabled><ChevronLeft size={18} /></button>
                        <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50"><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>

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

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Thêm nhà cung cấp"
            >
                <form onSubmit={handleCreateSupplier} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Tên nhà cung cấp</label>
                        <input
                            value={createForm.name}
                            onChange={(e) => handleCreateInput('name', e.target.value)}
                            placeholder="Nhập tên nhà cung cấp"
                            className="w-full h-11 px-3 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Người liên hệ</label>
                            <input
                                value={createForm.contactPerson}
                                onChange={(e) => handleCreateInput('contactPerson', e.target.value)}
                                placeholder="Tên người liên hệ"
                                className="w-full h-11 px-3 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Số điện thoại</label>
                            <input
                                value={createForm.phone}
                                onChange={(e) => handleCreateInput('phone', e.target.value)}
                                placeholder="0900000000"
                                className="w-full h-11 px-3 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email</label>
                        <input
                            type="email"
                            value={createForm.email}
                            onChange={(e) => handleCreateInput('email', e.target.value)}
                            placeholder="example@domain.com"
                            className="w-full h-11 px-3 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Địa chỉ</label>
                        <input
                            value={createForm.address}
                            onChange={(e) => handleCreateInput('address', e.target.value)}
                            placeholder="Ví dụ: TP HCM"
                            className="w-full h-11 px-3 border border-slate-200 rounded-lg font-semibold outline-none focus:border-blue-500"
                        />
                    </div>

                    <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            checked={createForm.isActive}
                            onChange={(e) => handleCreateInput('isActive', e.target.checked)}
                            className="w-4 h-4 accent-[#003d9b]"
                        />
                        Đánh dấu là đang hợp tác
                    </label>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="px-4 py-2 rounded-lg text-sm font-black uppercase text-slate-500 hover:bg-slate-100"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={createSupplierMutation.isPending}
                            className="px-5 py-2 rounded-lg text-sm font-black uppercase bg-[#003d9b] text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {createSupplierMutation.isPending ? 'Đang lưu...' : 'Lưu nhà cung cấp'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
