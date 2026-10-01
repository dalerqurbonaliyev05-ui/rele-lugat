import type { Circuit } from "../../types";
import { LADDER_CIRCUITS } from "./ladder";
import { FREE_CIRCUITS } from "./free";

/** Barcha sxemalar. Yangi sxema qo'shish: ladder.ts yoki free.ts ga obyekt qo'shing. */
export const CIRCUITS: Circuit[] = [...LADDER_CIRCUITS, ...FREE_CIRCUITS];

export function circuitById(id: string): Circuit | undefined {
  return CIRCUITS.find((c) => c.id === id);
}

/** Sxemaning barcha slot id'lari (ladder yoki free). */
export function slotIds(c: Circuit): string[] {
  if (c.rungs) {
    const out: string[] = [];
    for (const r of c.rungs) for (const it of r.items) if (it.t === "slot") out.push(it.id);
    return out;
  }
  return (c.slots ?? []).map((s) => s.id);
}

/** Slot qaysi detalni qabul qiladi. */
export function acceptOf(c: Circuit, id: string): string | undefined {
  if (c.rungs) {
    for (const r of c.rungs) for (const it of r.items) if (it.t === "slot" && it.id === id) return it.accept;
    return undefined;
  }
  return (c.slots ?? []).find((s) => s.id === id)?.accept;
}
