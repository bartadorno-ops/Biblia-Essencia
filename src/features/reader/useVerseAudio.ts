import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioVerseItem {
  id: string; // e.g. "v-gn-1-1"
  text: string;
}

export function useVerseAudio(opts: {
  getVerses: () => AudioVerseItem[];
  voice?: 'male' | 'female' | 'device';
  onChapterComplete?: () => void;
}) {
  const { getVerses, voice = 'device', onChapterComplete } = opts;
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseId, setActiveVerseId] = useState<string | null>(null);

  const sessionRef = useRef(0);
  const userHasScrolledManuallyRef = useRef(false);
  const currentIndexRef = useRef(0);
  const versesRef = useRef<AudioVerseItem[]>([]);

  // Listen for user wheel or touchmove so auto-scrolling won't fight the user
  useEffect(() => {
    const handleUserScroll = () => {
      userHasScrolledManuallyRef.current = true;
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
    };
  }, []);

  const stop = useCallback(() => {
    sessionRef.current += 1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setIsPlaying(false);
    setActiveVerseId(null);
  }, []);

  const speakVerseIndex = useCallback((index: number, session: number) => {
    if (session !== sessionRef.current) return;
    if (!('speechSynthesis' in window)) {
      setIsPlaying(false);
      return;
    }

    const list = versesRef.current;
    if (index >= list.length) {
      setIsPlaying(false);
      setActiveVerseId(null);
      if (onChapterComplete) {
        onChapterComplete();
      }
      return;
    }

    const currentItem = list[index];
    currentIndexRef.current = index;
    setActiveVerseId(currentItem.id);

    // Only scroll if the user hasn't explicitly scrolled manually
    if (!userHasScrolledManuallyRef.current) {
      const el = document.getElementById(currentItem.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Prepare clean text (no numbers, notes or bracket tags)
    const cleanText = currentItem.text
      .replace(/\[\d+\]/g, '')
      .replace(/[*#_~]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // slightly deliberate reading pace

    // Voice selection
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const ptVoices = voices.filter((v) => v.lang.startsWith('pt'));
      if (ptVoices.length > 0) {
        if (voice === 'female') {
          const female = ptVoices.find((v) => /maria|luciana|helena|fem/i.test(v.name));
          if (female) utterance.voice = female;
          else utterance.voice = ptVoices[0];
        } else if (voice === 'male') {
          const male = ptVoices.find((v) => /felipe|ricardo|daniel|masc/i.test(v.name));
          if (male) utterance.voice = male;
          else utterance.voice = ptVoices[0];
        } else {
          utterance.voice = ptVoices[0];
        }
      }
    }

    utterance.onend = () => {
      if (session !== sessionRef.current) return;
      speakVerseIndex(index + 1, session);
    };

    utterance.onerror = (e) => {
      if (session !== sessionRef.current) return;
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      speakVerseIndex(index + 1, session);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      stop();
    }
  }, [onChapterComplete, stop, voice]);

  const play = useCallback((startIndex: number = 0) => {
    // Reset state & session counter
    sessionRef.current += 1;
    const currentSession = sessionRef.current;
    userHasScrolledManuallyRef.current = false;

    versesRef.current = getVerses();
    if (versesRef.current.length === 0) {
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsPlaying(true);
    speakVerseIndex(Math.max(0, Math.min(startIndex, versesRef.current.length - 1)), currentSession);
  }, [getVerses, speakVerseIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
    };
  }, []);

  return {
    isPlaying,
    activeVerseId,
    play,
    stop
  };
}
