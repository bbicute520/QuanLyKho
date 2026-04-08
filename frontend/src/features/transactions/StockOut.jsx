import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "../../components/ui/Modal";
import AddStockOutItemForm from "./AddStockOutItemForm";

export default function StockOut() {
    // 1. Khởi tạo state
    const [items, setItems] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // 2. Hàm thêm sản phẩm vào bảng
    const handleAddItemToList = (data) => {
        const existingItemIndex = items.findIndex(
            (item) => item.id === data.id,
        );

        if (existingItemIndex >= 0) {
            const newItems = [...items];
            const newQty = newItems[existingItemIndex].quantity + data.quantity;

            if (newQty > data.currentStock) {
                alert(
                    "Tổng số lượng xuất không được vượt quá tồn kho hiện tại!",
                );
                return;
            }
            newItems[existingItemIndex].quantity = newQty;
            setItems(newItems);
        } else {
            setItems([...items, { ...data, tempId: Date.now() }]);
        }
        setIsAddModalOpen(false);
    };

    // 3. Hàm cập nhật số lượng trực tiếp trên ô Input của bảng
    const updateQuantity = (id, newQty) => {
        setItems(
            items.map((item) => {
                if (item.tempId === id) {
                    // Chặn không cho gõ số lớn hơn tồn kho
                    const validQty =
                        newQty > item.currentStock ? item.currentStock : newQty;
                    return { ...item, quantity: validQty };
                }
                return item;
            }),
        );
    };

    // 4. Hàm xóa sản phẩm
    const removeItem = (id) => {
        setItems(items.filter((item) => item.tempId !== id));
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">
                    Xuất kho hàng hóa
                </h2>
                <p className="text-slate-500 text-base max-w-lg font-medium">
                    Quản lý quy trình xuất hàng đi, đối soát SKU và đảm bảo lưu
                    lượng hàng hóa rời kho chính xác.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* CỘT TRÁI: Form thông tin & Khối màu xanh */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* Thông tin chung */}
                    <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-primary mb-8">
                            Thông tin chung
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="ma-xuat"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Mã đơn xuất
                                </Label>
                                <Input
                                    id="ma-xuat"
                                    defaultValue="OUT-2023-8842"
                                    readOnly
                                    className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-mono text-base h-12 shadow-sm"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="khach-hang"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Khách hàng / Dự án
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="khach-hang"
                                        placeholder="Chọn đối tác..."
                                        className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary text-base h-12 shadow-sm pr-10"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="ngay-xuat"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Ngày xuất
                                </Label>
                                <Input
                                    id="ngay-xuat"
                                    type="date"
                                    className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary text-base h-12 shadow-sm block"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="ly-do"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Lý do xuất
                                </Label>
                                <textarea
                                    id="ly-do"
                                    className="flex w-full rounded-md border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none"
                                    placeholder="Ghi chú lý do xuất hàng..."
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Khối màu xanh (Tổng sản phẩm xuất) */}
                    <div className="bg-primary text-white p-8 rounded-xl shadow-lg relative overflow-hidden flex-1">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <span className="material-symbols-outlined text-9xl">
                                inventory
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
                            Tổng sản phẩm xuất
                        </p>
                        {/* Hiển thị số lượng SKU động */}
                        <h4 className="text-5xl font-black mb-6">
                            {items.length}{" "}
                            <span className="text-xl font-medium opacity-60">
                                SKUs
                            </span>
                        </h4>
                        <div className="flex items-center gap-2 text-sm bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm">
                                verified
                            </span>
                            <span>Trạng thái: Đang soạn thảo</span>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: Bảng sản phẩm & Nút bấm */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex flex-col h-full overflow-hidden">
                        {/* Header Bảng */}
                        <div className="p-8 flex justify-between items-center border-b border-outline-variant/10">
                            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    list_alt
                                </span>{" "}
                                Danh sách sản phẩm xuất
                            </h3>
                            {/* Nút bật Modal */}
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary-fixed px-4 py-2 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">
                                    add_circle
                                </span>{" "}
                                Thêm sản phẩm
                            </button>
                        </div>

                        {/* Nội dung Bảng */}
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Mã SKU
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Tên sản phẩm
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                            Tồn kho hiện tại
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                                            Số lượng xuất
                                        </th>
                                        <th className="px-8 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    {items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                                            >
                                                Chưa có sản phẩm nào trong phiếu
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map((item) => (
                                            <tr
                                                key={item.tempId}
                                                className="hover:bg-surface-container-low/40 transition-colors"
                                            >
                                                <td className="px-8 py-6 font-mono text-sm font-bold text-primary">
                                                    {item.sku}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-base font-bold text-slate-900 mb-1">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 uppercase">
                                                        {item.category}
                                                    </p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-base font-medium text-slate-600">
                                                        {item.currentStock.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    {/* Input điều khiển số lượng trực tiếp trên bảng */}
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={item.currentStock}
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateQuantity(
                                                                item.tempId,
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                            )
                                                        }
                                                        className="w-24 h-10 mx-auto text-center bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-bold text-base shadow-sm"
                                                    />
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() =>
                                                            removeItem(
                                                                item.tempId,
                                                            )
                                                        }
                                                        className="text-error/50 hover:text-error transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">
                                                            delete
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Cụm Nút bấm Footer */}
                        <div className="p-8 border-t border-outline-variant/10 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-6">
                                <button className="text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">
                                    Lưu bản nháp
                                </button>
                                <button className="text-base font-bold text-error hover:text-red-700 transition-colors">
                                    Hủy bỏ
                                </button>
                            </div>
                            <button
                                disabled={items.length === 0}
                                className="bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/30 flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                Xác nhận xuất kho
                                <span className="material-symbols-outlined text-xl">
                                    rocket_launch
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gọi Component Form riêng để chọn hàng */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Tìm & Chọn Hàng Xuất Kho"
            >
                <AddStockOutItemForm
                    onAdd={handleAddItemToList}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
