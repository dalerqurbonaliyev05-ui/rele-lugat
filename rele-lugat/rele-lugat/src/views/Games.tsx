import { Led, Panel, SectionTitle } from "../components/Panel";
import { CIRCUITS } from "../data/circuits";
import { QUIZZES } from "../data/quizzes";
import { RELAYS } from "../data/relays";
import { SCENARIOS } from "../data/scenarios";
import { useI18n } from "../i18n";
import * as St from "../store";
import { Tile, useNav } from "../ui";

export default function Games() {
  const { t } = useI18n();
  const { go } = useNav();
  const due = St.srsDue().length;
  const circDone = CIRCUITS.filter((c) => St.S.circuits[c.id] === 100).length;

  return (
    <div>
      <SectionTitle>{t("sectionReview")}</SectionTitle>
      <div className="stack">
        <Tile ico="↻" color="var(--led-amber)" title={t("flashTitle")} sub={t("readyN", { n: due })}
          onClick={() => go({ name: "flashcards" })} />
        <Tile ico="▤" color="var(--led-blue)" title={t("quizTitle")} sub={t("questionsN", { n: QUIZZES.length })}
          onClick={() => go({ name: "quiz" })} />
        <Tile ico="⏱" color="var(--led-red)" title={t("examTitle")} sub={t("mixedExamSub")}
          onClick={() => go({ name: "exam" })}
          right={St.S.examBest ? <span className="digit digit-sm digit-green">{St.S.examBest}%</span> : undefined} />
      </div>

      <SectionTitle>{t("sectionGames")}</SectionTitle>
      <div className="stack">
        <Tile ico="⚡" color="var(--led-green)" title={t("circuitTitle")}
          sub={`${t("circuitsCount", { n: CIRCUITS.length })} · ${t("circuitSub")}`}
          onClick={() => go({ name: "circuit" })}
          right={<span className="digit digit-sm digit-green">{circDone}/{CIRCUITS.length}</span>} />
        <Tile ico="🗲" color="var(--led-amber)" title={t("scenarioSub")}
          sub={t("scenarioCount", { n: SCENARIOS.length })}
          onClick={() => go({ name: "scenario" })} />
        <Tile ico="⌛" color="var(--led-blue)" title={t("timingTitle")} sub={t("timingCardSub")}
          onClick={() => go({ name: "timing" })} />
        <Tile ico="⌕" color="var(--led-blue)" title={t("relayTitle")} sub={t("relayCount", { n: RELAYS.length })}
          onClick={() => go({ name: "relay" })} />
      </div>

      <SectionTitle>{t("sectionSim")}</SectionTitle>
      <div className="stack">
        <Tile ico="⚙" color="var(--led-blue)" title={t("logicTitle")} sub={t("logicSub")}
          onClick={() => go({ name: "logic" })} />
      </div>

      {St.S.mistakes.length ? (
        <>
          <SectionTitle>{t("sectionMistakes")}</SectionTitle>
          <Panel
            label={t("plMistakes")}
            tone="alarm"
            right={<Led color="red" on size={9} blink />}
            onClick={() => go({ name: "mistakes" })}
          >
            <div className="row">
              <span className="digit digit-lg digit-red">{St.S.mistakes.length}</span>
              <span className="small muted">{t("entriesN", { n: St.S.mistakes.length })}</span>
            </div>
          </Panel>
        </>
      ) : null}
    </div>
  );
}
