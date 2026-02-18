
import React from 'react';
import { ViewType } from '../App';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Hiệu ứng đèn lồng mờ ảo */}
      <div className="absolute top-10 left-10 w-40 h-60 bg-red-600/10 blur-[80px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-600/5 blur-[100px] rounded-full animate-pulse"></div>

      <div className="relative space-y-8 max-w-5xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-900/40 border border-amber-500/30 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="text-amber-400 text-[11px] font-bold tracking-[0.2em] uppercase">Cung Chúc Tân Xuân 2026</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-viet font-bold text-white leading-none tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
          KHỞI VẬN <br />
          <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-500 bg-clip-text text-transparent glow-red">BÍNH NGỌ</span>
        </h1>
        
        <p className="text-red-100/70 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 italic">
          "Xuân đáo bình an đắc lợi lộc - Nhân nghênh phú quý kiến minh đường"<br/>
          Sử dụng trí tuệ nhân tạo để giải mã tinh hoa huyền học cho riêng bạn.
        </p>

        <div className="pt-6 animate-in fade-in slide-in-from-bottom-14 duration-1000 flex flex-col sm:flex-row gap-4 items-center justify-center">
           <button 
             onClick={() => onNavigate('prayer')}
             className="group relative px-10 py-5 bg-red-700 hover:bg-red-600 border border-amber-500/30 text-amber-200 font-black rounded-full transition-all shadow-xl hover:scale-105 active:scale-95"
           >
              <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase text-sm">
                <span className="text-2xl">🙏</span> NGUYỆN CẦU LINH ỨNG
              </span>
           </button>
           
           <button 
             onClick={() => onNavigate('fortune')}
             className="group relative px-10 py-5 bg-amber-500 hover:bg-amber-400 text-red-950 font-black rounded-full transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95"
           >
              <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase text-sm">
                <span className="text-2xl">🏮</span> GIEO QUẺ ĐẦU XUÂN
              </span>
              <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-20"></div>
           </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-16 duration-1000">
          {[
            { id: 'astrology', title: 'XEM TỬ VI 2026', icon: '✨', desc: 'Lá số & Vận hạn 12 tháng' },
            { id: 'numerology', title: 'THẦN SỐ HỌC', icon: '🎋', desc: 'Giải mã tên & ngày sinh' },
            { id: 'fengshui', title: 'PHONG THỦY', icon: '☯️', desc: 'Hướng nhà & Chiêu tài' }
          ].map((item, idx) => (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id as ViewType)}
              className="group relative h-56 glass-tet rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 hover:border-amber-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/80 z-0"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 gap-3">
                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                <span className="text-sm font-bold tracking-widest text-amber-400 group-hover:text-amber-200 transition-colors">{item.title}</span>
                <p className="text-[10px] text-red-200/60 uppercase font-medium">{item.desc}</p>
                <div className="w-10 h-0.5 bg-amber-500/30 group-hover:w-20 group-hover:bg-amber-500 transition-all duration-500"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <div className="text-[10px] font-bold text-amber-500 tracking-[0.3em] uppercase animate-pulse">Cuộn để xem thống kê</div>
      </div>
    </section>
  );
};

export default Hero;
