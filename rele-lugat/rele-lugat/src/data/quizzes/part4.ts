import type { Quiz } from "../../types";

/** 13-15 ma'ruzalar test savollari. */
export const QUIZ4: Quiz[] = [
  /* ================= 13-MA'RUZA ================= */
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "MTH ning birlamchi ishlash toki qanday tanlanadi?",
      ru: "Как выбирается первичный ток срабатывания МТЗ?",
      en: "How is the OCP primary pickup current chosen?",
    },
    o: [
      { uz: "Faqat 13.2 formuladan", ru: "Только по формуле 13.2", en: "From formula 13.2 only" },
      {
        uz: "13.2 va 13.4 (yoki 13.5) dan olingan qiymatlarning kattasi",
        ru: "Большее из значений по 13.2 и 13.4 (или 13.5)",
        en: "The larger of the values from 13.2 and 13.4 (or 13.5)",
      },
      { uz: "Ularning o'rtachasi", ru: "Их среднее", en: "Their average" },
      { uz: "Faqat Iqt.min dan", ru: "Только по Iкз.min", en: "From the minimum fault current only" },
    ],
    e: {
      uz: "(13.2) va (13.4) yoki (13.5) bo'yicha olingan Ihi ning ikkita qiymatidan katta qiymat olinadi (13-ma'ruza).",
      ru: "Из двух значений Iс.з, полученных по (13.2) и (13.4) или (13.5), принимается большее (лекция 13).",
      en: "Of the two values from (13.2) and (13.4) or (13.5), the larger is adopted (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "RT-40 va RT-80 relelari uchun sozlash koeffitsienti ksoz qancha qabul qilinadi?",
      ru: "Каким принимается коэффициент отстройки для реле РТ-40 и РТ-80?",
      en: "What setting factor is taken for RT-40 and RT-80 relays?",
    },
    o: [
      { uz: "1,0", ru: "1,0", en: "1.0" },
      { uz: "1,1-1,2", ru: "1,1-1,2", en: "1.1-1.2" },
      { uz: "1,5-2", ru: "1,5-2", en: "1.5-2" },
      { uz: "3-6", ru: "3-6", en: "3-6" },
    ],
    e: {
      uz: "RT-40, RT-80 tipidagi va statik relelar uchun ksoz = 1,1-1,2 (13-ma'ruza).",
      ru: "Для реле типа РТ-40, РТ-80 и статических реле kотс = 1,1-1,2 (лекция 13).",
      en: "For RT-40, RT-80 and static relays the setting factor is 1.1-1.2 (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 3,
    q: {
      uz: "Elektr motorlari ko'p bo'lgan yuklamada ko'it qiymati qanday qabul qilinadi?",
      ru: "Каким принимается коэффициент самозапуска при большой доле электродвигателей?",
      en: "What self-starting factor is taken where motors dominate the load?",
    },
    o: [
      { uz: "1,0", ru: "1,0", en: "1.0" },
      { uz: "1,1-1,2", ru: "1,1-1,2", en: "1.1-1.2" },
      { uz: "1,5-2", ru: "1,5-2", en: "1.5-2" },
      { uz: "3-6", ru: "3-6", en: "3-6" },
    ],
    e: {
      uz: "Motorlar soni ko'p bo'lsa ko'it = 3-6, solishtirma qiymati kam bo'lsa 1,5-2 (13-ma'ruza).",
      ru: "При большом числе двигателей kс.з = 3-6, при малой их доле 1,5-2 (лекция 13).",
      en: "With many motors the factor is 3-6; with few, 1.5-2 (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "Releni ikkilamchi ishlash toki qanday aniqlanadi?",
      ru: "Как определяется вторичный ток срабатывания реле?",
      en: "How is the relay's secondary pickup current found?",
    },
    o: [
      { uz: "Iri = Ihi · KI", ru: "Iс.р = Iс.з · KI", en: "Irelay = Iop · KI" },
      { uz: "Iri = ksx · Ihi / KI", ru: "Iс.р = kсх · Iс.з / KI", en: "Irelay = ksch · Iop / KI" },
      { uz: "Iri = Ihi / ksx", ru: "Iс.р = Iс.з / kсх", en: "Irelay = Iop / ksch" },
      { uz: "Iri = ksoz · Ihi", ru: "Iс.р = kотс · Iс.з", en: "Irelay = kset · Iop" },
    ],
    e: {
      uz: "Iri = ksx·Ihi/KI — TT transformatsiya koeffitsienti va sxema koeffitsienti hisobga olinadi (13.6-formula).",
      ru: "Iс.р = kсх·Iс.з/KI — учитываются коэффициент трансформации ТТ и коэффициент схемы (формула 13.6).",
      en: "Irelay = ksch·Iop/KI — the CT ratio and the scheme factor are taken into account (formula 13.6).",
    },
  },
  {
    l: 13, type: "mcq", a: 2,
    q: {
      uz: "Himoya qilinadigan liniya uchun sezgirlik koeffitsienti qanday bo'lishi kerak?",
      ru: "Каким должен быть коэффициент чувствительности для защищаемой линии?",
      en: "What must the sensitivity factor be for the protected line?",
    },
    o: [
      { uz: "ksez > 1,1", ru: "kч > 1,1", en: "ksens > 1.1" },
      { uz: "ksez > 1,2", ru: "kч > 1,2", en: "ksens > 1.2" },
      { uz: "ksez > 1,5", ru: "kч > 1,5", en: "ksens > 1.5" },
      { uz: "ksez > 2,0", ru: "kч > 2,0", en: "ksens > 2.0" },
    ],
    e: {
      uz: "Himoya qilinadigan liniya uchun ksez > 1,5, zahira uchastkada ksez > 1,2 (13-ma'ruza).",
      ru: "Для защищаемой линии kч > 1,5, на резервируемом участке kч > 1,2 (лекция 13).",
      en: "For the protected line ksens > 1.5; in the backup section ksens > 1.2 (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 0,
    q: {
      uz: "Zahira uchastkada QT bo'lganda sezgirlik koeffitsienti qanday bo'lishi kerak?",
      ru: "Каким должен быть коэффициент чувствительности при КЗ на резервируемом участке?",
      en: "What sensitivity factor is required for a fault in the backup section?",
    },
    o: [
      { uz: "ksez > 1,2", ru: "kч > 1,2", en: "ksens > 1.2" },
      { uz: "ksez > 1,5", ru: "kч > 1,5", en: "ksens > 1.5" },
      { uz: "ksez > 2", ru: "kч > 2", en: "ksens > 2" },
      { uz: "ksez > 3", ru: "kч > 3", en: "ksens > 3" },
    ],
    e: {
      uz: "Zaxira uchastkada QT bo'lganda ksez > 1,2 yetarli hisoblanadi (13-ma'ruza).",
      ru: "При КЗ на резервируемом участке достаточно kч > 1,2 (лекция 13).",
      en: "For a fault in the backup section ksens > 1.2 is sufficient (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "Mustaqil xarakteristikali MTH larda vaqt pog'onasi Δt qancha?",
      ru: "Какова ступень времени Δt у МТЗ с независимой характеристикой?",
      en: "What is the time step Δt for definite-time OCP?",
    },
    o: [
      { uz: "0,1-0,2 s", ru: "0,1-0,2 с", en: "0.1-0.2 s" },
      { uz: "0,35-0,6 s", ru: "0,35-0,6 с", en: "0.35-0.6 s" },
      { uz: "0,6-1 s", ru: "0,6-1 с", en: "0.6-1 s" },
      { uz: "1-2 s", ru: "1-2 с", en: "1-2 s" },
    ],
    e: {
      uz: "Mustaqil xarakteristikali MTH larda Δt = 0,35-0,6 s, bog'liq xarakteristikalilarda 0,6-1 s (13-ma'ruza).",
      ru: "У МТЗ с независимой характеристикой Δt = 0,35-0,6 с, с зависимой — 0,6-1 с (лекция 13).",
      en: "For definite-time OCP Δt = 0.35-0.6 s; for inverse-time, 0.6-1 s (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "Tez ishlovchi RH bilan muvofiqlashtirishda Δt qancha bo'ladi?",
      ru: "Какой будет Δt при согласовании с быстродействующей РЗ?",
      en: "What is Δt when coordinating with high-speed protection?",
    },
    o: [
      { uz: "0,2 s", ru: "0,2 с", en: "0.2 s" },
      { uz: "0,35-0,4 s", ru: "0,35-0,4 с", en: "0.35-0.4 s" },
      { uz: "0,6 s", ru: "0,6 с", en: "0.6 s" },
      { uz: "1 s", ru: "1 с", en: "1 s" },
    ],
    e: {
      uz: "tp(B) = 0 qabul qilinsa, Δt = 0,35-0,4 s (13-ma'ruza).",
      ru: "Если принять tп(B) = 0, то Δt = 0,35-0,4 с (лекция 13).",
      en: "Taking the error term as zero gives Δt = 0.35-0.4 s (lecture 13).",
    },
  },
  {
    l: 13, type: "mcq", a: 3,
    q: {
      uz: "Δt ning tarkibiga nima kirmaydi?",
      ru: "Что НЕ входит в состав Δt?",
      en: "What is NOT part of Δt?",
    },
    o: [
      { uz: "tp(B) — vaqt relesi xatoligi", ru: "tп(B) — погрешность реле времени", en: "The time-relay error" },
      {
        uz: "tv(B) — o'chirgichning o'chirilish vaqti",
        ru: "tв(B) — время отключения выключателя",
        en: "The breaker interrupting time",
      },
      { uz: "tzah — zahira", ru: "tзап — запас", en: "The margin time" },
      {
        uz: "TT ning transformatsiya koeffitsienti",
        ru: "Коэффициент трансформации ТТ",
        en: "The CT transformation ratio",
      },
    ],
    e: {
      uz: "Δt = tp(B) + tv(B) + tp(A) + tzah (13.9-formula).",
      ru: "Δt = tп(B) + tв(B) + tп(A) + tзап (формула 13.9).",
      en: "Δt = terr(B) + tbrk(B) + terr(A) + tmargin (formula 13.9).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "Bog'liq xarakteristikali MTH ning Δt siga qo'shimcha ravishda nima qo'shiladi?",
      ru: "Что дополнительно добавляется к Δt для МТЗ с зависимой характеристикой?",
      en: "What extra term is added to Δt for inverse-time OCP?",
    },
    o: [
      { uz: "tzah", ru: "tзап", en: "The margin time" },
      { uz: "ti — inersion xatolik vaqti", ru: "tи — время инерционной погрешности", en: "The inertia (overtravel) time" },
      { uz: "KI", ru: "KI", en: "KI" },
      { uz: "ksoz", ru: "kотс", en: "The setting factor" },
    ],
    e: {
      uz: "Induksion rele QT toki uzilgandan keyin ham inersiya bilan ishlaydi, shuning uchun ti qo'shiladi (13.10-formula).",
      ru: "Индукционное реле продолжает движение по инерции после снятия тока КЗ, поэтому добавляется tи (формула 13.10).",
      en: "The induction relay overtravels after the fault current is removed, so the inertia time is added (formula 13.10).",
    },
  },
  {
    l: 13, type: "mcq", a: 1,
    q: {
      uz: "MTH sabr vaqti qanday tanlanadi?",
      ru: "Как выбирается выдержка времени МТЗ?",
      en: "How is the OCP time delay chosen?",
    },
    o: [
      { uz: "th(A) = th(B) − Δt", ru: "tз(A) = tз(B) − Δt", en: "tp(A) = tp(B) − Δt" },
      { uz: "th(A) = th(B) + Δt", ru: "tз(A) = tз(B) + Δt", en: "tp(A) = tp(B) + Δt" },
      { uz: "th(A) = th(B)", ru: "tз(A) = tз(B)", en: "tp(A) = tp(B)" },
      { uz: "th(A) = Δt", ru: "tз(A) = Δt", en: "tp(A) = Δt" },
    ],
    e: {
      uz: "Manbaga yaqin himoyaning sabr vaqti keyingisidan bir pog'ona vaqtga katta bo'lishi kerak (13.11-formula).",
      ru: "Выдержка защиты, ближней к источнику, должна быть на ступень больше последующей (формула 13.11).",
      en: "The delay of the protection nearer the source must exceed the next one by one step (formula 13.11).",
    },
  },
  {
    l: 13, type: "tf", a: true,
    q: {
      uz: "MTH sezgirligini oshirish uchun kqay yuqori bo'lgan tok relelaridan foydalanish kerak.",
      ru: "Для повышения чувствительности МТЗ следует применять реле тока с высоким коэффициентом возврата.",
      en: "To improve OCP sensitivity one should use current relays with a high reset ratio.",
    },
    e: {
      uz: "kqay qancha yuqori bo'lsa, Ihi shuncha kichik bo'ladi va sezgirlik ortadi (13-ma'ruza).",
      ru: "Чем выше kв, тем меньше Iс.з и тем выше чувствительность (лекция 13).",
      en: "The higher the reset ratio, the lower the pickup current and the better the sensitivity (lecture 13).",
    },
  },

  /* ================= 14-MA'RUZA ================= */
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Kuchlanish organi MTH ga nima uchun qo'shiladi?",
      ru: "Зачем к МТЗ добавляют орган напряжения?",
      en: "Why is a voltage element added to the OCP?",
    },
    o: [
      { uz: "Tezkorlikni oshirish uchun", ru: "Для повышения быстродействия", en: "To increase speed" },
      {
        uz: "Sezgirlikni oshirish va yuklama rejimida ishlashni bloklash uchun",
        ru: "Для повышения чувствительности и блокировки работы в режиме нагрузки",
        en: "To raise sensitivity and block operation under load conditions",
      },
      { uz: "Narxni kamaytirish uchun", ru: "Для снижения стоимости", en: "To reduce cost" },
      { uz: "TT ni almashtirish uchun", ru: "Для замены ТТ", en: "To replace the CT" },
    ],
    e: {
      uz: "Kuchlanish organi QT da ishlashga imkon beradi, maksimal yuklama va o'z-o'zidan ishga tushishda esa bloklaydi (14-ma'ruza).",
      ru: "Орган напряжения разрешает работу при КЗ и блокирует её при максимальной нагрузке и самозапуске (лекция 14).",
      en: "The voltage element permits operation during faults and blocks it under maximum load and motor self-starting (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "KA va KV organlari qanday mantiqiy sxema bo'yicha birlashtiriladi?",
      ru: "По какой логической схеме объединяются органы KA и KV?",
      en: "By which logic are the KA and KV elements combined?",
    },
    o: [
      { uz: "YoKI", ru: "ИЛИ", en: "OR" },
      { uz: "VA", ru: "И", en: "AND" },
      { uz: "EMAS", ru: "НЕ", en: "NOT" },
      { uz: "RS-trigger", ru: "RS-триггер", en: "RS flip-flop" },
    ],
    e: {
      uz: "Kuchlanish o'lchov organi KA relesi bilan birgalikda VA sxemasiga muvofiq vaqt relesini ishga tushiradi (14-ma'ruza).",
      ru: "Орган напряжения совместно с реле KA по схеме И запускает реле времени (лекция 14).",
      en: "The voltage element together with the KA relay starts the time relay through an AND (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Kuchlanish blokirovkali MTH da tok relesi nimadan sozlanadi?",
      ru: "От чего отстраивается реле тока в МТЗ с блокировкой по напряжению?",
      en: "What is the current relay set from in voltage-blocked OCP?",
    },
    o: [
      { uz: "Iyuk.max dan", ru: "От Iнагр.max", en: "From the maximum load current" },
      {
        uz: "Normal rejim yuklama toki Iish.norm dan",
        ru: "От тока нагрузки нормального режима Iраб.норм",
        en: "From the normal-mode load current",
      },
      { uz: "Iqt.min dan", ru: "От Iкз.min", en: "From the minimum fault current" },
      { uz: "Inom dan", ru: "От Iном", en: "From the rated current" },
    ],
    e: {
      uz: "Ihi = ksoz·Iish.norm/kqay — shuning uchun sezgirligi oddiy MTH dan yuqori (14.1-formula).",
      ru: "Iс.з = kотс·Iраб.норм/kв — поэтому чувствительность выше, чем у обычной МТЗ (формула 14.1).",
      en: "Iop = kset·Inorm/kres — hence its sensitivity exceeds that of plain OCP (formula 14.1).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Kuchlanish relesining ishlash kuchlanishi qanday aniqlanadi?",
      ru: "Как определяется напряжение срабатывания реле напряжения?",
      en: "How is the voltage relay's pickup voltage found?",
    },
    o: [
      { uz: "Uri = Uish.min·ksoz·kqay", ru: "Uс.р = Uраб.min·kотс·kв", en: "Urelay = Umin·kset·kres" },
      {
        uz: "Uri = Uish.min/(ksoz·kqay·KU)",
        ru: "Uс.р = Uраб.min/(kотс·kв·KU)",
        en: "Urelay = Umin/(kset·kres·KU)",
      },
      { uz: "Uri = Uqt.max/ksez", ru: "Uс.р = Uкз.max/kч", en: "Urelay = Usc.max/ksens" },
      { uz: "Uri = 0,06·Uish.norm", ru: "Uс.р = 0,06·Uраб.норм", en: "Urelay = 0.06·Unorm" },
    ],
    e: {
      uz: "14.2a-formula: Uri = Uish.min/(ksoz·kqay·KU), bu yerda kqay = 1,1-1,25; ksoz = 1,1-1,2.",
      ru: "Формула 14.2а: Uс.р = Uраб.min/(kотс·kв·KU), где kв = 1,1-1,25; kотс = 1,1-1,2.",
      en: "Formula 14.2a: Urelay = Umin/(kset·kres·KU), where kres = 1.1-1.25 and kset = 1.1-1.2.",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Kuchlanish o'lchov organining sezgirligi qanday baholanadi?",
      ru: "Как оценивается чувствительность органа напряжения?",
      en: "How is the voltage element's sensitivity assessed?",
    },
    o: [
      { uz: "ksez = Iqt.min/Ihi", ru: "kч = Iкз.min/Iс.з", en: "ksens = Isc.min/Iop" },
      { uz: "ksez = Uhi/Uqt.max", ru: "kч = Uс.з/Uкз.max", en: "ksens = Uop/Usc.max" },
      { uz: "ksez = Uqt.max/Uhi", ru: "kч = Uкз.max/Uс.з", en: "ksens = Usc.max/Uop" },
      { uz: "ksez = KU/ksx", ru: "kч = KU/kсх", en: "ksens = KU/ksch" },
    ],
    e: {
      uz: "ksez = Uhi/Uqt.max, bunda ksez ≥ 1,2 ruxsat etiladi (14-ma'ruza).",
      ru: "kч = Uс.з/Uкз.max, при этом допускается kч ≥ 1,2 (лекция 14).",
      en: "ksens = Uop/Usc.max, with ksens ≥ 1.2 acceptable (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Uchta KV relesi qanday kuchlanishga ulanadi?",
      ru: "На какое напряжение включаются три реле KV?",
      en: "To what voltages are the three KV relays connected?",
    },
    o: [
      { uz: "Faza kuchlanishlariga", ru: "На фазные напряжения", en: "To the phase voltages" },
      {
        uz: "Fazalararo kuchlanishlarga (UAB, UBC, UCA)",
        ru: "На линейные напряжения (UAB, UBC, UCA)",
        en: "To the line voltages (UAB, UBC, UCA)",
      },
      { uz: "3U0 ga", ru: "На 3U0", en: "To 3U0" },
      { uz: "Nol simga", ru: "На нулевой провод", en: "To the neutral wire" },
    ],
    e: {
      uz: "Uchta rele fazalararo kuchlanishga ulanadi — shunda har qanday fazalararo QT da kamida bittasi sezilarli kamayadi (14-ma'ruza).",
      ru: "Три реле включают на линейные напряжения — тогда при любом междуфазном КЗ хотя бы одно из них заметно снижается (лекция 14).",
      en: "The three relays are connected to line voltages, so at least one drops markedly for any phase fault (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "KV2 relesining o'rnatmasi nimadan sozlanadi?",
      ru: "От чего отстраивается уставка реле KV2?",
      en: "What is the KV2 relay setting derived from?",
    },
    o: [
      { uz: "Nominal kuchlanishdan", ru: "От номинального напряжения", en: "From the rated voltage" },
      {
        uz: "ZV2 filtrining nobalans kuchlanishidan: Uhi = 0,06·Uish.norm",
        ru: "От напряжения небаланса фильтра ZV2: Uс.з = 0,06·Uраб.норм",
        en: "From the ZV2 filter unbalance voltage: Uop = 0.06·Unorm",
      },
      { uz: "Uqt.max dan", ru: "От Uкз.max", en: "From the maximum fault voltage" },
      { uz: "Uish.min dan", ru: "От Uраб.min", en: "From the minimum working voltage" },
    ],
    e: {
      uz: "KV2 releni ishlash o'rnatmasi ZV2 filtrining nobalans kuchlanishi Unb dan sozlanadi (14.3-formula).",
      ru: "Уставка срабатывания KV2 отстраивается от напряжения небаланса Uнб фильтра ZV2 (формула 14.3).",
      en: "The KV2 pickup setting is derived from the ZV2 filter's unbalance voltage (formula 14.3).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "KV2 relesi qanday QT larda MTH ni ishga tushiradi?",
      ru: "При каких КЗ реле KV2 запускает МТЗ?",
      en: "For which faults does the KV2 relay start the OCP?",
    },
    o: [
      { uz: "Faqat uch fazali", ru: "Только при трёхфазных", en: "Three-phase only" },
      {
        uz: "Nosimmetrik QT larda (U2 paydo bo'lganda)",
        ru: "При несимметричных КЗ (при появлении U2)",
        en: "For unbalanced faults (when U2 appears)",
      },
      { uz: "Faqat yerga QT da", ru: "Только при КЗ на землю", en: "Earth faults only" },
      { uz: "Barcha rejimlarda", ru: "Во всех режимах", en: "In all modes" },
    ],
    e: {
      uz: "Teskari ketma-ketlik kuchlanish filtri orqali ulangan KV2 nosimmetrik QT da U2 paydo bo'lsa ishga tushadi (14-ma'ruza).",
      ru: "KV2, включённое через фильтр обратной последовательности, срабатывает при появлении U2 в несимметричных КЗ (лекция 14).",
      en: "Connected through the negative-sequence filter, KV2 picks up when U2 appears in unbalanced faults (lecture 14).",
    },
  },
  {
    l: 14, type: "tf", a: true,
    q: {
      uz: "Uch fazali QT ning birinchi soniyalarida qisqa muddatli (0,02-0,05 s) kuchlanish nosimmetriyasi paydo bo'ladi.",
      ru: "В первые мгновения трёхфазного КЗ возникает кратковременная (0,02-0,05 с) несимметрия напряжения.",
      en: "In the first instants of a three-phase fault a brief (0.02-0.05 s) voltage asymmetry appears.",
    },
    e: {
      uz: "Natijada U2 hosil bo'ladi va KV2 rele birinchi momentda ishga tushadi (14-ma'ruza).",
      ru: "В результате появляется U2 и реле KV2 срабатывает в первый момент (лекция 14).",
      en: "As a result U2 appears and the KV2 relay picks up in that first moment (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "Kuchlanish zanjirida uzilish bo'lganda nima ko'zda tutilgan?",
      ru: "Что предусмотрено на случай обрыва в цепи напряжения?",
      en: "What is provided for a break in the voltage circuit?",
    },
    o: [
      { uz: "MTH avtomatik o'chadi", ru: "МТЗ автоматически отключается", en: "The OCP switches itself off" },
      {
        uz: "KL rele kontaktlari yopilganda signalizatsiya",
        ru: "Сигнализация при замыкании контактов реле KL",
        en: "An alarm when the KL relay contacts close",
      },
      { uz: "Vaqt relesi ikki barobar oshadi", ru: "Выдержка удваивается", en: "The delay is doubled" },
      { uz: "TT almashtiriladi", ru: "Заменяется ТТ", en: "The CT is replaced" },
    ],
    e: {
      uz: "Kuchlanish zanjirida uzilish bo'lsa MTH noto'g'ri ishlashi mumkin, shuning uchun KL kontaktlari yopilganda signalizatsiya nazarda tutilgan (14-ma'ruza).",
      ru: "При обрыве цепи напряжения МТЗ может сработать неправильно, поэтому предусмотрена сигнализация при замыкании контактов KL (лекция 14).",
      en: "A break in the voltage circuit can cause maloperation, so an alarm is provided via the KL contacts (lecture 14).",
    },
  },
  {
    l: 14, type: "mcq", a: 1,
    q: {
      uz: "K(3) da KV relening ta'siri qaysi qiymatdan aniqlanadi?",
      ru: "Каким значением определяется действие реле KV при К(3)?",
      en: "Which value governs the KV relay's action for a three-phase fault?",
    },
    o: [
      { uz: "Uri dan", ru: "Uс.р", en: "The pickup voltage" },
      {
        uz: "Uqay dan (ishlash kuchlanishidan 10-15 % yuqori)",
        ru: "Uв (на 10-15 % выше напряжения срабатывания)",
        en: "The reset voltage (10-15 % above pickup)",
      },
      { uz: "Uish.min dan", ru: "Uраб.min", en: "The minimum working voltage" },
      { uz: "Unom dan", ru: "Uном", en: "The rated voltage" },
    ],
    e: {
      uz: "K(3) da KV rele ta'siri Uri emas, ishlash kuchlanishidan 10-15 % yuqori bo'lgan Uqay dan aniqlanadi (14-ma'ruza).",
      ru: "При К(3) действие KV определяется не Uс.р, а Uв, которое на 10-15 % выше напряжения срабатывания (лекция 14).",
      en: "For a three-phase fault the KV action is set by the reset voltage, 10-15 % above pickup (lecture 14).",
    },
  },

  /* ================= 15-MA'RUZA ================= */
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Tokli kesimning selektivligi qanday ta'minlanadi?",
      ru: "Чем обеспечивается селективность токовой отсечки?",
      en: "How is the current cut-off's selectivity achieved?",
    },
    o: [
      { uz: "Sabr vaqti bilan", ru: "Выдержкой времени", en: "By a time delay" },
      {
        uz: "Ishlash zonasini cheklash, ya'ni ishlash tokini tanlash orqali",
        ru: "Ограничением зоны действия, то есть выбором тока срабатывания",
        en: "By limiting the reach, i.e. by choosing the pickup current",
      },
      { uz: "Kuchlanish relesi bilan", ru: "Реле напряжения", en: "By a voltage relay" },
      { uz: "AQU bilan", ru: "С помощью АПВ", en: "By auto-reclosing" },
    ],
    e: {
      uz: "Tokli kesimning tanlovchanligi ishlash zonasini cheklash orqali erishiladi (15-ma'ruza).",
      ru: "Селективность токовой отсечки достигается ограничением зоны действия (лекция 15).",
      en: "Cut-off selectivity is achieved by limiting its zone of operation (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Sabr vaqtsiz kesimning ishlash zonasi qanday bo'lishi kerak?",
      ru: "Какой должна быть зона действия отсечки без выдержки времени?",
      en: "What must the reach of an instantaneous cut-off be?",
    },
    o: [
      {
        uz: "Keyingi liniyani ham qamrashi kerak",
        ru: "Должна охватывать и следующую линию",
        en: "It must also cover the next line",
      },
      {
        uz: "Himoya qilinadigan liniyadan tashqariga chiqmasligi kerak",
        ru: "Не должна выходить за пределы защищаемой линии",
        en: "It must not extend beyond the protected line",
      },
      { uz: "Butun tarmoqni qamrashi kerak", ru: "Должна охватывать всю сеть", en: "It must cover the whole network" },
      { uz: "Ahamiyati yo'q", ru: "Не имеет значения", en: "It does not matter" },
    ],
    e: {
      uz: "Selektivlik shartlariga ko'ra sabr vaqtsiz kesim zonasi himoya qilinadigan EUL dan tashqariga chiqmasligi kerak (15-ma'ruza).",
      ru: "По условиям селективности зона отсечки без выдержки не должна выходить за пределы защищаемой ЛЭП (лекция 15).",
      en: "For selectivity, an instantaneous cut-off must not reach beyond the protected line (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 0,
    q: {
      uz: "Kesimning ishlash toki qanday tanlanadi?",
      ru: "Как выбирается ток срабатывания отсечки?",
      en: "How is the cut-off pickup current chosen?",
    },
    o: [
      { uz: "Ihi = ksoz·Iqt(M)max", ru: "Iс.з = kотс·Iкз(M)max", en: "Iop = kset·Isc(M)max" },
      { uz: "Ihi = Iqt.min/ksez", ru: "Iс.з = Iкз.min/kч", en: "Iop = Isc.min/ksens" },
      { uz: "Ihi = ksoz·Iyuk.max", ru: "Iс.з = kотс·Iнагр.max", en: "Iop = kset·Iload.max" },
      { uz: "Ihi = Iish.norm", ru: "Iс.з = Iраб.норм", en: "Iop = Inorm" },
    ],
    e: {
      uz: "Ihi = ksoz·Iqt(M)max — liniya oxiridagi maksimal QT tokidan sozlanadi (15.2-formula).",
      ru: "Iс.з = kотс·Iкз(M)max — отстраивается от максимального тока КЗ в конце линии (формула 15.2).",
      en: "Iop = kset·Isc(M)max — set above the maximum fault current at the line end (formula 15.2).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "RT-40 ishlatilganda kesim uchun ksoz qancha?",
      ru: "Каким принимается kотс для отсечки при использовании РТ-40?",
      en: "What setting factor is used for a cut-off built on the RT-40?",
    },
    o: [
      { uz: "1,1-1,2", ru: "1,1-1,2", en: "1.1-1.2" },
      { uz: "1,2-1,3", ru: "1,2-1,3", en: "1.2-1.3" },
      { uz: "1,5", ru: "1,5", en: "1.5" },
      { uz: "2,0", ru: "2,0", en: "2.0" },
    ],
    e: {
      uz: "Kesim sxemasida RT-40 ishlatilsa ksoz = 1,2-1,3; RT-80 va RT-90 uchun ksoz = 1,5 (15-ma'ruza).",
      ru: "При использовании РТ-40 kотс = 1,2-1,3; для РТ-80 и РТ-90 kотс = 1,5 (лекция 15).",
      en: "With the RT-40 the factor is 1.2-1.3; with RT-80 and RT-90 it is 1.5 (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "PUE bo'yicha kesim liniyaning kamida necha foizini qamrasa qo'llash tavsiya etiladi?",
      ru: "Какой минимальный охват линии по ПУЭ делает применение отсечки рекомендуемым?",
      en: "What minimum coverage of the line makes a cut-off recommended?",
    },
    o: [
      { uz: "10 %", ru: "10 %", en: "10 %" },
      { uz: "20 %", ru: "20 %", en: "20 %" },
      { uz: "50 %", ru: "50 %", en: "50 %" },
      { uz: "80 %", ru: "80 %", en: "80 %" },
    ],
    e: {
      uz: "PUE bo'yicha kesim zonasi EUL ning kamida 20 % ini qamrab olsa qo'llash tavsiya qilinadi (15-ma'ruza).",
      ru: "По ПУЭ отсечку рекомендуют, если её зона охватывает не менее 20 % ЛЭП (лекция 15).",
      en: "The regulations recommend a cut-off if its zone covers at least 20 % of the line (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Tezkor oraliq releli sabr vaqtsiz kesim qancha vaqtda ishlaydi?",
      ru: "За какое время срабатывает отсечка без выдержки с быстродействующим промежуточным реле?",
      en: "How fast does an instantaneous cut-off with a fast auxiliary relay operate?",
    },
    o: [
      { uz: "0,01 s", ru: "0,01 с", en: "0.01 s" },
      { uz: "0,04-0,06 s", ru: "0,04-0,06 с", en: "0.04-0.06 s" },
      { uz: "0,1-0,12 s", ru: "0,1-0,12 с", en: "0.1-0.12 s" },
      { uz: "0,35 s", ru: "0,35 с", en: "0.35 s" },
    ],
    e: {
      uz: "Tezkor ishlovchi oraliq releli (0,02 s) kesim thi = 0,04-0,06 s oralig'ida ishlaydi (15-ma'ruza).",
      ru: "С быстродействующим промежуточным реле (0,02 с) отсечка действует за tс.з = 0,04-0,06 с (лекция 15).",
      en: "With a fast auxiliary relay (0.02 s) the cut-off operates in 0.04-0.06 s (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 0,
    q: {
      uz: "Oraliq relesiz kesimda QT tokining nodavriy tashkil etuvchisi qanday hisobga olinadi?",
      ru: "Как учитывается апериодическая составляющая тока КЗ в отсечке без промежуточного реле?",
      en: "How is the DC component accounted for in a cut-off without an auxiliary relay?",
    },
    o: [
      {
        uz: "Iqt(M)max ni ka = 1,6-1,8 ga ko'paytirish bilan",
        ru: "Умножением Iкз(M)max на ka = 1,6-1,8",
        en: "By multiplying the fault current by ka = 1.6-1.8",
      },
      { uz: "Iqt(M)max ni 2 ga bo'lish bilan", ru: "Делением Iкз(M)max на 2", en: "By dividing it by 2" },
      { uz: "Hisobga olinmaydi", ru: "Не учитывается", en: "It is not accounted for" },
      { uz: "ksoz ni oshirish bilan", ru: "Увеличением kотс", en: "By increasing the setting factor" },
    ],
    e: {
      uz: "Kesim bir davrgacha (0,02 s) ishlasa Iqt(M)max ni ka = 1,6-1,8 koeffitsientga ko'paytirish kerak (15-ma'ruza).",
      ru: "Если отсечка действует за период (0,02 с), Iкз(M)max умножают на ka = 1,6-1,8 (лекция 15).",
      en: "If the cut-off acts within one cycle (0.02 s), the fault current is multiplied by 1.6-1.8 (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Tupik NS ni ta'minlovchi liniyada kesim yana nimadan sozlanadi?",
      ru: "От чего ещё отстраивается отсечка на линии, питающей тупиковую ПС?",
      en: "What else is a cut-off set above on a line feeding a terminal substation?",
    },
    o: [
      { uz: "Yuklama tokidan", ru: "От тока нагрузки", en: "The load current" },
      {
        uz: "Transformatorlarning magnitlanish tokining sakrashidan: Ihi = (3-5)·ΣInom.t",
        ru: "От броска тока намагничивания трансформаторов: Iс.з = (3-5)·ΣIном.т",
        en: "The transformer magnetising inrush: Iop = (3-5)·ΣIrated.t",
      },
      { uz: "Chastotadan", ru: "От частоты", en: "The frequency" },
      { uz: "Kuchlanishdan", ru: "От напряжения", en: "The voltage" },
    ],
    e: {
      uz: "15.2a-formula: Ihi = (3-5)·ΣInom.t, bu yerda ΣInom.t — NS transformatorlarining umumiy nominal toki.",
      ru: "Формула 15.2а: Iс.з = (3-5)·ΣIном.т, где ΣIном.т — суммарный номинальный ток трансформаторов ПС.",
      en: "Formula 15.2a: Iop = (3-5)·ΣIrated.t, the total rated current of the substation transformers.",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Kesim uchun QT tokini hisoblashda generator qanday qarshilik bilan almashtiriladi?",
      ru: "Каким сопротивлением заменяют генератор при расчёте тока КЗ для отсечки?",
      en: "What reactance replaces the generator when computing fault current for a cut-off?",
    },
    o: [
      { uz: "Aktiv qarshilik R", ru: "Активным сопротивлением R", en: "The resistance R" },
      { uz: 'O\'ta o\'tkinchi qarshilik X"d', ru: 'Сверхпереходным сопротивлением X"d', en: 'The subtransient reactance X"d' },
      {
        uz: "Nol ketma-ketlik qarshiligi",
        ru: "Сопротивлением нулевой последовательности",
        en: "The zero-sequence impedance",
      },
      { uz: "Yuklama qarshiligi", ru: "Сопротивлением нагрузки", en: "The load impedance" },
    ],
    e: {
      uz: 'QT tokini hisoblashda generatorlar X"d o\'ta o\'tkinchi qarshiligi bilan almashtiriladi (15-ma\'ruza).',
      ru: 'При расчёте тока КЗ генераторы заменяют сверхпереходным сопротивлением X"d (лекция 15).',
      en: 'Generators are represented by their subtransient reactance X"d (lecture 15).',
    },
  },
  {
    l: 15, type: "tf", a: true,
    q: {
      uz: "Sabr vaqtsiz kesim sxemasi MTH sxemasidan vaqt relesi yo'qligi bilan farq qiladi.",
      ru: "Схема отсечки без выдержки отличается от схемы МТЗ отсутствием реле времени.",
      en: "An instantaneous cut-off circuit differs from the OCP circuit by having no time relay.",
    },
    e: {
      uz: "Sabr vaqtsiz tokli kesim sxemalarida MTH sxemasidagi vaqt relesi bo'lmaydi (15-ma'ruza).",
      ru: "В схемах токовой отсечки без выдержки реле времени отсутствует (лекция 15).",
      en: "Instantaneous cut-off schemes contain no time relay (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 0,
    q: {
      uz: "Trubkali razryadniklarning ishlash vaqti qancha?",
      ru: "Каково время действия трубчатых разрядников?",
      en: "What is the operating time of tubular arresters?",
    },
    o: [
      { uz: "0,01-0,02 s", ru: "0,01-0,02 с", en: "0.01-0.02 s" },
      { uz: "0,1 s", ru: "0,1 с", en: "0.1 s" },
      { uz: "0,35 s", ru: "0,35 с", en: "0.35 s" },
      { uz: "1 s", ru: "1 с", en: "1 s" },
    ],
    e: {
      uz: "Razryadniklarning ishlash vaqti taxminan 0,01-0,02 s, kaskadli ishlaganda 0,04-0,06 s gacha ko'tariladi (15-ma'ruza).",
      ru: "Время действия разрядников около 0,01-0,02 с, при каскадной работе возрастает до 0,04-0,06 с (лекция 15).",
      en: "Arresters act in about 0.01-0.02 s, rising to 0.04-0.06 s in cascade (lecture 15).",
    },
  },
  {
    l: 15, type: "mcq", a: 1,
    q: {
      uz: "Liniya-transformator blokida kesim nimadan sozlanadi?",
      ru: "От чего отстраивается отсечка в блоке линия-трансформатор?",
      en: "What is the cut-off set from in a line-transformer unit?",
    },
    o: [
      { uz: "Liniya oxiridagi QT dan", ru: "От КЗ в конце линии", en: "A fault at the line end" },
      {
        uz: "Transformatordan keyingi K1 nuqtadagi QT dan",
        ru: "От КЗ в точке K1 за трансформатором",
        en: "A fault at point K1 beyond the transformer",
      },
      { uz: "Yuklama tokidan", ru: "От тока нагрузки", en: "The load current" },
      { uz: "Magnitlanish tokidan", ru: "От тока намагничивания", en: "The magnetising current" },
    ],
    e: {
      uz: "Bunday holda kesim butun elektr tarmog'ini himoya qiladi va juda samarali hisoblanadi (15-ma'ruza).",
      ru: "В этом случае отсечка защищает всю сеть и весьма эффективна (лекция 15).",
      en: "In that case the cut-off protects the whole line and is highly effective (lecture 15).",
    },
  },
];
