import { useEffect, useRef } from 'react';

/**
 * Observes which verse in the container is closest to the top below the measured header
 * and reports it to the reading provider.
 */
export function useVerseObserver(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onTopVerseChange: (verse: number, bookId: string, chapter: number) => void
) {
  const lastReportedRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const checkTopVisible = () => {
      const container = containerRef.current;
      if (!container) return;

      // Get current header height from CSS variable or measure
      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '60',
        10
      );

      const targetY = headerH + 30; // 30px below header line
      const verseElements = container.querySelectorAll<HTMLElement>('[data-verse-number]');

      let closestVerseEl: HTMLElement | null = null;
      let minDistance = Infinity;

      for (let i = 0; i < verseElements.length; i++) {
        const el = verseElements[i];
        const rect = el.getBoundingClientRect();
        // We look for the verse whose top is closest to targetY or just passed it
        const distance = Math.abs(rect.top - targetY);
        if (rect.bottom > headerH && distance < minDistance) {
          minDistance = distance;
          closestVerseEl = el;
        }
      }

      if (closestVerseEl) {
        const verseStr = closestVerseEl.getAttribute('data-verse-number');
        const bookId = closestVerseEl.getAttribute('data-book-id');
        const chapterStr = closestVerseEl.getAttribute('data-chapter');

        if (verseStr && bookId && chapterStr) {
          const v = parseInt(verseStr, 10);
          const c = parseInt(chapterStr, 10);
          const key = `${bookId}:${c}:${v}`;

          if (key !== lastReportedRef.current && !isNaN(v) && !isNaN(c)) {
            lastReportedRef.current = key;
            onTopVerseChange(v, bookId, c);
          }
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkTopVisible);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    const timer = setTimeout(checkTopVisible, 250);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [containerRef, onTopVerseChange]);
}
