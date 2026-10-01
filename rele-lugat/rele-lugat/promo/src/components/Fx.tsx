import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";

/* ------------------------------------------------------------------ */
/* Glitch / RGB-split                                                   */

/**
 * RGB-split + gorizontal "yirtiq" bo'laklar.
 * `at` kadrida eng kuchli, `dur` kadr ichida so'nadi.
 */
export const Glitch: React.FC<{
  children: React.ReactNode;
  at: number;
  dur?: number;
  amount?: number;
  slices?: number;
}> = ({ children, at, dur = 14, amount = 26, slices = 7 }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [at, at + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < at || k <= 0.001) return <>{children}</>;

  const jitter = (s: number) => (random(`g${frame}${s}`) - 0.5) * 2 * amount * k;

  return (
    <AbsoluteFill>
      {/* qizil va ko'k kanallar siljiydi */}
      <AbsoluteFill
        style={{
          transform: `translateX(${jitter(1)}px)`,
          filter: "url(#none)",
          mixBlendMode: "screen",
          opacity: k * 0.65,
        }}
      >
        <AbsoluteFill style={{ filter: "sepia(1) saturate(6) hue-rotate(-35deg)" }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${-jitter(2)}px)`,
          mixBlendMode: "screen",
          opacity: k * 0.65,
        }}
      >
        <AbsoluteFill style={{ filter: "sepia(1) saturate(6) hue-rotate(160deg)" }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>

      {/* asosiy qatlam */}
      <AbsoluteFill style={{ transform: `translateX(${jitter(3) * 0.3}px)` }}>
        {children}
      </AbsoluteFill>

      {/* yirtiq bo'laklar */}
      {Array.from({ length: slices }, (_, i) => {
        const seed = `s${Math.floor(frame / 2)}${i}`;
        const top = random(`${seed}t`) * 100;
        const h = 1.5 + random(`${seed}h`) * 5;
        const dx = (random(`${seed}x`) - 0.5) * 2 * amount * 2.4 * k;
        return (
          <AbsoluteFill
            key={i}
            style={{
              clipPath: `inset(${top}% 0 ${Math.max(0, 100 - top - h)}% 0)`,
              transform: `translateX(${dx}px)`,
              opacity: k,
            }}
          >
            {children}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Ekran tebranishi                                                     */

/**
 * `at` kadrida boshlanadigan, tez so'nadigan silkinish.
 *
 * Oddiy `div` — `AbsoluteFill` emas, aks holda markazlashtiruvchi flex
 * konteyner ichida bola chap-yuqoriga yopishib qoladi.
 */
export const Shake: React.FC<{
  children: React.ReactNode;
  at: number;
  dur?: number;
  amount?: number;
  /** Butun ekranni silkitish kerak bo'lsa. */
  fill?: boolean;
}> = ({ children, at, dur = 16, amount = 22, fill = false }) => {
  const frame = useCurrentFrame();
  const d = frame - at;
  const k = d < 0 || d > dur ? 0 : (1 - d / dur) ** 2;
  const x = k === 0 ? 0 : Math.sin(d * 2.9) * amount * k;
  const y = k === 0 ? 0 : Math.cos(d * 3.7) * amount * 0.7 * k;
  const r = k === 0 ? 0 : Math.sin(d * 2.1) * 0.7 * k;
  const transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;

  if (fill) return <AbsoluteFill style={{ transform }}>{children}</AbsoluteFill>;
  return <div style={{ transform, willChange: "transform" }}>{children}</div>;
};

/* ------------------------------------------------------------------ */
/* Uchqun zarralari                                                     */

/**
 * Qisqa tutashuv uchqunlari. Zarralar kadr bo'yicha hisoblanadi (seed bilan),
 * shuning uchun har renderda bir xil chiqadi va holat saqlanmaydi.
 */
export const Sparks: React.FC<{
  at: number;
  x: number;
  y: number;
  count?: number;
  dur?: number;
  spread?: number;
  color?: string;
  gravity?: number;
}> = ({ at, x, y, count = 48, dur = 34, spread = 520, color = C.amber, gravity = 1500 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const d = frame - at;
  if (d < 0 || d > dur) return null;
  const t = d / fps;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const a = random(`sa${at}${i}`) * Math.PI * 2;
        const v = (0.35 + random(`sv${at}${i}`) * 0.65) * spread;
        const px = x + Math.cos(a) * v * t;
        const py = y + Math.sin(a) * v * t + 0.5 * gravity * t * t;
        const life = 1 - d / dur;
        const size = 4 + random(`ss${at}${i}`) * 9;
        const c = random(`sc${at}${i}`) > 0.72 ? C.ink : color;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity: life ** 1.4,
              boxShadow: `0 0 ${size * 2.6}px ${c}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Konfetti (yashil g'alaba uchun)                                      */

export const Confetti: React.FC<{ at: number; dur?: number; count?: number }> = ({
  at,
  dur = 70,
  count = 56,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const d = frame - at;
  if (d < 0 || d > dur) return null;
  const t = d / fps;
  const palette = [C.green, C.blue, C.amber, C.ink];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: count }, (_, i) => {
        const x0 = random(`cx${i}`) * width;
        /* Boshlang'ich balandlik ham tarqoq bo'lsin — aks holda hamma
           bo'lakchalar bitta gorizontal chiziqda turib, chiziqqa o'xshaydi. */
        const y0 = height * (0.3 + random(`cy${i}`) * 0.34);
        const vx = (random(`cvx${i}`) - 0.5) * 320;
        const vy = -(420 + random(`cvy${i}`) * 520);
        const px = x0 + vx * t;
        const py = y0 + vy * t + 0.5 * 1400 * t * t;
        if (py > height + 60) return null;
        const w = 12 + random(`cw${i}`) * 16;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: w,
              height: w * 0.45,
              background: palette[i % palette.length],
              opacity: Math.max(0, 1 - d / dur) ** 0.7,
              transform: `rotate(${d * (6 + (i % 5) * 3)}deg)`,
              borderRadius: 2,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Ekran yorishishi (avariya / impuls)                                  */

export const Flash: React.FC<{
  at: number;
  dur?: number;
  color?: string;
  peak?: number;
}> = ({ at, dur = 9, color = C.red, peak = 0.5 }) => {
  const frame = useCurrentFrame();
  const d = frame - at;
  if (d < 0 || d > dur) return null;
  const o = (1 - d / dur) ** 1.8 * peak;
  return <AbsoluteFill style={{ background: color, opacity: o, pointerEvents: "none" }} />;
};

/* ------------------------------------------------------------------ */
/* Whip-pan — kadrlar orasidagi tez surilish                            */

export const WhipPan: React.FC<{
  children: React.ReactNode;
  /** Kirish kadri. */
  at: number;
  dur?: number;
  dir?: 1 | -1;
}> = ({ children, at, dur = 7, dir = 1 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const k = interpolate(frame, [at, at + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const e = k ** 2;
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${dir * e * width * 0.9}px)`,
        filter: e > 0.02 ? `blur(${e * 26}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Elektr liniyasi — chizilib ketadigan va tok yuguradigan              */

export const PowerLine: React.FC<{
  d: string;
  width?: number;
  height?: number;
  /** Chizilish boshlanadigan kadr. */
  at?: number;
  drawDur?: number;
  color?: string;
  stroke?: number;
  /** Chizilgandan keyin tok yugursinmi. */
  flow?: boolean;
}> = ({ d, width = 1080, height = 1920, at = 0, drawDur = 20, color = C.blue, stroke = 6, flow = true }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [at, at + drawDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <path
        d={d}
        fill="none"
        stroke={`${color}44`}
        strokeWidth={stroke}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - k}
      />
      {flow && k > 0.98 ? (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={stroke * 1.25}
          strokeLinecap="round"
          strokeDasharray="26 54"
          strokeDashoffset={-frame * 9}
          style={{ filter: `drop-shadow(0 0 14px ${color})` }}
        />
      ) : null}
    </svg>
  );
};
