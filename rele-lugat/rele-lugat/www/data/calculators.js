/* Hisoblagichlar. Har bir formula ma'ruzadagi belgilar bilan beriladi
   va qadamma-qadam yechiladi.
   v[]  - kirish maydonlari (k - kalit, d - standart qiymat)
   run  - {value, unit, steps[]} qaytaradi
   gen  - mashq rejimi uchun tasodifiy misol hosil qiladi */
window.DATA = window.DATA || {};

function _r(x, n) { var p = Math.pow(10, n === undefined ? 2 : n); return Math.round(x * p) / p; }
function _pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function _rnd(lo, hi, n) { return _r(lo + Math.random() * (hi - lo), n === undefined ? 1 : n); }

window.DATA.calculators = [
{
  id: "ihi-qaytish", lec: 13, group: "MTH",
  title: "MTH ishlash toki — qaytish sharti",
  formula: "Ihi = (ksoz · ko'it / kqay) · Iish.max",
  ref: "13.2-formula",
  note: "Birinchi shart: tashqi QT o'chirilgandan so'ng MTH Iyuk.max da ishonchli qaytishi kerak.",
  v: [
    { k: "ksoz", label: "ksoz — sozlash koeffitsienti", d: 1.2, hint: "RT-40, RT-80 va statik relelar uchun 1,1-1,2" },
    { k: "koit", label: "ko'it — o'z-o'zidan ishga tushish koeff.", d: 2, hint: "Motorlar ko'p bo'lsa 3-6, kam bo'lsa 1,5-2" },
    { k: "kqay", label: "kqay — qaytish koeffitsienti", d: 0.85, hint: "RT-40 da 0,8-0,85" },
    { k: "Iish", label: "Iish.max — maksimal ishchi tok, A", d: 200 }
  ],
  run: function (x) {
    var val = x.ksoz * x.koit / x.kqay * x.Iish;
    return { value: _r(val), unit: "A", steps: [
      "Ihi = ksoz · ko'it / kqay · Iish.max",
      "Ihi = " + x.ksoz + " · " + x.koit + " / " + x.kqay + " · " + x.Iish,
      "Ihi = " + _r(x.ksoz * x.koit / x.kqay, 3) + " · " + x.Iish,
      "Ihi = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { ksoz: _pick([1.1, 1.15, 1.2]), koit: _pick([1.5, 2, 3, 4]), kqay: _pick([0.8, 0.85]), Iish: _pick([100, 150, 200, 250, 300]) }; }
},
{
  id: "ihi-yuklama", lec: 13, group: "MTH",
  title: "MTH ishlash toki — yuklamadan sozlash",
  formula: "Ihi = ksoz · Iyuk.max",
  ref: "13.4-formula",
  note: "Ikkinchi shart: himoya Iyuk.max da ishlamasligi kerak.",
  v: [
    { k: "ksoz", label: "ksoz — sozlash koeffitsienti", d: 1.2 },
    { k: "Iyuk", label: "Iyuk.max — maksimal yuklama toki, A", d: 300, hint: "Iyuk.max = ko'it · Iish.max" }
  ],
  run: function (x) {
    var val = x.ksoz * x.Iyuk;
    return { value: _r(val), unit: "A", steps: [
      "Ihi = ksoz · Iyuk.max",
      "Ihi = " + x.ksoz + " · " + x.Iyuk,
      "Ihi = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { ksoz: _pick([1.1, 1.15, 1.2]), Iyuk: _pick([200, 300, 350, 400, 500]) }; }
},
{
  id: "ihi-zau", lec: 13, group: "MTH",
  title: "MTH ishlash toki — ZAU dan keyingi rejim",
  formula: "Ihi = ksoz · (Iish.max.W1 + Iish.max.W2 · ko'it)",
  ref: "13.5-formula",
  note: "W2 o'chgandan so'ng ZAU W1 liniyadan qo'shimcha yuklamaga kuchlanish beradi va o'z-o'zidan ishga tushish boshlanadi.",
  v: [
    { k: "ksoz", label: "ksoz — sozlash koeffitsienti", d: 1.2 },
    { k: "I1", label: "Iish.max.W1 — W1 ishchi toki, A", d: 150 },
    { k: "I2", label: "Iish.max.W2 — W2 ishchi toki, A", d: 100 },
    { k: "koit", label: "ko'it — o'z-o'zidan ishga tushish koeff.", d: 3 }
  ],
  run: function (x) {
    var inner = x.I1 + x.I2 * x.koit, val = x.ksoz * inner;
    return { value: _r(val), unit: "A", steps: [
      "Ihi = ksoz · (Iish.max.W1 + Iish.max.W2 · ko'it)",
      "Iyuk.max = " + x.I1 + " + " + x.I2 + " · " + x.koit + " = " + _r(inner) + " A",
      "Ihi = " + x.ksoz + " · " + _r(inner),
      "Ihi = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { ksoz: _pick([1.1, 1.2]), I1: _pick([100, 120, 150, 180]), I2: _pick([60, 80, 100]), koit: _pick([1.5, 2, 3, 4]) }; }
},
{
  id: "iri", lec: 13, group: "MTH",
  title: "Releni ikkilamchi ishlash toki",
  formula: "Iri = ksx · Ihi / KI",
  ref: "13.6-formula",
  note: "ksx: yulduz (to'liq va to'liq bo'lmagan) uchun 1; ikki faza tokining ayirmasiga ulangan sxema uchun √3.",
  v: [
    { k: "ksx", label: "ksx — sxema koeffitsienti", d: 1, hint: "1 yoki 1,732 (√3)" },
    { k: "Ihi", label: "Ihi — himoyaning ishlash toki, A", d: 420 },
    { k: "KI", label: "KI — TT transformatsiya koeffitsienti", d: 60, hint: "Masalan 300/5 = 60" }
  ],
  run: function (x) {
    var val = x.ksx * x.Ihi / x.KI;
    return { value: _r(val), unit: "A", steps: [
      "Iri = ksx · Ihi / KI",
      "Iri = " + x.ksx + " · " + x.Ihi + " / " + x.KI,
      "Iri = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { ksx: _pick([1, 1.732]), Ihi: _pick([300, 420, 500, 600]), KI: _pick([20, 40, 60, 80, 100]) }; }
},
{
  id: "ksez", lec: 13, group: "MTH",
  title: "Sezgirlik koeffitsienti",
  formula: "ksez = Iqt.min / Ihi",
  ref: "13.7-formula",
  note: "Himoya qilinadigan liniya uchun ksez > 1,5; zahira uchastkada ksez > 1,2 bo'lishi kerak.",
  v: [
    { k: "Iqt", label: "Iqt.min — minimal QT toki, A", d: 900 },
    { k: "Ihi", label: "Ihi — himoyaning ishlash toki, A", d: 420 }
  ],
  run: function (x) {
    var val = x.Iqt / x.Ihi;
    var verd = val > 1.5 ? "ksez > 1,5 — asosiy zona uchun yetarli."
             : val > 1.2 ? "1,2 < ksez < 1,5 — faqat zahira uchastka uchun yetarli."
             : "ksez < 1,2 — yetarli emas, Ihi ni kamaytirish kerak.";
    return { value: _r(val), unit: "", steps: [
      "ksez = Iqt.min / Ihi",
      "ksez = " + x.Iqt + " / " + x.Ihi,
      "ksez = " + _r(val),
      verd
    ]};
  },
  gen: function () { return { Iqt: _pick([600, 750, 900, 1100, 1400]), Ihi: _pick([300, 400, 500, 620]) }; }
},
{
  id: "dt", lec: 13, group: "MTH",
  title: "Vaqt pog'onasi Δt",
  formula: "Δt = tp(B) + tv(B) + tp(A) + tzah",
  ref: "13.9-formula",
  note: "Mustaqil xarakteristikali MTH da Δt = 0,35-0,6 s; bog'liq xarakteristikalilarda 0,6-1 s (u yerda ti ham qo'shiladi).",
  v: [
    { k: "tpB", label: "tp(B) — B vaqt relesi xatoligi, s", d: 0.06 },
    { k: "tvB", label: "tv(B) — o'chirgichning uzish vaqti, s", d: 0.15 },
    { k: "tpA", label: "tp(A) — A vaqt relesi xatoligi, s", d: 0.06 },
    { k: "tzah", label: "tzah — zahira vaqti, s", d: 0.13 }
  ],
  run: function (x) {
    var val = x.tpB + x.tvB + x.tpA + x.tzah;
    var verd = val >= 0.35 && val <= 0.6
      ? "Natija mustaqil xarakteristikali MTH uchun odatiy oraliqda (0,35-0,6 s)."
      : "Diqqat: qiymat mustaqil MTH uchun odatiy 0,35-0,6 s oralig'idan tashqarida.";
    return { value: _r(val, 3), unit: "s", steps: [
      "Δt = tp(B) + tv(B) + tp(A) + tzah",
      "Δt = " + x.tpB + " + " + x.tvB + " + " + x.tpA + " + " + x.tzah,
      "Δt = " + _r(val, 3) + " s",
      verd
    ]};
  },
  gen: function () { return { tpB: _pick([0.04, 0.06, 0.08]), tvB: _pick([0.1, 0.15, 0.2]), tpA: _pick([0.04, 0.06, 0.08]), tzah: _pick([0.1, 0.12, 0.15]) }; }
},
{
  id: "th", lec: 13, group: "MTH",
  title: "MTH sabr vaqtini tanlash",
  formula: "th(A) = th(B) + Δt",
  ref: "13.11-formula",
  v: [
    { k: "thB", label: "th(B) — keyingi himoyaning sabr vaqti, s", d: 0.5 },
    { k: "dt", label: "Δt — vaqt pog'onasi, s", d: 0.5 }
  ],
  run: function (x) {
    var val = x.thB + x.dt;
    return { value: _r(val, 2), unit: "s", steps: [
      "th(A) = th(B) + Δt",
      "th(A) = " + x.thB + " + " + x.dt,
      "th(A) = " + _r(val, 2) + " s"
    ]};
  },
  gen: function () { return { thB: _pick([0.3, 0.5, 0.8, 1.0]), dt: _pick([0.35, 0.4, 0.5, 0.6]) }; }
},
{
  id: "uri", lec: 14, group: "Kuchlanish",
  title: "Kuchlanish relesining ishlash kuchlanishi",
  formula: "Uri = Uish.min / (ksoz · kqay · KU)",
  ref: "14.2a-formula",
  note: "kqay = 1,1-1,25; ksoz = 1,1-1,2; Uish.min — motorlar o'z-o'zidan ishga tushishidagi qoldiq kuchlanish.",
  v: [
    { k: "Uish", label: "Uish.min — minimal ish kuchlanishi, kV", d: 6.3 },
    { k: "ksoz", label: "ksoz", d: 1.15 },
    { k: "kqay", label: "kqay", d: 1.15 },
    { k: "KU", label: "KU — KT transformatsiya koeffitsienti", d: 60, hint: "Masalan 6000/100 = 60" }
  ],
  run: function (x) {
    var U = x.Uish * 1000;
    var val = U / (x.ksoz * x.kqay * x.KU);
    return { value: _r(val), unit: "V", steps: [
      "Uri = Uish.min / (ksoz · kqay · KU)",
      "Uish.min = " + x.Uish + " kV = " + U + " V",
      "Uri = " + U + " / (" + x.ksoz + " · " + x.kqay + " · " + x.KU + ")",
      "Uri = " + U + " / " + _r(x.ksoz * x.kqay * x.KU, 3),
      "Uri = " + _r(val) + " V"
    ]};
  },
  gen: function () { return { Uish: _pick([6.3, 10.5, 6.0]), ksoz: _pick([1.1, 1.15, 1.2]), kqay: _pick([1.1, 1.15, 1.25]), KU: _pick([60, 100, 105]) }; }
},
{
  id: "uhi", lec: 14, group: "Kuchlanish",
  title: "Kuchlanish organining o'rnatmasi (birlamchi)",
  formula: "Uhi = Uish.min / (ksoz · kqay)",
  ref: "14.2-formula",
  v: [
    { k: "Uish", label: "Uish.min — minimal ish kuchlanishi, kV", d: 6.3 },
    { k: "ksoz", label: "ksoz", d: 1.15 },
    { k: "kqay", label: "kqay", d: 1.15 }
  ],
  run: function (x) {
    var val = x.Uish / (x.ksoz * x.kqay);
    return { value: _r(val, 3), unit: "kV", steps: [
      "Uhi = Uish.min / (ksoz · kqay)",
      "Uhi = " + x.Uish + " / (" + x.ksoz + " · " + x.kqay + ")",
      "Uhi = " + _r(val, 3) + " kV"
    ]};
  },
  gen: function () { return { Uish: _pick([6.3, 10.5]), ksoz: _pick([1.1, 1.2]), kqay: _pick([1.1, 1.25]) }; }
},
{
  id: "ihikuch", lec: 14, group: "Kuchlanish",
  title: "Kuchlanish blokirovkali MTH ning ishlash toki",
  formula: "Ihi = ksoz · Iish.norm / kqay",
  ref: "14.1-formula",
  note: "Tok relesi Iyuk.max dan emas, normal rejim toki Iish.norm dan sozlanadi — shuning uchun sezgirligi yuqori.",
  v: [
    { k: "ksoz", label: "ksoz", d: 1.2 },
    { k: "Iish", label: "Iish.norm — normal rejim yuklama toki, A", d: 180 },
    { k: "kqay", label: "kqay", d: 0.85 }
  ],
  run: function (x) {
    var val = x.ksoz * x.Iish / x.kqay;
    return { value: _r(val), unit: "A", steps: [
      "Ihi = ksoz · Iish.norm / kqay",
      "Ihi = " + x.ksoz + " · " + x.Iish + " / " + x.kqay,
      "Ihi = " + _r(val) + " A",
      "Taqqoslang: ko'it hisobga olinmagani uchun bu qiymat oddiy MTH nikidan kichik."
    ]};
  },
  gen: function () { return { ksoz: _pick([1.1, 1.15, 1.2]), Iish: _pick([120, 150, 180, 220]), kqay: _pick([0.8, 0.85]) }; }
},
{
  id: "kesim", lec: 15, group: "Tokli kesim",
  title: "Tokli kesimning ishlash toki",
  formula: "Ihi = ksoz · Iqt(M)max",
  ref: "15.2-formula",
  note: "RT-40 uchun ksoz = 1,2-1,3; RT-80 va RT-90 uchun ksoz = 1,5. Oraliq relesiz sxemada Iqt(M)max ni ka = 1,6-1,8 ga ko'paytiring.",
  v: [
    { k: "ksoz", label: "ksoz — sozlash koeffitsienti", d: 1.25 },
    { k: "Iqt", label: "Iqt(M)max — liniya oxiridagi maks. QT toki, A", d: 2400 },
    { k: "ka", label: "ka — aperiodik koeffitsient (1 yoki 1,6-1,8)", d: 1 }
  ],
  run: function (x) {
    var val = x.ksoz * x.Iqt * x.ka;
    var s = ["Ihi = ksoz · Iqt(M)max" + (x.ka !== 1 ? " · ka" : "")];
    if (x.ka !== 1) s.push("Nodavriy tashkil etuvchi hisobga olinadi: ka = " + x.ka);
    s.push("Ihi = " + x.ksoz + " · " + x.Iqt + (x.ka !== 1 ? " · " + x.ka : ""));
    s.push("Ihi = " + _r(val) + " A");
    return { value: _r(val), unit: "A", steps: s };
  },
  gen: function () { return { ksoz: _pick([1.2, 1.25, 1.3, 1.5]), Iqt: _pick([1500, 2000, 2400, 3000, 3600]), ka: _pick([1, 1.6, 1.8]) }; }
},
{
  id: "kesim-magn", lec: 15, group: "Tokli kesim",
  title: "Kesimni magnitlanish tokining sakrashidan sozlash",
  formula: "Ihi = (3…5) · ΣInom.t",
  ref: "15.2a-formula",
  note: "15.2 va 15.2a bo'yicha olingan qiymatlarning kattasi qabul qilinadi.",
  v: [
    { k: "k", label: "Koeffitsient (3…5)", d: 4 },
    { k: "In", label: "ΣInom.t — transformatorlarning umumiy nominal toki, A", d: 120 }
  ],
  run: function (x) {
    var val = x.k * x.In;
    return { value: _r(val), unit: "A", steps: [
      "Ihi = (3…5) · ΣInom.t",
      "Ihi = " + x.k + " · " + x.In,
      "Ihi = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { k: _pick([3, 4, 5]), In: _pick([80, 100, 120, 160, 200]) }; }
},
{
  id: "kesim-zona", lec: 15, group: "Tokli kesim",
  title: "Kesim zonasi (foizda)",
  formula: "xkes% = (100 / xl) · (Et / Ihi − xt)",
  ref: "15.3-formula",
  note: "PUE bo'yicha kesim liniyaning kamida 20 % ini qamrasa qo'llash tavsiya etiladi.",
  v: [
    { k: "Et", label: "Et — ekvivalent EYuK, V", d: 63500 },
    { k: "Ihi", label: "Ihi — kesimning ishlash toki, A", d: 4000 },
    { k: "xt", label: "xt — EET qarshiligi, Om", d: 8 },
    { k: "xl", label: "xl — liniya qarshiligi, Om", d: 12 }
  ],
  run: function (x) {
    var z = x.Et / x.Ihi, val = 100 / x.xl * (z - x.xt);
    var verd = val >= 100 ? "Hisob 100 % dan katta chiqdi — bunday o'rnatmada kesim zonasi butun liniyadan tashqariga chiqadi, ya'ni selektivlik buziladi. Ihi ni oshiring."
             : val >= 20 ? "Zona 20 % dan katta — PUE bo'yicha kesimni qo'llash tavsiya etiladi."
             : val > 0 ? "Zona 20 % dan kichik — kesim faqat qo'shimcha himoya sifatida ishlatiladi."
             : "Zona manfiy — bunday Ihi da kesim umuman ishlamaydi.";
    return { value: _r(val, 1), unit: "%", steps: [
      "xkes% = (100 / xl) · (Et / Ihi − xt)",
      "Et / Ihi = " + x.Et + " / " + x.Ihi + " = " + _r(z, 3) + " Om",
      _r(z, 3) + " − " + x.xt + " = " + _r(z - x.xt, 3) + " Om",
      "xkes% = 100 / " + x.xl + " · " + _r(z - x.xt, 3) + " = " + _r(val, 1) + " %",
      verd
    ]};
  },
  gen: function () { return { Et: _pick([63500, 37000, 115000]), Ihi: _pick([1500, 2000, 3000, 4000]), xt: _pick([4, 6, 8, 10]), xl: _pick([8, 10, 12, 15]) }; }
},
{
  id: "iqt-masofa", lec: 15, group: "Tokli kesim",
  title: "QT tokini masofaga bog'liq hisoblash",
  formula: "Iqt = Et / (xt + x0 · ll.q)",
  ref: "15.1-formula",
  v: [
    { k: "Et", label: "Et — ekvivalent EYuK, V", d: 63500 },
    { k: "xt", label: "xt — EET qarshiligi, Om", d: 8 },
    { k: "x0", label: "x0 — solishtirma qarshilik, Om/km", d: 0.4 },
    { k: "l", label: "ll.q — QT nuqtasigacha masofa, km", d: 20 }
  ],
  run: function (x) {
    var z = x.xt + x.x0 * x.l, val = x.Et / z;
    return { value: _r(val), unit: "A", steps: [
      "Iqt = Et / (xt + x0 · ll.q)",
      "x = " + x.xt + " + " + x.x0 + " · " + x.l + " = " + _r(z, 3) + " Om",
      "Iqt = " + x.Et + " / " + _r(z, 3),
      "Iqt = " + _r(val) + " A"
    ]};
  },
  gen: function () { return { Et: _pick([63500, 37000]), xt: _pick([4, 6, 8]), x0: _pick([0.35, 0.4, 0.42]), l: _pick([5, 10, 20, 30, 40]) }; }
},
{
  id: "ksx-calc", lec: 6, group: "TT",
  title: "Sxema koeffitsienti bo'yicha reledagi tok",
  formula: "Ir = ksx · If",
  ref: "6.2-formula",
  note: "Yulduz: ksx = 1. Uchburchak-yulduz va toklar farqi: ksx = √3 ≈ 1,732.",
  v: [
    { k: "ksx", label: "ksx — sxema koeffitsienti", d: 1.732 },
    { k: "If", label: "If — faza toki (ikkilamchi), A", d: 5 }
  ],
  run: function (x) {
    var val = x.ksx * x.If;
    return { value: _r(val, 3), unit: "A", steps: [
      "Ir = ksx · If",
      "Ir = " + x.ksx + " · " + x.If,
      "Ir = " + _r(val, 3) + " A"
    ]};
  },
  gen: function () { return { ksx: _pick([1, 1.732]), If: _pick([1, 2, 3, 4, 5]) }; }
},
{
  id: "ksez-u", lec: 14, group: "Kuchlanish",
  title: "Kuchlanish organining sezgirligi",
  formula: "ksez = Uhi / Uqt.max",
  ref: "14-ma'ruza",
  note: "ksez ≥ 1,2 ruxsat etiladi.",
  v: [
    { k: "Uhi", label: "Uhi — kuchlanish organining o'rnatmasi, kV", d: 4.8 },
    { k: "Uqt", label: "Uqt.max — zona oxiridagi qoldiq kuchlanish, kV", d: 3.5 }
  ],
  run: function (x) {
    var val = x.Uhi / x.Uqt;
    return { value: _r(val), unit: "", steps: [
      "ksez = Uhi / Uqt.max",
      "ksez = " + x.Uhi + " / " + x.Uqt,
      "ksez = " + _r(val),
      val >= 1.2 ? "ksez ≥ 1,2 — talab bajarildi." : "ksez < 1,2 — sezgirlik yetarli emas."
    ]};
  },
  gen: function () { return { Uhi: _pick([4.2, 4.8, 5.5, 7.0]), Uqt: _pick([2.8, 3.0, 3.5, 4.0]) }; }
}
];
