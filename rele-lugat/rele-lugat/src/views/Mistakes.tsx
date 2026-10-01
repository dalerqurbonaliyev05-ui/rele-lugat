import { useMemo } from "react";
import { DigitalDisplay, Led, Panel, PhysButton, SectionTitle } from "../components/Panel";
import { termById } from "../data/glossary";
import { QUIZZES } from "../data/quizzes";
import { useI18n } from "../i18n";
import { fxSwitch, shuffle } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, useNav } from "../ui";
import QuizRunner, { type QuizItem } from "./QuizRunner";

export default function Mistakes() {
  const { t, x } = useI18n();
  const { go, refresh } = useNav();
  const ms = St.S.mistakes;
  const qKeys = ms.filter((m) => m.kind === "quiz");
  const tKeys = ms.filter((m) => m.kind === "term");

  if (!ms.length) {
    return (
      <div>
        <BackBtn label={t("tabProfile")} onClick={() => go({ name: "profile" })} />
        <div className="empty">
          <div className="big" style={{ color: "var(--led-green)" }}>✓</div>
          <div>{t("mistakesEmpty")}</div>
          <div className="tiny muted" style={{ marginTop: 6 }}>{t("mistakesEmptyHint")}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackBtn label={t("tabProfile")} onClick={() => go({ name: "profile" })} />

      <Panel label={t("plMistakes")} tone="alarm" right={<Led color="red" on size={9} blink />}>
        <div className="row">
          <DigitalDisplay value={ms.length} size="xl" tone="red" />
          <div className="small muted" style={{ minWidth: 0 }}>
            {t("mistakesSummary", { q: qKeys.length, t: tKeys.length })}
          </div>
        </div>
      </Panel>

      {qKeys.length ? (
        <>
          <PhysButton wide tone="primary" led="red" onClick={() => go({ name: "mistakeQuiz" })}>
            {t("redoQuestions", { n: qKeys.length })}
          </PhysButton>
          <div style={{ height: 9 }} />
        </>
      ) : null}

      {tKeys.length ? (
        <>
          <PhysButton wide led="amber"
            onClick={() => go({ name: "flashcards", ids: tKeys.map((m) => m.key) })}>
            {t("redoTerms", { n: tKeys.length })}
          </PhysButton>
          <div style={{ height: 9 }} />
        </>
      ) : null}

      <SectionTitle>{t("list")}</SectionTitle>
      <div className="stack">
        {ms.slice().reverse().slice(0, 40).map((m, k) => {
          if (m.kind === "term") {
            const g = termById(m.key);
            if (!g) return null;
            return (
              <div className="term" key={k}>
                <div className="row">
                  <LecBadge id={g.l} />
                  <b className="small mono">{x(g.t)}</b>
                </div>
                <div className="tiny muted" style={{ marginTop: 4 }}>{x(g.d)}</div>
              </div>
            );
          }
          const gi = Number(m.key.split("#")[1]);
          const q = QUIZZES[gi];
          if (!q) return null;
          return (
            <div className="term" key={k}>
              <div className="row">
                <LecBadge id={q.l} />
                <span className="badge badge-soft">{t("question")}</span>
              </div>
              <div className="small" style={{ marginTop: 4 }}>{x(q.q)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 12 }} />
      <PhysButton wide tone="ghost"
        onClick={() => { St.S.mistakes = []; St.save(); fxSwitch(); refresh(); }}>
        {t("clearLog")}
      </PhysButton>
    </div>
  );
}

/** Xato savollarni qayta yechish. */
export function MistakeQuiz() {
  const { t } = useI18n();
  const { go } = useNav();
  const items = useMemo<QuizItem[]>(() => {
    const out: QuizItem[] = [];
    for (const m of St.S.mistakes) {
      if (m.kind !== "quiz") continue;
      const gi = Number(m.key.split("#")[1]);
      const q = QUIZZES[gi];
      if (q) out.push({ q, i: gi });
    }
    return shuffle(out);
  }, []);

  if (!items.length) return <Mistakes />;

  return (
    <div>
      <Panel label={t("plMistakes")} right={<Led color="amber" on size={9} />}>
        <b className="small">{t("sectionMistakes")}</b>
        <div className="tiny muted">{t("mistakesWork")}</div>
      </Panel>
      <QuizRunner
        items={items}
        backLabel={t("mistakesTitle")}
        onBack={() => go({ name: "mistakes" })}
        onAgain={() => go({ name: "mistakes" })}
      />
    </div>
  );
}
