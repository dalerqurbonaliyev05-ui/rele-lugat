# Rele Lug'at

**Releli himoya** fanidan interaktiv o'quv ilovasi: atamalar lug'ati, flashcard, testlar,
sxema konstruktori, stsenariy o'yini, mantiq simulyatori va hisoblagichlar.

- **Uch til:** o'zbekcha, ruscha, inglizcha — interfeys ham, butun kontent ham.
- **100 % offline** ishlaydi, internetga hech narsa yuborilmaydi.
- **React 19 + TypeScript 5.9 + Vite 7**, Android APK esa **Capacitor 7** bilan yig'iladi.
- **Dizayn:** tungi podstansiya dispetcher pulti — panel kartalar, LED lampalar,
  raqamli tablo, bosiladigan knopkalar, sxemalarda yuguruvchi tok (2-bo'lim).

Butun kontent — ta'rif, formula, raqam va qiymatlar — "Releli himoya" fanining
**1-15 ma'ruzalaridan** olingan. Har bir atama va savolda manba ma'ruza raqami
ko'rsatilgan. 8-ma'ruza manbada yo'q edi — u bog'lovchi mavzu sifatida boshqa
ma'ruzalardagi faktlar asosida tuzilgan (`NOTES.md` ga qarang).

| | Soni |
|---|---|
| Atamalar (× 3 til) | **214** |
| Test savollari (× 3 til) | **170** |
| Sxemalar (drag-and-drop) | **24** |
| Hisoblagichlar | **16** |
| Stsenariylar / relelar | 8 / 10 |

---

## 1. Ishga tushirish

Node.js 20+ kerak.

```bash
npm install
npm run dev
```

So'ng brauzerda `http://localhost:5173` ni oching.

Yig'ilgan versiyani ko'rish:

```bash
npm run build
```

`dist/index.html` ni to'g'ridan to'g'ri brauzerda ochish ham mumkin (`file://`) —
bundle klassik `<script defer>` sifatida chiqariladi va barcha yo'llar nisbiy.

Foydali buyruqlar:

| Buyruq | Nima qiladi |
|---|---|
| `npm run dev` | Vite dev-server (hot reload) |
| `npm run build` | TypeScript tekshiruvi + production build → `dist/` |
| `npm run check` | Faqat TypeScript tekshiruvi |
| `npm run preview` | Yig'ilgan `dist/` ni server orqali ochish |

> Windows'da Node PATH'da bo'lmasa:
> `$env:Path = "C:\Program Files\nodejs;" + $env:Path`

---

## 2. Dizayn tizimi, tovush va vibratsiya

Interfeys **tungi podstansiya dispetcher pulti** (SCADA/HMI) uslubida qurilgan.

### Ranglar va shriftlar

Barcha qiymatlar `src/styles.css` dagi CSS o'zgaruvchilari — bir joydan boshqariladi.

| Token | Qiymat | Qayerda |
|---|---|---|
| `--bg` / `--bg-2` | `#0b1220` / `#111a2e` | ekran foni, susaygan to'r va sekin suruvchi "tok" chiziqlari |
| `--panel` / `--panel-2` | `#16213a` / … | panel kartalar, metall-ko'k ingichka hoshiya |
| `--led-green` | `#22e06b` | "ulandi", to'g'ri javob, yakunlangan tugun |
| `--led-amber` | `#ffc629` | XP, ochiq tugun, ogohlantirish |
| `--led-red` | `#ff3b47` | AVARIYA, xato javob, xatolar daftari |
| `--led-blue` | `#35b6ff` | tok oqimi, neytral ko'rsatkichlar |
| `--ink` / `--ink-2` | `#e6edf7` / `#8ea0bf` | asosiy va ikkilamchi matn |
| `--mono` | tizim monospace | raqamlar, qisqartmalar, plastinka yozuvlari |

Kunduzgi mavzu `:root[data-theme="light"]` da shu tokenlarni qayta belgilaydi.
Shrift faqat tizimniki — CDN yoki tashqi fayl yo'q.

### Komponentlar — `src/components/Panel.tsx`

| Komponent | Nima qiladi |
|---|---|
| `Panel` | burchaklarida vint nuqtalari va tepasida plastinka (`ATAMALAR · 214`) bo'lgan karta; `tone="ok"/"warn"/"alarm"`, bosilsa knopka kabi cho'kadi |
| `PhysButton` | pastida 3 px soya — bosilganda ichiga kiradi; yonida LED |
| `Led` | yashil/sariq/qizil/ko'k lampa, `blink` bilan |
| `DigitalDisplay` | monospace tablo, qiymat 0 dan sanab chiqadi (~800 ms, ease-out) |
| `Gauge` | strelkali asbob (−120°…+120°), test natijasi va hisoblagich uchun |
| `Bar`, `SectionTitle` | progress chizig'i va bo'lim sarlavhasi |

`src/components/RelayArt.tsx` — skeumorfik SVG detallar: `RelayShell` (korpus,
vintlar, plastinka, pinlar), `KhFlag` (KH ko'rsatgich bayroqchasi — javobdan keyin
tushadi: bilsa yashil, bilmasa qizil) va rele chizmalari (RT-40 shkalasi, RN-53/54
to'g'rilagich ko'prigi, RV soat mexanizmi, RT-80 induksion diski, RP kontakt
guruhi, RU bayroqchasi, hamda javobdan oldin ko'rsatiladigan **yopiq korpus**).

### Animatsiyalar

Hammasi CSS / SVG / `requestAnimationFrame` — qo'shimcha kutubxona yo'q.

- **Tok oqimi** — `stroke-dasharray` + `stroke-dashoffset`. Tok **faqat zanjir
  yopiq bo'lganda** yuguradi: sxema konstruktorida pog'onaning hamma sloti
  to'g'ri bo'lsa, mantiq simulyatorida chiqish 1 bo'lsa (ochiq kontaktli shoxda
  to'xtaydi), tarmoqda uzilgan o'chirgichdan nariga o'tmaydi, yo'l xaritasida
  tugun energiyalangach keyingisiga impuls yuguradi.
- **Avariya** — xato javobda ekran qaltiraydi, qizil `AVARIYA` lampasi yonadi,
  qattiq signal chalinadi va bosilgan joyda uchqun sachraydi.
- **To'g'ri javob** — yashil LED, yumshoq klik, tok impulsi, konfetti.
- **Raqamlar** — XP, test foizi, hisoblagich natijasi va atamalar soni 0 dan
  sanab chiqadi (`useCountUp`, `src/lib/anim.ts`).
- **Ekran almashuvi** — 220 ms "rele yopilishi" o'tishi.
- `prefers-reduced-motion: reduce` yoqilgan bo'lsa barcha harakat o'chadi,
  raqamlar esa darhol oxirgi qiymatni ko'rsatadi.

### Tovush — `src/lib/audio.ts`

Web Audio API bilan **sintez qilinadi**, hech qanday audio fayl yo'q:

| Signal | Nima |
|---|---|
| `sndTap` / `sndSwitch` | rele kliki — filtrlangan shovqinning 20–40 ms portlashi |
| `sndOk` | yumshoq yuqori ton |
| `sndAlarm` | qattiq past avariya signali |
| `sndSurge` | tok impulsi (yo'l xaritasi, sxema yopilishi) |
| `sndLevel` | daraja/nishon ohangi |

Umumiy ovoz balandligi past (master gain 0.25). Brauzer talabiga ko'ra audio
**birinchi teginishdan keyin** ochiladi (`unlockAudio`, `App.tsx`).

### Vibratsiya — `src/lib/fx.ts`

Android'da `@capacitor/haptics`, brauzerda `navigator.vibrate`. Har ikkala
holatda ham sozlama tekshiriladi.

### Sozlamalar

**Profil → Sozlamalar** da ikkita kalit bor:

| Kalit | `store.ts` kaliti | Standart |
|---|---|---|
| **Tovush** | `sound` | yoqilgan |
| **Vibratsiya** | `vibro` | yoqilgan |

Ikkalasi `localStorage` (`rele-lugat-v2`) da saqlanadi. Eski progress buzilmaydi:
`load()` saqlangan obyektni kalit-bo'yicha qo'shadi, yangi maydonlar standart
qiymatini oladi — alohida migratsiya kerak emas.

---

## 3. APK yig'ish (GitHub Actions)

APK bulutda yig'iladi — kompyuteringizda Android SDK kerak emas.

1. Loyihani GitHub'ga yuklang (4-bo'limga qarang).
2. Har qanday branch'ga `push` qilinishi bilan **Build APK** workflow ishga tushadi.
   Qo'lda ham: **Actions → Build APK → Run workflow**.
3. Run sahifasining pastida **Artifacts** bo'limidan **rele-lugat-apk** ni yuklab oling (ZIP).
4. ZIP ichidan `app-debug.apk` ni chiqarib oling.

Workflow qadamlari: `npm install` → `npm run build` → `npx cap add android` →
ikonka → `npx cap sync android` → `gradlew assembleDebug`.

### Telefonga o'rnatish

1. `app-debug.apk` ni telefonga ko'chiring (Telegram, USB yoki bulut orqali).
2. Android'da **Sozlamalar → Xavfsizlik → Noma'lum manbalar** (yangi versiyalarda:
   fayl menejeri yoki brauzer uchun **"Bu manbadan o'rnatishga ruxsat berish"**) ni yoqing.
3. APK faylini bosib, **O'rnatish** ni tanlang.

> Debug APK avtomatik ravishda debug kalit bilan imzolanadi. Play Store uchun
> alohida release imzo kerak bo'ladi.

### Mahalliy APK (ixtiyoriy)

Android Studio / SDK o'rnatilgan bo'lsa:

```bash
npm run build
npx cap add android
npx cap sync android
npm run apk
```

---

## 4. PWA — iPhone va Android bosh ekraniga o'rnatish

Ilova APK dan tashqari **veb-ilova (PWA)** sifatida ham ishlaydi: Safari (iPhone)
va Chrome (Android) orqali bosh ekranga ikonka bilan o'rnatiladi, to'liq ekranda
ochiladi va **internetsiz** ishlaydi.

```bash
npm run build:web     # → dist-web/  (base: /rele-lugat/app/)
npm run build         # → dist/      (APK uchun, base: ./ — o'zgarmagan)
```

### Base yo'li

| Build | Buyruq | Base | Papka |
|---|---|---|---|
| APK / file:// | `npm run build` | `./` | `dist/` |
| Sayt (PWA) | `npm run build:web` | `.env.web` dagi `VITE_BASE=/rele-lugat/app/` | `dist-web/` |

Boshqa manzilga joylash uchun `.env.web` dagi `VITE_BASE` ni o'zgartiring yoki
muhit o'zgaruvchisi bilan bering (u ustun turadi). Base **slash bilan tugashi** shart.

Saytga joylash: `dist-web/` ichidagini sayt reposidagi `rele-lugat/app/` papkasiga
ko'chiring (masalan, energyvibe.uz → `https://energyvibe.uz/rele-lugat/app/`).
Havolani **slash bilan** bering (`/rele-lugat/app/`) — service worker shu yo'lni boshqaradi.

### Qanday ishlaydi

- `public/manifest.webmanifest` — nom, ranglar (#0b1220), ikonkalar; barcha yo'llar nisbiy.
- `pwa/sw-template.js` → build paytida `sw.js` yaratiladi (`vite.config.ts`,
  `pwaServiceWorker`): chiqish papkasidagi barcha fayllar oldindan keshlanadi,
  versiya — ularning kontent xeshi.
- Yangi versiya joylansa, u **fonda** yuklanadi va ilova **keyingi ochilishda**
  yangilanadi (ishlab turgan sahifa ostidan fayllar almashmaydi).
- `src/pwa.ts` — service worker faqat brauzerda ro'yxatdan o'tadi:
  **APK (Capacitor) ichida, `file://` da va `npm run dev` da o'chiq.**
- `src/components/InstallHint.tsx` — ilova ichidagi o'rnatish kartochkasi:
  iOS Safari'da "Ulashish → Bosh ekranga qo'shish" qadamlari, iOS'dagi Chrome'da
  "Safari'da oching" eslatmasi, Android'da "O'rnatish" tugmasi. Yopilsa qayta chiqmaydi;
  APK ichida va o'rnatilgan holda ko'rsatilmaydi.

### Ikonkalarni yangilash

```bash
# public/logo.svg ni almashtiring, so'ng:
npm run icons         # tools/make-icons.mjs → public/icons/*, public/favicon.ico
```

APK ikonkalari alohida — `resources/` va `npm run assets` (Capacitor).

---

## 5. Git bilan ishlash

Git o'rnatilgach, loyiha papkasida:

```bash
git init
git add .
git commit -m "Rele Lug'at: uch tilli interaktiv o'quv ilovasi"
git branch -M main
git remote add origin https://github.com/<foydalanuvchi>/<repo>.git
git push -u origin main
```

Pull request uchun alohida branch:

```bash
git checkout -b rele-lugat
git push -u origin rele-lugat
```

> `.gitignore` `lectures/`, `*.pdf`, `node_modules/`, `dist/` va `android/` ni
> chiqarib tashlaydi — shaxsiy o'quv materiali repoga ham, APK ga ham tushmaydi.

---

## 6. Loyiha tuzilishi

```
index.html                Vite kirish nuqtasi
vite.config.ts            base (./ yoki VITE_BASE), iife bundle, sw.js generatori
.env.web                  PWA build uchun VITE_BASE=/rele-lugat/app/
pwa/sw-template.js        service worker shabloni
tools/make-icons.mjs      PWA ikonkalari (sharp)
capacitor.config.ts       appId: uz.relelugat.app, webDir: dist
public/                   icon.svg, logo.svg, manifest.webmanifest, icons/, favicon.ico
resources/                APK ikonkasi va splash (PNG)
src/
  main.tsx, App.tsx       ildiz, marshrutlash, status bar, tabbar, onboarding
  pwa.ts                  service worker, platformani aniqlash, o'rnatish taklifi
  types.ts                barcha tiplar, L10n = {uz, ru, en}
  store.ts                localStorage: XP, streak, SRS, xatolar, yo'l bosqichlari
  styles.css              dizayn tokenlari va barcha uslublar (kunduzgi/tungi)
  ui.tsx                  umumiy komponentlar va NavContext
  components/
    Panel.tsx             Panel, PhysButton, Led, DigitalDisplay, Gauge, Bar
    RelayArt.tsx          RelayShell, KhFlag, rele chizmalari (SVG)
  i18n/
    strings.ts            ~260 interfeys matni, uchala tilda
    index.tsx             I18nProvider, useI18n(), til aniqlash/saqlash
  lib/
    audio.ts              Web Audio sintezi — rele kliki, avariya, impuls
    fx.ts                 tovush + vibratsiya + qaltirash, konfetti, uchqun
    anim.ts               useCountUp, useReducedMotion, useInView
    svg.tsx               sxema, mantiq elementi, tarmoq, tok oqimi — SVG
  data/                   KONTENT — odatda faqat shu papka tahrirlanadi
    lectures.ts
    path.ts               yo'l xaritasi geometriyasi (tugunlar va liniyalar)
    glossary/part1-4.ts   214 atama
    quizzes/part1-4.ts    170 savol
    circuits/ladder.ts    16 pog'onali sxema
    circuits/free.ts      8 erkin sxema (TT va KT ulanishlari)
    scenarios.ts          tarmoq, 8 stsenariy, 3 Δt mashqi
    calculators.ts        16 formula
    relays.ts             10 rele
  views/                  14 ta ekran (Path.tsx — o'quv yo'li xaritasi)
.github/workflows/        APK yig'ish
promo/                    reklama roliki (alohida loyiha, ilovaga ta'sir qilmaydi)
```

> `promo/` — ilovaning reklama videosi: Remotion bilan yig'iladi, ekranlar esa
> Playwright orqali **haqiqiy yozuvdan** olinadi. Batafsil: `promo/README_VIDEO.md`.
> Bu papka ilovaning build'iga ham, APK workflow'iga ham aralashmaydi
> (`tsconfig.app.json` faqat `src` ni oladi).

---

## 7. Kontent qo'shish

Barcha matnlar `L10n` tipida: `{ uz: "…", ru: "…", en: "…" }`.
TypeScript uchala tilni to'ldirishni **majburlaydi** — birortasi tushib qolsa build xato beradi.

### Yangi atama

`src/data/glossary/part4.ts` (yoki mos part) ga qo'shing:

```ts
{
  id: "yangiatama",                    // takrorlanmas kalit
  l: 12,                               // manba ma'ruza
  r: ["kesim", "dt"],                  // bog'liq atamalar
  t: { uz: "MTH", ru: "МТЗ", en: "OCP" },
  f: { uz: "Maksimal tokli himoya", ru: "Максимальная токовая защита", en: "Overcurrent protection" },
  d: { uz: "Qisqa ta'rif…", ru: "Краткое определение…", en: "Short definition…" },
  u: { uz: "Qayerda ishlatiladi", ru: "Где применяется", en: "Where it is used" },
}
```

### Yangi test savoli

`src/data/quizzes/part*.ts` ga qo'shing. Uch turi bor:

```ts
// variantli
{ l: 12, type: "mcq", a: 1,
  q: { uz:"…", ru:"…", en:"…" },
  o: [ {uz:"…",ru:"…",en:"…"}, /* … */ ],
  e: { uz:"Tushuntirish (12-ma'ruza).", ru:"…", en:"…" } }

// to'g'ri / noto'g'ri
{ l: 12, type: "tf", a: true, q: {…}, e: {…} }

// moslashtirish
{ l: 6, type: "match", q: {…}, e: {…},
  pairs: [ [ {uz:"Chap",…}, {uz:"O'ng",…} ] ] }
```

`a` — to'g'ri variant indeksi (0 dan). Tushuntirishda manba ma'ruzani ko'rsating.

### Yangi sxema

Geometriya tildan mustaqil, faqat matnlar tarjima qilinadi.

**`src/data/circuits/ladder.ts`** — pog'onali sxema, chiziqlar avtomatik chiziladi:

```ts
{
  id: "mening-sxemam", lec: 12, diff: "medium",
  w: 360, h: 220,
  title: { uz:"…", ru:"…", en:"…" },
  desc:  { uz:"…", ru:"…", en:"…" },
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "slot", id: "s1", accept: "KA", kind: "no",   w: 56 },
      { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
      { t: "fixed", label: "SQ", kind: "no", w: 44 },   // o'zgarmas element
    ]},
  ],
  parts: [
    { id: "KA", kind: "no",   name: { uz:"KA — tok relesi kontakti", ru:"…", en:"…" } },
    { id: "KT", kind: "coil", name: { uz:"KT — vaqt relesi", ru:"…", en:"…" } },
    { id: "KV", kind: "coil", name: { uz:"KV — kuchlanish relesi", ru:"…", en:"…" } }, // chalg'ituvchi
  ],
  explain: { s1: { uz:"Nega shu yerda…", ru:"…", en:"…" } },
}
```

**`src/data/circuits/free.ts`** — erkin sxema: `draw[]` primitivlari va absolyut slotlar.
Primitivlar: `["line",x1,y1,x2,y2]`, `["dash",…]`, `["dot",x,y]`,
`["text",x,y,"matn",{s,b,anchor}]`, `["ct",x,y,"TA1"]`, `["vt",x,y,"TV1"]`, `["earth",x,y]`.

`kind`: `coil` (g'altak), `no` (qo'shiluvchi kontakt), `nc` (ajraluvchi kontakt),
`blk` (blok), `ct` (tok trans.), `res` (qarshilik).

Chalg'ituvchi detallarni `parts` ga qo'shing — ular tekshirishda qizil bilan belgilanadi.

### Yangi hisoblagich

`src/data/calculators.ts` ga qo'shing. Formula matni tarjima qilinmaydi:

```ts
{
  id: "mening-formulam", lec: 13, group: { uz:"MTH", ru:"МТЗ", en:"OCP" },
  formula: "Y = a · b", ref: "13.2",
  title: { uz:"Nomi", ru:"…", en:"…" },
  note:  { uz:"Izoh", ru:"…", en:"…" },
  v: [
    { k: "a", d: 1.2, label: { uz:"a — tavsif", ru:"…", en:"…" } },
    { k: "b", d: 200, label: { uz:"b — tavsif, A", ru:"…", en:"…" } },
  ],
  run: (x) => ({
    value: x.a * x.b, unit: "A",
    steps: ["Y = a · b", `Y = ${x.a} · ${x.b}`, `Y = ${x.a * x.b}`],
  }),
  gen: () => ({ a: 1.2, b: 200 }),   // mashq rejimi uchun tasodifiy misol
}
```

### Yangi til qo'shish

1. `src/types.ts` da `LANGS` ga kod qo'shing va `L10n` ga maydon qo'shing.
2. `src/i18n/strings.ts` va `src/i18n/index.tsx` (`LANG_NAMES`, `LANG_FLAGS`) ni to'ldiring.
3. `npm run check` — TypeScript qaysi matnlar tushib qolganini bittalab ko'rsatadi.

---

## 8. Ilova bo'limlari

| Bo'lim | Nima qiladi |
|---|---|
| **Bosh** | Bento-panjara: bugungi atama, daraja/XP tablosi, streak lampalari, kunlik sinov, sxema, stsenariy, xatolar |
| **Yo'l** | 15 ma'ruza — podstansiya tugunlari xaritasi. Har tugunda 3 bosqich (atamalar, flashcard, test). Test 70 %+ bo'lsa tugun energiyalanadi va keyingisiga tok impulsi yuguradi. Qulf yo'q — istalgan tugunni ochish mumkin |
| **Lug'at** | 214 atama: qidiruv, ma'ruza filtri, sevimlilar, bog'liq atamalar |
| **Flashcard** | Leitner usulidagi oraliqli takrorlash (5 quti), surish bilan javob |
| **Testlar** | 170 savol, har ma'ruzaga 10+; xato javobda ma'ruzadan tushuntirish |
| **Imtihon** | 20 tasodifiy savol, 10 daqiqa, natija tahlili (qaysi ma'ruza kuchsiz) |
| **Sxema konstruktori** | 24 sxema, drag-and-drop, tekshirishda yashil/qizil va izoh |
| **Stsenariy** | "Qayerga qaysi rele?" — selektivlik, zahiralash, tezkorlik |
| **Vaqt pog'onasi** | Δt bilan MTH sabr vaqtlarini qo'yish mashqi |
| **Mantiq simulyatori** | YoKI, VA, EMAS, RS-trigger + rele-kontakt ekvivalenti va haqiqat jadvali |
| **Rele aniqlash** | Tavsifga qarab releni topish (RT-40, RN-53, RV-200 va h.k.) |
| **Hisoblagichlar** | 16 formula, qadamma-qadam yechim va mashq rejimi |
| **Xatolar daftari** | Xato javoblar avtomatik yig'iladi va qayta mashq qilinadi |
| **Profil** | Nishonlar, ma'ruza bo'yicha tahlil, til, mavzu, **tovush va vibratsiya kalitlari**, progressni tozalash |

---

## 9. Maxfiylik

Ilova birinchi ishga tushirishda faqat **til** va **ismni** so'raydi. Boshqa hech qanday
ma'lumot yig'ilmaydi, internetga hech narsa yuborilmaydi. Butun progress telefonning
`localStorage` xotirasida saqlanadi va Profil bo'limidan tozalash mumkin.

Tovush Web Audio API bilan telefonning o'zida sintez qilinadi, vibratsiya esa
qurilma motoridan foydalanadi — ikkalasi ham hech qanday ruxsat so'ramaydi va
Profil bo'limidan o'chirib qo'yish mumkin.
