import { useMemo, useRef, useState } from "react";
import { DigitalDisplay, Led, Panel, PhysButton } from "../components/Panel";
import { CIRCUITS, acceptOf, circuitById, slotIds } from "../data/circuits";
import { lecById } from "../data/lectures";
import { useI18n } from "../i18n";
import { useReducedMotion } from "../lib/anim";
import { alarmFlash, confetti, fxAlarm, fxSwitch, fxTap, spark } from "../lib/fx";
import { CircuitView } from "../lib/svg";
import * as St from "../store";
import { BackBtn, LecBadge, Tile, useDiffLabel, useNav } from "../ui";
import type { CircuitPart } from "../types";

export default function Circuit({ id }: { id?: string }) {
  const { t, x } = useI18n();
  const { go } = useNav();
  const diffLabel = useDiffLabel();

  /* ---------- Sxema tanlash ---------- */
  if (!id) {
    return (
      <div>
        <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
        <Panel label={t("plCircuit")} right={<span className="digit digit-sm digit-blue">{CIRCUITS.length}</span>}>
          <p className="small muted" style={{ margin: 0 }}>{t("pickCircuit")}</p>
        </Panel>
        <div className="stack">
          {CIRCUITS.map((c) => {
            const best = St.S.circuits[c.id];
            const lec = lecById(c.lec);
            return (
              <Tile
                key={c.id} ico="⚡" color={lec.color}
                title={x(c.title)}
                sub={`${t("lectureN", { n: c.lec })} · ${diffLabel(c.diff)}${best !== undefined ? ` · ${t("best", { p: best })}` : ""}`}
                onClick={() => go({ name: "circuit", id: c.id })}
                right={<Led color={best === 100 ? "green" : best !== undefined ? "amber" : "off"} on size={9} />}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const c = circuitById(id);
  if (!c) return <Circuit />;
  return <Builder key={c.id} id={c.id} />;
}

/* ------------------------------------------------------------------ */

function Builder({ id }: { id: string }) {
  const { t, x } = useI18n();
  const { go } = useNav();
  const diffLabel = useDiffLabel();
  const reduce = useReducedMotion();
  const c = circuitById(id)!;

  const [state, setState] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, "ok" | "bad"> | null>(null);
  const [pct, setPct] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const ids = useMemo(() => slotIds(c), [c]);
  const used = useMemo(() => new Set(Object.values(state)), [state]);
  const filled = Object.keys(state).length;

  /* ---------- Drag & drop (pointer events) ---------- */
  const startDrag = (e: React.PointerEvent<HTMLDivElement>, part: CircuitPart) => {
    if (results) return;
    e.preventDefault();
    fxTap();

    const src = e.currentTarget;
    const ghost = src.cloneNode(true) as HTMLDivElement;
    ghost.classList.add("drag-ghost");
    ghost.classList.remove("dragging");
    document.body.appendChild(ghost);
    src.classList.add("dragging");

    let target: Element | null = null;

    const move = (cx: number, cy: number) => {
      ghost.style.left = `${cx}px`;
      ghost.style.top = `${cy}px`;
      let best: Element | null = null;
      boxRef.current?.querySelectorAll("rect[data-slot]").forEach((r) => {
        const b = r.getBoundingClientRect();
        const pad = 16;
        if (cx >= b.left - pad && cx <= b.right + pad && cy >= b.top - pad && cy <= b.bottom + pad) best = r;
        r.classList.remove("over");
      });
      if (best) (best as Element).classList.add("over");
      target = best;
    };
    move(e.clientX, e.clientY);

    const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      ghost.remove();
      src.classList.remove("dragging");
      if (target) {
        const sid = (target as Element).getAttribute("data-slot")!;
        setState((prev) => {
          const next: Record<string, string> = {};
          for (const [k, v] of Object.entries(prev)) if (v !== part.id) next[k] = v;
          next[sid] = part.id;
          return next;
        });
        fxSwitch();
      }
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
  };

  /** Sensorsiz holat uchun: ikki marta bosish birinchi bo'sh slotga qo'yadi. */
  const quickPlace = (part: CircuitPart) => {
    if (results) return;
    const free = ids.find((s) => !state[s]);
    if (!free) return;
    setState((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) if (v !== part.id) next[k] = v;
      next[free] = part.id;
      return next;
    });
    fxSwitch();
  };

  const check = () => {
    const res: Record<string, "ok" | "bad"> = {};
    let okN = 0;
    for (const sid of ids) {
      const good = state[sid] === acceptOf(c, sid);
      res[sid] = good ? "ok" : "bad";
      if (good) okN++;
    }
    const p = Math.round((okN / ids.length) * 100);
    setResults(res);
    setPct(p);
    if (St.S.circuits[c.id] === undefined || p > St.S.circuits[c.id]) St.S.circuits[c.id] = p;
    St.addXp(okN * 8);
    St.checkBadges();
    St.save();

    if (p === 100) {
      confetti(90);
      fxSwitch();
    } else {
      fxAlarm();
      alarmFlash();
      // xato slotlar ustida uchqun
      window.setTimeout(() => {
        boxRef.current?.querySelectorAll("g.sv-bad").forEach((g) => {
          const b = (g as SVGGElement).getBoundingClientRect();
          spark(b.left + b.width / 2, b.top + b.height / 2, 10);
        });
      }, 60);
    }
  };

  const reset = () => { setState({}); setResults(null); };

  return (
    <div>
      <BackBtn label={t("circuitBuilder")} onClick={() => go({ name: "circuit" })} />

      <Panel
        label={`${t("lectureN", { n: c.lec })} · ${diffLabel(c.diff)}`}
        right={<LecBadge id={c.lec} />}
      >
        <h3 style={{ margin: "0 0 4px" }}>{x(c.title)}</h3>
        <div className="tiny muted">{x(c.desc)}</div>
      </Panel>

      <div className="cbox" ref={boxRef}>
        <CircuitView
          circuit={c}
          state={state}
          results={results}
          reduceMotion={reduce}
          x={x}
          onSlotClick={(sid) =>
            setState((prev) => {
              const next = { ...prev };
              delete next[sid];
              return next;
            })
          }
        />
      </div>

      <div className="slot-hint">
        {results ? t("checked") : t("filled", { a: filled, b: ids.length })}
      </div>

      <div className="palette">
        {c.parts.map((p) => (
          <div
            key={p.id}
            className={`part${used.has(p.id) ? " used" : ""}`}
            onPointerDown={(e) => startDrag(e, p)}
            onDoubleClick={() => quickPlace(p)}
          >
            {x(p.name)}
          </div>
        ))}
      </div>

      <div className="grid2">
        {results ? (
          <>
            <PhysButton onClick={reset}>{t("restart")}</PhysButton>
            <PhysButton tone="primary" onClick={() => go({ name: "circuit" })}>{t("otherCircuit")}</PhysButton>
          </>
        ) : (
          <>
            <PhysButton onClick={() => setState({})}>{t("clear")}</PhysButton>
            <PhysButton tone="primary" led={filled >= ids.length ? "green" : "off"}
              disabled={filled < ids.length} onClick={check}>
              {t("check")}
            </PhysButton>
          </>
        )}
      </div>

      {results ? (
        <div style={{ marginTop: 12 }}>
          <div className="result">
            <DigitalDisplay value={pct} unit="%" size="xl" tone={pct === 100 ? "green" : "amber"} />
            <div className="tiny muted" style={{ marginTop: 4 }}>
              {ids.filter((s) => results[s] === "ok").length} / {ids.length}
            </div>
          </div>
          {ids.map((sid) => {
            const good = results[sid] === "ok";
            const want = acceptOf(c, sid);
            const name = c.parts.find((p) => p.id === want)?.name;
            return (
              <div key={sid} className={`explain${good ? "" : " bad"}`}>
                <b>{`${good ? "✓ " : "✗ "}${name ? x(name) : want}: `}</b>
                {x(c.explain[sid])}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
