import type { Lecture, L10n } from "../types";

/** Ma'ruzalar. Manba: "Releli himoya" fani, 1-15 ma'ruzalar.
 *  8-ma'ruza PDF'i manbada yo'q — u bog'lovchi mavzu (synth). */
export const LECTURES: Lecture[] = [
  {
    id: 1,
    color: "#f5a524",
    title: {
      uz: "Releli himoyaning vazifasi. Shikastlanish turlari va nonormal rejimlar",
      ru: "Назначение релейной защиты. Виды повреждений и ненормальные режимы",
      en: "Purpose of relay protection. Fault types and abnormal modes",
    },
  },
  {
    id: 2,
    color: "#0ea5e9",
    title: {
      uz: "Rele himoyasiga qo'yiladigan talablar",
      ru: "Требования, предъявляемые к релейной защите",
      en: "Requirements for relay protection",
    },
  },
  {
    id: 3,
    color: "#8b5cf6",
    title: {
      uz: "Himoya elementlari. RH tarkibiy qismlari va asosiy elementlari",
      ru: "Элементы защиты. Структурные части и основные элементы РЗ",
      en: "Protection elements. Structural parts and main elements",
    },
  },
  {
    id: 4,
    color: "#22c55e",
    title: {
      uz: "Operativ tok manbalari",
      ru: "Источники оперативного тока",
      en: "Operating current sources",
    },
  },
  {
    id: 5,
    color: "#ef4444",
    title: {
      uz: "Tok transformatorlarining ishlash prinsipi",
      ru: "Принцип действия трансформаторов тока",
      en: "Operating principle of current transformers",
    },
  },
  {
    id: 6,
    color: "#f97316",
    title: {
      uz: "Tok transformatorlarining ulanish sxemalari",
      ru: "Схемы соединения трансформаторов тока",
      en: "Current transformer connection schemes",
    },
  },
  {
    id: 7,
    color: "#14b8a6",
    title: {
      uz: "Kuchlanish transformatorlari va ulanish sxemalari",
      ru: "Трансформаторы напряжения и схемы их соединения",
      en: "Voltage transformers and their connection schemes",
    },
  },
  {
    id: 8,
    color: "#a855f7",
    synth: true,
    title: {
      uz: "Elektromagnit relelarning ishlash prinsipi va tavsiflari",
      ru: "Принцип действия и характеристики электромагнитных реле",
      en: "Operating principle and characteristics of electromagnetic relays",
    },
  },
  {
    id: 9,
    color: "#3b82f6",
    title: {
      uz: "Elektromagnit tok va kuchlanish relesini ishlash prinsipi",
      ru: "Принцип действия электромагнитных реле тока и напряжения",
      en: "Operating principle of electromagnetic current and voltage relays",
    },
  },
  {
    id: 10,
    color: "#eab308",
    title: {
      uz: "Mantiqiy relelar: oraliq, ko'rsatgich va vaqt relesi",
      ru: "Логические реле: промежуточное, указательное и реле времени",
      en: "Logic relays: auxiliary, indicating and time relays",
    },
  },
  {
    id: 11,
    color: "#06b6d4",
    title: {
      uz: "Mikroprotsessorli (raqamli) relelar. Mantiq sxemalari",
      ru: "Микропроцессорные (цифровые) реле. Логические схемы",
      en: "Microprocessor (digital) relays. Logic diagrams",
    },
  },
  {
    id: 12,
    color: "#e11d48",
    title: {
      uz: "Tokli himoyalar. MTH ishlash prinsipi va ulanish sxemalari",
      ru: "Токовые защиты. Принцип действия МТЗ и схемы соединения",
      en: "Current protections. OCP principle and connection schemes",
    },
  },
  {
    id: 13,
    color: "#7c3aed",
    title: {
      uz: "MTH parametrlarini hisoblash",
      ru: "Расчёт параметров МТЗ",
      en: "Calculating OCP parameters",
    },
  },
  {
    id: 14,
    color: "#0891b2",
    title: {
      uz: "Kuchlanish bo'yicha ishga tushuvchi MTH",
      ru: "МТЗ с пуском по напряжению",
      en: "OCP with voltage restraint",
    },
  },
  {
    id: 15,
    color: "#65a30d",
    title: {
      uz: "Tokli kesim: ish prinsipi, sxemalari va parametrlari",
      ru: "Токовая отсечка: принцип действия, схемы и параметры",
      en: "Instantaneous current cut-off: principle, schemes and parameters",
    },
  },
];

export function lecById(id: number): Lecture {
  return (
    LECTURES.find((l) => l.id === id) ?? {
      id,
      color: "#888",
      title: { uz: "", ru: "", en: "" },
    }
  );
}

/** 8-ma'ruza haqida izoh (NOTES.md bilan mos). */
export const LECTURE8_NOTE: L10n = {
  uz:
    "8-ma'ruza PDF'i manbada yo'q. Bu bo'lim 3- va 9-ma'ruzalardagi ma'lumotlarni " +
    "bog'lovchi ko'prik sifatida tuzilgan: relening ishlash momenti, Xr.i va Xr.q " +
    "parametrlari, qaytish koeffitsienti hamda o'rnatmani rostlash. Yangi raqamli " +
    "qiymatlar kiritilmagan.",
  ru:
    "PDF лекции 8 в источнике отсутствует. Этот раздел составлен как мост между " +
    "лекциями 3 и 9: момент срабатывания реле, параметры Xр.с и Xр.в, коэффициент " +
    "возврата и регулировка уставки. Новых числовых значений не вводилось.",
  en:
    "The PDF of lecture 8 is missing from the source. This section was composed as a " +
    "bridge between lectures 3 and 9: relay operating torque, the Xop and Xres " +
    "parameters, the reset ratio and setting adjustment. No new numeric values were added.",
};
