import type { Quiz } from "../../types";
import { QUIZ1 } from "./part1";
import { QUIZ2 } from "./part2";
import { QUIZ3 } from "./part3";
import { QUIZ4 } from "./part4";

/** Barcha test savollari. Global indeks progress kaliti sifatida ishlatiladi. */
export const QUIZZES: Quiz[] = [...QUIZ1, ...QUIZ2, ...QUIZ3, ...QUIZ4];

export function quizzesOf(lecture: number): Array<{ q: Quiz; i: number }> {
  return QUIZZES.map((q, i) => ({ q, i })).filter((x) => x.q.l === lecture);
}
