import axiosInstance from '../lib/axios'; // Đổi đường dẫn trỏ tới file api.js của sếp

export const reportService = {
    // Xem báo cáo tồn kho
    getStockReport: async () => {
        return await axiosInstance.get('/report/stock');
    },

    // Lịch sử nhập xuất (Truyền ?from=...&to=...)
    getTransactions: async (params) => {
        try {
            return await axiosInstance.get('/report/transactions', { params });
        } catch (error) {
            // Fallback khi Report Service chưa có route lịch sử giao dịch.
            if (error?.response?.status === 404) {
                const limit = Number(params?.limit) || 200;
                return await axiosInstance.get('/inventory/history', { params: { limit } });
            }
            throw error;
        }
    },

    // Tải file Excel
    exportExcel: async (params) => {
        return await axiosInstance.get('/report/export/excel', {
            params,
            responseType: 'blob' // Bắt buộc phải có cái này để tải file .xlsx không bị lỗi font
        });
    }
};