import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Printer,
  Download,
  Award,
  Sparkles,
  Users,
  CheckCircle,
  Star,
  FileText,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { MascotAlifbek } from '../MascotAlifbek';

export const EvaluationStage: React.FC = () => {
  const {
    t,
    students,
    currentLetter,
    userStars,
    settings,
    playAudio,
    setStage,
  } = useApp();

  const [selectedStudentName, setSelectedStudentName] = useState('Jasur');
  const [educatorName, setEducatorName] = useState('Gulnora opa');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);

  const presentStudents = students.filter((s) => s.attended);
  const totalStarsAll = students.reduce((acc, s) => acc + s.stars, userStars);
  const avgStars = Math.round(totalStarsAll / (students.length || 1));

  const handleOpenCertificate = (studentName: string) => {
    setSelectedStudentName(studentName);
    setShowCertificateModal(true);
    playAudio('fanfare');
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } catch (e) {
      console.debug(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = 'ID,Ism,Davomat,Yulduzlar,Test Balli\n';
    const rows = students
      .map(
        (s) =>
          `${s.id},"${s.name}",${s.attended ? 'Bor' : 'Yo\'q'},${s.stars},${s.quizScore}%`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rus_alifbo_hisobot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playAudio('pop');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Trophy className="w-5 h-5" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {t.evaluation.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t.evaluation.subtitle}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>CSV hisobot</span>
          </button>

          <button
            type="button"
            onClick={() => setShowWorksheetModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition"
          >
            <FileText className="w-4 h-4" />
            <span>{t.evaluation.printWorksheet}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-amber-200 dark:border-slate-700 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {totalStarsAll}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {t.evaluation.totalStars}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-emerald-200 dark:border-slate-700 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl">
            👥
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              {Math.round((presentStudents.length / (students.length || 1)) * 100)}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {t.evaluation.attendanceRate} ({presentStudents.length}/{students.length})
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-purple-200 dark:border-slate-700 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-slate-700 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl">
            🎓
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              «{currentLetter.letter}» harfi
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              Bugungi o'zlashtirilgan harf
            </div>
          </div>
        </div>
      </div>

      {/* Students Progress Table & Certificate generator */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-700 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-black text-lg text-slate-800 dark:text-white">
            {t.evaluation.studentsList}
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            Diplom berish uchun bolani tanlang:
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{student.avatar}</span>
                <div>
                  <div className="font-black text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                    <span>{student.name}</span>
                    {student.attended && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        {t.attendance.present}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                    ⭐ {student.stars} yulduz • Test: {student.quizScore}%
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCertificate(student.name)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs shadow-xs transition"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Diplom</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Mascot and Lesson Restart */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-amber-50 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700">
        <MascotAlifbek
          message="Bugungi dars muvaffaqiyatli yakunlandi! Barcha bolalar ajoyib bilim ko'rsatdi!"
          reaction="celebrate"
        />

        <button
          type="button"
          onClick={() => {
            playAudio('pop');
            setStage('intro');
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Darsni boshidan boshlash</span>
        </button>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center relative print:shadow-none print:border-none print:p-0">
            {/* Certificate border decoration */}
            <div className="border-4 border-double border-amber-500 rounded-2xl p-6 sm:p-8 bg-amber-50/40 dark:bg-slate-800/40 relative">
              <div className="text-4xl mb-2">⭐ 🏆 ⭐</div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 mb-1 tracking-wide">
                {t.evaluation.certificateTitle}
              </h2>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                СЕРТИФИКАТ / ДИПЛОМ ПОЧЁТА
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                {t.evaluation.certificateAwardedTo}
              </p>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white border-b-2 border-amber-400 pb-2 mb-4 font-heading inline-block px-8">
                {selectedStudentName}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 max-w-md mx-auto mb-6 leading-relaxed">
                {t.evaluation.certificateReason} («{currentLetter.letter}» harfi).
              </p>

              {/* Certificate Footer */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-amber-200 dark:border-slate-700">
                <div className="text-left">
                  <div className="font-bold">{t.evaluation.certificateDate}:</div>
                  <div>{new Date().toLocaleDateString('uz-UZ')}</div>
                </div>

                <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-dashed border-amber-500 flex items-center justify-center text-[10px] font-black text-amber-800">
                  MUHR
                </div>

                <div className="text-right">
                  <div className="font-bold">{t.evaluation.certificateTeacherSig}:</div>
                  <div className="font-cursive text-lg">{educatorName}</div>
                </div>
              </div>
            </div>

            {/* Modal action bar (hidden during print) */}
            <div className="flex items-center justify-center gap-3 mt-6 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition"
              >
                <Printer className="w-4 h-4" />
                <span>{t.common.print}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Worksheet Modal */}
      {showWorksheetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 text-slate-900 print:shadow-none print:border-none print:p-0">
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200 mb-4">
              <div>
                <h3 className="font-heading font-black text-xl text-slate-800">
                  Yozuv daftari: «{currentLetter.letter}» harfi
                </h3>
                <p className="text-xs text-slate-500">
                  Ism: _____________________ Sana: ______________
                </p>
              </div>
              <div className="text-3xl font-black text-amber-500">{currentLetter.words[0]?.emoji}</div>
            </div>

            {/* Tracing lines simulator */}
            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((row) => (
                <div key={row} className="relative h-14 border-y border-slate-300 flex items-center px-4">
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-sky-300" />
                  <div className="flex gap-8 text-2xl font-cursive opacity-40 select-none">
                    <span>{currentLetter.cursiveUpper} {currentLetter.cursiveLower}</span>
                    <span>{currentLetter.cursiveUpper} {currentLetter.cursiveLower}</span>
                    <span>{currentLetter.cursiveUpper} {currentLetter.cursiveLower}</span>
                    <span>{currentLetter.cursiveUpper} {currentLetter.cursiveLower}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coloring task */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-6">
              <span className="text-6xl mb-2 block">{currentLetter.words[0]?.emoji}</span>
              <p className="text-sm font-bold text-slate-700">
                Rasmni bo'yang va so'zni o'qing: {currentLetter.words[0]?.ru} ({currentLetter.words[0]?.uz})
              </p>
            </div>

            <div className="flex justify-end gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-md transition"
              >
                <Printer className="w-4 h-4" />
                <span>{t.common.print}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowWorksheetModal(false)}
                className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
