/* Testlar: ma'ruza bo'yicha, aralash imtihon (vaqt bilan) va xatolar daftari.
   Savol turlari: mcq (variantli), tf (to'g'ri/noto'g'ri), match (moslashtirish). */
window.Views = window.Views || {};

(function () {
  "use strict";
  var el = function () { return UI.el.apply(null, arguments); };

  /* Savolni global indeksi bilan qaytaradi — progress shu kalit bo'yicha saqlanadi */
  function allQuestions() {
    return (window.DATA.quizzes || []).map(function (q, i) { return { q: q, i: i }; });
  }

  /* ---------------- Umumiy yurituvchi ---------------- */
  function runQuiz(items, opts) {
    opts = opts || {};
    var root = el("div");
    var i = 0, ok = 0, bad = 0, answered = false;
    var weak = {};           // lecture -> xato soni
    var startTs = Date.now();
    var limitMs = opts.limitSec ? opts.limitSec * 1000 : 0;
    var timerNode = null, timerId = null;

    root.appendChild(UI.backBtn(opts.backLabel || "Orqaga", opts.back || function () { App.go("games"); }));

    var head = el("div", { class: "row", style: "margin-bottom:8px" });
    root.appendChild(head);
    var bar = el("div", { class: "progress" });
    bar.innerHTML = '<i style="width:0%"></i>';
    root.appendChild(bar);
    var area = el("div");
    root.appendChild(area);

    if (limitMs) {
      timerNode = el("span", { class: "chip timer" });
      head.appendChild(timerNode);
      timerId = setInterval(tick, 250);
      tick();
    }
    function tick() {
      var left = Math.max(0, limitMs - (Date.now() - startTs));
      var s = Math.ceil(left / 1000);
      timerNode.textContent = "⏱ " + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      if (left <= 0) { clearInterval(timerId); timerId = null; finish(true); }
    }

    function finish(timeUp) {
      if (timerId) { clearInterval(timerId); timerId = null; }
      area.innerHTML = "";
      bar.firstChild.style.width = "100%";
      var total = ok + bad;
      var pct = total ? Math.round(ok / total * 100) : 0;
      if (pct >= 70) UI.confetti(90);

      var weakList = Object.keys(weak).sort(function (a, b) { return weak[b] - weak[a]; });
      var card = el("div", { class: "card center" }, [
        el("div", { style: "font-size:44px", text: pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚" }),
        el("h2", { text: timeUp ? "Vaqt tugadi" : "Natija: " + pct + "%" }),
        el("p", { class: "muted", text: "To'g'ri: " + ok + " · Xato: " + bad }),
        el("p", { class: "small muted", text: "+" + (ok * 6) + " XP" })
      ]);
      if (weakList.length) {
        card.appendChild(el("div", { class: "sep" }));
        card.appendChild(el("div", { class: "small", style: "font-weight:700;margin-bottom:6px", text: "Kuchsiz mavzular" }));
        var ul = el("div", { class: "stack" });
        weakList.slice(0, 5).forEach(function (L) {
          var lec = UI.lecById(+L);
          ul.appendChild(el("button", {
            class: "tile",
            onclick: function () { App.go("quiz", { lec: +L }); }
          }, [
            el("div", { class: "tile-ico", style: "background:" + lec.color + "22;color:" + lec.color, text: String(L) }),
            el("div", { style: "min-width:0" }, [
              el("b", { text: L + "-ma'ruza" }),
              el("small", { text: weak[L] + " ta xato · " + lec.title })
            ])
          ]));
        });
        card.appendChild(ul);
      }
      card.appendChild(el("button", {
        class: "btn btn-primary btn-lg", style: "margin-top:12px", text: "Yana",
        onclick: function () { opts.again ? opts.again() : App.go("games"); }
      }));
      area.appendChild(card);
      if (opts.onFinish) opts.onFinish(pct);
    }

    function next() {
      answered = false;
      if (i >= items.length) { finish(false); return; }
      var it = items[i], q = it.q;
      bar.firstChild.style.width = (i / items.length * 100) + "%";

      head.innerHTML = "";
      if (timerNode) head.appendChild(timerNode);
      head.appendChild(UI.lecBadge(q.l));
      head.appendChild(el("span", { class: "chip", text: (i + 1) + " / " + items.length }));

      area.innerHTML = "";
      var card = el("div", { class: "card" }, [el("h3", { text: q.q, style: "font-size:16px;margin-bottom:12px" })]);
      area.appendChild(card);

      if (q.type === "mcq" || q.type === "tf") {
        var opsRaw = q.type === "tf" ? ["To'g'ri", "Noto'g'ri"] : q.o;
        var correctIdx = q.type === "tf" ? (q.a ? 0 : 1) : q.a;
        /* variantlarni aralashtiramiz, lekin to'g'ri javob indeksini kuzatamiz */
        var order = q.type === "tf" ? [0, 1] : UI.shuffle(opsRaw.map(function (_, k) { return k; }));
        var btns = [];
        order.forEach(function (origIdx, pos) {
          var b = el("button", { class: "opt", text: opsRaw[origIdx] });
          b.addEventListener("click", function () { pick(origIdx, b, btns, order, correctIdx); });
          btns.push(b);
          card.appendChild(b);
        });
      } else if (q.type === "match") {
        buildMatch(card, q);
      }

      function pick(origIdx, btn, btns, order, correctIdx) {
        if (answered) return;
        answered = true;
        var good = origIdx === correctIdx;
        btns.forEach(function (b, pos) {
          b.classList.add("dim");
          if (order[pos] === correctIdx) { b.classList.remove("dim"); b.classList.add("ok"); }
        });
        if (!good) { btn.classList.remove("dim"); btn.classList.add("bad"); }
        score(good, q, it.i);
        showExplain(card, good, q);
      }
    }

    function buildMatch(card, q) {
      var lefts = q.pairs.map(function (p) { return p[0]; });
      var rights = UI.shuffle(q.pairs.map(function (p) { return p[1]; }));
      var selects = [];
      lefts.forEach(function (L, idx) {
        var sel = el("select");
        sel.appendChild(el("option", { value: "", text: "— tanlang —" }));
        rights.forEach(function (R) { sel.appendChild(el("option", { value: R, text: R })); });
        selects.push(sel);
        card.appendChild(el("div", { class: "match-row" }, [el("div", { class: "ml", text: L }), sel]));
      });
      var btn = el("button", { class: "btn btn-primary btn-block", style: "margin-top:6px", text: "Tekshirish" });
      btn.addEventListener("click", function () {
        if (answered) return;
        var allGood = true;
        selects.forEach(function (s, idx) {
          var want = q.pairs[idx][1];
          var good = s.value === want;
          if (!good) allGood = false;
          s.style.outline = "2px solid " + (good ? "var(--ok)" : "var(--bad)");
          if (!good) s.value = want;
        });
        answered = true;
        btn.disabled = true;
        score(allGood, q, null);
        showExplain(card, allGood, q);
      });
      card.appendChild(btn);
    }

    function score(good, q, gi) {
      if (good) { ok++; Store.addXp(6); UI.haptic(); }
      else { bad++; weak[q.l] = (weak[q.l] || 0) + 1; UI.haptic("err"); }
      if (gi !== null && gi !== undefined) Store.quizAnswer(q.l, gi, good);
      else { Store.s.quizStat[good ? "ok" : "bad"]++; Store.save(); }
    }

    function showExplain(card, good, q) {
      card.appendChild(el("div", { class: "explain" + (good ? "" : " bad") }, [
        el("b", { text: good ? "To'g'ri! " : "Tushuntirish: " }),
        document.createTextNode(q.e)
      ]));
      card.appendChild(el("button", {
        class: "btn btn-primary btn-block", style: "margin-top:10px",
        text: i + 1 >= items.length ? "Natijani ko'rish" : "Keyingi savol",
        onclick: function () { i++; next(); }
      }));
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    next();
    return root;
  }

  /* ---------------- Ma'ruza bo'yicha testlar ---------------- */
  window.Views.quiz = function (p) {
    if (p && p.lec) {
      var items = allQuestions().filter(function (x) { return x.q.l === p.lec; });
      items = UI.shuffle(items);
      var lec = UI.lecById(p.lec);
      var wrap = UI.el("div");
      wrap.appendChild(UI.el("div", { class: "card tight" }, [
        UI.el("div", { class: "row" }, [UI.lecBadge(p.lec), UI.el("b", { class: "small", text: lec.title })])
      ]));
      wrap.appendChild(runQuiz(items, {
        backLabel: "Ma'ruzalar",
        back: function () { App.go("quiz"); },
        again: function () { App.go("quiz", { lec: p.lec }); }
      }));
      return wrap;
    }

    /* Ma'ruza tanlash */
    var root = UI.el("div");
    root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));
    root.appendChild(UI.el("div", { class: "stack" }, [
      UI.el("button", { class: "tile", onclick: function () { App.go("exam"); } }, [
        UI.el("div", { class: "tile-ico", style: "background:#f5b30122;color:#f5b301", text: "⏱" }),
        UI.el("div", [UI.el("b", { text: "Aralash imtihon" }), UI.el("small", { text: "20 tasodifiy savol, 10 daqiqa" })])
      ])
    ]));
    root.appendChild(UI.el("h2", { text: "Ma'ruza bo'yicha", style: "margin:16px 0 8px" }));
    var stack = UI.el("div", { class: "stack" });
    (window.DATA.lectures || []).forEach(function (L) {
      var n = (window.DATA.quizzes || []).filter(function (q) { return q.l === L.id; }).length;
      var pct = Store.lecProgress(L.id);
      stack.appendChild(UI.el("button", { class: "tile", onclick: function () { UI.haptic(); App.go("quiz", { lec: L.id }); } }, [
        UI.el("div", { class: "tile-ico", style: "background:" + L.color + "22;color:" + L.color, text: String(L.id) }),
        UI.el("div", { style: "min-width:0;flex:1" }, [
          UI.el("b", { text: L.title }),
          UI.el("small", { text: n + " ta savol · " + pct + "% bajarildi" })
        ])
      ]));
    });
    root.appendChild(stack);
    return root;
  };

  /* ---------------- Aralash imtihon ---------------- */
  window.Views.exam = function () {
    var items = UI.sample(allQuestions(), 20);
    var wrap = UI.el("div");
    wrap.appendChild(UI.el("div", { class: "card tight" }, [
      UI.el("b", { text: "Imtihonga tayyorgarlik" }),
      UI.el("div", { class: "tiny muted", text: "20 tasodifiy savol · 10 daqiqa · natija tahlili bilan" })
    ]));
    wrap.appendChild(runQuiz(items, {
      limitSec: 600,
      backLabel: "O'yinlar",
      again: function () { App.go("exam"); },
      onFinish: function (pct) {
        if (pct > Store.s.examBest) { Store.s.examBest = pct; Store.checkBadges(); Store.save(); }
      }
    }));
    return wrap;
  };

  /* ---------------- Xatolar daftari ---------------- */
  window.Views.mistakes = function () {
    var root = UI.el("div");
    root.appendChild(UI.backBtn("Profil", function () { App.go("profile"); }));

    var ms = Store.s.mistakes;
    var qKeys = ms.filter(function (m) { return m.kind === "quiz"; });
    var tKeys = ms.filter(function (m) { return m.kind === "term"; });

    if (!ms.length) {
      root.appendChild(UI.el("div", { class: "empty" }, [
        UI.el("div", { class: "big", text: "✨" }),
        UI.el("div", { text: "Xatolar daftari bo'sh" }),
        UI.el("div", { class: "tiny muted", style: "margin-top:6px", text: "Noto'g'ri javob berilgan savol va atamalar shu yerda to'planadi." })
      ]));
      return root;
    }

    root.appendChild(UI.el("div", { class: "card tight" }, [
      UI.el("b", { text: "Xatolar daftari" }),
      UI.el("div", { class: "tiny muted", text: qKeys.length + " ta savol · " + tKeys.length + " ta atama" })
    ]));

    if (qKeys.length) {
      root.appendChild(UI.el("button", {
        class: "btn btn-primary btn-lg", style: "margin-bottom:10px",
        text: "Xato savollarni qayta yechish (" + qKeys.length + ")",
        onclick: function () { App.go("mistakeQuiz"); }
      }));
    }
    if (tKeys.length) {
      root.appendChild(UI.el("button", {
        class: "btn btn-accent btn-lg", style: "margin-bottom:10px",
        text: "Xato atamalarni takrorlash (" + tKeys.length + ")",
        onclick: function () { App.go("flashcards", { ids: tKeys.map(function (m) { return m.key; }) }); }
      }));
    }

    root.appendChild(UI.el("h2", { text: "Ro'yxat", style: "margin:14px 0 8px" }));
    var list = UI.el("div", { class: "stack" });
    ms.slice().reverse().slice(0, 40).forEach(function (m) {
      if (m.kind === "term") {
        var g = (window.DATA.glossary || []).filter(function (x) { return x.id === m.key; })[0];
        if (!g) return;
        list.appendChild(UI.el("div", { class: "card tight" }, [
          UI.el("div", { class: "row" }, [UI.lecBadge(g.l), UI.el("b", { class: "small", text: g.t })]),
          UI.el("div", { class: "tiny muted", style: "margin-top:4px", text: g.d })
        ]));
      } else {
        var gi = +m.key.split("#")[1];
        var q = (window.DATA.quizzes || [])[gi];
        if (!q) return;
        list.appendChild(UI.el("div", { class: "card tight" }, [
          UI.el("div", { class: "row" }, [UI.lecBadge(q.l), UI.el("span", { class: "badge badge-soft", text: "savol" })]),
          UI.el("div", { class: "small", style: "margin-top:4px", text: q.q })
        ]));
      }
    });
    root.appendChild(list);

    root.appendChild(UI.el("button", {
      class: "btn btn-block btn-ghost", style: "margin-top:12px", text: "Daftarni tozalash",
      onclick: function () {
        Store.s.mistakes = []; Store.save(); UI.toast("Daftar tozalandi"); App.go("mistakes");
      }
    }));
    return root;
  };

  window.Views.mistakeQuiz = function () {
    var keys = Store.s.mistakes.filter(function (m) { return m.kind === "quiz"; });
    var items = [];
    keys.forEach(function (m) {
      var gi = +m.key.split("#")[1];
      var q = (window.DATA.quizzes || [])[gi];
      if (q) items.push({ q: q, i: gi });
    });
    if (!items.length) return window.Views.mistakes();
    var wrap = UI.el("div");
    wrap.appendChild(UI.el("div", { class: "card tight" }, [
      UI.el("b", { text: "Xatolar ustida ishlash" }),
      UI.el("div", { class: "tiny muted", text: "To'g'ri javob bersangiz savol daftardan chiqadi." })
    ]));
    wrap.appendChild(runQuiz(UI.shuffle(items), {
      backLabel: "Daftar",
      back: function () { App.go("mistakes"); },
      again: function () { App.go("mistakes"); }
    }));
    return wrap;
  };

  window.QuizRunner = runQuiz;
})();
