import type { Relay } from "../types";

/** "Rele aniqlash mashqi" uchun relelar bazasi.
 *  Manba: 9-ma'ruza (9.1-9.3 jadvallar), 10-ma'ruza, 12-ma'ruza. */
export const RELAYS: Relay[] = [
  {
    id: "RT-40", name: "RT-40", lec: 9,
    kind: { uz: "Tok relesi", ru: "Реле тока", en: "Current relay" },
    short: {
      uz: "Elektromagnit maksimal tok relesi",
      ru: "Электромагнитное максимальное реле тока",
      en: "Electromagnetic overcurrent relay",
    },
    desc: {
      uz: "ChEAZ ishlab chiqargan o'zgaruvchan tokning elektromagnit maksimal tok relesi. Nazorat zanjirlarida tokning oshishiga ta'sir qiluvchi organ.",
      ru: "Электромагнитное максимальное реле тока переменного тока производства ЧЭАЗ. Орган, реагирующий на возрастание тока в контролируемых цепях.",
      en: "An AC electromagnetic overcurrent relay from ChEAZ. The element responding to a current rise in the monitored circuits.",
    },
    clues: [
      { uz: "Menda P shaklidagi elektromagnit va ikkita chulg'am bor.", ru: "У меня П-образный электромагнит и две обмотки.", en: "I have a U-shaped electromagnet and two coils." },
      { uz: "Chulg'amlarimni parallel ulasangiz o'rnatma ikki barobar oshadi.", ru: "Если включить мои обмотки параллельно, уставка удвоится.", en: "Connect my coils in parallel and the setting doubles." },
      { uz: "Menda kvars qumi bilan to'ldirilgan tebranish so'ndiruvchi baraban bor.", ru: "У меня есть барабан-демпфер, заполненный кварцевым песком.", en: "I have a damping drum filled with quartz sand." },
      { uz: "Men MTH va tokli kesimning o'lchov organiman.", ru: "Я — измерительный орган МТЗ и токовой отсечки.", en: "I am the measuring element of OCP and the cut-off." },
    ],
    facts: [
      { uz: "O'rnatma oraliqlari: RT40/0,2 dan RT40/200 gacha (9.1-jadval)", ru: "Диапазоны уставок: от РТ40/0,2 до РТ40/200 (табл. 9.1)", en: "Setting ranges from RT40/0.2 to RT40/200 (table 9.1)" },
      { uz: "Qaytish koeffitsienti birinchi o'rnatmada 0,85 dan, qolganlarida 0,8 dan kam emas", ru: "Коэффициент возврата на первой уставке не менее 0,85, на остальных не менее 0,8", en: "Reset ratio at least 0.85 on the first setting and 0.8 on the others" },
      { uz: "RT-40/100 va RT-40/200 da kqay kamida 0,7", ru: "У РТ-40/100 и РТ-40/200 kв не менее 0,7", en: "For RT-40/100 and /200 the reset ratio is at least 0.7" },
      { uz: "Iri bo'yicha asosiy chegaraviy xatolik 5 % dan katta emas", ru: "Основная предельная погрешность по Iс.р не более 5 %", en: "The basic limiting error on pickup current is within 5 %" },
      { uz: "Ishlash vaqti 1,2Iri da 0,1 s dan, 3Iri da 0,03 s dan katta emas", ru: "Время срабатывания при 1,2Iс.р не более 0,1 с, при 3Iс.р — 0,03 с", en: "Operating time within 0.1 s at 1.2× pickup and 0.03 s at 3× pickup" },
    ],
  },
  {
    id: "RN-53", name: "RN-53", lec: 9,
    kind: { uz: "Kuchlanish relesi", ru: "Реле напряжения", en: "Voltage relay" },
    short: { uz: "Maksimal kuchlanish relesi", ru: "Максимальное реле напряжения", en: "Overvoltage relay" },
    desc: {
      uz: "O'zgaruvchan tok zanjirlarida kuchlanishning oshishiga ta'sir javob beruvchi organ.",
      ru: "Орган, реагирующий на повышение напряжения в цепях переменного тока.",
      en: "The element responding to a voltage rise in AC circuits.",
    },
    clues: [
      { uz: "Mening konstruksiyam RT-40 ga o'xshaydi, lekin barabanim yo'q.", ru: "Моя конструкция похожа на РТ-40, но барабана у меня нет.", en: "My construction resembles the RT-40, but I have no damping drum." },
      { uz: "Chulg'amlarim to'g'rilagich ko'prik va R1, R2 qarshiliklar orqali ulanadi.", ru: "Мои обмотки включаются через выпрямительный мост и сопротивления R1, R2.", en: "My coils connect through a rectifier bridge and the resistors R1, R2." },
      { uz: "Men kuchlanishning oshishiga javob beraman.", ru: "Я реагирую на повышение напряжения.", en: "I respond to a rise in voltage." },
      { uz: "Qaytish koeffitsientim 0,8 dan kam emas.", ru: "Мой коэффициент возврата не менее 0,8.", en: "My reset ratio is at least 0.8." },
    ],
    facts: [
      { uz: "Turlari: RN53/60, RN53/200, RN53/400 (9.2-jadval)", ru: "Типы: РН53/60, РН53/200, РН53/400 (табл. 9.2)", en: "Types: RN53/60, RN53/200, RN53/400 (table 9.2)" },
      { uz: "Uri bo'yicha asosiy chegaraviy xatolik 10 % dan katta emas", ru: "Основная предельная погрешность по Uс.р не более 10 %", en: "The basic limiting error on pickup voltage is within 10 %" },
      { uz: "Nominal chastota 50, 60 Gs", ru: "Номинальная частота 50, 60 Гц", en: "Rated frequency 50 or 60 Hz" },
      { uz: "400 V li relede diodlarni saqlash uchun chulg'am kondensator bilan shuntlanadi", ru: "В реле на 400 В обмотка шунтируется конденсатором для защиты диодов", en: "In the 400 V relay the coil is shunted by a capacitor to protect the diodes" },
    ],
  },
  {
    id: "RN-54", name: "RN-54", lec: 9,
    kind: { uz: "Kuchlanish relesi", ru: "Реле напряжения", en: "Voltage relay" },
    short: { uz: "Minimal kuchlanish relesi", ru: "Минимальное реле напряжения", en: "Undervoltage relay" },
    desc: {
      uz: "Kuchlanishning pasayishiga ta'sir qiluvchi element. Konstruksiyasi va ichki sxemasi RN-53 bilan bir xil.",
      ru: "Элемент, реагирующий на снижение напряжения. Конструкция и внутренняя схема те же, что у РН-53.",
      en: "The element responding to a voltage drop. Its design and internal circuit match the RN-53.",
    },
    clues: [
      { uz: "Qaytish koeffitsientim birdan katta.", ru: "Мой коэффициент возврата больше единицы.", en: "My reset ratio is greater than one." },
      { uz: "Men kuchlanish pasayganda ishlayman.", ru: "Я срабатываю при снижении напряжения.", en: "I operate when the voltage falls." },
      { uz: "Kuchlanish bo'yicha ishga tushuvchi MTH da blokirovka vazifasini bajaraman.", ru: "В МТЗ с пуском по напряжению я выполняю роль блокировки.", en: "In voltage-restrained OCP I act as the blocking element." },
      { uz: "RN-53 dan faqat o'rnatmalarni rostlash va shkala darajasi bilan farq qilaman.", ru: "От РН-53 я отличаюсь только регулировкой уставок и градуировкой шкалы.", en: "I differ from the RN-53 only in setting adjustment and scale." },
    ],
    facts: [
      { uz: "Turlari: RN54/48, RN54/160, RN54/320 (9.3-jadval)", ru: "Типы: РН54/48, РН54/160, РН54/320 (табл. 9.3)", en: "Types: RN54/48, RN54/160, RN54/320 (table 9.3)" },
      { uz: "Qaytish koeffitsienti 1,25 dan oshmaydi", ru: "Коэффициент возврата не более 1,25", en: "The reset ratio does not exceed 1.25" },
      { uz: "Kontaktning qo'shilish vaqti 0,8Uri da 0,15 s dan, 0,5Uri da 0,1 s dan katta emas", ru: "Время замыкания контакта при 0,8Uс.р не более 0,15 с, при 0,5Uс.р — 0,1 с", en: "Contact closing time within 0.15 s at 0.8× and 0.1 s at 0.5× pickup" },
    ],
  },
  {
    id: "RP-23", name: "RP-23", lec: 10,
    kind: { uz: "Oraliq rele", ru: "Промежуточное реле", en: "Auxiliary relay" },
    short: {
      uz: "Tez ishlovchi oraliq rele (o'zgarmas tok)",
      ru: "Быстродействующее промежуточное реле (постоянный ток)",
      en: "Fast auxiliary relay (DC)",
    },
    desc: {
      uz: "O'zgarmas operativ tokli RH sxemalari uchun buraluvchi yakorli oraliq rele.",
      ru: "Промежуточное реле с поворотным якорем для схем РЗ на постоянном оперативном токе.",
      en: "A rotating-armature auxiliary relay for protection schemes on DC operating supply.",
    },
    clues: [
      { uz: "Menda beshta kontakt bor, ular turli kombinatsiyalarda ishlatiladi.", ru: "У меня пять контактов, используемых в разных комбинациях.", en: "I have five contacts used in various combinations." },
      { uz: "Mening ishlash vaqtim taxminan 0,06 s.", ru: "Моё время действия около 0,06 с.", en: "My operating time is about 0.06 s." },
      { uz: "Nominal kuchlanishda iste'molim 6 Vt dan oshmaydi.", ru: "При номинальном напряжении моё потребление не более 6 Вт.", en: "At rated voltage my consumption is no more than 6 W." },
      { uz: "Men o'zgarmas operativ tokli sxemalarda oraliq rele vazifasini bajaraman.", ru: "Я работаю промежуточным реле в схемах на постоянном оперативном токе.", en: "I serve as the auxiliary relay in DC-supplied schemes." },
    ],
    facts: [
      { uz: "O'zgaruvchan tok uchun analogi — RP-25 (iste'moli 10 VA gacha)", ru: "Аналог для переменного тока — РП-25 (потребление до 10 ВА)", en: "The AC analogue is the RP-25 (up to 10 VA)" },
      { uz: "O'rniga RP-16-1 va RP-16-7 relelari ishlab chiqarilmoqda", ru: "Взамен выпускаются реле РП-16-1 и РП-16-7", en: "The RP-16-1 and RP-16-7 are produced as replacements" },
      { uz: "O'zgarmas tokda 110, 127 va 220 V kuchlanishda ishlab chiqariladi", ru: "На постоянном токе выпускается на 110, 127 и 220 В", en: "Made for 110, 127 and 220 V DC" },
    ],
  },
  {
    id: "RP-251", name: "RP-251", lec: 10,
    kind: { uz: "Oraliq rele", ru: "Промежуточное реле", en: "Auxiliary relay" },
    short: { uz: "Sekin ishlovchi oraliq rele", ru: "Замедленное промежуточное реле", en: "Time-delayed auxiliary relay" },
    desc: {
      uz: "Magnit o'tkazgichida qisqa tutashtirilgan kontur (misli gilza) bo'lgan oraliq rele.",
      ru: "Промежуточное реле с короткозамкнутым контуром (медной гильзой) на магнитопроводе.",
      en: "An auxiliary relay with a short-circuited loop (a copper sleeve) on its core.",
    },
    clues: [
      { uz: "Magnit o'tkazgichimda misli gilza bor.", ru: "На моём магнитопроводе есть медная гильза.", en: "There is a copper sleeve on my core." },
      { uz: "Men ishlaganda ham, qaytganda ham biroz kechikaman.", ru: "Я замедляюсь и при срабатывании, и при возврате.", en: "I am delayed both on pickup and on reset." },
      { uz: "Mening sabr vaqtim 0,07-0,11 s.", ru: "Моя выдержка составляет 0,07-0,11 с.", en: "My delay is 0.07-0.11 s." },
      { uz: "Men oraliq rele bo'lsam ham, sekin ishlayman.", ru: "Я промежуточное реле, но действую замедленно.", en: "I am an auxiliary relay, yet I act with a delay." },
    ],
    facts: [
      { uz: "Gilzadagi I2 tok asosiy chulg'amdagi tok o'sishiga qarshi ta'sir qiladi", ru: "Ток I2 в гильзе противодействует нарастанию тока основной обмотки", en: "The sleeve current opposes the rise of the main coil current" },
      { uz: "Qaytishda ham yakor sekin ajraladi", ru: "При возврате якорь также отпадает замедленно", en: "On reset the armature also releases slowly" },
    ],
  },
  {
    id: "RP-341", name: "RP-341", lec: 10,
    kind: { uz: "Oraliq tok relesi", ru: "Промежуточное токовое реле", en: "Auxiliary current relay" },
    short: {
      uz: "Quvvatli kontaktli oraliq tok relesi",
      ru: "Промежуточное токовое реле с мощными контактами",
      en: "Auxiliary current relay with heavy-duty contacts",
    },
    desc: {
      uz: "O'zgaruvchan operativ tokli RH uchun, TT ikkilamchi zanjiriga ulanadigan rele.",
      ru: "Реле для РЗ на переменном оперативном токе, включаемое во вторичную цепь ТТ.",
      en: "A relay for AC-supplied protection, connected in the CT secondary circuit.",
    },
    clues: [
      { uz: "Men TT ning ikkilamchi zanjiriga ulanaman.", ru: "Я включаюсь во вторичную цепь ТТ.", en: "I am connected in the CT secondary circuit." },
      { uz: "Kontaktlarim 100-150 A o'zgaruvchan tokni qo'shib o'chira oladi.", ru: "Мои контакты коммутируют переменный ток 100-150 А.", en: "My contacts switch 100-150 A of alternating current." },
      { uz: "Tarkibimda oraliq to'yintirilgan transformator va to'g'rilagich bor.", ru: "В моём составе есть промежуточный насыщающийся трансформатор и выпрямитель.", en: "I contain an intermediate saturating transformer and a rectifier." },
      { uz: "Men o'zgaruvchan operativ tokli sxemalarda ishlayman.", ru: "Я работаю в схемах на переменном оперативном токе.", en: "I work in AC operating-supply schemes." },
    ],
    facts: [
      { uz: "RP-321 turi bilan bir qatorda ishlab chiqariladi", ru: "Выпускается наряду с типом РП-321", en: "Produced alongside the RP-321 type" },
      { uz: "Tarkibida to'g'rilangan tokni silliqlovchi kondensator mavjud", ru: "Содержит конденсатор, сглаживающий выпрямленный ток", en: "It includes a capacitor smoothing the rectified current" },
    ],
  },
  {
    id: "RU-21", name: "RU-21", lec: 10,
    kind: { uz: "Ko'rsatgich relesi", ru: "Указательное реле", en: "Indicating relay" },
    short: {
      uz: "Bayroqchali ko'rsatgich (signal) relesi",
      ru: "Указательное (сигнальное) реле с флажком",
      en: "Flag-type indicating (alarm) relay",
    },
    desc: {
      uz: "RH yoki uning strukturaviy qismi ishlaganini qayd qilish uchun xizmat qiladi.",
      ru: "Служит для фиксации срабатывания РЗ или её структурной части.",
      en: "It records the operation of the protection or one of its parts.",
    },
    clues: [
      { uz: "Menda bayroqcha va qaytaruvchi knopka bor.", ru: "У меня есть флажок и кнопка возврата.", en: "I have a flag and a reset pushbutton." },
      { uz: "Men ishlaganimni tiniq qoplama orqali ko'rish mumkin.", ru: "Моё срабатывание видно через прозрачную крышку.", en: "My operation is visible through a transparent cover." },
      { uz: "Xodim meni qo'lda qaytarmaguncha ishlagan holatda qolaman.", ru: "Я остаюсь в сработавшем положении, пока персонал не вернёт меня вручную.", en: "I stay operated until staff reset me by hand." },
      { uz: "Men himoyaning ishlaganini qayd qilaman.", ru: "Я фиксирую срабатывание защиты.", en: "I record that the protection has operated." },
    ],
    facts: [
      { uz: "Ketma-ket (10.8,a) va parallel (10.8,b) ulanish uchun ishlab chiqariladi", ru: "Выпускается для последовательного (рис. 10.8,а) и параллельного (10.8,б) включения", en: "Made for series (fig. 10.8a) and parallel (10.8b) connection" },
      { uz: "Xuddi shu funksiyani ES turidagi signal relesi ham bajaradi", ru: "Ту же функцию выполняет сигнальное реле типа ЭС", en: "The ES-type alarm relay performs the same function" },
      { uz: "Odatda YAT o'chirish g'altagi bilan ketma-ket ulanadi", ru: "Обычно включается последовательно с катушкой отключения YAT", en: "It is usually connected in series with the trip coil" },
    ],
  },
  {
    id: "RV-100", name: "RV-100", lec: 10,
    kind: { uz: "Vaqt relesi", ru: "Реле времени", en: "Time relay" },
    short: {
      uz: "O'zgarmas tokli soat mexanizmli vaqt relesi",
      ru: "Реле времени с часовым механизмом (постоянный ток)",
      en: "Clockwork time relay (DC)",
    },
    desc: {
      uz: "RH ishini sun'iy ravishda sekinlashtirish uchun xizmat qiladigan vaqt relesi.",
      ru: "Реле времени, служащее для искусственного замедления действия РЗ.",
      en: "A time relay that deliberately delays the protection's action.",
    },
    clues: [
      { uz: "Mening ichimda soat mexanizmi va ankerli qurilma bor.", ru: "Внутри у меня часовой механизм и анкерное устройство.", en: "Inside me there is a clockwork with an escapement." },
      { uz: "Men o'zgarmas tokda ishlayman.", ru: "Я работаю на постоянном токе.", en: "I work on DC." },
      { uz: "Sabr vaqtimni kontaktlarni surish orqali rostlaysiz.", ru: "Мою выдержку регулируют смещением контактов.", en: "My delay is adjusted by moving the contacts." },
      { uz: "MTH ning selektivligini men ta'minlayman.", ru: "Именно я обеспечиваю селективность МТЗ.", en: "I am what gives the OCP its selectivity." },
    ],
    facts: [
      { uz: "O'zgarmas tok qatori: RV-100, RV-120, RV-130, RV-140", ru: "Ряд постоянного тока: РВ-100, РВ-120, РВ-130, РВ-140", en: "The DC series: RV-100, RV-120, RV-130, RV-140" },
      { uz: "12.4-rasmdagi MTH sxemasida vaqt organi sifatida ishlatilgan", ru: "В схеме МТЗ на рис. 12.4 использовано как орган времени", en: "Used as the timing element in the OCP of fig. 12.4" },
      { uz: "3,5 s shkalada xatolik ±0,06 s dan oshmaydi", ru: "На шкале 3,5 с погрешность не более ±0,06 с", en: "On the 3.5 s scale the error stays within ±0.06 s" },
    ],
  },
  {
    id: "RV-200", name: "RV-200", lec: 10,
    kind: { uz: "Vaqt relesi", ru: "Реле времени", en: "Time relay" },
    short: {
      uz: "O'zgaruvchan tokli vaqt relesi",
      ru: "Реле времени переменного тока",
      en: "AC time relay",
    },
    desc: {
      uz: "Soat mexanizmining prujinasi doim tortilgan holatda bo'ladigan vaqt relesi.",
      ru: "Реле времени, у которого пружина часового механизма постоянно натянута.",
      en: "A time relay whose clockwork spring is kept permanently wound.",
    },
    clues: [
      { uz: "Mening harakatlantiruvchi prujinam doim tortilgan turadi.", ru: "Моя приводная пружина всегда натянута.", en: "My driving spring is always under tension." },
      { uz: "Kontaktlarim yopilish vaqtini qo'zg'almas kontakt holatini o'zgartirib sozlaysiz.", ru: "Время замыкания моих контактов регулируют положением неподвижного контакта.", en: "My contact closing time is set by moving the fixed contact." },
      { uz: "Harakat tezligim yukchalar holati bilan sozlanadi.", ru: "Скорость моего хода регулируется положением грузиков.", en: "My running speed is adjusted by the weights." },
      { uz: "Men o'zgaruvchan tokda ishlovchi vaqt relesiman.", ru: "Я — реле времени переменного тока.", en: "I am an AC time relay." },
    ],
    facts: [
      { uz: "O'zgaruvchan tok qatori: RV-210, RV-220, RV-230", ru: "Ряд переменного тока: РВ-210, РВ-220, РВ-230", en: "The AC series: RV-210, RV-220, RV-230" },
      { uz: "Friksion mahkamlash moslamasi tez qaytishni ta'minlaydi", ru: "Фрикционное устройство обеспечивает быстрый возврат", en: "A friction clutch provides fast resetting" },
      { uz: "ChEAZ elektron bazada RV-01 va RV-03 turlarini ham ishlab chiqaradi", ru: "ЧЭАЗ выпускает также типы РВ-01 и РВ-03 на электронной базе", en: "ChEAZ also makes the electronic RV-01 and RV-03 types" },
    ],
  },
  {
    id: "RT-80", name: "RT-80", lec: 12,
    kind: { uz: "Tok relesi", ru: "Реле тока", en: "Current relay" },
    short: {
      uz: "Sabr vaqti tokka bog'liq induksion tok relesi",
      ru: "Индукционное реле тока с зависимой выдержкой",
      en: "Inverse-time induction current relay",
    },
    desc: {
      uz: "Ishlash vaqti tok kattaligiga bog'liq bo'lgan tok relesi.",
      ru: "Реле тока, время действия которого зависит от величины тока.",
      en: "A current relay whose operating time depends on the current magnitude.",
    },
    clues: [
      { uz: "Mening ishlash vaqtim tok qancha katta bo'lsa, shuncha kichik.", ru: "Чем больше ток, тем меньше моё время действия.", en: "The larger the current, the shorter my operating time." },
      { uz: "Men bilan ishlagan sxemada vaqt, oraliq va ko'rsatgich relelari kerak emas.", ru: "В схеме со мной не нужны реле времени, промежуточное и указательное.", en: "A scheme with me needs no time, auxiliary or flag relay." },
      { uz: "Menda yetarli quvvatli kontakt va signal bayroqchasi bor.", ru: "У меня достаточно мощный контакт и сигнальный флажок.", en: "I have a powerful contact and my own flag." },
      { uz: "Men bog'liq xarakteristikali MTH ni tashkil qilaman.", ru: "Я образую МТЗ с зависимой характеристикой.", en: "I form the inverse-time OCP." },
    ],
    facts: [
      { uz: "RT-90 turi bilan bir qatorda ishlatiladi", ru: "Применяется наряду с типом РТ-90", en: "Used alongside the RT-90 type" },
      { uz: "Bog'liq xarakteristikali MTH da Δt = 0,6-1 s", ru: "У МТЗ с зависимой характеристикой Δt = 0,6-1 с", en: "For inverse-time OCP Δt = 0.6-1 s" },
      { uz: "Inersion xatolik vaqti ti Δt ga qo'shiladi (13.10-formula)", ru: "Время инерционной погрешности tи добавляется к Δt (формула 13.10)", en: "The overtravel time is added to Δt (formula 13.10)" },
      { uz: "Kesimda ishlatilsa ksoz = 1,5 qabul qilinadi", ru: "При использовании в отсечке kотс = 1,5", en: "When used in a cut-off the setting factor is 1.5" },
    ],
  },
];
