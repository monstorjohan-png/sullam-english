/* =====================================================================
   سلّم — منطق التطبيق (بلا مكتبات، يعمل من الملف مباشرة)
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.SULLAM;
  var KEY = "sullam.v1";
  var DAY = 86400000;

  /* ------------------------------- أدوات ------------------------------- */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function ico(name, cls) {
    return (
      '<svg class="' + (cls || "") + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'
    );
  }
  function todayKey(d) {
    var t = d || new Date();
    return (
      t.getFullYear() +
      "-" +
      String(t.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(t.getDate()).padStart(2, "0")
    );
  }
  function dayDiff(a, b) {
    var d1 = new Date(a + "T00:00:00");
    var d2 = new Date(b + "T00:00:00");
    return Math.round((d2 - d1) / DAY);
  }
  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }
  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[.,!?;:…]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }
  function unitById(id) {
    for (var i = 0; i < DATA.units.length; i++) if (DATA.units[i].id === id) return DATA.units[i];
    return null;
  }
  function levelByCode(code) {
    for (var i = 0; i < DATA.levels.length; i++) if (DATA.levels[i].code === code) return DATA.levels[i];
    return null;
  }
  function unitsOf(level) {
    return DATA.units.filter(function (u) {
      return u.level === level;
    });
  }
  function wordKey(w) {
    return w.en + "|" + w.ar;
  }

  /* ------------------------------- الحالة ------------------------------- */
  var DEFAULT = {
    v: 1,
    theme: null,
    xp: 0,
    streak: 0,
    lastStudy: null,
    days: {},
    words: {},
    units: {},
    prod: { writes: 0, speaks: 0, items: [] },
    badges: [],
    settings: { dailyGoal: DATA.dailyTarget, reminderTime: "19:00", notify: false },
    placement: null,
    current: "A1"
  };

  var S = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT));
      var p = JSON.parse(raw);
      var out = JSON.parse(JSON.stringify(DEFAULT));
      for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k)) out[k] = p[k];
      out.settings = Object.assign({}, DEFAULT.settings, p.settings || {});
      out.prod = Object.assign({}, DEFAULT.prod, p.prod || {});
      return out;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT));
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
      toast("تعذّر الحفظ: مساحة التخزين ممتلئة.", "warn");
    }
  }

  function today() {
    if (!S.days[todayKey()]) S.days[todayKey()] = { xp: 0, reviews: 0, correct: 0, total: 0 };
    return S.days[todayKey()];
  }

  function markStudy() {
    var t = todayKey();
    if (S.lastStudy === t) return;
    if (S.lastStudy && dayDiff(S.lastStudy, t) === 1) S.streak += 1;
    else S.streak = 1;
    S.lastStudy = t;
    checkBadges();
    save();
    paintHud();
  }

  function addXp(n, correct) {
    S.xp += n;
    var d = today();
    d.xp += n;
    if (typeof correct === "boolean") {
      d.total += 1;
      if (correct) d.correct += 1;
    }
    markStudy();
    save();
    paintHud();
    checkBadges();
  }

  function paintHud() {
    var sv = $("#streakVal");
    var xv = $("#xpVal");
    if (sv) sv.textContent = S.streak;
    if (xv) xv.textContent = S.xp;
  }

  /* ------------------------------- شارات ------------------------------- */
  function earned(id) {
    return S.badges.indexOf(id) !== -1;
  }
  function grant(id) {
    if (earned(id)) return;
    S.badges.push(id);
    var b = DATA.badges.filter(function (x) {
      return x.id === id;
    })[0];
    if (b) toast("شارة جديدة: " + b.name, "ok");
  }
  function wordsLearned() {
    return Object.keys(S.words).length;
  }
  function checkBadges() {
    if (S.xp > 0) grant("first-step");
    if (S.streak >= 3) grant("streak-3");
    if (S.streak >= 7) grant("streak-7");
    if (S.streak >= 30) grant("streak-30");
    if (wordsLearned() >= 25) grant("words-25");
    if (wordsLearned() >= 100) grant("words-100");
    if (Object.keys(S.units).length >= 1) grant("unit-1");
    if (S.prod.writes >= 5) grant("writing-5");
    if (S.prod.speaks >= 5) grant("speaking-5");
    var scanned = 0;
    for (var k in S.words) scanned += S.words[k].ok || 0;
    if (scanned >= 50) grant("review-50");
    var order = ["A1", "A2", "B1", "B2", "C1", "C2"];
    var prev = { A1: "level-a2", A2: "level-b1", B1: "level-b2", B2: "level-c1", C1: "level-c2" };
    order.forEach(function (lvl) {
      var us = unitsOf(lvl);
      if (!us.length) return;
      var all = us.every(function (u) {
        return S.units[u.id] && S.units[u.id].done;
      });
      if (all && prev[lvl] && !earned(prev[lvl])) {
        grant(prev[lvl]);
        S.current = order[Math.min(order.indexOf(lvl) + 1, order.length - 1)];
      }
    });
    save();
  }

  /* ------------------------------- نطق ------------------------------- */
  var voiceCache = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return null;
    if (voiceCache) return voiceCache;
    var vs = window.speechSynthesis.getVoices() || [];
    var en = vs.filter(function (v) {
      return /^en(-|_)/i.test(v.lang) || /english/i.test(v.name);
    });
    voiceCache =
      en.filter(function (v) {
        return /en-GB/i.test(v.lang);
      })[0] ||
      en.filter(function (v) {
        return /en-US/i.test(v.lang);
      })[0] ||
      en[0] ||
      null;
    return voiceCache;
  }
  function say(text, rate) {
    if (!("speechSynthesis" in window)) {
      toast("المتصفح لا يدعم النطق الآلي. جرّب Chrome أو Edge.", "warn");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text));
      var v = pickVoice();
      if (v) u.voice = v;
      u.lang = (v && v.lang) || "en-GB";
      u.rate = rate || 0.92;
      window.speechSynthesis.speak(u);
    } catch (e) {
      toast("تعذّر تشغيل الصوت.", "warn");
    }
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = function () {
      voiceCache = null;
      pickVoice();
    };
  }

  /* ------------------------------- تنبيهات ------------------------------- */
  function toast(msg, kind) {
    var host = $("#toastHost");
    if (!host) return;
    var el = document.createElement("div");
    el.className = "toast" + (kind ? " toast--" + kind : "");
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      setTimeout(function () {
        el.remove();
      }, 250);
    }, 2600);
  }

  /* ------------------------------- الحوار ------------------------------- */
  var dlg = $("#dlg");
  function openDialog(html) {
    dlg.innerHTML = html;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }
  function closeDialog() {
    if (dlg.open) dlg.close();
    else dlg.removeAttribute("open");
  }
  if (dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) closeDialog();
    });
    dlg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-close]");
      if (b) closeDialog();
    });
  }

  /* ------------------------------- SRS ------------------------------- */
  function seedWords(unit) {
    var changed = false;
    unit.words.forEach(function (w) {
      var k = wordKey(w);
      if (!S.words[k]) {
        S.words[k] = {
          en: w.en,
          ar: w.ar,
          ipa: w.ipa,
          ex: w.ex,
          exAr: w.exAr,
          unit: unit.id,
          n: 0,
          ok: 0,
          ease: 2.5,
          ivl: 0,
          due: Date.now(),
          lapses: 0
        };
        changed = true;
      }
      S.words[k].n = (S.words[k].n || 0) + 1;
    });
    if (changed) save();
  }

  function dueWords() {
    var now = Date.now();
    return Object.keys(S.words)
      .map(function (k) {
        return S.words[k];
      })
      .filter(function (w) {
        return w.due <= now;
      })
      .sort(function (a, b) {
        return a.due - b.due;
      });
  }

  function rateWord(k, q) {
    var w = S.words[k];
    if (!w) return;
    if (q === 0) {
      w.ease = Math.max(1.3, w.ease - 0.2);
      w.ivl = 0;
      w.lapses = (w.lapses || 0) + 1;
      w.due = Date.now() + 10 * 60000;
    } else if (q === 1) {
      w.ivl = w.ivl === 0 ? 1 : Math.min(180, Math.round(w.ivl * w.ease));
      w.due = Date.now() + w.ivl * DAY;
      w.ok = (w.ok || 0) + 1;
    } else {
      w.ease = Math.min(3.2, w.ease + 0.12);
      w.ivl = w.ivl === 0 ? 2 : Math.min(240, Math.round(w.ivl * w.ease * 1.25));
      w.due = Date.now() + w.ivl * DAY;
      w.ok = (w.ok || 0) + 1;
    }
    var d = today();
    d.reviews += 1;
    d.total = (d.total || 0) + 1;
    if (q > 0) d.correct = (d.correct || 0) + 1;
    S.xp += q > 0 ? 2 : 1;
    d.xp += q > 0 ? 2 : 1;
    markStudy();
    save();
    checkBadges();
    paintHud();
  }

  /* ------------------------------- التنقل ------------------------------- */
  function parseHash() {
    var h = (location.hash || "#/home").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { route: parts[0] || "home", args: parts.slice(1) };
  }

  function navTo(route, sub) {
    location.hash = "#/" + route + (sub ? "/" + sub : "");
  }

  function setActiveNav(route) {
    var map = { level: "path", unit: "path", home: "home", path: "path", vocab: "vocab", review: "review", sounds: "sounds", progress: "progress", guide: "guide", test: "guide" };
    var active = map[route] || route;
    $$("[data-route]").forEach(function (a) {
      if (a.getAttribute("data-route") === active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function findNextUnit() {
    for (var i = 0; i < DATA.units.length; i++) {
      if (!S.units[DATA.units[i].id] || !S.units[DATA.units[i].id].done) return DATA.units[i];
    }
    return null;
  }

  function levelProgress(code) {
    var us = unitsOf(code);
    var done = us.filter(function (u) {
      return S.units[u.id] && S.units[u.id].done;
    }).length;
    return { done: done, total: us.length, pct: us.length ? Math.round((done / us.length) * 100) : 0 };
  }

  /* ------------------------------- الهيكل العام ------------------------------- */
  function paintLadder() {
    var host = $("#ladderNav");
    if (!host) return;
    var cur = S.current || "A1";
    host.innerHTML = DATA.levels
      .map(function (l) {
        var p = levelProgress(l.code);
        var cls = "rung";
        if (l.code === cur && p.done < p.total) cls += " is-current";
        if (p.done === p.total) cls += " is-done";
        return (
          '<a class="' + cls + '" href="#/level/' + l.code + '">' +
          '<span class="rung__node">' + (p.done === p.total ? "✓" : l.code) + "</span>" +
          '<span class="rung__label">' + esc(l.label) + "<small>" + p.done + " / " + p.total + " وحدات</small></span>" +
          '<span class="rung__count">' + p.pct + "%</span>" +
          "</a>"
        );
      })
      .join("");
  }

  /* ------------------------------- عرض: اليوم ------------------------------- */
  function viewHome() {
    var d = today();
    var goal = S.settings.dailyGoal || 60;
    var pct = clamp(Math.round((d.xp / goal) * 100), 0, 100);
    var next = findNextUnit();
    var due = dueWords().length;
    var totalWords = wordsLearned();
    var dstr = new Date().toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" });
    var hour = new Date().getHours();
    var greet = hour < 12 ? "صباح الخير" : hour < 18 ? "مساء الخير" : "مساء الخير";
    var last = S.placement ? levelByCode(S.placement.level) : null;

    return (
      '<section class="today">' +
      "<div>" +
      '<span class="eyebrow">' + ico("target") + " " + esc(dstr) + "</span>" +
      "<h1>" + greet + " — جلسة اليوم</h1>" +
      '<p class="muted">هدف اليوم ' + goal + " نقطة. " +
      (d.xp >= goal
        ? "أكملت هدفك، وأي جلسة إضافية اليوم مكسب صافٍ."
        : "تبقّى " + (goal - d.xp) + " نقطة — نحو ٨ دقائق.") +
      "</p>" +
      '<div class="today__actions">' +
      (next
        ? '<a class="btn btn--primary" href="#/unit/' + next.id + '">' + ico("play") + " ابدأ:" + esc(next.title) + "</a>"
        : '<a class="btn btn--primary" href="#/sounds">' + ico("mic") + " تدريب النطق</a>") +
      '<a class="btn" href="#/review">' + ico("repeat") + " مراجعة " + due + " كلمة</a>" +
      (S.placement
        ? '<a class="btn btn--ghost" href="#/test">' + ico("clipboard") + " إعادة الاختبار</a>"
        : '<a class="btn btn--ghost" href="#/test">' + ico("clipboard") + " حدّد مستواك</a>") +
      "</div>" +
      "</div>" +
      '<div class="ring" style="--p:' + pct + '" role="img" aria-label="هدف اليوم ' + pct + '%">' +
      '<div class="ring__inner"><span class="ring__num">' + pct + "%</span><span class=\"ring__lbl\">من الهدف</span></div>" +
      "</div>" +
      "</section>" +

      '<div class="stats" style="margin-top:1rem">' +
      stat(S.streak, "يوم متتالٍ") +
      stat(S.xp, "نقطة خبرة") +
      stat(totalWords, "كلمة في ذاكرتك") +
      stat(S.badges.length, "شارة") +
      "</div>" +

      (last
        ? '<div class="panel" style="margin-top:1rem"><div class="row"><div class="row__main">' +
          '<div class="row__title">مستواك المقترح: ' + last.code + " — " + esc(last.label) + "</div>" +
          '<div class="row__sub">' + "نتيجة اختبار التحديد: " + S.placement.score + " / " + DATA.placement.length + " · " + esc(last.blurb.slice(0, 90)) + "…</div>" +
          '</div><a class="btn btn--sm" href="#/level/' + last.code + '">افتح المستوى</a></div></div>'
        : "") +

      '<div class="grid grid--2" style="margin-top:1rem">' +
      '<section class="panel"><div class="panel__head"><h2>خطة الجلسة (١٨ دقيقة)</h2></div>' +
      listStep("1", "مراجعة", due + " كلمة مستحقة الآن", "#/review", "repeat") +
      listStep("2", "درس جديد", next ? next.title + " · " + next.level : "أكملت كل الوحدات", next ? "#/unit/" + next.id : "#/path", "book") +
      listStep("3", "إنتاج", "جملة مكتوبة أو ٣٠ ثانية مسجّلة", next ? "#/unit/" + next.id : "#/sounds", "pen") +
      '<div style="margin-top:.75rem"><button class="btn btn--ghost btn--sm" data-act="settings">' + ico("sliders") + " اضبط هدفك وتذكيرك اليومي</button></div>" +
      "</section>" +

      '<section class="panel"><div class="panel__head"><h2>آخر ٨ أسابيع</h2><a class="small" href="#/progress">التفاصيل</a></div>' +
      heatmap(56) +
      '<p class="tiny muted" style="margin-top:.75rem">كل مربع يوم. الأخضر = نقاطك في ذلك اليوم.</p>' +
      "</section>" +
      "</div>" +

      '<section class="panel" style="margin-top:1rem"><div class="panel__head"><h2>الإنتاج هذا الأسبوع</h2></div>' +
      '<div class="grid grid--3">' +
      statBox("كتابة", S.prod.writes, "مهمة") +
      statBox("تسجيل صوتي", S.prod.speaks, "تسجيل") +
      statBox("دقة التمارين", accuracy(), "%") +
      "</div></section>" +

      '<div class="foot"><span>بياناتك محفوظة في متصفحك فقط.</span><span class="en">A1 → C2</span></div>'
    );
  }

  function stat(v, l) {
    return '<div class="stat"><div class="stat__val">' + v + '</div><div class="stat__lbl">' + l + "</div></div>";
  }
  function statBox(l, v, u) {
    return '<div><div class="muted small">' + l + '</div><div class="stat__val">' + v + ' <span class="tiny muted">' + u + "</span></div></div>";
  }
  function listStep(n, title, sub, href, icon) {
    return (
      '<a class="row" href="' + href + '" style="text-decoration:none;color:inherit">' +
      '<span class="unit__idx" style="width:32px;height:32px">' + n + "</span>" +
      '<span class="row__main"><span class="row__title">' + esc(title) + '</span><span class="row__sub">' + esc(sub) + "</span></span>" +
      '<span class="muted">' + ico(icon) + "</span></a>"
    );
  }

  function accuracy() {
    var c = 0,
      t = 0;
    for (var k in S.days) {
      c += S.days[k].correct || 0;
      t += S.days[k].total || 0;
    }
    return t ? Math.round((c / t) * 100) : 0;
  }

  function heatmap(days) {
    var cells = [];
    var start = new Date();
    start.setDate(start.getDate() - (days - 1));
    for (var i = 0; i < days; i++) {
      var d = new Date(start.getTime() + i * DAY);
      var k = todayKey(d);
      var v = (S.days[k] && S.days[k].xp) || 0;
      var lvl = v === 0 ? 0 : v < 20 ? 1 : v < 40 ? 2 : v < 60 ? 3 : 4;
      cells.push('<span class="heat__cell" data-l="' + lvl + '" title="' + k + " · " + v + ' نقطة"></span>');
    }
    return '<div class="heat">' + cells.join("") + "</div>";
  }

  /* ------------------------------- عرض: المسار ------------------------------- */
  function viewPath() {
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("map") + " ستة مستويات</span>" +
      "<h1>المسار</h1><p>كل مستوى ثلاثة أقسام: مفردات، قاعدة واحدة مركزة، ومهمة إنتاج. لا تحاول إنهاء مستوى في أسبوع؛ الاتساع يأتي من التكرار.</p></div></div>" +
      '<div class="unit-list">' +
      DATA.levels
        .map(function (l) {
          var p = levelProgress(l.code);
          return (
            '<a class="unit" href="#/level/' + l.code + '" style="grid-template-columns:auto 1fr">' +
            '<span class="unit__idx" style="width:52px;height:52px;border-radius:12px;font-size:1rem">' + l.code + "</span>" +
            '<span class="row__main"><span class="unit__title">' + esc(l.label) + " — " + esc(l.en) + "</span>" +
            '<span class="unit__aim">' + esc(l.blurb) + "</span>" +
            '<span class="unit__side" style="margin-top:.5rem"><span class="progress"><span class="progress__bar" style="width:' + p.pct + '%"></span></span><span class="tiny muted">' + p.done + "/" + p.total + " وحدة</span></span></span>" +
            "</a>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="panel" style="margin-top:1.5rem"><h2>كم يستغرق الوصول؟</h2>' +
      '<p class="small muted">هذه تقديرات إرشادية شائعة، لا يفرضها إطار CEFR نفسه. تعتمد على ساعات دراسة موجّهة، وتزيد كثيراً إذا كانت الدراسة متقطعة.</p>' +
      '<div class="words">' +
      DATA.levels
        .map(function (l) {
          return (
            '<div class="word" style="grid-template-columns:80px 1fr 1fr">' +
            '<span class="word__en">' + l.code + "</span>" +
            '<span class="word__ar">' + esc(l.hours) + "</span>" +
            '<span class="word__ar muted">' + esc(l.words) + "</span></div>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  /* ------------------------------- عرض: المفردات ------------------------------- */
  function viewVocab() {
    var total = DATA.vocab.length;
    var groups = DATA.levels
      .map(function (l) {
        var items = DATA.vocab.filter(function (v) {
          return v[4] === l.code;
        });
        if (!items.length) return "";
        return (
          '<section data-vocab-group="' + l.code + '" style="margin-bottom:1.5rem">' +
          '<div class="panel__head" style="margin-bottom:.5rem">' +
          "<h2>" + l.code + " · " + esc(l.label) + ' <span class="tiny muted">(' + items.length + " كلمة)</span></h2>" +
          '<button class="btn btn--sm" data-act="add-level" data-level="' + l.code + '">' + ico("book") + " أضف المجموعة للمراجعة</button>" +
          "</div>" +
          '<div class="words">' +
          items
            .map(function (v) {
              var key = v[0] + "|" + v[1];
              var added = !!S.words[key];
              return (
                '<div class="word" data-vocab-row="' + esc(normalize(v[0] + " " + v[1] + " " + v[3])) + '" data-level="' + l.code + '">' +
                '<div><span class="word__en">' + esc(v[0]) + "</span> " +
                '<span class="ipa">' + esc(v[2]) + "</span> " +
                '<span class="chip">' + esc(v[3]) + "</span></div>" +
                '<div class="word__ar">' + esc(v[1]) + "</div>" +
                '<div style="display:flex;gap:.35rem;justify-content:flex-end">' +
                '<button class="icon-btn" data-act="say" data-text="' + esc(v[0]) + '" aria-label="انطق">' + ico("volume") + "</button>" +
                '<button class="btn btn--sm' + (added ? " btn--ghost" : "") + '" data-act="add-word" data-en="' + esc(v[0]) + '" data-ar="' + esc(v[1]) + '" data-ipa="' + esc(v[2]) + '" data-level="' + l.code + '"' + (added ? " disabled" : "") + ">" +
                (added ? "في المراجعة" : "أضف") +
                "</button></div></div>"
              );
            })
            .join("") +
          "</div></section>"
        );
      })
      .join("");

    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("book") + " " + total + " كلمة إضافية</span>" +
      "<h1>بنك المفردات</h1>" +
      "<p>مفردات عالية التكرار لكل مستوى. أضف ما تحتاجه إلى المراجعة المتباعدة، ولا تحاول حفظ القائمة كلها في يوم.</p></div></div>" +

      '<div class="panel" style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem">' +
      '<label class="sr-only" for="vocabSearch">بحث</label>' +
      '<input class="field" id="vocabSearch" type="search" placeholder="ابحث بالعربية أو الإنجليزية…" style="flex:1;min-width:200px;direction:rtl;font-family:var(--font-ar)" />' +
      '<label class="sr-only" for="vocabLevel">المستوى</label>' +
      '<select class="field" id="vocabLevel" style="width:auto;direction:rtl;font-family:var(--font-ar)">' +
      '<option value="all">كل المستويات</option>' +
      DATA.levels.map(function (l) { return '<option value="' + l.code + '">' + l.code + " · " + esc(l.label) + "</option>"; }).join("") +
      "</select>" +
      '<span class="chip" id="vocabCount">' + total + " كلمة</span></div>" +

      '<div id="vocabList">' + groups + "</div>" +
      '<p class="small muted" id="vocabEmpty" hidden>لا نتيجة مطابقة. جرّب كلمة أخرى.</p>' +
      '<div class="foot"><span>المفردات هنا بلا أمثلة — الأمثلة داخل الوحدات.</span><a href="#/path">المسار</a></div>'
    );
  }

  function addVocabWord(en, ar, ipa, level) {
    var k = en + "|" + ar;
    if (S.words[k]) return false;
    S.words[k] = {
      en: en,
      ar: ar,
      ipa: ipa || "",
      ex: "",
      exAr: "",
      unit: level || "vocab",
      n: 1,
      ok: 0,
      ease: 2.5,
      ivl: 0,
      due: Date.now(),
      lapses: 0
    };
    return true;
  }

  function filterVocab() {
    var qEl = $("#vocabSearch");
    var lvEl = $("#vocabLevel");
    if (!qEl || !lvEl) return;
    var q = normalize(qEl.value);
    var lv = lvEl.value;
    var shown = 0;
    $$("[data-vocab-row]").forEach(function (row) {
      var hitQ = !q || row.getAttribute("data-vocab-row").indexOf(q) !== -1;
      var hitL = lv === "all" || row.getAttribute("data-level") === lv;
      row.hidden = !(hitQ && hitL);
      if (!row.hidden) shown += 1;
    });
    $$("[data-vocab-group]").forEach(function (g) {
      g.hidden = !$$("[data-vocab-row]", g).some(function (r) { return !r.hidden; });
    });
    var counter = $("#vocabCount");
    if (counter) counter.textContent = shown + " كلمة";
    var empty = $("#vocabEmpty");
    if (empty) empty.hidden = shown !== 0;
  }

  /* ------------------------------- عرض: مستوى ------------------------------- */
  function viewLevel(code) {
    var l = levelByCode(code);
    if (!l) return viewPath();
    var p = levelProgress(code);
    var us = unitsOf(code);
    return (
      '<div class="level-hero">' +
      "<div>" +
      '<span class="level-hero__code">' + l.code + "</span>" +
      "<h1>" + esc(l.label) + " · " + esc(l.en) + "</h1>" +
      '<p class="muted">' + esc(l.blurb) + "</p>" +
      '<div class="level-hero__meta">' +
      '<span class="chip">' + esc(l.hours) + "</span>" +
      '<span class="chip">' + esc(l.words) + "</span>" +
      '<span class="chip chip--accent">IELTS ' + esc(l.ielts) + "</span>" +
      '<span class="chip">' + esc(l.exam) + "</span>" +
      "</div></div>" +
      '<div style="display:flex;gap:.75rem;align-items:center">' +
      '<span class="progress" style="min-width:140px"><span class="progress__bar" style="width:' + p.pct + '%"></span></span>' +
      '<span class="small muted">' + p.done + " / " + p.total + "</span></div>" +
      "</div>" +

      '<section class="panel"><h2>ماذا تستطيع أن تفعل في هذا المستوى؟</h2>' +
      '<ul style="margin-top:.75rem">' +
      l.canDo.map(function (t) {
        return "<li>" + esc(t) + "</li>";
      }).join("") +
      "</ul></section>" +

      '<div class="grid grid--2" style="margin-top:1rem">' +
      '<section class="panel"><h2>استراتيجية المستوى</h2><p class="small">' + esc(l.strategy) + "</p></section>" +
      '<section class="panel"><h2>أخطاء عربية شائعة</h2><ul class="small">' +
      l.pitfalls.map(function (t) {
        return "<li>" + esc(t) + "</li>";
      }).join("") +
      "</ul></section></div>" +

      '<h2 style="margin:1.75rem 0 .75rem">الوحدات</h2>' +
      '<div class="unit-list">' +
      us.map(function (u, i) {
        var done = S.units[u.id] && S.units[u.id].done;
        return (
          '<a class="unit' + (done ? " is-done" : "") + '" href="#/unit/' + u.id + '">' +
          '<span class="unit__idx">' + (done ? "✓" : i + 1) + "</span>" +
          '<span class="row__main"><span class="unit__title">' + esc(u.title) + "</span>" +
          '<span class="unit__aim">' + esc(u.aim) + "</span></span>" +
          '<span class="unit__side"><span class="chip">' + u.words.length + " كلمة</span>" +
          '<span class="chip">' + u.exercises.length + " تمرين</span>" +
          '<span class="muted">' + ico("chevron") + "</span></span></a>"
        );
      }).join("") +
      "</div>"
    );
  }

  /* ------------------------------- عرض: وحدة ------------------------------- */
  var exState = {};

  function viewUnit(id) {
    var u = unitById(id);
    if (!u) return viewPath();
    seedWords(u);
    exState = {};
    var lvl = levelByCode(u.level);
    var done = S.units[u.id] && S.units[u.id].done;

    var html =
      '<div class="lesson-head"><div>' +
      '<span class="eyebrow">' + ico("book") + " " + u.level + " · " + esc(lvl.label) + "</span>" +
      "<h1>" + esc(u.title) + "</h1>" +
      '<p class="muted">' + esc(u.aim) + "</p>" +
      "</div>" +
      '<div style="display:flex;gap:.5rem">' +
      '<button class="btn btn--sm" data-act="say-all">' + ico("volume") + " اسمع الكلمات</button>" +
      (done ? '<span class="chip chip--ok">' + ico("check") + " مكتملة</span>" : "") +
      "</div></div>" +

      "<h2>1 · المفردات (" + u.words.length + ")</h2>" +
      '<p class="small muted" style="margin:.25rem 0 .75rem">اضغط مكبّر الصوت لسماع النطق. لا تحفظ الكلمة وحدها — احفظ الجملة.</p>' +
      '<div class="words">' +
      u.words
        .map(function (w) {
          return (
            '<div class="word">' +
            '<div><span class="word__en">' + esc(w.en) + "</span> " +
            '<span class="ipa">' + esc(w.ipa) + "</span> " +
            '<span class="chip">' + esc(w.pos) + "</span></div>" +
            '<div class="word__ar">' + esc(w.ar) + "</div>" +
            '<button class="icon-btn" data-act="say" data-text="' + esc(w.en) + '" aria-label="انطق ' + esc(w.en) + '">' + ico("volume") + "</button>" +
            '<div class="word__ex"><span class="en">' + esc(w.ex) + "</span> — " + esc(w.exAr) + "</div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>" +

      '<section class="grammar" style="margin-top:1.5rem">' +
      "<h3>" + esc(u.grammar.title) + "</h3>" +
      '<p class="grammar__idea">' + esc(u.grammar.idea) + "</p>" +
      '<div class="rules">' +
      u.grammar.rules
        .map(function (r) {
          return '<div class="rule"><span class="rule__f">' + esc(r.f) + '</span><span class="rule__ex en">' + esc(r.ex) + "</span></div>";
        })
        .join("") +
      "</div>" +
      '<div class="examples">' +
      u.grammar.examples
        .map(function (e) {
          return (
            '<div class="example"><button class="icon-btn" data-act="say" data-text="' + esc(e.en) + '" aria-label="انطق المثال" style="width:30px;height:30px">' + ico("volume") + "</button>" +
            '<span><span class="en">' + esc(e.en) + "</span> — <span class=\"muted\">" + esc(e.ar) + "</span></span></div>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="note">' + esc(u.grammar.note) + "</div>" +
      "</section>" +

      '<h2 style="margin:1.75rem 0 .75rem">2 · التمارين (' + u.exercises.length + ")</h2>" +
      '<div id="exHost">' +
      u.exercises.map(function (ex, i) {
        return renderExercise(ex, i);
      }).join("") +
      "</div>" +
      '<div id="exResult"></div>' +

      '<h2 style="margin:1.75rem 0 .75rem">3 · الإنتاج</h2>' +
      renderProduce(u) +

      '<div class="foot"><a href="#/level/' + u.level + '">' + ico("chevron") + " عودة إلى " + u.level + "</a>" +
      '<button class="btn btn--ghost btn--sm" data-act="reset-unit" data-id="' + u.id + '">إعادة التمارين</button></div>';

    return html;
  }

  function renderExercise(ex, i) {
    var head = '<div class="ex" data-ex="' + i + '"><div class="ex__q">' + (i + 1) + ". " + esc(ex.q || labelFor(ex)) + "</div>";
    if (ex.type === "choice") {
      return (
        head +
        '<div class="ex__opts">' +
        ex.o
          .map(function (o, j) {
            return '<button class="opt" data-act="answer" data-ex="' + i + '" data-opt="' + j + '"><span class="opt__key">' + "ABCD"[j] + "</span><span>" + esc(o) + "</span></button>";
          })
          .join("") +
        "</div><div class=\"fb\"></div></div>"
      );
    }
    if (ex.type === "fill" || ex.type === "translate") {
      return (
        head +
        '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
        '<input class="field" style="flex:1;min-width:200px" data-input="' + i + '" placeholder="' +
        (ex.type === "translate" ? "اكتب الترجمة بالإنجليزية" : "اكتب الكلمة الناقصة") +
        '" autocomplete="off" spellcheck="false" />' +
        '<button class="btn" data-act="check-input" data-ex="' + i + '">تحقق</button></div>' +
        '<div class="fb"></div></div>'
      );
    }
    if (ex.type === "order") {
      var tokens = shuffle(ex.target.split(" "));
      return (
        head +
        '<p class="small muted" style="margin-bottom:.5rem">رتّب الكلمات: ' + esc(ex.ar) + "</p>" +
        '<div class="tokens" data-built="' + i + '"></div>' +
        '<div class="tokens" data-pool="' + i + '" style="background:transparent;border-style:solid">' +
        tokens
          .map(function (t, j) {
            return '<button class="token" data-act="token" data-ex="' + i + '" data-tok="' + j + '">' + esc(t) + "</button>";
          })
          .join("") +
        "</div>" +
        '<div style="display:flex;gap:.5rem"><button class="btn btn--sm" data-act="check-order" data-ex="' + i + '">تحقق</button>' +
        '<button class="btn btn--ghost btn--sm" data-act="clear-order" data-ex="' + i + '">مسح</button></div>' +
        '<div class="fb"></div></div>'
      );
    }
    if (ex.type === "listen") {
      return (
        head +
        '<button class="btn btn--sm" data-act="say" data-text="' + esc(ex.word) + '">' + ico("volume") + " استمع</button>" +
        '<div class="ex__opts" style="margin-top:.75rem">' +
        ex.o
          .map(function (o, j) {
            return '<button class="opt" data-act="answer" data-ex="' + i + '" data-opt="' + j + '"><span class="opt__key">' + "ABCD"[j] + "</span><span class=\"en\">" + esc(o) + "</span></button>";
          })
          .join("") +
        "</div><div class=\"fb\"></div></div>"
      );
    }
    return head + "</div>";
  }

  function labelFor(ex) {
    if (ex.type === "order") return "رتّب الجملة";
    if (ex.type === "translate") return "ترجم إلى الإنجليزية";
    if (ex.type === "listen") return "استمع واختر";
    return "أكمل";
  }

  function renderProduce(u) {
    var p = u.produce;
    return (
      '<section class="panel" id="produceBox">' +
      '<div class="panel__head"><h3>' + (p.type === "write" ? "مهمة كتابة" : "مهمة تحدث") + "</h3>" +
      '<span class="chip">' + p.min + "+ كلمة</span></div>" +
      '<p class="small">' + esc(p.prompt) + "</p>" +
      '<ul class="small muted" style="margin:.5rem 0 1rem">' +
      p.checklist
        .map(function (c) {
          return "<li>" + esc(c) + "</li>";
        })
        .join("") +
      "</ul>" +
      '<label class="sr-only" for="prodText">نص الإنتاج</label>' +
      '<textarea class="field" id="prodText" placeholder="اكتب هنا… (يُحفظ في متصفحك فقط)"></textarea>' +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem">' +
      '<button class="btn btn--primary" data-act="save-write" data-unit="' + u.id + '">' + ico("check") + " احفظ المهمة (+15)</button>" +
      '<button class="btn" data-act="record-start">' + ico("mic") + " سجّل صوتك</button>" +
      '<button class="btn" data-act="record-stop" hidden>إيقاف التسجيل</button>' +
      '<span class="rec-slot" data-rec-slot></span>' +
      "</div>" +
      '<p class="tiny muted" style="margin-top:.75rem">التسجيل لا يُرسل لأي جهة ولا يُخزَّن بعد إغلاق الصفحة.</p>' +
      "</section>"
    );
  }

  /* ------------------------------- عرض: مراجعة ------------------------------- */
  var review = null;

  function viewReview() {
    var due = dueWords();
    if (!S.words || Object.keys(S.words).length === 0) {
      return (
        '<div class="page-head"><div><span class="eyebrow">' + ico("repeat") + " التكرار المتباعد</span><h1>المراجعة</h1></div></div>" +
        '<div class="panel empty">' + ico("book") +
        "<p>لا توجد كلمات بعد. افتح وحدة واحدة وسجّل كلماتها، ثم عُد إلى هنا.</p>" +
        '<a class="btn btn--primary" href="#/path">افتح المسار</a></div>'
      );
    }
    if (!due.length) {
      var next = Object.keys(S.words)
        .map(function (k) {
          return S.words[k];
        })
        .sort(function (a, b) {
          return a.due - b.due;
        })[0];
      var when = next ? new Date(next.due).toLocaleString("ar-EG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
      return (
        '<div class="page-head"><div><span class="eyebrow">' + ico("repeat") + " التكرار المتباعد</span><h1>المراجعة</h1></div></div>" +
        '<div class="panel empty">' + ico("check") +
        "<h2>لا شيء مستحق الآن</h2><p>أقرب كلمة في " + esc(when) + ". المراجعة القصيرة المتكررة أفضل من جلسة طويلة واحدة.</p>" +
        '<div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">' +
        '<button class="btn btn--primary" data-act="review-extra">راجع ١٠ كلمات إضافية</button>' +
        '<a class="btn" href="#/path">تعلّم كلمات جديدة</a></div></div>'
      );
    }
    if (!review || review.mode !== "due") {
      review = { list: due.slice(0, 12), i: 0, mode: "due", flipped: false, right: 0 };
    }
    return renderFlash();
  }

  function renderFlash() {
    if (!review) review = { list: [], i: 0, mode: "due", flipped: false, right: 0 };
    if (review.i >= review.list.length) {
      var msg = review.i + " كلمة راجعتها.";
      return (
        '<div class="panel empty">' + ico("trophy") +
        "<h2>انتهت الجلسة</h2><p>" + msg + " المراجعة القادمة ستكون أسهل — هذا هو أثر التكرار المتباعد.</p>" +
        '<div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">' +
        '<a class="btn btn--primary" href="#/home">اليوم</a>' +
        '<button class="btn" data-act="review-extra">١٠ كلمات أخرى</button></div></div>'
      );
    }
    var w = review.list[review.i];
    var k = wordKey(w);
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("repeat") + " " + (review.i + 1) + " / " + review.list.length + "</span>" +
      "<h1>المراجعة</h1></div>" +
      '<span class="chip">' + (review.mode === "due" ? "مستحقة" : "إضافية") + "</span></div>" +
      '<div class="flash-wrap">' +
      '<button class="flash' + (review.flipped ? " is-flipped" : "") + '" data-act="flip" aria-label="اقلب البطاقة">' +
      '<span class="flash__inner">' +
      '<span class="flash__face"><span class="flash__word">' + esc(w.en) + "</span>" +
      '<span class="ipa">' + esc(w.ipa || "") + "</span>" +
      '<span class="flash__hint">اضغط أو مسافة لعرض المعنى</span></span>' +
      '<span class="flash__face flash__face--back"><span class="flash__word" style="font-size:1.6rem">' + esc(w.ar) + "</span>" +
      '<span class="small muted">' + esc(w.ex || "") + "</span>" +
      '<span class="tiny muted">' + esc(w.exAr || "") + "</span></span>" +
      "</span></button>" +
      '<div style="display:flex;gap:.5rem">' +
      '<button class="icon-btn" data-act="say" data-text="' + esc(w.en) + '" aria-label="انطق">' + ico("volume") + "</button>" +
      '<button class="icon-btn" data-act="say" data-text="' + esc(w.ex || w.en) + '" aria-label="انطق المثال">' + ico("play") + "</button>" +
      "</div>" +
      (review.flipped
        ? '<div class="rate">' +
          '<button class="btn" data-act="rate" data-q="0">أعدها قريباً</button>' +
          '<button class="btn" data-act="rate" data-q="1">جيدة</button>' +
          '<button class="btn btn--primary" data-act="rate" data-q="2">سهلة</button>' +
          "</div>"
        : '<button class="btn btn--primary" data-act="flip">أظهر المعنى</button>') +
      "</div>"
    );
  }

  function viewSounds() {
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("mic") + " تدريب سمعي</span><h1>أصوات تصعب على الناطق بالعربية</h1>" +
      "<p>هذه ليست قواعد. ثمانية فروق صوتية تُغيّر المعنى، مع أزواج متقابلة. استمع، كرّر بصوت عالٍ، ثم سجّل نفسك وقارن.</p></div></div>" +
      DATA.sounds
        .map(function (s) {
          return (
            '<section class="panel" style="margin-bottom:1rem">' +
            '<div class="panel__head"><h2 class="en" style="font-size:1.1rem">' + esc(s.title) + "</h2>" +
            '<button class="btn btn--sm" data-act="say-pairs" data-id="' + s.id + '">' + ico("volume") + " اسمع الكل</button></div>" +
            '<p class="small muted">' + esc(s.why) + "</p>" +
            '<div class="grid grid--2" style="margin:.75rem 0">' +
            s.pairs
              .map(function (p) {
                return (
                  '<div class="row" style="padding:.4rem 0">' +
                  '<button class="icon-btn" data-act="say" data-text="' + esc(p[0]) + '" aria-label="انطق">' + ico("volume") + "</button>" +
                  '<span class="en" style="font-weight:600">' + esc(p[0]) + '</span>' +
                  '<span class="muted small">مقابل</span>' +
                  '<span class="en" style="font-weight:600">' + esc(p[1]) + "</span>" +
                  '<button class="icon-btn" data-act="say" data-text="' + esc(p[1]) + '" aria-label="انطق">' + ico("volume") + "</button>" +
                  "</div>"
                );
              })
              .join("") +
            "</div>" +
            '<div class="note">' + esc(s.tip) + "</div>" +
            '<div style="display:flex;gap:.5rem;align-items:center;margin-top:.75rem">' +
            '<button class="btn btn--sm" data-act="record-start">' + ico("mic") + " سجّل محاولتك</button>" +
            '<button class="btn btn--sm" data-act="record-stop" hidden>إيقاف</button>' +
            '<span class="rec-slot"></span></div>' +
            "</section>"
          );
        })
        .join("") +
      '<div class="panel"><h2>قاعدة النطق الوحيدة</h2>' +
      '<p class="small">لا تحاول «النطق الصحيح» دفعة واحدة. اختر صوتاً واحداً هذا الأسبوع، واستمع لأزواجه ٣ دقائق يومياً. الدماغ يعدّل الفئة الصوتية بالتكرار المسموع، لا بالشرح.</p></div>'
    );
  }

  /* ------------------------------- عرض: التقدم ------------------------------- */
  function viewProgress() {
    var badges = DATA.badges;
    var totalWords = wordsLearned();
    var mastered = Object.keys(S.words).filter(function (k) {
      return S.words[k].ivl >= 7;
    }).length;
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("chart") + " القياس</span><h1>تقدمي</h1>" +
      "<p>ما لا يُقاس لا يُحسَّن. هذه أرقامك أنت، لا مقارنة بأحد.</p></div>" +
      '<button class="btn btn--sm" data-act="settings">' + ico("sliders") + " الإعدادات</button></div>" +

      '<div class="stats">' +
      stat(S.xp, "إجمالي النقاط") +
      stat(S.streak, "أطول سلسلة حالية") +
      stat(totalWords, "كلمات مسجّلة") +
      stat(mastered, "كلمات متمكّنة") +
      "</div>" +

      '<div class="grid grid--2" style="margin-top:1rem">' +
      '<section class="panel"><div class="panel__head"><h2>النشاط</h2><span class="tiny muted">١٢ أسبوعاً</span></div>' + heatmap(84) + "</section>" +
      '<section class="panel"><h2>المستويات</h2>' +
      DATA.levels
        .map(function (l) {
          var p = levelProgress(l.code);
          return (
            '<div style="margin-bottom:.6rem"><div style="display:flex;justify-content:space-between" class="small">' +
            "<span>" + l.code + " · " + esc(l.label) + '</span><span class="muted">' + p.done + "/" + p.total + "</span></div>" +
            '<div class="progress" style="margin-top:.25rem"><div class="progress__bar" style="width:' + p.pct + '%"></div></div></div>'
          );
        })
        .join("") +
      "</section></div>" +

      '<section class="panel" style="margin-top:1rem"><div class="panel__head"><h2>الشارات</h2><span class="chip">' + S.badges.length + " / " + badges.length + "</span></div>" +
      '<div class="badges">' +
      badges
        .map(function (b) {
          var has = earned(b.id);
          return (
            '<div class="badge' + (has ? " is-earned" : "") + '">' +
            '<span class="badge__icon">' + ico(b.icon === "ladder" ? "ladder" : b.icon === "pen" ? "pen" : b.icon === "mic" ? "mic" : b.icon === "repeat" ? "repeat" : b.icon === "book" ? "book" : b.icon === "trophy" ? "trophy" : b.icon === "flame" ? "flame" : b.icon === "footprints" ? "check" : "check") + "</span>" +
            '<span class="badge__name">' + esc(b.name) + "</span>" +
            '<span class="badge__desc">' + esc(b.desc) + "</span></div>"
          );
        })
        .join("") +
      "</div></section>" +

      '<section class="panel" style="margin-top:1rem"><h2>النسخ والأمان</h2>' +
      '<p class="small muted">تقدمك في هذا المتصفح فقط. صدّره كملف لتنقله لجهاز أو متصفح آخر، أو لتحتفظ بنسخة قبل تنظيف البيانات.</p>' +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
      '<button class="btn" data-act="export">' + ico("download") + " تصدير JSON</button>" +
      '<label class="btn" style="cursor:pointer">' + ico("upload") + ' استيراد<input type="file" accept="application/json" data-act="import" hidden /></label>' +
      '<button class="btn btn--ghost" data-act="reset">حذف كل البيانات</button>' +
      "</div></section>" +

      '<section class="panel" style="margin-top:1rem"><h2>مهام الإنتاج</h2>' +
      (S.prod.items.length
        ? '<div class="list">' +
          S.prod.items
            .slice(-5)
            .reverse()
            .map(function (it) {
              return (
                '<div class="row"><div class="row__main"><div class="row__title">' + esc(it.unit) + " · " + it.type + "</div>" +
                '<div class="row__sub">' + esc((it.text || "").slice(0, 120)) + "…</div></div>" +
                '<span class="tiny muted">' + esc(it.date) + "</span></div>"
              );
            })
            .join("") +
          "</div>"
        : '<p class="small muted">لا مهام بعد. الإنتاج هو ما يحوّل المعرفة إلى مهارة.</p>') +
      "</section>"
    );
  }

  /* ------------------------------- عرض: اختبار ------------------------------- */
  var test = null;
  function viewTest() {
    if (!test) test = { i: 0, answers: [], done: false };
    if (!test.done) {
      var q = DATA.placement[test.i];
      return (
        '<div class="page-head"><div><span class="eyebrow">' + ico("clipboard") + " ١٨ سؤالاً · بلا مؤقت</span><h1>تحديد المستوى</h1>" +
        "<p>أسئلة متدرجة من A1 إلى C2. لا تخمّن: الخطأ هنا يفيدك أكثر من الصواب.</p></div>" +
        '<span class="chip">' + (test.i + 1) + " / " + DATA.placement.length + "</span></div>" +
        '<div class="progress" style="margin-bottom:1rem"><div class="progress__bar" style="width:' + Math.round((test.i / DATA.placement.length) * 100) + '%"></div></div>' +
        '<section class="panel"><div class="ex__q en" style="font-size:1.1rem">' + esc(q.q) + "</div>" +
        '<div class="ex__opts">' +
        q.o
          .map(function (o, j) {
            return '<button class="opt" data-act="test-answer" data-opt="' + j + '"><span class="opt__key">' + "ABCD"[j] + '</span><span class="en">' + esc(o) + "</span></button>";
          })
          .join("") +
        "</div></section>" +
        (S.placement ? '<p class="small muted" style="margin-top:1rem">نتيجتك السابقة: ' + S.placement.score + "/" + DATA.placement.length + " → " + S.placement.level + "</p>" : "")
      );
    }
    var score = test.answers.filter(function (a, i) {
      return a === DATA.placement[i].a;
    }).length;
    var lvl = recommendLevel(test.answers);
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("trophy") + " النتيجة</span><h1>" + score + " / " + DATA.placement.length + "</h1></div></div>" +
      '<section class="panel" style="text-align:center">' +
      '<p class="muted">المستوى المقترح للبداية</p>' +
      '<div class="level-hero__code" style="margin:.5rem 0">' + lvl + "</div>" +
      "<h2>" + esc(levelByCode(lvl).label) + "</h2>" +
      '<p class="small muted" style="max-width:52ch;margin:.5rem auto">' + esc(levelByCode(lvl).blurb) + "</p>" +
      '<div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">' +
      '<a class="btn btn--primary" href="#/level/' + lvl + '">ابدأ من ' + lvl + "</a>" +
      '<button class="btn" data-act="test-restart">أعد الاختبار</button></div>' +
      '<p class="tiny muted" style="margin-top:1rem">هذا تقدير تعليمي لا شهادة. الشهادات الرسمية تأتي من امتحانات معتمدة.</p>' +
      "</section>"
    );
  }

  function recommendLevel(answers) {
    var map = ["A1", "A2", "B1", "B2", "C1", "C2"];
    var right = {};
    DATA.placement.forEach(function (q, i) {
      if (answers[i] === q.a) right[q.lvl] = (right[q.lvl] || 0) + 1;
    });
    var best = "A1";
    map.forEach(function (l) {
      if ((right[l] || 0) >= 2) best = l;
    });
    return best;
  }

  /* ------------------------------- عرض: الدليل ------------------------------- */
  function viewGuide() {
    return (
      '<div class="page-head"><div><span class="eyebrow">' + ico("info") + " المنهج والمصادر</span><h1>الدليل</h1>" +
      "<p>لماذا هذا الترتيب؟ وما المؤكد وما التقديري؟ صفحة صريحة بدل شعارات تسويقية.</p></div></div>" +

      '<section class="panel"><h2>المبدأ</h2>' +
      '<p class="small">تعلّم اللغة ليس حفظ قوائم. أربع ركائز تعمل معاً: <strong>مدخل مفهوم</strong> (تسمع وتقرأ ما تفهم معظمه)، <strong>مراجعة متباعدة</strong> (تعود للكلمة قبل نسيانها)، <strong>إنتاج</strong> (تكتب وتتحدث فتكتشف الثغرات)، و<strong>تغذية راجعة</strong> (تعرف الخطأ فوراً).</p>' +
      '<p class="small">لذلك كل وحدة هنا ليست «درساً» بل دورة: مفردات ← قاعدة ← تمرين ← إنتاج. والمراجعة اليومية تعمل في الخلفية على ما سبق.</p></section>' +

      '<section class="panel"><h2>ما هو مؤكد</h2><ul class="small">' +
      "<li>إطار CEFR هو مرجع أوروبي رسمي بستة مستويات من A1 (مبتدئ) إلى C2 (إتقان).</li>" +
      "<li>أوصاف «يستطيع أن يفعل» في صفحة كل مستوى هي تلخيص لأوصاف الإطار، لا اجتهاد شخصي.</li>" +
      "<li>ربط المستويات بامتحانات كامبريدج ودرجات IELTS يتبع الجداول المنشورة من الجهات نفسها.</li>" +
      "<li>فروق النطق الثمانية مبنية على تقابل صوتي معروف بين العربية والإنجليزية.</li>" +
      "</ul></section>" +

      '<section class="panel"><h2>ما هو تقديري</h2><ul class="small">' +
      "<li>عدد الساعات وعدد الكلمات لكل مستوى: تقديرات إرشادية شائعة، تختلف بحسب الباحث والمتعلم. إطار CEFR نفسه لا يفرض ساعات ولا عدد كلمات.</li>" +
      "<li>ترتيب الوحدات داخل المستوى مقترح لا إلزامي.</li>" +
      "<li>«المستوى المقترح» من الاختبار تقدير تعليمي، وليس شهادة معتمدة.</li>" +
      "</ul></section>" +

      '<section class="panel"><h2>الجدول الكامل</h2>' +
      '<div class="words">' +
      DATA.levels
        .map(function (l) {
          return (
            '<div class="word" style="grid-template-columns:70px 1fr 1fr 1fr">' +
            '<span class="word__en">' + l.code + "</span>" +
            '<span class="word__ar">' + esc(l.hours) + "</span>" +
            '<span class="word__ar">' + esc(l.words) + "</span>" +
            '<span class="word__ar muted">IELTS ' + esc(l.ielts) + "</span></div>"
          );
        })
        .join("") +
      "</div></section>" +

      '<section class="panel"><h2>المصادر</h2><div class="list">' +
      DATA.sources
        .map(function (s) {
          return '<div class="row"><div class="row__main"><div class="row__title">' + esc(s.name) + '</div><div class="row__sub">' + esc(s.note) + "</div></div>" +
            '<a class="btn btn--sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">افتح</a></div>';
        })
        .join("") +
      "</div></section>" +

      '<section class="panel"><h2>أدوات موثوقة (مجانية)</h2>' +
      '<p class="small muted">هذه إضافات اختيارية، لا شروط. الموقع وحده يكفي لمسار منتظم.</p>' +
      '<div class="list">' +
      [
        ["Cambridge Dictionary", "تعريفات ومستوى الكلمة وأمثلة ونطق بريطاني وأمريكي.", "https://dictionary.cambridge.org/"],
        ["YouGlish", "اسمع الكلمة في سياقات حقيقية من فيديوهات، بلهجات مختلفة.", "https://youglish.com/"],
        ["BBC Learning English", "دروس قصيرة ومقاطع مصنّفة، مع نصوص للاستماع.", "https://www.bbc.co.uk/learningenglish/"],
        ["Anki", "مراجعة متباعدة عامة إن أردت بناء مجموعتك الخاصة؛ الموقع يغطي الأساس.", "https://apps.ankiweb.net/"]
      ]
        .map(function (t) {
          return '<div class="row"><div class="row__main"><div class="row__title">' + esc(t[0]) + '</div><div class="row__sub">' + esc(t[1]) + "</div></div>" +
            '<a class="btn btn--sm" href="' + esc(t[2]) + '" target="_blank" rel="noopener">افتح</a></div>';
        })
        .join("") +
      "</div></section>" +

      '<section class="panel"><h2>كيف تستخدمه في ١٨ دقيقة</h2><ol class="small">' +
      "<li>٤ دقائق مراجعة (البطاقات المستحقة).</li>" +
      "<li>٨ دقائق وحدة جديدة: اقرأ الكلمات بصوت مسموع، ثم القاعدة.</li>" +
      "<li>٤ دقائق تمارين، وأعد الخطأ فوراً.</li>" +
      "<li>٢ دقيقة إنتاج: جملة واحدة مكتوبة أو ٣٠ ثانية مسجّلة.</li>" +
      "</ol><p class=\"small muted\" style=\"margin-top:.75rem\">إن كان يومك مزدحماً: مراجعة فقط. السلسلة تُحفظ بالحد الأدنى، لا بالجلسة المثالية.</p></section>" +

      '<div class="foot"><span>سلّم · إصدار ١</span><span>يعمل بلا إنترنت بعد أول تحميل</span></div>'
    );
  }

  /* ------------------------------- الإعدادات ------------------------------- */
  function openSettings() {
    var s = S.settings;
    openDialog(
      '<h2 id="dlgTitle">الإعدادات</h2>' +
      '<p class="small muted">تُحفظ محلياً في متصفحك.</p>' +
      '<div style="display:grid;gap:1rem;margin-top:1rem">' +
      '<label class="small">هدف النقاط اليومي<input class="field" type="number" min="20" max="200" step="10" id="setGoal" value="' + s.dailyGoal + '" style="direction:ltr" /></label>' +
      '<label class="small">وقت التذكير اليومي<input class="field" type="time" id="setTime" value="' + esc(s.reminderTime) + '" style="direction:ltr" /></label>' +
      '<label class="small" style="display:flex;gap:.5rem;align-items:center"><input type="checkbox" id="setNotify"' + (s.notify ? " checked" : "") + " /> تفعيل إشعار المتصفح (يعمل والصفحة مفتوحة)</label>" +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap"><button class="btn btn--primary" data-act="save-settings">حفظ</button>' +
      '<button class="btn" data-act="ics">' + ico("download") + " تذكير في تقويمك (.ics)</button>" +
      '<button class="btn btn--ghost" data-close>إغلاق</button></div>' +
      "</div>"
    );
  }

  /* ------------------------------- ICS ------------------------------- */
  function downloadIcs() {
    var t = S.settings.reminderTime || "19:00";
    var hm = t.split(":");
    var now = new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hm[0], 10), parseInt(hm[1], 10));
    if (start < now) start.setDate(start.getDate() + 1);
    var pad = function (n) {
      return String(n).padStart(2, "0");
    };
    var dt =
      start.getFullYear() +
      pad(start.getMonth() + 1) +
      pad(start.getDate()) +
      "T" +
      pad(start.getHours()) +
      pad(start.getMinutes()) +
      "00";
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sullam//English Path//AR",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:sullam-" + Date.now() + "@local",
      "DTSTAMP:" + dt + "Z",
      "DTSTART:" + dt,
      "DURATION:PT18M",
      "RRULE:FREQ=DAILY",
      "SUMMARY:جلسة سلّم — ١٨ دقيقة إنجليزية",
      "DESCRIPTION:مراجعة البطاقات + وحدة + إنتاج. افتح التطبيق: sullam-english",
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    download("sullam-reminder.ics", lines.join("\r\n"), "text/calendar");
    toast("أضف الملف إلى تقويمك ليصلك التذكير يومياً.", "ok");
  }

  function download(name, text, type) {
    var blob = new Blob([text], { type: (type || "application/json") + ";charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
  }

  /* ------------------------------- التسجيل ------------------------------- */
  var rec = { mr: null, chunks: [], url: null, target: null, scope: null };
  function startRec(btn) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast("المتصفح لا يدعم التسجيل.", "warn");
      return;
    }
    var scope = (btn && btn.closest("section, .panel")) || document;
    var slot = scope.querySelector("[data-rec-slot], .rec-slot");
    if (!slot) {
      toast("تعذّر تجهيز مكان التسجيل.", "warn");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        rec.mr = new MediaRecorder(stream);
        rec.chunks = [];
        rec.target = slot;
        rec.scope = scope;
        rec.mr.ondataavailable = function (e) {
          if (e.data.size) rec.chunks.push(e.data);
        };
        rec.mr.onstop = function () {
          stream.getTracks().forEach(function (t) {
            t.stop();
          });
          var blob = new Blob(rec.chunks, { type: rec.mr.mimeType || "audio/webm" });
          rec.url = URL.createObjectURL(blob);
          var host = rec.target;
          if (host) {
            host.innerHTML =
              '<audio controls src="' + rec.url + '" style="height:34px;max-width:100%"></audio> ' +
              '<button class="btn btn--sm" data-act="save-speak">احفظ (+15)</button>';
          }
          toggleRecButtons(rec.scope, false);
          toast("انتهى التسجيل. استمع لنفسك وقارن بالنموذج.", "ok");
        };
        rec.mr.start();
        toggleRecButtons(scope, true);
        toast("بدأ التسجيل — تحدّث بوضوح ٣٠ ثانية.", "ok");
      })
      .catch(function () {
        toast("لم يُسمح باستخدام الميكروفون.", "warn");
      });
  }
  function toggleRecButtons(scope, recording) {
    var root = scope || document;
    $$("[data-act='record-start']", root).forEach(function (b) {
      b.hidden = !!recording;
    });
    $$("[data-act='record-stop']", root).forEach(function (b) {
      b.hidden = !recording;
    });
  }
  function stopRec() {
    if (rec.mr && rec.mr.state !== "inactive") rec.mr.stop();
  }

  /* ------------------------------- التمارين ------------------------------- */
  function getEx(unitId, i) {
    var u = unitById(unitId);
    return u.exercises[i];
  }
  function unitIdFromView() {
    var p = parseHash();
    return p.route === "unit" ? p.args[0] : null;
  }

  function feedback(el, ok, text) {
    var host = el.closest(".ex") || el.parentElement;
    var fb = host ? host.querySelector(".fb") : null;
    if (!fb) return;
    fb.className = "fb feedback " + (ok ? "feedback--ok" : "feedback--bad");
    fb.innerHTML = (ok ? "صحيح. " : "ليس بعد. ") + esc(text || "");
    fb.setAttribute("role", "status");
  }

  function answered(i, ok) {
    exState[i] = { ok: ok };
    updateUnitProgress();
  }

  function updateUnitProgress() {
    var uid = unitIdFromView();
    if (!uid) return;
    var u = unitById(uid);
    var n = Object.keys(exState).length;
    var right = Object.keys(exState).filter(function (k) {
      return exState[k].ok;
    }).length;
    var host = $("#exResult");
    if (!host) return;
    if (n < u.exercises.length) {
      host.innerHTML = '<p class="tiny muted" style="margin-top:.75rem">أجبت ' + n + " من " + u.exercises.length + " · صحيحة " + right + "</p>";
      return;
    }
    var done = S.units[u.id] && S.units[u.id].done;
    host.innerHTML =
      '<section class="panel" style="margin-top:1rem;text-align:center">' +
      "<h2>" + right + " / " + u.exercises.length + "</h2>" +
      '<p class="small muted">' + (right === u.exercises.length ? "كل الإجابات صحيحة." : "راجع الأخطاء أعلاه قبل الإنهاء — الخطأ المفهوم أفضل من الصواب بالحظ.") + "</p>" +
      (done
        ? '<span class="chip chip--ok">' + ico("check") + " الوحدة مكتملة</span>"
        : '<button class="btn btn--primary" data-act="finish-unit" data-id="' + u.id + '">أنهِ الوحدة (+20)</button>') +
      "</section>";
  }

  function buildOrderAnswer(i) {
    var host = $('[data-built="' + i + '"]');
    return host ? $$(".token", host).map(function (b) { return b.textContent; }).join(" ") : "";
  }

  function checkOrder(i) {
    var ex = getEx(unitIdFromView(), i);
    var built = buildOrderAnswer(i);
    var ok = normalize(built) === normalize(ex.target);
    var btn = $('[data-act="check-order"][data-ex="' + i + '"]');
    feedback(btn, ok, ok ? ex.ar : "الصحيح: " + ex.target);
    if (ok) addXp(4, true);
    else addXp(1, false);
    answered(i, ok);
  }

  /* ------------------------------- التوجيه ------------------------------- */
  function render() {
    var p = parseHash();
    setActiveNav(p.route);
    var html = "";
    if (p.route === "home") html = viewHome();
    else if (p.route === "path") html = viewPath();
    else if (p.route === "vocab") html = viewVocab();
    else if (p.route === "level") html = viewLevel(p.args[0]);
    else if (p.route === "unit") html = viewUnit(p.args[0]);
    else if (p.route === "review") html = viewReview();
    else if (p.route === "sounds") html = viewSounds();
    else if (p.route === "progress") html = viewProgress();
    else if (p.route === "guide") html = viewGuide();
    else if (p.route === "test") html = viewTest();
    else html = viewHome();

    $("#view").innerHTML = html;
    paintLadder();
    paintHud();
    if (p.route === "unit") updateUnitProgress();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* ------------------------------- الأحداث ------------------------------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");
    var uid = unitIdFromView();

    if (act === "say") {
      say(el.getAttribute("data-text"));
      return;
    }
    if (act === "say-all") {
      var u = unitById(uid);
      if (!u) return;
      u.words.forEach(function (w, idx) {
        setTimeout(function () {
          say(w.en);
        }, idx * 900);
      });
      return;
    }
    if (act === "say-pairs") {
      var s = DATA.sounds.filter(function (x) {
        return x.id === el.getAttribute("data-id");
      })[0];
      if (!s) return;
      var seq = [];
      s.pairs.forEach(function (p) {
        seq.push(p[0], p[1]);
      });
      seq.forEach(function (t, idx) {
        setTimeout(function () {
          say(t);
        }, idx * 1000);
      });
      return;
    }

    if (act === "answer") {
      var i = parseInt(el.getAttribute("data-ex"), 10);
      var opt = parseInt(el.getAttribute("data-opt"), 10);
      var ex = getEx(uid, i);
      var ok = opt === ex.a;
      var box = el.closest(".ex");
      $$(".opt", box).forEach(function (b, j) {
        b.disabled = true;
        if (j === ex.a) b.classList.add("is-correct");
        else if (j === opt) b.classList.add("is-wrong");
      });
      feedback(el, ok, ok ? ex.why : "الصحيح: " + ex.o[ex.a] + " — " + ex.why);
      addXp(ok ? 4 : 1, ok);
      answered(i, ok);
      return;
    }

    if (act === "check-input") {
      var ci = parseInt(el.getAttribute("data-ex"), 10);
      var cex = getEx(uid, ci);
      var input = $('[data-input="' + ci + '"]');
      var val = normalize(input.value);
      var accepted = cex.a.map(normalize);
      var isOk = accepted.indexOf(val) !== -1;
      feedback(input, isOk, isOk ? cex.why : "حاول مرة أخرى. تلميح: " + cex.why);
      if (!input.getAttribute("data-tried")) {
        input.setAttribute("data-tried", "1");
        addXp(isOk ? 4 : 1, isOk);
      } else if (isOk) {
        addXp(2, true);
      }
      if (isOk) {
        input.disabled = true;
        el.disabled = true;
        answered(ci, true);
      } else {
        answered(ci, false);
      }
      return;
    }

    if (act === "token") {
      var ti = parseInt(el.getAttribute("data-ex"), 10);
      var built = $('[data-built="' + ti + '"]');
      built.appendChild(el);
      el.setAttribute("data-act", "token-remove");
      return;
    }
    if (act === "token-remove") {
      var ri = parseInt(el.getAttribute("data-ex"), 10);
      var pool = $('[data-pool="' + ri + '"]');
      pool.appendChild(el);
      el.setAttribute("data-act", "token");
      return;
    }
    if (act === "clear-order") {
      var qi = parseInt(el.getAttribute("data-ex"), 10);
      var b2 = $('[data-built="' + qi + '"]');
      var pool2 = $('[data-pool="' + qi + '"]');
      $$(".token", b2).forEach(function (t) {
        t.setAttribute("data-act", "token");
        pool2.appendChild(t);
      });
      return;
    }
    if (act === "check-order") {
      checkOrder(parseInt(el.getAttribute("data-ex"), 10));
      return;
    }

    if (act === "finish-unit") {
      var fid = el.getAttribute("data-id");
      var fu = unitById(fid);
      if (!fu) return;
      var right = Object.keys(exState).filter(function (k) {
        return exState[k] && exState[k].ok;
      }).length;
      S.units[fid] = { done: true, score: right, total: fu.exercises.length, date: todayKey() };
      addXp(20, true);
      grant("unit-1");
      checkBadges();
      save();
      toast("أنهيت الوحدة: " + fu.title, "ok");
      render();
      return;
    }

    if (act === "reset-unit") {
      exState = {};
      render();
      return;
    }

    if (act === "save-write") {
      var text = ($("#prodText") || {}).value || "";
      var words = normalize(text).split(" ").filter(Boolean).length;
      if (words < 8) {
        toast("اكتب ٨ كلمات على الأقل لتُحسب المهمة.", "warn");
        return;
      }
      S.prod.writes += 1;
      S.prod.items.push({ type: "كتابة", text: text.slice(0, 600), date: todayKey(), unit: el.getAttribute("data-unit") });
      addXp(15, true);
      grant("writing-5");
      save();
      toast("حُفظت المهمة (+15).", "ok");
      el.disabled = true;
      el.textContent = "محفوظة";
      return;
    }

    if (act === "save-speak") {
      S.prod.speaks += 1;
      S.prod.items.push({ type: "تسجيل", text: "تسجيل صوتي محلي", date: todayKey(), unit: uid || "نطق" });
      addXp(15, true);
      grant("speaking-5");
      save();
      toast("حُسب التسجيل (+15).", "ok");
      el.disabled = true;
      el.textContent = "محفوظ";
      return;
    }

    if (act === "record-start") {
      startRec(el);
      return;
    }
    if (act === "record-stop") {
      stopRec();
      return;
    }

    if (act === "flip") {
      review.flipped = !review.flipped;
      render();
      return;
    }
    if (act === "rate") {
      var q = parseInt(el.getAttribute("data-q"), 10);
      var cw = review.list[review.i];
      if (cw) rateWord(wordKey(cw), q);
      review.i += 1;
      review.flipped = false;
      render();
      return;
    }
    if (act === "review-extra") {
      var all = Object.keys(S.words).map(function (k) {
        return S.words[k];
      });
      review = { list: shuffle(all).slice(0, 10), i: 0, mode: "extra", flipped: false, right: 0 };
      render();
      return;
    }

    if (act === "add-word") {
      var aen = el.getAttribute("data-en");
      var aar = el.getAttribute("data-ar");
      var aipa = el.getAttribute("data-ipa");
      var alvl = el.getAttribute("data-level");
      if (addVocabWord(aen, aar, aipa, alvl)) {
        save();
        el.textContent = "في المراجعة";
        el.disabled = true;
        el.classList.add("btn--ghost");
        toast("أُضيفت «" + aen + "» إلى المراجعة.", "ok");
      } else {
        el.textContent = "في المراجعة";
        el.disabled = true;
      }
      return;
    }
    if (act === "add-level") {
      var lvAdd = el.getAttribute("data-level");
      var added = 0;
      DATA.vocab.forEach(function (v) {
        if (v[4] === lvAdd && addVocabWord(v[0], v[1], v[2], lvAdd)) added += 1;
      });
      save();
      if (added) toast("أُضيفت " + added + " كلمة من " + lvAdd + " إلى المراجعة.", "ok");
      else toast("كل كلمات " + lvAdd + " موجودة في المراجعة بالفعل.", "warn");
      render();
      return;
    }

    if (act === "settings") {
      openSettings();
      return;
    }
    if (act === "save-settings") {
      var g = parseInt(($("#setGoal") || {}).value, 10);
      S.settings.dailyGoal = isNaN(g) ? 60 : clamp(g, 20, 200);
      S.settings.reminderTime = ($("#setTime") || {}).value || "19:00";
      var wantNotify = ($("#setNotify") || {}).checked;
      if (wantNotify && "Notification" in window) {
        Notification.requestPermission().then(function (perm) {
          S.settings.notify = perm === "granted";
          save();
          toast(S.settings.notify ? "الإشعارات مفعّلة." : "لم يُسمح بالإشعارات. استخدم ملف التقويم بدلاً منها.", S.settings.notify ? "ok" : "warn");
          closeDialog();
          render();
        });
        return;
      }
      S.settings.notify = false;
      save();
      closeDialog();
      toast("حُفظت الإعدادات.", "ok");
      render();
      return;
    }
    if (act === "ics") {
      downloadIcs();
      return;
    }

    if (act === "export") {
      download("sullam-progress-" + todayKey() + ".json", JSON.stringify(S, null, 2));
      toast("صُدّر ملف التقدم.", "ok");
      return;
    }
    if (act === "reset") {
      confirmDialog();
      return;
    }
    if (act === "reset-confirm") {
      localStorage.removeItem(KEY);
      S = load();
      closeDialog();
      render();
      toast("حُذفت البيانات. بداية جديدة.", "ok");
      return;
    }

    if (act === "test-answer") {
      var ti2 = parseInt(el.getAttribute("data-opt"), 10);
      test.answers[test.i] = ti2;
      test.i += 1;
      if (test.i >= DATA.placement.length) {
        test.done = true;
        var score = test.answers.filter(function (a, idx) {
          return a === DATA.placement[idx].a;
        }).length;
        var lvl = recommendLevel(test.answers);
        S.placement = { score: score, level: lvl, date: todayKey() };
        S.current = lvl;
        save();
        addXp(10, true);
      }
      render();
      return;
    }
    if (act === "test-restart") {
      test = { i: 0, answers: [], done: false };
      render();
      return;
    }
  });

  // تصفية بنك المفردات
  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "vocabSearch") filterVocab();
  });
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "vocabLevel") filterVocab();
  });

  // استيراد
  document.addEventListener("change", function (e) {
    var input = e.target;
    if (input.getAttribute("data-act") !== "import") return;
    var file = input.files && input.files[0];
    if (!file) return;
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var parsed = JSON.parse(String(fr.result));
        if (!parsed || typeof parsed !== "object" || !parsed.days) throw new Error("bad");
        localStorage.setItem(KEY, JSON.stringify(parsed));
        S = load();
        render();
        toast("استُورد التقدم بنجاح.", "ok");
      } catch (err) {
        toast("الملف غير صالح.", "warn");
      }
    };
    fr.readAsText(file);
  });

  function confirmDialog() {
    openDialog(
      '<h2 id="dlgTitle">حذف كل البيانات؟</h2>' +
      '<p class="small muted">سيُحذف التقدم والكلمات والشارات نهائياً من هذا المتصفح. صدّر نسخة أولاً إن أردت.</p>' +
      '<div style="display:flex;gap:.5rem;margin-top:1rem">' +
      '<button class="btn" style="color:var(--danger);border-color:var(--danger)" data-act="reset-confirm">نعم، احذف</button>' +
      '<button class="btn" data-close>إلغاء</button></div>'
    );
  }

  // لوحة المفاتيح: مسافة تقلب البطاقة
  document.addEventListener("keydown", function (e) {
    if (e.code !== "Space") return;
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (parseHash().route !== "review" || !review) return;
    e.preventDefault();
    if (!review.flipped) {
      review.flipped = true;
      render();
    }
  });

  // الوضع الليلي
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var isDark = t === "dark";
    $$("#themeToggle, #themeToggleTop").forEach(function (b) {
      var u = b.querySelector("use");
      if (u) u.setAttribute("href", isDark ? "#i-sun" : "#i-moon");
      var span = b.querySelector("span");
      if (span) span.textContent = isDark ? "الوضع النهاري" : "الوضع الليلي";
    });
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    S.theme = cur;
    save();
    applyTheme(cur);
  }
  $$("#themeToggle, #themeToggleTop").forEach(function (b) {
    b.addEventListener("click", toggleTheme);
  });

  // التذكير
  function checkReminder() {
    if (!S.settings.notify || !("Notification" in window) || Notification.permission !== "granted") return;
    var now = new Date();
    var hm = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    if (hm !== S.settings.reminderTime) return;
    var dk = todayKey();
    var d = S.days[dk];
    if (S.lastStudy === dk && d && d.xp >= S.settings.dailyGoal) return;
    if (sessionStorage.getItem("sullam-notified") === dk) return;
    sessionStorage.setItem("sullam-notified", dk);
    try {
      new Notification("سلّم — ١٨ دقيقة", {
        body: "مراجعة قصيرة + وحدة واحدة. لا تكسر السلسلة.",
        lang: "ar"
      });
    } catch (e) {}
  }
  setInterval(checkReminder, 30000);

  // التشغيل
  var savedTheme = S.theme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);
  window.addEventListener("hashchange", render);

  if (!location.hash) location.replace("#/home");
  render();
  paintLadder();

  // تسجيل Service Worker فقط عبر http(s)
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
