import { useEffect, useMemo, useRef, useState } from "react";
import { GLOSSARY, termById } from "../data/glossary";
import { LECTURES } from "../data/lectures";
import { useI18n } from "../i18n";
import { fxTap } from "../lib/fx";
import * as St from "../store";
import { LecBadge } from "../ui";
import type { Term } from "../types";

export default function Glossary({ jump, lec: lec0 }: { jump?: string; lec?: number }) {
  const { t, x, lang } = useI18n();
  const [q, setQ] = useState("");
  const [lec, setLec] = useState(lec0 ?? 0);
  const [favOnly, setFavOnly] = useState(false);
  const [, force] = useState(0);
  const [hi, setHi] = useState<string | null>(jump ?? null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (favOnly && !St.S.fav[g.id]) return false;
      if (lec && g.l !== lec) return false;
      if (!needle) return true;
      const hay = `${x(g.t)} ${x(g.f)} ${x(g.d)} ${x(g.u)}`.toLowerCase();
      return hay.includes(needle);
    }).sort((a, b) => a.l - b.l || x(a.t).localeCompare(x(b.t), lang));
  }, [q, lec, favOnly, x, lang]);

  useEffect(() => {
    if (!hi) return;
    const node = listRef.current?.querySelector(`#t-${CSS.escape(hi)}`);
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setHi(null), 1400);
    return () => clearTimeout(timer);
  }, [hi, items]);

  const goTo = (id: string) => {
    setQ("");
    setLec(0);
    setFavOnly(false);
    setHi(id);
  };

  const toggleFav = (id: string) => {
    if (St.S.fav[id]) delete St.S.fav[id];
    else St.S.fav[id] = true;
    St.save();
    fxTap();
    force((n) => n + 1);
  };

  return (
    <div>
      <div className="search-wrap">
        <input type="search" placeholder={t("searchPlaceholder")} value={q}
          onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="chip-row">
        <button className={`chip${lec === 0 && !favOnly ? " on" : ""}`}
          onClick={() => { setLec(0); setFavOnly(false); }}>{t("all")}</button>
        <button className={`chip${favOnly ? " on" : ""}`}
          onClick={() => { setFavOnly((v) => !v); setLec(0); }}>★ {t("favorites")}</button>
        {LECTURES.map((L) => (
          <button key={L.id} className={`chip${lec === L.id ? " on" : ""}`}
            onClick={() => { setLec(lec === L.id ? 0 : L.id); setFavOnly(false); }}>
            {t("lectureN", { n: L.id })}
          </button>
        ))}
      </div>

      <div className="tiny muted" style={{ margin: "2px 0 10px" }}>
        {t("termsCount", { n: items.length })}
        {lec ? ` · ${t("lectureN", { n: lec })}` : ""}
        {favOnly ? ` · ${t("favorites")}` : ""}
      </div>

      <div ref={listRef}>
        {items.length === 0 ? (
          <div className="empty">
            <div className="big">🔍</div>
            <div>{t("nothingFound")}</div>
          </div>
        ) : (
          items.map((g) => (
            <TermCard key={g.id} g={g} hi={hi === g.id} onFav={() => toggleFav(g.id)} onGo={goTo} />
          ))
        )}
      </div>
    </div>
  );
}

function TermCard({ g, hi, onFav, onGo }: { g: Term; hi: boolean; onFav: () => void; onGo: (id: string) => void }) {
  const { t, x } = useI18n();
  const srs = St.srsOf(g.id);
  const isFav = !!St.S.fav[g.id];

  return (
    <div className={`term${hi ? " hi" : ""}`} id={`t-${g.id}`}>
      <div className="term-head">
        <div className="term-t">
          {x(g.t)}
          {g.f ? <div className="term-f">{x(g.f)}</div> : null}
        </div>
        <button className="fav" onClick={onFav} aria-label="favorite">{isFav ? "★" : "☆"}</button>
      </div>
      <div className="term-d">{x(g.d)}</div>
      {g.u ? <div className="tiny muted" style={{ marginTop: 6 }}>{t("usedIn")} {x(g.u)}</div> : null}
      <div className="term-meta">
        <LecBadge id={g.l} />
        {srs.box >= 4 ? <span className="badge badge-soft">✓ {t("learned")}</span> : null}
        {(g.r ?? []).map((rid) => {
          const other = termById(rid);
          if (!other) return null;
          return (
            <button key={rid} className="rel-link" onClick={() => onGo(rid)}>
              {x(other.t)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
