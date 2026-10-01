/**
 * "Bosh ekranga o'rnatish" kartochkasi (PWA).
 *
 *  - iOS Safari: Ulashish → Bosh ekranga qo'shish qadamlari (iOS'da avtomatik taklif yo'q).
 *  - iOS'dagi Chrome/Firefox/Edge: "Safari'da oching" eslatmasi.
 *  - Android/desktop Chrome: `beforeinstallprompt` kelganda "O'rnatish" tugmasi.
 *  - APK (Capacitor) ichida va allaqachon o'rnatilgan (standalone) holda — ko'rsatilmaydi.
 *  - Yopilgach qayta chiqmaydi (localStorage).
 */
import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import {
  canPromptInstall, isIOS, isIOSOtherBrowser, isNativeApp, isStandalone, onInstallChange, promptInstall,
} from "../pwa";
import { Led, PhysButton } from "./Panel";

const KEY = "rele-lugat-install-hint";

function dismissed(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
function remember(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* xotira bloklangan */
  }
}

type Mode = "none" | "ios" | "ios-other" | "prompt";

function detect(): Mode {
  if (isNativeApp() || isStandalone() || dismissed()) return "none";
  if (isIOSOtherBrowser()) return "ios-other";
  if (isIOS()) return "ios";
  return canPromptInstall() ? "prompt" : "none";
}

/** iOS "Ulashish" belgisi (kvadrat va yuqoriga strelka). */
function ShareIcon() {
  return (
    <svg className="ih-share" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" /><path d="m7.5 7.5 4.5-4.5 4.5 4.5" /><path d="M8 11H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2" />
    </svg>
  );
}

export default function InstallHint() {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>("none");

  useEffect(() => {
    // Birinchi ekran chizilib, foydalanuvchi o'zini tanishtirgach chiqsin.
    const timer = window.setTimeout(() => setMode(detect()), 1200);
    const off = onInstallChange(() => setMode(detect()));
    return () => { window.clearTimeout(timer); off(); };
  }, []);

  if (mode === "none") return null;

  const close = () => { remember(); setMode("none"); };
  const install = async () => {
    const ok = await promptInstall();
    if (ok) remember();
    setMode(detect());
  };

  return (
    <aside className="install-hint" role="dialog" aria-labelledby="ih-title">
      <div className="ih-head">
        <img src={`${__APP_BASE__}icons/icon-192.png`} alt="" width="40" height="40" className="ih-icon" />
        <div className="ih-text">
          <b id="ih-title">{t("installTitle")}</b>
          <span>{t("installSub")}</span>
        </div>
        <button type="button" className="ih-x" onClick={close} aria-label={t("installLater")}>×</button>
      </div>

      {mode === "ios" ? (
        <ol className="ih-steps">
          <li><Led color="blue" on size={7} /><ShareIcon /><span>{t("installIos1")}</span></li>
          <li><Led color="blue" on size={7} /><span className="ih-plus" aria-hidden="true">＋</span><span>{t("installIos2")}</span></li>
          <li><Led color="green" on size={7} /><span>{t("installIos3")}</span></li>
        </ol>
      ) : null}

      {mode === "ios-other" ? (
        <p className="ih-note"><Led color="amber" on size={7} /><span>{t("installSafari")}</span></p>
      ) : null}

      {mode === "prompt" ? (
        <div className="ih-actions">
          <PhysButton tone="ghost" onClick={close}>{t("installLater")}</PhysButton>
          <PhysButton tone="primary" led="green" onClick={() => void install()}>{t("installBtn")}</PhysButton>
        </div>
      ) : null}
    </aside>
  );
}
