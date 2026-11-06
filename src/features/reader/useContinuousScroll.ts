import { useEffect, useRef, useState, useCallback } from 'react';
import { BOOKS, getBookById } from '../../lib/bible/books';

export interface ChapterKey {
  bookId: string;
  chapter: number;
}

export function getNextChapter(bookId: string, chapter: number): ChapterKey | null {
  const book = getBookById(bookId);
  if (!book) return null;

  if (chapter < book.chapters) {
    return { bookId: book.id, chapter: chapter + 1 };
  }

  // Cross book boundary to next book in canonical order
  const nextBook = BOOKS.find((b) => b.order === book.order + 1);
  if (nextBook) {
    return { bookId: nextBook.id, chapter: 1 };
  }

  return null; // End of Revelation
}

export function getPrevChapter(bookId: string, chapter: number): ChapterKey | null {
  const book = getBookById(bookId);
  if (!book) return null;

  if (chapter > 1) {
    return { bookId: book.id, chapter: chapter - 1 };
  }

  // Cross book boundary to previous book
  const prevBook = BOOKS.find((b) => b.order === book.order - 1);
  if (prevBook) {
    return { bookId: prevBook.id, chapter: prevBook.chapters };
  }

  return null; // Beginning of Genesis
}

export function useContinuousScroll(opts: {
  bookId: string;
  chapter: number;
  maxChapters?: number;
}) {
  const { bookId, chapter, maxChapters = 3 } = opts;

  const [loaded, setLoaded] = useState<ChapterKey[]>([
    { bookId: bookId.toLowerCase(), chapter }
  ]);
  const [visibleChapter, setVisibleChapter] = useState<number>(chapter);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  // Reset when primary target bookId or chapter changes explicitly from outside
  useEffect(() => {
    setLoaded([{ bookId: bookId.toLowerCase(), chapter }]);
    setVisibleChapter(chapter);
  }, [bookId, chapter]);

  // Load next chapter (bottom sentinel reached)
  const loadNext = useCallback(() => {
    if (isLoadingRef.current) return;
    setLoaded((curr) => {
      const last = curr[curr.length - 1];
      if (!last) return curr;
      const next = getNextChapter(last.bookId, last.chapter);
      if (!next) return curr; // reached Revelation 22

      isLoadingRef.current = true;
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 400);

      const nextList = [...curr, next];
      if (nextList.length > maxChapters) {
        return nextList.slice(nextList.length - maxChapters);
      }
      return nextList;
    });
  }, [maxChapters]);

  // Load previous chapter (top sentinel reached)
  const loadPrev = useCallback(() => {
    if (isLoadingRef.current) return;
    setLoaded((curr) => {
      const first = curr[0];
      if (!first) return curr;
      const prev = getPrevChapter(first.bookId, first.chapter);
      if (!prev) return curr; // reached Genesis 1

      const prevScrollHeight = document.documentElement.scrollHeight;
      const prevScrollTop = window.scrollY;

      isLoadingRef.current = true;
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 400);

      // Preserve scroll position when prepending to the top
      requestAnimationFrame(() => {
        const newScrollHeight = document.documentElement.scrollHeight;
        const diff = newScrollHeight - prevScrollHeight;
        if (diff > 0) {
          window.scrollTo({
            top: prevScrollTop + diff,
            behavior: 'instant' as ScrollBehavior
          });
        }
      });

      const nextList = [prev, ...curr];
      if (nextList.length > maxChapters) {
        return nextList.slice(0, maxChapters);
      }
      return nextList;
    });
  }, [maxChapters]);

  // Observers for top and bottom sentinels
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    const topEl = topRef.current;
    const bottomEl = bottomRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (entry.target === bottomEl) {
              loadNext();
            } else if (entry.target === topEl) {
              loadPrev();
            }
          }
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.1 }
    );

    if (topEl) observer.observe(topEl);
    if (bottomEl) observer.observe(bottomEl);

    return () => {
      observer.disconnect();
    };
  }, [loadNext, loadPrev]);

  return {
    loaded,
    topRef,
    bottomRef,
    visibleChapter,
    setVisibleChapter
  };
}
