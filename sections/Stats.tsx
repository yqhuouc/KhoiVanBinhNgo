
import React from 'react';
import { UserStats } from '../types';

interface StatsProps {
  stats: UserStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <section className="mt-24 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-2xl font-viet font-bold text-white tracking-widest">KẾT NỐI <span className="text-amber-500">LINH KHÍ</span></h2>
          <p className="text-[10px] text-red-200/40 font-bold tracking-[0.2em] uppercase">Hoạt động cộng đồng đón Xuân</p>
        </div>
        <div className="px-4 py-1.5 glass-tet rounded-lg border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest">
          TRẠNG THÁI: TRỰC TUYẾN
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 glass-tet p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center border-amber-500/10 relative">
          <div className="text-5xl font-viet font-bold text-white mb-2 glow-gold tracking-tighter">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="text-red-200/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Lượt Giải Mã Vận Mệnh</div>
          
          <div className="flex -space-x-3">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-red-950 overflow-hidden">
                 <img src={`https://picsum.photos/seed/${i + 200}/80/80`} alt="user" className="w-full h-full object-cover" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full bg-red-700 border-2 border-red-950 flex items-center justify-center text-[10px] font-bold text-white">+99</div>
          </div>
        </div>

        <div className="md:col-span-3 glass-tet p-10 rounded-[2.5rem] border-amber-500/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-white text-sm tracking-[0.1em] uppercase">Tỉ Lệ Con Số Chủ Đạo Toàn Cầu</h3>
            <span className="text-[8px] font-bold text-amber-500/60 uppercase">Dữ liệu thời gian thực</span>
          </div>
          
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-3 items-end h-32">
            {Object.entries(stats.numerologyCounts).map(([num, count]) => {
              const height = (Number(count) / 1200) * 100;
              return (
                <div key={num} className="flex flex-col items-center gap-3 group cursor-help">
                  <div className="relative w-full">
                    <div 
                      className="w-full bg-amber-500/20 group-hover:bg-amber-500/50 transition-all rounded-t-lg border-t border-amber-500/30"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-all">
                        {count}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-200/40 group-hover:text-white transition-colors">{num}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 pt-8 border-t border-amber-500/10 flex justify-around text-center">
             <div>
                <div className="text-emerald-400 font-bold text-lg tracking-tighter">99.1%</div>
                <div className="text-[8px] text-red-200/40 font-bold uppercase tracking-widest mt-1">Độ Chính Xác</div>
             </div>
             <div>
                <div className="text-amber-400 font-bold text-lg tracking-tighter">24/7</div>
                <div className="text-[8px] text-red-200/40 font-bold uppercase tracking-widest mt-1">Hỗ Trợ Tâm Linh</div>
             </div>
             <div>
                <div className="text-red-400 font-bold text-lg tracking-tighter">∞</div>
                <div className="text-[8px] text-red-200/40 font-bold uppercase tracking-widest mt-1">Trí Tuệ Cổ Xưa</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
