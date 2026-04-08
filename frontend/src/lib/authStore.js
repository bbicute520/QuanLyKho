import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tạo store để quản lý trạng thái đăng nhập
const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,

      // Hành động: Lưu thông tin sau khi Login thành công
      setAuth: (token, role, user = null) => set({ 
        token, 
        role, 
        user, 
        isAuthenticated: true 
      }),

      // Hành động: Đăng xuất (xóa sạch dữ liệu)
      logout: () => set({ 
        token: null, 
        role: null, 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'syncstock-auth-storage', // Tên key lưu dưới localStorage
    }
  )
);

export default useAuthStore;