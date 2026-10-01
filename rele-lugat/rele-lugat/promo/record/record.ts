/**
 * Ilovaning HAQIQIY ekranlarini yozib oladi.
 *
 *   npm run record                 — barcha kliplar
 *   npm run record -- circuit quiz — faqat ko'rsatilganlari
 *
 * Qanday ishlaydi:
 *   1. Ilovaning `dist/` i mitti static serverda beriladi.
 *   2. Chromium telefon rejimida ochiladi (390×844, DPR 3, touch).
 *   3. localStorage "chiroyli" holat bilan to'ldiriladi (record/seed.ts).
 *   4. Skript bo'yicha harakatlar bajariladi, har teginish ekranda ko'rinadi.
 *   5. CDP `Page.startScreencast` orqali kadrlar olinadi va ffmpeg bilan
 *      30 fps CFR mp4 ga yig'iladi → public/clips/.
 *
 * Yozuv Playwright'ning o'z `recordVideo` siga emas, screencast'ga asoslangan:
 * recordVideo faqat CSS piksel o'lchamida (390×844) yozadi, bu 1080 enli
 * reklama uchun juda past. Screencast esa DPR 3 da — 1170×2532.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium, type CDPSession, type Page } from "playwright";

import { circuitPlan, lectureQuiz, type QuizAnswer } from "./appdata";
import { OVERLAY_SCRIPT } from "./overlay";
import { buildSeed } from "./seed";
import { startServer } from "./serve";

/* ------------------------------------------------------------------ */
/* Sozlamalar                                                          */

const PORT = 4399;
const APP_DIST = join(process.cwd(), "..", "dist");
const CLIPS = join(process.cwd(), "public", "clips");
const TMP = join(process.cwd(), ".rec");

const PHONE = { width: 390, height: 844 };
const DPR = 3;
const OUT_W = PHONE.width * DPR; // 1170
const OUT_H = PHONE.height * DPR; // 2532
const FPS = 30;

const STORAGE_KEY = "rele-lugat-v2";

/* Ilovaning tab tartibi: 0 Bosh, 1 Yo'l, 2 Lug'at, 3 O'yinlar, 4 Hisob, 5 Profil */
const TAB = { home: 0, path: 1, glossary: 2, games: 3, calc: 4, profile: 5 } as const;

/* ------------------------------------------------------------------ */
/* Kichik yordamchilar                                                 */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function log(...a: unknown[]): void {
  console.log(" ", ...a);
}

/** Remotion bilan kelgan ffmpeg. */
function ffmpeg(args: string[]): void {
  const r = spawnSync("npx", ["remotion", "ffmpeg", ...args], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    throw new Error(`ffmpeg xato:\n${r.stderr?.toString().slice(-2000)}`);
  }
}

/* ------------------------------------------------------------------ */
/* Screencast yozuvchi                                                 */

interface Frame {
  data: Buffer;
  t: number; // sekundlarda
}

class Recorder {
  private frames: Frame[] = [];
  private cdp: CDPSession | null = null;
  private t0 = 0;
  private wall = 0;
  /** Muhim lahzalar: nom → yozuv boshidan o'tgan soniya. */
  private marks: Record<string, number> = {};

  constructor(private page: Page, private name: string) {}

  /**
   * Sahnaning muhim lahzasini belgilaydi.
   * Remotion shu belgilar bo'yicha klipni kesadi — qo'lda tanlangan
   * "sehrli" taymkodlar kerak emas, kontent o'zgarsa ham mos keladi.
   */
  mark(name: string): void {
    if (this.wall) this.marks[name] = (Date.now() - this.wall) / 1000;
  }

  async start(): Promise<void> {
    this.cdp = await this.page.context().newCDPSession(this.page);
    this.frames = [];
    this.t0 = 0;
    this.cdp.on("Page.screencastFrame", async (f) => {
      const t = f.metadata.timestamp ?? 0;
      if (!this.t0) this.t0 = t;
      this.frames.push({ data: Buffer.from(f.data, "base64"), t: t - this.t0 });
      try {
        await this.cdp?.send("Page.screencastFrameAck", { sessionId: f.sessionId });
      } catch {
        /* sahifa yopilgan bo'lishi mumkin */
      }
    });
    await this.cdp.send("Page.startScreencast", {
      format: "jpeg",
      quality: 92,
      maxWidth: OUT_W,
      maxHeight: OUT_H,
      everyNthFrame: 1,
    });
    this.wall = Date.now();
    this.marks = {};
  }

  async stop(): Promise<number> {
    try {
      await this.cdp?.send("Page.stopScreencast");
    } catch {
      /* e'tiborsiz */
    }
    await sleep(120);
    const n = this.frames.length;
    if (n < 10) throw new Error(`${this.name}: kadr juda kam (${n})`);
    this.encode();
    return n;
  }

  /** Kadrlarni CFR 30 fps mp4 ga yig'adi. */
  private encode(): void {
    const dir = join(TMP, this.name);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    const lines: string[] = [];
    this.frames.forEach((f, i) => {
      const file = `f${String(i).padStart(5, "0")}.jpg`;
      writeFileSync(join(dir, file), f.data);
      const next = this.frames[i + 1];
      /* Haqiqiy vaqt oralig'i — screencast VFR, ffmpeg uni CFR ga keltiradi. */
      const d = next ? Math.max(1 / 120, next.t - f.t) : 1 / FPS;
      lines.push(`file '${file}'`, `duration ${d.toFixed(5)}`);
    });
    /* concat demuxer oxirgi faylni takrorlashni talab qiladi. */
    lines.push(`file 'f${String(this.frames.length - 1).padStart(5, "0")}.jpg'`);
    writeFileSync(join(dir, "list.txt"), lines.join("\n"));

    const out = join(CLIPS, `clip-${this.name}.mp4`);
    ffmpeg([
      "-y",
      "-f", "concat", "-safe", "0",
      "-i", join(dir, "list.txt"),
      /* Remotion ffmpeg'ida filtrlar whitelist bilan yig'ilgan: `scale` bor,
         `fps`/`setsar` yo'q. Shuning uchun CFR ni chiqish `-r` si beradi. */
      "-vf", `scale=${OUT_W}:${OUT_H}:flags=lanczos`,
      "-r", String(FPS),
      "-c:v", "libx264", "-preset", "slow", "-crf", "17",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      out,
    ]);
    rmSync(dir, { recursive: true, force: true });

    /* Yonma-yon turadigan belgilar fayli — Remotion kesishlarni shundan oladi. */
    const duration = this.frames[this.frames.length - 1]?.t ?? 0;
    writeFileSync(
      join(CLIPS, `clip-${this.name}.json`),
      `${JSON.stringify({ duration: Number(duration.toFixed(3)), fps: FPS, marks: this.marks }, null, 2)}\n`,
    );

    log(
      `→ clip-${this.name}.mp4  (${this.frames.length} kadr, ${duration.toFixed(2)}s, ` +
      `${Object.keys(this.marks).length} belgi)`,
    );
  }
}

/* ------------------------------------------------------------------ */
/* Barmoq bilan ishlash — har harakat ekranda ko'rinadi                 */

interface Pt {
  x: number;
  y: number;
}

/**
 * `page.evaluate` ga HAR DOIM satr beramiz, funksiya emas.
 * tsx (esbuild) `keepNames` bilan kompilyatsiya qiladi va funksiyalarga
 * `__name(...)` chaqiruvini qo'shadi — brauzerda bunday global yo'q, shuning
 * uchun funksiya ko'rinishidagi evaluate "__name is not defined" beradi.
 */
const js = (expr: string): string => expr;

/* Barmoq ko'rsatkichini qatlamning o'zi chizadi (record/overlay.ts) —
   bu yerda faqat pointer hodisalarini yuborish kifoya. */

async function tap(page: Page, p: Pt, settle = 380): Promise<void> {
  await page.mouse.move(p.x, p.y);
  await page.mouse.down();
  await sleep(70); // bosilgan holat ko'rinib ulgursin
  await page.mouse.up();
  await sleep(settle);
}

async function drag(page: Page, from: Pt, to: Pt, steps = 14, hold = 110): Promise<void> {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await sleep(hold);
  for (let i = 1; i <= steps; i++) {
    /* ease-in-out — barmoq harakati tabiiy ko'rinsin */
    const t = i / steps;
    const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    await page.mouse.move(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
    await sleep(8);
  }
  await page.mouse.up();
  await sleep(180);
}

/** Elementning markazi (CSS piksellarda). */
async function center(page: Page, selector: string, index = 0): Promise<Pt> {
  const el = page.locator(selector).nth(index);
  await el.waitFor({ state: "visible", timeout: 8000 });
  const b = await el.boundingBox();
  if (!b) throw new Error(`o'lcham olinmadi: ${selector}[${index}]`);
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

async function tapSel(page: Page, selector: string, index = 0, settle = 380): Promise<void> {
  await tap(page, await center(page, selector, index), settle);
}

/** Palitradagi detalni ko'rinadigan joyga surib qo'yadi. */
async function revealPart(page: Page, index: number): Promise<void> {
  await page.evaluate(
    js(`(() => {
      const el = document.querySelectorAll(".part")[${index}];
      if (el) el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    })()`),
  );
  await sleep(260);
}

/** Sahifani yumshoq (inersiyali) scroll qiladi. */
async function smoothScroll(page: Page, by: number, ms: number): Promise<void> {
  await page.evaluate(
    js(`new Promise((done) => {
      const start = window.scrollY;
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / ${ms});
        const e = 1 - Math.pow(1 - k, 3);
        window.scrollTo(0, start + ${by} * e);
        if (k < 1) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    })`),
  );
}

/* ------------------------------------------------------------------ */
/* Klip skriptlari                                                     */

type Mark = (name: string) => void;
type ClipFn = (page: Page, mark: Mark) => Promise<void>;

/** 1. Bosh ekran — bento, XP tablosi sanaydi. */
const clipHome: ClipFn = async (page, mark) => {
  mark("bento");
  await sleep(1500); // sanab chiquvchi raqamlar ko'rinsin
  mark("scroll");
  await smoothScroll(page, 520, 1500);
  await sleep(700);
  await smoothScroll(page, -520, 900);
  await sleep(500);
};

/** 2. Sxema konstruktori — detallarni joyiga qo'yish va tekshirish. */
const clipCircuit: ClipFn = async (page, mark) => {
  const plan = circuitPlan("mth-struct");

  await tapSel(page, ".tabbar .tab", TAB.games, 560);
  /* O'yinlar bo'limida sxema konstruktori — "O'yinlar" ro'yxatidagi 1-plitka. */
  await tapSel(page, ".tile", 3, 620);
  /* Sxemalar ro'yxatida mth-struct — ikkinchisi. */
  await tapSel(page, ".tile", 1, 720);

  await page.waitForSelector("rect[data-slot]", { timeout: 8000 });
  mark("builder"); // bo'sh sxema ekranda

  let i = 0;
  for (const slot of plan.slots) {
    const partId = plan.accept[slot];
    const partIdx = plan.parts.indexOf(partId);
    if (partIdx < 0) throw new Error(`palitrada detal yo'q: ${partId}`);

    await revealPart(page, partIdx);
    const from = await center(page, ".part", partIdx);
    const to = await center(page, `rect[data-slot="${slot}"]`);
    mark(`drag${++i}`);
    await drag(page, from, to);
  }
  mark("filled"); // 5/5 to'ldirildi

  await sleep(260);
  /* "Tekshirish" — ikkinchi knopka. */
  mark("check");
  await tapSel(page, ".pbtn", 1, 1250);
  mark("win"); // 100%, tok yuguradi, konfetti
  await smoothScroll(page, 360, 750);
  await sleep(750);
};

const norm = (s: string): string => s.replace(/\s+/g, " ").trim();

/**
 * Ekrandagi to'g'ri variantning indeksini topadi.
 *
 * Ilova savollarni ham, variantlarni ham aralashtirib chizadi, shuning uchun
 * manba indeksiga suyanib bo'lmaydi: avval ekrandagi SAVOL matnidan qaysi
 * savol ekanini aniqlaymiz, so'ng uning to'g'ri variantini yana matn bo'yicha
 * topamiz.
 */
async function rightOptionIndex(page: Page, pool: QuizAnswer[]): Promise<number> {
  const state = (await page.evaluate(
    js(`({
      q: (document.querySelector(".panel h3") || {}).textContent || "",
      opts: Array.from(document.querySelectorAll(".opt")).map((e) => (e.textContent || "").trim()),
    })`),
  )) as { q: string; opts: string[] };

  const shown = norm(state.q);
  const found = pool.find((q) => norm(q.question) === shown)
    ?? pool.find((q) => shown.startsWith(norm(q.question).slice(0, 30)));
  if (!found || found.a === null) {
    throw new Error(`ekrandagi savol topilmadi: "${shown.slice(0, 50)}…"`);
  }

  const want = norm(found.options[found.a] ?? "");
  const opts = state.opts.map(norm);
  const i = opts.indexOf(want);
  if (i >= 0) return i;
  const j = opts.findIndex((s) => s.startsWith(want.slice(0, 24)));
  if (j >= 0) return j;
  throw new Error(`to'g'ri variant ekranda topilmadi: "${want.slice(0, 40)}…"`);
}

/** Ekrandagi savol variantli (mcq/tf) bo'lguncha "Keyingi" bosib o'tadi. */
async function waitForChoice(page: Page): Promise<void> {
  for (let k = 0; k < 6; k++) {
    await page.waitForSelector(".opt, select", { timeout: 8000 });
    if (await page.locator(".opt").count()) return;
    /* moslashtirish savoli — o'tkazib yuboramiz */
    await tapSel(page, ".pbtn", 0, 700);
  }
  throw new Error("variantli savol topilmadi");
}

/** 3. Test — bitta xato (AVARIYA), keyin to'g'ri javob (yashil). */
const clipQuiz: ClipFn = async (page, mark) => {
  const pool = lectureQuiz(1).filter((q) => q.type === "mcq" && q.a !== null);
  if (pool.length < 2) throw new Error("1-ma'ruzada yetarli mcq savol yo'q");

  await tapSel(page, ".tabbar .tab", TAB.games, 700);
  await tapSel(page, ".tile", 1, 800); // "Test yechish"
  await tapSel(page, ".tile", 1, 900); // 1-ma'ruza (0 — aralash imtihon)

  await waitForChoice(page);
  mark("question");

  /* --- ataylab noto'g'ri: to'g'ri javobdan boshqa variant --- */
  const right1 = await rightOptionIndex(page, pool);
  mark("wrongTap");
  await tapSel(page, ".opt", right1 === 0 ? 1 : 0, 1600);
  if (!(await page.locator(".alarm-bar").count())) {
    throw new Error("xato javob kutilgan edi, lekin AVARIYA chiqmadi");
  }
  mark("alarm"); // AVARIYA paneli ko'rindi
  await smoothScroll(page, 260, 600);
  await sleep(900);

  /* --- keyingi savol: to'g'ri javob --- */
  await smoothScroll(page, 400, 500);
  await tapSel(page, ".pbtn", 0, 1100);
  await waitForChoice(page);
  mark("question2");
  await tapSel(page, ".opt", await rightOptionIndex(page, pool), 1700);
  if (!(await page.locator(".ok-bar").count())) {
    throw new Error("to'g'ri javob kutilgan edi, lekin yashil tasdiq chiqmadi");
  }
  mark("ok"); // yashil javob
  await sleep(700);
};

/** 4. Yo'l xaritasi — tugunlar energiyalangan, tok impulsi yuguradi. */
const clipPath: ClipFn = async (page, mark) => {
  await tapSel(page, ".tabbar .tab", TAB.path, 900);
  await sleep(800);
  mark("map");
  /* Faqat energiyalangan tugunlar zonasida qolamiz (1-8): pastda hali
     boshlanmagan tugunlar bor, ular reklamada bo'sh ko'rinadi. */
  await smoothScroll(page, 300, 1400);
  await sleep(500);
  /* 6-tugun (sariq, miltillayotgani) — varaqasini ochamiz. */
  mark("node");
  await tapSel(page, "g.pm-node", 5, 1300);
  mark("sheet");
  await sleep(900);
};

/** 5. Flashcard — kartani ag'darish va KH bayroqchasining tushishi. */
const clipFlash: ClipFn = async (page, mark) => {
  await tapSel(page, ".tabbar .tab", TAB.games, 700);
  await tapSel(page, ".tile", 0, 900); // "Flashcard"
  await page.waitForSelector(".fc", { timeout: 8000 });
  await sleep(700);
  mark("front");
  await tapSel(page, ".fc", 0, 1100); // ag'darish
  mark("back");
  await sleep(500);
  /* "Bilaman" — ikkinchi knopka (birinchisi "Bilmayman"). */
  mark("answer");
  await tapSel(page, ".grid2 .pbtn", 1, 1500);
  mark("flag"); // KH bayroqchasi yashil tushdi
  await sleep(600);
};

/** 6. Hisoblagich — strelka va 0 dan sanaladigan natija. */
const clipCalc: ClipFn = async (page, mark) => {
  await tapSel(page, ".tabbar .tab", TAB.calc, 800);
  await tapSel(page, ".tile", 0, 900);
  await page.waitForSelector(".pbtn", { timeout: 8000 });
  await sleep(500);
  mark("form");
  await tapSel(page, ".pbtn", 0, 600); // "Hisoblash"
  await smoothScroll(page, 420, 800);
  mark("result"); // strelka va sanab chiqish
  await sleep(1600);
};

const CLIP_SCRIPTS: Record<string, ClipFn> = {
  home: clipHome,
  circuit: clipCircuit,
  quiz: clipQuiz,
  path: clipPath,
  flash: clipFlash,
  calc: clipCalc,
};

/* ------------------------------------------------------------------ */
/* Yurgizish                                                           */

async function recordOne(name: string, fn: ClipFn, seed: Record<string, unknown>): Promise<void> {
  const browser = await chromium.launch({
    args: ["--force-color-profile=srgb", "--disable-lcd-text", "--hide-scrollbars"],
  });
  try {
    const ctx = await browser.newContext({
      viewport: PHONE,
      deviceScaleFactor: DPR,
      isMobile: true,
      hasTouch: true,
      colorScheme: "dark",
      reducedMotion: "no-preference",
      locale: "uz-UZ",
    });
    /* Seed va barmoq qatlami — sahifa kodidan oldin ishga tushadi.
       Bu yerda ham satr beriladi (yuqoridagi `js` izohiga qarang). */
    await ctx.addInitScript(
      `try {
         localStorage.setItem(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(JSON.stringify(seed))});
         localStorage.setItem("rele-lugat-lang", "uz");
       } catch (e) {}`,
    );
    await ctx.addInitScript(OVERLAY_SCRIPT);

    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "load" });
    await page.waitForSelector(".tabbar", { timeout: 15000 });
    await sleep(900); // birinchi animatsiyalar tinchisin

    const rec = new Recorder(page, name);
    await rec.start();
    await fn(page, (m) => rec.mark(m));
    await sleep(350);
    await rec.stop();
  } finally {
    await browser.close();
  }
}

async function main(): Promise<void> {
  if (!existsSync(join(APP_DIST, "index.html"))) {
    throw new Error(
      `Ilova yig'ilmagan: ${APP_DIST}\n  Avval loyiha ildizida "npm run build" ni bajaring.`,
    );
  }
  mkdirSync(CLIPS, { recursive: true });
  mkdirSync(TMP, { recursive: true });

  const want = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const names = want.length ? want : Object.keys(CLIP_SCRIPTS);
  for (const n of names) {
    if (!CLIP_SCRIPTS[n]) throw new Error(`noma'lum klip: ${n}`);
  }

  const server = await startServer(APP_DIST, PORT);
  const seed = buildSeed();
  console.log(`Server: http://127.0.0.1:${PORT}  (${APP_DIST})`);

  try {
    for (const name of names) {
      console.log(`\n[${name}]`);
      let lastErr: unknown = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await recordOne(name, CLIP_SCRIPTS[name], seed);
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
          log(`urinish ${attempt} muvaffaqiyatsiz: ${(e as Error).message}`);
          await sleep(700);
        }
      }
      if (lastErr) throw lastErr;
    }
  } finally {
    server.close();
    rmSync(TMP, { recursive: true, force: true });
  }

  console.log("\nBarcha kliplar tayyor →", CLIPS);
}

main().catch((e) => {
  console.error("\nXATO:", e);
  process.exit(1);
});
