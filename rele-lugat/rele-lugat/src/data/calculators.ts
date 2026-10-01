import type { Calculator, L10n } from "../types";

/* Yordamchilar */
const r = (x: number, n = 2) => Math.round(x * 10 ** n) / 10 ** n;
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

const G = {
  ocp: { uz: "MTH", ru: "МТЗ", en: "OCP" } satisfies L10n,
  volt: { uz: "Kuchlanish", ru: "Напряжение", en: "Voltage" } satisfies L10n,
  cut: { uz: "Tokli kesim", ru: "Токовая отсечка", en: "Current cut-off" } satisfies L10n,
  ct: { uz: "TT", ru: "ТТ", en: "CT" } satisfies L10n,
};

/** Hisoblagichlar. Formulalar ma'ruzadagi belgilar bilan — tarjima qilinmaydi. */
export const CALCULATORS: Calculator[] = [
  {
    id: "ihi-qaytish", lec: 13, group: G.ocp,
    formula: "Ihi = (ksoz · ko'it / kqay) · Iish.max",
    ref: "13.2",
    title: {
      uz: "MTH ishlash toki — qaytish sharti",
      ru: "Ток срабатывания МТЗ — условие возврата",
      en: "OCP pickup current — reset condition",
    },
    note: {
      uz: "Birinchi shart: tashqi QT o'chirilgandan so'ng MTH Iyuk.max da ishonchli qaytishi kerak.",
      ru: "Первое условие: после отключения внешнего КЗ МТЗ должна надёжно вернуться при Iнагр.max.",
      en: "First condition: after an external fault is cleared, the OCP must reliably reset at maximum load current.",
    },
    v: [
      {
        k: "ksoz", d: 1.2,
        label: { uz: "ksoz — sozlash koeffitsienti", ru: "kотс — коэффициент отстройки", en: "kset — setting factor" },
        hint: {
          uz: "RT-40, RT-80 va statik relelar uchun 1,1-1,2",
          ru: "Для РТ-40, РТ-80 и статических реле 1,1-1,2",
          en: "1.1-1.2 for RT-40, RT-80 and static relays",
        },
      },
      {
        k: "koit", d: 2,
        label: { uz: "ko'it — o'z-o'zidan ishga tushish koeff.", ru: "kс.з — коэффициент самозапуска", en: "kself — self-starting factor" },
        hint: {
          uz: "Motorlar ko'p bo'lsa 3-6, kam bo'lsa 1,5-2",
          ru: "При большом числе двигателей 3-6, при малом 1,5-2",
          en: "3-6 where motors dominate, 1.5-2 where they are few",
        },
      },
      {
        k: "kqay", d: 0.85,
        label: { uz: "kqay — qaytish koeffitsienti", ru: "kв — коэффициент возврата", en: "kres — reset ratio" },
        hint: { uz: "RT-40 da 0,8-0,85", ru: "У РТ-40 0,8-0,85", en: "0.8-0.85 for the RT-40" },
      },
      {
        k: "Iish", d: 200,
        label: { uz: "Iish.max — maksimal ishchi tok, A", ru: "Iраб.max — максимальный рабочий ток, А", en: "Iwork.max — maximum working current, A" },
      },
    ],
    run: (x) => {
      const val = (x.ksoz * x.koit) / x.kqay * x.Iish;
      return {
        value: r(val), unit: "A",
        steps: [
          "Ihi = ksoz · ko'it / kqay · Iish.max",
          `Ihi = ${x.ksoz} · ${x.koit} / ${x.kqay} · ${x.Iish}`,
          `Ihi = ${r((x.ksoz * x.koit) / x.kqay, 3)} · ${x.Iish}`,
          `Ihi = ${r(val)} A`,
        ],
      };
    },
    gen: () => ({
      ksoz: pick([1.1, 1.15, 1.2]),
      koit: pick([1.5, 2, 3, 4]),
      kqay: pick([0.8, 0.85]),
      Iish: pick([100, 150, 200, 250, 300]),
    }),
  },

  {
    id: "ihi-yuklama", lec: 13, group: G.ocp,
    formula: "Ihi = ksoz · Iyuk.max",
    ref: "13.4",
    title: {
      uz: "MTH ishlash toki — yuklamadan sozlash",
      ru: "Ток срабатывания МТЗ — отстройка от нагрузки",
      en: "OCP pickup current — set from load",
    },
    note: {
      uz: "Ikkinchi shart: himoya Iyuk.max da ishlamasligi kerak.",
      ru: "Второе условие: защита не должна срабатывать при Iнагр.max.",
      en: "Second condition: the protection must not operate at maximum load current.",
    },
    v: [
      {
        k: "ksoz", d: 1.2,
        label: { uz: "ksoz — sozlash koeffitsienti", ru: "kотс — коэффициент отстройки", en: "kset — setting factor" },
      },
      {
        k: "Iyuk", d: 300,
        label: { uz: "Iyuk.max — maksimal yuklama toki, A", ru: "Iнагр.max — максимальный ток нагрузки, А", en: "Iload.max — maximum load current, A" },
        hint: { uz: "Iyuk.max = ko'it · Iish.max", ru: "Iнагр.max = kс.з · Iраб.max", en: "Iload.max = kself · Iwork.max" },
      },
    ],
    run: (x) => {
      const val = x.ksoz * x.Iyuk;
      return {
        value: r(val), unit: "A",
        steps: ["Ihi = ksoz · Iyuk.max", `Ihi = ${x.ksoz} · ${x.Iyuk}`, `Ihi = ${r(val)} A`],
      };
    },
    gen: () => ({ ksoz: pick([1.1, 1.15, 1.2]), Iyuk: pick([200, 300, 350, 400, 500]) }),
  },

  {
    id: "ihi-zau", lec: 13, group: G.ocp,
    formula: "Ihi = ksoz · (Iish.max.W1 + Iish.max.W2 · ko'it)",
    ref: "13.5",
    title: {
      uz: "MTH ishlash toki — ZAU dan keyingi rejim",
      ru: "Ток срабатывания МТЗ — режим после АВР",
      en: "OCP pickup current — after transfer of reserve",
    },
    note: {
      uz: "W2 o'chgandan so'ng ZAU W1 liniyadan qo'shimcha yuklamaga kuchlanish beradi va o'z-o'zidan ishga tushish boshlanadi.",
      ru: "После отключения W2 АВР подаёт напряжение на дополнительную нагрузку от W1 и начинается самозапуск.",
      en: "After W2 trips, the transfer scheme feeds the extra load from W1 and motor self-starting begins.",
    },
    v: [
      { k: "ksoz", d: 1.2, label: { uz: "ksoz — sozlash koeffitsienti", ru: "kотс — коэффициент отстройки", en: "kset — setting factor" } },
      { k: "I1", d: 150, label: { uz: "Iish.max.W1 — W1 ishchi toki, A", ru: "Iраб.max.W1 — рабочий ток W1, А", en: "Iwork.max.W1 — W1 working current, A" } },
      { k: "I2", d: 100, label: { uz: "Iish.max.W2 — W2 ishchi toki, A", ru: "Iраб.max.W2 — рабочий ток W2, А", en: "Iwork.max.W2 — W2 working current, A" } },
      { k: "koit", d: 3, label: { uz: "ko'it — o'z-o'zidan ishga tushish koeff.", ru: "kс.з — коэффициент самозапуска", en: "kself — self-starting factor" } },
    ],
    run: (x) => {
      const inner = x.I1 + x.I2 * x.koit;
      const val = x.ksoz * inner;
      return {
        value: r(val), unit: "A",
        steps: [
          "Ihi = ksoz · (Iish.max.W1 + Iish.max.W2 · ko'it)",
          `Iyuk.max = ${x.I1} + ${x.I2} · ${x.koit} = ${r(inner)} A`,
          `Ihi = ${x.ksoz} · ${r(inner)}`,
          `Ihi = ${r(val)} A`,
        ],
      };
    },
    gen: () => ({
      ksoz: pick([1.1, 1.2]),
      I1: pick([100, 120, 150, 180]),
      I2: pick([60, 80, 100]),
      koit: pick([1.5, 2, 3, 4]),
    }),
  },

  {
    id: "iri", lec: 13, group: G.ocp,
    formula: "Iri = ksx · Ihi / KI",
    ref: "13.6",
    title: {
      uz: "Releni ikkilamchi ishlash toki",
      ru: "Вторичный ток срабатывания реле",
      en: "Relay secondary pickup current",
    },
    note: {
      uz: "ksx: yulduz (to'liq va to'liq bo'lmagan) uchun 1; ikki faza tokining ayirmasiga ulangan sxema uchun √3.",
      ru: "kсх: для звезды (полной и неполной) 1; для схемы разности токов двух фаз √3.",
      en: "ksch: 1 for star (full and incomplete); √3 for the two-phase current-difference scheme.",
    },
    v: [
      {
        k: "ksx", d: 1,
        label: { uz: "ksx — sxema koeffitsienti", ru: "kсх — коэффициент схемы", en: "ksch — scheme factor" },
        hint: { uz: "1 yoki 1,732 (√3)", ru: "1 или 1,732 (√3)", en: "1 or 1.732 (√3)" },
      },
      { k: "Ihi", d: 420, label: { uz: "Ihi — himoyaning ishlash toki, A", ru: "Iс.з — ток срабатывания защиты, А", en: "Iop — protection pickup current, A" } },
      {
        k: "KI", d: 60,
        label: { uz: "KI — TT transformatsiya koeffitsienti", ru: "KI — коэффициент трансформации ТТ", en: "KI — CT ratio" },
        hint: { uz: "Masalan 300/5 = 60", ru: "Например 300/5 = 60", en: "For example 300/5 = 60" },
      },
    ],
    run: (x) => {
      const val = (x.ksx * x.Ihi) / x.KI;
      return {
        value: r(val), unit: "A",
        steps: ["Iri = ksx · Ihi / KI", `Iri = ${x.ksx} · ${x.Ihi} / ${x.KI}`, `Iri = ${r(val)} A`],
      };
    },
    gen: () => ({ ksx: pick([1, 1.732]), Ihi: pick([300, 420, 500, 600]), KI: pick([20, 40, 60, 80, 100]) }),
  },

  {
    id: "ksez", lec: 13, group: G.ocp,
    formula: "ksez = Iqt.min / Ihi",
    ref: "13.7",
    title: { uz: "Sezgirlik koeffitsienti", ru: "Коэффициент чувствительности", en: "Sensitivity factor" },
    note: {
      uz: "Himoya qilinadigan liniya uchun ksez > 1,5; zahira uchastkada ksez > 1,2 bo'lishi kerak.",
      ru: "Для защищаемой линии kч > 1,5; на резервируемом участке kч > 1,2.",
      en: "For the protected line ksens > 1.5; in the backup section ksens > 1.2.",
    },
    v: [
      { k: "Iqt", d: 900, label: { uz: "Iqt.min — minimal QT toki, A", ru: "Iкз.min — минимальный ток КЗ, А", en: "Isc.min — minimum fault current, A" } },
      { k: "Ihi", d: 420, label: { uz: "Ihi — himoyaning ishlash toki, A", ru: "Iс.з — ток срабатывания защиты, А", en: "Iop — protection pickup current, A" } },
    ],
    run: (x) => {
      const val = x.Iqt / x.Ihi;
      const verdict: L10n =
        val > 1.5
          ? { uz: "ksez > 1,5 — asosiy zona uchun yetarli.", ru: "kч > 1,5 — достаточно для основной зоны.", en: "ksens > 1.5 — sufficient for the main zone." }
          : val > 1.2
            ? { uz: "1,2 < ksez < 1,5 — faqat zahira uchastka uchun yetarli.", ru: "1,2 < kч < 1,5 — достаточно лишь для резервируемого участка.", en: "1.2 < ksens < 1.5 — enough only for the backup section." }
            : { uz: "ksez < 1,2 — yetarli emas, Ihi ni kamaytirish kerak.", ru: "kч < 1,2 — недостаточно, нужно уменьшить Iс.з.", en: "ksens < 1.2 — insufficient; the pickup current must be reduced." };
      return {
        value: r(val), unit: "", verdict,
        steps: ["ksez = Iqt.min / Ihi", `ksez = ${x.Iqt} / ${x.Ihi}`, `ksez = ${r(val)}`],
      };
    },
    gen: () => ({ Iqt: pick([600, 750, 900, 1100, 1400]), Ihi: pick([300, 400, 500, 620]) }),
  },

  {
    id: "dt", lec: 13, group: G.ocp,
    formula: "Δt = tp(B) + tv(B) + tp(A) + tzah",
    ref: "13.9",
    title: { uz: "Vaqt pog'onasi Δt", ru: "Ступень времени Δt", en: "Time step Δt" },
    note: {
      uz: "Mustaqil xarakteristikali MTH da Δt = 0,35-0,6 s; bog'liq xarakteristikalilarda 0,6-1 s (u yerda ti ham qo'shiladi).",
      ru: "У МТЗ с независимой характеристикой Δt = 0,35-0,6 с; с зависимой — 0,6-1 с (там добавляется tи).",
      en: "For definite-time OCP Δt = 0.35-0.6 s; for inverse-time, 0.6-1 s (the overtravel time is added there).",
    },
    v: [
      { k: "tpB", d: 0.06, label: { uz: "tp(B) — B vaqt relesi xatoligi, s", ru: "tп(B) — погрешность реле времени B, с", en: "terr(B) — time-relay error, s" } },
      { k: "tvB", d: 0.15, label: { uz: "tv(B) — o'chirgichning uzish vaqti, s", ru: "tв(B) — время отключения выключателя, с", en: "tbrk(B) — breaker interrupting time, s" } },
      { k: "tpA", d: 0.06, label: { uz: "tp(A) — A vaqt relesi xatoligi, s", ru: "tп(A) — погрешность реле времени A, с", en: "terr(A) — time-relay error, s" } },
      { k: "tzah", d: 0.13, label: { uz: "tzah — zahira vaqti, s", ru: "tзап — время запаса, с", en: "tmargin — margin time, s" } },
    ],
    run: (x) => {
      const val = x.tpB + x.tvB + x.tpA + x.tzah;
      const ok = val >= 0.35 && val <= 0.6;
      return {
        value: r(val, 3), unit: "s",
        verdict: ok
          ? { uz: "Natija mustaqil xarakteristikali MTH uchun odatiy oraliqda (0,35-0,6 s).", ru: "Результат в типичном диапазоне для МТЗ с независимой характеристикой (0,35-0,6 с).", en: "The result lies in the usual 0.35-0.6 s range for definite-time OCP." }
          : { uz: "Diqqat: qiymat mustaqil MTH uchun odatiy 0,35-0,6 s oralig'idan tashqarida.", ru: "Внимание: значение вне типичного диапазона 0,35-0,6 с.", en: "Note: the value lies outside the usual 0.35-0.6 s range." },
        steps: [
          "Δt = tp(B) + tv(B) + tp(A) + tzah",
          `Δt = ${x.tpB} + ${x.tvB} + ${x.tpA} + ${x.tzah}`,
          `Δt = ${r(val, 3)} s`,
        ],
      };
    },
    gen: () => ({
      tpB: pick([0.04, 0.06, 0.08]),
      tvB: pick([0.1, 0.15, 0.2]),
      tpA: pick([0.04, 0.06, 0.08]),
      tzah: pick([0.1, 0.12, 0.15]),
    }),
  },

  {
    id: "th", lec: 13, group: G.ocp,
    formula: "th(A) = th(B) + Δt",
    ref: "13.11",
    title: { uz: "MTH sabr vaqtini tanlash", ru: "Выбор выдержки времени МТЗ", en: "Choosing the OCP delay" },
    v: [
      { k: "thB", d: 0.5, label: { uz: "th(B) — keyingi himoyaning sabr vaqti, s", ru: "tз(B) — выдержка последующей защиты, с", en: "tp(B) — next protection's delay, s" } },
      { k: "dt", d: 0.5, label: { uz: "Δt — vaqt pog'onasi, s", ru: "Δt — ступень времени, с", en: "Δt — time step, s" } },
    ],
    run: (x) => {
      const val = x.thB + x.dt;
      return {
        value: r(val, 2), unit: "s",
        steps: ["th(A) = th(B) + Δt", `th(A) = ${x.thB} + ${x.dt}`, `th(A) = ${r(val, 2)} s`],
      };
    },
    gen: () => ({ thB: pick([0.3, 0.5, 0.8, 1.0]), dt: pick([0.35, 0.4, 0.5, 0.6]) }),
  },

  {
    id: "uri", lec: 14, group: G.volt,
    formula: "Uri = Uish.min / (ksoz · kqay · KU)",
    ref: "14.2a",
    title: {
      uz: "Kuchlanish relesining ishlash kuchlanishi",
      ru: "Напряжение срабатывания реле напряжения",
      en: "Voltage relay pickup voltage",
    },
    note: {
      uz: "kqay = 1,1-1,25; ksoz = 1,1-1,2; Uish.min — motorlar o'z-o'zidan ishga tushishidagi qoldiq kuchlanish.",
      ru: "kв = 1,1-1,25; kотс = 1,1-1,2; Uраб.min — остаточное напряжение при самозапуске двигателей.",
      en: "kres = 1.1-1.25; kset = 1.1-1.2; Umin is the residual voltage during motor self-starting.",
    },
    v: [
      { k: "Uish", d: 6.3, label: { uz: "Uish.min — minimal ish kuchlanishi, kV", ru: "Uраб.min — минимальное рабочее напряжение, кВ", en: "Umin — minimum working voltage, kV" } },
      { k: "ksoz", d: 1.15, label: { uz: "ksoz", ru: "kотс", en: "kset" } },
      { k: "kqay", d: 1.15, label: { uz: "kqay", ru: "kв", en: "kres" } },
      {
        k: "KU", d: 60,
        label: { uz: "KU — KT transformatsiya koeffitsienti", ru: "KU — коэффициент трансформации ТН", en: "KU — VT ratio" },
        hint: { uz: "Masalan 6000/100 = 60", ru: "Например 6000/100 = 60", en: "For example 6000/100 = 60" },
      },
    ],
    run: (x) => {
      const U = x.Uish * 1000;
      const val = U / (x.ksoz * x.kqay * x.KU);
      return {
        value: r(val), unit: "V",
        steps: [
          "Uri = Uish.min / (ksoz · kqay · KU)",
          `Uish.min = ${x.Uish} kV = ${U} V`,
          `Uri = ${U} / (${x.ksoz} · ${x.kqay} · ${x.KU})`,
          `Uri = ${U} / ${r(x.ksoz * x.kqay * x.KU, 3)}`,
          `Uri = ${r(val)} V`,
        ],
      };
    },
    gen: () => ({
      Uish: pick([6.3, 10.5, 6.0]),
      ksoz: pick([1.1, 1.15, 1.2]),
      kqay: pick([1.1, 1.15, 1.25]),
      KU: pick([60, 100, 105]),
    }),
  },

  {
    id: "uhi", lec: 14, group: G.volt,
    formula: "Uhi = Uish.min / (ksoz · kqay)",
    ref: "14.2",
    title: {
      uz: "Kuchlanish organining o'rnatmasi (birlamchi)",
      ru: "Уставка органа напряжения (первичная)",
      en: "Voltage element setting (primary)",
    },
    v: [
      { k: "Uish", d: 6.3, label: { uz: "Uish.min — minimal ish kuchlanishi, kV", ru: "Uраб.min — минимальное рабочее напряжение, кВ", en: "Umin — minimum working voltage, kV" } },
      { k: "ksoz", d: 1.15, label: { uz: "ksoz", ru: "kотс", en: "kset" } },
      { k: "kqay", d: 1.15, label: { uz: "kqay", ru: "kв", en: "kres" } },
    ],
    run: (x) => {
      const val = x.Uish / (x.ksoz * x.kqay);
      return {
        value: r(val, 3), unit: "kV",
        steps: ["Uhi = Uish.min / (ksoz · kqay)", `Uhi = ${x.Uish} / (${x.ksoz} · ${x.kqay})`, `Uhi = ${r(val, 3)} kV`],
      };
    },
    gen: () => ({ Uish: pick([6.3, 10.5]), ksoz: pick([1.1, 1.2]), kqay: pick([1.1, 1.25]) }),
  },

  {
    id: "ihikuch", lec: 14, group: G.volt,
    formula: "Ihi = ksoz · Iish.norm / kqay",
    ref: "14.1",
    title: {
      uz: "Kuchlanish blokirovkali MTH ning ishlash toki",
      ru: "Ток срабатывания МТЗ с блокировкой по напряжению",
      en: "Pickup current of voltage-blocked OCP",
    },
    note: {
      uz: "Tok relesi Iyuk.max dan emas, normal rejim toki Iish.norm dan sozlanadi — shuning uchun sezgirligi yuqori.",
      ru: "Реле тока отстраивается не от Iнагр.max, а от тока нормального режима Iраб.норм — отсюда более высокая чувствительность.",
      en: "The current relay is set from the normal-mode current rather than the maximum load — hence the higher sensitivity.",
    },
    v: [
      { k: "ksoz", d: 1.2, label: { uz: "ksoz", ru: "kотс", en: "kset" } },
      { k: "Iish", d: 180, label: { uz: "Iish.norm — normal rejim yuklama toki, A", ru: "Iраб.норм — ток нагрузки нормального режима, А", en: "Inorm — normal-mode load current, A" } },
      { k: "kqay", d: 0.85, label: { uz: "kqay", ru: "kв", en: "kres" } },
    ],
    run: (x) => {
      const val = (x.ksoz * x.Iish) / x.kqay;
      return {
        value: r(val), unit: "A",
        verdict: {
          uz: "Taqqoslang: ko'it hisobga olinmagani uchun bu qiymat oddiy MTH nikidan kichik.",
          ru: "Сравните: так как kс.з не учитывается, значение меньше, чем у обычной МТЗ.",
          en: "Compare: since the self-starting factor is omitted, this is lower than for plain OCP.",
        },
        steps: ["Ihi = ksoz · Iish.norm / kqay", `Ihi = ${x.ksoz} · ${x.Iish} / ${x.kqay}`, `Ihi = ${r(val)} A`],
      };
    },
    gen: () => ({ ksoz: pick([1.1, 1.15, 1.2]), Iish: pick([120, 150, 180, 220]), kqay: pick([0.8, 0.85]) }),
  },

  {
    id: "ksez-u", lec: 14, group: G.volt,
    formula: "ksez = Uhi / Uqt.max",
    ref: "14",
    title: {
      uz: "Kuchlanish organining sezgirligi",
      ru: "Чувствительность органа напряжения",
      en: "Voltage element sensitivity",
    },
    note: { uz: "ksez ≥ 1,2 ruxsat etiladi.", ru: "Допускается kч ≥ 1,2.", en: "ksens ≥ 1.2 is acceptable." },
    v: [
      { k: "Uhi", d: 4.8, label: { uz: "Uhi — kuchlanish organining o'rnatmasi, kV", ru: "Uс.з — уставка органа напряжения, кВ", en: "Uop — voltage element setting, kV" } },
      { k: "Uqt", d: 3.5, label: { uz: "Uqt.max — zona oxiridagi qoldiq kuchlanish, kV", ru: "Uкз.max — остаточное напряжение в конце зоны, кВ", en: "Usc.max — residual voltage at the zone end, kV" } },
    ],
    run: (x) => {
      const val = x.Uhi / x.Uqt;
      return {
        value: r(val), unit: "",
        verdict: val >= 1.2
          ? { uz: "ksez ≥ 1,2 — talab bajarildi.", ru: "kч ≥ 1,2 — требование выполнено.", en: "ksens ≥ 1.2 — the requirement is met." }
          : { uz: "ksez < 1,2 — sezgirlik yetarli emas.", ru: "kч < 1,2 — чувствительность недостаточна.", en: "ksens < 1.2 — sensitivity is insufficient." },
        steps: ["ksez = Uhi / Uqt.max", `ksez = ${x.Uhi} / ${x.Uqt}`, `ksez = ${r(val)}`],
      };
    },
    gen: () => ({ Uhi: pick([4.2, 4.8, 5.5, 7.0]), Uqt: pick([2.8, 3.0, 3.5, 4.0]) }),
  },

  {
    id: "kesim", lec: 15, group: G.cut,
    formula: "Ihi = ksoz · Iqt(M)max · ka",
    ref: "15.2",
    title: { uz: "Tokli kesimning ishlash toki", ru: "Ток срабатывания токовой отсечки", en: "Cut-off pickup current" },
    note: {
      uz: "RT-40 uchun ksoz = 1,2-1,3; RT-80 va RT-90 uchun ksoz = 1,5. Oraliq relesiz sxemada ka = 1,6-1,8 kiriting.",
      ru: "Для РТ-40 kотс = 1,2-1,3; для РТ-80 и РТ-90 kотс = 1,5. В схеме без промежуточного реле задайте ka = 1,6-1,8.",
      en: "For the RT-40 kset = 1.2-1.3; for RT-80/RT-90, 1.5. Without an auxiliary relay, enter ka = 1.6-1.8.",
    },
    v: [
      { k: "ksoz", d: 1.25, label: { uz: "ksoz — sozlash koeffitsienti", ru: "kотс — коэффициент отстройки", en: "kset — setting factor" } },
      { k: "Iqt", d: 2400, label: { uz: "Iqt(M)max — liniya oxiridagi maks. QT toki, A", ru: "Iкз(M)max — макс. ток КЗ в конце линии, А", en: "Isc(M)max — max fault current at the line end, A" } },
      { k: "ka", d: 1, label: { uz: "ka — aperiodik koeffitsient (1 yoki 1,6-1,8)", ru: "ka — коэффициент апериодической составляющей (1 или 1,6-1,8)", en: "ka — DC-component factor (1 or 1.6-1.8)" } },
    ],
    run: (x) => {
      const val = x.ksoz * x.Iqt * x.ka;
      const steps = [`Ihi = ksoz · Iqt(M)max${x.ka !== 1 ? " · ka" : ""}`];
      if (x.ka !== 1) steps.push(`ka = ${x.ka}`);
      steps.push(`Ihi = ${x.ksoz} · ${x.Iqt}${x.ka !== 1 ? ` · ${x.ka}` : ""}`);
      steps.push(`Ihi = ${r(val)} A`);
      return { value: r(val), unit: "A", steps };
    },
    gen: () => ({ ksoz: pick([1.2, 1.25, 1.3, 1.5]), Iqt: pick([1500, 2000, 2400, 3000, 3600]), ka: pick([1, 1.6, 1.8]) }),
  },

  {
    id: "kesim-magn", lec: 15, group: G.cut,
    formula: "Ihi = (3…5) · ΣInom.t",
    ref: "15.2a",
    title: {
      uz: "Kesimni magnitlanish tokining sakrashidan sozlash",
      ru: "Отстройка отсечки от броска тока намагничивания",
      en: "Setting the cut-off above the inrush current",
    },
    note: {
      uz: "15.2 va 15.2a bo'yicha olingan qiymatlarning kattasi qabul qilinadi.",
      ru: "Принимается большее из значений по 15.2 и 15.2а.",
      en: "The larger of the values from 15.2 and 15.2a is adopted.",
    },
    v: [
      { k: "k", d: 4, label: { uz: "Koeffitsient (3…5)", ru: "Коэффициент (3…5)", en: "Factor (3…5)" } },
      { k: "In", d: 120, label: { uz: "ΣInom.t — transformatorlarning umumiy nominal toki, A", ru: "ΣIном.т — суммарный номинальный ток трансформаторов, А", en: "ΣIrated.t — total transformer rated current, A" } },
    ],
    run: (x) => {
      const val = x.k * x.In;
      return { value: r(val), unit: "A", steps: ["Ihi = (3…5) · ΣInom.t", `Ihi = ${x.k} · ${x.In}`, `Ihi = ${r(val)} A`] };
    },
    gen: () => ({ k: pick([3, 4, 5]), In: pick([80, 100, 120, 160, 200]) }),
  },

  {
    id: "kesim-zona", lec: 15, group: G.cut,
    formula: "xkes% = (100 / xl) · (Et / Ihi − xt)",
    ref: "15.3",
    title: { uz: "Kesim zonasi (foizda)", ru: "Зона отсечки (в процентах)", en: "Cut-off reach (per cent)" },
    note: {
      uz: "PUE bo'yicha kesim liniyaning kamida 20 % ini qamrasa qo'llash tavsiya etiladi.",
      ru: "По ПУЭ отсечку рекомендуют, если она охватывает не менее 20 % линии.",
      en: "The regulations recommend a cut-off when it covers at least 20 % of the line.",
    },
    v: [
      { k: "Et", d: 63500, label: { uz: "Et — ekvivalent EYuK, V", ru: "Eс — эквивалентная ЭДС, В", en: "Es — equivalent EMF, V" } },
      { k: "Ihi", d: 4000, label: { uz: "Ihi — kesimning ishlash toki, A", ru: "Iс.з — ток срабатывания отсечки, А", en: "Iop — cut-off pickup current, A" } },
      { k: "xt", d: 8, label: { uz: "xt — EET qarshiligi, Om", ru: "xс — сопротивление ЭЭС, Ом", en: "xs — system impedance, Ω" } },
      { k: "xl", d: 12, label: { uz: "xl — liniya qarshiligi, Om", ru: "xл — сопротивление линии, Ом", en: "xline — line impedance, Ω" } },
    ],
    run: (x) => {
      const z = x.Et / x.Ihi;
      const val = (100 / x.xl) * (z - x.xt);
      const verdict: L10n =
        val >= 100
          ? { uz: "Hisob 100 % dan katta — bunday o'rnatmada zona butun liniyadan tashqariga chiqadi, selektivlik buziladi. Ihi ni oshiring.", ru: "Более 100 % — при такой уставке зона выходит за пределы линии, селективность нарушается. Увеличьте Iс.з.", en: "Over 100 % — the reach extends beyond the line and selectivity is lost. Increase the pickup current." }
          : val >= 20
            ? { uz: "Zona 20 % dan katta — PUE bo'yicha kesimni qo'llash tavsiya etiladi.", ru: "Зона больше 20 % — по ПУЭ отсечку рекомендуют.", en: "The reach exceeds 20 % — a cut-off is recommended." }
            : val > 0
              ? { uz: "Zona 20 % dan kichik — kesim faqat qo'shimcha himoya sifatida ishlatiladi.", ru: "Зона менее 20 % — отсечка применяется лишь как дополнительная защита.", en: "The reach is under 20 % — the cut-off serves only as supplementary protection." }
              : { uz: "Zona manfiy — bunday Ihi da kesim umuman ishlamaydi.", ru: "Зона отрицательна — при такой уставке отсечка вообще не действует.", en: "The reach is negative — at this setting the cut-off never operates." };
      return {
        value: r(val, 1), unit: "%", verdict,
        steps: [
          "xkes% = (100 / xl) · (Et / Ihi − xt)",
          `Et / Ihi = ${x.Et} / ${x.Ihi} = ${r(z, 3)} Om`,
          `${r(z, 3)} − ${x.xt} = ${r(z - x.xt, 3)} Om`,
          `xkes% = 100 / ${x.xl} · ${r(z - x.xt, 3)} = ${r(val, 1)} %`,
        ],
      };
    },
    gen: () => ({ Et: pick([63500, 37000, 115000]), Ihi: pick([2500, 3000, 4000, 5000]), xt: pick([4, 6, 8, 10]), xl: pick([8, 10, 12, 15]) }),
  },

  {
    id: "iqt-masofa", lec: 15, group: G.cut,
    formula: "Iqt = Et / (xt + x0 · ll.q)",
    ref: "15.1",
    title: {
      uz: "QT tokini masofaga bog'liq hisoblash",
      ru: "Расчёт тока КЗ в зависимости от расстояния",
      en: "Fault current versus distance",
    },
    v: [
      { k: "Et", d: 63500, label: { uz: "Et — ekvivalent EYuK, V", ru: "Eс — эквивалентная ЭДС, В", en: "Es — equivalent EMF, V" } },
      { k: "xt", d: 8, label: { uz: "xt — EET qarshiligi, Om", ru: "xс — сопротивление ЭЭС, Ом", en: "xs — system impedance, Ω" } },
      { k: "x0", d: 0.4, label: { uz: "x0 — solishtirma qarshilik, Om/km", ru: "x0 — удельное сопротивление, Ом/км", en: "x0 — impedance per km, Ω/km" } },
      { k: "l", d: 20, label: { uz: "ll.q — QT nuqtasigacha masofa, km", ru: "lкз — расстояние до точки КЗ, км", en: "lfault — distance to the fault, km" } },
    ],
    run: (x) => {
      const z = x.xt + x.x0 * x.l;
      const val = x.Et / z;
      return {
        value: r(val), unit: "A",
        steps: [
          "Iqt = Et / (xt + x0 · ll.q)",
          `x = ${x.xt} + ${x.x0} · ${x.l} = ${r(z, 3)} Om`,
          `Iqt = ${x.Et} / ${r(z, 3)}`,
          `Iqt = ${r(val)} A`,
        ],
      };
    },
    gen: () => ({ Et: pick([63500, 37000]), xt: pick([4, 6, 8]), x0: pick([0.35, 0.4, 0.42]), l: pick([5, 10, 20, 30, 40]) }),
  },

  {
    id: "ksx-calc", lec: 6, group: G.ct,
    formula: "Ir = ksx · If",
    ref: "6.2",
    title: {
      uz: "Sxema koeffitsienti bo'yicha reledagi tok",
      ru: "Ток в реле по коэффициенту схемы",
      en: "Relay current from the scheme factor",
    },
    note: {
      uz: "Yulduz: ksx = 1. Uchburchak-yulduz va toklar farqi: ksx = √3 ≈ 1,732.",
      ru: "Звезда: kсх = 1. Треугольник-звезда и разность токов: kсх = √3 ≈ 1,732.",
      en: "Star: ksch = 1. Delta-star and current-difference: ksch = √3 ≈ 1.732.",
    },
    v: [
      { k: "ksx", d: 1.732, label: { uz: "ksx — sxema koeffitsienti", ru: "kсх — коэффициент схемы", en: "ksch — scheme factor" } },
      { k: "If", d: 5, label: { uz: "If — faza toki (ikkilamchi), A", ru: "Iф — фазный ток (вторичный), А", en: "Iph — phase current (secondary), A" } },
    ],
    run: (x) => {
      const val = x.ksx * x.If;
      return { value: r(val, 3), unit: "A", steps: ["Ir = ksx · If", `Ir = ${x.ksx} · ${x.If}`, `Ir = ${r(val, 3)} A`] };
    },
    gen: () => ({ ksx: pick([1, 1.732]), If: pick([1, 2, 3, 4, 5]) }),
  },
];

export function calcById(id: string): Calculator | undefined {
  return CALCULATORS.find((c) => c.id === id);
}
