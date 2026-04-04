import React, { useState } from "react";
import axios from "axios";
// Import hook để chuyển trang sau khi đăng nhập thành công
import { useNavigate } from "react-router-dom";

export default function Login() {
    // 1. Tạo các biến để lưu trữ dữ liệu người dùng nhập vào
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Khởi tạo hàm chuyển trang
    const navigate = useNavigate();

    // 2. Hàm xử lý khi người dùng bấm nút Đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt tự động load lại trang
        setErrorMsg(""); // Xóa thông báo lỗi cũ nếu có

        // Kiểm tra cơ bản
        if (!email || !password) {
            setErrorMsg("Vui lòng nhập đầy đủ Email và Mật khẩu!");
            return;
        }

        setIsLoading(true); // Bật trạng thái đang load

        try {
            /* * CHÚ Ý: ĐÂY LÀ CHỖ GỌI API!
             * Bạn cần thay cái URL 'https://api.domain.com/api/auth/login'
             * bằng đường link API thật mà bạn Backend .NET 8 cung cấp.
             */
            const response = await axios.post(
                "https://api.domain.com/api/auth/login",
                {
                    email: email,
                    password: password,
                },
            );

            // 3. Xử lý khi API trả về thành công
            // Giả sử backend trả về data có cấu trúc: { access_token: "chuỗi_jwt_dài_ngoằng" }
            const token = response.data.access_token;

            if (token) {
                // Lưu token vào bộ nhớ trình duyệt
                localStorage.setItem("token", token);

                // Chuyển hướng sang trang Dashboard
                alert("Đăng nhập thành công!"); // Tạm thời alert để dễ nhìn
                navigate("/dashboard");
            }
        } catch (error) {
            // 4. Xử lý khi đăng nhập thất bại (sai pass, lỗi server...)
            console.error("Lỗi đăng nhập:", error);
            if (error.response && error.response.status === 401) {
                setErrorMsg("Email hoặc mật khẩu không chính xác!");
            } else {
                setErrorMsg("Lỗi kết nối đến máy chủ. Vui lòng thử lại!");
            }
        } finally {
            setIsLoading(false); // Tắt trạng thái load dù thành công hay thất bại
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#f9f9ff]">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-surface-container-high rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-fixed rounded-full blur-[150px]"></div>
            </div>

            <div className="w-full max-w-[1200px] grid lg:grid-cols-2 rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(9,28,53,0.08)] bg-surface-container-lowest">
                {/* Left Side: Visual/Branding Section */}
                <div className="hidden lg:flex flex-col justify-between p-12 primary-gradient relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                                <span
                                    className="material-symbols-outlined text-primary text-2xl"
                                    data-icon="architecture"
                                >
                                    architecture
                                </span>
                            </div>
                            <span className="text-white text-2xl font-black tracking-tighter">
                                SyncStock
                            </span>
                        </div>
                        <h1 className="text-white text-5xl font-bold leading-tight tracking-tight mb-6">
                            Precision in every <br /> movement.
                        </h1>
                        <p className="text-primary-fixed text-lg max-w-md opacity-90">
                            The editorial control center for modern warehouse
                            management. Seamlessly track, analyze, and optimize
                            your logistical flow.
                        </p>
                    </div>

                    <div className="relative z-10 flex gap-8">
                        <div>
                            <div className="text-white text-3xl font-bold">
                                99.9%
                            </div>
                            <div className="text-primary-fixed text-xs uppercase tracking-widest font-semibold mt-1">
                                Uptime Reliable
                            </div>
                        </div>
                        <div>
                            <div className="text-white text-3xl font-bold">
                                2.4M
                            </div>
                            <div className="text-primary-fixed text-xs uppercase tracking-widest font-semibold mt-1">
                                Items Processed
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 opacity-20">
                        <span
                            className="material-symbols-outlined text-[400px]"
                            data-icon="inventory_2"
                            style={{ fontVariationSettings: '"wght" 100' }}
                        >
                            inventory_2
                        </span>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="lg:hidden flex items-center gap-2 mb-12">
                            <span
                                className="material-symbols-outlined text-primary text-3xl"
                                data-icon="architecture"
                            >
                                architecture
                            </span>
                            <span className="text-on-background text-xl font-black tracking-tighter">
                                SyncStock
                            </span>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-on-surface text-3xl font-bold tracking-tight mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-on-surface-variant text-sm">
                                Enter your credentials to access the WMS Control
                                Center.
                            </p>
                        </div>

                        {/* Hiển thị thông báo lỗi nếu có */}
                        {errorMsg && (
                            <div className="mb-6 p-3 bg-error-container text-error rounded-md text-sm font-medium border border-error/20">
                                {errorMsg}
                            </div>
                        )}

                        {/* Gắn sự kiện onSubmit vào form */}
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div>
                                <label
                                    className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 ml-1"
                                    htmlFor="email"
                                >
                                    Email đăng nhập
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span
                                            className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors"
                                            data-icon="mail"
                                        >
                                            mail
                                        </span>
                                    </div>
                                    <input
                                        className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary transition-all rounded-md pl-12 py-4 text-on-surface placeholder:text-outline/50"
                                        id="email"
                                        placeholder="name@company.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        } // Cập nhật state khi gõ
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label
                                        className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1"
                                        htmlFor="password"
                                    >
                                        Mật khẩu
                                    </label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span
                                            className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors"
                                            data-icon="lock"
                                        >
                                            lock
                                        </span>
                                    </div>
                                    <input
                                        className="w-full bg-surface-container-low border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary transition-all rounded-md pl-12 pr-12 py-4 text-on-surface placeholder:text-outline/50"
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        } // Cập nhật state khi gõ
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                                        type="button"
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            data-icon="visibility"
                                        >
                                            visibility
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                            type="checkbox"
                                        />
                                    </div>
                                    <span className="ml-3 text-sm text-on-surface-variant font-medium group-hover:text-on-surface transition-colors">
                                        Ghi nhớ tài khoản
                                    </span>
                                </label>
                                <a
                                    className="text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                                    href="#"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* Nút Submit đổi trạng thái khi đang load */}
                            <button
                                disabled={isLoading}
                                className={`w-full text-white font-bold py-4 rounded-md shadow-lg transition-all flex items-center justify-center gap-2 ${isLoading ? "bg-outline cursor-not-allowed" : "primary-gradient shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99]"}`}
                                type="submit"
                            >
                                <span>
                                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                                </span>
                                {!isLoading && (
                                    <span
                                        className="material-symbols-outlined text-xl"
                                        data-icon="arrow_forward"
                                    >
                                        arrow_forward
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
                            <p className="text-outline text-xs uppercase tracking-widest font-medium">
                                Secure Enterprise Infrastructure
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
