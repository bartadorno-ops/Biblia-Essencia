import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useReading } from '../../app/providers/ReadingProvider';
import { useTheme } from '../../app/providers/ThemeProvider';
import { useContinuousScroll } from './useContinuousScroll';
import { useVerseObserver } from './useVerseObserver';
import { ChapterBlock } from './ChapterBlock';
import { VerseMenu } from './VerseMenu';
import { Marker, Chapter } from '../../lib/bible/types';
import { AudioVerseItem } from './useVerseAudio';
import { getBookById } from '../../lib/bible/books';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReaderPageProps {
  activeVerseId: string | null;
  onVersesLoadedForAudio: (verses: AudioVerseItem[]) => void;
  onPlayFromVerse: (startIndex: number) => void;
}

export const ReaderPage: React.FC<ReaderPageProps> = ({
  activeVerseId,
  onVersesLoadedForAudio,
  onPlayFromVerse
}) => {
  const {
    position,
    recordTopVisibleVerse,
    highlightedVerse,
    setHighlightedVerse,
    setReadingLocation
  } = useReading();
  const { fontSettings } = useTheme();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Continuous scroll manager (max 3 chapters in DOM)
  const {
    loaded,
    topRef,
    bottomRef,
    setVisibleChapter
  } = useContinuousScroll({
    bookId: position.bookId,
    chapter: position.chapter,
    maxChapters: 3
  });

  // Selected verse for action menu
  const [selectedVerse, setSelectedVerse] = useState<{
    bookId: string;
    chapter: number;
    verse: number;
    text: string;
    marker?: Marker;
  } | null>(null);

  // Store loaded chapter texts to supply to audio reader
  const chaptersDataRef = useRef<Map<string, Chapter>>(new Map());

  const handleChapterData = useCallback((data: Chapter) => {
    const key = `${data.bookId.toLowerCase()}-${data.chapter}`;
    chaptersDataRef.current.set(key, data);

    // If this is the current active chapter, supply its verses to the audio engine
    if (data.bookId.toLowerCase() === position.bookId.toLowerCase() && data.chapter === position.chapter) {
      const audioItems: AudioVerseItem[] = data.verses.map((v) => ({
        id: `v-${data.bookId.toLowerCase()}-${data.chapter}-${v.n}`,
        text: v.text
      }));
      onVersesLoadedForAudio(audioItems);
    }
  }, [position.bookId, position.chapter, onVersesLoadedForAudio]);

  // Observer for top visible verse
  useVerseObserver(containerRef, useCallback((verseNum, bookId, chapNum) => {
    setVisibleChapter(chapNum);
    recordTopVisibleVerse(verseNum);
  }, [recordTopVisibleVerse, setVisibleChapter]));

  // Auto-scroll to highlighted verse on first load (e.g. from /joao/3#v16)
  useEffect(() => {
    if (highlightedVerse) {
      const verseElId = `v-${position.bookId.toLowerCase()}-${position.chapter}-${highlightedVerse}`;
      const timer = setTimeout(() => {
        const el = document.getElementById(verseElId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [highlightedVerse, position.bookId, position.chapter]);

  // Manual Previous/Next Chapter buttons
  const book = getBookById(position.bookId);

  const goToPrevChapter = () => {
    if (position.chapter > 1) {
      setReadingLocation(position.bookId, position.chapter - 1, 1, 'push');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextChapter = () => {
    if (book && position.chapter < book.chapters) {
      setReadingLocation(position.bookId, position.chapter + 1, 1, 'push');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-[calc(100vh-var(--header-h,60px))] pb-28 pt-2"
    >
      {/* Top Sentinel for loading previous chapter */}
      <div
        ref={topRef}
        className="h-10 -mt-10 pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Render loaded chapters in continuous scroll */}
      {loaded.map((item) => (
        <ChapterBlock
          key={`${item.bookId}-${item.chapter}`}
          bookId={item.bookId}
          chapter={item.chapter}
          translation={position.translation}
          highlightedVerse={
            item.bookId.toLowerCase() === position.bookId.toLowerCase() &&
            item.chapter === position.chapter
              ? highlightedVerse
              : null
          }
          activeVerseId={activeVerseId}
          fontSize={fontSettings.size}
          lineHeight={fontSettings.lineHeight}
          isSerif={fontSettings.isSerif}
          onSelectVerse={(bId, ch, vNum, txt, mark) => {
            setSelectedVerse({
              bookId: bId,
              chapter: ch,
              verse: vNum,
              text: txt,
              marker: mark
            });
          }}
          onLoadedChapter={handleChapterData}
        />
      ))}

      {/* Bottom Sentinel for loading next chapter */}
      <div
        ref={bottomRef}
        className="h-20 pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Floating navigation pill between chapters */}
      <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-30 flex items-center gap-1 p-1 rounded-2xl bg-slate-900/95 border border-slate-700/70 shadow-2xl backdrop-blur-md">
        <button
          onClick={goToPrevChapter}
          disabled={position.chapter <= 1}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          aria-label="Ir para o capítulo anterior"
          title="Capítulo anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold px-2 text-amber-300 font-mono select-none">
          {position.chapter}/{book?.chapters || 1}
        </span>

        <button
          onClick={goToNextChapter}
          disabled={!book || position.chapter >= book.chapters}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          aria-label="Ir para o próximo capítulo"
          title="Próximo capítulo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Verse Action Menu */}
      {selectedVerse && (
        <VerseMenu
          bookId={selectedVerse.bookId}
          bookName={getBookById(selectedVerse.bookId)?.name || selectedVerse.bookId}
          chapter={selectedVerse.chapter}
          verse={selectedVerse.verse}
          text={selectedVerse.text}
          existingMarker={selectedVerse.marker}
          onClose={() => setSelectedVerse(null)}
          onPlayFromHere={() => {
            onPlayFromVerse(selectedVerse.verse - 1);
          }}
        />
      )}
    </main>
  );
};
