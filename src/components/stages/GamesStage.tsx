import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Volume2,
  Sparkles,
  RotateCcw,
  Star,
  Trophy,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { RUSSIAN_ALPHABET } from '../../data/alphabetData';
import { GameId } from '../../types';
import { MascotAlifbek } from '../MascotAlifbek';

export const GamesStage: React.FC = () => {
  const {
    t,
    settings,
    playAudio,
    pronounceLetter,
    pronounceWord,
    addStars,
    nextStage,
  } = useApp();

  const [activeGame, setActiveGame] = useState<GameId>('find-letter');
  const [score, setScore] = useState(0);

  // 1. "Harfni top" (Find the Letter) State
  const [findTarget, setFindTarget] = useState(RUSSIAN_ALPHABET[0]);
  const [findOptions, setFindOptions] = useState<typeof RUSSIAN_ALPHABET>([]);

  const setupFindLetter = () => {
    const randomTarget = RUSSIAN_ALPHABET[Math.floor(Math.random() * RUSSIAN_ALPHABET.length)];
    setFindTarget(randomTarget);

    const count = settings.difficulty === 'easy' ? 4 : settings.difficulty === 'medium' ? 6 : 8;
    const others = RUSSIAN_ALPHABET.filter((l) => l.letter !== randomTarget.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, count - 1);

    const allOpts = [...others, randomTarget].sort(() => Math.random() - 0.5);
    setFindOptions(allOpts);

    setTimeout(() => {
      pronounceLetter(`Буква ${randomTarget.letter}`);
    }, 300);
  };

  // 2. "Juftini top" (Memory Match) State
  interface MemoryCard {
    id: string;
    pairId: string;
    content: string;
    subtext?: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);

  const setupMemoryGame = () => {
    const pairCount = settings.difficulty === 'easy' ? 3 : settings.difficulty === 'medium' ? 4 : 6;
    const sample = [...RUSSIAN_ALPHABET].sort(() => Math.random() - 0.5).slice(0, pairCount);

    const cards: MemoryCard[] = [];
    sample.forEach((item, idx) => {
      cards.push({
        id: `print-${idx}`,
        pairId: item.letter,
        content: item.letter,
        subtext: 'Bosma',
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: `curs-${idx}`,
        pairId: item.letter,
        content: item.cursiveUpper,
        subtext: 'Yozma',
        isFlipped: false,
        isMatched: false,
      });
    });

    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedIds([]);
  };

  // 3. "Harf yomg'iri" (Letter Rain) State
  interface RainDrop {
    id: number;
    letter: string;
    x: number;
    speed: number;
  }
  const [rainTarget, setRainTarget] = useState('А');
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [rainScore, setRainScore] = useState(0);

  const setupRainGame = () => {
    const target = RUSSIAN_ALPHABET[Math.floor(Math.random() * 8)].letter;
    setRainTarget(target);
    setRainScore(0);
    setRainDrops([]);
  };

  // Rain loop
  useEffect(() => {
    if (activeGame !== 'letter-rain') return;
    const interval = setInterval(() => {
      setRainDrops((prev) => {
        if (prev.length > 5) return prev;
        const alphabetPool = RUSSIAN_ALPHABET.map((l) => l.letter);
        // 40% chance of being target letter
        const letter = Math.random() < 0.4 ? rainTarget : alphabetPool[Math.floor(Math.random() * alphabetPool.length)];
        const newDrop: RainDrop = {
          id: Date.now() + Math.random(),
          letter,
          x: Math.floor(Math.random() * 80) + 10,
          speed: settings.slowMode ? 7 : 4,
        };
        return [...prev, newDrop];
      });
    }, settings.slowMode ? 2200 : 1500);

    return () => clearInterval(interval);
  }, [activeGame, rainTarget, settings.slowMode]);

  // 4. "So'z qurish konstruktori" (Word Builder) State
  const WORD_PUZZLES = [
    { ru: 'КОТ', uz: 'Mushuk', emoji: '🐱' },
    { ru: 'ДОМ', uz: 'Uy', emoji: '🏠' },
    { ru: 'ШАР', uz: 'Shar', emoji: '🎈' },
    { ru: 'РЫБА', uz: 'Baliq', emoji: '🐟' },
    { ru: 'МАМА', uz: 'Ona', emoji: '👩' },
  ];
  const [currentWordPuzzleIdx, setCurrentWordPuzzleIdx] = useState(0);
  const [builtChars, setBuiltChars] = useState<string[]>([]);

  // 5. "Alifbo poezdi" (Train Sequencing) State
  const [trainSeq, setTrainSeq] = useState<{ letters: (string | null)[]; missingIdx: number; correctLetter: string; options: string[] }>({
    letters: ['А', null, 'В', 'Г'],
    missingIdx: 1,
    correctLetter: 'Б',
    options: ['Б', 'Д', 'М', 'К'],
  });

  const setupTrainGame = () => {
    // Pick 4 consecutive letters from alphabet
    const maxStart = RUSSIAN_ALPHABET.length - 4;
    const startIdx = Math.floor(Math.random() * maxStart);
    const slice = RUSSIAN_ALPHABET.slice(startIdx, startIdx + 4).map((l) => l.letter);
    const missing = Math.floor(Math.random() * 2) + 1; // 1 or 2
    const correct = slice[missing];

    const wrongPool = RUSSIAN_ALPHABET.filter((l) => l.letter !== correct)
      .map((l) => l.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [...wrongPool, correct].sort(() => Math.random() - 0.5);

    const displayed: (string | null)[] = [...slice];
    displayed[missing] = null;

    setTrainSeq({
      letters: displayed,
      missingIdx: missing,
      correctLetter: correct,
      options,
    });
  };

  // Initial load
  useEffect(() => {
    if (activeGame === 'find-letter') setupFindLetter();
    if (activeGame === 'memory-match') setupMemoryGame();
    if (activeGame === 'letter-rain') setupRainGame();
    if (activeGame === 'alphabet-train') setupTrainGame();
  }, [activeGame]);

  // Handler for Game 1: Find letter
  const handleFindClick = (letter: string) => {
    if (letter === findTarget.letter) {
      playAudio('correct');
      addStars(2);
      setScore((s) => s + 10);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        console.debug(e);
      }
      setTimeout(setupFindLetter, 1200);
    } else {
      playAudio('incorrect');
    }
  };

  // Handler for Game 2: Memory card click
  const handleCardClick = (cardId: string) => {
    if (flippedIds.length === 2) return;
    const clicked = memoryCards.find((c) => c.id === cardId);
    if (!clicked || clicked.isFlipped || clicked.isMatched) return;

    playAudio('pop');
    pronounceLetter(clicked.pairId);

    const newCards = memoryCards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setMemoryCards(newCards);

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      const first = newCards.find((c) => c.id === newFlipped[0]);
      const second = newCards.find((c) => c.id === newFlipped[1]);

      if (first && second && first.pairId === second.pairId) {
        // Matched!
        setTimeout(() => {
          playAudio('correct');
          addStars(2);
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIds([]);
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          playAudio('incorrect');
          setMemoryCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  // Handler for Game 3: Rain Catch
  const handleCatchRainDrop = (dropId: number, letter: string) => {
    if (letter === rainTarget) {
      playAudio('star');
      addStars(1);
      setRainScore((s) => s + 1);
      setRainDrops((prev) => prev.filter((d) => d.id !== dropId));
    } else {
      playAudio('incorrect');
      setRainDrops((prev) => prev.filter((d) => d.id !== dropId));
    }
  };

  // Handler for Game 4: Word puzzle
  const currentPuzzle = WORD_PUZZLES[currentWordPuzzleIdx];
  const handleAddCharToWord = (char: string) => {
    const nextIdx = builtChars.length;
    if (nextIdx >= currentPuzzle.ru.length) return;

    if (char === currentPuzzle.ru[nextIdx]) {
      playAudio('pop');
      const newChars = [...builtChars, char];
      setBuiltChars(newChars);

      if (newChars.length === currentPuzzle.ru.length) {
        playAudio('correct');
        pronounceWord(currentPuzzle.ru);
        addStars(3);
        try {
          confetti({ particleCount: 60, spread: 70 });
        } catch (e) {
          console.debug(e);
        }
        setTimeout(() => {
          setBuiltChars([]);
          setCurrentWordPuzzleIdx((prev) => (prev + 1) % WORD_PUZZLES.length);
        }, 1600);
      }
    } else {
      playAudio('incorrect');
    }
  };

  // Handler for Game 5: Train wagon
  const handleTrainOptionClick = (letter: string) => {
    if (letter === trainSeq.correctLetter) {
      playAudio('fanfare');
      addStars(3);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch (e) {
        console.debug(e);
      }
      const updated = [...trainSeq.letters];
      updated[trainSeq.missingIdx] = letter;
      setTrainSeq((prev) => ({ ...prev, letters: updated }));

      setTimeout(setupTrainGame, 2000);
    } else {
      playAudio('incorrect');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Gamepad2 className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.games.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t.games.selectGame}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playAudio('correct');
            nextStage();
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95 cursor-pointer"
        >
          <span>Viktorinaga o'tish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Games Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6">
        {[
          { id: 'find-letter', icon: '🔍', name: t.games.game1Title },
          { id: 'memory-match', icon: '🃏', name: t.games.game2Title },
          { id: 'letter-rain', icon: '🌧️', name: t.games.game3Title },
          { id: 'word-builder', icon: '🧩', name: t.games.game4Title },
          { id: 'alphabet-train', icon: '🚂', name: t.games.game5Title },
        ].map((g) => {
          const isActive = activeGame === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setActiveGame(g.id as GameId);
                playAudio('pop');
              }}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1 text-center cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md scale-102'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-750'
              }`}
            >
              <span className="text-2xl">{g.icon}</span>
              <span className="truncate w-full">{g.name}</span>
            </button>
          );
        })}
      </div>

      {/* Game 1: Find the letter */}
      {activeGame === 'find-letter' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
              {t.games.findTheLetter}
            </span>
            <button
              type="button"
              onClick={() => pronounceLetter(findTarget.letter)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Qaytadan eshitish</span>
            </button>
          </div>

          {/* Letter Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl w-full mb-6">
            {findOptions.map((item) => (
              <motion.button
                key={item.letter}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => handleFindClick(item.letter)}
                className={`h-24 sm:h-28 rounded-3xl border-4 font-black text-4xl sm:text-5xl shadow-md transition flex items-center justify-center cursor-pointer select-none ${
                  item.type === 'vowel'
                    ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-slate-700 dark:border-rose-500'
                    : 'bg-sky-50 border-sky-300 text-sky-600 dark:bg-slate-700 dark:border-sky-500'
                }`}
              >
                {item.letter}
              </motion.button>
            ))}
          </div>

          <MascotAlifbek
            message={`«${findTarget.letter}» harfini topa olasizmi?`}
            reaction="happy"
            compact
          />
        </div>
      )}

      {/* Game 2: Memory Match (Printed + Cursive) */}
      {activeGame === 'memory-match' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-2xl mb-4">
            <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
              {t.games.game2Desc}
            </p>
            <button
              type="button"
              onClick={setupMemoryGame}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.common.restart}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl w-full mb-6">
            {memoryCards.map((card) => (
              <motion.button
                key={card.id}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleCardClick(card.id)}
                className={`h-24 sm:h-28 rounded-2xl border-4 font-black transition flex flex-col items-center justify-center select-none cursor-pointer ${
                  card.isMatched
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 opacity-90'
                    : card.isFlipped
                    ? 'bg-amber-100 border-amber-400 text-amber-950 dark:bg-slate-700 dark:text-white shadow-md'
                    : 'bg-gradient-to-br from-amber-400 to-orange-400 border-amber-300 text-white shadow-sm'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <>
                    <span className="text-4xl sm:text-5xl font-cursive">{card.content}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{card.subtext}</span>
                  </>
                ) : (
                  <span className="text-3xl">⭐</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Game 3: Letter Rain */}
      {activeGame === 'letter-rain' && (
        <div className="bg-gradient-to-b from-sky-100 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 border-2 border-sky-300 dark:border-slate-700 shadow-xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-2xl mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                {t.games.rainCatchTarget}
              </span>
              <span className="text-2xl font-black text-rose-500 px-3 py-1 rounded-xl bg-white dark:bg-slate-700 shadow-xs">
                {rainTarget}
              </span>
            </div>
            <div className="font-extrabold text-sm text-amber-700 dark:text-amber-400">
              ⭐ {t.games.rainScore}: {rainScore}
            </div>
          </div>

          {/* Falling Letters Sky Window */}
          <div className="relative w-full max-w-2xl h-80 bg-white/70 dark:bg-slate-850/70 rounded-2xl border-2 border-dashed border-sky-300 dark:border-slate-700 overflow-hidden">
            {rainDrops.map((drop) => (
              <motion.button
                key={drop.id}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 300, opacity: 1 }}
                transition={{ duration: drop.speed, ease: 'linear' }}
                type="button"
                onClick={() => handleCatchRainDrop(drop.id, drop.letter)}
                style={{ left: `${drop.x}%` }}
                className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-black text-2xl sm:text-3xl shadow-lg border-2 flex items-center justify-center cursor-pointer select-none active:scale-90 ${
                  drop.letter === rainTarget
                    ? 'bg-amber-400 border-amber-300 text-amber-950 animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-300 text-slate-700 dark:text-slate-200'
                }`}
              >
                {drop.letter}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Game 4: Word constructor */}
      {activeGame === 'word-builder' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center">
          <div className="text-7xl sm:text-8xl mb-2 animate-bounce">{currentPuzzle.emoji}</div>
          <div className="text-base sm:text-lg font-black text-slate-800 dark:text-white mb-4">
            {currentPuzzle.uz}
          </div>

          {/* Slots */}
          <div className="flex gap-2 sm:gap-3 mb-6">
            {currentPuzzle.ru.split('').map((_, i) => (
              <div
                key={i}
                className="w-14 h-16 sm:w-16 sm:h-18 rounded-2xl border-4 border-amber-400 bg-amber-50 dark:bg-slate-700 text-slate-900 dark:text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-md"
              >
                {builtChars[i] || ''}
              </div>
            ))}
          </div>

          {/* Letter Buttons Pool */}
          <div className="flex flex-wrap gap-2.5 justify-center max-w-md">
            {[...currentPuzzle.ru.split(''), 'О', 'А', 'И', 'Т', 'Р']
              .sort(() => Math.random() - 0.5)
              .slice(0, 7)
              .map((char, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddCharToWord(char)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-2xl shadow-md border-2 border-amber-300 flex items-center justify-center active:scale-95 cursor-pointer"
                >
                  {char}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Game 5: Alphabet Train */}
      {activeGame === 'alphabet-train' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center">
          <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-6 text-center">
            {t.games.trainInstruction}
          </p>

          {/* The Train */}
          <div className="flex items-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 w-full justify-center">
            {/* Locomotive */}
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-rose-500 rounded-2xl flex flex-col items-center justify-center text-white font-black text-xs shadow-lg shrink-0">
              <span className="text-3xl sm:text-4xl">🚂</span>
              <span>POYEZD</span>
            </div>

            {/* Wagons */}
            {trainSeq.letters.map((char, idx) => (
              <div
                key={idx}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl border-4 font-black text-3xl sm:text-4xl flex items-center justify-center shadow-md shrink-0 relative ${
                  char
                    ? 'bg-amber-100 dark:bg-slate-700 border-amber-400 text-slate-800 dark:text-white'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-dashed border-rose-400 text-rose-500'
                }`}
              >
                {char || '?'}
                {/* Wheels */}
                <div className="absolute -bottom-2 flex gap-4">
                  <div className="w-3.5 h-3.5 bg-slate-700 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-slate-700 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Options to fill missing wagon */}
          <div className="flex gap-3 justify-center">
            {trainSeq.options.map((opt) => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleTrainOptionClick(opt)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-2xl sm:text-3xl shadow-lg border-2 border-amber-300 flex items-center justify-center cursor-pointer select-none"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
