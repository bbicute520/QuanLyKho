import axiosInstance from '../lib/axios';

export const productService = {
    // Lấy toàn bộ sản phẩm
    getAll: async () => {
        return await axiosInstance.get('/inventory/products');
    },
    
    // Thêm sản phẩm mới
    create: async (data) => {
        return await axiosInstance.post('/inventory/products', data);
    }
};