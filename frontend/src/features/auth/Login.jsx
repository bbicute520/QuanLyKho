import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // 1. Khởi tạo State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 2. Hàm xử lý Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErrorMsg(""); 

    if (!email || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }

    setIsLoading(true);

    try {
      // Thay đổi URL này thành URL API thật của bạn
      const response = await axios.post(
        "https://api.domain.com/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.access_token;

      if (token) {
        localStorage.setItem("token", token);
        alert("Đăng nhập thành công!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      if (error.response && error.response.status === 401) {
        setErrorMsg("Email hoặc mật khẩu không chính xác!");
      } else {
        setErrorMsg("Lỗi kết nối đến máy chủ. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
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
        {/* CỘT TRÁI: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">architecture</span>
              </div>
              <span className="text-white text-2xl font-black tracking-tighter">SyncStock</span>
            </div>
            <h1 className="text-white text-5xl font-bold leading-tight tracking-tight mb-6">
              Precision in every <br /> movement.
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              The editorial control center for modern warehouse management. Seamlessly track, analyze, and optimize your logistical flow.
            </p>
          </div>

          <div className="relative z-10 flex gap-8">
            <div>
              <div className="text-white text-3xl font-bold">99.9%</div>
              <div className="text-white/60 text-xs uppercase tracking-widest font-semibold mt-1">Uptime Reliable</div>
            </div>
            <div>
              <div className="text-white text-3xl font-bold">2.4M</div>
              <div className="text-white/60 text-xs uppercase tracking-widest font-semibold mt-1">Items Processed</div>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 opacity-20">
            <span className="material-symbols-outlined text-[400px] text-white" style={{ fontVariationSettings: '"wght" 100' }}>inventory_2</span>
          </div>
        </div>

        {/* CỘT PHẢI: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <div className="lg:hidden flex items-center gap-2 mb-12">
              <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
              <span className="text-on-background text-xl font-black tracking-tighter">SyncStock</span>
            </div>

            <div className="mb-10">
              <h2 className="text-on-surface text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant text-sm">Enter your credentials to access the WMS Control Center.</p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-50 text-error rounded-md text-sm font-medium border border-error/20">
                {errorMsg}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="email">
                  Email đăng nhập
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary transition-colors">mail</span>
                  </div>
                  <input
                    className="w-full bg-slate-50 border-none border-b border-slate-200 focus:ring-0 focus:border-primary transition-all rounded-md pl-12 py-4 text-on-surface"
                    id="email"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary transition-colors">lock</span>
                  </div>
                  <input
                    className="w-full bg-slate-50 border-none border-b border-slate-200 focus:ring-0 focus:border-primary transition-all rounded-md pl-12 pr-12 py-4 text-on-surface"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <label className="flex items-center cursor-pointer group">
                  <input className="peer h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer" type="checkbox" />
                  <span className="ml-3 text-sm text-on-surface-variant font-medium group-hover:text-on-surface transition-colors">Ghi nhớ tài khoản</span>
                </label>
                <a className="text-sm font-semibold text-primary hover:opacity-80 transition-colors" href="#">Quên mật khẩu?</a>
              </div>

              <button
                disabled={isLoading}
                className={`w-full text-white font-bold py-4 rounded-md shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-primary shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                }`}
                type="submit"
              >
                <span>{isLoading ? "Đang xử lý..." : "Đăng nhập"}</span>
                {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Secure Enterprise Infrastructure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}