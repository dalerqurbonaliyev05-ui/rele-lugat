import { useEffect, useMemo, useRef, useState } from "react";
import { DigitalDisplay, Gauge, Led, Panel, PhysButton } from "../components/Panel";
import { lecById } from "../data/lectures";
import { useI18n } from "../i18n";
import { alarmFlash, confetti, fxAlarm, fxOk, shuffle, spark } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, Progress, Tile, useNav } from "../ui";
import type { Quiz } from "../types";

export interface QuizItem {
  q: Quiz;
  /** QUIZZES massividagi global indeks (progress kaliti) yoki null */
  i: number | null;
}

interface Props {
  items: QuizItem[];
  backLabel: string;
  onBack: () => void;
  onAgain: () => void;
  limitSec?: number;
  onFinish?: (pct: number) => void;
}

export default function QuizRunner({ items, backLabel, onBack, onAgain, limitSec, onFinish }: Props) {
  const { t, x } = useI18n();
  const { go } = useNav();

  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState(0);
  const [bad, setBad] = useState(0);
  const [lastGood, setLastGood] = useState(false);
  const [weak, setWeak] = useState<Record<number, number>>({});
  const [left, setLeft] = useState(limitSec ?? 0);
  const [done, setDone] = useState(false);
  const started = useRef(Date.now());

  /* taymer */
  useEffect(() => {
    if (!limitSec || done) return;
    const id = setInterval(() => {
      const rest = Math.max(0, limitSec - Math.floor((Date.now() - started.current) / 1000));
      setLeft(rest);
      if (rest <= 0) setDone(true);
    }, 500);
    return () => clearInterval(id);
  }, [limitSec, done]);

  const finished = done || i >= items.length;

  useEffect(() => {
    if (!finished) return;
    const total = ok + bad;
    const pct = total ? Math.round((ok / total) * 100) : 0;
    if (pct >= 70) confetti(90);
    onFinish?.(pct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const cur = items[i];

  const order = useMemo(() => {
    if (!cur) return [];
    if (cur.q.type === "mcq") return shuffle(cur.q.o.map((_, k) => k));
    if (cur.q.type === "tf") return [0, 1];
    return [];
  }, [cur]);

  const score = (good: boolean, q: Quiz, gi: number | null, ev?: { x: number; y: number }) => {
    setLastGood(good);
    if (good) {
      setOk((n) => n + 1);
      St.addXp(6);
      fxOk();
    } else {
      setBad((n) => n + 1);
      setWeak((w) => ({ ...w, [q.l]: (w[q.l] ?? 0) + 1 }));
      fxAlarm();
      alarmFlash();
      if (ev) spark(ev.x, ev.y);
    }
    St.quizAnswer(q.l, gi, good);
  };

  /* ---------------- Natija ---------------- */
  if (finished) {
    const total = ok + bad;
    const pct = total ? Math.round((ok / total) * 100) : 0;
    const weakList = Object.keys(weak).map(Number).sort((a, b) => weak[b] - weak[a]);
    return (
      <div>
        <BackBtn label={backLabel} onClick={onBack} />
        <Panel
          label={t("result")}
          tone={pct >= 70 ? "ok" : pct >= 40 ? "warn" : "alarm"}
          right={<Led color={pct >= 70 ? "green" : pct >= 40 ? "amber" : "red"} on size={9} />}
        >
          <div className="center">
            <Gauge
              pct={pct}
              value={<DigitalDisplay value={pct} unit="%" size="lg" tone={pct >= 70 ? "green" : "amber"} />}
              label={done && i < items.length ? t("timeUp") : t("result")}
              size={150}
            />
            <div className="row" style={{ justifyContent: "center", marginTop: 8 }}>
              <span className="chip"><Led color="green" on size={7} /> {ok}</span>
              <span className="chip"><Led color="red" on={bad > 0} size={7} /> {bad}</span>
              <span className="chip">+{ok * 6} XP</span>
            </div>
          </div>

          {weakList.length ? (
            <>
              <div className="sep" />
              <div className="tiny muted" style={{ marginBottom: 6 }}>{t("weakTopics")}</div>
              <div className="stack">
                {weakList.slice(0, 5).map((L) => {
                  const lec = lecById(L);
                  return (
                    <Tile key={L} ico={String(L)} color={lec.color}
                      title={t("lectureN", { n: L })}
                      sub={`${t("mistakesN", { n: weak[L] })} · ${x(lec.title)}`}
                      onClick={() => go({ name: "quiz", lec: L })} />
                  );
                })}
              </div>
            </>
          ) : null}

          <div style={{ height: 12 }} />
          <PhysButton wide tone="primary" onClick={onAgain}>{t("again")}</PhysButton>
        </Panel>
      </div>
    );
  }

  const q = cur.q;

  return (
    <div>
      <BackBtn label={backLabel} onClick={onBack} />

      <div className="row" style={{ marginBottom: 8 }}>
        {limitSec ? (
          <span className="chip timer">
            ⏱ {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </span>
        ) : null}
        <LecBadge id={q.l} />
        <span className="chip">{i + 1} / {items.length}</span>
        <span className="spacer" />
        <Led color={answered ? (lastGood ? "green" : "red") : "off"} on size={9} />
      </div>

      <Progress pct={(i / items.length) * 100} />

      <Panel label={t("plPanel")} tone={answered ? (lastGood ? "ok" : "alarm") : undefined}>
        <h3 style={{ fontSize: 15.5, marginBottom: 12 }}>{x(q.q)}</h3>

        {q.type === "mcq" || q.type === "tf" ? (
          <ChoiceList
            labels={q.type === "tf" ? [t("trueLabel"), t("falseLabel")] : q.o.map((o) => x(o))}
            order={order}
            correct={q.type === "tf" ? (q.a ? 0 : 1) : q.a}
            answered={answered}
            picked={picked}
            onPick={(origIdx, ev) => {
              if (answered) return;
              setAnswered(true);
              setPicked(origIdx);
              score(origIdx === (q.type === "tf" ? (q.a ? 0 : 1) : q.a), q, cur.i, ev);
            }}
          />
        ) : (
          <MatchBlock
            q={q}
            answered={answered}
            onCheck={(allGood) => { setAnswered(true); score(allGood, q, cur.i); }}
          />
        )}

        {answered ? (
          <>
            <div className={lastGood ? "ok-bar" : "alarm-bar"}>
              <Led color={lastGood ? "green" : "red"} on size={9} blink={!lastGood} />
              {lastGood ? t("correctShort") : t("statusAlarm")}
            </div>
            <div className={`explain${lastGood ? "" : " bad"}`}>{x(q.e)}</div>
            <div style={{ height: 10 }} />
            <PhysButton
              wide tone="primary"
              onClick={() => { setAnswered(false); setPicked(null); setI(i + 1); }}
            >
              {i + 1 >= items.length ? t("seeResult") : t("nextQuestion")}
            </PhysButton>
          </>
        ) : null}
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ChoiceList({
  labels, order, correct, answered, picked, onPick,
}: {
  labels: string[]; order: number[]; correct: number;
  answered: boolean; picked: number | null;
  onPick: (origIdx: number, ev: { x: number; y: number }) => void;
}) {
  return (
    <>
      {order.map((orig) => {
        let cls = "opt";
        if (answered) {
          if (orig === correct) cls += " ok";
          else if (orig === picked) cls += " bad";
          else cls += " dim";
        }
        return (
          <button
            key={orig}
            className={cls}
            onClick={(e) => {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
              onPick(orig, { x: r.left + 18, y: r.top + r.height / 2 });
            }}
          >
            {labels[orig]}
          </button>
        );
      })}
    </>
  );
}

function MatchBlock({
  q, answered, onCheck,
}: {
  q: Extract<Quiz, { type: "match" }>; answered: boolean; onCheck: (allGood: boolean) => void;
}) {
  const { t, x } = useI18n();
  const rights = useMemo(() => shuffle(q.pairs.map((p) => x(p[1]))), [q, x]);
  const [vals, setVals] = useState<string[]>(() => q.pairs.map(() => ""));
  const [marks, setMarks] = useState<boolean[] | null>(null);

  const check = () => {
    const res = q.pairs.map((p, idx) => vals[idx] === x(p[1]));
    setMarks(res);
    setVals(q.pairs.map((p) => x(p[1])));
    onCheck(res.every(Boolean));
  };

  return (
    <>
      {q.pairs.map((p, idx) => (
        <div className="match-row" key={idx}>
          <div className="ml">{x(p[0])}</div>
          <select
            value={vals[idx]}
            disabled={answered}
            style={marks ? { outline: `2px solid var(--${marks[idx] ? "ok" : "bad"})` } : undefined}
            onChange={(e) => setVals((v) => v.map((old, k) => (k === idx ? e.target.value : old)))}
          >
            <option value="">{t("select")}</option>
            {rights.map((r, k) => (
              <option key={k} value={r}>{r}</option>
            ))}
          </select>
        </div>
      ))}
      {!answered ? (
        <PhysButton wide tone="primary" onClick={check}>{t("check")}</PhysButton>
      ) : null}
    </>
  );
}
