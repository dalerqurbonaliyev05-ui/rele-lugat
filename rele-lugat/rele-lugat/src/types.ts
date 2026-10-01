/** Ilovadagi barcha tiplar. */

/** Qo'llab-quvvatlanadigan tillar. */
export const LANGS = ["uz", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** Uch tilli matn. Yangi til qo'shish uchun shu yerga maydon qo'shing. */
export type L10n = { uz: string; ru: string; en: string };

export function tr(v: L10n | string | undefined, lang: Lang): string {
  if (v === undefined) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.uz;
}

/* ------------------------------------------------------------------ */

export interface Lecture {
  id: number;
  title: L10n;
  color: string;
  /** Manbada PDF yo'q, mazmun boshqa ma'ruzalardan tuzilgan. */
  synth?: boolean;
}

export interface Term {
  id: string;
  /** Atama yoki qisqartma. */
  t: L10n;
  /** To'liq shakli (qisqartma bo'lmasa — yo'q). */
  f?: L10n;
  /** Qisqa ta'rif. */
  d: L10n;
  /** Manba ma'ruza raqami. */
  l: number;
  /** Bog'liq atamalar id'lari. */
  r?: string[];
  /** Qayerda ishlatiladi. */
  u?: L10n;
}

export type QuizKind = "mcq" | "tf" | "match";

export interface QuizBase {
  /** Manba ma'ruza. */
  l: number;
  /** Savol matni. */
  q: L10n;
  /** Xato javobdagi tushuntirish. */
  e: L10n;
}

export interface QuizMcq extends QuizBase {
  type: "mcq";
  o: L10n[];
  /** To'g'ri variant indeksi. */
  a: number;
}

export interface QuizTf extends QuizBase {
  type: "tf";
  a: boolean;
}

export interface QuizMatch extends QuizBase {
  type: "match";
  pairs: Array<[L10n, L10n]>;
}

export type Quiz = QuizMcq | QuizTf | QuizMatch;

/* ------------------------------------------------------------------ */
/* Sxemalar: geometriya tildan mustaqil, faqat matnlar tarjima qilinadi */

export type PartKind = "coil" | "no" | "nc" | "blk" | "ct" | "res" | "cap";

export interface CircuitPart {
  id: string;
  /** Palitradagi nom. */
  name: L10n;
  kind: PartKind;
}

export interface RungSlot {
  t: "slot";
  id: string;
  /** Qaysi detal to'g'ri keladi. */
  accept: string;
  kind: PartKind;
  w?: number;
}

export interface RungFixed {
  t: "fixed";
  label: string;
  kind: PartKind;
  w?: number;
}

export type RungItem = RungSlot | RungFixed;

export interface Rung {
  y: number;
  items: RungItem[];
  label?: L10n;
}

export interface FreeSlot {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  accept: string;
  kind: PartKind;
}

export type DrawOp =
  | ["line", number, number, number, number]
  | ["dash", number, number, number, number]
  | ["dot", number, number]
  | ["text", number, number, string, { s?: number; b?: 1; anchor?: "start" | "middle" | "end" }?]
  | ["ct", number, number, string?]
  | ["vt", number, number, string?]
  | ["earth", number, number]
  | ["arrow", number, number, number, number];

export type Difficulty = "easy" | "medium" | "hard";

export interface Circuit {
  id: string;
  title: L10n;
  /** Manba ma'ruza. */
  lec: number;
  diff: Difficulty;
  desc: L10n;
  w: number;
  h: number;
  parts: CircuitPart[];
  /** Har bir slot uchun "nega shu yerda" izohi. */
  explain: Record<string, L10n>;
  /** Pog'onali (ladder) sxema. */
  rails?: { left: number; right: number; showPolarity?: boolean };
  rungs?: Rung[];
  /** Erkin sxema. */
  draw?: DrawOp[];
  slots?: FreeSlot[];
}

/* ------------------------------------------------------------------ */

export interface Scenario {
  id: string;
  lec: number;
  title: L10n;
  fault: string;
  q: L10n;
  options: L10n[];
  a: number;
  e: L10n;
}

export interface TimeExercise {
  id: string;
  lec: number;
  title: L10n;
  desc: L10n;
  dt: number;
  given: Record<string, number>;
  answer: Record<string, number>;
  e: L10n;
}

export interface NetBus {
  id: string;
  x: number;
  y: number;
  label: string;
}
export interface NetLine {
  id: string;
  from: string;
  to: string;
  q: string;
  rh: string;
  t: number;
}
export interface NetFault {
  id: string;
  x: number;
  y: number;
  on: string;
  label: string;
}
export interface Network {
  w: number;
  h: number;
  buses: NetBus[];
  lines: NetLine[];
  faults: NetFault[];
}

/* ------------------------------------------------------------------ */

export interface CalcVar {
  k: string;
  label: L10n;
  d: number;
  hint?: L10n;
}

export interface CalcResult {
  value: number;
  unit: string;
  steps: string[];
  /** Xulosa matni (ixtiyoriy). */
  verdict?: L10n;
}

export interface Calculator {
  id: string;
  lec: number;
  group: L10n;
  title: L10n;
  /** Formula ma'ruzadagi belgilar bilan — tarjima qilinmaydi. */
  formula: string;
  ref: string;
  note?: L10n;
  v: CalcVar[];
  run: (x: Record<string, number>) => CalcResult;
  gen: () => Record<string, number>;
}

export interface Relay {
  id: string;
  name: string;
  lec: number;
  kind: L10n;
  short: L10n;
  desc: L10n;
  clues: L10n[];
  facts: L10n[];
}
