# Rele Lug'at — motion reklama

Vertikal (9:16) reklama roliki: **Remotion** (React + TypeScript) bilan yig'iladi,
ilovaning ekranlari esa **Playwright** orqali haqiqiy yozuvdan olinadi.

| Chiqish | Kompozitsiya | O'lcham | Davomiylik |
|---|---|---|---|
| `out/rele-reklama-30s-uz.mp4` | `Main30` | 1080×1920 | 30 s |
| `out/rele-reklama-15s-uz.mp4` | `Main15` | 1080×1920 | 15 s |
| `out/rele-reklama-1x1-uz.mp4` | `Square` | 1080×1080 | 30 s |

30 fps, 120 BPM ritmga tushirilgan. **Musiqa yo'q** — uni TikTok/CapCut'da
o'zingiz qo'yasiz. Ovoz effektlari (SFX) esa rolikning ichida.

---

## 1. Tez boshlash

```bash
cd promo
npm install
npx playwright install chromium
```

So'ng (loyiha ildizida ilova yig'ilgan bo'lishi kerak — `npm run build`):

```bash
npm run sfx      # ovoz effektlarini sintez qiladi  → public/sfx/*.wav
npm run record   # ilovani yozib oladi              → public/clips/*.mp4
npm run studio   # brauzerda ko'rish/tahrirlash
npm run render:all
```

> Windows'da Node PATH'da bo'lmasa:
> `$env:Path = "C:\Program Files\nodejs;" + $env:Path`

---

## 2. Qayta render qilish

```bash
npx remotion render Main30 out/rele-reklama-30s-uz.mp4
```

Tezroq sinov uchun (yarim o'lchamda):

```bash
npx remotion render Main30 out/test.mp4 --scale=0.5
```

Bitta kadrni rasm qilib olish:

```bash
npx remotion still Main30 out/kadr.png --frame=330
```

---

## 3. Tilni almashtirish

Barcha matnlar `src/script.ts` da `L10n` (`{uz, ru, en}`) ko'rinishida saqlanadi —
TypeScript uchala tilni to'ldirishni majburlaydi.

```bash
npx remotion render Main30 out/rele-reklama-30s-ru.mp4 --props='{"lang":"ru"}'
npx remotion render Main30 out/rele-reklama-30s-en.mp4 --props='{"lang":"en"}'
npx remotion render Main15 out/rele-reklama-15s-ru.mp4 --props='{"lang":"ru"}'
npx remotion render Square out/rele-reklama-1x1-ru.mp4 --props='{"lang":"ru"}'
```

PowerShell'da qo'shtirnoqlar bilan ovora bo'lmaslik uchun tayyor fayllar bor:

```bash
npx remotion render Main30 out/rele-reklama-30s-ru.mp4 --props=props/ru.json
npx remotion render Main30 out/rele-reklama-30s-en.mp4 --props=props/en.json
```

Bitta kadrni tez tekshirish (masalan, ruscha matn kartadan chiqib ketmaganmi):

```bash
npx remotion still Main30 out/ru-872.png --frame=872 --props=props/ru.json --scale=0.4
```

**Diqqat:** telefon ekranidagi yozuv o'zbek tilida qoladi (ilova shu tilda yozib
olingan), subtitr va butun grafika esa tanlangan tilga o'tadi. Ekrandagi ilovani
ham boshqa tilda ko'rsatish uchun yozuvni o'sha tilda qayta oling:
`record/record.ts` dagi `localStorage.setItem("rele-lugat-lang", "uz")` ni `"ru"`
yoki `"en"` ga o'zgartiring va `npm run record` ni qayta ishga tushiring.

---

## 4. Matnni o'zgartirish

Hamma narsa bitta faylda: **`src/script.ts`**.

- `SCRIPT` — sahnalardagi barcha so'zlar (hook, muammo, CTA va h.k.).
- `SCENE_SUB` — har sahnaning subtitri.
- `T` — sahna ichidagi mayda vaqtlar (kadrda).
- `SFX` — qaysi ovoz qaysi kadrda chalinadi.

Ritm **`src/beats.ts`** da:

- `BPM = 120`, `BEAT = 15` kadr, `BAR = 60` kadr.
- `CUTS` — 30 s versiyaning sahna chegaralari (hammasi aniq beatga tushadi).
- `SHORT` — 15 s kesimning chegaralari.

Sahna uzunligini o'zgartirsangiz, `CUTS` dagi beat raqamini o'zgartiring —
kesishlar avtomatik ritmda qoladi.

Ranglar va xavfsiz zonalar: **`src/theme.ts`** (`SAFE.vertical` — TikTok
interfeysi tepadan 260 px, pastdan 410 px ni yopadi).

---

## 5. Yangi klip yozish

Yozuv **ilovaning haqiqiy `dist/` i** ustida ishlaydi — hech narsa soxta emas.

1. Loyiha ildizida ilovani yig'ing: `npm run build`.
2. `promo/record/record.ts` da yangi funksiya yozing:

```ts
const clipGlossary: ClipFn = async (page, mark) => {
  await tapSel(page, ".tabbar .tab", TAB.glossary, 600);
  mark("list");
  await smoothScroll(page, 700, 1400);
  mark("term");
  await tapSel(page, ".term", 2, 900);
};
```

3. Uni `CLIP_SCRIPTS` ga qo'shing: `glossary: clipGlossary`.
4. `npm run record -- glossary` — faqat shu klip yoziladi.
5. `src/clips.ts` ga import va `CLIP_META` ga qator qo'shing.
6. Sahnada ishlating: `<Clip name="glossary" from="term" playbackRate={1.4} />`.

### Belgilar (marks)

`mark("nom")` yozuv paytida muhim lahzani qayd qiladi va u `clip-*.json` ga
tushadi. Remotion kesishlarni shu belgilardan oladi:

```ts
<Clip name="circuit" fromSeconds={at("circuit", "check")} playbackRate={1.9} />
```

`rate(klip, "dan", "gacha", ekranKadri, fps)` — bo'lakni ajratilgan ekran
vaqtiga aniq sig'diradigan tezlikni hisoblaydi. Shuning uchun ilova o'zgarib,
yozuv uzayib ketsa ham montaj buzilmaydi — qo'lda taymkod tanlash kerak emas.

### Yozuv sozlamalari

| Nima | Qayerda | Qiymat |
|---|---|---|
| Telefon o'lchami | `record/record.ts` → `PHONE` | 390×844 CSS px |
| Piksel zichligi | `DPR` | 3 → yozuv 1170×2532 |
| Boshlang'ich holat | `record/seed.ts` | Aziz, 1240 XP, 7 kun seriya, 1-5 ma'ruza yashil |

Yozuv Playwright'ning `recordVideo` siga emas, CDP `Page.startScreencast` ga
asoslangan: `recordVideo` faqat CSS piksel o'lchamida (390×844) yozadi, bu
1080 enli reklama uchun juda past.

Barmoq ko'rsatkichi (`record/overlay.ts`) sahifaga faqat yozuv paytida
qo'shiladi — ilovaning kodiga hech narsa kirmaydi.

---

## 6. Ovoz effektlari

Barcha `.wav` fayllar **Node'da sintez qilinadi** (`sfx/generate.ts`) —
tashqi namuna yoki kutubxona yo'q, hammasi original.

| Fayl | Nima |
|---|---|
| `relay-click.wav` | rele kliki — yakorning urilishi + korpus "tuk" i |
| `tap.wav` | UI teginish |
| `bzzz.wav` | past tarmoq guvillashi (50 Hz + garmonikalar) |
| `whoosh.wav` | o'tish |
| `crack.wav` | qisqa tutashuv uchqunlari |
| `boom.wav` | zarba (hook) |
| `alarm.wav` | avariya signali |
| `ding.wav` | to'g'ri javob |
| `surge.wav` | tok impulsi |
| `levelup.wav` | daraja/nishon |

O'zgartirish: `sfx/generate.ts` dagi funksiyani tahrirlang va `npm run sfx`.

---

## 7. Fayl tuzilishi

```
promo/
  src/
    index.ts          registerRoot
    Root.tsx          Main30 / Main15 / Square kompozitsiyalari
    Main.tsx          sahnalarni vaqt chizig'iga tizadi
    script.ts         BARCHA matnlar (uz/ru/en), vaqtlar va SFX jadvali
    beats.ts          120 BPM ritm xaritasi, sahna chegaralari
    theme.ts          ranglar, xavfsiz zonalar, o'lchamlar
    fonts.ts          Inter + JetBrains Mono (@remotion/google-fonts)
    clips.ts          yozuv belgilari va tezlik hisobi
    components/
      Bg.tsx          to'r + suruvchi tok chiziqlari foni
      Text.tsx        kinetik tipografiya, subtitr, sanab chiquvchi raqam
      Phone.tsx       telefon ramkasi + <OffthreadVideo> klip
      Fx.tsx          glitch, silkinish, uchqun, konfetti, whip-pan, tok liniyasi
      Room.tsx        tungi stol sahnasi (illyustratsiya)
      Layout.tsx      xavfsiz zonalar va o'lchamlar
    scenes/           Hook, Problem, Solution, Game1, Game2, PathScene, Result, Payoff, Cta
  record/
    record.ts         Playwright yozuvi (CDP screencast → ffmpeg)
    seed.ts           localStorage boshlang'ich holati
    appdata.ts        ilovaning manba fayllaridan javoblar/sxema rejasi
    overlay.ts        barmoq ko'rsatkichi
    serve.ts          mitti static server
  sfx/generate.ts     ovoz effektlari sintezi
  public/
    clips/            yozib olingan mp4 + belgilar json
    sfx/              sintez qilingan wav
    logo.svg
  out/                tayyor videolar
```

---

## 8. Sifat tekshiruvi

Render qilishdan oldin:

```bash
npm run check      # TypeScript
npm run studio     # ko'z bilan: matn xavfsiz zonada, kesishlar bitda
```

Tekshiriladigan narsalar:

- Matn tepadan 260 px va pastdan 410 px zonaga kirmaganmi (TikTok UI).
- Ruscha matn kartalardan chiqib ketmaganmi (`--props='{"lang":"ru"}'`).
- Har sahnada kamida bitta harakat bor, 2 soniyadan ortiq statik qolmagan.
- Telefon ekranidagi hamma narsa haqiqiy yozuvdan (soxta mockup yo'q).
