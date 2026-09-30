/* "Qayerga qaysi rele?" stsenariy o'yini va vaqt pog'onasi mashqi.
   Asos: 2.1-rasm (selektiv o'chirish), 2.2-rasm (himoya zonalari),
   12.1-rasm (radial tarmoqda MTH joylashuvi va pog'onali sabr vaqti),
   13.4/13.5-rasm (sezgirlik va Δt). */
window.DATA = window.DATA || {};

/* Bir tomondan ta'minlanadigan radial tarmoq.
   Manba (GA) → A → W1 → B → W2 → C → W3 → D
   Har bir liniya boshida o'chirgich Q va himoya RH turadi. */
window.DATA.network = {
  w: 360, h: 190,
  buses: [
    { id: "A", x: 60,  y: 70, label: "A" },
    { id: "B", x: 150, y: 70, label: "B" },
    { id: "C", x: 240, y: 70, label: "C" },
    { id: "D", x: 320, y: 70, label: "D" }
  ],
  lines: [
    { id: "W1", from: "A", to: "B", q: "Q1", rh: "RH1", t: 1.5 },
    { id: "W2", from: "B", to: "C", q: "Q2", rh: "RH2", t: 1.0 },
    { id: "W3", from: "C", to: "D", q: "Q3", rh: "RH3", t: 0.5 }
  ],
  faults: [
    { id: "K1", x: 285, y: 70, on: "W3", label: "K1" },
    { id: "K2", x: 195, y: 70, on: "W2", label: "K2" },
    { id: "K3", x: 105, y: 70, on: "W1", label: "K3" }
  ]
};

window.DATA.scenarios = [
  {
    id: "sel-1", lec: 2, title: "Selektiv o'chirish",
    fault: "K1",
    q: "K1 nuqtada QT sodir bo'ldi. Selektivlik shartiga ko'ra qaysi o'chirgich o'chishi kerak?",
    options: ["Q1", "Q2", "Q3", "Barchasi"],
    a: 2,
    e: "RH shikastlanish joyiga eng yaqin o'chirgichni o'chirishi kerak. K1 — W3 liniyasida, shuning uchun Q3 o'chadi va qolgan iste'molchilar ta'minoti saqlanadi (2-ma'ruza)."
  },
  {
    id: "sel-2", lec: 12, title: "Pog'onali vaqt",
    fault: "K1",
    q: "K1 dagi QT da qisqa tutashuv toki 1, 2 va 3-himoyalarning hammasidan o'tadi va ular ishga tushadi. Nima uchun faqat RH3 o'chiradi?",
    options: [
      "RH3 ning ishlash toki eng katta",
      "RH3 ning sabr vaqti eng kichik, qolganlari qaytib oladi",
      "RH1 va RH2 umuman ishga tushmaydi",
      "RH3 kuchlanish relesiga ega"
    ],
    a: 1,
    e: "Sabr vaqti iste'molchidan manba tomonga oshib boradi. Eng avval sabr vaqti kichik RH3 ishlaydi; RH1 va RH2 sabr vaqti tugamasdan boshlang'ich holatga qaytadi (12-ma'ruza)."
  },
  {
    id: "sel-3", lec: 2, title: "Zahiralash",
    fault: "K1",
    q: "K1 da QT bo'ldi, lekin Q3 o'chirgich buzilgani uchun ishlamadi. Keyin nima bo'ladi?",
    options: [
      "QT o'chirilmasdan qoladi",
      "RH2 uzoq zahiralash sifatida ishlab Q2 ni o'chiradi",
      "RH1 darhol ishlaydi",
      "AQU Q3 ni qayta qo'shadi"
    ],
    a: 1,
    e: "RH1 ning keyingi hududdagi QT ga sezgir bo'lishi uzoq zahiralash deb nomlanadi. Bu yerda Q3 ishlamasa, keyingi pog'ona — RH2 ishlab Q2 ni o'chiradi (2-ma'ruza)."
  },
  {
    id: "sel-4", lec: 2, title: "Noselektiv o'chirish",
    fault: "K3",
    q: "K3 nuqtada QT bo'lganda RH1 ishlamadi va manbaga yaqinroq himoya ishladi. Bu qanday oqibatga olib keladi?",
    options: [
      "Hech qanday oqibat yo'q",
      "Qo'shimcha nimstansiyalar ham ta'minotsiz qoladi",
      "Faqat shikastlangan liniya o'chadi",
      "Kuchlanish oshadi"
    ],
    a: 1,
    e: "RH ishlamay qolsa keyingi pog'ona ishlaydi va qo'shimcha nimstansiyalar ham o'chib qoladi — bu noselektiv o'chirish (2-ma'ruza, 2.3-rasm)."
  },
  {
    id: "sel-5", lec: 12, title: "Himoya joylashuvi",
    fault: "K2",
    q: "Bir tomondan ta'minlanadigan tarmoqda MTH qayerga o'rnatiladi?",
    options: [
      "Liniyaning oxiriga, iste'molchi tomonidan",
      "Har bir liniyaning boshiga, ta'minot manbasi tomonidan",
      "Faqat manbaning o'zida",
      "Har bir shinaning ikkala tomoniga"
    ],
    a: 1,
    e: "Bir tomonlama ta'minlanadigan tarmoqlarda maksimal himoya har bir liniyaning boshida, elektr ta'minot manbasi tomonidan o'rnatiladi (12-ma'ruza, 12.1,a-rasm)."
  },
  {
    id: "sel-6", lec: 13, title: "Sezgirlik zonasi",
    fault: "K2",
    q: "RH1 (A-B liniyasi) ning ishlash zonasi qayergacha yetishi kerak?",
    options: [
      "Faqat A-B liniyasining yarmigacha",
      "Faqat A-B liniyasi oxirigacha",
      "A-B liniyasi va keyingi B-C uchastkasini ham qamrashi kerak",
      "Butun tarmoqni"
    ],
    a: 2,
    e: "MTH ning ishlash zonasi himoya qilinadigan liniyani va keyingi ikkinchi uchastkani ham qamrab olishi kerak (13-ma'ruza, 13.4-rasm)."
  },
  {
    id: "sel-7", lec: 15, title: "Tokli kesim zonasi",
    fault: "K1",
    q: "Sabr vaqtsiz tokli kesim W3 liniyasida o'rnatilgan. Uning ishlash zonasi qanday bo'lishi kerak?",
    options: [
      "Butun W3 va keyingi liniyani qamrasin",
      "W3 dan tashqariga chiqmasin",
      "Faqat W3 ning oxirini qamrasin",
      "Zona ahamiyatsiz"
    ],
    a: 1,
    e: "Selektivlik shartlariga ko'ra, sabr vaqtsiz kesimning ishlash zonasi himoya qilinadigan EUL dan tashqariga chiqmasligi kerak (15-ma'ruza)."
  },
  {
    id: "sel-8", lec: 2, title: "Tezkorlik",
    fault: "K3",
    q: "A shinasida K(3) bo'lganda qoldiq kuchlanish nominalning 45 % ini tashkil qildi. Qanday xulosa chiqariladi?",
    options: [
      "Oddiy sabr vaqtli himoya yetarli",
      "Turg'unlikni saqlash uchun tez ishlovchi RH kerak",
      "Himoya umuman kerak emas",
      "Faqat signalizatsiya qo'yiladi"
    ],
    a: 1,
    e: "Qoldiq kuchlanish nominalning 60 % dan kam bo'lsa, turg'unlikni saqlash uchun shikastlanishni tezda o'chirish, ya'ni tez ishlovchi RH qo'llash kerak (2-ma'ruza)."
  }
];

/* Vaqt pog'onasi mashqi: MTH sabr vaqtlarini Δt bilan qo'yish.
   th(A) = th(B) + Δt (13.11-formula). */
window.DATA.timeExercises = [
  {
    id: "dt-1", lec: 13,
    title: "Vaqt pog'onasini qo'ying",
    desc: "Mustaqil xarakteristikali MTH. Eng uzoq (RH3) himoyaning sabr vaqti berilgan. Qolganlarini Δt = 0,5 s pog'ona bilan to'ldiring.",
    dt: 0.5,
    given: { RH3: 0.5 },
    answer: { RH2: 1.0, RH1: 1.5 },
    e: "Manbaga yaqin himoyaning sabr vaqti keyingisidan bir pog'ona vaqtga katta bo'lishi kerak: th(A) = th(B) + Δt (13.11-formula)."
  },
  {
    id: "dt-2", lec: 13,
    title: "Δt = 0,4 s bilan",
    desc: "Tez ishlovchi RH bilan muvofiqlashtirilganda Δt = 0,35-0,4 s. RH3 = 0,4 s dan boshlab vaqtlarni qo'ying.",
    dt: 0.4,
    given: { RH3: 0.4 },
    answer: { RH2: 0.8, RH1: 1.2 },
    e: "tp(B) = 0 qabul qilinganda Δt = 0,35-0,4 s bo'ladi (13-ma'ruza)."
  },
  {
    id: "dt-3", lec: 13,
    title: "Bog'liq xarakteristikali MTH",
    desc: "Bog'liq xarakteristikali MTH da vaqt pog'onasi 0,6-1 s. Δt = 0,6 s bilan vaqtlarni qo'ying (RH3 = 0,6 s).",
    dt: 0.6,
    given: { RH3: 0.6 },
    answer: { RH2: 1.2, RH1: 1.8 },
    e: "Induksion relening inersion xatoligi ti hisobiga bog'liq MTH larda Δt = 0,6-1 s (13.10-formula)."
  }
];
