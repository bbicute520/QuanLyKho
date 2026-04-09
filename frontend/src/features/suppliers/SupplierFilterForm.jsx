import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // BỔ SUNG: Dùng gọi API
import { Check, RotateCcw, Loader2 } from 'lucide-react';
import { supplierService } from '../../services/supplierService'; // BỔ SUNG: Import service

export default function SupplierFilterForm({ onApply, onReset, onClose, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters || {
    categories: [], 
    status: 'Tất cả',
    region: 'Tất cả'
  });

  // CẮM DÂY API: Lấy danh mục động từ Backend
  const { data: dbCategories = [], isLoading } = useQuery({
      queryKey: ['supplier-categories'],
      queryFn: async () => {
          const response = await supplierService.getCategories();
          return response.data || response;
      }
  });

  // Áp dụng data API (nếu API sập hoặc chưa load xong thì hiển thị tạm cái cũ để không bể UI)
  const allCategories = dbCategories.length > 0 ? dbCategories.map(c => c.name || c) : ['Điện tử', 'Âm thanh', 'Phụ kiện', 'Thời trang', 'Gia dụng', 'Vận tải'];
  
  const statuses = ['Tất cả', 'Đang hợp tác', 'Đang gia hạn', 'Tạm dừng'];
  const regions = ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Quốc tế'];

  const toggleCategory = (cat) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  return (
    <div className="space-y-8 not-italic">
      {/* 1. Lọc theo Ngành hàng */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b] flex items-center gap-2">
            Ngành hàng cung ứng
            {isLoading && <Loader2 size={12} className="animate-spin" />}
        </label>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                filters.categories.includes(cat)
                ? 'bg-[#003d9b] border-[#003d9b] text-white shadow-md'
                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Lọc theo Tình trạng */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">Trạng thái đối tác</label>
        <div className="grid grid-cols-2 gap-3">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilters({ ...filters, status: s })}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all ${
                filters.status === s 
                ? 'border-[#003d9b] bg-blue-50 text-[#003d9b]' 
                : 'border-slate-50 bg-slate-50/50 text-slate-400'
              }`}
            >
              <span className="text-sm font-black uppercase tracking-tight">{s}</span>
              {filters.status === s && <Check size={16} strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lọc theo Khu vực */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">Khu vực trụ sở</label>
        <select 
          value={filters.region}
          onChange={(e) => setFilters({...filters, region: e.target.value})}
          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 focus:ring-1 focus:ring-[#003d9b]"
        >
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
        <button 
          onClick={() => { onReset(); onClose(); }}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 rounded-2xl transition-all"
        >
          <RotateCcw size={16} /> Làm mới
        </button>
        <button 
          onClick={() => onApply(filters)}
          className="flex-[2] bg-[#003d9b] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/30 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Áp dụng lọc
        </button>
      </div>
    </div>
  );
}