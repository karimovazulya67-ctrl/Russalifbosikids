import React from 'react';
import { motion } from 'motion/react';
import { X, Volume2, Sparkles, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RUSSIAN_ALPHABET } from '../../data/alphabetData';

export const AlphabetMapModal: React.FC = () => {
  const {
    isMapOpen,
    setIsMapOpen,
    selectedLetterIndex,
    setSelectedLetterIndex,
    t,
    playAudio,
    pronounceLetter,
  } = useApp();

  if (!isMapOpen) return null;

  const handleSelect = (idx: number) => {
    setSelectedLetterIndex(idx);
    playAudio('pop');
    pronounceLetter(RUSSIAN_ALPHABET[idx].letter);
    setIsMapOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border-4 border-amber-300 dark:border-slate-700 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-800 dark:text-white">
                {t.common.alphabetMap} (33 ta harf)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O'rganmoqchi bo'lgan harfni bosing:
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsMapOpen(false)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
            <span>Unlilar (10 ta)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-sky-500" />
            <span>Undoshlar (21 ta)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
            <span>Belgilar (2 ta)</span>
          </div>
        </div>

        {/* 33 Letters Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 overflow-y-auto p-1">
          {RUSSIAN_ALPHABET.map((item, idx) => {
            const isSelected = selectedLetterIndex === idx;
            return (
              <motion.button
                key={item.letter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`p-2.5 rounded-2xl border-3 flex flex-col items-center justify-center transition shadow-xs cursor-pointer select-none relative ${
                  isSelected
                    ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 dark:bg-slate-700'
                    : item.type === 'vowel'
                    ? 'bg-rose-50 hover:bg-rose-100 border-rose-300 dark:bg-slate-800 dark:border-rose-700/60'
                    : item.type === 'consonant'
                    ? 'bg-sky-50 hover:bg-sky-100 border-sky-300 dark:bg-slate-800 dark:border-sky-700/60'
                    : 'bg-purple-50 hover:bg-purple-100 border-purple-300 dark:bg-slate-800 dark:border-purple-700/60'
                }`}
              >
                <div className="text-xl mb-0.5">{item.words[0]?.emoji}</div>
                <div
                  className={`font-black text-2xl sm:text-3xl ${
                    item.type === 'vowel'
                      ? 'text-rose-600 dark:text-rose-400'
                      : item.type === 'consonant'
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-purple-600 dark:text-purple-400'
                  }`}
                >
                  {item.letter}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-full">
                  {item.words[0]?.ru}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
