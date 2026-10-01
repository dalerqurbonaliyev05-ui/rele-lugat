import { Bar, DigitalDisplay, Led, Panel, PhysButton } from "../components/Panel";
import { GLOSSARY } from "../data/glossary";
import { CIRCUITS } from "../data/circuits";
import { QUIZZES } from "../data/quizzes";
import { useI18n } from "../i18n";
import { useReducedMotion } from "../lib/anim";
import { fxOk } from "../lib/fx";
import * as St from "../store";
import { LecBadge, useNav } from "../ui";
import type { UIKey } from "../i18n/strings";

export default function Home() {
  const { t, x } = useI18n();
  const { go, refresh } = useNav();
  const S = St.S;
  const lv = St.level();
  const due = St.srsDue().length;
  const dt = St.dayTerm();
  const dailyDone = S.dailyDone === St.today();

  return (
    <div className="bento">
      {/* ---------- 1. Bugungi atama (katta) ---------- */}
      {dt ? (
        <Panel
          className="span2"
          label={t("plTerm")}
          right={<LecBadge id={dt.l} />}
        >
          <div className="fc-term" style={{ fontSize: 26 }}>{x(dt.t)}</div>
          {dt.f ? <div className="small muted" style={{ marginBottom: 6 }}>{x(dt.f)}</div> : null}
          <p className="small" style={{ marginBottom: 10 }}>{x(dt.d)}</p>
          <div className="row">
            <PhysButton
              tone="ok"
              led={St.srsOf(dt.id).box >= 4 ? "green" : "off"}
              onClick={() => { St.srsAnswer(dt.id, true); St.addXp(4); fxOk(); refresh(); }}
            >
              {t("learnedIt")}
            </PhysButton>
            <PhysButton tone="ghost" onClick={() => go({ name: "glossary", jump: dt.id })}>
              {t("tabGlossary")}
            </PhysButton>
          </div>
        </Panel>
      ) : null}

      {/* ---------- 2. XP va daraja ---------- */}
      <Panel label={t("plLevel")} right={<Led color="blue" on size={8} />}>
        <DigitalDisplay value={S.xp} unit="XP" size="lg" tone="amber" />
        <div className="tiny muted" style={{ margin: "4px 0 7px" }}>{x(lv.name)}</div>
        <Bar pct={lv.pct} tone="amber" />
        <div className="tiny muted" style={{ marginTop: 5 }}>
          {lv.next ? t("toLevel", { lvl: x(lv.next), n: lv.toNext }) : t("maxLevel")}
        </div>
      </Panel>

      {/* ---------- 3. Streak ---------- */}
      <Panel label={t("plStreak")} right={<Led color="amber" on={S.streak > 0} size={8} />}>
        <DigitalDisplay value={S.streak} size="lg" tone="green" />
        <div className="tiny muted" style={{ margin: "4px 0 8px" }}>{t("streakDays")}</div>
        <WeekStrip />
      </Panel>

      {/* ---------- 4. Kunlik sinov ---------- */}
      <Panel
        label={t("plDaily")}
        tone={dailyDone ? "ok" : undefined}
        right={<Led color={dailyDone ? "green" : "amber"} on size={8} blink={!dailyDone} />}
        onClick={() => go({ name: "daily" })}
      >
        <span className="bento-ico">▤</span>
        <span className="bento-t">{dailyDone ? t("dailyDone") : t("dailyGo")}</span>
        <span className="bento-s">{t("questionsN", { n: QUIZZES.length })}</span>
      </Panel>

      {/* ---------- 5. Sxemani yig' ---------- */}
      <Panel label={t("plCircuit")} onClick={() => go({ name: "circuit" })}>
        <MiniCircuit />
        <span className="bento-t">{t("circuitTitle")}</span>
        <span className="bento-s">{t("circuitsCount", { n: CIRCUITS.length })}</span>
      </Panel>

      {/* ---------- 6. Stsenariy ---------- */}
      <Panel className="span2" label={t("plScenario")} onClick={() => go({ name: "scenario" })}>
        <div className="row" style={{ flexWrap: "nowrap", gap: 12 }}>
          <MiniGrid />
          <div style={{ minWidth: 0 }}>
            <span className="bento-t">{t("scenarioSub")}</span>
            <span className="bento-s">{t("scenarioCount", { n: 8 })}</span>
          </div>
        </div>
      </Panel>

      {/* ---------- 7. Xatolar daftari ---------- */}
      <Panel
        label={t("plMistakes")}
        tone={S.mistakes.length ? "alarm" : undefined}
        right={<Led color={S.mistakes.length ? "red" : "green"} on size={8} blink={S.mistakes.length > 0} />}
        onClick={() => go({ name: "mistakes" })}
      >
        <DigitalDisplay value={S.mistakes.length} size="lg" tone={S.mistakes.length ? "red" : "green"} />
        <span className="bento-s">{t("inMistakes")}</span>
      </Panel>

      {/* ---------- 8. Takrorlash ---------- */}
      <Panel label={t("plGlossary")} onClick={() => go({ name: "flashcards" })}>
        <DigitalDisplay value={due} size="lg" tone="blue" />
        <span className="bento-s">{t("readyN", { n: GLOSSARY.length })}</span>
      </Panel>

      {/* ---------- 9-11. Kichik kartalar ---------- */}
      <MiniCard icoText="Σ" label="plCalc" title="calcTitle" onClick={() => go({ name: "calc" })} />
      <MiniCard icoText="⚙" label="plLogic" title="logicTitle" onClick={() => go({ name: "logic" })} />
      <MiniCard icoText="⌕" label="plRelay" title="relayTitle" onClick={() => go({ name: "relay" })} />
      <MiniCard icoText="⌗" label="plPath" title="pathTitle" onClick={() => go({ name: "path" })} />

      <p className="tiny muted center span2" style={{ marginTop: 6 }}>{t("source")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MiniCard({
  icoText, label, title, onClick,
}: {
  icoText: string; label: UIKey; title: UIKey; onClick: () => void;
}) {
  const { t } = useI18n();
  return (
    <Panel className="bento-mini" label={t(label)} onClick={onClick}>
      <span className="bento-ico">{icoText}</span>
      <span className="bento-t">{t(title)}</span>
    </Panel>
  );
}

/** Streak haftasi: oxirgi 7 kun lampalari. */
function WeekStrip() {
  const { t } = useI18n();
  const S = St.S;
  const today = new Date();
  // Dushanbadan boshlanadigan hafta
  const dow = (today.getDay() + 6) % 7; // 0 = Du
  const keys: UIKey[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];

  return (
    <div className="week">
      {keys.map((k, i) => {
        // shu kun bugundan necha kun oldin
        const back = dow - i;
        const lit = back >= 0 && back < S.streak;
        return (
          <div key={k} className={`week-d${lit ? " on" : ""}${i === dow ? " today" : ""}`}>
            <span>{t(k)}</span>
            <i />
          </div>
        );
      })}
    </div>
  );
}

/** Mini sxema: tok yuguradigan kichik zanjir. */
function MiniCircuit() {
  const reduce = useReducedMotion();
  return (
    <svg className="mini-svg" viewBox="0 0 120 52" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 6 }}>
      <line x1="10" y1="10" x2="10" y2="42" className="sv-rail" />
      <line x1="110" y1="10" x2="110" y2="42" className="sv-rail" />
      <path d="M 10 20 L 42 20 M 58 20 L 78 20 M 96 20 L 110 20" className="sv-line" />
      <path d="M 42 20 L 58 12" className="sv-line" />
      <rect x="78" y="12" width="18" height="16" rx="2" className="sv-part" />
      <path d="M 10 38 L 46 38 M 62 38 L 110 38" className="sv-line" />
      <rect x="46" y="30" width="16" height="16" rx="2" className="sv-part" />
      {!reduce ? <path d="M 10 38 L 110 38" className="sv-flow" /> : null}
      <circle cx="104" cy="20" r="2.6" fill="var(--led-green)" />
    </svg>
  );
}

/** Mini energotizim: manba → shinalar. */
function MiniGrid() {
  const reduce = useReducedMotion();
  return (
    <svg width="104" height="52" viewBox="0 0 104 52" xmlns="http://www.w3.org/2000/svg" style={{ flex: "none" }}>
      <circle cx="12" cy="26" r="8" className="sv-part" />
      <text x="12" y="30" className="sv-txt" textAnchor="middle" fontSize="10">~</text>
      <line x1="20" y1="26" x2="92" y2="26" className="sv-line" />
      {!reduce ? <path d="M 20 26 L 92 26" className="sv-flow" /> : null}
      {[38, 62, 86].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="38" className="sv-rail" />
      ))}
      <path d="M 86 26 l -5 9 l 5 -1 l -3 9 l 9 -13 l -6 1 z" fill="var(--led-red)" />
    </svg>
  );
}
