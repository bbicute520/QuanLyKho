import React, { useState } from 'react';
import { Package, Calculator, Hash, Tag, Layers } from 'lucide-react';

export default function AddStockItemForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    sku: '', name: '', category: 'Thiết bị điện tử', quantity: 1, importPrice: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sku || !formData.name) return;
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 not-italic">
      <div className="space-y-5">
        {/* Caption: 14px */}
        <label className="text-sm font-black uppercase tracking-[0.2em] text-[#003d9b]">Thông tin hàng hóa</label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Mã SKU <span className="text-red-500">*</span></label>
            <div className="relative group">
              <input 
                type="text" required value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value.toUpperCase()})}
                className="w-full h-14 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none font-bold text-base uppercase" 
              />
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Danh mục phân loại</label>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full h-14 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-bold text-base text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Thiết bị điện tử">Thiết bị điện tử</option>
                <option value="Linh kiện">Linh kiện</option>
                <option value="Vật tư tiêu hao">Vật tư tiêu hao</option>
                <option value="Khác">Khác</option>
              </select>
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600">Tên sản phẩm <span className="text-red-500">*</span></label>
          <input 
            type="text" required value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-base" 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 space-y-5">
        <label className="text-sm font-black uppercase tracking-[0.2em] text-[#003d9b]">Chi tiết lô hàng nhập</label>
        
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Số lượng</label>
            <input 
              type="number" min="1" required value={formData.quantity} 
              onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})} 
              className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl font-black text-[#003d9b] text-xl" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Đơn giá nhập (đ)</label>
            <input 
              type="number" min="0" required value={formData.importPrice} 
              onChange={(e) => setFormData({...formData, importPrice: Number(e.target.value)})} 
              className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-800 text-xl" 
            />
          </div>
        </div>

        {/* H4 Tiêu đề phụ/Giá trị: 30px */}
        <div className="bg-[#091c35] p-8 rounded-2xl text-white relative overflow-hidden mt-4 shadow-lg shadow-[#091c35]/20">
          <p className="text-sm uppercase font-black opacity-50 mb-2 tracking-[0.1em]">Giá trị lô hàng (Tạm tính)</p>
          <p className="text-3xl font-black">
            {(formData.quantity * formData.importPrice).toLocaleString()} 
            <span className="text-sm opacity-40 font-bold ml-2 uppercase">VND</span>
          </p>
          <Calculator className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
        <button onClick={onClose} type="button" className="px-6 py-4 text-base font-black uppercase tracking-widest text-slate-500 hover:text-slate-800">Hủy</button>
        <button type="submit" className="px-10 py-4 bg-[#003d9b] text-white rounded-xl font-black text-base uppercase tracking-widest shadow-lg">Đưa vào phiếu</button>
      </div>
    </form>
  );
}