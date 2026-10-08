import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useProgress } from '../context/ProgressContext';
import { playSound } from '../utils/sound';
import { Sparkles, Trophy, X } from 'lucide-react';

export const BadgeUnlockModal: React.FC = () => {
  const { activeBadgeCelebration, closeBadgeCelebration, progress } = useProgress();

  useEffect(() => {
    if (activeBadgeCelebration) {
      playSound.badgeUnlock(progress.soundEnabled);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }
  }, [activeBadgeCelebration, progress.soundEnabled]);

  if (!activeBadgeCelebration) return null;

  const handleClose = () => {
    playSound.click(progress.soundEnabled);
    closeBadgeCelebration();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 comic-panel-lg shadow-2xl text-center border-4 border-slate-900">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating sparkles */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-900 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-yellow-300">
          <Sparkles className="w-4 h-4 text-yellow-600" />
          Lencana Baru Terbuka!
        </div>

        {/* Big Badge Icon */}
        <div
          className={`w-28 h-28 rounded-3xl mx-auto flex items-center justify-center text-6xl shadow-lg border-3 border-slate-900 mb-4 bg-gradient-to-br ${activeBadgeCelebration.color} animate-bounce`}
        >
          {activeBadgeCelebration.icon}
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mb-1">
          {activeBadgeCelebration.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
          {activeBadgeCelebration.description}
        </p>

        <button
          onClick={handleClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm comic-panel-sm transition shadow-md"
        >
          Hore! Terima Kasih 🎉
        </button>
      </div>
    </div>
  );
};
