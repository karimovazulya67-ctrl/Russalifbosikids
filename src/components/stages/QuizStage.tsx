import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Star, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

interface QuizQuestion {
  id: number;
  questionUz: string;
  questionRu: string;
  audioPrompt?: string;
  emojiHint?: string;
  options: { text: string; isCorrect: boolean }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionUz: '«🍉 Арбуз» (Tarvuz) so\'zi qaysi harfdan boshlanadi?',
    questionRu: 'С какой буквы начинается слово «🍉 Арбуз»?',
    audioPrompt: 'Арбуз',
    emojiHint: '🍉',
    options: [
      { text: 'А', isCorrect: true },
      { text: 'Б', isCorrect: false },
      { text: 'О', isCorrect: false },
    ],
  },
  {
    id: 2,
    questionUz: 'Qaysi harf jarangli qizil UNLI tovush?',
    questionRu: 'Какая из этих букв является красной ГЛАСНОЙ?',
    options: [
      { text: 'М', isCorrect: false },
      { text: 'О', isCorrect: true },
      { text: 'К', isCorrect: false },
    ],
  },
  {
    id: 3,
    questionUz: '«М» harfining chiroyli yozma (kursiv) shakli qaysi?',
    questionRu: 'Как выглядит письменная (прописная) буква «М»?',
    options: [
      { text: '𝓜', isCorrect: true },
      { text: '𝓐', isCorrect: false },
      { text: '𝓑', isCorrect: false },
    ],
  },
  {
    id: 4,
    questionUz: '«🐱 Кот» (Mushuk) so\'zining birinchi harfini toping:',
    questionRu: 'Найдите первую букву слова «🐱 Кот»:',
    audioPrompt: 'Кот',
    emojiHint: '🐱',
    options: [
      { text: 'С', isCorrect: false },
      { text: 'К', isCorrect: true },
      { text: 'Т', isCorrect: false },
    ],
  },
  {
    id: 5,
    questionUz: 'Alifboda «А» harfidan keyin qaysi harf keladi?',
    questionRu: 'Какая буква идёт в алфавите сразу после «А»?',
    options: [
      { text: 'В', isCorrect: false },
      { text: 'Б', isCorrect: true },
      { text: 'Г', isCorrect: false },
    ],
  },
];

export const QuizStage: React.FC = () => {
  const {
    t,
    settings,
    playAudio,
    pronounceWord,
    addStars,
    nextStage,
  } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptIdx(idx);
    setIsAnswered(true);

    if (isCorrect) {
      playAudio('correct');
      setCorrectCount((c) => c + 1);
      addStars(2);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        console.debug(e);
      }
    } else {
      playAudio('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
      playAudio('pop');
    } else {
      setIsFinished(true);
      playAudio('fanfare');
      try {
        confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 } });
      } catch (e) {
        console.debug(e);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
    playAudio('pop');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Quiz Progress & Header */}
      {!isFinished && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
            <span>
              {t.quiz.question} {currentIdx + 1} {t.quiz.questionOf} {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-amber-600 dark:text-amber-400">
              ⭐ {correctCount} to'g'ri
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              animate={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center text-center">
          {question.emojiHint && (
            <span className="text-6xl sm:text-7xl mb-3">{question.emojiHint}</span>
          )}

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 dark:text-white mb-6">
            {settings.lang === 'uz' ? question.questionUz : question.questionRu}
          </h3>

          {/* Audio hint button if word available */}
          {question.audioPrompt && (
            <button
              type="button"
              onClick={() => pronounceWord(question.audioPrompt!)}
              className="mb-6 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-700 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-sm transition"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Talaffuzni eshitish ({question.audioPrompt})</span>
            </button>
          )}

          {/* Options Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md mb-6">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOptIdx === idx;
              let btnStyle = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-amber-50';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-400';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 text-white border-rose-400';
                }
              }

              return (
                <motion.button
                  key={idx}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx, opt.isCorrect)}
                  className={`h-20 sm:h-24 rounded-2xl border-4 font-black text-3xl sm:text-4xl shadow-md transition flex items-center justify-center cursor-pointer select-none ${btnStyle}`}
                >
                  {opt.text}
                </motion.button>
              );
            })}
          </div>

          {/* Next Question Button */}
          {isAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <span>{t.common.next}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-amber-200 dark:border-slate-700 shadow-xl flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center mb-4 shadow-lg text-4xl animate-bounce">
            🏆
          </div>

          <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-800 dark:text-white mb-2">
            {t.quiz.resultTitle}
          </h3>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-md mb-4 font-medium">
            {correctCount === QUIZ_QUESTIONS.length
              ? t.quiz.perfectScore
              : correctCount >= 3
              ? t.quiz.goodScore
              : t.quiz.keepPracticing}
          </p>

          {/* Stars & Score pill */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 mb-6">
            <div className="text-center px-4">
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                {correctCount} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-xs text-slate-500 font-bold">{t.common.score}</div>
            </div>
            <div className="h-10 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="text-center px-4">
              <div className="text-3xl font-black text-amber-500">
                {Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)}%
              </div>
              <div className="text-xs text-slate-500 font-bold">Natija</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.common.restart}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playAudio('correct');
                nextStage();
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base shadow-lg transition active:scale-95 cursor-pointer"
            >
              <span>{t.evaluation.generateCertificate}</span>
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
