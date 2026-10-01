import { LECTURES } from "./lectures";

/** Yo'l xaritasi geometriyasi — ma'ruzalar podstansiya tugunlari sifatida.
 *  Tugunlar "ilon" (boustrophedon) tartibida joylashadi: chapdan o'ngga,
 *  keyin pastga, so'ng o'ngdan chapga — elektr tarmog'i sxemasi kabi. */

export const MAP_W = 320;
const COL_L = 74;
const COL_R = 246;
const ROW_H = 96;
const TOP = 54;

export const NODE_W = 104;
export const NODE_H = 54;

export interface PathNode {
  lec: number;
  x: number;
  y: number;
  color: string;
}

/** Tugunlar ro'yxati (LECTURES tartibida). */
export const PATH_NODES: PathNode[] = LECTURES.map((L, i) => {
  const row = Math.floor(i / 2);
  const leftFirst = row % 2 === 0;
  const isFirstInRow = i % 2 === 0;
  const x = leftFirst ? (isFirstInRow ? COL_L : COL_R) : isFirstInRow ? COL_R : COL_L;
  return { lec: L.id, x, y: TOP + row * ROW_H, color: L.color };
});

export const MAP_H = TOP + Math.ceil(LECTURES.length / 2) * ROW_H + 10;

/** Ikki tugun orasidagi liniya (to'g'ri burchakli, shina ko'rinishida). */
export function segmentPath(a: PathNode, b: PathNode): string {
  if (a.y === b.y) {
    // gorizontal: qutilar chekkasidan chekkasiga
    const x1 = a.x < b.x ? a.x + NODE_W / 2 : a.x - NODE_W / 2;
    const x2 = a.x < b.x ? b.x - NODE_W / 2 : b.x + NODE_W / 2;
    return `M ${x1} ${a.y} L ${x2} ${b.y}`;
  }
  // vertikal: pastga tushib, keyingi qatorga
  const y1 = a.y + NODE_H / 2;
  const y2 = b.y - NODE_H / 2;
  return `M ${a.x} ${y1} L ${a.x} ${(y1 + y2) / 2} L ${b.x} ${(y1 + y2) / 2} L ${b.x} ${y2}`;
}

/** Ketma-ket segmentlar ro'yxati. */
export const PATH_SEGMENTS = PATH_NODES.slice(0, -1).map((n, i) => ({
  from: n.lec,
  to: PATH_NODES[i + 1].lec,
  d: segmentPath(n, PATH_NODES[i + 1]),
}));
