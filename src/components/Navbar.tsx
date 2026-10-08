import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { PWAInstallButton } from './PWAInstallButton';
import { playSound } from '../utils/sound';
import {
  BookOpen,
  FlaskConical,
  Award,
  Users,
  Volume2,
  VolumeX,
  Music,
  SlidersHorizontal,
  Wifi,
} from 'lucide-react';

interface Props {
  activeTab: 'comic' | 'sandbox' | 'badges' | 'parent';
  onSelectTab: (tab: 'comic' | 'sandbox' | 'badges' | 'parent') => void;
  selectedChapterId: number;
  onSelectChapter: (chId: number) => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  selectedChapterId,
  onSelectChapter,
}) => {
  const {
    progress,
    toggleSound,
    isBgmPlaying,
    bgmVolume,
    toggleBgm,
    setBgmVolume,
  } = useProgress();

  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  const handleNav = (tab: 'comic' | 'sandbox' | 'badges' | 'parent') => {
    playSound.click(progress.soundEnabled);
    onSelectTab(tab);
  };

  const handleToggleBgm = () => {
    playSound.click(progress.soundEnabled);
    toggleBgm();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-3 border-slate-900 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Kid Identity */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => handleNav('comic')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-xs group-hover:rotate-6 transition-transform">
              🍕
            </div>
            <div>
              <h1 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-tight">
                Petualangan Pecahan
              </h1>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                E-Komik Interaktif SD • Lengkap Kuis & Lencana
              </span>
            </div>
          </div>

          {/* Quick Audio & Install on mobile header */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile BGM Button */}
            <button
              onClick={handleToggleBgm}
              title={isBgmPlaying ? 'Matikan Musik Latar' : 'Putar Musik Ceria'}
              className={`p-2 rounded-xl border transition ${
                isBgmPlaying
                  ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-xs'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
            >
              <Music className={`w-4 h-4 ${isBgmPlaying ? 'animate-bounce' : ''}`} />
            </button>

            {/* Mobile SFX Button */}
            <button
              onClick={toggleSound}
              title={progress.soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-orange-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
            <PWAInstallButton />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 justify-center">
          <button
            onClick={() => handleNav('comic')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition comic-btn ${
              activeTab === 'comic'
                ? 'bg-orange-500 text-white border-2 border-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Baca Komik</span>
          </button>

          <button
            onClick={() => handleNav('sandbox')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition comic-btn ${
              activeTab === 'sandbox'
                ? 'bg-cyan-500 text-white border-2 border-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Laboratorium</span>
          </button>

          <button
            onClick={() => handleNav('badges')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition comic-btn ${
              activeTab === 'badges'
                ? 'bg-amber-500 text-white border-2 border-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Lencana ({progress.unlockedBadgeIds.length}/8)</span>
          </button>

          <button
            onClick={() => handleNav('parent')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition comic-btn ${
              activeTab === 'parent'
                ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Dasbor Ortu</span>
          </button>
        </nav>

        {/* Desktop Controls (BGM, SFX, Volume, PWA, Offline) */}
        <div className="hidden md:flex items-center gap-2 relative">
          {/* Offline Ready Badge */}
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
            <Wifi className="w-3 h-3 text-emerald-600" />
            Offline Siap
          </span>

          {/* BGM Toggle Button */}
          <button
            onClick={handleToggleBgm}
            title={isBgmPlaying ? 'Jeda Musik Latar Ceria' : 'Putar Musik Latar Ceria'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 font-bold text-xs transition shadow-2xs ${
              isBgmPlaying
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 border-amber-600 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-spin' : ''}`} />
            <span>{isBgmPlaying ? 'Musik: ON' : 'Musik: OFF'}</span>
          </button>

          {/* Volume Settings Slider Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(prev => !prev)}
              title="Atur Volume Musik"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
            </button>

            {showVolumeSlider && (
              <div className="absolute right-0 top-12 z-50 bg-white p-3 rounded-2xl border-2 border-slate-800 shadow-xl w-48 text-xs font-bold text-slate-800 animate-in fade-in">
                <div className="flex justify-between items-center mb-1">
                  <span>Volume Musik:</span>
                  <span className="text-orange-600">{Math.round(bgmVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={bgmVolume}
                  onChange={e => setBgmVolume(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <button
                  onClick={() => setShowVolumeSlider(false)}
                  className="mt-2 w-full py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] text-slate-600 text-center"
                >
                  Tutup
                </button>
              </div>
            )}
          </div>

          {/* Sound Effects Toggle Button */}
          <button
            onClick={toggleSound}
            title={progress.soundEnabled ? 'Matikan Efek Suara (SFX)' : 'Nyalakan Efek Suara (SFX)'}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition text-xs font-bold"
          >
            {progress.soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-[11px]">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] text-slate-400">SFX: OFF</span>
              </>
            )}
          </button>

          <PWAInstallButton />
        </div>
      </div>

      {/* Chapter Selection Bar (Visible when reading comic) */}
      {activeTab === 'comic' && (
        <div className="bg-amber-100/90 border-t-2 border-slate-900 px-4 py-2 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max justify-start sm:justify-center">
            <span className="text-xs font-black text-amber-950 uppercase tracking-wider mr-1">
              Pilih Bab:
            </span>
            {[1, 2, 3, 4, 5].map(chId => {
              const isSelected = selectedChapterId === chId;
              const isCompleted = progress.completedChapters.includes(chId);

              return (
                <button
                  key={chId}
                  onClick={() => {
                    playSound.click(progress.soundEnabled);
                    onSelectChapter(chId);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-extrabold transition border-2 ${
                    isSelected
                      ? 'bg-orange-600 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-200'
                  }`}
                >
                  <span>Bab {chId}</span>
                  {isCompleted && (
                    <span className="text-[10px] bg-emerald-400 text-emerald-950 px-1 rounded-full font-black">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
