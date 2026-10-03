import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  PenTool,
  RotateCcw,
  Sparkles,
  CheckCircle,
  Volume2,
  ArrowRight,
  Hand,
  Layers,
  Palette,
  Eraser,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

const PEN_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export const PracticeStage: React.FC = () => {
  const {
    t,
    currentLetter,
    nextStage,
    playAudio,
    pronounceWord,
    addStars,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'trace-printed' | 'trace-cursive' | 'word-builder'>('trace-printed');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [penSize, setPenSize] = useState(14);
  const [isTracingCompleted, setIsTracingCompleted] = useState(false);
  const [showHandHint, setShowHandHint] = useState(false);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const strokeCount = useRef(0);

  // Word Builder State
  const targetWord = currentLetter.words[0]?.ru.toUpperCase() || 'МАМА';
  const targetWordUz = currentLetter.words[0]?.uz || 'Ona';
  const targetEmoji = currentLetter.words[0]?.emoji || '👩';

  const [scrambledLetters, setScrambledLetters] = useState<{ id: number; char: string }[]>([]);
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
  const [isWordComplete, setIsWordComplete] = useState(false);

  // Initialize Word Builder
  useEffect(() => {
    const letters = targetWord.split('');
    const shuffled = letters
      .map((char, id) => ({ id, char, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => ({ id: item.id, char: item.char }));

    setScrambledLetters(shuffled);
    setPlacedLetters(new Array(letters.length).fill(null));
    setIsWordComplete(false);
  }, [targetWord]);

  // Setup Canvas
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Support Retina / High DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.clearRect(0, 0, rect.width, rect.height);
    strokeCount.current = 0;
    setIsTracingCompleted(false);
  };

  useEffect(() => {
    if (activeTab === 'trace-printed' || activeTab === 'trace-cursive') {
      setupCanvas();
    }
  }, [activeTab, currentLetter]);

  // Drawing Handlers (Touch & Mouse)
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    strokeCount.current += 1;

    // Check completion threshold
    if (strokeCount.current > 45 && !isTracingCompleted) {
      setIsTracingCompleted(true);
      playAudio('star');
      addStars(2);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.debug(err);
      }
    }
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  // Word Builder handlers
  const handleSelectScrambled = (letterObj: { id: number; char: string }, index: number) => {
    // Find first empty slot
    const emptyIndex = placedLetters.findIndex((slot) => slot === null);
    if (emptyIndex === -1) return;

    playAudio('pop');
    const newPlaced = [...placedLetters];
    newPlaced[emptyIndex] = letterObj.char;
    setPlacedLetters(newPlaced);

    // Remove from scrambled
    const newScrambled = [...scrambledLetters];
    newScrambled.splice(index, 1);
    setScrambledLetters(newScrambled);

    // Check if full
    if (newPlaced.every((char) => char !== null)) {
      const assembledWord = newPlaced.join('');
      if (assembledWord === targetWord) {
        setIsWordComplete(true);
        playAudio('correct');
        pronounceWord(targetWord);
        addStars(3);
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch (e) {
          console.debug(e);
        }
      } else {
        playAudio('incorrect');
      }
    }
  };

  const handleRemovePlaced = (slotIdx: number) => {
    const char = placedLetters[slotIdx];
    if (!char) return;

    playAudio('pop');
    const newPlaced = [...placedLetters];
    newPlaced[slotIdx] = null;
    setPlacedLetters(newPlaced);

    setScrambledLetters((prev) => [...prev, { id: Date.now() + Math.random(), char }]);
    setIsWordComplete(false);
  };

  const handleResetWord = () => {
    const letters = targetWord.split('');
    const shuffled = letters
      .map((char, id) => ({ id, char, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => ({ id: item.id, char: item.char }));

    setScrambledLetters(shuffled);
    setPlacedLetters(new Array(letters.length).fill(null));
    setIsWordComplete(false);
    playAudio('pop');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <PenTool className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.practice.title}: «{currentLetter.letter}»
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {activeTab === 'word-builder' ? t.practice.wordBuildPrompt : t.practice.tracePrompt}
          </p>
        </div>

        {/* Next Stage Button */}
        <button
          type="button"
          onClick={() => {
            playAudio('correct');
            nextStage();
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95 cursor-pointer"
        >
          <span>O'yinlarga o'tish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap p-1.5 bg-amber-100/70 dark:bg-slate-800/80 rounded-2xl mb-6 max-w-xl border border-amber-300 dark:border-slate-700">
        <button
          type="button"
          onClick={() => {
            setActiveTab('trace-printed');
            playAudio('pop');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
            activeTab === 'trace-printed'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>✍️</span>
          <span>{t.common.printed} ({currentLetter.letter})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('trace-cursive');
            playAudio('pop');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition font-cursive flex items-center justify-center gap-1.5 ${
            activeTab === 'trace-cursive'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>✍️</span>
          <span>{t.common.cursive} ({currentLetter.cursiveUpper})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('word-builder');
            playAudio('pop');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
            activeTab === 'word-builder'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>🧩</span>
          <span>{t.practice.wordBuildTab}</span>
        </button>
      </div>

      {/* Tracing View */}
      {(activeTab === 'trace-printed' || activeTab === 'trace-cursive') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Drawing Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center">
            {/* Canvas Toolbar */}
            <div className="w-full flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
              {/* Color swatches */}
              <div className="flex items-center gap-2">
                {PEN_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c);
                      playAudio('pop');
                    }}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition shadow-xs ${
                      selectedColor === c ? 'ring-4 ring-amber-400 scale-110' : 'opacity-80'
                    }`}
                  />
                ))}
              </div>

              {/* Action buttons: Clear & Hint */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHandHint(!showHandHint)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                    showHandHint
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 dark:bg-slate-700 text-amber-900 dark:text-amber-300'
                  }`}
                  title="Yordamchi ishora"
                >
                  <Hand className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ishora</span>
                </button>

                <button
                  type="button"
                  onClick={setupCanvas}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.common.clear}</span>
                </button>
              </div>
            </div>

            {/* The Drawing Board */}
            <div className="relative w-full h-[320px] sm:h-[400px] bg-amber-50/50 dark:bg-slate-900/60 rounded-2xl border-2 border-dashed border-amber-300 dark:border-slate-700 flex items-center justify-center overflow-hidden touch-none select-none">
              {/* Notebook guide lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none opacity-20">
                <div className="border-b-2 border-rose-500" />
                <div className="border-b-2 border-dashed border-sky-500" />
                <div className="border-b-2 border-sky-500" />
              </div>

              {/* Ghost Letter for tracing */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span
                  className={`font-black opacity-20 ${
                    activeTab === 'trace-cursive'
                      ? 'font-cursive text-[180px] sm:text-[240px] text-amber-800 dark:text-amber-300'
                      : 'text-[200px] sm:text-[280px] text-slate-800 dark:text-white'
                  }`}
                >
                  {activeTab === 'trace-cursive'
                    ? currentLetter.cursiveUpper
                    : currentLetter.letter}
                </span>
              </div>

              {/* Hand Hint Animation */}
              {showHandHint && (
                <motion.div
                  animate={{
                    x: [-40, 0, 40, 0, -40],
                    y: [-40, 40, -40, 40, -40],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute pointer-events-none z-20 text-4xl"
                >
                  👆
                </motion.div>
              )}

              {/* User Drawing Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              />

              {/* Success celebration banner on completion */}
              {isTracingCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 left-4 right-4 bg-emerald-500 text-white font-black text-xs sm:text-sm p-3 rounded-2xl shadow-lg flex items-center justify-between z-30"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                    <span>{t.practice.wellDoneTrace}</span>
                  </div>
                  <span className="text-amber-200 text-base">⭐⭐</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Col: Mascot instructions & Pen Size (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md">
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white mb-2">
                {t.practice.penSize}
              </h3>
              <div className="flex items-center gap-2">
                {[8, 14, 22].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPenSize(size);
                      playAudio('pop');
                    }}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 ${
                      penSize === size
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span
                      className="rounded-full bg-current"
                      style={{ width: size / 2, height: size / 2 }}
                    />
                    <span>{size === 8 ? 'Yupqa' : size === 14 ? 'O\'rta' : 'Qalin'}</span>
                  </button>
                ))}
              </div>
            </div>

            <MascotAlifbek
              message={
                isTracingCompleted
                  ? 'Qoyilmaqom! Harfni juda chiroyli yozdingiz!'
                  : 'Barmoq bilan xira harf ustidan sekin chizing!'
              }
              reaction={isTracingCompleted ? 'celebrate' : 'idle'}
            />
          </div>
        </div>
      )}

      {/* Word Builder View */}
      {activeTab === 'word-builder' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center">
          {/* Target illustration */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-7xl sm:text-8xl mb-2 animate-bounce">{targetEmoji}</span>
            <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
              {targetWordUz}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
              Rasmga qarab so'zni yig'ing ({targetWord.length} ta harf)
            </p>
          </div>

          {/* Word Slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
            {placedLetters.map((char, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleRemovePlaced(idx)}
                className={`w-14 h-16 sm:w-18 sm:h-20 rounded-2xl border-4 font-black text-3xl sm:text-4xl flex items-center justify-center transition shadow-md select-none cursor-pointer ${
                  char
                    ? isWordComplete
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'bg-amber-100 dark:bg-slate-700 border-amber-400 dark:border-slate-500 text-slate-800 dark:text-white'
                    : 'bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-700 text-transparent'
                }`}
              >
                {char || '?'}
              </motion.button>
            ))}
          </div>

          {/* Scrambled Available Letters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {scrambledLetters.map((letterObj, idx) => (
              <motion.button
                key={letterObj.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleSelectScrambled(letterObj, idx)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-2xl sm:text-3xl shadow-lg border-2 border-amber-300 flex items-center justify-center cursor-pointer select-none transition"
              >
                {letterObj.char}
              </motion.button>
            ))}
          </div>

          {/* Controls & Success Feedback */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetWord}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.common.restart}</span>
            </button>

            {isWordComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-sm"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{t.practice.successWord}: {targetWord}! (+3 ⭐)</span>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
