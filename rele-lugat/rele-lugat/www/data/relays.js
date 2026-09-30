/* "Rele aniqlash mashqi" uchun relelar bazasi.
   Manba: 9-ma'ruza (9.1, 9.2, 9.3-jadvallar), 10-ma'ruza, 12-ma'ruza.
   clues[] - tavsif bo'yicha topish uchun ipucha; birinchisi eng qiyin. */
window.DATA = window.DATA || {};

window.DATA.relays = [
{
  id: "RT-40", name: "RT-40", lec: 9, kind: "Tok relesi",
  short: "Elektromagnit maksimal tok relesi",
  desc: "ChEAZ ishlab chiqargan o'zgaruvchan tokning elektromagnit maksimal tok relesi. Nazorat qilinadigan zanjirlarda tokning oshishiga ta'sir qiluvchi organ.",
  clues: [
    "Menda P shaklidagi elektromagnit va ikkita chulg'am bor.",
    "Chulg'amlarimni parallel ulasangiz o'rnatma ikki barobar oshadi.",
    "Menda kvars qumi bilan to'ldirilgan tebranish so'ndiruvchi baraban bor.",
    "Men MTH va tokli kesimning o'lchov organiman."
  ],
  facts: [
    "O'rnatma oraliqlari: RT40/0,2 dan RT40/200 gacha (9.1-jadval)",
    "Qaytish koeffitsienti birinchi o'rnatmada 0,85 dan, qolganlarida 0,8 dan kam emas",
    "RT-40/100 va RT-40/200 da kqay kamida 0,7",
    "Iri bo'yicha asosiy chegaraviy xatolik 5 % dan katta emas",
    "Ishlash vaqti 1,2Iri da 0,1 s dan, 3Iri da 0,03 s dan katta emas"
  ]
},
{
  id: "RN-53", name: "RN-53", lec: 9, kind: "Kuchlanish relesi",
  short: "Maksimal kuchlanish relesi",
  desc: "O'zgaruvchan tok zanjirlarida kuchlanishning oshishiga ta'sir javob beruvchi organ.",
  clues: [
    "Mening konstruksiyam RT-40 ga o'xshaydi, lekin barabanim yo'q.",
    "Chulg'amlarim to'g'rilagich ko'prik va R1, R2 qarshiliklar orqali ulanadi.",
    "Men kuchlanishning oshishiga javob beraman.",
    "Qaytish koeffitsientim 0,8 dan kam emas."
  ],
  facts: [
    "Turlari: RN53/60, RN53/200, RN53/400 (9.2-jadval)",
    "Uri bo'yicha asosiy chegaraviy xatolik 10 % dan katta emas",
    "Nominal chastota 50, 60 Gs",
    "400 V li relede diodlarni saqlash uchun chulg'am kondensator bilan shuntlanadi"
  ]
},
{
  id: "RN-54", name: "RN-54", lec: 9, kind: "Kuchlanish relesi",
  short: "Minimal kuchlanish relesi",
  desc: "Kuchlanishning pasayishiga ta'sir qiluvchi element. Konstruksiyasi va ichki sxemasi RN-53 bilan bir xil.",
  clues: [
    "Qaytish koeffitsientim birdan katta.",
    "Men kuchlanish pasayganda ishlayman.",
    "Kuchlanish bo'yicha ishga tushuvchi MTH da blokirovka vazifasini bajaraman.",
    "RN-53 dan faqat o'rnatmalarni rostlash va shkala darajasi bilan farq qilaman."
  ],
  facts: [
    "Turlari: RN54/48, RN54/160, RN54/320 (9.3-jadval)",
    "Qaytish koeffitsienti 1,25 dan oshmaydi",
    "Kontaktning qo'shilish vaqti 0,8Uri da 0,15 s dan, 0,5Uri da 0,1 s dan katta emas"
  ]
},
{
  id: "RP-23", name: "RP-23", lec: 10, kind: "Oraliq rele",
  short: "Tez ishlovchi oraliq rele (o'zgarmas tok)",
  desc: "O'zgarmas operativ tokli RH sxemalari uchun buraluvchi yakorli oraliq rele.",
  clues: [
    "Menda beshta kontakt bor, ular turli kombinatsiyalarda ishlatiladi.",
    "Mening ishlash vaqtim taxminan 0,06 s.",
    "Nominal kuchlanishda iste'molim 6 Vt dan oshmaydi.",
    "Men o'zgarmas operativ tokli sxemalarda oraliq rele vazifasini bajaraman."
  ],
  facts: [
    "O'zgaruvchan tok uchun analogi — RP-25 (iste'moli 10 VA gacha)",
    "O'rniga RP-16-1 va RP-16-7 relelari ishlab chiqarilmoqda",
    "O'zgarmas tokda 110, 127 va 220 V kuchlanishda ishlab chiqariladi"
  ]
},
{
  id: "RP-251", name: "RP-251", lec: 10, kind: "Oraliq rele",
  short: "Sekin ishlovchi oraliq rele",
  desc: "Magnit o'tkazgichida qisqa tutashtirilgan kontur (misli gilza) bo'lgan oraliq rele.",
  clues: [
    "Magnit o'tkazgichimda misli gilza bor.",
    "Men ishlaganda ham, qaytganda ham biroz kechikaman.",
    "Mening sabr vaqtim 0,07-0,11 s.",
    "Men oraliq rele bo'lsam ham, sekin ishlayman."
  ],
  facts: [
    "Gilzadagi I2 tok asosiy chulg'amdagi tok o'sishiga qarshi ta'sir qiladi",
    "Qaytishda ham yakor sekin ajraladi"
  ]
},
{
  id: "RP-341", name: "RP-341", lec: 10, kind: "Oraliq tok relesi",
  short: "Quvvatli kontaktli oraliq tok relesi",
  desc: "O'zgaruvchan operativ tokli RH uchun, TT ikkilamchi zanjiriga ulanadigan rele.",
  clues: [
    "Men TT ning ikkilamchi zanjiriga ulanaman.",
    "Kontaktlarim 100-150 A o'zgaruvchan tokni qo'shib o'chira oladi.",
    "Tarkibimda oraliq to'yintirilgan transformator va to'g'rilagich bor.",
    "Men o'zgaruvchan operativ tokli sxemalarda ishlayman."
  ],
  facts: [
    "RP-321 turi bilan bir qatorda ishlab chiqariladi",
    "Tarkibida to'g'rilangan tokni silliqlovchi kondensator mavjud"
  ]
},
{
  id: "RU-21", name: "RU-21", lec: 10, kind: "Ko'rsatgich relesi",
  short: "Bayroqchali ko'rsatgich (signal) relesi",
  desc: "RH yoki uning strukturaviy qismi ishlaganini qayd qilish uchun xizmat qiladi.",
  clues: [
    "Menda bayroqcha va qaytaruvchi knopka bor.",
    "Men ishlaganimni tiniq qoplama orqali ko'rish mumkin.",
    "Xodim meni qo'lda qaytarmaguncha ishlagan holatda qolaman.",
    "Men himoyaning ishlaganini qayd qilaman."
  ],
  facts: [
    "Ketma-ket (10.8,a) va parallel (10.8,b) ulanish uchun ishlab chiqariladi",
    "Xuddi shu funksiyani ES turidagi signal relesi ham bajaradi",
    "Odatda YAT o'chirish g'altagi bilan ketma-ket ulanadi"
  ]
},
{
  id: "RV-100", name: "RV-100", lec: 10, kind: "Vaqt relesi",
  short: "O'zgarmas tokli soat mexanizmli vaqt relesi",
  desc: "RH ishini sun'iy ravishda sekinlashtirish uchun xizmat qiladigan vaqt relesi.",
  clues: [
    "Mening ichimda soat mexanizmi va ankerli qurilma bor.",
    "Men o'zgarmas tokda ishlayman.",
    "Sabr vaqtimni kontaktlarni surish orqali rostlaysiz.",
    "MTH ning selektivligini men ta'minlayman."
  ],
  facts: [
    "O'zgarmas tok qatori: RV-100, RV-120, RV-130, RV-140",
    "12.4-rasmdagi MTH sxemasida vaqt organi sifatida ishlatilgan",
    "3,5 s shkalada xatolik ±0,06 s dan oshmaydi"
  ]
},
{
  id: "RV-200", name: "RV-200", lec: 10, kind: "Vaqt relesi",
  short: "O'zgaruvchan tokli vaqt relesi",
  desc: "Soat mexanizmining prujinasi doim tortilgan holatda bo'ladigan vaqt relesi.",
  clues: [
    "Mening harakatlantiruvchi prujinam doim tortilgan turadi.",
    "Kontaktlarim yopilish vaqtini qo'zg'almas kontakt holatini o'zgartirib sozlaysiz.",
    "Harakat tezligim yukchalar holati bilan sozlanadi.",
    "Men o'zgaruvchan tokda ishlovchi vaqt relesiman."
  ],
  facts: [
    "O'zgaruvchan tok qatori: RV-210, RV-220, RV-230",
    "Friksion mahkamlash moslamasi tez qaytishni ta'minlaydi",
    "ChAEZ elektron bazada RV-01 va RV-03 turlarini ham ishlab chiqaradi"
  ]
},
{
  id: "RT-80", name: "RT-80", lec: 12, kind: "Tok relesi",
  short: "Sabr vaqti tokka bog'liq induksion tok relesi",
  desc: "Ishlash vaqti tok kattaligiga bog'liq bo'lgan tok relesi.",
  clues: [
    "Mening ishlash vaqtim tok qancha katta bo'lsa, shuncha kichik.",
    "Men bilan ishlagan sxemada vaqt, oraliq va ko'rsatgich relelari kerak emas.",
    "Menda yetarli quvvatli kontakt va signal bayroqchasi bor.",
    "Men bog'liq xarakteristikali MTH ni tashkil qilaman."
  ],
  facts: [
    "RT-90 turi bilan bir qatorda ishlatiladi",
    "Bog'liq xarakteristikali MTH da Δt = 0,6-1 s",
    "Inersion xatolik vaqti ti Δt ga qo'shiladi (13.10-formula)",
    "Kesimda ishlatilsa ksoz = 1,5 qabul qilinadi"
  ]
}
];
