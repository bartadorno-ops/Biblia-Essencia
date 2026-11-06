import { Marker } from '../bible/types';

const MARKERS_KEY = 'biblia_essencia_markers_v2';

export function getMarkers(): Marker[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MARKERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load markers', e);
    return [];
  }
}

export function saveMarker(marker: Marker): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getMarkers();
    const existingIndex = list.findIndex((m) => m.id === marker.id);
    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        ...marker,
        updatedAt: new Date().toISOString()
      };
    } else {
      list.push({
        ...marker,
        createdAt: marker.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    localStorage.setItem(MARKERS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('biblia:markers-updated', { detail: list }));
  } catch (e) {
    console.error('Failed to save marker', e);
  }
}

export function deleteMarker(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getMarkers().filter((m) => m.id !== id);
    localStorage.setItem(MARKERS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('biblia:markers-updated', { detail: list }));
  } catch (e) {
    console.error('Failed to delete marker', e);
  }
}

export function getMarkerForVerse(bookId: string, chapter: number, verse: number): Marker | undefined {
  const id = `${bookId}-${chapter}-${verse}`;
  return getMarkers().find((m) => m.id === id);
}
