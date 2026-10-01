import type { Term } from "../../types";

/** 1-4 ma'ruzalar atamalari. */
export const PART1: Term[] = [
  /* ================= 1-MA'RUZA ================= */
  {
    id: "rh", l: 1, r: ["eet", "q", "mth", "aqu"],
    t: { uz: "RH", ru: "РЗ", en: "RP" },
    f: { uz: "Rele himoyasi", ru: "Релейная защита", en: "Relay protection" },
    d: {
      uz: "Energotizim elementlarini doimiy nazorat qilib, shikastlanish yoki nonormal rejim paydo bo'lganda unga javob beruvchi avtomatik qurilma. Shikastlangan hududni aniqlab, o'chirgichga o'chirish buyrug'ini beradi.",
      ru: "Автоматическое устройство, непрерывно контролирующее элементы энергосистемы и реагирующее на появление повреждения или ненормального режима. Определяет повреждённый участок и подаёт команду на отключение выключателя.",
      en: "An automatic device that continuously monitors power-system elements and responds to a fault or abnormal mode. It locates the damaged section and issues a trip command to the circuit breaker.",
    },
    u: {
      uz: "Barcha elektr stansiya, nimstansiya va EUL larida",
      ru: "На всех электростанциях, подстанциях и ЛЭП",
      en: "At every power station, substation and transmission line",
    },
  },
  {
    id: "eet", l: 1, r: ["es", "ns", "eul"],
    t: { uz: "EET", ru: "ЭЭС", en: "EPS" },
    f: { uz: "Elektr energetika tizimi", ru: "Электроэнергетическая система", en: "Electric power system" },
    d: {
      uz: "Elektr energiyasini ishlab chiqarish, uzatish va taqsimlashning yagona tizimi; energotizimning elektr qismi.",
      ru: "Единая система производства, передачи и распределения электроэнергии; электрическая часть энергосистемы.",
      en: "The unified system for generating, transmitting and distributing electricity; the electrical part of the power system.",
    },
    u: {
      uz: "Umumiy tizim darajasidagi tahlillarda",
      ru: "При анализе на уровне системы в целом",
      en: "In system-wide analysis",
    },
  },
  {
    id: "es", l: 1, r: ["ns", "eet"],
    t: { uz: "ES", ru: "ЭС", en: "PS" },
    f: { uz: "Elektr stansiya", ru: "Электростанция", en: "Power station" },
    d: {
      uz: "Elektr energiyasini ishlab chiqaruvchi ob'ekt.",
      ru: "Объект, вырабатывающий электрическую энергию.",
      en: "A facility that generates electrical energy.",
    },
    u: {
      uz: "Tarmoq sxemalarida generatsiya nuqtasi sifatida",
      ru: "В схемах сети как точка генерации",
      en: "As the generation point in network diagrams",
    },
  },
  {
    id: "ns", l: 1, r: ["es", "eul", "ktr"],
    t: { uz: "NS", ru: "ПС", en: "SS" },
    f: { uz: "Nimstansiya", ru: "Подстанция", en: "Substation" },
    d: {
      uz: "Kuchlanishni o'zgartirib, elektr energiyasini taqsimlovchi ob'ekt.",
      ru: "Объект, преобразующий напряжение и распределяющий электроэнергию.",
      en: "A facility that transforms voltage and distributes electrical energy.",
    },
    u: {
      uz: "Shina va birlashmalar himoyasida",
      ru: "В защите шин и присоединений",
      en: "In busbar and feeder protection",
    },
  },
  {
    id: "eul", l: 1, r: ["es", "ns", "mth"],
    t: { uz: "EUL", ru: "ЛЭП", en: "TL" },
    f: { uz: "Elektr uzatish liniyasi", ru: "Линия электропередачи", en: "Transmission line" },
    d: {
      uz: "Elektr energiyasini masofaga uzatuvchi havo yoki kabel liniyasi.",
      ru: "Воздушная или кабельная линия, передающая электроэнергию на расстояние.",
      en: "An overhead or cable line that carries electrical energy over distance.",
    },
    u: {
      uz: "MTH va tokli kesim himoya qiladigan asosiy ob'ekt",
      ru: "Основной объект защиты МТЗ и токовой отсечки",
      en: "The main object protected by OCP and cut-off",
    },
  },
  {
    id: "qt", l: 1, r: ["k3", "k1", "iq", "um"],
    t: { uz: "QT", ru: "КЗ", en: "SC" },
    f: { uz: "Qisqa tutashuv", ru: "Короткое замыкание", en: "Short circuit" },
    d: {
      uz: "Fazalarning o'zaro yoki yer bilan tutashishi. Yopiq konturda generator EYuK si hisobiga katta Iq toki paydo bo'ladi.",
      ru: "Замыкание фаз между собой или на землю. В замкнутом контуре под действием ЭДС генератора возникает большой ток Iк.",
      en: "A connection between phases or between a phase and earth. Driven by the generator EMF, a large current Isc flows in the closed loop.",
    },
    u: {
      uz: "Barcha himoya turlarining asosiy ta'sir sababi",
      ru: "Основная причина срабатывания всех видов защиты",
      en: "The main trigger for every type of protection",
    },
  },
  {
    id: "k3", l: 1, r: ["qt", "k2", "tezkorlik"],
    t: { uz: "K(3)", ru: "К(3)", en: "F(3)" },
    f: { uz: "Uch fazali QT", ru: "Трёхфазное КЗ", en: "Three-phase short circuit" },
    d: {
      uz: "Uchala fazaning o'zaro tutashuvi. Turg'unlik shartiga ko'ra eng og'ir shikastlanish turi.",
      ru: "Замыкание всех трёх фаз между собой. По условию устойчивости — самый тяжёлый вид повреждения.",
      en: "All three phases shorted together. By the stability criterion, the most severe fault type.",
    },
    u: {
      uz: "Kesim va MTH ni maksimal rejimda hisoblashda",
      ru: "При расчёте отсечки и МТЗ в максимальном режиме",
      en: "When calculating cut-off and OCP in the maximum mode",
    },
  },
  {
    id: "k2", l: 1, r: ["qt", "k3", "k11"],
    t: { uz: "K(2)", ru: "К(2)", en: "F(2)" },
    f: { uz: "Ikki fazali QT", ru: "Двухфазное КЗ", en: "Two-phase short circuit" },
    d: {
      uz: "Ikki fazaning o'zaro tutashuvi. Neytrali zaminlangan tarmoqlarda yer bilan birga eng og'irlaridan biri.",
      ru: "Замыкание двух фаз между собой. В сетях с заземлённой нейтралью вместе с замыканием на землю — одно из самых тяжёлых.",
      en: "Two phases shorted together. In solidly earthed networks, together with an earth fault, one of the most severe.",
    },
    u: {
      uz: "Ikki fazali MTH sxemalarining sezgirligini baholashda",
      ru: "При оценке чувствительности двухфазных схем МТЗ",
      en: "When assessing the sensitivity of two-phase OCP schemes",
    },
  },
  {
    id: "k1", l: 1, r: ["qt", "nkf", "toliqyulduz"],
    t: { uz: "K(1)", ru: "К(1)", en: "F(1)" },
    f: { uz: "Bir fazali yerga QT", ru: "Однофазное КЗ на землю", en: "Single-phase-to-earth fault" },
    d: {
      uz: "Bitta fazaning yer bilan tutashuvi. Neytrali zaminlangan tarmoqlarda QT tokini hosil qiladi.",
      ru: "Замыкание одной фазы на землю. В сетях с заземлённой нейтралью создаёт ток КЗ.",
      en: "One phase connected to earth. In solidly earthed networks it produces a short-circuit current.",
    },
    u: {
      uz: "Nol ketma-ketlik himoyalarida",
      ru: "В защитах нулевой последовательности",
      en: "In zero-sequence protections",
    },
  },
  {
    id: "k11", l: 1, r: ["qt", "k2", "k1"],
    t: { uz: "K(1,1)", ru: "К(1,1)", en: "F(1,1)" },
    f: { uz: "Ikki fazali yerga QT", ru: "Двухфазное КЗ на землю", en: "Two-phase-to-earth fault" },
    d: {
      uz: "Ikki fazaning bir vaqtda yer bilan tutashuvi.",
      ru: "Одновременное замыкание двух фаз на землю.",
      en: "Two phases connected to earth at the same time.",
    },
    u: {
      uz: "Nol simda tok paydo bo'lishini tahlil qilishda",
      ru: "При анализе появления тока в нулевом проводе",
      en: "When analysing current appearing in the neutral wire",
    },
  },
  {
    id: "izolneytral", l: 1, r: ["k1", "ikkifazalisxema", "yoysondiruvchi"],
    t: {
      uz: "Neytrali izolyasiyalangan tarmoq",
      ru: "Сеть с изолированной нейтралью",
      en: "Network with isolated neutral",
    },
    d: {
      uz: "Neytrali yerga ulanmagan tarmoq. Bir fazaning yerga tutashuvi QT hosil qilmaydi, tok faqat sog' fazalarning yerga nisbatan sig'imi orqali oqadi, fazalararo kuchlanish o'zgarmaydi.",
      ru: "Сеть, нейтраль которой не заземлена. Замыкание одной фазы на землю не создаёт КЗ: ток течёт только через ёмкость неповреждённых фаз на землю, линейное напряжение не меняется.",
      en: "A network whose neutral is not earthed. A single phase-to-earth contact does not create a short circuit: current flows only through the earth capacitance of the healthy phases, and line voltage is unchanged.",
    },
    u: {
      uz: "6-35 kV taqsimlovchi tarmoqlarda",
      ru: "В распределительных сетях 6-35 кВ",
      en: "In 6-35 kV distribution networks",
    },
  },
  {
    id: "iq", l: 1, r: ["qt", "joul", "ihi"],
    t: { uz: "Iq", ru: "Iк", en: "Isc" },
    f: { uz: "Qisqa tutashuv toki", ru: "Ток короткого замыкания", en: "Short-circuit current" },
    d: {
      uz: "QT paytida yopiq konturda paydo bo'ladigan katta tok. Issiqlik va elektrodinamik kuchlarni keltirib chiqaradi.",
      ru: "Большой ток, возникающий в замкнутом контуре при КЗ. Вызывает нагрев и электродинамические усилия.",
      en: "The large current that appears in the closed loop during a short circuit. It causes heating and electrodynamic forces.",
    },
    u: {
      uz: "Himoya o'rnatmalarini hisoblashda",
      ru: "При расчёте уставок защиты",
      en: "When calculating protection settings",
    },
  },
  {
    id: "um", l: 1, r: ["qoldiqu", "iq"],
    t: { uz: "Um = Iq·Zm", ru: "Uм = Iк·Zм", en: "Um = Isc·Zm" },
    f: {
      uz: "Qoldiq kuchlanish ifodasi",
      ru: "Выражение остаточного напряжения",
      en: "Residual voltage expression",
    },
    d: {
      uz: "Tarmoqning biror nuqtasidagi pasaygan kuchlanish QT toki va shu nuqtagacha bo'lgan qarshilik ko'paytmasiga teng. QT nuqtasida kuchlanish nolga teng.",
      ru: "Пониженное напряжение в любой точке сети равно произведению тока КЗ на сопротивление до этой точки. В точке КЗ напряжение равно нулю.",
      en: "The depressed voltage at any point equals the fault current times the impedance up to that point. At the fault point the voltage is zero.",
    },
    u: {
      uz: "Kuchlanish organlarining sezgirligini baholashda",
      ru: "При оценке чувствительности органов напряжения",
      en: "When assessing voltage-element sensitivity",
    },
  },
  {
    id: "joul", l: 1, r: ["iq", "tezkorlik", "truxsat"],
    t: { uz: "Q = k·Iq²·R·t", ru: "Q = k·Iк²·R·t", en: "Q = k·Isc²·R·t" },
    f: { uz: "Joul-Lens qonuni", ru: "Закон Джоуля-Ленца", en: "Joule-Lenz law" },
    d: {
      uz: "QT tokidan ajraladigan issiqlik. Tok va vaqt qancha katta bo'lsa, buzilish shuncha kuchli — shuning uchun tezkorlik talab qilinadi.",
      ru: "Теплота, выделяемая током КЗ. Чем больше ток и время, тем сильнее разрушения — отсюда требование быстродействия.",
      en: "The heat released by the fault current. The larger the current and time, the greater the damage — hence the speed requirement.",
    },
    u: {
      uz: "Tezkorlik talabini asoslashda",
      ru: "При обосновании требования быстродействия",
      en: "When justifying the speed requirement",
    },
  },
  {
    id: "shikast", l: 1, r: ["qt", "nonormal"],
    t: { uz: "Shikastlanish", ru: "Повреждение", en: "Fault" },
    d: {
      uz: "Izolyasiyaning buzilishi, eskirishi, o'ta kuchlanish yoki xodim xatosi natijasida yuzaga keladigan QT. Katta avariya toklari va kuchlanish pasayishini hosil qiladi.",
      ru: "КЗ, возникающее из-за пробоя или старения изоляции, перенапряжения либо ошибки персонала. Создаёт большие аварийные токи и снижение напряжения.",
      en: "A short circuit caused by insulation breakdown or ageing, overvoltage, or personnel error. It produces large fault currents and a voltage dip.",
    },
    u: {
      uz: "RH ning birinchi ta'sir obyekti",
      ru: "Первый объект воздействия РЗ",
      en: "The primary thing relay protection responds to",
    },
  },
  {
    id: "nonormal", l: 1, r: ["otayuklanish", "tebranish", "asinxron"],
    t: { uz: "Nonormal rejim", ru: "Ненормальный режим", en: "Abnormal mode" },
    d: {
      uz: "Kuchlanish, tok yoki chastotaning ruxsat etilgan qiymatdan og'ishi. Ko'pincha o'chirishga emas, signalga ishlanadi.",
      ru: "Отклонение напряжения, тока или частоты от допустимого значения. Чаще действует на сигнал, а не на отключение.",
      en: "A deviation of voltage, current or frequency from the permitted value. It usually acts on an alarm rather than on tripping.",
    },
    u: {
      uz: "Signalga ishlovchi himoyalarda",
      ru: "В защитах, действующих на сигнал",
      en: "In alarm-only protections",
    },
  },
  {
    id: "otayuklanish", l: 1, r: ["inom", "truxsat", "nonormal"],
    t: { uz: "O'ta yuklanish", ru: "Перегрузка", en: "Overload" },
    d: {
      uz: "Tokning nominal qiymatdan oshishi. Qo'shimcha issiqlik izolyasiyani eskirtiradi; ruxsat etilgan trux vaqt tok qiymatiga bog'liq.",
      ru: "Превышение током номинального значения. Дополнительный нагрев старит изоляцию; допустимое время tдоп зависит от величины тока.",
      en: "Current exceeding the rated value. The extra heat ages the insulation; the permissible time tperm depends on the current magnitude.",
    },
    u: {
      uz: "Yuklanishdan himoya va signalizatsiyada",
      ru: "В защите от перегрузки и сигнализации",
      en: "In overload protection and alarms",
    },
  },
  {
    id: "inom", l: 1, r: ["otayuklanish", "truxsat"],
    t: { uz: "Inom", ru: "Iном", en: "Irated" },
    f: { uz: "Nominal tok", ru: "Номинальный ток", en: "Rated current" },
    d: {
      uz: "Cheklanmagan vaqt davomida qurilmadan o'tishi mumkin bo'lgan ruxsat etilgan maksimal tok.",
      ru: "Наибольший допустимый ток, который может протекать через устройство неограниченно долго.",
      en: "The maximum permissible current that may flow through the equipment indefinitely.",
    },
    u: {
      uz: "Yuklama toklarini baholashda",
      ru: "При оценке токов нагрузки",
      en: "When assessing load currents",
    },
  },
  {
    id: "truxsat", l: 1, r: ["otayuklanish", "inom"],
    t: { uz: "trux", ru: "tдоп", en: "tperm" },
    f: {
      uz: "Ruxsat etilgan yuklanish davomiyligi",
      ru: "Допустимая длительность перегрузки",
      en: "Permissible overload duration",
    },
    d: {
      uz: "Nominaldan katta tok o'tishiga ruxsat etilgan vaqt. trux = f(I) bog'liqligi uskuna konstruksiyasi va izolyasiya turidan aniqlanadi.",
      ru: "Время, в течение которого допускается протекание тока выше номинального. Зависимость tдоп = f(I) определяется конструкцией оборудования и типом изоляции.",
      en: "The time for which a current above rated is allowed. The relation tperm = f(I) is set by the equipment design and insulation type.",
    },
    u: {
      uz: "Yuklanish himoyasining vaqtini tanlashda",
      ru: "При выборе выдержки защиты от перегрузки",
      en: "When choosing the overload protection delay",
    },
  },
  {
    id: "tebranish", l: 1, r: ["asinxron", "km", "nonormal"],
    t: { uz: "Tebranish", ru: "Качания", en: "Power swings" },
    d: {
      uz: "Generatorlar sinxron ishining buzilishi. EYuK lar orasida δ burchak paydo bo'lib, ΔE = EA − EB farqi tenglashtiruvchi tok hosil qiladi; tok va kuchlanish tebranadi.",
      ru: "Нарушение синхронной работы генераторов. Между ЭДС появляется угол δ, разность ΔE = EA − EB создаёт уравнительный ток; ток и напряжение колеблются.",
      en: "Loss of synchronism between generators. An angle δ appears between the EMFs, the difference ΔE = EA − EB drives an equalising current, and current and voltage oscillate.",
    },
    u: {
      uz: "RH ning tartibsiz ishlashini bloklashda",
      ru: "При блокировке излишних срабатываний РЗ",
      en: "When blocking spurious protection operation",
    },
  },
  {
    id: "km", l: 1, r: ["tebranish"],
    t: { uz: "Km", ru: "Кm", en: "Km" },
    f: {
      uz: "Tebranishlar elektr markazi",
      ru: "Электрический центр качаний",
      en: "Electrical centre of swings",
    },
    d: {
      uz: "Tebranishda kuchlanish eng kichik bo'ladigan nuqta; δ = 180° da u nolgacha tushadi.",
      ru: "Точка, где при качаниях напряжение наименьшее; при δ = 180° оно падает до нуля.",
      en: "The point where voltage is lowest during swings; at δ = 180° it falls to zero.",
    },
    u: {
      uz: "Tebranishda kuchlanish taqsimotini tahlil qilishda",
      ru: "При анализе распределения напряжения в режиме качаний",
      en: "When analysing the voltage profile during swings",
    },
  },
  {
    id: "asinxron", l: 1, r: ["tebranish", "nonormal"],
    t: { uz: "Asinxron rejim", ru: "Асинхронный режим", en: "Asynchronous mode" },
    d: {
      uz: "Sinxron generatorning qo'zg'atishsiz ishlashi. Aylanish chastotasi ortadi, stator tokida pulsatsiya paydo bo'ladi.",
      ru: "Работа синхронного генератора без возбуждения. Частота вращения возрастает, в токе статора появляются пульсации.",
      en: "A synchronous generator running without excitation. The rotational speed rises and the stator current pulsates.",
    },
    u: {
      uz: "Generatorni tarmoqdan o'chirish qaroriga asos",
      ru: "Основание для отключения генератора от сети",
      en: "Grounds for disconnecting the generator from the network",
    },
  },
  {
    id: "aqu", l: 1, r: ["zau", "selektivlik", "rh"],
    t: { uz: "AQU", ru: "АПВ", en: "AR" },
    f: {
      uz: "Avtomatik qayta ulagich",
      ru: "Автоматическое повторное включение",
      en: "Automatic reclosing",
    },
    d: {
      uz: "O'chgan liniyani avtomatik ravishda qayta qo'shuvchi avtomatika. Noselektiv tez o'chirishni tuzatish uchun ham ishlatiladi.",
      ru: "Автоматика, повторно включающая отключившуюся линию. Применяется и для исправления неселективного быстрого отключения.",
      en: "Automation that re-energises a tripped line. It is also used to correct non-selective fast tripping.",
    },
    u: {
      uz: "Noselektiv kesimlardan keyin, yuklama tokini oshiruvchi rejimlarda",
      ru: "После неселективных отсечек, в режимах с увеличением тока нагрузки",
      en: "After non-selective cut-offs and in modes that raise load current",
    },
  },
  {
    id: "zau", l: 1, r: ["aqu", "ioit"],
    t: { uz: "ZAU", ru: "АВР", en: "ATS" },
    f: {
      uz: "Zahiradagi manbani avtomatik ulash",
      ru: "Автоматический ввод резерва",
      en: "Automatic transfer of reserve supply",
    },
    d: {
      uz: "Asosiy manba yo'qolganda zahira manbani avtomatik ulovchi avtomatika.",
      ru: "Автоматика, включающая резервный источник при потере основного.",
      en: "Automation that switches in the standby source when the main supply is lost.",
    },
    u: {
      uz: "MTH ishlash tokini tanlashda qo'shimcha yuklama manbai sifatida",
      ru: "Как источник дополнительной нагрузки при выборе тока срабатывания МТЗ",
      en: "As a source of extra load when choosing the OCP pickup current",
    },
  },
  {
    id: "chay", l: 1, r: ["aqu", "zau"],
    t: { uz: "ChAY", ru: "АЧР", en: "UFLS" },
    f: {
      uz: "Chastotani avtomatik yuksizlantirish",
      ru: "Автоматическая частотная разгрузка",
      en: "Under-frequency load shedding",
    },
    d: {
      uz: "Chastota pasayganda yuklamaning bir qismini o'chiruvchi avtomatika.",
      ru: "Автоматика, отключающая часть нагрузки при снижении частоты.",
      en: "Automation that sheds part of the load when frequency drops.",
    },
    u: {
      uz: "Tizim avariyalarining oldini olishda",
      ru: "Для предотвращения системных аварий",
      en: "To prevent system-wide emergencies",
    },
  },
  {
    id: "yoysondiruvchi", l: 1, r: ["izolneytral", "k1"],
    t: {
      uz: "Yoyni so'ndiruvchi reaktor",
      ru: "Дугогасящий реактор",
      en: "Arc-suppression reactor",
    },
    d: {
      uz: "Tarmoq neytralini katta qarshilik orqali zaminlab, bir fazali tutashuv tokini cheklovchi qurilma.",
      ru: "Устройство, заземляющее нейтраль сети через большое сопротивление и ограничивающее ток однофазного замыкания.",
      en: "A device that earths the network neutral through a high impedance, limiting single-phase fault current.",
    },
    u: { uz: "6-35 kV tarmoqlarda", ru: "В сетях 6-35 кВ", en: "In 6-35 kV networks" },
  },
  {
    id: "q", l: 1, r: ["yat", "sq", "tqo"],
    t: { uz: "Q", ru: "Q", en: "Q" },
    f: {
      uz: "O'chirgich (uzgich)",
      ru: "Выключатель",
      en: "Circuit breaker",
    },
    d: {
      uz: "QT tokini ajratish uchun mo'ljallangan kommutatsion apparat. RH unga o'chirish buyrug'ini beradi.",
      ru: "Коммутационный аппарат, предназначенный для отключения тока КЗ. РЗ подаёт на него команду отключения.",
      en: "A switching device designed to interrupt fault current. Protection issues its trip command to it.",
    },
    u: {
      uz: "Har bir himoyaning bajaruvchi zanjirida",
      ru: "В исполнительной цепи любой защиты",
      en: "In the output circuit of every protection",
    },
  },

  /* ================= 2-MA'RUZA ================= */
  {
    id: "selektivlik", l: 2, r: ["tezkorlik", "dt", "mth", "kesim"],
    t: {
      uz: "Selektivlik (tanlovchanlik)",
      ru: "Селективность (избирательность)",
      en: "Selectivity",
    },
    d: {
      uz: "RH ning faqat shikastlangan uchastkani, ya'ni shikastlanish joyiga eng yaqin o'chirgichni o'chirish qobiliyati.",
      ru: "Способность РЗ отключать только повреждённый участок, то есть выключатель, ближайший к месту повреждения.",
      en: "The ability of protection to trip only the faulted section — the breaker closest to the fault.",
    },
    u: {
      uz: "Pog'onali vaqt prinsipi va kesim zonasini tanlashda",
      ru: "В ступенчатом принципе выдержек и при выборе зоны отсечки",
      en: "In the stepped-time principle and when choosing the cut-off zone",
    },
  },
  {
    id: "tezkorlik", l: 2, r: ["tqo", "qoldiqu", "kesim"],
    t: { uz: "Tezkorlik", ru: "Быстродействие", en: "Speed of operation" },
    d: {
      uz: "QT ni imkon qadar tez o'chirish talabi: buzilishni kamaytiradi, termik barqarorlikni va generatorlarning turg'un parallel ishlashini saqlaydi.",
      ru: "Требование отключать КЗ как можно быстрее: уменьшает разрушения, сохраняет термическую стойкость и устойчивость параллельной работы генераторов.",
      en: "The requirement to clear a fault as fast as possible: it limits damage and preserves thermal withstand and generator stability.",
    },
    u: {
      uz: "Kesim va tez ishlovchi RH ni qo'llashni asoslashda",
      ru: "При обосновании применения отсечки и быстродействующей РЗ",
      en: "When justifying cut-offs and high-speed protection",
    },
  },
  {
    id: "sezgirlik", l: 2, r: ["ksez", "uzoqzahira", "minrejim"],
    t: { uz: "Sezgirlik", ru: "Чувствительность", en: "Sensitivity" },
    d: {
      uz: "RH ning o'z zonasi va zahira zonasi oxiridagi QT ga, hattoki minimal rejimda va o'tkinchi qarshilik orqali tutashuvda ham ishonchli javob berish qobiliyati.",
      ru: "Способность РЗ надёжно реагировать на КЗ в конце своей и резервируемой зоны даже в минимальном режиме и при замыкании через переходное сопротивление.",
      en: "The ability of protection to respond reliably to a fault at the end of its own and its backup zone, even in the minimum mode and through a transition resistance.",
    },
    u: {
      uz: "ksez koeffitsienti bilan tekshiriladi",
      ru: "Проверяется коэффициентом чувствительности kч",
      en: "Checked with the sensitivity factor ksens",
    },
  },
  {
    id: "ishonchlilik", l: 2, r: ["selektivlik", "pue"],
    t: { uz: "Ishonchlilik", ru: "Надёжность", en: "Reliability" },
    d: {
      uz: "Himoyaning o'z zonasida QT bo'lganda buzilmasdan ishlashi va ko'rib chiqilmagan holatlarda noto'g'ri ishlamasligi. Sxema soddaligi va elementlar soniga bog'liq.",
      ru: "Безотказное действие защиты при КЗ в её зоне и отсутствие ложных срабатываний в непредусмотренных случаях. Зависит от простоты схемы и числа элементов.",
      en: "Failure-free operation for faults in its zone and no false operation otherwise. It depends on circuit simplicity and the number of components.",
    },
    u: {
      uz: "Sxema tanlash va davriy tekshiruvlarda",
      ru: "При выборе схемы и периодических проверках",
      en: "When selecting a scheme and in periodic testing",
    },
  },
  {
    id: "uzoqzahira", l: 2, r: ["sezgirlik", "hudud2", "ksez"],
    t: { uz: "Uzoq zahiralash", ru: "Дальнее резервирование", en: "Remote backup" },
    d: {
      uz: "Himoyaning keyingi (ikkinchi) hududdagi QT ga ham javob berish funksiyasi — qo'shni himoya yoki o'chirgich ishlamay qolgan holat uchun.",
      ru: "Функция реагирования защиты на КЗ в следующей (второй) зоне — на случай отказа смежной защиты или выключателя.",
      en: "The protection's ability to respond to a fault in the next (second) zone, in case the adjacent protection or breaker fails.",
    },
    u: {
      uz: "MTH sezgirligini tekshirishda (ksez ≥ 1,2)",
      ru: "При проверке чувствительности МТЗ (kч ≥ 1,2)",
      en: "When checking OCP sensitivity (ksens ≥ 1.2)",
    },
  },
  {
    id: "hudud1", l: 2, r: ["hudud2", "uzoqzahira"],
    t: { uz: "1-hudud (asosiy)", ru: "1-я зона (основная)", en: "Zone 1 (main)" },
    d: {
      uz: "Himoya bevosita himoyalaydigan uchastka.",
      ru: "Участок, который защита защищает непосредственно.",
      en: "The section the protection covers directly.",
    },
    u: {
      uz: "Himoya zonalarini belgilashda",
      ru: "При определении зон защиты",
      en: "When defining protection zones",
    },
  },
  {
    id: "hudud2", l: 2, r: ["hudud1", "uzoqzahira"],
    t: { uz: "2-hudud (zahiralangan)", ru: "2-я зона (резервируемая)", en: "Zone 2 (backup)" },
    d: {
      uz: "Qo'shni himoya zonasi; asosiy himoya ishlamay qolganda zahiralanadi.",
      ru: "Зона смежной защиты; резервируется при отказе основной защиты.",
      en: "The adjacent protection's zone, backed up if the main protection fails.",
    },
    u: {
      uz: "ksez ≥ 1,2 sharti tekshiriladigan zona",
      ru: "Зона, для которой проверяется условие kч ≥ 1,2",
      en: "The zone where ksens ≥ 1.2 is checked",
    },
  },
  {
    id: "tqo", l: 2, r: ["tezkorlik", "q", "th"],
    t: { uz: "tq.o' = th + to'", ru: "tо.кз = tз + tв", en: "tclear = tprot + tbrk" },
    f: {
      uz: "QT ni to'liq o'chirish vaqti",
      ru: "Полное время отключения КЗ",
      en: "Total fault clearing time",
    },
    d: {
      uz: "RH ishlash vaqti th va o'chirgichning uzish vaqti to' yig'indisi.",
      ru: "Сумма времени действия РЗ tз и времени отключения выключателя tв.",
      en: "The sum of the protection operating time and the breaker interrupting time.",
    },
    u: {
      uz: "Tezkorlik talabini baholashda",
      ru: "При оценке требования быстродействия",
      en: "When assessing the speed requirement",
    },
  },
  {
    id: "qoldiqu", l: 2, r: ["tezkorlik", "um", "kv"],
    t: { uz: "Qoldiq kuchlanish", ru: "Остаточное напряжение", en: "Residual voltage" },
    d: {
      uz: "QT paytida shinalarda saqlanib qolgan kuchlanish. Uchastka oxiridagi K(3) da u nominalning 60 % dan kam bo'lsa, tez ishlovchi RH qo'llash kerak.",
      ru: "Напряжение, сохраняющееся на шинах при КЗ. Если при К(3) в конце участка оно меньше 60 % номинального, необходима быстродействующая РЗ.",
      en: "The voltage remaining on the busbars during a fault. If it is below 60 % of rated for a three-phase fault at the end of the section, high-speed protection is required.",
    },
    u: {
      uz: "Tez ishlovchi himoya zarurligini aniqlashda",
      ru: "При определении необходимости быстродействующей защиты",
      en: "When deciding whether high-speed protection is needed",
    },
  },
  {
    id: "minrejim", l: 2, r: ["sezgirlik", "iqtmin"],
    t: { uz: "Minimal rejim", ru: "Минимальный режим", en: "Minimum mode" },
    d: {
      uz: "Manba generatorlarining bir qismi ishdan chiqqan, QT toki eng kichik bo'ladigan tarmoq rejimi.",
      ru: "Режим сети, при котором часть генераторов источника отключена и ток КЗ наименьший.",
      en: "The network condition with part of the source generation out of service, giving the smallest fault current.",
    },
    u: {
      uz: "Sezgirlikni tekshirishda hisobiy rejim",
      ru: "Расчётный режим при проверке чувствительности",
      en: "The design case for the sensitivity check",
    },
  },
  {
    id: "rotkinchi", l: 2, r: ["sezgirlik", "minrejim"],
    t: { uz: "Ro'", ru: "Rп", en: "Rtr" },
    f: {
      uz: "O'tkinchi qarshilik",
      ru: "Переходное сопротивление",
      en: "Transition (arc) resistance",
    },
    d: {
      uz: "QT joyidagi qo'shimcha qarshilik; u tok qiymatini kamaytiradi va sezgirlik talabini oshiradi.",
      ru: "Дополнительное сопротивление в месте КЗ; снижает величину тока и повышает требование к чувствительности.",
      en: "Extra resistance at the fault point; it reduces the current and raises the sensitivity requirement.",
    },
    u: {
      uz: "Sezgirlikni baholashda",
      ru: "При оценке чувствительности",
      en: "When assessing sensitivity",
    },
  },
  {
    id: "pue", l: 2, r: ["ishonchlilik", "kesimzona"],
    t: { uz: "PUE", ru: "ПУЭ", en: "Wiring regulations" },
    f: {
      uz: "Elektr uskunalarining qurilish qoidalari",
      ru: "Правила устройства электроустановок",
      en: "Rules for electrical installations",
    },
    d: {
      uz: "Himoyaga qo'yiladigan sezgirlik, qamrov va bajarilish talablarini belgilovchi normativ hujjat.",
      ru: "Нормативный документ, устанавливающий требования к чувствительности, охвату и исполнению защиты.",
      en: "The standard that sets requirements for protection sensitivity, coverage and construction.",
    },
    u: {
      uz: "ksez va kesim qamrovi (≥ 20 %) talablarida",
      ru: "В требованиях к kч и охвату отсечки (≥ 20 %)",
      en: "In the ksens and cut-off coverage (≥ 20 %) requirements",
    },
  },

  /* ================= 3-MA'RUZA ================= */
  {
    id: "olchovqism", l: 3, r: ["mantiqiyqism", "oo", "ka", "kv"],
    t: { uz: "O'lchov qismi", ru: "Измерительная часть", en: "Measuring part" },
    d: {
      uz: "RH ning himoya obyekti holatini doimiy nazorat qiluvchi va shikastlanish paydo bo'lganda mantiqiy qismga diskret signal beruvchi birinchi tarkibiy qismi.",
      ru: "Первая структурная часть РЗ: непрерывно контролирует состояние защищаемого объекта и при повреждении подаёт дискретный сигнал в логическую часть.",
      en: "The first structural part of the protection: it continuously monitors the protected object and, on a fault, sends a discrete signal to the logic part.",
    },
    u: {
      uz: "Har qanday RH qurilmasining kirishida",
      ru: "На входе любого устройства РЗ",
      en: "At the input of any protection device",
    },
  },
  {
    id: "mantiqiyqism", l: 3, r: ["olchovqism", "bajaruvchiqism", "kt", "yoki"],
    t: {
      uz: "Mantiqiy (operativ) qism",
      ru: "Логическая (оперативная) часть",
      en: "Logic (operating) part",
    },
    d: {
      uz: "O'lchov qismidan kelgan diskret signallar ustida berilgan dastur bo'yicha mantiqiy amallarni bajaruvchi qism.",
      ru: "Часть, выполняющая логические операции над дискретными сигналами измерительной части по заданной программе.",
      en: "The part that performs logic operations on the measuring part's discrete signals according to a set program.",
    },
    u: {
      uz: "MTH da YoKI + vaqt organi sifatida",
      ru: "В МТЗ — как ИЛИ и орган времени",
      en: "In OCP, as the OR gate plus the timing element",
    },
  },
  {
    id: "bajaruvchiqism", l: 3, r: ["kl", "yat", "mantiqiyqism"],
    t: {
      uz: "Boshqaruvchi (bajaruvchi) qism",
      ru: "Управляющая (исполнительная) часть",
      en: "Output (executive) part",
    },
    d: {
      uz: "Mantiqiy qism signalini o'chirgichni o'chirish uchun yetarli quvvatgacha kuchaytiruvchi qism.",
      ru: "Часть, усиливающая сигнал логической части до мощности, достаточной для отключения выключателя.",
      en: "The part that amplifies the logic signal to a power sufficient to trip the breaker.",
    },
    u: {
      uz: "KL oraliq relesi orqali amalga oshiriladi",
      ru: "Выполняется через промежуточное реле KL",
      en: "Implemented through the KL auxiliary relay",
    },
  },
  {
    id: "taminmanba", l: 3, r: ["operativtok", "gb", "tb"],
    t: { uz: "Ta'minlash manbasi", ru: "Источник питания", en: "Supply source" },
    d: {
      uz: "Mantiqiy va bajaruvchi qism elementlarini hamda yarimo'tkazgichli elementlarni ta'minlovchi barqaror kuchlanish manbai.",
      ru: "Источник стабильного напряжения, питающий элементы логической и исполнительной частей и полупроводниковые элементы.",
      en: "A stable voltage source feeding the logic and output parts and the semiconductor elements.",
    },
    u: { uz: "Operativ zanjirlarda", ru: "В оперативных цепях", en: "In the operating circuits" },
  },
  {
    id: "elementbaza", l: 3, r: ["mp", "rele"],
    t: { uz: "Elementlar bazasi", ru: "Элементная база", en: "Component base" },
    d: {
      uz: "RH qurilish texnologiyasi: elektromexanik, yarimo'tkazgichli va mikroprotsessorli.",
      ru: "Технология построения РЗ: электромеханическая, полупроводниковая и микропроцессорная.",
      en: "The technology used to build protection: electromechanical, semiconductor and microprocessor.",
    },
    u: { uz: "Himoya turini tanlashda", ru: "При выборе типа защиты", en: "When choosing the protection type" },
  },
  {
    id: "rele", l: 3, r: ["xri", "xrq", "otishxar"],
    t: { uz: "Rele", ru: "Реле", en: "Relay" },
    d: {
      uz: "Kirishdagi X elektr kattalikning o'zgarishiga javob beruvchi avtomatik apparat: Xr.i qiymatida ishlab, chiqishda keskin o'zgaruvchi signal hosil qiladi.",
      ru: "Автоматический аппарат, реагирующий на изменение входной электрической величины X: при значении Xр.с он срабатывает и на выходе возникает скачкообразный сигнал.",
      en: "An automatic device responding to a change of the input electrical quantity X: at the value Xop it operates and a step change appears at the output.",
    },
    u: { uz: "RH ning barcha qismlarida", ru: "Во всех частях РЗ", en: "In every part of the protection" },
  },
  {
    id: "xri", l: 3, r: ["xrq", "kqay", "rele"],
    t: { uz: "Xr.i", ru: "Xр.с", en: "Xop" },
    f: {
      uz: "Relening ishlash parametri",
      ru: "Параметр срабатывания реле",
      en: "Relay operating parameter",
    },
    d: {
      uz: "Rele ishga tushadigan kirish kattaligining qiymati.",
      ru: "Значение входной величины, при котором реле срабатывает.",
      en: "The value of the input quantity at which the relay operates.",
    },
    u: { uz: "O'rnatmani belgilashda", ru: "При задании уставки", en: "When defining the setting" },
  },
  {
    id: "xrq", l: 3, r: ["xri", "kqay"],
    t: { uz: "Xr.q", ru: "Xр.в", en: "Xres" },
    f: {
      uz: "Relening qaytish kattaligi",
      ru: "Параметр возврата реле",
      en: "Relay reset parameter",
    },
    d: {
      uz: "Kirish kattaligi kamayganda rele boshlang'ich holatga qaytadigan qiymat.",
      ru: "Значение, при снижении до которого реле возвращается в исходное состояние.",
      en: "The value to which the input must fall for the relay to return to its initial state.",
    },
    u: {
      uz: "Qaytish koeffitsientini hisoblashda",
      ru: "При расчёте коэффициента возврата",
      en: "When computing the reset ratio",
    },
  },
  {
    id: "otishxar", l: 3, r: ["rele", "diskret"],
    t: { uz: "O'tish xarakteristikasi", ru: "Переходная характеристика", en: "Transfer characteristic" },
    d: {
      uz: "Chiqish signalining kirishga bog'liqligi Y = f(X). Keskin (diskret) o'zgarish releli xarakteristika deyiladi.",
      ru: "Зависимость выходного сигнала от входного Y = f(X). Скачкообразное (дискретное) изменение называют релейной характеристикой.",
      en: "The dependence of output on input, Y = f(X). A step (discrete) change is called a relay characteristic.",
    },
    u: {
      uz: "O'lchov organlarini tavsiflashda",
      ru: "При описании измерительных органов",
      en: "When describing measuring elements",
    },
  },
  {
    id: "diskret", l: 3, r: ["otishxar", "mantiqiy1"],
    t: { uz: "Diskret signal", ru: "Дискретный сигнал", en: "Discrete signal" },
    d: {
      uz: "Faqat ikkita qiymatga ega signal (bor/yo'q, 1/0).",
      ru: "Сигнал, имеющий только два значения (есть/нет, 1/0).",
      en: "A signal with only two values (present/absent, 1/0).",
    },
    u: { uz: "Mantiqiy sxemalarda", ru: "В логических схемах", en: "In logic diagrams" },
  },
  {
    id: "maksrele", l: 3, r: ["minrele", "ka", "rt40"],
    t: { uz: "Maksimal rele", ru: "Максимальное реле", en: "Maximum relay" },
    d: {
      uz: "Nazorat kattaligining oshishiga ishlovchi o'lchov relesi (masalan, maksimal tok relesi).",
      ru: "Измерительное реле, срабатывающее при возрастании контролируемой величины (например, максимальное реле тока).",
      en: "A measuring relay that operates when the monitored quantity rises (e.g. an overcurrent relay).",
    },
    u: { uz: "MTH va tokli kesimda", ru: "В МТЗ и токовой отсечке", en: "In OCP and cut-off" },
  },
  {
    id: "minrele", l: 3, r: ["maksrele", "kv", "rn54"],
    t: { uz: "Minimal rele", ru: "Минимальное реле", en: "Minimum relay" },
    d: {
      uz: "Nazorat kattaligining pasayishiga ishlovchi o'lchov relesi (masalan, minimal kuchlanish relesi).",
      ru: "Измерительное реле, срабатывающее при снижении контролируемой величины (например, минимальное реле напряжения).",
      en: "A measuring relay that operates when the monitored quantity falls (e.g. an undervoltage relay).",
    },
    u: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH da",
      ru: "В МТЗ с пуском по напряжению",
      en: "In OCP with voltage restraint",
    },
  },
  {
    id: "ikkilamchirele", l: 3, r: ["birlamchirele", "ta", "tv"],
    t: { uz: "Ikkilamchi rele", ru: "Вторичное реле", en: "Secondary relay" },
    d: {
      uz: "Tarmoqqa TA va TV o'lchov transformatorlari orqali ulanadigan rele. Yuqori kuchlanishdan izolyasiyalangan, ikkilamchi tok 5 yoki 1 A, kuchlanish 100 V.",
      ru: "Реле, подключаемое к сети через измерительные трансформаторы TA и TV. Изолировано от высокого напряжения, вторичный ток 5 или 1 А, напряжение 100 В.",
      en: "A relay connected to the network through TA and TV instrument transformers. Isolated from high voltage; secondary current 5 or 1 A, voltage 100 V.",
    },
    u: {
      uz: "1000 V dan yuqori qurilmalarda",
      ru: "В установках выше 1000 В",
      en: "In installations above 1000 V",
    },
  },
  {
    id: "birlamchirele", l: 3, r: ["ikkilamchirele", "bevosita"],
    t: { uz: "Birlamchi rele", ru: "Первичное реле", en: "Primary relay" },
    d: {
      uz: "Tarmoq toki va kuchlanishiga to'g'ridan to'g'ri ulanadigan rele.",
      ru: "Реле, включаемое непосредственно на ток и напряжение сети.",
      en: "A relay connected directly to the network current and voltage.",
    },
    u: { uz: "1 kV gacha qurilmalarda", ru: "В установках до 1 кВ", en: "In installations up to 1 kV" },
  },
  {
    id: "ta", l: 3, r: ["tt", "ki", "ikkilamchirele"],
    t: { uz: "TA", ru: "TA", en: "TA" },
    f: {
      uz: "Tok o'lchov transformatori (TT)",
      ru: "Измерительный трансформатор тока (ТТ)",
      en: "Current transformer (CT)",
    },
    d: {
      uz: "Himoya obyektining tokini o'lchov qismiga keltiruvchi transformator.",
      ru: "Трансформатор, передающий ток защищаемого объекта в измерительную часть.",
      en: "The transformer that brings the protected object's current to the measuring part.",
    },
    u: { uz: "Barcha tokli himoyalarda", ru: "Во всех токовых защитах", en: "In all current protections" },
  },
  {
    id: "tv", l: 3, r: ["ktr", "ku", "kv"],
    t: { uz: "TV", ru: "TV", en: "TV" },
    f: {
      uz: "Kuchlanish o'lchov transformatori (KT)",
      ru: "Измерительный трансформатор напряжения (ТН)",
      en: "Voltage transformer (VT)",
    },
    d: {
      uz: "Himoya obyektining kuchlanishini o'lchov qismiga keltiruvchi transformator.",
      ru: "Трансформатор, передающий напряжение защищаемого объекта в измерительную часть.",
      en: "The transformer that brings the protected object's voltage to the measuring part.",
    },
    u: {
      uz: "Kuchlanish organli himoyalarda",
      ru: "В защитах с органом напряжения",
      en: "In protections with a voltage element",
    },
  },
  {
    id: "bevosita", l: 3, r: ["bilvosita", "birlamchirele"],
    t: { uz: "Bevosita ta'sir", ru: "Прямое действие", en: "Direct action" },
    d: {
      uz: "Relening harakatlanuvchi qismi o'chirgichning o'chirish qurilmasi bilan mexanik bog'langan usul. Sodda, operativ tok talab qilmaydi, lekin xatoligi katta.",
      ru: "Способ, при котором подвижная система реле механически связана с отключающим устройством выключателя. Прост, не требует оперативного тока, но имеет большую погрешность.",
      en: "The moving part of the relay is mechanically linked to the breaker's trip mechanism. Simple and needs no operating supply, but its error is large.",
    },
    u: {
      uz: "35 kV gacha taqsimlash tarmoqlarida",
      ru: "В распределительных сетях до 35 кВ",
      en: "In distribution networks up to 35 kV",
    },
  },
  {
    id: "bilvosita", l: 3, r: ["bevosita", "kl", "yat"],
    t: { uz: "Bilvosita ta'sir", ru: "Косвенное действие", en: "Indirect action" },
    d: {
      uz: "Rele o'z kontaktlari bilan o'chirish kontaktorining ta'minot zanjirini qo'shadigan usul. Sezgir, xatoligi kichik, sozlash obyektni ajratmasdan bajariladi.",
      ru: "Способ, при котором реле своими контактами замыкает цепь питания отключающего контактора. Чувствителен, погрешность мала, настройка выполняется без отключения объекта.",
      en: "The relay's own contacts close the supply circuit of the trip contactor. Sensitive, low error, and it can be adjusted without taking the object out of service.",
    },
    u: {
      uz: "Zamonaviy RH sxemalarining aksariyatida",
      ru: "В большинстве современных схем РЗ",
      en: "In most modern protection schemes",
    },
  },
  {
    id: "oo", l: 3, r: ["olchovqism", "ka", "kv"],
    t: { uz: "O'O", ru: "ИО", en: "ME" },
    f: { uz: "O'lchov organi", ru: "Измерительный орган", en: "Measuring element" },
    d: {
      uz: "O'lchov relelaridan tuzilgan organ; ishlash sharti Uchiq = f(Ir, Ur) ko'rinishida yoziladi.",
      ru: "Орган, составленный из измерительных реле; условие срабатывания записывается как Uвых = f(Iр, Uр).",
      en: "An element built from measuring relays; its operating condition is written as Uout = f(Ir, Ur).",
    },
    u: {
      uz: "MTH strukturaviy sxemasining 1-qismi",
      ru: "Часть 1 структурной схемы МТЗ",
      en: "Part 1 of the OCP block diagram",
    },
  },
  {
    id: "mo", l: 3, r: ["mantiqiyqism", "yoki", "va"],
    t: { uz: "MO", ru: "ЛО", en: "LE" },
    f: { uz: "Mantiqiy organ", ru: "Логический орган", en: "Logic element" },
    d: {
      uz: "Mantiqiy amallarni bajaruvchi element.",
      ru: "Элемент, выполняющий логические операции.",
      en: "The element that performs logic operations.",
    },
    u: { uz: "MTH da YoKI (DW) sifatida", ru: "В МТЗ — как ИЛИ (DW)", en: "In OCP, as the OR (DW) gate" },
  },
  {
    id: "vaqtorgan", l: 3, r: ["kt", "sabrvaqt", "dt"],
    t: { uz: "Vaqt organi", ru: "Орган времени", en: "Timing element" },
    d: {
      uz: "Sabr vaqtini hosil qiluvchi element (KT vaqt relesi).",
      ru: "Элемент, создающий выдержку времени (реле времени KT).",
      en: "The element that creates the time delay (the KT time relay).",
    },
    u: {
      uz: "Selektivlikni vaqt bo'yicha ta'minlashda",
      ru: "Для обеспечения селективности по времени",
      en: "To provide selectivity by time",
    },
  },
  {
    id: "xotiraorgan", l: 3, r: ["rstrigger", "mantiqiyqism"],
    t: { uz: "Xotira organi", ru: "Орган памяти", en: "Memory element" },
    d: {
      uz: "Qisqa vaqtli signalni uzaytiruvchi element.",
      ru: "Элемент, удлиняющий кратковременный сигнал.",
      en: "The element that stretches a short-duration signal.",
    },
    u: { uz: "Mantiqiy qismda", ru: "В логической части", en: "In the logic part" },
  },

  /* ================= 4-MA'RUZA ================= */
  {
    id: "operativtok", l: 4, r: ["ozgarmasot", "ozgaruvchanot", "taminmanba"],
    t: { uz: "Operativ tok", ru: "Оперативный ток", en: "Operating current" },
    d: {
      uz: "O'chirgichning distansion boshqaruvi, RH, avtomatika va signalizatsiya zanjirlarini ta'minlovchi tok. Kuchlanishi va quvvati QT paytida ham yetarli bo'lishi shart.",
      ru: "Ток, питающий цепи дистанционного управления выключателем, РЗ, автоматики и сигнализации. Его напряжение и мощность должны быть достаточны и при КЗ.",
      en: "The supply for breaker remote control, protection, automation and alarm circuits. Its voltage and power must remain sufficient during a fault.",
    },
    u: {
      uz: "Har bir RH qurilmasining operativ zanjirida",
      ru: "В оперативных цепях каждого устройства РЗ",
      en: "In the operating circuits of every protection device",
    },
  },
  {
    id: "ozgarmasot", l: 4, r: ["gb", "shu", "operativtok"],
    t: { uz: "O'zgarmas operativ tok", ru: "Постоянный оперативный ток", en: "DC operating supply" },
    d: {
      uz: "Manba sifatida 110-220 V (ba'zan 48 V) akkumulyator batareyalari ishlatiladigan operativ tok. Eng ishonchli, lekin qimmat.",
      ru: "Оперативный ток, источником которого служат аккумуляторные батареи 110-220 В (иногда 48 В). Самый надёжный, но дорогой.",
      en: "Operating supply taken from 110-220 V (sometimes 48 V) storage batteries. The most reliable but expensive option.",
    },
    u: {
      uz: "110 kV va undan yuqori ES va NS larda",
      ru: "На ЭС и ПС 110 кВ и выше",
      en: "At 110 kV and higher stations and substations",
    },
  },
  {
    id: "ozgaruvchanot", l: 4, r: ["tt", "ktr", "shet"],
    t: { uz: "O'zgaruvchan operativ tok", ru: "Переменный оперативный ток", en: "AC operating supply" },
    d: {
      uz: "Manba sifatida TT, KT va ShET ishlatiladigan operativ tok. Arzon, maxsus bino talab qilmaydi, lekin quvvati chegaralangan.",
      ru: "Оперативный ток, источниками которого служат ТТ, ТН и ТСН. Дёшев, не требует специального здания, но мощность ограничена.",
      en: "Operating supply taken from CTs, VTs and the auxiliary transformer. Cheap and needs no special building, but its power is limited.",
    },
    u: {
      uz: "6-35 va ba'zi 110 kV tarmoqlarda",
      ru: "В сетях 6-35 и некоторых 110 кВ",
      en: "In 6-35 kV and some 110 kV networks",
    },
  },
  {
    id: "gb", l: 4, r: ["ozgarmasot", "shu", "sf"],
    t: { uz: "GB", ru: "GB", en: "GB" },
    f: { uz: "Akkumulyator batareyasi", ru: "Аккумуляторная батарея", en: "Storage battery" },
    d: {
      uz: "O'zgarmas operativ tok manbai. Doimiy zaryadlangan rejimda ishlaydi, unga parallel qo'shimcha zaryadlovchi qurilma ulanadi.",
      ru: "Источник постоянного оперативного тока. Работает в режиме постоянного подзаряда, параллельно ей включено подзарядное устройство.",
      en: "The DC operating supply source. It works in float-charge mode with a charger connected in parallel.",
    },
    u: {
      uz: "Markazlashtirilgan operativ ta'minotda",
      ru: "При централизованном оперативном питании",
      en: "In centralised operating supply",
    },
  },
  {
    id: "shu", l: 4, r: ["shv", "shs", "gb"],
    t: { uz: "ShU", ru: "ШУ", en: "CB (control bus)" },
    f: { uz: "Boshqaruv shinasi", ru: "Шина управления", en: "Control busbar" },
    d: {
      uz: "RH, avtomatika zanjirlari va o'chirgichning elektromagnit uzgichini ta'minlovchi eng mas'uliyatli shina.",
      ru: "Наиболее ответственная шина, питающая цепи РЗ, автоматики и электромагнит отключения выключателя.",
      en: "The most critical busbar, feeding protection and automation circuits and the breaker trip coil.",
    },
    u: { uz: "O'zgarmas tok taqsimotida", ru: "В распределении постоянного тока", en: "In DC distribution" },
  },
  {
    id: "shv", l: 4, r: ["shu", "shs"],
    t: { uz: "ShV", ru: "ШВ", en: "CLB (closing bus)" },
    f: { uz: "Qo'shish shinasi", ru: "Шина включения", en: "Closing busbar" },
    d: {
      uz: "O'chirgichning elektromagnit qo'shish zanjirini ta'minlovchi shina (mas'uliyati bo'yicha ikkinchi hudud).",
      ru: "Шина, питающая цепь электромагнита включения выключателя (вторая по ответственности).",
      en: "The busbar feeding the breaker closing coil circuit (second in order of importance).",
    },
    u: { uz: "O'zgarmas tok taqsimotida", ru: "В распределении постоянного тока", en: "In DC distribution" },
  },
  {
    id: "shs", l: 4, r: ["shu", "shv", "kh"],
    t: { uz: "ShS", ru: "ШС", en: "ALB (alarm bus)" },
    f: { uz: "Signalizatsiya shinasi", ru: "Шина сигнализации", en: "Alarm busbar" },
    d: {
      uz: "Signalizatsiya zanjirlarini ta'minlovchi shina (uchinchi hudud).",
      ru: "Шина, питающая цепи сигнализации (третья по ответственности).",
      en: "The busbar feeding the alarm circuits (third in order of importance).",
    },
    u: { uz: "Signal zanjirlarida", ru: "В цепях сигнализации", en: "In alarm circuits" },
  },
  {
    id: "fq", l: 4, r: ["sf", "shu", "kh"],
    t: { uz: "FQ", ru: "FU", en: "FU" },
    f: { uz: "Saqlagich", ru: "Предохранитель", en: "Fuse" },
    d: {
      uz: "Operativ zanjirlarni QT dan himoyalovchi eruvchan saqlagich. Ishlash vaqti bo'yicha muvofiqlashtiriladi.",
      ru: "Плавкий предохранитель, защищающий оперативные цепи от КЗ. Согласуется по времени срабатывания.",
      en: "A fuse protecting the operating circuits against faults. It is coordinated by operating time.",
    },
    u: { uz: "O'zgarmas tok tarmog'ida", ru: "В сети постоянного тока", en: "In the DC network" },
  },
  {
    id: "sf", l: 4, r: ["fq", "gb"],
    t: { uz: "SF", ru: "SF", en: "SF" },
    f: { uz: "Avtomatik o'chirgich", ru: "Автоматический выключатель", en: "Miniature circuit breaker" },
    d: {
      uz: "Saqlagich o'rniga qo'llaniladigan himoya apparati; batareyadan yig'ma shinaga ketadigan simda ham o'rnatiladi.",
      ru: "Защитный аппарат, применяемый вместо предохранителя; устанавливается и на линии от батареи к сборным шинам.",
      en: "A protective device used instead of a fuse; also fitted in the run from the battery to the busbars.",
    },
    u: {
      uz: "O'zgarmas tok ta'minot zanjirlarida",
      ru: "В цепях питания постоянного тока",
      en: "In DC supply circuits",
    },
  },
  {
    id: "shet", l: 4, r: ["ozgaruvchanot", "ktr"],
    t: { uz: "ShET (TSN)", ru: "ТСН", en: "AuxT" },
    f: {
      uz: "Shaxsiy ehtiyoj transformatori",
      ru: "Трансформатор собственных нужд",
      en: "Auxiliary services transformer",
    },
    d: {
      uz: "O'zgaruvchan operativ tok manbalaridan biri. QT da kuchlanish pasayganligi uchun tokli himoyalar uchun ishonchsiz.",
      ru: "Один из источников переменного оперативного тока. Из-за снижения напряжения при КЗ ненадёжен для токовых защит.",
      en: "One of the AC operating supply sources. Because voltage collapses during a fault, it is unreliable for current protections.",
    },
    u: {
      uz: "Yuklanish va yerga tutashuv himoyalarini ta'minlashda",
      ru: "Для питания защит от перегрузки и замыканий на землю",
      en: "To feed overload and earth-fault protections",
    },
  },
  {
    id: "bpnbpt", l: 4, r: ["ozgaruvchanot", "ta", "tv"],
    t: { uz: "BPN va BPT", ru: "БПН и БПТ", en: "VPU and CPU" },
    f: {
      uz: "Kuchlanish va tok ta'minlash bloklari",
      ru: "Блоки питания от напряжения и от тока",
      en: "Voltage-fed and current-fed power units",
    },
    d: {
      uz: "Mos ravishda o'zgaruvchan kuchlanish va tok zanjirlaridan ta'minlanuvchi bloklar. Chiqishlari parallel ulanib, barcha rejimlarda operativ kuchlanishni ta'minlaydi.",
      ru: "Блоки, питающиеся соответственно от цепей переменного напряжения и тока. Их выходы включаются параллельно и обеспечивают оперативное напряжение во всех режимах.",
      en: "Units fed from the AC voltage and current circuits respectively. Their outputs are paralleled to keep the operating voltage available in all modes.",
    },
    u: {
      uz: "Kombinatsiyalashgan ta'minlash sxemalarida",
      ru: "В комбинированных схемах питания",
      en: "In combined supply schemes",
    },
  },
  {
    id: "yat", l: 4, r: ["sq", "kh", "kl", "q"],
    t: { uz: "YAT", ru: "YAT", en: "YAT" },
    f: {
      uz: "O'chirgichning elektromagnit uzgichi (o'chirish g'altagi)",
      ru: "Электромагнит отключения выключателя (катушка отключения)",
      en: "Breaker trip electromagnet (trip coil)",
    },
    d: {
      uz: "Operativ tok berilganda o'chirgichni o'chiruvchi elektromagnit. Zanjiri KH va SQ bilan ketma-ket ulanadi.",
      ru: "Электромагнит, отключающий выключатель при подаче оперативного тока. Его цепь включена последовательно с KH и SQ.",
      en: "The electromagnet that trips the breaker when operating current is applied. Its circuit is in series with KH and SQ.",
    },
    u: {
      uz: "Har bir himoyaning o'chirish zanjiri oxirida",
      ru: "В конце цепи отключения любой защиты",
      en: "At the end of every protection's trip circuit",
    },
  },
  {
    id: "sq", l: 4, r: ["yat", "q", "kl"],
    t: { uz: "SQ", ru: "SQ", en: "SQ" },
    f: {
      uz: "O'chirgichning yordamchi (bloklovchi) kontakti",
      ru: "Вспомогательный (блокировочный) контакт выключателя",
      en: "Breaker auxiliary (blocking) contact",
    },
    d: {
      uz: "O'chirgich qo'shilgan holatda yopiq bo'ladi, o'chirilganda ochilib YAT tok zanjirini uzadi — shu bilan KL kontaktlarini kuydirishdan saqlaydi.",
      ru: "Замкнут при включённом выключателе; при отключении размыкается и разрывает цепь тока YAT, оберегая контакты KL от подгорания.",
      en: "Closed while the breaker is closed; on tripping it opens and breaks the trip-coil current, protecting the KL contacts from burning.",
    },
    u: { uz: "YAT zanjirida YAT dan oldin", ru: "В цепи YAT — перед катушкой", en: "In the trip circuit, ahead of the coil" },
  },
  {
    id: "yolgonzanjir", l: 4, r: ["yat", "izolnazorat"],
    t: { uz: "Yolg'on zanjir", ru: "Ложная цепь", en: "False circuit" },
    d: {
      uz: "O'zgarmas tok tarmog'ida ikki har xil nuqtada yerga tutashuv bo'lsa RH kontaktlari shuntlanib, YAT da tok paydo bo'lishi va o'chirgich noto'g'ri o'chishi.",
      ru: "При замыкании на землю в двух разных точках сети постоянного тока контакты РЗ шунтируются, в YAT появляется ток и выключатель ложно отключается.",
      en: "With earth faults at two different points of the DC network, the protection contacts are shunted, current flows in the trip coil and the breaker trips falsely.",
    },
    u: {
      uz: "Yer nazorati zarurligini asoslashda",
      ru: "При обосновании необходимости контроля изоляции",
      en: "When justifying insulation monitoring",
    },
  },
  {
    id: "izolnazorat", l: 4, r: ["yolgonzanjir", "kl"],
    t: { uz: "Izolyasiya nazorati", ru: "Контроль изоляции", en: "Insulation monitoring" },
    d: {
      uz: "O'zgarmas tok tarmog'ida yerga tutashuvni V1, V2 voltmetrlar va KL signal relesi bilan nazorat qilish.",
      ru: "Контроль замыкания на землю в сети постоянного тока вольтметрами V1, V2 и сигнальным реле KL.",
      en: "Monitoring earth faults in the DC network with voltmeters V1, V2 and the KL alarm relay.",
    },
    u: { uz: "Operativ tok sxemasida", ru: "В схеме оперативного тока", en: "In the operating-supply diagram" },
  },
  {
    id: "zanjirnazorat", l: 4, r: ["kh", "yat", "sq"],
    t: {
      uz: "O'chirish zanjirini nazorat qilish",
      ru: "Контроль цепи отключения",
      en: "Trip-circuit supervision",
    },
    d: {
      uz: "Saqlagichlarning sozligi, YAT zanjirining butunligi va SQ kontaktlari KH relesi bilan nazorat qilinadi.",
      ru: "Исправность предохранителей, целостность цепи YAT и контакты SQ контролируются реле KH.",
      en: "Fuse health, trip-coil circuit continuity and the SQ contacts are supervised by the KH relay.",
    },
    u: {
      uz: "Operativ tok sxemasidagi nazorat zanjirida",
      ru: "В цепи контроля схемы оперативного тока",
      en: "In the supervision circuit of the operating supply",
    },
  },
];
