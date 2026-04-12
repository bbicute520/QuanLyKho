import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query"; // BỔ SUNG: Import hook gọi API
import { toast } from "sonner"; // BỔ SUNG: Import thư viện thông báo
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "../../components/ui/Modal";
import AddStockItemForm from "./AddStockItemForm";
import { stockService } from "../../services/stockService"; // BỔ SUNG: Import service

export default function StockIn() {
    // 1. Khởi tạo state gốc
    const [items, setItems] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // BỔ SUNG: State lưu thông tin các trường nhập liệu
    const [supplier, setSupplier] = useState("");
    const [importDate, setImportDate] = useState("");
    const [note, setNote] = useState("");

    // 2. Hàm thêm sản phẩm vào bảng
    const handleAddItemToList = (data) => {
        const existingItemIndex = items.findIndex(
            (item) => item.sku === data.sku,
        );

        if (existingItemIndex >= 0) {
            // Nếu đã có trong phiếu, cộng dồn số lượng và cập nhật giá mới
            const newItems = [...items];
            newItems[existingItemIndex].quantity += data.quantity;
            newItems[existingItemIndex].importPrice = data.importPrice;
            setItems(newItems);
        } else {
            setItems([...items, { ...data, tempId: Date.now() }]);
        }
        setIsAddModalOpen(false);
    };

    // 3. Hàm cập nhật số lượng và đơn giá trực tiếp trên ô Input của bảng
    const updateItem = (id, field, value) => {
        setItems(
            items.map((item) => {
                if (item.tempId === id) {
                    return { ...item, [field]: value };
                }
                return item;
            }),
        );
    };

    // 4. Hàm xóa sản phẩm
    const removeItem = (id) => {
        setItems(items.filter((item) => item.tempId !== id));
    };

    // 5. Tính tổng tiền phiếu nhập
    const totalInvoice = items.reduce(
        (sum, item) => sum + item.quantity * item.importPrice,
        0,
    );

    // BỔ SUNG: Logic gọi API tạo Phiếu Nhập Kho
    const createTicketMutation = useMutation({
        mutationFn: (newTicket) => stockService.createInwardTicket(newTicket),
        onSuccess: () => {
            toast.success("Lưu phiếu nhập kho thành công!");
            // Xóa trắng form sau khi tạo thành công
            setItems([]);
            setSupplier("");
            setImportDate("");
            setNote("");
        },
        onError: () => {
            toast.error("Có lỗi xảy ra khi lưu phiếu nhập!");
        }
    });

    // BỔ SUNG: Hàm "gọt" dữ liệu và gửi lên Server khi bấm nút Xác nhận
    const handleSubmit = () => {
        if (!supplier) {
            toast.warning("Vui lòng chọn Nhà cung cấp!");
            return;
        }

        // Format lại mảng items theo chuẩn API Contract
        const formattedItems = items.map((item) => ({
            productId: item.id || item.tempId, // Đảm bảo lấy ID thật của sản phẩm
            quantity: item.quantity,
            price: item.importPrice
        }));

        createTicketMutation.mutate({
            supplierId: parseInt(supplier),
            note: note,
            items: formattedItems
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3 uppercase">
                    Nhập kho hàng hóa
                </h2>
                <p className="text-slate-500 text-base max-w-lg font-medium">
                    Khởi tạo quy trình nhập hàng mới và cập nhật số lượng tồn
                    kho thực tế cho hệ thống SyncStock.
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
                                    htmlFor="ma-nhap"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Mã phiếu nhập
                                </Label>
                                <Input
                                    id="ma-nhap"
                                    defaultValue="GRN-2023-00452"
                                    readOnly
                                    className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-mono text-base h-12 shadow-sm"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="nha-cung-cap"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Nhà cung cấp
                                </Label>
                                <div className="relative">
                                    <select
                                        id="nha-cung-cap"
                                        value={supplier} // BỔ SUNG: Bind value
                                        onChange={(e) => setSupplier(e.target.value)} // BỔ SUNG: Event onChange
                                        className="flex h-12 w-full rounded-md border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer appearance-none"
                                    >
                                        <option value="">
                                            Chọn đối tác...
                                        </option>
                                        <option value="1">
                                            Global Logistics Solutions Co.
                                        </option>
                                        <option value="2">
                                            North Star Manufacturing
                                        </option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="ngay-nhap"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Ngày nhập
                                </Label>
                                <Input
                                    id="ngay-nhap"
                                    type="date"
                                    value={importDate} // BỔ SUNG: Bind value
                                    onChange={(e) => setImportDate(e.target.value)} // BỔ SUNG: Event onChange
                                    className="bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary text-base h-12 shadow-sm block"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <Label
                                    htmlFor="ghi-chu"
                                    className="text-xs font-bold uppercase tracking-wider text-outline"
                                >
                                    Ghi chú
                                </Label>
                                <textarea
                                    id="ghi-chu"
                                    value={note} // BỔ SUNG: Bind value
                                    onChange={(e) => setNote(e.target.value)} // BỔ SUNG: Event onChange
                                    className="flex w-full rounded-md border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none"
                                    placeholder="Nhập ghi chú chi tiết về lô hàng..."
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Khối màu xanh (Tổng giá trị) */}
                    <div className="bg-primary text-white p-8 rounded-xl shadow-lg relative overflow-hidden flex-1">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <span className="material-symbols-outlined text-9xl">
                                warehouse
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
                            Tổng giá trị nhập kho
                        </p>
                        {/* Hiển thị số tiền động */}
                        <h4 className="text-4xl font-black mb-6 truncate">
                            {totalInvoice.toLocaleString()}{" "}
                            <span className="text-xl font-medium opacity-60">
                                đ
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
                                Danh sách sản phẩm
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
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Mã SKU
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Tên sản phẩm
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                                            Số lượng
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                            Đơn giá
                                        </th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                            Thành tiền
                                        </th>
                                        <th className="px-8 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    {items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
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
                                                <td className="px-8 py-6 text-center">
                                                    {/* Input điều khiển số lượng */}
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateItem(
                                                                item.tempId,
                                                                "quantity",
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
                                                    {/* Input điều khiển giá nhập */}
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={item.importPrice}
                                                        onChange={(e) =>
                                                            updateItem(
                                                                item.tempId,
                                                                "importPrice",
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                            )
                                                        }
                                                        className="w-32 h-10 ml-auto text-right bg-surface-container-low border-outline-variant/30 focus-visible:ring-primary font-medium text-slate-700 text-base shadow-sm"
                                                    />
                                                </td>
                                                <td className="px-8 py-6 text-right font-bold text-primary whitespace-nowrap">
                                                    {(
                                                        item.quantity *
                                                        item.importPrice
                                                    ).toLocaleString()}{" "}
                                                    đ
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
                                onClick={handleSubmit} // BỔ SUNG: Gọi hàm khi bấm
                                disabled={items.length === 0 || createTicketMutation.isPending} // BỔ SUNG: Khóa khi chưa có hàng hoặc đang loading
                                className="bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/30 flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                {createTicketMutation.isPending ? "Đang xử lý..." : "Xác nhận nhập kho"}
                                <span className="material-symbols-outlined text-xl">
                                    {createTicketMutation.isPending ? "sync" : "save"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gọi Component Form riêng để chọn/thêm hàng */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Lựa chọn sản phẩm nhập kho"
            >
                <AddStockItemForm
                    onAdd={handleAddItemToList}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Modal>
        </div>
    );
}