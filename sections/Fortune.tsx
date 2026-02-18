
import React, { useState } from 'react';
import { getFortuneInsight } from '../geminiService';
import { FortuneResult } from '../types';

const Fortune: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [stickOut, setStickOut] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);

  const handleShake = async () => {
    if (shaking || loading) return;
    
    setShaking(true);
    setStickOut(false);
    setResult(null);

    // Shake for 2.5 seconds for dramatic effect
    setTimeout(async () => {
      setShaking(false);
      setStickOut(true);
      setLoading(true);
      try {
        const data = await getFortuneInsight();
        setResult(data);
      } catch (error) {
        console.error(error);
        alert('Linh khí đang bị nhiễu loạn, xin hãy tịnh tâm gieo lại sau ít phút.');
        setStickOut(false);
      } finally {
        setLoading(false);
      }
    }, 2500);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-viet font-bold text-white mb-4">THÁNH Ý <span className="text-amber-500">BÍNH NGỌ</span></h2>
        <p className="text-red-200/40 uppercase tracking-[0.4em] font-bold text-[10px] max-w-lg mx-auto leading-relaxed">
          Tâm không tạp niệm, vạn sự tùy duyên. <br /> Chạm vào ống xăm để thỉnh quẻ đầu năm.
        </p>
      </div>

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center space-y-16 py-10">
          <div className="relative flex flex-col items-center cursor-pointer group" onClick={handleShake}>
            {/* Fortune Tube Visual - Enhanced aesthetics */}
            <div className={`relative w-40 h-60 bg-gradient-to-b from-red-800 to-red-950 rounded-t-3xl border-x-4 border-t-4 border-amber-600 shadow-[0_0_50px_rgba(153,27,27,0.4)] ${shaking ? 'shake-anim' : 'group-hover:scale-105 transition-transform duration-500'}`}>
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-1.5 px-4 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2.5 h-24 bg-amber-700 border border-amber-900/50 rounded-full shadow-md transform -rotate-3 group-hover:rotate-3 transition-transform duration-1000"></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 border-2 border-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="font-viet text-amber-500/30 text-5xl font-bold">福</span>
                 </div>
              </div>
              
              {/* Decorative label */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-500 px-3 py-1 rounded text-[8px] font-black text-red-950 tracking-widest uppercase">
                Linh Quẻ
              </div>
            </div>

            {/* Fallen Stick - Now invisible until shake finishes */}
            {stickOut && !shaking && (
              <div className="absolute top-24 left-1/2 -translate-x-1/2 stick-anim">
                <div className="w-5 h-48 bg-amber-400 border-2 border-amber-700 rounded-b-2xl shadow-2xl flex flex-col items-center pt-12">
                  <div className="w-full h-px bg-amber-700/30 mb-2"></div>
                  <div className="rotate-180 [writing-mode:vertical-lr] text-[10px] font-bold text-red-950 uppercase tracking-[0.3em]">THÁNH Ý ĐÃ ĐỊNH</div>
                </div>
              </div>
            )}
            
            {/* Hint text */}
            <div className="mt-12 text-center">
               <p className={`text-[10px] font-bold text-amber-500/60 uppercase tracking-[0.5em] animate-pulse transition-opacity ${shaking ? 'opacity-0' : 'opacity-100'}`}>
                 Chạm để gieo quẻ
               </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative w-20 h-20 mb-10">
             <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
             <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-3 text-center">
             <p className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">Đang thỉnh ý bề trên...</p>
             <p className="text-red-200/30 text-[9px] uppercase font-medium">Linh khí đang được hội tụ</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 pb-20">
          <div className="glass-tet p-12 rounded-[3.5rem] border-amber-500/30 bg-gradient-to-br from-red-950 to-black text-center relative overflow-hidden">
             {/* Background decorative elements */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 blur-3xl rounded-full"></div>
             
             <div className="mb-10">
                <span className="text-[10px] font-bold text-amber-500/40 uppercase tracking-[0.5em] mb-4 block">KẾT QUẢ QUẺ THÁNH</span>
                <h3 className="text-amber-500 font-viet text-4xl uppercase tracking-tighter glow-gold">{result.title}</h3>
             </div>
             
             <div className="relative mb-12">
                <div className="absolute -inset-4 bg-amber-500/5 rounded-[2.5rem] blur-xl"></div>
                <div className="relative bg-red-950/40 p-12 rounded-[2.5rem] border border-amber-500/10 inline-block w-full max-w-2xl">
                  {/* Decorative corner marks */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-amber-500/30"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-amber-500/30"></div>
                  
                  <p className="text-white font-viet text-2xl md:text-3xl leading-relaxed whitespace-pre-line mb-8 tracking-wide">
                    {result.poem}
                  </p>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mb-8"></div>
                  <p className="text-red-200/60 italic text-base leading-relaxed font-medium">
                    {result.translation}
                  </p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { title: 'Vận Thế Chung', content: result.interpretation.general, icon: '⚖️', color: 'amber' },
                  { title: 'Sự Nghiệp & Tài Lộc', content: result.interpretation.career, icon: '💼', color: 'emerald' },
                  { title: 'Tình Duyên & Gia Đạo', content: result.interpretation.love, icon: '❤️', color: 'rose' },
                  { title: 'Sức Khỏe & Bình An', content: result.interpretation.health, icon: '🧘', color: 'indigo' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-tet p-8 rounded-3xl border-white/5 hover:border-amber-500/20 transition-all group">
                     <h4 className={`text-${item.color}-400 font-bold uppercase text-[10px] mb-4 flex items-center gap-3 tracking-widest`}>
                       <span className="text-xl group-hover:scale-125 transition-transform">{item.icon}</span>
                       {item.title}
                     </h4>
                     <p className="text-sm text-red-100/70 leading-relaxed font-medium">{item.content}</p>
                  </div>
                ))}
             </div>

             <div className="mt-12 p-10 glass-tet rounded-[2.5rem] border-amber-500/20 bg-amber-500/5">
                <h4 className="text-amber-400 font-bold uppercase text-[10px] mb-5 tracking-[0.3em]">Lời Khuyên Từ Ẩn Sĩ</h4>
                <p className="text-xl text-white font-viet italic leading-relaxed">
                  "{result.advice}"
                </p>
             </div>

             <div className="mt-16 flex flex-col items-center gap-4">
                <button 
                  onClick={() => {setResult(null); setStickOut(false);}}
                  className="px-8 py-3 bg-red-900/40 hover:bg-red-900/60 border border-amber-500/20 rounded-full text-amber-500 font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Tạ Lễ & Gieo Quẻ Mới
                </button>
                <p className="text-[9px] text-red-200/20 uppercase font-medium">Mỗi lần gieo quẻ là một lần nhân duyên</p>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Fortune;
