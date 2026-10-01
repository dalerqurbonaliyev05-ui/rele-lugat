import type { Term } from "../../types";

/** 13-15 ma'ruzalar atamalari. */
export const PART4: Term[] = [
  /* ================= 13-MA'RUZA ================= */
  {
    id: "ihi", l: 13, r: ["iri", "ksoz", "kqay", "ioit"],
    t: { uz: "Ihi", ru: "Iс.з", en: "Iop" },
    f: {
      uz: "Himoyaning birlamchi ishlash toki",
      ru: "Первичный ток срабатывания защиты",
      en: "Primary pickup current of the protection",
    },
    d: {
      uz: "MTH ishga tushadigan birlamchi tok. Ikkita shartdan (qaytish va ishlamaslik) olingan qiymatlarning kattasi qabul qilinadi.",
      ru: "Первичный ток, при котором срабатывает МТЗ. Принимается большее из значений, полученных по двум условиям (возврата и несрабатывания).",
      en: "The primary current at which the OCP picks up. The larger of the values from the two conditions (reset and non-operation) is adopted.",
    },
    u: {
      uz: "MTH va kesim o'rnatmalarini hisoblashda",
      ru: "При расчёте уставок МТЗ и отсечки",
      en: "When calculating OCP and cut-off settings",
    },
  },
  {
    id: "iyuk", l: 13, r: ["iish", "ioit", "ihi"],
    t: { uz: "Iyuk.max", ru: "Iнагр.max", en: "Iload.max" },
    f: { uz: "Maksimal yuklama toki", ru: "Максимальный ток нагрузки", en: "Maximum load current" },
    d: {
      uz: "Avariyadan keyingi rejimdagi eng katta yuklama toki. Iyuk.max = ko'it · Iish.max.",
      ru: "Наибольший ток нагрузки в послеаварийном режиме. Iнагр.max = kс.з · Iраб.max.",
      en: "The greatest load current in the post-fault mode. Iload.max = kself · Iwork.max.",
    },
    u: { uz: "Ihi ni tanlashda", ru: "При выборе Iс.з", en: "When choosing the pickup current" },
  },
  {
    id: "iish", l: 13, r: ["iyuk", "ioit"],
    t: { uz: "Iish.max", ru: "Iраб.max", en: "Iwork.max" },
    f: { uz: "Maksimal ishchi tok", ru: "Максимальный рабочий ток", en: "Maximum working current" },
    d: {
      uz: "Turg'un rejimdagi eng katta ishchi tok.",
      ru: "Наибольший рабочий ток в установившемся режиме.",
      en: "The largest working current in the steady-state mode.",
    },
    u: { uz: "Ihi ni hisoblashda", ru: "При расчёте Iс.з", en: "When computing the pickup current" },
  },
  {
    id: "ksoz", l: 13, r: ["kqay", "ihi", "ikesim"],
    t: { uz: "ksoz", ru: "kотс", en: "kset" },
    f: {
      uz: "Sozlash koeffitsienti",
      ru: "Коэффициент отстройки",
      en: "Setting (safety) factor",
    },
    d: {
      uz: "Rele xatoligini hisobga oluvchi zahira koeffitsienti. RT-40, RT-80 va statik relelar uchun 1,1-1,2; kesimda RT-40 bilan 1,2-1,3, RT-80/90 bilan 1,5.",
      ru: "Коэффициент запаса, учитывающий погрешность реле. Для РТ-40, РТ-80 и статических реле 1,1-1,2; в отсечке с РТ-40 — 1,2-1,3, с РТ-80/90 — 1,5.",
      en: "The margin factor accounting for relay error. 1.1-1.2 for RT-40, RT-80 and static relays; in a cut-off, 1.2-1.3 with RT-40 and 1.5 with RT-80/90.",
    },
    u: {
      uz: "Barcha o'rnatma hisoblarida",
      ru: "Во всех расчётах уставок",
      en: "In every setting calculation",
    },
  },
  {
    id: "ioit", l: 13, r: ["iyuk", "ihi", "aqu", "zau"],
    t: { uz: "ko'it", ru: "kс.з", en: "kself" },
    f: {
      uz: "O'z-o'zidan ishga tushish koeffitsienti",
      ru: "Коэффициент самозапуска",
      en: "Motor self-starting factor",
    },
    d: {
      uz: "Elektr motorlarning o'z-o'zidan ishga tushishi tufayli yuklama tokining necha marta oshishini ko'rsatadi. Motorlar ko'p bo'lsa 3-6, kam bo'lsa 1,5-2.",
      ru: "Показывает, во сколько раз возрастает ток нагрузки из-за самозапуска электродвигателей. При большой доле двигателей 3-6, при малой 1,5-2.",
      en: "Shows how many times the load current rises because motors restart themselves. 3-6 where motors dominate, 1.5-2 where they are few.",
    },
    u: { uz: "Ihi ni hisoblashda", ru: "При расчёте Iс.з", en: "When computing the pickup current" },
  },
  {
    id: "iqay", l: 13, r: ["kqay", "ihi", "iyuk"],
    t: { uz: "Iqay", ru: "Iв", en: "Ires" },
    f: {
      uz: "Himoyaning qaytish toki",
      ru: "Ток возврата защиты",
      en: "Protection reset current",
    },
    d: {
      uz: "Tashqi QT o'chirilgandan so'ng MTH boshlang'ich holatga qaytadigan tok: Iqay = ksoz · Iyuk.max.",
      ru: "Ток, при котором МТЗ возвращается в исходное состояние после отключения внешнего КЗ: Iв = kотс · Iнагр.max.",
      en: "The current at which the OCP resets after an external fault is cleared: Ires = kset · Iload.max.",
    },
    u: {
      uz: "Birinchi sozlash shartida",
      ru: "В первом условии отстройки",
      en: "In the first setting condition",
    },
  },
  {
    id: "ksez", l: 13, r: ["sezgirlik", "iqtmin", "ihi"],
    t: { uz: "ksez = Iqt.min/Ihi", ru: "kч = Iкз.min/Iс.з", en: "ksens = Isc.min/Iop" },
    f: {
      uz: "Sezgirlik koeffitsienti",
      ru: "Коэффициент чувствительности",
      en: "Sensitivity factor",
    },
    d: {
      uz: "Himoya zonasi oxiridagi minimal QT tokining ishlash tokiga nisbati. Himoya qilinadigan liniya uchun ksez > 1,5, zahira uchastkada ksez > 1,2 bo'lishi kerak.",
      ru: "Отношение минимального тока КЗ в конце зоны к току срабатывания. Для защищаемой линии kч > 1,5, на резервируемом участке kч > 1,2.",
      en: "The ratio of the minimum fault current at the zone end to the pickup current. For the protected line ksens > 1.5; in the backup section ksens > 1.2.",
    },
    u: {
      uz: "MTH sezgirligini tekshirishda",
      ru: "При проверке чувствительности МТЗ",
      en: "When checking OCP sensitivity",
    },
  },
  {
    id: "iqtmin", l: 13, r: ["ksez", "minrejim"],
    t: { uz: "Iqt.min", ru: "Iкз.min", en: "Isc.min" },
    f: { uz: "Minimal QT toki", ru: "Минимальный ток КЗ", en: "Minimum fault current" },
    d: {
      uz: "Himoya zonasi oxirida, tarmoqning haqiqiy minimal rejimi uchun hisoblangan QT toki.",
      ru: "Ток КЗ в конце зоны защиты, рассчитанный для действительного минимального режима сети.",
      en: "The fault current at the end of the protection zone, computed for the network's actual minimum mode.",
    },
    u: {
      uz: "Sezgirlikni tekshirishda",
      ru: "При проверке чувствительности",
      en: "When checking sensitivity",
    },
  },
  {
    id: "dt", l: 13, r: ["pogonali", "th", "tzah", "tvq", "tp", "inersiya"],
    t: { uz: "Δt", ru: "Δt", en: "Δt" },
    f: {
      uz: "Vaqt pog'onasi (selektivlik pog'onasi)",
      ru: "Ступень времени (ступень селективности)",
      en: "Time step (selectivity step)",
    },
    d: {
      uz: "Ketma-ket ikki uchastka himoyasining ishlash vaqtlari farqi: Δt = tp(B) + tv(B) + tp(A) + tzah. Mustaqil xarakteristikali MTH da 0,35-0,6 s, bog'liq xarakteristikalida 0,6-1 s.",
      ru: "Разность выдержек защит двух смежных участков: Δt = tп(B) + tв(B) + tп(A) + tзап. Для МТЗ с независимой характеристикой 0,35-0,6 с, с зависимой — 0,6-1 с.",
      en: "The difference in operating times of two adjacent sections: Δt = terr(B) + tbrk(B) + terr(A) + tmargin. For definite-time OCP it is 0.35-0.6 s; for inverse-time, 0.6-1 s.",
    },
    u: {
      uz: "MTH vaqtlarini muvofiqlashtirishda",
      ru: "При согласовании выдержек МТЗ",
      en: "When coordinating OCP delays",
    },
  },
  {
    id: "th", l: 13, r: ["dt", "pogonali", "sabrvaqt"],
    t: { uz: "th(A) = th(B) + Δt", ru: "tз(A) = tз(B) + Δt", en: "tp(A) = tp(B) + Δt" },
    f: {
      uz: "MTH sabr vaqtini tanlash",
      ru: "Выбор выдержки времени МТЗ",
      en: "Choosing the OCP delay",
    },
    d: {
      uz: "Manbaga yaqinroq himoyaning sabr vaqti keyingi himoyanikidan bir pog'ona vaqtga katta bo'lishi kerak.",
      ru: "Выдержка защиты, расположенной ближе к источнику, должна быть на ступень больше выдержки последующей защиты.",
      en: "The delay of the protection nearer the source must exceed that of the next protection by one time step.",
    },
    u: {
      uz: "Vaqt pog'onasini qurishda",
      ru: "При построении ступеней времени",
      en: "When building the time grading",
    },
  },
  {
    id: "tzah", l: 13, r: ["dt", "th"],
    t: { uz: "tzah", ru: "tзап", en: "tmargin" },
    f: { uz: "Zahira vaqti", ru: "Время запаса", en: "Margin time" },
    d: {
      uz: "Vaqt pog'onasi tarkibidagi zahira qo'shimchasi.",
      ru: "Запас, входящий в состав ступени времени.",
      en: "The safety allowance included in the time step.",
    },
    u: { uz: "Δt ni hisoblashda", ru: "При расчёте Δt", en: "When computing Δt" },
  },
  {
    id: "tvq", l: 13, r: ["dt", "tqo", "q"],
    t: { uz: "tv", ru: "tв", en: "tbrk" },
    f: {
      uz: "O'chirgichning o'chirilish vaqti",
      ru: "Время отключения выключателя",
      en: "Breaker interrupting time",
    },
    d: {
      uz: "O'chirgich kontaktlari QT ni uzguncha ketadigan vaqt; Δt tarkibiga kiradi.",
      ru: "Время до разрыва КЗ контактами выключателя; входит в состав Δt.",
      en: "The time until the breaker contacts interrupt the fault; it forms part of Δt.",
    },
    u: { uz: "Δt ni hisoblashda", ru: "При расчёте Δt", en: "When computing Δt" },
  },
  {
    id: "tp", l: 13, r: ["dt", "kt"],
    t: { uz: "tp", ru: "tп", en: "terr" },
    f: {
      uz: "Vaqt relesining xatoligi",
      ru: "Погрешность реле времени",
      en: "Time-relay error",
    },
    d: {
      uz: "Vaqt relesining sabr vaqtidagi xatolik. Tez ishlovchi RH bilan muvofiqlashtirishda tp(B) = 0 qabul qilinadi va Δt = 0,35-0,4 s bo'ladi.",
      ru: "Погрешность выдержки реле времени. При согласовании с быстродействующей РЗ принимают tп(B) = 0, и тогда Δt = 0,35-0,4 с.",
      en: "The error in the time relay's delay. When coordinating with high-speed protection, terr(B) = 0 is taken and Δt becomes 0.35-0.4 s.",
    },
    u: { uz: "Δt ni hisoblashda", ru: "При расчёте Δt", en: "When computing Δt" },
  },
  {
    id: "inersiya", l: 13, r: ["dt", "rt80", "bogliqxar"],
    t: { uz: "ti", ru: "tи", en: "tinert" },
    f: {
      uz: "Inersion xatolik vaqti",
      ru: "Время инерционной погрешности",
      en: "Inertia (overtravel) time",
    },
    d: {
      uz: "Induksion rele QT toki uzilgandan keyin ham inersiya bilan ishlashda davom etishi. Bog'liq xarakteristikali MTH ning Δt siga qo'shiladi.",
      ru: "Продолжение движения индукционного реле по инерции после снятия тока КЗ. Добавляется к Δt для МТЗ с зависимой характеристикой.",
      en: "The induction relay's continued travel by inertia after the fault current is removed. It is added to Δt for inverse-time OCP.",
    },
    u: {
      uz: "Bog'liq MTH larni muvofiqlashtirishda",
      ru: "При согласовании зависимых МТЗ",
      en: "When coordinating inverse-time OCPs",
    },
  },
  {
    id: "moslashtirish", l: 13, r: ["ihi", "ksoz", "pogonali"],
    t: {
      uz: "Qo'shni MTH ni moslashtirish",
      ru: "Согласование смежных МТЗ",
      en: "Coordinating adjacent OCPs",
    },
    d: {
      uz: "Manbaga yaqin himoya uzoqrog'idan qo'polroq bo'lishi kerak: Ihi.n > Ihi.(n+1), yoki Ihi.n = ksoz·Ihi.(n+1) (ksoz = 1,1-1,5).",
      ru: "Защита ближе к источнику должна быть грубее последующей: Iс.з.n > Iс.з.(n+1), либо Iс.з.n = kотс·Iс.з.(n+1) (kотс = 1,1-1,5).",
      en: "The protection nearer the source must be less sensitive than the next one: Iop.n > Iop.(n+1), or Iop.n = kset·Iop.(n+1) (kset = 1.1-1.5).",
    },
    u: {
      uz: "Radial tarmoqni sozlashda",
      ru: "При настройке радиальной сети",
      en: "When setting up a radial network",
    },
  },

  /* ================= 14-MA'RUZA ================= */
  {
    id: "kuchmth", l: 14, r: ["kv", "va", "uhi", "kuchsezgirlik"],
    t: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH",
      ru: "МТЗ с пуском по напряжению",
      en: "OCP with voltage restraint",
    },
    d: {
      uz: "Kuchlanish o'lchov organi (blokirovkasi) bilan to'ldirilgan MTH. QT da tok ortadi va kuchlanish pasayadi — ikkala organ ishga tushadi; o'ta yuklanishda esa KV bloklaydi.",
      ru: "МТЗ, дополненная органом (блокировкой) напряжения. При КЗ ток растёт, а напряжение снижается — срабатывают оба органа; при перегрузке KV блокирует защиту.",
      en: "OCP supplemented by a voltage element (blocking). During a fault the current rises and the voltage falls, so both elements pick up; on overload the voltage element blocks it.",
    },
    u: {
      uz: "MTH sezgirligini oshirish kerak bo'lganda",
      ru: "Когда нужно повысить чувствительность МТЗ",
      en: "Where OCP sensitivity must be increased",
    },
  },
  {
    id: "kv", l: 14, r: ["rn54", "kuchmth", "kv2"],
    t: { uz: "KV", ru: "KV", en: "KV" },
    f: { uz: "Kuchlanish relesi", ru: "Реле напряжения", en: "Voltage relay" },
    d: {
      uz: "MTH dagi kuchlanish o'lchov organi. Odatda minimal kuchlanish relesi; uchta rele fazalararo kuchlanishlarga (UAB, UBC, UCA) ulanadi.",
      ru: "Орган напряжения в МТЗ. Обычно минимальное реле напряжения; три реле включают на линейные напряжения (UAB, UBC, UCA).",
      en: "The voltage element in the OCP. Usually an undervoltage relay; three relays are connected to the line voltages (UAB, UBC, UCA).",
    },
    u: {
      uz: "Kuchlanish blokirovkali MTH da",
      ru: "В МТЗ с блокировкой по напряжению",
      en: "In OCP with voltage blocking",
    },
  },
  {
    id: "uhi", l: 14, r: ["uri", "kv", "uishmin"],
    t: {
      uz: "Uhi = Uish.min/(ksoz·kqay)",
      ru: "Uс.з = Uраб.min/(kотс·kв)",
      en: "Uop = Umin/(kset·kres)",
    },
    f: {
      uz: "Kuchlanish organining ishlash o'rnatmasi",
      ru: "Уставка срабатывания органа напряжения",
      en: "Voltage element pickup setting",
    },
    d: {
      uz: "Tashqi QT o'chirilgandan so'ng minimal ish kuchlanishi tiklanganda kuchlanish relesi normal holatga qaytishini ta'minlaydi.",
      ru: "Обеспечивает возврат реле напряжения в нормальное состояние при восстановлении минимального рабочего напряжения после отключения внешнего КЗ.",
      en: "It ensures the voltage relay resets once the minimum working voltage is restored after an external fault is cleared.",
    },
    u: { uz: "KV ni sozlashda", ru: "При отстройке KV", en: "When setting the voltage element" },
  },
  {
    id: "uishmin", l: 14, r: ["uhi", "ioit"],
    t: { uz: "Uish.min", ru: "Uраб.min", en: "Umin" },
    f: {
      uz: "Minimal ish kuchlanishi",
      ru: "Минимальное рабочее напряжение",
      en: "Minimum working voltage",
    },
    d: {
      uz: "Elektr motorlarni o'z-o'zidan ishga tushishidagi qoldiq kuchlanish.",
      ru: "Остаточное напряжение при самозапуске электродвигателей.",
      en: "The residual voltage during motor self-starting.",
    },
    u: {
      uz: "Uhi va Uri ni hisoblashda",
      ru: "При расчёте Uс.з и Uс.р",
      en: "When computing the voltage settings",
    },
  },
  {
    id: "ihikuch", l: 14, r: ["ihi", "kuchmth", "kqay"],
    t: {
      uz: "Ihi = ksoz·Iish.norm/kqay",
      ru: "Iс.з = kотс·Iраб.норм/kв",
      en: "Iop = kset·Inorm/kres",
    },
    f: {
      uz: "Kuchlanish blokirovkali MTH ning ishlash toki",
      ru: "Ток срабатывания МТЗ с блокировкой по напряжению",
      en: "Pickup current of voltage-restrained OCP",
    },
    d: {
      uz: "Tok relesi Iyuk.max dan emas, normal rejim yuklama toki Iish.norm dan sozlanadi — shuning uchun sezgirligi oddiy MTH dan yuqori.",
      ru: "Реле тока отстраивается не от Iнагр.max, а от тока нормального режима Iраб.норм — поэтому чувствительность выше, чем у обычной МТЗ.",
      en: "The current relay is set from the normal-mode load current rather than the maximum load current, so its sensitivity exceeds that of plain OCP.",
    },
    u: { uz: "14.1 formula", ru: "Формула 14.1", en: "Formula 14.1" },
  },
  {
    id: "kuchsezgirlik", l: 14, r: ["kuchmth", "ksez", "uhi"],
    t: { uz: "ksez = Uhi/Uqt.max", ru: "kч = Uс.з/Uкз.max", en: "ksens = Uop/Usc.max" },
    f: {
      uz: "Kuchlanish organining sezgirligi",
      ru: "Чувствительность органа напряжения",
      en: "Voltage element sensitivity",
    },
    d: {
      uz: "Zahiralangan uchastka oxiridagi QT da qoldiq kuchlanishning maksimal qiymatiga nisbatan baholanadi; ksez ≥ 1,2 ruxsat etiladi.",
      ru: "Оценивается по отношению к наибольшему остаточному напряжению при КЗ в конце резервируемого участка; допускается kч ≥ 1,2.",
      en: "Assessed against the largest residual voltage for a fault at the end of the backup section; ksens ≥ 1.2 is acceptable.",
    },
    u: {
      uz: "KV sezgirligini tekshirishda",
      ru: "При проверке чувствительности KV",
      en: "When checking voltage-element sensitivity",
    },
  },
  {
    id: "kv2", l: 14, r: ["zv2", "teskariket", "kv"],
    t: { uz: "KV2", ru: "KV2", en: "KV2" },
    f: {
      uz: "Teskari ketma-ketlik kuchlanish relesi",
      ru: "Реле напряжения обратной последовательности",
      en: "Negative-sequence voltage relay",
    },
    d: {
      uz: "ZV2 filtri orqali ulangan maksimal kuchlanish relesi; U2 tashkil etuvchisi paydo bo'lganda nosimmetrik QT larda MTH ni ishga tushiradi.",
      ru: "Максимальное реле напряжения, включённое через фильтр ZV2; при появлении составляющей U2 пускает МТЗ при несимметричных КЗ.",
      en: "An overvoltage relay connected through the ZV2 filter; when the U2 component appears it starts the OCP for unbalanced faults.",
    },
    u: {
      uz: "Kombinatsiyalashgan kuchlanish organida",
      ru: "В комбинированном органе напряжения",
      en: "In the combined voltage element",
    },
  },
  {
    id: "zv2", l: 14, r: ["kv2", "teskariket", "inb"],
    t: { uz: "ZV2", ru: "ZV2", en: "ZV2" },
    f: {
      uz: "Teskari ketma-ketlik kuchlanish filtri",
      ru: "Фильтр напряжения обратной последовательности",
      en: "Negative-sequence voltage filter",
    },
    d: {
      uz: "U2 tashkil etuvchisini ajratib beruvchi filtr. KV2 o'rnatmasi shu filtrning nobalans kuchlanishidan sozlanadi: Uhi = 0,06·Uish.norm.",
      ru: "Фильтр, выделяющий составляющую U2. Уставка KV2 отстраивается от напряжения небаланса этого фильтра: Uс.з = 0,06·Uраб.норм.",
      en: "The filter that extracts the U2 component. The KV2 setting is derived from the filter's unbalance voltage: Uop = 0.06·Unorm.",
    },
    u: {
      uz: "14.3-rasmdagi sxemada",
      ru: "В схеме на рис. 14.3",
      en: "In the scheme of fig. 14.3",
    },
  },

  /* ================= 15-MA'RUZA ================= */
  {
    id: "kesim", l: 15, r: ["mth", "kesimzona", "ikesim", "sabrsiz"],
    t: { uz: "Tokli kesim", ru: "Токовая отсечка", en: "Current cut-off" },
    d: {
      uz: "QT ni tezda o'chirishga imkon beruvchi MTH turi. Selektivligi ishlash tokini tanlash orqali, ya'ni ishlash zonasini cheklash bilan ta'minlanadi.",
      ru: "Разновидность МТЗ, позволяющая быстро отключать КЗ. Селективность обеспечивается выбором тока срабатывания, то есть ограничением зоны действия.",
      en: "A form of OCP that clears faults quickly. Selectivity is achieved by choosing the pickup current, i.e. by limiting the reach.",
    },
    u: {
      uz: "Liniya boshidagi QT larni tez o'chirishda",
      ru: "Для быстрого отключения КЗ в начале линии",
      en: "For fast clearing of faults near the line start",
    },
  },
  {
    id: "sabrsiz", l: 15, r: ["sabrli", "kesim", "ikesim"],
    t: { uz: "Sabr vaqtsiz kesim", ru: "Отсечка без выдержки времени", en: "Instantaneous cut-off" },
    d: {
      uz: "Vaqt relesisiz bajariladigan kesim. Ishlash zonasi himoya qilinadigan liniyadan tashqariga chiqmasligi kerak; ishlash vaqti thi = 0,04-0,06 s.",
      ru: "Отсечка без реле времени. Зона действия не должна выходить за пределы защищаемой линии; время действия tс.з = 0,04-0,06 с.",
      en: "A cut-off without a time relay. Its reach must not extend beyond the protected line; operating time 0.04-0.06 s.",
    },
    u: {
      uz: "Liniya boshidagi shikastlanishlarda",
      ru: "При повреждениях в начале линии",
      en: "For faults near the start of the line",
    },
  },
  {
    id: "sabrli", l: 15, r: ["sabrsiz", "kesim", "dt"],
    t: { uz: "Sabr vaqtli kesim", ru: "Отсечка с выдержкой времени", en: "Time-delayed cut-off" },
    d: {
      uz: "Zonasi himoya qilinadigan liniyadan tashqariga chiqadigan kesim; keyingi zona RH sining toki va vaqtidan sozlanadi. Sxemasi mustaqil xarakteristikali MTH ga to'la mos keladi.",
      ru: "Отсечка, зона которой выходит за пределы защищаемой линии; отстраивается по току и времени от РЗ следующей зоны. Схема полностью соответствует МТЗ с независимой характеристикой.",
      en: "A cut-off whose reach extends beyond the protected line; it is coordinated in current and time with the next zone's protection. Its circuit matches definite-time OCP exactly.",
    },
    u: {
      uz: "Zahiralash funksiyasi kerak bo'lganda",
      ru: "Когда требуется функция резервирования",
      en: "Where a backup function is required",
    },
  },
  {
    id: "ikesim", l: 15, r: ["kesim", "ksoz", "ka16"],
    t: {
      uz: "Ihi = ksoz·Iqt(M)max",
      ru: "Iс.з = kотс·Iкз(M)max",
      en: "Iop = kset·Isc(M)max",
    },
    f: {
      uz: "Kesimning ishlash toki",
      ru: "Ток срабатывания отсечки",
      en: "Cut-off pickup current",
    },
    d: {
      uz: "Himoya qilinadigan liniya oxiridagi (M nuqta) maksimal QT tokidan sozlanadi. Kesim zonasidan tashqarida ishlamasligi shart.",
      ru: "Отстраивается от максимального тока КЗ в конце защищаемой линии (точка M). За пределами зоны отсечка срабатывать не должна.",
      en: "Set above the maximum fault current at the end of the protected line (point M). It must not operate beyond its zone.",
    },
    u: {
      uz: "Kesim o'rnatmasini hisoblashda",
      ru: "При расчёте уставки отсечки",
      en: "When calculating the cut-off setting",
    },
  },
  {
    id: "ka16", l: 15, r: ["aperiodik", "ikesim"],
    t: { uz: "ka = 1,6-1,8", ru: "ka = 1,6-1,8", en: "ka = 1.6-1.8" },
    f: {
      uz: "Aperiodik tashkil etuvchi koeffitsienti",
      ru: "Коэффициент апериодической составляющей",
      en: "DC-component factor",
    },
    d: {
      uz: "Kesim bir davr (0,02 s) ichida ishlaganda QT tokining nodavriy tashkil etuvchisini hisobga oluvchi ko'paytuvchi.",
      ru: "Множитель, учитывающий апериодическую составляющую тока КЗ, когда отсечка действует за один период (0,02 с).",
      en: "The multiplier accounting for the DC component of the fault current when the cut-off operates within one cycle (0.02 s).",
    },
    u: {
      uz: "Oraliq relesiz kesim sxemalarida",
      ru: "В схемах отсечки без промежуточного реле",
      en: "In cut-off schemes without an auxiliary relay",
    },
  },
  {
    id: "magsakrash", l: 15, r: ["ikesim", "kesim"],
    t: {
      uz: "Magnitlanish tokining sakrashi",
      ru: "Бросок тока намагничивания",
      en: "Magnetising inrush current",
    },
    d: {
      uz: "Transformatorlarni ulashda paydo bo'ladigan tok sakrashi. Kesim undan ham sozlanadi: Ihi = (3-5)·ΣInom.t.",
      ru: "Бросок тока при включении трансформаторов. Отсечку отстраивают и от него: Iс.з = (3-5)·ΣIном.т.",
      en: "The current surge when transformers are energised. The cut-off is also set above it: Iop = (3-5)·ΣIrated.t.",
    },
    u: {
      uz: "Tupik NS ni ta'minlovchi liniyalarda",
      ru: "На линиях, питающих тупиковые ПС",
      en: "On lines feeding terminal substations",
    },
  },
  {
    id: "kesimzona", l: 15, r: ["kesim", "pue", "olikzona"],
    t: { uz: "Kesim zonasi (xkes)", ru: "Зона отсечки (xотс)", en: "Cut-off reach (xco)" },
    d: {
      uz: "Kesim qamrab oladigan liniya qismi. xkes% = 100/xl · (Et/Ihi − xt). PUE bo'yicha kamida 20 % bo'lsa kesimni qo'llash tavsiya etiladi.",
      ru: "Часть линии, охватываемая отсечкой. xотс% = 100/xл · (Eс/Iс.з − xс). По ПУЭ отсечку рекомендуют при охвате не менее 20 %.",
      en: "The part of the line covered by the cut-off. xco% = 100/xline · (Es/Iop − xs). The regulations recommend a cut-off when it covers at least 20 %.",
    },
    u: {
      uz: "Kesim samaradorligini baholashda",
      ru: "При оценке эффективности отсечки",
      en: "When assessing cut-off effectiveness",
    },
  },
  {
    id: "olikzona", l: 15, r: ["kesimzona", "kesim"],
    t: { uz: "O'lik zona", ru: "Мёртвая зона", en: "Dead zone" },
    d: {
      uz: "Asosiy himoya qamramaydigan uchastka; kesim qo'shimcha himoya sifatida shu zonani yopish uchun ishlatiladi.",
      ru: "Участок, не охватываемый основной защитой; отсечка применяется как дополнительная защита для его перекрытия.",
      en: "A section not covered by the main protection; a cut-off is used as supplementary protection to cover it.",
    },
    u: {
      uz: "Qo'shimcha himoyani asoslashda",
      ru: "При обосновании дополнительной защиты",
      en: "When justifying supplementary protection",
    },
  },
  {
    id: "x0", l: 15, r: ["ikesim", "kesimzona"],
    t: { uz: "X0", ru: "X0", en: "X0" },
    f: {
      uz: "Solishtirma qarshilik",
      ru: "Удельное сопротивление",
      en: "Impedance per unit length",
    },
    d: {
      uz: "Liniyaning 1 km ga to'g'ri keladigan qarshiligi, Om/km. Iqt = Et/(xt + x0·ll.q) formulasida ishlatiladi.",
      ru: "Сопротивление линии на 1 км, Ом/км. Используется в формуле Iкз = Eс/(xс + x0·lкз).",
      en: "The line impedance per kilometre, Ω/km. Used in Isc = Es/(xs + x0·lfault).",
    },
    u: {
      uz: "QT tokini masofaga bog'liq hisoblashda",
      ru: "При расчёте тока КЗ в зависимости от расстояния",
      en: "When computing fault current versus distance",
    },
  },
  {
    id: "xdd", l: 15, r: ["ikesim", "kesim"],
    t: { uz: 'X"d', ru: 'X"d', en: 'X"d' },
    f: {
      uz: "Generatorning o'ta o'tkinchi qarshiligi",
      ru: "Сверхпереходное сопротивление генератора",
      en: "Generator subtransient reactance",
    },
    d: {
      uz: "Kesim uchun QT tokini t = 0 momentida hisoblashda generator o'rniga qo'yiladigan qarshilik.",
      ru: "Сопротивление, которым заменяют генератор при расчёте тока КЗ для момента t = 0 при выборе отсечки.",
      en: "The reactance used in place of the generator when computing the fault current at t = 0 for the cut-off.",
    },
    u: {
      uz: "Maksimal QT tokini hisoblashda",
      ru: "При расчёте максимального тока КЗ",
      en: "When computing the maximum fault current",
    },
  },
  {
    id: "linblok", l: 15, r: ["kesim", "kesimzona"],
    t: {
      uz: "Liniya-transformator bloki",
      ru: "Блок линия-трансформатор",
      en: "Line-transformer unit",
    },
    d: {
      uz: "Kesimni transformatordan keyingi K1 nuqtadagi QT dan sozlash mumkin bo'lgan sxema; bunda kesim butun liniyani himoya qiladi va juda samarali bo'ladi.",
      ru: "Схема, в которой отсечку можно отстроить от КЗ в точке K1 за трансформатором; тогда отсечка защищает всю линию и весьма эффективна.",
      en: "A scheme where the cut-off can be set from a fault at point K1 beyond the transformer; it then protects the whole line and is highly effective.",
    },
    u: { uz: "Blok sxemalarda", ru: "В блочных схемах", en: "In unit-connected schemes" },
  },
  {
    id: "razryadnik", l: 15, r: ["kesim", "sabrsiz"],
    t: { uz: "Trubkali razryadnik", ru: "Трубчатый разрядник", en: "Tubular arrester" },
    d: {
      uz: "O'ta kuchlanishdan himoya qiluvchi qurilma; ishlash vaqti 0,01-0,02 s (kaskadli ishlaganda 0,04-0,06 s). Kesim ular ishlaganda ishlamasligi kerak.",
      ru: "Устройство защиты от перенапряжений; время действия 0,01-0,02 с (при каскадной работе 0,04-0,06 с). Отсечка не должна срабатывать при их работе.",
      en: "An overvoltage protection device; it operates in 0.01-0.02 s (0.04-0.06 s in cascade). The cut-off must not trip while they operate.",
    },
    u: {
      uz: "Kesimning sabr vaqtini tanlashda",
      ru: "При выборе выдержки отсечки",
      en: "When choosing the cut-off delay",
    },
  },
];
