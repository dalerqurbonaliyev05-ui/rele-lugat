import { defineConfig, type Plugin } from "vite";
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

export default defineConfig({
  base: "./",
  plugins: [react(), fileProtocolCompat()],
  build: {
    target: "es2020",
    outDir: "dist",
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
});
