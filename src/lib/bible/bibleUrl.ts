import { findBook, getBookById } from './books';

export interface ParsedBibleUrl {
  bookId: string;
  chapter: number;
  verse: number | null;
}

/**
 * Parses pathname and hash into bookId, chapter and verse.
 * Example: '/joao/3#v16' -> { bookId: 'jo', chapter: 3, verse: 16 }
 * Example: '/sl/23' -> { bookId: 'sl', chapter: 23, verse: null }
 */
export function parseBibleUrl(pathname: string, hash: string): ParsedBibleUrl | null {
  if (!pathname || pathname === '/' || pathname === '') {
    return null;
  }

  // Remove leading/trailing slashes
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (segments.length === 0 || !segments[0]) {
    return null;
  }

  // Check if first segment is a book (could be name, abbrev, or id)
  const bookCandidate = segments[0];
  const book = findBook(bookCandidate) || getBookById(bookCandidate);
  if (!book) {
    return null;
  }

  let chapter = 1;
  if (segments.length >= 2) {
    const parsedChap = parseInt(segments[1], 10);
    if (!isNaN(parsedChap) && parsedChap >= 1) {
      chapter = Math.min(parsedChap, book.chapters);
    }
  }

  let verse: number | null = null;
  if (hash) {
    const match = hash.match(/#?v?(\d+)/i);
    if (match && match[1]) {
      const parsedVerse = parseInt(match[1], 10);
      if (!isNaN(parsedVerse) && parsedVerse >= 1) {
        verse = parsedVerse;
      }
    }
  }

  return {
    bookId: book.id,
    chapter,
    verse
  };
}

/**
 * Syncs the browser URL without triggering a page reload.
 */
export function syncBrowserUrl(
  bookId: string,
  chapter: number,
  verse: number | null,
  mode: 'push' | 'replace' = 'replace'
): void {
  if (typeof window === 'undefined' || typeof window.history === 'undefined') {
    return;
  }

  const book = getBookById(bookId);
  const bookSlug = book ? book.id : bookId;
  const hash = verse ? `#v${verse}` : '';
  const newPath = `/${bookSlug}/${chapter}${hash}`;

  const currentPathWithHash = window.location.pathname + window.location.hash;
  if (currentPathWithHash === newPath) {
    return;
  }

  try {
    if (mode === 'push') {
      window.history.pushState({ bookId, chapter, verse }, '', newPath);
    } else {
      window.history.replaceState({ bookId, chapter, verse }, '', newPath);
    }
  } catch (e) {
    // Graceful fallback if iframe sandbox limits pushState
  }
}
