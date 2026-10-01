import { useMemo, useState } from "react";
import { DigitalDisplay, Gauge, Led, Panel, PhysButton, SectionTitle } from "../components/Panel";
import { CALCULATORS, calcById } from "../data/calculators";
import { lecById } from "../data/lectures";
import { useI18n } from "../i18n";
import { alarmFlash, confetti, fxAlarm, fxOk, fxTap } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, Tile, useNav } from "../ui";
import type { CalcResult } from "../types";

export default function Calc({ id }: { id?: string }) {
  const { t, x } = useI18n();
  const { go } = useNav();

  if (!id) {
    const groups = new Map<string, typeof CALCULATORS>();
    for (const c of CALCULATORS) {
      const g = x(c.group);
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g)!.push(c);
    }
    return (
      <div>
        <Panel label={t("plCalc")} right={<span className="digit digit-sm digit-blue">{CALCULATORS.length}</span>}>
          <p className="small muted" style={{ margin: 0 }}>{t("calcIntro")}</p>
        </Panel>
        {[...groups.entries()].map(([gname, list]) => (
          <div key={gname}>
            <SectionTitle>{gname}</SectionTitle>
            <div className="stack">
              {list.map((c) => {
                const lec = lecById(c.lec);
                return (
                  <Tile key={c.id} ico="Σ" color={lec.color}
                    title={x(c.title)} sub={c.formula}
                    onClick={() => go({ name: "calc", id: c.id })} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const c = calcById(id);
  if (!c) return <Calc />;
  return <One key={c.id} id={c.id} />;
}

/* ------------------------------------------------------------------ */

function One({ id }: { id: string }) {
  const { t, x } = useI18n();
  const { go } = useNav();
  const c = calcById(id)!;

  const [practice, setPractice] = useState(false);
  const [vals, setVals] = useState<Record<string, string>>(
    () => Object.fromEntries(c.v.map((v) => [v.k, String(v.d)])),
  );
  const [res, setRes] = useState<CalcResult | null>(null);

  const [nonce, setNonce] = useState(0);
  const task = useMemo(() => {
    const g = c.gen();
    return { given: g, target: c.run(g) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, practice, c]);
  const [answer, setAnswer] = useState("");
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const [showSol, setShowSol] = useState(false);

  const nums = (): Record<string, number> =>
    Object.fromEntries(
      c.v.map((v) => {
        const n = parseFloat(vals[v.k]);
        return [v.k, Number.isNaN(n) ? v.d : n];
      }),
    );

  return (
    <div>
      <BackBtn label={t("calcTitle")} onClick={() => go({ name: "calc" })} />
      <Panel
        label={`${c.ref} · ${t("lectureN", { n: c.lec })}`}
        right={
          <button className={`chip${practice ? " on" : ""}`}
            onClick={() => {
              setPractice((p) => !p);
              setVerdict(null); setShowSol(false); setAnswer("");
              setNonce((n) => n + 1); fxTap();
            }}>
            {practice ? t("closePractice") : t("practiceMode")}
          </button>
        }
      >
        <div className="row" style={{ marginBottom: 8 }}>
          <LecBadge id={c.lec} />
        </div>
        <h3 style={{ margin: "0 0 8px" }}>{x(c.title)}</h3>
        <div className="formula">{c.formula}</div>
        {c.note && !practice ? (
          <div className="tiny muted" style={{ marginBottom: 10 }}>{x(c.note)}</div>
        ) : null}

        {!practice ? (
          <>
            {c.v.map((v) => (
              <label className="field" key={v.k}>
                <span>{x(v.label)}</span>
                <input type="number" step="any" value={vals[v.k]}
                  onChange={(e) => setVals((s) => ({ ...s, [v.k]: e.target.value }))} />
                {v.hint ? <div className="tiny muted" style={{ marginTop: 4 }}>{x(v.hint)}</div> : null}
              </label>
            ))}
            <PhysButton wide tone="primary" led="blue"
              onClick={() => { setRes(c.run(nums())); fxOk(); }}>
              {t("compute")}
            </PhysButton>
            {res ? <Solution res={res} /> : null}
          </>
        ) : (
          <>
            <div className="tiny muted" style={{ fontWeight: 700, letterSpacing: 1 }}>{t("given")}</div>
            <ul className="small mono" style={{ margin: "4px 0 12px", paddingLeft: 18 }}>
              {c.v.map((v) => (
                <li key={v.k}>{`${x(v.label).split("—")[0].trim()} = ${task.given[v.k]}`}</li>
              ))}
            </ul>

            <label className="field">
              <span>{t("yourAnswer")}</span>
              <input type="number" step="any" value={answer} disabled={verdict !== null || showSol}
                placeholder={`${t("answerPlaceholder")}${task.target.unit ? `, ${task.target.unit}` : ""}`}
                onChange={(e) => setAnswer(e.target.value)} />
            </label>

            {verdict === null && !showSol ? (
              <div className="grid2">
                <PhysButton onClick={() => setShowSol(true)}>{t("showSolution")}</PhysButton>
                <PhysButton tone="primary"
                  onClick={() => {
                    const g = parseFloat(answer);
                    if (Number.isNaN(g)) return;
                    const tol = Math.max(Math.abs(task.target.value) * 0.02, 0.01);
                    const ok = Math.abs(g - task.target.value) <= tol;
                    setVerdict(ok);
                    if (ok) { confetti(60); fxOk(); St.addXp(12); }
                    else { fxAlarm(); alarmFlash(); }
                  }}>
                  {t("check")}
                </PhysButton>
              </div>
            ) : null}

            {verdict !== null ? (
              <div className={verdict ? "ok-bar" : "alarm-bar"}>
                <Led color={verdict ? "green" : "red"} on size={9} blink={!verdict} />
                {verdict ? t("correctShort") : t("statusAlarm")}
              </div>
            ) : null}

            {verdict !== null || showSol ? (
              <>
                <Solution res={task.target} />
                <div style={{ height: 8 }} />
                <PhysButton wide onClick={() => {
                  setAnswer(""); setVerdict(null); setShowSol(false); setNonce((n) => n + 1);
                }}>
                  {t("newExample")}
                </PhysButton>
              </>
            ) : null}
          </>
        )}
      </Panel>
    </div>
  );
}

/** Natija: raqamli displey + shkala strelkasi + qadamlar. */
function Solution({ res }: { res: CalcResult }) {
  const { x } = useI18n();
  /* Strelka uchun nisbiy ko'rsatkich: foiz bo'lsa to'g'ridan to'g'ri,
     aks holda logarifmik shkalada joylashtiriladi. */
  const pct = res.unit === "%"
    ? Math.max(0, Math.min(100, res.value))
    : Math.max(2, Math.min(98, (Math.log10(Math.max(0.01, Math.abs(res.value))) / 5) * 100));

  return (
    <>
      <div className="result">
        <Gauge pct={pct} size={140}
          value={<DigitalDisplay value={res.value} unit={res.unit} size="lg" decimals={res.value % 1 ? 2 : 0} />} />
      </div>
      <ol className="steps">
        {res.steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
      {res.verdict ? <div className="explain">{x(res.verdict)}</div> : null}
    </>
  );
}
