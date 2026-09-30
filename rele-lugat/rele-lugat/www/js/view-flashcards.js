/* Flashcard: Leitner usulidagi oraliqli takrorlash.
   Kartani bosib ag'darasiz, so'ng "Bilaman" / "Bilmayman" ni tanlaysiz
   yoki kartani chapga/o'ngga suramiz. */
window.Views = window.Views || {};

window.Views.flashcards = function (p) {
  var el = UI.el;
  var root = el("div");

  /* Navbat: avval muddati kelganlar, keyin xatolar daftaridagilar */
  var pool;
  if (p && p.ids) {
    pool = p.ids.slice();
  } else {
    pool = Store.srsDue();
    if (!pool.length) {
      // hammasi takrorlangan bo'lsa — eng "zaif" 15 tasi
      pool = (window.DATA.glossary || []).map(function (g) { return g.id; })
        .sort(function (a, b) { return Store.srsOf(a).box - Store.srsOf(b).box; }).slice(0, 15);
    }
  }
  pool = UI.shuffle(pool);
  var i = 0, okN = 0, badN = 0;

  root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));

  var bar = el("div", { class: "progress" });
  bar.innerHTML = '<i style="width:0%"></i>';
  root.appendChild(bar);
  var counter = el("div", { class: "tiny muted center", style: "margin-bottom:10px" });
  root.appendChild(counter);

  var area = el("div");
  root.appendChild(area);

  function find(id) {
    var G = window.DATA.glossary || [];
    for (var k = 0; k < G.length; k++) if (G[k].id === id) return G[k];
    return null;
  }

  function done() {
    area.innerHTML = "";
    UI.confetti(80);
    area.appendChild(el("div", { class: "card center" }, [
      el("div", { style: "font-size:44px", text: "🎉" }),
      el("h2", { text: "Takrorlash tugadi!" }),
      el("p", { class: "muted", text: "Bilaman: " + okN + " · Bilmayman: " + badN }),
      el("p", { class: "small muted", text: "+" + (okN * 4) + " XP" }),
      el("button", { class: "btn btn-primary btn-lg", text: "Yana takrorlash", onclick: function () { App.go("flashcards"); } }),
      el("button", { class: "btn btn-block", style: "margin-top:8px", text: "O'yinlarga qaytish", onclick: function () { App.go("games"); } })
    ]));
  }

  function render() {
    if (i >= pool.length) { done(); return; }
    var g = find(pool[i]);
    if (!g) { i++; render(); return; }

    bar.firstChild.style.width = (i / pool.length * 100) + "%";
    counter.textContent = (i + 1) + " / " + pool.length + "  ·  quti " + Store.srsOf(g.id).box + "/5";

    area.innerHTML = "";
    var flipped = false;
    var card = el("div", { class: "fc" });
    var front = el("div", { class: "fc-face" }, [
      UI.lecBadge(g.l),
      el("div", { class: "big", style: "margin-top:10px", text: g.t }),
      g.f ? el("div", { class: "muted small", text: g.f }) : null,
      el("div", { class: "tiny muted", style: "margin-top:16px", text: "Javobni ko'rish uchun bosing" })
    ]);
    var back = el("div", { class: "fc-face fc-back" }, [
      el("div", { class: "small", style: "font-weight:700;margin-bottom:6px", text: g.t }),
      el("div", { class: "small", text: g.d }),
      g.u ? el("div", { class: "tiny muted", style: "margin-top:10px", text: "Qayerda: " + g.u }) : null
    ]);
    card.appendChild(front); card.appendChild(back);
    var wrap = el("div", { class: "fc-wrap" }, card);
    area.appendChild(wrap);

    function flip() { flipped = !flipped; card.classList.toggle("flip", flipped); UI.haptic(); btns.style.display = flipped ? "" : "none"; }
    card.addEventListener("click", flip);

    /* Surish (pointer events — sensorli ekranda silliq) */
    var x0 = null, dx = 0;
    card.addEventListener("pointerdown", function (e) { x0 = e.clientX; card.style.transition = "none"; });
    card.addEventListener("pointermove", function (e) {
      if (x0 === null) return;
      dx = e.clientX - x0;
      if (Math.abs(dx) > 6) card.style.transform = (flipped ? "rotateY(180deg) " : "") + "translateX(" + (flipped ? -dx : dx) + "px) rotate(" + (dx / 26) + "deg)";
    });
    card.addEventListener("pointerup", function () {
      card.style.transition = "";
      if (Math.abs(dx) > 70) { answer(dx > 0); }
      else { card.style.transform = ""; }
      x0 = null; dx = 0;
    });
    card.addEventListener("pointercancel", function () { card.style.transition = ""; card.style.transform = ""; x0 = null; dx = 0; });

    var btns = el("div", { class: "grid2", style: "display:none" }, [
      el("button", { class: "btn btn-bad", text: "✗ Bilmayman", onclick: function () { answer(false); } }),
      el("button", { class: "btn btn-ok", text: "✓ Bilaman", onclick: function () { answer(true); } })
    ]);
    area.appendChild(btns);
    area.appendChild(el("p", { class: "tiny muted center", style: "margin-top:10px",
      text: "Maslahat: kartani chapga (bilmayman) yoki o'ngga (bilaman) surish ham mumkin." }));

    function answer(known) {
      Store.srsAnswer(g.id, known);
      if (known) { okN++; Store.addXp(4); UI.haptic(); }
      else { badN++; UI.haptic("err"); }
      i++;
      render();
    }
  }

  render();
  return root;
};
