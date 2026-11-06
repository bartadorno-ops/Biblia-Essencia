import React, { useEffect, useState, useMemo } from 'react';
import { Chapter, Marker, Translation } from '../../lib/bible/types';
import { loadChapter } from '../../lib/bible/loadChapter';
import { getBookById } from '../../lib/bible/books';
import { VerseRow } from './VerseRow';
import { getMarkers } from '../../lib/storage/markers';
import { AppSplash } from '../../components/AppSplash';

interface ChapterBlockProps {
  bookId: string;
  chapter: number;
  translation: Translation;
  highlightedVerse: number | null;
  activeVerseId: string | null;
  fontSize: number;
  lineHeight: number;
  isSerif: boolean;
  onSelectVerse: (bookId: string, chapter: number, verse: number, text: string, marker?: Marker) => void;
  onLoadedChapter?: (chapterData: Chapter) => void;
}

export const ChapterBlock: React.FC<ChapterBlockProps> = ({
  bookId,
  chapter,
  translation,
  highlightedVerse,
  activeVerseId,
  fontSize,
  lineHeight,
  isSerif,
  onSelectVerse,
  onLoadedChapter
}) => {
  const [data, setData] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Marker[]>(() => getMarkers());

  const book = useMemo(() => getBookById(bookId), [bookId]);

  // Sync markers when marker updates are broadcast
  useEffect(() => {
    const handleUpdate = () => {
      setMarkers(getMarkers());
    };
    window.addEventListener('biblia:markers-updated', handleUpdate);
    return () => window.removeEventListener('biblia:markers-updated', handleUpdate);
  }, []);

  const fetchChapter = () => {
    setLoading(true);
    setError(null);

    loadChapter(bookId, chapter, translation)
      .then((chap) => {
        setData(chap);
        setLoading(false);
        if (onLoadedChapter) {
          onLoadedChapter(chap);
        }
      })
      .catch((err) => {
        setError(err.message || 'Erro ao carregar capítulo');
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    loadChapter(bookId, chapter, translation)
      .then((chap) => {
        if (!isMounted) return;
        setData(chap);
        setLoading(false);
        if (onLoadedChapter) {
          onLoadedChapter(chap);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Não foi possível carregar o capítulo.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [bookId, chapter, translation, onLoadedChapter]);

  // Marker lookup map for fast access
  const markerMap = useMemo(() => {
    const map = new Map<number, Marker>();
    for (const m of markers) {
      if (m.bookId.toLowerCase() === bookId.toLowerCase() && m.chapter === chapter) {
        map.set(m.verse, m);
      }
    }
    return map;
  }, [markers, bookId, chapter]);

  if (loading) {
    return (
      <AppSplash
        isCompact
        message={`Carregando ${book?.name || bookId} capítulo ${chapter}...`}
      />
    );
  }

  if (error || !data) {
    return (
      <div className="py-10 px-4 max-w-xl mx-auto">
        <AppSplash
          error={error || 'Não foi possível carregar o texto sagrado.'}
          onRetry={fetchChapter}
        />
      </div>
    );
  }

  return (
    <article
      data-chapter-block={`${bookId}-${chapter}`}
      className="py-6 sm:py-10 max-w-3xl mx-auto px-4 sm:px-6"
    >
      {/* Chapter Title & Context */}
      <header className="mb-8 pb-4 border-b border-white/5 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 mb-2 border border-amber-500/20">
          <span>{book?.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Capítulo {chapter}</span>
        </div>

        {chapter === 1 && book?.theme && (
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 italic font-serif">
            &ldquo;{book.theme}&rdquo;
          </p>
        )}
      </header>

      {/* Verses Container */}
      <div className="space-y-1">
        {data.verses.map((v) => {
          const marker = markerMap.get(v.n);
          const isHighlighted = highlightedVerse === v.n;
          const isActiveAudio = activeVerseId === `v-${bookId.toLowerCase()}-${chapter}-${v.n}`;

          return (
            <VerseRow
              key={v.n}
              bookId={bookId}
              chapter={chapter}
              verse={v}
              marker={marker}
              isHighlighted={isHighlighted}
              isActiveAudio={isActiveAudio}
              fontSize={fontSize}
              lineHeight={lineHeight}
              isSerif={isSerif}
              onSelect={() =>
                onSelectVerse(bookId, chapter, v.n, v.text, marker)
              }
            />
          );
        })}
      </div>

      {/* Chapter End Marker (Rule 4.7: Fim de {book?.name} {chapter} · {translation} after last verse) */}
      <div className="mt-8 pt-4 text-center border-t border-white/5 text-xs text-slate-400 font-medium select-none">
        Fim de {book?.name} {chapter} &middot; {translation}
      </div>
    </article>
  );
};
