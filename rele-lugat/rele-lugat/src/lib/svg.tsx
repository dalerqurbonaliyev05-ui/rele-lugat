/** Sxemalarni toza SVG bilan chizish (React komponentlari).
 *  Ma'ruzadagi rasmlar nusxa ko'chirilmagan — belgilar qaytadan chizilgan. */
import { Fragment, type ReactNode } from "react";
import type { Circuit, DrawOp, L10n, Network, PartKind, RungItem } from "../types";

/* ------------------------------------------------------------------ */
/* Asosiy primitivlar                                                   */

const L = (x1: number, y1: number, x2: number, y2: number, key?: string | number) => (
  <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} className="sv-line" />
);

const Dot = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r={2.6} className="sv-dot" />
);

function Txt({
  x, y, children, s, b, anchor = "middle", cls = "sv-txt",
}: {
  x: number; y: number; children: ReactNode; s?: number; b?: boolean;
  anchor?: "start" | "middle" | "end"; cls?: string;
}) {
  return (
    <text x={x} y={y} className={cls} textAnchor={anchor} fontWeight={b ? 700 : 500} fontSize={s}>
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* Belgilar                                                             */

function SymCoil({ cx, cy, w, label }: { cx: number; cy: number; w: number; label: string }) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - 14} width={w} height={28} rx={3} className="sv-part" />
      <Txt x={cx} y={cy + 4} s={11} b>{label}</Txt>
    </>
  );
}

function SymBlk({ cx, cy, w, label }: { cx: number; cy: number; w: number; label: string }) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - 16} width={w} height={32} rx={6} className="sv-part" />
      <Txt x={cx} y={cy + 4} s={11} b>{label}</Txt>
    </>
  );
}

function SymNo({ cx, cy, w, label }: { cx: number; cy: number; w: number; label?: string }) {
  const x = cx - w / 2, x2 = cx + w / 2, p = 7;
  return (
    <>
      {L(x, cy, x + p, cy, "a")}
      {L(x2 - p, cy, x2, cy, "b")}
      {L(x + p, cy, x2 - p, cy - 11, "c")}
      <Dot x={x + p} y={cy} />
      <Dot x={x2 - p} y={cy} />
      {label ? <Txt x={cx} y={cy - 16} s={10.5} b>{label}</Txt> : null}
    </>
  );
}

function SymNc({ cx, cy, w, label }: { cx: number; cy: number; w: number; label?: string }) {
  const x = cx - w / 2, x2 = cx + w / 2, p = 7;
  return (
    <>
      {L(x, cy, x + p, cy, "a")}
      {L(x2 - p, cy, x2, cy, "b")}
      {L(x + p, cy, x2 - p, cy, "c")}
      {L(x2 - p - 3, cy - 9, x2 - p + 3, cy + 3, "d")}
      <Dot x={x + p} y={cy} />
      <Dot x={x2 - p} y={cy} />
      {label ? <Txt x={cx} y={cy - 16} s={10.5} b>{label}</Txt> : null}
    </>
  );
}

function SymRes({ cx, cy, w, label }: { cx: number; cy: number; w: number; label: string }) {
  const bw = Math.min(w - 8, 34);
  return (
    <>
      {L(cx - w / 2, cy, cx - bw / 2, cy, "a")}
      {L(cx + bw / 2, cy, cx + w / 2, cy, "b")}
      <rect x={cx - bw / 2} y={cy - 8} width={bw} height={16} className="sv-part" />
      <Txt x={cx} y={cy - 14} s={10.5} b>{label}</Txt>
    </>
  );
}

/** Tok transformatori: vertikal o'tkazgichga ilingan ikkita yoy. */
function SymCt({ cx, cy, label }: { cx: number; cy: number; label?: string }) {
  return (
    <>
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M ${cx + 3} ${cy - 10 + i * 10} a 5 5 0 1 0 0 10`}
          className="sv-line"
        />
      ))}
      {L(cx + 8, cy, cx + 14, cy, "lead")}
      {label ? <Txt x={cx - 8} y={cy + 17} s={9.5} anchor="end" cls="sv-txt-s">{label}</Txt> : null}
    </>
  );
}

/** Kuchlanish transformatori: ikkita kesishuvchi doira. */
function SymVt({ cx, cy, label }: { cx: number; cy: number; label?: string }) {
  return (
    <>
      <circle cx={cx} cy={cy - 5} r={9} className="sv-part" fill="none" />
      <circle cx={cx} cy={cy + 5} r={9} className="sv-part" fill="none" />
      {L(cx, cy - 14, cx, cy - 20, "t")}
      {L(cx, cy + 14, cx, cy + 20, "b")}
      {label ? <Txt x={cx - 14} y={cy + 3} s={9.5} anchor="end" cls="sv-txt-s">{label}</Txt> : null}
    </>
  );
}

function SymEarth({ x, y }: { x: number; y: number }) {
  return (
    <>
      {L(x, y - 8, x, y, "a")}
      {L(x - 8, y, x + 8, y, "b")}
      {L(x - 5, y + 4, x + 5, y + 4, "c")}
      {L(x - 2, y + 8, x + 2, y + 8, "d")}
    </>
  );
}

function Sym({ kind, cx, cy, w, label }: { kind: PartKind; cx: number; cy: number; w: number; label: string }) {
  switch (kind) {
    case "coil": return <SymCoil cx={cx} cy={cy} w={w} label={label} />;
    case "blk": return <SymBlk cx={cx} cy={cy} w={w} label={label} />;
    case "nc": return <SymNc cx={cx} cy={cy} w={w} label={label} />;
    case "res": return <SymRes cx={cx} cy={cy} w={w} label={label} />;
    case "ct": return <SymCt cx={cx} cy={cy} label={label} />;
    default: return <SymNo cx={cx} cy={cy} w={w} label={label} />;
  }
}

function EmptySlot({ id, cx, cy, w, h }: { id: string; cx: number; cy: number; w: number; h: number }) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={7} className="sv-slot-fill" />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={7} className="sv-slot" data-slot={id} />
      <Txt x={cx} y={cy + 5} s={15} b cls="sv-txt-s">?</Txt>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sxema                                                                */

export interface CircuitViewProps {
  circuit: Circuit;
  /** slotId → partId */
  state: Record<string, string>;
  /** tekshirilgandan keyin: slotId → "ok" | "bad" */
  results?: Record<string, "ok" | "bad"> | null;
  /** to'ldirilgan slot bosilganda detalni qaytarib olish */
  onSlotClick?: (slotId: string) => void;
  /** kontent matnini joriy tilga o'girish */
  x: (v: L10n | string | undefined) => string;
  /** harakat kamaytirilgan bo'lsa tok animatsiyasi chizilmaydi */
  reduceMotion?: boolean;
}

export function CircuitView({
  circuit: c, state, results, onSlotClick, x: tx, reduceMotion,
}: CircuitViewProps) {
  const partLabel = (partId: string) => partId;
  const partKind = (partId: string, fallback: PartKind): PartKind =>
    c.parts.find((p) => p.id === partId)?.kind ?? fallback;

  const placed = (item: RungItem | { t: "slot"; id: string; accept: string; kind: PartKind; w?: number }, cx: number, cy: number, key: string) => {
    const w = item.w ?? 50;
    if (item.t === "fixed") {
      return <g key={key}><Sym kind={item.kind} cx={cx} cy={cy} w={w} label={item.label} /></g>;
    }
    const got = state[item.id];
    if (!got) {
      const h = item.kind === "coil" || item.kind === "blk" ? 32 : 30;
      return <g key={key}><EmptySlot id={item.id} cx={cx} cy={cy} w={w} h={h} /></g>;
    }
    const verdict = results?.[item.id];
    const cls = verdict ? (verdict === "ok" ? "sv-ok" : "sv-bad") : undefined;
    const ledFill = verdict === "ok" ? "var(--led-green)" : verdict === "bad" ? "var(--led-red)" : "var(--led-blue)";
    return (
      <g
        key={`${key}-${got}`}
        className={`${cls ?? ""} sv-placed`}
        data-slot={item.id}
        data-filled="1"
        style={{ cursor: results ? "default" : "pointer" }}
        onClick={() => !results && onSlotClick?.(item.id)}
      >
        <Sym kind={partKind(got, item.kind)} cx={cx} cy={cy} w={w} label={partLabel(got)} />
        {/* "ulandi" indikatori */}
        <circle cx={cx + w / 2 - 3} cy={cy - 13} r={2.6} fill={ledFill} />
      </g>
    );
  };

  const body: ReactNode[] = [];

  if (c.rungs && c.rails) {
    const { left, right, showPolarity } = c.rails;
    const yTop = c.rungs[0].y;
    const yBot = c.rungs[c.rungs.length - 1].y;
    body.push(
      <line key="rail-l" x1={left} y1={yTop - 26} x2={left} y2={yBot + 22} className="sv-rail" />,
      <line key="rail-r" x1={right} y1={yTop - 26} x2={right} y2={yBot + 22} className="sv-rail" />,
    );
    if (showPolarity) {
      body.push(
        <Txt key="pl" x={left} y={yTop - 32} s={15} b>+</Txt>,
        <Txt key="mn" x={right} y={yTop - 32} s={15} b>−</Txt>,
      );
    }
    c.rungs.forEach((rung, ri) => {
      const items = rung.items;
      const total = items.reduce((a, it) => a + (it.w ?? 50), 0);
      const span = right - left;
      const gap = Math.max(6, (span - total) / (items.length + 1));
      let x = left;
      items.forEach((it, ii) => {
        const w = it.w ?? 50;
        body.push(L(x, rung.y, x + gap, rung.y, `w${ri}-${ii}`));
        x += gap;
        body.push(placed(it, x + w / 2, rung.y, `i${ri}-${ii}`));
        x += w;
      });
      body.push(L(x, rung.y, right, rung.y, `we${ri}`));

      /* Tok oqimi: faqat shu pog'onadagi barcha slotlar to'g'ri bo'lsa —
         ya'ni zanjir yopilgan bo'lsa. */
      if (results && !reduceMotion) {
        const slots = items.filter((it): it is Extract<RungItem, { t: "slot" }> => it.t === "slot");
        const closed = slots.length > 0 && slots.every((s) => results[s.id] === "ok");
        if (closed) {
          body.push(
            <line key={`flow${ri}`} x1={left} y1={rung.y} x2={right} y2={rung.y} className="sv-flow" />,
          );
        }
      }
      if (rung.label) {
        body.push(
          <Txt key={`lbl${ri}`} x={(left + right) / 2} y={rung.y - 26} s={10} cls="sv-txt-s">
            {tx(rung.label)}
          </Txt>,
        );
      }
    });
  } else {
    (c.draw ?? []).forEach((d: DrawOp, i) => {
      switch (d[0]) {
        case "line": body.push(L(d[1], d[2], d[3], d[4], `d${i}`)); break;
        case "dash":
          body.push(<line key={`d${i}`} x1={d[1]} y1={d[2]} x2={d[3]} y2={d[4]} className="sv-line" strokeDasharray="4 3" />);
          break;
        case "dot": body.push(<Dot key={`d${i}`} x={d[1]} y={d[2]} />); break;
        case "text":
          body.push(
            <Txt key={`d${i}`} x={d[1]} y={d[2]} s={d[4]?.s} b={!!d[4]?.b} anchor={d[4]?.anchor}>
              {d[3]}
            </Txt>,
          );
          break;
        case "ct": body.push(<Fragment key={`d${i}`}><SymCt cx={d[1]} cy={d[2]} label={d[3]} /></Fragment>); break;
        case "vt": body.push(<Fragment key={`d${i}`}><SymVt cx={d[1]} cy={d[2]} label={d[3]} /></Fragment>); break;
        case "earth": body.push(<Fragment key={`d${i}`}><SymEarth x={d[1]} y={d[2]} /></Fragment>); break;
        case "arrow":
          body.push(L(d[1], d[2], d[3], d[4], `d${i}`));
          break;
      }
    });
    /* Tok oqimi: erkin sxemada barcha slotlar to'g'ri bo'lsa, chiziqlar bo'ylab. */
    const allOk =
      !!results && (c.slots ?? []).length > 0 && (c.slots ?? []).every((s) => results[s.id] === "ok");
    if (allOk && !reduceMotion) {
      (c.draw ?? []).forEach((d: DrawOp, i) => {
        if (d[0] === "line") {
          body.push(
            <line key={`f${i}`} x1={d[1]} y1={d[2]} x2={d[3]} y2={d[4]} className="sv-flow" />,
          );
        }
      });
    }

    (c.slots ?? []).forEach((s, i) => {
      body.push(
        placed({ t: "slot", id: s.id, accept: s.accept, kind: s.kind, w: s.w }, s.x + s.w / 2, s.y + s.h / 2, `s${i}`),
      );
    });
  }

  return (
    <svg viewBox={`0 0 ${c.w} ${c.h}`} xmlns="http://www.w3.org/2000/svg">
      {body}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mantiq elementlari                                                   */

export type GateKind = "yoki" | "va" | "emas" | "rs";

export function LogicGate({ kind, inputs, out }: { kind: GateKind; inputs: boolean[]; out: boolean }) {
  const w = 240, h = 120;
  const bx = 95, by = 25, bw = 70, bh = 70;
  const sign = kind === "va" ? "&" : kind === "rs" ? "RS" : "1";
  const names = kind === "rs" ? ["S", "R"] : inputs.map((_, i) => `KL${i + 1}`);
  const oy = by + bh / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <rect x={bx} y={by} width={bw} height={bh} rx={4} className="sv-part" />
      <Txt x={bx + bw / 2} y={by + 30} s={20} b>{sign}</Txt>
      {kind !== "rs" && (
        <Txt x={bx + bw / 2} y={by + 52} s={11} cls="sv-txt-s">
          {kind.toUpperCase()}
        </Txt>
      )}
      {inputs.map((v, i) => {
        const y = by + (bh / (inputs.length + 1)) * (i + 1);
        return (
          <Fragment key={i}>
            {L(30, y, bx, y)}
            <Txt x={22} y={y + 4} s={11} b anchor="end">{names[i]}</Txt>
            <circle cx={40} cy={y} r={6} className="sv-lamp" fill={v ? "var(--ok)" : "var(--card-2)"} />
            <Txt x={40} y={y - 11} s={10} b>{v ? "1" : "0"}</Txt>
          </Fragment>
        );
      })}
      {kind === "emas" ? (
        <>
          <circle cx={bx + bw + 6} cy={oy} r={5.5} className="sv-lamp" fill="var(--card)" />
          {L(bx + bw + 12, oy, w - 30, oy)}
        </>
      ) : (
        L(bx + bw, oy, w - 30, oy)
      )}
      <circle cx={w - 30} cy={oy} r={8} className="sv-lamp" fill={out ? "var(--ok)" : "var(--card-2)"} />
      <Txt x={w - 30} y={oy - 15} s={12} b>{out ? "1" : "0"}</Txt>
    </svg>
  );
}

/** Rele-kontakt ekvivalenti (YoKI = parallel, VA = ketma-ket).
 *  Tok faqat zanjir yopilganda (chiqish = 1) yuradi. */
export function LogicRelay({
  kind, inputs, out, reduceMotion,
}: {
  kind: "yoki" | "va"; inputs: boolean[]; out: boolean; reduceMotion?: boolean;
}) {
  const w = 240, h = 120;
  const coilX = w - 58, coilY = h / 2;
  const flow = out && !reduceMotion;

  const contact = (cx: number, cy: number, closed: boolean, label: string, key: string) => (
    <Fragment key={key}>
      {L(cx - 20, cy, cx - 8, cy)}
      {L(cx + 8, cy, cx + 20, cy)}
      {L(cx - 8, cy, cx + 8, closed ? cy : cy - 12)}
      <Dot x={cx - 8} y={cy} />
      <Dot x={cx + 8} y={cy} />
      <Txt x={cx} y={cy - 17} s={10} b>{label}</Txt>
    </Fragment>
  );

  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <line x1={16} y1={12} x2={16} y2={h - 12} className="sv-rail" />
      <line x1={w - 16} y1={12} x2={w - 16} y2={h - 12} className="sv-rail" />
      <Txt x={16} y={10} s={13} b>+</Txt>
      <Txt x={w - 16} y={10} s={13} b>−</Txt>

      {kind === "va" ? (
        <>
          {L(16, coilY, 50, coilY, "a")}
          {contact(70, coilY, inputs[0], "KL1", "c1")}
          {L(90, coilY, 120, coilY, "b")}
          {contact(140, coilY, inputs[1], "KL2", "c2")}
          {L(160, coilY, coilX - 18, coilY, "c")}
        </>
      ) : (
        <>
          {L(16, 40, 50, 40, "a")}
          {L(16, 82, 50, 82, "b")}
          {L(16, 40, 16, 82, "c")}
          {contact(70, 40, inputs[0], "KL1", "c1")}
          {contact(70, 82, inputs[1] ?? false, "KL2", "c2")}
          {L(90, 40, 130, 40, "d")}
          {L(90, 82, 130, 82, "e")}
          {L(130, 40, 130, 82, "f")}
          {L(130, coilY, coilX - 18, coilY, "g")}
          <Dot x={130} y={coilY} />
        </>
      )}

      {/* tok oqimi — zanjir yopilganda */}
      {flow ? (
        kind === "va" ? (
          <path d={`M 16 ${coilY} L ${coilX - 18} ${coilY}`} className="sv-flow" />
        ) : (
          <>
            {inputs[0] ? <path d={`M 16 40 L 130 40 L 130 ${coilY} L ${coilX - 18} ${coilY}`} className="sv-flow" /> : null}
            {inputs[1] ? <path d={`M 16 82 L 130 82 L 130 ${coilY} L ${coilX - 18} ${coilY}`} className="sv-flow" /> : null}
          </>
        )
      ) : null}

      <rect
        x={coilX - 18} y={coilY - 14} width={36} height={28} rx={3}
        className="sv-part" fill={out ? "var(--ok-bg)" : "var(--panel-2)"}
      />
      <Txt x={coilX} y={coilY + 4} s={11} b>KL</Txt>
      {L(coilX + 18, coilY, w - 16, coilY, "h")}
      {flow ? <path d={`M ${coilX + 18} ${coilY} L ${w - 16} ${coilY}`} className="sv-flow" /> : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tarmoq sxemasi (stsenariy o'yini)                                    */

export function NetworkView({
  net, faultId, activeQ, reduceMotion,
}: {
  net: Network; faultId?: string | null; activeQ?: string | null; reduceMotion?: boolean;
}) {
  const byId = Object.fromEntries(net.buses.map((b) => [b.id, b]));
  const first = net.buses[0];
  /* Ishlagan o'chirgichdan keyingi liniyalarda tok yo'q. */
  const cutAt = activeQ ? net.lines.findIndex((l) => l.q === activeQ) : -1;
  const live = (idx: number) => !reduceMotion && (cutAt < 0 || idx < cutAt);

  return (
    <svg viewBox={`0 0 ${net.w} ${net.h}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx={24} cy={70} r={13} className="sv-part" />
      <Txt x={24} y={74} s={16} b>~</Txt>
      {L(37, 70, first.x, 70, "src")}
      {!reduceMotion ? <path d={`M 37 70 L ${first.x} 70`} className="sv-flow" /> : null}

      {net.lines.map((ln, idx) => {
        const a = byId[ln.from], b = byId[ln.to];
        const qx = a.x + 18;
        const on = activeQ === ln.q;
        return (
          <Fragment key={ln.id}>
            {L(a.x, a.y, b.x, b.y)}
            {live(idx) ? <path d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} className="sv-flow" /> : null}
            <rect
              x={qx - 6} y={a.y - 9} width={12} height={18} rx={2}
              className="sv-part" fill={on ? "var(--bad)" : "var(--card-2)"}
            />
            <Txt x={qx} y={a.y - 15} s={10} b>{ln.q}</Txt>
            <Txt x={(a.x + b.x) / 2 + 8} y={a.y + 20} s={10} cls="sv-txt-s">{ln.id}</Txt>
            <Txt x={(a.x + b.x) / 2 + 8} y={a.y + 33} s={9.5} cls="sv-txt-s">
              {`${ln.rh}  t=${ln.t}s`}
            </Txt>
          </Fragment>
        );
      })}

      {net.buses.map((b) => (
        <Fragment key={b.id}>
          <line x1={b.x} y1={b.y - 16} x2={b.x} y2={b.y + 16} className="sv-rail" />
          <Txt x={b.x} y={b.y - 22} s={12} b>{b.label}</Txt>
        </Fragment>
      ))}

      {net.faults
        .filter((f) => f.id === faultId)
        .map((f) => (
          <Fragment key={f.id}>
            <path
              d={`M ${f.x} ${f.y - 24} l -7 14 l 7 -2 l -4 14 l 12 -18 l -8 2 z`}
              fill="var(--bad)" stroke="var(--bad)" strokeWidth={1}
            />
            <Txt x={f.x + 16} y={f.y - 16} s={12} b anchor="start">{f.label}</Txt>
          </Fragment>
        ))}
    </svg>
  );
}

/** Progress halqasi. */
export function Ring({ pct, color, label }: { pct: number; color: string; label: string }) {
  const R = 20;
  const C = 2 * Math.PI * R;
  return (
    <div className="ring">
      <svg viewBox="0 0 48 48" width="48" height="48">
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="5" />
        <circle
          cx="24" cy="24" r={R} fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
        />
      </svg>
      <b>{label}</b>
    </div>
  );
}
