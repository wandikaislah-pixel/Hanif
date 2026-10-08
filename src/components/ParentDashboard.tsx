import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { playSound } from '../utils/sound';
import {
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Lightbulb,
  Printer,
  RotateCcw,
  Edit2,
  BookOpen,
  Music,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    progress,
    updateProfile,
    resetProgress,
    isBgmPlaying,
    toggleBgm,
    bgmVolume,
    setBgmVolume,
    toggleSound,
  } = useProgress();
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(progress.profile.name);
  const [tempGrade, setTempGrade] = useState<string>(progress.profile.grade);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const completedCount = progress.completedChapters.length;
  const totalChapters = CHAPTERS_DATA.length;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  // Calculate overall quiz average
  const allAttempts = Object.values(progress.quizAttempts).flat();
  const avgQuizScore =
    allAttempts.length > 0
      ? Math.round(
          allAttempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            allAttempts.length
        )
      : 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playSound.click(progress.soundEnabled);
    updateProfile({ name: tempName, grade: tempGrade });
    setIsEditingProfile(false);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleConfirmReset = () => {
    playSound.click(progress.soundEnabled);
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl p-6 sm:p-8 text-white comic-panel-lg shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Users className="w-4 h-4 text-cyan-300" />
              Dasbor Pemantauan Orang Tua & Guru
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-wide">
              Perkembangan Belajar Anak 📊
            </h2>
            <p className="text-purple-100 text-sm mt-1 max-w-md font-medium">
              Pantau pemahaman materi pecahan, riwayat nilai kuis tiap bab, dan tips bimbingan belajar santai di rumah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handlePrintReport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-purple-50 font-extrabold text-xs comic-panel-sm transition shadow"
            >
              <Printer className="w-4 h-4 text-indigo-600" />
              Cetak Raport Pecahan
            </button>
          </div>
        </div>

        {/* Student Profile Quick View */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden text-2xl border border-white/30">
              <img
                src="/src/assets/images/avatar_kiki_1791459281884.jpg"
                alt="Avatar Siswa"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = '🐰';
                }}
              />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                {progress.profile.name}
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs text-purple-200 hover:text-white underline"
                >
                  <Edit2 className="w-3.5 h-3.5 inline" /> Edit
                </button>
              </div>
              <div className="text-xs text-purple-200">{progress.profile.grade}</div>
            </div>
          </div>

          <div className="text-xs text-purple-200 font-semibold bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
            ✓ Data tersimpan aman secara offline di perangkat ini
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveProfile}
            className="w-full max-w-md bg-white rounded-3xl p-6 comic-panel-lg shadow-2xl space-y-4"
          >
            <h3 className="font-heading font-black text-lg text-slate-800">
              Ubah Data Siswa ✏️
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap Anak:
              </label>
              <input
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 font-bold text-slate-800 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kelas:
              </label>
              <select
                value={tempGrade}
                onChange={e => setTempGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 font-bold text-slate-800 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="Kelas 2 SD">Kelas 2 SD</option>
                <option value="Kelas 3 SD">Kelas 3 SD</option>
                <option value="Kelas 4 SD">Kelas 4 SD</option>
                <option value="Kelas 5 SD">Kelas 5 SD</option>
                <option value="Kelas 6 SD">Kelas 6 SD</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-4 border-3 border-slate-900 shadow-sm comic-panel">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <BookOpen className="w-4 h-4 text-orange-500" />
            Bab Selesai
          </div>
          <div className="text-3xl font-black text-slate-900">
            {completedCount} <span className="text-sm font-semibold text-slate-400">/ {totalChapters}</span>
          </div>
          <div className="text-xs text-orange-600 font-bold mt-1">
            {progressPercent}% Materi Tuntas
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-4 border-3 border-slate-900 shadow-sm comic-panel">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Rata-rata Kuis
          </div>
          <div className="text-3xl font-black text-slate-900">
            {avgQuizScore > 0 ? `${avgQuizScore}%` : '-'}
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">
            {allAttempts.length} Total Percobaan
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-4 border-3 border-slate-900 shadow-sm comic-panel">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            Lencana
          </div>
          <div className="text-3xl font-black text-slate-900">
            {progress.unlockedBadgeIds.length} <span className="text-sm font-semibold text-slate-400">/ 8</span>
          </div>
          <div className="text-xs text-amber-600 font-bold mt-1">
            Penghargaan Prestasi
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-4 border-3 border-slate-900 shadow-sm comic-panel">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
            <Clock className="w-4 h-4 text-cyan-500" />
            Aktivitas Eksperimen
          </div>
          <div className="text-3xl font-black text-slate-900">
            {progress.sandboxExploredCount}
          </div>
          <div className="text-xs text-cyan-600 font-bold mt-1">
            Sentuhan Laboratorium
          </div>
        </div>
      </div>

      {/* Printable Report Card Section */}
      <div id="printable-report" className="bg-white rounded-3xl p-6 sm:p-8 comic-panel-lg shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
          <div>
            <h3 className="font-heading font-black text-xl text-slate-900">
              Rincian Capaian Bab & Nilai Kuis 📑
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Data evaluasi formatif setiap materi pecahan matematika Sekolah Dasar.
            </p>
          </div>
        </div>

        {/* Chapter Progress Table */}
        <div className="space-y-3">
          {CHAPTERS_DATA.map(ch => {
            const isDone = progress.completedChapters.includes(ch.id);
            const attempts = progress.quizAttempts[ch.id] || [];
            const latestAttempt = attempts[0];
            const bestPercentage = attempts.length > 0 ? Math.max(...attempts.map(a => a.percentage)) : null;

            return (
              <div
                key={ch.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : ch.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {ch.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-700">
                      {bestPercentage !== null ? (
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                          bestPercentage >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          Skor Terbaik: {bestPercentage}%
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Belum Ujian</span>
                      )}
                    </div>
                    {latestAttempt && (
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {attempts.length}x dicoba • {latestAttempt.completedAt}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Parental Guidance & Home Learning Tips */}
        <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            Tips Pendampingan Belajar Santai di Rumah (Untuk Orang Tua)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-950">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200 shadow-2xs">
              <strong>1. Gunakan Makanan Nyata:</strong>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Saat memotong apel, martabak, atau pizza keluarga, ajak anak menghitung: "Kalau dipotong 4 sama besar lalu kamu makan 1, artinya kamu makan 1/4!".
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200 shadow-2xs">
              <strong>2. Pecahan Senilai dengan Cokelat:</strong>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Patahkan cokelat batang jadi 2 bagian (1/2) lalu patahkan lagi jadi 4 (2/4) untuk membuktikan porsinya tetap kenyang dan sama banyak.
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200 shadow-2xs">
              <strong>3. Hubungkan dengan Jam & Waktu:</strong>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Konsep 15 menit adalah seperempat jam (1/4), dan 30 menit adalah setengah jam (1/2) membantu anak melihat pecahan di kehidupan sehari-hari.
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200 shadow-2xs">
              <strong>4. Apresiasi Setiap Usaha:</strong>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Pujilah ketekunan anak ketika mencoba kuis berulang kali. Cetak sertifikat di ruang lencana untuk dipajang di meja belajar anak!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Audio & Ambience Settings */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 comic-panel shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-500" />
            <h4 className="font-heading font-black text-base text-slate-900">
              Pengaturan Audio & Musik Belajar 🎶
            </h4>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            Web Audio Offline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* BGM Setting */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Music className="w-4 h-4 text-orange-600" />
                Musik Latar Belakang (Ceria)
              </span>
              <button
                onClick={toggleBgm}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  isBgmPlaying
                    ? 'bg-amber-400 text-amber-950 shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {isBgmPlaying ? 'Aktif (ON)' : 'Mati (OFF)'}
              </button>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              Musik lembut ceria tanpa vokal yang membantu anak fokus saat belajar pecahan.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgmVolume}
                onChange={e => setBgmVolume(parseFloat(e.target.value))}
                className="w-full accent-orange-500"
              />
              <span className="text-[11px] font-bold text-orange-700 min-w-[32px] text-right">
                {Math.round(bgmVolume * 100)}%
              </span>
            </div>
          </div>

          {/* SFX Setting */}
          <div className="bg-sky-50/70 p-4 rounded-2xl border-2 border-sky-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                {progress.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
                Efek Suara Kuis & Lencana (SFX)
              </span>
              <button
                onClick={toggleSound}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  progress.soundEnabled
                    ? 'bg-sky-400 text-sky-950 shadow-xs'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {progress.soundEnabled ? 'Aktif (ON)' : 'Mati (OFF)'}
              </button>
            </div>
            <p className="text-[11px] text-slate-600">
              Bunyi bel gembira saat jawaban kuis benar, boing ramah saat salah, dan fanfare megah saat mendapat lencana.
            </p>
            <div className="mt-2 text-[10px] text-sky-700 font-semibold bg-white/70 p-1.5 rounded-lg border border-sky-200">
              ✓ Menggunakan sintesis Web Audio API (100% aman dan bekerja tanpa internet).
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="bg-slate-100 rounded-2xl p-4 border border-slate-300 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-700">Reset Semua Progres Belajar</h4>
          <p className="text-[11px] text-slate-500">
            Gunakan jika adik atau anak lain ingin memulai belajar dari bab pertama.
          </p>
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition border border-rose-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600">Yakin reset?</span>
            <button
              onClick={handleConfirmReset}
              className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Ya, Reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-2.5 py-1 text-xs font-bold bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
