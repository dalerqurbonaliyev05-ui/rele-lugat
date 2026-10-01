/** Umumiy UI komponentlari va marshrutlash konteksti. */
import { createContext, useContext, type ReactNode } from "react";
import { lecById } from "./data/lectures";
import { useI18n } from "./i18n";
import { fxTap } from "./lib/fx";
import type { Difficulty } from "./types";

/* ------------------------------------------------------------------ */
/* Marshrutlash                                                         */

export type Route =
  | { name: "home" }
  | { name: "path" }
  | { name: "daily" }
  | { name: "glossary"; jump?: string; lec?: number }
  | { name: "games" }
  | { name: "calc"; id?: string }
  | { name: "profile" }
  | { name: "flashcards"; ids?: string[]; lec?: number }
  | { name: "quiz"; lec?: number }
  | { name: "exam" }
  | { name: "circuit"; id?: string }
  | { name: "scenario" }
  | { name: "timing" }
  | { name: "logic" }
  | { name: "relay"; reference?: boolean }
  | { name: "mistakes" }
  | { name: "mistakeQuiz" };

interface Nav {
  go: (r: Route) => void;
  toast: (msg: string) => void;
  /** sozlamalar o'zgargach qayta chizish */
  refresh: () => void;
}

export const NavContext = createContext<Nav | null>(null);

export function useNav(): Nav {
  const n = useContext(NavContext);
  if (!n) throw new Error("useNav must be used inside NavContext");
  return n;
}

/* ------------------------------------------------------------------ */
/* Kichik komponentlar                                                  */

export function LecBadge({ id }: { id: number }) {
  const { t } = useI18n();
  const l = lecById(id);
  return (
    <span className="badge badge-lec" style={{ background: l.color }}>
      {t("lectureN", { n: id })}
    </span>
  );
}

export function BackBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="back-btn" onClick={() => { fxTap(); onClick(); }}>
      ‹ {label}
    </button>
  );
}

export function Tile({
  ico, color, title, sub, onClick, right,
}: {
  ico: string; color: string; title: string; sub?: string; onClick: () => void; right?: ReactNode;
}) {
  return (
    <button className="tile" onClick={() => { fxTap(); onClick(); }}>
      <div className="tile-ico" style={{ background: `${color}1f`, color, borderColor: color }}>{ico}</div>
      <div className="tile-body">
        <b>{title}</b>
        {sub ? <small>{sub}</small> : null}
      </div>
      {right}
    </button>
  );
}

export function Progress({ pct, color }: { pct: number; color?: string }) {
  return (
    <div className="progress">
      <i style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function useDiffLabel() {
  const { t } = useI18n();
  return (d: Difficulty) => (d === "easy" ? t("diffEasy") : d === "medium" ? t("diffMedium") : t("diffHard"));
}
