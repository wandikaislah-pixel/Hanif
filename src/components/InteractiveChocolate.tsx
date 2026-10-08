import React, { useState } from 'react';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';

export const InteractiveChocolate: React.FC = () => {
  const { progress, incrementSandboxAction } = useProgress();
  const [multiplier, setMultiplier] = useState<number>(2); // 1 = 1/2, 2 = 2/4, 3 = 3/6, 4 = 4/8

  const handleMultiplierChange = (m: number) => {
    playSound.click(progress.soundEnabled);
    incrementSandboxAction();
    setMultiplier(m);
  };

  const numerator = 1 * multiplier;
  const denominator = 2 * multiplier;

  return (
    <div className="flex flex-col items-center bg-amber-50 rounded-2xl p-4 sm:p-5 border-3 border-amber-800/40">
      <div className="text-center mb-3">
        <span className="inline-block bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-1">
          Eksperimen Pecahan Senilai
        </span>
        <h4 className="font-heading font-bold text-lg text-amber-950">
          Laboratorium Cokelat Senilai 🍫
        </h4>
        <p className="text-xs text-amber-800">
          Perhatikan panjang area cokelat yang diarsir. Nilainya sama persis walaupun jumlah potongannya bertambah!
        </p>
      </div>

      {/* Side-by-side chocolate bars */}
      <div className="w-full max-w-md space-y-4 my-2">
        {/* Bar 1: Base Bar (1/2) */}
        <div className="bg-white p-3 rounded-xl border-2 border-amber-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-amber-900">
            <span>Batang Cokelat A (1 dari 2 potong)</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-extrabold text-sm">
              1/2 Cokelat
            </span>
          </div>

          <div className="h-14 w-full bg-amber-100 rounded-lg border-3 border-amber-900 flex overflow-hidden shadow-inner">
            <div className="w-1/2 h-full bg-gradient-to-r from-amber-700 to-amber-800 border-r-3 border-amber-950 flex items-center justify-center text-white font-bold text-sm shadow">
              🍫 1/2 Dimakan
            </div>
            <div className="w-1/2 h-full bg-amber-200/50 flex items-center justify-center text-amber-800 text-xs font-semibold">
              Sisa 1/2
            </div>
          </div>
        </div>

        {/* Bar 2: Variable Multiplier Bar */}
        <div className="bg-white p-3 rounded-xl border-2 border-amber-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-amber-900">
            <span>Batang Cokelat B ({numerator} dari {denominator} potong)</span>
            <span className="bg-orange-100 text-orange-900 px-2 py-0.5 rounded font-extrabold text-sm">
              {numerator}/{denominator} Cokelat
            </span>
          </div>

          <div className="h-14 w-full bg-amber-100 rounded-lg border-3 border-amber-900 flex overflow-hidden shadow-inner">
            {Array.from({ length: denominator }).map((_, idx) => {
              const isEaten = idx < numerator;
              return (
                <div
                  key={idx}
                  style={{ width: `${100 / denominator}%` }}
                  className={`h-full flex items-center justify-center border-r-2 border-amber-950 text-xs font-bold transition-all duration-300 ${
                    isEaten
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100'
                      : 'bg-amber-200/50 text-amber-700'
                  }`}
                >
                  {isEaten ? '🍫' : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Equality Proof Equation Box */}
      <div className="w-full max-w-md bg-amber-100 rounded-xl p-3 border-2 border-amber-300 mt-2 text-center">
        <div className="text-xs text-amber-800 font-semibold mb-1">
          Formula Perkalian Pecahan Senilai:
        </div>
        <div className="flex items-center justify-center gap-3 text-base sm:text-lg font-extrabold text-amber-950">
          <div className="flex flex-col items-center">
            <span>1</span>
            <span className="w-4 h-0.5 bg-amber-950"></span>
            <span>2</span>
          </div>

          <span className="text-amber-700 text-sm">
            × <span className="underline decoration-wavy decoration-orange-500">{multiplier}</span>
          </span>

          <span>=</span>

          <div className="flex flex-col items-center text-orange-700">
            <span>{numerator}</span>
            <span className="w-5 h-0.5 bg-orange-700"></span>
            <span>{denominator}</span>
          </div>

          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold ml-1">
            ✓ Sama Besar!
          </span>
        </div>
      </div>

      {/* Multiplier buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-amber-900">Ubah Pembagian:</span>
        {[
          { label: 'Bagi 4 (2/4)', m: 2 },
          { label: 'Bagi 6 (3/6)', m: 3 },
          { label: 'Bagi 8 (4/8)', m: 4 },
          { label: 'Bagi 10 (5/10)', m: 5 },
        ].map(item => (
          <button
            key={item.m}
            onClick={() => handleMultiplierChange(item.m)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition ${
              multiplier === item.m
                ? 'bg-amber-800 text-white border-amber-950 shadow'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
