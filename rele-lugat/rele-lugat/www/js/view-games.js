/* O'yinlar bo'limi — barcha mashq turlarining ro'yxati. */
window.Views = window.Views || {};

window.Views.games = function () {
  var el = UI.el;
  var root = el("div");

  function tile(ico, color, title, sub, route, params) {
    return el("button", { class: "tile", onclick: function () { UI.haptic(); App.go(route, params); } }, [
      el("div", { class: "tile-ico", style: "background:" + color + "22;color:" + color, text: ico }),
      el("div", { style: "min-width:0;flex:1" }, [el("b", { text: title }), el("small", { text: sub })])
    ]);
  }

  var due = Store.srsDue().length;
  var nQ = (window.DATA.quizzes || []).length;
  var nC = (window.DATA.circuits || []).length;
  var nS = (window.DATA.scenarios || []).length;
  var nR = (window.DATA.relays || []).length;

  root.appendChild(el("h2", { text: "Takrorlash", style: "margin:2px 0 8px" }));
  root.appendChild(el("div", { class: "stack" }, [
    tile("🔁", "#f5b301", "Flashcard", "Oraliqli takrorlash · " + due + " ta tayyor", "flashcards"),
    tile("📝", "#1553c7", "Testlar", nQ + " ta savol · ma'ruza bo'yicha", "quiz"),
    tile("⏱", "#e11d48", "Imtihon", "20 tasodifiy savol, 10 daqiqa", "exam")
  ]));

  root.appendChild(el("h2", { text: "O'yinlar", style: "margin:18px 0 8px" }));
  root.appendChild(el("div", { class: "stack" }, [
    tile("🔌", "#17a35b", "Sxemani yig'ing", nC + " ta sxema · drag-and-drop", "circuit"),
    tile("⚡", "#f97316", "Qayerga qaysi rele?", nS + " ta stsenariy · selektivlik", "scenario"),
    tile("🧭", "#7c3aed", "Vaqt pog'onasi", "Δt bilan MTH vaqtlarini qo'yish", "timing"),
    tile("🔎", "#0891b2", "Rele aniqlash", nR + " ta rele · tavsifga qarab toping", "relay")
  ]));

  root.appendChild(el("h2", { text: "Simulyator", style: "margin:18px 0 8px" }));
  root.appendChild(el("div", { class: "stack" }, [
    tile("🧮", "#06b6d4", "Mantiq elementlari", "YoKI · VA · EMAS · RS-trigger", "logic")
  ]));

  if (Store.s.mistakes.length) {
    root.appendChild(el("h2", { text: "Xatolar ustida ishlash", style: "margin:18px 0 8px" }));
    root.appendChild(tile("⚠️", "#e03131", "Xatolar daftari", Store.s.mistakes.length + " ta yozuv", "mistakes"));
  }

  return root;
};
