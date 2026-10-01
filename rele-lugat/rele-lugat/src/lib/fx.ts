/** Haptic, tovush, konfetti, ekran tebranishi va aralashtirish yordamchilari. */
import { S } from "../store";
import { sndAlarm, sndLevel, sndOk, sndSurge, sndSwitch, sndTap } from "./audio";

/* ------------------------------------------------------------------ */
/* Harakatni kamaytirish                                                */

export function reducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Vibratsiya                                                           */

interface HapticsPlugin {
  impact(opts: { style: string }): void;
  notification(opts: { type: string }): void;
}
interface CapacitorGlobal {
  Plugins?: { Haptics?: HapticsPlugin };
}

/** Capacitor mavjud bo'lsa undan, bo'lmasa navigator.vibrate dan foydalanadi. */
export function haptic(kind: "light" | "heavy" | "err" = "light"): void {
  if (S.vibro === false) return;
  try {
    const C = (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
    const H = C?.Plugins?.Haptics;
    if (H) {
      if (kind === "heavy") H.impact({ style: "HEAVY" });
      else if (kind === "err") H.notification({ type: "ERROR" });
      else H.impact({ style: "LIGHT" });
      return;
    }
  } catch {
    /* plagin yo'q */
  }
  try {
    navigator.vibrate?.(kind === "err" ? [40, 60, 40] : kind === "heavy" ? 30 : 12);
  } catch {
    /* brauzer ruxsat bermadi */
  }
}

/* ------------------------------------------------------------------ */
/* Birlashtirilgan "his-tuyg'u" signallari                              */
/* Har biri: tovush + vibratsiya (sozlamalarga bo'ysunadi)              */

/** Oddiy bosish. */
export function fxTap(): void {
  sndTap();
  haptic("light");
}

/** Kommutatsiya: detal joyiga tushdi, o'chirgich ulandi. */
export function fxSwitch(): void {
  sndSwitch();
  haptic("heavy");
}

/** To'g'ri javob. */
export function fxOk(): void {
  sndOk();
  haptic("light");
}

/** Xato javob — AVARIYA. */
export function fxAlarm(): void {
  sndAlarm();
  haptic("err");
  shake();
}

/** Liniya bo'ylab tok impulsi. */
export function fxSurge(): void {
  sndSurge();
  haptic("light");
}

/** Daraja yoki nishon. */
export function fxLevel(): void {
  sndLevel();
  haptic("heavy");
}

/* ------------------------------------------------------------------ */
/* Ekran tebranishi (avariya)                                           */

export function shake(): void {
  if (reducedMotion()) return;
  const root = document.getElementById("root");
  if (!root) return;
  root.classList.remove("shake");
  // reflow — animatsiya qayta ishga tushsin
  void root.offsetWidth;
  root.classList.add("shake");
  window.setTimeout(() => root.classList.remove("shake"), 420);
}

/** Qisqa qizil "AVARIYA" yorishuvi (butun ekran bo'ylab). */
export function alarmFlash(): void {
  if (reducedMotion()) return;
  const el = document.getElementById("alarm-flash");
  if (!el) return;
  el.classList.remove("on");
  void el.offsetWidth;
  el.classList.add("on");
  window.setTimeout(() => el.classList.remove("on"), 600);
}

/* ------------------------------------------------------------------ */
/* Konfetti / uchqun                                                    */

interface Particle {
  x: number; y: number; w: number; h: number;
  vx: number; vy: number; rot: number; vr: number; c: string; life: number;
}

let raf: number | null = null;
let parts: Particle[] = [];

function canvas(): { cvs: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  const cvs = document.getElementById("confetti") as HTMLCanvasElement | null;
  if (!cvs) return null;
  const ctx = cvs.getContext("2d");
  if (!ctx) return null;
  if (cvs.width !== window.innerWidth || cvs.height !== window.innerHeight) {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
  }
  cvs.classList.add("on");
  return { cvs, ctx };
}

function loop(): void {
  const c = canvas();
  if (!c) return;
  const { cvs, ctx } = c;
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  let alive = 0;
  for (const p of parts) {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy += 0.045;
    p.life -= 1;
    if (p.y < cvs.height + 30 && p.life > 0) alive++;
    else continue;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (alive > 0) {
    raf = requestAnimationFrame(loop);
  } else {
    parts = [];
    cvs.classList.remove("on");
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    raf = null;
  }
}

/** Tabriklash konfettisi — indikator ranglarida. */
export function confetti(n = 70): void {
  if (reducedMotion()) return;
  const c = canvas();
  if (!c) return;
  const colors = ["#22e06b", "#ffc629", "#35b6ff", "#e6edf7", "#ff3b47"];
  for (let i = 0; i < n; i++) {
    parts.push({
      x: Math.random() * c.cvs.width,
      y: -20 - Math.random() * c.cvs.height * 0.4,
      w: 4 + Math.random() * 5,
      h: 7 + Math.random() * 7,
      vy: 2.4 + Math.random() * 3.2,
      vx: -1.4 + Math.random() * 2.8,
      rot: Math.random() * Math.PI,
      vr: -0.14 + Math.random() * 0.28,
      c: colors[(Math.random() * colors.length) | 0],
      life: 400,
    });
  }
  if (!raf) loop();
}

/** Xato joyda qisqa uchqun (ekran koordinatalarida). */
export function spark(x: number, y: number, n = 14): void {
  if (reducedMotion()) return;
  const c = canvas();
  if (!c) return;
  const colors = ["#ffc629", "#ff3b47", "#ffffff"];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 2 + Math.random() * 5;
    parts.push({
      x, y,
      w: 2 + Math.random() * 2,
      h: 2 + Math.random() * 2,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 1,
      rot: 0,
      vr: 0.3,
      c: colors[(Math.random() * colors.length) | 0],
      life: 22 + Math.random() * 14,
    });
  }
  if (!raf) loop();
}

/* ------------------------------------------------------------------ */
/* Massiv yordamchilari                                                 */

export function shuffle<T>(a: readonly T[]): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function sample<T>(a: readonly T[], n: number): T[] {
  return shuffle(a).slice(0, n);
}
