/**
 * PWA: service worker, platformani aniqlash va o'rnatish taklifi.
 *
 * APK (Capacitor) ichida hech narsa qilmaydi — u yerda ilova allaqachon
 * o'rnatilgan va fayllar APK ichidan ochiladi.
 */

/** vite.config.ts → define. APK/file:// uchun "./", sayt uchun "/rele-lugat/app/". */
const BASE: string = __APP_BASE__;

/* ------------------------------------------------------------------ */
/* Platforma                                                            */

/**
 * APK ichidami. `window.Capacitor` ni faqat native bridge qo'shadi —
 * ilova bundle'i @capacitor/core ni import qilmaydi, shuning uchun brauzerda
 * bu obyekt hech qachon paydo bo'lmaydi.
 */
export function isNativeApp(): boolean {
  if ((window as unknown as { Capacitor?: unknown }).Capacitor) return true;
  const { protocol, hostname } = window.location;
  return protocol === "capacitor:" || (protocol === "https:" && hostname === "localhost");
}

/** Bosh ekrandan (o'rnatilgan holda) ochilganmi. */
export function isStandalone(): boolean {
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
    if (window.matchMedia("(display-mode: fullscreen)").matches) return true;
  } catch {
    /* eski brauzer */
  }
  return (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

/** iPhone / iPad (iPadOS o'zini Mac deb tanishtiradi — teginish nuqtalari bo'yicha ajratamiz). */
export function isIOS(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/** iOS'dagi Safari bo'lmagan brauzer (Chrome, Firefox, Edge, Opera). */
export function isIOSOtherBrowser(): boolean {
  return isIOS() && /CriOS|FxiOS|EdgiOS|OPiOS|OPT\//.test(navigator.userAgent);
}

/* ------------------------------------------------------------------ */
/* O'rnatish taklifi (Android / desktop Chrome)                         */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

/** InstallHint shu orqali holat o'zgarishini kuzatadi. */
export function onInstallChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const canPromptInstall = (): boolean => deferred !== null && !installed;
export const wasInstalled = (): boolean => installed;

/** Brauzerning o'z o'rnatish oynasini ochadi. `true` — foydalanuvchi o'rnatdi. */
export async function promptInstall(): Promise<boolean> {
  const e = deferred;
  if (!e) return false;
  deferred = null; // hodisa faqat bir marta ishlatiladi
  notify();
  await e.prompt();
  const { outcome } = await e.userChoice;
  return outcome === "accepted";
}

/* ------------------------------------------------------------------ */
/* Service worker                                                       */

export function initPwa(): void {
  if (isNativeApp()) {
    // APK ichida SW kerak emas. Qachondir ro'yxatdan o'tgan bo'lsa — zarar qilmasin.
    navigator.serviceWorker?.getRegistrations?.()
      .then((rs) => rs.forEach((r) => void r.unregister()))
      .catch(() => {});
    return;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // brauzerning o'z bannerini emas, ilova kartochkasini ko'rsatamiz
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    installed = true;
    deferred = null;
    notify();
  });

  // Dev-serverda keshlash chalg'itadi; file:// va oddiy http da SW umuman ishlamaydi.
  if (import.meta.env.DEV || !("serviceWorker" in navigator)) return;
  const { protocol, hostname } = window.location;
  const secure = protocol === "https:" || hostname === "localhost" || hostname === "127.0.0.1";
  if (!secure) return;

  const register = () => {
    navigator.serviceWorker
      .register(`${BASE}sw.js`, { scope: BASE, updateViaCache: "none" })
      .catch(() => {
        /* masalan, brauzer xususiy rejimda — ilova baribir ishlaydi */
      });
  };
  // Birinchi chizishga xalaqit bermasin.
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register, { once: true });
}
