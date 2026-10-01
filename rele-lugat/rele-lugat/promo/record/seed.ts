/**
 * Yozib olishdan oldingi "chiroyli" holat.
 *
 * Reklamada bo'sh ekran ko'rinmasligi kerak: Aziz, 7 kunlik seriya, 1240 XP
 * (daraja — Muhandis), Yo'l xaritasida 1-5 ma'ruza yashil, 6-si sariq miltillaydi.
 *
 * Qiymatlar ilovaning haqiqiy `State` tipiga mos (`src/store.ts`).
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const APP = join(process.cwd(), "..");

/** Haqiqiy atama id'larini manba fayllardan o'qiydi (soxta id ishlatmaymiz). */
export function glossaryIds(): string[] {
  const dir = join(APP, "src", "data", "glossary");
  const ids: string[] = [];
  for (const f of readdirSync(dir)) {
    if (!/^part\d+\.ts$/.test(f)) continue;
    const src = readFileSync(join(dir, f), "utf8");
    for (const m of src.matchAll(/\bid:\s*"([a-z0-9_-]+)"/gi)) ids.push(m[1]);
  }
  return ids;
}

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function buildSeed(): Record<string, unknown> {
  const now = new Date();
  const today = iso(now);
  const ids = glossaryIds();

  /* --- Oraliqli takrorlash: 34 ta atama "o'rganilgan" qutilarda --- */
  const srs: Record<string, { box: number; due: string; seen: number }> = {};
  ids.slice(0, 34).forEach((id, i) => {
    const box = 4 + (i % 2); // 4 yoki 5 → learnedCount() ≥ 25
    const due = new Date(now);
    due.setDate(due.getDate() + 1 + (i % 6));
    srs[id] = { box, due: iso(due), seen: 3 + (i % 4) };
  });

  /* --- Yo'l xaritasi: 1-5 yakunlangan, 6 boshlangan (sariq miltillaydi) --- */
  const path: Record<number, Record<string, true>> = {};
  for (const l of [1, 2, 3, 4, 5]) path[l] = { terms: true, cards: true, quiz: true };
  path[6] = { terms: true };

  /* --- Ma'ruza bo'yicha test progressi (har ma'ruzada 11 savol) --- */
  const quizDone: Record<string, true> = {};
  const lecStat: Record<number, { ok: number; bad: number }> = {};
  for (const l of [1, 2, 3, 4, 5]) {
    const n = l <= 3 ? 11 : 9;
    for (let i = 0; i < n; i++) quizDone[`l${l}#${i}`] = true;
    lecStat[l] = { ok: n, bad: l === 4 ? 2 : 1 };
  }
  lecStat[6] = { ok: 4, bad: 1 };

  return {
    name: "Aziz",
    theme: "dark",
    /* Yozuv paytida ilovaning o'z ovozi va vibratsiyasi kerak emas —
       SFX ni reklamaga Remotion qo'shadi. */
    sound: false,
    vibro: false,
    path,
    dailyDone: "",
    xp: 1240, // → 3-daraja: "Muhandis"
    streak: 7,
    lastDay: today,
    bestStreak: 7,
    fav: Object.fromEntries(ids.slice(0, 6).map((id) => [id, true])),
    srs,
    quizDone,
    quizStat: { ok: 128, bad: 19 },
    lecStat,
    /* Ikkita xato — "Xatolar daftari" paneli bo'sh turmasin. */
    mistakes: [
      { kind: "quiz", key: "l5#3", ts: Date.now() - 86_400_000 },
      { kind: "term", key: ids[40] ?? "rele", ts: Date.now() - 3_600_000 },
    ],
    /* mth-struct ataylab yo'q — uni yozuvda jonli yig'amiz. */
    circuits: { "rh-struct": 100, "kt-kh": 100, "kh-parallel": 100, "mth-1relay": 80 },
    /* Allaqachon olingan nishonlar — yozuv o'rtasida kutilmagan toast chiqmasin. */
    badges: {
      first: true, q50: true, streak3: true, streak7: true,
      srs25: true, circ1: true, exam80: true, lvl2: true,
    },
    examBest: 88,
    dayTerm: { day: "", id: "" },
  };
}
