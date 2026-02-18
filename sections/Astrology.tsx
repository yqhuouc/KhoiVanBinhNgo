
import React, { useState } from 'react';
import { getAstrologyInsight } from '../geminiService';
import { AstrologyResult } from '../types';

const Astrology: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AstrologyResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'monthly' | 'stars'>('overview');
  const [form, setForm] = useState({ dob: '', time: '12:00', gender: 'Nam', birthPlace: 'Hà Nội' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getAstrologyInsight(form.dob, form.time, form.gender, form.birthPlace);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Kết nối thần thức bị gián đoạn. Xin vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12 text-center md:text-left border-b border-amber-500/20 pb-8">
        <h2 className="text-5xl font-viet font-bold text-white mb-2">ĐẠI VẬN <span className="text-amber-500">2026</span></h2>
        <p className="text-red-200/60 uppercase tracking-[0.2em] font-bold text-xs">Lập lá số và luận giải chi tiết bởi Linh Khí AI</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-tet p-8 rounded-[2.5rem] border-amber-500/20">
            <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Khai báo Bản Mệnh
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Ngày sinh (Dương lịch)</label>
                <input required type="date" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Giờ sinh</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({...form, time: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Giới tính</label>
                  <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Nơi sinh (Tỉnh/Thành)</label>
                <input required type="text" value={form.birthPlace} onChange={(e) => setForm({...form, birthPlace: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white outline-none" placeholder="VD: TP. Hồ Chí Minh" />
              </div>
              <button disabled={loading} className="w-full py-4 btn-tet rounded-2xl text-amber-200 font-bold uppercase tracking-widest text-xs mt-4 shadow-lg active:scale-95 transition-all">
                {loading ? 'Đang luận giải...' : 'Khởi tạo Lá số'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 min-h-[600px]">
          {loading ? (
            <div className="h-full glass-tet rounded-[3rem] flex flex-col items-center justify-center p-12">
              <div className="w-16 h-16 border-t-4 border-amber-500 rounded-full animate-spin mb-6"></div>
              <p className="text-amber-500 font-bold tracking-widest animate-pulse">ĐANG BẤM QUẺ TỬ VI...</p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Navigation Tabs */}
              <div className="flex gap-2 p-1.5 glass-tet rounded-2xl border-white/5 w-fit">
                {[
                  { id: 'overview', label: 'Tổng Quan' },
                  { id: 'monthly', label: '12 Tháng' },
                  { id: 'stars', label: 'Sao Chiếu Mệnh' }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-red-200/50 hover:text-amber-300'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="glass-tet p-10 rounded-[2.5rem] border-amber-500/20">
                    <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-6">Vận trình 2026</h3>
                    <p className="text-red-500 font-viet text-xl mb-4">"Bính Ngọ niên, vạn sự hanh thông"</p>
                    <p className="text-red-100/80 leading-relaxed italic text-lg">"{result.overview}"</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass-tet p-6 rounded-3xl">
                      <h4 className="text-amber-500 font-bold text-[10px] uppercase mb-3">💼 Sự nghiệp</h4>
                      <p className="text-sm text-red-100/70">{result.career}</p>
                    </div>
                    <div className="glass-tet p-6 rounded-3xl">
                      <h4 className="text-amber-500 font-bold text-[10px] uppercase mb-3">💰 Tài chính</h4>
                      <p className="text-sm text-red-100/70">{result.finance}</p>
                    </div>
                    <div className="glass-tet p-6 rounded-3xl">
                      <h4 className="text-amber-500 font-bold text-[10px] uppercase mb-3">❤️ Tình duyên</h4>
                      <p className="text-sm text-red-100/70">{result.love}</p>
                    </div>
                    <div className="glass-tet p-6 rounded-3xl border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold text-[10px] uppercase mb-3">🍀 Lời khuyên</h4>
                      <p className="text-sm text-red-100/70">{result.advice}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'monthly' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {result.monthlyLuck.map((item, idx) => (
                    <div key={idx} className="glass-tet p-5 rounded-2xl flex flex-col items-center text-center border-white/5 hover:border-amber-500/20 transition-all group">
                      <span className="text-[10px] font-bold text-amber-500/50 uppercase mb-2">Tháng {item.month}</span>
                      <div className="text-2xl font-viet text-white mb-3 group-hover:scale-125 transition-transform">{item.rating}/10</div>
                      <p className="text-[10px] text-red-100/60 leading-relaxed">{item.insight}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stars' && (
                <div className="space-y-4">
                  {result.stars.map((star, idx) => (
                    <div key={idx} className="glass-tet p-8 rounded-3xl border-red-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 text-4xl opacity-10">☄️</div>
                      <h4 className="text-red-500 font-viet text-2xl mb-2">{star.name}</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <span className="text-[10px] font-bold text-amber-500 uppercase">Ảnh hưởng:</span>
                          <p className="text-sm text-red-100/70 mt-1">{star.effect}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">Cách hóa giải:</span>
                          <p className="text-sm text-red-100/70 mt-1">{star.remedy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full glass-tet rounded-[3rem] border-dashed border-2 border-amber-500/10 flex flex-col items-center justify-center p-20 opacity-40">
              <span className="text-7xl mb-6">📜</span>
              <p className="text-red-200/60 font-bold uppercase tracking-widest text-sm">Hãy nhập thông tin để khai mở lá số</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Astrology;
