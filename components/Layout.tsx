
import React from 'react';
import { ViewType } from '../App';
import { useAudio } from '../context/AudioContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const { isMuted, toggleMute, playSFX } = useAudio();

  const handleNav = (view: ViewType) => {
    playSFX('whoosh');
    onNavigate(view);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Nút điều khiển âm thanh độc lập - Luôn nổi lên trên cùng */}
      <div className="fixed bottom-8 right-8 z-[999]">
        <button 
          onClick={toggleMute}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-red-950/80 backdrop-blur-xl border border-amber-500/40 text-amber-400 hover:border-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all active:scale-90"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <div className="flex items-end gap-1 h-5">
              <div className="w-1 bg-amber-400 animate-[sound-bar_0.5s_infinite_alternate]"></div>
              <div className="w-1 bg-amber-400 animate-[sound-bar_0.8s_infinite_alternate_0.2s]"></div>
              <div className="w-1 bg-amber-400 animate-[sound-bar_0.6s_infinite_alternate_0.1s]"></div>
            </div>
          )}
        </button>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="absolute inset-0 bg-red-950/80 backdrop-blur-xl border-b border-amber-500/20"></div>
        
        <div 
          className="relative flex items-center gap-3 cursor-pointer group z-10"
          onClick={() => handleNav('home')}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xs">2026</span>
          </div>
          <div className="flex flex-col">
            <span className="font-viet font-bold text-lg text-amber-400 leading-none">LINH KHÍ</span>
            <span className="text-[10px] text-red-200 font-bold tracking-[0.2em] uppercase">Bính Ngọ 2026</span>
          </div>
        </div>
        
        <div className="relative hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-amber-500/10">
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
              onClick={() => handleNav(nav.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${
                currentView === nav.id 
                ? 'bg-red-700 text-amber-200' 
                : 'text-red-200/60 hover:text-amber-300'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </nav>
      
      <main className="relative z-10 pt-20 flex-grow">
        {children}
      </main>
      
      <footer className="relative z-10 py-10 px-6 border-t border-amber-500/10 bg-red-950/20 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 text-center md:text-left">
          <p className="text-amber-200/50 text-[10px] font-bold tracking-[0.1em] uppercase">
            LINH KHÍ LABS © 2026 - GIAO THOA CỔ TRUYỀN & CÔNG NGHỆ
          </p>
          <div className="flex gap-6 text-xs font-bold text-amber-200/40">
            <span>XUÂN AN KHANG</span>
            <span>VẠN SỰ NHƯ Ý</span>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes sound-bar {
          from { height: 4px; }
          to { height: 16px; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
