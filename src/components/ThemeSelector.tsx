import React from 'react';
import { CalmTheme } from '../types';

export const calmThemes: CalmTheme[] = [
  {
    id: 'brand-logo',
    name: 'מותג רשמי (Blue & Red)',
    primaryClass: 'bg-brand-blue text-white',
    secondaryClass: 'bg-brand-blue/5 text-brand-blue',
    accentBorder: 'border-brand-red',
    textColor: 'text-slate-900',
    accentText: 'text-brand-red',
    focusRing: 'focus:ring-brand-blue',
    primaryBtn: 'bg-brand-blue hover:bg-brand-blue/90 text-white shadow-xs',
    secondaryBtn: 'bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue border border-brand-blue/10'
  },
  {
    id: 'calm-teal',
    name: 'ים שלווה (Teal)',
    primaryClass: 'bg-teal-600 text-white',
    secondaryClass: 'bg-teal-50 text-teal-800',
    accentBorder: 'border-teal-400',
    textColor: 'text-teal-950',
    accentText: 'text-teal-600',
    focusRing: 'focus:ring-teal-500',
    primaryBtn: 'bg-teal-600 hover:bg-teal-700 text-white',
    secondaryBtn: 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200'
  },
  {
    id: 'soft-peach',
    name: 'אפרסק נעים (Peach)',
    primaryClass: 'bg-orange-600 text-white',
    secondaryClass: 'bg-orange-50 text-orange-800',
    accentBorder: 'border-orange-400',
    textColor: 'text-slate-900',
    accentText: 'text-orange-600',
    focusRing: 'focus:ring-orange-500',
    primaryBtn: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondaryBtn: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200'
  },
  {
    id: 'quiet-blue',
    name: 'תכלת שמיים (Slate Blue)',
    primaryClass: 'bg-sky-600 text-white',
    secondaryClass: 'bg-sky-50 text-sky-800',
    accentBorder: 'border-sky-400',
    textColor: 'text-sky-950',
    accentText: 'text-sky-600',
    focusRing: 'focus:ring-sky-500',
    primaryBtn: 'bg-sky-600 hover:bg-sky-700 text-white',
    secondaryBtn: 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200'
  },
  {
    id: 'healing-forest',
    name: 'יער מרגיע (Sage Green)',
    primaryClass: 'bg-emerald-700 text-white',
    secondaryClass: 'bg-emerald-50 text-emerald-800',
    accentBorder: 'border-emerald-400',
    textColor: 'text-emerald-950',
    accentText: 'text-emerald-600',
    focusRing: 'focus:ring-emerald-600',
    primaryBtn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    secondaryBtn: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
  }
];

interface ThemeSelectorProps {
  currentTheme: CalmTheme;
  onThemeChange: (theme: CalmTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs" id="theme-selector-container">
      <h3 className="text-sm font-semibold text-slate-700 mb-3" id="theme-selector-title">צבעוניות מרגיעה (פלטה מוצעת)</h3>
      <div className="grid grid-cols-2 gap-2" id="theme-selector-grid">
        {calmThemes.map((theme) => {
          const isSelected = theme.id === currentTheme.id;
          return (
            <button
              key={theme.id}
              id={`theme-btn-${theme.id}`}
              onClick={() => onThemeChange(theme)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-right transition-all border ${
                isSelected
                  ? 'border-slate-800 bg-slate-50 text-slate-900 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full block border border-black/10 shrink-0"
                style={{
                  backgroundColor:
                    theme.id === 'brand-logo'
                      ? '#1e3c6e'
                      : theme.id === 'calm-teal'
                      ? '#0d9488'
                      : theme.id === 'soft-peach'
                      ? '#ea580c'
                      : theme.id === 'quiet-blue'
                      ? '#0284c7'
                      : '#047857'
                }}
              />
              <span className="truncate">{theme.name}</span>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400 mt-2 text-right">
        * מותאם לרקע בהיר, נקי ונגיש בהתאם לעקרונות ה-RTL והעיצוב האמפתי של העמותה.
      </p>
    </div>
  );
};
