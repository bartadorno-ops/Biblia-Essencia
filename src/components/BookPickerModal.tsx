import React, { useState, useMemo } from 'react';
import { BOOKS, BOOK_GROUPS } from '../lib/bible/books';
import { Book, Testament } from '../lib/bible/types';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';

interface BookPickerModalProps {
  currentBookId: string;
  currentChapter: number;
  onSelect: (bookId: string, chapter: number) => void;
  onClose: () => void;
}

export const BookPickerModal: React.FC<BookPickerModalProps> = ({
  currentBookId,
  currentChapter,
  onSelect,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<Testament | 'ALL'>('ALL');
  const [activeBook, setActiveBook] = useState<Book | null>(() => {
    return BOOKS.find((b) => b.id === currentBookId.toLowerCase()) || BOOKS[0];
  });

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BOOKS.filter((b) => {
      const matchesTestament = selectedTestament === 'ALL' || b.testament === selectedTestament;
      if (!matchesTestament) return false;
      if (!q) return true;
      const normalizedName = b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const normalizedQ = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return (
        b.name.toLowerCase().includes(q) ||
        normalizedName.includes(normalizedQ) ||
        b.abbrev.toLowerCase().includes(q) ||
        b.group.toLowerCase().includes(q)
      );
    });
  }, [search, selectedTestament]);

  const chaptersArray = useMemo(() => {
    if (!activeBook) return [];
    return Array.from({ length: activeBook.chapters }, (_, i) => i + 1);
  }, [activeBook]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl flex flex-col rounded-none sm:rounded-2xl shadow-2xl border transition-all overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold tracking-tight">Livros da Bíblia</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            aria-label="Fechar seletor de livros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter bar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar livro por nome, abreviação ou grupo..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border bg-black/20 focus:outline-none focus:ring-1 focus:ring-amber-400"
              style={{
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Testament filters */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
            {[
              { id: 'ALL', label: 'Todos (66)' },
              { id: 'AT', label: 'Antigo (39)' },
              { id: 'NT', label: 'Novo (27)' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTestament(t.id as Testament | 'ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTestament === t.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content columns: Book List + Chapter Selector */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
          {/* Books List column */}
          <div className="w-full sm:w-1/2 overflow-y-auto p-2 border-r divide-y divide-white/5" style={{ borderColor: 'var(--border-subtle)' }}>
            {filteredBooks.map((book) => {
              const isSelected = activeBook?.id === book.id;
              return (
                <button
                  key={book.id}
                  onClick={() => setActiveBook(book)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 text-[11px] font-mono font-medium text-slate-500 text-right">
                      {book.order}
                    </span>
                    <div className="truncate">
                      <div className="text-sm truncate">{book.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="font-mono text-amber-400/80">{book.abbrev}</span>
                        <span>&middot;</span>
                        <span>{book.group}</span>
                        <span>&middot;</span>
                        <span>{book.chapters} caps</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              );
            })}

            {filteredBooks.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-400">
                Nenhum livro encontrado para &ldquo;{search}&rdquo;.
              </div>
            )}
          </div>

          {/* Chapters Grid column */}
          <div className="w-full sm:w-1/2 overflow-y-auto p-4 flex flex-col">
            {activeBook ? (
              <>
                <div className="pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-amber-400">{activeBook.name}</h3>
                    <span className="text-xs text-slate-400">{activeBook.chapters} capítulos</span>
                  </div>
                  {activeBook.theme && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 italic">
                      {activeBook.theme}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {chaptersArray.map((ch) => {
                    const isCurrent = activeBook.id === currentBookId.toLowerCase() && ch === currentChapter;
                    return (
                      <button
                        key={ch}
                        onClick={() => {
                          onSelect(activeBook.id, ch);
                          onClose();
                        }}
                        className={`h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 font-bold shadow-md'
                            : 'bg-black/20 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Selecione um livro à esquerda
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
