import React, { useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';

export default function AddStockOutItemForm({ onAdd, onClose }) {
  // Dữ liệu Mock: Danh sách sản phẩm ĐANG CÓ TRONG KHO (Sau này lấy từ API của Tuấn)
  const mockInventory = [
    { id: 1, name: 'Module Cảm Biến X-Alpha', sku: 'KA-MOD-202', currentStock: 1240, category: 'Hardware' },
    { id: 2, name: 'Vi điều khiển ARM Cortex-M4', sku: 'ARM-MCU-04', currentStock: 50, category: 'Electronics' },
    { id: 3, name: 'Màn hình OLED 0.96 inch', sku: 'DISP-OLED-096', currentStock: 0, category: 'Display' }, // Hết hàng
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [outQuantity, setOutQuantity] = useState(1);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = mockInventory.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || outQuantity <= 0) return;
    
    // Đảm bảo không xuất quá số lượng tồn
    if (outQuantity > selectedProduct.currentStock) {
      alert("Số lượng xuất không được lớn hơn tồn kho hiện tại!");
      return;
    }

    onAdd({ ...selectedProduct, quantity: outQuantity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 not-italic">
      {/* TÌM KIẾM VÀ CHỌN SẢN PHẨM CÓ TRONG KHO */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">Sản phẩm trong kho</label>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={18} />
          <input 
            type="text" 
            placeholder="Gõ tên hoặc mã SKU để tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none font-bold text-slate-700" 
          />
        </div>
        
        {/* Danh sách kết quả tìm kiếm */}
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
          {filteredProducts.map(p => {
            const isOutOfStock = p.currentStock === 0;
            const isSelected = selectedProduct?.id === p.id;
            
            return (
              <div 
                key={p.id}
                onClick={() => !isOutOfStock && setSelectedProduct(p)}
                className={`flex justify-between items-center p-3 rounded-xl border transition-all ${
                  isOutOfStock ? 'opacity-50 bg-slate-50 cursor-not-allowed border-slate-100' :
                  isSelected ? 'border-[#003d9b] bg-blue-50 cursor-pointer shadow-sm' : 
                  'border-slate-200 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <div>
                  <p className="text-sm font-black text-slate-800">{p.name}</p>
                  <p className="text-[10px] font-mono font-bold text-slate-500">{p.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tồn kho</p>
                  <p className={`text-lg font-black ${isOutOfStock ? 'text-red-500' : 'text-[#003d9b]'}`}>
                    {p.currentStock}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* NHẬP SỐ LƯỢNG XUẤT */}
      {selectedProduct && (
        <div className="pt-6 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003d9b]">Số lượng xuất</label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <input 
                type="number" 
                min="1"
                max={selectedProduct.currentStock}
                required
                value={outQuantity} 
                onChange={(e) => setOutQuantity(Number(e.target.value))} 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#003d9b] outline-none font-black text-2xl text-[#003d9b]" 
              />
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b]" size={24} />
            </div>
            <div className="flex-1 bg-slate-100 rounded-xl p-4 flex flex-col justify-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tồn kho sau xuất</span>
               <span className="text-2xl font-black text-slate-700">
                 {selectedProduct.currentStock - outQuantity >= 0 ? selectedProduct.currentStock - outQuantity : 'Lỗi'}
               </span>
            </div>
          </div>
          {outQuantity > selectedProduct.currentStock && (
            <p className="text-xs font-bold text-red-500 flex items-center gap-1">
              <AlertCircle size={14}/> Vượt quá số lượng tồn kho!
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 rounded-xl">Hủy</button>
            <button 
              type="submit" 
              disabled={outQuantity > selectedProduct.currentStock || outQuantity <= 0}
              className="px-8 py-3 bg-[#003d9b] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              Đưa vào phiếu xuất
            </button>
          </div>
        </div>
      )}
    </form>
  );
}