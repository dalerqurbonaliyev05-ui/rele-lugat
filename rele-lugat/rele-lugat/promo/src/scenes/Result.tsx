import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { FONT, MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Confetti, Flash } from "../components/Fx";
import { Clip, Phone } from "../components/Phone";
import { CountUp, Kinetic } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at, END, rate } from "../clips";

/** Test natijasi — ilovadagi imtihon eng yaxshi natijasi (seed: 88) ga yaqin. */
const RING_PCT = 92;
const XP_STEPS = [10, 20, 50];

/**
 * 21.0–25.0 s — NATIJA.
 * Halqa 0 dan 92 % gacha to'ladi, XP sanaladi, 7 kunlik seriya nishoni va
 * "Muhandis" darajasi ochiladi. Orqada hisoblagichning haqiqiy yozuvi.
 */
export const Result: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.result;

  const calcRate = rate("calc", "form", END, dur, fps, 1, 2.2);

  const ringK = interpolate(frame, [t.ringIn + 4, t.ringIn + 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - (1 - ringK) ** 3;

  const levelS = spring({
    frame: frame - t.levelIn,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 180 },
  });

  const R = m.square ? 118 : 158;
  const stroke = m.square ? 18 : 24;
  const circ = 2 * Math.PI * R;

  return (
    <AbsoluteFill>
      <Bg heat={0} />

      {/* orqa fonda hisoblagichning haqiqiy yozuvi */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
        <Phone width={m.phone} rotateY={10} rotateX={4} glowStrength={0.22}>
          <Clip name="calc" fromSeconds={at("calc", "form")} playbackRate={calcRate} />
        </Phone>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(8,13,24,.5)" }} />

      <Safe aspect={aspect} place="center" style={{ transform: `translateY(${m.square ? -10 : -80}px)` }}>
        {/* --- natija halqasi --- */}
        <div style={{ position: "relative", width: (R + stroke) * 2, height: (R + stroke) * 2 }}>
          <svg width={(R + stroke) * 2} height={(R + stroke) * 2}>
            <circle
              cx={R + stroke}
              cy={R + stroke}
              r={R}
              fill="none"
              stroke={C.line}
              strokeWidth={stroke}
            />
            <circle
              cx={R + stroke}
              cy={R + stroke}
              r={R}
              fill="none"
              stroke={C.green}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - (eased * RING_PCT) / 100)}
              transform={`rotate(-90 ${R + stroke} ${R + stroke})`}
              style={{ filter: `drop-shadow(0 0 18px ${C.green})` }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CountUp
              to={RING_PCT}
              from={t.ringIn + 4}
              dur={30}
              size={m.square ? 96 : 132}
              color={C.green}
              unit="%"
            />
          </div>
        </div>

        <div style={{ height: 26 }} />

        {/* --- XP qadamlari --- */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {XP_STEPS.map((xp, i) => {
            const a = t.xpIn + i * 7;
            const s = spring({ frame: frame - a, fps, config: { damping: 12, mass: 0.5, stiffness: 200 } });
            if (frame < a) return null;
            return (
              <span
                key={xp}
                style={{
                  fontFamily: MONO,
                  fontWeight: 800,
                  fontSize: m.square ? 36 : 48,
                  color: C.amber,
                  border: `2px solid ${C.amber}66`,
                  borderRadius: 12,
                  padding: "8px 18px",
                  background: "rgba(40,30,4,.5)",
                  transform: `scale(${0.6 + s * 0.4}) translateY(${(1 - s) * 22}px)`,
                  textShadow: glow(C.amber, 16),
                }}
              >
                +{xp} XP
              </span>
            );
          })}
        </div>

        <div style={{ height: 20 }} />

        {/* --- seriya va daraja --- */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Badge
            icon="⚡"
            label={tr(SCRIPT.result.streak, lang)}
            color={C.amber}
            at={t.streakIn}
            frame={frame}
            fps={fps}
            small={m.square}
          />
          <Badge
            icon="▲"
            label={`${tr(SCRIPT.result.levelTag, lang)} · ${tr(SCRIPT.result.level, lang)}`}
            color={C.blue}
            at={t.levelIn}
            frame={frame}
            fps={fps}
            small={m.square}
          />
        </div>
      </Safe>

      <Flash at={t.levelIn} dur={7} color={C.blue} peak={0.1} />
      <Confetti at={t.levelIn} dur={70} count={44} />

      <Safe aspect={aspect} place="bottom">
        <Kinetic
          text={tr(SCRIPT.result.line, lang)}
          from={t.lineIn}
          size={m.title * 0.9}
          highlight={[tr(SCRIPT.result.line, lang).split(" ").slice(-1)[0]?.replace(".", "") ?? ""]}
          highlightColor={C.green}
          maxWidth={width * 0.9}
        />
        <div style={{ opacity: levelS * 0 }} />
      </Safe>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */

const Badge: React.FC<{
  icon: string;
  label: string;
  color: string;
  at: number;
  frame: number;
  fps: number;
  small?: boolean;
}> = ({ icon, label, color, at, frame, fps, small = false }) => {
  const s = spring({ frame: frame - at, fps, config: { damping: 11, mass: 0.55, stiffness: 190 } });
  if (frame < at) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: small ? "12px 20px" : "16px 26px",
        borderRadius: 16,
        border: `2px solid ${color}`,
        background: "rgba(8,13,24,.8)",
        transform: `scale(${0.66 + s * 0.34})`,
        boxShadow: glow(color, 20),
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 800,
          fontSize: small ? 34 : 44,
          color,
          minWidth: small ? 28 : 36,
          textAlign: "center",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: small ? 26 : 34,
          color: C.ink,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};
