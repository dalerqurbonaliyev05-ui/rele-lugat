# Rele Lug'at

**Releli himoya** fanidan interaktiv o'quv ilovasi: atamalar lug'ati, flashcard, testlar,
sxema konstruktori, stsenariy o'yini, mantiq simulyatori va hisoblagichlar.
Interfeys to'liq o'zbek tilida (lotin yozuvi), ilova **100 % offline** ishlaydi.

Butun kontent — ta'rif, formula, raqam va qiymatlar — "Releli himoya" fanining
**1-15 ma'ruzalaridan** olingan. Har bir atama va savolda manba ma'ruza raqami
ko'rsatilgan. 8-ma'ruza manbada yo'q edi — u bog'lovchi mavzu sifatida boshqa
ma'ruzalardagi faktlar asosida tuzilgan (`NOTES.md` ga qarang).

---

## 1. Ilovani kompyuterda ochish

Hech qanday build bosqichi kerak emas. `www/index.html` faylini brauzerda ochish kifoya
(`file://` orqali ham ishlaydi):

```bash
start www\index.html
```

Xohlasangiz kichik server orqali ham ochish mumkin:

```bash
python -m http.server 8777 --directory www
```

So'ng brauzerda `http://localhost:8777` ni oching.

---

## 2. APK yig'ish (GitHub Actions)

APK bulutda, GitHub Actions serverida yig'iladi — kompyuteringizda Android SDK kerak emas.

1. Loyihani GitHub'ga yuklang (quyida "Git bilan ishlash" bo'limiga qarang).
2. Har qanday branch'ga `push` qilinishi bilan **Build APK** workflow avtomatik ishga tushadi.
   Uni qo'lda ham ishga tushirish mumkin: GitHub'da **Actions → Build APK → Run workflow**.
3. Workflow tugagach, o'sha run sahifasining pastida **Artifacts** bo'limi paydo bo'ladi.
4. **rele-lugat-apk** artifaktini yuklab oling — bu ZIP arxiv.
5. ZIP ichidan `app-debug.apk` ni chiqarib oling.

### Telefonga o'rnatish

1. `app-debug.apk` ni telefonga ko'chiring (Telegram, USB yoki bulut orqali).
2. Android'da **Sozlamalar → Xavfsizlik → Noma'lum manbalar** (yangi versiyalarda:
   fayl menejeri yoki brauzer uchun **"Bu manbadan o'rnatishga ruxsat berish"**) ni yoqing.
3. APK faylini bosib, **O'rnatish** ni tanlang.

> Debug APK avtomatik ravishda debug kalit bilan imzolanadi, shuning uchun uni
> telefonga bemalol o'rnatish mumkin. Play Store'ga joylash uchun alohida release
> imzo kerak bo'ladi.

### Workflow xato bersa

`.github/workflows/build-apk.yml` faylini tahrirlang yoki log matnini menga yuboring.
Eng ko'p uchraydigan sabablar: `npm install` da tarmoq xatosi (qayta ishga tushiring),
Gradle versiyasi mos kelmasligi (Java versiyasini tekshiring).

---

## 3. Git bilan ishlash

Bu kompyuterda `git` o'rnatilmagan, shuning uchun commit va pull request
qo'lda bajariladi. [git-scm.com](https://git-scm.com/download/win) dan Git'ni
o'rnatgach, loyiha papkasida:

```bash
git init
git add .
git commit -m "Rele Lug'at: interaktiv o'quv ilovasi"
git branch -M main
git remote add origin https://github.com/<foydalanuvchi>/<repo>.git
git push -u origin main
```

Pull request ochish uchun alohida branch'da ishlang:

```bash
git checkout -b rele-lugat
git push -u origin rele-lugat
```

So'ng GitHub sahifasida **Compare & pull request** tugmasini bosing.

> `.gitignore` `lectures/` papkasini va barcha `*.pdf` fayllarni chiqarib tashlaydi —
> shaxsiy o'quv materiali repoga ham, APK ichiga ham tushmaydi.

---

## 4. Loyiha tuzilishi

```
www/
  index.html            barcha skriptlar shu yerda ulanadi
  css/style.css         uslublar (kunduzgi/tungi rejim CSS o'zgaruvchilari orqali)
  logo.svg, icon.svg    logotip va ikonka
  data/                 KONTENT — faqat shu fayllarni tahrirlash kifoya
    lectures.js         ma'ruzalar ro'yxati (rang, nom)
    glossary.js         atamalar lug'ati
    quizzes.js          test savollari
    circuits.js         sxema konstruktori uchun sxemalar
    scenarios.js        stsenariy o'yini va vaqt pog'onasi mashqi
    calculators.js      hisoblagichlar (formula + qadamma-qadam yechim)
    relays.js           relelar bazasi
  js/
    store.js            localStorage: XP, streak, SRS, xatolar daftari
    ui.js               DOM yordamchilari, toast, konfetti, haptic
    svg.js              sxemalarni SVG bilan chizish
    view-*.js           bo'limlar
    app.js              marshrutlash, mavzu, birinchi ishga tushirish
package.json            Capacitor bog'liqliklari
capacitor.config.json   appId: uz.relelugat.app, webDir: www
resources/              APK ikonkasi va splash (PNG)
.github/workflows/      APK yig'ish workflow'i
```

Kontent `.js` fayllarda `window.DATA = {...}` ko'rinishida saqlanadi (JSON emas) —
shuning uchun ilova `file://` orqali ochilganda ham ishlaydi.

---

## 5. Kontent qo'shish

### Yangi atama

`www/data/glossary.js` ga yangi obyekt qo'shing:

```js
{
  id: "yangiatama",              // takrorlanmas kalit
  t: "MTH",                      // atama yoki qisqartma
  f: "Maksimal tokli himoya",    // to'liq shakli ("" bo'lsa qisqartma emas)
  d: "Qisqa ta'rif…",
  l: 12,                         // manba ma'ruza raqami
  r: ["kesim", "dt"],            // bog'liq atamalar id'lari
  u: "Radial tarmoqlarning barcha liniyalarida"   // qayerda ishlatiladi
}
```

Atama avtomatik ravishda lug'atga, flashcard navbatiga va "bugungi atama" ga tushadi.

### Yangi test savoli

`www/data/quizzes.js` ga qo'shing. Uch xil tur bor:

```js
// variantli
{ l: 12, type: "mcq", q: "Savol?", o: ["a","b","c","d"], a: 1, e: "Tushuntirish (12-ma'ruza)." }

// to'g'ri / noto'g'ri
{ l: 12, type: "tf", q: "Da'vo.", a: true, e: "Tushuntirish." }

// moslashtirish
{ l: 6, type: "match", q: "Moslashtiring:", pairs: [["Chap","O'ng"], ["…","…"]], e: "Tushuntirish." }
```

`a` — to'g'ri variant indeksi (0 dan boshlanadi). `e` — xato javobda ko'rsatiladigan
tushuntirish; unda manba ma'ruzani ko'rsatish tavsiya etiladi.

### Yangi sxema

`www/data/circuits.js` ga qo'shing. Ikkita tur mavjud.

**`type: "ladder"`** — gorizontal pog'onali sxema, chiziqlar avtomatik chiziladi:

```js
{
  id: "mening-sxemam", title: "Sxema nomi", lec: 12, diff: "o'rta",
  desc: "Qisqa izoh va rasm raqami.",
  type: "ladder", w: 360, h: 220,
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "slot", id: "s1", accept: "KA", kind: "no",   w: 56 },
      { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
      { t: "fixed", label: "SQ", kind: "no", w: 44 }     // o'zgarmas element
    ]}
  ],
  parts: [
    { id: "KA", name: "KA — tok relesi kontakti", kind: "no" },
    { id: "KT", name: "KT — vaqt relesi", kind: "coil" },
    { id: "KV", name: "KV — kuchlanish relesi", kind: "coil" }   // chalg'ituvchi
  ],
  explain: { s1: "Nega shu yerda…", s2: "Nega shu yerda…" }
}
```

**`type: "free"`** — erkin sxema: `draw[]` primitivlari va absolyut koordinatali slotlar.
Primitivlar: `["line",x1,y1,x2,y2]`, `["dot",x,y]`, `["text",x,y,"matn",{s,b,anchor}]`,
`["ct",x,y,"TA1"]`, `["earth",x,y]`.

`kind` qiymatlari: `coil` (g'altak), `no` (qo'shiluvchi kontakt), `nc` (ajraluvchi kontakt),
`blk` (blok), `ct` (tok transformatori).

Chalg'ituvchi detallarni `parts` ga qo'shing — ular slotlarda `accept` bo'yicha
mos kelmaydi va tekshirishda qizil bilan belgilanadi.

### Yangi hisoblagich

`www/data/calculators.js` ga qo'shing:

```js
{
  id: "mening-formulam", lec: 13, group: "MTH",
  title: "Nomi", formula: "Y = a · b", ref: "13.2-formula",
  note: "Qo'shimcha izoh (ixtiyoriy).",
  v: [ { k: "a", label: "a — tavsif", d: 1.2, hint: "1,1-1,2" },
        { k: "b", label: "b — tavsif, A", d: 200 } ],
  run: function (x) {
    var val = x.a * x.b;
    return { value: val, unit: "A", steps: ["Y = a · b", "Y = " + x.a + " · " + x.b, "Y = " + val] };
  },
  gen: function () { return { a: 1.2, b: 200 }; }   // mashq rejimi uchun tasodifiy misol
}
```

---

## 6. Ilova bo'limlari

| Bo'lim | Nima qiladi |
|---|---|
| **Bosh** | Daraja, XP, streak, bugungi atama, ma'ruzalar progressi |
| **Lug'at** | 214 ta atama: qidiruv, ma'ruza filtri, sevimlilar, bog'liq atamalar |
| **Flashcard** | Leitner usulidagi oraliqli takrorlash (5 quti), surish bilan javob |
| **Testlar** | 170 ta savol, har ma'ruzaga 10+; xato javobda ma'ruzadan tushuntirish |
| **Imtihon** | 20 tasodifiy savol, 10 daqiqa, natija tahlili (qaysi ma'ruza kuchsiz) |
| **Sxema konstruktori** | 6 ta sxema, drag-and-drop, tekshirishda yashil/qizil va izoh |
| **Stsenariy** | "Qayerga qaysi rele?" — selektivlik, zahiralash, tezkorlik |
| **Vaqt pog'onasi** | Δt bilan MTH sabr vaqtlarini qo'yish mashqi |
| **Mantiq simulyatori** | YoKI, VA, EMAS, RS-trigger + rele-kontakt ekvivalenti va haqiqat jadvali |
| **Rele aniqlash** | Tavsifga qarab releni topish (RT-40, RN-53, RV-200 va h.k.) |
| **Hisoblagichlar** | 16 ta formula, qadamma-qadam yechim va mashq rejimi |
| **Xatolar daftari** | Xato javoblar avtomatik yig'iladi va qayta mashq qilinadi |
| **Profil** | Nishonlar, ma'ruza bo'yicha tahlil, mavzu, progressni tozalash |

---

## 7. Maxfiylik

Ilova birinchi ishga tushirishda faqat **ismni** so'raydi. Boshqa hech qanday ma'lumot
yig'ilmaydi, internetga hech narsa yuborilmaydi. Butun progress telefonning
`localStorage` xotirasida saqlanadi va Profil bo'limidan tozalash mumkin.
