import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Flash } from "../components/Fx";
import { Clip, Phone } from "../components/Phone";
import { Kinetic, Plate } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at, END, rate } from "../clips";

/**
 * 17.0–21.0 s — YO'L XARITASI.
 *
 * Ikki haqiqiy yozuv ritmda kesiladi:
 *   A — tarmoq xaritasi, energiyalangan tugunlar va tugun varaqasi,
 *   B — flashcard: KH ko'rsatgich bayroqchasi yashil tushadi.
 * Ikkita telefonni yonma-yon qo'yish o'rniga jump-cut ishlatiladi —
 * 1080 px enda matn ham, ekran ham o'qiladigan bo'lib qoladi.
 */
export const PathScene: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.path;

  const aLen = Math.round(dur * 0.58);
  const bLen = dur - aLen;

  const mapRate = rate("path", "map", END, aLen, fps, 1, 2.1);
  const cardRate = rate("flash", "front", END, bLen, fps, 1, 2.1);

  const onCard = frame >= aLen;
  const cardIn = spring({
    frame: frame - aLen,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 160 },
  });

  const connected = frame >= t.connectedIn;

  return (
    <AbsoluteFill>
      <Bg heat={0} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Phone
          width={m.phone}
          glowColor={C.green}
          glowStrength={0.45}
          rotateY={onCard ? interpolate(cardIn, [0, 1], [18, 0]) : -5}
        >
          {/* A — tarmoq xaritasi */}
          <Sequence durationInFrames={aLen}>
            <Clip name="path" fromSeconds={at("path", "map")} playbackRate={mapRate} />
          </Sequence>
          {/* B — flashcard, KH bayroqchasi */}
          <Sequence from={aLen}>
            <Clip name="flash" fromSeconds={at("flash", "front")} playbackRate={cardRate} />
          </Sequence>
        </Phone>
      </AbsoluteFill>

      {connected ? <Flash at={t.connectedIn} dur={6} color={C.green} peak={0.07} /> : null}

      <Safe aspect={aspect} place="top">
        <div style={{ opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }) }}>
          <Plate color={C.green}>{onCard ? "KH" : tr(SCRIPT.path.connected, lang)}</Plate>
        </div>
        <div style={{ height: 20 }} />
        <Kinetic
          text={tr(SCRIPT.path.line, lang)}
          from={t.lineIn}
          size={m.title * 0.72}
          highlight={[tr(SCRIPT.path.line, lang).split(" ").slice(-1)[0]?.replace(".", "") ?? ""]}
          highlightColor={C.green}
          maxWidth={width * 0.88}
        />
      </Safe>

      {connected ? (
        <Safe aspect={aspect} place="bottom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 30px",
              borderRadius: 14,
              border: `2px solid ${C.green}`,
              background: "rgba(6,28,16,.8)",
              boxShadow: glow(C.green, 22),
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.green, boxShadow: glow(C.green, 16) }} />
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 800,
                fontSize: m.square ? 34 : 44,
                letterSpacing: "0.18em",
                color: C.green,
              }}
            >
              {tr(SCRIPT.path.connected, lang)}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 800,
                fontSize: m.square ? 34 : 44,
                color: C.ink,
                opacity: interpolate(frame, [t.connectedIn + 6, t.connectedIn + 14], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              5 / 15
            </span>
          </div>
        </Safe>
      ) : null}
    </AbsoluteFill>
  );
};
