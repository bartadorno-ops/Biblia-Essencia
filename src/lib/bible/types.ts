export type Translation = 'ARC' | 'ARA' | 'NVI' | 'NAA';
export type Testament = 'AT' | 'NT';

export interface Book {
  id: string;          // 'gn', 'jo', 'ap'
  name: string;        // 'Gênesis'
  abbrev: string;      // 'Gn'
  testament: Testament;
  order: number;       // 1..66
  chapters: number;    // 50
  group: string;       // 'Pentateuco', 'Evangelhos', 'Históricos', etc.
  theme?: string;      // 'Origem de todas as coisas'
  author?: string;
  period?: string;
  summary?: string;
}

export interface Verse {
  n: number;           // 16
  text: string;
}

export interface Chapter {
  bookId: string;
  chapter: number;
  translation: Translation;
  verses: Verse[];
}

export interface Marker {
  id: string;                  // `${bookId}-${chapter}-${verse}`
  bookId: string;
  chapter: number;
  verse: number;
  color: 'gold' | 'blue' | 'green' | 'rose';
  note?: string;
  createdAt: string;           // ISO
  updatedAt: string;
}

export interface ReadingPosition {
  bookId: string;
  chapter: number;
  verse: number;
  translation: Translation;
  updatedAt: string;
}

export interface StudyWord {
  word: string;
  original: string;
  language: 'Hebraico' | 'Aramaico' | 'Grego';
  meaning: string;
  occurrence: string;
}

export interface BibleMap {
  id: string;
  title: string;
  period: string;
  description: string;
  places: string[];
}

export interface Hymn {
  number: number;
  title: string;
  author?: string;
  stanzas: string[];
  chorus?: string;
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  readings: { bookId: string; chapter: number; label: string }[];
  completed?: boolean;
}
