import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MascotProps {
  message?: string;
  reaction?: 'idle' | 'happy' | 'thinking' | 'celebrate';
  compact?: boolean;
}

export const MascotAlifbek: React.FC<MascotProps> = ({
  message,
  reaction = 'idle',
  compact = false,
}) => {
  const { t, settings, pronounceLetter, playAudio } = useApp();
  const [isWiggling, setIsWiggling] = useState(false);
  const [customMsg, setCustomMsg] = useState<string | null>(null);

  const displayMessage = customMsg || message || t.mascot.greeting;

  const handleTap = () => {
    setIsWiggling(true);
    playAudio('pop');
    const compliments = t.mascot.correct;
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCustomMsg(randomCompliment);

    setTimeout(() => {
      setIsWiggling(false);
    }, 1200);

    setTimeout(() => {
      setCustomMsg(null);
    }, 4000);
  };

  const handleSpeakSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    pronounceLetter(displayMessage, settings.slowMode);
  };

  return (
    <div
      className={`relative flex items-end ${
        compact ? 'gap-2' : 'gap-3 sm:gap-4'
      } cursor-pointer group select-none`}
      onClick={handleTap}
    >
      {/* Mascot Graphic */}
      <motion.div
        animate={
          isWiggling || reaction === 'celebrate'
            ? { scale: [1, 1.12, 0.95, 1.08, 1], rotate: [0, -8, 8, -4, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: isWiggling || reaction === 'celebrate' ? 0 : Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className={`relative shrink-0 ${
          compact ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'
        }`}
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-400/40 transition-colors" />

        {/* Cheerful Bear Mascot SVG */}
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <circle cx="28" cy="30" r="16" fill="#D97706" />
          <circle cx="28" cy="30" r="9" fill="#FDE68A" />
          <circle cx="92" cy="30" r="16" fill="#D97706" />
          <circle cx="92" cy="30" r="9" fill="#FDE68A" />

          {/* Head */}
          <ellipse cx="60" cy="64" rx="46" ry="42" fill="#F59E0B" />

          {/* Snout */}
          <ellipse cx="60" cy="74" rx="22" ry="16" fill="#FEF3C7" />

          {/* Nose */}
          <path d="M 53 66 C 53 64, 67 64, 67 66 C 67 73, 53 73, 53 66 Z" fill="#78350F" />

          {/* Big Cheerful Smile */}
          <path
            d="M 50 75 Q 60 84 70 75"
            stroke="#78350F"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheeks */}
          <circle cx="34" cy="74" r="8" fill="#F87171" opacity="0.6" />
          <circle cx="86" cy="74" r="8" fill="#F87171" opacity="0.6" />

          {/* Expressive Eyes */}
          {reaction === 'happy' || isWiggling ? (
            <>
              {/* Happy squinting eyes ^ ^ */}
              <path d="M 40 54 Q 46 47 52 54" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 68 54 Q 74 47 80 54" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Big sparkly eyes */}
              <ellipse cx="46" cy="52" rx="6.5" ry="8" fill="#451A03" />
              <ellipse cx="74" cy="52" rx="6.5" ry="8" fill="#451A03" />
              {/* Sparkles in eyes */}
              <circle cx="44" cy="49" r="2.5" fill="#FFFFFF" />
              <circle cx="72" cy="49" r="2.5" fill="#FFFFFF" />
              <circle cx="48" cy="54" r="1.2" fill="#FFFFFF" />
              <circle cx="76" cy="54" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Graduation / Scholar cap for Alifbek */}
          <g transform="translate(60, 22)">
            <polygon points="-28,0 0,-10 28,0 0,8" fill="#3B82F6" />
            <polygon points="-28,0 0,-10 28,0 0,8" fill="#2563EB" opacity="0.4" />
            <rect x="-14" y="4" width="28" height="6" rx="2" fill="#1D4ED8" />
            {/* Tassel */}
            <circle cx="0" cy="-2" r="3" fill="#FBBF24" />
            <path d="M 0 -2 Q 18 2 20 16" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
            <rect x="18" y="15" width="4" height="6" fill="#F59E0B" rx="1" />
          </g>

          {/* Waving Paw on bottom right */}
          <ellipse cx="98" cy="92" rx="10" ry="12" fill="#D97706" transform="rotate(-20 98 92)" />
          <ellipse cx="98" cy="92" rx="6" ry="8" fill="#FDE68A" transform="rotate(-20 98 92)" />
        </svg>

        {/* Floating star particle */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 45, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 text-amber-500 bg-white/90 dark:bg-slate-800 rounded-full p-0.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
        </motion.div>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayMessage}
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-xs sm:max-w-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-2.5 sm:p-3.5 shadow-lg border-2 border-amber-300 dark:border-amber-500/40 text-left font-medium"
        >
          {/* Bubble Arrow */}
          <div className="absolute -left-2.5 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-r-[12px] border-r-amber-300 dark:border-r-amber-500/40 border-b-8 border-b-transparent" />
          <div className="absolute -left-2 bottom-4 w-0 h-0 border-t-7 border-t-transparent border-r-[10px] border-r-white dark:border-r-slate-800 border-b-7 border-b-transparent" />

          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                {t.mascot.name}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">🐻</span>
            </div>
            <button
              type="button"
              onClick={handleSpeakSpeech}
              title={t.common.listen}
              aria-label={t.common.listen}
              className="p-1 rounded-full hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 transition"
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {displayMessage}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
