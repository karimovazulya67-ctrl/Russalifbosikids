/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { IntroStage } from './components/stages/IntroStage';
import { AttendanceStage } from './components/stages/AttendanceStage';
import { ReviewStage } from './components/stages/ReviewStage';
import { NewTopicStage } from './components/stages/NewTopicStage';
import { PracticeStage } from './components/stages/PracticeStage';
import { GamesStage } from './components/stages/GamesStage';
import { QuizStage } from './components/stages/QuizStage';
import { EvaluationStage } from './components/stages/EvaluationStage';
import { AlphabetMapModal } from './components/modals/AlphabetMapModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ParentsGuideModal } from './components/modals/ParentsGuideModal';

const AppContent: React.FC = () => {
  const { stage, settings, t, setIsParentsOpen, setIsMapOpen } = useApp();

  return (
    <div
      className={`min-h-screen flex flex-col bg-amber-50/40 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${
        settings.largeFont ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Top Navigation */}
      <Navbar />

      {/* Main Lesson Stage Area with Animated Transitions */}
      <main className="flex-1 w-full pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {stage === 'intro' && <IntroStage />}
            {stage === 'attendance' && <AttendanceStage />}
            {stage === 'review' && <ReviewStage />}
            {stage === 'new-topic' && <NewTopicStage />}
            {stage === 'practice' && <PracticeStage />}
            {stage === 'games' && <GamesStage />}
            {stage === 'quiz' && <QuizStage />}
            {stage === 'evaluation' && <EvaluationStage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 bg-white/70 dark:bg-slate-900/70 border-t border-amber-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 select-none print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">{t.appName}</span>
            <span>•</span>
            <span>{t.appSubtitle}</span>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="hover:text-amber-600 transition"
            >
              {t.common.alphabetMap}
            </button>
            <button
              type="button"
              onClick={() => setIsParentsOpen(true)}
              className="hover:text-amber-600 transition"
            >
              {t.common.parentsGuide}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AlphabetMapModal />
      <SettingsModal />
      <ParentsGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
