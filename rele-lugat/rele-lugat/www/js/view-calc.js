/* Hisoblagichlar: formula, qadamma-qadam yechim va mashq rejimi. */
window.Views = window.Views || {};

window.Views.calc = function (p) {
  var el = UI.el;

  /* ---- Ro'yxat ---- */
  if (!p || !p.id) {
    var root = el("div");
    root.appendChild(el("p", { class: "small muted", text: "Formulalar ma'ruzadagi belgilar bilan beriladi va qadamma-qadam yechiladi." }));
    var groups = {};
    (window.DATA.calculators || []).forEach(function (c) { (groups[c.group] = groups[c.group] || []).push(c); });
    Object.keys(groups).forEach(function (gname) {
      root.appendChild(el("h2", { text: gname, style: "margin:14px 0 8px" }));
      var stack = el("div", { class: "stack" });
      groups[gname].forEach(function (c) {
        var lec = UI.lecById(c.lec);
        stack.appendChild(el("button", { class: "tile", onclick: function () { UI.haptic(); App.go("calc", { id: c.id }); } }, [
          el("div", { class: "tile-ico", style: "background:" + lec.color + "22;color:" + lec.color, text: "🧮" }),
          el("div", { style: "min-width:0;flex:1" }, [
            el("b", { text: c.title }),
            el("small", { text: c.formula })
          ])
        ]));
      });
      root.appendChild(stack);
    });
    return root;
  }

  /* ---- Bitta hisoblagich ---- */
  var c = null;
  (window.DATA.calculators || []).forEach(function (x) { if (x.id === p.id) c = x; });
  if (!c) return window.Views.calc({});

  var root = el("div");
  root.appendChild(UI.backBtn("Hisoblagichlar", function () { App.go("calc"); }));

  var practice = false;
  var target = null;   // mashq rejimidagi to'g'ri javob

  var card = el("div", { class: "card" });
  root.appendChild(card);

  var inputs = {};
  var outBox = el("div");

  function build() {
    card.innerHTML = "";
    card.appendChild(el("div", { class: "row" }, [
      UI.lecBadge(c.lec),
      el("span", { class: "chip", text: c.ref }),
      el("span", { class: "spacer" }),
      el("button", {
        class: "chip" + (practice ? " on" : ""), text: practice ? "Mashq rejimi" : "Mashq rejimi",
        onclick: function () { practice = !practice; UI.haptic(); if (practice) newTask(); else build(); }
      })
    ]));
    card.appendChild(el("h3", { text: c.title, style: "margin:10px 0 6px" }));
    card.appendChild(el("div", { class: "formula", text: c.formula }));
    if (c.note) card.appendChild(el("div", { class: "tiny muted", style: "margin-bottom:10px", text: c.note }));

    inputs = {};
    c.v.forEach(function (v) {
      var f = el("label", { class: "field" });
      f.appendChild(el("span", { text: v.label }));
      var inp = el("input", { type: "number", step: "any", value: String(v.d) });
      inputs[v.k] = inp;
      f.appendChild(inp);
      if (v.hint) f.appendChild(el("div", { class: "tiny muted", style: "margin-top:4px", text: v.hint }));
      card.appendChild(f);
    });

    card.appendChild(el("button", {
      class: "btn btn-primary btn-block", text: "Hisoblash", onclick: solve
    }));
    card.appendChild(outBox);
    outBox.innerHTML = "";
  }

  function values() {
    var x = {};
    c.v.forEach(function (v) {
      var n = parseFloat(inputs[v.k].value);
      x[v.k] = isNaN(n) ? v.d : n;
    });
    return x;
  }

  function solve() {
    var res = c.run(values());
    outBox.innerHTML = "";
    outBox.appendChild(el("div", { class: "result", text: res.value + (res.unit ? " " + res.unit : "") }));
    var ol = el("ol", { class: "steps" });
    res.steps.forEach(function (s) { ol.appendChild(el("li", { text: s })); });
    outBox.appendChild(ol);
    UI.haptic();
    outBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---- Mashq rejimi ---- */
  function newTask() {
    var vals = c.gen();
    target = c.run(vals);
    card.innerHTML = "";
    card.appendChild(el("div", { class: "row" }, [
      UI.lecBadge(c.lec),
      el("span", { class: "chip", text: c.ref }),
      el("span", { class: "spacer" }),
      el("button", { class: "chip on", text: "Mashqni yopish", onclick: function () { practice = false; build(); } })
    ]));
    card.appendChild(el("h3", { text: c.title, style: "margin:10px 0 6px" }));
    card.appendChild(el("div", { class: "formula", text: c.formula }));

    var list = el("ul", { class: "small", style: "margin:0 0 12px;padding-left:18px" });
    c.v.forEach(function (v) {
      list.appendChild(el("li", { text: v.label.split("—")[0].trim() + " = " + vals[v.k] }));
    });
    card.appendChild(el("div", { class: "small", style: "font-weight:700", text: "Berilgan:" }));
    card.appendChild(list);

    var ans = el("input", { type: "number", step: "any", placeholder: "Javobingiz" + (target.unit ? ", " + target.unit : "") });
    card.appendChild(el("label", { class: "field" }, [el("span", { text: "Javob" }), ans]));

    var res = el("div");
    card.appendChild(el("div", { class: "grid2" }, [
      el("button", { class: "btn", text: "Yechimni ko'rsatish", onclick: function () { showSolution(res, null); } }),
      el("button", {
        class: "btn btn-primary", text: "Tekshirish",
        onclick: function () {
          var g = parseFloat(ans.value);
          if (isNaN(g)) { UI.toast("Javob kiriting"); return; }
          var tol = Math.max(Math.abs(target.value) * 0.02, 0.01);
          var good = Math.abs(g - target.value) <= tol;
          if (good) { UI.confetti(60); UI.haptic("heavy"); Store.addXp(12); }
          else UI.haptic("err");
          showSolution(res, good);
        }
      })
    ]));
    card.appendChild(res);
  }

  function showSolution(res, good) {
    res.innerHTML = "";
    if (good !== null) {
      res.appendChild(el("div", { class: "explain" + (good ? "" : " bad") }, [
        el("b", { text: good ? "To'g'ri! " : "Noto'g'ri. " }),
        document.createTextNode("To'g'ri javob: " + target.value + (target.unit ? " " + target.unit : ""))
      ]));
    }
    var ol = el("ol", { class: "steps" });
    target.steps.forEach(function (s) { ol.appendChild(el("li", { text: s })); });
    res.appendChild(ol);
    res.appendChild(el("button", { class: "btn btn-block", style: "margin-top:8px", text: "Yangi misol", onclick: newTask }));
  }

  build();
  return root;
};
