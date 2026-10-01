import type { Network, Scenario, TimeExercise } from "../types";

/** Bir tomondan ta'minlanadigan radial tarmoq.
 *  Manba → A → W1 → B → W2 → C → W3 → D
 *  Asos: 2.1, 2.2, 12.1, 13.4, 13.5-rasmlar. */
export const NETWORK: Network = {
  w: 360,
  h: 190,
  buses: [
    { id: "A", x: 60, y: 70, label: "A" },
    { id: "B", x: 150, y: 70, label: "B" },
    { id: "C", x: 240, y: 70, label: "C" },
    { id: "D", x: 320, y: 70, label: "D" },
  ],
  lines: [
    { id: "W1", from: "A", to: "B", q: "Q1", rh: "RH1", t: 1.5 },
    { id: "W2", from: "B", to: "C", q: "Q2", rh: "RH2", t: 1.0 },
    { id: "W3", from: "C", to: "D", q: "Q3", rh: "RH3", t: 0.5 },
  ],
  faults: [
    { id: "K1", x: 285, y: 70, on: "W3", label: "K1" },
    { id: "K2", x: 195, y: 70, on: "W2", label: "K2" },
    { id: "K3", x: 105, y: 70, on: "W1", label: "K3" },
  ],
};

export const SCENARIOS: Scenario[] = [
  {
    id: "sel-1", lec: 2, fault: "K1", a: 2,
    title: { uz: "Selektiv o'chirish", ru: "Селективное отключение", en: "Selective tripping" },
    q: {
      uz: "K1 nuqtada QT sodir bo'ldi. Selektivlik shartiga ko'ra qaysi o'chirgich o'chishi kerak?",
      ru: "В точке K1 произошло КЗ. Какой выключатель должен отключиться по условию селективности?",
      en: "A fault has occurred at K1. Which breaker must trip to satisfy selectivity?",
    },
    options: [
      { uz: "Q1", ru: "Q1", en: "Q1" },
      { uz: "Q2", ru: "Q2", en: "Q2" },
      { uz: "Q3", ru: "Q3", en: "Q3" },
      { uz: "Barchasi", ru: "Все", en: "All of them" },
    ],
    e: {
      uz: "RH shikastlanish joyiga eng yaqin o'chirgichni o'chirishi kerak. K1 — W3 liniyasida, shuning uchun Q3 o'chadi va qolgan iste'molchilar ta'minoti saqlanadi (2-ma'ruza).",
      ru: "РЗ должна отключить выключатель, ближайший к месту повреждения. K1 — на линии W3, поэтому отключается Q3, и питание остальных потребителей сохраняется (лекция 2).",
      en: "Protection must trip the breaker nearest the fault. K1 is on line W3, so Q3 opens and the other consumers keep their supply (lecture 2).",
    },
  },
  {
    id: "sel-2", lec: 12, fault: "K1", a: 1,
    title: { uz: "Pog'onali vaqt", ru: "Ступенчатая выдержка", en: "Time grading" },
    q: {
      uz: "K1 dagi QT da qisqa tutashuv toki 1, 2 va 3-himoyalarning hammasidan o'tadi va ular ishga tushadi. Nima uchun faqat RH3 o'chiradi?",
      ru: "При КЗ в K1 ток проходит через все защиты 1, 2 и 3, и они пускаются. Почему отключает только РЗ3?",
      en: "The fault current at K1 passes through protections 1, 2 and 3, and all of them start. Why does only RP3 trip?",
    },
    options: [
      {
        uz: "RH3 ning ishlash toki eng katta",
        ru: "У РЗ3 наибольший ток срабатывания",
        en: "RP3 has the highest pickup current",
      },
      {
        uz: "RH3 ning sabr vaqti eng kichik, qolganlari qaytib oladi",
        ru: "У РЗ3 наименьшая выдержка, остальные возвращаются",
        en: "RP3 has the shortest delay; the others reset",
      },
      {
        uz: "RH1 va RH2 umuman ishga tushmaydi",
        ru: "РЗ1 и РЗ2 вообще не пускаются",
        en: "RP1 and RP2 do not start at all",
      },
      {
        uz: "RH3 kuchlanish relesiga ega",
        ru: "У РЗ3 есть реле напряжения",
        en: "RP3 has a voltage relay",
      },
    ],
    e: {
      uz: "Sabr vaqti iste'molchidan manba tomonga oshib boradi. Eng avval sabr vaqti kichik RH3 ishlaydi; RH1 va RH2 sabr vaqti tugamasdan boshlang'ich holatga qaytadi (12-ma'ruza).",
      ru: "Выдержки возрастают от потребителя к источнику. Первой срабатывает РЗ3 с наименьшей выдержкой; РЗ1 и РЗ2 возвращаются, не досчитав свою выдержку (лекция 12).",
      en: "Delays increase from the consumer towards the source. RP3, with the shortest delay, operates first; RP1 and RP2 reset before their delays expire (lecture 12).",
    },
  },
  {
    id: "sel-3", lec: 2, fault: "K1", a: 1,
    title: { uz: "Zahiralash", ru: "Резервирование", en: "Backup" },
    q: {
      uz: "K1 da QT bo'ldi, lekin Q3 o'chirgich buzilgani uchun ishlamadi. Keyin nima bo'ladi?",
      ru: "В K1 произошло КЗ, но выключатель Q3 отказал. Что произойдёт дальше?",
      en: "A fault occurs at K1, but breaker Q3 fails to operate. What happens next?",
    },
    options: [
      {
        uz: "QT o'chirilmasdan qoladi",
        ru: "КЗ останется неотключённым",
        en: "The fault stays uncleared",
      },
      {
        uz: "RH2 uzoq zahiralash sifatida ishlab Q2 ni o'chiradi",
        ru: "РЗ2 сработает как дальнее резервирование и отключит Q2",
        en: "RP2 acts as remote backup and trips Q2",
      },
      { uz: "RH1 darhol ishlaydi", ru: "РЗ1 сработает мгновенно", en: "RP1 operates instantly" },
      { uz: "AQU Q3 ni qayta qo'shadi", ru: "АПВ повторно включит Q3", en: "Auto-reclosing re-closes Q3" },
    ],
    e: {
      uz: "RH1 ning keyingi hududdagi QT ga sezgir bo'lishi uzoq zahiralash deb nomlanadi. Bu yerda Q3 ishlamasa, keyingi pog'ona — RH2 ishlab Q2 ni o'chiradi (2-ma'ruza).",
      ru: "Чувствительность РЗ к КЗ в следующей зоне называется дальним резервированием. При отказе Q3 срабатывает следующая ступень — РЗ2 и отключает Q2 (лекция 2).",
      en: "A protection's sensitivity to faults in the next zone is called remote backup. With Q3 failed, the next step — RP2 — trips Q2 (lecture 2).",
    },
  },
  {
    id: "sel-4", lec: 2, fault: "K3", a: 1,
    title: { uz: "Noselektiv o'chirish", ru: "Неселективное отключение", en: "Non-selective tripping" },
    q: {
      uz: "K3 nuqtada QT bo'lganda RH1 ishlamadi va manbaga yaqinroq himoya ishladi. Bu qanday oqibatga olib keladi?",
      ru: "При КЗ в K3 РЗ1 не сработала, и сработала защита ближе к источнику. К чему это приведёт?",
      en: "For a fault at K3, RP1 failed and a protection nearer the source operated. What is the consequence?",
    },
    options: [
      { uz: "Hech qanday oqibat yo'q", ru: "Никаких последствий", en: "No consequences" },
      {
        uz: "Qo'shimcha nimstansiyalar ham ta'minotsiz qoladi",
        ru: "Дополнительные подстанции также останутся без питания",
        en: "Additional substations are also left without supply",
      },
      {
        uz: "Faqat shikastlangan liniya o'chadi",
        ru: "Отключится только повреждённая линия",
        en: "Only the faulted line is disconnected",
      },
      { uz: "Kuchlanish oshadi", ru: "Напряжение повысится", en: "The voltage rises" },
    ],
    e: {
      uz: "RH ishlamay qolsa keyingi pog'ona ishlaydi va qo'shimcha nimstansiyalar ham o'chib qoladi — bu noselektiv o'chirish (2-ma'ruza, 2.3-rasm).",
      ru: "При отказе РЗ срабатывает следующая ступень, и дополнительные подстанции тоже обесточиваются — это неселективное отключение (лекция 2, рис. 2.3).",
      en: "When a protection fails the next step operates and extra substations lose supply — this is non-selective tripping (lecture 2, fig. 2.3).",
    },
  },
  {
    id: "sel-5", lec: 12, fault: "K2", a: 1,
    title: { uz: "Himoya joylashuvi", ru: "Размещение защиты", en: "Protection placement" },
    q: {
      uz: "Bir tomondan ta'minlanadigan tarmoqda MTH qayerga o'rnatiladi?",
      ru: "Где устанавливается МТЗ в сети с односторонним питанием?",
      en: "Where is OCP installed in a singly-fed network?",
    },
    options: [
      {
        uz: "Liniyaning oxiriga, iste'molchi tomonidan",
        ru: "В конце линии, со стороны потребителя",
        en: "At the line end, on the consumer side",
      },
      {
        uz: "Har bir liniyaning boshiga, ta'minot manbasi tomonidan",
        ru: "В начале каждой линии, со стороны источника питания",
        en: "At the start of each line, on the source side",
      },
      { uz: "Faqat manbaning o'zida", ru: "Только у самого источника", en: "Only at the source itself" },
      {
        uz: "Har bir shinaning ikkala tomoniga",
        ru: "С обеих сторон каждой шины",
        en: "On both sides of every busbar",
      },
    ],
    e: {
      uz: "Bir tomondan ta'minlanadigan tarmoqlarda maksimal himoya har bir liniyaning boshida, elektr ta'minot manbasi tomonidan o'rnatiladi (12-ma'ruza, 12.1,a-rasm).",
      ru: "В сетях с односторонним питанием максимальная защита ставится в начале каждой линии со стороны источника (лекция 12, рис. 12.1,а).",
      en: "In singly-fed networks the overcurrent protection is placed at the start of each line on the source side (lecture 12, fig. 12.1a).",
    },
  },
  {
    id: "sel-6", lec: 13, fault: "K2", a: 2,
    title: { uz: "Sezgirlik zonasi", ru: "Зона чувствительности", en: "Sensitivity zone" },
    q: {
      uz: "RH1 (A-B liniyasi) ning ishlash zonasi qayergacha yetishi kerak?",
      ru: "До какого места должна доходить зона действия РЗ1 (линия A-B)?",
      en: "How far must the reach of RP1 (line A-B) extend?",
    },
    options: [
      {
        uz: "Faqat A-B liniyasining yarmigacha",
        ru: "Только до середины линии A-B",
        en: "Only to the middle of line A-B",
      },
      {
        uz: "Faqat A-B liniyasi oxirigacha",
        ru: "Только до конца линии A-B",
        en: "Only to the end of line A-B",
      },
      {
        uz: "A-B liniyasi va keyingi B-C uchastkasini ham qamrashi kerak",
        ru: "Должна охватывать линию A-B и следующий участок B-C",
        en: "It must cover line A-B and the next section B-C",
      },
      { uz: "Butun tarmoqni", ru: "Всю сеть", en: "The whole network" },
    ],
    e: {
      uz: "MTH ning ishlash zonasi himoya qilinadigan liniyani va keyingi ikkinchi uchastkani ham qamrab olishi kerak (13-ma'ruza, 13.4-rasm).",
      ru: "Зона действия МТЗ должна охватывать защищаемую линию и следующий, второй участок (лекция 13, рис. 13.4).",
      en: "The OCP's zone must cover the protected line and the next, second section as well (lecture 13, fig. 13.4).",
    },
  },
  {
    id: "sel-7", lec: 15, fault: "K1", a: 1,
    title: { uz: "Tokli kesim zonasi", ru: "Зона токовой отсечки", en: "Cut-off reach" },
    q: {
      uz: "Sabr vaqtsiz tokli kesim W3 liniyasida o'rnatilgan. Uning ishlash zonasi qanday bo'lishi kerak?",
      ru: "На линии W3 установлена отсечка без выдержки времени. Какой должна быть её зона действия?",
      en: "An instantaneous cut-off is installed on line W3. What must its reach be?",
    },
    options: [
      {
        uz: "Butun W3 va keyingi liniyani qamrasin",
        ru: "Охватывать всю W3 и следующую линию",
        en: "Cover all of W3 and the next line",
      },
      {
        uz: "W3 dan tashqariga chiqmasin",
        ru: "Не выходить за пределы W3",
        en: "Not extend beyond W3",
      },
      {
        uz: "Faqat W3 ning oxirini qamrasin",
        ru: "Охватывать только конец W3",
        en: "Cover only the far end of W3",
      },
      { uz: "Zona ahamiyatsiz", ru: "Зона не важна", en: "The reach does not matter" },
    ],
    e: {
      uz: "Selektivlik shartlariga ko'ra, sabr vaqtsiz kesimning ishlash zonasi himoya qilinadigan EUL dan tashqariga chiqmasligi kerak (15-ma'ruza).",
      ru: "По условиям селективности зона отсечки без выдержки не должна выходить за пределы защищаемой ЛЭП (лекция 15).",
      en: "For selectivity, an instantaneous cut-off must not reach beyond the protected line (lecture 15).",
    },
  },
  {
    id: "sel-8", lec: 2, fault: "K3", a: 1,
    title: { uz: "Tezkorlik", ru: "Быстродействие", en: "Speed requirement" },
    q: {
      uz: "A shinasida K(3) bo'lganda qoldiq kuchlanish nominalning 45 % ini tashkil qildi. Qanday xulosa chiqariladi?",
      ru: "При К(3) на шинах A остаточное напряжение составило 45 % номинального. Какой вывод следует?",
      en: "For a three-phase fault on busbar A the residual voltage is 45 % of rated. What follows?",
    },
    options: [
      {
        uz: "Oddiy sabr vaqtli himoya yetarli",
        ru: "Достаточно обычной защиты с выдержкой",
        en: "Ordinary time-delayed protection suffices",
      },
      {
        uz: "Turg'unlikni saqlash uchun tez ishlovchi RH kerak",
        ru: "Для сохранения устойчивости нужна быстродействующая РЗ",
        en: "High-speed protection is needed to preserve stability",
      },
      { uz: "Himoya umuman kerak emas", ru: "Защита вообще не нужна", en: "No protection is needed at all" },
      { uz: "Faqat signalizatsiya qo'yiladi", ru: "Ставится только сигнализация", en: "Only an alarm is provided" },
    ],
    e: {
      uz: "Qoldiq kuchlanish nominalning 60 % dan kam bo'lsa, turg'unlikni saqlash uchun shikastlanishni tezda o'chirish, ya'ni tez ishlovchi RH qo'llash kerak (2-ma'ruza).",
      ru: "Если остаточное напряжение меньше 60 % номинального, для сохранения устойчивости нужно быстрое отключение, то есть быстродействующая РЗ (лекция 2).",
      en: "If the residual voltage is below 60 % of rated, the fault must be cleared fast — high-speed protection is required (lecture 2).",
    },
  },
];

/** Vaqt pog'onasi mashqi: th(A) = th(B) + Δt (13.11-formula). */
export const TIME_EXERCISES: TimeExercise[] = [
  {
    id: "dt-1", lec: 13, dt: 0.5,
    given: { RH3: 0.5 },
    answer: { RH2: 1.0, RH1: 1.5 },
    title: { uz: "Vaqt pog'onasini qo'ying", ru: "Расставьте ступени времени", en: "Set the time steps" },
    desc: {
      uz: "Mustaqil xarakteristikali MTH. Eng uzoq (RH3) himoyaning sabr vaqti berilgan. Qolganlarini Δt = 0,5 s pog'ona bilan to'ldiring.",
      ru: "МТЗ с независимой характеристикой. Дана выдержка самой дальней защиты (РЗ3). Заполните остальные с шагом Δt = 0,5 с.",
      en: "Definite-time OCP. The delay of the most remote protection (RP3) is given. Fill in the rest with a step of Δt = 0.5 s.",
    },
    e: {
      uz: "Manbaga yaqin himoyaning sabr vaqti keyingisidan bir pog'ona vaqtga katta bo'lishi kerak: th(A) = th(B) + Δt (13.11-formula).",
      ru: "Выдержка защиты ближе к источнику должна быть на ступень больше последующей: tз(A) = tз(B) + Δt (формула 13.11).",
      en: "The protection nearer the source must have a delay one step greater: tp(A) = tp(B) + Δt (formula 13.11).",
    },
  },
  {
    id: "dt-2", lec: 13, dt: 0.4,
    given: { RH3: 0.4 },
    answer: { RH2: 0.8, RH1: 1.2 },
    title: { uz: "Δt = 0,4 s bilan", ru: "При Δt = 0,4 с", en: "With Δt = 0.4 s" },
    desc: {
      uz: "Tez ishlovchi RH bilan muvofiqlashtirilganda Δt = 0,35-0,4 s. RH3 = 0,4 s dan boshlab vaqtlarni qo'ying.",
      ru: "При согласовании с быстродействующей РЗ Δt = 0,35-0,4 с. Расставьте выдержки, начиная с РЗ3 = 0,4 с.",
      en: "When coordinating with high-speed protection Δt = 0.35-0.4 s. Set the delays starting from RP3 = 0.4 s.",
    },
    e: {
      uz: "tp(B) = 0 qabul qilinganda Δt = 0,35-0,4 s bo'ladi (13-ma'ruza).",
      ru: "При tп(B) = 0 получается Δt = 0,35-0,4 с (лекция 13).",
      en: "Taking the relay error as zero gives Δt = 0.35-0.4 s (lecture 13).",
    },
  },
  {
    id: "dt-3", lec: 13, dt: 0.6,
    given: { RH3: 0.6 },
    answer: { RH2: 1.2, RH1: 1.8 },
    title: {
      uz: "Bog'liq xarakteristikali MTH",
      ru: "МТЗ с зависимой характеристикой",
      en: "Inverse-time OCP",
    },
    desc: {
      uz: "Bog'liq xarakteristikali MTH da vaqt pog'onasi 0,6-1 s. Δt = 0,6 s bilan vaqtlarni qo'ying (RH3 = 0,6 s).",
      ru: "У МТЗ с зависимой характеристикой ступень 0,6-1 с. Расставьте выдержки при Δt = 0,6 с (РЗ3 = 0,6 с).",
      en: "For inverse-time OCP the step is 0.6-1 s. Set the delays with Δt = 0.6 s (RP3 = 0.6 s).",
    },
    e: {
      uz: "Induksion relening inersion xatoligi ti hisobiga bog'liq MTH larda Δt = 0,6-1 s (13.10-formula).",
      ru: "Из-за инерционной погрешности tи индукционного реле у зависимых МТЗ Δt = 0,6-1 с (формула 13.10).",
      en: "Because of the induction relay's overtravel time, inverse-time OCPs use Δt = 0.6-1 s (formula 13.10).",
    },
  },
];
