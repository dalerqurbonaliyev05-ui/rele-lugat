/* Profil: daraja, statistika, nishonlar, ma'ruza bo'yicha tahlil, sozlamalar. */
window.Views = window.Views || {};

window.Views.profile = function () {
  var el = UI.el, S = Store.s, lv = Store.level();
  var root = el("div");

  /* Bosh karta */
  var head = el("div", { class: "card center" }, [
    el("div", { style: "font-size:44px", text: ["🎓", "🔧", "⚙️", "👑"][lv.index] || "🎓" }),
    el("h2", { text: S.name || "Talaba" }),
    el("div", { class: "row", style: "justify-content:center" }, [
      el("span", { class: "chip on", text: lv.name }),
      el("span", { class: "chip", text: S.xp + " XP" })
    ]),
    (function () { var b = el("div", { class: "xpbar", style: "margin-top:10px" }); b.innerHTML = '<i style="width:' + lv.pct + '%"></i>'; return b; })(),
    lv.next ? el("div", { class: "tiny muted", style: "margin-top:6px", text: lv.next + " darajasiga " + lv.toNext + " XP qoldi" })
            : el("div", { class: "tiny muted", style: "margin-top:6px", text: "Eng yuqori daraja!" })
  ]);
  root.appendChild(head);

  /* Statistika */
  var st = S.quizStat, tot = st.ok + st.bad;
  root.appendChild(el("div", { class: "stat-grid" }, [
    el("div", { class: "stat" }, [el("b", { text: String(st.ok) }), el("span", { text: "to'g'ri javob" })]),
    el("div", { class: "stat" }, [el("b", { text: tot ? Math.round(st.ok / tot * 100) + "%" : "—" }), el("span", { text: "aniqlik" })]),
    el("div", { class: "stat" }, [el("b", { text: String(S.bestStreak) }), el("span", { text: "eng uzun streak" })]),
    el("div", { class: "stat" }, [el("b", { text: String(Store.learnedCount()) }), el("span", { text: "yodlangan atama" })]),
    el("div", { class: "stat" }, [el("b", { text: S.examBest + "%" }), el("span", { text: "imtihon rekordi" })]),
    el("div", { class: "stat" }, [el("b", { text: String(S.mistakes.length) }), el("span", { text: "xato daftarda" })])
  ]));

  if (S.mistakes.length) {
    root.appendChild(el("button", {
      class: "btn btn-block", style: "margin-bottom:12px", text: "⚠️ Xatolar daftarini ochish",
      onclick: function () { App.go("mistakes"); }
    }));
  }

  /* Ma'ruza bo'yicha tahlil */
  root.appendChild(el("h2", { text: "Ma'ruzalar bo'yicha", style: "margin:14px 0 8px" }));
  var box = el("div", { class: "card" });
  var any = false;
  (window.DATA.lectures || []).forEach(function (L) {
    var s = S.lecStat[L.id];
    var pct = Store.lecProgress(L.id);
    if (!s && !pct) return;
    any = true;
    var acc = s && (s.ok + s.bad) ? Math.round(s.ok / (s.ok + s.bad) * 100) : 0;
    var row = el("div", { class: "row", style: "margin-bottom:9px" }, [
      el("span", { class: "badge badge-lec", style: "background:" + L.color, text: String(L.id) }),
      el("div", { style: "flex:1;min-width:0" }, [
        el("div", { class: "tiny", style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap", text: L.title }),
        (function () { var b = el("div", { class: "progress", style: "margin:4px 0 0;height:6px" }); b.innerHTML = '<i style="width:' + pct + '%;background:' + L.color + '"></i>'; return b; })()
      ]),
      el("span", { class: "tiny muted", text: (s ? acc + "%" : "—") })
    ]);
    box.appendChild(row);
  });
  if (!any) box.appendChild(el("div", { class: "tiny muted center", text: "Hali test yechilmagan." }));
  root.appendChild(box);

  /* Nishonlar */
  root.appendChild(el("h2", { text: "Nishonlar", style: "margin:14px 0 8px" }));
  var bBox = el("div", { class: "card" });
  Store.BADGES.forEach(function (b) {
    var got = !!S.badges[b.id];
    bBox.appendChild(el("div", { class: "medal" + (got ? "" : " off") }, [
      el("div", { class: "m-ico", text: got ? b.ico : "🔒" }),
      el("div", [el("b", { class: "small", text: b.name }), el("div", { class: "tiny muted", text: b.desc })])
    ]));
  });
  root.appendChild(bBox);

  /* Sozlamalar */
  root.appendChild(el("h2", { text: "Sozlamalar", style: "margin:14px 0 8px" }));
  var setBox = el("div", { class: "card" });
  var nameInp = el("input", { type: "text", value: S.name, maxlength: "24" });
  nameInp.addEventListener("change", function () {
    S.name = (nameInp.value || "").trim().slice(0, 24) || "Talaba";
    Store.save(); UI.toast("Saqlandi");
  });
  setBox.appendChild(el("label", { class: "field" }, [el("span", { text: "Ism" }), nameInp]));
  setBox.appendChild(el("button", {
    class: "btn btn-block", text: (S.theme === "dark" ? "☀️ Kunduzgi" : "🌙 Tungi") + " rejimga o'tish",
    onclick: function () { document.getElementById("theme-btn").click(); App.go("profile"); }
  }));
  setBox.appendChild(el("div", { class: "sep" }));
  setBox.appendChild(el("button", {
    class: "btn btn-block btn-ghost", style: "color:var(--bad)", text: "Barcha progressni o'chirish",
    onclick: function () {
      if (!window.confirm("XP, streak, yodlangan atamalar va xatolar daftari o'chiriladi. Davom etasizmi?")) return;
      Store.reset();
      location.reload();
    }
  }));
  root.appendChild(setBox);

  root.appendChild(el("p", { class: "tiny muted center", style: "margin-top:12px" }, [
    document.createTextNode("Rele Lug'at · offline ishlaydi · ma'lumotlar faqat shu qurilmada saqlanadi."),
    el("br"),
    document.createTextNode("Manba: \"Releli himoya\" fani, 1-15 ma'ruzalar.")
  ]));

  return root;
};
