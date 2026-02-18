
import React, { useState, useEffect } from 'react';
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

export type ViewType = 'home' | 'astrology' | 'numerology' | 'fengshui' | 'fortune' | 'prayer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [stats] = useState<UserStats>({
    totalViews: 9245,
    numerologyCounts: {
      1: 952, 2: 820, 3: 1167, 4: 687, 5: 942, 6: 810, 7: 734, 8: 1256, 9: 945, 11: 445, 22: 332, 33: 283
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const BackButton = () => (
    <div className="mt-8 mb-24 text-center">
      <button 
        onClick={() => setCurrentView('home')}
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
      case 'astrology':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Astrology />
            <BackButton />
          </div>
        );
      case 'numerology':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Numerology />
            <BackButton />
          </div>
        );
      case 'fengshui':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <FengShui />
            <BackButton />
          </div>
        );
      case 'fortune':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Fortune />
            <BackButton />
          </div>
        );
      case 'prayer':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Prayer />
            <BackButton />
          </div>
        );
      default:
        return (
          <div className="animate-in fade-in duration-1000">
            <Hero onNavigate={setCurrentView} />
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
              <Stats stats={stats} />
            </div>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      <StarBackground />
      <div className="relative z-10">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
