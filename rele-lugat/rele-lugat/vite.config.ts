import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Yig'ilgan `dist/index.html` ni oddiy fayl sifatida (file://) ochish uchun
 * skript `type="module"` siz, klassik `<script src>` bo'lishi kerak —
 * chunki brauzerlar file:// dan ES modullarni CORS sababli bloklaydi.
 * Shuning uchun bundle iife formatda chiqariladi va bu plagin HTML dagi
 * `type="module"` hamda `crossorigin` atributlarini olib tashlaydi.
 */
function fileProtocolCompat(): Plugin {
  return {
    name: "file-protocol-compat",
    // Faqat build'da: dev-serverda modullar `type="module"` bilan yuklanadi.
    apply: "build",
    enforce: "post",
    transformIndexHtml(html) {
      // `type="module"` → `defer`: modul skriptlar kabi DOM tayyor bo'lgach ishga tushsin
      // (skript <head> da turadi, shuning uchun defer shart).
      return html.replace(/\s+type="module"/g, " defer").replace(/\s+crossorigin/g, "");
    },
  };
}

/**
 * PWA service worker: build tugagach chiqish papkasidagi BARCHA fayllarni
 * yig'ib, pwa/sw-template.js dan `sw.js` yaratadi.
 *
 *  - VERSION — fayllar kontentining xeshi: biror fayl o'zgarsa, sw.js ham
 *    o'zgaradi va brauzer yangi versiyani fonda yuklaydi.
 *  - Ro'yxatdagi yo'llar nisbiy ("./assets/app.js") — SW ularni o'z scope'iga
 *    nisbatan ochadi, shuning uchun `./` va `/rele-lugat/app/` ostida bir xil ishlaydi.
 */
function pwaServiceWorker(): Plugin {
  let root = process.cwd();
  let outDir = "dist";
  return {
    name: "pwa-service-worker",
    apply: "build",
    configResolved(c) {
      root = c.root;
      outDir = resolve(c.root, c.build.outDir);
    },
    closeBundle() {
      const files: string[] = [];
      const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
          const p = join(dir, name);
          if (statSync(p).isDirectory()) walk(p);
          else files.push(relative(outDir, p).split(sep).join("/"));
        }
      };
      walk(outDir);

      const precache = files.filter((f) => f !== "sw.js" && !f.endsWith(".map")).sort();
      const hash = createHash("sha256");
      for (const f of precache) hash.update(f).update(readFileSync(join(outDir, f)));
      const version = hash.digest("hex").slice(0, 12);

      // "./" (papka indeksi) ataylab yo'q: ba'zi hostinglar uni bermaydi va addAll butunlay
      // yiqiladi. Navigatsiya baribir keshdagi index.html ga yo'naltiriladi (sw-template.js).
      const list = precache.map((f) => "./" + f);
      // Aniq kod qatorlari almashtiriladi (izohlardagi so'zlar emas).
      const sw = readFileSync(join(root, "pwa", "sw-template.js"), "utf8")
        .replace('const VERSION = "__VERSION__";', `const VERSION = "${version}";`)
        .replace("const PRECACHE = __PRECACHE__;", `const PRECACHE = ${JSON.stringify(list, null, 2)};`);
      if (sw.includes("__VERSION__") || sw.includes("__PRECACHE__")) {
        throw new Error("sw.js: shablondagi belgilar almashtirilmadi (pwa/sw-template.js ni tekshiring)");
      }
      writeFileSync(join(outDir, "sw.js"), sw);
      console.log(`  sw.js: versiya ${version}, ${list.length} fayl oldindan keshlanadi`);
    },
  };
}

/**
 * Asosiy yo'l (base):
 *   - sukut './'  — APK (Capacitor) va file:// uchun, `dist/` ga chiqadi. O'ZGARMAYDI.
 *   - `vite build --mode web` (`npm run build:web`) — `.env.web` dagi
 *     VITE_BASE=/rele-lugat/app/ bilan, `dist-web/` ga chiqadi.
 *   - Boshqa yo'l kerak bo'lsa: muhit o'zgaruvchisi VITE_BASE ustun turadi.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE || "./";
  const outDir = mode === "web" ? "dist-web" : "dist";

  return {
    base,
    // Ilova kodi va index.html ham aynan shu yo'lni ishlatadi (SW, manifest, ikonkalar).
    define: { __APP_BASE__: JSON.stringify(base) },
    plugins: [
      react(),
      fileProtocolCompat(),
      pwaServiceWorker(),
      {
        name: "app-base-in-html",
        transformIndexHtml: (html: string) => html.replaceAll("%APP_BASE%", base),
      },
    ],
    build: {
      target: "es2020",
      outDir,
      emptyOutDir: true,
      assetsInlineLimit: 8192,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          format: "iife",
          inlineDynamicImports: true,
          entryFileNames: "assets/app.js",
          assetFileNames: "assets/[name][extname]",
        },
      },
    },
    server: { port: 5173, host: true },
  };
});
