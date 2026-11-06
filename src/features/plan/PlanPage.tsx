import React, { useState, useEffect, useMemo } from 'react';
import { useReading } from '../../app/providers/ReadingProvider';
import { useToast } from '../../app/providers/ToastProvider';
import { CalendarCheck2, CheckCircle, Circle, BookOpen, ChevronRight } from 'lucide-react';

const PLAN_COMPLETED_KEY = 'biblia_essencia_plan_completed';

interface PlanDay {
  day: number;
  period: string;
  readings: { bookId: string; bookName: string; chapter: number }[];
}

export const PlanPage: React.FC<{ onNavigateToVerse: (bookId: string, chapter: number, verse: number) => void }> = ({
  onNavigateToVerse
}) => {
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(PLAN_COMPLETED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeQuarter, setActiveQuarter] = useState<number>(1);
  const { setReadingLocation } = useReading();
  const { showToast } = useToast();

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const exists = prev.includes(day);
      const next = exists ? prev.filter((d) => d !== day) : [...prev, day];
      try {
        localStorage.setItem(PLAN_COMPLETED_KEY, JSON.stringify(next));
      } catch (e) {}
      if (!exists) {
        showToast(`Dia ${day} concluído! Parabéns pela perseverança!`, 'success');
      }
      return next;
    });
  };

  // Generate 365 days of canonical reading plan
  const days: PlanDay[] = useMemo(() => {
    const list: PlanDay[] = [];
    for (let day = 1; day <= 365; day++) {
      // Quarter grouping
      const quarter = Math.ceil(day / 91.25);
      
      // Typical daily readings: Old Testament (Pentateuch/Historical/Poetic), New Testament (Gospel/Epistle)
      let readings = [];
      if (day <= 50) {
        readings = [
          { bookId: 'gn', bookName: 'Gênesis', chapter: day },
          { bookId: 'mt', bookName: 'Mateus', chapter: Math.min(28, Math.ceil(day / 2)) }
        ];
      } else if (day <= 90) {
        readings = [
          { bookId: 'ex', bookName: 'Êxodo', chapter: day - 50 },
          { bookId: 'mc', bookName: 'Marcos', chapter: Math.min(16, Math.ceil((day - 50) / 2.5)) }
        ];
      } else if (day <= 150) {
        readings = [
          { bookId: 'sl', bookName: 'Salmos', chapter: Math.min(150, day - 80) },
          { bookId: 'jo', bookName: 'João', chapter: Math.min(21, Math.ceil((day - 90) / 3)) }
        ];
      } else if (day <= 250) {
        readings = [
          { bookId: 'pv', bookName: 'Provérbios', chapter: ((day - 150) % 31) + 1 },
          { bookId: 'rm', bookName: 'Romanos', chapter: Math.min(16, Math.ceil((day - 150) / 6)) }
        ];
      } else {
        readings = [
          { bookId: 'is', bookName: 'Isaías', chapter: Math.min(66, ((day - 250) % 66) + 1) },
          { bookId: 'ap', bookName: 'Apocalipse', chapter: Math.min(22, ((day - 300) > 0 ? (day - 300) : 1)) }
        ];
      }

      list.push({
        day,
        period: `Trimestre ${quarter}`,
        readings
      });
    }
    return list;
  }, []);

  const quarterDays = useMemo(() => {
    const start = (activeQuarter - 1) * 91 + 1;
    const end = activeQuarter === 4 ? 365 : activeQuarter * 91;
    return days.filter((d) => d.day >= start && d.day <= end);
  }, [days, activeQuarter]);

  const percentage = Math.round((completedDays.length / 365) * 100);

  const handleReadChapter = (bookId: string, chapter: number) => {
    setReadingLocation(bookId, chapter, 1, 'push');
    onNavigateToVerse(bookId, chapter, 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-amber-400" />
            <span>Plano de Leitura 365 Dias</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Jornada devocional completa pela Bíblia Sagrada ao longo do ano.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="p-3 rounded-2xl bg-black/30 border border-amber-500/30 flex items-center gap-4">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Progresso Anual</div>
            <div className="text-lg font-bold text-amber-400">{completedDays.length} / 365 dias</div>
          </div>
          <div className="text-xl font-extrabold text-white font-mono bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30">
            {percentage}%
          </div>
        </div>
      </div>

      {/* Quarter Tabs */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { q: 1, label: '1º Trim', days: 'Dias 1-91' },
          { q: 2, label: '2º Trim', days: 'Dias 92-182' },
          { q: 3, label: '3º Trim', days: 'Dias 183-273' },
          { q: 4, label: '4º Trim', days: 'Dias 274-365' }
        ].map((item) => (
          <button
            key={item.q}
            onClick={() => setActiveQuarter(item.q)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              activeQuarter === item.q
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-black/20 text-slate-400 border-white/5 hover:text-white'
            }`}
          >
            <div className="text-xs font-bold">{item.label}</div>
            <div className="text-[10px] opacity-80 mt-0.5">{item.days}</div>
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {quarterDays.map((item) => {
          const isDone = completedDays.includes(item.day);
          return (
            <div
              key={item.day}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90'
                  : 'bg-black/20 border-white/5 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDay(item.day)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white transition-colors"
                  aria-label={isDone ? `Desmarcar dia ${item.day}` : `Marcar dia ${item.day} como lido`}
                >
                  {isDone ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500 hover:text-amber-400" />
                  )}
                </button>

                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Dia {item.day}</span>
                    {isDone && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                        Concluído
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.readings.map((r) => `${r.bookName} ${r.chapter}`).join(' & ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons to read each chapter */}
              <div className="flex items-center gap-2 ml-9 sm:ml-0">
                {item.readings.map((r) => (
                  <button
                    key={`${r.bookId}-${r.chapter}`}
                    onClick={() => handleReadChapter(r.bookId, r.chapter)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{r.bookName} {r.chapter}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
