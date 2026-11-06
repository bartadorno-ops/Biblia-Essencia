import React, { useState, useEffect, useMemo } from 'react';
import { Marker } from '../../lib/bible/types';
import { getMarkers, deleteMarker } from '../../lib/storage/markers';
import { getBookById } from '../../lib/bible/books';
import { useReading } from '../../app/providers/ReadingProvider';
import { useToast } from '../../app/providers/ToastProvider';
import { Bookmark, MessageSquare, Trash2, ChevronRight, Filter } from 'lucide-react';

interface BookmarksPageProps {
  onNavigateToVerse: (bookId: string, chapter: number, verse: number) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({ onNavigateToVerse }) => {
  const [markers, setMarkers] = useState<Marker[]>(() => getMarkers());
  const [filterColor, setFilterColor] = useState<string>('ALL');
  const [filterOnlyNotes, setFilterOnlyNotes] = useState(false);
  const { setReadingLocation } = useReading();
  const { showToast } = useToast();

  useEffect(() => {
    const handleUpdate = () => {
      setMarkers(getMarkers());
    };
    window.addEventListener('biblia:markers-updated', handleUpdate);
    return () => window.removeEventListener('biblia:markers-updated', handleUpdate);
  }, []);

  const filteredMarkers = useMemo(() => {
    return markers.filter((m) => {
      if (filterColor !== 'ALL' && m.color !== filterColor) return false;
      if (filterOnlyNotes && (!m.note || m.note.trim() === '')) return false;
      return true;
    });
  }, [markers, filterColor, filterOnlyNotes]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMarker(id);
    showToast('Marcador excluído', 'info');
  };

  const handleOpenMarker = (m: Marker) => {
    setReadingLocation(m.bookId, m.chapter, m.verse, 'push');
    onNavigateToVerse(m.bookId, m.chapter, m.verse);
  };

  const getColorDot = (color: Marker['color']) => {
    switch (color) {
      case 'gold': return 'bg-amber-400';
      case 'blue': return 'bg-sky-400';
      case 'green': return 'bg-emerald-400';
      case 'rose': return 'bg-rose-400';
      default: return 'bg-amber-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-400" />
            <span>Marcadores e Notas</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seus versículos destacados e anotações pessoais de estudo devocional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
            {markers.length} {markers.length === 1 ? 'marcador' : 'marcadores'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-2 rounded-2xl bg-black/20 border" style={{ borderColor: 'var(--border-subtle)' }}>
        <Filter className="w-4 h-4 text-slate-500 ml-2 mr-1" />
        {[
          { id: 'ALL', label: 'Todos' },
          { id: 'gold', label: 'Dourado', dot: 'bg-amber-400' },
          { id: 'blue', label: 'Azul', dot: 'bg-sky-400' },
          { id: 'green', label: 'Verde', dot: 'bg-emerald-400' },
          { id: 'rose', label: 'Rosa', dot: 'bg-rose-400' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterColor(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterColor === f.id
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f.dot && <span className={`w-2 h-2 rounded-full ${f.dot}`} />}
            <span>{f.label}</span>
          </button>
        ))}

        <button
          onClick={() => setFilterOnlyNotes((prev) => !prev)}
          className={`ml-auto px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            filterOnlyNotes
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Apenas com Notas</span>
        </button>
      </div>

      {/* Markers List */}
      <div className="space-y-3">
        {filteredMarkers.map((m) => {
          const book = getBookById(m.bookId);
          const bookName = book?.name || m.bookId;
          const dateStr = new Date(m.createdAt).toLocaleDateString('pt-BR');

          return (
            <div
              key={m.id}
              onClick={() => handleOpenMarker(m)}
              className="p-4 sm:p-5 rounded-2xl border bg-black/20 hover:bg-amber-500/10 hover:border-amber-500/30 cursor-pointer transition-all group"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getColorDot(m.color)}`} />
                  <span className="font-bold text-sm text-white">
                    {bookName} {m.chapter}:{m.verse}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {dateStr}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(e, m.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Excluir marcador"
                    aria-label="Excluir marcador"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>

              {m.note && (
                <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Nota pessoal:</span>
                  </div>
                  <p className="line-clamp-3">{m.note}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredMarkers.length === 0 && (
          <div className="p-12 text-center text-slate-400 border border-dashed rounded-2xl border-slate-700">
            <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm">Nenhum marcador encontrado com os filtros atuais.</p>
            <p className="text-xs text-slate-500 mt-1">
              Na tela de leitura, clique sobre qualquer versículo para marcá-lo com cores ou escrever anotações.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
