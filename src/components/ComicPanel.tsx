import React from 'react';
import { ComicPanelData } from '../types';
import { InteractivePizza } from './InteractivePizza';
import { InteractiveChocolate } from './InteractiveChocolate';
import { InteractiveBalance } from './InteractiveBalance';
import { InteractiveJuiceCup } from './InteractiveJuiceCup';

interface Props {
  panel: ComicPanelData;
  panelIndex: number;
  totalPanels: number;
}

export const ComicPanel: React.FC<Props> = ({ panel, panelIndex, totalPanels }) => {
  // Character visual avatars
  const renderAvatar = (avatar: ComicPanelData['characterAvatar']) => {
    switch (avatar) {
      case 'kiki':
        return (
          <div className="w-14 h-14 rounded-full bg-pink-100 border-3 border-pink-400 overflow-hidden flex items-center justify-center shadow-sm shrink-0">
            <img
              src="/src/assets/images/avatar_kiki_1791459281884.jpg"
              alt="Kiki Kelinci"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={e => {
                // Fallback to emoji if image cannot be loaded
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '🐰';
                }
              }}
            />
          </div>
        );
      case 'piko':
        return (
          <div className="w-14 h-14 rounded-full bg-indigo-100 border-3 border-indigo-400 flex items-center justify-center text-3xl shadow-sm shrink-0">
            🦉
          </div>
        );
      case 'bimo':
        return (
          <div className="w-14 h-14 rounded-full bg-amber-100 border-3 border-amber-500 flex items-center justify-center text-3xl shadow-sm shrink-0">
            👦
          </div>
        );
      case 'chef':
        return (
          <div className="w-14 h-14 rounded-full bg-red-100 border-3 border-red-500 flex items-center justify-center text-3xl shadow-sm shrink-0">
            🐻‍❄️
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-full bg-orange-100 border-3 border-orange-400 flex items-center justify-center text-3xl shrink-0">
            ⭐
          </div>
        );
    }
  };

  // Render illustration scene or embedded visual
  const renderVisual = () => {
    switch (panel.illustrationType) {
      case 'pizza-slice':
        return (
          <InteractivePizza
            initialDenominator={panel.visualProps?.denominator || 4}
            initialNumerator={panel.visualProps?.numerator || 1}
            interactive={true}
          />
        );
      case 'chocolate-bar':
        return <InteractiveChocolate />;
      case 'balance-scale':
        return <InteractiveBalance />;
      case 'juice-cup':
        return <InteractiveJuiceCup />;
      case 'mixed-bread':
        return (
          <div className="bg-amber-100/70 p-4 rounded-2xl border-3 border-amber-300 flex flex-col items-center">
            <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full mb-2">
              Visual Pecahan Campuran
            </span>
            <div className="flex items-center gap-3 my-2">
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border-2 border-amber-400 shadow-sm">
                <span className="text-3xl">🍞</span>
                <span className="text-3xl">🍞</span>
                <span className="text-xs font-extrabold text-amber-900 ml-1">2 Roti Utuh</span>
              </div>
              <span className="text-2xl font-black text-amber-900">+</span>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border-2 border-amber-400 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-amber-300 border-2 border-amber-800 flex overflow-hidden">
                  <div className="w-1/2 h-full bg-amber-600"></div>
                </div>
                <span className="text-xs font-extrabold text-amber-900 ml-1">1/2 Roti</span>
              </div>
            </div>
            <div className="text-xl font-black text-amber-950 mt-1 bg-amber-300/80 px-4 py-1 rounded-full">
              = 2 ½ Roti
            </div>
          </div>
        );
      case 'comic-scene':
      default:
        if (panel.imageSrc) {
          return (
            <div className="relative w-full rounded-2xl overflow-hidden border-3 border-slate-900 shadow-md group">
              <img
                src={panel.imageSrc}
                alt={`Ilustrasi Komik: ${panel.dialogue}`}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                <span>🎨 Adegan Komik</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-6 text-white text-xs font-semibold">
                <span className="text-amber-300 font-bold">{panel.characterName}: </span>
                {panel.narrative || panel.dialogue}
              </div>
            </div>
          );
        }
        return (
          <div className="w-full bg-gradient-to-b from-amber-100 to-orange-100 rounded-2xl p-4 sm:p-6 border-3 border-amber-300 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
            {/* Background elements */}
            <div className="absolute top-2 right-3 text-4xl opacity-20 select-none">✨</div>
            <div className="absolute bottom-2 left-3 text-4xl opacity-20 select-none">🍕</div>

            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-5xl animate-bounce">
                {panel.characterAvatar === 'kiki' ? '🐰' : panel.characterAvatar === 'piko' ? '🦉' : panel.characterAvatar === 'chef' ? '👨‍🍳' : '🧒'}
              </span>
              <span className="text-3xl">➡️</span>
              <span className="text-5xl">
                {panel.visualProps?.wholeItem === 'pizza' ? '🍕' : '🍰'}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-300 text-xs font-bold text-amber-900 mt-2">
              {panel.characterName} sedang beraksi!
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 comic-panel-lg relative overflow-hidden transition-all hover:border-slate-800">
      {/* Panel Number Badge */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-xs comic-panel-sm">
            Panel #{panelIndex + 1}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            dari {totalPanels} adegan
          </span>
        </div>
        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
          {panel.characterName}
        </span>
      </div>

      {/* Narrative Intro Caption Box */}
      {panel.narrative && (
        <div className="bg-amber-100/90 border-2 border-amber-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-900 mb-4 shadow-2xs">
          📖 <em>{panel.narrative}</em>
        </div>
      )}

      {/* Main Panel Content: Dialogue & Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Character & Speech Bubble (Left or Top) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            {renderAvatar(panel.characterAvatar)}

            {/* Comic Speech Bubble */}
            <div className="relative bg-white rounded-2xl p-4 border-3 border-slate-800 shadow-md flex-1">
              {/* Little speech tail pointing to character */}
              <div className="absolute -left-2.5 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-slate-800 border-b-8 border-b-transparent"></div>
              <div className="absolute -left-1.5 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-white border-b-8 border-b-transparent"></div>

              <div className="text-xs font-bold text-orange-600 mb-0.5 uppercase tracking-wide">
                {panel.characterName}:
              </div>
              <p className="text-slate-800 font-comic text-base sm:text-lg font-bold leading-snug">
                "{panel.dialogue}"
              </p>
            </div>
          </div>

          {/* Educational Pro Tip / Catatan Kunci */}
          {panel.tipBubble && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-2.5 flex items-start gap-2 shadow-2xs">
              <span className="text-base">💡</span>
              <div className="text-xs text-emerald-950 font-bold leading-relaxed">
                <span className="text-emerald-700 font-extrabold uppercase">Tips Pintar: </span>
                {panel.tipBubble}
              </div>
            </div>
          )}
        </div>

        {/* Visual / Simulation on the Right */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full">
            {renderVisual()}
          </div>
        </div>
      </div>
    </div>
  );
};
