import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Book, ReadingPosition, Translation } from '../../lib/bible/types';
import { getBookById } from '../../lib/bible/books';
import { getPosition, savePosition } from '../../lib/storage/position';
import { parseBibleUrl, syncBrowserUrl } from '../../lib/bible/bibleUrl';

interface ReadingContextValue {
  position: ReadingPosition;
  currentBook: Book;
  setReadingLocation: (bookId: string, chapter: number, verse?: number | null, mode?: 'push' | 'replace') => void;
  recordTopVisibleVerse: (verse: number) => void;
  setTranslation: (t: Translation) => void;
  highlightedVerse: number | null;
  setHighlightedVerse: (v: number | null) => void;
}

const ReadingContext = createContext<ReadingContextValue | null>(null);

export const useReading = (): ReadingContextValue => {
  const ctx = useContext(ReadingContext);
  if (!ctx) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return ctx;
};

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial position: check URL first, then saved storage
  const [position, setPosition] = useState<ReadingPosition>(() => {
    const saved = getPosition();
    if (typeof window !== 'undefined') {
      const parsedUrl = parseBibleUrl(window.location.pathname, window.location.hash);
      if (parsedUrl) {
        return {
          bookId: parsedUrl.bookId,
          chapter: parsedUrl.chapter,
          verse: parsedUrl.verse || 1,
          translation: saved.translation || 'ARC',
          updatedAt: new Date().toISOString()
        };
      }
    }
    return saved;
  });

  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const parsedUrl = parseBibleUrl(window.location.pathname, window.location.hash);
      if (parsedUrl && parsedUrl.verse) {
        return parsedUrl.verse;
      }
    }
    return position.verse > 1 ? position.verse : null;
  });

  const currentBook = getBookById(position.bookId) || getBookById('gn')!;

  // Debounce timer for saving position when scrolling changes visible verse
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set reading location (e.g. from book picker, chapter button, or URL)
  const setReadingLocation = useCallback((
    bookId: string,
    chapter: number,
    verse: number | null = 1,
    mode: 'push' | 'replace' = 'replace'
  ) => {
    const validBook = getBookById(bookId) || currentBook;
    const safeChapter = Math.max(1, Math.min(chapter, validBook.chapters));
    const safeVerse = verse ? Math.max(1, verse) : 1;

    const newPos: ReadingPosition = {
      bookId: validBook.id,
      chapter: safeChapter,
      verse: safeVerse,
      translation: position.translation,
      updatedAt: new Date().toISOString()
    };

    setPosition(newPos);
    savePosition(newPos);
    if (verse && verse > 0) {
      setHighlightedVerse(verse);
    }
    syncBrowserUrl(validBook.id, safeChapter, verse, mode);
  }, [currentBook, position.translation]);

  // Record top visible verse as user scrolls, with 500ms debounce
  const recordTopVisibleVerse = useCallback((verse: number) => {
    if (verse <= 0 || verse === position.verse) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setPosition((prev) => {
        if (prev.verse === verse) return prev;
        const updated: ReadingPosition = {
          ...prev,
          verse,
          updatedAt: new Date().toISOString()
        };
        savePosition(updated);
        syncBrowserUrl(updated.bookId, updated.chapter, verse, 'replace');
        return updated;
      });
    }, 500);
  }, [position.verse]);

  // Change translation
  const setTranslation = useCallback((newTranslation: Translation) => {
    setPosition((prev) => {
      const updated: ReadingPosition = {
        ...prev,
        translation: newTranslation,
        updatedAt: new Date().toISOString()
      };
      savePosition(updated);
      return updated;
    });
  }, []);

  // Sync with browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseBibleUrl(window.location.pathname, window.location.hash);
      if (parsed) {
        setPosition((prev) => ({
          ...prev,
          bookId: parsed.bookId,
          chapter: parsed.chapter,
          verse: parsed.verse || 1,
          updatedAt: new Date().toISOString()
        }));
        if (parsed.verse) {
          setHighlightedVerse(parsed.verse);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <ReadingContext.Provider
      value={{
        position,
        currentBook,
        setReadingLocation,
        recordTopVisibleVerse,
        setTranslation,
        highlightedVerse,
        setHighlightedVerse
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};
