import { Fragment, useState } from "react";
import { Led, Panel, PhysButton, SectionTitle } from "../components/Panel";
import { GLOSSARY } from "../data/glossary";
import { lecById, LECTURES } from "../data/lectures";
import { MAP_H, MAP_W, NODE_H, NODE_W, PATH_NODES, PATH_SEGMENTS } from "../data/path";
import { useI18n } from "../i18n";
import { useReducedMotion } from "../lib/anim";
import { fxTap } from "../lib/fx";
import * as St from "../store";
import { useNav } from "../ui";

/** O'quv yo'li — podstansiyalar tarmog'i xaritasi. */
export default function Path() {
  const { t, x } = useI18n();
  const { go } = useNav();
  const reduce = useReducedMotion();
  const [sel, setSel] = useState<number | null>(null);

  const doneCount = LECTURES.filter((L) => St.nodeDone(L.id)).length;

  const statusOf = (lec: number): "done" | "open" | "idle" =>
    St.nodeDone(lec) ? "done" : St.nodeStarted(lec) ? "open" : "idle";

  return (
    <div>
      <Panel
        label={t("plPath")}
        right={<span className="digit digit-sm digit-green">{t("pathProgress", { a: doneCount, b: LECTURES.length })}</span>}
      >
        <p className="small muted" style={{ margin: 0 }}>{t("pathIntro")}</p>
        <div className="path-legend" style={{ marginTop: 10 }}>
          <span><Led color="green" size={8} /> {t("nodeDoneS")}</span>
          <span><Led color="amber" size={8} blink /> {t("nodeOpen")}</span>
          <span><Led color="off" size={8} /> {t("nodeIdle")}</span>
        </div>
      </Panel>

      {/* Tanlangan tugun varaqasi xarita USTIDA — telefonda scroll qilmasdan ko'rinadi. */}
      {sel !== null ? <NodeSheet lec={sel} onClose={() => setSel(null)} /> : null}

      <div className="pathmap">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} xmlns="http://www.w3.org/2000/svg">
          {/* liniyalar */}
          {PATH_SEGMENTS.map((s) => {
            const live = St.nodeDone(s.from);
            return (
              <Fragment key={`${s.from}-${s.to}`}>
                <path d={s.d} className={`pm-line${live ? " live" : ""}`} />
                {live && !reduce ? <path d={s.d} className="pm-flow" /> : null}
              </Fragment>
            );
          })}

          {/* tugunlar */}
          {PATH_NODES.map((n) => {
            const st = statusOf(n.lec);
            const stages = St.stagesOf(n.lec);
            const L = lecById(n.lec);
            const bx = n.x - NODE_W / 2;
            const by = n.y - NODE_H / 2;
            return (
              <g
                key={n.lec}
                className={`pm-node ${st}`}
                onClick={() => { fxTap(); setSel(sel === n.lec ? null : n.lec); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }}
              >
                <rect x={bx} y={by} width={NODE_W} height={NODE_H} rx={7} className="pm-box" />
                {/* shina chizig'i — tugun "podstansiya shinasi" */}
                <line x1={bx + 10} y1={by + 9} x2={bx + NODE_W - 10} y2={by + 9} className="pm-bus" stroke={L.color} />
                <text x={bx + 14} y={by + 32} className="pm-num">{n.lec}</text>
                {/* bosqich indikatorlari */}
                {(["terms", "cards", "quiz"] as const).map((k, i) => (
                  <rect
                    key={k}
                    x={bx + 38 + i * 13} y={by + 21} width={9} height={9} rx={2}
                    className="pm-stage"
                    fill={stages[k] ? "var(--led-green)" : "transparent"}
                    stroke={stages[k] ? "var(--led-green)" : "var(--line-2)"}
                  />
                ))}
                <text x={bx + 14} y={by + 46} className="pm-name">
                  {clip(x(L.title), 15)}
                </text>
                {st === "open" && !reduce ? (
                  <circle cx={bx + NODE_W - 12} cy={by + 12} r={3.5} fill="var(--led-amber)">
                    <animate attributeName="opacity" values="1;0.25;1" dur="1.1s" repeatCount="indefinite" />
                  </circle>
                ) : null}
                {st === "done" ? (
                  <circle cx={bx + NODE_W - 12} cy={by + 12} r={3.5} fill="var(--led-green)" />
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <SectionTitle>{t("lectures")}</SectionTitle>
      <p className="tiny muted">{t("source")}</p>
      <div style={{ height: 8 }} />
      <PhysButton wide tone="ghost" onClick={() => go({ name: "games" })}>
        {t("tabGames")}
      </PhysButton>
    </div>
  );
}

/** SVG `text` da ellipsis yo'q — nomni o'zimiz qisqartiramiz. */
function clip(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n).trimEnd()}…` : s;
}

/* ------------------------------------------------------------------ */

function NodeSheet({ lec, onClose }: { lec: number; onClose: () => void }) {
  const { t, x } = useI18n();
  const { go, toast } = useNav();
  const L = lecById(lec);
  const stages = St.stagesOf(lec);
  const nTerms = GLOSSARY.filter((g) => g.l === lec).length;

  const openTerms = () => {
    if (St.markStage(lec, "terms")) toast(t("stageDoneToast"));
    go({ name: "glossary", lec });
  };

  return (
    <Panel
      label={t("openLecture", { n: lec })}
      tone={St.nodeDone(lec) ? "ok" : undefined}
      right={<Led color={St.nodeDone(lec) ? "green" : "amber"} size={9} on blink={!St.nodeDone(lec)} />}
    >
      <h3 style={{ marginBottom: 10 }}>{x(L.title)}</h3>

      <div className="stack">
        <StageRow
          done={!!stages.terms}
          label={t("stageTerms")}
          hint={t("termsCount", { n: nTerms })}
          onClick={openTerms}
        />
        <StageRow
          done={!!stages.cards}
          label={t("stageCards")}
          hint={t("readyN", { n: nTerms })}
          onClick={() => go({ name: "flashcards", lec })}
        />
        <StageRow
          done={!!stages.quiz}
          label={t("stageQuiz")}
          hint={`${St.lecProgress(lec)} %`}
          onClick={() => go({ name: "quiz", lec })}
        />
      </div>

      <div style={{ height: 10 }} />
      <PhysButton wide tone="ghost" onClick={onClose}>{t("back")}</PhysButton>
    </Panel>
  );
}

function StageRow({
  done, label, hint, onClick,
}: {
  done: boolean; label: string; hint: string; onClick: () => void;
}) {
  return (
    <button className="tile" onClick={onClick}>
      <div className="tile-ico" style={{ borderColor: done ? "var(--led-green)" : "var(--line-2)" }}>
        <Led color={done ? "green" : "off"} size={12} on />
      </div>
      <div className="tile-body">
        <b>{label}</b>
        <small>{hint}</small>
      </div>
      <span className="digit digit-sm" style={{ color: done ? "var(--led-green)" : "var(--ink-3)" }}>
        {done ? "✓" : "—"}
      </span>
    </button>
  );
}
