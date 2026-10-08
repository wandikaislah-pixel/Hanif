/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { CHAPTERS_DATA } from './data/chaptersData';
import { Navbar } from './components/Navbar';
import { ComicViewer } from './components/ComicViewer';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { BadgeShowcase } from './components/BadgeShowcase';
import { ParentDashboard } from './components/ParentDashboard';
import { BadgeUnlockModal } from './components/BadgeUnlockModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Sparkles, Heart } from 'lucide-react';

function MainContent() {
  const { progress, setCurrentChapter } = useProgress();
  const [activeTab, setActiveTab] = useState<'comic' | 'sandbox' | 'badges' | 'parent'>('comic');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(progress.currentChapterId || 1);

  const currentChapter = CHAPTERS_DATA.find(c => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  const handleSelectChapter = (chId: number) => {
    setSelectedChapterId(chId);
    setCurrentChapter(chId);
    setActiveTab('comic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/60 text-slate-800 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedChapterId={selectedChapterId}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'comic' && (
          <ComicViewer
            chapter={currentChapter}
            onSelectChapter={handleSelectChapter}
            onOpenSandbox={() => setActiveTab('sandbox')}
          />
        )}

        {activeTab === 'sandbox' && <InteractiveSandbox />}

        {activeTab === 'badges' && <BadgeShowcase />}

        {activeTab === 'parent' && <ParentDashboard />}
      </main>

      {/* Popups & Ambient Indicators */}
      <BadgeUnlockModal />
      <OfflineIndicator />

      {/* Kid-friendly Footer */}
      <footer className="bg-amber-100 border-t-3 border-slate-900 py-6 text-center text-xs text-amber-950 font-bold no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🍕</span>
            <span>Petualangan Pecahan: E-Komik Digital Interaktif Siswa SD</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>untuk pembelajaran matematika ceria & mandiri</span>
          </div>

          <div className="bg-amber-200/80 px-3 py-1 rounded-full text-[11px] text-amber-900 border border-amber-300">
            ✓ 100% Dukungan Mode Offline
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <MainContent />
    </ProgressProvider>
  );
}
