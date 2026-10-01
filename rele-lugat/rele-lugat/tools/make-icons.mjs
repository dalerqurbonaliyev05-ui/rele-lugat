/**
 * PWA ikonkalarini public/logo.svg dan yaratadi.
 *
 *   node tools/make-icons.mjs        (yoki: npm run icons)
 *
 * Natija (public/ ichida — Vite ularni dist/ va dist-web/ ga ko'chiradi):
 *   icons/icon-192.png            — "any", to'q fon + logotip markazda
 *   icons/icon-512.png            — "any"
 *   icons/icon-maskable-512.png   — "maskable": logotip xavfsiz zonada (markaziy 80% doira)
 *   icons/apple-touch-icon.png    — 180×180, shaffofliksiz (iOS o'zi burchaklarini yumaloqlaydi)
 *   favicon.ico                   — 16/32/48 px, logotipning o'zi
 *
 * APK ikonkalariga (resources/ — Capacitor) tegmaydi.
 * Logotip o'zgarsa: public/logo.svg ni almashtiring va skriptni qayta ishga tushiring.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OUT = join(PUBLIC, "icons");
const BG = "#0b1220"; // ilovaning to'q fon rangi (manifest background_color bilan bir xil)

const svg = await readFile(join(PUBLIC, "logo.svg"));

/** Logotipni `size` o'lchamli to'q fon ustiga, `scale` ulushda markazga qo'yadi. */
async function onBackground(size, scale) {
  const inner = Math.round(size * scale);
  const logo = await sharp(svg, { density: 72 * (inner / 128) * 2 })
    .resize(inner, inner)
    .png()
    .toBuffer();
  const off = Math.round((size - inner) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: logo, left: off, top: off }])
    .flatten({ background: BG }) // to'liq shaffofliksiz — iOS va maskable uchun shart
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Faqat logotip, shaffof burchaklar bilan (favicon uchun — kichik o'lchamda o'qilishi muhim). */
async function bare(size) {
  return sharp(svg, { density: 72 * (size / 128) * 4 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

/**
 * ICO fayli — PNG'larni ichiga joylab (Vista+ va barcha zamonaviy brauzerlar qo'llaydi).
 * Format: ICONDIR (6 bayt) + ICONDIRENTRY × n (16 bayt) + PNG ma'lumotlari.
 */
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); // reserved
  head.writeUInt16LE(1, 2); // turi: icon
  head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size >= 256 ? 0 : size, e);
    head.writeUInt8(size >= 256 ? 0 : size, e + 1);
    head.writeUInt8(0, e + 2); // palitra yo'q
    head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4); // planes
    head.writeUInt16LE(32, e + 6); // bit/piksel
    head.writeUInt32LE(data.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.data)]);
}

await mkdir(OUT, { recursive: true });

/*
 * Maskable: Android ikonkani doira/tomchi va h.k. shaklida kesadi; kafolatlangan
 * xavfsiz zona — markazdagi 80% diametrli doira (radius 0.4·size).
 * Logotip — yumaloq burchakli kvadrat (rx = 22.5%), uning eng uzoq nuqtasi
 * markazdan ≈ 0.614·tomon uzoqlikda. 0.62 ulushda: 0.614 × 0.62 × 512 ≈ 195 px
 * < 205 px (radius) — logotip hech qaysi niqobda kesilmaydi.
 */
const files = [
  ["icons/icon-192.png", await onBackground(192, 0.78)],
  ["icons/icon-512.png", await onBackground(512, 0.78)],
  ["icons/icon-maskable-512.png", await onBackground(512, 0.62)],
  ["icons/apple-touch-icon.png", await onBackground(180, 0.8)],
  [
    "favicon.ico",
    ico([
      { size: 16, data: await bare(16) },
      { size: 32, data: await bare(32) },
      { size: 48, data: await bare(48) },
    ]),
  ],
];

for (const [name, data] of files) {
  const p = join(PUBLIC, name);
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, data);
  console.log(`  ${name.padEnd(30)} ${(data.length / 1024).toFixed(1)} KB`);
}
console.log("Tayyor →", PUBLIC);
