import { ReadingPosition } from '../bible/types';

const POSITION_KEY = 'biblia_essencia_reading_position_v2';

export const DEFAULT_POSITION: ReadingPosition = {
  bookId: 'gn',
  chapter: 1,
  verse: 1,
  translation: 'ARC',
  updatedAt: new Date().toISOString()
};

/**
 * Retrieves the saved reading position from localStorage with fallback to default.
 */
export function getPosition(): ReadingPosition {
  if (typeof window === 'undefined') {
    return DEFAULT_POSITION;
  }

  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return DEFAULT_POSITION;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.bookId === 'string' && typeof parsed.chapter === 'number') {
      return {
        bookId: parsed.bookId,
        chapter: parsed.chapter,
        verse: parsed.verse || 1,
        translation: parsed.translation || 'ARC',
        updatedAt: parsed.updatedAt || new Date().toISOString()
      };
    }
  } catch (e) {
    console.warn('Failed to parse reading position, resetting to default', e);
  }

  return DEFAULT_POSITION;
}

/**
 * Saves reading position to localStorage. Single source of truth.
 */
export function savePosition(p: ReadingPosition): void {
  if (typeof window === 'undefined') return;
  try {
    const sanitized: ReadingPosition = {
      bookId: p.bookId,
      chapter: Math.max(1, p.chapter),
      verse: Math.max(1, p.verse || 1),
      translation: p.translation || 'ARC',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(POSITION_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.error('Failed to save reading position', e);
  }
}

/**
 * Patches partial fields of current position and saves it.
 */
export function patchPosition(part: Partial<ReadingPosition>): ReadingPosition {
  const current = getPosition();
  const updated: ReadingPosition = {
    ...current,
    ...part,
    updatedAt: new Date().toISOString()
  };
  savePosition(updated);
  return updated;
}
