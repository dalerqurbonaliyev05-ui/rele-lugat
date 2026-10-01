import { useMemo } from "react";
import { Led, Panel, SectionTitle } from "../components/Panel";
import { LECTURES, lecById } from "../data/lectures";
import { QUIZZES, quizzesOf } from "../data/quizzes";
import { useI18n } from "../i18n";
import { sample, shuffle } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, Tile, useNav } from "../ui";
import QuizRunner, { type QuizItem } from "./QuizRunner";

/** Ma'ruza bo'yicha testlar yoki ma'ruza tanlash ro'yxati. */
export default function Quiz({ lec }: { lec?: number }) {
  const { t, x } = useI18n();
  const { go, toast } = useNav();

  const items = useMemo<QuizItem[]>(() => (lec ? shuffle(quizzesOf(lec)) : []), [lec]);

  if (lec) {
    const L = lecById(lec);
    return (
      <div>
        <Panel label={t("lectureN", { n: lec })} right={<LecBadge id={lec} />}>
          <b className="small">{x(L.title)}</b>
        </Panel>
        <QuizRunner
          items={items}
          backLabel={t("lectures")}
          onBack={() => go({ name: "quiz" })}
          onAgain={() => go({ name: "quiz", lec })}
          onFinish={(pct) => {
            if (pct >= 70 && St.markStage(lec, "quiz")) {
              toast(t("nodeEnergized", { n: lec }));
            }
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
      <Tile ico="⏱" color="var(--led-amber)" title={t("mixedExam")} sub={t("mixedExamSub")}
        onClick={() => go({ name: "exam" })} />

      <SectionTitle>{t("byLecture")}</SectionTitle>
      <div className="stack">
        {LECTURES.map((L) => {
          const n = QUIZZES.filter((q) => q.l === L.id).length;
          const pct = St.lecProgress(L.id);
          const done = !!St.stagesOf(L.id).quiz;
          return (
            <Tile
              key={L.id} ico={String(L.id)} color={L.color}
              title={x(L.title)} sub={t("questionsDone", { n, p: pct })}
              onClick={() => go({ name: "quiz", lec: L.id })}
              right={<Led color={done ? "green" : "off"} on size={9} />}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Aralash imtihon: 20 tasodifiy savol, 10 daqiqa. */
export function Exam() {
  const { t } = useI18n();
  const { go } = useNav();
  const items = useMemo<QuizItem[]>(() => sample(QUIZZES.map((q, i) => ({ q, i })), 20), []);
  return (
    <div>
      <Panel label={t("examTitle")} right={<Led color="amber" on size={8} blink />}>
        <b className="small">{t("examPrep")}</b>
        <div className="tiny muted">{t("examPrepSub")}</div>
      </Panel>
      <QuizRunner
        items={items}
        limitSec={600}
        backLabel={t("tabGames")}
        onBack={() => go({ name: "games" })}
        onAgain={() => go({ name: "exam" })}
        onFinish={(pct) => {
          if (pct > St.S.examBest) {
            St.S.examBest = pct;
            St.checkBadges();
            St.save();
          }
        }}
      />
    </div>
  );
}

/** Kunlik sinov: 5 tasodifiy savol. */
export function Daily() {
  const { t } = useI18n();
  const { go, toast } = useNav();
  const items = useMemo<QuizItem[]>(() => sample(QUIZZES.map((q, i) => ({ q, i })), 5), []);
  return (
    <div>
      <Panel label={t("plDaily")} right={<Led color="amber" on size={8} />}>
        <b className="small">{t("dailyGo")}</b>
        <div className="tiny muted">{t("quizSub")}</div>
      </Panel>
      <QuizRunner
        items={items}
        backLabel={t("tabHome")}
        onBack={() => go({ name: "home" })}
        onAgain={() => go({ name: "daily" })}
        onFinish={() => {
          if (St.S.dailyDone !== St.today()) {
            St.S.dailyDone = St.today();
            St.addXp(15);
            St.save();
            toast(t("dailyDone"));
          }
        }}
      />
    </div>
  );
}
