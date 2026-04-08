import React, { useState } from 'react';
import { Package, Calculator, Hash, Tag, Layers, XCircle } from 'lucide-react';

export default function AddStockItemForm({ onAdd, onClose }) {
  // Quản lý state cho toàn bộ form
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Thiết bị điện tử', // Mặc định
    quantity: 1,
    importPrice: 0
  });

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra sơ bộ
    if (!formData.sku || !formData.name) return;

    // Gửi dữ liệu ra component cha (StockIn)
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 not-italic">
      {/* KHỐI 1: THÔNG TIN CƠ BẢN */}
      <div className="space-y-5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">
          Thông tin hàng hóa
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mã SKU */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">Mã SKU <span className="text-red-500">*</span></label>
            <div className="relative group">
              <input 
                type="text" 
                required
                placeholder="VD: KA-MOD-202"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value.toUpperCase()})}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none transition-all font-bold text-slate-800 uppercase" 
              />
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
            </div>
          </div>

          {/* Danh mục */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">Danh mục phân loại</label>
            <div className="relative group">
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none transition-all font-bold text-slate-700 cursor-pointer appearance-none"
              >
                <option value="Thiết bị điện tử">Thiết bị điện tử</option>
                <option value="Linh kiện">Linh kiện</option>
                <option value="Vật tư tiêu hao">Vật tư tiêu hao</option>
                <option value="Khác">Khác</option>
              </select>
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
            </div>
          </div>
        </div>

        {/* Tên sản phẩm */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600">Tên sản phẩm <span className="text-red-500">*</span></label>
          <div className="relative group">
            <input 
              type="text" 
              required
              placeholder="Nhập tên sản phẩm..."
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none transition-all font-bold text-slate-800" 
            />
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
          </div>
        </div>
      </div>

      {/* KHỐI 2: CHI TIẾT NHẬP */}
      <div className="pt-6 border-t border-slate-100 space-y-5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">
          Chi tiết lô hàng nhập
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">Số lượng <span className="text-red-500">*</span></label>
            <div className="relative group">
              <input 
                type="number" 
                min="1"
                required
                value={formData.quantity} 
                onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})} 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none font-black text-[#003d9b] text-lg" 
              />
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">Đơn giá nhập (đ) <span className="text-red-500">*</span></label>
            <div className="relative group">
              <input 
                type="number" 
                min="0"
                required
                value={formData.importPrice} 
                onChange={(e) => setFormData({...formData, importPrice: Number(e.target.value)})} 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none font-black text-slate-800 text-lg" 
              />
              <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
            </div>
          </div>
        </div>

        {/* Khối tính tiền tự động */}
        <div className="bg-[#091c35] p-6 rounded-2xl text-white flex justify-between items-center relative overflow-hidden mt-4 shadow-lg shadow-[#091c35]/20">
          <div className="relative z-10">
            <p className="text-[10px] uppercase font-black opacity-50 mb-1 tracking-[0.1em]">Giá trị lô hàng (Tạm tính)</p>
            <p className="text-3xl font-black">
              {(formData.quantity * formData.importPrice).toLocaleString()} 
              <span className="text-xs opacity-40 font-bold ml-2 uppercase tracking-widest">VND</span>
            </p>
          </div>
          <Calculator className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24" />
        </div>
      </div>

      {/* CỤM NÚT BẤM */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button 
          type="button" 
          onClick={onClose}
          className="px-6 py-3.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
        >
          Hủy bỏ
        </button>
        <button 
          type="submit"
          disabled={!formData.sku || !formData.name}
          className="px-8 py-3.5 bg-[#003d9b] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          Đưa vào phiếu
        </button>
      </div>
    </form>
  );
}