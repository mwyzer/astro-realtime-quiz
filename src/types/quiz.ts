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

export type HatId = 'none' | 'crown' | 'wizard' | 'astronaut' | 'viking' | 'halo' | 'headphones';

export interface HatConfig {
  id: HatId;
  name: string;
  icon: string;
}

export const HAT_CONFIGS: HatConfig[] = [
  { id: 'none', name: 'Tanpa Topi', icon: '✖️' },
  { id: 'crown', name: 'Mahkota Emas', icon: '👑' },
  { id: 'wizard', name: 'Topi Penyihir', icon: '🧙‍♂️' },
  { id: 'astronaut', name: 'Helm Astronot', icon: '👨‍🚀' },
  { id: 'viking', name: 'Helm Viking', icon: '⚔️' },
  { id: 'halo', name: 'Cincin Malaikat', icon: '😇' },
  { id: 'headphones', name: 'Headphone Cyber', icon: '🎧' },
];

export interface OutfitColorConfig {
  id: string;
  name: string;
  hex: string;
  num: number;
}

export const OUTFIT_COLORS: OutfitColorConfig[] = [
  { id: 'pink', name: 'Neon Pink', hex: '#ec4899', num: 0xec4899 },
  { id: 'purple', name: 'Cyber Purple', hex: '#8b5cf6', num: 0x8b5cf6 },
  { id: 'cyan', name: 'Electric Cyan', hex: '#06b6d4', num: 0x06b6d4 },
  { id: 'orange', name: 'Blaze Orange', hex: '#f97316', num: 0xf97316 },
  { id: 'emerald', name: 'Emerald Green', hex: '#10b981', num: 0x10b981 },
  { id: 'crimson', name: 'Crimson Red', hex: '#ef4444', num: 0xef4444 },
  { id: 'gold', name: 'Royal Gold', hex: '#eab308', num: 0xeab308 },
  { id: 'stealth', name: 'Obsidian Dark', hex: '#334155', num: 0x334155 },
];

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
  hatId?: HatId;
  outfitColor?: string;
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
