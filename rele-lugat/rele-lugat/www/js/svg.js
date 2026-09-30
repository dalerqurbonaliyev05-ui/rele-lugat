/* Sxemalarni toza SVG bilan chizish.
   Ma'ruzadagi rasmlar nusxa ko'chirilmagan — belgilar qaytadan chizilgan. */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function n(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    return e;
  }
  function line(x1, y1, x2, y2, cls) {
    return n("line", { x1: x1, y1: y1, x2: x2, y2: y2, class: cls || "sv-line" });
  }
  function text(x, y, s, o) {
    o = o || {};
    var t = n("text", {
      x: x, y: y, class: o.cls || "sv-txt",
      "text-anchor": o.anchor || "middle",
      "font-weight": o.b ? "700" : "500",
      "font-size": o.s || null
    });
    t.textContent = s;
    return t;
  }
  function dot(x, y) { return n("circle", { cx: x, cy: y, r: 2.6, fill: "currentColor", class: "sv-line", "stroke-width": 0 }); }

  /* ---- Belgilar. Har biri markaz (cx,cy) va kenglik w bo'yicha chiziladi ---- */

  function symCoil(g, cx, cy, w, label) {
    var h = 28, x = cx - w / 2;
    g.appendChild(n("rect", { x: x, y: cy - h / 2, width: w, height: h, rx: 3, class: "sv-part" }));
    g.appendChild(text(cx, cy + 4, label, { s: 11, b: 1 }));
  }
  function symBlk(g, cx, cy, w, label) {
    var h = 32, x = cx - w / 2;
    g.appendChild(n("rect", { x: x, y: cy - h / 2, width: w, height: h, rx: 6, class: "sv-part" }));
    g.appendChild(text(cx, cy + 4, label, { s: 11, b: 1 }));
  }
  /* Qo'shiluvchi (normal ochiq) kontakt */
  function symNo(g, cx, cy, w, label) {
    var x = cx - w / 2, x2 = cx + w / 2, p = 7;
    g.appendChild(line(x, cy, x + p, cy));
    g.appendChild(line(x2 - p, cy, x2, cy));
    g.appendChild(line(x + p, cy, x2 - p, cy - 11));
    g.appendChild(dot(x + p, cy));
    g.appendChild(dot(x2 - p, cy));
    if (label) g.appendChild(text(cx, cy - 16, label, { s: 10.5, b: 1 }));
  }
  /* Ajraluvchi (normal yopiq) kontakt */
  function symNc(g, cx, cy, w, label) {
    var x = cx - w / 2, x2 = cx + w / 2, p = 7;
    g.appendChild(line(x, cy, x + p, cy));
    g.appendChild(line(x2 - p, cy, x2, cy));
    g.appendChild(line(x + p, cy, x2 - p, cy));
    g.appendChild(line(x2 - p - 3, cy - 9, x2 - p + 3, cy + 3));
    g.appendChild(dot(x + p, cy));
    g.appendChild(dot(x2 - p, cy));
    if (label) g.appendChild(text(cx, cy - 16, label, { s: 10.5, b: 1 }));
  }
  /* Tok transformatori: vertikal o'tkazgichga ilingan ikki yoy */
  function symCt(g, cx, cy, label) {
    var i;
    for (i = 0; i < 2; i++) {
      g.appendChild(n("path", {
        d: "M " + (cx + 3) + " " + (cy - 10 + i * 10) + " a 5 5 0 1 0 0 10",
        class: "sv-line"
      }));
    }
    g.appendChild(line(cx + 8, cy, cx + 14, cy));
    if (label) g.appendChild(text(cx - 8, cy + 17, label, { s: 9.5, cls: "sv-txt-s", anchor: "end" }));
  }
  function symEarth(g, x, y) {
    g.appendChild(line(x, y - 8, x, y));
    g.appendChild(line(x - 8, y, x + 8, y));
    g.appendChild(line(x - 5, y + 4, x + 5, y + 4));
    g.appendChild(line(x - 2, y + 8, x + 2, y + 8));
  }

  function drawSym(g, kind, cx, cy, w, label) {
    if (kind === "coil") symCoil(g, cx, cy, w, label);
    else if (kind === "blk") symBlk(g, cx, cy, w, label);
    else if (kind === "nc") symNc(g, cx, cy, w, label);
    else if (kind === "ct") symCt(g, cx, cy, label);
    else symNo(g, cx, cy, w, label);
  }

  /* ---- Bo'sh slot ---- */
  function drawSlot(g, s, cx, cy, w, h) {
    var box = n("rect", {
      x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 7,
      class: "sv-slot", "data-slot": s.id
    });
    g.appendChild(n("rect", { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 7, class: "sv-slot-fill" }));
    g.appendChild(box);
    g.appendChild(text(cx, cy + 4, "?", { s: 15, b: 1, cls: "sv-txt-s" }));
  }

  /* ---- Asosiy: sxemani chizish ---- */
  function renderCircuit(c, state, opts) {
    opts = opts || {};
    var svg = n("svg", { viewBox: "0 0 " + c.w + " " + c.h, xmlns: NS });
    var root = n("g", {});
    svg.appendChild(root);

    function place(item, cx, cy) {
      var g = n("g", {});
      root.appendChild(g);
      var w = item.w || 50;
      if (item.t === "fixed") {
        drawSym(g, item.kind, cx, cy, w, item.label);
        return;
      }
      var got = state[item.id];
      if (!got) { drawSlot(g, item, cx, cy, w, item.kind === "coil" || item.kind === "blk" ? 32 : 30); return; }
      var part = null;
      (c.parts || []).forEach(function (p) { if (p.id === got) part = p; });
      var label = part ? (part.id) : got;
      drawSym(g, (part && part.kind) || item.kind, cx, cy, w, label);
      g.setAttribute("data-slot", item.id);
      g.setAttribute("data-filled", "1");
      if (opts.results && opts.results[item.id]) {
        g.setAttribute("class", opts.results[item.id] === "ok" ? "sv-ok" : "sv-bad");
      }
      /* bosilganda detalni qaytarib olish */
      g.style.cursor = "pointer";
    }

    if (c.type === "ladder") {
      var L = c.rails.left, R = c.rails.right;
      var yTop = c.rungs[0].y, yBot = c.rungs[c.rungs.length - 1].y;
      root.appendChild(line(L, yTop - 26, L, yBot + 22, "sv-rail"));
      root.appendChild(line(R, yTop - 26, R, yBot + 22, "sv-rail"));
      if (c.rails.showPolarity) {
        root.appendChild(text(L, yTop - 32, "+", { b: 1, s: 15 }));
        root.appendChild(text(R, yTop - 32, "−", { b: 1, s: 15 }));
      }
      c.rungs.forEach(function (rung) {
        var items = rung.items, total = 0, i;
        for (i = 0; i < items.length; i++) total += (items[i].w || 50);
        var span = R - L, gap = (span - total) / (items.length + 1);
        if (gap < 6) gap = 6;
        var x = L;
        for (i = 0; i < items.length; i++) {
          var w = items[i].w || 50;
          root.appendChild(line(x, rung.y, x + gap, rung.y));
          x += gap;
          place(items[i], x + w / 2, rung.y);
          x += w;
        }
        root.appendChild(line(x, rung.y, R, rung.y));
        if (rung.label) root.appendChild(text((L + R) / 2, rung.y - 26, rung.label, { s: 10, cls: "sv-txt-s" }));
      });
    } else {
      /* erkin sxema */
      (c.draw || []).forEach(function (d) {
        var k = d[0];
        if (k === "line") root.appendChild(line(d[1], d[2], d[3], d[4]));
        else if (k === "dot") root.appendChild(dot(d[1], d[2]));
        else if (k === "text") root.appendChild(text(d[1], d[2], d[3], d[4] || {}));
        else if (k === "ct") symCt(root, d[1], d[2], d[3]);
        else if (k === "earth") symEarth(root, d[1], d[2]);
      });
      (c.slots || []).forEach(function (s) {
        place({ t: "slot", id: s.id, kind: s.kind, w: s.w, accept: s.accept }, s.x + s.w / 2, s.y + s.h / 2);
      });
    }
    return svg;
  }

  /* ---- Mantiq elementlari uchun kichik sxemalar ---- */
  function logicGate(kind, inputs, out) {
    var w = 240, h = 120;
    var svg = n("svg", { viewBox: "0 0 " + w + " " + h, xmlns: NS });
    var g = n("g", {});
    svg.appendChild(g);
    var bx = 95, by = 25, bw = 70, bh = 70;
    g.appendChild(n("rect", { x: bx, y: by, width: bw, height: bh, rx: 4, class: "sv-part" }));
    var sign = kind === "yoki" ? "1" : kind === "va" ? "&" : kind === "emas" ? "1" : "RS";
    g.appendChild(text(bx + bw / 2, by + 30, sign, { b: 1, s: 20 }));
    g.appendChild(text(bx + bw / 2, by + 52, kind === "rs" ? "" : kind.toUpperCase(), { s: 11, cls: "sv-txt-s" }));

    var names = kind === "rs" ? ["S", "R"] : inputs.map(function (_, i) { return "KL" + (i + 1); });
    inputs.forEach(function (v, i) {
      var y = by + (bh / (inputs.length + 1)) * (i + 1);
      g.appendChild(line(30, y, bx, y));
      g.appendChild(text(22, y + 4, names[i], { anchor: "end", s: 11, b: 1 }));
      g.appendChild(n("circle", { cx: 40, cy: y, r: 6, fill: v ? "var(--ok)" : "var(--card-2)", stroke: "var(--ink)", "stroke-width": 1.4 }));
      g.appendChild(text(40, y - 11, v ? "1" : "0", { s: 10, b: 1 }));
    });
    var oy = by + bh / 2;
    if (kind === "emas") {
      g.appendChild(n("circle", { cx: bx + bw + 6, cy: oy, r: 5.5, fill: "var(--card)", stroke: "var(--ink)", "stroke-width": 1.6 }));
      g.appendChild(line(bx + bw + 12, oy, w - 30, oy));
    } else {
      g.appendChild(line(bx + bw, oy, w - 30, oy));
    }
    g.appendChild(n("circle", { cx: w - 30, cy: oy, r: 8, fill: out ? "var(--ok)" : "var(--card-2)", stroke: "var(--ink)", "stroke-width": 1.6 }));
    g.appendChild(text(w - 30, oy - 15, out ? "1" : "0", { s: 12, b: 1 }));
    g.appendChild(text(w - 30, oy + 26, "chiqish", { s: 10, cls: "sv-txt-s" }));
    return svg;
  }

  /* Rele-kontakt ekvivalenti (YoKI = parallel, VA = ketma-ket) */
  function logicRelay(kind, inputs, out) {
    var w = 240, h = 120;
    var svg = n("svg", { viewBox: "0 0 " + w + " " + h, xmlns: NS });
    var g = n("g", {});
    svg.appendChild(g);
    g.appendChild(line(16, 12, 16, h - 12, "sv-rail"));
    g.appendChild(line(w - 16, 12, w - 16, h - 12, "sv-rail"));
    g.appendChild(text(16, 10, "+", { b: 1, s: 13 }));
    g.appendChild(text(w - 16, 10, "−", { b: 1, s: 13 }));

    function contact(cx, cy, closed, label) {
      g.appendChild(line(cx - 20, cy, cx - 8, cy));
      g.appendChild(line(cx + 8, cy, cx + 20, cy));
      g.appendChild(line(cx - 8, cy, cx + 8, closed ? cy : cy - 12));
      g.appendChild(dot(cx - 8, cy)); g.appendChild(dot(cx + 8, cy));
      g.appendChild(text(cx, cy - 17, label, { s: 10, b: 1 }));
    }
    var coilX = w - 58, coilY = h / 2;
    if (kind === "va") {
      var y = coilY;
      g.appendChild(line(16, y, 50, y));
      contact(70, y, inputs[0], "KL1");
      g.appendChild(line(90, y, 120, y));
      contact(140, y, inputs[1], "KL2");
      g.appendChild(line(160, y, coilX - 18, y));
    } else {
      var yA = 40, yB = 82;
      g.appendChild(line(16, yA, 50, yA));
      g.appendChild(line(16, yB, 50, yB));
      g.appendChild(line(16, yA, 16, yB));
      contact(70, yA, inputs[0], "KL1");
      contact(70, yB, inputs[1] === undefined ? false : inputs[1], "KL2");
      g.appendChild(line(90, yA, 130, yA));
      g.appendChild(line(90, yB, 130, yB));
      g.appendChild(line(130, yA, 130, yB));
      g.appendChild(line(130, coilY, coilX - 18, coilY));
      g.appendChild(dot(130, coilY));
    }
    g.appendChild(n("rect", { x: coilX - 18, y: coilY - 14, width: 36, height: 28, rx: 3,
      class: "sv-part", fill: out ? "var(--ok-bg)" : "var(--card-2)" }));
    g.appendChild(text(coilX, coilY + 4, "KL", { s: 11, b: 1 }));
    g.appendChild(line(coilX + 18, coilY, w - 16, coilY));
    return svg;
  }

  /* Tarmoq sxemasi (stsenariy o'yini) */
  function network(net, faultId, activeQ) {
    var svg = n("svg", { viewBox: "0 0 " + net.w + " " + net.h, xmlns: NS });
    var g = n("g", {});
    svg.appendChild(g);
    var byId = {};
    net.buses.forEach(function (b) { byId[b.id] = b; });

    /* manba */
    g.appendChild(n("circle", { cx: 24, cy: 70, r: 13, class: "sv-part" }));
    g.appendChild(text(24, 74, "~", { b: 1, s: 16 }));
    g.appendChild(text(24, 100, "Manba", { s: 10, cls: "sv-txt-s" }));
    g.appendChild(line(37, 70, byId[net.buses[0].id].x, 70));

    net.lines.forEach(function (ln) {
      var a = byId[ln.from], b = byId[ln.to];
      g.appendChild(line(a.x, a.y, b.x, b.y));
      var qx = a.x + 18;
      var on = activeQ === ln.q;
      g.appendChild(n("rect", { x: qx - 6, y: a.y - 9, width: 12, height: 18, rx: 2,
        class: "sv-part", fill: on ? "var(--bad)" : "var(--card-2)" }));
      g.appendChild(text(qx, a.y - 15, ln.q, { s: 10, b: 1 }));
      g.appendChild(text((a.x + b.x) / 2 + 8, a.y + 20, ln.id, { s: 10, cls: "sv-txt-s" }));
      g.appendChild(text((a.x + b.x) / 2 + 8, a.y + 33, ln.rh + " t=" + ln.t + "s", { s: 9.5, cls: "sv-txt-s" }));
    });

    net.buses.forEach(function (b) {
      g.appendChild(line(b.x, b.y - 16, b.x, b.y + 16, "sv-rail"));
      g.appendChild(text(b.x, b.y - 22, b.label, { b: 1, s: 12 }));
    });

    net.faults.forEach(function (f) {
      if (f.id !== faultId) return;
      g.appendChild(n("path", {
        d: "M " + f.x + " " + (f.y - 24) + " l -7 14 l 7 -2 l -4 14 l 12 -18 l -8 2 z",
        fill: "var(--bad)", stroke: "var(--bad)", "stroke-width": 1
      }));
      g.appendChild(text(f.x + 16, f.y - 16, f.label, { s: 12, b: 1, anchor: "start" }));
    });
    return svg;
  }

  window.Svg = { renderCircuit: renderCircuit, logicGate: logicGate, logicRelay: logicRelay, network: network };
})();
