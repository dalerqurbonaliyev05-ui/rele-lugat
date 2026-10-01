/** Reklama ranglari — ilovaning "podstansiya dispetcher pulti" palitrasi bilan bir xil. */

export const C = {
  bg: "#0b1220",
  bg2: "#111a2e",
  panel: "#16213a",
  line: "#22304f",
  blue: "#35b6ff",
  amber: "#ffc629",
  green: "#22e06b",
  red: "#ff3b47",
  ink: "#e6edf7",
  ink2: "#8ea0bf",
} as const;

/**
 * TikTok/Reels interfeysi tepadan ~250 px va pastdan ~400 px ni yopadi
 * (1080×1920 da). Matn shu zonalardan tashqarida turishi kerak.
 */
export const SAFE = {
  vertical: { top: 260, bottom: 410, side: 80 },
  square: { top: 90, bottom: 150, side: 80 },
} as const;

export type Aspect = "vertical" | "square";

export const SIZES = {
  vertical: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;

/** Sarlavha o'lchamlari — kalit so'z kamida 90 px. */
export const T = {
  mega: 150,
  big: 108,
  mid: 78,
  small: 54,
  sub: 46,
  tiny: 36,
} as const;

export const SHADOW = "0 24px 80px rgba(0,0,0,0.65)";
export const glow = (color: string, px = 36): string =>
  `0 0 ${px}px ${color}, 0 0 ${px * 2.4}px ${color}55`;
