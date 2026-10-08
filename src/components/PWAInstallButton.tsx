import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition comic-btn border border-slate-900"
      >
        <Download className="w-3.5 h-3.5" />
        Pasang Aplikasi Offline
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition border border-slate-900"
        >
          <Smartphone className="w-3.5 h-3.5" />
          Pasang di iPad / iPhone
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-3 border-slate-900">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Pasang di Layar Utama (iOS)
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-2.5 font-medium">
                <p>
                  1. Ketuk tombol <strong>Bagikan (Share)</strong> <span className="text-blue-600 font-bold">⎋</span> di bilah navigasi Safari.
                </p>
                <p>
                  2. Geser ke bawah lalu ketuk <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> ➕.
                </p>
                <p>
                  3. Sekarang kamu bisa membaca e-komik ini kapan saja tanpa internet!
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback install / offline info button for standard desktop browsers
  return null;
};
