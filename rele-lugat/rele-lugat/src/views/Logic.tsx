import { useState } from "react";
import { Led } from "../components/Panel";
import { useI18n } from "../i18n";
import { useReducedMotion } from "../lib/anim";
import { fxSwitch } from "../lib/fx";
import { LogicGate, LogicRelay, type GateKind } from "../lib/svg";
import { BackBtn, LecBadge, useNav } from "../ui";
import type { L10n } from "../types";

const GATES: Array<{ id: GateKind; name: string; n: number; desc: L10n }> = [
  {
    id: "yoki", name: "YoKI / ИЛИ / OR", n: 2,
    desc: {
      uz: "Mantiqiy qo'shish. Rele sxemasida parallel ulanishga mos keladi: kirishlardan kamida bittasi 1 bo'lsa chiqish 1.",
      ru: "Логическое сложение. Соответствует параллельному соединению: если хотя бы один вход равен 1, выход равен 1.",
      en: "Logical addition. It matches a parallel connection: if at least one input is 1, the output is 1.",
    },
  },
  {
    id: "va", name: "VA / И / AND", n: 2,
    desc: {
      uz: "Mantiqiy ko'paytirish. Ketma-ket ulanishga mos keladi: barcha kirishlar 1 bo'lgandagina chiqish 1.",
      ru: "Логическое умножение. Соответствует последовательному соединению: выход равен 1 только когда все входы равны 1.",
      en: "Logical multiplication. It matches a series connection: the output is 1 only when all inputs are 1.",
    },
  },
  {
    id: "emas", name: "EMAS / НЕ / NOT", n: 1,
    desc: {
      uz: "Inversiya. Kirishda 1 bo'lsa chiqish 0, kirishda 0 bo'lsa chiqish 1. Sxemalarda ko'pincha doira bilan belgilanadi.",
      ru: "Инверсия. При 1 на входе выход 0, при 0 на входе выход 1. На схемах обычно обозначается кружком.",
      en: "Inversion. A 1 at the input gives 0 at the output and vice versa. Usually drawn as a small circle.",
    },
  },
  {
    id: "rs", name: "RS-trigger", n: 2,
    desc: {
      uz: "Elementar xotira yacheykasi. S = 1 → chiqish 1; R = 1 → chiqish 0; ikkalasi 0 bo'lsa oldingi holat saqlanadi. Bu yerda R ustuvorligi bilan.",
      ru: "Элементарная ячейка памяти. S = 1 → выход 1; R = 1 → выход 0; при нулях сохраняется прежнее состояние. Здесь с приоритетом R.",
      en: "An elementary memory cell. S = 1 → output 1; R = 1 → output 0; with both at 0 the previous state is held. Shown here with R priority.",
    },
  },
];

export default function Logic() {
  const { t, x } = useI18n();
  const { go } = useNav();
  const reduce = useReducedMotion();
  const [kind, setKind] = useState<GateKind>("yoki");
  const [ins, setIns] = useState<boolean[]>([false, false]);
  const [q, setQ] = useState(false);

  const gate = GATES.find((g) => g.id === kind)!;

  const compute = (a: boolean[], prevQ: boolean): { out: boolean; nextQ: boolean } => {
    if (kind === "yoki") return { out: a[0] || a[1], nextQ: prevQ };
    if (kind === "va") return { out: a[0] && a[1], nextQ: prevQ };
    if (kind === "emas") return { out: !a[0], nextQ: prevQ };
    const nq = a[1] ? false : a[0] ? true : prevQ;
    return { out: nq, nextQ: nq };
  };

  const { out } = compute(ins, q);

  const toggle = (idx: number) => {
    const next = ins.map((v, k) => (k === idx ? !v : v));
    setIns(next);
    if (kind === "rs") setQ(compute(next, q).nextQ);
    fxSwitch();
  };

  const names = kind === "rs" ? ["S (Set)", "R (Reset)"] : ["KL1", "KL2"];
  const rows: number[][] = kind === "emas" ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];

  const rowOut = (r: number[]): string => {
    if (kind === "yoki") return r[0] || r[1] ? "1" : "0";
    if (kind === "va") return r[0] && r[1] ? "1" : "0";
    if (kind === "emas") return r[0] ? "0" : "1";
    return r[1] ? "0" : r[0] ? "1" : t("prevState");
  };

  return (
    <div>
      <BackBtn label={t("tabGames")} onClick={() => go({ name: "games" })} />

      <div className="chip-row">
        {GATES.map((g) => (
          <button key={g.id} className={`chip${g.id === kind ? " on" : ""}`}
            onClick={() => { setKind(g.id); setIns([false, false]); setQ(false); fxSwitch(); }}>
            {g.name}
          </button>
        ))}
      </div>

      <div className="logic-card">
        <div className="row">
          <LecBadge id={11} />
          <b>{gate.name}</b>
        </div>
        <p className="small muted" style={{ marginTop: 8 }}>{x(gate.desc)}</p>

        {Array.from({ length: gate.n }, (_, idx) => (
          <div className="sw" key={idx}>
            <button className={ins[idx] ? "on" : ""} onClick={() => toggle(idx)} aria-label={names[idx]}>
              <i />
            </button>
            <div>
              <b className="small">{names[idx]}</b>
              <div className="tiny muted">{ins[idx] ? t("contactClosed") : t("contactOpen")}</div>
            </div>
          </div>
        ))}

        <div className="row" style={{ marginTop: 10 }}>
          <b className="small">{t("output")}:</b>
          <div className={`out-lamp${out ? " on" : ""}`}>{out ? "1" : "0"}</div>
          <span className="spacer" />
          <span className="chip">
            <Led color={out ? "green" : "off"} on size={8} />
            {out ? t("statusOn") : t("statusOff")}
          </span>
        </div>
      </div>

      <div className="logic-card">
        <div className="small muted" style={{ marginBottom: 6 }}>{t("logicElement")}</div>
        <LogicGate kind={kind} inputs={ins.slice(0, gate.n)} out={out} />
      </div>

      {kind === "yoki" || kind === "va" ? (
        <div className="logic-card">
          <div className="small muted" style={{ marginBottom: 6 }}>
            {t("relayEquivalent", { k: kind === "va" ? t("serial") : t("parallel") })}
          </div>
          <LogicRelay kind={kind} inputs={ins.slice(0, gate.n)} out={out} reduceMotion={reduce} />
        </div>
      ) : null}

      <div className="logic-card">
        <div className="small muted" style={{ marginBottom: 4 }}>{t("truthTable")}</div>
        <table className="truth">
          <thead>
            <tr>
              {Array.from({ length: gate.n }, (_, k) => (
                <th key={k}>{kind === "rs" ? (k === 0 ? "S" : "R") : `KL${k + 1}`}</th>
              ))}
              <th>{t("output")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => {
              const isCur = r.every((v, idx) => !!v === !!ins[idx]);
              return (
                <tr key={ri} className={isCur ? "cur" : undefined}>
                  {r.map((v, k) => <td key={k}>{v}</td>)}
                  <td>{rowOut(r)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
