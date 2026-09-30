/* "Qayerga qaysi rele?" stsenariy o'yini va vaqt pog'onasi mashqi. */
window.Views = window.Views || {};

window.Views.scenario = function () {
  var el = UI.el;
  var root = el("div");
  var list = UI.shuffle(window.DATA.scenarios || []);
  var i = 0, ok = 0, bad = 0;

  root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));
  var bar = el("div", { class: "progress" });
  bar.innerHTML = '<i style="width:0%"></i>';
  root.appendChild(bar);
  var area = el("div");
  root.appendChild(area);

  function render() {
    if (i >= list.length) {
      area.innerHTML = "";
      if (ok / list.length >= 0.7) UI.confetti(80);
      area.appendChild(el("div", { class: "card center" }, [
        el("div", { style: "font-size:44px", text: "⚡" }),
        el("h2", { text: "Natija: " + Math.round(ok / list.length * 100) + "%" }),
        el("p", { class: "muted", text: "To'g'ri: " + ok + " · Xato: " + bad }),
        el("button", { class: "btn btn-primary btn-lg", text: "Yana", onclick: function () { App.go("scenario"); } }),
        el("button", { class: "btn btn-block", style: "margin-top:8px", text: "Vaqt pog'onasi mashqi", onclick: function () { App.go("timing"); } })
      ]));
      return;
    }
    var s = list[i];
    bar.firstChild.style.width = (i / list.length * 100) + "%";
    area.innerHTML = "";

    var card = el("div", { class: "card" });
    card.appendChild(el("div", { class: "row" }, [
      UI.lecBadge(s.lec),
      el("span", { class: "chip", text: s.title }),
      el("span", { class: "chip", text: (i + 1) + " / " + list.length })
    ]));

    var netBox = el("div", { class: "cbox", style: "margin:10px 0" });
    netBox.appendChild(Svg.network(window.DATA.network, s.fault, null));
    card.appendChild(netBox);
    card.appendChild(el("h3", { text: s.q, style: "font-size:15.5px;margin-bottom:10px" }));

    var answered = false, btns = [];
    var order = UI.shuffle(s.options.map(function (_, k) { return k; }));
    order.forEach(function (orig) {
      var b = el("button", { class: "opt", text: s.options[orig] });
      b.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        var good = orig === s.a;
        btns.forEach(function (x, pos) {
          x.classList.add("dim");
          if (order[pos] === s.a) { x.classList.remove("dim"); x.classList.add("ok"); }
        });
        if (!good) { b.classList.remove("dim"); b.classList.add("bad"); }

        /* to'g'ri javobda ishlagan o'chirgichni sxemada qizil qilib ko'rsatamiz */
        var qName = /^Q\d$/.test(s.options[s.a]) ? s.options[s.a] : null;
        if (qName) {
          netBox.innerHTML = "";
          netBox.appendChild(Svg.network(window.DATA.network, s.fault, qName));
        }

        if (good) { ok++; Store.addXp(7); UI.haptic(); }
        else { bad++; Store.pushMistake("quiz", "scn#" + s.id); UI.haptic("err"); }

        card.appendChild(el("div", { class: "explain" + (good ? "" : " bad") }, [
          el("b", { text: good ? "To'g'ri! " : "Tushuntirish: " }),
          document.createTextNode(s.e)
        ]));
        card.appendChild(el("button", {
          class: "btn btn-primary btn-block", style: "margin-top:10px",
          text: i + 1 >= list.length ? "Natija" : "Keyingi",
          onclick: function () { i++; render(); }
        }));
      });
      btns.push(b);
      card.appendChild(b);
    });

    area.appendChild(card);
  }

  render();
  return root;
};

/* ---------------- Vaqt pog'onasi mashqi ---------------- */
window.Views.timing = function () {
  var el = UI.el;
  var root = el("div");
  root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));

  var exList = window.DATA.timeExercises || [];
  var ex = exList[Math.floor(Math.random() * exList.length)];
  var net = window.DATA.network;

  var card = el("div", { class: "card" });
  card.appendChild(el("div", { class: "row" }, [UI.lecBadge(ex.lec), el("span", { class: "chip", text: "Δt = " + ex.dt + " s" })]));
  card.appendChild(el("h3", { text: ex.title, style: "margin:8px 0 4px" }));
  card.appendChild(el("div", { class: "tiny muted", style: "margin-bottom:10px", text: ex.desc }));

  var netBox = el("div", { class: "cbox" });
  netBox.appendChild(Svg.network(net, null, null));
  card.appendChild(netBox);

  var inputs = {};
  var order = ["RH3", "RH2", "RH1"];
  order.forEach(function (rh) {
    var given = ex.given[rh] !== undefined;
    var row = el("div", { class: "match-row" }, [
      el("div", { class: "ml", text: rh + " — " + (rh === "RH1" ? "A-B" : rh === "RH2" ? "B-C" : "C-D") + " liniyasi" })
    ]);
    var inp = el("input", { type: "number", step: "0.1", placeholder: "s", value: given ? String(ex.given[rh]) : "" });
    if (given) { inp.disabled = true; inp.style.opacity = ".7"; }
    else inputs[rh] = inp;
    row.appendChild(inp);
    card.appendChild(row);
  });

  var out = el("div");
  card.appendChild(el("button", {
    class: "btn btn-primary btn-block", style: "margin-top:8px", text: "Tekshirish",
    onclick: function () {
      var allGood = true;
      for (var rh in inputs) {
        var want = ex.answer[rh];
        var got = parseFloat(inputs[rh].value);
        var good = Math.abs(got - want) < 0.001;
        if (!good) allGood = false;
        inputs[rh].style.outline = "2px solid " + (good ? "var(--ok)" : "var(--bad)");
      }
      out.innerHTML = "";
      if (allGood) { UI.confetti(70); UI.haptic("heavy"); Store.addXp(20); }
      else UI.haptic("err");
      out.appendChild(el("div", { class: "explain" + (allGood ? "" : " bad") }, [
        el("b", { text: allGood ? "To'g'ri! " : "To'g'ri javob: " }),
        document.createTextNode(allGood ? ex.e : Object.keys(ex.answer).map(function (k) { return k + " = " + ex.answer[k] + " s"; }).join(", ") + ". " + ex.e)
      ]));
      out.appendChild(el("button", { class: "btn btn-block", style: "margin-top:8px", text: "Yangi mashq", onclick: function () { App.go("timing"); } }));
    }
  }));
  card.appendChild(out);
  root.appendChild(card);
  return root;
};
