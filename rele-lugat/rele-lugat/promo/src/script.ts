/**
 * Reklamaning BARCHA matnlari va vaqtlari.
 *
 * Boshqa joyda qattiq yozilgan matn yo'q — tilni almashtirish uchun faqat
 * `--props='{"lang":"ru"}'` berish kifoya.
 *
 *   npx remotion render Main30 out/rele-reklama-30s-ru.mp4 --props='{"lang":"ru"}'
 */

import { beat, BEAT } from "./beats";

export const LANGS = ["uz", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** Uchala til majburiy — bittasi tushib qolsa TypeScript xato beradi. */
export interface L10n {
  uz: string;
  ru: string;
  en: string;
}

export const tr = (v: L10n, lang: Lang): string => v[lang];

/** Apparat belgilari (KA, KT, KH, YAT, TA, TV) hech qachon tarjima qilinmaydi. */
export const HARDWARE = ["KA", "KT", "KH", "KL", "YAT", "TA", "TV", "SQ", "DW"] as const;

/* ------------------------------------------------------------------ */
/* Matnlar                                                             */

export const SCRIPT = {
  /* --- 0.0–2.5 HOOK --- */
  hook: {
    clock: "02:47", // raqam — tarjima qilinmaydi
    line: {
      uz: "Imtihonga 6 soat qoldi.",
      ru: "До экзамена 6 часов.",
      en: "6 hours until the exam.",
    },
    alarm: { uz: "AVARIYA", ru: "АВАРИЯ", en: "FAULT" },
  },

  /* --- 2.5–5.0 MUAMMO --- */
  problem: {
    /* Boshni aylantiruvchi qisqartmalar — ilovadagi haqiqiy atamalar. */
    chips: [
      { uz: "MTH", ru: "МТЗ", en: "OCP" },
      { uz: "TA", ru: "ТА", en: "TA" },
      { uz: "KV", ru: "KV", en: "KV" },
      { uz: "QT", ru: "КЗ", en: "SC" },
      { uz: "YAT", ru: "ЯТ", en: "YAT" },
      { uz: "TV", ru: "ТV", en: "TV" },
      { uz: "KH", ru: "KH", en: "KH" },
      { uz: "Δt", ru: "Δt", en: "Δt" },
    ],
    q: {
      uz: "Rele himoyasi qiyinmi?",
      ru: "Релейная защита сложная?",
      en: "Is relay protection hard?",
    },
    no: { uz: "Yo'q.", ru: "Нет.", en: "No." },
    a: {
      uz: "Faqat noto'g'ri o'rganilgan.",
      ru: "Просто её не так учили.",
      en: "It was just taught wrong.",
    },
  },

  /* --- 5.0–8.0 YECHIM --- */
  solution: {
    line: {
      uz: "Barcha atamalar — cho'ntagingda.",
      ru: "Все термины — в кармане.",
      en: "Every term — in your pocket.",
    },
    /* Raqamlar ilovadagi haqiqiy sonlar. */
    stats: [
      { n: 214, label: { uz: "atama", ru: "термина", en: "terms" } },
      { n: 170, label: { uz: "savol", ru: "вопроса", en: "questions" } },
      { n: 24, label: { uz: "sxema", ru: "схемы", en: "circuits" } },
    ],
  },

  /* --- 8.0–13.0 O'YIN 1 --- */
  game1: {
    line: { uz: "Sxemani o'zing yig'.", ru: "Собери схему сам.", en: "Build the circuit yourself." },
    tag: { uz: "SXEMA KONSTRUKTORI", ru: "КОНСТРУКТОР СХЕМ", en: "CIRCUIT BUILDER" },
    done: { uz: "ZANJIR YOPILDI", ru: "ЦЕПЬ ЗАМКНУТА", en: "CIRCUIT CLOSED" },
  },

  /* --- 13.0–17.0 O'YIN 2 --- */
  game2: {
    line: {
      uz: "Xato qilsang ham — o'rganasan.",
      ru: "Ошибся — всё равно выучил.",
      en: "Get it wrong — still learn it.",
    },
    bad: { uz: "XATO", ru: "ОШИБКА", en: "WRONG" },
    good: { uz: "TO'G'RI", ru: "ВЕРНО", en: "CORRECT" },
    hint: {
      uz: "Har xatoda ma'ruzadan tushuntirish chiqadi",
      ru: "После ошибки — объяснение из лекции",
      en: "Every mistake shows the lecture's explanation",
    },
  },

  /* --- 17.0–21.0 YO'L XARITASI --- */
  path: {
    line: {
      uz: "Har ma'ruza — yangi podstansiya.",
      ru: "Каждая лекция — новая подстанция.",
      en: "Every lecture — a new substation.",
    },
    connected: { uz: "ULANDI", ru: "ПОДКЛЮЧЕНО", en: "CONNECTED" },
  },

  /* --- 21.0–25.0 NATIJA --- */
  result: {
    line: { uz: "Imtihonga tayyor.", ru: "К экзамену готов.", en: "Exam ready." },
    streak: { uz: "7 kunlik seriya", ru: "7 дней подряд", en: "7-day streak" },
    /* Daraja nomi ilovadagi bilan bir xil (XP 1240 → 3-daraja). */
    level: { uz: "Muhandis", ru: "Инженер", en: "Engineer" },
    levelTag: { uz: "DARAJA OCHILDI", ru: "НОВЫЙ УРОВЕНЬ", en: "LEVEL UP" },
  },

  /* --- 25.0–28.0 PAYOFF --- */
  payoff: {
    l1: { uz: "Chiroq o'chmadi.", ru: "Свет не погас.", en: "The lights stayed on." },
    l2: { uz: "Sen tayyorsan.", ru: "Ты готов.", en: "You're ready." },
  },

  /* --- 28.0–30.0 CTA --- */
  cta: {
    name: "Rele Lug'at", // brend nomi — tarjima qilinmaydi
    apk: { uz: "Android uchun APK", ru: "APK для Android", en: "APK for Android" },
    hook: {
      uz: "30 soniyada sxemani yig'a olasanmi?",
      ru: "Соберёшь схему за 30 секунд?",
      en: "Can you build the circuit in 30 seconds?",
    },
    try: { uz: "Yig'ib ko'r.", ru: "Попробуй.", en: "Try it." },
    offline: { uz: "100% offline", ru: "100% офлайн", en: "100% offline" },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Subtitrlar — tovushsiz ko'radiganlar uchun doim ekranda              */

export type SceneName =
  | "hook" | "problem" | "solution" | "game1" | "game2" | "path" | "result" | "payoff" | "cta";

/**
 * Har sahnaning subtitri sahna ICHIDA chiziladi, shuning uchun 30 s va 15 s
 * variantlarda ham, kvadrat formatda ham o'z-o'zidan to'g'ri joyga tushadi.
 */
export const SCENE_SUB: Record<SceneName, L10n> = {
  hook: SCRIPT.hook.line,
  problem: SCRIPT.problem.a,
  solution: SCRIPT.solution.line,
  game1: SCRIPT.game1.line,
  game2: SCRIPT.game2.line,
  path: SCRIPT.path.line,
  result: SCRIPT.result.line,
  payoff: SCRIPT.payoff.l2,
  cta: SCRIPT.cta.hook,
};

/* ------------------------------------------------------------------ */
/* Ovoz effektlari — vaqtlar SAHNA boshidan hisoblanadi                 */

export interface Cue {
  /** `public/sfx/` ichidagi fayl. */
  file: string;
  /** Sahna boshidan necha kadrdan keyin. */
  at: number;
  volume?: number;
  playbackRate?: number;
}

/** Musiqasiz ham to'liq eshitiladigan ovoz qatlami. */
export const SFX: Record<SceneName, Cue[]> = {
  hook: [
    { file: "bzzz.wav", at: 0, volume: 0.3 },
    { file: "crack.wav", at: beat(2), volume: 0.55 },
    { file: "crack.wav", at: beat(3) + 4, volume: 0.4, playbackRate: 1.3 },
    { file: "boom.wav", at: beat(4), volume: 1 },
    { file: "alarm.wav", at: beat(4) + 5, volume: 0.6 },
  ],
  problem: [
    { file: "whoosh.wav", at: 0, volume: 0.55 },
    { file: "tap.wav", at: Math.round(BEAT / 2), volume: 0.35 },
    { file: "tap.wav", at: BEAT, volume: 0.35, playbackRate: 1.2 },
    { file: "tap.wav", at: Math.round(BEAT * 1.5), volume: 0.35, playbackRate: 0.9 },
    { file: "crack.wav", at: beat(2), volume: 0.5 },
  ],
  solution: [
    { file: "whoosh.wav", at: 0, volume: 0.6 },
    { file: "relay-click.wav", at: beat(1), volume: 0.7 },
    { file: "surge.wav", at: beat(4) - 6, volume: 0.6 },
  ],
  game1: [
    { file: "whoosh.wav", at: 0, volume: 0.5 },
    { file: "relay-click.wav", at: 24, volume: 0.8 },
    { file: "relay-click.wav", at: 54, volume: 0.8, playbackRate: 1.08 },
    { file: "relay-click.wav", at: 84, volume: 0.8, playbackRate: 0.94 },
    { file: "surge.wav", at: 90, volume: 0.85 },
    { file: "ding.wav", at: 104, volume: 0.7 },
  ],
  game2: [
    { file: "whoosh.wav", at: 0, volume: 0.5 },
    { file: "tap.wav", at: beat(1) - 3, volume: 0.5 },
    { file: "alarm.wav", at: beat(1), volume: 0.8 },
    { file: "crack.wav", at: beat(1) + 2, volume: 0.45 },
    { file: "tap.wav", at: beat(4) - 3, volume: 0.5 },
    { file: "ding.wav", at: beat(4), volume: 0.85 },
  ],
  path: [
    { file: "whoosh.wav", at: 0, volume: 0.5 },
    { file: "surge.wav", at: beat(1), volume: 0.5 },
    { file: "surge.wav", at: beat(3), volume: 0.45, playbackRate: 1.15 },
    { file: "relay-click.wav", at: beat(5), volume: 0.75 },
  ],
  result: [
    { file: "whoosh.wav", at: 0, volume: 0.5 },
    { file: "tap.wav", at: beat(2), volume: 0.4 },
    { file: "tap.wav", at: beat(2) + 7, volume: 0.4, playbackRate: 1.1 },
    { file: "tap.wav", at: beat(2) + 14, volume: 0.4, playbackRate: 1.2 },
    { file: "levelup.wav", at: beat(5), volume: 0.8 },
  ],
  payoff: [
    { file: "whoosh.wav", at: 0, volume: 0.4, playbackRate: 0.8 },
    { file: "relay-click.wav", at: beat(2), volume: 0.6 },
    { file: "bzzz.wav", at: beat(2), volume: 0.16 },
  ],
  cta: [
    { file: "surge.wav", at: 0, volume: 0.7 },
    { file: "relay-click.wav", at: beat(1), volume: 0.6 },
    { file: "boom.wav", at: beat(3) + 9, volume: 0.5, playbackRate: 1.4 },
  ],
};

/* ------------------------------------------------------------------ */
/* Sahna ichidagi mayda vaqtlar (sahna boshidan hisoblanadi, kadrda)    */

export const T = {
  hook: {
    clockIn: 0,
    lineIn: beat(1),
    flicker: beat(2), //  1.0 s — chiroq pirpiray boshlaydi
    bam: beat(4), //  2.0 s — qisqa tutashuv
    alarmIn: beat(4) + 4,
  },
  problem: {
    /* Sakkizta qisqartma to'qnashuvgacha (beat 2 = 30 kadr) ulgurishi kerak. */
    chipStep: Math.floor(beat(2) / SCRIPT.problem.chips.length),
    crash: beat(2), // qisqartmalar to'qnashadi
    qIn: beat(2),
    noIn: beat(3),
    aIn: beat(3) + 6,
  },
  solution: {
    phoneIn: 0,
    clipIn: beat(1),
    statsIn: beat(3),
    lampOn: beat(4),
  },
  game1: {
    clipIn: 0,
    tagIn: beat(1),
    lineIn: beat(2),
    doneIn: beat(8), // zanjir yopilgan payt
  },
  game2: {
    clipIn: 0,
    badIn: beat(1),
    splitIn: beat(3),
    goodIn: beat(4),
    lineIn: beat(5),
    hintIn: beat(6),
  },
  path: {
    clipIn: 0,
    lineIn: beat(1),
    connectedIn: beat(5),
  },
  result: {
    ringIn: 0,
    xpIn: beat(2),
    streakIn: beat(4),
    levelIn: beat(5),
    lineIn: beat(6),
  },
  payoff: {
    roomIn: 0,
    lampFull: beat(2),
    l1In: beat(2),
    l2In: beat(3) + 6,
  },
  cta: {
    logoIn: 0,
    nameIn: beat(0) + 5,
    apkIn: beat(1),
    hookIn: beat(2),
    pulse: beat(3) + 9, // oxirgi 0.5 s
  },
} as const;

/* ------------------------------------------------------------------ */
/* Yozib olingan kliplar — ilovaning haqiqiy ekranlari                  */

export interface ClipDef {
  /** `public/clips/` ichidagi fayl nomi. */
  file: string;
  /** Klipning qaysi soniyasidan boshlanadi. */
  startFrom: number;
  /** Tezlik koeffitsienti (speed ramp uchun asos). */
  speed: number;
}

export const CLIPS = {
  home: { file: "clip-home.mp4", startFrom: 0, speed: 1.6 },
  circuit: { file: "clip-circuit.mp4", startFrom: 0, speed: 1.35 },
  quiz: { file: "clip-quiz.mp4", startFrom: 0, speed: 1.3 },
  path: { file: "clip-path.mp4", startFrom: 0, speed: 1.5 },
  flash: { file: "clip-flash.mp4", startFrom: 0, speed: 1.4 },
  calc: { file: "clip-calc.mp4", startFrom: 0, speed: 1.5 },
} satisfies Record<string, ClipDef>;

export type ClipId = keyof typeof CLIPS;
