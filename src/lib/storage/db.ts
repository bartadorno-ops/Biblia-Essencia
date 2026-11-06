import { Chapter } from '../bible/types';

const DB_NAME = 'biblia_essencia_db';
const DB_VERSION = 1;
const STORE_CHAPTERS = 'chapters';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_CHAPTERS)) {
        // Key format: `${translation}:${bookId}:${chapter}`
        db.createObjectStore(STORE_CHAPTERS, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });
}

export async function getCachedChapter(
  translation: string,
  bookId: string,
  chapter: number
): Promise<Chapter | null> {
  try {
    const db = await openDb();
    const key = `${translation}:${bookId.toLowerCase()}:${chapter}`;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.get(key);

      req.onsuccess = () => {
        if (req.result && req.result.data) {
          resolve(req.result.data as Chapter);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

export async function setCachedChapter(
  chapter: Chapter
): Promise<void> {
  try {
    const db = await openDb();
    const key = `${chapter.translation}:${chapter.bookId.toLowerCase()}:${chapter.chapter}`;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.put({ key, data: chapter, cachedAt: Date.now() });

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    // Non-critical if caching fails
  }
}

export async function clearCachedChapters(): Promise<void> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readwrite');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    // ignore
  }
}

export async function countCachedChapters(): Promise<number> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_CHAPTERS, 'readonly');
      const store = tx.objectStore(STORE_CHAPTERS);
      const req = store.count();
      req.onsuccess = () => resolve(req.result || 0);
      req.onerror = () => resolve(0);
    });
  } catch (e) {
    return 0;
  }
}
