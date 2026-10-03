import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Play, RotateCcw, Sparkles, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

export const NewTopicStage: React.FC = () => {
  const {
    t,
    currentLetter,
    nextStage,
    setIsMapOpen,
    pronounceLetter,
    pronounceWord,
    playAudio,
    settings,
  } = useApp();

  const [activeFormTab, setActiveFormTab] = useState<'printed' | 'cursive'>('printed');
  const [strokeKey, setStrokeKey] = useState(0);

  const handleReplayStroke = () => {
    setStrokeKey((prev) => prev + 1);
    playAudio('pop');
  };

  const handlePronounce = (slow = false) => {
    playAudio('pop');
    pronounceLetter(currentLetter.letter, slow);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.newTopic.title}: «{currentLetter.letter}»
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                currentLetter.type === 'vowel'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : currentLetter.type === 'consonant'
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
              }`}
            >
              {currentLetter.type === 'vowel'
                ? t.common.vowel
                : currentLetter.type === 'consonant'
                ? t.common.consonant
                : t.common.sign}
            </span>
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Boshqa harf tanlash</span>
            </button>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={() => {
            playAudio('correct');
            nextStage();
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95 cursor-pointer"
        >
          <span>Mashqqa o'tish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Big Letter Display & Cursive Switcher (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-lg text-center relative overflow-hidden">
            {/* Form switch tab: Printed vs Cursive */}
            <div className="flex p-1 bg-amber-50 dark:bg-slate-900 rounded-2xl mb-4 border border-amber-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setActiveFormTab('printed');
                  playAudio('pop');
                }}
                className={`flex-1 py-1.5 rounded-xl font-black text-xs transition ${
                  activeFormTab === 'printed'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800'
                }`}
              >
                {t.common.printed} ({currentLetter.letter} {currentLetter.letterLower})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveFormTab('cursive');
                  playAudio('pop');
                }}
                className={`flex-1 py-1.5 rounded-xl font-black text-xs transition font-cursive ${
                  activeFormTab === 'cursive'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800'
                }`}
              >
                {t.common.cursive} ({currentLetter.cursiveUpper} {currentLetter.cursiveLower})
              </button>
            </div>

            {/* Letter Visual */}
            <div className="py-4 flex items-center justify-center gap-3">
              {activeFormTab === 'printed' ? (
                <>
                  <span
                    className={`text-8xl sm:text-9xl font-black drop-shadow-md select-none ${
                      currentLetter.type === 'vowel'
                        ? 'text-rose-500'
                        : currentLetter.type === 'consonant'
                        ? 'text-sky-600'
                        : 'text-purple-600'
                    }`}
                  >
                    {currentLetter.letter}
                  </span>
                  <span
                    className={`text-6xl sm:text-7xl font-black drop-shadow-sm select-none ${
                      currentLetter.type === 'vowel'
                        ? 'text-rose-400'
                        : currentLetter.type === 'consonant'
                        ? 'text-sky-500'
                        : 'text-purple-400'
                    }`}
                  >
                    {currentLetter.letterLower}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-8xl sm:text-9xl font-cursive font-bold text-amber-600 dark:text-amber-400 select-none">
                    {currentLetter.cursiveUpper}
                  </span>
                  <span className="text-6xl sm:text-7xl font-cursive font-bold text-amber-500 dark:text-amber-300 select-none">
                    {currentLetter.cursiveLower}
                  </span>
                </div>
              )}
            </div>

            {/* Audio Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePronounce(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition active:scale-95"
              >
                <Volume2 className="w-5 h-5" />
                <span>Tovush: {currentLetter.soundNameRu}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePronounce(true)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
              >
                <span>{t.common.slowListen} 🐢</span>
              </button>
            </div>

            {/* Fun Fact */}
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 text-left">
              <p className="text-xs font-black text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.newTopic.funFactTitle}</span>
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {settings.lang === 'uz' ? currentLetter.funFactUz : currentLetter.funFactRu}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Stroke Order Animation & Sample Words (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Stroke Order Demonstration (SVG Path Animation) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <span>✍️</span>
                  <span>{t.newTopic.strokeOrder}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t.newTopic.watchPen}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReplayStroke}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-700 text-amber-900 dark:text-amber-300 font-bold text-xs transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Qaytadan ko'rish</span>
              </button>
            </div>

            {/* Animated Stroke Canvas / SVG */}
            <div className="relative h-48 sm:h-56 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-amber-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
              {/* Notebook guide lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-30">
                <div className="border-b border-rose-400" />
                <div className="border-b border-dashed border-sky-400" />
                <div className="border-b border-sky-400" />
              </div>

              {/* Animated SVG drawing of the letter */}
              <svg
                key={strokeKey}
                viewBox="0 0 200 200"
                className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-sm"
              >
                {/* Background ghost outline */}
                {currentLetter.strokePaths.map((d, i) => (
                  <path
                    key={`ghost-${i}`}
                    d={d}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-slate-700"
                  />
                ))}

                {/* Animated colored stroke */}
                {currentLetter.strokePaths.map((d, i) => (
                  <motion.path
                    key={`animated-${strokeKey}-${i}`}
                    d={d}
                    fill="none"
                    stroke={currentLetter.type === 'vowel' ? '#F43F5E' : '#0284C7'}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: settings.slowMode ? 2.5 : 1.6,
                        delay: i * (settings.slowMode ? 1.5 : 1.0),
                        ease: 'easeInOut',
                      },
                      opacity: { duration: 0.2, delay: i * (settings.slowMode ? 1.5 : 1.0) },
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Illustrated Sample Words Grid */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md">
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <span>🖼️</span>
              <span>{t.newTopic.sampleWords}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentLetter.words.map((word) => (
                <motion.div
                  key={word.ru}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playAudio('pop');
                    pronounceWord(word.ru);
                  }}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-slate-900 dark:hover:bg-slate-750 border-2 border-amber-200 dark:border-slate-700 text-center cursor-pointer transition select-none flex flex-col items-center justify-center group"
                >
                  <span className="text-4xl sm:text-5xl mb-1 group-hover:scale-110 transition-transform">
                    {word.emoji}
                  </span>
                  <div className="font-black text-sm sm:text-base text-slate-800 dark:text-white">
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                      {word.ru.charAt(0)}
                    </span>
                    {word.ru.slice(1)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-full">
                    {word.uz}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mascot speech */}
          <MascotAlifbek
            message={`Bu «${currentLetter.letter}» harfi! Rasmlarga bosing va so'zlarni takrorlang!`}
            reaction="happy"
            compact
          />
        </div>
      </div>
    </div>
  );
};
