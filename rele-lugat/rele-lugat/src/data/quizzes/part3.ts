import type { Quiz } from "../../types";

/** 9-12 ma'ruzalar test savollari. */
export const QUIZ3: Quiz[] = [
  /* ================= 9-MA'RUZA ================= */
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RT-40 relesi nima uchun ishlatiladi?",
      ru: "Для чего применяется реле РТ-40?",
      en: "What is the RT-40 relay used for?",
    },
    o: [
      { uz: "Kuchlanishning pasayishini sezish", ru: "Для выявления снижения напряжения", en: "To detect a voltage drop" },
      {
        uz: "Nazorat zanjirlarida tokning oshishiga ta'sir qiluvchi organ sifatida",
        ru: "Как орган, реагирующий на возрастание тока в контролируемых цепях",
        en: "As the element responding to a current rise in the monitored circuits",
      },
      { uz: "Vaqt kechikishini hosil qilish", ru: "Для создания выдержки времени", en: "To create a time delay" },
      { uz: "Signal berish", ru: "Для подачи сигнала", en: "To raise an alarm" },
    ],
    e: {
      uz: "RT-40 maksimal tok relesi tokning oshishiga ta'sir qiluvchi organ sifatida ishlatiladi (9-ma'ruza).",
      ru: "РТ-40 — максимальное реле тока, применяемое как орган, реагирующий на возрастание тока (лекция 9).",
      en: "The RT-40 is an overcurrent relay used as the element responding to a current rise (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RT-40 da ko'rsatgichni eng chap holatdan eng o'ng holatga o'tkazish ishlash tokini qanday o'zgartiradi?",
      ru: "Как изменится ток срабатывания РТ-40 при переводе указателя из крайнего левого в крайнее правое положение?",
      en: "How does moving the RT-40 pointer from the far left to the far right change the pickup current?",
    },
    o: [
      { uz: "Ikki baravar kamaytiradi", ru: "Уменьшит вдвое", en: "It halves it" },
      { uz: "Ikki baravar oshiradi", ru: "Увеличит вдвое", en: "It doubles it" },
      { uz: "O'zgartirmaydi", ru: "Не изменит", en: "It does not change it" },
      { uz: "To'rt baravar oshiradi", ru: "Увеличит вчетверо", en: "It quadruples it" },
    ],
    e: {
      uz: "RT-40 rele uchun ko'rsatgich 8 ni eng chap holatdan eng o'ng holatiga o'tkazish ishlash tokini ikki baravar oshiradi (9-ma'ruza).",
      ru: "Для РТ-40 перевод указателя 8 из крайнего левого в крайнее правое положение увеличивает ток срабатывания вдвое (лекция 9).",
      en: "For the RT-40, moving pointer 8 from far left to far right doubles the pickup current (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RT-40 dagi baraban nima uchun kerak?",
      ru: "Для чего нужен барабан в РТ-40?",
      en: "What is the drum in the RT-40 for?",
    },
    o: [
      { uz: "Sabr vaqtini hosil qilish", ru: "Для создания выдержки времени", en: "To create a time delay" },
      {
        uz: "Kontaktlar tebranishini kamaytirish uchun inersiyani oshirish",
        ru: "Для увеличения инерции и уменьшения вибрации контактов",
        en: "To add inertia and damp contact chatter",
      },
      { uz: "Kuchlanishni to'g'rilash", ru: "Для выпрямления напряжения", en: "To rectify the voltage" },
      { uz: "Bayroqchani tushirish", ru: "Для сброса флажка", en: "To drop the flag" },
    ],
    e: {
      uz: "Kvars qumi bilan to'ldirilgan baraban harakatlanuvchi tizim inersiyasini oshirib, kontakt tebranishini so'ndiradi (9-ma'ruza).",
      ru: "Барабан, заполненный кварцевым песком, увеличивает инерцию подвижной системы и гасит вибрацию контактов (лекция 9).",
      en: "The quartz-sand-filled drum increases the moving system's inertia and damps contact vibration (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RN-53 va RN-54 relelari orasidagi asosiy farq nimada?",
      ru: "В чём основное различие реле РН-53 и РН-54?",
      en: "What is the main difference between the RN-53 and RN-54 relays?",
    },
    o: [
      { uz: "Konstruksiyasida", ru: "В конструкции", en: "In their construction" },
      {
        uz: "O'rnatmalarni rostlash va shkala darajasida",
        ru: "В регулировке уставок и градуировке шкалы",
        en: "In the setting adjustment and scale graduation",
      },
      { uz: "Chulg'am sonida", ru: "В числе обмоток", en: "In the number of coils" },
      { uz: "Kontakt sonida", ru: "В числе контактов", en: "In the number of contacts" },
    ],
    e: {
      uz: "RN-54 konstruksiyasi va ichki sxemasi RN-53 bilan bir xil; farq faqat o'rnatmalarni rostlash va shkala darajasida (9-ma'ruza).",
      ru: "Конструкция и внутренняя схема РН-54 те же, что у РН-53; различие только в регулировке уставок и шкале (лекция 9).",
      en: "The RN-54's design and internal circuit match the RN-53; only the setting adjustment and scale differ (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RN-54 relesining qaytish koeffitsienti qanday bo'ladi?",
      ru: "Каким будет коэффициент возврата реле РН-54?",
      en: "What is the reset ratio of the RN-54 relay?",
    },
    o: [
      { uz: "0,8 dan kam", ru: "Менее 0,8", en: "Below 0.8" },
      { uz: "Birdan katta (1,25 dan oshmaydi)", ru: "Больше единицы (не более 1,25)", en: "Greater than one (not above 1.25)" },
      { uz: "Har doim 1 ga teng", ru: "Всегда равен 1", en: "Always exactly 1" },
      { uz: "0,7 ga teng", ru: "Равен 0,7", en: "Equal to 0.7" },
    ],
    e: {
      uz: "Minimal kuchlanish relesi bo'lgani uchun kqay = Uq/Uri birdan katta bo'ladi va 1,25 dan oshmaydi (9-ma'ruza).",
      ru: "Как минимальное реле напряжения, kв = Uв/Uс.р больше единицы и не превышает 1,25 (лекция 9).",
      en: "As an undervoltage relay its reset ratio exceeds one and does not go above 1.25 (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RN-53 da to'g'rilagich ko'prik nima uchun qo'llaniladi?",
      ru: "Для чего в РН-53 применяется выпрямительный мост?",
      en: "Why is a rectifier bridge used in the RN-53?",
    },
    o: [
      { uz: "Tokni oshirish uchun", ru: "Для увеличения тока", en: "To increase the current" },
      {
        uz: "Elektromagnit temiridan to'liqroq foydalanish va kuchliroq prujina qo'yish uchun",
        ru: "Чтобы полнее использовать сталь электромагнита и поставить более сильную пружину",
        en: "To use the electromagnet iron more fully and fit a stronger spring",
      },
      { uz: "Kontaktlarni sovutish uchun", ru: "Для охлаждения контактов", en: "To cool the contacts" },
      { uz: "Sabr vaqtini hosil qilish uchun", ru: "Для создания выдержки", en: "To create a delay" },
    ],
    e: {
      uz: "To'g'rilagich orqali ulash elektromagnit temiridan to'liqroq foydalanishga va kuchliroq qarshi ta'sir etuvchi prujina qo'yishga imkon berdi (9-ma'ruza).",
      ru: "Включение через выпрямитель позволило полнее использовать сталь электромагнита и поставить более сильную противодействующую пружину (лекция 9).",
      en: "Connecting through the rectifier allowed fuller use of the iron and a stronger restraining spring (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "400 V nominal kuchlanishli RN-53 da kondensator nima vazifani bajaradi?",
      ru: "Какую роль выполняет конденсатор в РН-53 на номинальное напряжение 400 В?",
      en: "What does the capacitor do in a 400 V RN-53?",
    },
    o: [
      { uz: "Sabr vaqti hosil qiladi", ru: "Создаёт выдержку времени", en: "It creates a time delay" },
      {
        uz: "Chulg'amni shuntlab, diodlarni teskari kuchlanishdan saqlaydi",
        ru: "Шунтирует обмотку и защищает диоды от обратного напряжения",
        en: "It shunts the coil and protects the diodes from reverse voltage",
      },
      { uz: "Tokni to'g'rilaydi", ru: "Выпрямляет ток", en: "It rectifies the current" },
      { uz: "Kuchlanishni oshiradi", ru: "Повышает напряжение", en: "It raises the voltage" },
    ],
    e: {
      uz: "Diodlarning buzilish xavfini bartaraf qilish uchun rele chulg'ami kichik kondensator orqali shuntlanadi (9-ma'ruza).",
      ru: "Для устранения опасности пробоя диодов обмотка реле шунтируется небольшим конденсатором (лекция 9).",
      en: "To remove the risk of diode breakdown, the coil is shunted by a small capacitor (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RT-40 relesining asosiy chegaraviy xatoligi Iri bo'yicha qancha?",
      ru: "Какова основная предельная погрешность РТ-40 по параметру Iс.р?",
      en: "What is the RT-40's basic limiting error on the pickup current?",
    },
    o: [
      { uz: "1 % dan katta emas", ru: "Не более 1 %", en: "Not more than 1 %" },
      { uz: "5 % dan katta emas", ru: "Не более 5 %", en: "Not more than 5 %" },
      { uz: "10 % dan katta emas", ru: "Не более 10 %", en: "Not more than 10 %" },
      { uz: "20 %", ru: "20 %", en: "20 %" },
    ],
    e: {
      uz: "Iri parametri bo'yicha asosiy chegaraviy xatolik 5 % dan katta emas; tarqalish har qanday o'rnatmada 4 % dan ko'p emas (9-ma'ruza).",
      ru: "Основная предельная погрешность по Iс.р не более 5 %; разброс на любой уставке не более 4 % (лекция 9).",
      en: "The basic limiting error is not above 5 %; the spread at any setting is within 4 % (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 1,
    q: {
      uz: "RN-53 da Uri parametri bo'yicha asosiy chegaraviy xatolik qancha?",
      ru: "Какова основная предельная погрешность РН-53 по параметру Uс.р?",
      en: "What is the RN-53's basic limiting error on the pickup voltage?",
    },
    o: [
      { uz: "5 %", ru: "5 %", en: "5 %" },
      { uz: "10 % dan katta emas", ru: "Не более 10 %", en: "Not more than 10 %" },
      { uz: "15 %", ru: "15 %", en: "15 %" },
      { uz: "20 %", ru: "20 %", en: "20 %" },
    ],
    e: {
      uz: "RN-53 uchun Uri bo'yicha asosiy chegaraviy xatolik 10 % dan katta emas (9-ma'ruza).",
      ru: "Для РН-53 основная предельная погрешность по Uс.р не более 10 % (лекция 9).",
      en: "For the RN-53 the basic limiting error on pickup voltage is within 10 % (lecture 9).",
    },
  },
  {
    l: 9, type: "tf", a: true,
    q: {
      uz: "RT-40 relesida ikkita chulg'am mavjud va ular ketma-ket yoki parallel ulanishi mumkin.",
      ru: "В реле РТ-40 есть две обмотки, которые можно включать последовательно или параллельно.",
      en: "The RT-40 has two coils that can be connected in series or in parallel.",
    },
    e: {
      uz: "P shaklidagi elektromagnitda ketma-ket yoki parallel ulanadigan ikkita chulg'am bor (9-ma'ruza).",
      ru: "На П-образном электромагните расположены две обмотки, соединяемые последовательно или параллельно (лекция 9).",
      en: "The U-shaped electromagnet carries two coils wired in series or parallel (lecture 9).",
    },
  },
  {
    l: 9, type: "mcq", a: 2,
    q: {
      uz: "RT40/6 relesining o'rnatma oralig'i (ketma-ket ulanishda) qanday?",
      ru: "Каков диапазон уставок реле РТ40/6 при последовательном соединении?",
      en: "What is the RT40/6 setting range with the coils in series?",
    },
    o: [
      { uz: "0,05-0,2 A", ru: "0,05-0,2 А", en: "0.05-0.2 A" },
      { uz: "0,5-2 A", ru: "0,5-2 А", en: "0.5-2 A" },
      { uz: "1,5-6 A", ru: "1,5-6 А", en: "1.5-6 A" },
      { uz: "5-20 A", ru: "5-20 А", en: "5-20 A" },
    ],
    e: {
      uz: "9.1-jadval: RT40/6 uchun o'rnatma oralig'i 1,5-6 A (9-ma'ruza).",
      ru: "Табл. 9.1: диапазон уставок РТ40/6 составляет 1,5-6 А (лекция 9).",
      en: "Table 9.1: the RT40/6 setting range is 1.5-6 A (lecture 9).",
    },
  },
  {
    l: 9, type: "match",
    q: {
      uz: "Rele turini vazifasi bilan moslashtiring:",
      ru: "Сопоставьте тип реле с его назначением:",
      en: "Match each relay type with its purpose:",
    },
    pairs: [
      [
        { uz: "RT-40", ru: "РТ-40", en: "RT-40" },
        { uz: "Maksimal tok relesi", ru: "Максимальное реле тока", en: "Overcurrent relay" },
      ],
      [
        { uz: "RN-53", ru: "РН-53", en: "RN-53" },
        { uz: "Maksimal kuchlanish relesi", ru: "Максимальное реле напряжения", en: "Overvoltage relay" },
      ],
      [
        { uz: "RN-54", ru: "РН-54", en: "RN-54" },
        { uz: "Minimal kuchlanish relesi", ru: "Минимальное реле напряжения", en: "Undervoltage relay" },
      ],
    ],
    e: {
      uz: "9-ma'ruzadagi relelar.",
      ru: "Реле из лекции 9.",
      en: "The relays of lecture 9.",
    },
  },

  /* ================= 10-MA'RUZA ================= */
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Oraliq relening asosiy vazifasi nima?",
      ru: "Каково основное назначение промежуточного реле?",
      en: "What is the main purpose of an auxiliary relay?",
    },
    o: [
      { uz: "Vaqt kechikishini hosil qilish", ru: "Создание выдержки времени", en: "Creating a time delay" },
      {
        uz: "Bir vaqtda bir necha zanjirni qo'shish/ajratish va katta tokli zanjirlarni kommutatsiya qilish",
        ru: "Одновременное замыкание/размыкание нескольких цепей и коммутация цепей с большим током",
        en: "Making and breaking several circuits at once and switching high-current circuits",
      },
      { uz: "Tokni o'lchash", ru: "Измерение тока", en: "Measuring current" },
      { uz: "Bayroqcha tushirish", ru: "Сброс флажка", en: "Dropping a flag" },
    ],
    e: {
      uz: "Oraliq relelari qaytaruvchi rele singari bir necha zanjirni qo'shish-ajratish va katta tokli zanjirlarni kommutatsiya qilishda ishlatiladi (10-ma'ruza).",
      ru: "Промежуточные реле применяются как реле-повторители для замыкания/размыкания нескольких цепей и коммутации больших токов (лекция 10).",
      en: "Auxiliary relays act as repeaters, making and breaking several circuits and switching large currents (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Oraliq rele kuchlanish pasayganda ham ishonchli ishlashi kerak bo'lgan chegaralar qanday?",
      ru: "При каком снижении напряжения промежуточное реле должно надёжно работать?",
      en: "Down to what voltage must an auxiliary relay still operate reliably?",
    },
    o: [
      { uz: "0,5Unom va 0,6Unom", ru: "0,5Uном и 0,6Uном", en: "0.5 and 0.6 of rated" },
      {
        uz: "0,8Unom (o'zgarmas) va 0,85Unom (o'zgaruvchan)",
        ru: "0,8Uном (постоянный) и 0,85Uном (переменный)",
        en: "0.8 of rated (DC) and 0.85 of rated (AC)",
      },
      { uz: "0,9Unom va 0,95Unom", ru: "0,9Uном и 0,95Uном", en: "0.9 and 0.95 of rated" },
      { uz: "Faqat Unom da", ru: "Только при Uном", en: "Only at rated" },
    ],
    e: {
      uz: "O'zgarmas tok relesida 0,8Unom, o'zgaruvchan tok relesida 0,85Unom gacha tushganda ham ishonchli ishlashi kerak (10-ma'ruza).",
      ru: "Реле постоянного тока должно работать при снижении до 0,8Uном, переменного — до 0,85Uном (лекция 10).",
      en: "A DC relay must work down to 0.8 of rated and an AC relay down to 0.85 (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "RP-23 turidagi relening ishlash vaqti taxminan qancha?",
      ru: "Каково примерно время действия реле типа РП-23?",
      en: "Roughly what is the operating time of an RP-23 relay?",
    },
    o: [
      { uz: "0,01 s", ru: "0,01 с", en: "0.01 s" },
      { uz: "0,06 s", ru: "0,06 с", en: "0.06 s" },
      { uz: "0,1 s", ru: "0,1 с", en: "0.1 s" },
      { uz: "0,5 s", ru: "0,5 с", en: "0.5 s" },
    ],
    e: {
      uz: "Ushbu turdagi relelarning ishlash vaqti taxminan 0,06 s ni tashkil qiladi (10-ma'ruza).",
      ru: "Время действия реле этого типа составляет около 0,06 с (лекция 10).",
      en: "Relays of this type operate in about 0.06 s (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "RP-251 relesining ishlashdagi sabr vaqti qancha?",
      ru: "Какова выдержка времени реле РП-251 при срабатывании?",
      en: "What is the RP-251's delay on pickup?",
    },
    o: [
      { uz: "0,01-0,02 s", ru: "0,01-0,02 с", en: "0.01-0.02 s" },
      { uz: "0,07-0,11 s", ru: "0,07-0,11 с", en: "0.07-0.11 s" },
      { uz: "0,15-0,2 s", ru: "0,15-0,2 с", en: "0.15-0.2 s" },
      { uz: "0,5-1 s", ru: "0,5-1 с", en: "0.5-1 s" },
    ],
    e: {
      uz: "Ko'p tarqalgan RP-251 turidagi relening ishlagandagi sabr vaqti 0,07-0,11 s ni tashkil qiladi (10-ma'ruza).",
      ru: "Выдержка распространённого реле РП-251 при срабатывании составляет 0,07-0,11 с (лекция 10).",
      en: "The widely used RP-251 has a pickup delay of 0.07-0.11 s (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Sekin ishlovchi oraliq relesida sekinlik qanday ta'minlanadi?",
      ru: "Чем обеспечивается замедление в замедленном промежуточном реле?",
      en: "How is the delay achieved in a time-delayed auxiliary relay?",
    },
    o: [
      { uz: "Soat mexanizmi bilan", ru: "Часовым механизмом", en: "By a clockwork mechanism" },
      {
        uz: "Magnit o'tkazgichdagi qisqa tutashtirilgan kontur (misli gilza) bilan",
        ru: "Короткозамкнутым контуром (медной гильзой) на магнитопроводе",
        en: "By a short-circuited loop (copper sleeve) on the core",
      },
      { uz: "Qo'shimcha qarshilik bilan", ru: "Добавочным сопротивлением", en: "By a series resistor" },
      { uz: "Kondensator bilan", ru: "Конденсатором", en: "By a capacitor" },
    ],
    e: {
      uz: "Qisqa tutashtirilgan konturdagi I2 tok asosiy chulg'amdagi tok o'sishiga qarshilik ko'rsatadi (10-ma'ruza).",
      ru: "Ток I2 в короткозамкнутом контуре противодействует нарастанию тока в основной обмотке (лекция 10).",
      en: "The current in the short-circuited loop opposes the rise of current in the main coil (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Ko'rsatgich relesi nima uchun xizmat qiladi?",
      ru: "Для чего служит указательное реле?",
      en: "What is an indicating relay for?",
    },
    o: [
      { uz: "Sabr vaqtini hosil qilish", ru: "Для создания выдержки времени", en: "To create a delay" },
      {
        uz: "RH yoki uning qismi ishlaganini qayd qilish",
        ru: "Для фиксации срабатывания РЗ или её части",
        en: "To record that the protection or part of it has operated",
      },
      { uz: "Tokni cheklash", ru: "Для ограничения тока", en: "To limit current" },
      { uz: "Kuchlanishni o'lchash", ru: "Для измерения напряжения", en: "To measure voltage" },
    ],
    e: {
      uz: "Ko'rsatgich relesi RH ning butun yoki strukturaviy qismi ishlaganini qayd qilish uchun xizmat qiladi (10-ma'ruza).",
      ru: "Указательное реле служит для фиксации срабатывания всей РЗ или её структурной части (лекция 10).",
      en: "The indicating relay records operation of the whole protection or one of its parts (lecture 10).",
    },
  },
  {
    l: 10, type: "tf", a: true,
    q: {
      uz: "Ko'rsatgich relesining bayroqchasi xodim uni qaytarmaguncha tushgan holatda qoladi.",
      ru: "Флажок указательного реле остаётся выпавшим, пока персонал не вернёт его.",
      en: "The flag of an indicating relay stays dropped until staff reset it.",
    },
    e: {
      uz: "Bayroqcha va rele kontaktlari xizmat ko'rsatuvchi personal qaytarmaguncha ishlagan holatda qoladi; qaytarish 10-knopka bilan bajariladi (10-ma'ruza).",
      ru: "Флажок и контакты реле остаются в сработавшем положении, пока персонал не вернёт их кнопкой 10 (лекция 10).",
      en: "The flag and contacts stay in the operated position until staff reset them with pushbutton 10 (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Vaqt relesining sabr vaqti deb nimaga aytiladi?",
      ru: "Что называют выдержкой времени реле времени?",
      en: "What is called the time relay's delay?",
    },
    o: [
      { uz: "Kontaktlarning ochilish vaqtiga", ru: "Время размыкания контактов", en: "The contact opening time" },
      {
        uz: "Chulg'amga kuchlanish berilgandan kontaktlar tutashguncha o'tgan vaqtga",
        ru: "Время от подачи напряжения на обмотку до замыкания контактов",
        en: "The time from energising the coil until the contacts close",
      },
      { uz: "O'chirgichning uzish vaqtiga", ru: "Время отключения выключателя", en: "The breaker interrupting time" },
      { uz: "QT ning davom etish vaqtiga", ru: "Длительность КЗ", en: "The fault duration" },
    ],
    e: {
      uz: "Sabr vaqti — rele chulg'amiga kuchlanish berilgandan to kontaktlari tutashguncha ketadigan vaqt (10-ma'ruza).",
      ru: "Выдержка времени — время от подачи напряжения на обмотку до замыкания контактов (лекция 10).",
      en: "The delay is the interval from coil energisation to contact closure (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "3,5 s shkalali vaqt relesida vaqt bo'yicha xatolik qancha bo'lishi kerak?",
      ru: "Какой должна быть погрешность по времени у реле со шкалой 3,5 с?",
      en: "What must the time error be for a relay with a 3.5 s scale?",
    },
    o: [
      { uz: "±0,01 s", ru: "±0,01 с", en: "±0.01 s" },
      { uz: "±0,06 s dan oshmasligi", ru: "Не более ±0,06 с", en: "Not more than ±0.06 s" },
      { uz: "±0,25 s", ru: "±0,25 с", en: "±0.25 s" },
      { uz: "±1 s", ru: "±1 с", en: "±1 s" },
    ],
    e: {
      uz: "3,5 s shkalali relelarda ±0,06 s dan, 20-30 s shkalalilarda ±0,25 s dan oshmaydi (10-ma'ruza).",
      ru: "У реле со шкалой 3,5 с — не более ±0,06 с, со шкалой 20-30 с — не более ±0,25 с (лекция 10).",
      en: "For a 3.5 s scale it is within ±0.06 s; for a 20-30 s scale, within ±0.25 s (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "Vaqt relesi zanjiridagi Rd qo'shimcha qarshilik qachon ishga kiradi?",
      ru: "Когда добавочное сопротивление Rд вводится в цепь реле времени?",
      en: "When does the series resistor Rd enter the time-relay circuit?",
    },
    o: [
      { uz: "Doim ulangan", ru: "Включено всегда", en: "It is always in circuit" },
      {
        uz: "Rele ishlagandan keyin, KT.1 oniy kontakt ajralganda",
        ru: "После срабатывания реле, когда размыкается мгновенный контакт KT.1",
        en: "After the relay operates, when the instantaneous KT.1 contact opens",
      },
      { uz: "Faqat QT da", ru: "Только при КЗ", en: "Only during a fault" },
      { uz: "Hech qachon", ru: "Никогда", en: "Never" },
    ],
    e: {
      uz: "Normal holatda Rd KT.1 ajraluvchi oniy kontakt bilan shuntlangan; rele ishlagandan keyin kontakt ajraladi va qarshilik zanjirga kiritiladi (10-ma'ruza).",
      ru: "В нормальном состоянии Rд шунтировано размыкающим мгновенным контактом KT.1; после срабатывания контакт размыкается и сопротивление вводится (лекция 10).",
      en: "Normally Rd is shunted by the instantaneous break contact KT.1; after operation that contact opens and the resistor is inserted (lecture 10).",
    },
  },
  {
    l: 10, type: "mcq", a: 1,
    q: {
      uz: "RV-200 relesida soat mexanizmining bir tekis harakati nima bilan ta'minlanadi?",
      ru: "Чем обеспечивается равномерный ход часового механизма в реле РВ-200?",
      en: "What keeps the clockwork running evenly in the RV-200?",
    },
    o: [
      { uz: "Friksion mexanizm", ru: "Фрикционный механизм", en: "The friction clutch" },
      { uz: "Ankerli mexanizm", ru: "Анкерный механизм", en: "The escapement" },
      { uz: "Qaytaruvchi prujina", ru: "Возвратная пружина", en: "The return spring" },
      { uz: "Tishli sektor", ru: "Зубчатый сектор", en: "The toothed sector" },
    ],
    e: {
      uz: "Soat mexanizmining bir tekis harakatlanishi ankerli mexanizm (20) yordamida ta'minlanadi, tezligi yukchalar holati bilan sozlanadi (10-ma'ruza).",
      ru: "Равномерный ход обеспечивается анкерным механизмом (20), скорость регулируется положением грузиков (лекция 10).",
      en: "The escapement (20) keeps the movement even; its speed is set by the weights (lecture 10).",
    },
  },
  {
    l: 10, type: "match",
    q: {
      uz: "Mantiqiy relelarni vazifasi bilan moslashtiring:",
      ru: "Сопоставьте логические реле с их назначением:",
      en: "Match the logic relays with their purpose:",
    },
    pairs: [
      [
        { uz: "KL", ru: "KL", en: "KL" },
        { uz: "Oraliq rele", ru: "Промежуточное реле", en: "Auxiliary relay" },
      ],
      [
        { uz: "KH", ru: "KH", en: "KH" },
        { uz: "Ko'rsatgich (signal) relesi", ru: "Указательное (сигнальное) реле", en: "Indicating (flag) relay" },
      ],
      [
        { uz: "KT", ru: "KT", en: "KT" },
        { uz: "Vaqt relesi", ru: "Реле времени", en: "Time relay" },
      ],
    ],
    e: {
      uz: "10-ma'ruzadagi mantiqiy relelar.",
      ru: "Логические реле из лекции 10.",
      en: "The logic relays of lecture 10.",
    },
  },

  /* ================= 11-MA'RUZA ================= */
  {
    l: 11, type: "mcq", a: 2,
    q: {
      uz: "Mikroprotsessorli himoyaning o'lchov elementlarining qaytish koeffitsienti qancha?",
      ru: "Каков коэффициент возврата измерительных элементов микропроцессорной защиты?",
      en: "What is the reset ratio of microprocessor protection measuring elements?",
    },
    o: [
      { uz: "0,7-0,8", ru: "0,7-0,8", en: "0.7-0.8" },
      { uz: "0,85-0,9", ru: "0,85-0,9", en: "0.85-0.9" },
      { uz: "0,96-0,97", ru: "0,96-0,97", en: "0.96-0.97" },
      { uz: "1,0", ru: "1,0", en: "1.0" },
    ],
    e: {
      uz: "MP himoyada o'lchov elementlarining qaytish koeffitsienti 0,96-0,97 ni tashkil qiladi (11-ma'ruza).",
      ru: "В МП защите коэффициент возврата измерительных элементов составляет 0,96-0,97 (лекция 11).",
      en: "In microprocessor protection the reset ratio is 0.96-0.97 (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 0,
    q: {
      uz: "MP qurilma TT va KT dan qancha quvvat iste'mol qiladi?",
      ru: "Какую мощность МП устройство потребляет от ТТ и ТН?",
      en: "What burden does a microprocessor device impose on CTs and VTs?",
    },
    o: [
      { uz: "0,1-0,5 VA", ru: "0,1-0,5 ВА", en: "0.1-0.5 VA" },
      { uz: "6 Vt", ru: "6 Вт", en: "6 W" },
      { uz: "10 VA", ru: "10 ВА", en: "10 VA" },
      { uz: "20-30 Vt", ru: "20-30 Вт", en: "20-30 W" },
    ],
    e: {
      uz: "Tok va kuchlanish o'lchov transformatorlaridan iste'mol qilinadigan quvvat 0,1-0,5 VA darajasida (11-ma'ruza).",
      ru: "Потребляемая от измерительных трансформаторов мощность составляет 0,1-0,5 ВА (лекция 11).",
      en: "The power drawn from the instrument transformers is 0.1-0.5 VA (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "Mantiqiy YoKI elementi rele sxemasida qanday ulanishga mos keladi?",
      ru: "Какому соединению в релейной схеме соответствует логический элемент ИЛИ?",
      en: "Which relay-circuit connection corresponds to the OR gate?",
    },
    o: [
      { uz: "Ketma-ket", ru: "Последовательному", en: "Series" },
      { uz: "Parallel", ru: "Параллельному", en: "Parallel" },
      { uz: "Aralash", ru: "Смешанному", en: "Mixed" },
      { uz: "Uchburchak", ru: "Треугольнику", en: "Delta" },
    ],
    e: {
      uz: "Mantiqiy YoKI (mantiqiy qo'shish) parallel ulanish sxemasi bo'yicha amalga oshiriladi (11-ma'ruza).",
      ru: "Логическое ИЛИ (логическое сложение) реализуется по схеме параллельного соединения (лекция 11).",
      en: "Logical OR (logical addition) is realised by a parallel connection (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "Mantiqiy VA elementi rele sxemasida qanday ulanishga mos keladi?",
      ru: "Какому соединению соответствует логический элемент И?",
      en: "Which connection corresponds to the AND gate?",
    },
    o: [
      { uz: "Parallel", ru: "Параллельному", en: "Parallel" },
      { uz: "Ketma-ket", ru: "Последовательному", en: "Series" },
      { uz: "Yulduz", ru: "Звезде", en: "Star" },
      { uz: "Uchburchak", ru: "Треугольнику", en: "Delta" },
    ],
    e: {
      uz: "Mantiqiy VA (mantiqiy ko'paytirish) ketma-ket ulangan signallarni qayta ishlashdir (11-ma'ruza).",
      ru: "Логическое И (логическое умножение) — это обработка последовательно соединённых сигналов (лекция 11).",
      en: "Logical AND (logical multiplication) processes signals connected in series (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "EMAS elementi sxemalarda ko'pincha qanday belgilanadi?",
      ru: "Как чаще всего обозначают элемент НЕ на схемах?",
      en: "How is the NOT gate most often shown on diagrams?",
    },
    o: [
      { uz: "Kvadrat bilan", ru: "Квадратом", en: "By a square" },
      { uz: "Kirish yoki chiqishdagi doira bilan", ru: "Кружком на входе или выходе", en: "By a circle at an input or output" },
      { uz: "Uchburchak bilan", ru: "Треугольником", en: "By a triangle" },
      { uz: "Yulduzcha bilan", ru: "Звёздочкой", en: "By an asterisk" },
    ],
    e: {
      uz: "EMAS elementining qisqartirilgan belgilanishi kirish yoki chiqishdagi doira ko'rinishida beriladi (11-ma'ruza).",
      ru: "Сокращённое обозначение элемента НЕ — кружок на входе или выходе (лекция 11).",
      en: "The shorthand for NOT is a circle at an input or output (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 2,
    q: {
      uz: "RS-triggerning S va R kirishlariga 0 berilsa chiqish qanday bo'ladi?",
      ru: "Каким будет выход RS-триггера, если на входы S и R подан 0?",
      en: "What is the RS flip-flop output when both S and R are 0?",
    },
    o: [
      { uz: "Har doim 0", ru: "Всегда 0", en: "Always 0" },
      { uz: "Har doim 1", ru: "Всегда 1", en: "Always 1" },
      { uz: "Avvalgi holatini saqlaydi", ru: "Сохраняет прежнее состояние", en: "It holds its previous state" },
      { uz: "Aniqlanmagan", ru: "Не определён", en: "Undefined" },
    ],
    e: {
      uz: "S va R kirishlariga signal berilmasa, triggerning chiqishi avvalgi holatini saqlab qoladi (11-ma'ruza).",
      ru: "Если на входы S и R сигнал не подан, выход триггера сохраняет прежнее состояние (лекция 11).",
      en: "With no signal on S or R, the flip-flop output retains its previous state (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "«R ustuvorligi bilan» triggerda ikkala kirishga 1 berilsa chiqish qanday bo'ladi?",
      ru: "Каким будет выход триггера «с приоритетом R», если на оба входа подана 1?",
      en: "In an R-priority flip-flop, what is the output when both inputs are 1?",
    },
    o: [
      { uz: "1", ru: "1", en: "1" },
      { uz: "0", ru: "0", en: "0" },
      { uz: "Oldingi holat", ru: "Прежнее состояние", en: "The previous state" },
      { uz: "Tebranadi", ru: "Колеблется", en: "It oscillates" },
    ],
    e: {
      uz: "KL1 va KL2 kirishlarida mantiqiy 1 bo'lsa, chiqish mantiqiy 0 bo'ladi (11-ma'ruza).",
      ru: "Если на входах KL1 и KL2 логическая 1, на выходе будет логический 0 (лекция 11).",
      en: "With logic 1 on both KL1 and KL2, the output is logic 0 (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "Multiplekserning vazifasi nima?",
      ru: "Каково назначение мультиплексора?",
      en: "What is the multiplexer for?",
    },
    o: [
      { uz: "Signalni kuchaytirish", ru: "Усиление сигнала", en: "Amplifying the signal" },
      {
        uz: "Boshqariladigan signallarni navbat bilan ASP kirishiga uzatish",
        ru: "Поочерёдная подача контролируемых сигналов на вход АЦП",
        en: "Feeding the monitored signals to the ADC input in turn",
      },
      { uz: "Kuchlanishni barqarorlashtirish", ru: "Стабилизация напряжения", en: "Stabilising the voltage" },
      { uz: "Galvanik ajratish", ru: "Гальваническая развязка", en: "Galvanic isolation" },
    ],
    e: {
      uz: "Multiplekser — bir nechta kanal uchun bitta ASP dan foydalanish imkonini beruvchi elektron kommutator (11-ma'ruza).",
      ru: "Мультиплексор — электронный коммутатор, позволяющий использовать один АЦП для нескольких каналов (лекция 11).",
      en: "The multiplexer is an electronic switch letting one ADC serve several channels (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 1,
    q: {
      uz: "Kirish o'zgartkichlari qanday turlarga bo'linadi?",
      ru: "На какие виды делятся входные преобразователи?",
      en: "Into what types are input converters divided?",
    },
    o: [
      { uz: "Katta va kichik", ru: "Большие и малые", en: "Large and small" },
      {
        uz: "Analogli (U3, U4) va mantiqiy (U1, U2)",
        ru: "Аналоговые (U3, U4) и логические (U1, U2)",
        en: "Analogue (U3, U4) and logic (U1, U2)",
      },
      { uz: "Tokli va kuchlanishli", ru: "Токовые и напряжения", en: "Current and voltage" },
      { uz: "Ichki va tashqi", ru: "Внутренние и внешние", en: "Internal and external" },
    ],
    e: {
      uz: "Kirish signallarini o'zgartkichlarining analogli va mantiqiy turlari mavjud (11-ma'ruza).",
      ru: "Существуют аналоговые и логические преобразователи входных сигналов (лекция 11).",
      en: "Input signal converters come in analogue and logic types (lecture 11).",
    },
  },
  {
    l: 11, type: "tf", a: true,
    q: {
      uz: "Mikroprotsessorli rele himoyasi qurilmalarida oraliq relelar va relelar orasida elektr bog'lanish mavjud emas.",
      ru: "В микропроцессорных устройствах РЗ нет промежуточных реле и электрических связей между реле.",
      en: "Microprocessor protection devices have no auxiliary relays and no electrical links between relays.",
    },
    e: {
      uz: "Butun jarayon qurilma protsessorida dastur sifatida amalga oshiriladi (11-ma'ruza).",
      ru: "Весь процесс реализуется программно в процессоре устройства (лекция 11).",
      en: "The whole process is implemented as software in the device processor (lecture 11).",
    },
  },
  {
    l: 11, type: "mcq", a: 2,
    q: {
      uz: "Uchta kirishli VA elementining chiqishida inversiya bo'lsa, u qanday ataladi?",
      ru: "Как называется элемент И с тремя входами и инверсией на выходе?",
      en: "What is a three-input AND gate with an inverted output called?",
    },
    o: [
      { uz: "3-VA", ru: "3-И", en: "3-AND" },
      { uz: "EMAS-3-VA", ru: "НЕ-3-И", en: "NOT-3-AND" },
      { uz: "3-VA-EMAS", ru: "3-И-НЕ", en: "3-AND-NOT" },
      { uz: "3-YoKI", ru: "3-ИЛИ", en: "3-OR" },
    ],
    e: {
      uz: "Inversiya chiqishda bo'lsa nom oxiriga EMAS qo'shiladi: 3-VA-EMAS (11-ma'ruza).",
      ru: "Если инверсия на выходе, НЕ ставится в конец имени: 3-И-НЕ (лекция 11).",
      en: "With an inverted output, NOT goes at the end of the name: 3-AND-NOT (lecture 11).",
    },
  },
  {
    l: 11, type: "match",
    q: {
      uz: "Mantiqiy elementni tavsifi bilan moslashtiring:",
      ru: "Сопоставьте логический элемент с его описанием:",
      en: "Match each logic gate with its description:",
    },
    pairs: [
      [
        { uz: "YoKI", ru: "ИЛИ", en: "OR" },
        {
          uz: "Mantiqiy qo'shish, parallel ulanish",
          ru: "Логическое сложение, параллельное соединение",
          en: "Logical addition, parallel connection",
        },
      ],
      [
        { uz: "VA", ru: "И", en: "AND" },
        {
          uz: "Mantiqiy ko'paytirish, ketma-ket ulanish",
          ru: "Логическое умножение, последовательное соединение",
          en: "Logical multiplication, series connection",
        },
      ],
      [
        { uz: "EMAS", ru: "НЕ", en: "NOT" },
        { uz: "Inversiya", ru: "Инверсия", en: "Inversion" },
      ],
      [
        { uz: "RS-trigger", ru: "RS-триггер", en: "RS flip-flop" },
        {
          uz: "Elementar xotira yacheykasi",
          ru: "Элементарная ячейка памяти",
          en: "An elementary memory cell",
        },
      ],
    ],
    e: {
      uz: "11-ma'ruzadagi mantiqiy elementlar.",
      ru: "Логические элементы из лекции 11.",
      en: "The logic gates of lecture 11.",
    },
  },

  /* ================= 12-MA'RUZA ================= */
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "MTH ning selektivligi qanday ta'minlanadi?",
      ru: "Чем обеспечивается селективность МТЗ?",
      en: "How is OCP selectivity achieved?",
    },
    o: [
      { uz: "Ishlash tokini tanlash bilan", ru: "Выбором тока срабатывания", en: "By choosing the pickup current" },
      { uz: "Sabr vaqti orqali", ru: "Выдержкой времени", en: "By a time delay" },
      { uz: "Kuchlanish relesi bilan", ru: "Реле напряжения", en: "By a voltage relay" },
      { uz: "TT ni almashtirish bilan", ru: "Заменой ТТ", en: "By replacing the CT" },
    ],
    e: {
      uz: "MTH tanlovchan ishlashi sabr vaqti orqali, tokli kesimniki esa ishga tushish tokini tanlash bilan erishiladi (12-ma'ruza).",
      ru: "Селективность МТЗ достигается выдержкой времени, а токовой отсечки — выбором тока срабатывания (лекция 12).",
      en: "OCP achieves selectivity by time delay; the cut-off does so by its pickup current (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "MTH tarmoqda qayerga o'rnatiladi?",
      ru: "Где в сети устанавливается МТЗ?",
      en: "Where in the network is OCP installed?",
    },
    o: [
      { uz: "Liniyaning oxiriga", ru: "В конце линии", en: "At the end of the line" },
      {
        uz: "Har bir liniyaning boshiga, ta'minot manbasi tomonidan",
        ru: "В начале каждой линии, со стороны источника питания",
        en: "At the start of each line, on the source side",
      },
      { uz: "Iste'molchida", ru: "У потребителя", en: "At the consumer" },
      { uz: "Faqat nimstansiya shinasida", ru: "Только на шинах подстанции", en: "Only on the substation busbar" },
    ],
    e: {
      uz: "Bir tomonlama ta'minlanadigan tarmoqlarda MTH har bir liniyaning boshiga, manba tomonidan o'rnatiladi (12-ma'ruza).",
      ru: "В сетях с односторонним питанием МТЗ устанавливается в начале каждой линии со стороны источника (лекция 12).",
      en: "In singly-fed networks the OCP is installed at the start of each line on the source side (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "MTH sabr vaqtlari qanday tartibda oshib boradi?",
      ru: "В каком направлении возрастают выдержки времени МТЗ?",
      en: "In which direction do OCP time delays increase?",
    },
    o: [
      { uz: "Manbadan iste'molchi tomonga", ru: "От источника к потребителю", en: "From the source to the consumer" },
      {
        uz: "Iste'molchidan ta'minlash manbasi tomonga",
        ru: "От потребителя к источнику питания",
        en: "From the consumer towards the source",
      },
      { uz: "Tasodifiy", ru: "Произвольно", en: "Randomly" },
      { uz: "Barchasi teng", ru: "Все одинаковы", en: "They are all equal" },
    ],
    e: {
      uz: "Himoyaning sabr vaqti iste'molchidan ta'minlash manbasi tomonga oshib borish tartibida bajariladi (12-ma'ruza).",
      ru: "Выдержки защит возрастают от потребителя к источнику питания (лекция 12).",
      en: "The delays increase from the consumer towards the supply source (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "MTH strukturaviy sxemasida mantiqiy qism nimalardan iborat?",
      ru: "Из чего состоит логическая часть структурной схемы МТЗ?",
      en: "What does the logic part of the OCP block diagram contain?",
    },
    o: [
      { uz: "Faqat KA relelari", ru: "Только реле KA", en: "Only the KA relays" },
      {
        uz: "YoKI (DW) elementi, KT vaqt organi va signal relesi",
        ru: "Элемент ИЛИ (DW), орган времени KT и сигнальное реле",
        en: "The OR gate (DW), the KT timing element and the flag relay",
      },
      { uz: "Faqat KL", ru: "Только KL", en: "Only KL" },
      { uz: "TT va KT", ru: "ТТ и ТН", en: "The CT and VT" },
    ],
    e: {
      uz: "Mantiqiy qism DW (YoKI), KT vaqt organi va signal relesidan iborat (12-ma'ruza, 12.3-rasm).",
      ru: "Логическая часть состоит из DW (ИЛИ), органа времени KT и сигнального реле (лекция 12, рис. 12.3).",
      en: "The logic part consists of the OR gate DW, the KT timing element and the flag relay (lecture 12, fig. 12.3).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "MTH sxemasida KA relelarining kontaktlari qanday ulanadi?",
      ru: "Как соединяются контакты реле KA в схеме МТЗ?",
      en: "How are the KA relay contacts connected in the OCP scheme?",
    },
    o: [
      { uz: "Ketma-ket", ru: "Последовательно", en: "In series" },
      { uz: "Parallel (YoKI sxemasi bo'yicha)", ru: "Параллельно (по схеме ИЛИ)", en: "In parallel (as an OR)" },
      { uz: "Uchburchak", ru: "Треугольником", en: "In delta" },
      { uz: "Yulduz", ru: "Звездой", en: "In star" },
    ],
    e: {
      uz: "Barcha tok relelarining kontaktlari parallel ravishda ulangan, ya'ni YoKI sxemasiga muvofiq (12-ma'ruza).",
      ru: "Контакты всех реле тока соединены параллельно, то есть по схеме ИЛИ (лекция 12).",
      en: "All current relay contacts are paralleled, i.e. wired as an OR (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "Uch fazali MTH sxemalari qaerda qo'llaniladi?",
      ru: "Где применяются трёхфазные схемы МТЗ?",
      en: "Where are three-phase OCP schemes used?",
    },
    o: [
      {
        uz: "Neytrali izolyasiyalangan tarmoqlarda",
        ru: "В сетях с изолированной нейтралью",
        en: "In isolated-neutral networks",
      },
      {
        uz: "Neytrali yerga zaminlangan tarmoqlarda (110 kV va yuqori)",
        ru: "В сетях с заземлённой нейтралью (110 кВ и выше)",
        en: "In solidly earthed networks (110 kV and above)",
      },
      { uz: "Faqat 6 kV da", ru: "Только на 6 кВ", en: "Only at 6 kV" },
      { uz: "Faqat generatorlarda", ru: "Только на генераторах", en: "Only on generators" },
    ],
    e: {
      uz: "Uch fazali sxemalar barcha QT turlariga javob bergani uchun neytrali zaminlangan tarmoqlarda qo'llaniladi (12-ma'ruza).",
      ru: "Трёхфазные схемы реагируют на все виды КЗ, поэтому применяются в сетях с заземлённой нейтралью (лекция 12).",
      en: "Three-phase schemes respond to every fault type, so they are used in earthed networks (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "Ikkita releli ikki fazali sxemaning afzalligi nimada?",
      ru: "В чём преимущество двухфазной схемы с двумя реле?",
      en: "What is the advantage of the two-phase scheme with two relays?",
    },
    o: [
      { uz: "Bir fazali QT ni ham sezadi", ru: "Чувствует и однофазные КЗ", en: "It also detects single-phase faults" },
      {
        uz: "Barcha fazalararo QT ga javob beradi va uch fazali sxemaga nisbatan arzon",
        ru: "Реагирует на все междуфазные КЗ и дешевле трёхфазной схемы",
        en: "It covers all phase-to-phase faults and is cheaper than the three-phase scheme",
      },
      { uz: "Vaqt relesi kerak emas", ru: "Не нужно реле времени", en: "It needs no time relay" },
      { uz: "Sezgirligi eng yuqori", ru: "Наивысшая чувствительность", en: "It has the highest sensitivity" },
    ],
    e: {
      uz: "Liniyalardagi barcha fazalararo QT ga javob beradi va uchta rele o'rniga ikkita talab qiladi (12-ma'ruza).",
      ru: "Реагирует на все междуфазные КЗ линий и требует двух реле вместо трёх (лекция 12).",
      en: "It responds to all phase faults on lines and needs two relays instead of three (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "Bitta releli sxemaning jiddiy kamchiligi nima?",
      ru: "В чём серьёзный недостаток схемы с одним реле?",
      en: "What is the serious drawback of the single-relay scheme?",
    },
    o: [
      { uz: "Juda qimmat", ru: "Очень дорогая", en: "It is very expensive" },
      {
        uz: "Y/Δ transformator ortidagi QT da Ir = Ia − Ic = 0 bo'lib ishlamaydi",
        ru: "При КЗ за трансформатором Y/Δ Iр = Ia − Ic = 0 и защита не действует",
        en: "Beyond a Y/Δ transformer Ir = Ia − Ic = 0 and it fails to operate",
      },
      { uz: "Faqat K(3) ga ishlaydi", ru: "Работает только при К(3)", en: "It works only for three-phase faults" },
      { uz: "Vaqt relesi talab qiladi", ru: "Требует реле времени", en: "It requires a time relay" },
    ],
    e: {
      uz: "Transformator ortida Y/Δ chulg'amlar ulanganda himoya ta'sir qilmaydi, chunki Ir = 0 (12-ma'ruza).",
      ru: "За трансформатором с обмотками Y/Δ защита не действует, так как Iр = 0 (лекция 12).",
      en: "Beyond a Y/Δ-connected transformer the protection does not act because Ir = 0 (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "KA0 relesi nima uchun faza relelaridan sezgirroq?",
      ru: "Почему реле KA0 чувствительнее фазных реле?",
      en: "Why is the KA0 relay more sensitive than the phase relays?",
    },
    o: [
      { uz: "Chulg'ami ko'p", ru: "У него больше обмоток", en: "It has more coils" },
      {
        uz: "Iyuk.max yuklama tokidan sozlanmaydi",
        ru: "Оно не отстраивается от тока нагрузки Iнагр.max",
        en: "It is not set above the maximum load current",
      },
      { uz: "Kuchlanishga ulangan", ru: "Включено на напряжение", en: "It is connected to voltage" },
      { uz: "Vaqt relesi bor", ru: "Имеет реле времени", en: "It has a time relay" },
    ],
    e: {
      uz: "KA0 ni Iyukl.max yuklama tokidan sozlanmagani uchun sezgirligi fazadagi KA relelaridan yuqori (12-ma'ruza).",
      ru: "KA0 не отстраивается от Iнагр.max, поэтому его чувствительность выше, чем у фазных реле KA (лекция 12).",
      en: "KA0 is not set above the maximum load current, so it is more sensitive than the phase KA relays (lecture 12).",
    },
  },
  {
    l: 12, type: "tf", a: true,
    q: {
      uz: "RT-80 va RT-90 relelari bilan bajarilgan MTH sxemasida vaqt, oraliq va ko'rsatgich relelari ishtirok etmaydi.",
      ru: "В схеме МТЗ на реле РТ-80 и РТ-90 не участвуют реле времени, промежуточное и указательное.",
      en: "An OCP built on RT-80 and RT-90 relays uses no time, auxiliary or flag relays.",
    },
    e: {
      uz: "Bu relelar yetarli quvvatga ega kontakt va signal bayroqchasiga ega bo'lgani uchun (12-ma'ruza).",
      ru: "Эти реле имеют достаточно мощные контакты и собственный сигнальный флажок (лекция 12).",
      en: "These relays have sufficiently powerful contacts and their own flag (lecture 12).",
    },
  },
  {
    l: 12, type: "mcq", a: 1,
    q: {
      uz: "Ikki fazali sxema Y/Δ transformatordan keyingi ikki fazali QT da sezgirligi qanday?",
      ru: "Какова чувствительность двухфазной схемы при двухфазном КЗ за трансформатором Y/Δ?",
      en: "What is the two-phase scheme's sensitivity for a two-phase fault beyond a Y/Δ transformer?",
    },
    o: [
      { uz: "2 karra yuqori", ru: "В 2 раза выше", en: "Twice higher" },
      {
        uz: "Uch fazali sxemaga nisbatan 2 karra past",
        ru: "В 2 раза ниже, чем у трёхфазной схемы",
        en: "Half that of the three-phase scheme",
      },
      { uz: "Teng", ru: "Одинакова", en: "The same" },
      { uz: "3 karra past", ru: "В 3 раза ниже", en: "Three times lower" },
    ],
    e: {
      uz: "Ikki fazali himoya tok transformatori kam tokli fazada bo'lgani uchun uch fazaliga qaraganda 2 karra past sezgirlikka ega (12-ma'ruza).",
      ru: "У двухфазной защиты ТТ оказывается на фазе с меньшим током, поэтому её чувствительность вдвое ниже (лекция 12).",
      en: "In the two-phase scheme the CT sits on the phase with the smaller current, halving sensitivity (lecture 12).",
    },
  },
  {
    l: 12, type: "match",
    q: {
      uz: "MTH xarakteristikasini tavsifi bilan moslashtiring:",
      ru: "Сопоставьте характеристику МТЗ с её описанием:",
      en: "Match each OCP characteristic with its description:",
    },
    pairs: [
      [
        { uz: "Mustaqil", ru: "Независимая", en: "Definite-time" },
        { uz: "Vaqt tokka bog'liq emas", ru: "Время не зависит от тока", en: "Time does not depend on current" },
      ],
      [
        { uz: "Bog'liq", ru: "Зависимая", en: "Inverse-time" },
        { uz: "Vaqt tokka teskari bog'liq", ru: "Время обратно зависит от тока", en: "Time is inversely related to current" },
      ],
      [
        { uz: "Qisman bog'liq", ru: "Ограниченно зависимая", en: "Partially inverse" },
        {
          uz: "Kichik toklarda bog'liq, katta toklarda mustaqil",
          ru: "При малых токах зависимая, при больших независимая",
          en: "Inverse at low currents, definite at high currents",
        },
      ],
    ],
    e: {
      uz: "12.2-rasmdagi xarakteristikalar (12-ma'ruza).",
      ru: "Характеристики на рис. 12.2 (лекция 12).",
      en: "The characteristics of fig. 12.2 (lecture 12).",
    },
  },
];
