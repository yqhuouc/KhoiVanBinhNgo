
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSFX: (type: 'click' | 'shake' | 'bell' | 'fire') => void;
  isReady: boolean;
  initAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Sử dụng các nguồn từ Wikimedia Commons (Hỗ trợ CORS cực tốt)
const ASSETS = {
  bgMusic: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Chopin_-_Nocturne_op_9_no_2_-_v2.mp3', // Relaxing piano
  click: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Click.mp3',
  shake: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Woodblock_01.mp3',
  bell: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Singing_bowl.mp3',
  fire: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Fire_Crackling_Sound.mp3'
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  const ctxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});
  const bgSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Khởi tạo AudioContext
  useEffect(() => {
    const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
    if (AudioCtx) {
      const context = new AudioCtx();
      ctxRef.current = context;
      const gain = context.createGain();
      gain.connect(context.destination);
      mainGainRef.current = gain;
    }

    // Tải tài nguyên (Background loading)
    const loadAssets = async () => {
      for (const [key, url] of Object.entries(ASSETS)) {
        try {
          const resp = await fetch(url);
          const arrayBuffer = await resp.arrayBuffer();
          if (ctxRef.current) {
            const audioBuffer = await ctxRef.current.decodeAudioData(arrayBuffer);
            buffersRef.current[key] = audioBuffer;
          }
        } catch (e) {
          console.warn(`[Audio] Không thể tải ${key}, sẽ sử dụng âm thanh tổng hợp dự phòng.`);
        }
      }
    };

    loadAssets();
  }, []);

  // Hàm tạo âm thanh dự phòng (Synthesizer) nếu file không tải được
  const playSynthesizedSound = (type: string) => {
    if (!ctxRef.current || isMuted) return;
    const osc = ctxRef.current.createOscillator();
    const gain = ctxRef.current.createGain();
    
    osc.connect(gain);
    gain.connect(ctxRef.current.destination);

    const now = ctxRef.current.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'bell') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 2);
      osc.start();
      osc.stop(now + 2);
    } else if (type === 'shake') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start();
      osc.stop(now + 0.05);
    }
  };

  const initAudio = async () => {
    if (!ctxRef.current) return;

    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume();
    }

    setIsReady(true);
    setIsMuted(false);

    // Phát nhạc nền nếu có buffer
    const bgBuffer = buffersRef.current.bgMusic;
    if (bgBuffer && mainGainRef.current) {
      const source = ctxRef.current.createBufferSource();
      source.buffer = bgBuffer;
      source.loop = true;
      source.connect(mainGainRef.current);
      source.start(0);
      bgSourceRef.current = source;
      mainGainRef.current.gain.setTargetAtTime(0.15, ctxRef.current.currentTime, 1);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (mainGainRef.current && ctxRef.current) {
      mainGainRef.current.gain.setTargetAtTime(nextMute ? 0 : 0.15, ctxRef.current.currentTime, 0.2);
    }
  };

  const playSFX = (type: 'click' | 'shake' | 'bell' | 'fire') => {
    if (isMuted || !ctxRef.current || ctxRef.current.state !== 'running') return;

    const buffer = buffersRef.current[type];
    if (buffer) {
      const source = ctxRef.current.createBufferSource();
      source.buffer = buffer;
      const sfxGain = ctxRef.current.createGain();
      sfxGain.gain.value = type === 'shake' ? 0.2 : 0.5;
      source.connect(sfxGain);
      sfxGain.connect(ctxRef.current.destination);
      source.start(0);
    } else {
      // Fallback sang âm thanh tổng hợp nếu không tải được file
      playSynthesizedSound(type);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSFX, isReady, initAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
