import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { LANGS, type Lang, type L10n } from "../types";
import { UI, type UIKey } from "./strings";

const LANG_KEY = "rele-lugat-lang";

export const LANG_NAMES: Record<Lang, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export const LANG_FLAGS: Record<Lang, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

function detect(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch {
    /* localStorage bloklangan bo'lishi mumkin */
  }
  const nav = (navigator.language || "uz").slice(0, 2).toLowerCase();
  if (nav === "ru") return "ru";
  if (nav === "en") return "en";
  return "uz";
}

/** "{n} ta savol" + {n: 5} → "5 ta savol" */
function fill(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Interfeys matni. */
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  /** Kontent matni (L10n obyekti yoki oddiy satr). */
  x: (v: L10n | string | undefined, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);

  const value = useMemo<Ctx>(() => {
    const setLang = (l: Lang) => {
      setLangState(l);
      try {
        localStorage.setItem(LANG_KEY, l);
      } catch {
        /* e'tiborsiz */
      }
      document.documentElement.lang = l;
    };
    return {
      lang,
      setLang,
      t: (key, vars) => fill(UI[key][lang] ?? UI[key].uz, vars),
      x: (v, vars) => {
        if (v === undefined) return "";
        const s = typeof v === "string" ? v : (v[lang] ?? v.uz);
        return fill(s, vars);
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be used inside <I18nProvider>");
  return c;
}
