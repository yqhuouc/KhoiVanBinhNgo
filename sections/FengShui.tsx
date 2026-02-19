
import React, { useState } from 'react';
import { getFengShuiInsight } from '../geminiService';
import { FengShuiResult } from '../types';
import { useAudio } from '../context/AudioContext';

const FengShui: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FengShuiResult | null>(null);
  const [form, setForm] = useState({ year: '1990', houseDirection: 'Hướng Đông', concern: 'Tài lộc' });
  const { playSFX } = useAudio();

  const years = Array.from({ length: 80 }, (_, i) => (2026 - i).toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSFX('click');
    setLoading(true);
    try {
      const data = await getFengShuiInsight(form.year, form.houseDirection, form.concern);
      setResult(data);
      playSFX('success');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-viet font-bold text-white mb-2">ĐỊA LÝ <span className="text-amber-500">PHONG THỦY</span></h2>
        <p className="text-red-200/40 font-bold uppercase tracking-[0.4em] text-xs">Cải biến vận mệnh - Kích hoạt khí mạch</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="glass-tet p-8 rounded-[2.5rem] border-amber-500/20">
            <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-8">Thông tin cư thất</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Năm sinh gia chủ</label>
                <select value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none">
                  {years.map(y => <option key={y} value={y} className="bg-red-950">{y}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Hướng nhà/văn phòng</label>
                <select value={form.houseDirection} onChange={(e) => setForm({...form, houseDirection: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none">
                  {['Hướng Đông', 'Hướng Tây', 'Hướng Nam', 'Hướng Bắc', 'Hướng Đông Bắc', 'Hướng Đông Nam', 'Hướng Tây Bắc', 'Hướng Tây Nam'].map(d => <option key={d} value={d} className="bg-red-950">{d}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Vấn đề quan tâm nhất</label>
                <select value={form.concern} onChange={(e) => setForm({...form, concern: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none">
                  <option value="Tài lộc">Tài lộc & Sự nghiệp</option>
                  <option value="Sức khỏe">Sức khỏe & Bình an</option>
                  <option value="Tình duyên">Tình duyên & Gia đạo</option>
                  <option value="Học hành">Học hành & Thi cử</option>
                </select>
              </div>
              <button disabled={loading} className="w-full py-4 btn-tet rounded-2xl text-amber-200 font-bold uppercase tracking-widest text-xs mt-4">
                {loading ? 'Đang đo đạc...' : 'Xem phong thủy 2026'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {loading ? (
             <div className="h-[600px] glass-tet rounded-[3rem] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-amber-500 rounded-full animate-spin mb-6"></div>
                <p className="text-amber-500 font-bold tracking-widest animate-pulse uppercase text-xs">Đang xoay la bàn địa lý...</p>
             </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
               <div className="glass-tet p-10 rounded-[2.5rem] border-amber-500/20 bg-gradient-to-br from-amber-600/10 to-transparent">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Bản mệnh ngũ hành</span>
                      <h3 className="text-4xl font-viet text-white">{result.element} - {result.destinyType}</h3>
                    </div>
                  </div>
                  <p className="text-red-100/80 text-lg leading-relaxed italic">"{result.description}"</p>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-tet p-8 rounded-3xl border-emerald-500/20">
                     <h4 className="text-emerald-400 font-bold uppercase text-[10px] mb-6">Hướng đại cát đại lợi</h4>
                     <div className="space-y-4">
                        {result.goodDirections.map((d, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-white font-bold">{d.direction}</span>
                            <span className="text-[10px] text-red-200/50">{d.meaning}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="glass-tet p-8 rounded-3xl">
                     <h4 className="text-amber-500 font-bold uppercase text-[10px] mb-6">Màu sắc chiêu tài</h4>
                     <div className="flex flex-wrap gap-2">
                        {result.luckyColors.map((c, i) => <span key={i} className="px-4 py-2 bg-red-900/30 rounded-xl text-xs font-bold text-red-100/70 border border-amber-500/10 uppercase">{c}</span>)}
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-tet p-8 rounded-3xl border-indigo-500/10">
                    <h4 className="text-indigo-400 font-bold uppercase text-[10px] mb-4">Bố trí không gian</h4>
                    <p className="text-sm text-red-100/70 leading-relaxed">{result.deskSetup}</p>
                  </div>
                  <div className="glass-tet p-8 rounded-3xl border-red-500/10">
                    <h4 className="text-red-400 font-bold uppercase text-[10px] mb-4">Kích hoạt tài lộc</h4>
                    <p className="text-sm text-red-100/70 leading-relaxed">{result.wealthActivation}</p>
                  </div>
               </div>

               <div className="glass-tet p-10 rounded-[2.5rem] border-amber-500/20">
                  <h4 className="text-amber-400 font-bold uppercase text-[10px] mb-8">Pháp bảo may mắn</h4>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {result.luckyItems.map((item, i) => (
                      <div key={i} className="space-y-2 group">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💎</span>
                          <span className="text-white font-bold group-hover:text-amber-500 transition-colors">{item.name}</span>
                        </div>
                        <div className="pl-10">
                          <p className="text-[10px] text-red-200/40 uppercase font-bold">Vị trí: {item.placement}</p>
                          <p className="text-xs text-red-100/60 italic">{item.purpose}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-[600px] glass-tet rounded-[3rem] border-dashed border-2 border-amber-500/10 flex flex-col items-center justify-center p-20 opacity-40">
              <span className="text-7xl mb-6">🧭</span>
              <p className="text-red-200/60 font-bold uppercase tracking-widest text-sm">Cung cấp tọa độ cư thất để xem phong thủy</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FengShui;
