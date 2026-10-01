/** Web Audio bilan sintez qilinadigan tovushlar — hech qanday tashqi fayl yo'q.
 *  Barcha tovushlar qisqa (20-300 ms) va past balandlikda.
 *  AudioContext brauzer qoidasiga ko'ra faqat birinchi teginishdan keyin ishga tushadi. */
import { S } from "../store";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlocked = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = 0.25; // past umumiy balandlik
      master.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  return ctx;
}

/** Birinchi foydalanuvchi teginishida chaqiriladi (App.tsx). */
export function unlockAudio(): void {
  if (unlocked) return;
  const c = ac();
  if (!c) return;
  unlocked = true;
  if (c.state === "suspended") void c.resume();
}

function on(): boolean {
  return S.sound !== false && !!ac();
}

/** Shovqin buferi (rele kontaktining "chirt" ovozi uchun). */
let noiseBuf: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (noiseBuf) return noiseBuf;
  const len = Math.floor(c.sampleRate * 0.12);
  const b = c.createBuffer(1, len, c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  noiseBuf = b;
  return b;
}

interface ClickOpts {
  /** Shovqin bandpass markazi, Gs. */
  freq?: number;
  /** Davomiyligi, s. */
  dur?: number;
  gain?: number;
}

/** Elektromexanik rele kontaktining klik ovozi: qisqa filtrlangan shovqin portlashi. */
export function clickSound({ freq = 2400, dur = 0.03, gain = 0.5 }: ClickOpts = {}): void {
  if (!on()) return;
  const c = ctx!;
  const t = c.currentTime;

  const src = c.createBufferSource();
  src.buffer = noise(c);

  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = 1.6;

  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  src.connect(bp).connect(g).connect(master!);
  src.start(t);
  src.stop(t + dur + 0.02);
}

function tone(freq: number, dur: number, gain: number, type: OscillatorType, delay = 0, slideTo?: number): void {
  const c = ctx!;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo !== undefined) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);

  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  o.connect(g).connect(master!);
  o.start(t);
  o.stop(t + dur + 0.02);
}

/* ------------------------------------------------------------------ */
/* Ilovadagi tovushlar                                                  */

/** Oddiy tugma: yengil rele kliki. */
export function sndTap(): void {
  clickSound({ freq: 2600, dur: 0.025, gain: 0.4 });
}

/** Og'ir kommutatsiya: o'chirgich yoki detal joyiga tushdi. */
export function sndSwitch(): void {
  if (!on()) return;
  clickSound({ freq: 1500, dur: 0.045, gain: 0.7 });
  tone(180, 0.05, 0.12, "square", 0.012, 90);
}

/** To'g'ri javob: yumshoq ikki notali signal. */
export function sndOk(): void {
  if (!on()) return;
  clickSound({ freq: 3000, dur: 0.02, gain: 0.3 });
  tone(880, 0.09, 0.12, "sine", 0.02);
  tone(1320, 0.14, 0.1, "sine", 0.1);
}

/** AVARIYA: qo'pol past signal (dispetcher pultidagi sirena kabi). */
export function sndAlarm(): void {
  if (!on()) return;
  tone(220, 0.16, 0.16, "sawtooth", 0, 160);
  tone(220, 0.16, 0.16, "sawtooth", 0.2, 160);
  clickSound({ freq: 900, dur: 0.05, gain: 0.5 });
}

/** Tok impulsi liniyadan yugurganda: qisqa "vjik". */
export function sndSurge(): void {
  if (!on()) return;
  tone(300, 0.22, 0.1, "triangle", 0, 1400);
}

/** Daraja/nishon: uch notali ko'tarilish. */
export function sndLevel(): void {
  if (!on()) return;
  tone(660, 0.1, 0.11, "sine", 0);
  tone(880, 0.1, 0.11, "sine", 0.09);
  tone(1320, 0.2, 0.12, "sine", 0.18);
}
