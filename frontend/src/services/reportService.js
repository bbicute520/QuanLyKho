import axiosInstance from '../lib/axios'; // Đổi đường dẫn trỏ tới file api.js của sếp

export const reportService = {
    // Xem báo cáo tồn kho
    getStockReport: async () => {
        return await axiosInstance.get('/report/stock');
    },

    // Lịch sử nhập xuất (Truyền ?from=...&to=...)
    getTransactions: async (params) => {
        return await axiosInstance.get('/report/transactions', { params });
    },

    // Tải file Excel
    exportExcel: async (params) => {
        return await axiosInstance.get('/report/export/excel', {
            params,
            responseType: 'blob' // Bắt buộc phải có cái này để tải file .xlsx không bị lỗi font
        });
    }
};