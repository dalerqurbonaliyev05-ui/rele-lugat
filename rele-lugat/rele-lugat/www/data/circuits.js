/* "Sxemani o'zingiz yig'ing" o'yini uchun sxemalar.
 *
 * Har bir sxema:
 *   id, title, lec (manba ma'ruza), diff ("oson" | "o'rta" | "qiyin"), desc
 *   type: "ladder" - gorizontal pog'onali (rung) sxema, avtomatik chiziladi
 *         "free"   - erkin sxema: draw[] primitivlari + absolyut slotlar
 *   parts: palitradagi detallar (chalg'ituvchilari bilan)
 *   explain: har bir slot uchun "nega shu yerda" izohi
 *
 * YANGI SXEMA QO'SHISH: shu massivga yangi obyekt qo'shish kifoya,
 * kod o'zgartirilmaydi (README.md ga qarang).
 *
 * kind qiymatlari: coil (g'altak), no (qo'shiluvchi kontakt),
 *                  nc (ajraluvchi kontakt), blk (blok), ct (tok transformatori)
 */
window.DATA = window.DATA || {};

window.DATA.circuits = [

/* ---------------------------------------------------------------- 1 */
{
  id: "mth-struct",
  title: "MTH ning uch fazali strukturaviy sxemasi",
  lec: 12, diff: "oson",
  desc: "12.3-rasm. O'lchov qism (1) → mantiqiy qism (2) → bajaruvchi qism (3). Bloklarni to'g'ri tartibda joylashtiring.",
  type: "ladder",
  w: 360, h: 210,
  rails: { left: 20, right: 340, showPolarity: false },
  rungs: [
    { y: 60, label: "1 — o'lchov qismi", items: [
      { t: "slot", id: "s1", accept: "KA", kind: "blk", w: 52 },
      { t: "slot", id: "s2", accept: "DW", kind: "blk", w: 52 },
      { t: "slot", id: "s3", accept: "KT", kind: "blk", w: 52 }
    ]},
    { y: 140, label: "3 — bajaruvchi qism", items: [
      { t: "slot", id: "s4", accept: "KH", kind: "blk", w: 52 },
      { t: "slot", id: "s5", accept: "KL", kind: "blk", w: 52 },
      { t: "fixed", label: "YAT", kind: "blk", w: 52 }
    ]}
  ],
  parts: [
    { id: "KA", name: "KA — tok relesi", kind: "blk" },
    { id: "DW", name: "DW — YoKI elementi", kind: "blk" },
    { id: "KT", name: "KT — vaqt relesi", kind: "blk" },
    { id: "KH", name: "KH — ko'rsatgich relesi", kind: "blk" },
    { id: "KL", name: "KL — oraliq rele", kind: "blk" },
    { id: "KV", name: "KV — kuchlanish relesi", kind: "blk" },
    { id: "TV", name: "TV — kuchlanish trans.", kind: "blk" }
  ],
  explain: {
    s1: "O'lchov qismi (1) tok relelari KA dan iborat — ular TT ikkilamchi toklari bilan ta'minlanadi.",
    s2: "Uchala fazaning KA kontaktlari YoKI (DW) mantiqiy elementi orqali birlashtiriladi.",
    s3: "Mantiqiy qismda sabr vaqtini KT vaqt organi hosil qiladi (odatda uchta faza uchun bitta).",
    s4: "KH signal (ko'rsatgich) relesi himoyaning ishlaganini qayd qiladi.",
    s5: "Bajaruvchi qism KL chiquvchi oraliq relesi orqali amalga oshirilib, YAT ga kuchlanish beradi."
  }
},

/* ---------------------------------------------------------------- 2 */
{
  id: "mth-dc",
  title: "MTH ning o'zgarmas operativ tok zanjiri",
  lec: 12, diff: "qiyin",
  desc: "12.4,b / 12.5,b-rasm. Mustaqil xarakteristikali MTH ning operativ zanjiri. Tok relesi kontaktidan YAT gacha bo'lgan zanjirni yig'ing.",
  type: "ladder",
  w: 360, h: 300,
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "slot", id: "s1", accept: "KA1", kind: "no", w: 56 },
      { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 }
    ]},
    { y: 150, items: [
      { t: "slot", id: "s3", accept: "KT1", kind: "no", w: 56 },
      { t: "slot", id: "s4", accept: "KL", kind: "coil", w: 44 }
    ]},
    { y: 230, items: [
      { t: "slot", id: "s5", accept: "KL1", kind: "no", w: 50 },
      { t: "slot", id: "s6", accept: "KH", kind: "coil", w: 40 },
      { t: "slot", id: "s7", accept: "SQ", kind: "no", w: 44 },
      { t: "slot", id: "s8", accept: "YAT", kind: "coil", w: 40 }
    ]}
  ],
  parts: [
    { id: "KA1", name: "KA1 — tok relesi kontakti", kind: "no" },
    { id: "KT", name: "KT — vaqt relesi g'altagi", kind: "coil" },
    { id: "KT1", name: "KT1 — vaqt relesi kontakti", kind: "no" },
    { id: "KL", name: "KL — oraliq rele g'altagi", kind: "coil" },
    { id: "KL1", name: "KL1 — oraliq rele kontakti", kind: "no" },
    { id: "KH", name: "KH — ko'rsatgich relesi", kind: "coil" },
    { id: "SQ", name: "SQ — o'chirgich yordamchi kontakti", kind: "no" },
    { id: "YAT", name: "YAT — o'chirish g'altagi", kind: "coil" },
    { id: "KV", name: "KV — kuchlanish relesi", kind: "coil" },
    { id: "KA0", name: "KA0 — nol simdagi rele", kind: "no" }
  ],
  explain: {
    s1: "Zanjir tok relelarining kontaktlaridan boshlanadi — ular parallel (YoKI) ulanadi.",
    s2: "Tok relesi ishlaganda KT vaqt relesining chulg'amiga tok beriladi.",
    s3: "Sabr vaqtidan keyin KT1 kontakti tutashadi.",
    s4: "KT1 orqali KL oraliq relesi ishga tushadi — u bajaruvchi organ.",
    s5: "KL1 kontakti o'chirish zanjirini qo'shadi.",
    s6: "KH ko'rsatgich relesi o'chirish g'altagi bilan ketma-ket ulanadi, bayroqchasi tushib himoya ishlaganini qayd qiladi.",
    s7: "SQ — o'chirgichning yordamchi bloklovchi kontakti; o'chirgich o'chgach ochilib YAT zanjirini uzadi.",
    s8: "YAT — o'chirgich yuritmasidagi elektromagnit o'chirish g'altagi, zanjirning oxirgi elementi."
  }
},

/* ---------------------------------------------------------------- 3 */
{
  id: "mth-uv",
  title: "Kuchlanish bo'yicha ishga tushuvchi MTH",
  lec: 14, diff: "qiyin",
  desc: "14.2,a-rasm. Tok va kuchlanish organlari VA mantiqi bo'yicha birlashtiriladi: KV ishlamasa KL1 ochiq qoladi va KT ishga tushmaydi.",
  type: "ladder",
  w: 360, h: 300,
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "slot", id: "s1", accept: "KA1", kind: "no", w: 50 },
      { t: "slot", id: "s2", accept: "KL1", kind: "no", w: 50 },
      { t: "slot", id: "s3", accept: "KT", kind: "coil", w: 42 }
    ]},
    { y: 150, items: [
      { t: "slot", id: "s4", accept: "KV1", kind: "no", w: 56 },
      { t: "slot", id: "s5", accept: "KL", kind: "coil", w: 44 }
    ]},
    { y: 230, items: [
      { t: "slot", id: "s6", accept: "KT1", kind: "no", w: 50 },
      { t: "slot", id: "s7", accept: "KH", kind: "coil", w: 40 },
      { t: "fixed", label: "SQ", kind: "no", w: 44 },
      { t: "slot", id: "s8", accept: "YAT", kind: "coil", w: 40 }
    ]}
  ],
  parts: [
    { id: "KA1", name: "KA1.1 — tok relesi kontakti", kind: "no" },
    { id: "KL1", name: "KL1 — oraliq rele kontakti", kind: "no" },
    { id: "KT", name: "KT — vaqt relesi g'altagi", kind: "coil" },
    { id: "KV1", name: "KVAB.1 — kuchlanish relesi kontakti", kind: "no" },
    { id: "KL", name: "KL — oraliq rele g'altagi", kind: "coil" },
    { id: "KT1", name: "KT1 — vaqt relesi kontakti", kind: "no" },
    { id: "KH", name: "KH — ko'rsatgich relesi", kind: "coil" },
    { id: "YAT", name: "YAT — o'chirish g'altagi", kind: "coil" },
    { id: "KA0", name: "KA0 — nol simdagi rele", kind: "no" }
  ],
  explain: {
    s1: "Tok organi KA — QT da tok ortadi va uning kontakti tutashadi.",
    s2: "KL1 kuchlanish organining kontakti; u tok zanjiri bilan ketma-ket, ya'ni VA mantiqi bo'yicha ulanadi.",
    s3: "Ikkala shart bajarilgandagina KT vaqt relesi ishga tushadi.",
    s4: "Kuchlanish organi minimal kuchlanish relelari KVAB, KVBC, KVCA kontaktlaridan iborat (parallel).",
    s5: "Kuchlanish organi KL oraliq relesini ishga tushiradi.",
    s6: "Sabr vaqtidan keyin KT1 o'chirish zanjirini qo'shadi.",
    s7: "KH himoyaning ishlaganini qayd qiladi.",
    s8: "YAT o'chirgichni o'chiradi."
  }
},

/* ---------------------------------------------------------------- 4 */
{
  id: "kesim-instant",
  title: "Sabr vaqtsiz tokli kesim sxemasi",
  lec: 15, diff: "oson",
  desc: "15.2,a-rasm. Kesim MTH dan vaqt relesi yo'qligi bilan farq qiladi — zanjirni yig'ing.",
  type: "ladder",
  w: 360, h: 220,
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "slot", id: "s1", accept: "KA", kind: "no", w: 56 },
      { t: "slot", id: "s2", accept: "KL", kind: "coil", w: 44 }
    ]},
    { y: 155, items: [
      { t: "slot", id: "s3", accept: "KL1", kind: "no", w: 50 },
      { t: "slot", id: "s4", accept: "KH", kind: "coil", w: 40 },
      { t: "slot", id: "s5", accept: "SQ", kind: "no", w: 44 },
      { t: "slot", id: "s6", accept: "YAT", kind: "coil", w: 40 }
    ]}
  ],
  parts: [
    { id: "KA", name: "KA — tok relesi kontakti", kind: "no" },
    { id: "KL", name: "KL — oraliq rele g'altagi", kind: "coil" },
    { id: "KL1", name: "KL.1 — oraliq rele kontakti", kind: "no" },
    { id: "KH", name: "KH — ko'rsatgich relesi", kind: "coil" },
    { id: "SQ", name: "SQ — yordamchi kontakt", kind: "no" },
    { id: "YAT", name: "YAT — o'chirish g'altagi", kind: "coil" },
    { id: "KT", name: "KT — vaqt relesi g'altagi", kind: "coil" },
    { id: "KT1", name: "KT.1 — vaqt relesi kontakti", kind: "no" }
  ],
  explain: {
    s1: "Kesimda o'lchov organi bevosita bajaruvchi organga ta'sir qiladi — vaqt relesi yo'q.",
    s2: "KA darhol KL tezkor oraliq relesini ishga tushiradi (0,02 s).",
    s3: "KL.1 kontakti o'chirish zanjirini qo'shadi.",
    s4: "KH bayroqchasi kesim ishlaganini qayd qiladi.",
    s5: "SQ o'chirgich o'chgach YAT zanjirini uzadi.",
    s6: "YAT o'chirgichni o'chiradi. Umumiy vaqt thi = 0,04-0,06 s."
  }
},

/* ---------------------------------------------------------------- 5 */
{
  id: "kt-kh",
  title: "Vaqt va ko'rsatgich relesining ulanishi",
  lec: 10, diff: "oson",
  desc: "10.8,a va 10.9-rasm. KA.1 kontakti KT vaqt relesini ishga tushiradi, KT.1 esa YAT zanjirini qo'shadi.",
  type: "ladder",
  w: 360, h: 220,
  rails: { left: 25, right: 335, showPolarity: true },
  rungs: [
    { y: 70, items: [
      { t: "fixed", label: "KA.1", kind: "no", w: 50 },
      { t: "slot", id: "s1", accept: "KT", kind: "coil", w: 44 }
    ]},
    { y: 155, items: [
      { t: "slot", id: "s2", accept: "KT1", kind: "no", w: 50 },
      { t: "slot", id: "s3", accept: "KH", kind: "coil", w: 40 },
      { t: "slot", id: "s4", accept: "SQ", kind: "no", w: 44 },
      { t: "slot", id: "s5", accept: "YAT", kind: "coil", w: 40 }
    ]}
  ],
  parts: [
    { id: "KT", name: "KT — vaqt relesi g'altagi", kind: "coil" },
    { id: "KT1", name: "KT.1 — vaqt relesi kontakti", kind: "no" },
    { id: "KH", name: "KH — ko'rsatgich relesi", kind: "coil" },
    { id: "SQ", name: "SQ — yordamchi kontakt", kind: "no" },
    { id: "YAT", name: "YAT — o'chirish g'altagi", kind: "coil" },
    { id: "KL", name: "KL — oraliq rele", kind: "coil" },
    { id: "RD", name: "Rd — qo'shimcha qarshilik", kind: "coil" }
  ],
  explain: {
    s1: "KA.1 kontakti qo'shilganda plyus operativ manba KT vaqt relesining chulg'amidan o'tadi.",
    s2: "Sabr vaqtidan so'ng KT.1 kontakti tutashadi.",
    s3: "KH ko'rsatgich relesi o'chirish g'altagi bilan ketma-ket ulanadi (10.8,a-rasm).",
    s4: "SQ o'chirgichning holatini nazorat qiladi.",
    s5: "YAT g'altagi orqali o'chirgich o'chadi."
  }
},

/* ---------------------------------------------------------------- 6 */
{
  id: "tt-yulduz",
  title: "TT ni to'liq yulduz sxemasiga ulash",
  lec: 6, diff: "o'rta",
  desc: "6.1-rasm. Uchala fazaga TT o'rnatiladi, relelar yulduz ulanadi, nol nuqta nol o'tkazgich bilan birlashtiriladi. Relelarni to'g'ri joylashtiring.",
  type: "free",
  w: 360, h: 270,
  draw: [
    /* uch faza */
    ["text", 44, 18, "A", { b: 1 }],
    ["text", 80, 18, "B", { b: 1 }],
    ["text", 116, 18, "C", { b: 1 }],
    ["line", 44, 26, 44, 196],
    ["line", 80, 26, 80, 196],
    ["line", 116, 26, 116, 196],
    /* tok transformatorlari */
    ["ct", 44, 96, "TA1"],
    ["ct", 80, 128, "TA2"],
    ["ct", 116, 160, "TA3"],
    /* ikkilamchi toklar relelarga */
    ["line", 58, 96, 176, 96],
    ["line", 94, 128, 176, 128],
    ["line", 130, 160, 176, 160],
    /* relelardan nol nuqtaga */
    ["line", 234, 96, 292, 96],
    ["line", 234, 128, 292, 128],
    ["line", 234, 160, 292, 160],
    ["line", 292, 96, 292, 214],
    ["dot", 292, 128],
    ["dot", 292, 160],
    ["dot", 292, 214],
    /* nol sim: nol nuqtadan IV rele orqali orqaga */
    ["line", 292, 214, 234, 214],
    ["line", 176, 214, 60, 214],
    ["line", 60, 214, 60, 232],
    ["earth", 60, 232],
    ["text", 205, 248, "In.o' = 3I0", { s: 11 }]
  ],
  slots: [
    { id: "r1", x: 176, y: 82,  w: 58, h: 28, accept: "KA1", kind: "coil" },
    { id: "r2", x: 176, y: 114, w: 58, h: 28, accept: "KA2", kind: "coil" },
    { id: "r3", x: 176, y: 146, w: 58, h: 28, accept: "KA3", kind: "coil" },
    { id: "r4", x: 176, y: 200, w: 58, h: 28, accept: "KA0", kind: "coil" }
  ],
  parts: [
    { id: "KA1", name: "I — A faza relesi", kind: "coil" },
    { id: "KA2", name: "II — B faza relesi", kind: "coil" },
    { id: "KA3", name: "III — C faza relesi", kind: "coil" },
    { id: "KA0", name: "IV — nol simdagi rele", kind: "coil" },
    { id: "KV", name: "KV — kuchlanish relesi", kind: "coil" },
    { id: "KT", name: "KT — vaqt relesi", kind: "coil" }
  ],
  explain: {
    r1: "I rele A fazaning TT iga ulanadi: Ia = IA/kI.",
    r2: "II rele B fazaning TT iga ulanadi: Ib = IB/kI.",
    r3: "III rele C fazaning TT iga ulanadi: Ic = IC/kI.",
    r4: "IV rele nol simga qo'yiladi; undan In.o' = 3I0 oqadi va u faqat yerga QT ga javob beradi."
  }
}
];
