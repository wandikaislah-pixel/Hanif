import React, { useState } from 'react';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';

interface Props {
  initialDenominator?: number;
  initialNumerator?: number;
  interactive?: boolean;
}

export const InteractivePizza: React.FC<Props> = ({
  initialDenominator = 4,
  initialNumerator = 1,
  interactive = true,
}) => {
  const { progress, incrementSandboxAction } = useProgress();
  const [slices, setSlices] = useState<number>(initialDenominator);
  const [selectedSlices, setSelectedSlices] = useState<number[]>(
    Array.from({ length: initialNumerator }, (_, i) => i)
  );

  const handleSliceClick = (index: number) => {
    if (!interactive) return;
    playSound.slice(progress.soundEnabled);
    incrementSandboxAction();

    setSelectedSlices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleDenominatorChange = (newSlices: number) => {
    playSound.click(progress.soundEnabled);
    incrementSandboxAction();
    setSlices(newSlices);
    // keep selected slices within range
    setSelectedSlices([0]);
  };

  const numSelected = selectedSlices.length;
  const radius = 105;
  const center = 130;

  // Generate SVG path for slice
  const getSlicePath = (index: number, total: number) => {
    const anglePerSlice = (2 * Math.PI) / total;
    const startAngle = index * anglePerSlice - Math.PI / 2;
    const endAngle = (index + 1) * anglePerSlice - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center bg-amber-50/80 rounded-2xl p-4 sm:p-5 border-3 border-amber-300">
      <div className="text-center mb-3">
        <span className="inline-block bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-1">
          Simulasi Interaktif
        </span>
        <h4 className="font-heading font-bold text-lg text-amber-950">
          Dapur Potong Pizza Kiki 🍕
        </h4>
        <p className="text-xs text-amber-800">
          {interactive ? 'Klik / sentuh tiap potongan pizza untuk mengambilnya!' : 'Representasi visual pecahan pizza'}
        </p>
      </div>

      {/* Pizza Svg Visualizer */}
      <div className="relative w-64 h-64 my-2 flex items-center justify-center">
        {/* Crust Shadow Plate */}
        <div className="absolute w-60 h-60 rounded-full bg-amber-200/60 shadow-inner flex items-center justify-center border-4 border-dashed border-amber-400">
          <span className="text-xs font-bold text-amber-600/70 select-none">Piring Pizza</span>
        </div>

        <svg className="w-64 h-64 drop-shadow-md" viewBox="0 0 260 260">
          <defs>
            <radialGradient id="cheeseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
            <radialGradient id="eatenSliceGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </radialGradient>
          </defs>

          {/* Pizza Slices */}
          {Array.from({ length: slices }).map((_, i) => {
            const isTaken = selectedSlices.includes(i);
            const pathData = getSlicePath(i, slices);
            return (
              <g
                key={i}
                className="cursor-pointer transition-all duration-200 hover:opacity-90"
                onClick={() => handleSliceClick(i)}
              >
                <path
                  d={pathData}
                  fill={isTaken ? '#FF5722' : 'url(#cheeseGrad)'}
                  stroke="#78350F"
                  strokeWidth="3.5"
                  className={isTaken ? 'transition-all filter brightness-105' : 'transition-all'}
                />
                
                {/* Pepperoni dots if slice is NOT taken */}
                {!isTaken && (
                  <circle
                    cx={center + (radius * 0.55) * Math.cos((i + 0.5) * (2 * Math.PI / slices) - Math.PI / 2)}
                    cy={center + (radius * 0.55) * Math.sin((i + 0.5) * (2 * Math.PI / slices) - Math.PI / 2)}
                    r={slices > 6 ? 6 : 9}
                    fill="#B91C1C"
                    stroke="#7F1D1D"
                    strokeWidth="1.5"
                  />
                )}

                {/* Slices indicator number badge */}
                <text
                  x={center + (radius * 0.8) * Math.cos((i + 0.5) * (2 * Math.PI / slices) - Math.PI / 2)}
                  y={center + (radius * 0.8) * Math.sin((i + 0.5) * (2 * Math.PI / slices) - Math.PI / 2) + 4}
                  textAnchor="middle"
                  fill={isTaken ? '#FFFFFF' : '#78350F'}
                  fontSize={slices > 6 ? '11' : '13'}
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Center Crust Dot */}
          <circle cx={center} cy={center} r="7" fill="#78350F" />
        </svg>
      </div>

      {/* Real-time Fraction Display Badge */}
      <div className="w-full bg-white rounded-xl p-3 border-2 border-amber-300 shadow-sm flex items-center justify-around my-2">
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Potongan Diambil</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-3.5 h-3.5 rounded-full bg-orange-600 inline-block"></span>
            <div className="inline-flex flex-col items-center leading-none">
              <span className="text-xl font-extrabold text-orange-600">{numSelected}</span>
              <span className="w-7 h-0.5 bg-orange-600 my-0.5"></span>
              <span className="text-xl font-extrabold text-orange-600">{slices}</span>
            </div>
            <span className="text-xs font-bold text-slate-600">
              ({numSelected}/{slices} bagian)
            </span>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-200"></div>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Sisa di Piring</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block border border-amber-600"></span>
            <div className="inline-flex flex-col items-center leading-none">
              <span className="text-xl font-extrabold text-amber-700">{slices - numSelected}</span>
              <span className="w-7 h-0.5 bg-amber-700 my-0.5"></span>
              <span className="text-xl font-extrabold text-amber-700">{slices}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slice Controller Buttons */}
      {interactive && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 w-full">
          <span className="text-xs font-bold text-amber-900 mr-1">Potong jadi:</span>
          {[2, 3, 4, 6, 8].map(count => (
            <button
              key={count}
              onClick={() => handleDenominatorChange(count)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border-2 transition ${
                slices === count
                  ? 'bg-orange-500 text-white border-orange-700 shadow-sm'
                  : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              {count} Potong
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
