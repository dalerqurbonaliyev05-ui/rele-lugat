/* Mantiq elementlari simulyatori (11-ma'ruza):
   YoKI, VA, EMAS, RS-trigger + yonma-yon rele-kontakt ekvivalenti. */
window.Views = window.Views || {};

window.Views.logic = function () {
  var el = UI.el;
  var root = el("div");
  root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));

  var GATES = [
    { id: "yoki", name: "YoKI", n: 2, desc: "Mantiqiy qo'shish. Rele sxemasida parallel ulanishga mos keladi: kirishlardan kamida bittasi 1 bo'lsa chiqish 1." },
    { id: "va", name: "VA", n: 2, desc: "Mantiqiy ko'paytirish. Ketma-ket ulanishga mos keladi: barcha kirishlar 1 bo'lgandagina chiqish 1." },
    { id: "emas", name: "EMAS", n: 1, desc: "Inversiya. Kirishda 1 bo'lsa chiqish 0, kirishda 0 bo'lsa chiqish 1. Sxemalarda ko'pincha doira bilan belgilanadi." },
    { id: "rs", name: "RS-trigger", n: 2, desc: "Elementar xotira yacheykasi. S = 1 → chiqish 1; R = 1 → chiqish 0; ikkalasi 0 bo'lsa oldingi holat saqlanadi. Bu yerda R ustuvorligi bilan." }
  ];

  var cur = GATES[0];
  var ins = [false, false];
  var q = false;   // RS-trigger holati

  var chips = el("div", { class: "chip-row" });
  root.appendChild(chips);
  var box = el("div");
  root.appendChild(box);

  function out() {
    if (cur.id === "yoki") return ins[0] || ins[1];
    if (cur.id === "va") return ins[0] && ins[1];
    if (cur.id === "emas") return !ins[0];
    /* RS, R ustuvorligi bilan: ins[0]=S, ins[1]=R */
    if (ins[1]) q = false;
    else if (ins[0]) q = true;
    return q;
  }

  function drawChips() {
    chips.innerHTML = "";
    GATES.forEach(function (g) {
      chips.appendChild(el("button", {
        class: "chip" + (g.id === cur.id ? " on" : ""), text: g.name,
        onclick: function () { cur = g; ins = [false, false]; q = false; UI.haptic(); draw(); }
      }));
    });
  }

  function draw() {
    drawChips();
    box.innerHTML = "";
    var o = out();

    var card = el("div", { class: "logic-card" });
    card.appendChild(el("div", { class: "row" }, [UI.lecBadge(11), el("b", { text: cur.name })]));
    card.appendChild(el("p", { class: "small muted", style: "margin-top:8px", text: cur.desc }));

    /* Kirish tugmalari */
    var names = cur.id === "rs" ? ["S (Set)", "R (Reset)"] : ["KL1", "KL2"];
    for (var k = 0; k < cur.n; k++) {
      (function (idx) {
        var btn = el("button", { class: ins[idx] ? "on" : "" }, el("i"));
        btn.addEventListener("click", function () { ins[idx] = !ins[idx]; UI.haptic(); draw(); });
        card.appendChild(el("div", { class: "sw" }, [
          btn,
          el("div", [
            el("b", { class: "small", text: names[idx] }),
            el("div", { class: "tiny muted", text: ins[idx] ? "mantiqiy 1 — kontakt qo'shilgan" : "mantiqiy 0 — kontakt ochiq" })
          ])
        ]));
      })(k);
    }

    card.appendChild(el("div", { class: "row", style: "margin-top:10px" }, [
      el("b", { class: "small", text: "Chiqish:" }),
      el("div", { class: "out-lamp" + (o ? " on" : ""), text: o ? "1" : "0" })
    ]));
    box.appendChild(card);

    /* Mantiqiy belgisi */
    var g1 = el("div", { class: "logic-card" });
    g1.appendChild(el("div", { class: "small muted", style: "margin-bottom:6px", text: "Mantiqiy element" }));
    g1.appendChild(Svg.logicGate(cur.id, ins.slice(0, cur.n), o));
    box.appendChild(g1);

    /* Rele-kontakt ekvivalenti */
    if (cur.id === "yoki" || cur.id === "va") {
      var g2 = el("div", { class: "logic-card" });
      g2.appendChild(el("div", { class: "small muted", style: "margin-bottom:6px",
        text: "Ekvivalent rele-kontakt sxemasi (" + (cur.id === "va" ? "ketma-ket" : "parallel") + " ulanish)" }));
      g2.appendChild(Svg.logicRelay(cur.id, ins.slice(0, cur.n), o));
      box.appendChild(g2);
    }

    /* Haqiqat jadvali */
    var t = el("div", { class: "logic-card" });
    t.appendChild(el("div", { class: "small muted", style: "margin-bottom:4px", text: "Haqiqat jadvali" }));
    var tbl = el("table", { class: "truth" });
    var rows;
    if (cur.id === "emas") rows = [[0], [1]];
    else rows = [[0, 0], [0, 1], [1, 0], [1, 1]];
    var head = "<tr>";
    for (var c2 = 0; c2 < cur.n; c2++) head += "<th>" + (cur.id === "rs" ? (c2 === 0 ? "S" : "R") : "KL" + (c2 + 1)) + "</th>";
    head += "<th>chiqish</th></tr>";
    var body = "";
    rows.forEach(function (r) {
      var v;
      if (cur.id === "yoki") v = r[0] || r[1];
      else if (cur.id === "va") v = r[0] && r[1];
      else if (cur.id === "emas") v = !r[0];
      else v = r[1] ? 0 : (r[0] ? 1 : "Q");   // RS: oldingi holat
      var isCur = r.every(function (x, idx) { return !!x === !!ins[idx]; });
      body += '<tr class="' + (isCur ? "cur" : "") + '">';
      r.forEach(function (x) { body += "<td>" + x + "</td>"; });
      body += "<td>" + (v === "Q" ? "Q (oldingi)" : (v ? 1 : 0)) + "</td></tr>";
    });
    tbl.innerHTML = head + body;
    t.appendChild(tbl);
    box.appendChild(t);
  }

  draw();
  return root;
};
