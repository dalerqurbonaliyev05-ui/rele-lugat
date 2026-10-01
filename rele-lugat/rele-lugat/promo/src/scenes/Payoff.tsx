import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C } from "../theme";
import { Clip, Phone } from "../components/Phone";
import { Kinetic } from "../components/Text";
import { Room } from "../components/Room";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at } from "../clips";

/**
 * 25.0–28.0 s — PAYOFF.
 * Boshlang'ich xonaga qaytamiz: chiroq to'liq yonadi, derazada tong,
 * telefon kameraga qarab kattalashadi.
 */
export const Payoff: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.payoff;

  const lamp = interpolate(frame, [0, t.lampFull], [0.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dawn = interpolate(frame, [t.lampFull - 10, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* telefon kameraga yaqinlashadi */
  const zoom = spring({
    frame: frame - Math.round(dur * 0.35),
    fps,
    config: { damping: 18, mass: 1.1, stiffness: 90 },
  });

  return (
    <AbsoluteFill>
      <Room lamp={lamp} dawn={dawn} />

      {/* Stoldagi telefon kameraga qarab ko'tariladi, lekin xonani yopib
          qo'ymaydi — payoff xonaning yorishishi haqida. */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Phone
          width={m.phone * (0.44 + zoom * 0.34)}
          rotateX={interpolate(zoom, [0, 1], [34, 6])}
          rotateZ={interpolate(zoom, [0, 1], [-8, -2])}
          glowColor={C.amber}
          glowStrength={0.25 + lamp * 0.4}
          style={{ transform: `translateY(${interpolate(zoom, [0, 1], [300, 170])}px)` }}
        >
          <Clip name="home" fromSeconds={at("home", "bento")} playbackRate={1} />
        </Phone>
      </AbsoluteFill>

      <Safe aspect={aspect} place="top">
        <Kinetic
          text={tr(SCRIPT.payoff.l1, lang)}
          from={t.l1In}
          size={m.title * 0.78}
          color={C.ink}
          maxWidth={width * 0.86}
        />
        <div style={{ height: 12 }} />
        <Kinetic
          text={tr(SCRIPT.payoff.l2, lang)}
          from={t.l2In}
          size={m.title}
          color={C.amber}
          highlight={tr(SCRIPT.payoff.l2, lang).split(" ")}
          highlightColor={C.amber}
          maxWidth={width * 0.86}
        />
      </Safe>
    </AbsoluteFill>
  );
};
