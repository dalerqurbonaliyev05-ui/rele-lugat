import { useState } from "react";
import { Bar, DigitalDisplay, Gauge, Led, Panel, PhysButton, SectionTitle } from "../components/Panel";
import { LECTURES } from "../data/lectures";
import { LANG_NAMES, useI18n } from "../i18n";
import { fxSwitch, fxTap } from "../lib/fx";
import * as St from "../store";
import { useNav } from "../ui";
import { LANGS } from "../types";

export default function Profile({ onTheme }: { onTheme: () => void }) {
  const { t, x, lang, setLang } = useI18n();
  const { go, refresh, toast } = useNav();
  const S = St.S;
  const lv = St.level();
  const [name, setName] = useState(S.name);

  const tot = S.quizStat.ok + S.quizStat.bad;
  const acc = tot ? Math.round((S.quizStat.ok / tot) * 100) : 0;
  const icons = ["🎓", "🔧", "⚙", "👑"];

  return (
    <div>
      {/* ---------- Operator kartasi ---------- */}
      <Panel label={t("operator")} right={<Led color="green" on size={9} />}>
        <div className="center">
          <div style={{ fontSize: 36 }}>{icons[lv.index] ?? "🎓"}</div>
          <h2 style={{ fontFamily: "var(--mono)", letterSpacing: 1 }}>{S.name || t("student")}</h2>
          <div className="row" style={{ justifyContent: "center" }}>
            <span className="chip on">{x(lv.name)}</span>
            <span className="chip"><DigitalDisplay value={S.xp} unit="XP" size="sm" /></span>
          </div>
          <div style={{ marginTop: 10 }}><Bar pct={lv.pct} tone="amber" /></div>
          <div className="tiny muted" style={{ marginTop: 6 }}>
            {lv.next ? t("toLevel", { lvl: x(lv.next), n: lv.toNext }) : t("maxLevel")}
          </div>
        </div>
      </Panel>

      {/* ---------- Aniqlik shkalasi ---------- */}
      <Panel label={t("accuracy")}>
        <div className="center">
          <Gauge pct={acc} size={150}
            value={<DigitalDisplay value={acc} unit="%" size="lg" tone={acc >= 70 ? "green" : "amber"} />}
            label={t("correctAnswers")} />
        </div>
      </Panel>

      <div className="stat-grid">
        <div className="stat"><DigitalDisplay value={S.quizStat.ok} size="md" tone="green" /><span>{t("correctAnswers")}</span></div>
        <div className="stat"><DigitalDisplay value={S.bestStreak} size="md" tone="amber" /><span>{t("longestStreak")}</span></div>
        <div className="stat"><DigitalDisplay value={St.learnedCount()} size="md" tone="blue" /><span>{t("termsLearned")}</span></div>
        <div className="stat"><DigitalDisplay value={S.examBest} unit="%" size="md" tone="green" /><span>{t("examRecord")}</span></div>
        <div className="stat"><DigitalDisplay value={LECTURES.filter((L) => St.nodeDone(L.id)).length} size="md" tone="blue" /><span>{t("plPath")}</span></div>
        <div className="stat"><DigitalDisplay value={S.mistakes.length} size="md" tone={S.mistakes.length ? "red" : "green"} /><span>{t("inMistakes")}</span></div>
      </div>

      {S.mistakes.length ? (
        <PhysButton wide tone="alarm" led="red" onClick={() => go({ name: "mistakes" })}>
          {t("openMistakes")}
        </PhysButton>
      ) : null}

      {/* ---------- Ma'ruzalar ---------- */}
      <SectionTitle>{t("byLectures")}</SectionTitle>
      <Panel>
        {(() => {
          const rows = LECTURES.filter((L) => S.lecStat[L.id] || St.lecProgress(L.id));
          if (!rows.length) return <div className="tiny muted center">{t("noQuizYet")}</div>;
          return rows.map((L) => {
            const s = S.lecStat[L.id];
            const pct = St.lecProgress(L.id);
            const a = s && s.ok + s.bad ? Math.round((s.ok / (s.ok + s.bad)) * 100) : 0;
            return (
              <div className="row" style={{ marginBottom: 9, flexWrap: "nowrap" }} key={L.id}>
                <span className="badge badge-lec" style={{ background: L.color }}>{L.id}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="tiny" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {x(L.title)}
                  </div>
                  <Bar pct={pct} tone="blue" />
                </div>
                <span className="digit digit-sm" style={{ color: "var(--ink-3)" }}>{s ? `${a}%` : "—"}</span>
              </div>
            );
          });
        })()}
      </Panel>

      {/* ---------- Nishonlar ---------- */}
      <SectionTitle>{t("badges")}</SectionTitle>
      <Panel>
        {St.BADGES.map((b) => {
          const got = !!S.badges[b.id];
          return (
            <div className={`medal${got ? "" : " off"}`} key={b.id}>
              <div className="m-ico">{got ? b.ico : "🔒"}</div>
              <div style={{ minWidth: 0 }}>
                <b className="small">{x(b.name)}</b>
                <div className="tiny muted">{x(b.desc)}</div>
              </div>
              <span className="spacer" />
              <Led color={got ? "green" : "off"} on size={9} />
            </div>
          );
        })}
      </Panel>

      {/* ---------- Sozlamalar ---------- */}
      <SectionTitle>{t("settings")}</SectionTitle>
      <Panel label={t("plPanel")}>
        <label className="field">
          <span>{t("name")}</span>
          <input type="text" maxLength={24} value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              S.name = name.trim().slice(0, 24) || t("student");
              setName(S.name);
              St.save();
              toast(t("saved"));
            }} />
        </label>

        <div className="field">
          <span>{t("chooseLang")}</span>
          <div className="lang-pick">
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? "on" : ""}
                onClick={() => { setLang(l); fxTap(); }}>
                {LANG_NAMES[l]}
              </button>
            ))}
          </div>
        </div>

        <Toggle
          label={t("soundLabel")}
          hint={t("soundHint")}
          on={S.sound !== false}
          onToggle={() => { S.sound = !(S.sound !== false); St.save(); fxSwitch(); refresh(); }}
        />
        <Toggle
          label={t("vibroLabel")}
          hint={t("vibroHint")}
          on={S.vibro !== false}
          onToggle={() => { S.vibro = !(S.vibro !== false); St.save(); fxSwitch(); refresh(); }}
        />

        <div className="sep" />

        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <b className="small">{t("themeLabel")}</b>
            <div className="tiny muted">{S.theme === "dark" ? t("themeDark") : t("themeLight")}</div>
          </div>
          <PhysButton onClick={onTheme}>{S.theme === "dark" ? "☀" : "☾"}</PhysButton>
        </div>

        <div className="sep" />
        <PhysButton wide tone="alarm" onClick={() => {
          if (!window.confirm(t("resetConfirm"))) return;
          St.reset();
          location.reload();
        }}>
          {t("resetAll")}
        </PhysButton>
      </Panel>

      <p className="tiny muted center" style={{ marginTop: 12 }}>
        {t("offlineNote")}
        <br />
        {t("source")}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Toggle({
  label, hint, on, onToggle,
}: {
  label: string; hint: string; on: boolean; onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="sw" style={{ marginBottom: 12 }}>
      <button className={on ? "on" : ""} onClick={onToggle} aria-label={label}>
        <i />
      </button>
      <div style={{ minWidth: 0 }}>
        <b className="small">{label}</b>
        <div className="tiny muted">{hint} · {on ? t("onLabel") : t("offLabel")}</div>
      </div>
    </div>
  );
}
