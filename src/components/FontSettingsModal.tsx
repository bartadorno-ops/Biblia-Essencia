import React, { useRef } from 'react';
import { useTheme, AppTheme } from '../app/providers/ThemeProvider';
import { useReading } from '../app/providers/ReadingProvider';
import { useToast } from '../app/providers/ToastProvider';
import { Translation } from '../lib/bible/types';
import { exportAllDataJson, importDataJson } from '../lib/storage/backup';
import {
  X,
  Type,
  Sun,
  Moon,
  Coffee,
  Download,
  Upload,
  Check
} from 'lucide-react';

interface FontSettingsModalProps {
  onClose: () => void;
}

export const FontSettingsModal: React.FC<FontSettingsModalProps> = ({ onClose }) => {
  const { theme, setTheme, fontSettings, updateFontSettings } = useTheme();
  const { position, setTranslation } = useReading();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    exportAllDataJson();
    showToast('Backup exportado com sucesso!', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = importDataJson(text);
      if (res.success) {
        showToast('Backup restaurado com sucesso!', 'success');
        onClose();
        window.location.reload();
      } else {
        showToast(res.error || 'Arquivo de backup inválido', 'error');
      }
    } catch (err) {
      showToast('Erro ao ler arquivo de backup', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl border transition-all animate-in slide-in-from-bottom-4 max-h-[90vh] overflow-y-auto"
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
            <Type className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Aparência e Leitura</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
            aria-label="Fechar configurações"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme selection */}
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Tema de Cor
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Noturno', icon: Moon, desc: 'Azul Real' },
              { id: 'sepia', label: 'Sépia', icon: Coffee, desc: 'Papiro' },
              { id: 'light', label: 'Claro', icon: Sun, desc: 'Editorial' }
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as AppTheme)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-semibold'
                      : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Family */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Tipografia
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateFontSettings({ isSerif: true })}
              className={`p-3 rounded-xl border font-serif text-sm transition-all ${
                fontSettings.isSerif
                  ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-semibold'
                  : 'border-white/5 bg-black/20 text-slate-400'
              }`}
            >
              Lora (Serifada)
            </button>
            <button
              onClick={() => updateFontSettings({ isSerif: false })}
              className={`p-3 rounded-xl border font-sans text-sm transition-all ${
                !fontSettings.isSerif
                  ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-semibold'
                  : 'border-white/5 bg-black/20 text-slate-400'
              }`}
            >
              Plus Jakarta (Sem Serifa)
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="uppercase tracking-wider">Tamanho da Fonte</span>
            <span className="text-amber-400">{fontSettings.size}px</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateFontSettings({ size: Math.max(14, fontSettings.size - 1) })}
              className="w-10 h-10 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center font-bold text-base hover:bg-white/10"
              aria-label="Diminuir fonte"
            >
              A-
            </button>
            <input
              type="range"
              min={14}
              max={28}
              value={fontSettings.size}
              onChange={(e) => updateFontSettings({ size: parseInt(e.target.value, 10) })}
              className="flex-1 accent-amber-500 cursor-pointer"
            />
            <button
              onClick={() => updateFontSettings({ size: Math.min(28, fontSettings.size + 1) })}
              className="w-10 h-10 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center font-bold text-base hover:bg-white/10"
              aria-label="Aumentar fonte"
            >
              A+
            </button>
          </div>
        </div>

        {/* Line Height */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Espaçamento entre Linhas
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 1.5, label: 'Compacto' },
              { val: 1.85, label: 'Normal' },
              { val: 2.2, label: 'Amplo' }
            ].map((lh) => (
              <button
                key={lh.val}
                onClick={() => updateFontSettings({ lineHeight: lh.val })}
                className={`py-2 rounded-xl text-xs border transition-all ${
                  Math.abs(fontSettings.lineHeight - lh.val) < 0.05
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-semibold'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lh.label}
              </button>
            ))}
          </div>
        </div>

        {/* Translation Selection */}
        <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Versão Bíblica
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ARC', name: 'Almeida Corrigida', status: 'Ativa (Domínio Público)' },
              { id: 'ARA', name: 'Almeida Atualizada', status: 'Prévia de Estudo' },
              { id: 'NVI', name: 'Nova Versão Internacional', status: 'Em licenciamento' },
              { id: 'NAA', name: 'Nova Almeida Atualizada', status: 'Em licenciamento' }
            ].map((tr) => (
              <button
                key={tr.id}
                onClick={() => setTranslation(tr.id as Translation)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  position.translation === tr.id
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                    : 'border-white/5 bg-black/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{tr.id}</span>
                  {position.translation === tr.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-[11px] font-medium truncate mt-0.5">{tr.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{tr.status}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Backup and Data Export/Import */}
        <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Backup de Marcadores e Notas
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 py-2 px-3 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Exportar JSON</span>
            </button>
            <button
              onClick={handleImportClick}
              className="flex-1 py-2 px-3 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-sky-400" />
              <span>Importar JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
