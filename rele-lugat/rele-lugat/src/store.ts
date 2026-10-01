/** Progress saqlash (localStorage). Hech narsa tashqariga yuborilmaydi. */
import { GLOSSARY } from "./data/glossary";
import { QUIZZES } from "./data/quizzes";
import { CIRCUITS } from "./data/circuits";
import type { L10n } from "./types";
import { UI } from "./i18n/strings";

const KEY = "rele-lugat-v2";

export interface SrsItem {
  box: number;
  due: string;
  seen: number;
}

export interface Mistake {
  kind: "quiz" | "term";
  key: string;
  ts: number;
}

/** Bir ma'ruza tuguni uchun bosqichlar (Yo'l xaritasi). */
export interface PathStages {
  terms?: true;
  cards?: true;
  quiz?: true;
}

export interface State {
  name: string;
  theme: "light" | "dark";
  /** Rele kliki va avariya signallari. */
  sound: boolean;
  /** Vibratsiya (haptics). */
  vibro: boolean;
  /** Yo'l xaritasi: ma'ruza raqami → yakunlangan bosqichlar. */
  path: Record<number, PathStages>;
  /** Kunlik sinov oxirgi bajarilgan kuni. */
  dailyDone: string;
  xp: number;
  streak: number;
  lastDay: string;
  bestStreak: number;
  fav: Record<string, true>;
  srs: Record<string, SrsItem>;
  quizDone: Record<string, true>;
  quizStat: { ok: number; bad: number };
  lecStat: Record<number, { ok: number; bad: number }>;
  mistakes: Mistake[];
  circuits: Record<string, number>;
  badges: Record<string, true>;
  examBest: number;
  dayTerm: { day: string; id: string };
}

const DEFAULT: State = {
  name: "",
  theme: "dark",
  sound: true,
  vibro: true,
  path: {},
  dailyDone: "",
  xp: 0,
  streak: 0,
  lastDay: "",
  bestStreak: 0,
  fav: {},
  srs: {},
  quizDone: {},
  quizStat: { ok: 0, bad: 0 },
  lecStat: {},
  mistakes: [],
  circuits: {},
  badges: {},
  examBest: 0,
  dayTerm: { day: "", id: "" },
};

export const S: State = structuredClone(DEFAULT);

/* ------------------------------------------------------------------ */
/* Sana yordamchilari                                                   */

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function dayDiff(a: string, b: string): number {
  if (!a || !b) return 999;
  const [ya, ma, da] = a.split("-").map(Number);
  const [yb, mb, db] = b.split("-").map(Number);
  return Math.round((+new Date(yb, mb - 1, db) - +new Date(ya, ma - 1, da)) / 86400000);
}

/* ------------------------------------------------------------------ */
/* Yuklash / saqlash                                                    */

export function load(): State {
  Object.assign(S, structuredClone(DEFAULT));
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw) {
    try {
      const o = JSON.parse(raw) as Partial<State>;
      const target = S as unknown as Record<string, unknown>;
      const src = o as unknown as Record<string, unknown>;
      for (const k of Object.keys(DEFAULT)) {
        if (src[k] !== undefined) target[k] = src[k];
      }
    } catch {
      /* buzilgan ma'lumot — standart holat */
    }
  }
  return S;
}

export function save(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch {
    /* xotira to'la yoki bloklangan */
  }
}

export function reset(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* e'tiborsiz */
  }
  load();
}

/* ------------------------------------------------------------------ */
/* Streak va XP                                                         */

export function touchDay(): void {
  const t = today();
  if (S.lastDay === t) return;
  const d = dayDiff(S.lastDay, t);
  S.streak = d === 1 ? S.streak + 1 : 1;
  if (S.streak > S.bestStreak) S.bestStreak = S.streak;
  S.lastDay = t;
  save();
}

export const LEVELS: Array<{ min: number; name: L10n }> = [
  { min: 0, name: UI.lvl1 },
  { min: 300, name: UI.lvl2 },
  { min: 900, name: UI.lvl3 },
  { min: 2000, name: UI.lvl4 },
];

export interface LevelInfo {
  name: L10n;
  index: number;
  next: L10n | null;
  pct: number;
  toNext: number;
}

export function level(): LevelInfo {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (S.xp >= LEVELS[i].min) idx = i;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1] ?? null;
  const lo = cur.min;
  const hi = next ? next.min : cur.min + 1;
  return {
    name: cur.name,
    index: idx,
    next: next ? next.name : null,
    pct: next ? Math.min(100, Math.round(((S.xp - lo) / (hi - lo)) * 100)) : 100,
    toNext: next ? next.min - S.xp : 0,
  };
}

export function addXp(n: number): void {
  S.xp += n;
  touchDay();
  checkBadges();
  save();
}

/* ------------------------------------------------------------------ */
/* Oraliqli takrorlash (Leitner, 5 quti)                                */

const BOX_DAYS = [0, 1, 2, 4, 8, 16];

export function srsOf(id: string): SrsItem {
  return S.srs[id] ?? { box: 0, due: today(), seen: 0 };
}

export function srsAnswer(id: string, known: boolean): void {
  const s = srsOf(id);
  s.seen++;
  s.box = known ? Math.min(5, s.box + 1) : 1;
  s.due = addDays(today(), BOX_DAYS[s.box]);
  S.srs[id] = s;
  if (!known) pushMistake("term", id);
  save();
}

export function srsDue(): string[] {
  const t = today();
  return GLOSSARY.filter((g) => {
    const s = S.srs[g.id];
    return !s || s.due <= t;
  }).map((g) => g.id);
}

export function learnedCount(): number {
  return Object.values(S.srs).filter((s) => s.box >= 4).length;
}

/* ------------------------------------------------------------------ */
/* Xatolar daftari                                                      */

export function pushMistake(kind: Mistake["kind"], key: string): void {
  const found = S.mistakes.find((m) => m.kind === kind && m.key === key);
  if (found) {
    found.ts = Date.now();
  } else {
    S.mistakes.push({ kind, key, ts: Date.now() });
    if (S.mistakes.length > 300) S.mistakes.shift();
  }
  save();
}

export function clearMistake(kind: Mistake["kind"], key: string): void {
  S.mistakes = S.mistakes.filter((m) => !(m.kind === kind && m.key === key));
  save();
}

/* ------------------------------------------------------------------ */
/* Test statistikasi                                                    */

export function quizAnswer(lec: number, idx: number | null, ok: boolean): void {
  if (idx !== null) {
    const key = `l${lec}#${idx}`;
    if (ok) {
      S.quizStat.ok++;
      S.quizDone[key] = true;
      clearMistake("quiz", key);
    } else {
      S.quizStat.bad++;
      pushMistake("quiz", key);
    }
  } else {
    S.quizStat[ok ? "ok" : "bad"]++;
  }
  const st = (S.lecStat[lec] ??= { ok: 0, bad: 0 });
  st[ok ? "ok" : "bad"]++;
  save();
}

export function lecProgress(lec: number): number {
  const total = QUIZZES.filter((q) => q.l === lec).length;
  if (!total) return 0;
  const prefix = `l${lec}#`;
  const done = Object.keys(S.quizDone).filter((k) => k.startsWith(prefix)).length;
  return Math.min(100, Math.round((done / total) * 100));
}

/* ------------------------------------------------------------------ */
/* Yo'l xaritasi                                                        */

export type PathStage = keyof PathStages;

/** Tugun bosqichini yakunlangan deb belgilaydi. Yangi yakunlangan bo'lsa true. */
export function markStage(lec: number, stage: PathStage): boolean {
  const cur = (S.path[lec] ??= {});
  if (cur[stage]) return false;
  cur[stage] = true;
  save();
  return true;
}

export function stagesOf(lec: number): PathStages {
  return S.path[lec] ?? {};
}

/** Uchala bosqich yakunlanganmi. */
export function nodeDone(lec: number): boolean {
  const s = stagesOf(lec);
  return !!(s.terms && s.cards && s.quiz);
}

/** Tugun "energiyalangan" — kamida bitta bosqich bajarilgan. */
export function nodeStarted(lec: number): boolean {
  const s = stagesOf(lec);
  return !!(s.terms || s.cards || s.quiz);
}

/* ------------------------------------------------------------------ */
/* Nishonlar                                                            */

export interface Badge {
  id: string;
  ico: string;
  name: L10n;
  desc: L10n;
  test: () => boolean;
}

export const BADGES: Badge[] = [
  { id: "first", ico: "🎯", name: UI.bFirst, desc: UI.bFirstD, test: () => S.quizStat.ok >= 1 },
  { id: "q50", ico: "🧠", name: UI.bQ50, desc: UI.bQ50D, test: () => S.quizStat.ok >= 50 },
  { id: "q150", ico: "🏆", name: UI.bQ150, desc: UI.bQ150D, test: () => S.quizStat.ok >= 150 },
  { id: "streak3", ico: "🔥", name: UI.bS3, desc: UI.bS3D, test: () => S.bestStreak >= 3 },
  { id: "streak7", ico: "⚡", name: UI.bS7, desc: UI.bS7D, test: () => S.bestStreak >= 7 },
  { id: "srs25", ico: "📚", name: UI.bSrs25, desc: UI.bSrs25D, test: () => learnedCount() >= 25 },
  { id: "srs75", ico: "🎓", name: UI.bSrs75, desc: UI.bSrs75D, test: () => learnedCount() >= 75 },
  { id: "circ1", ico: "🔌", name: UI.bCirc1, desc: UI.bCirc1D, test: () => Object.values(S.circuits).some((v) => v === 100) },
  {
    id: "circall", ico: "🛠️", name: UI.bCircAll, desc: UI.bCircAllD,
    test: () => CIRCUITS.length > 0 && CIRCUITS.every((c) => S.circuits[c.id] === 100),
  },
  { id: "exam80", ico: "📝", name: UI.bExam, desc: UI.bExamD, test: () => S.examBest >= 80 },
  { id: "lvl2", ico: "🔧", name: UI.bLvl2, desc: UI.bLvl2D, test: () => S.xp >= 300 },
  { id: "lvl4", ico: "👑", name: UI.bLvl4, desc: UI.bLvl4D, test: () => S.xp >= 2000 },
];

let newBadges: Badge[] = [];

export function checkBadges(): void {
  for (const b of BADGES) {
    if (!S.badges[b.id] && b.test()) {
      S.badges[b.id] = true;
      newBadges.push(b);
    }
  }
}

export function takeNewBadges(): Badge[] {
  const n = newBadges;
  newBadges = [];
  return n;
}

/* ------------------------------------------------------------------ */
/* Bugungi atama                                                        */

export function dayTerm() {
  const t = today();
  if (!GLOSSARY.length) return null;
  if (S.dayTerm.day !== t) {
    let seed = 0;
    for (let i = 0; i < t.length; i++) seed = (seed * 31 + t.charCodeAt(i)) % 100000;
    S.dayTerm = { day: t, id: GLOSSARY[seed % GLOSSARY.length].id };
    save();
  }
  return GLOSSARY.find((g) => g.id === S.dayTerm.id) ?? GLOSSARY[0];
}
