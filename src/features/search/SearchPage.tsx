import React, { useState, useMemo } from 'react';
import { BOOKS } from '../../lib/bible/books';
import { STATIC_CORPUS } from '../../lib/bible/corpus';
import { useReading } from '../../app/providers/ReadingProvider';
import { Search, BookOpen, ChevronRight } from 'lucide-react';

interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

interface SearchPageProps {
  onNavigateToVerse: (bookId: string, chapter: number, verse: number) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigateToVerse }) => {
  const [query, setQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const { setReadingLocation, position } = useReading();

  // Search through all static corpus texts and book titles
  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const normalizedQ = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const found: SearchResult[] = [];

    // Search through corpus
    // Search through corpus of active translation
    const corpusForTranslation = STATIC_CORPUS[position.translation] || STATIC_CORPUS.ARC;
    for (const [bookId, chapters] of Object.entries(corpusForTranslation)) {
      const book = BOOKS.find((b) => b.id === bookId);
      if (!book) continue;
      if (selectedTestament !== 'ALL' && book.testament !== selectedTestament) continue;

      for (const [chapNumStr, chapterData] of Object.entries(chapters)) {
        const chapter = parseInt(chapNumStr, 10);
        for (const verse of chapterData.verses) {
          const normalizedVerseText = verse.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          if (
            verse.text.toLowerCase().includes(q) ||
            normalizedVerseText.includes(normalizedQ)
          ) {
            found.push({
              bookId: book.id,
              bookName: book.name,
              chapter,
              verse: verse.n,
              text: verse.text
            });
            if (found.length >= 100) break;
          }
        }
      }
    }

    return found;
  }, [query, selectedTestament, position.translation]);

  const handleSelectResult = (res: SearchResult) => {
    setReadingLocation(res.bookId, res.chapter, res.verse, 'push');
    onNavigateToVerse(res.bookId, res.chapter, res.verse);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Search className="w-6 h-6 text-amber-400" />
          <span>Pesquisa Bíblica</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Encontre versículos, palavras-chave e passagens nas Escrituras Sagradas.
        </p>
      </div>

      {/* Input box */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite um termo (ex: luz, amor, pastor, princípio, vida eterna)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border text-sm sm:text-base bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)'
            }}
            autoFocus
          />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'Toda a Bíblia' },
            { id: 'AT', label: 'Antigo Testamento' },
            { id: 'NT', label: 'Novo Testamento' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTestament(t.id as 'ALL' | 'AT' | 'NT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedTestament === t.id
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}

          {/* Quick suggestions */}
          <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
            Sugestões: &ldquo;princípio&rdquo;, &ldquo;pastor&rdquo;, &ldquo;amor&rdquo;, &ldquo;caminho&rdquo;
          </span>
        </div>
      </div>

      {/* Results List */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          {query.trim().length >= 2
            ? `${results.length} versículo${results.length === 1 ? '' : 's'} encontrado${results.length === 1 ? '' : 's'}`
            : 'Resultados'}
        </div>

        <div className="space-y-3">
          {results.map((res, i) => (
            <div
              key={`${res.bookId}-${res.chapter}-${res.verse}-${i}`}
              onClick={() => handleSelectResult(res)}
              className="p-4 rounded-2xl border bg-black/20 hover:bg-amber-500/10 hover:border-amber-500/30 cursor-pointer transition-all group"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {res.bookName} {res.chapter}:{res.verse}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Abrir</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-sm font-bible text-slate-200 line-clamp-2 leading-relaxed">
                &ldquo;{res.text}&rdquo;
              </p>
            </div>
          ))}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="p-12 text-center text-slate-400 border border-dashed rounded-2xl border-slate-700">
              <p className="text-sm">Nenhum versículo encontrado com o termo &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-slate-500 mt-1">Tente buscar por palavras comuns como &ldquo;Senhor&rdquo;, &ldquo;luz&rdquo;, ou &ldquo;vida&rdquo;.</p>
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
              Digite ao menos 2 letras para pesquisar no texto bíblico.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
