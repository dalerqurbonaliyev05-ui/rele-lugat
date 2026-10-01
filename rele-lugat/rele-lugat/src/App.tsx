import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InstallHint from "./components/InstallHint";
import { Led } from "./components/Panel";
import { I18nProvider, LANG_FLAGS, LANG_NAMES, useI18n } from "./i18n";
import type { UIKey } from "./i18n/strings";
import { unlockAudio } from "./lib/audio";
import { confetti, fxLevel, fxTap, haptic } from "./lib/fx";
import * as St from "./store";
import { NavContext, type Route } from "./ui";
import { LANGS, type Lang } from "./types";

import Home from "./views/Home";
import Path from "./views/Path";
import Glossary from "./views/Glossary";
import Games from "./views/Games";
import Flashcards from "./views/Flashcards";
import Quiz, { Daily, Exam } from "./views/Quiz";
import Circuit from "./views/Circuit";
import Scenario, { Timing } from "./views/Scenario";
import Logic from "./views/Logic";
import Relay from "./views/Relay";
import Calc from "./views/Calc";
import Profile from "./views/Profile";
import Mistakes, { MistakeQuiz } from "./views/Mistakes";

export default function App() {
  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  );
}

/* ------------------------------------------------------------------ */

const TABS = ["home", "path", "glossary", "games", "calc", "profile"] as const;
type Tab = (typeof TABS)[number];

const TAB_OF: Record<Route["name"], Tab> = {
  home: "home",
  daily: "home",
  path: "path",
  glossary: "glossary",
  games: "games",
  calc: "calc",
  profile: "profile",
  flashcards: "games",
  quiz: "games",
  exam: "games",
  circuit: "games",
  scenario: "games",
  timing: "games",
  logic: "games",
  relay: "games",
  mistakes: "profile",
  mistakeQuiz: "profile",
};

/* Monoxrom belgilar — pult uslubiga mos va barcha qurilmada bir xil chiziladi. */
const TAB_ICON: Record<Tab, string> = {
  home: "▦", path: "⌗", glossary: "≣", games: "◈", calc: "Σ", profile: "◉",
};
const TAB_LABEL: Record<Tab, UIKey> = {
  home: "tabHome", path: "tabPath", glossary: "tabGlossary",
  games: "tabGames", calc: "tabCalc", profile: "tabProfile",
};

const TITLES: Record<Route["name"], readonly [UIKey, UIKey]> = {
  home: ["appName", "appSub"],
  path: ["pathTitle", "pathSub"],
  daily: ["plDaily", "quizzesSub"],
  glossary: ["tabGlossary", "glossarySub"],
  games: ["tabGames", "gamesSub"],
  calc: ["calcTitle", "calcSub"],
  profile: ["tabProfile", "profileSub"],
  flashcards: ["flashTitle", "flashSub"],
  quiz: ["quizTitle", "quizzesSub"],
  exam: ["examTitle", "mixedExamSub"],
  circuit: ["circuitBuilder", "circuitBuilderSub"],
  scenario: ["scenarioTitle", "scenarioSub"],
  timing: ["timingTitle", "timingSub"],
  logic: ["logicTitle", "logicSub"],
  relay: ["relayTitle", "relaySub"],
  mistakes: ["mistakesTitle", "mistakesSubT"],
  mistakeQuiz: ["mistakesTitle", "mistakesSubT"],
};

/* ------------------------------------------------------------------ */

function Shell() {
  const { t, x, lang, setLang } = useI18n();
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [, force] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<number | null>(null);

  /* ---------- birinchi yuklash ---------- */
  useEffect(() => {
    St.load();
    applyTheme(St.S.theme);
    if (St.S.name) {
      St.touchDay();
      setReady(true);
    }
    document.documentElement.lang = lang;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- tovush: teginishda ochish va qayta uyg'otish ----------
     `once` emas: iOS Safari ilova fonga o'tganda AudioContext ni
     "interrupted"/"suspended" holatiga qaytaradi — har teginishda tekshiramiz
     (ishlab turgan bo'lsa unlockAudio hech narsa qilmaydi). touchend — eski iOS
     faqat shu hodisada audio'ni ochadi. */
  useEffect(() => {
    const h = () => unlockAudio();
    const evs = ["pointerdown", "touchend", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, h, { passive: true }));
    return () => evs.forEach((e) => window.removeEventListener(e, h));
  }, []);

  const refresh = useCallback(() => force((n) => n + 1), []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(""), 2100);
  }, []);

  const go = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo(0, 0);
  }, []);

  const nav = useMemo(() => ({ go, toast, refresh }), [go, toast, refresh]);

  /* ---------- yangi nishonlar ---------- */
  useEffect(() => {
    const nb = St.takeNewBadges();
    if (!nb.length) return;
    confetti(90);
    fxLevel();
    toast(`🏅 ${t("newBadge", { name: x(nb[0].name) })}`);
  });

  const toggleTheme = () => {
    St.S.theme = St.S.theme === "dark" ? "light" : "dark";
    St.save();
    applyTheme(St.S.theme);
    refresh();
    haptic();
  };

  const cycleLang = () => {
    const i = LANGS.indexOf(lang);
    setLang(LANGS[(i + 1) % LANGS.length]);
    fxTap();
  };

  if (!ready) return <Onboard onDone={() => { St.touchDay(); setReady(true); }} />;

  const title = TITLES[route.name];
  const tab = TAB_OF[route.name];
  const alarm = St.S.mistakes.length > 0;

  return (
    <NavContext.Provider value={nav}>
      <header className="statusbar">
        <img src={`${__APP_BASE__}logo.svg`} alt="" className="sb-logo" />
        <div className="sb-name">
          <b>{t(title[0])}</b>
          {t(title[1])}
        </div>
        <div className="sb-right">
          <span className="sb-chip" title={t("plLevel")}>
            <Led color="blue" on size={7} />
            <span className="digit digit-sm digit-amber">{St.S.xp}</span>
          </span>
          <span className="sb-chip" title={t("plStreak")}>
            <Led color={St.S.streak > 0 ? "green" : "off"} on size={7} />
            <span className="digit digit-sm digit-green">{St.S.streak}</span>
          </span>
          <span className="sb-chip" title={alarm ? t("statusAlarm") : t("statusOk")}>
            <Led color={alarm ? "red" : "green"} on size={7} blink={alarm} />
          </span>
          <button className="sb-btn" onClick={cycleLang} title={LANG_NAMES[lang]}>
            {LANG_FLAGS[lang]}
          </button>
          <button className="sb-btn" onClick={toggleTheme} aria-label={t("themeLabel")}>
            {St.S.theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <main className="view screen-in" key={`${route.name}-${lang}`}>
        <Screen route={route} onTheme={toggleTheme} />
      </main>

      <nav className="tabbar">
        {TABS.map((tb) => (
          <button
            key={tb}
            className={`tab${tab === tb ? " on" : ""}`}
            onClick={() => { fxTap(); go({ name: tb }); }}
          >
            <span className="ti">{TAB_ICON[tb]}</span>
            <span>{t(TAB_LABEL[tb])}</span>
          </button>
        ))}
      </nav>

      <div className={`toast${toastMsg ? " show" : ""}`}>{toastMsg}</div>
      <InstallHint />
      <canvas id="confetti" className="confetti" />
      <div id="alarm-flash" />
    </NavContext.Provider>
  );
}

/* ------------------------------------------------------------------ */

function Screen({ route, onTheme }: { route: Route; onTheme: () => void }) {
  switch (route.name) {
    case "home": return <Home />;
    case "path": return <Path />;
    case "daily": return <Daily />;
    case "glossary": return <Glossary jump={route.jump} lec={route.lec} />;
    case "games": return <Games />;
    case "flashcards": return <Flashcards ids={route.ids} lec={route.lec} />;
    case "quiz": return <Quiz lec={route.lec} />;
    case "exam": return <Exam />;
    case "circuit": return <Circuit id={route.id} />;
    case "scenario": return <Scenario />;
    case "timing": return <Timing />;
    case "logic": return <Logic />;
    case "relay": return <Relay reference={route.reference} />;
    case "calc": return <Calc id={route.id} />;
    case "mistakes": return <Mistakes />;
    case "mistakeQuiz": return <MistakeQuiz />;
    case "profile": return <Profile onTheme={onTheme} />;
  }
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  const m = document.querySelector('meta[name="theme-color"]');
  m?.setAttribute("content", theme === "dark" ? "#0b1220" : "#e8edf6");
}

/* ------------------------------------------------------------------ */
/* Birinchi ishga tushirish                                             */

function Onboard({ onDone }: { onDone: () => void }) {
  const { t, lang, setLang } = useI18n();
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);

  const start = () => {
    const v = name.trim();
    if (!v) { setErr(true); haptic("err"); return; }
    St.S.name = v.slice(0, 24);
    St.save();
    unlockAudio();
    fxLevel();
    onDone();
  };

  return (
    <div className="onboard">
      <div className="onboard-card">
        <i className="screw s-tl" /><i className="screw s-tr" />
        <i className="screw s-bl" /><i className="screw s-br" />
        <img src={`${__APP_BASE__}logo.svg`} alt="" className="onboard-logo" />
        <h1>{t("appName")}</h1>
        <p className="muted small">{t("onboardTagline")}</p>

        <div className="lang-pick">
          {LANGS.map((l: Lang) => (
            <button key={l} className={l === lang ? "on" : ""} onClick={() => setLang(l)}>
              {LANG_NAMES[l]}
            </button>
          ))}
        </div>

        <label className="field">
          <span>{t("yourName")}</span>
          <input
            type="text" maxLength={24} placeholder={t("namePlaceholder")} value={name}
            autoComplete="off"
            onChange={(e) => { setName(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && start()}
          />
        </label>
        {err ? <p className="tiny" style={{ color: "var(--bad)" }}>{t("enterName")}</p> : null}

        <p className="tiny muted">{t("privacyNote")}</p>
        <button className="pbtn pbtn-primary pbtn-wide" onClick={start}>
          <span className="pbtn-txt">{t("start")}</span>
        </button>
      </div>
    </div>
  );
}
