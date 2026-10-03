import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, CheckCircle, XCircle, Plus, ArrowRight, Sparkles, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

export const AttendanceStage: React.FC = () => {
  const {
    t,
    students,
    toggleAttendance,
    addStudent,
    nextStage,
    playAudio,
    addStars,
  } = useApp();

  const [newStudentName, setNewStudentName] = useState('');
  const [selectedCountGuess, setSelectedCountGuess] = useState<number | null>(null);
  const [countingResult, setCountingResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const presentCount = students.filter((s) => s.attended).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      addStudent(newStudentName);
      setNewStudentName('');
    }
  };

  const handleMarkAllPresent = () => {
    students.forEach((s) => {
      if (!s.attended) toggleAttendance(s.id);
    });
    playAudio('correct');
  };

  const handleGuessCount = (num: number) => {
    setSelectedCountGuess(num);
    if (num === presentCount) {
      setCountingResult('correct');
      playAudio('correct');
      addStars(2);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        console.debug(e);
      }
    } else {
      setCountingResult('wrong');
      playAudio('incorrect');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.attendance.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t.attendance.subtitle} ({presentCount}/{students.length} {t.attendance.present})
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-300 dark:border-slate-700 transition"
          >
            {t.attendance.markAllPresent}
          </button>
          <button
            type="button"
            onClick={() => {
              playAudio('correct');
              nextStage();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md transition active:scale-95 cursor-pointer"
          >
            <span>{t.common.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Students Roster Cards */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md">
          {/* Quick Add Form */}
          <form onSubmit={handleAddSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder={t.attendance.enterName}
              className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white text-sm font-semibold focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.attendance.addStudent}</span>
            </button>
          </form>

          {/* Students Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {students.map((student) => {
              return (
                <motion.div
                  key={student.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleAttendance(student.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between gap-2 select-none ${
                    student.attended
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600/60 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-850 border-slate-300 dark:border-slate-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-2xl shrink-0">{student.avatar}</span>
                    <div className="truncate">
                      <p className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-white truncate">
                        {student.name}
                      </p>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                        ⭐ {student.stars}
                      </p>
                    </div>
                  </div>

                  {student.attended ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: "Nechta bola bor?" Counting mini game & Mascot */}
        <div className="flex flex-col gap-5">
          {/* Interactive Counting Game */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-850 rounded-3xl p-5 border-2 border-amber-300 dark:border-slate-700 shadow-md text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/30 text-amber-900 dark:text-amber-300 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.attendance.countingTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-4 font-medium">
              {t.attendance.countingDesc}
            </p>

            {/* Big Count Numbers Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isSelected = selectedCountGuess === num;
                return (
                  <motion.button
                    key={num}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => handleGuessCount(num)}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl font-black text-base sm:text-lg transition shadow-xs flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? num === presentCount
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-300'
                          : 'bg-rose-500 text-white ring-4 ring-rose-300'
                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-amber-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {num}
                  </motion.button>
                );
              })}
            </div>

            {/* Counting Feedback */}
            {countingResult === 'correct' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-xs sm:text-sm"
              >
                🎉 {t.mascot.correct[0]} Guruhda roppa-rosa {presentCount} nafar bola bor! (+2 ⭐)
              </motion.div>
            )}

            {countingResult === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2.5 rounded-xl bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300 font-bold text-xs"
              >
                😊 {t.mascot.tryAgain[0]} Qaytadan sanab ko'ramizmi?
              </motion.div>
            )}
          </div>

          {/* Mascot in attendance stage */}
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 border border-amber-200 dark:border-slate-700">
            <MascotAlifbek
              message={
                presentCount > 0
                  ? `Bugun darsimizda ${presentCount} nafar bilimdon bola qatnashmoqda! Barakalla!`
                  : t.attendance.subtitle
              }
              reaction={presentCount > 0 ? 'happy' : 'idle'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
