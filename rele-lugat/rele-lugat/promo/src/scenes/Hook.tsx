import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow, T } from "../theme";
import { MONO } from "../fonts";
import { Flash, Glitch, Shake, Sparks } from "../components/Fx";
import { Kinetic } from "../components/Text";
import { Room } from "../components/Room";
import { metrics, Safe, type SceneProps } from "../components/Layout";

/**
 * 0.0–2.5 s — HOOK.
 * Tungi 02:47, konspekt, chiroq pirpiraydi, qisqa tutashuv: BAM → AVARIYA.
 */
export const Hook: React.FC<SceneProps> = ({ lang, aspect }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.hook;

  /* --- chiroq: tinch → pirpirash → o'chish --- */
  const flickerK = interpolate(frame, [t.flicker, t.bam], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const noise = random(`fl${frame}`);
  const dead = frame >= t.bam;
  const lamp = dead
    ? Math.max(0, 0.06 - (frame - t.bam) * 0.01)
    : 1 - flickerK * (noise > 0.55 ? 0.85 : 0.12) * (0.35 + flickerK);

  /* --- BAM zarbasi --- */
  const bamSpring = spring({
    frame: frame - t.bam,
    fps,
    config: { damping: 9, mass: 0.5, stiffness: 190 },
  });
  const alarmOn = frame >= t.alarmIn;
  const alarmBlink = alarmOn && Math.floor((frame - t.alarmIn) / 5) % 2 === 0;

  const scene = (
    <AbsoluteFill>
      <Room lamp={lamp} />
      {/* qorong'ulik — chiroq o'chganda */}
      <AbsoluteFill style={{ background: "#05080f", opacity: dead ? 0.62 : 0 }} />
    </AbsoluteFill>
  );

  return (
    <AbsoluteFill>
      <Shake at={t.bam} dur={18} amount={26} fill>
        <Glitch at={t.bam} dur={16} amount={30}>
          {scene}
        </Glitch>
      </Shake>

      {/* uchqunlar — chiroq patronidan */}
      <Sparks at={t.bam} x={width * 0.352} y={height * 0.285} count={64} spread={620} />
      <Flash at={t.bam} dur={5} color={C.ink} peak={0.7} />
      <Flash at={t.bam + 5} dur={10} color={C.red} peak={0.16} />

      <Safe aspect={aspect} place="center" style={{ transform: `translateY(${m.shiftY}px)` }}>
        {/* soat */}
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 800,
            fontSize: m.square ? 110 : 160,
            color: dead ? C.red : C.amber,
            letterSpacing: "0.04em",
            textShadow: glow(dead ? C.red : C.amber, 30),
            opacity: interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${1 + bamSpring * 0.07})`,
          }}
        >
          {SCRIPT.hook.clock}
        </div>

        <div style={{ height: 26 }} />

        <Kinetic
          text={tr(SCRIPT.hook.line, lang)}
          from={t.lineIn}
          size={m.title * 0.72}
          color={C.ink}
          highlight={[tr(SCRIPT.hook.line, lang).split(" ")[1] ?? ""]}
          highlightColor={C.amber}
          maxWidth={width * 0.82}
        />

        {/* AVARIYA lampasi */}
        {alarmOn ? (
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "20px 38px",
              borderRadius: 18,
              border: `3px solid ${C.red}`,
              background: "rgba(40,6,10,.72)",
              transform: `scale(${0.7 + bamSpring * 0.3})`,
              boxShadow: alarmBlink ? glow(C.red, 44) : "none",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: alarmBlink ? C.red : "#4a1118",
                boxShadow: alarmBlink ? glow(C.red, 26) : "none",
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 800,
                fontSize: m.square ? 46 : T.small,
                letterSpacing: "0.2em",
                color: C.red,
              }}
            >
              {tr(SCRIPT.hook.alarm, lang)}
            </span>
          </div>
        ) : null}
      </Safe>
    </AbsoluteFill>
  );
};
