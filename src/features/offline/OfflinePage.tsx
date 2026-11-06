import React, { useState, useEffect } from 'react';
import { BOOKS } from '../../lib/bible/books';
import { countCachedChapters, clearCachedChapters, setCachedChapter } from '../../lib/storage/db';
import { loadChapter } from '../../lib/bible/loadChapter';
import { useReading } from '../../app/providers/ReadingProvider';
import { useToast } from '../../app/providers/ToastProvider';
import { Wifi, WifiOff, Download, Check, Trash2, Database, HardDrive } from 'lucide-react';

export const OfflinePage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  const [cachedCount, setCachedCount] = useState<number>(0);
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const { position } = useReading();
  const { showToast } = useToast();

  const updateCount = async () => {
    const c = await countCachedChapters();
    setCachedCount(c);
  };

  useEffect(() => {
    updateCount();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDownloadBook = async (bookId: string, totalChapters: number) => {
    if (downloadingBookId) return;

    setDownloadingBookId(bookId);
    setDownloadProgress(0);

    try {
      for (let ch = 1; ch <= totalChapters; ch++) {
        const chapterData = await loadChapter(bookId, ch, position.translation);
        await setCachedChapter(chapterData);
        setDownloadProgress(Math.round((ch / totalChapters) * 100));
        // Small tick to allow UI update
        await new Promise((r) => setTimeout(r, 20));
      }

      await updateCount();
      showToast(`Livro baixado com sucesso para leitura offline!`, 'success');
    } catch (e) {
      showToast('Erro ao baixar alguns capítulos', 'error');
    } finally {
      setDownloadingBookId(null);
      setDownloadProgress(0);
    }
  };

  const handleClearCache = async () => {
    await clearCachedChapters();
    await updateCount();
    showToast('Cache offline limpo com sucesso', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-400" />
            <span>Gerenciador Offline e Armazenamento</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Baixe livros inteiros da Bíblia para ler sem precisar de conexão com a internet.
          </p>
        </div>

        {/* Network status pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto border ${
            isOnline
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>Conectado à Internet</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-amber-400" />
              <span>Modo Offline Ativo</span>
            </>
          )}
        </div>
      </div>

      {/* Storage Overview Card */}
      <div className="p-5 rounded-2xl border bg-black/20 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Capítulos em Memória Offline (IndexedDB)
            </div>
            <div className="text-2xl font-bold text-white mt-0.5">
              {cachedCount} capítulos salvos
            </div>
          </div>
        </div>

        {cachedCount > 0 && (
          <button
            onClick={handleClearCache}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar Cache</span>
          </button>
        )}
      </div>

      {/* Book Download List */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Livros Disponíveis para Download
        </div>

        <div className="space-y-2">
          {BOOKS.map((book) => {
            const isDownloading = downloadingBookId === book.id;

            return (
              <div
                key={book.id}
                className="p-3.5 sm:p-4 rounded-2xl border bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 text-xs font-mono font-medium text-slate-500 text-right">
                    {book.order}
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      <span>{book.name}</span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded bg-white/5 text-amber-300 font-mono">
                        {book.abbrev}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {book.chapters} capítulos &middot; {book.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
                    </div>
                  </div>
                </div>

                {/* Progress bar if actively downloading */}
                {isDownloading ? (
                  <div className="w-full sm:w-48 flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-150"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-amber-300">{downloadProgress}%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDownloadBook(book.id, book.chapters)}
                    disabled={!!downloadingBookId}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 transition-colors disabled:opacity-40 self-end sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar ({book.chapters} caps)</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
