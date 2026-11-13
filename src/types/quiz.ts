export interface QuizQuestion {
  id: string;
  text: string;
  options: string[]; // 4 options
  correctIndex: number; // 0..3
  timeLimit?: number; // seconds, default 15
  explanation?: string;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  questions: QuizQuestion[];
}

export type RoomPhase = 'LOBBY' | 'COUNTDOWN' | 'QUESTION' | 'REVIEW' | 'LEADERBOARD' | 'FINISHED';

export type GameMode = 'bomb_tag' | 'glass_bridge' | 'lava_tiles' | 'classic';

export type WorldTheme = 'arcade' | 'pirate' | 'space' | 'castle';

export type TeamId = 'red' | 'blue' | 'green' | 'gold';

export interface TeamSummary {
  id: TeamId;
  name: string;
  icon: string;
  colorHex: string;
  totalScore: number;
  avgScore: number;
  memberCount: number;
  rank?: number;
}

export const TEAM_CONFIGS: Record<TeamId, { id: TeamId; name: string; shortName: string; icon: string; colorHex: string; bgClass: string; textClass: string }> = {
  red: {
    id: 'red',
    name: 'Skuad Naga Merah',
    shortName: 'Tim Merah',
    icon: '🔥',
    colorHex: '#ef4444',
    bgClass: 'bg-red-600',
    textClass: 'text-white',
  },
  blue: {
    id: 'blue',
    name: 'Skuad Hiu Biru',
    shortName: 'Tim Biru',
    icon: '🌊',
    colorHex: '#3b82f6',
    bgClass: 'bg-blue-600',
    textClass: 'text-white',
  },
  green: {
    id: 'green',
    name: 'Skuad Rimba Hijau',
    shortName: 'Tim Hijau',
    icon: '🌿',
    colorHex: '#10b981',
    bgClass: 'bg-emerald-500',
    textClass: 'text-slate-950',
  },
  gold: {
    id: 'gold',
    name: 'Skuad Petir Emas',
    shortName: 'Tim Emas',
    icon: '⚡',
    colorHex: '#eab308',
    bgClass: 'bg-amber-400',
    textClass: 'text-slate-950',
  },
};

export interface PlayerSummary {
  id: string;
  name: string;
  avatar: string;
  teamId?: TeamId | null;
  score: number;
  streak: number;
  maxStreak?: number;
  correctCount?: number;
  avgAnswerTimeMs?: number;
  bombPasses?: number;
  survivedRounds?: number;
  totalQuestions?: number;
  rank?: number;
  answeredCurrent?: boolean;
  x?: number;
  z?: number;
  jumping?: boolean;
  currentAnswer?: number | null;
  exploded?: boolean;
}

export interface PostGameAward {
  id: string;
  title: string;
  icon: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  statLabel: string;
  description: string;
}

export interface AnswerStats {
  optionCounts: [number, number, number, number];
  totalAnswers: number;
}
