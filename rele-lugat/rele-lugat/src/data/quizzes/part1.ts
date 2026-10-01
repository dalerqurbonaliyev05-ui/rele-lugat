import type { Quiz } from "../../types";

/** 1-4 ma'ruzalar test savollari. */
export const QUIZ1: Quiz[] = [
  /* ================= 1-MA'RUZA ================= */
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "Rele himoyasining asosiy vazifasi nima?",
      ru: "В чём основное назначение релейной защиты?",
      en: "What is the main purpose of relay protection?",
    },
    o: [
      { uz: "Elektr energiyasini hisoblash", ru: "Учёт электроэнергии", en: "Metering electricity" },
      {
        uz: "Shikastlanish va nonormal rejimni aniqlab, shikastlangan qismni ajratish",
        ru: "Выявление повреждения и ненормального режима и отделение повреждённого участка",
        en: "Detecting faults and abnormal modes and isolating the damaged section",
      },
      { uz: "Kuchlanishni oshirish", ru: "Повышение напряжения", en: "Raising the voltage" },
      { uz: "Iste'molchilarni hisobga olish", ru: "Учёт потребителей", en: "Registering consumers" },
    ],
    e: {
      uz: "RH energotizim elementlarini doimiy nazorat qiladi, shikastlangan hududni aniqlab, Q o'chirgichga ta'sir etib uni tizimdan ajratadi (1-ma'ruza).",
      ru: "РЗ непрерывно контролирует элементы энергосистемы, определяет повреждённый участок и, воздействуя на выключатель Q, отделяет его от системы (лекция 1).",
      en: "Protection continuously monitors the system, locates the faulted section and, acting on breaker Q, isolates it (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 2,
    q: {
      uz: "Qaysi QT turi turg'unlik shartiga ko'ra eng og'ir hisoblanadi?",
      ru: "Какой вид КЗ считается самым тяжёлым по условию устойчивости?",
      en: "Which fault type is the most severe by the stability criterion?",
    },
    o: [
      { uz: "Bir fazali yerga QT", ru: "Однофазное КЗ на землю", en: "Single-phase-to-earth fault" },
      { uz: "Ikki fazali QT", ru: "Двухфазное КЗ", en: "Two-phase fault" },
      { uz: "Uch fazali QT", ru: "Трёхфазное КЗ", en: "Three-phase fault" },
      {
        uz: "Neytrali izolyasiyalangan tarmoqdagi yerga tutashuv",
        ru: "Замыкание на землю в сети с изолированной нейтралью",
        en: "Earth contact in an isolated-neutral network",
      },
    ],
    e: {
      uz: "Turg'unlik shartiga asosan uch fazali QT va neytrali zaminlangan tarmoqlarda ikki fazali yerga QT eng og'ir hisoblanadi (1- va 2-ma'ruza).",
      ru: "По условию устойчивости самыми тяжёлыми являются трёхфазное КЗ и двухфазное КЗ на землю в сетях с заземлённой нейтралью (лекции 1 и 2).",
      en: "By the stability criterion the three-phase fault and, in earthed networks, the two-phase-to-earth fault are the most severe (lectures 1 and 2).",
    },
  },
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "QT nuqtasidagi kuchlanish qanday bo'ladi?",
      ru: "Каким будет напряжение в точке КЗ?",
      en: "What is the voltage at the fault point?",
    },
    o: [
      { uz: "Nominalga teng", ru: "Равно номинальному", en: "Equal to rated" },
      { uz: "Nolga teng", ru: "Равно нулю", en: "Equal to zero" },
      { uz: "Nominalning 60 % i", ru: "60 % номинального", en: "60 % of rated" },
      { uz: "Ikki baravar ortadi", ru: "Возрастает вдвое", en: "Doubles" },
    ],
    e: {
      uz: "Qisqa tutashuvning K nuqtasidagi kuchlanish nolga teng; boshqa nuqtada Um = Iq·Zm (1-ma'ruza).",
      ru: "Напряжение в точке КЗ K равно нулю; в остальных точках Uм = Iк·Zм (лекция 1).",
      en: "The voltage at fault point K is zero; elsewhere Um = Isc·Zm (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "Joul-Lens qonuniga ko'ra QT da ajraladigan issiqlik nimaga bog'liq?",
      ru: "От чего по закону Джоуля-Ленца зависит теплота, выделяемая при КЗ?",
      en: "By the Joule-Lenz law, what does the heat released during a fault depend on?",
    },
    o: [
      { uz: "Faqat kuchlanishga", ru: "Только от напряжения", en: "On voltage only" },
      {
        uz: "Tok kvadrati, qarshilik va vaqtga",
        ru: "От квадрата тока, сопротивления и времени",
        en: "On current squared, resistance and time",
      },
      { uz: "Faqat chastotaga", ru: "Только от частоты", en: "On frequency only" },
      { uz: "Faqat izolyasiya turiga", ru: "Только от типа изоляции", en: "On insulation type only" },
    ],
    e: {
      uz: "Q = k·Iq²·R·t — tok va vaqt qancha katta bo'lsa, issiqlik shuncha katta (1-ma'ruza).",
      ru: "Q = k·Iк²·R·t — чем больше ток и время, тем больше теплота (лекция 1).",
      en: "Q = k·Isc²·R·t — the greater the current and time, the greater the heat (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "Neytrali izolyasiyalangan tarmoqda bir fazaning yerga tutashuvi nima uchun QT hisoblanmaydi?",
      ru: "Почему замыкание одной фазы на землю в сети с изолированной нейтралью не является КЗ?",
      en: "Why is a single phase-to-earth contact in an isolated-neutral network not a short circuit?",
    },
    o: [
      { uz: "Tok umuman oqmaydi", ru: "Ток совсем не течёт", en: "No current flows at all" },
      {
        uz: "Shikastlangan fazaning EYuK i yer bilan shunt hosil qilmaydi, tok faqat sog' fazalarning sig'imi orqali oqadi",
        ru: "ЭДС повреждённой фазы не шунтируется землёй, ток течёт лишь через ёмкость неповреждённых фаз",
        en: "The faulted phase EMF is not shunted by earth; current flows only through the healthy phases' capacitance",
      },
      { uz: "Faza kuchlanishi nolga tushadi", ru: "Фазное напряжение падает до нуля", en: "The phase voltage drops to zero" },
      { uz: "Himoya darhol o'chiradi", ru: "Защита мгновенно отключает", en: "Protection trips immediately" },
    ],
    e: {
      uz: "EA EYuK yer bilan shunt hosil qilmaydi; IZ toki B va C fazalarning yerga nisbatan C sig'imi orqali oqadi va qiymati kichik bo'ladi (1-ma'ruza).",
      ru: "ЭДС EA не шунтируется землёй; ток Iз течёт через ёмкость C фаз B и C на землю и невелик (лекция 1).",
      en: "The EA EMF is not shunted by earth; the current flows through the earth capacitance of phases B and C and is small (lecture 1).",
    },
  },
  {
    l: 1, type: "tf", a: true,
    q: {
      uz: "Neytrali izolyasiyalangan tarmoqda bir fazali yerga tutashuvda fazalararo kuchlanish o'zgarmasdan qoladi.",
      ru: "При однофазном замыкании на землю в сети с изолированной нейтралью линейное напряжение остаётся неизменным.",
      en: "In an isolated-neutral network, a single phase-to-earth fault leaves the line voltage unchanged.",
    },
    e: {
      uz: "Shuning uchun iste'molchilar ishiga ta'sir qilmaydi, lekin tarmoqda o'ta kuchlanish paydo bo'ladi (1-ma'ruza).",
      ru: "Поэтому работа потребителей не нарушается, но в сети возникают перенапряжения (лекция 1).",
      en: "Consumers are therefore unaffected, but overvoltages appear in the network (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "Nominal tok deb nimaga aytiladi?",
      ru: "Что называют номинальным током?",
      en: "What is the rated current?",
    },
    o: [
      { uz: "QT paytidagi maksimal tok", ru: "Максимальный ток при КЗ", en: "The maximum current during a fault" },
      {
        uz: "Cheklanmagan vaqt davomida qurilmadan o'tishi mumkin bo'lgan ruxsat etilgan maksimal tok",
        ru: "Наибольший допустимый ток, протекающий через устройство неограниченно долго",
        en: "The maximum permissible current that may flow indefinitely",
      },
      { uz: "Releni ishlash toki", ru: "Ток срабатывания реле", en: "The relay pickup current" },
      { uz: "Magnitlanish toki", ru: "Ток намагничивания", en: "The magnetising current" },
    ],
    e: {
      uz: "Inom — cheklanmagan vaqt davomida o'tishi mumkin bo'lgan ruxsat etilgan maksimal tok (1-ma'ruza).",
      ru: "Iном — наибольший допустимый ток, который может протекать неограниченно долго (лекция 1).",
      en: "The rated current is the maximum current permitted to flow indefinitely (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 2,
    q: {
      uz: "Tebranish paytida EYuK lar orasidagi δ = 180° bo'lsa ΔE nimaga teng bo'ladi?",
      ru: "Чему равно ΔE при качаниях, когда угол между ЭДС δ = 180°?",
      en: "During swings, what is ΔE when the angle between the EMFs is δ = 180°?",
    },
    o: [
      { uz: "0", ru: "0", en: "0" },
      { uz: "E", ru: "E", en: "E" },
      { uz: "2·E", ru: "2·E", en: "2·E" },
      { uz: "E/2", ru: "E/2", en: "E/2" },
    ],
    e: {
      uz: "δ = 0 da ΔE = 0; δ = 180° da ΔE = 2·E; δ = 360° da yana nolga tenglashadi (1-ma'ruza).",
      ru: "При δ = 0 ΔE = 0; при δ = 180° ΔE = 2·E; при δ = 360° снова ноль (лекция 1).",
      en: "At δ = 0, ΔE = 0; at δ = 180°, ΔE = 2·E; at δ = 360° it returns to zero (lecture 1).",
    },
  },
  {
    l: 1, type: "mcq", a: 1,
    q: {
      uz: "Asinxron rejimda generatorda nima kuzatiladi?",
      ru: "Что наблюдается у генератора в асинхронном режиме?",
      en: "What happens to a generator in the asynchronous mode?",
    },
    o: [
      { uz: "Kuchlanish nolga tushadi", ru: "Напряжение падает до нуля", en: "Voltage drops to zero" },
      {
        uz: "Aylanish chastotasi ortadi va stator tokida pulsatsiya paydo bo'ladi",
        ru: "Частота вращения возрастает, в токе статора появляются пульсации",
        en: "The rotational speed rises and the stator current pulsates",
      },
      { uz: "Chastota o'zgarmaydi", ru: "Частота не меняется", en: "Frequency stays the same" },
      { uz: "Tok butunlay yo'qoladi", ru: "Ток полностью исчезает", en: "Current disappears completely" },
    ],
    e: {
      uz: "Qo'zg'atishsiz ishlaganda aylanish chastotasi ortadi va stator toki pulsatsiyasi yuzaga keladi (1-ma'ruza).",
      ru: "При работе без возбуждения частота вращения растёт и возникает пульсация тока статора (лекция 1).",
      en: "Running without excitation, the speed rises and stator current pulsation appears (lecture 1).",
    },
  },
  {
    l: 1, type: "tf", a: true,
    q: {
      uz: "AQU, ZAU va ChAY — bu rele himoyasi bilan bog'liq elektr avtomatika turlari.",
      ru: "АПВ, АВР и АЧР — это виды электроавтоматики, связанные с релейной защитой.",
      en: "Auto-reclosing, transfer of reserve and load shedding are types of automation linked with protection.",
    },
    e: {
      uz: "RH boshqa avtomatika turlari — AQU, ZAU, ChAY bilan o'zaro bog'liq ishlaydi (1-ma'ruza).",
      ru: "РЗ работает во взаимосвязи с другими видами автоматики — АПВ, АВР, АЧР (лекция 1).",
      en: "Protection works together with other automation such as AR, ATS and UFLS (lecture 1).",
    },
  },
  {
    l: 1, type: "match",
    q: {
      uz: "QT turlarini belgilar bilan moslashtiring:",
      ru: "Сопоставьте виды КЗ с обозначениями:",
      en: "Match the fault types with their symbols:",
    },
    pairs: [
      [
        { uz: "Uch fazali QT", ru: "Трёхфазное КЗ", en: "Three-phase fault" },
        { uz: "K(3)", ru: "К(3)", en: "F(3)" },
      ],
      [
        { uz: "Ikki fazali QT", ru: "Двухфазное КЗ", en: "Two-phase fault" },
        { uz: "K(2)", ru: "К(2)", en: "F(2)" },
      ],
      [
        { uz: "Bir fazali yerga QT", ru: "Однофазное КЗ на землю", en: "Single-phase-to-earth" },
        { uz: "K(1)", ru: "К(1)", en: "F(1)" },
      ],
      [
        { uz: "Ikki fazali yerga QT", ru: "Двухфазное КЗ на землю", en: "Two-phase-to-earth" },
        { uz: "K(1,1)", ru: "К(1,1)", en: "F(1,1)" },
      ],
    ],
    e: {
      uz: "QT lar K(3), K(2), K(1) va K(1,1) ga bo'linadi (1-ma'ruza, 1.2-rasm).",
      ru: "КЗ делятся на К(3), К(2), К(1) и К(1,1) (лекция 1, рис. 1.2).",
      en: "Faults are classified as F(3), F(2), F(1) and F(1,1) (lecture 1, fig. 1.2).",
    },
  },

  /* ================= 2-MA'RUZA ================= */
  {
    l: 2, type: "mcq", a: 1,
    q: {
      uz: "Selektivlik (tanlovchanlik) nima?",
      ru: "Что такое селективность (избирательность)?",
      en: "What is selectivity?",
    },
    o: [
      { uz: "Himoyaning tez ishlashi", ru: "Быстрота действия защиты", en: "Speed of protection operation" },
      {
        uz: "Tarmoqning faqat shikastlangan uchastkasini o'chirish qobiliyati",
        ru: "Способность отключать только повреждённый участок сети",
        en: "The ability to trip only the faulted section",
      },
      { uz: "Kichik toklarni sezish", ru: "Чувствительность к малым токам", en: "Detecting small currents" },
      { uz: "Buzilmasdan ishlash", ru: "Безотказная работа", en: "Failure-free operation" },
    ],
    e: {
      uz: "Selektivlik — faqat shikastlangan uchastkani, shikastlanish joyiga eng yaqin o'chirgichni o'chirish qobiliyati (2-ma'ruza).",
      ru: "Селективность — способность отключать только повреждённый участок, выключатель, ближайший к месту повреждения (лекция 2).",
      en: "Selectivity is the ability to trip only the faulted section — the breaker nearest the fault (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 1,
    q: {
      uz: "QT ni to'liq o'chirish vaqti qanday aniqlanadi?",
      ru: "Как определяется полное время отключения КЗ?",
      en: "How is the total fault clearing time found?",
    },
    o: [
      { uz: "tq.o' = th − to'", ru: "tо.кз = tз − tв", en: "tclear = tprot − tbrk" },
      { uz: "tq.o' = th + to'", ru: "tо.кз = tз + tв", en: "tclear = tprot + tbrk" },
      { uz: "tq.o' = th · to'", ru: "tо.кз = tз · tв", en: "tclear = tprot · tbrk" },
      { uz: "tq.o' = to'/th", ru: "tо.кз = tв/tз", en: "tclear = tbrk/tprot" },
    ],
    e: {
      uz: "tq.o' = th + to' — RH ishlash vaqti va o'chirgichning uzish vaqti yig'indisi (2-ma'ruza).",
      ru: "tо.кз = tз + tв — сумма времени действия РЗ и времени отключения выключателя (лекция 2).",
      en: "It is the sum of the protection operating time and the breaker interrupting time (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 2,
    q: {
      uz: "Uchastka oxiridagi K(3) da qoldiq kuchlanish nominalning necha foizidan kam bo'lsa tez ishlovchi RH kerak bo'ladi?",
      ru: "При каком остаточном напряжении (в % от номинального) при К(3) в конце участка требуется быстродействующая РЗ?",
      en: "Below what percentage of rated residual voltage for a three-phase fault at the section end is high-speed protection required?",
    },
    o: [
      { uz: "30 %", ru: "30 %", en: "30 %" },
      { uz: "45 %", ru: "45 %", en: "45 %" },
      { uz: "60 %", ru: "60 %", en: "60 %" },
      { uz: "80 %", ru: "80 %", en: "80 %" },
    ],
    e: {
      uz: "Qoldiq kuchlanish nominalning 60 % dan kam bo'lsa, turg'unlikni saqlash uchun tez ishlovchi RH qo'llash kerak (2-ma'ruza).",
      ru: "Если остаточное напряжение меньше 60 % номинального, для сохранения устойчивости нужна быстродействующая РЗ (лекция 2).",
      en: "If the residual voltage is under 60 % of rated, high-speed protection is needed to preserve stability (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 2,
    q: {
      uz: "110-220 kV li EUL da fazalararo QT qancha vaqtda o'chirilishi kerak?",
      ru: "За какое время должно отключаться междуфазное КЗ на ЛЭП 110-220 кВ?",
      en: "Within what time must a phase-to-phase fault on a 110-220 kV line be cleared?",
    },
    o: [
      { uz: "0,01-0,02 s", ru: "0,01-0,02 с", en: "0.01-0.02 s" },
      { uz: "0,06-0,08 s", ru: "0,06-0,08 с", en: "0.06-0.08 s" },
      { uz: "0,1-0,12 s", ru: "0,1-0,12 с", en: "0.1-0.12 s" },
      { uz: "1,5-3 s", ru: "1,5-3 с", en: "1.5-3 s" },
    ],
    e: {
      uz: "750-1150 kV uchun 0,06-0,08 s; 330-500 kV va 110-220 kV uchun 0,1-0,12 s (2-ma'ruza).",
      ru: "Для 750-1150 кВ — 0,06-0,08 с; для 330-500 кВ и 110-220 кВ — 0,1-0,12 с (лекция 2).",
      en: "For 750-1150 kV it is 0.06-0.08 s; for 330-500 kV and 110-220 kV, 0.1-0.12 s (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 3,
    q: {
      uz: "6-35 kV taqsimlovchi tarmoqlarda QT ni o'chirishga qancha vaqt ruxsat etiladi?",
      ru: "Какое время отключения КЗ допускается в распределительных сетях 6-35 кВ?",
      en: "What fault clearing time is permitted in 6-35 kV distribution networks?",
    },
    o: [
      { uz: "0,02 s", ru: "0,02 с", en: "0.02 s" },
      { uz: "0,1 s", ru: "0,1 с", en: "0.1 s" },
      { uz: "0,5 s", ru: "0,5 с", en: "0.5 s" },
      { uz: "1,5-3 s", ru: "1,5-3 с", en: "1.5-3 s" },
    ],
    e: {
      uz: "Asosiy ES lardan uzoq 6-35 kV tarmoqlarda 1,5-3 s ham ruxsat etiladi (2-ma'ruza).",
      ru: "В удалённых от основных ЭС сетях 6-35 кВ допускается и 1,5-3 с (лекция 2).",
      en: "In 6-35 kV networks remote from the main stations, 1.5-3 s is also permitted (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 1,
    q: {
      uz: "Uzoq zahiralash nima?",
      ru: "Что такое дальнее резервирование?",
      en: "What is remote backup?",
    },
    o: [
      { uz: "Himoyaning o'z zonasini himoyalashi", ru: "Защита собственной зоны", en: "Protecting its own zone" },
      {
        uz: "Keyingi (ikkinchi) hududdagi QT ga ham yetarli sezgirlikka ega bo'lishi",
        ru: "Достаточная чувствительность и к КЗ в следующей (второй) зоне",
        en: "Having enough sensitivity for a fault in the next (second) zone too",
      },
      { uz: "Ikkita bir xil himoya o'rnatish", ru: "Установка двух одинаковых защит", en: "Installing two identical protections" },
      { uz: "Akkumulyator batareyasi zahirasi", ru: "Резерв аккумуляторной батареи", en: "A battery reserve" },
    ],
    e: {
      uz: "RH1 ning keyingi RH2 zonasidagi QT ni ham o'chirish funksiyasi uzoq zahiralash deb nomlanadi (2-ma'ruza).",
      ru: "Функция РЗ1 отключать КЗ и в зоне следующей РЗ2 называется дальним резервированием (лекция 2).",
      en: "The ability of RP1 to clear a fault in the zone of the next protection RP2 is called remote backup (lecture 2).",
    },
  },
  {
    l: 2, type: "tf", a: true,
    q: {
      uz: "Nonormal rejimlardan himoyaga qoidaga asosan tezkorlik talab etilmaydi.",
      ru: "От защиты от ненормальных режимов, как правило, быстродействие не требуется.",
      en: "Protection against abnormal modes is, as a rule, not required to be fast.",
    },
    e: {
      uz: "Nonormal rejim himoyasidan tanlovchanlik, sezgirlik va ishonchlilik talab qilinadi; tezkorlik esa qoidaga asosan talab etilmaydi (2-ma'ruza).",
      ru: "От такой защиты требуются селективность, чувствительность и надёжность; быстродействие, как правило, не требуется (лекция 2).",
      en: "Such protection must be selective, sensitive and reliable; speed is usually not required (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 1,
    q: {
      uz: "Noselektiv tez ishlovchi himoyaning kamchiligi qanday tuzatiladi?",
      ru: "Как исправляется недостаток неселективной быстродействующей защиты?",
      en: "How is the drawback of non-selective fast protection corrected?",
    },
    o: [
      { uz: "Vaqt relesi qo'shish bilan", ru: "Добавлением реле времени", en: "By adding a time relay" },
      { uz: "AQU yordamida qayta qo'shish bilan", ru: "Повторным включением с помощью АПВ", en: "By re-energising with auto-reclosing" },
      { uz: "Tok relesini almashtirish bilan", ru: "Заменой реле тока", en: "By replacing the current relay" },
      { uz: "Kuchlanish relesi qo'shish bilan", ru: "Добавлением реле напряжения", en: "By adding a voltage relay" },
    ],
    e: {
      uz: "Noselektivlikni tuzatish uchun AQU ishlatiladi: noselektiv o'chgan hududni qayta tez qo'shadi (2-ma'ruza).",
      ru: "Для исправления неселективности применяют АПВ: оно быстро включает неселективно отключённый участок (лекция 2).",
      en: "Auto-reclosing corrects it by quickly re-energising the section that was tripped non-selectively (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 2,
    q: {
      uz: "RH ishonchliligi nimaga bog'liq emas?",
      ru: "От чего НЕ зависит надёжность РЗ?",
      en: "What does protection reliability NOT depend on?",
    },
    o: [
      { uz: "Sxemaning soddaligiga", ru: "От простоты схемы", en: "On circuit simplicity" },
      { uz: "Elementlar soniga", ru: "От числа элементов", en: "On the number of components" },
      { uz: "Iste'molchining tarif rejasiga", ru: "От тарифного плана потребителя", en: "On the consumer's tariff plan" },
      {
        uz: "Montaj va kontaktli birlashmalar sifatiga",
        ru: "От качества монтажа и контактных соединений",
        en: "On wiring and contact quality",
      },
    ],
    e: {
      uz: "Ishonchlilik sxema soddaligi, elementlar soni, montaj sifati va davriy tekshiruvga bog'liq (2-ma'ruza).",
      ru: "Надёжность зависит от простоты схемы, числа элементов, качества монтажа и периодических проверок (лекция 2).",
      en: "Reliability depends on circuit simplicity, component count, wiring quality and periodic testing (lecture 2).",
    },
  },
  {
    l: 2, type: "mcq", a: 1,
    q: {
      uz: "RH sezgirligi qanday rejimda ham yetarli bo'lishi kerak?",
      ru: "В каком режиме чувствительность РЗ также должна быть достаточной?",
      en: "In which conditions must protection sensitivity also be adequate?",
    },
    o: [
      { uz: "Faqat maksimal rejimda", ru: "Только в максимальном режиме", en: "In the maximum mode only" },
      {
        uz: "Minimal rejimda va o'tkinchi Ro' qarshilik orqali tutashuvda",
        ru: "В минимальном режиме и при замыкании через переходное сопротивление Rп",
        en: "In the minimum mode and for a fault through a transition resistance",
      },
      { uz: "Faqat normal rejimda", ru: "Только в нормальном режиме", en: "In the normal mode only" },
      { uz: "Faqat salt ishlashda", ru: "Только на холостом ходу", en: "At no load only" },
    ],
    e: {
      uz: "Sezgirlik energotizimning minimal rejimida va o'tkinchi qarshilik orqali tutashuvda ham yetarli bo'lishi kerak (2-ma'ruza).",
      ru: "Чувствительность должна быть достаточной в минимальном режиме энергосистемы и при замыкании через переходное сопротивление (лекция 2).",
      en: "Sensitivity must suffice in the system's minimum mode and for faults through a transition resistance (lecture 2).",
    },
  },
  {
    l: 2, type: "match",
    q: {
      uz: "RH ga qo'yiladigan to'rtta asosiy talabni ta'rifi bilan moslashtiring:",
      ru: "Сопоставьте четыре основных требования к РЗ с их определениями:",
      en: "Match the four main protection requirements with their definitions:",
    },
    pairs: [
      [
        { uz: "Selektivlik", ru: "Селективность", en: "Selectivity" },
        {
          uz: "Faqat shikastlangan uchastkani o'chirish",
          ru: "Отключение только повреждённого участка",
          en: "Tripping only the faulted section",
        },
      ],
      [
        { uz: "Tezkorlik", ru: "Быстродействие", en: "Speed" },
        {
          uz: "QT ni imkon qadar tez o'chirish",
          ru: "Отключение КЗ как можно быстрее",
          en: "Clearing the fault as fast as possible",
        },
      ],
      [
        { uz: "Sezgirlik", ru: "Чувствительность", en: "Sensitivity" },
        {
          uz: "Zona oxiridagi QT ga javob bera olish",
          ru: "Способность реагировать на КЗ в конце зоны",
          en: "Responding to a fault at the zone end",
        },
      ],
      [
        { uz: "Ishonchlilik", ru: "Надёжность", en: "Reliability" },
        {
          uz: "Buzilmasdan ishlash va noto'g'ri ishlamaslik",
          ru: "Безотказность и отсутствие ложных срабатываний",
          en: "No failures and no false operation",
        },
      ],
    ],
    e: {
      uz: "Himoya shikastlanishdan to'rtta asosiy talabga javob berishi lozim (2-ma'ruza).",
      ru: "Защита от повреждений должна отвечать четырём основным требованиям (лекция 2).",
      en: "Protection against faults must meet four main requirements (lecture 2).",
    },
  },

  /* ================= 3-MA'RUZA ================= */
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "RH qurilmasi nechta struktura qismdan iborat?",
      ru: "Из скольких структурных частей состоит устройство РЗ?",
      en: "How many structural parts does a protection device have?",
    },
    o: [
      { uz: "Ikkita", ru: "Из двух", en: "Two" },
      { uz: "Uchta", ru: "Из трёх", en: "Three" },
      { uz: "To'rtta", ru: "Из четырёх", en: "Four" },
      { uz: "Beshta", ru: "Из пяти", en: "Five" },
    ],
    e: {
      uz: "O'lchov (sezuvchi), mantiqiy (operativ) va boshqaruvchi (bajaruvchi) qismlar (3-ma'ruza).",
      ru: "Измерительная (чувствительная), логическая (оперативная) и управляющая (исполнительная) части (лекция 3).",
      en: "The measuring (sensing), logic (operating) and output (executive) parts (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "O'lchov qismining vazifasi nima?",
      ru: "Какова задача измерительной части?",
      en: "What is the task of the measuring part?",
    },
    o: [
      { uz: "O'chirgichni o'chirish", ru: "Отключать выключатель", en: "To trip the breaker" },
      {
        uz: "Obyekt holatini nazorat qilib, mantiqiy qismga diskret signal berish",
        ru: "Контролировать состояние объекта и подавать дискретный сигнал в логическую часть",
        en: "To monitor the object and send a discrete signal to the logic part",
      },
      { uz: "Kuchlanishni barqarorlashtirish", ru: "Стабилизировать напряжение", en: "To stabilise the voltage" },
      { uz: "Signal berish", ru: "Подавать сигнал", en: "To raise an alarm" },
    ],
    e: {
      uz: "O'lchov qismi obyektni doimiy nazorat qiladi va mantiqiy qism kirishiga diskret signal beradi (3-ma'ruza).",
      ru: "Измерительная часть непрерывно контролирует объект и подаёт дискретный сигнал на вход логической части (лекция 3).",
      en: "The measuring part continuously monitors the object and feeds a discrete signal to the logic part (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "Xr.q nimani bildiradi?",
      ru: "Что обозначает Xр.в?",
      en: "What does Xres denote?",
    },
    o: [
      { uz: "Relening ishlash parametrini", ru: "Параметр срабатывания реле", en: "The relay pickup parameter" },
      { uz: "Relening qaytish kattaligini", ru: "Параметр возврата реле", en: "The relay reset parameter" },
      { uz: "Chiqish signalini", ru: "Выходной сигнал", en: "The output signal" },
      { uz: "Transformatsiya koeffitsientini", ru: "Коэффициент трансформации", en: "The transformation ratio" },
    ],
    e: {
      uz: "Xr.q — kirish kattaligi kamayganda rele boshlang'ich holatga qaytadigan qiymat (3-ma'ruza).",
      ru: "Xр.в — значение, при снижении до которого реле возвращается в исходное состояние (лекция 3).",
      en: "Xres is the value to which the input must fall for the relay to reset (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "Ikkilamchi relelarning afzalligi nimada?",
      ru: "В чём преимущество вторичных реле?",
      en: "What is the advantage of secondary relays?",
    },
    o: [
      { uz: "Operativ tok talab qilmaydi", ru: "Не требуют оперативного тока", en: "They need no operating supply" },
      {
        uz: "Yuqori kuchlanishdan izolyasiyalangan, standart 5 yoki 1 A va 100 V bilan ishlaydi",
        ru: "Изолированы от высокого напряжения, работают со стандартными 5 или 1 А и 100 В",
        en: "They are isolated from high voltage and work with a standard 5 or 1 A and 100 V",
      },
      { uz: "Narxi eng arzon", ru: "Самые дешёвые", en: "They are the cheapest" },
      { uz: "Kontaktlari yo'q", ru: "Не имеют контактов", en: "They have no contacts" },
    ],
    e: {
      uz: "Ikkilamchi relelar o'lchov transformatorlari orqali izolyasiyalanadi; ikkilamchi nominal tok 5 yoki 1 A, kuchlanish 100 V (3-ma'ruza).",
      ru: "Вторичные реле изолированы измерительными трансформаторами; вторичный номинальный ток 5 или 1 А, напряжение 100 В (лекция 3).",
      en: "They are isolated by instrument transformers; the rated secondary current is 5 or 1 A and the voltage 100 V (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "Kattalikning pasayishiga ishlovchi o'lchov relesi qanday ataladi?",
      ru: "Как называется измерительное реле, срабатывающее при снижении величины?",
      en: "What is a measuring relay that operates on a falling quantity called?",
    },
    o: [
      { uz: "Maksimal", ru: "Максимальное", en: "Maximum" },
      { uz: "Minimal", ru: "Минимальное", en: "Minimum" },
      { uz: "Oraliq", ru: "Промежуточное", en: "Auxiliary" },
      { uz: "Ko'rsatgich", ru: "Указательное", en: "Indicating" },
    ],
    e: {
      uz: "Oshishiga ishlasa maksimal, pasayishiga ishlasa minimal rele deyiladi (3-ma'ruza).",
      ru: "Реагирующее на возрастание называют максимальным, на снижение — минимальным (лекция 3).",
      en: "One responding to a rise is a maximum relay; one responding to a fall is a minimum relay (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "Bevosita ta'sir usulining kamchiligi nima?",
      ru: "В чём недостаток способа прямого действия?",
      en: "What is the drawback of the direct-action method?",
    },
    o: [
      { uz: "Operativ tok kerak", ru: "Требуется оперативный ток", en: "It needs an operating supply" },
      {
        uz: "Sezilarli xatolikka ega va ishlaganda ko'p quvvat iste'mol qiladi",
        ru: "Имеет значительную погрешность и потребляет много мощности при срабатывании",
        en: "It has a large error and consumes much power when operating",
      },
      { uz: "Juda qimmat", ru: "Очень дорог", en: "It is very expensive" },
      { uz: "Faqat 110 kV da ishlaydi", ru: "Работает только на 110 кВ", en: "It works only at 110 kV" },
    ],
    e: {
      uz: "Bevosita usul sodda va operativ tok talab qilmaydi, ammo sezilarli xatolikka ega va ko'p quvvat iste'mol qiladi (3-ma'ruza).",
      ru: "Способ прост и не требует оперативного тока, но имеет заметную погрешность и большое потребление (лекция 3).",
      en: "It is simple and needs no operating supply, but its error and power consumption are high (lecture 3).",
    },
  },
  {
    l: 3, type: "tf", a: true,
    q: {
      uz: "Bilvosita ishlovchi relelarning parametrlari himoya qilinadigan obyektning parametrlariga bog'liq emas.",
      ru: "Параметры реле косвенного действия не зависят от параметров защищаемого объекта.",
      en: "The parameters of indirect-action relays do not depend on the protected object's parameters.",
    },
    e: {
      uz: "Shu sababli ular sezgir, kichik xatolikka ega va obyektni ajratmasdan sozlanadi (3-ma'ruza).",
      ru: "Поэтому они чувствительны, имеют малую погрешность и настраиваются без отключения объекта (лекция 3).",
      en: "Hence they are sensitive, low-error, and can be adjusted without taking the object out of service (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 3,
    q: {
      uz: "Mantiqiy qism tarkibiga nima kirmaydi?",
      ru: "Что НЕ входит в состав логической части?",
      en: "Which of these is NOT part of the logic part?",
    },
    o: [
      { uz: "Mantiqiy organ (MO)", ru: "Логический орган (ЛО)", en: "The logic element" },
      { uz: "Vaqt organi", ru: "Орган времени", en: "The timing element" },
      { uz: "Xotira organi", ru: "Орган памяти", en: "The memory element" },
      { uz: "Tok transformatori", ru: "Трансформатор тока", en: "The current transformer" },
    ],
    e: {
      uz: "TT o'lchov qismini ta'minlaydi; mantiqiy qism MO, vaqt organi, xotira organi va signal elementlaridan iborat (3-ma'ruza).",
      ru: "ТТ питает измерительную часть; логическая часть состоит из ЛО, органа времени, органа памяти и сигнальных элементов (лекция 3).",
      en: "The CT feeds the measuring part; the logic part contains the logic, timing, memory and signalling elements (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 2,
    q: {
      uz: "Zamonaviy relelarda nechta turdagi elementlar bazasi ishlatiladi?",
      ru: "Сколько видов элементной базы применяется в современных реле?",
      en: "How many types of component base are used in modern relays?",
    },
    o: [
      { uz: "Bitta", ru: "Один", en: "One" },
      { uz: "Ikkita", ru: "Два", en: "Two" },
      { uz: "Uchta", ru: "Три", en: "Three" },
      { uz: "Beshta", ru: "Пять", en: "Five" },
    ],
    e: {
      uz: "Elektromexanik, yarimo'tkazgichli va mikroprotsessorli (3-ma'ruza).",
      ru: "Электромеханическая, полупроводниковая и микропроцессорная (лекция 3).",
      en: "Electromechanical, semiconductor and microprocessor (lecture 3).",
    },
  },
  {
    l: 3, type: "mcq", a: 1,
    q: {
      uz: "Bajaruvchi qismda kontaktli sxemalarda nima ishlatiladi?",
      ru: "Что применяется в исполнительной части контактных схем?",
      en: "What is used in the output part of contact schemes?",
    },
    o: [
      { uz: "Tok transformatori", ru: "Трансформатор тока", en: "A current transformer" },
      {
        uz: "Kontaktli elektromexanik oraliq relelari",
        ru: "Контактные электромеханические промежуточные реле",
        en: "Electromechanical auxiliary relays with contacts",
      },
      { uz: "Kuchlanish transformatori", ru: "Трансформатор напряжения", en: "A voltage transformer" },
      { uz: "Akkumulyator", ru: "Аккумулятор", en: "A battery" },
    ],
    e: {
      uz: "Chiqish signallarini kuchaytirish uchun oraliq relelari ishlatiladi; ular 5-10 A gacha tokni qo'shishi mumkin (3-ma'ruza).",
      ru: "Для усиления выходных сигналов применяют промежуточные реле; они могут замыкать ток до 5-10 А (лекция 3).",
      en: "Auxiliary relays amplify the output signals; they can make currents up to 5-10 A (lecture 3).",
    },
  },
  {
    l: 3, type: "match",
    q: {
      uz: "RH tarkibiy qismlarini vazifasi bilan moslashtiring:",
      ru: "Сопоставьте структурные части РЗ с их назначением:",
      en: "Match the protection's structural parts with their purpose:",
    },
    pairs: [
      [
        { uz: "O'lchov qismi", ru: "Измерительная часть", en: "Measuring part" },
        {
          uz: "Obyektni nazorat qilib signal berish",
          ru: "Контроль объекта и подача сигнала",
          en: "Monitoring the object and issuing a signal",
        },
      ],
      [
        { uz: "Mantiqiy qism", ru: "Логическая часть", en: "Logic part" },
        {
          uz: "Mantiqiy amallarni bajarish",
          ru: "Выполнение логических операций",
          en: "Performing logic operations",
        },
      ],
      [
        { uz: "Bajaruvchi qism", ru: "Исполнительная часть", en: "Output part" },
        {
          uz: "Signalni kuchaytirib o'chirgichga berish",
          ru: "Усиление сигнала и подача на выключатель",
          en: "Amplifying the signal and sending it to the breaker",
        },
      ],
    ],
    e: {
      uz: "3.1-rasmdagi struktura sxema (3-ma'ruza).",
      ru: "Структурная схема на рис. 3.1 (лекция 3).",
      en: "The block diagram of fig. 3.1 (lecture 3).",
    },
  },

  /* ================= 4-MA'RUZA ================= */
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "Operativ tok manbasiga qo'yiladigan asosiy talab nima?",
      ru: "Каково основное требование к источнику оперативного тока?",
      en: "What is the main requirement for the operating supply source?",
    },
    o: [
      { uz: "Narxi arzon bo'lishi", ru: "Низкая стоимость", en: "Low cost" },
      {
        uz: "QT va nonormal rejimda kuchlanishi va quvvati RH hamda o'chirgichlar uchun yetarli bo'lishi",
        ru: "Достаточность напряжения и мощности для РЗ и выключателей при КЗ и ненормальных режимах",
        en: "Voltage and power sufficient for protection and breakers during faults and abnormal modes",
      },
      { uz: "Har doim o'zgaruvchan bo'lishi", ru: "Обязательно переменный ток", en: "Always being AC" },
      { uz: "Maxsus bino talab qilmasligi", ru: "Отсутствие специального здания", en: "Needing no special building" },
    ],
    e: {
      uz: "Shikastlanish va nonormal rejim vaqtida manba kuchlanishi va quvvati RH, avtomatika va o'chirgichlar uchun yetarli bo'lishi kerak (4-ma'ruza).",
      ru: "При повреждениях и ненормальных режимах напряжение и мощность источника должны быть достаточны для РЗ, автоматики и выключателей (лекция 4).",
      en: "During faults and abnormal modes the source voltage and power must suffice for protection, automation and breakers (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "O'zgarmas operativ tok manbai sifatida nima xizmat qiladi?",
      ru: "Что служит источником постоянного оперативного тока?",
      en: "What serves as the DC operating supply source?",
    },
    o: [
      { uz: "Tok transformatori", ru: "Трансформатор тока", en: "A current transformer" },
      {
        uz: "110-220 V li akkumulyator batareyalari",
        ru: "Аккумуляторные батареи 110-220 В",
        en: "110-220 V storage batteries",
      },
      { uz: "Shaxsiy ehtiyoj transformatori", ru: "Трансформатор собственных нужд", en: "The auxiliary transformer" },
      { uz: "Kuchlanish transformatori", ru: "Трансформатор напряжения", en: "A voltage transformer" },
    ],
    e: {
      uz: "Nominal kuchlanishi 110-220 V, ba'zan 48 V akkumulyator batareyalari (4-ma'ruza).",
      ru: "Аккумуляторные батареи номинальным напряжением 110-220 В, иногда 48 В (лекция 4).",
      en: "Storage batteries rated 110-220 V, sometimes 48 V (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "O'zgaruvchan operativ tok manbalari qaysilar?",
      ru: "Какие источники переменного оперативного тока применяются?",
      en: "Which AC operating supply sources are used?",
    },
    o: [
      { uz: "Faqat akkumulyator", ru: "Только аккумулятор", en: "Only the battery" },
      { uz: "TT, KT va ShET", ru: "ТТ, ТН и ТСН", en: "CT, VT and the auxiliary transformer" },
      { uz: "Faqat generator", ru: "Только генератор", en: "Only the generator" },
      { uz: "Kondensator batareyasi", ru: "Конденсаторная батарея", en: "A capacitor bank" },
    ],
    e: {
      uz: "Tok transformatori, kuchlanish transformatori va shaxsiy ehtiyoj transformatori (4-ma'ruza).",
      ru: "Трансформатор тока, трансформатор напряжения и трансформатор собственных нужд (лекция 4).",
      en: "The current transformer, the voltage transformer and the auxiliary services transformer (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "Nima uchun QT da TT operativ zanjir uchun ishonchli manba hisoblanadi?",
      ru: "Почему при КЗ ТТ считается надёжным источником для оперативных цепей?",
      en: "Why is the CT a reliable source for operating circuits during a fault?",
    },
    o: [
      { uz: "Kuchlanishi o'zgarmaydi", ru: "Его напряжение не меняется", en: "Its voltage does not change" },
      {
        uz: "QT da ikkilamchi tok, kuchlanish va quvvat tezda oshadi",
        ru: "При КЗ вторичный ток, напряжение и мощность быстро возрастают",
        en: "During a fault its secondary current, voltage and power rise rapidly",
      },
      { uz: "U akkumulyatorga ulangan", ru: "Он подключён к аккумулятору", en: "It is connected to a battery" },
      { uz: "U doim zaryadlangan", ru: "Он всегда заряжен", en: "It is always charged" },
    ],
    e: {
      uz: "QT bo'lganda TT ikkilamchi toki tezda oshadi, unga mos ravishda kuchlanish va quvvat ham ortadi (4-ma'ruza).",
      ru: "При КЗ вторичный ток ТТ быстро растёт, соответственно возрастают напряжение и мощность (лекция 4).",
      en: "During a fault the CT secondary current rises quickly, and so do its voltage and power (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "Nima uchun KT va ShET ni QT dan himoya operativ zanjirini ta'minlashga ulash maqsadga muvofiq emas?",
      ru: "Почему нецелесообразно питать оперативные цепи защиты от КЗ через ТН и ТСН?",
      en: "Why is it inadvisable to feed fault-protection operating circuits from the VT or auxiliary transformer?",
    },
    o: [
      { uz: "Ular juda qimmat", ru: "Они очень дороги", en: "They are very expensive" },
      {
        uz: "QT da tarmoq kuchlanishi tezda kamayadi va ta'minot ishga yaroqsiz bo'ladi",
        ru: "При КЗ напряжение сети быстро снижается и питание становится непригодным",
        en: "During a fault the network voltage collapses and the supply becomes unusable",
      },
      { uz: "Ular faqat o'zgarmas tok beradi", ru: "Они дают только постоянный ток", en: "They give DC only" },
      { uz: "Ular juda katta quvvat beradi", ru: "Они дают слишком большую мощность", en: "They deliver too much power" },
    ],
    e: {
      uz: "QT bo'lganda kuchlanish tezda kamayadi va RH operativ zanjiri ta'minoti ishga yaroqsiz bo'lib qoladi (4-ma'ruza).",
      ru: "При КЗ напряжение быстро падает и питание оперативных цепей РЗ становится непригодным (лекция 4).",
      en: "During a fault the voltage drops quickly and the supply to the protection circuits becomes unusable (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "KH relesi o'zgarmas tok sxemasida nimani nazorat qiladi?",
      ru: "Что контролирует реле KH в схеме постоянного тока?",
      en: "What does the KH relay supervise in the DC scheme?",
    },
    o: [
      { uz: "Chastotani", ru: "Частоту", en: "Frequency" },
      {
        uz: "Saqlagichlar sozligi, YAT zanjiri butunligi va SQ kontaktlarini",
        ru: "Исправность предохранителей, целостность цепи YAT и контакты SQ",
        en: "Fuse health, trip-coil circuit continuity and the SQ contacts",
      },
      { uz: "Akkumulyator zaryadini", ru: "Заряд аккумулятора", en: "Battery charge" },
      { uz: "Yuklama tokini", ru: "Ток нагрузки", en: "Load current" },
    ],
    e: {
      uz: "Saqlagichlarning sozligi, elektromagnit uzgichining zanjirini butunligi va SQ yordamchi kontaktlari KH relesi bilan nazorat qilinadi (4-ma'ruza).",
      ru: "Исправность предохранителей, целостность цепи электромагнита отключения и вспомогательные контакты SQ контролируются реле KH (лекция 4).",
      en: "Fuse health, trip-coil circuit integrity and the SQ auxiliary contacts are supervised by the KH relay (lecture 4).",
    },
  },
  {
    l: 4, type: "tf", a: true,
    q: {
      uz: "O'zgarmas tok tarmog'ida ikki har xil nuqtada yerga tutashuv bo'lsa, o'chirgich noto'g'ri o'chishi mumkin.",
      ru: "При замыкании на землю в двух разных точках сети постоянного тока выключатель может ложно отключиться.",
      en: "Earth faults at two different points of the DC network can cause a false trip.",
    },
    e: {
      uz: "RH kontaktlari shuntlanadi va YAT da tok paydo bo'ladi — yolg'on zanjir hosil bo'ladi (4-ma'ruza).",
      ru: "Контакты РЗ шунтируются, в YAT появляется ток — образуется ложная цепь (лекция 4).",
      en: "The protection contacts are shunted and current appears in the trip coil — a false circuit forms (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 0,
    q: {
      uz: "ShU, ShV va ShS shinalari nimani ta'minlaydi?",
      ru: "Что питают шины ШУ, ШВ и ШС?",
      en: "What do the control, closing and alarm busbars feed?",
    },
    o: [
      {
        uz: "Boshqaruv, qo'shish va signalizatsiya zanjirlarini",
        ru: "Цепи управления, включения и сигнализации",
        en: "The control, closing and alarm circuits",
      },
      { uz: "Faqat yoritishni", ru: "Только освещение", en: "Lighting only" },
      { uz: "Faqat motorlarni", ru: "Только двигатели", en: "Motors only" },
      { uz: "Faqat o'lchov asboblarini", ru: "Только измерительные приборы", en: "Instruments only" },
    ],
    e: {
      uz: "ShU — boshqaruv (RH va YAT), ShV — qo'shish, ShS — signalizatsiya shinasi (4-ma'ruza).",
      ru: "ШУ — управление (РЗ и YAT), ШВ — включение, ШС — сигнализация (лекция 4).",
      en: "The control bus feeds protection and tripping, the closing bus the closing coil, the alarm bus the signalling (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "BPN va BPT bloklarining chiqishlari nima uchun parallel ulanadi?",
      ru: "Почему выходы блоков БПН и БПТ включают параллельно?",
      en: "Why are the outputs of the voltage-fed and current-fed units paralleled?",
    },
    o: [
      { uz: "Narxni kamaytirish uchun", ru: "Для снижения стоимости", en: "To reduce cost" },
      {
        uz: "Turli ish rejimlarida, shu jumladan Q1 o'chirilganda ham operativ kuchlanishni ta'minlash uchun",
        ru: "Чтобы обеспечить оперативное напряжение во всех режимах, в том числе при отключённом Q1",
        en: "To keep operating voltage available in all modes, including with Q1 open",
      },
      { uz: "Tokni oshirish uchun", ru: "Для увеличения тока", en: "To increase the current" },
      { uz: "Kuchlanishni ikki barobar oshirish uchun", ru: "Чтобы удвоить напряжение", en: "To double the voltage" },
    ],
    e: {
      uz: "Parallel ulanish barcha rejimlarda, shu jumladan uzgich o'chirilganda ham zarur operativ kuchlanishni ta'minlaydi (4-ma'ruza).",
      ru: "Параллельное включение обеспечивает нужное оперативное напряжение во всех режимах, включая отключённый выключатель (лекция 4).",
      en: "Paralleling keeps the required operating voltage in all modes, including with the breaker open (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "Akkumulyator batareyalarining kamchiligi nima?",
      ru: "В чём недостаток аккумуляторных батарей?",
      en: "What is the drawback of storage batteries?",
    },
    o: [
      { uz: "QT da ishlamaydi", ru: "Не работают при КЗ", en: "They fail during faults" },
      {
        uz: "Qimmat, zaryadlovchi qurilma va maxsus bino talab qiladi",
        ru: "Дороги, требуют зарядного устройства и специального здания",
        en: "Expensive, and they need a charger and a special building",
      },
      { uz: "Kuchlanishi past", ru: "Низкое напряжение", en: "Their voltage is low" },
      { uz: "Faqat signalizatsiyaga yetadi", ru: "Хватает только на сигнализацию", en: "They suffice only for alarms" },
    ],
    e: {
      uz: "Ular boshqa manbalarga nisbatan qimmat, zaryadlovchi qurilma, maxsus bino va malakali xodim talab etadi (4-ma'ruza).",
      ru: "Они дороже других источников, требуют зарядного устройства, специального здания и квалифицированного персонала (лекция 4).",
      en: "They cost more than other sources and need a charger, a dedicated building and skilled staff (lecture 4).",
    },
  },
  {
    l: 4, type: "mcq", a: 1,
    q: {
      uz: "Kondensator batareyasidan foydalanishda QT bo'lganda razryad zanjirini kim qo'shadi?",
      ru: "Кто замыкает цепь разряда конденсатора при КЗ?",
      en: "What closes the capacitor discharge circuit during a fault?",
    },
    o: [
      { uz: "KT vaqt relesi", ru: "Реле времени KT", en: "The KT time relay" },
      { uz: "KA1 tok relesining kontakti", ru: "Контакт реле тока KA1", en: "The KA1 current relay contact" },
      { uz: "KH ko'rsatgich relesi", ru: "Указательное реле KH", en: "The KH flag relay" },
      { uz: "SQ kontakti", ru: "Контакт SQ", en: "The SQ contact" },
    ],
    e: {
      uz: "QT sodir bo'lganda KA1 tok relesi ishga tushadi, uning kontakti kondensator razryad zanjirini LQ1 g'altak bilan qo'shadi (4-ma'ruza).",
      ru: "При КЗ срабатывает реле тока KA1, его контакт замыкает цепь разряда конденсатора на катушку LQ1 (лекция 4).",
      en: "On a fault the KA1 current relay picks up and its contact connects the capacitor discharge circuit to the LQ1 coil (lecture 4).",
    },
  },
];
