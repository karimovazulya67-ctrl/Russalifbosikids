import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Volume2, Compass, Award, Music, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

export const IntroStage: React.FC = () => {
  const {
    t,
    currentLetter,
    nextStage,
    setIsMapOpen,
    pronounceLetter,
    playAudio,
    settings,
    updateSettings,
  } = useApp();

  const handleStart = () => {
    playAudio('correct');
    pronounceLetter(`Буква ${currentLetter.letter}`);
    nextStage();
  };

  const handleSayLetter = () => {
    playAudio('pop');
    pronounceLetter(currentLetter.letter);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-300 dark:border-amber-700 mb-4"
      >
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
        <span>{t.appSubtitle}</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-4 tracking-tight"
      >
        {t.appName}
      </motion.h1>

      <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed">
        {t.mascot.introSpeech}
      </p>

      {/* Hero Letter Card & Mascot */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
        {/* Today's Letter Highlight Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 rounded-3xl p-6 border-4 border-amber-300 dark:border-amber-500/40 shadow-xl flex flex-col items-center justify-center text-center overflow-hidden"
        >
          {/* Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black">
            Bugungi mavzu
          </div>

          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 dark:bg-slate-700/80 hover:bg-white text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs transition flex items-center gap-1"
            title={t.common.alphabetMap}
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Almashtirish</span>
          </button>

          {/* Big Letter Presentation */}
          <div className="my-4 flex items-center justify-center gap-3">
            <span
              className={`text-8xl sm:text-9xl font-black drop-shadow-md cursor-pointer hover:scale-110 transition-transform ${
                currentLetter.type === 'vowel'
                  ? 'text-rose-500'
                  : currentLetter.type === 'consonant'
                  ? 'text-sky-600'
                  : 'text-purple-600'
              }`}
              onClick={handleSayLetter}
            >
              {currentLetter.letter}
            </span>
            <span
              className={`text-5xl sm:text-6xl font-black drop-shadow-sm cursor-pointer hover:scale-110 transition-transform ${
                currentLetter.type === 'vowel'
                  ? 'text-rose-400'
                  : currentLetter.type === 'consonant'
                  ? 'text-sky-500'
                  : 'text-purple-400'
              }`}
              onClick={handleSayLetter}
            >
              {currentLetter.letterLower}
            </span>
          </div>

          {/* Sound & Word quick preview */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSayLetter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>{t.common.sound}: {currentLetter.soundNameRu}</span>
            </button>
            <span className="text-2xl">{currentLetter.words[0]?.emoji}</span>
          </div>

          <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
            {currentLetter.words.map((w) => w.ru).join(' • ')}
          </p>
        </motion.div>

        {/* Mascot Greeting & Interactive speech */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-3xl border-2 border-dashed border-amber-300 dark:border-slate-700">
          <MascotAlifbek message={t.mascot.greeting} reaction="happy" />

          {/* Quick 4 Steps list */}
          <div className="mt-6 w-full text-left space-y-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-50 dark:bg-slate-750">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-xs shrink-0">1</span>
              <span>Harf shakli va tovushini o'rganamiz</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-sky-50 dark:bg-slate-750">
              <span className="w-6 h-6 rounded-full bg-sky-400 text-sky-950 font-black flex items-center justify-center text-xs shrink-0">2</span>
              <span>Barmoq bilan harfni yozamiz</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50 dark:bg-slate-750">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center text-xs shrink-0">3</span>
              <span>5 xil qiziqarli o'yin o'ynaymiz</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-50 dark:bg-slate-750">
              <span className="w-6 h-6 rounded-full bg-purple-400 text-purple-950 font-black flex items-center justify-center text-xs shrink-0">4</span>
              <span>Yulduzlar yig'ib diplom olamiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button & Music toggle */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleStart}
          className="px-8 sm:px-12 py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition flex items-center gap-3 cursor-pointer"
        >
          <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
          <span>{t.common.start}</span>
        </motion.button>

        <button
          type="button"
          onClick={() => {
            updateSettings({ bgMusicEnabled: !settings.bgMusicEnabled });
            playAudio('pop');
          }}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border-2 font-bold text-sm transition ${
            settings.bgMusicEnabled
              ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-800 dark:text-amber-300'
              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Music className="w-4 h-4 text-amber-500" />
          <span>{settings.bgMusicEnabled ? 'Musiqa: Yoqilgan 🎵' : 'Musiqani yoqish'}</span>
        </button>
      </div>
    </div>
  );
};
