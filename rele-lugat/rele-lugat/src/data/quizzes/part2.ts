import type { Quiz } from "../../types";

/** 5-8 ma'ruzalar test savollari. */
export const QUIZ2: Quiz[] = [
  /* ================= 5-MA'RUZA ================= */
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "TT ishida xatolikning asosiy sababi nima?",
      ru: "Что является основной причиной погрешности ТТ?",
      en: "What is the main cause of CT error?",
    },
    o: [
      { uz: "Yuklama toki", ru: "Ток нагрузки", en: "Load current" },
      { uz: "Magnitlanish toki Imag", ru: "Ток намагничивания Iнам", en: "The magnetising current" },
      { uz: "Chastota", ru: "Частота", en: "Frequency" },
      { uz: "Kuchlanish", ru: "Напряжение", en: "Voltage" },
    ],
    e: {
      uz: "Haqiqiy ikkilamchi tok hisobiy qiymatdan Imag/kI ga farqlanadi — xatolik sababi magnitlanish toki (5-ma'ruza).",
      ru: "Действительный вторичный ток отличается от расчётного на Iнам/kI — причина погрешности в токе намагничивания (лекция 5).",
      en: "The actual secondary current differs from the calculated one by Imag/kI — the magnetising current is the cause (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "TT ning transformatsiya koeffitsienti qanday ifodalanadi?",
      ru: "Как выражается коэффициент трансформации ТТ?",
      en: "How is the CT transformation ratio expressed?",
    },
    o: [
      { uz: "kI = w1/w2", ru: "kI = w1/w2", en: "kI = w1/w2" },
      { uz: "kI = w2/w1", ru: "kI = w2/w1", en: "kI = w2/w1" },
      { uz: "kI = I2/I1", ru: "kI = I2/I1", en: "kI = I2/I1" },
      { uz: "kI = U1/U2", ru: "kI = U1/U2", en: "kI = U1/U2" },
    ],
    e: {
      uz: "kIB = w2/w1 — o'ramli transformatsiya koeffitsienti; nominal koeffitsient KI = I1nom/I2nom (5-ma'ruza).",
      ru: "kIв = w2/w1 — витковый коэффициент; номинальный коэффициент KI = I1ном/I2ном (лекция 5).",
      en: "The turns ratio is w2/w1; the rated ratio is KI = I1rated/I2rated (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "To'la xatolik ε nima bilan aniqlanadi?",
      ru: "Чем определяется полная погрешность ε?",
      en: "What defines the composite error ε?",
    },
    o: [
      { uz: "Faqat burchak bilan", ru: "Только углом", en: "By the angle only" },
      {
        uz: "Keltirilgan magnitlanish tokining moduli bilan",
        ru: "Модулем приведённого тока намагничивания",
        en: "By the magnitude of the referred magnetising current",
      },
      { uz: "Yuklama qarshiligi bilan", ru: "Сопротивлением нагрузки", en: "By the burden impedance" },
      { uz: "Chastota bilan", ru: "Частотой", en: "By frequency" },
    ],
    e: {
      uz: "ε = |Imag'| = |I1' − I2h| — u ham tokli, ham burchakli xatolikni aniqlaydi va ε > fi (5-ma'ruza).",
      ru: "ε = |Iнам'| = |I1' − I2д| — определяет и токовую, и угловую погрешность, причём ε > fi (лекция 5).",
      en: "ε = |Imag'| = |I1' − I2act| — it governs both current and angle error, and ε > fi (lecture 5).",
    },
  },
  {
    l: 5, type: "tf", a: true,
    q: {
      uz: "Rele himoyasi uchun mo'ljallangan R sinfli TT larning xatoligi nominal toklarda normalanmaydi.",
      ru: "Погрешность ТТ класса Р, предназначенных для релейной защиты, при номинальных токах не нормируется.",
      en: "The error of class P CTs intended for protection is not standardised at rated currents.",
    },
    e: {
      uz: "R sinfli TT lar RH uchun mo'ljallangan va shuning uchun ularning xatoligi nominal toklarda normalanmaydi (5-ma'ruza).",
      ru: "ТТ класса Р предназначены для РЗ, поэтому их погрешность при номинальных токах не нормируется (лекция 5).",
      en: "Class P CTs are made for protection, so their error at rated current is not standardised (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "TT xatoligini kamaytirish uchun nima qilish kerak?",
      ru: "Что нужно сделать для снижения погрешности ТТ?",
      en: "What should be done to reduce CT error?",
    },
    o: [
      { uz: "Yuklama qarshiligi Zn ni oshirish", ru: "Увеличить сопротивление нагрузки Zн", en: "Increase the burden impedance" },
      {
        uz: "E2 ni kamaytirish va magnit o'tkazgichni to'yintirmaslik",
        ru: "Уменьшить E2 и не допускать насыщения магнитопровода",
        en: "Reduce E2 and keep the core out of saturation",
      },
      { uz: "Chastotani oshirish", ru: "Увеличить частоту", en: "Increase the frequency" },
      { uz: "w2 ni ko'paytirish", ru: "Увеличить w2", en: "Increase w2" },
    ],
    e: {
      uz: "E2 ni kamaytirish kerak; bu Zn va I2 ni kamaytirish, ya'ni kI ni oshirish hisobiga erishiladi (5-ma'ruza).",
      ru: "Нужно уменьшать E2; это достигается снижением Zн и I2, то есть увеличением kI (лекция 5).",
      en: "E2 must be reduced, which is achieved by lowering the burden and I2, i.e. by raising kI (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "Sanoat qurilmalari uchun TT larning aniqlik sinflari qaysilar?",
      ru: "Какие классы точности ТТ выпускаются для промышленных установок?",
      en: "Which CT accuracy classes are produced for industrial installations?",
    },
    o: [
      { uz: "0,1; 0,2; 0,3", ru: "0,1; 0,2; 0,3", en: "0.1; 0.2; 0.3" },
      { uz: "0,5; 1; 3; 5; 10 va R", ru: "0,5; 1; 3; 5; 10 и Р", en: "0.5; 1; 3; 5; 10 and P" },
      { uz: "1; 2; 5", ru: "1; 2; 5", en: "1; 2; 5" },
      { uz: "5; 10; 20", ru: "5; 10; 20", en: "5; 10; 20" },
    ],
    e: {
      uz: "0,5; 1; 3; 5; 10 va R aniqlik sinfli TT lar ishlab chiqariladi (5-ma'ruza, 5.1-jadval).",
      ru: "Выпускаются ТТ классов точности 0,5; 1; 3; 5; 10 и Р (лекция 5, табл. 5.1).",
      en: "CTs of classes 0.5; 1; 3; 5; 10 and P are produced (lecture 5, table 5.1).",
    },
  },
  {
    l: 5, type: "mcq", a: 0,
    q: {
      uz: "TT larda xatoliklar birlamchi tokning qaysi doirasida ta'minlanadi?",
      ru: "В каком диапазоне первичного тока обеспечиваются погрешности ТТ?",
      en: "Over what range of primary current are the CT errors guaranteed?",
    },
    o: [
      { uz: "0,1 dan 1,2 nominalgacha", ru: "От 0,1 до 1,2 номинального", en: "From 0.1 to 1.2 of rated" },
      { uz: "0 dan 10 nominalgacha", ru: "От 0 до 10 номинальных", en: "From 0 to 10 times rated" },
      { uz: "1 dan 5 nominalgacha", ru: "От 1 до 5 номинальных", en: "From 1 to 5 times rated" },
      { uz: "Faqat nominalda", ru: "Только при номинальном", en: "Only at rated" },
    ],
    e: {
      uz: "Xatoliklar faqat birlamchi tokning 0,1 dan 1,2 nominal doirasida ta'minlanadi (5-ma'ruza).",
      ru: "Погрешности обеспечиваются только в диапазоне 0,1-1,2 номинального первичного тока (лекция 5).",
      en: "The errors hold only over 0.1-1.2 of the rated primary current (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "Birlamchi chulg'am chiqishlari zavodda qanday belgilanadi?",
      ru: "Как на заводе обозначают выводы первичной обмотки?",
      en: "How does the manufacturer mark the primary winding terminals?",
    },
    o: [
      { uz: "A va X", ru: "A и X", en: "A and X" },
      { uz: "L1 va L2", ru: "Л1 и Л2", en: "P1 and P2" },
      { uz: "I1 va I2", ru: "И1 и И2", en: "S1 and S2" },
      { uz: "B va O", ru: "Н и К", en: "Start and End" },
    ],
    e: {
      uz: "Birlamchi chulg'am boshi va oxiri L1, L2; ikkilamchisi I1, I2 deb belgilanadi (5-ma'ruza).",
      ru: "Начало и конец первичной обмотки обозначают Л1, Л2; вторичной — И1, И2 (лекция 5).",
      en: "The primary ends are marked P1, P2 and the secondary S1, S2 (lecture 5).",
    },
  },
  {
    l: 5, type: "mcq", a: 1,
    q: {
      uz: "QT boshlanishidagi aperiodik tashkil etuvchi TT ga qanday ta'sir qiladi?",
      ru: "Как апериодическая составляющая в начале КЗ влияет на ТТ?",
      en: "How does the DC component at fault inception affect the CT?",
    },
    o: [
      { uz: "Xatolikni kamaytiradi", ru: "Уменьшает погрешность", en: "It reduces the error" },
      {
        uz: "Magnit o'tkazgichni to'yintirib xatolikni tezda oshiradi",
        ru: "Насыщает магнитопровод и резко увеличивает погрешность",
        en: "It saturates the core and sharply increases the error",
      },
      { uz: "Ta'sir qilmaydi", ru: "Не влияет", en: "It has no effect" },
      { uz: "Imag ni nolga tushiradi", ru: "Снижает Iнам до нуля", en: "It drives the magnetising current to zero" },
    ],
    e: {
      uz: "Aperiodik tashkil etuvchi magnit o'tkazgichni to'yintiradi, Imag ortadi va TT xatoligi tezda ortadi (5-ma'ruza).",
      ru: "Апериодическая составляющая насыщает магнитопровод, Iнам растёт и погрешность ТТ быстро увеличивается (лекция 5).",
      en: "It saturates the core, the magnetising current grows and the CT error rises quickly (lecture 5).",
    },
  },
  {
    l: 5, type: "tf", a: true,
    q: {
      uz: "TT ning ikkilamchi chulg'amlaridan biri xavfsizlik nuqtai nazaridan yerga zaminlanadi.",
      ru: "Одна из вторичных обмоток ТТ заземляется из соображений безопасности.",
      en: "One of the CT secondary windings is earthed for safety.",
    },
    e: {
      uz: "5.1-rasmda ko'rsatilganidek, ikkilamchi chulg'am xavfsizlik uchun yerga zaminlanadi (5-ma'ruza).",
      ru: "Как показано на рис. 5.1, вторичная обмотка заземляется для безопасности (лекция 5).",
      en: "As fig. 5.1 shows, the secondary winding is earthed for safety (lecture 5).",
    },
  },
  {
    l: 5, type: "match",
    q: {
      uz: "TT xatolik turlarini belgisi bilan moslashtiring:",
      ru: "Сопоставьте виды погрешностей ТТ с их обозначениями:",
      en: "Match the CT error types with their symbols:",
    },
    pairs: [
      [
        { uz: "Tok bo'yicha xatolik", ru: "Погрешность по току", en: "Current error" },
        { uz: "fi (ΔI)", ru: "fi (ΔI)", en: "fi (ΔI)" },
      ],
      [
        { uz: "Burchak bo'yicha xatolik", ru: "Угловая погрешность", en: "Angle error" },
        { uz: "δ", ru: "δ", en: "δ" },
      ],
      [
        { uz: "To'la xatolik", ru: "Полная погрешность", en: "Composite error" },
        { uz: "ε", ru: "ε", en: "ε" },
      ],
    ],
    e: {
      uz: "RH ishida TT ning uch xil xatoligi hisobga olinadi (5-ma'ruza).",
      ru: "При работе РЗ учитывают три вида погрешности ТТ (лекция 5).",
      en: "Three kinds of CT error matter for protection (lecture 5).",
    },
  },

  /* ================= 6-MA'RUZA ================= */
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Sxema koeffitsienti ksx nimani anglatadi?",
      ru: "Что означает коэффициент схемы kсх?",
      en: "What does the scheme factor mean?",
    },
    o: [
      { uz: "Ikkilamchi tokning birlamchiga nisbati", ru: "Отношение вторичного тока к первичному", en: "The ratio of secondary to primary current" },
      { uz: "Reledagi tokning faza tokiga nisbati", ru: "Отношение тока в реле к фазному току", en: "The ratio of relay current to phase current" },
      { uz: "Ishlash tokining qaytish tokiga nisbati", ru: "Отношение тока срабатывания к току возврата", en: "The ratio of pickup to reset current" },
      { uz: "Kuchlanishning tokka nisbati", ru: "Отношение напряжения к току", en: "The ratio of voltage to current" },
    ],
    e: {
      uz: "ksx = Ir/If — reledagi tokning faza tokiga nisbati (6-ma'ruza, 6.2 formula).",
      ru: "kсх = Iр/Iф — отношение тока в реле к фазному току (лекция 6, формула 6.2).",
      en: "ksch = Ir/Iph is the ratio of relay current to phase current (lecture 6, formula 6.2).",
    },
  },
  {
    l: 6, type: "mcq", a: 0,
    q: {
      uz: "To'liq yulduz sxemasi uchun ksx nimaga teng?",
      ru: "Чему равен kсх для схемы полной звезды?",
      en: "What is the scheme factor for the full-star connection?",
    },
    o: [
      { uz: "1", ru: "1", en: "1" },
      { uz: "√3", ru: "√3", en: "√3" },
      { uz: "3", ru: "3", en: "3" },
      { uz: "1/√3", ru: "1/√3", en: "1/√3" },
    ],
    e: {
      uz: "Yulduz ulanish sxemasi uchun ksx = 1 (6-ma'ruza).",
      ru: "Для схемы соединения в звезду kсх = 1 (лекция 6).",
      en: "For the star connection ksch = 1 (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Uchburchak-yulduz sxemasida simmetrik rejimda reledagi tok faza tokidan qanday farq qiladi?",
      ru: "Чем отличается ток в реле от фазного в схеме треугольник-звезда при симметричном режиме?",
      en: "In the delta-star scheme, how does the relay current differ from the phase current in balanced conditions?",
    },
    o: [
      { uz: "Teng", ru: "Равны", en: "They are equal" },
      { uz: "√3 marta katta va 30° siljigan", ru: "В √3 раза больше и сдвинут на 30°", en: "√3 times larger and shifted by 30°" },
      { uz: "3 marta katta", ru: "В 3 раза больше", en: "Three times larger" },
      { uz: "2 marta kichik", ru: "В 2 раза меньше", en: "Twice smaller" },
    ],
    e: {
      uz: "Simmetrik yuklama va K(3) da reledan faza tokiga nisbatan √3 marta katta, 30° siljigan tok o'tadi; ksx = √3 (6-ma'ruza).",
      ru: "При симметричной нагрузке и К(3) через реле проходит ток в √3 раза больше фазного, сдвинутый на 30°; kсх = √3 (лекция 6).",
      en: "Under balanced load and a three-phase fault the relay carries √3 times the phase current, shifted by 30°; ksch = √3 (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Yulduz sxemasining nol simida qanday tok oqadi?",
      ru: "Какой ток течёт в нулевом проводе схемы звезды?",
      en: "What current flows in the neutral wire of the star scheme?",
    },
    o: [
      { uz: "Faza toki", ru: "Фазный ток", en: "The phase current" },
      { uz: "In.o' = 3I0", ru: "Iн.п = 3I0", en: "In = 3I0" },
      { uz: "Faqat nobalans toki", ru: "Только ток небаланса", en: "Only the unbalance current" },
      { uz: "Nolga teng har doim", ru: "Всегда ноль", en: "Always zero" },
    ],
    e: {
      uz: "Nol ketma-ketlik toklari faza bo'yicha mos tushadi, shuning uchun nol simda In.o' = 3I0 oqadi (6-ma'ruza).",
      ru: "Токи нулевой последовательности совпадают по фазе, поэтому в нулевом проводе течёт Iн.п = 3I0 (лекция 6).",
      en: "The zero-sequence currents are in phase, so the neutral carries In = 3I0 (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "To'liq bo'lmagan yulduz sxemasining kamchiligi nima?",
      ru: "В чём недостаток схемы неполной звезды?",
      en: "What is the drawback of the incomplete-star scheme?",
    },
    o: [
      { uz: "ksx = √3 bo'ladi", ru: "kсх становится равным √3", en: "Its scheme factor becomes √3" },
      {
        uz: "TT o'rnatilmagan B fazaning yerga tutashuvini sezmaydi",
        ru: "Не чувствует замыкание на землю фазы B, где ТТ не установлен",
        en: "It cannot detect an earth fault on phase B, which has no CT",
      },
      { uz: "Uchta TT talab qiladi", ru: "Требует трёх ТТ", en: "It needs three CTs" },
      { uz: "Faqat K(3) ga ishlaydi", ru: "Работает только при К(3)", en: "It works only for three-phase faults" },
    ],
    e: {
      uz: "TT o'rnatilmagan fazaning yerga tutashuvida sxemada tok paydo bo'lmaydi, shuning uchun u faqat fazalararo himoyalarda qo'llaniladi (6-ma'ruza).",
      ru: "При замыкании на землю фазы без ТТ ток в схеме не возникает, поэтому она применяется лишь в защитах от междуфазных КЗ (лекция 6).",
      en: "An earth fault on the phase without a CT produces no current in the scheme, so it is used only for phase-fault protections (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Nol ketma-ketlik toklar filtri sxemasida releda tok qachon paydo bo'ladi?",
      ru: "Когда в реле схемы фильтра токов нулевой последовательности появляется ток?",
      en: "When does current appear in the relay of the zero-sequence filter scheme?",
    },
    o: [
      { uz: "Har qanday QT da", ru: "При любом КЗ", en: "For any fault" },
      { uz: "Faqat bir va ikki fazali yerga QT da", ru: "Только при одно- и двухфазных КЗ на землю", en: "Only for single- and two-phase earth faults" },
      { uz: "Faqat K(3) da", ru: "Только при К(3)", en: "Only for three-phase faults" },
      { uz: "Normal rejimda", ru: "В нормальном режиме", en: "In the normal mode" },
    ],
    e: {
      uz: "Ir = Ia + Ib + Ic = 3I0; tok faqat bir va ikki fazali yerga QT da paydo bo'ladi (6-ma'ruza).",
      ru: "Iр = Ia + Ib + Ic = 3I0; ток появляется только при одно- и двухфазных КЗ на землю (лекция 6).",
      en: "Ir = Ia + Ib + Ic = 3I0; current appears only for single- and two-phase earth faults (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 0,
    q: {
      uz: "Nol simdagi nobalans toki normal rejimda taxminan qancha bo'ladi?",
      ru: "Каков примерно ток небаланса в нулевом проводе в нормальном режиме?",
      en: "Roughly what is the unbalance current in the neutral in normal mode?",
    },
    o: [
      { uz: "0,01-0,02 A", ru: "0,01-0,02 А", en: "0.01-0.02 A" },
      { uz: "0,1-0,2 A", ru: "0,1-0,2 А", en: "0.1-0.2 A" },
      { uz: "1-2 A", ru: "1-2 А", en: "1-2 A" },
      { uz: "5 A", ru: "5 А", en: "5 A" },
    ],
    e: {
      uz: "TT xarakteristikalari bir xil bo'lmagani uchun normal rejimda Inb = 0,01-0,02 A (6-ma'ruza).",
      ru: "Из-за неодинаковости характеристик ТТ в нормальном режиме Iнб = 0,01-0,02 А (лекция 6).",
      en: "Because the CT characteristics differ, the unbalance is 0.01-0.02 A in normal mode (lecture 6).",
    },
  },
  {
    l: 6, type: "tf", a: true,
    q: {
      uz: "Uchburchak sxemasida nol ketma-ketlik toklari uchburchakdan tashqariga chiqmaydi.",
      ru: "В схеме треугольника токи нулевой последовательности не выходят за пределы треугольника.",
      en: "In the delta scheme, zero-sequence currents do not leave the delta.",
    },
    e: {
      uz: "Bu uchburchak sxemasining o'ziga xos xususiyatlaridan biri (6-ma'ruza).",
      ru: "Это одна из особенностей схемы треугольника (лекция 6).",
      en: "This is one of the characteristic features of the delta scheme (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Toklar farqi sxemasida AB yoki BC fazalar orasidagi QT da sezgirlik qanday bo'ladi?",
      ru: "Какова чувствительность схемы разности токов при КЗ между фазами AB или BC?",
      en: "What is the sensitivity of the current-difference scheme for an AB or BC fault?",
    },
    o: [
      { uz: "Yulduz sxemasi bilan bir xil", ru: "Такая же, как у звезды", en: "The same as the star scheme" },
      {
        uz: "Yulduz sxemasiga nisbatan √3 marta yomon",
        ru: "В √3 раза хуже, чем у звезды",
        en: "√3 times worse than the star scheme",
      },
      { uz: "2 marta yaxshi", ru: "В 2 раза лучше", en: "Twice better" },
      { uz: "3 marta yaxshi", ru: "В 3 раза лучше", en: "Three times better" },
    ],
    e: {
      uz: "Bu sxema yulduz sxemasiga nisbatan AB va BC fazalar orasidagi QT da √3 marta yomon sezgirlikka ega (6-ma'ruza).",
      ru: "При КЗ между фазами AB и BC эта схема в √3 раза менее чувствительна, чем звезда (лекция 6).",
      en: "For AB and BC faults this scheme is √3 times less sensitive than the star (lecture 6).",
    },
  },
  {
    l: 6, type: "mcq", a: 1,
    q: {
      uz: "Neytrali zaminlangan tarmoqlarda TT ning qaysi ulanish sxemasi ishlatiladi?",
      ru: "Какая схема соединения ТТ применяется в сетях с заземлённой нейтралью?",
      en: "Which CT connection is used in solidly earthed networks?",
    },
    o: [
      { uz: "Toklar farqi", ru: "Разность токов", en: "Current difference" },
      { uz: "To'liq yulduz", ru: "Полная звезда", en: "Full star" },
      { uz: "Faqat uchburchak", ru: "Только треугольник", en: "Delta only" },
      { uz: "Faqat nol filtri", ru: "Только фильтр нулевой последовательности", en: "Zero-sequence filter only" },
    ],
    e: {
      uz: "TT va rele chulg'amlarini yulduzga ulash sxemasi barcha turdagi QT ga ishlovchi RH da qo'llaniladi (6-ma'ruza).",
      ru: "Схема соединения ТТ и обмоток реле в звезду применяется в РЗ, работающих при всех видах КЗ (лекция 6).",
      en: "The star connection of CTs and relay coils is used in protections responding to all fault types (lecture 6).",
    },
  },
  {
    l: 6, type: "match",
    q: {
      uz: "Ulanish sxemasi va sxema koeffitsientini moslashtiring:",
      ru: "Сопоставьте схему соединения и коэффициент схемы:",
      en: "Match each connection with its scheme factor:",
    },
    pairs: [
      [
        { uz: "To'liq yulduz", ru: "Полная звезда", en: "Full star" },
        { uz: "ksx = 1", ru: "kсх = 1", en: "ksch = 1" },
      ],
      [
        { uz: "To'liq bo'lmagan yulduz", ru: "Неполная звезда", en: "Incomplete star" },
        { uz: "ksx = 1", ru: "kсх = 1", en: "ksch = 1" },
      ],
      [
        { uz: "Uchburchak-yulduz", ru: "Треугольник-звезда", en: "Delta-star" },
        { uz: "ksx = √3", ru: "kсх = √3", en: "ksch = √3" },
      ],
      [
        { uz: "Toklar farqi", ru: "Разность токов", en: "Current difference" },
        { uz: "ksx = √3", ru: "kсх = √3", en: "ksch = √3" },
      ],
    ],
    e: {
      uz: "6-ma'ruzadagi sxema koeffitsientlari.",
      ru: "Коэффициенты схем из лекции 6.",
      en: "The scheme factors from lecture 6.",
    },
  },

  /* ================= 7-MA'RUZA ================= */
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "KT ning ikkilamchi nominal kuchlanishi odatda qanday qabul qilinadi?",
      ru: "Каким обычно принимают вторичное номинальное напряжение ТН?",
      en: "What is the VT's rated secondary voltage usually taken as?",
    },
    o: [
      { uz: "380 va 220 V", ru: "380 и 220 В", en: "380 and 220 V" },
      { uz: "100 va 100/√3 V", ru: "100 и 100/√3 В", en: "100 and 100/√3 V" },
      { uz: "5 va 1 A", ru: "5 и 1 А", en: "5 and 1 A" },
      { uz: "110 va 220 V", ru: "110 и 220 В", en: "110 and 220 V" },
    ],
    e: {
      uz: "U2nom qiymati asosan 100 va 100/√3 V ga teng deb qabul qilinadi (7-ma'ruza).",
      ru: "U2ном принимают в основном равным 100 и 100/√3 В (лекция 7).",
      en: "The rated secondary voltage is normally 100 or 100/√3 V (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Nol ketma-ketlik kuchlanish filtrida ochiq uchburchak qisqichlaridagi kuchlanish nimaga teng?",
      ru: "Чему равно напряжение на зажимах разомкнутого треугольника в фильтре нулевой последовательности?",
      en: "What is the voltage at the broken-delta terminals in the zero-sequence filter?",
    },
    o: [
      { uz: "Ur = U0", ru: "Uр = U0", en: "Ur = U0" },
      { uz: "Ur = 3U0/KU", ru: "Uр = 3U0/KU", en: "Ur = 3U0/KU" },
      { uz: "Ur = U1", ru: "Uр = U1", en: "Ur = U1" },
      { uz: "Ur = 0 har doim", ru: "Uр = 0 всегда", en: "Ur = 0 always" },
    ],
    e: {
      uz: "Yerga QT da ochiq uchburchak qisqichlarida Ur = 3U0/KU (7-ma'ruza, 7.4).",
      ru: "При КЗ на землю на зажимах разомкнутого треугольника Uр = 3U0/KU (лекция 7, 7.4).",
      en: "For an earth fault the broken-delta terminals show Ur = 3U0/KU (lecture 7, 7.4).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Nima uchun uch sterjenli uch fazali KT ni Y/Y sxemasida qo'llash mumkin emas?",
      ru: "Почему трёхстержневой трёхфазный ТН нельзя применять в схеме Y/Y?",
      en: "Why can a three-limb three-phase VT not be used in the Y/Y scheme?",
    },
    o: [
      { uz: "Juda qimmat", ru: "Слишком дорог", en: "It is too expensive" },
      {
        uz: "Nol ketma-ketlik Ф0 oqimi uchun magnit o'tkazgichda yo'l yo'q",
        ru: "В магнитопроводе нет пути для потока нулевой последовательности Ф0",
        en: "The core provides no path for the zero-sequence flux Φ0",
      },
      { uz: "Kuchlanishi past", ru: "Низкое напряжение", en: "Its voltage is too low" },
      { uz: "Chastotasi mos emas", ru: "Не подходит по частоте", en: "Its frequency does not match" },
    ],
    e: {
      uz: "Ф0 oqim havo orqali katta magnit qarshilik bilan tutashadi, Imag keskin ortadi va transformator qiziydi (7-ma'ruza).",
      ru: "Поток Ф0 замыкается через воздух с большим магнитным сопротивлением, Iнам резко растёт и трансформатор перегревается (лекция 7).",
      en: "The Φ0 flux closes through air at high reluctance, the magnetising current soars and the transformer overheats (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 2,
    q: {
      uz: "Besh sterjenli KT da nol ketma-ketlik oqimlari qaysi sterjenlar orqali tutashadi?",
      ru: "По каким стержням замыкаются потоки нулевой последовательности в пятистержневом ТН?",
      en: "Through which limbs does zero-sequence flux close in a five-limb VT?",
    },
    o: [
      { uz: "1 va 2", ru: "1 и 2", en: "1 and 2" },
      { uz: "2 va 3", ru: "2 и 3", en: "2 and 3" },
      { uz: "4 va 5", ru: "4 и 5", en: "4 and 5" },
      { uz: "Faqat 3", ru: "Только 3", en: "Only 3" },
    ],
    e: {
      uz: "Magnit o'tkazgichning to'rtinchi va beshinchi sterjenlari oqimlarning tutashishi uchun xizmat qiladi (7-ma'ruza).",
      ru: "Четвёртый и пятый стержни магнитопровода служат для замыкания потоков (лекция 7).",
      en: "The fourth and fifth limbs of the core provide the flux return path (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "KT ning aniqlik sinflari qaysilar?",
      ru: "Какие классы точности имеет ТН?",
      en: "What accuracy classes does a VT have?",
    },
    o: [
      { uz: "0,5; 1; 3; 5; 10", ru: "0,5; 1; 3; 5; 10", en: "0.5; 1; 3; 5; 10" },
      { uz: "0,2; 0,5; 1 va 3", ru: "0,2; 0,5; 1 и 3", en: "0.2; 0.5; 1 and 3" },
      { uz: "1 va 3 faqat", ru: "Только 1 и 3", en: "Only 1 and 3" },
      { uz: "5R va 10R", ru: "5Р и 10Р", en: "5P and 10P" },
    ],
    e: {
      uz: "Kuchlanish transformatorlari 0,2; 0,5; 1 va 3 aniqlik sinflariga bo'linadi (7-ma'ruza).",
      ru: "Трансформаторы напряжения делятся на классы точности 0,2; 0,5; 1 и 3 (лекция 7).",
      en: "Voltage transformers fall into classes 0.2; 0.5; 1 and 3 (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Ekspluatatsiya sharoitida KT xatoligini kamaytirish uchun nima qilinadi?",
      ru: "Что делают для снижения погрешности ТН в условиях эксплуатации?",
      en: "What is done in service to reduce VT error?",
    },
    o: [
      { uz: "Chastotani oshirish", ru: "Повышают частоту", en: "Increase the frequency" },
      { uz: "Yuklama toki I2 ni kamaytirish", ru: "Уменьшают ток нагрузки I2", en: "Reduce the burden current I2" },
      { uz: "Birlamchi kuchlanishni oshirish", ru: "Повышают первичное напряжение", en: "Raise the primary voltage" },
      { uz: "Neytralni uzish", ru: "Разземляют нейтраль", en: "Disconnect the neutral" },
    ],
    e: {
      uz: "Z1, Z2 va Imag konstruksiyadan aniqlanadi; ekspluatatsiyada faqat I2 yuklama tokini kamaytirish mumkin (7-ma'ruza).",
      ru: "Z1, Z2 и Iнам определяются конструкцией; в эксплуатации можно лишь уменьшить ток нагрузки I2 (лекция 7).",
      en: "Z1, Z2 and the magnetising current are set by design; in service only the burden current can be reduced (lecture 7).",
    },
  },
  {
    l: 7, type: "tf", a: true,
    q: {
      uz: "Nol ketma-ketlik filtri sifatida ishlashi uchun KT birlamchi chulg'ami neytrali zaminlanishi shart.",
      ru: "Для работы в качестве фильтра нулевой последовательности нейтраль первичной обмотки ТН обязательно заземляется.",
      en: "To work as a zero-sequence filter, the VT primary neutral must be earthed.",
    },
    e: {
      uz: "Sxemani nol ketma-ketlik filtri sifatida ishlash sharti — KT birlamchi chulg'ami neytralini zaminlash (7-ma'ruza).",
      ru: "Необходимое условие работы схемы как фильтра нулевой последовательности — заземление нейтрали первичной обмотки ТН (лекция 7).",
      en: "Earthing the VT primary neutral is the necessary condition for the scheme to act as a zero-sequence filter (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Shina KT li sxemaning kamchiligi nima?",
      ru: "В чём недостаток схемы с шинным ТН?",
      en: "What is the drawback of the busbar-VT scheme?",
    },
    o: [
      { uz: "Juda ko'p KT talab qiladi", ru: "Требует очень много ТН", en: "It needs a great many VTs" },
      {
        uz: "Birlashmani boshqa shinaga o'tkazishda kuchlanish zanjirini uzib-ulash kerak",
        ru: "При переводе присоединения на другую систему шин нужно переключать цепь напряжения",
        en: "Transferring a feeder to another busbar requires switching the voltage circuit",
      },
      { uz: "Faqat bir fazali ishlaydi", ru: "Работает только однофазно", en: "It works single-phase only" },
      { uz: "Aniqligi past", ru: "Низкая точность", en: "Its accuracy is low" },
    ],
    e: {
      uz: "Birlashmani bir shina tizimidan ikkinchisiga o'tkazishda RH kuchlanish zanjirini boshqa KT ga uzib-ulash talab etiladi (7-ma'ruza).",
      ru: "При переводе присоединения с одной системы шин на другую цепь напряжения РЗ нужно переключить на другой ТН (лекция 7).",
      en: "When a feeder moves between busbar systems, the protection's voltage circuit must be switched to the other VT (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Avtomatik uzib-ulashning zaif tomoni nima?",
      ru: "В чём слабое место автоматического переключения?",
      en: "What is the weak point of automatic switching?",
    },
    o: [
      { uz: "Voltmetrlar", ru: "Вольтметры", en: "The voltmeters" },
      { uz: "Yordamchi QS kontaktlari", ru: "Вспомогательные контакты QS", en: "The QS auxiliary contacts" },
      { uz: "Neytral", ru: "Нейтраль", en: "The neutral" },
      { uz: "Saqlagichlar", ru: "Предохранители", en: "The fuses" },
    ],
    e: {
      uz: "Yordamchi kontaktlar ishdan chiqsa, RH qurilmalari noto'g'ri ishlashi mumkin (7-ma'ruza).",
      ru: "При отказе вспомогательных контактов устройства РЗ могут сработать неправильно (лекция 7).",
      en: "If the auxiliary contacts fail, the protection devices may operate incorrectly (lecture 7).",
    },
  },
  {
    l: 7, type: "mcq", a: 1,
    q: {
      uz: "Yersiz QT da ochiq uchburchak qisqichlarida Ur qanday bo'ladi?",
      ru: "Каким будет Uр на зажимах разомкнутого треугольника при КЗ без земли?",
      en: "What is the broken-delta voltage for a fault not involving earth?",
    },
    o: [
      { uz: "3U0 ga teng", ru: "Равно 3U0", en: "Equal to 3U0" },
      { uz: "Nolga teng", ru: "Равно нулю", en: "Equal to zero" },
      { uz: "U1 ga teng", ru: "Равно U1", en: "Equal to U1" },
      { uz: "100 V", ru: "100 В", en: "100 V" },
    ],
    e: {
      uz: "Normal sharoitlarda va yersiz QT da ham Ur = 3U0 = 0 bo'ladi (7-ma'ruza).",
      ru: "В нормальных условиях и при КЗ без земли Uр = 3U0 = 0 (лекция 7).",
      en: "In normal conditions and for faults without earth, Ur = 3U0 = 0 (lecture 7).",
    },
  },
  {
    l: 7, type: "match",
    q: {
      uz: "KT ulanish sxemasi va vazifasini moslashtiring:",
      ru: "Сопоставьте схему соединения ТН и её назначение:",
      en: "Match each VT connection with its purpose:",
    },
    pairs: [
      [
        { uz: "Yulduz", ru: "Звезда", en: "Star" },
        {
          uz: "Yerga nisbatan faza kuchlanishini olish",
          ru: "Получение фазных напряжений относительно земли",
          en: "Obtaining phase-to-earth voltages",
        },
      ],
      [
        { uz: "Ochiq uchburchak", ru: "Открытый треугольник", en: "Open delta" },
        {
          uz: "Fazalararo kuchlanishlarni olish",
          ru: "Получение линейных напряжений",
          en: "Obtaining line voltages",
        },
      ],
      [
        { uz: "Yopiq bo'lmagan uchburchak", ru: "Разомкнутый треугольник", en: "Broken delta" },
        { uz: "3U0 ni olish", ru: "Получение 3U0", en: "Obtaining 3U0" },
      ],
    ],
    e: {
      uz: "7-ma'ruzadagi KT ulanish sxemalari.",
      ru: "Схемы соединения ТН из лекции 7.",
      en: "The VT connection schemes of lecture 7.",
    },
  },

  /* ================= 8-MA'RUZA (bog'lovchi) ================= */
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Elektromagnit rele ishonchli ishlashi uchun aylantiruvchi moment qanday bo'lishi kerak?",
      ru: "Каким должен быть вращающий момент для надёжного срабатывания электромагнитного реле?",
      en: "What must the operating torque be for an electromagnetic relay to work reliably?",
    },
    o: [
      { uz: "Prujina momentidan kichik", ru: "Меньше момента пружины", en: "Smaller than the spring torque" },
      {
        uz: "Prujina momenti, ishqalanish va tizim massasidan katta",
        ru: "Больше момента пружины, трения и массы системы",
        en: "Greater than the spring torque, friction and system inertia",
      },
      { uz: "Ularga teng", ru: "Равным им", en: "Equal to them" },
      { uz: "Ahamiyati yo'q", ru: "Не имеет значения", en: "It does not matter" },
    ],
    e: {
      uz: "Aylantiruvchi moment prujinaning qarshilik momentidan, ishqalanish va harakatlanuvchi tizim massasidan katta bo'lishi kerak (9-ma'ruza asosida).",
      ru: "Вращающий момент должен превышать противодействующий момент пружины, трение и массу подвижной системы (по лекции 9).",
      en: "The operating torque must exceed the spring's restraining torque, friction and the moving system's mass (based on lecture 9).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Elektromagnit relening ishlash tokini o'zgartirishning eng oson yo'li nima?",
      ru: "Каков самый простой способ изменить ток срабатывания электромагнитного реле?",
      en: "What is the easiest way to change an electromagnetic relay's pickup current?",
    },
    o: [
      { uz: "Chulg'amni almashtirish", ru: "Заменить обмотку", en: "Replace the coil" },
      {
        uz: "Prujinaning tortuvchi kuchini o'zgartirish",
        ru: "Изменить натяжение пружины",
        en: "Change the spring tension",
      },
      { uz: "Yakorni almashtirish", ru: "Заменить якорь", en: "Replace the armature" },
      { uz: "Chastotani o'zgartirish", ru: "Изменить частоту", en: "Change the frequency" },
    ],
    e: {
      uz: "Ishlash tokini o'zgartirishning eng oson yo'li — prujinaning tortuvchi kuchini shkala ko'rsatgichi bilan o'zgartirish (9-ma'ruza).",
      ru: "Проще всего изменить ток срабатывания натяжением пружины с помощью указателя шкалы (лекция 9).",
      en: "The simplest way is to alter the spring tension with the scale pointer (lecture 9).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Rele ishlagandan keyin kirish kattaligi kamaysa, u qaysi qiymatda boshlang'ich holatga qaytadi?",
      ru: "При каком значении реле возвращается в исходное состояние при снижении входной величины?",
      en: "At what value does a relay reset as the input falls?",
    },
    o: [
      { uz: "Xr.i da", ru: "При Xр.с", en: "At Xop" },
      { uz: "Xr.q da", ru: "При Xр.в", en: "At Xres" },
      { uz: "Nolda", ru: "При нуле", en: "At zero" },
      { uz: "Nominalda", ru: "При номинале", en: "At rated" },
    ],
    e: {
      uz: "X kattalik Xr.q ga teng bo'lganda chiqish signali Yb gacha kamayadi va rele qaytadi (3-ma'ruza).",
      ru: "Когда величина X достигает Xр.в, выходной сигнал падает до Yн и реле возвращается (лекция 3).",
      en: "When X reaches Xres the output falls to its initial value and the relay resets (lecture 3).",
    },
  },
  {
    l: 8, type: "tf", a: true,
    q: {
      uz: "Momentlarning tengligi relening ishga tushish chegaraviy holatini belgilaydi.",
      ru: "Равенство моментов определяет граничное состояние срабатывания реле.",
      en: "Equality of the torques defines the relay's threshold of operation.",
    },
    e: {
      uz: "Aylantiruvchi va qarshi ta'sir etuvchi momentlarning tengligi chegaraviy holatni, ya'ni ishga tushish holatini belgilaydi (9-ma'ruza).",
      ru: "Равенство вращающего и противодействующего моментов задаёт граничное состояние — состояние срабатывания (лекция 9).",
      en: "The balance of operating and restraining torques sets the threshold — the point of pickup (lecture 9).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Qaytish koeffitsienti qanday aniqlanadi?",
      ru: "Как определяется коэффициент возврата?",
      en: "How is the reset ratio determined?",
    },
    o: [
      {
        uz: "Ishlash va qaytish parametrlari ko'paytmasi",
        ru: "Произведение параметров срабатывания и возврата",
        en: "The product of pickup and reset parameters",
      },
      {
        uz: "Qaytish va ishlash parametrlarining nisbati",
        ru: "Отношение параметров возврата и срабатывания",
        en: "The ratio of reset to pickup parameters",
      },
      { uz: "Faqat chulg'am qarshiligi orqali", ru: "Только через сопротивление обмотки", en: "From the coil resistance only" },
      { uz: "Faqat chastota orqali", ru: "Только через частоту", en: "From the frequency only" },
    ],
    e: {
      uz: "kqay — qaytish va ishlash parametrlarining nisbati; minimal relelarda u birdan katta bo'ladi (9-ma'ruza).",
      ru: "kв — отношение параметров возврата и срабатывания; у минимальных реле он больше единицы (лекция 9).",
      en: "The reset ratio is reset divided by pickup; for minimum relays it exceeds one (lecture 9).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Diskret chiqish signali va releli o'tish xarakteristikasiga ega bo'lgan har qanday avtomat qaysi sinfga tegishli?",
      ru: "К какому классу относится любой автомат с дискретным выходом и релейной переходной характеристикой?",
      en: "To what class does any automatic device with a discrete output and relay transfer characteristic belong?",
    },
    o: [
      { uz: "Transformatorlar", ru: "Трансформаторы", en: "Transformers" },
      { uz: "Rele sinfiga", ru: "К классу реле", en: "The relay class" },
      { uz: "O'chirgichlar", ru: "Выключатели", en: "Circuit breakers" },
      { uz: "Datchiklar", ru: "Датчики", en: "Sensors" },
    ],
    e: {
      uz: "Releli o'tish xarakteristikali konstruksiyaga ega har qanday avtomat rele sinfiga taalluqli (3-ma'ruza).",
      ru: "Любой автомат с релейной переходной характеристикой относится к классу реле (лекция 3).",
      en: "Any automatic device with a relay transfer characteristic belongs to the relay class (lecture 3).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Elektromagnit releda yakorni nima harakatga keltiradi?",
      ru: "Что приводит в движение якорь электромагнитного реле?",
      en: "What moves the armature in an electromagnetic relay?",
    },
    o: [
      { uz: "Prujina", ru: "Пружина", en: "The spring" },
      {
        uz: "Chulg'am toki hosil qilgan magnit oqim",
        ru: "Магнитный поток, созданный током обмотки",
        en: "The magnetic flux produced by the coil current",
      },
      { uz: "Kontakt ko'prigi", ru: "Контактный мостик", en: "The contact bridge" },
      { uz: "Baraban", ru: "Барабан", en: "The damping drum" },
    ],
    e: {
      uz: "Chulg'amdan o'tgan tok hosil qilgan magnit oqim yakorni magnitlaydi va elektromagnit kuch momentini hosil qiladi (9-ma'ruza).",
      ru: "Магнитный поток от тока обмотки намагничивает якорь и создаёт момент электромагнитной силы (лекция 9).",
      en: "The flux from the coil current magnetises the armature and creates the electromagnetic torque (lecture 9).",
    },
  },
  {
    l: 8, type: "mcq", a: 0,
    q: {
      uz: "O'lchov organining ishlash sharti qanday tenglama ko'rinishida yoziladi?",
      ru: "В виде какого уравнения записывается условие срабатывания измерительного органа?",
      en: "As what equation is the measuring element's operating condition written?",
    },
    o: [
      { uz: "Uchiq = f(Ir, Ur)", ru: "Uвых = f(Iр, Uр)", en: "Uout = f(Ir, Ur)" },
      { uz: "I = U/R", ru: "I = U/R", en: "I = U/R" },
      { uz: "P = U·I", ru: "P = U·I", en: "P = U·I" },
      { uz: "Ф = B·S", ru: "Ф = B·S", en: "Φ = B·S" },
    ],
    e: {
      uz: "O'lchov organining ishlash sharti Uchiq = f(Ir, Ur) ko'rinishida yoziladi (3-ma'ruza).",
      ru: "Условие срабатывания измерительного органа записывается как Uвых = f(Iр, Uр) (лекция 3).",
      en: "The operating condition is written Uout = f(Ir, Ur) (lecture 3).",
    },
  },
  {
    l: 8, type: "tf", a: true,
    q: {
      uz: "O'lchov organining chiqish signali ishlagan va ishlamagan holatga mos ikkita diskret qiymatga ega.",
      ru: "Выходной сигнал измерительного органа имеет два дискретных значения — сработал и не сработал.",
      en: "The measuring element's output has two discrete values — operated and not operated.",
    },
    e: {
      uz: "O'lchov organining o'tish xarakteristikasi releli xarakterga ega (3-ma'ruza).",
      ru: "Переходная характеристика измерительного органа имеет релейный характер (лекция 3).",
      en: "The measuring element's transfer characteristic is of the relay type (lecture 3).",
    },
  },
  {
    l: 8, type: "mcq", a: 1,
    q: {
      uz: "Rele chulg'amlarini ketma-ketdan parallel ulashga o'tkazilsa o'rnatma qanday o'zgaradi?",
      ru: "Как изменится уставка при переходе обмоток реле с последовательного на параллельное соединение?",
      en: "How does the setting change when the relay coils are switched from series to parallel?",
    },
    o: [
      { uz: "Ikki barobar kamayadi", ru: "Уменьшится вдвое", en: "It halves" },
      { uz: "Ikki barobar oshadi", ru: "Увеличится вдвое", en: "It doubles" },
      { uz: "O'zgarmaydi", ru: "Не изменится", en: "It stays the same" },
      { uz: "To'rt barobar oshadi", ru: "Увеличится вчетверо", en: "It quadruples" },
    ],
    e: {
      uz: "Parallel ulanganda har bir g'altak toki va magnitlanish kuchi ikki barobar kamayadi, shuning uchun o'rnatmani ikki barobar oshirish kerak (9-ma'ruza).",
      ru: "При параллельном включении ток каждой катушки и намагничивающая сила уменьшаются вдвое, поэтому уставку нужно удвоить (лекция 9).",
      en: "In parallel each coil's current and MMF halve, so the setting must be doubled (lecture 9).",
    },
  },
];
