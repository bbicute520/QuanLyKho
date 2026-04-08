import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { 
  Activity, AlertTriangle, Truck, BarChart3, 
  ArrowDownLeft, ArrowUpRight, AlertCircle,
  Filter, ChevronLeft, ChevronRight
} from 'lucide-react';
// Import thư viện biểu đồ xịn
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// --- DỮ LIỆU ĐỘNG ---

// Dữ liệu biểu đồ (Đã đổi thành số lượng thực tế thay vì phần trăm)
const chartData = [
  { day: 'Thứ 2', in: 120, out: 80 },
  { day: 'Thứ 3', in: 250, out: 150 },
  { day: 'Thứ 4', in: 180, out: 200 },
  { day: 'Thứ 5', in: 320, out: 280 },
  { day: 'Thứ 6', in: 210, out: 190 },
  { day: 'Thứ 7', in: 150, out: 220 },
  { day: 'CN', in: 90, out: 60 },
];

const recentActivities = [
  { id: 1, type: 'in', user: 'Admin', code: 'GRN-452', time: '10 phút trước' },
  { id: 2, type: 'out', user: 'Tuấn Lê', code: 'OUT-884', time: '1 giờ trước' },
  { id: 3, type: 'in', user: 'Admin', code: 'GRN-451', time: '3 giờ trước' },
  { id: 4, type: 'alert', user: 'Hệ thống', code: 'SKU-902', time: '5 giờ trước' },
];

const transactions = [
  { id: 1, time: 'Hôm nay, 14:20', type: 'in', sku: 'ACC-992-BLK', qty: '+120', status: 'Hoàn tất' },
  { id: 2, time: 'Hôm nay, 12:45', type: 'out', sku: 'ELE-441-XPS', qty: '-45', status: 'Hoàn tất' },
  { id: 3, time: 'Hôm nay, 10:15', type: 'in', sku: 'FUR-102-OAK', qty: '+12', status: 'Đang kiểm tra' },
  { id: 4, time: 'Hôm nay, 09:30', type: 'out', sku: 'LAP-008-PRO', qty: '-2', status: 'Hoàn tất' },
];

export default function Dashboard() {
  return (
    <PageWrapper className="max-w-7xl mx-auto">
      
      {/* 1. Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight text-[#091c35] mb-3">Trung tâm điều phối</h2>
        <p className="text-[#434654] text-base">Chào buổi sáng, hệ thống đang vận hành với hiệu suất 98%.</p>
      </div>

      {/* 2. KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 bg-[#003d9b] text-white p-10 rounded-xl shadow-xl shadow-[#003d9b]/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-4">Giá trị kho hiện tại</p>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
              4.820.500.000 <span className="text-xl opacity-60 font-medium uppercase">VND</span>
            </h3>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex-1 md:flex-none">
                <p className="text-xs opacity-70 uppercase font-bold mb-1">Nhập tháng này</p>
                <p className="text-2xl font-black">+12.5%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex-1 md:flex-none">
                <p className="text-xs opacity-70 uppercase font-bold mb-1">Xuất tháng này</p>
                <p className="text-2xl font-black">-8.2%</p>
              </div>
            </div>
          </div>
          <Activity className="absolute -right-12 -bottom-12 text-[280px] w-96 h-96 opacity-10 rotate-12 transition-transform group-hover:scale-110 duration-700" strokeWidth={1} />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/30 flex flex-col justify-between group hover:shadow-md transition-all">
          <div>
            <div className="w-14 h-14 bg-[#ffdbcf] rounded-xl flex items-center justify-center text-[#380d00] mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle size={28} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Cảnh báo tồn kho</p>
            <h4 className="text-5xl font-black text-[#091c35] mb-2">32</h4>
          </div>
          <p className="text-sm text-[#7b2600] font-black uppercase tracking-tighter">Sản phẩm sắp hết hàng</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/30 flex flex-col justify-between group hover:shadow-md transition-all">
          <div>
            <div className="w-14 h-14 bg-[#b6c8fe] rounded-xl flex items-center justify-center text-[#415382] mb-6 group-hover:scale-110 transition-transform">
              <Truck size={28} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Đang vận chuyển</p>
            <h4 className="text-5xl font-black text-[#091c35] mb-2">08</h4>
          </div>
          <p className="text-sm text-[#4c5d8d] font-black uppercase tracking-tighter">Lô hàng đang tới kho</p>
        </div>
      </div>

      {/* 3. Đồ thị & Hoạt động gần đây */}
      <div className="grid grid-cols-12 gap-8 mb-10">
        
        {/* BIỂU ĐỒ RECHARTS MỚI */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/30 h-full flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
              <BarChart3 size={20} /> Lưu lượng hàng hóa (7 ngày qua)
            </h3>
            
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                  {/* Lưới nền nét đứt cho dễ nhìn */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  
                  {/* Trục X và Y */}
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  
                  {/* Tooltip khi hover chuột */}
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  
                  {/* Chú thích màu sắc */}
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 'bold', paddingTop: '20px' }} />
                  
                  {/* Cột Nhập và Xuất */}
                  <Bar dataKey="in" name="Nhập kho" fill="#003d9b" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="out" name="Xuất kho" fill="#f97316" radius={[6, 6, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d6]/30 flex flex-col h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Hoạt động gần đây</h3>
            <div className="space-y-8 flex-1">
              {recentActivities.map((item) => (
                <div key={item.id} className="flex items-start gap-4 sm:gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${
                    item.type === 'in' ? 'bg-[#003d9b] shadow-[#003d9b]/20' : 
                    item.type === 'out' ? 'bg-[#f97316] shadow-[#f97316]/20' : 
                    'bg-[#ba1a1a] shadow-[#ba1a1a]/20'
                  }`}>
                    {item.type === 'in' && <ArrowDownLeft size={24} />}
                    {item.type === 'out' && <ArrowUpRight size={24} />}
                    {item.type === 'alert' && <AlertCircle size={24} />}
                  </div>
                  <div>
                    <p className="text-base font-black text-[#091c35] leading-tight mb-1">
                      {item.type === 'in' ? 'Nhập kho' : item.type === 'out' ? 'Xuất kho' : 'Cảnh báo tồn kho'}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{item.user} đã xử lý {item.code}</p>
                    <p className="text-[10px] sm:text-xs text-[#003d9b] font-bold mt-2 uppercase tracking-tighter">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 text-xs sm:text-sm font-bold text-[#003d9b] bg-[#dae2ff] hover:bg-[#c4d2ff] rounded-xl transition-all active:scale-95 uppercase tracking-widest">
              Xem tất cả nhật ký
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bảng chi tiết giao dịch */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c3c6d6]/30 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight text-slate-800">Chi tiết giao dịch hôm nay</h3>
          <button className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:text-[#003d9b] transition-colors">
            <Filter size={18} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Thời gian</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Loại giao dịch</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Mã SKU</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Số lượng</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-4 text-sm font-medium text-slate-600">{tx.time}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center gap-2 text-sm font-bold ${tx.type === 'in' ? 'text-[#003d9b]' : 'text-[#f97316]'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tx.type === 'in' ? 'bg-[#003d9b]' : 'bg-[#f97316]'}`}></span>
                      {tx.type === 'in' ? 'Nhập kho' : 'Xuất kho'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm font-mono font-bold text-slate-800">{tx.sku}</td>
                  <td className="px-8 py-4 text-sm font-black text-slate-800">{tx.qty}</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      tx.status === 'Hoàn tất' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}