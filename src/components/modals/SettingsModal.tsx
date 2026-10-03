import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Volume2,
  VolumeX,
  Music,
  Sliders,
  Eye,
  Type,
  Check,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Difficulty, Language, Theme } from '../../types';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    settings,
    updateSettings,
    t,
    playAudio,
    setIsParentsOpen,
  } = useApp();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-amber-300 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-600">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="font-heading font-black text-xl text-slate-800 dark:text-white">
              {t.settingsModal.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Language */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
              {t.settingsModal.language}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  updateSettings({ lang: 'uz' });
                  playAudio('pop');
                }}
                className={`py-2 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.lang === 'uz'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🇺🇿 O'zbek tili</span>
                {settings.lang === 'uz' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  updateSettings({ lang: 'ru' });
                  playAudio('pop');
                }}
                className={`py-2 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.lang === 'ru'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🇷🇺 Русский язык</span>
                {settings.lang === 'ru' && <Check className="w-4 h-4 text-amber-600" />}
              </button>
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
              {t.settingsModal.theme}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  updateSettings({ theme: 'light' });
                  playAudio('pop');
                }}
                className={`py-2 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.theme === 'light'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>☀️ {t.settingsModal.light}</span>
                {settings.theme === 'light' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  updateSettings({ theme: 'dark' });
                  playAudio('pop');
                }}
                className={`py-2 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.theme === 'dark'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🌙 {t.settingsModal.dark}</span>
                {settings.theme === 'dark' && <Check className="w-4 h-4 text-amber-600" />}
              </button>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
              {t.settingsModal.difficulty}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    updateSettings({ difficulty: level });
                    playAudio('pop');
                  }}
                  className={`py-2 px-2 rounded-xl border-2 font-bold text-xs flex items-center justify-center transition ${
                    settings.difficulty === level
                      ? 'bg-amber-500 border-amber-400 text-white'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {level === 'easy'
                    ? t.common.easy
                    : level === 'medium'
                    ? t.common.medium
                    : t.common.hard}
                </button>
              ))}
            </div>
          </div>

          {/* Inclusivity & Accessibility Toggles */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            {/* Astalik bilan (Slow mode) */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
              <div>
                <div className="font-black text-xs sm:text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <span>🐢</span>
                  <span>{t.settingsModal.slowMode}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.settingsModal.slowModeDesc}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSettings({ slowMode: !settings.slowMode });
                  playAudio('pop');
                }}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  settings.slowMode ? 'bg-amber-500 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Voice Guidance */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
              <div>
                <div className="font-black text-xs sm:text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>{t.settingsModal.voiceGuidance}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.settingsModal.voiceGuidanceDesc}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSettings({ voiceGuidance: !settings.voiceGuidance });
                  playAudio('pop');
                }}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  settings.voiceGuidance ? 'bg-amber-500 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Sound & Music toggles */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  updateSettings({ soundEnabled: !settings.soundEnabled });
                  playAudio('pop');
                }}
                className={`p-2.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.soundEnabled
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz effektlari</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  updateSettings({ bgMusicEnabled: !settings.bgMusicEnabled });
                  playAudio('pop');
                }}
                className={`p-2.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  settings.bgMusicEnabled
                    ? 'bg-amber-100 border-amber-400 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Fon musiqasi</span>
              </button>
            </div>
          </div>

          {/* Quick link to Parents Guide */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsSettingsOpen(false);
                setIsParentsOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-800 text-amber-900 dark:text-amber-300 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>{t.common.parentsGuide}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
