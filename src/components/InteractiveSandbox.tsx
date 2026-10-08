import React, { useState } from 'react';
import { InteractivePizza } from './InteractivePizza';
import { InteractiveChocolate } from './InteractiveChocolate';
import { InteractiveBalance } from './InteractiveBalance';
import { InteractiveJuiceCup } from './InteractiveJuiceCup';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';
import { FlaskConical, PieChart, Sparkles, Scale, Milk } from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const { progress } = useProgress();
  const [activeTab, setActiveTab] = useState<'pizza' | 'chocolate' | 'balance' | 'juice'>('pizza');

  const handleTabChange = (tab: 'pizza' | 'chocolate' | 'balance' | 'juice') => {
    playSound.click(progress.soundEnabled);
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl p-6 text-white comic-panel-lg mb-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
              <FlaskConical className="w-4 h-4 text-yellow-300" />
              Laboratorium Sains Pecahan
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-wide">
              Eksperimen Pecahan Bebas 🔬
            </h2>
            <p className="text-sky-100 text-sm mt-1 max-w-lg">
              Sentuh, potong, timbang, dan tuang sesukamu! Matematika lebih mudah dipahami saat kamu mencobanya langsung!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center min-w-[130px]">
            <div className="text-2xl font-black text-yellow-300">{progress.sandboxExploredCount}</div>
            <div className="text-[11px] font-semibold text-white/90">Aksi Eksperimen</div>
            {progress.sandboxExploredCount >= 5 && (
              <span className="inline-block mt-1 text-[10px] bg-yellow-400 text-yellow-950 font-bold px-2 py-0.5 rounded-full">
                ⭐ Lencana Diperoleh!
              </span>
            )}
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Lab Nav Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={() => handleTabChange('pizza')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition comic-panel-sm ${
            activeTab === 'pizza'
              ? 'bg-orange-500 text-white border-orange-700 shadow-md'
              : 'bg-white text-slate-700 hover:bg-orange-50 border-slate-300'
          }`}
        >
          <PieChart className="w-4 h-4" />
          Potong Pizza
        </button>

        <button
          onClick={() => handleTabChange('chocolate')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition comic-panel-sm ${
            activeTab === 'chocolate'
              ? 'bg-amber-800 text-white border-amber-950 shadow-md'
              : 'bg-white text-slate-700 hover:bg-amber-50 border-slate-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Cokelat Senilai
        </button>

        <button
          onClick={() => handleTabChange('balance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition comic-panel-sm ${
            activeTab === 'balance'
              ? 'bg-blue-600 text-white border-blue-800 shadow-md'
              : 'bg-white text-slate-700 hover:bg-blue-50 border-slate-300'
          }`}
        >
          <Scale className="w-4 h-4" />
          Timbangan Pecahan
        </button>

        <button
          onClick={() => handleTabChange('juice')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition comic-panel-sm ${
            activeTab === 'juice'
              ? 'bg-emerald-600 text-white border-emerald-800 shadow-md'
              : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-300'
          }`}
        >
          <Milk className="w-4 h-4" />
          Gelas Takar Jus
        </button>
      </div>

      {/* Lab Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 comic-panel-lg shadow-xl">
        {activeTab === 'pizza' && <InteractivePizza initialDenominator={4} initialNumerator={1} interactive={true} />}
        {activeTab === 'chocolate' && <InteractiveChocolate />}
        {activeTab === 'balance' && <InteractiveBalance />}
        {activeTab === 'juice' && <InteractiveJuiceCup />}
      </div>
    </div>
  );
};
