import { useMemo, useState } from "react";
import { DigitalDisplay, Led, Panel, PhysButton } from "../components/Panel";
import { artKindOf, RelayArt } from "../components/RelayArt";
import { RELAYS } from "../data/relays";
import { useI18n } from "../i18n";
import { alarmFlash, confetti, fxAlarm, fxOk, fxTap, shuffle } from "../lib/fx";
import * as St from "../store";
import { BackBtn, LecBadge, Progress, useNav } from "../ui";

/** Rele aniqlash mashqi: tavsifga qarab qaysi rele ekanini toping. */
export default function Relay({ reference: refMode }: { reference?: boolean }) {
  const { t, x } = useI18n();
  const { go } = useNav();

  const pool = useMemo(() => shuffle(RELAYS), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);

  /* ---------------- Ma'lumotnoma ---------------- */
  if (refMode) {
    return (
      <div>
        <BackBtn label={t("relayTitle")} onClick={() => go({ name: "relay" })} />
        {RELAYS.map((r) => (
          <Panel key={r.id} label={x(r.kind)} right={<LecBadge id={r.lec} />}>
            <RelayArt kind={artKindOf(r.id)} size={120} />
            <h3 style={{ margin: "8px 0 2px", fontFamily: "var(--mono)" }}>{r.name}</h3>
            <div className="small muted">{x(r.short)}</div>
            <p className="small" style={{ marginTop: 8 }}>{x(r.desc)}</p>
            <ul className="small" style={{ margin: "6px 0 0", paddingLeft: 18 }}>
              {r.facts.map((f, k) => <li key={k}>{x(f)}</li>)}
            </ul>
          </Panel>
        ))}
      </div>
    );
  }

  /* ---------------- Yakun ---------------- */
  if (i >= pool.length) {
    confetti(80);
    return (
      <div>
        <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
        <Panel label={t("result")} tone="ok">
          <div className="center">
            <RelayArt kind="flag" size={110} />
            <DigitalDisplay value={score} size="xl" tone="green" />
            <div className="tiny muted">{t("scoreOf", { n: pool.length, s: score })}</div>
          </div>
          <div style={{ height: 12 }} />
          <PhysButton wide tone="primary" onClick={() => go({ name: "relay" })}>{t("again")}</PhysButton>
        </Panel>
      </div>
    );
  }

  const r = pool[i];
  const answered = picked !== null;
  const good = picked === r.id;
  const pts = good ? Math.max(1, 5 - (shown - 1)) : 0;

  const opts = useMemo(
    () => shuffle([...shuffle(RELAYS.filter((o) => o.id !== r.id)).slice(0, 3), r]),
    [r],
  );

  const pick = (id: string) => {
    if (answered) return;
    setPicked(id);
    const isGood = id === r.id;
    const gained = isGood ? Math.max(1, 5 - (shown - 1)) : 0;
    setScore((s) => s + gained);
    if (isGood) { St.addXp(gained * 3); fxOk(); }
    else { fxAlarm(); alarmFlash(); }
  };

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />
      <Progress pct={(i / pool.length) * 100} />

      <Panel
        /* Javobdan oldin turi oshkor bo'lmasligi kerak. */
        label={answered ? x(r.kind) : t("plUnknown")}
        tone={answered ? (good ? "ok" : "alarm") : undefined}
        right={<Led color={answered ? (good ? "green" : "red") : "amber"} on size={9} blink={!answered} />}
      >
        <div className="row" style={{ marginBottom: 8 }}>
          <LecBadge id={r.lec} />
          <span className="chip">{i + 1} / {pool.length}</span>
          <span className="spacer" />
          <span className="chip">{t("points", { n: score })}</span>
        </div>

        {/* Javobdan oldin yopiq korpus, javobdan keyin haqiqiy rele chizmasi */}
        <div style={{ opacity: answered ? 1 : 0.55, transition: "opacity .35s" }}>
          <RelayArt kind={answered ? artKindOf(r.id) : "sealed"} size={130} />
        </div>

        <h3 style={{ margin: "10px 0 8px" }}>{t("whichRelay")}</h3>

        {r.clues.slice(0, shown).map((c, k) => (
          <div className="explain" style={{ marginBottom: 8 }} key={k}>
            <b>{t("clue", { n: k + 1 })} </b>{x(c)}
          </div>
        ))}

        <PhysButton
          wide
          disabled={shown >= r.clues.length || answered}
          onClick={() => { setShown((n) => n + 1); fxTap(); }}
        >
          {shown >= r.clues.length ? t("noMoreClues") : t("moreClue")}
        </PhysButton>

        <div style={{ height: 10 }} />

        {opts.map((o) => {
          let cls = "opt";
          if (answered) {
            if (o.id === r.id) cls += " ok";
            else if (o.id === picked) cls += " bad";
            else cls += " dim";
          }
          return (
            <button key={o.id} className={cls} onClick={() => pick(o.id)}>
              {/* Rele belgisi (RT-40, RN-53 …) hech qachon ikki qatorga bo'linmasin. */}
              <span style={{ fontFamily: "var(--mono)", fontWeight: 700, whiteSpace: "nowrap" }}>{o.name}</span>
              {" — "}
              {x(o.short)}
            </button>
          );
        })}

        {answered ? (
          <>
            <div className={good ? "ok-bar" : "alarm-bar"}>
              <Led color={good ? "green" : "red"} on size={9} blink={!good} />
              {good ? t("gotPoints", { n: pts }) : `${t("correctAnswer")} ${r.name}`}
            </div>
            <div className={`explain${good ? "" : " bad"}`}>
              {x(r.desc)}
              <ul className="tiny" style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                {r.facts.map((f, k) => <li key={k}>{x(f)}</li>)}
              </ul>
            </div>
            <div style={{ height: 10 }} />
            <PhysButton wide tone="primary"
              onClick={() => { setPicked(null); setShown(1); setI(i + 1); }}>
              {i + 1 >= pool.length ? t("result") : t("next")}
            </PhysButton>
          </>
        ) : null}
      </Panel>

      <PhysButton wide tone="ghost" onClick={() => go({ name: "relay", reference: true })}>
        {t("relayReference")}
      </PhysButton>
    </div>
  );
}
