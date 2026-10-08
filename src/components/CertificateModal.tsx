import React from 'react';
import { Badge } from '../types';
import { useProgress } from '../context/ProgressContext';
import { Printer, X, Award, CheckCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
  unlockedBadges: Badge[];
}

export const CertificateModal: React.FC<Props> = ({ onClose, unlockedBadges }) => {
  const { progress } = useProgress();

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-slate-900 my-8">
        {/* Modal Controls (No Print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-heading font-black text-lg text-slate-800">
              Sertifikat Penghargaan Resmi
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Sheet */}
        <div
          id="printable-certificate"
          className="bg-amber-50/50 p-8 sm:p-12 rounded-2xl border-8 border-double border-amber-800 text-center relative overflow-hidden"
        >
          {/* Corner flourish ornaments */}
          <div className="absolute top-3 left-3 text-2xl text-amber-800 select-none">⚜️</div>
          <div className="absolute top-3 right-3 text-2xl text-amber-800 select-none">⚜️</div>
          <div className="absolute bottom-3 left-3 text-2xl text-amber-800 select-none">⚜️</div>
          <div className="absolute bottom-3 right-3 text-2xl text-amber-800 select-none">⚜️</div>

          <div className="inline-block bg-amber-200 border-2 border-amber-600 px-4 py-1 rounded-full text-xs font-black tracking-widest text-amber-950 uppercase mb-3">
            SERTIFIKAT KELULUSAN MATEMATIKA
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-black text-amber-950 tracking-wide">
            JUARA PETUALANGAN PECAHAN
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 italic">
            Diberikan sebagai bentuk apresiasi dan penghargaan istimewa kepada:
          </p>

          {/* Student Name */}
          <div className="my-5 py-2 border-b-2 border-dashed border-amber-600/70 inline-block min-w-[280px]">
            <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-comic">
              {progress.profile.name || 'Siswa Berprestasi'}
            </span>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              {progress.profile.grade}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
            Atas dedikasi, ketelitian, dan keberhasilan dalam menuntaskan seluruh bab e-komik interaktif,
            menguasai konsep pecahan, serta menyelesaikan kuis tantangan matematika dasar dengan cemerlang.
          </p>

          {/* Badges Earned Ribbon */}
          <div className="my-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
              Lencana Prestasi yang Diraih ({unlockedBadges.length} Lencana):
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {unlockedBadges.map(b => (
                <div
                  key={b.id}
                  className="flex items-center gap-1.5 bg-white border border-amber-400 px-2.5 py-1 rounded-full text-xs font-bold text-amber-950 shadow-2xs"
                >
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-amber-300 mt-6 text-xs text-slate-700">
            <div>
              <div className="text-[11px] text-slate-500">Tanggal Kelulusan:</div>
              <div className="font-bold text-slate-900 mt-1">{currentDate}</div>
              <div className="mt-4 pt-1 border-t border-slate-300 w-32 mx-auto font-semibold">
                Piko Si Burung Hantu 🦉
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500">Disahkan Oleh:</div>
              <div className="font-bold text-slate-900 mt-1">Koki & Mentor Edukasi</div>
              <div className="mt-4 pt-1 border-t border-slate-300 w-32 mx-auto font-semibold">
                Chef Dono & Kiki 🍕
              </div>
            </div>
          </div>
        </div>

        {/* Action Button (No Print) */}
        <div className="no-print mt-5 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
