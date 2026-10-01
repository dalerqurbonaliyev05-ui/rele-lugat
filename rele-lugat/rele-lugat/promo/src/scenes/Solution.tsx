import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { FONT } from "../fonts";
import { Bg } from "../components/Bg";
import { PowerLine } from "../components/Fx";
import { Clip, Phone } from "../components/Phone";
import { CountUp, Kinetic, Plate } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at, END, rate } from "../clips";

/**
 * 5.0вЂ“8.0 s вЂ” YECHIM.
 * Telefon qorong'ulikdan 3D aylanib chiqadi, ilovaning haqiqiy bosh ekrani,
 * raqamlar sanab chiqadi, xonadagi chiroq birinchi marta yonadi.
 */
export const Solution: React.FC<SceneProps> = ({ lang, aspect }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.solution;

  /* telefonning 3D kirishi */
  const s = spring({
    frame: frame - t.phoneIn,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 120 },
  });
  const rotY = interpolate(s, [0, 1], [-74, 0]);
  const rotX = interpolate(s, [0, 1], [16, 0]);
  const scale = interpolate(s, [0, 1], [0.62, 1]);

  /* chiroq qaytib yonadi */
  const lamp = interpolate(frame, [t.lampOn, t.lampOn + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clipRate = rate("home", "bento", END, 90, fps, 1, 2.2);

  return (
    <AbsoluteFill>
      <Bg heat={0} />

      {/* chiroq qaytganda iliq yorug'lik */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(70% 44% at 50% 40%, rgba(255,198,41,${0.22 * lamp}), rgba(0,0,0,0) 70%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* kabelda yuguruvchi tok вЂ” telefonga "ulanish" */}
      <PowerLine
        d={`M -40 ${height * 0.86} C ${width * 0.3} ${height * 0.82}, ${width * 0.34} ${height * 0.62}, ${width * 0.5} ${height * 0.6}`}
        width={width}
        height={height}
        at={t.clipIn}
        drawDur={16}
        color={C.blue}
        stroke={7}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Phone
          width={m.phone}
          rotateY={rotY}
          rotateX={rotX}
          scale={scale}
          glowStrength={0.35 + lamp * 0.45}
        >
          <Clip name="home" fromSeconds={at("home", "bento")} playbackRate={clipRate} />
        </Phone>
      </AbsoluteFill>

      {/* yuqorida plastinka */}
      <Safe aspect={aspect} place="top">
        <div style={{ opacity: interpolate(frame, [t.clipIn, t.clipIn + 8], [0, 1], { extrapolateRight: "clamp" }) }}>
          <Plate color={C.blue}>Rele Lug&apos;at</Plate>
        </div>
        <div style={{ height: 24 }} />
        <Kinetic
          text={tr(SCRIPT.solution.line, lang)}
          from={t.clipIn + 4}
          size={m.title * 0.74}
          highlight={[tr(SCRIPT.solution.line, lang).split(" ")[0] ?? ""]}
          highlightColor={C.blue}
          maxWidth={width * 0.84}
        />
      </Safe>

      {/* raqamlar вЂ” ilovadagi haqiqiy sonlar */}
      <Safe aspect={aspect} place="bottom">
        <div style={{ display: "flex", gap: m.square ? 28 : 46, justifyContent: "center" }}>
          {SCRIPT.solution.stats.map((st, i) => (
            <div key={st.n} style={{ textAlign: "center" }}>
              <CountUp
                to={st.n}
                from={t.statsIn + i * 5}
                dur={26}
                size={m.square ? 56 : 78}
                color={i === 0 ? C.amber : i === 1 ? C.blue : C.green}
              />
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: m.square ? 24 : 32,
                  color: C.ink2,
                  marginTop: 2,
                  textShadow: glow("#000", 6),
                }}
              >
                {tr(st.label, lang)}
              </div>
            </div>
          ))}
        </div>
      </Safe>
    </AbsoluteFill>
  );
};

