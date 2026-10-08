import React from 'react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, isOffline } = useOfflineStatus();

  return (
    <>
      {isOffline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl comic-panel-sm border-2 border-slate-900 animate-bounce">
          <WifiOff className="w-4 h-4 text-yellow-200" />
          <span>Mode Offline Aktif — E-Komik & Kuis siap diakses tanpa kuota! 🚀</span>
        </div>
      )}
    </>
  );
};
