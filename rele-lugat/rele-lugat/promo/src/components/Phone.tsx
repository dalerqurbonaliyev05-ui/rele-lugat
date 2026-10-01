import React from "react";
import { AbsoluteFill, OffthreadVideo, useCurrentFrame } from "remotion";
import { at, clipSrc, type ClipName } from "../clips";
import { C, SHADOW } from "../theme";

/* Yozuv o'lchami: 390×844 CSS px (DPR 3 → 1170×2532). */
export const SCREEN_W = 1170;
export const SCREEN_H = 2532;
const RATIO = SCREEN_H / SCREEN_W;

/**
 * Telefon ramkasi — sof CSS/SVG mockup, yumshoq soya va metall hoshiya bilan.
 * Ichida ilovaning HAQIQIY yozuvi ko'rsatiladi.
 */
export const Phone: React.FC<{
  /** Ekran kengligi (px). Balandligi nisbatdan hisoblanadi. */
  width: number;
  children: React.ReactNode;
  /** 3D aylanish (daraja). */
  rotateY?: number;
  rotateX?: number;
  rotateZ?: number;
  scale?: number;
  /** Ekran atrofidagi neon nur. */
  glowColor?: string;
  glowStrength?: number;
  style?: React.CSSProperties;
}> = ({
  width,
  children,
  rotateY = 0,
  rotateX = 0,
  rotateZ = 0,
  scale = 1,
  glowColor = C.blue,
  glowStrength = 0.5,
  style,
}) => {
  const h = width * RATIO;
  const bezel = Math.round(width * 0.028);
  const radius = Math.round(width * 0.105);

  return (
    <div style={{ perspective: 2600, ...style }}>
      <div
        style={{
          width: width + bezel * 2,
          height: h + bezel * 2,
          borderRadius: radius + bezel,
          padding: bezel,
          background: "linear-gradient(155deg, #39465f 0%, #141c2e 38%, #0a1020 72%, #2a3550 100%)",
          boxShadow: `${SHADOW}, 0 0 ${90 * glowStrength}px ${glowColor}${Math.round(glowStrength * 120).toString(16).padStart(2, "0")}, inset 0 0 0 1px rgba(255,255,255,.07)`,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* ekran */}
        <div
          style={{
            width,
            height: h,
            borderRadius: radius,
            overflow: "hidden",
            background: C.bg,
            position: "relative",
          }}
        >
          {children}
          {/* shishadagi aks */}
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(118deg, rgba(255,255,255,.085) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 72%, rgba(255,255,255,.045) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* dinamik tirqishi */}
        <div
          style={{
            position: "absolute",
            top: bezel + Math.round(width * 0.022),
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.round(width * 0.27),
            height: Math.round(width * 0.062),
            borderRadius: 999,
            background: "#05080f",
          }}
        />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

/**
 * Yozuvning bir bo'lagini ko'rsatadi: `from` belgisidan boshlab, berilgan
 * tezlikda. Tezlik `rate()` bilan hisoblangan bo'lsa, bo'lak ajratilgan
 * ekran vaqtiga aniq sig'adi.
 */
export const Clip: React.FC<{
  name: ClipName;
  /** Qaysi belgidan boshlansin. */
  from?: string;
  /** Yoki to'g'ridan-to'g'ri soniya. */
  fromSeconds?: number;
  playbackRate?: number;
  style?: React.CSSProperties;
}> = ({ name, from, fromSeconds, playbackRate = 1, style }) => {
  const start = fromSeconds ?? (from ? at(name, from) : 0);
  return (
    <OffthreadVideo
      src={clipSrc(name)}
      startFrom={Math.round(start * 30)}
      playbackRate={playbackRate}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  );
};

/* ------------------------------------------------------------------ */

/** Telefon ekraniga "quyiladigan" ko'rinish uchun yengil zoom-punch. */
export const useZoomPunch = (hitFrames: number[], amount = 0.035): number => {
  const frame = useCurrentFrame();
  let k = 0;
  for (const h of hitFrames) {
    const d = frame - h;
    if (d >= 0 && d < 10) k = Math.max(k, (1 - d / 10) ** 2);
  }
  return 1 + k * amount;
};
