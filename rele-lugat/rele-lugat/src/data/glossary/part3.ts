import type { Term } from "../../types";

/** 9-12 ma'ruzalar atamalari. */
export const PART3: Term[] = [
  /* ================= 9-MA'RUZA ================= */
  {
    id: "rt40", l: 9, r: ["ka", "baraban", "iri", "kqay"],
    t: { uz: "RT-40", ru: "РТ-40", en: "RT-40" },
    f: { uz: "Maksimal tok relesi", ru: "Максимальное реле тока", en: "Overcurrent relay" },
    d: {
      uz: "ChEAZ ishlab chiqargan o'zgaruvchan tokning elektromagnit maksimal tok relesi. Ikkita chulg'ami ketma-ket yoki parallel ulanadi; parallel ulanganda o'rnatma ikki barobar oshadi.",
      ru: "Электромагнитное максимальное реле тока переменного тока производства ЧЭАЗ. Две обмотки включаются последовательно или параллельно; при параллельном включении уставка удваивается.",
      en: "An AC electromagnetic overcurrent relay made by ChEAZ. Its two coils connect in series or parallel; in parallel the setting doubles.",
    },
    u: {
      uz: "MTH va tokli kesimning o'lchov organi sifatida",
      ru: "Как измерительный орган МТЗ и токовой отсечки",
      en: "As the measuring element of OCP and cut-off",
    },
  },
  {
    id: "baraban", l: 9, r: ["rt40", "rn53"],
    t: {
      uz: "Tebranishni so'ndiruvchi baraban",
      ru: "Барабан-демпфер вибрации",
      en: "Vibration-damping drum",
    },
    d: {
      uz: "RT-40 da yakor bilan bir o'qqa o'rnatilgan, kvars qumi bilan to'ldirilgan baraban; harakatlanuvchi tizim inersiyasini oshirib kontakt tebranishini kamaytiradi. RN-53 da yo'q.",
      ru: "В РТ-40 барабан на общей с якорем оси, заполненный кварцевым песком; увеличивает инерцию подвижной системы и уменьшает вибрацию контактов. В РН-53 отсутствует.",
      en: "In the RT-40, a drum on the armature shaft filled with quartz sand; it increases the moving system's inertia and damps contact chatter. Absent in the RN-53.",
    },
    u: { uz: "RT-40 konstruksiyasida", ru: "В конструкции РТ-40", en: "In the RT-40 design" },
  },
  {
    id: "rn53", l: 9, r: ["rn54", "kv", "togrilagich"],
    t: { uz: "RN-53", ru: "РН-53", en: "RN-53" },
    f: {
      uz: "Maksimal kuchlanish relesi",
      ru: "Максимальное реле напряжения",
      en: "Overvoltage relay",
    },
    d: {
      uz: "O'zgaruvchan tok zanjirlarida kuchlanishning oshishiga javob beruvchi rele. Chulg'amlari V1 to'g'rilagich ko'prik va R1, R2 qarshiliklar orqali ulanadi. Qaytish koeffitsienti 0,8 dan kam emas.",
      ru: "Реле, реагирующее на повышение напряжения в цепях переменного тока. Обмотки включаются через выпрямительный мост V1 и добавочные сопротивления R1, R2. Коэффициент возврата не менее 0,8.",
      en: "A relay responding to a voltage rise in AC circuits. Its coils connect through the V1 rectifier bridge and the R1, R2 series resistors. Reset ratio not below 0.8.",
    },
    u: {
      uz: "RH va avtomatika sxemalarida",
      ru: "В схемах РЗ и автоматики",
      en: "In protection and automation schemes",
    },
  },
  {
    id: "rn54", l: 9, r: ["rn53", "kv", "minrele"],
    t: { uz: "RN-54", ru: "РН-54", en: "RN-54" },
    f: {
      uz: "Minimal kuchlanish relesi",
      ru: "Минимальное реле напряжения",
      en: "Undervoltage relay",
    },
    d: {
      uz: "Kuchlanishning pasayishiga ta'sir qiluvchi element. Konstruksiyasi va ichki sxemasi RN-53 bilan bir xil, farqi faqat o'rnatmalarni rostlash va shkala darajasida. Qaytish koeffitsienti birdan katta.",
      ru: "Элемент, реагирующий на снижение напряжения. Конструкция и внутренняя схема те же, что у РН-53; отличие только в регулировке уставок и градуировке шкалы. Коэффициент возврата больше единицы.",
      en: "An element responding to a voltage drop. Its design and internal circuit match the RN-53; only the setting adjustment and scale differ. Its reset ratio is greater than one.",
    },
    u: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH da",
      ru: "В МТЗ с пуском по напряжению",
      en: "In OCP with voltage restraint",
    },
  },
  {
    id: "togrilagich", l: 9, r: ["rn53", "kondensator"],
    t: {
      uz: "To'g'rilagich ko'prik (V1)",
      ru: "Выпрямительный мост (V1)",
      en: "Rectifier bridge (V1)",
    },
    d: {
      uz: "RN-53/54 chulg'amini ulovchi diodli ko'prik; elektromagnitning temiridan to'liqroq foydalanish va kuchliroq prujina qo'yish imkonini beradi.",
      ru: "Диодный мост, через который включается обмотка РН-53/54; позволяет полнее использовать сталь электромагнита и поставить более сильную пружину.",
      en: "The diode bridge through which the RN-53/54 coil is connected; it lets the electromagnet iron be used more fully and a stronger spring to be fitted.",
    },
    u: {
      uz: "Kuchlanish relelarining ichki sxemasida",
      ru: "Во внутренней схеме реле напряжения",
      en: "In the internal circuit of voltage relays",
    },
  },
  {
    id: "kondensator", l: 9, r: ["togrilagich", "rn53"],
    t: {
      uz: "Shuntlovchi kondensator",
      ru: "Шунтирующий конденсатор",
      en: "Shunt capacitor",
    },
    d: {
      uz: "Nominal kuchlanishi 400 V bo'lgan releda diodlarni teskari kuchlanishdan saqlash uchun chulg'amga parallel qo'yiladigan kichik kondensator.",
      ru: "Небольшой конденсатор, включаемый параллельно обмотке реле с номинальным напряжением 400 В для защиты диодов от обратного напряжения.",
      en: "A small capacitor across the coil of a 400 V relay, protecting the diodes from reverse voltage.",
    },
    u: {
      uz: "RN-53/400 va RN-54/320 relelarida",
      ru: "В реле РН-53/400 и РН-54/320",
      en: "In the RN-53/400 and RN-54/320 relays",
    },
  },
  {
    id: "iri", l: 9, r: ["ihi", "ksx", "ki", "rt40"],
    t: { uz: "Iri", ru: "Iс.р", en: "Irelay" },
    f: {
      uz: "Releni ikkilamchi ishlash toki",
      ru: "Вторичный ток срабатывания реле",
      en: "Relay secondary pickup current",
    },
    d: {
      uz: "Rele chulg'amidagi ishlash toki. Iri = ksx·Ihi/KI ifodasi bilan aniqlanadi.",
      ru: "Ток срабатывания в обмотке реле. Определяется выражением Iс.р = kсх·Iс.з/KI.",
      en: "The pickup current in the relay coil, found from Irelay = ksch·Iop/KI.",
    },
    u: {
      uz: "RT-40 o'rnatmasini tanlashda",
      ru: "При выборе уставки РТ-40",
      en: "When choosing the RT-40 setting",
    },
  },
  {
    id: "uri", l: 9, r: ["uhi", "ku", "rn54", "kv"],
    t: { uz: "Uri", ru: "Uс.р", en: "Urelay" },
    f: {
      uz: "Releni ishlash kuchlanishi",
      ru: "Напряжение срабатывания реле",
      en: "Relay pickup voltage",
    },
    d: {
      uz: "Kuchlanish relesining ishlash o'rnatmasi. Kuchlanish bo'yicha ishga tushuvchi MTH da Uri = Uish.min/(ksoz·kqay·KU).",
      ru: "Уставка срабатывания реле напряжения. В МТЗ с пуском по напряжению Uс.р = Uраб.min/(kотс·kв·KU).",
      en: "The pickup setting of the voltage relay. In voltage-restrained OCP, Urelay = Umin/(kset·kres·KU).",
    },
    u: {
      uz: "Kuchlanish o'lchov organini sozlashda",
      ru: "При отстройке органа напряжения",
      en: "When setting the voltage element",
    },
  },
  {
    id: "kqay", l: 9, r: ["xrq", "xri", "ihi", "rn54"],
    t: { uz: "kqay", ru: "kв", en: "kres" },
    f: {
      uz: "Qaytish koeffitsienti",
      ru: "Коэффициент возврата",
      en: "Reset (drop-out) ratio",
    },
    d: {
      uz: "Qaytish va ishlash parametrlarining nisbati. RT-40 da birinchi o'rnatmada 0,85 dan, qolganlarida 0,8 dan kam emas; RT-40/100 va /200 da 0,7 dan kam emas. Minimal relelarda birdan katta.",
      ru: "Отношение параметров возврата и срабатывания. У РТ-40 на первой уставке не менее 0,85, на остальных не менее 0,8; у РТ-40/100 и /200 не менее 0,7. У минимальных реле больше единицы.",
      en: "The ratio of reset to pickup. For the RT-40 it is at least 0.85 on the first setting and 0.8 on the others; for RT-40/100 and /200 at least 0.7. For minimum relays it exceeds one.",
    },
    u: {
      uz: "MTH ishlash tokini hisoblashda (13.2)",
      ru: "При расчёте тока срабатывания МТЗ (13.2)",
      en: "When calculating the OCP pickup current (13.2)",
    },
  },
  {
    id: "issiqbarq", l: 9, r: ["rt40"],
    t: { uz: "Issiqlik barqarorligi", ru: "Термическая стойкость", en: "Thermal withstand" },
    d: {
      uz: "Rele chulg'ami 1 s davomida yoki uzoq vaqt ko'tara oladigan tok. RT-40/6 uchun 1 s da 300 A, uzoq vaqt 0,5 A.",
      ru: "Ток, который обмотка реле выдерживает в течение 1 с или длительно. Для РТ-40/6: 300 А за 1 с и 0,5 А длительно.",
      en: "The current the relay coil can withstand for 1 s or continuously. For the RT-40/6: 300 A for 1 s and 0.5 A continuously.",
    },
    u: {
      uz: "Releni QT toklariga tekshirishda",
      ru: "При проверке реле на токи КЗ",
      en: "When checking the relay against fault currents",
    },
  },

  /* ================= 10-MA'RUZA ================= */
  {
    id: "kl", l: 10, r: ["rp23", "rp251", "yat", "bajaruvchiqism"],
    t: { uz: "KL", ru: "KL", en: "KL" },
    f: { uz: "Oraliq rele", ru: "Промежуточное реле", en: "Auxiliary relay" },
    d: {
      uz: "Bir vaqtda bir necha zanjirni qo'shib-ajratuvchi va katta tokli zanjirlarni kommutatsiya qiluvchi mantiqiy rele. Parallel yoki ketma-ket ulanadi.",
      ru: "Логическое реле, одновременно замыкающее и размыкающее несколько цепей и коммутирующее цепи с большим током. Включается параллельно или последовательно.",
      en: "A logic relay that makes and breaks several circuits at once and switches high-current circuits. It is connected in parallel or in series.",
    },
    u: {
      uz: "MTH ning bajaruvchi qismida",
      ru: "В исполнительной части МТЗ",
      en: "In the output part of the OCP",
    },
  },
  {
    id: "rp23", l: 10, r: ["kl", "rp251", "rp16"],
    t: { uz: "RP-23", ru: "РП-23", en: "RP-23" },
    f: {
      uz: "Tez ishlovchi oraliq rele",
      ru: "Быстродействующее промежуточное реле",
      en: "Fast auxiliary relay",
    },
    d: {
      uz: "O'zgarmas operativ tok uchun buraluvchi yakorli oraliq rele; ishlash vaqti taxminan 0,06 s, iste'moli 6 Vt dan oshmaydi. O'zgaruvchan tok uchun analogi — RP-25.",
      ru: "Промежуточное реле с поворотным якорем для постоянного оперативного тока; время действия около 0,06 с, потребление не более 6 Вт. Аналог для переменного тока — РП-25.",
      en: "A rotating-armature auxiliary relay for DC operating supply; operating time about 0.06 s and consumption up to 6 W. The AC analogue is the RP-25.",
    },
    u: {
      uz: "O'zgarmas operativ tokli RH sxemalarida",
      ru: "В схемах РЗ на постоянном оперативном токе",
      en: "In protection schemes on DC operating supply",
    },
  },
  {
    id: "rp16", l: 10, r: ["rp23", "kl"],
    t: { uz: "RP-16-1 / RP-16-7", ru: "РП-16-1 / РП-16-7", en: "RP-16-1 / RP-16-7" },
    d: {
      uz: "RP-23 va RP-25 o'rniga ishlab chiqarilayotgan, to'rtta qo'shiluvchi va ikkita ajraluvchi kontaktli oraliq relelar (mos ravishda o'zgarmas va o'zgaruvchan tok uchun).",
      ru: "Выпускаемые взамен РП-23 и РП-25 промежуточные реле с четырьмя замыкающими и двумя размыкающими контактами (соответственно для постоянного и переменного тока).",
      en: "Auxiliary relays produced to replace the RP-23 and RP-25, with four make and two break contacts (for DC and AC respectively).",
    },
    u: { uz: "Zamonaviy MTH sxemalarida", ru: "В современных схемах МТЗ", en: "In modern OCP schemes" },
  },
  {
    id: "rp251", l: 10, r: ["kl", "gilza"],
    t: { uz: "RP-251", ru: "РП-251", en: "RP-251" },
    f: {
      uz: "Sekin ishlovchi oraliq rele",
      ru: "Замедленное промежуточное реле",
      en: "Time-delayed auxiliary relay",
    },
    d: {
      uz: "Magnit o'tkazgichida qisqa tutashtirilgan kontur (misli gilza) bo'lgan rele; ishlashdagi sabr vaqti 0,07-0,11 s.",
      ru: "Реле с короткозамкнутым контуром (медной гильзой) на магнитопроводе; выдержка при срабатывании 0,07-0,11 с.",
      en: "A relay with a short-circuited loop (a copper sleeve) on the core; its operating delay is 0.07-0.11 s.",
    },
    u: {
      uz: "Sxemada kichik kechikish kerak bo'lganda",
      ru: "Когда в схеме нужна небольшая задержка",
      en: "Where a small delay is needed in the scheme",
    },
  },
  {
    id: "gilza", l: 10, r: ["rp251"],
    t: {
      uz: "Qisqa tutashtirilgan kontur (gilza)",
      ru: "Короткозамкнутый контур (гильза)",
      en: "Short-circuited loop (sleeve)",
    },
    d: {
      uz: "Magnit o'tkazgichdagi misli shayba yoki gilza; oqimning o'sishi va so'nishiga qarshilik ko'rsatib sekin ishlash va sekin qaytishni ta'minlaydi.",
      ru: "Медная шайба или гильза на магнитопроводе; противодействует нарастанию и спаданию потока, обеспечивая замедление при срабатывании и возврате.",
      en: "A copper washer or sleeve on the core; it opposes the rise and decay of flux, delaying both pickup and reset.",
    },
    u: {
      uz: "Sekin ishlovchi oraliq relelarida",
      ru: "В замедленных промежуточных реле",
      en: "In time-delayed auxiliary relays",
    },
  },
  {
    id: "rp341", l: 10, r: ["kl", "ozgaruvchanot"],
    t: { uz: "RP-321 / RP-341", ru: "РП-321 / РП-341", en: "RP-321 / RP-341" },
    f: { uz: "Oraliq tok relesi", ru: "Промежуточное токовое реле", en: "Auxiliary current relay" },
    d: {
      uz: "TT ikkilamchi zanjiriga ulanadigan, 100-150 A o'zgaruvchan tokni kommutatsiya qiladigan quvvatli kontaktli relelar.",
      ru: "Реле с мощными контактами, включаемые во вторичную цепь ТТ и коммутирующие переменный ток 100-150 А.",
      en: "Relays with heavy-duty contacts, connected in the CT secondary and switching 100-150 A of AC.",
    },
    u: {
      uz: "O'zgaruvchan operativ tokli RH da",
      ru: "В РЗ на переменном оперативном токе",
      en: "In protection on AC operating supply",
    },
  },
  {
    id: "gerkon", l: 10, r: ["rp23", "kl"],
    t: { uz: "Gerkonli rele", ru: "Герконовое реле", en: "Reed relay" },
    d: {
      uz: "Germetizatsiyalangan kontaktli rele; RP-210÷RP-215, KDR1, MKU relelari qatorida eng tez ishlaydi (0,01 s atrofida).",
      ru: "Реле с герметизированными контактами; в ряду РП-210÷РП-215, КДР1, МКУ действует быстрее всех (около 0,01 с).",
      en: "A relay with sealed contacts; among the RP-210…RP-215, KDR1 and MKU types it is the fastest (about 0.01 s).",
    },
    u: { uz: "Tezkor sxemalarda", ru: "В быстродействующих схемах", en: "In high-speed schemes" },
  },
  {
    id: "kh", l: 10, r: ["ru21", "bayroqcha", "yat"],
    t: { uz: "KH", ru: "KH", en: "KH" },
    f: {
      uz: "Ko'rsatgich (signal) relesi",
      ru: "Указательное (сигнальное) реле",
      en: "Indicating (flag) relay",
    },
    d: {
      uz: "RH yoki uning bir qismi ishlaganini qayd qiluvchi rele. Bayroqchasi xodim qo'lda qaytarmaguncha tushgan holatda qoladi. Ketma-ket va parallel ulanishda ishlab chiqariladi.",
      ru: "Реле, фиксирующее срабатывание РЗ или её части. Флажок остаётся выпавшим, пока персонал не вернёт его вручную. Выпускается для последовательного и параллельного включения.",
      en: "A relay that records operation of the protection or part of it. Its flag stays dropped until staff reset it by hand. Made for series and parallel connection.",
    },
    u: {
      uz: "YAT zanjiriga ketma-ket ulanadi",
      ru: "Включается последовательно в цепь YAT",
      en: "Connected in series in the trip-coil circuit",
    },
  },
  {
    id: "ru21", l: 10, r: ["kh", "bayroqcha"],
    t: { uz: "RU-21", ru: "РУ-21", en: "RU-21" },
    f: {
      uz: "Ko'rsatgich relesi turi",
      ru: "Тип указательного реле",
      en: "Indicating relay type",
    },
    d: {
      uz: "Bayroqchali ko'rsatgich rele. Chulg'amda tok paydo bo'lsa yakor tortilib bayroqchani bo'shatadi; bayroqcha qaytaruvchi knopka bilan tiklanadi.",
      ru: "Указательное реле с флажком. При появлении тока в обмотке якорь притягивается и освобождает флажок; флажок возвращают кнопкой возврата.",
      en: "An indicating relay with a flag. When current appears in the coil the armature is attracted and releases the flag, which is reset with a pushbutton.",
    },
    u: {
      uz: "O'chirish zanjirini qayd qilishda",
      ru: "Для фиксации работы цепи отключения",
      en: "To record operation of the trip circuit",
    },
  },
  {
    id: "bayroqcha", l: 10, r: ["kh", "ru21"],
    t: { uz: "Bayroqcha (blinker)", ru: "Флажок (блинкер)", en: "Flag (blinker)" },
    d: {
      uz: "Ko'rsatgich relesining tushib qoladigan ko'rsatkichi; himoyaning ishlaganini vizual qayd qiladi.",
      ru: "Выпадающий указатель указательного реле; визуально фиксирует срабатывание защиты.",
      en: "The drop-down indicator of the flag relay; it shows visually that the protection has operated.",
    },
    u: {
      uz: "Avariyadan keyin sababni aniqlashda",
      ru: "При выяснении причины после аварии",
      en: "When establishing the cause after a trip",
    },
  },
  {
    id: "kt", l: 10, r: ["sabrvaqt", "rv100", "dt", "soatmex"],
    t: { uz: "KT", ru: "KT", en: "KT" },
    f: { uz: "Vaqt relesi", ru: "Реле времени", en: "Time relay" },
    d: {
      uz: "RH ishini sun'iy ravishda sekinlashtiruvchi rele. Chulg'amga kuchlanish berilgandan kontaktlar tutashguncha o'tgan vaqt sabr vaqti deyiladi.",
      ru: "Реле, искусственно замедляющее действие РЗ. Время от подачи напряжения на обмотку до замыкания контактов называется выдержкой времени.",
      en: "A relay that deliberately delays protection operation. The interval from energising the coil to contact closure is the time delay.",
    },
    u: {
      uz: "MTH ning selektivligini vaqt bo'yicha ta'minlashda",
      ru: "Для обеспечения селективности МТЗ по времени",
      en: "To provide OCP selectivity by time",
    },
  },
  {
    id: "sabrvaqt", l: 10, r: ["kt", "dt", "th"],
    t: { uz: "Sabr vaqti", ru: "Выдержка времени", en: "Time delay" },
    d: {
      uz: "Vaqt relesi chulg'amiga kuchlanish berilgandan uning kontaktlari tutashguncha ketadigan vaqt.",
      ru: "Время от подачи напряжения на обмотку реле времени до замыкания его контактов.",
      en: "The time from energising the time-relay coil until its contacts close.",
    },
    u: { uz: "Pog'onali vaqt sxemasida", ru: "В ступенчатой схеме выдержек", en: "In the stepped-time scheme" },
  },
  {
    id: "rv100", l: 10, r: ["kt", "soatmex"],
    t: { uz: "RV-100 / RV-200", ru: "РВ-100 / РВ-200", en: "RV-100 / RV-200" },
    f: { uz: "Vaqt relelari", ru: "Реле времени", en: "Time relays" },
    d: {
      uz: "Soat mexanizmli vaqt relelari: RV-100, RV-120, RV-130, RV-140 — o'zgarmas tok uchun; RV-210, RV-220, RV-230 — o'zgaruvchan tok uchun.",
      ru: "Реле времени с часовым механизмом: РВ-100, РВ-120, РВ-130, РВ-140 — для постоянного тока; РВ-210, РВ-220, РВ-230 — для переменного.",
      en: "Clockwork time relays: RV-100, RV-120, RV-130, RV-140 for DC; RV-210, RV-220, RV-230 for AC.",
    },
    u: {
      uz: "MTH ning vaqt organi sifatida",
      ru: "Как орган времени МТЗ",
      en: "As the OCP timing element",
    },
  },
  {
    id: "soatmex", l: 10, r: ["kt", "rv100", "anker"],
    t: { uz: "Soat mexanizmi", ru: "Часовой механизм", en: "Clockwork mechanism" },
    d: {
      uz: "Vaqt relesining sabr vaqtini hosil qiluvchi mexanizm; asosiy elementi ankerli qurilma. tr = α/ωr ifodasi bilan tavsiflanadi.",
      ru: "Механизм, создающий выдержку времени реле; его основной элемент — анкерное устройство. Описывается выражением tр = α/ωр.",
      en: "The mechanism producing the relay's delay; its key part is the escapement. It is described by tr = α/ωr.",
    },
    u: {
      uz: "RV-100 va RV-200 relelarida",
      ru: "В реле РВ-100 и РВ-200",
      en: "In the RV-100 and RV-200 relays",
    },
  },
  {
    id: "anker", l: 10, r: ["soatmex", "rv100"],
    t: { uz: "Ankerli mexanizm", ru: "Анкерный механизм", en: "Escapement mechanism" },
    d: {
      uz: "Soat mexanizmining bir tekis harakatlanishini ta'minlovchi qurilma; tezligi yukchalar holati bilan sozlanadi.",
      ru: "Устройство, обеспечивающее равномерный ход часового механизма; скорость регулируется положением грузиков.",
      en: "The device that keeps the clockwork running evenly; its speed is set by the position of the weights.",
    },
    u: {
      uz: "Vaqt relesi konstruksiyasida",
      ru: "В конструкции реле времени",
      en: "In the time-relay design",
    },
  },
  {
    id: "rd", l: 10, r: ["kt", "rv100"],
    t: { uz: "Rd", ru: "Rд", en: "Rd" },
    f: {
      uz: "Qo'shimcha qarshilik",
      ru: "Добавочное сопротивление",
      en: "Series (dropping) resistor",
    },
    d: {
      uz: "Vaqt relesi chulg'amiga ketma-ket ulanadigan qarshilik. Normal holatda KT.1 oniy kontakt bilan shuntlanadi, rele ishlagach zanjirga kiritilib tokni cheklaydi.",
      ru: "Сопротивление, включаемое последовательно с обмоткой реле времени. В нормальном состоянии шунтировано мгновенным контактом KT.1, после срабатывания вводится в цепь и ограничивает ток.",
      en: "A resistor in series with the time-relay coil. Normally shunted by the instantaneous KT.1 contact; after operation it is inserted and limits the current.",
    },
    u: {
      uz: "Termik barqaror vaqt relesi sxemasida",
      ru: "В схеме термически стойкого реле времени",
      en: "In the thermally rated time-relay circuit",
    },
  },
  {
    id: "oniykontakt", l: 10, r: ["kt", "rd"],
    t: {
      uz: "Oniy (sabr vaqtsiz) kontakt",
      ru: "Мгновенный контакт",
      en: "Instantaneous contact",
    },
    d: {
      uz: "Vaqt relesining rostlanmaydigan kichik sabr vaqtli (0,15-0,2 s) qo'shimcha kontakti.",
      ru: "Дополнительный контакт реле времени с нерегулируемой малой выдержкой (0,15-0,2 с).",
      en: "An extra time-relay contact with a small, non-adjustable delay (0.15-0.2 s).",
    },
    u: { uz: "Yordamchi zanjirlarda", ru: "Во вспомогательных цепях", en: "In auxiliary circuits" },
  },

  /* ================= 11-MA'RUZA ================= */
  {
    id: "mp", l: 11, r: ["asp", "tb", "mantiqsxema"],
    t: { uz: "MP RHA", ru: "МП РЗА", en: "MP protection" },
    f: {
      uz: "Mikroprotsessorli rele himoyasi va avtomatikasi",
      ru: "Микропроцессорная релейная защита и автоматика",
      en: "Microprocessor protection and automation",
    },
    d: {
      uz: "Markaziy tuguni mikroEHM bo'lgan raqamli himoya. TT va KT dan iste'moli 0,1-0,5 VA, xatoligi 2-5 %, o'lchov elementlarining qaytish koeffitsienti 0,96-0,97.",
      ru: "Цифровая защита, центральный узел которой — микроЭВМ. Потребление от ТТ и ТН 0,1-0,5 ВА, погрешность 2-5 %, коэффициент возврата измерительных элементов 0,96-0,97.",
      en: "Digital protection whose core is a microcomputer. Burden on CTs and VTs 0.1-0.5 VA, error 2-5 %, and the measuring elements' reset ratio 0.96-0.97.",
    },
    u: { uz: "Zamonaviy RH qurilmalarida", ru: "В современных устройствах РЗ", en: "In modern protection devices" },
  },
  {
    id: "kirishozg", l: 11, r: ["chiqishozg", "asp", "mp"],
    t: { uz: "Kirish o'zgartkichi", ru: "Входной преобразователь", en: "Input converter" },
    d: {
      uz: "Tashqi zanjirni qurilmaning ichki zanjirlaridan galvanik ajratuvchi, signallarni bitta ko'rinishga keltiruvchi element. Analogli (U3, U4) va mantiqiy (U1, U2) turlari bor.",
      ru: "Элемент, гальванически отделяющий внешние цепи от внутренних и приводящий сигналы к единому виду. Бывает аналоговым (U3, U4) и логическим (U1, U2).",
      en: "The element that galvanically isolates external circuits from the internal ones and normalises the signals. It may be analogue (U3, U4) or logic (U1, U2).",
    },
    u: { uz: "Raqamli qurilmaning kirishida", ru: "На входе цифрового устройства", en: "At the digital device input" },
  },
  {
    id: "chiqishozg", l: 11, r: ["kirishozg", "mp"],
    t: { uz: "Chiqish o'zgartkichi", ru: "Выходной преобразователь", en: "Output converter" },
    d: {
      uz: "Diskret boshqaruv signallarini beruvchi, kommutatsiya zanjirlarini galvanik ajratuvchi element.",
      ru: "Элемент, формирующий дискретные управляющие сигналы и гальванически разделяющий коммутируемые цепи.",
      en: "The element that issues discrete control signals and galvanically separates the switched circuits.",
    },
    u: { uz: "Raqamli qurilmaning chiqishida", ru: "На выходе цифрового устройства", en: "At the digital device output" },
  },
  {
    id: "asp", l: 11, r: ["multiplekser", "mp"],
    t: { uz: "ASP", ru: "АЦП", en: "ADC" },
    f: {
      uz: "Analog-raqamli o'zgartkich",
      ru: "Аналого-цифровой преобразователь",
      en: "Analogue-to-digital converter",
    },
    d: {
      uz: "Kirish signalining oniy qiymatini raqamli qiymatga aylantiruvchi element (U7). Multipleksor U6 bilan birga trakt hosil qiladi.",
      ru: "Элемент (U7), преобразующий мгновенное значение входного сигнала в цифровое. Вместе с мультиплексором U6 образует тракт.",
      en: "The element (U7) converting the instantaneous input value into a digital one. With the U6 multiplexer it forms the conversion path.",
    },
    u: {
      uz: "Raqamli himoyada tok va kuchlanishni o'lchashda",
      ru: "При измерении тока и напряжения в цифровой защите",
      en: "When measuring current and voltage in digital protection",
    },
  },
  {
    id: "multiplekser", l: 11, r: ["asp", "mp"],
    t: { uz: "Multiplekser", ru: "Мультиплексор", en: "Multiplexer" },
    d: {
      uz: "Bir necha kanal signalini navbat bilan ASP kirishiga uzatuvchi elektron kommutator; bitta ASP dan foydalanish imkonini beradi.",
      ru: "Электронный коммутатор, поочерёдно подающий сигналы нескольких каналов на вход АЦП; позволяет обойтись одним АЦП.",
      en: "An electronic switch feeding several channels to the ADC input in turn, so that one ADC suffices.",
    },
    u: { uz: "Analog-raqamli traktda", ru: "В аналого-цифровом тракте", en: "In the analogue-to-digital path" },
  },
  {
    id: "tb", l: 11, r: ["mp", "taminmanba"],
    t: { uz: "TB", ru: "БП", en: "PSU" },
    f: { uz: "Ta'minlash bloki", ru: "Блок питания", en: "Power supply unit" },
    d: {
      uz: "Tarmoq kuchlanishi o'zgarishidan qat'i nazar qurilmaning barcha qismlarini turg'un kuchlanish bilan ta'minlovchi blok (U5).",
      ru: "Блок (U5), питающий все части устройства стабильным напряжением независимо от изменений напряжения сети.",
      en: "The unit (U5) supplying all parts of the device with stable voltage regardless of network voltage changes.",
    },
    u: { uz: "Raqamli qurilmalarda", ru: "В цифровых устройствах", en: "In digital devices" },
  },
  {
    id: "aloqaport", l: 11, r: ["mp"],
    t: { uz: "Aloqa porti (X1)", ru: "Порт связи (X1)", en: "Communication port (X1)" },
    d: {
      uz: "Qurilma bilan masofadan ishlash va ma'lumotni boshqa raqamli tizimlarga uzatish uchun port.",
      ru: "Порт для дистанционной работы с устройством и передачи данных в другие цифровые системы.",
      en: "The port for remote access to the device and for transferring data to other digital systems.",
    },
    u: {
      uz: "SCADA va boshqaruv tizimlariga ulashda",
      ru: "При подключении к SCADA и системам управления",
      en: "When connecting to SCADA and control systems",
    },
  },
  {
    id: "mantiqsxema", l: 11, r: ["yoki", "va", "emas", "rstrigger"],
    t: { uz: "Mantiqiy sxema", ru: "Логическая схема", en: "Logic diagram" },
    d: {
      uz: "Blok algoritmlarining grafik tasviri; raqamli himoyada relelar orasida elektr bog'lanish yo'q, jarayon dastur sifatida amalga oshiriladi.",
      ru: "Графическое представление алгоритмов работы блока; в цифровой защите электрических связей между реле нет, процесс реализован программно.",
      en: "A graphical representation of the device algorithms; in digital protection there are no electrical links between relays — the process is implemented in software.",
    },
    u: { uz: "MP RH qo'llanmalarida", ru: "В руководствах по МП РЗ", en: "In microprocessor protection manuals" },
  },
  {
    id: "mantiqiy1", l: 11, r: ["mantiqsxema", "diskret"],
    t: { uz: "Mantiqiy 0 va 1", ru: "Логические 0 и 1", en: "Logic 0 and 1" },
    d: {
      uz: "Mantiqiy sxemadagi ikkita holat: 0 — signal yo'q, 1 — signal bor. Rele sxemasida 1 kontaktning qo'shilgan holatiga mos keladi.",
      ru: "Два состояния логической схемы: 0 — сигнала нет, 1 — сигнал есть. В релейной схеме 1 соответствует замкнутому контакту.",
      en: "The two states of a logic circuit: 0 means no signal, 1 means signal present. In a relay circuit, 1 corresponds to a closed contact.",
    },
    u: {
      uz: "Mantiqiy sxemalarni o'qishda",
      ru: "При чтении логических схем",
      en: "When reading logic diagrams",
    },
  },
  {
    id: "yoki", l: 11, r: ["va", "emas", "mantiqsxema", "dw"],
    t: { uz: "YoKI", ru: "ИЛИ", en: "OR" },
    f: { uz: "Mantiqiy qo'shish", ru: "Логическое сложение", en: "Logical addition" },
    d: {
      uz: "Parallel ulanish sxemasiga mos keluvchi mantiqiy element: kirishlardan kamida bittasi 1 bo'lsa chiqish 1 bo'ladi.",
      ru: "Логический элемент, соответствующий параллельному соединению: выход равен 1, если хотя бы один вход равен 1.",
      en: "The logic gate matching a parallel connection: the output is 1 if at least one input is 1.",
    },
    u: {
      uz: "MTH da uch faza tok relelarini birlashtirishda",
      ru: "При объединении реле тока трёх фаз в МТЗ",
      en: "When combining the three phase current relays in OCP",
    },
  },
  {
    id: "va", l: 11, r: ["yoki", "emas", "kv"],
    t: { uz: "VA", ru: "И", en: "AND" },
    f: { uz: "Mantiqiy ko'paytirish", ru: "Логическое умножение", en: "Logical multiplication" },
    d: {
      uz: "Ketma-ket ulanish sxemasiga mos keluvchi element: barcha kirishlar 1 bo'lgandagina chiqish 1 bo'ladi.",
      ru: "Элемент, соответствующий последовательному соединению: выход равен 1 только когда все входы равны 1.",
      en: "The gate matching a series connection: the output is 1 only when all inputs are 1.",
    },
    u: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH da KA va KV ni birlashtirishda",
      ru: "При объединении KA и KV в МТЗ с пуском по напряжению",
      en: "When combining KA and KV in voltage-restrained OCP",
    },
  },
  {
    id: "emas", l: 11, r: ["yoki", "va", "mantiqsxema"],
    t: { uz: "EMAS", ru: "НЕ", en: "NOT" },
    f: { uz: "Inversiya", ru: "Инверсия", en: "Inversion" },
    d: {
      uz: "Kirish signalini teskari holatga o'zgartiruvchi element. Sxemalarda ko'pincha kirish yoki chiqishdagi doira bilan qisqartirib ko'rsatiladi.",
      ru: "Элемент, изменяющий входной сигнал на противоположный. В схемах чаще обозначается кружком на входе или выходе.",
      en: "The gate that inverts the input signal. In diagrams it is usually shown as a small circle at an input or output.",
    },
    u: { uz: "Bloklash zanjirlarida", ru: "В цепях блокировки", en: "In blocking circuits" },
  },
  {
    id: "rstrigger", l: 11, r: ["mantiqsxema", "xotiraorgan", "rustuvor"],
    t: { uz: "RS-trigger", ru: "RS-триггер", en: "RS flip-flop" },
    d: {
      uz: "Elementar xotira yacheykasi: S (Set) kirishiga 1 berilsa chiqish 1, R (Reset) ga 1 berilsa 0 bo'ladi; ikkalasi 0 bo'lsa oldingi holat saqlanadi.",
      ru: "Элементарная ячейка памяти: при 1 на входе S выход 1, при 1 на входе R выход 0; при нулях на обоих входах сохраняется прежнее состояние.",
      en: "An elementary memory cell: a 1 on S sets the output to 1, a 1 on R resets it to 0; with both at 0 the previous state is held.",
    },
    u: {
      uz: "Qisqa impulsni eslab qolishda",
      ru: "Для запоминания кратковременного импульса",
      en: "To latch a short pulse",
    },
  },
  {
    id: "rustuvor", l: 11, r: ["rstrigger"],
    t: { uz: "R ustuvorligi", ru: "Приоритет R", en: "R priority" },
    d: {
      uz: "RS-triggerning ikkala kirishiga bir vaqtda 1 berilganda chiqish 0 bo'ladigan bajarilishi.",
      ru: "Исполнение RS-триггера, при котором подача 1 на оба входа даёт на выходе 0.",
      en: "The RS flip-flop variant where a 1 on both inputs gives a 0 output.",
    },
    u: {
      uz: "MP bloklarining standart mantiqi",
      ru: "Стандартная логика МП блоков",
      en: "The standard logic of microprocessor devices",
    },
  },
  {
    id: "elementnom", l: 11, r: ["yoki", "va", "emas"],
    t: {
      uz: "Element nomlanishi (2-YoKI, 3-VA-EMAS)",
      ru: "Обозначение элемента (2-ИЛИ, 3-И-НЕ)",
      en: "Gate naming (2-OR, 3-AND-NOT)",
    },
    d: {
      uz: "Element nomi kirishlar soni bilan beriladi; inversiya kirishda bo'lsa nom boshiga, chiqishda bo'lsa oxiriga EMAS qo'shiladi.",
      ru: "Имя элемента задаётся числом входов; если инверсия на входе — НЕ ставится в начало имени, если на выходе — в конец.",
      en: "The gate is named by its number of inputs; NOT goes at the start of the name for an inverted input and at the end for an inverted output.",
    },
    u: {
      uz: "Mantiqiy sxemalarni o'qishda",
      ru: "При чтении логических схем",
      en: "When reading logic diagrams",
    },
  },

  /* ================= 12-MA'RUZA ================= */
  {
    id: "toklihimoya", l: 12, r: ["mth", "kesim", "ka"],
    t: { uz: "Tokli himoya", ru: "Токовая защита", en: "Current protection" },
    d: {
      uz: "Liniya fazasidagi tok belgilangan qiymatdan oshganda ishga tushuvchi himoya. Maksimal tokli himoya va tokli kesimga bo'linadi.",
      ru: "Защита, срабатывающая при превышении тока в фазе линии заданного значения. Делится на максимальную токовую защиту и токовую отсечку.",
      en: "Protection that operates when the line phase current exceeds a set value. It divides into overcurrent protection and instantaneous cut-off.",
    },
    u: {
      uz: "Taqsimlovchi tarmoqlarning asosiy himoyasi",
      ru: "Основная защита распределительных сетей",
      en: "The main protection of distribution networks",
    },
  },
  {
    id: "mth", l: 12, r: ["kesim", "pogonali", "dt", "ihi"],
    t: { uz: "MTH", ru: "МТЗ", en: "OCP" },
    f: {
      uz: "Maksimal tokli himoya",
      ru: "Максимальная токовая защита",
      en: "Overcurrent protection",
    },
    d: {
      uz: "Bir tomondan ta'minlanadigan tarmoqlar uchun asosiy himoya turi. Har bir liniyaning boshiga, manba tomonidan o'rnatiladi; selektivligi sabr vaqti orqali ta'minlanadi.",
      ru: "Основной вид защиты для сетей с односторонним питанием. Устанавливается в начале каждой линии со стороны источника; селективность обеспечивается выдержкой времени.",
      en: "The main protection type for singly-fed networks. It is installed at the start of each line on the source side, and selectivity is achieved through time delay.",
    },
    u: {
      uz: "Radial tarmoqlarning barcha liniyalarida",
      ru: "На всех линиях радиальных сетей",
      en: "On every line of a radial network",
    },
  },
  {
    id: "pogonali", l: 12, r: ["dt", "mth", "selektivlik"],
    t: { uz: "Pog'onali prinsip", ru: "Ступенчатый принцип", en: "Stepped-time principle" },
    d: {
      uz: "Sabr vaqtlarini iste'molchidan manba tomonga Δt qadam bilan oshirib borish. Shu hisobga QT joyiga eng yaqin himoya birinchi ishlaydi.",
      ru: "Увеличение выдержек времени от потребителя к источнику с шагом Δt. Благодаря этому первой срабатывает защита, ближайшая к месту КЗ.",
      en: "Increasing the time delays from the consumer towards the source in steps of Δt, so the protection nearest the fault operates first.",
    },
    u: {
      uz: "MTH vaqtlarini muvofiqlashtirishda",
      ru: "При согласовании выдержек МТЗ",
      en: "When coordinating OCP delays",
    },
  },
  {
    id: "mustaqilxar", l: 12, r: ["bogliqxar", "kt", "mth"],
    t: {
      uz: "Mustaqil xarakteristika",
      ru: "Независимая характеристика",
      en: "Definite-time characteristic",
    },
    d: {
      uz: "Ishlash vaqti tok qiymatiga bog'liq bo'lmagan MTH. Alohida KT vaqt relesi bilan bajariladi.",
      ru: "МТЗ, время действия которой не зависит от величины тока. Выполняется с отдельным реле времени KT.",
      en: "OCP whose operating time is independent of current magnitude. It uses a separate KT time relay.",
    },
    u: { uz: "Ko'pchilik MTH sxemalarida", ru: "В большинстве схем МТЗ", en: "In most OCP schemes" },
  },
  {
    id: "bogliqxar", l: 12, r: ["rt80", "mustaqilxar", "qismanbogliq"],
    t: {
      uz: "Bog'liq xarakteristika",
      ru: "Зависимая характеристика",
      en: "Inverse-time characteristic",
    },
    d: {
      uz: "Ishlash vaqti tokka teskari bog'liq bo'lgan MTH: tok qancha katta bo'lsa, shuncha tez ishlaydi. RT-80, RT-90 relelari bilan bajariladi.",
      ru: "МТЗ, время действия которой обратно зависит от тока: чем больше ток, тем быстрее срабатывание. Выполняется на реле РТ-80, РТ-90.",
      en: "OCP whose operating time is inversely related to current: the larger the current, the faster it trips. Built with RT-80 and RT-90 relays.",
    },
    u: {
      uz: "Liniya boshidagi QT ni tez o'chirishda",
      ru: "Для быстрого отключения КЗ в начале линии",
      en: "For fast clearing of faults at the line start",
    },
  },
  {
    id: "qismanbogliq", l: 12, r: ["bogliqxar", "rt80"],
    t: {
      uz: "Qisman bog'liq xarakteristika",
      ru: "Ограниченно зависимая характеристика",
      en: "Partially inverse characteristic",
    },
    d: {
      uz: "Kichik toklarda bog'liq, katta toklarda mustaqil bo'lgan aralash xarakteristika.",
      ru: "Смешанная характеристика: при малых токах зависимая, при больших — независимая.",
      en: "A mixed characteristic: inverse at low currents and definite at high currents.",
    },
    u: {
      uz: "RT-80 turidagi induksion relelarda",
      ru: "В индукционных реле типа РТ-80",
      en: "In induction relays of the RT-80 type",
    },
  },
  {
    id: "rt80", l: 12, r: ["bogliqxar", "ksoz", "inersiya"],
    t: { uz: "RT-80 / RT-90", ru: "РТ-80 / РТ-90", en: "RT-80 / RT-90" },
    f: {
      uz: "Bog'liq xarakteristikali tok relesi",
      ru: "Реле тока с зависимой характеристикой",
      en: "Inverse-time current relay",
    },
    d: {
      uz: "Sabr vaqti tokka bog'liq induksion relelar. Yetarli quvvatli kontakt va signal bayroqchasiga ega, shuning uchun sxemada KT, KL va KH kerak bo'lmaydi.",
      ru: "Индукционные реле с зависимой от тока выдержкой. Имеют достаточно мощные контакты и сигнальный флажок, поэтому KT, KL и KH в схеме не нужны.",
      en: "Induction relays with a current-dependent delay. They have sufficiently powerful contacts and their own flag, so KT, KL and KH are not needed.",
    },
    u: {
      uz: "Soddalashtirilgan MTH sxemalarida",
      ru: "В упрощённых схемах МТЗ",
      en: "In simplified OCP schemes",
    },
  },
  {
    id: "ka", l: 12, r: ["rt40", "oo", "ka0", "yoki"],
    t: { uz: "KA", ru: "KA", en: "KA" },
    f: { uz: "Tok relesi", ru: "Реле тока", en: "Current relay" },
    d: {
      uz: "Tokning oshishiga javob beruvchi o'lchov organi. MTH da har bir fazaga bittadan o'rnatiladi, kontaktlari YoKI sxemasi bo'yicha parallel ulanadi.",
      ru: "Измерительный орган, реагирующий на возрастание тока. В МТЗ устанавливается по одному на фазу, контакты соединяются параллельно по схеме ИЛИ.",
      en: "The measuring element responding to a current rise. In OCP one is fitted per phase and their contacts are paralleled as an OR.",
    },
    u: {
      uz: "MTH va tokli kesimning kirishida",
      ru: "На входе МТЗ и токовой отсечки",
      en: "At the input of OCP and cut-off",
    },
  },
  {
    id: "ka0", l: 12, r: ["nolsim", "ka", "nkf"],
    t: { uz: "KA0", ru: "KA0", en: "KA0" },
    f: {
      uz: "Nol simdagi tok relesi",
      ru: "Реле тока в нулевом проводе",
      en: "Neutral-wire current relay",
    },
    d: {
      uz: "Nol o'tkazgichga qo'yiladigan tok relesi. Iyuk.max dan sozlanmagani uchun sezgirligi faza relelaridan yuqori.",
      ru: "Реле тока, устанавливаемое в нулевом проводе. Не отстраивается от Iраб.max, поэтому чувствительнее фазных реле.",
      en: "A current relay fitted in the neutral wire. It is not set above the maximum load current, so it is more sensitive than the phase relays.",
    },
    u: {
      uz: "Yerga QT toki kichik bo'lgan holatlarda",
      ru: "При малых токах КЗ на землю",
      en: "Where earth-fault current is small",
    },
  },
  {
    id: "dw", l: 12, r: ["yoki", "mth", "mantiqiyqism"],
    t: { uz: "DW", ru: "DW", en: "DW" },
    f: {
      uz: "YoKI mantiqiy elementi",
      ru: "Логический элемент ИЛИ",
      en: "OR logic gate",
    },
    d: {
      uz: "MTH strukturaviy sxemasida uch faza o'lchov organlarini birlashtiruvchi mantiqiy element.",
      ru: "Логический элемент структурной схемы МТЗ, объединяющий измерительные органы трёх фаз.",
      en: "The logic gate in the OCP block diagram that combines the three phase measuring elements.",
    },
    u: {
      uz: "12.3-rasmdagi strukturaviy sxemada",
      ru: "В структурной схеме (рис. 12.3)",
      en: "In the block diagram (fig. 12.3)",
    },
  },
  {
    id: "uchfazalisxema", l: 12, r: ["toliqyulduz", "ikkifazalisxema"],
    t: {
      uz: "Uch fazali MTH sxemasi",
      ru: "Трёхфазная схема МТЗ",
      en: "Three-phase OCP scheme",
    },
    d: {
      uz: "Har bir fazada KA o'rnatilgan sxema; barcha QT turlariga, shu jumladan bir fazali QT ga javob beradi.",
      ru: "Схема с реле KA на каждой фазе; реагирует на все виды КЗ, включая однофазные.",
      en: "A scheme with a KA relay on each phase; it responds to all fault types, including single-phase faults.",
    },
    u: {
      uz: "Neytrali zaminlangan tarmoqlarda (110 kV va yuqori)",
      ru: "В сетях с заземлённой нейтралью (110 кВ и выше)",
      en: "In solidly earthed networks (110 kV and above)",
    },
  },
  {
    id: "ikkifazalisxema", l: 12, r: ["toliqbolmagan", "bittarele", "uchfazalisxema"],
    t: {
      uz: "Ikki fazali MTH sxemasi",
      ru: "Двухфазная схема МТЗ",
      en: "Two-phase OCP scheme",
    },
    d: {
      uz: "Ikkita KA bilan bajariladigan sxema; tok zanjirlari to'liq bo'lmagan yulduz bo'yicha ulanadi. Arzon, lekin Y/Δ transformatordan keyingi ikki fazali QT da sezgirligi 2 karra past.",
      ru: "Схема с двумя реле KA; токовые цепи соединяются по схеме неполной звезды. Дешевле, но при двухфазном КЗ за трансформатором Y/Δ чувствительность вдвое ниже.",
      en: "A scheme with two KA relays and current circuits in incomplete star. Cheaper, but its sensitivity is halved for two-phase faults beyond a Y/Δ transformer.",
    },
    u: {
      uz: "Neytrali izolyasiyalangan 6-35 kV tarmoqlarda",
      ru: "В сетях 6-35 кВ с изолированной нейтралью",
      en: "In 6-35 kV networks with isolated neutral",
    },
  },
  {
    id: "bittarele", l: 12, r: ["toklarfarqi", "ikkifazalisxema"],
    t: { uz: "Bitta releli sxema", ru: "Схема с одним реле", en: "Single-relay scheme" },
    d: {
      uz: "Ir = Ia − Ic bo'lgan sxema. Relelar soni kam, lekin Y/Δ transformator ortidagi QT da Ir = 0 bo'lib himoya ishlamaydi.",
      ru: "Схема, в которой Iр = Ia − Ic. Реле мало, но при КЗ за трансформатором Y/Δ Iр = 0 и защита не действует.",
      en: "A scheme where Ir = Ia − Ic. It needs few relays, but beyond a Y/Δ transformer Ir = 0 and the protection fails to operate.",
    },
    u: {
      uz: "6-10 kV Y/Y transformator va elektr motorlar himoyasida",
      ru: "В защите трансформаторов Y/Y и электродвигателей 6-10 кВ",
      en: "In protecting 6-10 kV Y/Y transformers and motors",
    },
  },
  {
    id: "bsh", l: 12, r: ["shu", "operativtok"],
    t: { uz: "BSh", ru: "ШУ (МТЗ)", en: "Control bus (OCP)" },
    f: {
      uz: "Boshqaruv shinasi (MTH operativ zanjirida)",
      ru: "Шина управления в оперативной цепи МТЗ",
      en: "Control busbar in the OCP operating circuit",
    },
    d: {
      uz: "MTH operativ zanjiri saqlagich orqali ta'minlanadigan o'zgarmas tok shinasi; elektromagnit uzgich alohida saqlagichdan ta'minlanadi.",
      ru: "Шина постоянного тока, от которой через предохранитель питается оперативная цепь МТЗ; электромагнит отключения питается от отдельного предохранителя.",
      en: "The DC busbar feeding the OCP operating circuit through a fuse; the trip coil is fed from a separate fuse.",
    },
    u: { uz: "MTH prinsipial sxemasida", ru: "В принципиальной схеме МТЗ", en: "In the OCP schematic" },
  },
  {
    id: "strukturasxema", l: 12, r: ["prinsipialsxema", "mth"],
    t: { uz: "Strukturaviy sxema", ru: "Структурная схема", en: "Block diagram" },
    d: {
      uz: "Himoyani funksional bloklar (o'lchov, mantiqiy, bajaruvchi qism) ko'rinishida tasvirlovchi sxema.",
      ru: "Схема, изображающая защиту в виде функциональных блоков (измерительная, логическая, исполнительная части).",
      en: "A diagram showing the protection as functional blocks (measuring, logic and output parts).",
    },
    u: {
      uz: "Himoya prinsipini tushuntirishda",
      ru: "При объяснении принципа защиты",
      en: "When explaining the protection principle",
    },
  },
  {
    id: "prinsipialsxema", l: 12, r: ["strukturasxema", "mantiqsxema"],
    t: { uz: "Prinsipial sxema", ru: "Принципиальная схема", en: "Schematic diagram" },
    d: {
      uz: "Rele va apparatlarning haqiqiy elektr bog'lanishini ko'rsatuvchi sxema; qurilma ishlashini tushuntirishning eng qisqa usuli.",
      ru: "Схема, показывающая действительные электрические связи реле и аппаратов; самый краткий способ объяснить работу устройства.",
      en: "A diagram showing the actual electrical connections of relays and apparatus; the most concise way to explain how a device works.",
    },
    u: {
      uz: "Montaj va sozlash ishlarida",
      ru: "При монтаже и наладке",
      en: "In wiring and commissioning work",
    },
  },
];
