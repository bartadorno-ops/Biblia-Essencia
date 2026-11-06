import React from 'react';
import { Marker, Verse } from '../../lib/bible/types';
import { MessageSquare } from 'lucide-react';

interface VerseRowProps {
  bookId: string;
  chapter: number;
  verse: Verse;
  marker?: Marker;
  isHighlighted?: boolean;
  isActiveAudio?: boolean;
  fontSize: number;
  lineHeight: number;
  isSerif: boolean;
  onSelect: () => void;
}

export const VerseRow: React.FC<VerseRowProps> = ({
  bookId,
  chapter,
  verse,
  marker,
  isHighlighted,
  isActiveAudio,
  fontSize,
  lineHeight,
  isSerif,
  onSelect
}) => {
  const verseId = `v-${bookId.toLowerCase()}-${chapter}-${verse.n}`;

  // Color classes for highlighted verses
  const getMarkerClass = (color?: Marker['color']) => {
    switch (color) {
      case 'gold':
        return 'bg-amber-500/20 border-l-4 border-amber-400 pl-2.5 rounded-r';
      case 'blue':
        return 'bg-sky-500/20 border-l-4 border-sky-400 pl-2.5 rounded-r';
      case 'green':
        return 'bg-emerald-500/20 border-l-4 border-emerald-400 pl-2.5 rounded-r';
      case 'rose':
        return 'bg-rose-500/20 border-l-4 border-rose-400 pl-2.5 rounded-r';
      default:
        return '';
    }
  };

  return (
    <div
      id={verseId}
      data-verse-number={verse.n}
      data-book-id={bookId}
      data-chapter={chapter}
      data-verse-text={verse.text}
      onClick={onSelect}
      className={`group relative py-1.5 px-2 -mx-2 rounded-lg cursor-pointer transition-colors duration-150 select-text ${
        isActiveAudio
          ? 'bg-amber-500/25 ring-2 ring-amber-400/70 shadow-sm'
          : isHighlighted
          ? 'animate-marker-pulse ring-1 ring-amber-400/50 bg-amber-500/15'
          : marker
          ? getMarkerClass(marker.color)
          : 'hover:bg-white/[0.04]'
      }`}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight
      }}
    >
      <span
        className="inline-block mr-2 text-xs font-bold font-ui select-none transition-opacity opacity-60 group-hover:opacity-100 group-hover:text-amber-400"
        style={{
          verticalAlign: 'super',
          color: isActiveAudio ? '#f59e0b' : 'var(--accent-gold)'
        }}
      >
        {verse.n}
      </span>

      <span
        className={`${isSerif ? 'font-bible' : 'font-ui'} text-slate-100 group-hover:text-white leading-relaxed`}
        style={{ color: 'var(--text-primary)' }}
      >
        {verse.text}
      </span>

      {/* Note badge indicator */}
      {marker?.note && (
        <span
          className="inline-flex items-center ml-2 px-1.5 py-0.5 rounded text-[10px] font-ui bg-amber-500/20 text-amber-300 border border-amber-500/30 align-middle"
          title={marker.note}
        >
          <MessageSquare className="w-2.5 h-2.5 mr-0.5" />
          nota
        </span>
      )}
    </div>
  );
};
