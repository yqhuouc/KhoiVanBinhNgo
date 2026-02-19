
import React, { useState, useEffect, useCallback, useRef } from 'react';
import StarBackground from './components/StarBackground';
import Layout from './components/Layout';
import Hero from './sections/Hero';
import Astrology from './sections/Astrology';
import Numerology from './sections/Numerology';
import FengShui from './sections/FengShui';
import Fortune from './sections/Fortune';
import Prayer from './sections/Prayer';
import Stats from './sections/Stats';
import { UserStats } from './types';
import { useAudio } from './context/AudioContext';

export type ViewType = 'home' | 'astrology' | 'numerology' | 'fengshui' | 'fortune' | 'prayer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { isReady, initAudio, playSFX } = useAudio();
  const isFirstRender = useRef(true);
  const [stats] = useState<UserStats>({
    totalViews: 9245,
    numerologyCounts: {
      1: 952, 2: 820, 3: 1167, 4: 687, 5: 942, 6: 810, 7: 734, 8: 1256, 9: 945, 11: 445, 22: 332, 33: 283
    }
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      playSFX('whoosh');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, playSFX]);

  const handleNavigate = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const BackButton = () => (
    <div className="mt-8 mb-24 text-center">
      <button 
        onClick={() => handleNavigate('home')}
        className="group relative px-10 py-4 glass-tet rounded-full text-[10px] font-bold tracking-[0.3em] text-amber-400 hover:text-white transition-all overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
          ← Quay Lại Trang Chủ
        </span>
      </button>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'astrology': return <><Astrology /><BackButton /></>;
      case 'numerology': return <><Numerology /><BackButton /></>;
      case 'fengshui': return <><FengShui /><BackButton /></>;
      case 'fortune': return <><Fortune /><BackButton /></>;
      case 'prayer': return <><Prayer /><BackButton /></>;
      default:
        return (
          <div className="animate-in fade-in duration-1000">
            <Hero onNavigate={handleNavigate} />
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
              <Stats stats={stats} />
            </div>
          </div>
        );
    }
  };

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 text-center">
        <StarBackground />
        <div className="relative z-10 space-y-8 animate-in zoom-in-95 duration-1000">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(153,27,27,0.5)]">
            <span className="text-white font-viet text-3xl font-bold">2026</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-viet font-bold text-amber-400 tracking-tighter">LINH KHÍ BÍNH NGỌ</h1>
            <p className="text-red-200/50 text-[10px] font-bold uppercase tracking-[0.5em]">Giao thoa huyền học & Công nghệ</p>
          </div>
          <button 
            onClick={initAudio}
            className="px-12 py-5 bg-red-700 hover:bg-red-600 text-amber-200 font-black rounded-full border border-amber-500/30 transition-all hover:scale-105 active:scale-95 shadow-2xl tracking-[0.3em] text-sm uppercase"
          >
            Bắt Đầu Trải Nghiệm
          </button>
          <p className="text-amber-500/30 text-[9px] uppercase font-medium">Khám phá vận mệnh của bạn trong năm mới</p>
        </div>
      </div>
    );
  }

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate}>
      <StarBackground />
      <div className="relative z-10">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
