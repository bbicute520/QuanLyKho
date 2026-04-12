import React, { useState, useMemo } from 'react';

export default function AddStockOutItemForm({ inventory, isLoading, onAdd, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const filteredProducts = useMemo(() => {
        if (!inventory) return [];
        return inventory.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, inventory]);

    const handleSelectProduct = (product) => {
        if (product.currentStock === 0) return; 
        setSelectedProduct(product);
        setQuantity(1); 
    };

    const handleSubmit = () => {
        if (!selectedProduct) return;
        if (quantity < 1 || quantity > selectedProduct.currentStock) return;
        onAdd({ ...selectedProduct, quantity });
    };

    return (
        <div className="space-y-6">
            <div>
                {/* Caption: 14px */}
                <p className="text-sm font-black uppercase tracking-widest text-[#003d9b] mb-3">Sản phẩm trong kho</p>
                <div className="relative mb-4">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Gõ tên hoặc mã SKU để tìm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-base font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#003d9b]/20 focus:border-[#003d9b] transition-all"
                    />
                </div>

                <div className="h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {!isLoading && filteredProducts.map(product => (
                        <div 
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            className={`p-4 rounded-xl cursor-pointer border ${
                                product.currentStock === 0 ? 'opacity-50' : selectedProduct?.id === product.id ? 'bg-[#f4f7ff] border-[#003d9b]' : 'bg-white border-slate-200'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    {/* Body: 16px */}
                                    <p className="font-black text-slate-900 text-base mb-0.5">{product.productName}</p>
                                    <p className="text-sm font-bold text-slate-500">{product.sku}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-400 uppercase mb-0.5">Tồn kho</p>
                                    <p className="font-black text-xl text-[#003d9b]">{product.stock}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="pt-6 border-t border-slate-100">
                    <p className="text-sm font-black uppercase tracking-widest text-[#003d9b] mb-3">Số lượng xuất</p>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} className="w-full h-16 bg-white border border-slate-200 rounded-xl text-2xl font-black text-[#003d9b] text-center" />
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Tồn sau xuất</p>
                            <p className="text-2xl font-black text-slate-900">{selectedProduct.currentStock - quantity}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-end gap-6 pt-6 mt-2">
                {/* Menu/Button: 16px */}
                <button onClick={onClose} className="text-base font-black uppercase tracking-widest text-slate-500 hover:text-slate-900">Hủy</button>
                <button onClick={handleSubmit} className="bg-[#003d9b] text-white px-8 py-4 rounded-xl text-base font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-md">Đưa vào phiếu xuất</button>
            </div>
        </div>
    );
}