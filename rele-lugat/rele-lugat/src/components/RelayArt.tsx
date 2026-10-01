/** Haqiqiy rele detallari — soddalashtirilgan skeumorfik SVG.
 *  Ma'ruzadagi rasmlardan nusxa emas, o'zimiz chizganmiz. */
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Ko'rsatgich relesi (KH) bayroqchasi                                  */

/** `state`: null — bayroqcha ko'tarilgan, "ok"/"bad" — tushgan. */
export function KhFlag({ state, size = 54 }: { state: "ok" | "bad" | null; size?: number }) {
  const dropped = state !== null;
  const color = state === "ok" ? "var(--led-green)" : state === "bad" ? "var(--led-red)" : "var(--ink-2)";
  return (
    <svg className="kh-flag" width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      {/* korpus */}
      <rect x="6" y="6" width="48" height="48" rx="5" className="ra-case" />
      {/* tiniq oyna */}
      <rect x="12" y="12" width="36" height="28" rx="3" className="ra-glass" />
      {/* bayroqcha */}
      <g className={`kh-blade${dropped ? " dropped" : ""}`} style={{ transformOrigin: "30px 14px" }}>
        <rect x="21" y="13" width="18" height="24" rx="2" fill={color} opacity={dropped ? 1 : 0.25} />
      </g>
      {/* qaytaruvchi knopka */}
      <circle cx="30" cy="48" r="4.5" className="ra-knob" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Rele korpusi (flashcard uchun)                                       */

export function RelayShell({
  plate, children, tone,
}: {
  /** Korpus ustidagi plastinka yozuvi. */
  plate: ReactNode;
  children: ReactNode;
  tone?: "ok" | "bad" | null;
}) {
  return (
    <div className={`relay-shell${tone ? ` rs-${tone}` : ""}`}>
      <div className="rs-top">
        <i className="rs-screw" />
        <span className="rs-plate">{plate}</span>
        <i className="rs-screw" />
      </div>
      <div className="rs-body">{children}</div>
      <div className="rs-pins">
        {Array.from({ length: 8 }, (_, i) => <i key={i} />)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Relelar uchun mayda chizmalar (rele aniqlash o'yini)                 */

export type RelayArtKind =
  | "current" | "voltage" | "time" | "aux" | "flag" | "induction"
  /** Javob berilmaguncha ko'rsatiladigan yopiq korpus — turini oshkor qilmaydi. */
  | "sealed";

/** Rele turiga qarab soddalashtirilgan ko'rinish. */
export function RelayArt({ kind, size = 96 }: { kind: RelayArtKind; size?: number }) {
  return (
    <svg className="relay-art" width={size} height={size * 0.75} viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="112" height="82" rx="6" className="ra-case" />
      {kind === "current" ? <ArtScale label="RT-40" /> : null}
      {kind === "voltage" ? <ArtRectifier /> : null}
      {kind === "time" ? <ArtClock /> : null}
      {kind === "aux" ? <ArtCoilContacts /> : null}
      {kind === "flag" ? <ArtFlag /> : null}
      {kind === "induction" ? <ArtDisc /> : null}
      {kind === "sealed" ? <ArtSealed /> : null}
    </svg>
  );
}

/** RT-40: shkala va ko'rsatgich richagi. */
function ArtScale({ label }: { label: string }) {
  const ticks = [];
  for (let i = 0; i <= 8; i++) {
    const a = (-70 + (i / 8) * 140) * (Math.PI / 180);
    ticks.push(
      <line key={i}
        x1={60 + Math.sin(a) * 34} y1={62 - Math.cos(a) * 34}
        x2={60 + Math.sin(a) * (i % 4 === 0 ? 26 : 30)} y2={62 - Math.cos(a) * (i % 4 === 0 ? 26 : 30)}
        className="ra-tick" />,
    );
  }
  const a = -20 * (Math.PI / 180);
  return (
    <>
      <path d="M 28 62 A 34 34 0 0 1 92 62" className="ra-arc" />
      {ticks}
      <line x1="60" y1="62" x2={60 + Math.sin(a) * 30} y2={62 - Math.cos(a) * 30} className="ra-needle" />
      <circle cx="60" cy="62" r="4" className="ra-hub" />
      <text x="60" y="22" className="ra-txt">{label}</text>
    </>
  );
}

/** RN-53/54: to'g'rilagich ko'prik va chulg'am. */
function ArtRectifier() {
  return (
    <>
      <rect x="18" y="26" width="26" height="38" rx="3" className="ra-coil" />
      <text x="31" y="20" className="ra-txt">U</text>
      {/* ko'prik romb */}
      <path d="M 78 26 L 98 46 L 78 66 L 58 46 Z" className="ra-arc" />
      {[[78, 32], [90, 46], [78, 60], [66, 46]].map(([x, y], i) => (
        <path key={i} d={`M ${x - 4} ${y - 3} L ${x + 4} ${y} L ${x - 4} ${y + 3} Z`} className="ra-diode" />
      ))}
      <text x="78" y="80" className="ra-txt-s">V1</text>
    </>
  );
}

/** RV: soat mexanizmi — tishli g'ildirak. */
function ArtClock() {
  const teeth = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    teeth.push(
      <line key={i}
        x1={60 + Math.sin(a) * 24} y1={45 - Math.cos(a) * 24}
        x2={60 + Math.sin(a) * 29} y2={45 - Math.cos(a) * 29}
        className="ra-tick" />,
    );
  }
  return (
    <>
      <circle cx="60" cy="45" r="24" className="ra-arc" />
      {teeth}
      <circle cx="60" cy="45" r="5" className="ra-hub" />
      <line x1="60" y1="45" x2="60" y2="27" className="ra-needle" />
      <text x="60" y="82" className="ra-txt-s">t</text>
    </>
  );
}

/** RP: chulg'am va kontakt guruhi. */
function ArtCoilContacts() {
  return (
    <>
      <rect x="16" y="30" width="28" height="32" rx="3" className="ra-coil" />
      <text x="30" y="24" className="ra-txt-s">KL</text>
      {[36, 48, 60].map((y, i) => (
        <g key={i}>
          <line x1="58" y1={y} x2="72" y2={y} className="ra-wire" />
          <line x1="72" y1={y} x2="88" y2={y - 6} className="ra-wire" />
          <line x1="88" y1={y} x2="102" y2={y} className="ra-wire" />
          <circle cx="72" cy={y} r="2" className="ra-hub" />
          <circle cx="88" cy={y} r="2" className="ra-hub" />
        </g>
      ))}
    </>
  );
}

/** RU-21: bayroqcha va knopka. */
function ArtFlag() {
  return (
    <>
      <rect x="34" y="18" width="52" height="34" rx="3" className="ra-glass" />
      <rect x="50" y="20" width="20" height="26" rx="2" className="ra-flagblade" />
      <circle cx="60" cy="68" r="7" className="ra-knob" />
      <text x="96" y="70" className="ra-txt-s">KH</text>
    </>
  );
}

/** RT-80: induksion disk. */
function ArtDisc() {
  return (
    <>
      <ellipse cx="60" cy="46" rx="30" ry="10" className="ra-arc" />
      <ellipse cx="60" cy="42" rx="30" ry="10" className="ra-disc" />
      <line x1="60" y1="42" x2="60" y2="18" className="ra-wire" />
      <rect x="50" y="10" width="20" height="10" rx="2" className="ra-coil" />
      <text x="60" y="76" className="ra-txt-s">I → t</text>
    </>
  );
}

/** Yopiq (plombalangan) korpus: faqat oyna, vint va "?" — turi bilinmaydi. */
function ArtSealed() {
  return (
    <>
      <rect x="22" y="20" width="76" height="46" rx="4" className="ra-glass" />
      <text x="60" y="54" className="ra-txt" fontSize="26">?</text>
      {[[14, 14], [106, 14], [14, 76], [106, 76]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" className="ra-hub" />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */

/** Rele id'si bo'yicha chizma turi. */
export function artKindOf(relayId: string): RelayArtKind {
  if (relayId === "RT-40") return "current";
  if (relayId === "RT-80") return "induction";
  if (relayId.startsWith("RN")) return "voltage";
  if (relayId.startsWith("RV")) return "time";
  if (relayId.startsWith("RU")) return "flag";
  return "aux";
}
