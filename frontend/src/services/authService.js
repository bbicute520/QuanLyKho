import axiosInstance from '../lib/axios';

export const authService = {
    register: async (data) => await axiosInstance.post('/auth/register', data),
    login: async (data) => await axiosInstance.post('/auth/login', data)
};