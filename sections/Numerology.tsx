
import React, { useState } from 'react';
import { getNumerologyInsight } from '../geminiService';
import { NumerologyResult } from '../types';
import { useAudio } from '../context/AudioContext';

const Numerology: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [form, setForm] = useState({ fullName: '', commonName: '', dob: '' });
  const { playSFX } = useAudio();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSFX('click');
    setLoading(true);
    try {
      const data = await getNumerologyInsight(form.fullName, form.commonName, form.dob);
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
      <div className="mb-16 text-center space-y-4">
        <h2 className="text-5xl font-viet font-bold text-white tracking-tight">KHOA HỌC <span className="text-amber-500">CON SỐ</span></h2>
        <p className="text-red-200/40 font-bold uppercase tracking-[0.4em] text-xs">Giải mã định mệnh qua tên tuổi và ngày sinh</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="glass-tet p-8 rounded-[2.5rem] border-amber-500/20 sticky top-24">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Họ tên khai sinh</label>
                <input required type="text" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white uppercase font-bold" placeholder="NGUYỄN VĂN A" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Tên thường dùng (Biệt danh)</label>
                <input type="text" value={form.commonName} onChange={(e) => setForm({...form, commonName: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white" placeholder="VD: Tèo" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-red-200/40 uppercase ml-1">Ngày sinh</label>
                <input required type="date" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} className="w-full bg-red-950/40 border border-amber-500/10 rounded-2xl px-4 py-3.5 text-white" />
              </div>
              <button disabled={loading} className="w-full py-4 btn-tet rounded-2xl text-amber-200 font-bold uppercase tracking-widest text-xs mt-4">
                {loading ? 'Đang tính toán...' : 'Giải mã năng lượng'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <div className="h-[500px] glass-tet rounded-[3rem] flex flex-col items-center justify-center p-12">
               <div className="w-16 h-16 border-t-4 border-amber-500 rounded-full animate-spin mb-6"></div>
               <p className="text-amber-500 font-bold tracking-widest animate-pulse uppercase text-xs">Hệ thống đang rung động các con số...</p>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
              {/* Core Numbers Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Số Chủ Đạo', val: result.lifePathNumber, desc: 'Lộ trình cuộc đời', color: 'amber' },
                  { label: 'Số Linh Hồn', val: result.soulNumber, desc: 'Khao khát bên trong', color: 'red' },
                  { label: 'Số Biểu Đạt', val: result.expressionNumber, desc: 'Phong cách bên ngoài', color: 'emerald' },
                  { label: 'Năm Cá Nhân', val: result.personalYear2026, desc: 'Vận trình 2026', color: 'indigo' }
                ].map((item, i) => (
                  <div key={i} className="glass-tet p-6 rounded-3xl text-center border-amber-500/10 hover:border-amber-500/30 transition-all">
                    <span className="text-[10px] font-bold text-red-200/40 uppercase block mb-3">{item.label}</span>
                    <div className="text-5xl font-viet text-white mb-2 glow-gold">{item.val}</div>
                    <span className="text-[8px] text-amber-500/60 font-bold uppercase">{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="glass-tet p-10 rounded-[2.5rem]">
                <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-6">Bản chất con người</h3>
                <p className="text-red-100/80 text-lg leading-relaxed italic">"{result.meaning}"</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="glass-tet p-8 rounded-3xl border-emerald-500/20">
                    <h4 className="text-emerald-400 font-bold uppercase text-[10px] mb-4">Ưu điểm nổi bật</h4>
                    <div className="space-y-3">
                      {result.strengths.map((s, i) => <div key={i} className="text-sm text-red-100/70 flex gap-2"><span>★</span> {s}</div>)}
                    </div>
                 </div>
                 <div className="glass-tet p-8 rounded-3xl border-red-500/20">
                    <h4 className="text-red-400 font-bold uppercase text-[10px] mb-4">Thách thức tiềm ẩn</h4>
                    <div className="space-y-3">
                      {result.challenges.map((s, i) => <div key={i} className="text-sm text-red-100/70 flex gap-2"><span>!</span> {s}</div>)}
                    </div>
                 </div>
              </div>

              <div className="glass-tet p-10 rounded-[2.5rem] border-indigo-500/20">
                <h3 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-4">Định hướng nghề nghiệp</h3>
                <p className="text-red-100/80 leading-relaxed">{result.careerGuidance}</p>
              </div>
            </div>
          ) : (
            <div className="h-[500px] glass-tet rounded-[3rem] border-dashed border-2 border-amber-500/10 flex flex-col items-center justify-center p-20 opacity-40">
              <span className="text-7xl mb-6">🔢</span>
              <p className="text-red-200/60 font-bold uppercase tracking-widest text-sm">Nhập thông tin để giải mã định mệnh</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Numerology;
