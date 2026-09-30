/* Ma'ruzalar ro'yxati.
   Manba: "Releli himoya" fanidan 1-15 ma'ruzalar (8-ma'ruza PDF'i mavjud emas).
   `synth: true` — ma'ruza asl manbada yo'q, boshqa ma'ruzalardagi
   faktlar asosida tuzilgan (NOTES.md ga qarang). */
window.DATA = window.DATA || {};

window.DATA.lectures = [
  { id: 1,  title: "Releli himoyaning vazifasi. Shikastlanish turlari va nonormal rejimlar", color: "#f5a524", icon: "bolt" },
  { id: 2,  title: "Rele himoyasiga qo'yiladigan talablar", color: "#0ea5e9", icon: "check" },
  { id: 3,  title: "Himoya elementlari. RH tarkibiy qismlari va asosiy elementlari", color: "#8b5cf6", icon: "chip" },
  { id: 4,  title: "Operativ tok manbalari", color: "#22c55e", icon: "battery" },
  { id: 5,  title: "Tok transformatorlarining ishlash prinsipi", color: "#ef4444", icon: "coil" },
  { id: 6,  title: "Tok transformatorlarining ulanish sxemalari", color: "#f97316", icon: "star" },
  { id: 7,  title: "Kuchlanish transformatorlari va ulanish sxemalari", color: "#14b8a6", icon: "volt" },
  { id: 8,  title: "Elektromagnit relelarning ishlash prinsipi va tavsiflari", color: "#a855f7", icon: "magnet", synth: true },
  { id: 9,  title: "Elektromagnit tok va kuchlanish relesini ishlash prinsipi", color: "#3b82f6", icon: "relay" },
  { id: 10, title: "Mantiqiy relelar: oraliq, ko'rsatgich va vaqt relesi", color: "#eab308", icon: "clock" },
  { id: 11, title: "Mikroprotsessorli (raqamli) relelar. Mantiq sxemalari", color: "#06b6d4", icon: "cpu" },
  { id: 12, title: "Tokli himoyalar. MTH ishlash prinsipi va ulanish sxemalari", color: "#e11d48", icon: "shield" },
  { id: 13, title: "MTH parametrlarini hisoblash", color: "#7c3aed", icon: "calc" },
  { id: 14, title: "Kuchlanish bo'yicha ishga tushuvchi MTH", color: "#0891b2", icon: "lock" },
  { id: 15, title: "Tokli kesim: ish prinsipi, sxemalari va parametrlari", color: "#65a30d", icon: "cut" }
];

/* 8-ma'ruza mazmuni (muallif tomonidan tuzilgan bog'lovchi mavzu).
   Faqat 3- va 9-ma'ruzalardagi faktlarni umumlashtiradi, yangi son yoki
   ta'rif kiritmaydi. */
window.DATA.lecture8note =
  "8-ma'ruza PDF'i manbada yo'q. Bu bo'lim 3- va 9-ma'ruzalardagi " +
  "ma'lumotlarni bog'lovchi ko'prik sifatida tuzilgan: elektromagnit " +
  "relening ishlash momenti, Xr.i ishlash va Xr.q qaytish parametrlari, " +
  "qaytish koeffitsienti hamda o'rnatmani prujina yoki chulg'am " +
  "ulanishi orqali rostlash. Yangi raqamli qiymatlar kiritilmagan.";
