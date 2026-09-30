/* Umumiy UI yordamchilari: DOM, toast, konfetti, vibratsiya. */
(function () {
  "use strict";

  function el(tag, attrs, kids) {
    var n = document.createElement(tag), k;
    /* el(tag, kids) ko'rinishini ham qo'llab-quvvatlaymiz */
    if (Array.isArray(attrs) || typeof attrs === "string" || (attrs && attrs.nodeType)) {
      kids = attrs; attrs = null;
    }
    if (attrs) for (k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c === null || c === undefined) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Haptic — Capacitor mavjud bo'lsa undan, bo'lmasa navigator.vibrate */
  function haptic(kind) {
    try {
      var C = window.Capacitor;
      if (C && C.Plugins && C.Plugins.Haptics) {
        if (kind === "heavy") C.Plugins.Haptics.impact({ style: "HEAVY" });
        else if (kind === "err") C.Plugins.Haptics.notification({ type: "ERROR" });
        else C.Plugins.Haptics.impact({ style: "LIGHT" });
        return;
      }
    } catch (e) { /* plagin yo'q */ }
    try {
      if (navigator.vibrate) navigator.vibrate(kind === "err" ? [40, 60, 40] : kind === "heavy" ? 30 : 12);
    } catch (e) {}
  }

  var toastTimer = null;
  function toast(msg, ms) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, ms || 1900);
  }

  /* Tabriklash konfettisi */
  var cvs, ctx, parts = [], raf = null;
  function confetti(n) {
    cvs = document.getElementById("confetti");
    if (!cvs) return;
    ctx = cvs.getContext("2d");
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    cvs.classList.add("on");
    var colors = ["#f5b301", "#1553c7", "#17a35b", "#ff9b2f", "#2f7ff0", "#ffd34d"];
    parts = [];
    for (var i = 0; i < (n || 70); i++) {
      parts.push({
        x: Math.random() * cvs.width,
        y: -20 - Math.random() * cvs.height * 0.4,
        w: 5 + Math.random() * 6, h: 8 + Math.random() * 8,
        vy: 2.4 + Math.random() * 3.2, vx: -1.4 + Math.random() * 2.8,
        rot: Math.random() * Math.PI, vr: -0.14 + Math.random() * 0.28,
        c: colors[(Math.random() * colors.length) | 0]
      });
    }
    if (raf) cancelAnimationFrame(raf);
    step();
  }
  function step() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    var alive = 0;
    parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.045;
      if (p.y < cvs.height + 30) alive++;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive > 0) raf = requestAnimationFrame(step);
    else { cvs.classList.remove("on"); ctx.clearRect(0, 0, cvs.width, cvs.height); raf = null; }
  }

  function shuffle(a) {
    var r = a.slice(), i, j, t;
    for (i = r.length - 1; i > 0; i--) { j = (Math.random() * (i + 1)) | 0; t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function sample(a, n) { return shuffle(a).slice(0, n); }

  function lecById(id) {
    var L = window.DATA.lectures || [];
    for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i];
    return { id: id, title: "", color: "#888" };
  }
  function lecBadge(id) {
    var l = lecById(id);
    return el("span", { class: "badge badge-lec", style: "background:" + l.color, text: id + "-ma'ruza" });
  }
  function backBtn(label, fn) {
    return el("button", { class: "back-btn", onclick: fn }, "‹ " + (label || "Orqaga"));
  }

  /* Progress halqasi (SVG) */
  function ring(pct, color, label) {
    var R = 20, C = 2 * Math.PI * R;
    var wrap = el("div", { class: "ring" });
    wrap.innerHTML =
      '<svg viewBox="0 0 48 48" width="48" height="48">' +
        '<circle cx="24" cy="24" r="' + R + '" fill="none" stroke="var(--line)" stroke-width="5"/>' +
        '<circle cx="24" cy="24" r="' + R + '" fill="none" stroke="' + color + '" stroke-width="5" ' +
          'stroke-linecap="round" stroke-dasharray="' + C + '" ' +
          'stroke-dashoffset="' + (C * (1 - pct / 100)) + '"/>' +
      '</svg><b>' + esc(label) + '</b>';
    return wrap;
  }

  window.UI = {
    el: el, esc: esc, haptic: haptic, toast: toast, confetti: confetti,
    shuffle: shuffle, sample: sample, lecById: lecById, lecBadge: lecBadge,
    backBtn: backBtn, ring: ring
  };
})();
