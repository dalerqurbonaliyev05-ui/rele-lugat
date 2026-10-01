import type { Circuit } from "../../types";

/** Pog'onali (ladder) sxemalar — operativ zanjirlar va struktura sxemalari.
 *  Geometriya tildan mustaqil, faqat matnlar tarjima qilinadi. */
export const LADDER_CIRCUITS: Circuit[] = [
  /* ---------------------------------------------------------------- 1 */
  {
    id: "rh-struct",
    lec: 3,
    diff: "easy",
    w: 360, h: 150,
    title: {
      uz: "Rele himoyasining struktura sxemasi",
      ru: "Структурная схема релейной защиты",
      en: "Block diagram of relay protection",
    },
    desc: {
      uz: "3.1-rasm. TA/TV → o'lchov qismi → mantiqiy qism → bajaruvchi qism → o'chirgich. Bloklarni to'g'ri tartibda joylashtiring.",
      ru: "Рис. 3.1. TA/TV → измерительная часть → логическая часть → исполнительная часть → выключатель. Расставьте блоки по порядку.",
      en: "Fig. 3.1. TA/TV → measuring part → logic part → output part → breaker. Place the blocks in the right order.",
    },
    rails: { left: 18, right: 342 },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "OQ", kind: "blk", w: 56 },
          { t: "slot", id: "s2", accept: "MQ", kind: "blk", w: 56 },
          { t: "slot", id: "s3", accept: "BQ", kind: "blk", w: 56 },
          { t: "fixed", label: "Q", kind: "blk", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "OQ", kind: "blk", name: { uz: "O'O — o'lchov qismi", ru: "ИО — измерительная часть", en: "ME — measuring part" } },
      { id: "MQ", kind: "blk", name: { uz: "MQ — mantiqiy qism", ru: "ЛЧ — логическая часть", en: "LP — logic part" } },
      { id: "BQ", kind: "blk", name: { uz: "BQ — bajaruvchi qism", ru: "ИЧ — исполнительная часть", en: "OP — output part" } },
      { id: "TA", kind: "blk", name: { uz: "TA — tok transformatori", ru: "TA — трансформатор тока", en: "TA — current transformer" } },
      { id: "TM", kind: "blk", name: { uz: "TM — ta'minlash manbai", ru: "ИП — источник питания", en: "PS — power supply" } },
    ],
    explain: {
      s1: {
        uz: "O'lchov qismi TA va TV orqali obyekt holatini nazorat qiladi va shikastlanishda diskret signal beradi.",
        ru: "Измерительная часть через TA и TV контролирует состояние объекта и при повреждении подаёт дискретный сигнал.",
        en: "The measuring part monitors the object through TA and TV and issues a discrete signal on a fault.",
      },
      s2: {
        uz: "Mantiqiy qism signallar ustida berilgan dastur bo'yicha mantiqiy amallarni bajaradi.",
        ru: "Логическая часть выполняет над сигналами логические операции по заданной программе.",
        en: "The logic part performs logic operations on the signals according to a set program.",
      },
      s3: {
        uz: "Bajaruvchi qism signalni o'chirgichni o'chirish uchun yetarli quvvatgacha kuchaytiradi.",
        ru: "Исполнительная часть усиливает сигнал до мощности, достаточной для отключения выключателя.",
        en: "The output part amplifies the signal to a power sufficient to trip the breaker.",
      },
    },
  },

  /* ---------------------------------------------------------------- 2 */
  {
    id: "mth-struct",
    lec: 12,
    diff: "easy",
    w: 360, h: 210,
    title: {
      uz: "MTH ning uch fazali strukturaviy sxemasi",
      ru: "Трёхфазная структурная схема МТЗ",
      en: "Three-phase block diagram of the OCP",
    },
    desc: {
      uz: "12.3-rasm. O'lchov qism (1) → mantiqiy qism (2) → bajaruvchi qism (3). Bloklarni to'g'ri tartibda joylashtiring.",
      ru: "Рис. 12.3. Измерительная часть (1) → логическая (2) → исполнительная (3). Расставьте блоки по порядку.",
      en: "Fig. 12.3. Measuring part (1) → logic part (2) → output part (3). Place the blocks in order.",
    },
    rails: { left: 20, right: 340 },
    rungs: [
      {
        y: 60,
        label: { uz: "1 — o'lchov qismi", ru: "1 — измерительная часть", en: "1 — measuring part" },
        items: [
          { t: "slot", id: "s1", accept: "KA", kind: "blk", w: 52 },
          { t: "slot", id: "s2", accept: "DW", kind: "blk", w: 52 },
          { t: "slot", id: "s3", accept: "KT", kind: "blk", w: 52 },
        ],
      },
      {
        y: 140,
        label: { uz: "3 — bajaruvchi qism", ru: "3 — исполнительная часть", en: "3 — output part" },
        items: [
          { t: "slot", id: "s4", accept: "KH", kind: "blk", w: 52 },
          { t: "slot", id: "s5", accept: "KL", kind: "blk", w: 52 },
          { t: "fixed", label: "YAT", kind: "blk", w: 52 },
        ],
      },
    ],
    parts: [
      { id: "KA", kind: "blk", name: { uz: "KA — tok relesi", ru: "KA — реле тока", en: "KA — current relay" } },
      { id: "DW", kind: "blk", name: { uz: "DW — YoKI elementi", ru: "DW — элемент ИЛИ", en: "DW — OR gate" } },
      { id: "KT", kind: "blk", name: { uz: "KT — vaqt relesi", ru: "KT — реле времени", en: "KT — time relay" } },
      { id: "KH", kind: "blk", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "KL", kind: "blk", name: { uz: "KL — oraliq rele", ru: "KL — промежуточное реле", en: "KL — auxiliary relay" } },
      { id: "KV", kind: "blk", name: { uz: "KV — kuchlanish relesi", ru: "KV — реле напряжения", en: "KV — voltage relay" } },
      { id: "TV", kind: "blk", name: { uz: "TV — kuchlanish trans.", ru: "TV — трансформатор напряжения", en: "TV — voltage transformer" } },
    ],
    explain: {
      s1: {
        uz: "O'lchov qismi (1) tok relelari KA dan iborat — ular TT ikkilamchi toklari bilan ta'minlanadi.",
        ru: "Измерительная часть (1) состоит из реле тока KA, питаемых вторичными токами ТТ.",
        en: "The measuring part (1) consists of KA current relays fed by the CT secondary currents.",
      },
      s2: {
        uz: "Uchala fazaning KA kontaktlari YoKI (DW) mantiqiy elementi orqali birlashtiriladi.",
        ru: "Контакты KA трёх фаз объединяются логическим элементом ИЛИ (DW).",
        en: "The KA contacts of all three phases are combined by the OR gate (DW).",
      },
      s3: {
        uz: "Mantiqiy qismda sabr vaqtini KT vaqt organi hosil qiladi (odatda uchta faza uchun bitta).",
        ru: "В логической части выдержку создаёт орган времени KT (обычно один на три фазы).",
        en: "In the logic part the KT timing element creates the delay (usually one for all three phases).",
      },
      s4: {
        uz: "KH signal (ko'rsatgich) relesi himoyaning ishlaganini qayd qiladi.",
        ru: "Сигнальное (указательное) реле KH фиксирует срабатывание защиты.",
        en: "The KH flag relay records that the protection has operated.",
      },
      s5: {
        uz: "Bajaruvchi qism KL chiquvchi oraliq relesi orqali amalga oshirilib, YAT ga kuchlanish beradi.",
        ru: "Исполнительная часть выполняется выходным промежуточным реле KL, подающим напряжение на YAT.",
        en: "The output part is the KL auxiliary relay, which energises the trip coil.",
      },
    },
  },

  /* ---------------------------------------------------------------- 3 */
  {
    id: "mth-dc",
    lec: 12,
    diff: "hard",
    w: 360, h: 300,
    title: {
      uz: "MTH ning o'zgarmas operativ tok zanjiri",
      ru: "Цепь постоянного оперативного тока МТЗ",
      en: "DC operating circuit of the OCP",
    },
    desc: {
      uz: "12.4,b-rasm. Mustaqil xarakteristikali MTH ning operativ zanjiri. Tok relesi kontaktidan YAT gacha bo'lgan zanjirni yig'ing.",
      ru: "Рис. 12.4,б. Оперативная цепь МТЗ с независимой характеристикой. Соберите цепь от контакта реле тока до YAT.",
      en: "Fig. 12.4b. Operating circuit of definite-time OCP. Build the chain from the current-relay contact to the trip coil.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "KA1", kind: "no", w: 56 },
          { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
        ],
      },
      {
        y: 150,
        items: [
          { t: "slot", id: "s3", accept: "KT1", kind: "no", w: 56 },
          { t: "slot", id: "s4", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 230,
        items: [
          { t: "slot", id: "s5", accept: "KL1", kind: "no", w: 50 },
          { t: "slot", id: "s6", accept: "KH", kind: "coil", w: 40 },
          { t: "slot", id: "s7", accept: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s8", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KA1", kind: "no", name: { uz: "KA1 — tok relesi kontakti", ru: "KA1 — контакт реле тока", en: "KA1 — current relay contact" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT1 — vaqt relesi kontakti", ru: "KT1 — контакт реле времени", en: "KT1 — time relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KL1", kind: "no", name: { uz: "KL1 — oraliq rele kontakti", ru: "KL1 — контакт промежуточного реле", en: "KL1 — auxiliary relay contact" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "SQ", kind: "no", name: { uz: "SQ — o'chirgich yordamchi kontakti", ru: "SQ — вспомогательный контакт выключателя", en: "SQ — breaker auxiliary contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KV", kind: "coil", name: { uz: "KV — kuchlanish relesi", ru: "KV — реле напряжения", en: "KV — voltage relay" } },
      { id: "KA0", kind: "no", name: { uz: "KA0 — nol simdagi rele", ru: "KA0 — реле в нулевом проводе", en: "KA0 — neutral-wire relay" } },
    ],
    explain: {
      s1: {
        uz: "Zanjir tok relelarining kontaktlaridan boshlanadi — ular parallel (YoKI) ulanadi.",
        ru: "Цепь начинается с контактов реле тока — они соединены параллельно (ИЛИ).",
        en: "The chain starts at the current-relay contacts, which are paralleled (an OR).",
      },
      s2: {
        uz: "Tok relesi ishlaganda KT vaqt relesining chulg'amiga tok beriladi.",
        ru: "При срабатывании реле тока ток подаётся на обмотку реле времени KT.",
        en: "When the current relay operates, current is fed to the KT time-relay coil.",
      },
      s3: {
        uz: "Sabr vaqtidan keyin KT1 kontakti tutashadi.",
        ru: "По истечении выдержки контакт KT1 замыкается.",
        en: "After the delay the KT1 contact closes.",
      },
      s4: {
        uz: "KT1 orqali KL oraliq relesi ishga tushadi — u bajaruvchi organ.",
        ru: "Через KT1 срабатывает промежуточное реле KL — исполнительный орган.",
        en: "Through KT1 the KL auxiliary relay — the output element — operates.",
      },
      s5: {
        uz: "KL1 kontakti o'chirish zanjirini qo'shadi.",
        ru: "Контакт KL1 замыкает цепь отключения.",
        en: "The KL1 contact closes the trip circuit.",
      },
      s6: {
        uz: "KH ko'rsatgich relesi o'chirish g'altagi bilan ketma-ket ulanadi, bayroqchasi tushib himoya ishlaganini qayd qiladi.",
        ru: "Указательное реле KH включено последовательно с катушкой отключения; выпавший флажок фиксирует срабатывание.",
        en: "The KH flag relay is in series with the trip coil; its dropped flag records the operation.",
      },
      s7: {
        uz: "SQ — o'chirgichning yordamchi bloklovchi kontakti; o'chirgich o'chgach ochilib YAT zanjirini uzadi.",
        ru: "SQ — вспомогательный блокировочный контакт выключателя; после отключения размыкается и рвёт цепь YAT.",
        en: "SQ is the breaker's auxiliary blocking contact; after tripping it opens and breaks the trip-coil circuit.",
      },
      s8: {
        uz: "YAT — o'chirgich yuritmasidagi elektromagnit o'chirish g'altagi, zanjirning oxirgi elementi.",
        ru: "YAT — электромагнитная катушка отключения в приводе выключателя, последний элемент цепи.",
        en: "YAT is the trip coil in the breaker mechanism — the last element of the chain.",
      },
    },
  },

  /* ---------------------------------------------------------------- 4 */
  {
    id: "mth-2ph",
    lec: 12,
    diff: "medium",
    w: 360, h: 300,
    title: {
      uz: "Ikkita releli ikki fazali MTH (nol sim relesi bilan)",
      ru: "Двухфазная МТЗ с двумя реле (с реле в нулевом проводе)",
      en: "Two-phase OCP with two relays (plus neutral-wire relay)",
    },
    desc: {
      uz: "12.5,b-rasm. A va C fazalarning kontaktlari va KA01 nol sim relesi parallel ulanadi. Zanjirni yig'ing.",
      ru: "Рис. 12.5,б. Контакты фаз A и C и реле KA01 в нулевом проводе соединяются параллельно. Соберите цепь.",
      en: "Fig. 12.5b. The phase A and C contacts and the neutral-wire relay KA01 are paralleled. Build the circuit.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        label: { uz: "KAA1 · KAC1 · KA01 — parallel", ru: "KAA1 · KAC1 · KA01 — параллельно", en: "KAA1 · KAC1 · KA01 — in parallel" },
        items: [
          { t: "slot", id: "s1", accept: "KAA1", kind: "no", w: 56 },
          { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
        ],
      },
      {
        y: 150,
        items: [
          { t: "slot", id: "s3", accept: "KT1", kind: "no", w: 56 },
          { t: "slot", id: "s4", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 230,
        items: [
          { t: "fixed", label: "KL1", kind: "no", w: 50 },
          { t: "slot", id: "s5", accept: "KH", kind: "coil", w: 40 },
          { t: "fixed", label: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s6", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KAA1", kind: "no", name: { uz: "KAA1 — A faza tok relesi", ru: "KAA1 — реле тока фазы A", en: "KAA1 — phase A current relay" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT1 — vaqt relesi kontakti", ru: "KT1 — контакт реле времени", en: "KT1 — time relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "TV", kind: "coil", name: { uz: "TV — kuchlanish transformatori", ru: "TV — трансформатор напряжения", en: "TV — voltage transformer" } },
    ],
    explain: {
      s1: {
        uz: "Ikki fazali sxemada TT lar faqat A va C fazalarga o'rnatiladi; ularning kontaktlari parallel ulanadi.",
        ru: "В двухфазной схеме ТТ ставят только на фазы A и C; их контакты соединяют параллельно.",
        en: "In the two-phase scheme CTs sit only on phases A and C; their contacts are paralleled.",
      },
      s2: {
        uz: "Sabr vaqtini KT vaqt relesi hosil qiladi — mustaqil xarakteristika.",
        ru: "Выдержку создаёт реле времени KT — независимая характеристика.",
        en: "The KT time relay creates the delay — a definite-time characteristic.",
      },
      s3: {
        uz: "KT1 kontakti sabr vaqtidan keyin tutashadi.",
        ru: "Контакт KT1 замыкается по истечении выдержки.",
        en: "The KT1 contact closes after the delay.",
      },
      s4: {
        uz: "KL oraliq relesi o'chirish zanjirini boshqaradi.",
        ru: "Промежуточное реле KL управляет цепью отключения.",
        en: "The KL auxiliary relay controls the trip circuit.",
      },
      s5: {
        uz: "KH bayroqchasi himoyaning ishlaganini qayd qiladi.",
        ru: "Флажок KH фиксирует срабатывание защиты.",
        en: "The KH flag records the protection's operation.",
      },
      s6: {
        uz: "YAT o'chirgichni o'chiradi. Nol simdagi KA01 bir fazali QT larga sezgirlikni oshiradi.",
        ru: "YAT отключает выключатель. Реле KA01 в нулевом проводе повышает чувствительность к однофазным КЗ.",
        en: "The trip coil opens the breaker. KA01 in the neutral raises sensitivity to single-phase faults.",
      },
    },
  },

  /* ---------------------------------------------------------------- 5 */
  {
    id: "mth-1relay",
    lec: 12,
    diff: "easy",
    w: 360, h: 230,
    title: {
      uz: "Bitta releli MTH sxemasi",
      ru: "Схема МТЗ с одним реле",
      en: "Single-relay OCP scheme",
    },
    desc: {
      uz: "12.5,e-rasm. Bitta KA rele ikki faza toklarining farqiga ulanadi: Ir = Ia − Ic. Operativ zanjirni yig'ing.",
      ru: "Рис. 12.5,е. Одно реле KA включено на разность токов двух фаз: Iр = Ia − Ic. Соберите оперативную цепь.",
      en: "Fig. 12.5e. A single KA relay is connected to the difference of two phase currents: Ir = Ia − Ic. Build the operating circuit.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "KA1", kind: "no", w: 56 },
          { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
        ],
      },
      {
        y: 150,
        items: [
          { t: "slot", id: "s3", accept: "KT1", kind: "no", w: 50 },
          { t: "slot", id: "s4", accept: "KL", kind: "coil", w: 40 },
          { t: "fixed", label: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s5", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KA1", kind: "no", name: { uz: "KA.1 — tok relesi kontakti", ru: "KA.1 — контакт реле тока", en: "KA.1 — current relay contact" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT1 — vaqt relesi kontakti", ru: "KT1 — контакт реле времени", en: "KT1 — time relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KA0", kind: "no", name: { uz: "KA0 — nol simdagi rele", ru: "KA0 — реле в нулевом проводе", en: "KA0 — neutral-wire relay" } },
      { id: "KV", kind: "coil", name: { uz: "KV — kuchlanish relesi", ru: "KV — реле напряжения", en: "KV — voltage relay" } },
    ],
    explain: {
      s1: {
        uz: "Sxemada faqat bitta KA tok relesi bor — shuning uchun relelar soni eng kam.",
        ru: "В схеме только одно реле тока KA — поэтому число реле минимально.",
        en: "The scheme uses only one KA current relay, so the relay count is minimal.",
      },
      s2: {
        uz: "Selektivlik sabr vaqti bilan ta'minlanadi.",
        ru: "Селективность обеспечивается выдержкой времени.",
        en: "Selectivity is provided by the time delay.",
      },
      s3: {
        uz: "Sabr vaqtidan keyin KT1 zanjirni qo'shadi.",
        ru: "По истечении выдержки KT1 замыкает цепь.",
        en: "After the delay KT1 closes the circuit.",
      },
      s4: {
        uz: "KL oraliq relesi o'chirish g'altagi zanjirini boshqaradi.",
        ru: "Промежуточное реле KL управляет цепью катушки отключения.",
        en: "The KL auxiliary relay controls the trip-coil circuit.",
      },
      s5: {
        uz: "Kamchiligi: Y/Δ transformator ortidagi QT da Ir = Ia − Ic = 0 bo'lib himoya ishlamaydi.",
        ru: "Недостаток: при КЗ за трансформатором Y/Δ Iр = Ia − Ic = 0 и защита не действует.",
        en: "Drawback: beyond a Y/Δ transformer Ir = Ia − Ic = 0 and the protection fails to act.",
      },
    },
  },

  /* ---------------------------------------------------------------- 6 */
  {
    id: "mth-dependent",
    lec: 12,
    diff: "easy",
    w: 360, h: 160,
    title: {
      uz: "Bog'liq xarakteristikali MTH (RT-80)",
      ru: "МТЗ с зависимой характеристикой (РТ-80)",
      en: "Inverse-time OCP (RT-80)",
    },
    desc: {
      uz: "12.4,d-rasm. RT-80 relesi o'zi sabr vaqtini hosil qiladi — vaqt, oraliq va ko'rsatgich relesi kerak emas. Faqat kerakli elementlarni qo'ying!",
      ru: "Рис. 12.4,д. Реле РТ-80 само создаёт выдержку — реле времени, промежуточное и указательное не нужны. Ставьте только нужные элементы!",
      en: "Fig. 12.4d. The RT-80 creates its own delay — no time, auxiliary or flag relay is needed. Place only what is required.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 80,
        items: [
          { t: "slot", id: "s1", accept: "KAA1", kind: "no", w: 60 },
          { t: "slot", id: "s2", accept: "SQ", kind: "no", w: 48 },
          { t: "slot", id: "s3", accept: "YAT", kind: "coil", w: 44 },
        ],
      },
    ],
    parts: [
      { id: "KAA1", kind: "no", name: { uz: "KAA1 — RT-80 kontakti", ru: "KAA1 — контакт РТ-80", en: "KAA1 — RT-80 contact" } },
      { id: "SQ", kind: "no", name: { uz: "SQ — yordamchi kontakt", ru: "SQ — вспомогательный контакт", en: "SQ — auxiliary contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi (kerak emas)", ru: "KT — реле времени (не нужно)", en: "KT — time relay (not needed)" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele (kerak emas)", ru: "KL — промежуточное реле (не нужно)", en: "KL — auxiliary relay (not needed)" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich (kerak emas)", ru: "KH — указательное (не нужно)", en: "KH — flag relay (not needed)" } },
    ],
    explain: {
      s1: {
        uz: "RT-80 induksion relesi yetarli quvvatli kontaktga ega, shuning uchun to'g'ridan to'g'ri o'chirish zanjirini qo'shadi.",
        ru: "Индукционное реле РТ-80 имеет достаточно мощный контакт и замыкает цепь отключения напрямую.",
        en: "The RT-80 induction relay has a powerful enough contact to close the trip circuit directly.",
      },
      s2: {
        uz: "SQ o'chirgich holatini nazorat qiladi.",
        ru: "SQ контролирует положение выключателя.",
        en: "SQ supervises the breaker position.",
      },
      s3: {
        uz: "Sabr vaqtini relening o'zi hosil qilgani uchun KT, KL va KH sxemada ishtirok etmaydi — RT-80 da signal bayroqchasi ham bor.",
        ru: "Так как выдержку создаёт само реле, KT, KL и KH в схеме не участвуют — у РТ-80 есть и сигнальный флажок.",
        en: "Since the relay makes its own delay, KT, KL and KH are absent — the RT-80 also has its own flag.",
      },
    },
  },

  /* ---------------------------------------------------------------- 7 */
  {
    id: "mth-uv",
    lec: 14,
    diff: "hard",
    w: 360, h: 300,
    title: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH",
      ru: "МТЗ с пуском по напряжению",
      en: "OCP with voltage restraint",
    },
    desc: {
      uz: "14.2,a-rasm. Tok va kuchlanish organlari VA mantiqi bo'yicha birlashtiriladi: KV ishlamasa KL1 ochiq qoladi va KT ishga tushmaydi.",
      ru: "Рис. 14.2,а. Органы тока и напряжения объединены по логике И: если KV не сработало, KL1 разомкнут и KT не запускается.",
      en: "Fig. 14.2a. The current and voltage elements are combined by AND logic: if KV has not picked up, KL1 stays open and KT does not start.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "KA1", kind: "no", w: 50 },
          { t: "slot", id: "s2", accept: "KL1", kind: "no", w: 50 },
          { t: "slot", id: "s3", accept: "KT", kind: "coil", w: 42 },
        ],
      },
      {
        y: 150,
        items: [
          { t: "slot", id: "s4", accept: "KV1", kind: "no", w: 56 },
          { t: "slot", id: "s5", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 230,
        items: [
          { t: "slot", id: "s6", accept: "KT1", kind: "no", w: 50 },
          { t: "slot", id: "s7", accept: "KH", kind: "coil", w: 40 },
          { t: "fixed", label: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s8", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KA1", kind: "no", name: { uz: "KA1.1 — tok relesi kontakti", ru: "KA1.1 — контакт реле тока", en: "KA1.1 — current relay contact" } },
      { id: "KL1", kind: "no", name: { uz: "KL1 — oraliq rele kontakti", ru: "KL1 — контакт промежуточного реле", en: "KL1 — auxiliary relay contact" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KV1", kind: "no", name: { uz: "KVAB.1 — kuchlanish relesi kontakti", ru: "KVAB.1 — контакт реле напряжения", en: "KVAB.1 — voltage relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT1 — vaqt relesi kontakti", ru: "KT1 — контакт реле времени", en: "KT1 — time relay contact" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KA0", kind: "no", name: { uz: "KA0 — nol simdagi rele", ru: "KA0 — реле в нулевом проводе", en: "KA0 — neutral-wire relay" } },
    ],
    explain: {
      s1: {
        uz: "Tok organi KA — QT da tok ortadi va uning kontakti tutashadi.",
        ru: "Орган тока KA — при КЗ ток возрастает и его контакт замыкается.",
        en: "The KA current element — during a fault the current rises and its contact closes.",
      },
      s2: {
        uz: "KL1 kuchlanish organining kontakti; u tok zanjiri bilan ketma-ket, ya'ni VA mantiqi bo'yicha ulanadi.",
        ru: "KL1 — контакт органа напряжения; включён последовательно с токовой цепью, то есть по логике И.",
        en: "KL1 is the voltage element's contact, wired in series with the current path — the AND logic.",
      },
      s3: {
        uz: "Ikkala shart bajarilgandagina KT vaqt relesi ishga tushadi.",
        ru: "Реле времени KT запускается только при выполнении обоих условий.",
        en: "The KT time relay starts only when both conditions are met.",
      },
      s4: {
        uz: "Kuchlanish organi minimal kuchlanish relelari KVAB, KVBC, KVCA kontaktlaridan iborat (parallel).",
        ru: "Орган напряжения образован контактами минимальных реле KVAB, KVBC, KVCA (параллельно).",
        en: "The voltage element consists of the KVAB, KVBC and KVCA undervoltage relay contacts in parallel.",
      },
      s5: {
        uz: "Kuchlanish organi KL oraliq relesini ishga tushiradi.",
        ru: "Орган напряжения запускает промежуточное реле KL.",
        en: "The voltage element energises the KL auxiliary relay.",
      },
      s6: {
        uz: "Sabr vaqtidan keyin KT1 o'chirish zanjirini qo'shadi.",
        ru: "По истечении выдержки KT1 замыкает цепь отключения.",
        en: "After the delay KT1 closes the trip circuit.",
      },
      s7: {
        uz: "KH himoyaning ishlaganini qayd qiladi.",
        ru: "KH фиксирует срабатывание защиты.",
        en: "KH records the protection's operation.",
      },
      s8: {
        uz: "YAT o'chirgichni o'chiradi.",
        ru: "YAT отключает выключатель.",
        en: "The trip coil opens the breaker.",
      },
    },
  },

  /* ---------------------------------------------------------------- 8 */
  {
    id: "mth-uv2",
    lec: 14,
    diff: "hard",
    w: 360, h: 230,
    title: {
      uz: "Teskari ketma-ketlik relesi bilan kombinatsiyalashgan MTH",
      ru: "МТЗ, комбинированная с реле обратной последовательности",
      en: "OCP combined with a negative-sequence relay",
    },
    desc: {
      uz: "14.3,b-rasm. ZV2 filtri KV2 maksimal relesini ta'minlaydi; KV2 ning ajraluvchi kontakti orqali KV minimal relesi ulanadi.",
      ru: "Рис. 14.3,б. Фильтр ZV2 питает максимальное реле KV2; через его размыкающий контакт включается минимальное реле KV.",
      en: "Fig. 14.3b. The ZV2 filter feeds the KV2 overvoltage relay; the KV undervoltage relay connects through its break contact.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        label: { uz: "TV dan → ZV2 filtri", ru: "От TV → фильтр ZV2", en: "From TV → the ZV2 filter" },
        items: [
          { t: "slot", id: "s1", accept: "ZV2", kind: "blk", w: 52 },
          { t: "slot", id: "s2", accept: "KV2", kind: "coil", w: 44 },
        ],
      },
      {
        y: 160,
        items: [
          { t: "slot", id: "s3", accept: "KV21", kind: "nc", w: 56 },
          { t: "slot", id: "s4", accept: "KV", kind: "coil", w: 44 },
        ],
      },
    ],
    parts: [
      { id: "ZV2", kind: "blk", name: { uz: "ZV2 — teskari ketma-ketlik filtri", ru: "ZV2 — фильтр обратной последовательности", en: "ZV2 — negative-sequence filter" } },
      { id: "KV2", kind: "coil", name: { uz: "KV2 — maksimal kuchlanish relesi", ru: "KV2 — максимальное реле напряжения", en: "KV2 — overvoltage relay" } },
      { id: "KV21", kind: "nc", name: { uz: "KV2.1 — ajraluvchi kontakt", ru: "KV2.1 — размыкающий контакт", en: "KV2.1 — break contact" } },
      { id: "KV", kind: "coil", name: { uz: "KV — minimal kuchlanish relesi", ru: "KV — минимальное реле напряжения", en: "KV — undervoltage relay" } },
      { id: "KA1", kind: "no", name: { uz: "KA1.1 — tok relesi kontakti", ru: "KA1.1 — контакт реле тока", en: "KA1.1 — current relay contact" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi", ru: "KT — реле времени", en: "KT — time relay" } },
    ],
    explain: {
      s1: {
        uz: "ZV2 — teskari ketma-ketlik kuchlanish filtri; U2 tashkil etuvchisini ajratib beradi.",
        ru: "ZV2 — фильтр напряжения обратной последовательности; выделяет составляющую U2.",
        en: "ZV2 is the negative-sequence voltage filter; it extracts the U2 component.",
      },
      s2: {
        uz: "KV2 maksimal kuchlanish relesi U2 paydo bo'lganda, ya'ni nosimmetrik QT da ishlaydi. O'rnatmasi Uhi = 0,06·Uish.norm.",
        ru: "Максимальное реле KV2 срабатывает при появлении U2, то есть при несимметричных КЗ. Уставка Uс.з = 0,06·Uраб.норм.",
        en: "The KV2 overvoltage relay picks up when U2 appears, i.e. for unbalanced faults. Its setting is 0.06·Unorm.",
      },
      s3: {
        uz: "KV2 ning AJRALUVCHI kontakti — nosimmetriya yo'qolganda u yana yopiladi va KV ga kuchlanish beradi.",
        ru: "РАЗМЫКАЮЩИЙ контакт KV2 — при исчезновении несимметрии он вновь замыкается и подаёт напряжение на KV.",
        en: "The BREAK contact of KV2 — when the asymmetry disappears it recloses and energises KV.",
      },
      s4: {
        uz: "KV minimal kuchlanish relesi uch fazali QT larda kuchlanish organini ishlatish uchun mo'ljallangan.",
        ru: "Минимальное реле KV предназначено для работы органа напряжения при трёхфазных КЗ.",
        en: "The KV undervoltage relay makes the voltage element work for three-phase faults.",
      },
    },
  },

  /* ---------------------------------------------------------------- 9 */
  {
    id: "kesim-instant",
    lec: 15,
    diff: "easy",
    w: 360, h: 220,
    title: {
      uz: "Sabr vaqtsiz tokli kesim sxemasi",
      ru: "Схема токовой отсечки без выдержки времени",
      en: "Instantaneous current cut-off scheme",
    },
    desc: {
      uz: "15.2,a-rasm. Kesim MTH dan vaqt relesi yo'qligi bilan farq qiladi — zanjirni yig'ing.",
      ru: "Рис. 15.2,а. Отсечка отличается от МТЗ отсутствием реле времени — соберите цепь.",
      en: "Fig. 15.2a. The cut-off differs from OCP by having no time relay — build the circuit.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "KA", kind: "no", w: 56 },
          { t: "slot", id: "s2", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 155,
        items: [
          { t: "slot", id: "s3", accept: "KL1", kind: "no", w: 50 },
          { t: "slot", id: "s4", accept: "KH", kind: "coil", w: 40 },
          { t: "slot", id: "s5", accept: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s6", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KA", kind: "no", name: { uz: "KA — tok relesi kontakti", ru: "KA — контакт реле тока", en: "KA — current relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KL1", kind: "no", name: { uz: "KL.1 — oraliq rele kontakti", ru: "KL.1 — контакт промежуточного реле", en: "KL.1 — auxiliary relay contact" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "SQ", kind: "no", name: { uz: "SQ — yordamchi kontakt", ru: "SQ — вспомогательный контакт", en: "SQ — auxiliary contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT.1 — vaqt relesi kontakti", ru: "KT.1 — контакт реле времени", en: "KT.1 — time relay contact" } },
    ],
    explain: {
      s1: {
        uz: "Kesimda o'lchov organi bevosita bajaruvchi organga ta'sir qiladi — vaqt relesi yo'q.",
        ru: "В отсечке измерительный орган действует непосредственно на исполнительный — реле времени нет.",
        en: "In a cut-off the measuring element acts directly on the output element — there is no time relay.",
      },
      s2: {
        uz: "KA darhol KL tezkor oraliq relesini ishga tushiradi (0,02 s).",
        ru: "KA сразу запускает быстродействующее промежуточное реле KL (0,02 с).",
        en: "KA immediately starts the fast KL auxiliary relay (0.02 s).",
      },
      s3: {
        uz: "KL.1 kontakti o'chirish zanjirini qo'shadi.",
        ru: "Контакт KL.1 замыкает цепь отключения.",
        en: "The KL.1 contact closes the trip circuit.",
      },
      s4: {
        uz: "KH bayroqchasi kesim ishlaganini qayd qiladi.",
        ru: "Флажок KH фиксирует срабатывание отсечки.",
        en: "The KH flag records the cut-off's operation.",
      },
      s5: {
        uz: "SQ o'chirgich o'chgach YAT zanjirini uzadi.",
        ru: "SQ размыкает цепь YAT после отключения выключателя.",
        en: "SQ breaks the trip-coil circuit once the breaker has opened.",
      },
      s6: {
        uz: "YAT o'chirgichni o'chiradi. Umumiy vaqt thi = 0,04-0,06 s.",
        ru: "YAT отключает выключатель. Общее время tс.з = 0,04-0,06 с.",
        en: "The trip coil opens the breaker. Total time 0.04-0.06 s.",
      },
    },
  },

  /* ---------------------------------------------------------------- 10 */
  {
    id: "kesim-delay",
    lec: 15,
    diff: "medium",
    w: 360, h: 300,
    title: {
      uz: "Sabr vaqtli tokli kesim",
      ru: "Токовая отсечка с выдержкой времени",
      en: "Time-delayed current cut-off",
    },
    desc: {
      uz: "15.2,b-rasm. Sabr vaqtli kesim sxemasi mustaqil xarakteristikali MTH ga to'la mos keladi — KT vaqt relesi qo'shiladi.",
      ru: "Рис. 15.2,б. Схема отсечки с выдержкой полностью соответствует МТЗ с независимой характеристикой — добавляется реле времени KT.",
      en: "Fig. 15.2b. The time-delayed cut-off matches definite-time OCP exactly — a KT time relay is added.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "slot", id: "s1", accept: "KA", kind: "no", w: 56 },
          { t: "slot", id: "s2", accept: "KT", kind: "coil", w: 44 },
        ],
      },
      {
        y: 150,
        items: [
          { t: "slot", id: "s3", accept: "KT1", kind: "no", w: 56 },
          { t: "slot", id: "s4", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 230,
        items: [
          { t: "slot", id: "s5", accept: "KL1", kind: "no", w: 50 },
          { t: "fixed", label: "KH", kind: "coil", w: 40 },
          { t: "fixed", label: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s6", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KA", kind: "no", name: { uz: "KA — tok relesi kontakti", ru: "KA — контакт реле тока", en: "KA — current relay contact" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT.1 — vaqt relesi kontakti", ru: "KT.1 — контакт реле времени", en: "KT.1 — time relay contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KL1", kind: "no", name: { uz: "KL.1 — oraliq rele kontakti", ru: "KL.1 — контакт промежуточного реле", en: "KL.1 — auxiliary relay contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KV", kind: "coil", name: { uz: "KV — kuchlanish relesi", ru: "KV — реле напряжения", en: "KV — voltage relay" } },
    ],
    explain: {
      s1: {
        uz: "Kesimning o'lchov organi — tok relesi KA.",
        ru: "Измерительный орган отсечки — реле тока KA.",
        en: "The cut-off's measuring element is the KA current relay.",
      },
      s2: {
        uz: "Sabr vaqtli kesimda KT vaqt relesi bor — shu bilan u sabr vaqtsiz kesimdan farq qiladi.",
        ru: "В отсечке с выдержкой есть реле времени KT — этим она отличается от мгновенной.",
        en: "The time-delayed cut-off has a KT time relay — this is what sets it apart from the instantaneous one.",
      },
      s3: {
        uz: "Sabr vaqtidan keyin KT.1 kontakti tutashadi.",
        ru: "По истечении выдержки контакт KT.1 замыкается.",
        en: "After the delay the KT.1 contact closes.",
      },
      s4: {
        uz: "KL oraliq relesi bajaruvchi organ vazifasini bajaradi.",
        ru: "Промежуточное реле KL выполняет роль исполнительного органа.",
        en: "The KL auxiliary relay acts as the output element.",
      },
      s5: {
        uz: "KL.1 o'chirish zanjirini qo'shadi. Bu kesimning zonasi liniyadan tashqariga chiqadi.",
        ru: "KL.1 замыкает цепь отключения. Зона такой отсечки выходит за пределы линии.",
        en: "KL.1 closes the trip circuit. This cut-off's reach extends beyond the line.",
      },
      s6: {
        uz: "YAT o'chirgichni o'chiradi. Zona keyingi RH ning toki va vaqtidan sozlanadi.",
        ru: "YAT отключает выключатель. Зона отстраивается по току и времени от последующей РЗ.",
        en: "The trip coil opens the breaker. The reach is coordinated in current and time with the next protection.",
      },
    },
  },

  /* ---------------------------------------------------------------- 11 */
  {
    id: "kesim-semi",
    lec: 15,
    diff: "easy",
    w: 360, h: 150,
    title: {
      uz: "Yarimo'tkazgich elementli tokli kesim",
      ru: "Токовая отсечка на полупроводниковых элементах",
      en: "Semiconductor current cut-off",
    },
    desc: {
      uz: "15.2,d-rasm. Bloklar ketma-ketligi: KA → YoKI → KT → KL → KH → YAT. Bloklarni joylashtiring.",
      ru: "Рис. 15.2,д. Последовательность блоков: KA → ИЛИ → KT → KL → KH → YAT. Расставьте блоки.",
      en: "Fig. 15.2d. Block sequence: KA → OR → KT → KL → KH → trip coil. Place the blocks.",
    },
    rails: { left: 18, right: 342 },
    rungs: [
      {
        y: 75,
        items: [
          { t: "fixed", label: "KA", kind: "blk", w: 44 },
          { t: "slot", id: "s1", accept: "OR", kind: "blk", w: 50 },
          { t: "slot", id: "s2", accept: "KT", kind: "blk", w: 44 },
          { t: "slot", id: "s3", accept: "KL", kind: "blk", w: 44 },
          { t: "slot", id: "s4", accept: "KH", kind: "blk", w: 44 },
        ],
      },
    ],
    parts: [
      { id: "OR", kind: "blk", name: { uz: "YoKI — mantiqiy element", ru: "ИЛИ — логический элемент", en: "OR — logic gate" } },
      { id: "KT", kind: "blk", name: { uz: "KT — vaqt organi", ru: "KT — орган времени", en: "KT — timing element" } },
      { id: "KL", kind: "blk", name: { uz: "KL — bajaruvchi organ", ru: "KL — исполнительный орган", en: "KL — output element" } },
      { id: "KH", kind: "blk", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "AND", kind: "blk", name: { uz: "VA — mantiqiy element", ru: "И — логический элемент", en: "AND — logic gate" } },
      { id: "TV", kind: "blk", name: { uz: "TV — kuchlanish trans.", ru: "TV — трансформатор напряжения", en: "TV — voltage transformer" } },
    ],
    explain: {
      s1: {
        uz: "Uchala fazaning tok relelari YoKI elementi orqali birlashtiriladi — bitta faza yetarli.",
        ru: "Реле тока трёх фаз объединяются элементом ИЛИ — достаточно одной фазы.",
        en: "The three phase current relays are combined by an OR gate — one phase is enough.",
      },
      s2: {
        uz: "KT vaqt organi (sabr vaqtli kesimda; sabr vaqtsizida u bo'lmaydi).",
        ru: "Орган времени KT (в отсечке с выдержкой; в мгновенной его нет).",
        en: "The KT timing element (in the delayed cut-off; the instantaneous one has none).",
      },
      s3: {
        uz: "KL bajaruvchi organ — chiqish signalini kuchaytiradi.",
        ru: "KL — исполнительный орган, усиливает выходной сигнал.",
        en: "KL is the output element, amplifying the signal.",
      },
      s4: {
        uz: "KH ko'rsatgich relesi ishlashni qayd qilib, YAT ga signal uzatadi.",
        ru: "Указательное реле KH фиксирует срабатывание и передаёт сигнал на YAT.",
        en: "The KH flag relay records the operation and passes the signal to the trip coil.",
      },
    },
  },

  /* ---------------------------------------------------------------- 12 */
  {
    id: "kt-kh",
    lec: 10,
    diff: "easy",
    w: 360, h: 220,
    title: {
      uz: "Vaqt va ko'rsatgich relesining ulanishi",
      ru: "Включение реле времени и указательного реле",
      en: "Connection of the time and flag relays",
    },
    desc: {
      uz: "10.8,a va 10.9-rasm. KA.1 kontakti KT vaqt relesini ishga tushiradi, KT.1 esa YAT zanjirini qo'shadi.",
      ru: "Рис. 10.8,а и 10.9. Контакт KA.1 запускает реле времени KT, а KT.1 замыкает цепь YAT.",
      en: "Figs. 10.8a and 10.9. The KA.1 contact starts the KT time relay, and KT.1 closes the trip circuit.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "fixed", label: "KA.1", kind: "no", w: 50 },
          { t: "slot", id: "s1", accept: "KT", kind: "coil", w: 44 },
        ],
      },
      {
        y: 155,
        items: [
          { t: "slot", id: "s2", accept: "KT1", kind: "no", w: 50 },
          { t: "slot", id: "s3", accept: "KH", kind: "coil", w: 40 },
          { t: "slot", id: "s4", accept: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s5", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi g'altagi", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT1", kind: "no", name: { uz: "KT.1 — vaqt relesi kontakti", ru: "KT.1 — контакт реле времени", en: "KT.1 — time relay contact" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "SQ", kind: "no", name: { uz: "SQ — yordamchi kontakt", ru: "SQ — вспомогательный контакт", en: "SQ — auxiliary contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele", ru: "KL — промежуточное реле", en: "KL — auxiliary relay" } },
      { id: "RD", kind: "res", name: { uz: "Rd — qo'shimcha qarshilik", ru: "Rд — добавочное сопротивление", en: "Rd — series resistor" } },
    ],
    explain: {
      s1: {
        uz: "KA.1 kontakti qo'shilganda plyus operativ manba KT vaqt relesining chulg'amidan o'tadi.",
        ru: "При замыкании KA.1 плюс оперативного источника проходит через обмотку реле времени KT.",
        en: "With KA.1 closed, the positive supply passes through the KT time-relay coil.",
      },
      s2: {
        uz: "Sabr vaqtidan so'ng KT.1 kontakti tutashadi.",
        ru: "По истечении выдержки контакт KT.1 замыкается.",
        en: "After the delay the KT.1 contact closes.",
      },
      s3: {
        uz: "KH ko'rsatgich relesi o'chirish g'altagi bilan ketma-ket ulanadi (10.8,a-rasm).",
        ru: "Указательное реле KH включается последовательно с катушкой отключения (рис. 10.8,а).",
        en: "The KH flag relay is connected in series with the trip coil (fig. 10.8a).",
      },
      s4: {
        uz: "SQ o'chirgichning holatini nazorat qiladi.",
        ru: "SQ контролирует положение выключателя.",
        en: "SQ supervises the breaker position.",
      },
      s5: {
        uz: "YAT g'altagi orqali o'chirgich o'chadi.",
        ru: "Через катушку YAT происходит отключение выключателя.",
        en: "The breaker trips through the YAT coil.",
      },
    },
  },

  /* ---------------------------------------------------------------- 13 */
  {
    id: "kh-parallel",
    lec: 10,
    diff: "easy",
    w: 360, h: 220,
    title: {
      uz: "Ko'rsatgich relesining parallel ulanishi",
      ru: "Параллельное включение указательного реле",
      en: "Parallel connection of the flag relay",
    },
    desc: {
      uz: "10.8,b-rasm. KH parallel ulanadi; uning o'z kontakti alohida signal zanjirini qo'shadi.",
      ru: "Рис. 10.8,б. KH включается параллельно; его собственный контакт замыкает отдельную цепь сигнала.",
      en: "Fig. 10.8b. KH is connected in parallel; its own contact closes a separate alarm circuit.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 70,
        items: [
          { t: "fixed", label: "RH", kind: "no", w: 50 },
          { t: "slot", id: "s1", accept: "KH", kind: "coil", w: 44 },
        ],
      },
      {
        y: 155,
        label: { uz: "signal zanjiri", ru: "цепь сигнала", en: "alarm circuit" },
        items: [
          { t: "slot", id: "s2", accept: "KH1", kind: "no", w: 56 },
          { t: "slot", id: "s3", accept: "SIG", kind: "blk", w: 56 },
        ],
      },
    ],
    parts: [
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
      { id: "KH1", kind: "no", name: { uz: "KH — o'z kontakti", ru: "KH — собственный контакт", en: "KH — its own contact" } },
      { id: "SIG", kind: "blk", name: { uz: "Signal (signalizatsiya)", ru: "Сигнал (сигнализация)", en: "Alarm (signalling)" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi", ru: "KT — реле времени", en: "KT — time relay" } },
    ],
    explain: {
      s1: {
        uz: "Parallel ulanishda KH chulg'ami RH kontaktidan keyin to'g'ridan to'g'ri manbaga ulanadi.",
        ru: "При параллельном включении обмотка KH подключается к источнику сразу после контакта РЗ.",
        en: "In the parallel arrangement the KH coil connects straight to the supply after the protection contact.",
      },
      s2: {
        uz: "KH ishlagach, o'z kontakti bilan alohida signal zanjirini qo'shadi.",
        ru: "Сработав, KH своим контактом замыкает отдельную цепь сигнала.",
        en: "Once operated, KH closes a separate alarm circuit with its own contact.",
      },
      s3: {
        uz: "Signalizatsiya xodimga himoya ishlaganini bildiradi.",
        ru: "Сигнализация извещает персонал о срабатывании защиты.",
        en: "The alarm notifies staff that the protection has operated.",
      },
    },
  },

  /* ---------------------------------------------------------------- 14 */
  {
    id: "kt-thermal",
    lec: 10,
    diff: "medium",
    w: 360, h: 160,
    title: {
      uz: "Termik barqaror vaqt relesi",
      ru: "Термически стойкое реле времени",
      en: "Thermally rated time relay",
    },
    desc: {
      uz: "10.11-rasm. Rd qarshilik normal holatda KT.1 oniy AJRALUVCHI kontakt bilan shuntlangan; rele ishlagach kontakt ochilib qarshilik zanjirga kiradi.",
      ru: "Рис. 10.11. Сопротивление Rд в норме шунтировано мгновенным РАЗМЫКАЮЩИМ контактом KT.1; после срабатывания контакт размыкается и сопротивление вводится.",
      en: "Fig. 10.11. The resistor Rd is normally shunted by the instantaneous BREAK contact KT.1; after operation the contact opens and the resistor is inserted.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 80,
        items: [
          { t: "fixed", label: "KA", kind: "no", w: 44 },
          { t: "slot", id: "s1", accept: "KT1", kind: "nc", w: 52 },
          { t: "slot", id: "s2", accept: "RD", kind: "res", w: 48 },
          { t: "slot", id: "s3", accept: "KT", kind: "coil", w: 44 },
        ],
      },
    ],
    parts: [
      { id: "KT1", kind: "nc", name: { uz: "KT.1 — oniy ajraluvchi kontakt", ru: "KT.1 — мгновенный размыкающий контакт", en: "KT.1 — instantaneous break contact" } },
      { id: "RD", kind: "res", name: { uz: "Rd — qo'shimcha qarshilik", ru: "Rд — добавочное сопротивление", en: "Rd — series resistor" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi chulg'ami", ru: "KT — обмотка реле времени", en: "KT — time relay coil" } },
      { id: "KT2", kind: "no", name: { uz: "KT.2 — qo'shiluvchi kontakt", ru: "KT.2 — замыкающий контакт", en: "KT.2 — make contact" } },
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele", ru: "KL — промежуточное реле", en: "KL — auxiliary relay" } },
    ],
    explain: {
      s1: {
        uz: "KT.1 — AJRALUVCHI oniy kontakt: normal holatda yopiq va Rd ni shuntlaydi.",
        ru: "KT.1 — мгновенный РАЗМЫКАЮЩИЙ контакт: в норме замкнут и шунтирует Rд.",
        en: "KT.1 is an instantaneous BREAK contact: normally closed, it shunts Rd.",
      },
      s2: {
        uz: "Rd zanjirga kiritilgach, chulg'am tokini issiqlik sharti bo'yicha ruxsat etilgan qiymatgacha cheklaydi.",
        ru: "После ввода Rд ограничивает ток обмотки до значения, допустимого по условию нагрева.",
        en: "Once inserted, Rd limits the coil current to the value permitted by the thermal condition.",
      },
      s3: {
        uz: "Relening g'altagi uzoq vaqtli tok o'tishga mo'ljallanmagan — shuning uchun bu sxema kerak.",
        ru: "Обмотка реле не рассчитана на длительное протекание тока — поэтому и нужна эта схема.",
        en: "The relay coil is not rated for continuous current — hence this arrangement.",
      },
    },
  },

  /* ---------------------------------------------------------------- 15 */
  {
    id: "kl-connect",
    lec: 10,
    diff: "easy",
    w: 360, h: 220,
    title: {
      uz: "Oraliq relening ulanish sxemasi",
      ru: "Схема включения промежуточного реле",
      en: "Auxiliary relay connection scheme",
    },
    desc: {
      uz: "10.1,a-rasm. KA tok relesi KL ni ishga tushiradi; KL.1 va KL.2 kontaktlari bir vaqtda ikkita zanjirni qo'shadi.",
      ru: "Рис. 10.1,а. Реле тока KA запускает KL; контакты KL.1 и KL.2 одновременно замыкают две цепи.",
      en: "Fig. 10.1a. The KA current relay starts KL; contacts KL.1 and KL.2 close two circuits at once.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 65,
        items: [
          { t: "fixed", label: "KA", kind: "no", w: 48 },
          { t: "slot", id: "s1", accept: "KL", kind: "coil", w: 44 },
        ],
      },
      {
        y: 140,
        items: [
          { t: "slot", id: "s2", accept: "KL1", kind: "no", w: 48 },
          { t: "fixed", label: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s3", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
      {
        y: 195,
        label: { uz: "AQU ni ishga tushirish", ru: "Пуск АПВ", en: "Auto-reclose start" },
        items: [
          { t: "slot", id: "s4", accept: "KL2", kind: "no", w: 48 },
          { t: "fixed", label: "AQU", kind: "blk", w: 52 },
        ],
      },
    ],
    parts: [
      { id: "KL", kind: "coil", name: { uz: "KL — oraliq rele g'altagi", ru: "KL — обмотка промежуточного реле", en: "KL — auxiliary relay coil" } },
      { id: "KL1", kind: "no", name: { uz: "KL.1 — birinchi kontakt", ru: "KL.1 — первый контакт", en: "KL.1 — first contact" } },
      { id: "KL2", kind: "no", name: { uz: "KL.2 — ikkinchi kontakt", ru: "KL.2 — второй контакт", en: "KL.2 — second contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi", ru: "KT — реле времени", en: "KT — time relay" } },
      { id: "KH", kind: "coil", name: { uz: "KH — ko'rsatgich relesi", ru: "KH — указательное реле", en: "KH — flag relay" } },
    ],
    explain: {
      s1: {
        uz: "Oraliq rele chulg'ami ta'minot manbasining to'la kuchlanishiga parallel ulanadi.",
        ru: "Обмотка промежуточного реле включается параллельно на полное напряжение источника.",
        en: "The auxiliary relay coil is connected in parallel across the full supply voltage.",
      },
      s2: {
        uz: "KL.1 o'chirish zanjirini qo'shadi — bu oraliq relening asosiy vazifasi.",
        ru: "KL.1 замыкает цепь отключения — основная функция промежуточного реле.",
        en: "KL.1 closes the trip circuit — the auxiliary relay's main job.",
      },
      s3: {
        uz: "YAT o'chirgichni o'chiradi.",
        ru: "YAT отключает выключатель.",
        en: "The trip coil opens the breaker.",
      },
      s4: {
        uz: "KL.2 bir vaqtning o'zida ikkinchi zanjirni — AQU ni ishga tushirish zanjirini qo'shadi.",
        ru: "KL.2 одновременно замыкает вторую цепь — цепь пуска АПВ.",
        en: "At the same time KL.2 closes a second circuit — the auto-reclose start.",
      },
    },
  },

  /* ---------------------------------------------------------------- 16 */
  {
    id: "trip-supervision",
    lec: 4,
    diff: "easy",
    w: 360, h: 150,
    title: {
      uz: "O'chirish zanjirini KH relesi bilan nazorat qilish",
      ru: "Контроль цепи отключения реле KH",
      en: "Trip-circuit supervision with the KH relay",
    },
    desc: {
      uz: "4-ma'ruza, 1.18-rasm. KH relesi saqlagichlar sozligini, YAT zanjiri butunligini va SQ kontaktlarini nazorat qiladi.",
      ru: "Лекция 4, рис. 1.18. Реле KH контролирует исправность предохранителей, целостность цепи YAT и контакты SQ.",
      en: "Lecture 4, fig. 1.18. The KH relay supervises fuse health, trip-coil continuity and the SQ contacts.",
    },
    rails: { left: 25, right: 335, showPolarity: true },
    rungs: [
      {
        y: 80,
        items: [
          { t: "slot", id: "s1", accept: "RH", kind: "no", w: 50 },
          { t: "slot", id: "s2", accept: "KH", kind: "coil", w: 40 },
          { t: "slot", id: "s3", accept: "SQ", kind: "no", w: 44 },
          { t: "slot", id: "s4", accept: "YAT", kind: "coil", w: 40 },
        ],
      },
    ],
    parts: [
      { id: "RH", kind: "no", name: { uz: "RH — himoya kontakti", ru: "РЗ — контакт защиты", en: "RP — protection contact" } },
      { id: "KH", kind: "coil", name: { uz: "KH — nazorat relesi", ru: "KH — реле контроля", en: "KH — supervision relay" } },
      { id: "SQ", kind: "no", name: { uz: "SQ — yordamchi kontakt", ru: "SQ — вспомогательный контакт", en: "SQ — auxiliary contact" } },
      { id: "YAT", kind: "coil", name: { uz: "YAT — o'chirish g'altagi", ru: "YAT — катушка отключения", en: "YAT — trip coil" } },
      { id: "KT", kind: "coil", name: { uz: "KT — vaqt relesi", ru: "KT — реле времени", en: "KT — time relay" } },
      { id: "GB", kind: "blk", name: { uz: "GB — akkumulyator", ru: "GB — аккумулятор", en: "GB — battery" } },
    ],
    explain: {
      s1: {
        uz: "Zanjir RH kontaktidan boshlanadi — himoya ishlaganda u yopiladi.",
        ru: "Цепь начинается с контакта РЗ — он замыкается при срабатывании защиты.",
        en: "The circuit begins at the protection contact, which closes when the protection operates.",
      },
      s2: {
        uz: "KH butun zanjir bo'ylab tok o'tishini nazorat qiladi: uzilish bo'lsa signal beriladi.",
        ru: "KH контролирует протекание тока по всей цепи: при обрыве подаётся сигнал.",
        en: "KH supervises current flow through the whole chain: a break raises an alarm.",
      },
      s3: {
        uz: "SQ kontakti ham nazorat qilinadigan zanjir tarkibiga kiradi.",
        ru: "Контакт SQ также входит в состав контролируемой цепи.",
        en: "The SQ contact is also part of the supervised chain.",
      },
      s4: {
        uz: "YAT g'altagining butunligi nazorat qilinadigan asosiy element hisoblanadi.",
        ru: "Целостность катушки YAT — главный контролируемый элемент.",
        en: "The integrity of the trip coil is the main supervised element.",
      },
    },
  },
];
