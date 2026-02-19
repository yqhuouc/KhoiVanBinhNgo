
export enum ServiceType {
  ASTROLOGY = 'ASTROLOGY',
  NUMEROLOGY = 'NUMEROLOGY',
  FENGSHUI = 'FENGSHUI',
  FORTUNE = 'FORTUNE',
  PRAYER = 'PRAYER'
}

export interface UserStats {
  totalViews: number;
  numerologyCounts: Record<number, number>;
}

export interface AstrologyResult {
  overview: string;
  stars: { name: string; effect: string; remedy: string }[];
  monthlyLuck: { month: number; insight: string; rating: number }[];
  career: string;
  love: string;
  finance: string;
  health: string;
  advice: string;
}

export interface NumerologyResult {
  lifePathNumber: number;
  soulNumber: number;
  expressionNumber: number;
  personalYear2026: number;
  meaning: string;
  strengths: string[];
  challenges: string[];
  careerGuidance: string;
  monthlyVibration: { month: string; advice: string }[];
}

export interface FengShuiResult {
  element: string;
  destinyType: string;
  luckyColors: string[];
  goodDirections: { direction: string; meaning: string }[];
  deskSetup: string;
  wealthActivation: string;
  luckyItems: { name: string; placement: string; purpose: string }[];
  description: string;
}

export interface FortuneResult {
  title: string;
  rank: 'Đại Cát' | 'Trung Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  poem: string;
  translation: string;
  interpretation: {
    general: string;
    career: string;
    love: string;
    health: string;
  };
  advice: string;
}

export interface PrayerResult {
  blessing: string;
  spiritAdvice: string;
  luckySymbol: string;
}
