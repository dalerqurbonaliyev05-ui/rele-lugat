/* Progress saqlash (localStorage). Hech narsa tashqariga yuborilmaydi. */
(function () {
  "use strict";

  var KEY = "rele-lugat-v1";

  var DEFAULT = {
    name: "",
    theme: "light",
    xp: 0,
    streak: 0,
    lastDay: "",
    bestStreak: 0,
    fav: {},            // atama id -> true
    srs: {},            // atama id -> {box:1..5, due:"YYYY-MM-DD", seen:n}
    quizDone: {},       // "l12#3" -> true (to'g'ri javob berilgan)
    quizStat: { ok: 0, bad: 0 },
    lecStat: {},        // lecture id -> {ok:n, bad:n}
    mistakes: [],       // {kind:"quiz"|"term", key, ts}
    circuits: {},       // circuit id -> bestPercent
    badges: {},         // badge id -> true
    examBest: 0,
    dayTerm: { day: "", id: "" }
  };

  var S = null;

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function addDays(iso, n) {
    var p = iso.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dayDiff(a, b) {
    if (!a || !b) return 999;
    var pa = a.split("-"), pb = b.split("-");
    var da = new Date(+pa[0], +pa[1] - 1, +pa[2]), db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  }

  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { raw = null; }
    S = JSON.parse(JSON.stringify(DEFAULT));
    if (raw) {
      try {
        var o = JSON.parse(raw);
        for (var k in DEFAULT) if (Object.prototype.hasOwnProperty.call(o, k)) S[k] = o[k];
      } catch (e) { /* buzilgan ma'lumot — standart holat */ }
    }
    return S;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* xotira to'la yoki bloklangan */ }
  }

  /* --- Kunlik streak --- */
  function touchDay() {
    var t = today();
    if (S.lastDay === t) return;
    var d = dayDiff(S.lastDay, t);
    S.streak = (d === 1) ? S.streak + 1 : 1;
    if (S.streak > S.bestStreak) S.bestStreak = S.streak;
    S.lastDay = t;
    save();
  }

  /* --- XP va daraja --- */
  var LEVELS = [
    { min: 0,    name: "Shogird" },
    { min: 300,  name: "Texnik" },
    { min: 900,  name: "Muhandis" },
    { min: 2000, name: "Rele ustasi" }
  ];
  function level() {
    var cur = LEVELS[0], idx = 0;
    for (var i = 0; i < LEVELS.length; i++) if (S.xp >= LEVELS[i].min) { cur = LEVELS[i]; idx = i; }
    var next = LEVELS[idx + 1] || null;
    var lo = cur.min, hi = next ? next.min : cur.min + 1;
    return {
      name: cur.name, index: idx, next: next ? next.name : null,
      pct: next ? Math.min(100, Math.round((S.xp - lo) / (hi - lo) * 100)) : 100,
      toNext: next ? next.min - S.xp : 0
    };
  }
  function addXp(n) { S.xp += n; touchDay(); checkBadges(); save(); }

  /* --- Oraliqli takrorlash (Leitner, 5 quti) --- */
  var BOX_DAYS = [0, 1, 2, 4, 8, 16];
  function srsOf(id) { return S.srs[id] || { box: 0, due: today(), seen: 0 }; }
  function srsAnswer(id, known) {
    var s = srsOf(id);
    s.seen++;
    s.box = known ? Math.min(5, s.box + 1) : 1;
    s.due = addDays(today(), BOX_DAYS[s.box]);
    S.srs[id] = s;
    if (!known) pushMistake("term", id);
    save();
  }
  function srsDue() {
    var t = today(), out = [];
    (window.DATA.glossary || []).forEach(function (g) {
      var s = S.srs[g.id];
      if (!s || s.due <= t) out.push(g.id);
    });
    return out;
  }
  function learnedCount() {
    var n = 0;
    for (var k in S.srs) if (S.srs[k].box >= 4) n++;
    return n;
  }

  /* --- Xatolar daftari --- */
  function pushMistake(kind, key) {
    var i;
    for (i = 0; i < S.mistakes.length; i++) if (S.mistakes[i].kind === kind && S.mistakes[i].key === key) {
      S.mistakes[i].ts = Date.now(); save(); return;
    }
    S.mistakes.push({ kind: kind, key: key, ts: Date.now() });
    if (S.mistakes.length > 300) S.mistakes.shift();
    save();
  }
  function clearMistake(kind, key) {
    S.mistakes = S.mistakes.filter(function (m) { return !(m.kind === kind && m.key === key); });
    save();
  }

  /* --- Test statistikasi --- */
  function quizAnswer(lec, idx, ok) {
    var key = "l" + lec + "#" + idx;
    if (ok) { S.quizStat.ok++; S.quizDone[key] = true; clearMistake("quiz", key); }
    else { S.quizStat.bad++; pushMistake("quiz", key); }
    if (!S.lecStat[lec]) S.lecStat[lec] = { ok: 0, bad: 0 };
    S.lecStat[lec][ok ? "ok" : "bad"]++;
    save();
  }
  function lecProgress(lec) {
    var total = (window.DATA.quizzes || []).filter(function (q) { return q.l === lec; }).length;
    if (!total) return 0;
    var done = 0;
    for (var k in S.quizDone) if (k.indexOf("l" + lec + "#") === 0) done++;
    return Math.min(100, Math.round(done / total * 100));
  }

  /* --- Nishonlar --- */
  var BADGES = [
    { id: "first",   ico: "🎯", name: "Birinchi qadam",   desc: "Birinchi to'g'ri javob",              test: function () { return S.quizStat.ok >= 1; } },
    { id: "q50",     ico: "🧠", name: "Ellikchi",         desc: "50 ta to'g'ri javob",                 test: function () { return S.quizStat.ok >= 50; } },
    { id: "q150",    ico: "🏆", name: "Bilimdon",         desc: "150 ta to'g'ri javob",                test: function () { return S.quizStat.ok >= 150; } },
    { id: "streak3", ico: "🔥", name: "Uch kun",          desc: "3 kunlik streak",                     test: function () { return S.bestStreak >= 3; } },
    { id: "streak7", ico: "⚡", name: "Bir hafta",        desc: "7 kunlik streak",                     test: function () { return S.bestStreak >= 7; } },
    { id: "srs25",   ico: "📚", name: "Yodlovchi",        desc: "25 ta atama yodlandi",                test: function () { return learnedCount() >= 25; } },
    { id: "srs75",   ico: "🎓", name: "Lug'at sohibi",    desc: "75 ta atama yodlandi",                test: function () { return learnedCount() >= 75; } },
    { id: "circ1",   ico: "🔌", name: "Montajchi",        desc: "Birinchi sxema to'liq yig'ildi",      test: function () { for (var k in S.circuits) if (S.circuits[k] === 100) return true; return false; } },
    { id: "circall", ico: "🛠️", name: "Sxema ustasi",     desc: "Barcha sxemalar 100 %",               test: function () { var c = window.DATA.circuits || []; if (!c.length) return false; return c.every(function (x) { return S.circuits[x.id] === 100; }); } },
    { id: "exam80",  ico: "📝", name: "Imtihonchi",       desc: "Imtihonda 80 % dan yuqori",           test: function () { return S.examBest >= 80; } },
    { id: "lvl2",    ico: "🔧", name: "Texnik",           desc: "Texnik darajasiga yetish",            test: function () { return S.xp >= 300; } },
    { id: "lvl4",    ico: "👑", name: "Rele ustasi",      desc: "Eng yuqori darajaga yetish",          test: function () { return S.xp >= 2000; } }
  ];
  var newBadges = [];
  function checkBadges() {
    BADGES.forEach(function (b) {
      if (!S.badges[b.id] && b.test()) { S.badges[b.id] = true; newBadges.push(b); }
    });
  }
  function takeNewBadges() { var n = newBadges; newBadges = []; return n; }

  /* --- Bugungi atama --- */
  function dayTerm() {
    var t = today(), gl = window.DATA.glossary || [];
    if (!gl.length) return null;
    if (S.dayTerm.day !== t) {
      // kunga bog'langan barqaror tanlov
      var seed = 0, i;
      for (i = 0; i < t.length; i++) seed = (seed * 31 + t.charCodeAt(i)) % 100000;
      S.dayTerm = { day: t, id: gl[seed % gl.length].id };
      save();
    }
    var id = S.dayTerm.id;
    for (var j = 0; j < gl.length; j++) if (gl[j].id === id) return gl[j];
    return gl[0];
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    load();
  }

  window.Store = {
    get s() { return S; },
    load: load, save: save, today: today, addDays: addDays, dayDiff: dayDiff,
    touchDay: touchDay, level: level, addXp: addXp, LEVELS: LEVELS,
    srsOf: srsOf, srsAnswer: srsAnswer, srsDue: srsDue, learnedCount: learnedCount,
    pushMistake: pushMistake, clearMistake: clearMistake,
    quizAnswer: quizAnswer, lecProgress: lecProgress,
    BADGES: BADGES, checkBadges: checkBadges, takeNewBadges: takeNewBadges,
    dayTerm: dayTerm, reset: reset
  };
})();
