import React from "react";
// Import các component vẽ biểu đồ từ Recharts
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    // Dữ liệu mẫu cho biểu đồ
    const chartData = [
        { name: "Thứ 2", "Nhập kho": 120, "Xuất kho": 80 },
        { name: "Thứ 3", "Nhập kho": 200, "Xuất kho": 150 },
        { name: "Thứ 4", "Nhập kho": 150, "Xuất kho": 220 },
        { name: "Thứ 5", "Nhập kho": 280, "Xuất kho": 190 },
        { name: "Thứ 6", "Nhập kho": 190, "Xuất kho": 250 },
        { name: "Thứ 7", "Nhập kho": 90, "Xuất kho": 110 },
        { name: "Chủ nhật", "Nhập kho": 50, "Xuất kho": 40 },
    ];

    return (
        <div className="text-on-surface antialiased overflow-x-hidden bg-[#f9f9ff] min-h-screen">
            {/* Cột Sidebar */}
            <aside className="fixed left-0 top-0 z-40 bg-slate-100/70 backdrop-blur-xl h-screen w-64 border-r border-slate-200/20 font-sans tracking-tight">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span
                                className="material-symbols-outlined"
                                data-icon="architecture"
                            >
                                architecture
                            </span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tighter text-slate-900">
                                SyncStock
                            </h1>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                WMS Control Center
                            </p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <a
                            className="flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-r-full font-semibold transition-all duration-200"
                            href="#"
                        >
                            <span
                                className="material-symbols-outlined"
                                data-icon="dashboard"
                            >
                                dashboard
                            </span>
                            <span>Overview</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-all duration-200 rounded-r-full"
                            href="#"
                        >
                            <span
                                className="material-symbols-outlined"
                                data-icon="inventory_2"
                            >
                                inventory_2
                            </span>
                            <span>Products</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-all duration-200 rounded-r-full"
                            href="#"
                        >
                            <span
                                className="material-symbols-outlined"
                                data-icon="input"
                            >
                                input
                            </span>
                            <span>Stock In</span>
                        </a>
                        <a
                            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-all duration-200 rounded-r-full"
                            href="#"
                        >
                            <span
                                className="material-symbols-outlined"
                                data-icon="output"
                            >
                                output
                            </span>
                            <span>Stock Out</span>
                        </a>
                    </nav>
                </div>
            </aside>

            {/* Khu vực Nội dung chính */}
            <main className="ml-64 min-h-screen">
                <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/20">
                    <div className="flex items-center gap-6">
                        <h2 className="font-bold text-slate-800">
                            Tổng quan hệ thống
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            className="w-8 h-8 rounded-full border border-slate-200"
                            alt="Avatar"
                            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                        />
                    </div>
                </header>

                <div className="pt-24 px-8 pb-12">
                    {/* Header Dashboard */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-[2rem] font-black tracking-tight text-on-surface mb-1">
                                Dashboard Tồn Kho
                            </h2>
                            <p className="text-sm text-slate-500">
                                Thống kê hoạt động kho hàng theo thời gian thực.
                            </p>
                        </div>
                    </div>

                    {/* Các thẻ KPI nhỏ */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-primary">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Tổng sản phẩm
                            </p>
                            <p className="text-3xl font-extrabold text-slate-800">
                                1,248
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-error">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Sắp hết hàng
                            </p>
                            <p className="text-3xl font-extrabold text-error">
                                14
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-secondary">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Đơn nhập (Tháng)
                            </p>
                            <p className="text-3xl font-extrabold text-slate-800">
                                432
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-tertiary">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Đơn xuất (Tháng)
                            </p>
                            <p className="text-3xl font-extrabold text-slate-800">
                                389
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* KHU VỰC BIỂU ĐỒ RECHARTS */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">
                                    Thống kê lượng Xuất/Nhập
                                </h3>
                                <p className="text-sm text-slate-500">
                                    7 ngày qua
                                </p>
                            </div>

                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: -20,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#e2e8f0"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 12,
                                            }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 12,
                                            }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "#f1f5f9" }}
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "none",
                                                boxShadow:
                                                    "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            }}
                                        />
                                        <Legend
                                            iconType="circle"
                                            wrapperStyle={{
                                                paddingTop: "20px",
                                            }}
                                        />
                                        <Bar
                                            dataKey="Nhập kho"
                                            fill="#003d9b"
                                            radius={[4, 4, 0, 0]}
                                            barSize={24}
                                        />
                                        <Bar
                                            dataKey="Xuất kho"
                                            fill="#b6c8fe"
                                            radius={[4, 4, 0, 0]}
                                            barSize={24}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Hoạt động gần đây */}
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">
                                Hoạt động gần đây
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <span
                                                className="material-symbols-outlined"
                                                data-icon="inventory_2"
                                            >
                                                inventory_2
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Nhập kho: Đơn hàng #
                                                {8000 + item}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                14:20 - Admin xử lý
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Table Area (Đã khôi phục) */}
                    <div className="mt-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-lg font-bold tracking-tight text-on-surface">
                                Bảng chi tiết giao dịch
                            </h3>
                            <div className="flex gap-2">
                                <button className="p-2 bg-surface-container-low rounded-lg text-slate-400 hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined text-sm"
                                        data-icon="filter_list"
                                    >
                                        filter_list
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-surface-container-low text-on-surface-variant">
                                    <tr>
                                        <th className="px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-widest">
                                            Thời gian
                                        </th>
                                        <th className="px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-widest">
                                            Loại giao dịch
                                        </th>
                                        <th className="px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-widest">
                                            Mã SKU
                                        </th>
                                        <th className="px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-widest">
                                            Số lượng
                                        </th>
                                        <th className="px-8 py-4 text-[0.6875rem] font-bold uppercase tracking-widest text-right">
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <tr className="hover:bg-surface-container-high transition-colors group">
                                        <td className="px-8 py-4 text-sm font-medium text-slate-600">
                                            Hôm nay, 14:20
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary">
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                Nhập kho
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-sm font-mono text-on-surface">
                                            ACC-992-BLK
                                        </td>
                                        <td className="px-8 py-4 text-sm font-bold text-on-surface">
                                            +120
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <span className="px-3 py-1 bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold rounded-full uppercase">
                                                Hoàn tất
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-high transition-colors group">
                                        <td className="px-8 py-4 text-sm font-medium text-slate-600">
                                            Hôm nay, 10:15
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="inline-flex items-center gap-2 text-sm font-bold text-tertiary">
                                                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                                                Xuất kho
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-sm font-mono text-on-surface">
                                            LAP-008-PRO
                                        </td>
                                        <td className="px-8 py-4 text-sm font-bold text-on-surface">
                                            -2
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded-full uppercase">
                                                Đang kiểm tra
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Phân trang (Pagination) */}
                        <div className="px-8 py-4 bg-surface-container-low flex items-center justify-between text-xs text-slate-500">
                            <p>Hiển thị 1-2 trong số 142 giao dịch</p>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-slate-400 cursor-not-allowed">
                                    <span
                                        className="material-symbols-outlined text-sm"
                                        data-icon="chevron_left"
                                    >
                                        chevron_left
                                    </span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold">
                                    1
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-slate-600 hover:bg-slate-200">
                                    2
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-slate-600 hover:bg-slate-200">
                                    <span
                                        className="material-symbols-outlined text-sm"
                                        data-icon="chevron_right"
                                    >
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
