/* Rele aniqlash mashqi: tavsifga qarab qaysi rele ekanini toping.
   Ipuchalar birin-ketin ochiladi — qancha kam ipucha, shuncha ko'p XP. */
window.Views = window.Views || {};

window.Views.relay = function (p) {
  var el = UI.el;
  var root = el("div");
  root.appendChild(UI.backBtn("O'yinlar", function () { App.go("games"); }));

  /* Ma'lumotnoma rejimi */
  if (p && p.ref) {
    root.appendChild(el("p", { class: "small muted", text: "Relelar ma'lumotnomasi (9, 10 va 12-ma'ruzalar)." }));
    (window.DATA.relays || []).forEach(function (r) {
      var card = el("div", { class: "card" });
      card.appendChild(el("div", { class: "row" }, [UI.lecBadge(r.lec), el("span", { class: "chip", text: r.kind })]));
      card.appendChild(el("h3", { text: r.name, style: "margin:8px 0 2px" }));
      card.appendChild(el("div", { class: "small muted", text: r.short }));
      card.appendChild(el("p", { class: "small", style: "margin-top:8px", text: r.desc }));
      var ul = el("ul", { class: "small", style: "margin:6px 0 0;padding-left:18px" });
      r.facts.forEach(function (f) { ul.appendChild(el("li", { text: f })); });
      card.appendChild(ul);
      root.appendChild(card);
    });
    return root;
  }

  var pool = UI.shuffle(window.DATA.relays || []);
  var i = 0, score = 0;

  var bar = el("div", { class: "progress" });
  bar.innerHTML = '<i style="width:0%"></i>';
  root.appendChild(bar);
  var area = el("div");
  root.appendChild(area);
  root.appendChild(el("button", {
    class: "btn btn-block btn-ghost", style: "margin-top:10px", text: "📋 Relelar ma'lumotnomasi",
    onclick: function () { App.go("relay", { ref: 1 }); }
  }));

  function render() {
    if (i >= pool.length) {
      area.innerHTML = "";
      UI.confetti(80);
      area.appendChild(el("div", { class: "card center" }, [
        el("div", { style: "font-size:44px", text: "🔍" }),
        el("h2", { text: score + " ball" }),
        el("p", { class: "muted", text: pool.length + " ta reledan " + score + " ball to'pladingiz" }),
        el("button", { class: "btn btn-primary btn-lg", text: "Yana", onclick: function () { App.go("relay"); } })
      ]));
      return;
    }

    var r = pool[i];
    bar.firstChild.style.width = (i / pool.length * 100) + "%";
    area.innerHTML = "";

    var shown = 1, answered = false;
    var card = el("div", { class: "card" });
    card.appendChild(el("div", { class: "row" }, [
      UI.lecBadge(r.lec),
      el("span", { class: "chip", text: (i + 1) + " / " + pool.length }),
      el("span", { class: "chip", text: r.kind })
    ]));
    card.appendChild(el("h3", { text: "Qaysi rele haqida gap ketmoqda?", style: "margin:10px 0 8px" }));

    var clueBox = el("div");
    card.appendChild(clueBox);

    var moreBtn = el("button", {
      class: "btn btn-block", style: "margin-bottom:10px", text: "Yana ipucha (ball kamayadi)",
      onclick: function () {
        if (shown >= r.clues.length) return;
        shown++; UI.haptic(); drawClues();
      }
    });
    card.appendChild(moreBtn);

    function drawClues() {
      clueBox.innerHTML = "";
      for (var k = 0; k < shown; k++) {
        clueBox.appendChild(el("div", { class: "explain", style: "margin-bottom:8px" }, [
          el("b", { text: "Ipucha " + (k + 1) + ": " }),
          document.createTextNode(r.clues[k])
        ]));
      }
      moreBtn.disabled = shown >= r.clues.length ? "" : null;
      if (shown >= r.clues.length) moreBtn.textContent = "Boshqa ipucha yo'q";
    }
    drawClues();

    /* Variantlar: to'g'ri javob + 3 ta chalg'ituvchi */
    var others = UI.shuffle((window.DATA.relays || []).filter(function (x) { return x.id !== r.id; })).slice(0, 3);
    var opts = UI.shuffle(others.concat([r]));
    var btns = [];
    opts.forEach(function (o) {
      var b = el("button", { class: "opt", text: o.name + " — " + o.short });
      b.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        var good = o.id === r.id;
        btns.forEach(function (x, idx) {
          x.classList.add("dim");
          if (opts[idx].id === r.id) { x.classList.remove("dim"); x.classList.add("ok"); }
        });
        if (!good) { b.classList.remove("dim"); b.classList.add("bad"); }

        var pts = good ? Math.max(1, 5 - (shown - 1)) : 0;
        score += pts;
        if (good) { Store.addXp(pts * 3); UI.haptic(); } else UI.haptic("err");

        var ex = el("div", { class: "explain" + (good ? "" : " bad") }, [
          el("b", { text: good ? "To'g'ri! +" + pts + " ball. " : "To'g'ri javob: " + r.name + ". " }),
          document.createTextNode(r.desc)
        ]);
        var ul = el("ul", { class: "tiny", style: "margin:6px 0 0;padding-left:18px" });
        r.facts.forEach(function (f) { ul.appendChild(el("li", { text: f })); });
        ex.appendChild(ul);
        card.appendChild(ex);
        moreBtn.disabled = "";
        card.appendChild(el("button", {
          class: "btn btn-primary btn-block", style: "margin-top:10px",
          text: i + 1 >= pool.length ? "Natija" : "Keyingi",
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
