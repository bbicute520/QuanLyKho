import axiosInstance from '../lib/axios';

export const supplierService = {
    // Lấy danh sách
    getAll: async () => await axiosInstance.get('/supplier'),
    
    // Thêm mới
    create: async (data) => await axiosInstance.post('/supplier', data),

    // Lấy chi tiết 1 đối tác
    getById: async (id) => await axiosInstance.get(`/supplier/${id}`),

    // Cập nhật
    update: async (id, data) => await axiosInstance.put(`/supplier/${id}`, data)
};