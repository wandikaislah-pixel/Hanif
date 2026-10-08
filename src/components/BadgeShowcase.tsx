import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { CertificateModal } from './CertificateModal';
import { Trophy, Award, Lock, Sparkles, Printer } from 'lucide-react';
import { playSound } from '../utils/sound';

export const BadgeShowcase: React.FC = () => {
  const { badges, progress } = useProgress();
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalCount = badges.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const handleOpenCertificate = () => {
    playSound.click(progress.soundEnabled);
    setShowCertificate(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white comic-panel-lg shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Trophy className="w-4 h-4 text-yellow-300" />
              Koleksi Prestasi & Lencana
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-wide">
              Ruang Lencana Juara 🏅
            </h2>
            <p className="text-amber-100 text-sm mt-1 max-w-md font-medium">
              Selesaikan bab, raih nilai kuis tinggi, dan bereksperimen di laboratorium untuk membuka semua lencana!
            </p>
          </div>

          {/* Certificate Download / Print Button */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <button
              onClick={handleOpenCertificate}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-orange-900 hover:bg-amber-100 font-extrabold text-sm comic-panel-sm transition shadow-lg"
            >
              <Printer className="w-4 h-4 text-orange-600" />
              Cetak Sertifikat Juara
            </button>
            <span className="text-[11px] text-white/80">
              {unlockedCount > 0 ? '✓ Sertifikat siap dicetak/disimpan!' : 'Buka minimal 1 lencana untuk sertifikat'}
            </span>
          </div>
        </div>

        {/* Progress Bar in Banner */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span>Koleksi Lencana: {unlockedCount} dari {totalCount} Lencana</span>
            <span>{progressPercent}% Terkumpul</span>
          </div>
          <div className="w-full h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/30">
            <div
              className="h-full bg-yellow-300 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map(badge => {
          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border-3 transition-all flex flex-col items-center text-center relative overflow-hidden ${
                badge.isUnlocked
                  ? 'bg-white border-slate-900 shadow-md hover:-translate-y-1 comic-panel'
                  : 'bg-slate-100/80 border-slate-300 opacity-60'
              }`}
            >
              {/* Top status indicator */}
              <div className="absolute top-2 right-2">
                {badge.isUnlocked ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow">
                    ✓
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs">
                    <Lock className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Icon Circle */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3 shadow-sm border-2 ${
                  badge.isUnlocked
                    ? `bg-gradient-to-br ${badge.color} border-slate-900 text-white shadow-md animate-in zoom-in-50`
                    : 'bg-slate-200 border-slate-300 grayscale'
                }`}
              >
                {badge.icon}
              </div>

              <h4 className="font-heading font-black text-base text-slate-900 mb-1">
                {badge.title}
              </h4>

              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3 flex-1">
                {badge.description}
              </p>

              {badge.isUnlocked ? (
                <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-700">
                  <Sparkles className="w-3 h-3" />
                  Lencana Dibuka!
                </div>
              ) : (
                <div className="w-full pt-2 border-t border-slate-200 text-[11px] font-bold text-slate-400">
                  Belum Terbuka
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          onClose={() => setShowCertificate(false)}
          unlockedBadges={badges.filter(b => b.isUnlocked)}
        />
      )}
    </div>
  );
};
