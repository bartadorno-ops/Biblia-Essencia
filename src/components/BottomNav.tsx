import React, { useState } from 'react';
import { ActiveTab } from './Header';
import {
  BookOpen,
  Search,
  Bookmark,
  CalendarCheck2,
  Menu,
  Music,
  GraduationCap,
  WifiOff,
  X,
  ChevronRight
} from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navItems = [
    { id: 'reader', label: 'Leitura', icon: BookOpen },
    { id: 'search', label: 'Busca', icon: Search },
    { id: 'bookmarks', label: 'Marcadores', icon: Bookmark },
    { id: 'plan', label: 'Plano 365', icon: CalendarCheck2 }
  ] as const;

  const moreItems = [
    {
      id: 'harpa',
      label: 'Harpa Cristã',
      desc: 'Hinos e cânticos com letra completa',
      icon: Music,
      color: 'text-amber-400'
    },
    {
      id: 'study',
      label: 'Estudo Bíblico',
      desc: 'Dicionário de palavras originais, mapas e teologia',
      icon: GraduationCap,
      color: 'text-sky-400'
    },
    {
      id: 'offline',
      label: 'Modo Offline',
      desc: 'Gerenciar livros baixados e armazenamento',
      icon: WifiOff,
      color: 'text-emerald-400'
    }
  ] as const;

  const handleSelectTab = (tab: ActiveTab) => {
    onTabChange(tab);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar (Hidden on lg+ screens) */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg px-2 pb-safe"
        style={{
          backgroundColor: 'rgba(16, 26, 46, 0.94)',
          borderColor: 'var(--border-subtle)'
        }}
        aria-label="Navegação móvel"
      >
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isMoreOpen;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={`Aba ${item.label}`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-amber-500/15' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] mt-0.5">{item.label}</span>
              </button>
            );
          })}

          {/* "Mais" Menu Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              isMoreOpen || (activeTab !== 'reader' && activeTab !== 'search' && activeTab !== 'bookmarks' && activeTab !== 'plan')
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Abrir menu de recursos adicionais"
          >
            <div className={`p-1.5 rounded-xl ${isMoreOpen ? 'bg-amber-500/15' : ''}`}>
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5">Mais</span>
          </button>
        </div>
      </nav>

      {/* "Mais" Bottom Sheet Drawer */}
      {isMoreOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="w-full rounded-t-3xl p-5 shadow-2xl border-t transition-all animate-in slide-in-from-bottom"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b mb-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-bold text-base">Mais Recursos</h3>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 pb-6">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id as ActiveTab)}
                    className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all text-left border ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/30'
                        : 'bg-black/20 hover:bg-black/40 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-white/5 ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.label}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
