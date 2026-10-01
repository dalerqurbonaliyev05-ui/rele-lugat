import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { T as TIME, SCRIPT, tr } from "../script";
import { C, glow } from "../theme";
import { FONT, MONO } from "../fonts";
import { Bg } from "../components/Bg";
import { Flash, Shake, Sparks } from "../components/Fx";
import { Clip, Phone } from "../components/Phone";
import { Kinetic } from "../components/Text";
import { metrics, Safe, type SceneProps } from "../components/Layout";
import { at, END, rate } from "../clips";

/**
 * 13.0вЂ“17.0 s вЂ” O'YIN 2: "Xato = avariya".
 * Haqiqiy yozuv: noto'g'ri javob в†’ AVARIYA (silkinish, qizil), keyin to'g'ri
 * javob в†’ yashil. O'rtada split-screen: chapda qizil, o'ngda yashil.
 */
export const Game2: React.FC<{ dur: number } & SceneProps> = ({ lang, aspect, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const m = metrics(aspect);
  const t = TIME.game2;

  const aLen = t.goodIn; // xato bo'lagi
  const bLen = dur - aLen; // to'g'ri bo'lagi

  const badRate = rate("quiz", "wrongTap", "question2", aLen, fps, 1, 2.2);
  const goodRate = rate("quiz", "question2", END, bLen, fps, 1, 2.2);

  /**
   * Qoplama effektlar (silkinish, qizil chaqnash, shtamp) ilovaning o'z
   * AVARIYA paneli ekranda paydo bo'lgan kadrda ishga tushadi вЂ” vaqt yozuv
   * belgilaridan hisoblanadi, qo'lda tanlanmaydi.
   */
  const badAt = Math.round(((at("quiz", "alarm") - at("quiz", "wrongTap")) / badRate) * fps);
  const goodAt = aLen + Math.round(((at("quiz", "ok") - at("quiz", "question2")) / goodRate) * fps);

  /** Ekranda allaqachon ikkinchi (to'g'ri) savol turibdi. */
  const onGoodClip = frame >= aLen;
  const isGood = frame >= goodAt;
  const goodSpring = spring({
    frame: frame - goodAt,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 170 },
  });

  /* split-screen pardasi вЂ” chapdan qizil, o'ngdan yashil */
  const split = interpolate(frame, [t.splitIn, t.splitIn + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phone = (
    <Phone
      width={m.phone}
      glowColor={onGoodClip ? C.green : C.red}
      glowStrength={isGood ? 0.3 + goodSpring * 0.5 : onGoodClip ? 0.35 : 0.65}
    >
      <Sequence durationInFrames={aLen}>
        <Clip name="quiz" fromSeconds={at("quiz", "wrongTap")} playbackRate={badRate} />
      </Sequence>
      <Sequence from={aLen}>
        <Clip name="quiz" fromSeconds={at("quiz", "question2")} playbackRate={goodRate} />
      </Sequence>
    </Phone>
  );

  return (
    <AbsoluteFill>
      <Bg heat={onGoodClip ? 0 : 0.55} pulse={false} />

      {/* split-screen rang pardalari */}
      <AbsoluteFill style={{ opacity: split * (onGoodClip ? 1 : 0.85) }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            right: "50%",
            background: `linear-gradient(90deg, ${C.red}2e, rgba(0,0,0,0))`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            left: "50%",
            background: `linear-gradient(270deg, ${C.green}2e, rgba(0,0,0,0))`,
            opacity: onGoodClip ? 1 : 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: 3,
            background: `linear-gradient(180deg, rgba(0,0,0,0), ${C.ink2}66, rgba(0,0,0,0))`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Shake at={badAt} dur={18} amount={20}>
          {phone}
        </Shake>
      </AbsoluteFill>

      {/* avariya */}
      <Flash at={badAt} dur={10} color={C.red} peak={0.22} />
      <Sparks at={badAt} x={width / 2} y={height * 0.5} count={34} spread={420} color={C.red} />
      {/* to'g'ri javob */}
      <Flash at={goodAt} dur={9} color={C.green} peak={0.16} />

      {/* XATO / TO'G'RI shtamplari */}
      <Safe aspect={aspect} place="top">
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Stamp
            label={tr(SCRIPT.game2.bad, lang)}
            color={C.red}
            at={badAt}
            frame={frame}
            fps={fps}
            dim={onGoodClip}
            small={m.square}
          />
          {frame >= goodAt ? (
            <Stamp
              label={tr(SCRIPT.game2.good, lang)}
              color={C.green}
              at={goodAt}
              frame={frame}
              fps={fps}
              small={m.square}
            />
          ) : null}
        </div>
        <div style={{ height: 22 }} />
        <Kinetic
          text={tr(SCRIPT.game2.line, lang)}
          from={t.lineIn}
          size={m.title * 0.72}
          highlight={[tr(SCRIPT.game2.line, lang).split(" ").slice(-1)[0] ?? ""]}
          highlightColor={C.green}
          maxWidth={width * 0.88}
        />
      </Safe>

      {/* pastdagi kichik izoh вЂ” ilovadagi tushuntirish shu yerda chiqadi */}
      <Safe aspect={aspect} place="bottom">
        <div
          style={{
            opacity: interpolate(frame, [t.hintIn, t.hintIn + 8], [0, 1], { extrapolateRight: "clamp" }),
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: m.square ? 26 : 34,
            color: C.ink2,
            background: "rgba(8,13,24,.72)",
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: "14px 24px",
          }}
        >
          <span style={{ fontFamily: MONO, color: C.blue }}>i</span>
          {tr(SCRIPT.game2.hint, lang)}
        </div>
      </Safe>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */

const Stamp: React.FC<{
  label: string;
  color: string;
  at: number;
  frame: number;
  fps: number;
  dim?: boolean;
  small?: boolean;
}> = ({ label, color, at, frame, fps, dim = false, small = false }) => {
  const s = spring({ frame: frame - at, fps, config: { damping: 10, mass: 0.5, stiffness: 210 } });
  const blink = Math.floor((frame - at) / 5) % 2 === 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: small ? "12px 22px" : "16px 30px",
        borderRadius: 14,
        border: `3px solid ${color}`,
        background: "rgba(8,13,24,.78)",
        transform: `scale(${0.7 + s * 0.3}) rotate(${(1 - s) * -6}deg)`,
        opacity: dim ? 0.45 : 1,
        boxShadow: !dim && blink ? glow(color, 26) : "none",
      }}
    >
      <div
        style={{
          width: small ? 18 : 24,
          height: small ? 18 : 24,
          borderRadius: "50%",
          background: !dim && blink ? color : `${color}44`,
        }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 800,
          fontSize: small ? 34 : 46,
          letterSpacing: "0.16em",
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
};



