/**
 * Yozib olingan kliplarning belgilari (`public/clips/clip-*.json`).
 *
 * Playwright yozuv paytida muhim lahzalarni belgilab qo'ygan, shuning uchun
 * reklamadagi kesishlar qo'lda tanlangan taymkodlarga emas, haqiqiy hodisalarga
 * bog'langan — kontent o'zgarsa va yozuv uzayib ketsa ham mos keladi.
 */

import { staticFile } from "remotion";

import homeMarks from "../public/clips/clip-home.json";
import circuitMarks from "../public/clips/clip-circuit.json";
import quizMarks from "../public/clips/clip-quiz.json";
import pathMarks from "../public/clips/clip-path.json";
import flashMarks from "../public/clips/clip-flash.json";
import calcMarks from "../public/clips/clip-calc.json";

export interface ClipMeta {
  duration: number;
  fps: number;
  marks: Record<string, number>;
}

export const CLIP_META = {
  home: homeMarks as ClipMeta,
  circuit: circuitMarks as ClipMeta,
  quiz: quizMarks as ClipMeta,
  path: pathMarks as ClipMeta,
  flash: flashMarks as ClipMeta,
  calc: calcMarks as ClipMeta,
} as const;

export type ClipName = keyof typeof CLIP_META;

export const clipSrc = (name: ClipName): string => staticFile(`clips/clip-${name}.mp4`);

/** `rate()` da "klip oxirigacha" degani. */
export const END = "__end";

/** Belgilangan lahza (soniyada). Belgi yo'q bo'lsa — `fallback`. */
export function at(name: ClipName, mark: string, fallback = 0): number {
  const v = CLIP_META[name].marks[mark];
  return typeof v === "number" ? v : fallback;
}

/**
 * Ikki belgi orasidagi bo'lakni berilgan ekran vaqtiga sig'dirish uchun
 * kerakli tezlik. Natija [min, max] oralig'ida cheklanadi, shunda hech narsa
 * ne juda sekin, ne tushunib bo'lmas darajada tez bo'lmaydi.
 */
export function rate(
  name: ClipName,
  from: string,
  to: string,
  screenFrames: number,
  fps: number,
  min = 1,
  max = 3.2,
): number {
  const a = at(name, from);
  const b = at(name, to, CLIP_META[name].duration);
  const need = Math.max(0.2, b - a);
  const have = screenFrames / fps;
  return Math.min(max, Math.max(min, need / have));
}
