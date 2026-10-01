import { useMemo, useState } from "react";
import { DigitalDisplay, Gauge, Led, Panel, PhysButton } from "../components/Panel";
import { NETWORK, SCENARIOS, TIME_EXERCISES } from "../data/scenarios";
import { useI18n } from "../i18n";
import { useReducedMotion } from "../lib/anim";
import { alarmFlash, confetti, fxAlarm, fxOk, fxSurge, shuffle } from "../lib/fx";
import { NetworkView } from "../lib/svg";
import * as St from "../store";
import { BackBtn, LecBadge, Progress, useNav } from "../ui";

/** "Qayerga qaysi rele?" stsenariy o'yini. */
export default function Scenario() {
  const { t, x } = useI18n();
  const { go } = useNav();
  const reduce = useReducedMotion();
  const list = useMemo(() => shuffle(SCENARIOS), []);
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(0);
  const [bad, setBad] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  if (i >= list.length) {
    const pct = Math.round((ok / list.length) * 100);
    if (pct >= 70) confetti(80);
    return (
      <div>
        <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
        <Panel label={t("result")} tone={pct >= 70 ? "ok" : "warn"}>
          <div className="center">
            <Gauge pct={pct} size={150}
              value={<DigitalDisplay value={pct} unit="%" size="lg" tone={pct >= 70 ? "green" : "amber"} />} />
            <div className="row" style={{ justifyContent: "center", marginTop: 8 }}>
              <span className="chip"><Led color="green" on size={7} /> {ok}</span>
              <span className="chip"><Led color="red" on={bad > 0} size={7} /> {bad}</span>
            </div>
          </div>
          <div style={{ height: 12 }} />
          <PhysButton wide tone="primary" onClick={() => go({ name: "scenario" })}>{t("again")}</PhysButton>
          <div style={{ height: 8 }} />
          <PhysButton wide tone="ghost" onClick={() => go({ name: "timing" })}>{t("timingTitle")}</PhysButton>
        </Panel>
      </div>
    );
  }

  const s = list[i];
  const answered = picked !== null;
  const good = picked === s.a;
  const correctLabel = x(s.options[s.a]);
  const activeQ = answered && /^Q\d$/.test(correctLabel) ? correctLabel : null;
  const order = shuffleStable(s.id, s.options.length);

  const pick = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    if (idx === s.a) {
      setOk((n) => n + 1);
      St.addXp(7);
      fxOk();
      window.setTimeout(fxSurge, 140);
    } else {
      setBad((n) => n + 1);
      St.pushMistake("quiz", `scn#${s.id}`);
      fxAlarm();
      alarmFlash();
    }
  };

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
      <Progress pct={(i / list.length) * 100} />

      <Panel
        label={x(s.title)}
        tone={answered ? (good ? "ok" : "alarm") : undefined}
        right={<Led color={answered ? (good ? "green" : "red") : "off"} on size={9} blink={answered && !good} />}
      >
        <div className="row" style={{ marginBottom: 8 }}>
          <LecBadge id={s.lec} />
          <span className="chip">{i + 1} / {list.length}</span>
        </div>

        <div className="cbox" style={{ margin: "0 0 10px", position: "static" }}>
          <NetworkView net={NETWORK} faultId={s.fault} activeQ={activeQ} reduceMotion={reduce} />
        </div>

        <h3 style={{ fontSize: 15, marginBottom: 10 }}>{x(s.q)}</h3>

        {order.map((orig) => {
          let cls = "opt";
          if (answered) {
            if (orig === s.a) cls += " ok";
            else if (orig === picked) cls += " bad";
            else cls += " dim";
          }
          return (
            <button key={orig} className={cls} onClick={() => pick(orig)}>
              {x(s.options[orig])}
            </button>
          );
        })}

        {answered ? (
          <>
            <div className={good ? "ok-bar" : "alarm-bar"}>
              <Led color={good ? "green" : "red"} on size={9} blink={!good} />
              {good ? t("correctShort") : t("statusAlarm")}
            </div>
            <div className={`explain${good ? "" : " bad"}`}>{x(s.e)}</div>
            <div style={{ height: 10 }} />
            <PhysButton wide tone="primary" onClick={() => { setPicked(null); setI(i + 1); }}>
              {i + 1 >= list.length ? t("result") : t("next")}
            </PhysButton>
          </>
        ) : null}
      </Panel>
    </div>
  );
}

/** Savol id'si bo'yicha barqaror aralashtirish. */
function shuffleStable(seedStr: string, n: number): number[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 99991;
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ------------------------------------------------------------------ */
/* Vaqt pog'onasi mashqi                                                */

export function Timing() {
  const { t, x } = useI18n();
  const { go } = useNav();
  const reduce = useReducedMotion();
  const [nonce, setNonce] = useState(0);
  const ex = useMemo(
    () => TIME_EXERCISES[Math.floor(Math.random() * TIME_EXERCISES.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nonce],
  );

  const order = ["RH3", "RH2", "RH1"];
  const [vals, setVals] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allGood = Object.keys(ex.answer).every(
    (k) => Math.abs(parseFloat(vals[k] ?? "") - ex.answer[k]) < 0.001,
  );

  const lineOf = (rh: string) => (rh === "RH1" ? "A-B" : rh === "RH2" ? "B-C" : "C-D");

  const doCheck = () => {
    setChecked(true);
    if (allGood) { confetti(70); fxOk(); St.addXp(20); }
    else { fxAlarm(); alarmFlash(); }
  };

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
      <Panel
        label={`Δt = ${ex.dt} s`}
        tone={checked ? (allGood ? "ok" : "alarm") : undefined}
        right={<LecBadge id={ex.lec} />}
      >
        <h3 style={{ margin: "0 0 4px" }}>{x(ex.title)}</h3>
        <div className="tiny muted" style={{ marginBottom: 10 }}>{x(ex.desc)}</div>

        <div className="cbox" style={{ position: "static" }}>
          <NetworkView net={NETWORK} reduceMotion={reduce} />
        </div>

        {order.map((rh) => {
          const given = ex.given[rh] !== undefined;
          const val = given ? String(ex.given[rh]) : (vals[rh] ?? "");
          const good = checked && !given
            ? Math.abs(parseFloat(val) - ex.answer[rh]) < 0.001
            : null;
          return (
            <div className="match-row" key={rh}>
              <div className="ml">{`${rh} — ${lineOf(rh)} ${t("lineOf")}`}</div>
              <input
                type="number" step="0.1" placeholder="s" value={val} disabled={given || checked}
                style={{
                  opacity: given ? 0.7 : 1,
                  outline: good === null ? undefined : `2px solid var(--${good ? "ok" : "bad"})`,
                }}
                onChange={(e) => setVals((v) => ({ ...v, [rh]: e.target.value }))}
              />
            </div>
          );
        })}

        {!checked ? (
          <PhysButton wide tone="primary" onClick={doCheck}>{t("check")}</PhysButton>
        ) : (
          <>
            <div className={allGood ? "ok-bar" : "alarm-bar"}>
              <Led color={allGood ? "green" : "red"} on size={9} blink={!allGood} />
              {allGood ? t("correctShort") : t("statusAlarm")}
            </div>
            <div className={`explain${allGood ? "" : " bad"}`}>
              {allGood
                ? x(ex.e)
                : `${t("correctAnswer")} ${Object.keys(ex.answer).map((k) => `${k} = ${ex.answer[k]} s`).join(", ")}. ${x(ex.e)}`}
            </div>
            <div style={{ height: 10 }} />
            <PhysButton wide tone="primary"
              onClick={() => { setVals({}); setChecked(false); setNonce((n) => n + 1); }}>
              {t("newTask")}
            </PhysButton>
          </>
        )}
      </Panel>
    </div>
  );
}
