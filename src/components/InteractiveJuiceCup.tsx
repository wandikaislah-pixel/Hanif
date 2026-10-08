import React, { useState } from 'react';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';

export const InteractiveJuiceCup: React.FC = () => {
  const { progress, incrementSandboxAction } = useProgress();
  const capacity = 6; // Cup divided into 6 parts
  const [level, setLevel] = useState<number>(3); // 3/6

  const handleAdd = (amount: number) => {
    playSound.slice(progress.soundEnabled);
    incrementSandboxAction();
    setLevel(prev => Math.min(capacity, prev + amount));
  };

  const handleSubtract = (amount: number) => {
    playSound.slice(progress.soundEnabled);
    incrementSandboxAction();
    setLevel(prev => Math.max(0, prev - amount));
  };

  const fillPercent = (level / capacity) * 100;

  return (
    <div className="flex flex-col items-center bg-emerald-50 rounded-2xl p-4 sm:p-5 border-3 border-emerald-300">
      <div className="text-center mb-3">
        <span className="inline-block bg-emerald-200 text-emerald-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-1">
          Eksperimen Operasi Hitung
        </span>
        <h4 className="font-heading font-bold text-lg text-emerald-950">
          Gelas Takar Jus Ajaib 🥤
        </h4>
        <p className="text-xs text-emerald-800">
          Tambah atau minum jus untuk melihat penjumlahan dan pengurangan pecahan berpenyebut sama!
        </p>
      </div>

      {/* Glass cup visual */}
      <div className="flex items-center gap-6 my-2">
        {/* Measuring Beaker */}
        <div className="relative w-28 h-56 bg-white/70 border-4 border-slate-700 rounded-b-2xl overflow-hidden shadow-md">
          {/* Liquid fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500 to-amber-400 transition-all duration-500 ease-out flex items-center justify-center"
            style={{ height: `${fillPercent}%` }}
          >
            {/* Gentle wave sheen */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-amber-200/60"></div>
            {level > 0 && (
              <span className="text-white font-black text-sm drop-shadow">
                {level}/{capacity}
              </span>
            )}
          </div>

          {/* Scale Markings */}
          {Array.from({ length: capacity + 1 }).map((_, idx) => {
            const bottomPercent = (idx / capacity) * 100;
            return (
              <div
                key={idx}
                className="absolute right-0 flex items-center pr-1 select-none"
                style={{ bottom: `calc(${bottomPercent}% - 8px)` }}
              >
                <span className="text-[10px] font-bold text-slate-600 mr-1">
                  {idx}/{capacity}
                </span>
                <span className="w-3 h-0.5 bg-slate-700"></span>
              </div>
            );
          })}
        </div>

        {/* Math explanation board */}
        <div className="flex flex-col items-center bg-white p-3.5 rounded-xl border-2 border-emerald-300 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase mb-1">Status Jus Sekarang</span>
          <div className="flex flex-col items-center text-emerald-800 my-1">
            <span className="text-3xl font-black">{level}</span>
            <span className="w-10 h-1 bg-emerald-800 rounded my-0.5"></span>
            <span className="text-3xl font-black">{capacity}</span>
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-1">
            {level === 0 ? 'Gelas Kosong' : level === capacity ? 'Gelas Penuh (1 Utuh)!' : `${level} dari ${capacity} takaran`}
          </span>

          {level === 3 && (
            <span className="mt-2 text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              Senilai dengan 1/2 Gelas!
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        <button
          onClick={() => handleAdd(1)}
          disabled={level >= capacity}
          className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 disabled:opacity-40 transition shadow comic-panel-sm"
        >
          ➕ Tuang +1/{capacity}
        </button>

        <button
          onClick={() => handleAdd(2)}
          disabled={level + 2 > capacity}
          className="px-3 py-1.5 bg-teal-600 text-white font-bold text-xs rounded-lg hover:bg-teal-700 disabled:opacity-40 transition shadow comic-panel-sm"
        >
          ➕ Tuang +2/{capacity}
        </button>

        <button
          onClick={() => handleSubtract(1)}
          disabled={level <= 0}
          className="px-3 py-1.5 bg-rose-500 text-white font-bold text-xs rounded-lg hover:bg-rose-600 disabled:opacity-40 transition shadow comic-panel-sm"
        >
          ➖ Minum -1/{capacity}
        </button>

        <button
          onClick={() => {
            playSound.click(progress.soundEnabled);
            setLevel(0);
          }}
          className="px-2.5 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 border border-slate-300 transition"
        >
          🔄 Kosongkan
        </button>
      </div>

      <div className="mt-3 text-center text-xs text-emerald-900 bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-300 font-medium">
        💡 <strong>Trik Ingat:</strong> Karena ukuran gelas sama (dibagi {capacity}), angka bawahnya selalu {capacity}! Cukup hitung penambahan atau pengurangan cairan di atasnya.
      </div>
    </div>
  );
};
