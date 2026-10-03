export type Language = 'uz' | 'ru';
export type Theme = 'light' | 'dark';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type LetterType = 'vowel' | 'consonant' | 'sign';

export interface IllustratedWord {
  ru: string;
  uz: string;
  emoji: string;
  transcription?: string;
}

export interface LetterInfo {
  letter: string; // Uppercase printed
  letterLower: string; // Lowercase printed
  cursiveUpper: string; // Cursive symbol / presentation
  cursiveLower: string; // Cursive lower
  type: LetterType;
  soundNameRu: string; // e.g., "А", "Бэ", "Вэ"
  soundPhonetic: string; // e.g. [а], [б], [в]
  words: IllustratedWord[];
  funFactUz: string;
  funFactRu: string;
  strokePaths: string[]; // SVG path d attributes for stroke animation & tracing
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  attended: boolean;
  stars: number;
  completedLetters: string[];
  quizScore: number;
}

export type LessonStage =
  | 'intro'
  | 'attendance'
  | 'review'
  | 'new-topic'
  | 'practice'
  | 'games'
  | 'quiz'
  | 'evaluation';

export type GameId =
  | 'find-letter'
  | 'memory-match'
  | 'letter-rain'
  | 'word-builder'
  | 'alphabet-train';

export interface AppSettings {
  lang: Language;
  theme: Theme;
  soundEnabled: boolean;
  bgMusicEnabled: boolean;
  speechRate: number; // 0.7 for slow, 1.0 normal
  difficulty: Difficulty;
  slowMode: boolean; // Astalik bilan rejimi
  highContrast: boolean;
  largeFont: boolean;
  voiceGuidance: boolean; // Read interface aloud
}
