import type { Term } from "../../types";

/** 5-8 ma'ruzalar atamalari. */
export const PART2: Term[] = [
  /* ================= 5-MA'RUZA ================= */
  {
    id: "tt", l: 5, r: ["ta", "w1w2", "imag", "ki"],
    t: { uz: "TT", ru: "ТТ", en: "CT" },
    f: { uz: "Tok transformatori", ru: "Трансформатор тока", en: "Current transformer" },
    d: {
      uz: "Himoya obyekti tokining qiymati, fazasi va chastotasi haqidagi axborotni RH ga uzatuvchi yordamchi element. Birlamchi chulg'ami zanjirga ketma-ket ulanadi.",
      ru: "Вспомогательный элемент, передающий в РЗ сведения о величине, фазе и частоте тока защищаемого объекта. Первичная обмотка включается в цепь последовательно.",
      en: "An auxiliary element that conveys the magnitude, phase and frequency of the protected object's current to the protection. Its primary winding is connected in series with the circuit.",
    },
    u: { uz: "Barcha tokli himoyalarda", ru: "Во всех токовых защитах", en: "In all current protections" },
  },
  {
    id: "w1w2", l: 5, r: ["ki", "tt"],
    t: { uz: "w1, w2", ru: "w1, w2", en: "w1, w2" },
    f: {
      uz: "Birlamchi va ikkilamchi chulg'am o'ramlari",
      ru: "Витки первичной и вторичной обмоток",
      en: "Primary and secondary winding turns",
    },
    d: {
      uz: "TT ning chulg'am o'ramlar soni; ularning nisbati o'ramli transformatsiya koeffitsientini beradi.",
      ru: "Числа витков обмоток ТТ; их отношение даёт витковый коэффициент трансформации.",
      en: "The turn counts of the CT windings; their ratio gives the turns transformation ratio.",
    },
    u: { uz: "TT hisoblarida", ru: "В расчётах ТТ", en: "In CT calculations" },
  },
  {
    id: "ki", l: 5, r: ["w1w2", "iri", "tt"],
    t: { uz: "kI = w2/w1", ru: "kI = w2/w1", en: "kI = w2/w1" },
    f: {
      uz: "Transformatsiya koeffitsienti",
      ru: "Коэффициент трансформации",
      en: "Transformation ratio",
    },
    d: {
      uz: "TT ning transformatsiyalash koeffitsienti. Nominal koeffitsient esa KI = I1nom/I2nom nisbati bilan aniqlanadi.",
      ru: "Коэффициент трансформации ТТ. Номинальный коэффициент определяется отношением KI = I1ном/I2ном.",
      en: "The CT transformation ratio. The rated ratio is defined as KI = I1rated/I2rated.",
    },
    u: {
      uz: "Iri = ksx·Ihi/KI formulasida",
      ru: "В формуле Iс.р = kсх·Iс.з/KI",
      en: "In the formula Irelay = ksch·Iop/KI",
    },
  },
  {
    id: "imag", l: 5, r: ["tt", "toliqxato", "toyinish"],
    t: { uz: "Imag", ru: "Iнам", en: "Imag" },
    f: { uz: "Magnitlanish toki", ru: "Ток намагничивания", en: "Magnetising current" },
    d: {
      uz: "Birlamchi tokning magnit oqimni hosil qilishga ketadigan qismi. TT xatoligining asosiy sababi.",
      ru: "Часть первичного тока, идущая на создание магнитного потока. Основная причина погрешности ТТ.",
      en: "The part of the primary current that creates the magnetic flux. It is the main cause of CT error.",
    },
    u: { uz: "TT aniqligini baholashda", ru: "При оценке точности ТТ", en: "When assessing CT accuracy" },
  },
  {
    id: "myuk", l: 5, r: ["imag", "ftok"],
    t: { uz: "MYuK", ru: "МДС", en: "MMF" },
    f: {
      uz: "Magnit yurituvchi kuch",
      ru: "Магнитодвижущая сила",
      en: "Magnetomotive force",
    },
    d: {
      uz: "I·w ko'paytmasi; natijaviy MYuK Imag·w1 ga teng va Фt oqimni hosil qiladi.",
      ru: "Произведение I·w; результирующая МДС равна Iнам·w1 и создаёт поток Фт.",
      en: "The product I·w; the resultant MMF equals Imag·w1 and produces the flux Φt.",
    },
    u: {
      uz: "TT ishlash prinsipini tushuntirishda",
      ru: "При объяснении принципа действия ТТ",
      en: "When explaining CT operating principle",
    },
  },
  {
    id: "ftok", l: 5, r: ["myuk", "e2", "toyinish"],
    t: { uz: "Фt = Ф1 − Ф2", ru: "Фт = Ф1 − Ф2", en: "Φt = Φ1 − Φ2" },
    f: {
      uz: "TT ning natijaviy (ishchi) magnit oqimi",
      ru: "Результирующий (рабочий) магнитный поток ТТ",
      en: "Resultant (working) magnetic flux of the CT",
    },
    d: {
      uz: "Ikkala chulg'amni kesib o'tib, ikkilamchi chulg'amda E2 EYuK ni hosil qiluvchi oqim.",
      ru: "Поток, пересекающий обе обмотки и наводящий во вторичной обмотке ЭДС E2.",
      en: "The flux that links both windings and induces the EMF E2 in the secondary.",
    },
    u: { uz: "TT vektor diagrammasida", ru: "В векторной диаграмме ТТ", en: "In the CT phasor diagram" },
  },
  {
    id: "e2", l: 5, r: ["ftok", "zyukl", "toyinish"],
    t: { uz: "E2 = I2(Z2 + Zyukl)", ru: "E2 = I2(Z2 + Zн)", en: "E2 = I2(Z2 + Zload)" },
    f: { uz: "TT ikkilamchi EYuK", ru: "Вторичная ЭДС ТТ", en: "CT secondary EMF" },
    d: {
      uz: "Ikkilamchi kuchlanish va ikkilamchi chulg'amdagi kuchlanish tushuvi yig'indisi. E2 = 4,44·w2·Фt·f ifodasi bilan oqimga bog'langan.",
      ru: "Сумма вторичного напряжения и падения напряжения во вторичной обмотке. С потоком связана выражением E2 = 4,44·w2·Фт·f.",
      en: "The sum of the secondary voltage and the drop in the secondary winding. It relates to the flux as E2 = 4.44·w2·Φt·f.",
    },
    u: {
      uz: "Xatolikni kamaytirish shartlarini chiqarishda",
      ru: "При выводе условий снижения погрешности",
      en: "When deriving the conditions for reducing error",
    },
  },
  {
    id: "zyukl", l: 5, r: ["e2", "imag"],
    t: { uz: "Zyukl", ru: "Zн", en: "Zload" },
    f: {
      uz: "Ikkilamchi yuklama qarshiligi",
      ru: "Сопротивление вторичной нагрузки",
      en: "Secondary burden impedance",
    },
    d: {
      uz: "TT ikkilamchi zanjiridagi rele va asboblar qarshiligi. U oshsa E2, Фt va Imag ortib, xatolik kattalashadi.",
      ru: "Сопротивление реле и приборов во вторичной цепи ТТ. При его росте увеличиваются E2, Фт и Iнам, а значит и погрешность.",
      en: "The impedance of relays and instruments in the CT secondary. As it grows, E2, Φt and Imag rise and the error increases.",
    },
    u: { uz: "TT ni tanlashda", ru: "При выборе ТТ", en: "When selecting a CT" },
  },
  {
    id: "tokxato", l: 5, r: ["burchakxato", "toliqxato", "imag"],
    t: { uz: "fi (ΔI)", ru: "fi (ΔI)", en: "fi (ΔI)" },
    f: { uz: "Tok bo'yicha xatolik", ru: "Погрешность по току", en: "Current error" },
    d: {
      uz: "Haqiqiy I2 tokning hisobiy I1/kI qiymatdan farqi. Foizda: fi% = (I1' − I2)/I1' · 100.",
      ru: "Отличие действительного тока I2 от расчётного I1/kI. В процентах: fi% = (I1' − I2)/I1' · 100.",
      en: "The difference between the actual I2 and the calculated I1/kI. In percent: fi% = (I1' − I2)/I1' · 100.",
    },
    u: {
      uz: "Aniqlik sinfini belgilashda",
      ru: "При определении класса точности",
      en: "When defining the accuracy class",
    },
  },
  {
    id: "burchakxato", l: 5, r: ["tokxato", "toliqxato"],
    t: { uz: "δ", ru: "δ", en: "δ" },
    f: { uz: "Burchak xatolik", ru: "Угловая погрешность", en: "Phase (angle) error" },
    d: {
      uz: "Haqiqiy I2 tokning keltirilgan birlamchi I1' tokka nisbatan faza burilishi; gradus va minutlarda ifodalanadi.",
      ru: "Сдвиг по фазе действительного тока I2 относительно приведённого первичного I1'; выражается в градусах и минутах.",
      en: "The phase shift of the actual I2 relative to the referred primary I1'; expressed in degrees and minutes.",
    },
    u: {
      uz: "Yo'nalishli va differensial himoyalarda muhim",
      ru: "Важна для направленных и дифференциальных защит",
      en: "Important for directional and differential protections",
    },
  },
  {
    id: "toliqxato", l: 5, r: ["tokxato", "burchakxato", "imag"],
    t: { uz: "ε", ru: "ε", en: "ε" },
    f: { uz: "To'la xatolik", ru: "Полная погрешность", en: "Composite error" },
    d: {
      uz: "Keltirilgan magnitlanish tokining moduli: |Imag'| = |I1' − I2h|. Tok va burchak xatoliklarini birgalikda aniqlaydi, ε > fi.",
      ru: "Модуль приведённого тока намагничивания: |Iнам'| = |I1' − I2д|. Определяет и токовую, и угловую погрешность; ε > fi.",
      en: "The magnitude of the referred magnetising current: |Imag'| = |I1' − I2act|. It governs both current and angle error; ε > fi.",
    },
    u: {
      uz: "R sinfli TT larni baholashda",
      ru: "При оценке ТТ класса P",
      en: "When assessing class P (R) CTs",
    },
  },
  {
    id: "aniqliksinf", l: 5, r: ["rsinf", "tokxato"],
    t: { uz: "Aniqlik sinfi", ru: "Класс точности", en: "Accuracy class" },
    d: {
      uz: "TT ning xatolik darajasi: 0,5; 1; 3; 5R; 10R. Xatoliklar birlamchi tokning 0,1-1,2 nominal doirasida ta'minlanadi.",
      ru: "Степень погрешности ТТ: 0,5; 1; 3; 5Р; 10Р. Погрешности обеспечиваются в диапазоне первичного тока 0,1-1,2 номинального.",
      en: "The CT error grade: 0.5; 1; 3; 5P; 10P. The limits hold over 0.1-1.2 of rated primary current.",
    },
    u: { uz: "TT ni tanlashda", ru: "При выборе ТТ", en: "When selecting a CT" },
  },
  {
    id: "rsinf", l: 5, r: ["aniqliksinf", "tt"],
    t: { uz: "R sinf (5R, 10R)", ru: "Класс Р (5Р, 10Р)", en: "Class P (5P, 10P)" },
    d: {
      uz: "Rele himoyasi uchun mo'ljallangan TT sinfi; xatoligi nominal toklarda normalanmaydi, karralikning chegaraviy xatoligi bilan beriladi.",
      ru: "Класс ТТ, предназначенный для релейной защиты; погрешность при номинальных токах не нормируется, задаётся предельная погрешность по кратности.",
      en: "The CT class intended for protection; the error at rated current is not standardised — a limiting error at a stated multiple is given instead.",
    },
    u: {
      uz: "RH ni ta'minlovchi TT larda",
      ru: "В ТТ, питающих РЗ",
      en: "In CTs feeding protection",
    },
  },
  {
    id: "toyinish", l: 5, r: ["imag", "magxar", "aperiodik"],
    t: { uz: "To'yinish", ru: "Насыщение", en: "Saturation" },
    d: {
      uz: "Magnit oqim Фt ma'lum qiymatga yetganda magnit o'tkazgichning to'yinishi; Imag va xatoliklar keskin ortadi.",
      ru: "Насыщение магнитопровода при достижении потоком Фт определённого значения; Iнам и погрешности резко возрастают.",
      en: "Saturation of the core once the flux Φt reaches a certain value; the magnetising current and the errors rise sharply.",
    },
    u: {
      uz: "TT ni QT toklarida tekshirishda",
      ru: "При проверке ТТ на токи КЗ",
      en: "When checking a CT at fault currents",
    },
  },
  {
    id: "magxar", l: 5, r: ["toyinish", "imag"],
    t: {
      uz: "Magnitlanish xarakteristikasi",
      ru: "Характеристика намагничивания",
      en: "Magnetisation characteristic",
    },
    d: {
      uz: "Фt (yoki E2) ning Imag ga bog'liqligi. TT to'g'ri chiziqli qismda ishlashi kerak.",
      ru: "Зависимость Фт (или E2) от Iнам. ТТ должен работать на прямолинейном участке.",
      en: "The dependence of Φt (or E2) on Imag. The CT must work on the linear part.",
    },
    u: {
      uz: "TT ni tanlash va sozlashda",
      ru: "При выборе и наладке ТТ",
      en: "When selecting and commissioning a CT",
    },
  },
  {
    id: "aperiodik", l: 5, r: ["toyinish", "ka16"],
    t: {
      uz: "Aperiodik tashkil etuvchi",
      ru: "Апериодическая составляющая",
      en: "Aperiodic (DC) component",
    },
    d: {
      uz: "QT boshlanishidagi o'tkinchi rejimda birlamchi tokda paydo bo'ladigan tashkil etuvchi; magnit o'tkazgichni to'yintirib xatolikni oshiradi.",
      ru: "Составляющая, возникающая в первичном токе в переходном режиме в начале КЗ; насыщает магнитопровод и увеличивает погрешность.",
      en: "The component appearing in the primary current during the transient at fault inception; it saturates the core and raises the error.",
    },
    u: {
      uz: "Kesim hisobida ka = 1,6-1,8 sifatida hisobga olinadi",
      ru: "Учитывается в расчёте отсечки как ka = 1,6-1,8",
      en: "Accounted for in cut-off calculations as ka = 1.6-1.8",
    },
  },
  {
    id: "l1l2", l: 5, r: ["tt", "parmaqoida"],
    t: { uz: "L1, L2 / I1, I2", ru: "Л1, Л2 / И1, И2", en: "P1, P2 / S1, S2" },
    f: {
      uz: "TT chulg'am chiqishlarining belgilanishi",
      ru: "Обозначение выводов обмоток ТТ",
      en: "Marking of CT winding terminals",
    },
    d: {
      uz: "Birlamchi chulg'am boshi va oxiri L1, L2; ikkilamchisi I1, I2 deb belgilanadi. Bu belgilash ikkilamchi tokning yo'nalishini aniqlashga imkon beradi.",
      ru: "Начало и конец первичной обмотки обозначают Л1, Л2, вторичной — И1, И2. Такая маркировка позволяет определить направление вторичного тока.",
      en: "The primary winding ends are marked P1, P2 and the secondary S1, S2. This marking lets you determine the secondary current direction.",
    },
    u: {
      uz: "TT ni sxemaga to'g'ri ulashda",
      ru: "При правильном включении ТТ в схему",
      en: "When connecting a CT correctly into a scheme",
    },
  },
  {
    id: "parmaqoida", l: 5, r: ["l1l2", "tt"],
    t: { uz: "Parma qoidasi", ru: "Правило буравчика", en: "Right-hand (corkscrew) rule" },
    d: {
      uz: "Magnit oqim va ikkilamchi tok yo'nalishini chulg'am o'ralish yo'nalishiga qarab aniqlash qoidasi.",
      ru: "Правило определения направления магнитного потока и вторичного тока по направлению намотки обмотки.",
      en: "The rule for finding the flux and secondary-current direction from the winding sense.",
    },
    u: {
      uz: "TT qutblanishini tekshirishda",
      ru: "При проверке полярности ТТ",
      en: "When checking CT polarity",
    },
  },

  /* ================= 6-MA'RUZA ================= */
  {
    id: "toliqyulduz", l: 6, r: ["nolsim", "ksx", "toliqbolmagan"],
    t: { uz: "To'liq yulduz", ru: "Полная звезда", en: "Full star" },
    d: {
      uz: "TT lar uchala fazaga o'rnatiladi, ikkilamchi chulg'amlar va relelar yulduz qilib ulanadi, nol nuqta nol o'tkazgich bilan birlashtiriladi. Barcha QT turlariga javob beradi, ksx = 1.",
      ru: "ТТ устанавливают на всех трёх фазах, вторичные обмотки и реле соединяют в звезду, нулевую точку — нулевым проводом. Реагирует на все виды КЗ, kсх = 1.",
      en: "CTs on all three phases; secondaries and relays connected in star with the star point joined by a neutral wire. Responds to all fault types; ksch = 1.",
    },
    u: {
      uz: "Neytrali zaminlangan tarmoqlarda (110 kV va yuqori)",
      ru: "В сетях с заземлённой нейтралью (110 кВ и выше)",
      en: "In solidly earthed networks (110 kV and above)",
    },
  },
  {
    id: "toliqbolmagan", l: 6, r: ["toliqyulduz", "ksx", "ikkifazalisxema"],
    t: { uz: "To'liq bo'lmagan yulduz", ru: "Неполная звезда", en: "Incomplete star" },
    d: {
      uz: "TT lar ikkita fazaga o'rnatiladi; teskari simda In.o' = −(Ia + Ic) = Ib toki oqadi. Bir fazali QT ning hamma holatlarini sezmaydi. ksx = 1.",
      ru: "ТТ устанавливают на двух фазах; в обратном проводе течёт ток Iо.п = −(Ia + Ic) = Ib. Не реагирует на все случаи однофазного КЗ. kсх = 1.",
      en: "CTs on two phases; the return wire carries Iret = −(Ia + Ic) = Ib. It does not detect every single-phase fault. ksch = 1.",
    },
    u: {
      uz: "Fazalararo QT ga ishlovchi himoyalarda",
      ru: "В защитах, действующих при междуфазных КЗ",
      en: "In protections responding to phase-to-phase faults",
    },
  },
  {
    id: "uchburchakyulduz", l: 6, r: ["ksx", "toliqyulduz"],
    t: { uz: "Uchburchak-yulduz", ru: "Треугольник-звезда", en: "Delta-star" },
    d: {
      uz: "TT ikkilamchi chulg'amlari uchburchak, relelar yulduz ulanadi. Har bir reledan ikki faza tokining geometrik farqi oqadi; simmetrik rejimda tok √3 marta katta va 30° siljigan. ksx = √3.",
      ru: "Вторичные обмотки ТТ соединяют в треугольник, реле — в звезду. Через каждое реле течёт геометрическая разность токов двух фаз; в симметричном режиме ток в √3 раза больше и сдвинут на 30°. kсх = √3.",
      en: "CT secondaries in delta, relays in star. Each relay carries the vector difference of two phase currents; in balanced conditions it is √3 times larger and shifted by 30°. ksch = √3.",
    },
    u: {
      uz: "Differensial va distansion himoyalarda",
      ru: "В дифференциальных и дистанционных защитах",
      en: "In differential and distance protections",
    },
  },
  {
    id: "toklarfarqi", l: 6, r: ["ksx", "bittarele"],
    t: { uz: "Toklar farqi sxemasi", ru: "Схема разности токов", en: "Current-difference scheme" },
    d: {
      uz: "Ikkita TT va bitta rele: Ir = Ia − Ic. AB va BC fazalar orasidagi QT da sezgirligi yulduz sxemasidan √3 marta yomon. ksx = √3.",
      ru: "Два ТТ и одно реле: Iр = Ia − Ic. При КЗ между фазами AB и BC чувствительность в √3 раза хуже, чем у схемы звезды. kсх = √3.",
      en: "Two CTs and one relay: Ir = Ia − Ic. For AB and BC faults its sensitivity is √3 times worse than the star scheme. ksch = √3.",
    },
    u: {
      uz: "Fazalararo QT ga ishlovchi sodda himoyalarda",
      ru: "В простых защитах от междуфазных КЗ",
      en: "In simple phase-fault protections",
    },
  },
  {
    id: "nkf", l: 6, r: ["nolsim", "i0", "ka0"],
    t: {
      uz: "Nol ketma-ketlik toklar filtri",
      ru: "Фильтр токов нулевой последовательности",
      en: "Zero-sequence current filter",
    },
    d: {
      uz: "Uchala TT ning bir xil nomdagi chiqishlari parallel ulanadi, relega Ir = Ia + Ib + Ic = 3I0 keladi. Tok faqat yerga QT da paydo bo'ladi.",
      ru: "Одноимённые выводы трёх ТТ соединяют параллельно, на реле подаётся Iр = Ia + Ib + Ic = 3I0. Ток появляется только при КЗ на землю.",
      en: "The like terminals of three CTs are paralleled, so the relay receives Ir = Ia + Ib + Ic = 3I0. Current appears only for earth faults.",
    },
    u: {
      uz: "Yerga QT dan himoyada",
      ru: "В защите от замыканий на землю",
      en: "In earth-fault protection",
    },
  },
  {
    id: "nolsim", l: 6, r: ["nkf", "i0", "inb"],
    t: { uz: "Nol sim (In.o' = 3I0)", ru: "Нулевой провод (Iн.п = 3I0)", en: "Neutral wire (In = 3I0)" },
    d: {
      uz: "Yulduz sxemasidagi nol o'tkazgich. To'g'ri va teskari ketma-ketlik toklari undan o'tmaydi, nol ketma-ketlik toklari esa uch baravar bo'lib oqadi.",
      ru: "Нулевой провод схемы звезды. Токи прямой и обратной последовательности по нему не проходят, а токи нулевой последовательности текут утроенными.",
      en: "The neutral conductor of the star scheme. Positive- and negative-sequence currents do not flow in it, while zero-sequence currents flow tripled.",
    },
    u: {
      uz: "Nol simga o'rnatilgan KA0 relesi bilan",
      ru: "С реле KA0, установленным в нулевом проводе",
      en: "With the KA0 relay fitted in the neutral wire",
    },
  },
  {
    id: "i0", l: 6, r: ["nolsim", "nkf", "teskariket"],
    t: { uz: "I0", ru: "I0", en: "I0" },
    f: {
      uz: "Nol ketma-ketlik toki",
      ru: "Ток нулевой последовательности",
      en: "Zero-sequence current",
    },
    d: {
      uz: "Uch faza toklari geometrik yig'indisining uchdan biri: I0 = (IA + IB + IC)/3. Simmetrik rejimda nolga teng.",
      ru: "Треть геометрической суммы токов трёх фаз: I0 = (IA + IB + IC)/3. В симметричном режиме равен нулю.",
      en: "One third of the vector sum of the three phase currents: I0 = (IA + IB + IC)/3. Zero in balanced conditions.",
    },
    u: {
      uz: "Yerga tutashuv himoyalarida",
      ru: "В защитах от замыканий на землю",
      en: "In earth-fault protections",
    },
  },
  {
    id: "toggriket", l: 6, r: ["teskariket", "i0"],
    t: {
      uz: "To'g'ri ketma-ketlik",
      ru: "Прямая последовательность",
      en: "Positive sequence",
    },
    d: {
      uz: "Simmetrik uch fazali tizimning asosiy tashkil etuvchisi; vektorlar yig'indisi nolga teng, nol simdan o'tmaydi.",
      ru: "Основная составляющая симметричной трёхфазной системы; сумма векторов равна нулю, по нулевому проводу не проходит.",
      en: "The main component of a balanced three-phase system; its phasor sum is zero and it does not flow in the neutral.",
    },
    u: {
      uz: "Simmetrik tashkil etuvchilar usulida",
      ru: "В методе симметричных составляющих",
      en: "In the method of symmetrical components",
    },
  },
  {
    id: "teskariket", l: 6, r: ["toggriket", "kv2", "zv2"],
    t: {
      uz: "Teskari ketma-ketlik",
      ru: "Обратная последовательность",
      en: "Negative sequence",
    },
    d: {
      uz: "Nosimmetrik rejimda paydo bo'ladigan tashkil etuvchi; vektorlar yig'indisi nolga teng. Kuchlanish bo'yicha U2 tashkil etuvchisi nosimmetrik QT ni aniqlashga xizmat qiladi.",
      ru: "Составляющая, возникающая в несимметричном режиме; сумма векторов равна нулю. Составляющая напряжения U2 служит для выявления несимметричных КЗ.",
      en: "The component that appears under unbalance; its phasor sum is zero. The voltage component U2 is used to detect unbalanced faults.",
    },
    u: {
      uz: "Teskari ketma-ketlik filtrlarida",
      ru: "В фильтрах обратной последовательности",
      en: "In negative-sequence filters",
    },
  },
  {
    id: "ksx", l: 6, r: ["iri", "toliqyulduz", "uchburchakyulduz"],
    t: { uz: "ksx = Ir/If", ru: "kсх = Iр/Iф", en: "ksch = Ir/Iph" },
    f: { uz: "Sxema koeffitsienti", ru: "Коэффициент схемы", en: "Scheme factor" },
    d: {
      uz: "Reledagi tokning faza tokiga nisbati. Yulduz sxemalarida ksx = 1, uchburchak va toklar farqi sxemasida ksx = √3.",
      ru: "Отношение тока в реле к фазному току. В схемах звезды kсх = 1, в треугольнике и схеме разности токов kсх = √3.",
      en: "The ratio of relay current to phase current. In star schemes ksch = 1; in delta and current-difference schemes ksch = √3.",
    },
    u: {
      uz: "Iri = ksx·Ihi/KI formulasida",
      ru: "В формуле Iс.р = kсх·Iс.з/KI",
      en: "In the formula Irelay = ksch·Iop/KI",
    },
  },
  {
    id: "inb", l: 6, r: ["nolsim", "tokxato"],
    t: { uz: "Inb", ru: "Iнб", en: "Iunb" },
    f: { uz: "Nobalans toki", ru: "Ток небаланса", en: "Unbalance current" },
    d: {
      uz: "TT larning xatoliklari bir xil bo'lmaganligi uchun nol simda oqadigan tok; normal rejimda 0,01-0,02 A, QT da ko'tariladi.",
      ru: "Ток, текущий в нулевом проводе из-за неодинаковости погрешностей ТТ; в нормальном режиме 0,01-0,02 А, при КЗ возрастает.",
      en: "Current flowing in the neutral because the CT errors differ; 0.01-0.02 A in normal mode, higher during faults.",
    },
    u: {
      uz: "Nol simdagi releni sozlashda",
      ru: "При отстройке реле в нулевом проводе",
      en: "When setting the relay in the neutral wire",
    },
  },

  /* ================= 7-MA'RUZA ================= */
  {
    id: "ktr", l: 7, r: ["tv", "ku", "ochiquchburchak"],
    t: { uz: "KT", ru: "ТН", en: "VT" },
    f: {
      uz: "Kuchlanish transformatori",
      ru: "Трансформатор напряжения",
      en: "Voltage transformer",
    },
    d: {
      uz: "Nazorat qilinadigan kuchlanish haqidagi axborotni RH ga uzatuvchi transformator. Ikkilamchi nominal kuchlanishi 100 yoki 100/√3 V.",
      ru: "Трансформатор, передающий в РЗ сведения о контролируемом напряжении. Вторичное номинальное напряжение 100 или 100/√3 В.",
      en: "The transformer that conveys the monitored voltage to the protection. Its rated secondary voltage is 100 or 100/√3 V.",
    },
    u: {
      uz: "Kuchlanish organli himoyalarda",
      ru: "В защитах с органом напряжения",
      en: "In protections with a voltage element",
    },
  },
  {
    id: "ku", l: 7, r: ["ktr", "uri"],
    t: { uz: "KU = U1nom/U2nom", ru: "KU = U1ном/U2ном", en: "KU = U1rated/U2rated" },
    f: {
      uz: "KT transformatsiya koeffitsienti",
      ru: "Коэффициент трансформации ТН",
      en: "VT transformation ratio",
    },
    d: {
      uz: "Birlamchi nominal kuchlanishning ikkilamchisiga nisbati.",
      ru: "Отношение первичного номинального напряжения к вторичному.",
      en: "The ratio of rated primary voltage to rated secondary voltage.",
    },
    u: { uz: "Uri hisoblashda", ru: "При расчёте Uс.р", en: "When calculating the relay voltage setting" },
  },
  {
    id: "ktyulduz", l: 7, r: ["ktr", "ochiquchburchak", "besh"],
    t: { uz: "KT ni yulduzga ulash", ru: "Соединение ТН в звезду", en: "VT star connection" },
    d: {
      uz: "Birlamchi chulg'amlar yulduz, neytrali (N1) yerga zaminlanadi; ikkilamchisi ham yulduz. Yerga nisbatan faza kuchlanishini olish imkonini beradi.",
      ru: "Первичные обмотки соединяют в звезду, нейтраль (N1) заземляют; вторичные — также в звезду. Позволяет получить фазные напряжения относительно земли.",
      en: "Primaries in star with the neutral (N1) earthed; secondaries also in star. It provides phase-to-earth voltages.",
    },
    u: {
      uz: "Faza va fazalararo kuchlanish olishda",
      ru: "Для получения фазных и линейных напряжений",
      en: "To obtain phase and line voltages",
    },
  },
  {
    id: "ochiquchburchak", l: 7, r: ["ktyulduz", "nkkf"],
    t: { uz: "Ochiq uchburchak", ru: "Открытый треугольник", en: "Open delta" },
    d: {
      uz: "Ikkita bir fazali KT ni fazalararo kuchlanishlarga ulash sxemasi; barcha fazalararo kuchlanishlarni olish imkonini beradi.",
      ru: "Схема включения двух однофазных ТН на линейные напряжения; позволяет получить все линейные напряжения.",
      en: "Two single-phase VTs connected to line voltages; it provides all three line voltages.",
    },
    u: {
      uz: "Fazalararo kuchlanish organlarini ta'minlashda",
      ru: "Для питания органов линейного напряжения",
      en: "To feed line-voltage elements",
    },
  },
  {
    id: "nkkf", l: 7, r: ["u0", "ochiquchburchak", "ktyulduz"],
    t: {
      uz: "Nol ketma-ketlik kuchlanish filtri",
      ru: "Фильтр напряжения нулевой последовательности",
      en: "Zero-sequence voltage filter",
    },
    d: {
      uz: "Uchta bir fazali KT ning ikkilamchi chulg'amlari yopiq bo'lmagan uchburchak qilib ulanadi. Ur = Ua + Ub + Uc = 3U0/KU. Faqat yerga QT da kuchlanish paydo bo'ladi.",
      ru: "Вторичные обмотки трёх однофазных ТН соединяют в разомкнутый треугольник. Uр = Ua + Ub + Uc = 3U0/KU. Напряжение появляется только при КЗ на землю.",
      en: "The secondaries of three single-phase VTs are connected in broken delta. Ur = Ua + Ub + Uc = 3U0/KU. Voltage appears only for earth faults.",
    },
    u: {
      uz: "Yerga tutashuv signalizatsiyasi va himoyasida",
      ru: "В сигнализации и защите от замыканий на землю",
      en: "In earth-fault alarms and protection",
    },
  },
  {
    id: "u0", l: 7, r: ["nkkf", "i0"],
    t: { uz: "3U0", ru: "3U0", en: "3U0" },
    f: {
      uz: "Uchlangan nol ketma-ketlik kuchlanishi",
      ru: "Утроенное напряжение нулевой последовательности",
      en: "Tripled zero-sequence voltage",
    },
    d: {
      uz: "Ochiq uchburchak qisqichlaridagi kuchlanish. Normal rejimda va yersiz QT da nolga teng.",
      ru: "Напряжение на зажимах разомкнутого треугольника. В нормальном режиме и при КЗ без земли равно нулю.",
      en: "The voltage at the broken-delta terminals. It is zero in normal mode and for faults not involving earth.",
    },
    u: { uz: "Yerga QT ni aniqlashda", ru: "При выявлении КЗ на землю", en: "When detecting earth faults" },
  },
  {
    id: "besh", l: 7, r: ["ktyulduz", "nkkf"],
    t: { uz: "Besh sterjenli KT", ru: "Пятистержневой ТН", en: "Five-limb VT" },
    d: {
      uz: "Nol ketma-ketlik magnit oqimlari uchun 4- va 5-sterjenlarga ega uch fazali KT. Uch sterjenli KT bu sxemada ishlatilmaydi, chunki Ф0 oqimi uchun yo'l yo'q.",
      ru: "Трёхфазный ТН с 4-м и 5-м стержнями для потоков нулевой последовательности. Трёхстержневой ТН в этой схеме неприменим, так как потоку Ф0 нет пути.",
      en: "A three-phase VT with 4th and 5th limbs for zero-sequence flux. A three-limb VT cannot be used here because the Φ0 flux has no path.",
    },
    u: {
      uz: "Y/Y sxemasi va nol ketma-ketlik filtrida",
      ru: "В схеме Y/Y и фильтре нулевой последовательности",
      en: "In the Y/Y scheme and the zero-sequence filter",
    },
  },
  {
    id: "qs", l: 7, r: ["ktr", "shinakt"],
    t: { uz: "QS", ru: "QS", en: "QS" },
    f: {
      uz: "Ajratgichning yordamchi kontakti",
      ru: "Вспомогательный контакт разъединителя",
      en: "Disconnector auxiliary contact",
    },
    d: {
      uz: "Birlashmani boshqa shina tizimiga o'tkazishda kuchlanish zanjirini avtomatik uzib-ulovchi kontakt. Zaif tomoni — ishdan chiqsa RH noto'g'ri ishlashi mumkin.",
      ru: "Контакт, автоматически переключающий цепь напряжения при переводе присоединения на другую систему шин. Слабое место: при отказе возможна неправильная работа РЗ.",
      en: "The contact that automatically switches the voltage circuit when a feeder is transferred to another busbar system. Its weakness: a failure can cause incorrect protection operation.",
    },
    u: { uz: "Shina KT li sxemalarda", ru: "В схемах с шинным ТН", en: "In schemes with a busbar VT" },
  },
  {
    id: "shinakt", l: 7, r: ["liniyakt", "qs"],
    t: { uz: "Shina KT", ru: "Шинный ТН", en: "Busbar VT" },
    d: {
      uz: "Yig'ma shinaga o'rnatilgan, barcha birlashmalar RH sini ta'minlovchi KT. Tejamli, lekin uzib-ulash talab qiladi.",
      ru: "ТН, установленный на сборных шинах и питающий РЗ всех присоединений. Экономичен, но требует переключений.",
      en: "A VT on the busbar feeding the protection of all feeders. Economical, but it requires switching.",
    },
    u: { uz: "ES va katta NS larda", ru: "На ЭС и крупных ПС", en: "At stations and large substations" },
  },
  {
    id: "liniyakt", l: 7, r: ["shinakt"],
    t: { uz: "Liniya KT", ru: "Линейный ТН", en: "Line VT" },
    d: {
      uz: "Har bir birlashmaga alohida o'rnatilgan KT. Uzib-ulash talab qilmaydi, ishonchliligi yuqori.",
      ru: "ТН, установленный отдельно на каждом присоединении. Не требует переключений, надёжность выше.",
      en: "A VT installed on each feeder separately. It needs no switching and is more reliable.",
    },
    u: {
      uz: "Alohida birlashmalar himoyasida",
      ru: "В защите отдельных присоединений",
      en: "In the protection of individual feeders",
    },
  },
  {
    id: "ktxato", l: 7, r: ["ktr", "ku"],
    t: { uz: "KT xatoligi", ru: "Погрешность ТН", en: "VT error" },
    d: {
      uz: "Chulg'amdagi ΔU kuchlanish tushuvi hisobiga ikkilamchi kuchlanishning kattaligi va fazasi buziladi. Aniqlik sinflari: 0,2; 0,5; 1; 3.",
      ru: "Из-за падения напряжения ΔU в обмотках искажаются величина и фаза вторичного напряжения. Классы точности: 0,2; 0,5; 1; 3.",
      en: "The voltage drop ΔU in the windings distorts the magnitude and phase of the secondary voltage. Accuracy classes: 0.2; 0.5; 1; 3.",
    },
    u: { uz: "KT yuklamasini tanlashda", ru: "При выборе нагрузки ТН", en: "When choosing the VT burden" },
  },

  /* ================= 8-MA'RUZA (bog'lovchi) ================= */
  {
    id: "ishlashmoment", l: 8, r: ["prujina", "xri", "rt40"],
    t: { uz: "Aylantiruvchi moment", ru: "Вращающий момент", en: "Operating torque" },
    d: {
      uz: "Elektromagnit kuch hosil qiladigan moment. Rele ishonchli ishlashi uchun u prujinaning qarshilik momenti, ishqalanish va harakatlanuvchi tizim massasidan katta bo'lishi kerak.",
      ru: "Момент, создаваемый электромагнитной силой. Для надёжного срабатывания он должен превышать противодействующий момент пружины, трение и массу подвижной системы.",
      en: "The torque produced by the electromagnetic force. For reliable operation it must exceed the spring's restraining torque, friction and the moving system's inertia.",
    },
    u: {
      uz: "Elektromagnit relelarni sozlashda",
      ru: "При настройке электромагнитных реле",
      en: "When adjusting electromagnetic relays",
    },
  },
  {
    id: "ornatma", l: 8, r: ["prujina", "rt40", "xri"],
    t: { uz: "O'rnatma (ustavka)", ru: "Уставка", en: "Setting" },
    d: {
      uz: "Relening ishlash qiymati. Prujinaning tortuvchi kuchini shkala ko'rsatgichi bilan o'zgartirish yoki chulg'amlarni ketma-ket/parallel ulash orqali rostlanadi.",
      ru: "Значение срабатывания реле. Регулируется изменением натяжения пружины указателем шкалы либо переключением обмоток с последовательного на параллельное соединение.",
      en: "The relay's operating value. It is adjusted by changing the spring tension with the scale pointer or by switching the coils between series and parallel.",
    },
    u: {
      uz: "Har bir o'lchov relesini sozlashda",
      ru: "При настройке любого измерительного реле",
      en: "When setting any measuring relay",
    },
  },
  {
    id: "prujina", l: 8, r: ["ornatma", "yakor", "rt40"],
    t: {
      uz: "Qarshi ta'sir etuvchi prujina",
      ru: "Противодействующая пружина",
      en: "Restraining spring",
    },
    d: {
      uz: "Yakorga qarshi moment beruvchi spiral prujina; uning tortilishini o'zgartirish o'rnatmani rostlaydi.",
      ru: "Спиральная пружина, создающая противодействующий момент на якоре; изменение её натяжения регулирует уставку.",
      en: "The spiral spring providing the restraining torque on the armature; changing its tension sets the pickup value.",
    },
    u: { uz: "RT-40, RN-53 relelarida", ru: "В реле РТ-40, РН-53", en: "In RT-40 and RN-53 relays" },
  },
  {
    id: "yakor", l: 8, r: ["prujina", "rt40", "rp23"],
    t: { uz: "Yakor", ru: "Якорь", en: "Armature" },
    d: {
      uz: "Elektromagnit tortadigan ferromagnit harakatlanuvchi qism; kontakt ko'prigini aylantiradi.",
      ru: "Подвижная ферромагнитная часть, притягиваемая электромагнитом; поворачивает контактный мостик.",
      en: "The moving ferromagnetic part attracted by the electromagnet; it rotates the contact bridge.",
    },
    u: { uz: "Elektromagnit relelarda", ru: "В электромагнитных реле", en: "In electromagnetic relays" },
  },
];
