/* "Sxemani o'zingiz yig'ing" — drag-and-drop konstruktor.
   Pointer events ishlatilgan: sensorli ekranda ham, sichqonchada ham ishlaydi. */
window.Views = window.Views || {};

window.Views.circuit = function (p) {
  var el = UI.el;

  /* ---- Sxema tanlash ---- */
  if (!p || !p.id) {
    var root = el("div");
    root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));
    root.appendChild(el("p", { class: "small muted", text: "Sxemani tanlang. Detallarni yuqoridagi palitradan bo'sh joylarga tortib qo'ying." }));
    var stack = el("div", { class: "stack" });
    (window.DATA.circuits || []).forEach(function (c) {
      var best = Store.s.circuits[c.id];
      var lec = UI.lecById(c.lec);
      stack.appendChild(el("button", { class: "tile", onclick: function () { UI.haptic(); App.go("circuit", { id: c.id }); } }, [
        el("div", { class: "tile-ico", style: "background:" + lec.color + "22;color:" + lec.color, text: "🔌" }),
        el("div", { style: "min-width:0;flex:1" }, [
          el("b", { text: c.title }),
          el("small", { text: c.lec + "-ma'ruza · " + c.diff + (best !== undefined ? " · eng yaxshi " + best + "%" : "") })
        ]),
        best === 100 ? el("span", { style: "font-size:18px", text: "✅" }) : null
      ]));
    });
    root.appendChild(stack);
    return root;
  }

  /* ---- Konstruktor ---- */
  var c = null;
  (window.DATA.circuits || []).forEach(function (x) { if (x.id === p.id) c = x; });
  if (!c) return window.Views.circuit({});

  var state = {};      // slotId -> partId
  var results = null;  // tekshirilgandan keyin
  var wrap = el("div");

  wrap.appendChild(UI.backBtn("Sxemalar", function () { App.go("circuit"); }));
  wrap.appendChild(el("div", { class: "card tight" }, [
    el("div", { class: "row" }, [UI.lecBadge(c.lec), el("span", { class: "chip", text: c.diff })]),
    el("h3", { text: c.title, style: "margin:8px 0 4px" }),
    el("div", { class: "tiny muted", text: c.desc })
  ]));

  var paletteBox = el("div", { class: "palette" });
  var hint = el("div", { class: "slot-hint" });
  var cbox = el("div", { class: "cbox" });
  var actions = el("div", { class: "grid2" });
  var explainBox = el("div");

  /* Sxema tepada, palitra pastda — telefonda tortish qulay bo'lishi uchun */
  wrap.appendChild(cbox);
  wrap.appendChild(hint);
  wrap.appendChild(paletteBox);
  wrap.appendChild(actions);
  wrap.appendChild(explainBox);

  function slotIds() {
    if (c.type === "ladder") {
      var out = [];
      c.rungs.forEach(function (r) { r.items.forEach(function (it) { if (it.t === "slot") out.push(it.id); }); });
      return out;
    }
    return (c.slots || []).map(function (s) { return s.id; });
  }
  function acceptOf(id) {
    var found = null;
    if (c.type === "ladder") {
      c.rungs.forEach(function (r) { r.items.forEach(function (it) { if (it.id === id) found = it.accept; }); });
    } else {
      (c.slots || []).forEach(function (s) { if (s.id === id) found = s.accept; });
    }
    return found;
  }

  function draw() {
    cbox.innerHTML = "";
    var svg = Svg.renderCircuit(c, state, { results: results });
    cbox.appendChild(svg);

    /* to'ldirilgan slotni bosib detalni qaytarib olish */
    Array.prototype.forEach.call(svg.querySelectorAll('g[data-filled="1"]'), function (g) {
      g.addEventListener("click", function () {
        if (results) return;
        var id = g.getAttribute("data-slot");
        delete state[id];
        UI.haptic();
        draw();
      });
    });

    /* palitra */
    paletteBox.innerHTML = "";
    var used = {};
    for (var k in state) used[state[k]] = true;
    (c.parts || []).forEach(function (part) {
      var b = el("div", { class: "part" + (used[part.id] ? " used" : ""), text: part.name, "data-part": part.id });
      if (!used[part.id] && !results) attachDrag(b, part);
      paletteBox.appendChild(b);
    });

    var total = slotIds().length, filled = Object.keys(state).length;
    hint.textContent = results ? "Tekshirildi." : "To'ldirilgan: " + filled + " / " + total;

    /* tugmalar */
    actions.innerHTML = "";
    if (results) {
      actions.appendChild(el("button", { class: "btn", text: "Qaytadan", onclick: function () { state = {}; results = null; explainBox.innerHTML = ""; draw(); } }));
      actions.appendChild(el("button", { class: "btn btn-primary", text: "Boshqa sxema", onclick: function () { App.go("circuit"); } }));
    } else {
      actions.appendChild(el("button", { class: "btn", text: "Tozalash", onclick: function () { state = {}; draw(); } }));
      actions.appendChild(el("button", {
        class: "btn btn-primary", text: "Tekshirish",
        onclick: check, disabled: filled < total ? "" : null
      }));
    }
  }

  /* ---- Drag (pointer events) ---- */
  function attachDrag(node, part) {
    node.addEventListener("pointerdown", function (e) {
      if (results) return;
      e.preventDefault();
      UI.haptic();
      node.classList.add("dragging");

      var ghost = node.cloneNode(true);
      ghost.classList.add("drag-ghost");
      ghost.classList.remove("dragging");
      document.body.appendChild(ghost);
      move(e.clientX, e.clientY);

      var target = null;

      function move(x, y) {
        ghost.style.left = x + "px";
        ghost.style.top = y + "px";
        var best = null;
        Array.prototype.forEach.call(cbox.querySelectorAll("rect[data-slot]"), function (r) {
          var b = r.getBoundingClientRect();
          var pad = 16;
          if (x >= b.left - pad && x <= b.right + pad && y >= b.top - pad && y <= b.bottom + pad) best = r;
          r.classList.remove("over");
        });
        if (best) best.classList.add("over");
        target = best;
      }
      function onMove(ev) { move(ev.clientX, ev.clientY); }
      function onUp() {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
        node.classList.remove("dragging");
        if (target) {
          var sid = target.getAttribute("data-slot");
          /* shu detal boshqa slotda bo'lsa — ko'chiramiz */
          for (var k in state) if (state[k] === part.id) delete state[k];
          state[sid] = part.id;
          UI.haptic("heavy");
        }
        draw();
      }
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
    });

    /* Bosib qo'yish: sensorsiz holat uchun — birinchi bo'sh slotga qo'yadi */
    node.addEventListener("dblclick", function () {
      var ids = slotIds();
      for (var i = 0; i < ids.length; i++) if (!state[ids[i]]) { state[ids[i]] = part.id; draw(); return; }
    });
  }

  /* ---- Tekshirish ---- */
  function check() {
    results = {};
    var ids = slotIds(), okN = 0;
    ids.forEach(function (id) {
      var good = state[id] === acceptOf(id);
      results[id] = good ? "ok" : "bad";
      if (good) okN++;
    });
    var pct = Math.round(okN / ids.length * 100);
    if (Store.s.circuits[c.id] === undefined || pct > Store.s.circuits[c.id]) Store.s.circuits[c.id] = pct;
    Store.addXp(okN * 8);
    Store.checkBadges();
    Store.save();

    if (pct === 100) { UI.confetti(90); UI.haptic("heavy"); } else UI.haptic("err");

    explainBox.innerHTML = "";
    explainBox.appendChild(el("div", { class: "result", text: pct + "%  ·  " + okN + "/" + ids.length }));
    ids.forEach(function (id) {
      var good = results[id] === "ok";
      var want = acceptOf(id);
      var wantName = want;
      (c.parts || []).forEach(function (pt) { if (pt.id === want) wantName = pt.name; });
      explainBox.appendChild(el("div", { class: "explain" + (good ? "" : " bad") }, [
        el("b", { text: (good ? "✓ " : "✗ ") + wantName + ": " }),
        document.createTextNode(c.explain[id] || "")
      ]));
    });
    draw();
    explainBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  draw();
  return wrap;
};
