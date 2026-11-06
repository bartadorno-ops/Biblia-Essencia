import React, { useEffect, useRef } from 'react';
import { useReading } from '../app/providers/ReadingProvider';
import { useTheme } from '../app/providers/ThemeProvider';
import {
  Volume2,
  VolumeX,
  Type,
  Sun,
  Moon,
  Coffee,
  ChevronDown
} from 'lucide-react';

export type ActiveTab = 'reader' | 'search' | 'bookmarks' | 'plan' | 'harpa' | 'study' | 'offline';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenBookPicker: () => void;
  onOpenTranslationSelector: () => void;
  onOpenFontSettings: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenBookPicker,
  onOpenTranslationSelector,
  onOpenFontSettings,
  isAudioPlaying,
  onToggleAudio
}) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const { currentBook, position } = useReading();
  const { theme, setTheme } = useTheme();

  // Rule 4: "A altura do cabeçalho é medida, não adivinhada. Ela vira --header-h no document.documentElement."
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-h', `${height}px`);
      }
    };

    updateHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('sepia');
    else if (theme === 'sepia') setTheme('light');
    else setTheme('dark');
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'rgba(16, 26, 46, 0.92)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo + Book Picker + Translation Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            onClick={() => onTabChange('reader')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            title="Bíblia A Essência - Início"
          >
            {/* Logo image with exact square object-contain (Rule 3.6) */}
            <img
              src="/logo.png"
              alt="Logo Bíblia A Essência"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain shadow-md ring-1 ring-amber-500/30 group-hover:scale-105 transition-transform"
            />
            <div className="hidden xl:block">
              <span className="text-sm font-bold tracking-tight text-white font-serif">
                Bíblia A Essência
              </span>
            </div>
          </div>

          {/* Book & Chapter Selector Button (min 44px touch target) */}
          <button
            onClick={onOpenBookPicker}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl border bg-black/20 hover:bg-black/40 text-amber-300 hover:text-amber-200 border-amber-500/30 transition-all font-medium text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            aria-label="Selecionar livro e capítulo da Bíblia"
          >
            <span className="font-semibold">{currentBook.name}</span>
            <span className="text-white font-bold">{position.chapter}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Translation Selector: ARC ▾ / NVI ▾ (Requirement 1.3) */}
          <button
            onClick={onOpenTranslationSelector}
            className="min-h-[44px] min-w-[50px] flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40 font-mono font-bold text-xs tracking-wider transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            aria-label="Escolher versão da Bíblia"
            title="Escolher versão da Bíblia"
          >
            <span>{position.translation}</span>
            <ChevronDown className="w-3 h-3 opacity-90" />
          </button>
        </div>

        {/* Center: Desktop Navigation Tabs (Hidden on mobile/tablet per Rule 4.1) */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {[
            { id: 'reader', label: 'Leitura' },
            { id: 'search', label: 'Busca' },
            { id: 'bookmarks', label: 'Marcadores' },
            { id: 'plan', label: 'Plano 365' },
            { id: 'harpa', label: 'Harpa Cristã' },
            { id: 'study', label: 'Estudo Bíblico' },
            { id: 'offline', label: 'Offline' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as ActiveTab)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right: Audio Narration Toggle, Typography Settings, Theme Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio narration button (min 44px) */}
          <button
            onClick={onToggleAudio}
            className={`min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              isAudioPlaying
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
            }`}
            aria-label={isAudioPlaying ? 'Pausar áudio da Bíblia' : 'Ouvir capítulo em áudio'}
            title={isAudioPlaying ? 'Pausar áudio' : 'Ouvir capítulo em áudio'}
          >
            {isAudioPlaying ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-950" />
                <span className="hidden sm:inline">Pausar</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Ouvir</span>
              </>
            )}
          </button>

          {/* Typography adjust button (min 44px) */}
          <button
            onClick={onOpenFontSettings}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            aria-label="Ajustar tamanho da fonte e tipografia"
            title="Ajustar tipografia e temas"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Theme switcher button (min 44px) */}
          <button
            onClick={cycleTheme}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            aria-label={`Mudar tema de cores (atual: ${theme})`}
            title={`Tema atual: ${theme}`}
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-amber-300" />}
            {theme === 'sepia' && <Coffee className="w-4 h-4 text-amber-600" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};
