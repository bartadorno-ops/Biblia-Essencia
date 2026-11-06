import React from 'react';
import { Translation } from '../lib/bible/types';
import { useReading } from '../app/providers/ReadingProvider';
import { useToast } from '../app/providers/ToastProvider';
import { Check, X, BookA, Info } from 'lucide-react';

interface TranslationSelectorModalProps {
  onClose: () => void;
}

export const TranslationSelectorModal: React.FC<TranslationSelectorModalProps> = ({ onClose }) => {
  const { position, setTranslation } = useReading();
  const { showToast } = useToast();

  const translations: {
    id: Translation;
    name: string;
    description: string;
    licenseNotice?: string;
    isReady: boolean;
  }[] = [
    {
      id: 'ARC',
      name: 'Almeida Revista e Corrigida',
      description: 'Linguagem clássica, solene e tradicional. Versão padrão de leitura devocional.',
      isReady: true
    },
    {
      id: 'NVI',
      name: 'Nova Versão Internacional',
      description: 'Linguagem contemporânea, fluida e com máxima clareza e fidelidade aos manuscritos.',
      isReady: true
    },
    {
      id: 'ARA',
      name: 'Almeida Revista e Atualizada',
      description: 'Tradução equilibrada amplamente adotada em estudos exegéticos.',
      licenseNotice: 'TODO(dono: aguardando confirmação de licença editorial)',
      isReady: true
    },
    {
      id: 'NAA',
      name: 'Nova Almeida Atualizada',
      description: 'Revisão erudita mantendo o estilo de Almeida em português atual.',
      licenseNotice: 'TODO(dono: aguardando confirmação de licença editorial)',
      isReady: true
    }
  ];

  const handleSelect = (t: Translation) => {
    setTranslation(t);
    showToast(`Versão alterada para ${t}. Versículo atual mantido!`, 'success');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl border transition-all animate-in slide-in-from-bottom-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <BookA className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold tracking-tight">Versões da Bíblia</h2>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar seletor de versão"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Translation Options List */}
        <div className="space-y-2.5">
          {translations.map((tr) => {
            const isSelected = position.translation === tr.id;
            return (
              <button
                key={tr.id}
                onClick={() => handleSelect(tr.id)}
                className={`w-full min-h-[52px] p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/80 text-amber-300 ring-1 ring-amber-400/50'
                    : 'bg-black/20 hover:bg-white/5 border-white/5 text-slate-200'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white font-mono">{tr.id}</span>
                    <span className="text-xs text-slate-300 font-medium truncate">{tr.name}</span>
                    {isSelected && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                        Ativa
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {tr.description}
                  </p>
                  {tr.licenseNotice && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-300/80 mt-1.5 font-mono">
                      <Info className="w-3 h-3 shrink-0" />
                      <span>{tr.licenseNotice}</span>
                    </div>
                  )}
                </div>

                <div className="pt-0.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold'
                        : 'border-slate-600 bg-black/20'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-4">
          A versão escolhida permanecerá salva nas suas próximas leituras.
        </p>
      </div>
    </div>
  );
};
