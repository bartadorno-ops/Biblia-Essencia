import React, { useState } from 'react';
import { StudyWord, BibleMap } from '../../lib/bible/types';
import { GraduationCap, BookOpen, MapPin, Search, Sparkles } from 'lucide-react';

const STUDY_WORDS: StudyWord[] = [
  {
    word: 'Hesed (Graça / Misericórdia)',
    original: 'חֶסֶד',
    language: 'Hebraico',
    meaning: 'Amor pactual inabalável, misericórdia ativa, fidelidade leal e bondade perseverante de Deus para com o Seu povo.',
    occurrence: 'Salmos 136:1, Êxodo 34:6, Miquéias 6:8'
  },
  {
    word: 'Shalom (Paz)',
    original: 'שָׁלוֹם',
    language: 'Hebraico',
    meaning: 'Muito além da ausência de guerra: plenitude, integridade, bem-estar total, saúde, prosperidade espiritual e reconciliação harmoniosa.',
    occurrence: 'Números 6:26, Isaías 9:6, Jeremias 29:11'
  },
  {
    word: 'Agape (Amor Divino)',
    original: 'ἀγάπη',
    language: 'Grego',
    meaning: 'Amor incondicional, sacrificial, deliberado e abnegado, que busca o bem supremo do outro sem esperar nada em troca.',
    occurrence: 'João 3:16, 1 Coríntios 13:4-8, 1 João 4:8'
  },
  {
    word: 'Logos (O Verbo)',
    original: 'λόγος',
    language: 'Grego',
    meaning: 'A Palavra eterna, razão ordenadora do cosmos e a autoexpressão viva de Deus personalizada e encarnada em Jesus Cristo.',
    occurrence: 'João 1:1, João 1:14, 1 João 1:1'
  },
  {
    word: 'Metanoia (Arrependimento)',
    original: 'μετάνοια',
    language: 'Grego',
    meaning: 'Mudança radical de mentalidade, transformação de perspectiva e reorientação total da vida e dos propósitos em direção a Deus.',
    occurrence: 'Mateus 4:17, Marcos 1:15, Atos 2:38'
  },
  {
    word: 'Koinonia (Comunhão)',
    original: 'κοινωνία',
    language: 'Grego',
    meaning: 'Comunhão íntima, participação mútua, partilha solidária e vida compartilhada em Cristo no Corpo da Igreja.',
    occurrence: 'Atos 2:42, 1 Coríntios 1:9, 1 João 1:3'
  }
];

const BIBLE_MAPS: BibleMap[] = [
  {
    id: 'exodo',
    title: 'A Rota do Êxodo e a Peregrinação no Sinai',
    period: 'c. 1446-1406 a.C.',
    description: 'A saída do Egito por Ramessés, a travessia do Mar Vermelho, a permanência no Monte Sinai (entrega dos Dez Mandamentos) e os 40 anos de jornada até o Monte Nebo.',
    places: ['Ramessés', 'Mar Vermelho', 'Mara', 'Elim', 'Monte Sinai / Horebe', 'Cades-Barnéia', 'Planícies de Moabe']
  },
  {
    id: 'israel-antigo',
    title: 'A Divisão de Canaã entre as Doze Tribos',
    period: 'c. 1400 a.C. - Período dos Juízes',
    description: 'A partilha da Terra Prometida sob a liderança de Josué: de Dã ao norte até Berseba ao sul, incluindo as tribos além do Jordão (Rúben, Gade e meia tribo de Manassés).',
    places: ['Jericó', 'Siló (Tabernáculo)', 'Hebrom', 'Siquém', 'Belém', 'Hazor', 'Monte Carmelo']
  },
  {
    id: 'jerusalem-jesus',
    title: 'Jerusalém nos Tempos de Jesus Cristo',
    period: 'Século I d.C. (Herodes o Grande e Procuradores Romanos)',
    description: 'A Cidade Santa com o suntuoso Templo de Herodes, o Tanque de Betesda, o Tanque de Siloé, o Pretório de Pilatos, o Getsêmani e o Monte do Calvário (Gólgota).',
    places: ['Segundo Templo', 'Pátio dos Gentios', 'Monte das Oliveiras', 'Jardim do Getsêmani', 'Gólgota', 'Cenáculo']
  },
  {
    id: 'viagens-paulo',
    title: 'As Grandes Viagens Missionárias do Apóstolo Paulo',
    period: 'c. 46-67 d.C.',
    description: 'As rotas marítimas e terrestres pelo Império Romano, estabelecendo comunidades de fé na Ásia Menor, Grécia, Macedônia e finalmente a chegada a Roma.',
    places: ['Antioquia da Síria', 'Chipre', 'Éfeso', 'Filipos', 'Tessalônica', 'Atenas (Areópago)', 'Corinto', 'Roma']
  }
];

export const StudyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'words' | 'maps' | 'theology'>('words');
  const [wordFilter, setWordFilter] = useState('');

  const filteredWords = STUDY_WORDS.filter((w) => {
    const q = wordFilter.toLowerCase();
    return (
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      w.language.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-amber-400" />
          <span>Caderno de Estudos Bíblicos</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Léxico das línguas originais, geografia bíblica e teologia sistemática das Escrituras.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-black/20 border mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
        {[
          { id: 'words', label: 'Termos Originais', icon: Sparkles },
          { id: 'maps', label: 'Mapas e Geografia', icon: MapPin },
          { id: 'theology', label: 'Síntese Doutrinária', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Words / Lexicon */}
      {activeTab === 'words' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={wordFilter}
              onChange={(e) => setWordFilter(e.target.value)}
              placeholder="Buscar termo ou significado..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-black/20 focus:outline-none focus:ring-1 focus:ring-amber-400"
              style={{
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredWords.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border bg-black/20 border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-semibold">
                      {item.language}
                    </span>
                    <span className="text-xl font-bold font-serif text-amber-400" dir="auto">
                      {item.original}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white">{item.word}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.meaning}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="font-semibold text-amber-400/80">Ocorrências:</span>
                  <span>{item.occurrence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Maps & Historical Geography */}
      {activeTab === 'maps' && (
        <div className="space-y-4">
          {BIBLE_MAPS.map((map) => (
            <div
              key={map.id}
              className="p-5 rounded-2xl border bg-black/20 border-white/5 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    {map.period}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{map.title}</h3>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {map.description}
              </p>

              <div>
                <div className="text-xs font-semibold text-slate-400 mb-2">Locais e marcos bíblicos:</div>
                <div className="flex flex-wrap gap-1.5">
                  {map.places.map((place, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-200"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Theology Synthesis */}
      {activeTab === 'theology' && (
        <div className="space-y-4">
          {[
            {
              title: 'A Doutrina da Graça (Sola Gratia)',
              summary: 'A salvação é iniciativa soberana e exclusiva do amor incondicional de Deus, concedida imerecidamente aos pecadores através da obra perfeita de Jesus Cristo na cruz, sem dependência de méritos humanos.',
              refs: 'Efésios 2:8-9, Romanos 3:24, Tito 3:4-7'
            },
            {
              title: 'A Nova Aliança no Sangue de Cristo',
              summary: 'Prometida pelos profetas (Jeremias 31) e inaugurada no Calvário, a Nova Aliança substitui os sacrifícios temporários de animais pela expiação definitiva, escrevendo a lei de Deus no íntimo dos corações pelo Espírito Santo.',
              refs: 'Lucas 22:20, Hebreus 8:6-13, 1 Coríntios 11:25'
            },
            {
              title: 'A Justificação pela Fé (Sola Fide)',
              summary: 'O ato judicial divino pelo qual o pecador é declarado plenamente justo diante do Santo Deus, tendo os seus pecados perdoados e a justiça de Cristo imputada a ele mediante a fé salvadora.',
              refs: 'Romanos 5:1-2, Gálatas 2:16, Filipenses 3:9'
            },
            {
              title: 'A Inspiração e Suficiência das Escrituras (Sola Scriptura)',
              summary: 'Os 66 livros canônicos do Antigo e Novo Testamento foram inspirados pelo Espírito Santo através de autores humanos, constituindo a única regra inerrante, infalível e autoritativa de fé e prática cristã.',
              refs: '2 Timóteo 3:16-17, 2 Pedro 1:20-21, Salmos 19:7-11'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border bg-black/20 border-white/5 hover:border-amber-500/30 transition-all"
            >
              <h3 className="text-base font-bold text-white text-amber-300">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                {item.summary}
              </p>
              <div className="mt-3 pt-3 border-t border-white/5 text-xs text-amber-400 font-mono">
                {item.refs}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
