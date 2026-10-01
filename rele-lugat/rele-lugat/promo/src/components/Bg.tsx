import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { beatPulse } from "../beats";
import { C } from "../theme";

/**
 * Umumiy fon: to'q gradient + susaygan to'r + sekin suruvchi "tok" chiziqlari.
 * Ilovaning fon uslubi bilan bir xil, lekin reklama uchun kattalashtirilgan.
 */
export const Bg: React.FC<{
  /** Fon qanchalik "qizigan" — 0 tinch, 1 avariya. */
  heat?: number;
  /** Beatda nafas olsinmi. */
  pulse?: boolean;
}> = ({ heat = 0, pulse = true }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const p = pulse ? beatPulse(frame) : 0;
  const accent = heat > 0.5 ? C.red : C.blue;
  const drift = (frame * 0.6) % 160;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      {/* markazdagi yumshoq yorug'lik */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 70% at 50% 42%, ${C.bg2} 0%, ${C.bg} 62%)`,
        }}
      />

      {/* to'r */}
      <AbsoluteFill
        style={{
          opacity: 0.1 + p * 0.03,
          backgroundImage:
            `linear-gradient(${accent}22 1px, transparent 1px),` +
            `linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `0px ${drift * 0.5}px`,
        }}
      />

      {/* diagonal "tok" chiziqlari */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0, opacity: 0.3 }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const y = -200 + i * 520 + drift;
          return (
            <path
              key={i}
              d={`M -200 ${y} L ${width + 200} ${y - 420}`}
              stroke={accent}
              strokeWidth={2}
              fill="none"
              strokeDasharray="22 46"
              strokeDashoffset={-frame * (5 + i)}
              opacity={0.18 + (i % 2) * 0.1}
            />
          );
        })}
      </svg>

      {/* avariya nurlanishi */}
      {heat > 0 ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(90% 55% at 50% 50%, ${C.red}00 40%, ${C.red}${Math.round(heat * 44).toString(16).padStart(2, "0")} 100%)`,
          }}
        />
      ) : null}

      {/* vinyetka — matn doim kontrastli bo'lsin */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 78% at 50% 48%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.62) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
