/**
 * Shriftlar — @remotion/google-fonts orqali, render paytida bir marta olinadi
 * va bundle ichiga joylanadi. Lotin, kirill va lotin-kengaytma qismlari
 * yuklanadi: o'zbekcha (o'g'), ruscha va inglizcha matn to'g'ri chiqsin.
 */

import { continueRender, delayRender } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const sans = loadSans("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const mono = loadMono("normal", {
  weights: ["700", "800"],
  subsets: ["latin", "latin-ext", "cyrillic"],
});

/** Sarlavhalar va matn. */
export const FONT = sans.fontFamily;
/** Raqamlar, qisqartmalar, plastinka yozuvlari. */
export const MONO = mono.fontFamily;

/* Shriftlar yuklanmaguncha render kutib turadi — aks holda birinchi kadrlar
   zaxira shrift bilan chiqib ketishi mumkin. */
const handle = delayRender("Shriftlar yuklanmoqda");
Promise.all([sans.waitUntilDone(), mono.waitUntilDone()])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
