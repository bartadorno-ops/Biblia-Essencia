import React from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';

interface AppSplashProps {
  message?: string;
  error?: string | null;
  onRetry?: () => void;
  isCompact?: boolean;
}

export const AppSplash: React.FC<AppSplashProps> = ({
  message = 'Carregando os textos sagrados...',
  error,
  onRetry,
  isCompact = false
}) => {
  const handleClearCacheAndReload = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Unregister service workers
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }
        }
        // Clear caches
        if ('caches' in window) {
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map((key) => caches.delete(key)));
        }
        // Clear session storage
        sessionStorage.clear();
        // Force reload without cache
        window.location.reload();
      }
    } catch (e) {
      window.location.reload();
    }
  };

  if (isCompact) {
    return (
      <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative mb-4">
          <img
            src="/logo.png"
            alt="Bíblia A Essência"
            className="w-16 h-16 rounded-2xl object-contain shadow-lg ring-1 ring-amber-500/30"
          />
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0b1120] text-slate-100 transition-opacity"
      style={{
        backgroundColor: '#0b1120'
      }}
    >
      <div className="max-w-sm w-full flex flex-col items-center text-center">
        {/* App Logo Emblem */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-2 bg-amber-500/20 rounded-3xl blur-xl transition-all" />
          <img
            src="/logo.png"
            alt="Bíblia A Essência"
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-contain shadow-2xl ring-2 ring-amber-500/40"
          />
        </div>

        {/* App Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 font-serif">
          Bíblia A Essência
        </h1>

        {error ? (
          <div className="space-y-4 mt-2">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs sm:text-sm leading-relaxed">
              {error}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Tentar novamente</span>
                </button>
              )}

              <button
                onClick={handleClearCacheAndReload}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <Trash2 className="w-4 h-4 text-slate-400" />
                <span>Limpar cache e recarregar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-1">
            <p className="text-xs sm:text-sm text-amber-200/80 font-medium tracking-wide motion-safe:animate-pulse">
              {message}
            </p>
            <div className="w-24 h-1 bg-amber-500/20 rounded-full mx-auto overflow-hidden">
              <div className="w-1/2 h-full bg-amber-400 rounded-full animate-[shimmer_1.5s_infinite] motion-reduce:w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
