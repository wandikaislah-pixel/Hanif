import React, { useState } from 'react';
import { Chapter } from '../types';
import { ComicPanel } from './ComicPanel';
import { ChapterQuiz } from './ChapterQuiz';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, Sparkles, CheckCircle } from 'lucide-react';

interface Props {
  chapter: Chapter;
  onSelectChapter: (chId: number) => void;
  onOpenSandbox: () => void;
}

export const ComicViewer: React.FC<Props> = ({ chapter, onSelectChapter, onOpenSandbox }) => {
  const { progress } = useProgress();
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides');
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const totalPanels = chapter.panels.length;
  const isCompleted = progress.completedChapters.includes(chapter.id);

  const handleNextPanel = () => {
    playSound.pageTurn(progress.soundEnabled);
    if (activePanelIndex + 1 < totalPanels) {
      setActivePanelIndex(prev => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevPanel = () => {
    playSound.pageTurn(progress.soundEnabled);
    if (activePanelIndex > 0) {
      setActivePanelIndex(prev => prev - 1);
    }
  };

  const handleToggleQuiz = () => {
    playSound.click(progress.soundEnabled);
    setShowQuiz(prev => !prev);
  };

  if (showQuiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ChapterQuiz
          chapter={chapter}
          onBackToStory={() => setShowQuiz(false)}
          onNextChapter={() => {
            if (chapter.id < 5) {
              setShowQuiz(false);
              setActivePanelIndex(0);
              onSelectChapter(chapter.id + 1);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Chapter Banner Card */}
      <div className={`bg-gradient-to-r ${chapter.themeColor} rounded-3xl p-5 sm:p-7 text-white comic-panel-lg shadow-xl relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {chapter.coverImage && (
              <img
                src={chapter.coverImage}
                alt={chapter.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white/60 shadow-md shrink-0"
              />
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                E-Komik Interaktif • Bab {chapter.id}
                {isCompleted && (
                  <span className="bg-emerald-400 text-emerald-950 px-2 py-0.2 rounded-full text-[10px] font-black ml-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Selesai
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-wide">
                {chapter.title}
              </h2>
              <p className="text-amber-100 text-sm mt-1 max-w-xl font-medium">
                {chapter.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleToggleQuiz}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 text-amber-950 hover:bg-yellow-300 font-extrabold text-sm comic-panel-sm transition shadow-md"
            >
              <HelpCircle className="w-4 h-4" />
              Mulai Kuis Bab!
            </button>

            <button
              onClick={onOpenSandbox}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Ruang Eksperimen
            </button>
          </div>
        </div>

        {/* Story Intro Tagline */}
        <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/90">
          📍 <strong>Cerita:</strong> {chapter.storyDescription}
        </div>
      </div>

      {/* Reader Controls Bar */}
      <div className="bg-white rounded-2xl p-3 border-2 border-slate-300 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Progress Bar & Indicators */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
            Adegan {activePanelIndex + 1} / {totalPanels}
          </span>
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-300">
            <div
              className="h-full bg-orange-500 transition-all duration-300 rounded-full"
              style={{ width: `${((activePanelIndex + 1) / totalPanels) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('slides')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              viewMode === 'slides' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Satu per Satu
          </button>
          <button
            onClick={() => setViewMode('scroll')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              viewMode === 'scroll' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Semua Adegan
          </button>
        </div>
      </div>

      {/* Comic Panels Display */}
      {viewMode === 'slides' ? (
        <div className="space-y-4">
          <ComicPanel
            panel={chapter.panels[activePanelIndex]}
            panelIndex={activePanelIndex}
            totalPanels={totalPanels}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrevPanel}
              disabled={activePanelIndex === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-300 disabled:opacity-40 font-bold text-sm text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {activePanelIndex + 1 < totalPanels ? (
              <button
                onClick={handleNextPanel}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm comic-panel-sm transition shadow-md"
              >
                Lanjut Baca
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm comic-panel-sm transition shadow-md animate-pulse"
              >
                <HelpCircle className="w-4 h-4" />
                Selesai & Ikuti Kuis!
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {chapter.panels.map((panel, idx) => (
            <ComicPanel
              key={panel.id}
              panel={panel}
              panelIndex={idx}
              totalPanels={totalPanels}
            />
          ))}

          {/* Call to action at bottom of scroll mode */}
          <div className="text-center py-6 bg-amber-100/60 rounded-3xl border-3 border-dashed border-amber-400 p-6">
            <h4 className="font-heading font-black text-xl text-amber-950 mb-2">
              Kamu sudah selesai membaca seluruh bab ini!
            </h4>
            <p className="text-sm text-amber-800 mb-4">
              Uji kemampuanmu sekarang dan rebut lencana penghargaan "{chapter.title}"!
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-base comic-panel transition shadow-lg"
            >
              <HelpCircle className="w-5 h-5" />
              Mulai Kuis Bab Sekarang!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
