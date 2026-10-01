import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Flash, Sparks } from "../components/Fx";
import { Kinetic } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";

/**
 * 2.5–5.0 s — MUAMMO.
 * Qisqartmalar har tomondan uchib kelib markazda to'qnashadi, keyin javob.
 */
export const Problem: React.FC<SceneProps> = ({ lang, aspect }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.problem;

  const cx = width / 2;
  const cy = height * (m.square ? 0.42 : 0.4);

  const crashed = frame >= t.crash;
  const punch = spring({
    frame: frame - t.crash,
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 200 },
  });

  return (
    <AbsoluteFill>
      {/* Fon qizarib ketmasin — matn kontrasti yo'qoladi. */}
      <Bg heat={interpolate(frame, [0, t.crash], [0.08, 0.26], { extrapolateRight: "clamp" })} />

      {/* --- uchib keluvchi qisqartmalar --- */}
      <AbsoluteFill style={{ transform: `scale(${crashed ? 1 + punch * 0.06 : 1})` }}>
        {SCRIPT.problem.chips.map((chip, i) => {
          /* To'qnashuvdan oldin ulgurishi shart (interpolate oralig'i o'sib borsin). */
          const start = Math.min(i * t.chipStep, t.crash - 2);
          const a = (i / SCRIPT.problem.chips.length) * Math.PI * 2 + 0.4;
          const dist = 520 + random(`cd${i}`) * 420;
          const k = interpolate(frame, [start, t.crash], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const e = k ** 2; // tezlashib keladi

          /* to'qnashuvdan keyin tarqab ketadi */
          const after = crashed
            ? interpolate(frame, [t.crash, t.crash + 16], [0, 1], { extrapolateRight: "clamp" })
            : 0;
          const outD = after * (180 + random(`co${i}`) * 220);

          /* Markazda bitta nuqtaga yig'ilib qolmasin — halqa bo'lib to'planadi,
             shunda to'qnashuv paytida ham qisqartmalar o'qiladi. */
          const minR = m.square ? 120 : 165;
          const r = minR + dist * (1 - e) + outD;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.78;
          const rot = (random(`cr${i}`) - 0.5) * 40 * (1 - e) + after * (random(`cz${i}`) - 0.5) * 60;

          if (frame < start) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${0.6 + e * 0.6})`,
                fontFamily: MONO,
                fontWeight: 800,
                fontSize: m.square ? 62 : 86,
                color: i % 3 === 0 ? C.amber : i % 3 === 1 ? C.blue : C.ink2,
                textShadow: glow(i % 3 === 0 ? C.amber : C.blue, 18),
                opacity: Math.min(1, k * 1.6) * (1 - after * 0.9),
                whiteSpace: "nowrap",
              }}
            >
              {tr(chip, lang)}
            </div>
          );
        })}
      </AbsoluteFill>

      {crashed ? (
        <>
          <Sparks at={t.crash} x={cx} y={cy} count={40} spread={700} color={C.blue} />
          <Flash at={t.crash} dur={6} color={C.blue} peak={0.16} />
        </>
      ) : null}

      {/* --- savol va javob --- */}
      <Safe aspect={aspect} place="center" style={{ transform: `translateY(${m.square ? 110 : 230}px)` }}>
        <Kinetic
          text={tr(SCRIPT.problem.q, lang)}
          from={t.qIn}
          size={m.title * 0.78}
          maxWidth={width * 0.84}
        />
        <div style={{ height: 18 }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <Kinetic
            text={tr(SCRIPT.problem.no, lang)}
            from={t.noIn}
            size={m.title * 1.05}
            color={C.green}
            step={0}
          />
        </div>
        <div style={{ height: 14 }} />
        <Kinetic
          text={tr(SCRIPT.problem.a, lang)}
          from={t.aIn}
          size={m.body}
          color={C.ink2}
          step={3}
          maxWidth={width * 0.8}
        />
      </Safe>
    </AbsoluteFill>
  );
};
