/**
 * Ritm xaritasi — 120 BPM.
 *
 * Barcha kesishlar va matn chiqishlari shu yerdagi kadrlarga tushadi, shuning
 * uchun 120 BPM musiqa qo'yilsa hamma narsa o'z-o'zidan bitga mos keladi.
 *
 *   1 beat  = 0.5 s = 15 kadr (30 fps)
 *   1 bar   = 4 beat = 2 s = 60 kadr
 */

export const FPS = 30;
export const BPM = 120;

/** Bitta beat necha kadr. */
export const BEAT = (FPS * 60) / BPM; // 15
/** Bitta takt (4/4) necha kadr. */
export const BAR = BEAT * 4; // 60

/** `n`-beat qaysi kadrda boshlanadi. */
export const beat = (n: number): number => Math.round(n * BEAT);
/** `n`-takt qaysi kadrda boshlanadi. */
export const bar = (n: number): number => Math.round(n * BAR);

/** Soniyani kadrga aylantiradi (storyboard taymkodlari uchun). */
export const sec = (s: number): number => Math.round(s * FPS);

/**
 * Shu kadrda beat tushdimi — ekran "nafas olishi" (pulsatsiya) uchun.
 * `every` = 1 har beatda, 2 har ikkinchi beatda va h.k.
 */
export const onBeat = (frame: number, every = 1): boolean =>
  frame % (BEAT * every) === 0;

/**
 * Beatdan keyingi 0 → 1 "zarba" egri chizig'i.
 * Beat tushganda 1, keyingi beatgacha 0 ga tushadi.
 */
export function beatPulse(frame: number, every = 1, decay = 0.55): number {
  const period = BEAT * every;
  const since = frame % period;
  const t = since / (period * decay);
  return t >= 1 ? 0 : (1 - t) ** 2;
}

/** Storyboard bo'yicha sahna chegaralari (kadrda). Hammasi aniq beatga tushadi. */
export const CUTS = {
  hook: beat(0), //  0.0 s
  problem: beat(5), //  2.5 s
  solution: beat(10), //  5.0 s
  game1: beat(16), //  8.0 s
  game2: beat(26), // 13.0 s
  path: beat(34), // 17.0 s
  result: beat(42), // 21.0 s
  payoff: beat(50), // 25.0 s
  cta: beat(56), // 28.0 s
  end: beat(60), // 30.0 s
} as const;

export type SceneId = keyof typeof CUTS;

/**
 * 15 soniyalik kesim — faqat HOOK, O'YIN 1, O'YIN 2 va CTA.
 * Chegaralar ham aniq beatga tushadi (5 + 10 + 8 + 7 = 30 beat = 15 s).
 */
export const SHORT = {
  hook: { from: beat(0), dur: beat(5) },
  game1: { from: beat(5), dur: beat(10) },
  game2: { from: beat(15), dur: beat(8) },
  cta: { from: beat(23), dur: beat(7) },
  total: beat(30),
} as const;

/** Sahnaning boshlanish kadri va davomiyligi. */
export function span(id: Exclude<SceneId, "end">): { from: number; dur: number } {
  const order: Array<keyof typeof CUTS> = [
    "hook", "problem", "solution", "game1", "game2", "path", "result", "payoff", "cta", "end",
  ];
  const i = order.indexOf(id);
  return { from: CUTS[id], dur: CUTS[order[i + 1]] - CUTS[id] };
}
