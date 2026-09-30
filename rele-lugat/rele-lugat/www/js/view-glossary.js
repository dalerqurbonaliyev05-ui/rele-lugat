/* Lug'at: qidiruv, ma'ruza bo'yicha filtr, sevimlilar, bog'liq atamalar. */
window.Views = window.Views || {};

window.Views.glossary = function (p) {
  var el = UI.el, S = Store.s;
  var root = el("div");
  var state = { q: (p && p.q) || "", lec: (p && p.lec) || 0, fav: false };

  var listBox = el("div");
  var countBox = el("div", { class: "tiny muted", style: "margin:2px 0 10px" });

  /* Qidiruv */
  var input = el("input", { type: "search", placeholder: "Atama yoki ta'rifdan qidirish…", value: state.q });
  input.addEventListener("input", function () { state.q = input.value; draw(); });
  root.appendChild(el("div", { class: "search-wrap" }, input));

  /* Filtr chiplari */
  var chips = el("div", { class: "chip-row" });
  function chip(label, on, fn) {
    return el("button", { class: "chip" + (on ? " on" : ""), text: label, onclick: function () { UI.haptic(); fn(); draw(); } });
  }
  function buildChips() {
    chips.innerHTML = "";
    chips.appendChild(chip("Hammasi", state.lec === 0 && !state.fav, function () { state.lec = 0; state.fav = false; }));
    chips.appendChild(chip("★ Sevimli", state.fav, function () { state.fav = !state.fav; }));
    (window.DATA.lectures || []).forEach(function (L) {
      chips.appendChild(chip(L.id + "-ma'ruza", state.lec === L.id, function () {
        state.lec = state.lec === L.id ? 0 : L.id; state.fav = false;
      }));
    });
  }
  root.appendChild(chips);
  root.appendChild(countBox);
  root.appendChild(listBox);

  function match(g) {
    if (state.fav && !S.fav[g.id]) return false;
    if (state.lec && g.l !== state.lec) return false;
    if (!state.q) return true;
    var q = state.q.toLowerCase();
    return (g.t + " " + (g.f || "") + " " + g.d + " " + (g.u || "")).toLowerCase().indexOf(q) >= 0;
  }

  function termCard(g) {
    var card = el("div", { class: "term", id: "t-" + g.id });
    var favBtn = el("button", {
      class: "fav", text: S.fav[g.id] ? "★" : "☆",
      onclick: function () {
        if (S.fav[g.id]) delete S.fav[g.id]; else S.fav[g.id] = true;
        Store.save(); UI.haptic();
        favBtn.textContent = S.fav[g.id] ? "★" : "☆";
        if (state.fav) draw();
      }
    });
    card.appendChild(el("div", { class: "term-head" }, [
      el("div", { class: "term-t" }, [
        document.createTextNode(g.t),
        g.f ? el("div", { class: "term-f", text: g.f }) : null
      ]),
      favBtn
    ]));
    card.appendChild(el("div", { class: "term-d", text: g.d }));
    if (g.u) card.appendChild(el("div", { class: "tiny muted", style: "margin-top:6px", text: "Qayerda: " + g.u }));

    var meta = el("div", { class: "term-meta" }, [UI.lecBadge(g.l)]);
    var srs = Store.srsOf(g.id);
    if (srs.box >= 4) meta.appendChild(el("span", { class: "badge badge-soft", text: "✓ yodlangan" }));
    (g.r || []).forEach(function (rid) {
      var other = find(rid);
      if (!other) return;
      meta.appendChild(el("button", {
        class: "rel-link", text: other.t,
        onclick: function () { UI.haptic(); state.q = ""; state.lec = 0; state.fav = false; input.value = ""; draw(); jump(rid); }
      }));
    });
    card.appendChild(meta);
    return card;
  }

  function find(id) {
    var G = window.DATA.glossary || [];
    for (var i = 0; i < G.length; i++) if (G[i].id === id) return G[i];
    return null;
  }
  function jump(id) {
    setTimeout(function () {
      var n = document.getElementById("t-" + id);
      if (n) {
        n.scrollIntoView({ behavior: "smooth", block: "center" });
        n.style.transition = "box-shadow .3s";
        n.style.boxShadow = "0 0 0 3px var(--accent)";
        setTimeout(function () { n.style.boxShadow = ""; }, 1400);
      }
    }, 60);
  }

  function draw() {
    buildChips();
    var items = (window.DATA.glossary || []).filter(match);
    countBox.textContent = items.length + " ta atama" +
      (state.lec ? " · " + state.lec + "-ma'ruza" : "") + (state.fav ? " · sevimlilar" : "");
    listBox.innerHTML = "";
    if (!items.length) {
      listBox.appendChild(el("div", { class: "empty" }, [
        el("div", { class: "big", text: "🔍" }),
        el("div", { text: "Hech narsa topilmadi" })
      ]));
      return;
    }
    items.sort(function (a, b) { return a.l - b.l || a.t.localeCompare(b.t, "uz"); });
    items.forEach(function (g) { listBox.appendChild(termCard(g)); });
  }

  draw();
  if (p && p.jump) jump(p.jump);
  return root;
};
