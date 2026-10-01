import type { Term } from "../../types";
import { PART1 } from "./part1";
import { PART2 } from "./part2";
import { PART3 } from "./part3";
import { PART4 } from "./part4";

/** Barcha atamalar. Yangi atama qo'shish uchun tegishli part faylini tahrirlang. */
export const GLOSSARY: Term[] = [...PART1, ...PART2, ...PART3, ...PART4];

const BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]));

export function termById(id: string): Term | undefined {
  return BY_ID.get(id);
}
