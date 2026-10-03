import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppSettings, Difficulty, Language, LessonStage, LetterInfo, Student, Theme } from '../types';
import { RUSSIAN_ALPHABET } from '../data/alphabetData';
import { translations, Translations } from '../i18n/translations';
import {
  playCorrectSound,
  playFanfare,
  playIncorrectSound,
  playPopSound,
  playStarSound,
  speakRussian,
  speakVoiceGuidance,
  stopAllSpeech,
  toggleBackgroundMusic,
} from '../utils/audio';

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Madina', avatar: '👧🏻', attended: true, stars: 12, completedLetters: ['А', 'Б', 'В'], quizScore: 90 },
  { id: '2', name: 'Jasur', avatar: '👦🏻', attended: true, stars: 15, completedLetters: ['А', 'Б', 'М', 'О'], quizScore: 100 },
  { id: '3', name: 'Nilufar', avatar: '👧🏼', attended: true, stars: 10, completedLetters: ['А', 'Б'], quizScore: 85 },
  { id: '4', name: 'Temur', avatar: '👦🏽', attended: false, stars: 8, completedLetters: ['А'], quizScore: 70 },
  { id: '5', name: 'Rayhona', avatar: '👧🏽', attended: true, stars: 14, completedLetters: ['А', 'Б', 'В', 'Г'], quizScore: 95 },
  { id: '6', name: 'Aziz', avatar: '👦🏻', attended: true, stars: 11, completedLetters: ['А', 'М'], quizScore: 80 },
];

const DEFAULT_SETTINGS: AppSettings = {
  lang: 'uz',
  theme: 'light',
  soundEnabled: true,
  bgMusicEnabled: false,
  speechRate: 0.9,
  difficulty: 'easy',
  slowMode: false,
  highContrast: false,
  largeFont: false,
  voiceGuidance: false,
};

interface AppContextType {
  stage: LessonStage;
  setStage: (stage: LessonStage) => void;
  nextStage: () => void;
  prevStage: () => void;
  selectedLetterIndex: number;
  setSelectedLetterIndex: (idx: number) => void;
  currentLetter: LetterInfo;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  t: Translations;
  students: Student[];
  toggleAttendance: (id: string) => void;
  addStudent: (name: string) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  userStars: number;
  addStars: (qty?: number) => void;
  playAudio: (sound: 'pop' | 'correct' | 'incorrect' | 'star' | 'fanfare') => void;
  pronounceLetter: (letter?: string, slow?: boolean) => Promise<void>;
  pronounceWord: (word: string) => Promise<void>;
  voicePrompt: (text: string) => void;
  isMapOpen: boolean;
  setIsMapOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isParentsOpen: boolean;
  setIsParentsOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STAGES_ORDER: LessonStage[] = [
  'intro',
  'attendance',
  'review',
  'new-topic',
  'practice',
  'games',
  'quiz',
  'evaluation',
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restore settings from LocalStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('rus_alifbo_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Students list from LocalStorage
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('rus_alifbo_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [activeStudentId, setActiveStudentId] = useState<string>('1');
  const [stage, setStage] = useState<LessonStage>('intro');
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number>(0); // Default 'А'
  const [userStars, setUserStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('rus_alifbo_stars');
      return saved ? Number(saved) : 5;
    } catch {
      return 5;
    }
  });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isParentsOpen, setIsParentsOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rus_alifbo_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('rus_alifbo_students', JSON.stringify(students));
    } catch (e) {
      console.warn(e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('rus_alifbo_stars', userStars.toString());
    } catch (e) {
      console.warn(e);
    }
  }, [userStars]);

  // Handle Theme class on html document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [settings.theme, settings.highContrast]);

  // Handle background music toggle
  useEffect(() => {
    toggleBackgroundMusic(settings.bgMusicEnabled && settings.soundEnabled);
    return () => {
      toggleBackgroundMusic(false);
    };
  }, [settings.bgMusicEnabled, settings.soundEnabled]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const nextStage = () => {
    stopAllSpeech();
    const currIdx = STAGES_ORDER.indexOf(stage);
    if (currIdx < STAGES_ORDER.length - 1) {
      setStage(STAGES_ORDER[currIdx + 1]);
    }
  };

  const prevStage = () => {
    stopAllSpeech();
    const currIdx = STAGES_ORDER.indexOf(stage);
    if (currIdx > 0) {
      setStage(STAGES_ORDER[currIdx - 1]);
    }
  };

  const currentLetter = RUSSIAN_ALPHABET[selectedLetterIndex] || RUSSIAN_ALPHABET[0];

  const t = translations[settings.lang];

  const toggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, attended: !s.attended } : s))
    );
    playPopSound();
  };

  const addStudent = (name: string) => {
    if (!name.trim()) return;
    const avatars = ['👦🏻', '👧🏻', '👦🏽', '👧🏽', '👦🏼', '👧🏼'];
    const newStudent: Student = {
      id: Date.now().toString(),
      name: name.trim(),
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      attended: true,
      stars: 0,
      completedLetters: [],
      quizScore: 0,
    };
    setStudents((prev) => [...prev, newStudent]);
    playPopSound();
  };

  const addStars = (qty: number = 1) => {
    setUserStars((prev) => prev + qty);
    setStudents((prev) =>
      prev.map((s) => (s.id === activeStudentId ? { ...s, stars: s.stars + qty } : s))
    );
    if (settings.soundEnabled) {
      playStarSound();
    }
  };

  const playAudio = (sound: 'pop' | 'correct' | 'incorrect' | 'star' | 'fanfare') => {
    if (!settings.soundEnabled) return;
    switch (sound) {
      case 'pop':
        playPopSound();
        break;
      case 'correct':
        playCorrectSound();
        break;
      case 'incorrect':
        playIncorrectSound();
        break;
      case 'star':
        playStarSound();
        break;
      case 'fanfare':
        playFanfare();
        break;
    }
  };

  const pronounceLetter = async (letterToSay?: string, slow?: boolean) => {
    if (!settings.soundEnabled) return;
    const target = letterToSay || currentLetter.letter;
    const rate = slow || settings.slowMode ? 0.6 : settings.speechRate;
    await speakRussian(target, rate);
  };

  const pronounceWord = async (word: string) => {
    if (!settings.soundEnabled) return;
    const rate = settings.slowMode ? 0.65 : settings.speechRate;
    await speakRussian(word, rate);
  };

  const voicePrompt = (text: string) => {
    if (!settings.soundEnabled || !settings.voiceGuidance) return;
    speakVoiceGuidance(text, settings.lang, settings.slowMode ? 0.75 : 0.95);
  };

  return (
    <AppContext.Provider
      value={{
        stage,
        setStage,
        nextStage,
        prevStage,
        selectedLetterIndex,
        setSelectedLetterIndex,
        currentLetter,
        settings,
        updateSettings,
        t,
        students,
        toggleAttendance,
        addStudent,
        activeStudentId,
        setActiveStudentId,
        userStars,
        addStars,
        playAudio,
        pronounceLetter,
        pronounceWord,
        voicePrompt,
        isMapOpen,
        setIsMapOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isParentsOpen,
        setIsParentsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
