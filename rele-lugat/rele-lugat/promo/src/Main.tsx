import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";

import { CUTS, SHORT, span } from "./beats";
import { SCENE_SUB, SFX, tr, type Lang, type SceneName } from "./script";
import type { Aspect } from "./theme";
import { metrics } from "./components/Layout";
import { Subtitle } from "./components/Text";

import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Solution } from "./scenes/Solution";
import { Game1 } from "./scenes/Game1";
import { Game2 } from "./scenes/Game2";
import { PathScene } from "./scenes/PathScene";
import { Result } from "./scenes/Result";
import { Payoff } from "./scenes/Payoff";
import { Cta } from "./scenes/Cta";

/* `type` (interface emas) — Remotion `Composition` props'i
   `Record<string, unknown>` ga mos kelishi kerak. */
export type MainProps = {
  lang: Lang;
  aspect: Aspect;
  /** `full` — 30 s, `short` — 15 s kesim. */
  variant: "full" | "short";
};

/* ------------------------------------------------------------------ */

/** Bitta sahna: tasvir + subtitr + o'ziga tegishli SFX. */
const Scene: React.FC<{
  name: SceneName;
  from: number;
  dur: number;
  lang: Lang;
  aspect: Aspect;
  children: React.ReactNode;
}> = ({ name, from, dur, lang, aspect, children }) => {
  const m = metrics(aspect);
  return (
    <Sequence from={from} durationInFrames={dur} name={name} layout="none">
      <AbsoluteFill>
        {children}
        <Subtitle text={tr(SCENE_SUB[name], lang)} bottom={m.subBottom} />
        {SFX[name].map((c, i) => (
          <Sequence key={`${c.file}-${i}`} from={c.at} layout="none">
            <Audio
              src={staticFile(`sfx/${c.file}`)}
              volume={c.volume ?? 1}
              playbackRate={c.playbackRate ?? 1}
            />
          </Sequence>
        ))}
      </AbsoluteFill>
    </Sequence>
  );
};

/* ------------------------------------------------------------------ */

export const Main: React.FC<MainProps> = ({ lang, aspect, variant }) => {
  const p = { lang, aspect };

  if (variant === "short") {
    /* 15 s kesim: HOOK → O'YIN 1 → O'YIN 2 → CTA */
    return (
      <AbsoluteFill style={{ backgroundColor: "#0b1220" }}>
        <Scene name="hook" from={SHORT.hook.from} dur={SHORT.hook.dur} {...p}>
          <Hook {...p} />
        </Scene>
        <Scene name="game1" from={SHORT.game1.from} dur={SHORT.game1.dur} {...p}>
          <Game1 {...p} dur={SHORT.game1.dur} />
        </Scene>
        <Scene name="game2" from={SHORT.game2.from} dur={SHORT.game2.dur} {...p}>
          <Game2 {...p} dur={SHORT.game2.dur} />
        </Scene>
        <Scene name="cta" from={SHORT.cta.from} dur={SHORT.cta.dur} {...p}>
          <Cta {...p} dur={SHORT.cta.dur} />
        </Scene>
      </AbsoluteFill>
    );
  }

  const s = {
    hook: span("hook"),
    problem: span("problem"),
    solution: span("solution"),
    game1: span("game1"),
    game2: span("game2"),
    path: span("path"),
    result: span("result"),
    payoff: span("payoff"),
    cta: span("cta"),
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1220" }}>
      <Scene name="hook" from={s.hook.from} dur={s.hook.dur} {...p}>
        <Hook {...p} />
      </Scene>
      <Scene name="problem" from={s.problem.from} dur={s.problem.dur} {...p}>
        <Problem {...p} />
      </Scene>
      <Scene name="solution" from={s.solution.from} dur={s.solution.dur} {...p}>
        <Solution {...p} />
      </Scene>
      <Scene name="game1" from={s.game1.from} dur={s.game1.dur} {...p}>
        <Game1 {...p} dur={s.game1.dur} />
      </Scene>
      <Scene name="game2" from={s.game2.from} dur={s.game2.dur} {...p}>
        <Game2 {...p} dur={s.game2.dur} />
      </Scene>
      <Scene name="path" from={s.path.from} dur={s.path.dur} {...p}>
        <PathScene {...p} dur={s.path.dur} />
      </Scene>
      <Scene name="result" from={s.result.from} dur={s.result.dur} {...p}>
        <Result {...p} dur={s.result.dur} />
      </Scene>
      <Scene name="payoff" from={s.payoff.from} dur={s.payoff.dur} {...p}>
        <Payoff {...p} dur={s.payoff.dur} />
      </Scene>
      <Scene name="cta" from={s.cta.from} dur={s.cta.dur} {...p}>
        <Cta {...p} dur={s.cta.dur} />
      </Scene>
    </AbsoluteFill>
  );
};

export const TOTAL_FULL = CUTS.end;
export const TOTAL_SHORT = SHORT.total;
