import React, { useState } from 'react';
import { Marker } from '../../lib/bible/types';
import { saveMarker, deleteMarker } from '../../lib/storage/markers';
import { useToast } from '../../app/providers/ToastProvider';
import { Copy, Volume2, Bookmark, Trash2, X, Check, Share2 } from 'lucide-react';

interface VerseMenuProps {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  existingMarker?: Marker;
  onClose: () => void;
  onPlayFromHere?: () => void;
}

export const VerseMenu: React.FC<VerseMenuProps> = ({
  bookId,
  bookName,
  chapter,
  verse,
  text,
  existingMarker,
  onClose,
  onPlayFromHere
}) => {
  const { showToast } = useToast();
  const [selectedColor, setSelectedColor] = useState<Marker['color']>(
    existingMarker?.color || 'gold'
  );
  const [note, setNote] = useState(existingMarker?.note || '');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const reference = `${bookName} ${chapter}:${verse}`;

  const handleCopy = () => {
    const fullText = `"${text}" (${reference} - ARC)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      showToast('Versículo copiado!', 'success');
    }
    onClose();
  };

  const handleShare = () => {
    const fullText = `"${text}" (${reference} - Bíblia A Essência)`;
    if (navigator.share) {
      navigator.share({
        title: reference,
        text: fullText,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleColorSelect = (color: Marker['color']) => {
    setSelectedColor(color);
    const markerId = `${bookId}-${chapter}-${verse}`;
    saveMarker({
      id: markerId,
      bookId,
      chapter,
      verse,
      color,
      note: note.trim() || undefined,
      createdAt: existingMarker?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    showToast(`Destacado em ${color === 'gold' ? 'dourado' : color === 'blue' ? 'azul' : color === 'green' ? 'verde' : 'rosa'}`, 'success');
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const handleSaveNote = () => {
    const markerId = `${bookId}-${chapter}-${verse}`;
    saveMarker({
      id: markerId,
      bookId,
      chapter,
      verse,
      color: selectedColor,
      note: note.trim() || undefined,
      createdAt: existingMarker?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    showToast('Anotação salva com sucesso', 'success');
    setIsEditingNote(false);
  };

  const handleRemoveMarker = () => {
    if (existingMarker) {
      deleteMarker(existingMarker.id);
      showToast('Marcador removido', 'info');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl border transition-all animate-in slide-in-from-bottom-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-base tracking-tight">{reference}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            aria-label="Fechar menu de versículo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verse preview */}
        <p className="mt-3 text-sm italic font-bible line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
          &ldquo;{text}&rdquo;
        </p>

        {/* Color Highlights */}
        <div className="mt-5">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-2">
            Marcar com cor
          </label>
          <div className="flex items-center gap-3">
            {[
              { id: 'gold', label: 'Dourado', bg: 'bg-amber-400', ring: 'ring-amber-400' },
              { id: 'blue', label: 'Azul', bg: 'bg-sky-400', ring: 'ring-sky-400' },
              { id: 'green', label: 'Verde', bg: 'bg-emerald-400', ring: 'ring-emerald-400' },
              { id: 'rose', label: 'Rosa', bg: 'bg-rose-400', ring: 'ring-rose-400' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => handleColorSelect(c.id as Marker['color'])}
                className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center transition-all ${
                  selectedColor === c.id && existingMarker ? `ring-4 ${c.ring} ring-offset-2 ring-offset-slate-900 scale-110` : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                aria-label={`Destacar versículo em ${c.label}`}
              >
                {selectedColor === c.id && existingMarker && (
                  <Check className="w-4 h-4 text-slate-900 stroke-[3]" />
                )}
              </button>
            ))}

            {existingMarker && (
              <button
                onClick={handleRemoveMarker}
                className="ml-auto text-xs flex items-center gap-1 text-rose-400 hover:text-rose-300 py-1.5 px-2 rounded-lg hover:bg-rose-950/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remover
              </button>
            )}
          </div>
        </div>

        {/* Note editor / view */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          {isEditingNote ? (
            <div className="space-y-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escreva sua reflexão, estudo ou anotação para este versículo..."
                rows={3}
                className="w-full text-sm p-3 rounded-xl border bg-black/20 focus:outline-none focus:ring-1 focus:ring-amber-400"
                style={{
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)'
                }}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingNote(false)}
                  className="px-3 py-1.5 rounded-lg text-xs hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Salvar anotação
                </button>
              </div>
            </div>
          ) : (
            <div>
              {existingMarker?.note ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
                    <span>Sua Anotação:</span>
                    <button
                      onClick={() => setIsEditingNote(true)}
                      className="text-amber-400 underline hover:text-amber-300"
                    >
                      Editar
                    </button>
                  </div>
                  <p className="text-xs text-slate-200">{existingMarker.note}</p>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-700 text-xs text-slate-400 hover:text-amber-300 hover:border-amber-500/50 flex items-center justify-center gap-1.5 mb-3 transition-colors"
                >
                  <span>+ Adicionar anotação de estudo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {onPlayFromHere && (
            <button
              onClick={() => {
                onPlayFromHere();
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium border hover:bg-white/5 transition-colors"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Copy className="w-4 h-4" />
            <span>Copiar</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium border hover:bg-white/5 transition-colors"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
