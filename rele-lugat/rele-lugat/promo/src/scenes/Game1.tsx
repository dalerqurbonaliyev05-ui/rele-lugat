import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Confetti, Flash } from "../components/Fx";
import { Clip, Phone } from "../components/Phone";
import { Kinetic, Plate } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at, END, rate } from "../clips";

/**
 * 8.0вЂ“13.0 s вЂ” O'YIN 1: "Sxemani yig'".
 *
 * Ikki bo'lak bitta yozuvdan olinadi va beatda kesiladi (speed ramp):
 *   A вЂ” detallarni sudrash (tezlashtirilgan),
 *   B вЂ” zanjir yopilgan payt (sekinroq, "wow" lahza).
 * Bo'laklar yozuv paytida qo'yilgan belgilarga bog'langan.
 */
export const Game1: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.game1;

  /**
   * Uchta sudrash ketma-ket "jump-cut" bilan ko'rsatiladi (har biri 1 soniya,
   * ritmga tushadi), so'ng zanjirning yopilishi вЂ” eng uzun va eng "wow" bo'lak.
   */
  const segLen = Math.round(fps); // 1 s = 2 beat
  const dragSegs = ["drag1", "drag3", "drag5"];
  const aLen = segLen * dragSegs.length;
  const bLen = dur - aLen;

  const winRate = rate("circuit", "check", END, bLen, fps, 1, 2.4);

  const winAt = aLen; // B bo'lagining boshi вЂ” "zanjir yopildi" lahzasi
  const win = spring({
    frame: frame - winAt,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 170 },
  });
  const isWin = frame >= winAt;

  return (
    <AbsoluteFill>
      <Bg heat={0} />

      {/* yashil g'alaba nurlanishi */}
      {isWin ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(64% 40% at 50% 46%, ${C.green}33, rgba(0,0,0,0) 70%)`,
            opacity: win,
          }}
        />
      ) : null}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Phone
          width={m.phone}
          scale={1 + (isWin ? win * 0.04 : 0)}
          glowColor={isWin ? C.green : C.blue}
          glowStrength={isWin ? 0.3 + win * 0.6 : 0.4}
        >
          {/* A вЂ” uchta haqiqiy sudrash, ritmda kesilgan */}
          {dragSegs.map((mark, i) => (
            <Sequence key={mark} from={i * segLen} durationInFrames={segLen}>
              <Clip name="circuit" fromSeconds={at("circuit", mark)} playbackRate={1.25} />
            </Sequence>
          ))}
          {/* B вЂ” zanjir yopildi, tok yuguradi, konfetti */}
          <Sequence from={aLen}>
            <Clip name="circuit" fromSeconds={at("circuit", "check")} playbackRate={winRate} />
          </Sequence>
        </Phone>
      </AbsoluteFill>

      <Flash at={winAt} dur={8} color={C.green} peak={0.26} />
      <Confetti at={winAt + 2} dur={64} count={54} />

      <Safe aspect={aspect} place="top">
        <div style={{ opacity: interpolate(frame, [t.tagIn, t.tagIn + 7], [0, 1], { extrapolateRight: "clamp" }) }}>
          <Plate color={isWin ? C.green : C.amber}>{tr(SCRIPT.game1.tag, lang)}</Plate>
        </div>
        <div style={{ height: 22 }} />
        <Kinetic
          text={tr(SCRIPT.game1.line, lang)}
          from={t.lineIn}
          size={m.title * 0.8}
          highlight={[tr(SCRIPT.game1.line, lang).split(" ")[0] ?? ""]}
          highlightColor={C.amber}
          maxWidth={width * 0.86}
        />
      </Safe>

      {/* "ZANJIR YOPILDI" вЂ” g'alaba shtampi */}
      {isWin ? (
        <Safe aspect={aspect} place="bottom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "18px 34px",
              borderRadius: 16,
              border: `3px solid ${C.green}`,
              background: "rgba(6,32,18,.76)",
              transform: `scale(${0.76 + win * 0.24})`,
              boxShadow: glow(C.green, 30),
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: C.green,
                boxShadow: glow(C.green, 20),
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 800,
                fontSize: m.square ? 40 : 50,
                letterSpacing: "0.16em",
                color: C.green,
              }}
            >
              {tr(SCRIPT.game1.done, lang)}
            </span>
          </div>
        </Safe>
      ) : null}
    </AbsoluteFill>
  );
};

