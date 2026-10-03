import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Volume2, CheckCircle2, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RUSSIAN_ALPHABET } from '../../data/alphabetData';
import { MascotAlifbek } from '../MascotAlifbek';

// Pick 5 letters for quick review
const REVIEW_LETTERS = [
  RUSSIAN_ALPHABET[0], // А
  RUSSIAN_ALPHABET[1], // Б
  RUSSIAN_ALPHABET[13], // М
  RUSSIAN_ALPHABET[15], // О
  RUSSIAN_ALPHABET[18], // С
];

export const ReviewStage: React.FC = () => {
  const {
    t,
    nextStage,
    playAudio,
    pronounceLetter,
    pronounceWord,
    addStars,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentItem = REVIEW_LETTERS[currentIndex];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    playAudio('pop');
    pronounceLetter(currentItem.letter);
  };

  const handleHearSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    playAudio('pop');
    pronounceLetter(currentItem.letter);
  };

  const handleSelectWord = (wordIdx: number) => {
    setSelectedWordIndex(wordIdx);
    const chosenWord = currentItem.words[wordIdx];
    pronounceWord(chosenWord.ru);

    if (!answeredCorrectly) {
      setAnsweredCorrectly(true);
      playAudio('correct');
      addStars(1);
      setReviewedCount((prev) => Math.min(prev + 1, REVIEW_LETTERS.length));
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setSelectedWordIndex(null);
    setAnsweredCorrectly(false);

    if (currentIndex < REVIEW_LETTERS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      setCurrentIndex(0);
    }
    playAudio('pop');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <RotateCw className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.review.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t.review.subtitle}
          </p>
        </div>

        {/* Progress & Next stage */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-slate-700">
            {t.review.completedCount}: {reviewedCount} / {REVIEW_LETTERS.length}
          </div>
          <button
            type="button"
            onClick={() => {
              playAudio('correct');
              nextStage();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95 cursor-pointer"
          >
            <span>{t.common.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden mb-6">
        <motion.div
          className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
          animate={{ width: `${(reviewedCount / REVIEW_LETTERS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Flashcard Component */}
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCardClick}
            className="w-full max-w-sm h-80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-850 rounded-3xl border-4 border-amber-300 dark:border-amber-600/50 shadow-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none relative group"
          >
            {/* Flip hint badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-700/80 text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-xs">
              <RotateCw className="w-3 h-3 text-amber-500 group-hover:rotate-180 transition-transform duration-500" />
              <span>Aylantirish</span>
            </div>

            {!isFlipped ? (
              /* Front of Flashcard: Big Letter */
              <div className="flex flex-col items-center">
                <span
                  className={`text-8xl sm:text-9xl font-black drop-shadow-md mb-2 ${
                    currentItem.type === 'vowel'
                      ? 'text-rose-500'
                      : currentItem.type === 'consonant'
                      ? 'text-sky-600'
                      : 'text-purple-600'
                  }`}
                >
                  {currentItem.letter}
                </span>

                <button
                  type="button"
                  onClick={handleHearSound}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Tovush: {currentItem.soundNameRu}</span>
                </button>
              </div>
            ) : (
              /* Back of Flashcard: Cursive & Sample word */
              <div className="flex flex-col items-center">
                <span className="text-4xl text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Yozma shakli:
                </span>
                <span className="text-7xl font-bold font-cursive text-amber-600 dark:text-amber-400 mb-3">
                  {currentItem.cursiveUpper} {currentItem.cursiveLower}
                </span>
                <div className="text-3xl mb-1">{currentItem.words[0]?.emoji}</div>
                <div className="text-lg font-black text-slate-800 dark:text-white">
                  {currentItem.words[0]?.ru}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  ({currentItem.words[0]?.uz})
                </div>
              </div>
            )}

            <p className="absolute bottom-3 text-[11px] text-slate-400 font-medium">
              {t.review.clickToHear}
            </p>
          </motion.div>

          <button
            type="button"
            onClick={handleNextCard}
            className="mt-4 px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition"
          >
            {t.review.nextCard} ({currentIndex + 1}/{REVIEW_LETTERS.length})
          </button>
        </div>

        {/* Word Matching Mini Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">
                {t.review.matchPrompt}
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-semibold">
              Qaysi so'z «{currentItem.letter}» harfidan boshlanadi?
            </p>

            {/* Word choices */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {currentItem.words.map((word, idx) => {
                const isSelected = selectedWordIndex === idx;
                return (
                  <motion.button
                    key={word.ru}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleSelectWord(idx)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition flex items-center gap-3 select-none cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span className="text-3xl shrink-0">{word.emoji}</span>
                    <div className="overflow-hidden">
                      <div className="font-black text-sm text-slate-800 dark:text-white truncate">
                        {word.ru}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {word.uz}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
            <MascotAlifbek
              message={
                answeredCorrectly
                  ? 'Ajoyib! To\'g\'ri so\'zni topdingiz!'
                  : `Mana bu «${currentItem.letter}» harfi. Tovushini eshitib ko'ring!`
              }
              reaction={answeredCorrectly ? 'celebrate' : 'idle'}
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};
