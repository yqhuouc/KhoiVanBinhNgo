
import React, { useState } from 'react';
import { getPrayerResponse } from '../geminiService';
import { PrayerResult } from '../types';

const Prayer: React.FC = () => {
  const [wish, setWish] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PrayerResult | null>(null);

  const handlePray = async () => {
    if (!wish.trim()) return alert("Hãy ghi lại điều tâm nguyện của bạn.");
    setLoading(true);
    setIsBurning(true);
    
    try {
      const data = await getPrayerResponse(wish);
      setResult(data);
      setIsSent(true);
    } catch (error) {
      console.error(error);
      alert("Huyền không bị nhiễu, hãy thử lại.");
      setIsBurning(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 relative min-h-[75vh]">
      {/* Background Aura Effect when sent */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-2000 ${isSent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-amber-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="mb-16 text-center relative z-10">
        <h2 className="text-5xl font-viet font-bold text-white mb-4 uppercase">LINH ỨNG <span className="text-amber-500">NGUYỆN CẦU</span></h2>
        <p className="text-red-200/40 uppercase tracking-[0.4em] font-bold text-[10px] max-w-lg mx-auto leading-relaxed">
          Thành tâm hướng thiện, vạn sự tùy duyên. <br /> Lời nguyện gửi đi, hào quang tỏa rạng.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Altar Area with Buddha Statue */}
        <div className={`relative flex flex-col items-center justify-center w-full max-w-2xl h-[450px] glass-tet rounded-[4rem] p-12 overflow-hidden border-amber-500/20 mb-12 transition-all duration-1000 ${isSent ? 'shadow-[0_0_100px_rgba(251,191,36,0.3)] border-amber-500/50' : ''}`}>
           <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/40 to-transparent"></div>
           
           {/* Buddha Statue Representation */}
           <div className="relative mb-8 flex flex-col items-center">
              {/* Back Aura Circle */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-500/20 transition-all duration-1000 ${isSent ? 'scale-150 opacity-100 bg-amber-500/10 blur-xl animate-pulse' : 'scale-100 opacity-40'}`}></div>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-500/5 transition-all duration-2000 ${isSent ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}></div>
              
              {/* Buddha Figure (SVG icon for better aesthetics) */}
              <div className={`relative z-10 transition-all duration-1000 ${isSent ? 'scale-110' : 'scale-100'}`}>
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isSent ? 'drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]' : 'drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]'}`}>
                  <path d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7C8 7.5 6 9.5 6 12C6 13.5 6.5 14.5 7.5 15C7 16 7 17.5 8.5 18.5C10 19.5 11 20 12 20C13 20 14 19.5 15.5 18.5C17 17.5 17 16 16.5 15C17.5 14.5 18 13.5 18 12C18 9.5 16 7.5 13 7C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z" fill={isSent ? "#fbbf24" : "#92400e"} className="transition-colors duration-1000" />
                  <path d="M7 21C7 20 8 19 12 19C16 19 17 20 17 21" stroke={isSent ? "#fbbf24" : "#92400e"} strokeWidth="1.5" strokeLinecap="round" className="transition-colors duration-1000" />
                </svg>
              </div>
              
              {/* Lotus Base */}
              <div className="relative -mt-6">
                <div className={`w-32 h-6 bg-gradient-to-r from-red-900 via-amber-700 to-red-900 rounded-[100%] border-b-2 border-amber-600 transition-all ${isSent ? 'shadow-[0_5px_15px_rgba(251,191,36,0.4)]' : ''}`}></div>
              </div>
           </div>
           
           {/* Incense Bowl */}
           <div className="relative mt-8 flex flex-col items-center">
              <div className="relative w-20 h-12 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-xl border-x-2 border-amber-600 shadow-2xl flex items-start justify-center pt-1">
                 <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="relative w-0.5 h-16 bg-amber-200/20 rounded-full flex flex-col items-center">
                         {isBurning && (
                           <>
                             <div className="absolute top-0 w-1 h-1 bg-red-500 rounded-full blur-[1px] animate-pulse"></div>
                             {[...Array(3)].map((_, j) => (
                               <div key={j} className="smoke-particle absolute top-0 w-2 h-2 bg-white/10 rounded-full blur-md" style={{ animationDelay: `${j * 0.7}s`, animationDuration: '4s' }}></div>
                             ))}
                           </>
                         )}
                         <div className="h-2/3 bg-red-950/40 w-full mt-auto rounded-b-full"></div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {!isSent ? (
          <div className="w-full max-w-lg space-y-6 animate-in fade-in duration-700">
            <div className="relative">
              <textarea 
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Khấn nguyện điều lành, tâm can thanh tịnh..."
                className="w-full h-36 bg-red-950/40 border border-amber-500/10 rounded-[2rem] p-8 text-white text-center italic placeholder:text-red-900 focus:ring-1 focus:ring-amber-500/30 outline-none resize-none transition-all"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-950 px-4 py-1 rounded-full border border-amber-500/20">
                <span className="text-[8px] font-bold text-amber-500/40 tracking-widest uppercase">Thành tâm khấn vái</span>
              </div>
            </div>
            
            <button 
              onClick={handlePray}
              disabled={loading}
              className="w-full py-5 btn-tet rounded-full text-amber-200 font-bold uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  ĐANG KẾT NỐI HUYỀN KHÔNG...
                </>
              ) : (
                <>
                  <span className="group-hover:rotate-12 transition-transform">🏮</span> 
                  GỬI LỜI NGUYỆN CẦU
                </>
              )}
            </button>
          </div>
        ) : result && (
          <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="glass-tet p-12 rounded-[3.5rem] border-amber-500/40 bg-gradient-to-br from-red-950 via-black to-black text-center relative shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-400 px-8 py-2.5 rounded-full text-[10px] font-black text-red-950 tracking-[0.4em] uppercase shadow-xl">
                  LỜI PHÁN LINH ỨNG
                </div>
                
                <div className="space-y-8 mt-4">
                  <div className="relative">
                    <div className="text-amber-500 font-viet text-3xl md:text-4xl leading-snug tracking-tight">
                      "{result.blessing}"
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500/40"></div>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/30"></div>
                  </div>
                  
                  <p className="text-red-100/70 italic text-xl leading-relaxed font-light">
                    "{result.spiritAdvice}"
                  </p>
                </div>

                <div className="mt-14 pt-10 border-t border-white/5 flex flex-col items-center">
                   <div className="relative group cursor-help">
                      <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <span className="text-3xl">🧧</span>
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-[0.3em]">Bảo Vật Hộ Thân: <span className="text-white">{result.luckySymbol}</span></span>
                </div>

                <button 
                  onClick={() => { setIsSent(false); setIsBurning(false); setWish(''); setResult(null); }}
                  className="mt-14 text-amber-500/30 hover:text-amber-500 font-bold text-[10px] uppercase tracking-[0.5em] transition-all hover:tracking-[0.6em]"
                >
                  Tiếp Tục Tu Tập & Nguyện Cầu
                </button>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prayer;
