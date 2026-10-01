import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { MONO } from "../fonts";

/**
 * Tungi stol sahnasi — stilizatsiya qilingan illyustratsiya (ilovaning
 * ekrani emas): stol chiroq, konspekt, telefon va deraza.
 *
 * `lamp`  — chiroq yorqinligi 0…1
 * `dawn`  — derazadagi tong 0…1
 */
export const Room: React.FC<{
  lamp: number;
  dawn?: number;
  /** Qog'ozdagi formulalar ko'rinsinmi. */
  notes?: boolean;
}> = ({ lamp, dawn = 0, notes = true }) => {
  const frame = useCurrentFrame();
  const warm = `rgba(255, 198, 41, ${0.1 + lamp * 0.5})`;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1526" />
            <stop offset="100%" stopColor="#070b14" />
          </linearGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dawn > 0 ? "#1b2b52" : "#070c18"} />
            <stop offset="100%" stopColor={dawn > 0 ? "#f0a24a" : "#0b1526"} stopOpacity={dawn > 0 ? dawn : 1} />
          </linearGradient>
          <radialGradient id="cone" cx="50%" cy="0%" r="88%">
            <stop offset="0%" stopColor="#ffc629" stopOpacity={0.5 * lamp} />
            <stop offset="100%" stopColor="#ffc629" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b2740" />
            <stop offset="100%" stopColor="#0d1424" />
          </linearGradient>
        </defs>

        {/* devor */}
        <rect width="1080" height="1920" fill="url(#wall)" />

        {/* deraza */}
        <g>
          <rect x="628" y="300" width="360" height="430" rx="10" fill="url(#sky)" opacity={0.95} />
          <rect x="628" y="300" width="360" height="430" rx="10" fill="none" stroke="#243352" strokeWidth="8" />
          <line x1="808" y1="300" x2="808" y2="730" stroke="#243352" strokeWidth="8" />
          <line x1="628" y1="515" x2="988" y2="515" stroke="#243352" strokeWidth="8" />
          {/* yulduzlar — tong kelganda so'nadi */}
          {Array.from({ length: 16 }, (_, i) => (
            <circle
              key={i}
              cx={650 + random(`stx${i}`) * 320}
              cy={318 + random(`sty${i}`) * 180}
              r={1.6 + random(`str${i}`) * 2}
              fill="#cfe0ff"
              opacity={(0.25 + random(`sto${i}`) * 0.6) * (1 - dawn)}
            />
          ))}
        </g>

        {/* chiroq nuri konusi */}
        <path d="M 300 560 L 170 1180 L 700 1180 L 430 560 Z" fill="url(#cone)" />

        {/* stol chiroq */}
        <g>
          <rect x="332" y="552" width="96" height="16" rx="6" fill="#2a3752" />
          <path d="M 300 552 L 460 552 L 420 470 L 340 470 Z" fill="#223052" stroke="#32456c" strokeWidth="5" />
          <line x1="380" y1="568" x2="380" y2="1100" stroke="#2a3752" strokeWidth="12" />
          <rect x="316" y="1096" width="128" height="18" rx="8" fill="#2a3752" />
          {/* lampochka */}
          <circle cx="380" cy="546" r={26} fill="#ffc629" opacity={0.25 + lamp * 0.75} />
          <circle cx="380" cy="546" r={62} fill="#ffc629" opacity={lamp * 0.3} />
          <circle cx="380" cy="546" r={120} fill="#ffc629" opacity={lamp * 0.12} />
        </g>

        {/* stol */}
        <rect x="0" y="1180" width="1080" height="36" fill="#2b3a5c" />
        <rect x="0" y="1216" width="1080" height="704" fill="url(#desk)" />

        {/* konspekt daftar */}
        <g transform="translate(140 1000) rotate(-4)">
          <rect width="470" height="190" rx="8" fill="#e9eef8" opacity={0.1 + lamp * 0.78} />
          {notes
            ? [0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={28}
                y={34 + i * 30}
                width={160 + random(`ln${i}`) * 250}
                height={8}
                rx={4}
                fill="#0b1220"
                opacity={(0.25 + lamp * 0.5) * 0.8}
              />
            ))
            : null}
          <text x={28} y={24} fill="#0b1220" opacity={0.2 + lamp * 0.6} fontSize={22} fontFamily={MONO} fontWeight={700}>
            I = k · I / k · I
          </text>
        </g>

        {/* qalam */}
        <rect x="640" y="1120" width="190" height="12" rx="6" fill="#8ea0bf" opacity={0.25 + lamp * 0.45} transform="rotate(-7 640 1120)" />
      </svg>

      {/* iliq yorug'lik qatlami */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(44% 26% at 35% 44%, ${warm}, rgba(0,0,0,0) 72%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* tong yorug'ligi */}
      {dawn > 0 ? (
        <AbsoluteFill
          style={{
            background: `linear-gradient(210deg, rgba(255,186,96,${0.3 * dawn}) 0%, rgba(255,186,96,0) 48%)`,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ) : null}

      {/* yengil film donasi — "tirik" tuyulsin */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: `radial-gradient(${C.ink} 1px, transparent 1px)`,
          backgroundSize: "3px 3px",
          backgroundPosition: `${(frame * 7) % 3}px ${(frame * 11) % 3}px`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
