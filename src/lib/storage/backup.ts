import { getPosition, savePosition } from './position';
import { getMarkers } from './markers';
import { Marker, ReadingPosition } from '../bible/types';

export interface BackupPayload {
  version: number;
  exportedAt: string;
  position: ReadingPosition;
  markers: Marker[];
  fontSettings?: Record<string, unknown>;
  readingPlanCompleted?: number[];
}

export function exportAllDataJson(): void {
  if (typeof window === 'undefined') return;

  const position = getPosition();
  const markers = getMarkers();

  let fontSettings: Record<string, unknown> = {};
  try {
    const raw = localStorage.getItem('biblia_essencia_font_v2');
    if (raw) fontSettings = JSON.parse(raw);
  } catch (e) {}

  let readingPlanCompleted: number[] = [];
  try {
    const raw = localStorage.getItem('biblia_essencia_plan_completed');
    if (raw) readingPlanCompleted = JSON.parse(raw);
  } catch (e) {}

  const payload: BackupPayload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    position,
    markers,
    fontSettings,
    readingPlanCompleted
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `biblia-a-essencia-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importDataJson(jsonString: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Formato de JSON inválido' };
    }

    if (data.position && data.position.bookId && data.position.chapter) {
      savePosition(data.position);
    }

    if (Array.isArray(data.markers)) {
      localStorage.setItem('biblia_essencia_markers_v2', JSON.stringify(data.markers));
    }

    if (data.fontSettings && typeof data.fontSettings === 'object') {
      localStorage.setItem('biblia_essencia_font_v2', JSON.stringify(data.fontSettings));
    }

    if (Array.isArray(data.readingPlanCompleted)) {
      localStorage.setItem('biblia_essencia_plan_completed', JSON.stringify(data.readingPlanCompleted));
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: 'Falha ao analisar arquivo JSON' };
  }
}
