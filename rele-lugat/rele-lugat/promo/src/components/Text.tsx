import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BEAT } from "../beats";
import { C, glow, T } from "../theme";
import { FONT, MONO } from "../fonts";

/* ------------------------------------------------------------------ */
/* Kinetik tipografiya — har so'z ritmda chiqadi                        */

export const Kinetic: React.FC<{
  text: string;
  /** Qaysi kadrda boshlanadi (sahna ichida). */
  from?: number;
  /** Har so'z orasidagi kechikish (kadr). */
  step?: number;
  size?: number;
  color?: string;
  /** Shu so'zlar rangli va kattaroq chiqadi. */
  highlight?: string[];
  highlightColor?: string;
  align?: "left" | "center";
  lineHeight?: number;
  maxWidth?: number;
}> = ({
  text,
  from = 0,
  step = Math.round(BEAT / 3),
  size = T.mid,
  color = C.ink,
  highlight = [],
  highlightColor = C.amber,
  align = "center",
  lineHeight = 1.06,
  maxWidth,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const hi = new Set(highlight.map((w) => w.toLowerCase().replace(/[.,!?]/g, "")));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `${size * 0.1}px ${size * 0.26}px`,
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: "baseline",
        maxWidth,
        fontFamily: FONT,
        fontWeight: 900,
        letterSpacing: "-0.015em",
        lineHeight,
        textAlign: align,
      }}
    >
      {words.map((w, i) => {
        const at = from + i * step;
        const s = spring({
          frame: frame - at,
          fps,
          config: { damping: 13, mass: 0.55, stiffness: 160 },
        });
        const isHi = hi.has(w.toLowerCase().replace(/[.,!?]/g, ""));
        return (
          <span
            key={`${w}-${i}`}
            style={{
              display: "inline-block",
              fontSize: isHi ? size * 1.16 : size,
              color: isHi ? highlightColor : color,
              textShadow: isHi ? glow(highlightColor, 26) : "0 6px 28px rgba(0,0,0,.6)",
              opacity: s,
              transform: `translateY(${(1 - s) * size * 0.5}px) scale(${0.72 + s * 0.28})`,
              willChange: "transform, opacity",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Subtitr — tovushsiz ko'rish uchun                                    */

export const Subtitle: React.FC<{ text: string; bottom: number }> = ({ text, bottom }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        bottom,
        display: "flex",
        justifyContent: "center",
        opacity: o,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: T.tiny,
          lineHeight: 1.25,
          color: C.ink,
          textAlign: "center",
          background: "rgba(8,13,24,0.74)",
          border: `1px solid ${C.line}`,
          borderRadius: 18,
          padding: "14px 26px",
          backdropFilter: "blur(2px)",
          textShadow: "0 2px 10px rgba(0,0,0,.8)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Raqamli tablo — 0 dan sanab chiqadi                                  */

export const CountUp: React.FC<{
  to: number;
  from?: number;
  /** Sanash necha kadrda tugaydi. */
  dur?: number;
  decimals?: number;
  size?: number;
  color?: string;
  unit?: string;
  prefix?: string;
}> = ({ to, from = 0, dur = 24, decimals = 0, size = T.big, color = C.amber, unit, prefix }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [from, from + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - (1 - k) ** 3;
  const v = (to * eased).toFixed(decimals);
  return (
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 800,
        fontSize: size,
        color,
        letterSpacing: "0.01em",
        textShadow: glow(color, 22),
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      {prefix}
      {v}
      {unit ? <span style={{ fontSize: size * 0.46, marginLeft: size * 0.07 }}>{unit}</span> : null}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Plastinka yozuvi (ilovadagi panel nameplate uslubi)                  */

export const Plate: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.ink2,
}) => (
  <span
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: 30,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color,
      background: "rgba(10,16,30,.7)",
      border: `1px solid ${C.line}`,
      borderRadius: 8,
      padding: "8px 18px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
