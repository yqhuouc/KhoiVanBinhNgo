
import React from 'react';
import { ViewType } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Khung viền trang trí kiểu cổ điển */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-amber-500/30 m-6 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-amber-500/30 m-6 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-amber-500/30 m-6 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-amber-500/30 m-6 rounded-br-xl"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[60] h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="absolute inset-0 bg-red-950/60 backdrop-blur-xl border-b border-amber-500/20"></div>
        
        <div 
          className="relative flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)] group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xs">2026</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-viet font-bold text-lg text-amber-400 leading-none">LINH KHÍ</span>
            <span className="text-[10px] text-red-200 font-bold tracking-[0.2em] uppercase">Bính Ngọ 2026</span>
          </div>
        </div>
        
        <div className="relative hidden md:flex items-center gap-1 bg-black/20 p-1.5 rounded-xl border border-amber-500/10">
          {[
            { id: 'home' as ViewType, label: 'TRANG CHỦ' },
            { id: 'prayer' as ViewType, label: 'CẦU NGUYỆN' },
            { id: 'fortune' as ViewType, label: 'GIEO QUẺ' },
            { id: 'astrology' as ViewType, label: 'TỬ VI' },
            { id: 'numerology' as ViewType, label: 'THẦN SỐ' },
            { id: 'fengshui' as ViewType, label: 'PHONG THỦY' },
          ].map((nav) => (
            <button 
              key={nav.id}
              onClick={() => onNavigate(nav.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${
                currentView === nav.id 
                ? 'bg-red-700 text-amber-200 shadow-inner' 
                : 'text-red-200/60 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </div>

        <div className="relative flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end text-[10px] font-bold">
            <span className="text-amber-400">TRẠNG THÁI: KIẾT TƯỜNG</span>
            <span className="text-red-300/50">TẾT BÍNH NGỌ 2026</span>
          </div>
        </div>
      </nav>
      
      <main className="relative z-10 pt-20 flex-grow">
        {children}
      </main>
      
      <footer className="relative z-10 py-10 px-6 border-t border-amber-500/10 bg-red-950/20 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-amber-200/50 text-[10px] font-bold tracking-[0.1em] uppercase">
            LINH KHÍ LABS © 2026 - GIAO THOA CỔ TRUYỀN & CÔNG NGHỆ
          </p>
          <div className="flex gap-6 text-xs font-bold text-amber-200/40">
            <span>XUÂN AN KHANG</span>
            <span>VẠN SỰ NHƯ Ý</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
