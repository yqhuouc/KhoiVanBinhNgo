import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type SFXType = 'click' | 'whoosh' | 'bell' | 'shake' | 'fire' | 'success' | 'hover';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSFX: (type: SFXType) => void;
  isReady: boolean;
  initAudio: () => void;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

// Vietnamese pentatonic scale frequencies across multiple octaves
const PENTATONIC = [
  130.81, 146.83, 164.81, 196.00, 220.00,  // C3 D3 E3 G3 A3
  261.63, 293.66, 329.63, 392.00, 440.00,  // C4 D4 E4 G4 A4
  523.25, 587.33, 659.25, 783.99, 880.00,  // C5 D5 E5 G5 A5
];

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// --- SFX Synthesizers ---

function playClick(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.08);
}

function playHover(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(gain).connect(dest);
  osc.start(now);
  osc.stop(now + 0.12);
}

function playWhoosh(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const noiseBuffer = createNoiseBuffer(ctx, 0.4);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  source.connect(filter).connect(gain).connect(dest);
  source.start(now);
  source.stop(now + 0.4);
}

function playBell(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const fundamentals = [523.25, 659.25, 783.99];
  fundamentals.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 4 + i;
    lfoGain.gain.value = 2;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + 3);

    const volume = i === 0 ? 0.2 : 0.1;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.setValueAtTime(volume, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
    osc.connect(gain).connect(dest);
    osc.start(now);
    osc.stop(now + 3);
  });
}

function playShake(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const noiseBuffer = createNoiseBuffer(ctx, 0.12);

  for (let i = 0; i < 3; i++) {
    const t = now + i * 0.04;
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    source.connect(filter).connect(gain).connect(dest);
    source.start(t);
    source.stop(t + 0.06);
  }
}

function playFire(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const noiseBuffer = createNoiseBuffer(ctx, 1.5);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(600, now);
  lp.frequency.linearRampToValueAtTime(1200, now + 0.3);
  lp.frequency.exponentialRampToValueAtTime(400, now + 1.5);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
  gain.gain.setValueAtTime(0.12, now + 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

  source.connect(lp).connect(gain).connect(dest);
  source.start(now);
  source.stop(now + 1.5);

  // Crackle overlay
  for (let i = 0; i < 6; i++) {
    const t = now + 0.15 + Math.random() * 1.0;
    const crackle = ctx.createBufferSource();
    crackle.buffer = createNoiseBuffer(ctx, 0.03);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.08, t);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2000;
    crackle.connect(hp).connect(cg).connect(dest);
    crackle.start(t);
    crackle.stop(t + 0.03);
  }
}

function playSuccess(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
  notes.forEach((freq, i) => {
    const t = now + i * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain).connect(dest);
    osc.start(t);
    osc.stop(t + 0.5);
  });
}

// --- Background Ambient Music Generator ---

class AmbientMusic {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private melodyInterval: ReturnType<typeof setInterval> | null = null;
  private running = false;

  constructor(ctx: AudioContext, masterGain: GainNode) {
    this.ctx = ctx;
    this.masterGain = masterGain;
  }

  start() {
    if (this.running) return;
    this.running = true;

    // Drone pad: low sine that slowly drifts
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.04;
    this.droneGain.connect(this.masterGain);

    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.value = 130.81; // C3
    const droneLfo = this.ctx.createOscillator();
    const droneLfoGain = this.ctx.createGain();
    droneLfo.frequency.value = 0.1;
    droneLfoGain.gain.value = 5;
    droneLfo.connect(droneLfoGain).connect(this.droneOsc.frequency);
    droneLfo.start();
    this.droneOsc.connect(this.droneGain);
    this.droneOsc.start();

    // Melody: random pentatonic notes with đàn-tranh-like timbre
    this.scheduleMelody();
  }

  private scheduleMelody() {
    const playNote = () => {
      if (!this.running) return;
      const freq = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
      const now = this.ctx.currentTime;
      const duration = 2 + Math.random() * 3;

      // Main tone (triangle = plucked string vibe)
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Vibrato for đàn tranh feel
      const vib = this.ctx.createOscillator();
      const vibGain = this.ctx.createGain();
      vib.frequency.value = 5 + Math.random() * 2;
      vibGain.gain.value = freq * 0.008;
      vib.connect(vibGain).connect(osc.frequency);
      vib.start(now);
      vib.stop(now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
      gain.gain.setValueAtTime(0.05, now + duration * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Gentle reverb-like effect via delayed copy
      const delay = this.ctx.createDelay(0.5);
      delay.delayTime.value = 0.15;
      const delayGain = this.ctx.createGain();
      delayGain.gain.value = 0.3;

      osc.connect(gain).connect(this.masterGain);
      gain.connect(delay).connect(delayGain).connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration);
    };

    playNote();
    this.melodyInterval = setInterval(() => {
      if (this.running) playNote();
    }, 2500 + Math.random() * 2500);
  }

  stop() {
    this.running = false;
    if (this.droneOsc) {
      try { this.droneOsc.stop(); } catch { /* already stopped */ }
      this.droneOsc = null;
    }
    if (this.droneGain) {
      this.droneGain.disconnect();
      this.droneGain = null;
    }
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }
}

// --- Provider ---

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientRef = useRef<AmbientMusic | null>(null);
  const mutedRef = useRef(true);

  const initAudio = useCallback(async () => {
    if (isReady) return;

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;

    const context = new AC();
    if (context.state === 'suspended') {
      await context.resume();
    }
    ctxRef.current = context;

    const master = context.createGain();
    master.gain.value = 1;
    master.connect(context.destination);
    masterGainRef.current = master;

    const ambient = new AmbientMusic(context, master);
    ambient.start();
    ambientRef.current = ambient;

    mutedRef.current = false;
    setIsMuted(false);
    setIsReady(true);
  }, [isReady]);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setIsMuted(next);

    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        next ? 0 : 1,
        ctxRef.current.currentTime,
        0.15
      );
    }
  }, []);

  const playSFX = useCallback((type: SFXType) => {
    const ctx = ctxRef.current;
    if (!ctx || ctx.state !== 'running' || mutedRef.current) return;

    const dest = ctx.destination;
    switch (type) {
      case 'click':   playClick(ctx, dest); break;
      case 'hover':   playHover(ctx, dest); break;
      case 'whoosh':  playWhoosh(ctx, dest); break;
      case 'bell':    playBell(ctx, dest); break;
      case 'shake':   playShake(ctx, dest); break;
      case 'fire':    playFire(ctx, dest); break;
      case 'success': playSuccess(ctx, dest); break;
    }
  }, []);

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute, playSFX, isReady, initAudio }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioCtx);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
