import React from "react";
import {
  AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { FONT, MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Flash } from "../components/Fx";
import { metrics, Safe, type SceneProps } from "../components/Layout";

/**
 * 28.0–30.0 s — CTA.
 * Logotip, nom, "Android uchun APK" va o'yinli chaqiriq.
 * Oxirgi 0.5 soniyada elektr pulsatsiyasi.
 */
export const Cta: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.cta;

  const logo = spring({
    frame: frame - t.logoIn,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 160 },
  });
  const name = spring({
    frame: frame - t.nameIn,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 170 },
  });
  const apk = interpolate(frame, [t.apkIn, t.apkIn + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hook = spring({
    frame: frame - t.hookIn,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  /* Oxirgi 0.5 soniyada elektr pulsatsiyasi — sahna uzunligiga bog'langan,
     shuning uchun 30 s va 15 s variantlarda ham oxirida tushadi. */
  const pulseAt = Math.max(t.pulse, dur - 15);
  const pulsing = frame >= pulseAt;
  const pulse = pulsing ? (Math.floor((frame - pulseAt) / 3) % 2 === 0 ? 1 : 0.35) : 0;

  const logoSize = m.square ? 150 : 210;

  return (
    <AbsoluteFill>
      <Bg heat={0} />

      {/* halqa to'lqinlari */}
      {[0, 1, 2].map((i) => {
        const a = t.logoIn + i * 6;
        const k = interpolate(frame, [a, a + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        if (k <= 0 || k >= 1) return null;
        return (
          <AbsoluteFill key={i} style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: logoSize * (1 + k * 3.4),
                height: logoSize * (1 + k * 3.4),
                borderRadius: "50%",
                border: `3px solid ${C.blue}`,
                opacity: (1 - k) * 0.5,
                marginTop: m.square ? -40 : -220,
              }}
            />
          </AbsoluteFill>
        );
      })}

      <Safe aspect={aspect} place="center" style={{ transform: `translateY(${m.square ? 0 : -40}px)` }}>
        <Img
          src={staticFile("logo.svg")}
          style={{
            width: logoSize,
            height: logoSize,
            transform: `scale(${0.5 + logo * 0.5}) rotate(${(1 - logo) * -14}deg)`,
            filter: `drop-shadow(0 0 ${28 + pulse * 30}px ${C.blue})`,
          }}
        />

        <div style={{ height: 22 }} />

        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: m.square ? 86 : 118,
            letterSpacing: "-0.02em",
            color: C.ink,
            transform: `scale(${0.76 + name * 0.24})`,
            opacity: name,
            textShadow: glow(C.blue, 20 + pulse * 26),
          }}
        >
          {SCRIPT.cta.name}
        </div>

        <div style={{ height: 16 }} />

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: apk }}>
          <Chip color={C.green} small={m.square}>{tr(SCRIPT.cta.apk, lang)}</Chip>
          <Chip color={C.ink2} small={m.square}>{tr(SCRIPT.cta.offline, lang)}</Chip>
        </div>

        <div style={{ height: m.square ? 26 : 44 }} />

        {/* o'yinli chaqiriq */}
        <div
          style={{
            transform: `translateY(${(1 - hook) * 36}px) scale(${0.9 + hook * 0.1})`,
            opacity: hook,
            maxWidth: width * 0.88,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: m.square ? 42 : 58,
              lineHeight: 1.12,
              color: C.amber,
              textShadow: glow(C.amber, 22),
            }}
          >
            {tr(SCRIPT.cta.hook, lang)}
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: m.square ? 50 : 70,
              color: C.ink,
              marginTop: 8,
            }}
          >
            {tr(SCRIPT.cta.try, lang)}
          </div>
        </div>
      </Safe>

      {/* elektr pulsatsiyasi */}
      {pulsing ? (
        <>
          <AbsoluteFill style={{ background: C.blue, opacity: pulse * 0.14 }} />
          <Flash at={dur - 3} dur={3} color={C.ink} peak={0.5} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ children: React.ReactNode; color: string; small?: boolean }> = ({
  children,
  color,
  small = false,
}) => (
  <span
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: small ? 26 : 34,
      color,
      border: `2px solid ${color}66`,
      borderRadius: 999,
      padding: small ? "8px 18px" : "11px 24px",
      background: "rgba(8,13,24,.7)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
