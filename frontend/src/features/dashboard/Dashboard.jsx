import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageWrapper from '../../components/layout/PageWrapper';
import { 
  Activity, AlertTriangle, Truck, BarChart3, 
  ArrowDownLeft, ArrowUpRight, Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { stockService } from '../../services/stockService';

export default function Dashboard() {
  const navigate = useNavigate();

  // Dữ liệu mặc định khi không kết nối được API
  const zeroData = {
    totalValue: 0,
    alertsCount: 0,
    shippingCount: 0,
    monthlyIn: 0,
    monthlyOut: 0,
    chartData: [
      { day: 'Th 2', in: 0, out: 0 }, { day: 'Th 3', in: 0, out: 0 },
      { day: 'Th 4', in: 0, out: 0 }, { day: 'Th 5', in: 0, out: 0 },
      { day: 'Th 6', in: 0, out: 0 }, { day: 'Th 7', in: 0, out: 0 },
      { day: 'CN', in: 0, out: 0 }
    ],
    recentActivities: []
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    retry: false, // Tắt tự động thử lại để hiện số 0 ngay khi lỗi
    queryFn: async () => {
        try {
            // Thử gọi API
            const [stockRes, historyRes] = await Promise.all([
                stockService.getInventory(),
                stockService.getHistory()
            ]);

            const inventory = stockRes.data || [];
            const history = historyRes.data || [];

            // Tính toán logic từ dữ liệu thật
            const lowStockItems = inventory.filter(item => item.isLow).length;
            
            // Xử lý biểu đồ 7 ngày
            const daysLabel = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
            const chartData = Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                return {
                    dateStr: d.toISOString().split('T')[0],
                    day: daysLabel[d.getDay()],
                    in: 0,
                    out: 0
                };
            });

            history.forEach(trans => {
                const slot = chartData.find(d => d.dateStr === trans.date);
                if (slot) {
                    if (trans.type === 'Nhập') slot.in += trans.quantity;
                    if (trans.type === 'Xuất') slot.out += trans.quantity;
                }
            });

            return {
                totalValue: 0, // Hiện tại chưa có giá tiền từ API
                alertsCount: lowStockItems,
                shippingCount: 0,
                monthlyIn: 0,
                monthlyOut: 0,
                chartData,
                recentActivities: history.slice(0, 5).map(item => ({
                    id: item.id || Math.random(),
                    type: item.type === 'Nhập' ? 'in' : 'out',
                    title: `${item.type === 'Nhập' ? 'Nhập kho' : 'Xuất kho'} ${item.productName}`,
                    user: 'Hệ thống',
                    code: `SL: ${item.quantity}`
                }))
            };
        } catch (error) {
            console.error("Kết nối API thất bại, hiển thị số liệu 0:", error);
            return zeroData; // Trả về số 0 nếu API sập
        }
    }
  });

  // Chỉ hiện xoay nếu đang trong lần tải đầu tiên (nhưng catch sẽ xử lý nhanh)
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-700" size={48} />
    </div>
  );

  return (
    <PageWrapper className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#091c35] mb-3 uppercase">Trung tâm điều phối</h2>
        <p className="text-[#434654] text-sm md:text-base font-medium">Hệ thống đang vận hành ổn định trên toàn chi nhánh.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 bg-[#003d9b] text-white p-10 rounded-xl shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] opacity-70 mb-4">Giá trị kho hiện tại</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
              {stats?.totalValue?.toLocaleString() || "0"} <span className="text-lg md:text-xl opacity-60 font-medium uppercase">VND</span>
            </h3>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                <p className="text-xs md:text-sm opacity-70 uppercase font-bold mb-1">Nhập tháng này</p>
                <p className="text-xl md:text-2xl font-black">+{stats?.monthlyIn}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                <p className="text-xs md:text-sm opacity-70 uppercase font-bold mb-1">Xuất tháng này</p>
                <p className="text-xl md:text-2xl font-black">-{stats?.monthlyOut}%</p>
              </div>
            </div>
          </div>
          <Activity className="absolute -right-12 -bottom-12 text-[280px] w-96 h-96 opacity-10 rotate-12" />
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mb-6">
              <AlertTriangle size={28} />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Cảnh báo tồn</p>
            <h4 className="text-4xl md:text-5xl font-black text-[#091c35]">{stats?.alertsCount || 0}</h4>
          </div>
          <p className="text-sm md:text-base text-orange-800 font-black uppercase">Sắp hết hàng</p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 mb-6">
              <Truck size={28} />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Vận chuyển</p>
            <h4 className="text-4xl md:text-5xl font-black text-[#091c35]">{stats?.shippingCount || 0}</h4>
          </div>
          <p className="text-sm md:text-base text-blue-800 font-black uppercase">Lô hàng đang tới</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-10">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <h3 className="text-base md:text-lg font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-6">
              <BarChart3 size={20} /> Lưu lượng hàng hóa (7 ngày qua)
            </h3>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.chartData || []} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 14 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', shadow: 'none', fontSize: '14px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '14px' }} />
                  <Bar dataKey="in" name="Nhập kho" fill="#003d9b" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="out" name="Xuất kho" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-base md:text-lg font-black uppercase tracking-widest text-slate-500 mb-8">Hoạt động gần đây</h3>
            <div className="space-y-8 flex-1">
              {stats?.recentActivities?.length > 0 ? (
                stats.recentActivities.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                      item.type === 'in' ? 'bg-[#003d9b]' : 'bg-[#f97316]'
                    }`}>
                      {item.type === 'in' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-black text-[#091c35] leading-tight mb-1">{item.title}</p>
                      <p className="text-xs md:text-sm text-slate-500 font-bold">{item.user} đã xử lý {item.code}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs font-bold text-slate-400 uppercase text-center py-10">Chưa có hoạt động</p>
              )}
            </div>
            <button 
              onClick={() => navigate('/stock-history')}
              className="w-full mt-10 py-4 text-sm md:text-base font-black text-[#003d9b] bg-[#dae2ff] hover:bg-[#c4d2ff] rounded-xl transition-all uppercase tracking-widest"
            >
              Xem tất cả nhật ký
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}