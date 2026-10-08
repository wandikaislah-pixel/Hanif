import React, { useState } from 'react';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';

export const InteractiveBalance: React.FC = () => {
  const { progress, incrementSandboxAction } = useProgress();

  // Fraction 1 (Left)
  const [leftN, setLeftN] = useState<number>(1);
  const [leftD, setLeftD] = useState<number>(3);

  // Fraction 2 (Right)
  const [rightN, setRightN] = useState<number>(1);
  const [rightD, setRightD] = useState<number>(6);

  const leftVal = leftN / leftD;
  const rightVal = rightN / rightD;

  // Calculate tilt angle: if leftVal > rightVal, tilts left (negative deg), if rightVal > leftVal tilts right (positive deg)
  let tiltAngle = 0;
  let relationSign = '=';
  let comparisonText = 'Sama Besar';

  if (Math.abs(leftVal - rightVal) < 0.0001) {
    tiltAngle = 0;
    relationSign = '=';
    comparisonText = 'Sama Besar (=)';
  } else if (leftVal > rightVal) {
    tiltAngle = -12; // left pan goes down
    relationSign = '>';
    comparisonText = 'Lebih Besar (>)';
  } else {
    tiltAngle = 12; // right pan goes down
    relationSign = '<';
    comparisonText = 'Lebih Kecil (<)';
  }

  const handleSelectPreset = (ln: number, ld: number, rn: number, rd: number) => {
    playSound.click(progress.soundEnabled);
    incrementSandboxAction();
    setLeftN(ln);
    setLeftD(ld);
    setRightN(rn);
    setRightD(rd);
  };

  return (
    <div className="flex flex-col items-center bg-sky-50 rounded-2xl p-4 sm:p-5 border-3 border-sky-300">
      <div className="text-center mb-3">
        <span className="inline-block bg-sky-200 text-sky-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-1">
          Eksperimen Perbandingan
        </span>
        <h4 className="font-heading font-bold text-lg text-sky-950">
          Timbangan Ajaib Pecahan ⚖️
        </h4>
        <p className="text-xs text-sky-800">
          Lihat piring mana yang lebih berat dan turun ke bawah!
        </p>
      </div>

      {/* Comparison Statement Display */}
      <div className="flex items-center gap-3 sm:gap-6 bg-white px-5 py-3 rounded-2xl border-2 border-sky-200 shadow-sm my-2">
        {/* Left Fraction */}
        <div className="flex flex-col items-center bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
          <span className="text-2xl font-extrabold text-blue-700">{leftN}</span>
          <span className="w-8 h-1 bg-blue-700 rounded my-0.5"></span>
          <span className="text-2xl font-extrabold text-blue-700">{leftD}</span>
        </div>

        {/* Big Relation Symbol */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-3xl font-black shadow comic-panel-sm">
            {relationSign}
          </div>
          <span className="text-[11px] font-bold text-slate-600 mt-1">{comparisonText}</span>
        </div>

        {/* Right Fraction */}
        <div className="flex flex-col items-center bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
          <span className="text-2xl font-extrabold text-indigo-700">{rightN}</span>
          <span className="w-8 h-1 bg-indigo-700 rounded my-0.5"></span>
          <span className="text-2xl font-extrabold text-indigo-700">{rightD}</span>
        </div>
      </div>

      {/* Physical Scale Graphic */}
      <div className="w-full max-w-sm h-48 relative flex items-center justify-center my-3 select-none">
        {/* Scale Base and Pillar */}
        <div className="absolute bottom-2 w-28 h-6 bg-slate-700 rounded-t-lg border-2 border-slate-900"></div>
        <div className="absolute bottom-7 w-4 h-24 bg-slate-600 rounded-t-sm border-2 border-slate-900"></div>
        <div className="absolute top-14 w-6 h-6 rounded-full bg-amber-400 border-2 border-slate-900 z-20"></div>

        {/* Tilting Beam */}
        <div
          className="absolute top-16 w-64 h-3 bg-amber-600 border-2 border-slate-900 rounded-full transition-transform duration-500 origin-center z-10"
          style={{ transform: `rotate(${tiltAngle}deg)` }}
        >
          {/* Left Pan */}
          <div
            className="absolute -left-2 top-3 flex flex-col items-center transition-all duration-500"
            style={{ transform: `rotate(${-tiltAngle}deg)` }}
          >
            <div className="w-0.5 h-10 bg-slate-400"></div>
            <div className="w-20 h-6 bg-blue-500 border-2 border-slate-900 rounded-b-full shadow flex items-center justify-center text-white text-xs font-bold">
              {leftN}/{leftD}
            </div>
            {/* Visual Pie on Left */}
            <div className="text-base -mt-1">🥧</div>
          </div>

          {/* Right Pan */}
          <div
            className="absolute -right-2 top-3 flex flex-col items-center transition-all duration-500"
            style={{ transform: `rotate(${-tiltAngle}deg)` }}
          >
            <div className="w-0.5 h-10 bg-slate-400"></div>
            <div className="w-20 h-6 bg-indigo-500 border-2 border-slate-900 rounded-b-full shadow flex items-center justify-center text-white text-xs font-bold">
              {rightN}/{rightD}
            </div>
            {/* Visual Pie on Right */}
            <div className="text-base -mt-1">🥧</div>
          </div>
        </div>
      </div>

      {/* Preset comparison buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        <span className="text-xs font-bold text-sky-900">Coba Perbandingan:</span>
        {[
          { label: '1/3 vs 1/6', ln: 1, ld: 3, rn: 1, rd: 6 },
          { label: '1/4 vs 1/2', ln: 1, ld: 4, rn: 1, rd: 2 },
          { label: '3/8 vs 5/8', ln: 3, ld: 8, rn: 5, rd: 8 },
          { label: '2/4 vs 1/2 (Sama)', ln: 2, ld: 4, rn: 1, rd: 2 },
          { label: '4/5 vs 2/5', ln: 4, ld: 5, rn: 2, rd: 5 },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => handleSelectPreset(item.ln, item.ld, item.rn, item.rd)}
            className="px-2.5 py-1 text-xs font-bold bg-white text-sky-900 border-2 border-sky-300 rounded-lg hover:bg-sky-100 transition shadow-xs"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
