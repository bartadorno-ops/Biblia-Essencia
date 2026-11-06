import React, { createContext, useContext, useEffect, useState } from 'react';

export type AppTheme = 'dark' | 'sepia' | 'light';

export interface FontSettings {
  size: number; // in px, e.g. 18
  lineHeight: number; // multiplier, e.g. 1.8
  isSerif: boolean;
}

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  fontSettings: FontSettings;
  updateFontSettings: (part: Partial<FontSettings>) => void;
}

const THEME_STORAGE_KEY = 'biblia_essencia_theme_v2';
const FONT_STORAGE_KEY = 'biblia_essencia_font_v2';

const DEFAULT_FONT_SETTINGS: FontSettings = {
  size: 19,
  lineHeight: 1.85,
  isSerif: true
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  fontSettings: DEFAULT_FONT_SETTINGS,
  updateFontSettings: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'sepia' || stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {}
    return 'dark';
  });

  const [fontSettings, setFontSettings] = useState<FontSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_FONT_SETTINGS;
    try {
      const stored = localStorage.getItem(FONT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          size: typeof parsed.size === 'number' ? parsed.size : DEFAULT_FONT_SETTINGS.size,
          lineHeight: typeof parsed.lineHeight === 'number' ? parsed.lineHeight : DEFAULT_FONT_SETTINGS.lineHeight,
          isSerif: typeof parsed.isSerif === 'boolean' ? parsed.isSerif : DEFAULT_FONT_SETTINGS.isSerif
        };
      }
    } catch (e) {}
    return DEFAULT_FONT_SETTINGS;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {}
  }, [theme]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const updateFontSettings = (part: Partial<FontSettings>) => {
    setFontSettings((prev) => {
      const next = { ...prev, ...part };
      try {
        localStorage.setItem(FONT_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSettings, updateFontSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
