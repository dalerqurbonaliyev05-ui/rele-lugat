/* Ilova yadrosi: marshrutlash, mavzu, birinchi ishga tushirish. */
(function () {
  "use strict";

  var view = document.getElementById("view");
  var barTitle = document.getElementById("bar-title");
  var barSub = document.getElementById("bar-sub");

  var TABS = { home: 1, glossary: 1, games: 1, calc: 1, profile: 1 };
  var TITLES = {
    home: ["Rele Lug'at", "Releli himoya"],
    glossary: ["Lug'at", "Atamalar va qisqartmalar"],
    games: ["O'yinlar", "Mashq va simulyatorlar"],
    calc: ["Hisoblagichlar", "Formulalar va mashq"],
    profile: ["Profil", "Natijalar va nishonlar"],
    flashcards: ["Flashcard", "Oraliqli takrorlash"],
    quiz: ["Testlar", "Ma'ruza bo'yicha"],
    circuit: ["Sxema konstruktori", "Detallarni joylashtiring"],
    scenario: ["Stsenariy", "Qayerga qaysi rele?"],
    timing: ["Vaqt pog'onasi", "Δt mashqi"],
    logic: ["Mantiq simulyatori", "YoKI / VA / EMAS / RS"],
    relay: ["Rele aniqlash", "Tavsifga qarab toping"],
    exam: ["Imtihon", "20 tasodifiy savol"],
    mistakes: ["Xatolar daftari", "Qayta mashq"]
  };

  var current = { route: "home", params: {} };

  function go(route, params) {
    current = { route: route, params: params || {} };
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    var fn = window.Views[current.route];
    if (!fn) fn = window.Views.home;
    view.innerHTML = "";
    var node;
    try {
      node = fn(current.params);
    } catch (err) {
      node = UI.el("div", { class: "card" }, [
        UI.el("h2", { text: "Xatolik" }),
        UI.el("p", { class: "small muted", text: String(err && err.message || err) })
      ]);
      if (window.console) console.error(err);
    }
    view.appendChild(node);

    var t = TITLES[current.route] || TITLES.home;
    barTitle.textContent = t[0];
    barSub.textContent = t[1];

    var tabName = TABS[current.route] ? current.route :
      (current.route === "flashcards" || current.route === "quiz" || current.route === "circuit" ||
       current.route === "scenario" || current.route === "logic" || current.route === "relay" ||
       current.route === "exam" || current.route === "timing" ? "games" :
       current.route === "mistakes" ? "profile" : "home");
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) {
      b.classList.toggle("on", b.getAttribute("data-tab") === tabName);
    });
    document.getElementById("streak-n").textContent = Store.s.streak;
    flushBadges();
  }

  function flushBadges() {
    var nb = Store.takeNewBadges();
    if (!nb.length) return;
    UI.confetti(90);
    UI.haptic("heavy");
    UI.toast("🏅 Yangi nishon: " + nb[0].name, 2600);
  }

  /* ---- Mavzu ---- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", Store.s.theme);
    document.getElementById("theme-btn").textContent = Store.s.theme === "dark" ? "☀️" : "🌙";
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", Store.s.theme === "dark" ? "#17233d" : "#1553c7");
  }
  document.getElementById("theme-btn").addEventListener("click", function () {
    Store.s.theme = Store.s.theme === "dark" ? "light" : "dark";
    Store.save(); applyTheme(); UI.haptic();
  });

  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) {
    b.addEventListener("click", function () { UI.haptic(); go(b.getAttribute("data-tab")); });
  });

  /* ---- Birinchi ishga tushirish ---- */
  function startApp() {
    Store.touchDay();
    applyTheme();
    go("home");
  }

  Store.load();
  applyTheme();

  if (!Store.s.name) {
    var ob = document.getElementById("onboard");
    ob.classList.remove("hidden");
    var inp = document.getElementById("onboard-name");
    document.getElementById("onboard-go").addEventListener("click", function () {
      var v = (inp.value || "").trim();
      if (!v) { inp.focus(); UI.toast("Ismingizni kiriting"); return; }
      Store.s.name = v.slice(0, 24);
      Store.save();
      ob.classList.add("hidden");
      UI.haptic("heavy");
      startApp();
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") document.getElementById("onboard-go").click();
    });
  } else {
    startApp();
  }

  window.App = { go: go, render: render, get route() { return current.route; } };
})();
