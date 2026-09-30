/* Bosh sahifa: daraja, statistika, bugungi atama, ma'ruza progressi. */
window.Views = window.Views || {};

window.Views.home = function () {
  var el = UI.el, S = Store.s, lv = Store.level();
  var root = el("div");

  /* Salom + daraja */
  var hero = el("div", { class: "hero" }, [
    el("h2", { text: "Salom, " + S.name + "!" }),
    el("div", { class: "small" }, [
      el("b", { text: lv.name }),
      document.createTextNode("  ·  " + S.xp + " XP"),
      lv.next ? document.createTextNode("  ·  " + lv.toNext + " XP → " + lv.next) : null
    ]),
    (function () { var b = el("div", { class: "xpbar" }); b.innerHTML = '<i style="width:' + lv.pct + '%"></i>'; return b; })()
  ]);
  root.appendChild(hero);

  /* Statistika */
  var due = Store.srsDue().length;
  var stats = el("div", { class: "stat-grid" }, [
    el("div", { class: "stat" }, [el("b", { text: String(S.streak) }), el("span", { text: "kun streak" })]),
    el("div", { class: "stat" }, [el("b", { text: String(Store.learnedCount()) }), el("span", { text: "atama yodlangan" })]),
    el("div", { class: "stat" }, [el("b", { text: String(S.mistakes.length) }), el("span", { text: "xato daftarda" })])
  ]);
  root.appendChild(stats);

  /* Bugungi atama */
  var dt = Store.dayTerm();
  if (dt) {
    root.appendChild(el("div", { class: "card" }, [
      el("div", { class: "row" }, [
        el("span", { class: "badge badge-soft", text: "⭐ Bugungi atama" }),
        UI.lecBadge(dt.l)
      ]),
      el("h2", { text: dt.t, style: "margin-top:8px" }),
      dt.f ? el("div", { class: "small muted", text: dt.f }) : null,
      el("p", { class: "small", text: dt.d, style: "margin-top:8px" })
    ]));
  }

  /* Tezkor harakatlar */
  function tile(ico, color, title, sub, fn) {
    return el("button", { class: "tile", onclick: function () { UI.haptic(); fn(); } }, [
      el("div", { class: "tile-ico", style: "background:" + color + "22;color:" + color, text: ico }),
      el("div", { style: "min-width:0" }, [el("b", { text: title }), el("small", { text: sub })])
    ]);
  }

  root.appendChild(el("h2", { text: "Bugun nima qilamiz?", style: "margin:16px 0 8px" }));
  root.appendChild(el("div", { class: "stack" }, [
    tile("🔁", "#f5b301", "Takrorlash", due + " ta atama takrorlashga tayyor", function () { App.go("flashcards"); }),
    tile("📝", "#1553c7", "Test yechish", "Ma'ruza bo'yicha savollar", function () { App.go("quiz"); }),
    tile("🔌", "#17a35b", "Sxema yig'ish", "Drag-and-drop konstruktor", function () { App.go("circuit"); }),
    S.mistakes.length ? tile("⚠️", "#e03131", "Xatolar daftari", S.mistakes.length + " ta yozuv qayta mashq kutmoqda", function () { App.go("mistakes"); }) : null
  ]));

  /* Ma'ruzalar progressi */
  root.appendChild(el("h2", { text: "Ma'ruzalar", style: "margin:18px 0 8px" }));
  var grid = el("div", { class: "lec-grid" });
  (window.DATA.lectures || []).forEach(function (L) {
    var p = Store.lecProgress(L.id);
    var cell = el("button", { class: "lec-cell", onclick: function () { UI.haptic(); App.go("quiz", { lec: L.id }); } });
    cell.appendChild(UI.ring(p, L.color, String(L.id)));
    cell.appendChild(el("small", { text: L.title }));
    cell.appendChild(el("div", { class: "tiny muted", text: p + "%", style: "margin-top:2px" }));
    grid.appendChild(cell);
  });
  root.appendChild(grid);

  root.appendChild(el("p", { class: "tiny muted center", style: "margin-top:16px",
    text: "Barcha ta'rif, formula va qiymatlar \"Releli himoya\" fanining 1-15 ma'ruzalaridan olingan." }));

  return root;
};
