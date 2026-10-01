import { useMemo, useRef, useState } from "react";
import { DigitalDisplay, Led, Panel, PhysButton } from "../components/Panel";
import { KhFlag, RelayShell } from "../components/RelayArt";
import { GLOSSARY, termById } from "../data/glossary";
import { useI18n } from "../i18n";
import { confetti, fxAlarm, fxOk, fxTap, shuffle } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, Progress, useNav } from "../ui";

export default function Flashcards({ ids, lec }: { ids?: string[]; lec?: number }) {
  const { t, x } = useI18n();
  const { go, toast } = useNav();

  const pool = useMemo(() => {
    let p = ids?.slice();
    if ((!p || !p.length) && lec) p = GLOSSARY.filter((g) => g.l === lec).map((g) => g.id);
    if (!p || !p.length) p = St.srsDue();
    if (!p.length) {
      p = Object.keys(St.S.srs)
        .sort((a, b) => St.srsOf(a).box - St.srsOf(b).box)
        .slice(0, 15);
    }
    return shuffle(p);
  }, [ids, lec]);

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [ok, setOk] = useState(0);
  const [bad, setBad] = useState(0);
  const [flag, setFlag] = useState<"ok" | "bad" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x0: number | null; dx: number }>({ x0: null, dx: 0 });

  /* ---------------- Yakun ---------------- */
  if (i >= pool.length) {
    if (pool.length) confetti(80);
    if (lec && pool.length && St.markStage(lec, "cards")) {
      toast(t("stageDoneToast"));
    }
    return (
      <div>
        <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
        <Panel label={t("result")} tone="ok" right={<Led color="green" on size={9} />}>
          <div className="center">
            <div style={{ fontSize: 40 }}>⚡</div>
            <h2>{t("reviewDone")}</h2>
            <div className="row" style={{ justifyContent: "center", marginTop: 6 }}>
              <span className="chip"><Led color="green" on size={7} /> {ok}</span>
              <span className="chip"><Led color="red" on={bad > 0} size={7} /> {bad}</span>
              <span className="chip">+{ok * 4} XP</span>
            </div>
          </div>
          <div style={{ height: 12 }} />
          <PhysButton wide tone="primary" onClick={() => go({ name: "flashcards", lec })}>
            {t("reviewAgain")}
          </PhysButton>
          <div style={{ height: 8 }} />
          <PhysButton wide tone="ghost" onClick={() => go({ name: "games" })}>
            {t("backToGames")}
          </PhysButton>
        </Panel>
      </div>
    );
  }

  const g = termById(pool[i]);
  if (!g) {
    setI(i + 1);
    return null;
  }

  const answer = (known: boolean) => {
    setFlag(known ? "ok" : "bad");
    St.srsAnswer(g.id, known);
    if (known) { setOk((n) => n + 1); St.addXp(4); fxOk(); }
    else { setBad((n) => n + 1); fxAlarm(); }
    window.setTimeout(() => {
      setFlag(null);
      setFlipped(false);
      if (cardRef.current) cardRef.current.style.transform = "";
      setI((n) => n + 1);
    }, 520);
  };

  const onDown = (e: React.PointerEvent) => {
    if (flag) return;
    drag.current = { x0: e.clientX, dx: 0 };
    if (cardRef.current) cardRef.current.style.transition = "none";
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current.x0 === null) return;
    drag.current.dx = e.clientX - drag.current.x0;
    const dx = drag.current.dx;
    if (Math.abs(dx) > 6 && cardRef.current) {
      cardRef.current.style.transform =
        `${flipped ? "rotateY(180deg) " : ""}translateX(${flipped ? -dx : dx}px) rotate(${dx / 26}deg)`;
    }
  };
  const onUp = () => {
    const { dx } = drag.current;
    if (cardRef.current) cardRef.current.style.transition = "";
    if (Math.abs(dx) > 70) answer(dx > 0);
    else if (cardRef.current) cardRef.current.style.transform = "";
    drag.current = { x0: null, dx: 0 };
  };

  const plate = `${t("lectureN", { n: g.l })} · ${t("box")} ${St.srsOf(g.id).box}/5`;

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
      <Progress pct={(i / pool.length) * 100} />
      <div className="row" style={{ justifyContent: "center", marginBottom: 10 }}>
        <DigitalDisplay value={`${i + 1}/${pool.length}`} size="sm" tone="blue" animate={false} />
      </div>

      <div className="fc-wrap">
        <div
          ref={cardRef}
          className={`fc${flipped ? " flip" : ""}`}
          onClick={() => { if (!flag) { setFlipped((v) => !v); fxTap(); } }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {/* old tomoni — rele korpusi */}
          <div className="fc-face">
            <RelayShell plate={plate} tone={flag}>
              <div className="fc-inner">
                <LecBadge id={g.l} />
                <div className="fc-term" style={{ marginTop: 12 }}>{x(g.t)}</div>
                {g.f ? <div className="muted small">{x(g.f)}</div> : null}
                <div className="tiny muted" style={{ marginTop: 14 }}>{t("tapToFlip")}</div>
              </div>
            </RelayShell>
          </div>

          {/* orqa tomoni — ta'rif va KH bayroqchasi */}
          <div className="fc-face fc-back">
            <RelayShell plate={x(g.t)} tone={flag}>
              <div className="fc-inner">
                <KhFlag state={flag} size={46} />
                <div className="small" style={{ marginTop: 8 }}>{x(g.d)}</div>
                {g.u ? <div className="tiny muted" style={{ marginTop: 10 }}>{t("usedIn")} {x(g.u)}</div> : null}
              </div>
            </RelayShell>
          </div>
        </div>
      </div>

      {flipped && !flag ? (
        <div className="grid2">
          <PhysButton tone="alarm" led="red" onClick={() => answer(false)}>{t("dontKnow")}</PhysButton>
          <PhysButton tone="ok" led="green" onClick={() => answer(true)}>{t("know")}</PhysButton>
        </div>
      ) : null}

      <p className="tiny muted center" style={{ marginTop: 10 }}>{t("swipeHint")}</p>
    </div>
  );
}
