/** Dispetcher pulti uslubidagi qayta ishlatiladigan komponentlar. */
import type { CSSProperties, ReactNode } from "react";
import { useCountUp } from "../lib/anim";
import { fxTap } from "../lib/fx";

export type LedColor = "green" | "amber" | "red" | "blue" | "off";

/* ------------------------------------------------------------------ */
/* Murvat va panel                                                      */

function Screws() {
  return (
    <>
      <i className="screw s-tl" />
      <i className="screw s-tr" />
      <i className="screw s-bl" />
      <i className="screw s-br" />
    </>
  );
}

export function Panel({
  label, children, className = "", style, tone, onClick, screws = true, right,
}: {
  /** Yuqoridagi kichik yorliq plastinasi. */
  label?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Chekka rangi: ogohlantirish yoki avariya. */
  tone?: "ok" | "warn" | "alarm";
  onClick?: () => void;
  screws?: boolean;
  /** Yorliq plastinasining o'ng chekkasidagi element (LED va h.k.). */
  right?: ReactNode;
}) {
  const cls = `panel${tone ? ` panel-${tone}` : ""}${onClick ? " panel-btn" : ""} ${className}`;
  const inner = (
    <>
      {screws ? <Screws /> : null}
      {label !== undefined ? (
        <div className="panel-plate">
          <span className="panel-plate-txt">{label}</span>
          {right}
        </div>
      ) : null}
      <div className="panel-body">{children}</div>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={cls} style={style} onClick={() => { fxTap(); onClick(); }}>
        {inner}
      </button>
    );
  }
  return <div className={cls} style={style}>{inner}</div>;
}

/* ------------------------------------------------------------------ */
/* Indikator lampasi                                                    */

export function Led({
  color = "off", on = true, size = 10, blink = false, title,
}: {
  color?: LedColor; on?: boolean; size?: number; blink?: boolean; title?: string;
}) {
  return (
    <i
      className={`led led-${color}${on ? " on" : ""}${blink ? " blink" : ""}`}
      style={{ width: size, height: size }}
      title={title}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Fizik tugma                                                          */

export function PhysButton({
  children, onClick, tone = "default", led, wide, disabled, className = "", type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "default" | "primary" | "ok" | "alarm" | "ghost";
  led?: LedColor;
  wide?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`pbtn pbtn-${tone}${wide ? " pbtn-wide" : ""} ${className}`}
      onClick={() => { if (disabled) return; fxTap(); onClick?.(); }}
    >
      {led ? <Led color={led} size={8} /> : null}
      <span className="pbtn-txt">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Raqamli displey                                                      */

export function DigitalDisplay({
  value, unit, size = "md", animate = true, decimals = 0, pad, tone = "amber",
}: {
  value: number | string;
  unit?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  decimals?: number;
  /** Nol bilan to'ldirish (masalan 3 → "007"). */
  pad?: number;
  tone?: "amber" | "green" | "blue" | "red";
}) {
  const numeric = typeof value === "number";
  const shown = useCountUp(numeric && animate ? value : 0, 800, decimals);
  let text: string;
  if (!numeric) text = String(value);
  else {
    const n = animate ? shown : value;
    text = decimals ? n.toFixed(decimals) : String(Math.round(n));
    if (pad) text = text.padStart(pad, "0");
  }
  return (
    <span className={`digit digit-${size} digit-${tone}`}>
      {text}
      {unit ? <em className="digit-unit">{unit}</em> : null}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Shkala (strelkali o'lchagich)                                        */

export function Gauge({
  pct, label, value, size = 120,
}: {
  /** 0-100 */
  pct: number;
  label?: string;
  value?: ReactNode;
  size?: number;
}) {
  const p = Math.max(0, Math.min(100, pct));
  const shown = useCountUp(p, 900, 1);
  const a = (-120 + (shown / 100) * 240) * (Math.PI / 180);
  const cx = 60, cy = 58, r = 40;
  const nx = cx + Math.sin(a) * r;
  const ny = cy - Math.cos(a) * r;

  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const ta = (-120 + (i / 10) * 240) * (Math.PI / 180);
    const r1 = 44, r2 = i % 5 === 0 ? 36 : 40;
    ticks.push(
      <line
        key={i}
        x1={cx + Math.sin(ta) * r1} y1={cy - Math.cos(ta) * r1}
        x2={cx + Math.sin(ta) * r2} y2={cy - Math.cos(ta) * r2}
        className={i % 5 === 0 ? "gauge-tick maj" : "gauge-tick"}
      />,
    );
  }

  return (
    <div className="gauge" style={{ width: size }}>
      <svg viewBox="0 0 120 84" xmlns="http://www.w3.org/2000/svg">
        <path d="M 25 76 A 46 46 0 1 1 95 76" className="gauge-arc" />
        {ticks}
        <line x1={cx} y1={cy} x2={nx} y2={ny} className="gauge-needle" />
        <circle cx={cx} cy={cy} r={4.5} className="gauge-hub" />
      </svg>
      {value !== undefined ? <div className="gauge-val">{value}</div> : null}
      {label ? <div className="gauge-lbl">{label}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress "shkala" chizig'i                                           */

export function Bar({ pct, tone = "blue" }: { pct: number; tone?: "blue" | "green" | "amber" }) {
  return (
    <div className={`bar bar-${tone}`}>
      <i style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bo'lim sarlavhasi                                                    */

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="sec-title">
      <span className="sec-bar" />
      <h2>{children}</h2>
      {right}
    </div>
  );
}
