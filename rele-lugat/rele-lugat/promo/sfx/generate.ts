/**
 * SFX generatori — barcha ovoz effektlari shu yerda SINTEZ qilinadi.
 * Tashqi manba, namuna yoki kutubxona yo'q, hammasi original.
 *
 *   npm run sfx      →  promo/public/sfx/*.wav
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/* `npm run sfx` loyiha ildizidan ishga tushadi. */
const OUT = join(process.cwd(), "public", "sfx");

const SR = 44100;

/* ------------------------------------------------------------------ */
/* Yordamchilar                                                        */

type Buf = Float32Array;

const makeBuf = (seconds: number): Buf => new Float32Array(Math.round(seconds * SR));

/** Takrorlanadigan "tasodif" — har renderda bir xil ovoz chiqishi uchun. */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/** Eksponensial pasayish konverti. */
const decay = (t: number, tau: number): number => Math.exp(-t / tau);

/** Qisqa attack + eksponensial release. */
function env(i: number, n: number, attack: number, tau: number): number {
  const t = i / SR;
  const a = attack <= 0 ? 1 : Math.min(1, t / attack);
  const r = Math.min(1, (n - i) / (0.004 * SR)); // oxirida klik bo'lmasin
  return a * decay(Math.max(0, t - attack), tau) * r;
}

/** Rezonansli state-variable filtr (bandpass / lowpass). */
function svf(src: Buf, cutoffAt: (i: number) => number, q: number, mode: "bp" | "lp" | "hp"): Buf {
  const out = new Float32Array(src.length);
  let low = 0;
  let band = 0;
  for (let i = 0; i < src.length; i++) {
    const f = 2 * Math.sin((Math.PI * Math.min(cutoffAt(i), SR / 2.2)) / SR);
    const high = src[i] - low - q * band;
    band += f * high;
    low += f * band;
    out[i] = mode === "bp" ? band : mode === "lp" ? low : high;
  }
  return out;
}

/** Oq shovqin. */
function noise(n: number, seed: number): Buf {
  const r = rng(seed);
  const b = new Float32Array(n);
  for (let i = 0; i < n; i++) b[i] = r() * 2 - 1;
  return b;
}

/** Sinus/uchburchak/kvadrat osilator, chastota kadr bo'yicha o'zgaruvchan. */
function osc(n: number, freqAt: (i: number) => number, shape: "sin" | "sqr" | "tri" | "saw"): Buf {
  const b = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    phase += (2 * Math.PI * freqAt(i)) / SR;
    if (phase > 2 * Math.PI) phase -= 2 * Math.PI;
    const s = Math.sin(phase);
    b[i] =
      shape === "sin" ? s
        : shape === "sqr" ? Math.sign(s) * 0.7
          : shape === "tri" ? (2 / Math.PI) * Math.asin(s)
            : (phase / Math.PI - 1) * 0.7;
  }
  return b;
}

function mix(target: Buf, src: Buf, gain: number, offset = 0): void {
  for (let i = 0; i < src.length; i++) {
    const j = i + offset;
    if (j >= 0 && j < target.length) target[j] += src[i] * gain;
  }
}

/** Yumshoq cheklash — qirqilish o'rniga to'yinish. */
function softClip(b: Buf, drive = 1): void {
  for (let i = 0; i < b.length; i++) b[i] = Math.tanh(b[i] * drive);
}

/** Eng baland nuqtani `peak` ga keltiradi. */
function normalize(b: Buf, peak = 0.9): void {
  let m = 0;
  for (const v of b) m = Math.max(m, Math.abs(v));
  if (m < 1e-6) return;
  const k = peak / m;
  for (let i = 0; i < b.length; i++) b[i] *= k;
}

/** Boshi va oxiriga qisqa fade — har qanday klikni olib tashlaydi. */
function fade(b: Buf, ms = 4): void {
  const n = Math.round((ms / 1000) * SR);
  for (let i = 0; i < n && i < b.length; i++) {
    b[i] *= i / n;
    b[b.length - 1 - i] *= i / n;
  }
}

/** 16-bit mono PCM WAV. */
function wav(b: Buf): Buffer {
  const data = Buffer.alloc(b.length * 2);
  for (let i = 0; i < b.length; i++) {
    const v = Math.max(-1, Math.min(1, b[i]));
    data.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const head = Buffer.alloc(44);
  head.write("RIFF", 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write("WAVE", 8);
  head.write("fmt ", 12);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20); // PCM
  head.writeUInt16LE(1, 22); // mono
  head.writeUInt32LE(SR, 24);
  head.writeUInt32LE(SR * 2, 28);
  head.writeUInt16LE(2, 32);
  head.writeUInt16LE(16, 34);
  head.write("data", 36);
  head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
}

function save(name: string, b: Buf): void {
  normalize(b, 0.92);
  fade(b);
  writeFileSync(join(OUT, name), wav(b));
  console.log(`  ${name}  ${(b.length / SR).toFixed(2)}s`);
}

/* ------------------------------------------------------------------ */
/* 1. Rele "klik" — g'altak tortib, yakor temirga urilishi               */

function relayClick(seed = 7): Buf {
  const n = Math.round(0.11 * SR);
  const out = makeBuf(0.11);

  // (a) yakorning metallga urilishi — tor polosali shovqin portlashi
  const burst = noise(n, seed);
  for (let i = 0; i < n; i++) burst[i] *= env(i, n, 0.0004, 0.006);
  const metal = svf(burst, () => 2600, 0.35, "bp");
  mix(out, metal, 1.0);

  // (b) korpusning past "tuk" i
  const body = osc(n, (i) => 190 - 60 * (i / n), "sin");
  for (let i = 0; i < n; i++) body[i] *= env(i, n, 0.0006, 0.018);
  mix(out, body, 0.55);

  // (c) kontakt plastinkasining qisqa jiringlashi
  const ring = osc(n, () => 5200, "sin");
  for (let i = 0; i < n; i++) ring[i] *= env(i, n, 0.0002, 0.004);
  mix(out, ring, 0.22);

  softClip(out, 1.4);
  return out;
}

/* 2. UI tap — yumshoq, qisqa */

function uiTap(): Buf {
  const n = Math.round(0.055 * SR);
  const out = makeBuf(0.055);
  const t = osc(n, (i) => 1500 - 500 * (i / n), "sin");
  for (let i = 0; i < n; i++) t[i] *= env(i, n, 0.0005, 0.009);
  mix(out, t, 0.9);
  const air = svf(noise(n, 21), () => 4200, 0.5, "bp");
  for (let i = 0; i < n; i++) air[i] *= env(i, n, 0.0003, 0.004);
  mix(out, air, 0.25);
  return out;
}

/* 3. Past "bzzz" — transformator/tok guvillashi (sikl bo'ladi) */

function bzzz(seconds = 2): Buf {
  const n = Math.round(seconds * SR);
  const out = makeBuf(seconds);
  // 50 Hz asos + juft garmonikalar (tarmoq guvillashi shunday eshitiladi)
  for (const [h, g] of [[1, 1], [2, 0.55], [3, 0.3], [4, 0.18], [6, 0.1]] as const) {
    mix(out, osc(n, () => 50 * h, h === 1 ? "sin" : "tri"), g * 0.5);
  }
  // sekin amplituda tebranishi — "tirik" tuyulishi uchun
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    out[i] *= 0.8 + 0.2 * Math.sin(2 * Math.PI * 3.1 * t) * Math.sin(2 * Math.PI * 0.7 * t);
  }
  // ozgina elektrostatik shitirlash
  const hiss = svf(noise(n, 99), () => 1800, 1.2, "bp");
  mix(out, hiss, 0.06);
  softClip(out, 1.2);
  return out;
}

/* 4. Whoosh — o'tish */

function whoosh(seconds = 0.5): Buf {
  const n = Math.round(seconds * SR);
  const out = makeBuf(seconds);
  const src = noise(n, 1234);
  // chastota pastdan yuqoriga va qaytib pastga — "o'tib ketish" hissi
  const swept = svf(
    src,
    (i) => {
      const t = i / n;
      const curve = Math.sin(Math.PI * t) ** 1.5;
      return 220 + curve * 5200;
    },
    0.55,
    "bp",
  );
  for (let i = 0; i < n; i++) {
    const t = i / n;
    swept[i] *= Math.sin(Math.PI * t) ** 1.8;
  }
  mix(out, swept, 1);
  return out;
}

/* 5. Qisqa tutashuv uchquni — tartibsiz yoriqlar */

function cracks(seconds = 0.7): Buf {
  const n = Math.round(seconds * SR);
  const out = makeBuf(seconds);
  const r = rng(4242);

  // 18–26 ta tasodifiy mikro-razryad
  const count = 18 + Math.floor(r() * 9);
  for (let k = 0; k < count; k++) {
    const at = Math.floor(r() ** 1.7 * n * 0.9);
    const len = Math.round((0.004 + r() * 0.02) * SR);
    const spark = noise(len, 1000 + k * 37);
    const f = 1500 + r() * 5500;
    const filt = svf(spark, () => f, 0.3 + r() * 0.4, "bp");
    for (let i = 0; i < len; i++) filt[i] *= env(i, len, 0.0002, 0.003 + r() * 0.006);
    mix(out, filt, 0.5 + r() * 0.5, at);
  }

  // ularning ostida past elektr guvillashi
  const hum = osc(n, () => 100, "saw");
  for (let i = 0; i < n; i++) hum[i] *= decay(i / SR, 0.18) * 0.4;
  mix(out, svf(hum, () => 700, 0.8, "lp"), 0.5);

  softClip(out, 1.6);
  return out;
}

/* 6. BAM — qisqa tutashuv zarbasi (hook uchun) */

function boom(seconds = 0.9): Buf {
  const n = Math.round(seconds * SR);
  const out = makeBuf(seconds);

  // past sinus pastga sirpanadi
  const sub = osc(n, (i) => 95 * Math.pow(0.35, i / n), "sin");
  for (let i = 0; i < n; i++) sub[i] *= decay(i / SR, 0.22);
  mix(out, sub, 1);

  // zarba oldidagi "qarsillash"
  const hit = svf(noise(Math.round(0.08 * SR), 777), () => 900, 0.4, "bp");
  for (let i = 0; i < hit.length; i++) hit[i] *= env(i, hit.length, 0.0003, 0.02);
  mix(out, hit, 0.8);

  // orqasidan uchqunlar
  mix(out, cracks(0.5), 0.35, Math.round(0.05 * SR));

  softClip(out, 1.3);
  return out;
}

/* 7. Avariya signali — qo'pol ikki tonli */

function alarm(seconds = 1.1): Buf {
  const n = Math.round(seconds * SR);
  const out = makeBuf(seconds);
  // 0.14 s davriylik bilan 440 ↔ 330 Hz almashadi
  const period = 0.14;
  const f = (i: number) => (Math.floor(i / SR / period) % 2 === 0 ? 440 : 326);
  const a = osc(n, f, "sqr");
  const b = osc(n, (i) => f(i) * 1.5, "sqr");
  for (let i = 0; i < n; i++) {
    const g = Math.min(1, i / (0.01 * SR)) * Math.min(1, (n - i) / (0.08 * SR));
    a[i] *= g;
    b[i] *= g * 0.35;
  }
  mix(out, svf(a, () => 2200, 0.7, "lp"), 0.8);
  mix(out, svf(b, () => 3000, 0.9, "lp"), 0.4);
  softClip(out, 1.8);
  return out;
}

/* 8. Yashil "ding" — to'g'ri javob */

function ding(): Buf {
  const sec = 0.75;
  const n = Math.round(sec * SR);
  const out = makeBuf(sec);
  // mayor uchligi: 880 / 1108 / 1320
  for (const [f, g, tau] of [[880, 1, 0.3], [1108.7, 0.6, 0.26], [1320, 0.45, 0.22]] as const) {
    const t = osc(n, () => f, "sin");
    for (let i = 0; i < n; i++) t[i] *= env(i, n, 0.002, tau);
    mix(out, t, g);
  }
  // nozik "shisha" zarbasi
  const tick = svf(noise(Math.round(0.02 * SR), 31), () => 6000, 0.3, "bp");
  for (let i = 0; i < tick.length; i++) tick[i] *= env(i, tick.length, 0.0002, 0.004);
  mix(out, tick, 0.3);
  return out;
}

/* 9. Tok impulsi (surge) — yo'l xaritasi, zanjir yopilishi */

function surge(): Buf {
  const sec = 0.8;
  const n = Math.round(sec * SR);
  const out = makeBuf(sec);
  // pastdan yuqoriga ko'tariluvchi sirpanish
  const sweep = osc(n, (i) => 110 * Math.pow(9, i / n), "tri");
  for (let i = 0; i < n; i++) {
    const t = i / n;
    sweep[i] *= Math.min(1, t * 6) * (1 - t) ** 0.6;
  }
  mix(out, sweep, 0.8);
  // ustidan elektr shitirlashi
  const fizz = svf(noise(n, 555), (i) => 600 + 5000 * (i / n), 0.5, "bp");
  for (let i = 0; i < n; i++) fizz[i] *= (1 - i / n) ** 1.6 * 0.5;
  mix(out, fizz, 0.5);
  // oxirida kontakt kliki
  mix(out, relayClick(13), 0.7, Math.round(0.62 * SR));
  softClip(out, 1.2);
  return out;
}

/* 10. Daraja/nishon ohangi */

function levelUp(): Buf {
  const sec = 1.1;
  const out = makeBuf(sec);
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
  notes.forEach((f, k) => {
    const len = Math.round(0.5 * SR);
    const t = osc(len, () => f, "sin");
    const t2 = osc(len, () => f * 2, "sin");
    for (let i = 0; i < len; i++) {
      const e = env(i, len, 0.004, 0.22);
      t[i] *= e;
      t2[i] *= e * 0.3;
    }
    mix(out, t, 0.7, Math.round(k * 0.1 * SR));
    mix(out, t2, 0.7, Math.round(k * 0.1 * SR));
  });
  return out;
}

/* ------------------------------------------------------------------ */

mkdirSync(OUT, { recursive: true });
console.log("SFX →", OUT);

save("relay-click.wav", relayClick());
save("tap.wav", uiTap());
save("bzzz.wav", bzzz(2));
save("whoosh.wav", whoosh(0.5));
save("crack.wav", cracks(0.7));
save("boom.wav", boom(0.9));
save("alarm.wav", alarm(1.1));
save("ding.wav", ding());
save("surge.wav", surge());
save("levelup.wav", levelUp());

console.log("Tayyor.");
