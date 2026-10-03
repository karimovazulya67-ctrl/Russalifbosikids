import React from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Music,
  HelpCircle,
  Settings as SettingsIcon,
  Compass,
  Star,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LessonStage } from '../types';

const STAGES: { id: LessonStage; icon: string }[] = [
  { id: 'intro', icon: '👋' },
  { id: 'attendance', icon: '📋' },
  { id: 'review', icon: '🔄' },
  { id: 'new-topic', icon: '🔤' },
  { id: 'practice', icon: '✍️' },
  { id: 'games', icon: '🎮' },
  { id: 'quiz', icon: '⭐' },
  { id: 'evaluation', icon: '🏆' },
];

export const Navbar: React.FC = () => {
  const {
    stage,
    setStage,
    currentLetter,
    settings,
    updateSettings,
    t,
    userStars,
    setIsMapOpen,
    setIsSettingsOpen,
    setIsParentsOpen,
    pronounceLetter,
    playAudio,
  } = useApp();

  const handleLanguageToggle = () => {
    const nextLang = settings.lang === 'uz' ? 'ru' : 'uz';
    updateSettings({ lang: nextLang });
    playAudio('pop');
  };

  const handleThemeToggle = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: nextTheme });
    playAudio('pop');
  };

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    playAudio('pop');
  };

  const handleHelpClick = () => {
    playAudio('pop');
    pronounceLetter(currentLetter.letter, true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-amber-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setStage('intro')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl sm:text-2xl font-black">А</span>
            </div>
            <div className="hidden min-[480px]:block">
              <h1 className="font-heading text-sm sm:text-base font-extrabold text-slate-800 dark:text-white leading-tight">
                {t.appName}
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-bold truncate max-w-[140px] sm:max-w-xs">
                5-6 yosh • {currentLetter.letter} harfi
              </p>
            </div>
          </button>

          {/* Letter Map Shortcut */}
          <button
            type="button"
            onClick={() => {
              setIsMapOpen(true);
              playAudio('pop');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-300 dark:border-amber-700/50 shadow-xs transition"
            title={t.common.alphabetMap}
          >
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="font-extrabold text-amber-600 dark:text-amber-400">{currentLetter.letter}</span>
            <span className="hidden md:inline font-medium text-xs">({t.common.alphabetMap})</span>
          </button>
        </div>

        {/* Stages Step Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-amber-50/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-amber-200 dark:border-slate-700/70">
          {STAGES.map((s, idx) => {
            const isActive = stage === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStage(s.id);
                  playAudio('pop');
                }}
                className={`relative px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-amber-200/50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden xl:inline">{t.stages[s.id as keyof typeof t.stages]}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-stage-pill"
                    className="absolute inset-0 bg-amber-500 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Help "Yordam" Button */}
          <button
            type="button"
            onClick={handleHelpClick}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95"
            title={t.common.help}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.common.help}</span>
          </button>

          {/* Stars Counter */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
            <span>{userStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition ${
              settings.soundEnabled
                ? 'bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-slate-700'
                : 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 border-rose-300 dark:border-rose-800'
            }`}
            title="Audio On/Off"
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher UZ / RU */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="px-2 py-1.5 rounded-xl font-black text-xs sm:text-sm bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800 transition active:scale-95"
            title="Switch Language"
          >
            {settings.lang === 'uz' ? '🇺🇿 UZ' : '🇷🇺 RU'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={handleThemeToggle}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title={settings.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {settings.theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsSettingsOpen(true);
              playAudio('pop');
            }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title={t.common.settings}
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile stage selector (horizontal scrollable bar) */}
      <div className="lg:hidden flex items-center gap-1.5 px-2 py-1.5 overflow-x-auto no-scrollbar border-t border-amber-100 dark:border-slate-800">
        {STAGES.map((s) => {
          const isActive = stage === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setStage(s.id);
                playAudio('pop');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{s.icon}</span>
              <span>{t.stages[s.id as keyof typeof t.stages]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
