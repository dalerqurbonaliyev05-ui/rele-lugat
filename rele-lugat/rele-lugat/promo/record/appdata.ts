/**
 * Ilovaning manba fayllaridan yozuv uchun kerakli faktlarni o'qiydi.
 * Shunday qilib kontent o'zgarsa ham skript o'zi moslashadi — hech narsa
 * qo'lda qattiq yozilmaydi.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const APP = join(process.cwd(), "..");

/* ------------------------------------------------------------------ */
/* Test savollari: har ma'ruza uchun to'g'ri javob indekslari           */

export interface QuizAnswer {
  lec: number;
  type: "mcq" | "tf" | "match";
  /** mcq uchun to'g'ri variant indeksi (manba tartibida). */
  a: number | null;
  /** Savolning o'zbekcha matni — ekrandagi savolni tanib olish uchun. */
  question: string;
  /**
   * Variantlarning o'zbekcha matnlari — manba tartibida.
   *
   * Ilova HAM savollarni, HAM variantlarni ekranda aralashtiradi
   * (`Quiz`/`QuizRunner` → `shuffle`), shuning uchun indeks bo'yicha bosib
   * bo'lmaydi: yozuv skripti avval savolni matnidan tanib oladi, so'ng to'g'ri
   * variantni yana matn bo'yicha topadi.
   */
  options: string[];
}

/** `uz: "…"` qiymatini oladi (TS satridagi `\"` va `\\` hisobga olinadi). */
function uzOf(block: string): string | null {
  const m = block.match(/\buz:\s*"((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\(.)/g, "$1") : null;
}

/** `o: [ … ]` massividagi har bir `{…}` elementni ajratadi. */
function optionBlocks(src: string, from: number): string[] {
  const start = src.indexOf("o: [", from);
  if (start < 0) return [];
  let depth = 0;
  let i = start + 3;
  const items: string[] = [];
  let itemStart = -1;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) break;
    } else if (c === "{" && depth === 1) {
      if (itemStart < 0) itemStart = i;
      depth++;
    } else if (c === "}" && depth === 2) {
      depth--;
      if (itemStart >= 0) {
        items.push(src.slice(itemStart, i + 1));
        itemStart = -1;
      }
    } else if (c === "{") depth++;
    else if (c === "}") depth--;
  }
  return items;
}

export function quizAnswers(): QuizAnswer[] {
  const dir = join(APP, "src", "data", "quizzes");
  const files = readdirSync(dir).filter((f) => /^part\d+\.ts$/.test(f)).sort();
  const out: QuizAnswer[] = [];
  for (const f of files) {
    const src = readFileSync(join(dir, f), "utf8");
    const re = /\bl:\s*(\d+),\s*type:\s*"(mcq|tf|match)",\s*a:\s*([^,\n]+)/g;
    for (let m = re.exec(src); m; m = re.exec(src)) {
      const raw = m[3].trim();
      const type = m[2] as QuizAnswer["type"];
      const options =
        type === "mcq"
          ? optionBlocks(src, m.index).map((b) => uzOf(b) ?? "")
          : [];
      /* `q: { uz: "…" }` — `a:` dan keyingi birinchi `uz:`. */
      const qStart = src.indexOf("q: {", m.index);
      const question = qStart < 0 ? "" : uzOf(src.slice(qStart, qStart + 1200)) ?? "";
      out.push({
        lec: Number(m[1]),
        type,
        a: /^\d+$/.test(raw) ? Number(raw) : null,
        question,
        options,
      });
    }
  }
  return out;
}

/** Bitta ma'ruzaning savollari — ilovadagi tartibda. */
export function lectureQuiz(lec: number): QuizAnswer[] {
  return quizAnswers().filter((q) => q.lec === lec);
}

/* ------------------------------------------------------------------ */
/* Sxema: qaysi detal qaysi slotga tushadi                              */

export interface CircuitPlan {
  /** Slot id'lari ilovadagi tartibda. */
  slots: string[];
  /** Slot id → to'g'ri detal id. */
  accept: Record<string, string>;
  /** Palitradagi detallar tartibi. */
  parts: string[];
}

export function circuitPlan(circuitId: string): CircuitPlan {
  const src = readFileSync(join(APP, "src", "data", "circuits", "ladder.ts"), "utf8");
  const start = src.indexOf(`id: "${circuitId}"`);
  if (start < 0) throw new Error(`sxema topilmadi: ${circuitId}`);
  /* Keyingi sxemaning boshlanishigacha bo'lgan bo'lak. */
  const nextIdx = src.slice(start + 1).search(/\n {2}\{\n {4}id: "/);
  const block = src.slice(start, nextIdx < 0 ? undefined : start + 1 + nextIdx);

  const slots: string[] = [];
  const accept: Record<string, string> = {};
  for (const m of block.matchAll(/t:\s*"slot",\s*id:\s*"([^"]+)",\s*accept:\s*"([^"]+)"/g)) {
    slots.push(m[1]);
    accept[m[1]] = m[2];
  }
  const parts: string[] = [];
  for (const m of block.matchAll(/\{\s*id:\s*"([A-Za-z0-9]+)",\s*kind:/g)) parts.push(m[1]);

  if (!slots.length || !parts.length) throw new Error(`sxema o'qilmadi: ${circuitId}`);
  return { slots, accept, parts };
}
