# NOTES — manbadagi xatolar va qamrov

Bu fayl "Releli himoya" fanining 1-15 ma'ruzalarini ilovaga ko'chirishda
topilgan nomuvofiqliklarni va qamrab olinmagan joylarni qayd etadi.

Umumiy qoida: **ma'no o'zgartirilmagan**. Ochiq xatolar (rasm raqami, imlo,
belgi noaniqligi) ilovada to'g'rilab kiritilgan, lekin har biri quyida yozilgan.

---

## 1. Yo'q ma'ruza

**8-ma'ruza PDF'i manbada yo'q.** Ma'ruzalar 1-7, so'ng 9-15 tartibida beriladi.

Ilovada 8-ma'ruza **bog'lovchi mavzu** sifatida qo'shildi:
*"Elektromagnit relelarning ishlash prinsipi va tavsiflari"*.

- Uning butun mazmuni **3- va 9-ma'ruzalardagi faktlardan** yig'ilgan:
  aylantiruvchi va qarshi ta'sir momentlari, Xr.i / Xr.q, qaytish koeffitsienti,
  o'rnatmani prujina yoki chulg'am ulanishi orqali rostlash.
- **Hech qanday yangi son, ta'rif yoki qiymat to'qilmagan.**
- `src/data/lectures.ts` da bu ma'ruza `synth: true` bayrog'i bilan belgilangan
  va `lecture8note` matnida izohlangan.
- 8-ma'ruza savollarining tushuntirishlarida asl manba ma'ruza (3 yoki 9)
  qavs ichida ko'rsatilgan.

---

## 2. Rasm raqamlaridagi xatolar

### 11-ma'ruza
Matnda 10-ma'ruzaning raqamlari ishlatilgan:

| Manbada | Bo'lishi kerak |
|---|---|
| "10.5-rasm. Mantiqiy «EMAS»" | 11.5-rasm |
| "10.6-rasmda KL2 kirishida «VA» elementi va «EMAS»…" | 11.6-rasm |
| "10.7-rasmda ko'rsatilgandek" | 11.7-rasm |

Bundan tashqari **11.6-rasm raqami uch marta** ishlatilgan: "VA" va "EMAS"
elementlari uchun, keyin RS-trigger uchun. Ilovada bu bo'limlarga rasm raqami
bilan emas, mavzu nomi bilan murojaat qilindi.

### 4-ma'ruza
Ma'ruza 4 bo'lsa ham, rasmlar **1.17, 1.18, 1.19 va 1.9** deb nomlangan — ya'ni
boshqa bobning raqamlashi saqlanib qolgan. Ilovada bu rasmlarga
"4-ma'ruza, operativ tok sxemasi" kabi tavsifiy nom bilan murojaat qilindi.

### 12-ma'ruza
"…sabr vaqti tokka bog'liq himoyalar liniya boshida (**12.3-rasmda K1 nuqta**)
shikastlanish paydo bo'lganida himoya tez ishlaydi" — K1 nuqta 12.3-rasmda emas,
**12.1-rasmda** ko'rsatilgan. Ilovada 12.1-rasm deb olindi.

### 15-ma'ruza
- "…bevosita rele yordamida ishlovchi sxemalar bilan bajarish mumkin bo'lib,
  **1.16-rasmda** ko'rsatilgan" — 15-ma'ruzada 1.16-rasm yo'q.
- "xt — EET qarshiligi (**16.1-rasmga qarang**)" — 16-ma'ruza umuman mavjud emas.

Ikkala havola ham ilovaga kiritilmadi; formulalar rasm havolasisiz berildi.

---

## 3. Formulalardagi belgi noaniqliklari

### 13.1a va 13.2-formulalar
Matnda: *"Ma'lumki, Iqay/Iish nisbati kqay bilan aniqlanishini hisobga olib, bu
nisbatni (**1.1a**) dagi Iqay ni o'rniga almashtiriladi"* — havola (13.1a) bo'lishi kerak,
"1.1a" xato. Ilovada 13.1a deb olindi.

### 13.1 va 13.4-formulalar
13.1 da `Iqay = ksoz · Iyuk.max`, 13.4 da esa `Ihi = ksoz · Iyuk.max` —
chap tomondagi kattaliklar har xil (biri qaytish toki, biri ishlash toki), lekin
o'ng tomon bir xil. Bu manbaning o'zida shunday; ilovada ikkalasi alohida
hisoblagich sifatida, izohi bilan berildi.

### 13.3-formula
Matnda `Ih.i > Iyuk.max` deb yozilgan, boshqa joylarda esa bir xil kattalik
`Ihi` deb belgilangan. Ilovada hamma yerda **Ihi** ishlatildi.

### 1-ma'ruza, tebranish bo'limi
`ΔE = EA = EB` deb yozilgan — kontekstdan ko'rinib turibdiki
**ΔE = EA − EB** bo'lishi kerak (keyingi jumlada δ = 180° da ΔE = 2·E deyiladi).
Ilovada ayirma sifatida olindi.

### 5-ma'ruza, 5.1 va 5.3-formulalar
OCR/formatlash tufayli formulalar matnda parchalanib chiqqan
(`I1·w1 − I2·w2 = Imag·w1`, `I2 = I1/kI − Imag/kI`). Ma'no bo'yicha tiklandi.

### 5-ma'ruza, 5.1-jadval
Aniqlik sinflari ustunida **"5R"** va **"10R"** yozilgan, matnda esa sinflar
"0,5; 1; 3; 5; 10 va R" deb sanab o'tilgan. Ilovada ikkala shakl ham ko'rsatildi
(`aniqliksinf` va `rsinf` atamalari).

### 12-ma'ruza, ikki fazali sxema sezgirligi
Formulalar matndan uzilib qolgan: `(2/3)·Ik` va `(1/3)·Ik` qiymatlari sahifa
oxirida alohida turibdi. Matndagi "2 karra kamroq" izohi bilan mos keladi;
ilovada "2 karra past sezgirlik" deb berildi.

---

## 4. Imlo va terminologiya

| Manbada | Ilovada |
|---|---|
| "ishlashilishi mumkin" (3-ma'ruza, uch marta) | "ishlatilishi mumkin" |
| "o'sirish" (2-ma'ruza, tezkorlik) | "o'chirish" |
| "konchtruksiyasi" (9-ma'ruza) | "konstruksiyasi" |
| "o'rtanmalarda" (9-ma'ruza) | "o'rnatmalarda" |
| "molellashtiriladi" (11-ma'ruza) | "modellashtiriladi" |
| "ko'zdi tutiladi" (12-ma'ruza) | "ko'zda tutiladi" |
| "tashlash" (13-ma'ruza rejasida: "sabr vaqtini tashlash") | "tanlash" |
| "sozlash kerek" (15-ma'ruza) | "sozlash kerak" |
| "keimning" (15-ma'ruza) | "kesimning" |
| "Elektr tarmog'i" / "EUL" aralash ishlatilgan | EUL (elektr uzatish liniyasi) |
| "MTZ" (12-ma'ruza oxirida bir marta) | MTH |
| "AVR" (13-ma'ruza, 13.2-rasm izohida) | ZAU (matnda shunday) |
| "RHA" / "RH" aralash | kontekstga qarab RH yoki RHA |
| "o'zgich" / "o'chirgich" / "uzgich" aralash | o'chirgich (Q) |

Kirill va lotin harflari aralashgan joylar (`Iк1`, `макс`, `Фвоз`, `Фру`,
`ЕА`, `ωА`) lotinga o'tkazildi: `Ik1`, `max`, `Фq`, `Фr.u`, `EA`, `ωA`.

---

## 5. Ichki nomuvofiqliklar

- **2-ma'ruza:** "330-500 kV li EUL ni 0,1-0,12 s, **110-220 kV li EUL ni esa
  0,1-0,12 s**" — ikkala diapazon uchun bir xil vaqt berilgan. Bu manbada shunday;
  ilovada o'zgartirilmadi, lekin test savolida faqat 110-220 kV holati so'raldi.
- **2-ma'ruza:** "220-750 kV li o'chirgichlar to' = 0,04 ÷ 0,06 c ishlaydi" va keyin
  "Juda tez ishlaydigan RH … to' = 0,02÷0,04 c da ishlaydi" — ikkinchi jumlada
  o'chirgich vaqti to' emas, RH ning ishlash vaqti th bo'lishi kerak.
  Ilovada bu raqamlar test savoliga kiritilmadi.
- **9-ma'ruza:** "harorat -40 dan 40 °C gacha … **205 °S** haroratda o'lchangan
  qiymatdan" — 205 °C aniq xato, ehtimol 20±5 °C. Ilovaga bu raqam kiritilmadi.
- **9-ma'ruza:** "Kuchlanish 24 dan **25 0 V** gacha" — probel tufayli buzilgan,
  ehtimol 250 V. Ilovaga kiritilmadi.
- **9-ma'ruza, sinov savollari:** "5. P sinfdagi tok transformatorlari…" —
  P (kirill) emas, **R** sinf. Ilovada R deb olindi. Shuningdek savollar
  raqamlashida xato: 1, 2, 3, **5**, **5** (4-raqam yo'q).
- **5-ma'ruza, sinov savollari:** xuddi shunday, 5-raqam ikki marta takrorlangan.
- **10-ma'ruza:** "ChEAZ" va "ChAEZ" ikki xil yozilgan (Cheboksar elektr apparatlari
  zavodi). Ilovada **ChEAZ** deb olindi.
- **12-ma'ruza:** strukturaviy sxema matnida signal relesi **KN** deb, prinsipial
  sxemada esa **KH** deb belgilangan. Ilovada hamma yerda **KH** ishlatildi
  (10-ma'ruzadagi ko'rsatgich relesi belgisi bilan mos).

---

## 6. Qamrab olinmagan yoki qisqartirilgan joylar

Quyidagilar ilovaga **kiritilmadi** yoki juda qisqa berildi — ular asosan
matematik chiqarishlar yoki rasm tahlili bo'lib, interaktiv formatga mos kelmaydi:

- **5-ma'ruza:** TT ning to'liq vektor diagrammasi (5.3-rasm) va undan xatoliklarni
  geometrik chiqarish. Ilovada faqat xatolik turlari va ularning sababi berildi.
- **5-ma'ruza:** sinusoidal bo'lmagan ikkilamchi tok uchun integral formulalar
  (5.7) — ilovaga kiritilmadi.
- **6-ma'ruza:** 6.2-rasmdagi olti xil QT turi uchun vektor diagrammalar.
  Toklarning taqsimlanishi matn shaklida berildi, diagrammalar chizilmadi.
- **6-ma'ruza:** 6.1-jadval (uchburchak sxemasida QT turlariga qarab reledagi
  toklar). Jadval ilovaga kiritilmadi, faqat umumiy xulosalar olindi.
- **7-ma'ruza:** KT ning almashtirish sxemasi va vektor diagrammasi (7.4-rasm).
- **9-ma'ruza:** RT-40 va RU-21 konstruksiyalarining detalli chizmalari
  (raqamlangan qismlar ro'yxati). Rele aniqlash mashqida faqat asosiy
  konstruktiv belgilar ipucha sifatida ishlatildi.
- **10-ma'ruza:** RV-200 ning 24 ta raqamlangan qismi. Faqat asosiylari olindi.
- **11-ma'ruza:** raqamli qurilmaning to'liq struktura sxemasi (11.1-rasm) —
  bloklar matn shaklida sanaldi, sxema chizilmadi.
- **13-ma'ruza:** bog'liq xarakteristikali MTH larni grafik usulda
  muvofiqlashtirish (13.5,b,d-rasm) — 5 qadamli qoida matnda berildi, lekin
  interaktiv grafik qilinmadi.
- **14-ma'ruza:** 14.3-rasmdagi KV + KV2 kombinatsiyalashgan sxema konstruktorda
  yo'q (atamalar va testlarda bor).
- **15-ma'ruza:** 15.3-rasmdagi kesim zonasini grafik aniqlash — formulaga
  (15.3) aylantirib, hisoblagich sifatida berildi.

### Sxema konstruktoridagi sxemalar (24 ta)

Yuqorida sanab o'tilganlarning aksariyati endi konstruktorga kiritildi:

**Pog'onali (operativ zanjirlar), `src/data/circuits/ladder.ts`:**
RH strukturaviy sxemasi (3.1), MTH strukturaviy sxemasi (12.3), MTH o'zgarmas
operativ tok zanjiri (12.4,b), ikkita releli ikki fazali MTH (12.5,b), bitta releli
MTH (12.5,e), bog'liq xarakteristikali MTH (12.4,d), kuchlanish bo'yicha ishga
tushuvchi MTH (14.2,a), teskari ketma-ketlik relesi bilan MTH (14.3,b), sabr vaqtsiz
kesim (15.2,a), sabr vaqtli kesim (15.2,b), yarimo'tkazgich elementli kesim (15.2,d),
vaqt va ko'rsatgich relesi (10.8,a / 10.9), ko'rsatgich relesining parallel ulanishi
(10.8,b), termik barqaror vaqt relesi (10.11), oraliq rele ulanishi (10.1,a),
o'chirish zanjirini KH bilan nazorat qilish (4-ma'ruza, 1.18).

**Erkin (tok va kuchlanish zanjirlari), `src/data/circuits/free.ts`:**
TT to'liq yulduz (6.1), to'liq bo'lmagan yulduz (6.4), uchburchak-yulduz (6.5),
toklar farqi (6.7), nol ketma-ketlik toklar filtri (6.8), KT yulduz (7.5),
ochiq uchburchak (7.7), nol ketma-ketlik kuchlanish filtri (7.8).

**Soddalashtirish (aniq belgilangan):** 6.5-rasmdagi uchburchak ulanish konstruktorda
bitta tugun shinasi bilan ko'rsatilgan — telefon ekranida haqiqiy uchburchak
geometriyasi o'qib bo'lmas darajada siqilib ketardi. Sxema tavsifida bu ochiq
aytilgan, reledagi toklar (Ia − Ib va h.k.) va ksx = √3 esa to'g'ri berilgan.

---

## 7. Shubhali, lekin o'zgartirilmagan joylar

Bu qiymatlar g'alati ko'rinadi, ammo manbada aniq yozilgani uchun ilovaga
**o'zgartirmasdan** kiritildi. Tekshirish tavsiya etiladi:

- **9.1-jadval, RT40/0,2:** "Quvvati 0,55 VA", RT40/200 uchun esa "27 VA" —
  quvvat ustuni o'rnatma oralig'iga mutanosib o'smaydi (RT40/50 dan boshlab
  27 VA da to'xtaydi).
- **9.1-jadval:** "Issiqlik barqarorligi, A / 1 s ichida" ustunida RT40/0,2 uchun
  15 A berilgan — o'rnatma 0,2 A bo'lganda bu 75 karra, ishonchli ko'rinadi,
  lekin RT40/200 uchun 500 A atigi 2,5 karra.
- **10-ma'ruza:** "RP–23 relesining iste'mol qiladigan quvvati **6 Vt**" —
  o'zgarmas tok relesi uchun Vt to'g'ri, lekin yuqorida "parallel ulangan relening
  chulg'am iste'molini **6 Vt** gacha chegaralashga intiladi" bilan bir xil raqam.
- **13-ma'ruza:** ksoz uchun ikki xil diapazon berilgan — 13.1 da "1,1-1,2",
  13.6a da "1,1-1,5". Ilovada ikkalasi ham tegishli hisoblagichda ko'rsatildi.
- **15-ma'ruza:** "Sabr vaqtsiz tokli kesimning ishlash vaqti **0,02-0,01 s**" —
  diapazon teskari yozilgan (0,01-0,02 bo'lishi kerak). Ilovada to'g'ri tartibda berildi.

---

## 8. Tarjima haqida

Ilova uch tilda: o'zbekcha (asl manba tili), ruscha va inglizcha.

- **Ruscha** atamalar manba adabiyotidagi standart rus terminologiyasiga
  moslashtirildi (РЗ, КЗ, ЛЭП, МТЗ, ТТ, ТН, АПВ, АВР, АЧР, kотс, kв, kч, Iс.з, Iс.р).
  Ma'ruza matni o'zi rus manbalaridan o'zbekchaga o'girilgan, shuning uchun ruscha
  variant asl atamalarga eng yaqin.
- **Inglizcha** — xalqaro amaliyotdagi atamalar (relay protection, short circuit,
  overcurrent protection, CT/VT, auto-reclosing, reset ratio, sensitivity factor).
  Ba'zi qisqartmalar to'g'ridan to'g'ri mos kelmaydi (masalan RH → RP/OCP kontekstga
  qarab), shuning uchun har bir atamaning to'liq shakli ham berilgan.
- **Formulalar tarjima qilinmaydi** — ular ma'ruzadagi belgilar bilan qoladi
  (Ihi, ksoz, kqay, ko'it, Δt). Faqat o'zgaruvchilar tavsifi tarjima qilinadi.
- Sxemalardagi apparat belgilari (KA, KT, KL, KH, SQ, YAT, TA, TV) xalqaro
  belgilar bo'lgani uchun uchala tilda bir xil qoldirildi.

## 9. Ishlab chiqish jarayonidagi cheklovlar

- `git` va `gh` bu kompyuterda o'rnatilmagan — commit va pull request qo'lda
  bajariladi (README, 3-bo'lim).
- Node.js `C:\Program Files\nodejs` da, lekin PATH'da yo'q; shell'da qo'lda
  qo'shish kerak (README, 1-bo'lim oxiridagi eslatma).
- Sinovdan o'tkazilgan: `tsc` xatosiz, production build xatosiz, ilova mobil
  ko'rinishda (375×812) brauzerda tekshirildi — 24 ta sxemaning barchasi
  chiziladi, drag-and-drop (haqiqiy sichqoncha bilan) ishlaydi, tekshirish
  100 % beradi, uchala til interfeys va kontentni almashtiradi, konsolda
  xato yo'q.
