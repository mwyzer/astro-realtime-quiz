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

export interface PlayerSummary {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  rank?: number;
  answeredCurrent?: boolean;
  x?: number;
  z?: number;
  jumping?: boolean;
  currentAnswer?: number | null;
  exploded?: boolean;
}

export interface AnswerStats {
  optionCounts: [number, number, number, number];
  totalAnswers: number;
}
