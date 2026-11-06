import React, { useState, useMemo } from 'react';
import { Hymn } from '../../lib/bible/types';
import { Music, Search, BookOpen, ChevronRight, Volume2, X } from 'lucide-react';

export const HARPA_HYMNS: Hymn[] = [
  {
    number: 1,
    title: 'Chuvas de Graça',
    author: 'Daniel Webster Whittle',
    chorus: 'Chuvas de graça, chuvas pedimos, Senhor; manda-nos já chuvas copiosas, chuvas do Consolador!',
    stanzas: [
      'Deus prometeu com certeza chuvas de graça enviar; Ele nos dá fortaleza e ricas bênçãos sem par.',
      'Cristo nos dá a promessa do Santo Consolador; vem e derrama depressa o Teu Espírito de amor.',
      'Dá-nos, Senhor, amplamente, Teu grande e santo poder; faze-nos todos crentes Tua vontade acolher.'
    ]
  },
  {
    number: 15,
    title: 'Conversão',
    author: 'Isaac Watts / Ralph E. Hudson',
    chorus: 'Foi na cruz, foi na cruz, onde um dia eu vi meu pecado castigado em Jesus; foi ali, pela fé, que os olhos abri, e agora me alegro em Sua luz.',
    stanzas: [
      'Oh! Quão cego eu andei e perdido vaguei, longe, longe do meu Salvador! Mas da glória desceu e Seu sangue verteu para salvar um tão pobre pecador.',
      'Eu ouvia falar dessa graça sem par, que do céu trouxe nosso Jesus; mas eu surdo me fiz, converter-me não quis ao Senhor que por mim morreu na cruz.',
      'Mas um dia senti meu pecado, e vi sobre mim o castigo da lei; mas depressa fugi, em Jesus me acolhi, e refúgio seguro nEle achei.'
    ]
  },
  {
    number: 39,
    title: 'Alvo Mais que a Neve',
    author: 'Eden R. Latta',
    chorus: 'Alvo mais que a neve! Alvo mais que a neve! Sim, nesse sangue lavado, mais alvo que a neve serei.',
    stanzas: [
      'Bendito seja o Cordeiro, que na cruz por nós padeceu! Bendito seja o Seu sangue, que por nós ali se verteu!',
      'Quão espinhosa a coroa que Jesus por nós suportou! Oh! Quão profundas as chagas que nos provam o quanto amou!',
      'Se nós a Ti confessarmos e seguirmos na Tua luz, Tu não somente perdoas, purificas também, ó Jesus.'
    ]
  },
  {
    number: 126,
    title: 'Bem-Aventurança do Crente',
    author: 'Frida Vingren',
    chorus: 'Bem-aventurado aquele que teme ao Senhor e nos Seus caminhos anda com temor!',
    stanzas: [
      'Bem-aventurado o que confia no Senhor e guarda a Sua santa lei com amor.',
      'Ele comerá do fruto de suas mãos; tudo lhe irá bem, na bênção e na unção.',
      'Sua família como a vide frutífera será, e a paz de Deus em sua casa reinará.'
    ]
  },
  {
    number: 186,
    title: 'De Valor em Valor',
    author: 'Gunnar Vingren',
    chorus: 'De glória em glória, de força em força, marchamos pelo caminho da cruz.',
    stanzas: [
      'Marchai, ó crentes, com intrepidez! Na luta santa triunfareis.',
      'Armados todos com a fé em Deus, alcançaremos a glória dos céus.',
      'Jesus à frente nos guiará; vitória certa Ele nos dará.'
    ]
  },
  {
    number: 300,
    title: 'Nossa Esperança',
    author: 'Adelaide Addison Pollard',
    chorus: 'Jesus voltará! Sim, voltará! O nosso amado Salvador em breve descerá!',
    stanzas: [
      'Jesus virá outra vez dos céus para buscar o povo Seu.',
      'Os mortos em Cristo ressurgirão e com Ele na glória habitarão.',
      'Ó noiva amada, vigia e ora, pois é chegada a grande hora!'
    ]
  },
  {
    number: 545,
    title: 'Porque Ele Vive',
    author: 'Bill & Gloria Gaither',
    chorus: 'Porque Ele vive, posso crer no amanhã; porque Ele vive, temor não há; mas eu bem sei, eu sei, que a minha vida está nas mãos de meu Jesus, que vivo está.',
    stanzas: [
      'Deus enviou Seu Filho amado para morrer no meu lugar; na cruz pagou por meus pecados, mas ressurgiu e vivo com o Pai está.',
      'E quando, enfim, chegar a hora em que a morte enfrentarei, sem medo, então, terei vitória: verei na glória ao meu Jesus que vivo está.'
    ]
  }
];

export const HarpaPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

  const filteredHymns = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return HARPA_HYMNS;
    return HARPA_HYMNS.filter((h) => {
      return (
        h.number.toString().includes(q) ||
        h.title.toLowerCase().includes(q) ||
        h.stanzas.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Music className="w-6 h-6 text-amber-400" />
            <span>Harpa Cristã</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Hinos sacros e cânticos congregacionais de louvor e adoração a Deus.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold self-start sm:self-auto">
          Hinário Sacro
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar hino por número (ex: 15, 545) ou título (ex: Chuvas de Graça)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border text-sm sm:text-base bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={{
            borderColor: 'var(--border-default)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Hymns Grid / List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredHymns.map((hymn) => (
          <div
            key={hymn.number}
            onClick={() => setSelectedHymn(hymn)}
            className="p-4 rounded-2xl border bg-black/20 hover:bg-amber-500/10 hover:border-amber-500/30 cursor-pointer transition-all flex items-center justify-between group"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                {hymn.number}
              </span>
              <div className="truncate">
                <div className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                  {hymn.title}
                </div>
                {hymn.author && (
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {hymn.author}
                  </div>
                )}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
          </div>
        ))}
      </div>

      {/* Modal with Full Hymn Lyrics */}
      {selectedHymn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedHymn(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 shadow-2xl border max-h-[85vh] overflow-y-auto animate-in zoom-in-95"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Hino nº {selectedHymn.number}
                </span>
                <h3 className="font-bold text-lg text-white">{selectedHymn.title}</h3>
                {selectedHymn.author && (
                  <p className="text-xs text-slate-400 mt-0.5">{selectedHymn.author}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedHymn(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
                aria-label="Fechar letra do hino"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stanzas & Chorus */}
            <div className="space-y-6 text-sm leading-relaxed font-bible text-slate-200">
              {selectedHymn.stanzas.map((stanza, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400/80 uppercase">
                    Estrofe {idx + 1}
                  </div>
                  <p className="whitespace-pre-line pl-2 border-l-2 border-white/10">
                    {stanza}
                  </p>
                </div>
              ))}

              {selectedHymn.chorus && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 my-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Coro:
                  </div>
                  <p className="italic text-amber-100 font-serif whitespace-pre-line">
                    {selectedHymn.chorus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
