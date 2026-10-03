import React from 'react';
import { motion } from 'motion/react';
import { X, HeartHandshake, BookOpen, Clock, Smile, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentsGuideModal: React.FC = () => {
  const { isParentsOpen, setIsParentsOpen, t } = useApp();

  if (!isParentsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border-4 border-amber-300 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 dark:bg-slate-800 text-rose-600">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-heading font-black text-xl text-slate-800 dark:text-white">
                {t.parents.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.parents.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsParentsOpen(false)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Cards */}
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                1. {t.parents.tip1Title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {t.parents.tip1Text}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Search className="w-4 h-4 text-sky-600" />
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                2. {t.parents.tip2Title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {t.parents.tip2Text}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Smile className="w-4 h-4 text-emerald-600" />
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                3. {t.parents.tip3Title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {t.parents.tip3Text}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">
                4. {t.parents.tip4Title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {t.parents.tip4Text}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsParentsOpen(false)}
          className="mt-5 w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition"
        >
          {t.common.close}
        </button>
      </motion.div>
    </div>
  );
};
