import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ToastProvider } from './app/providers/ToastProvider';
import { ReadingProvider, useReading } from './app/providers/ReadingProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppSplash } from './components/AppSplash';
import { Header, ActiveTab } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BookPickerModal } from './components/BookPickerModal';
import { TranslationSelectorModal } from './components/TranslationSelectorModal';
import { FontSettingsModal } from './components/FontSettingsModal';
import { ReaderPage } from './features/reader/ReaderPage';
import { SearchPage } from './features/search/SearchPage';
import { BookmarksPage } from './features/bookmarks/BookmarksPage';
import { PlanPage } from './features/plan/PlanPage';
import { HarpaPage } from './features/harpa/HarpaPage';
import { StudyPage } from './features/study/StudyPage';
import { OfflinePage } from './features/offline/OfflinePage';
import { useVerseAudio, AudioVerseItem } from './features/reader/useVerseAudio';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('reader');
  const [isBookPickerOpen, setIsBookPickerOpen] = useState(false);
  const [isTranslationSelectorOpen, setIsTranslationSelectorOpen] = useState(false);
  const [isFontSettingsOpen, setIsFontSettingsOpen] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const { position, setReadingLocation } = useReading();

  // Show official app splash on initial mount before unveiling reading view
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Verses available for audio reader in active chapter
  const versesForAudioRef = useRef<AudioVerseItem[]>([]);

  const handleVersesLoadedForAudio = useCallback((verses: AudioVerseItem[]) => {
    versesForAudioRef.current = verses;
  }, []);

  const { isPlaying, activeVerseId, play, stop } = useVerseAudio({
    getVerses: () => versesForAudioRef.current,
    onChapterComplete: () => {
      // Advance to next chapter automatically when audio finishes
    }
  });

  const handleToggleAudio = () => {
    if (isPlaying) {
      stop();
    } else {
      play(0);
    }
  };

  const handlePlayFromVerse = (startIndex: number) => {
    play(startIndex);
  };

  const handleNavigateToVerse = (bookId: string, chapter: number, verse: number) => {
    setReadingLocation(bookId, chapter, verse, 'push');
    setActiveTab('reader');
  };

  // Rule 7: "Nenhum botão de desenvolvedor visível. Simulador, diagnóstico e depurador só com ?dev=1."
  const isDevMode = typeof window !== 'undefined' && window.location.search.includes('dev=1');

  if (!isAppReady) {
    return <AppSplash message="Carregando os textos sagrados..." />;
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-amber-500/20 selection:text-amber-300">
      {/* Measured Header (sets --header-h) */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenBookPicker={() => setIsBookPickerOpen(true)}
        onOpenTranslationSelector={() => setIsTranslationSelectorOpen(true)}
        onOpenFontSettings={() => setIsFontSettingsOpen(true)}
        isAudioPlaying={isPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main View Area */}
      <div className="flex-1 w-full">
        {activeTab === 'reader' && (
          <ReaderPage
            activeVerseId={activeVerseId}
            onVersesLoadedForAudio={handleVersesLoadedForAudio}
            onPlayFromVerse={handlePlayFromVerse}
          />
        )}

        {activeTab === 'search' && (
          <SearchPage onNavigateToVerse={handleNavigateToVerse} />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksPage onNavigateToVerse={handleNavigateToVerse} />
        )}

        {activeTab === 'plan' && (
          <PlanPage onNavigateToVerse={handleNavigateToVerse} />
        )}

        {activeTab === 'harpa' && <HarpaPage />}

        {activeTab === 'study' && <StudyPage />}

        {activeTab === 'offline' && <OfflinePage />}
      </div>

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Book & Chapter Picker Modal */}
      {isBookPickerOpen && (
        <BookPickerModal
          currentBookId={position.bookId}
          currentChapter={position.chapter}
          onSelect={(bId, ch) => {
            setReadingLocation(bId, ch, 1, 'push');
            setActiveTab('reader');
          }}
          onClose={() => setIsBookPickerOpen(false)}
        />
      )}

      {/* Translation Selector Modal */}
      {isTranslationSelectorOpen && (
        <TranslationSelectorModal
          onClose={() => setIsTranslationSelectorOpen(false)}
        />
      )}

      {/* Appearance & Font Settings Modal */}
      {isFontSettingsOpen && (
        <FontSettingsModal onClose={() => setIsFontSettingsOpen(false)} />
      )}

      {/* Dev panel: only visible when ?dev=1 */}
      {isDevMode && (
        <div className="fixed bottom-2 left-2 z-50 p-2 rounded bg-black/90 text-[10px] text-amber-400 font-mono border border-amber-500/40">
          DEV: {position.bookId} {position.chapter}:{position.verse} ({position.translation})
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <ReadingProvider>
            <MainLayout />
          </ReadingProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
