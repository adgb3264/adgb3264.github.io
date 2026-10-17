/* ============================================================
   A.D.G.B — comportamiento del sitio
   - Idiomas ES / EN / 中文 (el español vive en el HTML; el inglés y el chino aquí)
   - Una página por ruta, con cortina roja al pasar de una a otra
   - Fondo animado de esferas y cuadros (canvas), con los colores del CSS
   - Pantalla de carga, revelado al hacer scroll, menú móvil, halo de luz del cursor
   - Botón de sonido de clics (activable / desactivable)
   - Botón de modo oscuro / claro (se recuerda la elección)
   - La A grande (y las otras letras) reaccionan al ratón y al dedo
   - Capa avanzada: cursor (punto + aro redondo), foco en tarjetas, magnetismo, onda con chispas al hacer clic y parallax de la portada
   ============================================================ */

(function () {
  "use strict";

  var d = document;
  var html = d.documentElement;
  var body = d.body;
  var PAGE = html.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Traducciones al inglés ---------- */
  var EN = {
    "t.home": "A.D.G.B — Independent developer",
    "d.home": "A.D.G.B is an independent developer just getting started.",
    "t.projects": "Projects — A.D.G.B",
    "d.projects": "My projects will live here. Nothing published yet.",
    "t.more": "More — A.D.G.B",
    "d.more": "Find A.D.G.B on social media.",
    "t.404": "404 — A.D.G.B",
    "d.404": "This page doesn't exist.",

    "skip": "Skip to content",
    "nav.home": "Home", "nav.projects": "Projects", "nav.more": "More",

    "hero.eyebrow": "Independent developer",
    "hero.sub": "Hi, I'm A.D.G.B. I'm taking my first steps in programming.",
    "hero.btn1": "See projects", "hero.btn2": "More",
    "hero.meta1": "First steps", "hero.scroll": "Scroll",

    "about.eyebrow": "01 / About me",
    "about.title": "I'm just starting, but I'm already building.",
    "about.text1": "I'm a small developer and I'm just getting started. I learn by building and practicing a little every day.",
    "rule.title": "Everything starts with an A",
    "rule.text": "Everything I make begins with a red A. It's my signature.",

    "cta.title": "Want to follow the progress?",
    "cta.text": "Follow me on GitHub and tell me what you think.",
    "cta.btn": "View GitHub",

    "prj.title": "My projects",
    "prj.lead": "Nothing is published yet. Come back soon.",
    "prj.soon.title": "Coming soon",
    "prj.soon.text": "I'm preparing something new. When it's ready, you'll find it here.",
    "prj.back": "Back to home",

    "mas.title": "My socials",
    "mas.lead": "Find me here. Follow me and send me your suggestions.",
    "mas.ghdesc": "My code and progress.",
    "mas.soonlabel": "Coming soon",
    "mas.soon": "More networks",

    "e404.text": "This page doesn't exist. Let's head back home.",
    "e404.btn": "Back to home",

    "ft.blurb": "Independent developer.",
    "ft.pages": "Pages",
    "ft.social": "Social",
    "ft.made": "Handmade.",

    "snd.on": "Sound: on",
    "snd.off": "Sound: off",
    "thm.toLight": "Switch to light mode",
    "thm.toDark": "Switch to dark mode"
  };

  /* ---------- Traducciones al chino mandarín (simplificado) ---------- */
  var ZH = {
    "t.home": "A.D.G.B — 独立开发者",
    "d.home": "A.D.G.B 是一位刚刚起步的独立开发者。",
    "t.projects": "项目 — A.D.G.B",
    "d.projects": "我的项目会放在这里。目前还没有发布任何内容。",
    "t.more": "更多 — A.D.G.B",
    "d.more": "在社交平台上找到 A.D.G.B。",
    "t.404": "404 — A.D.G.B",
    "d.404": "这个页面不存在。",

    "skip": "跳到内容",
    "nav.home": "首页", "nav.projects": "项目", "nav.more": "更多",

    "hero.eyebrow": "独立开发者",
    "hero.sub": "你好，我是 A.D.G.B。我正在迈出编程的第一步。",
    "hero.btn1": "查看项目", "hero.btn2": "更多",
    "hero.meta1": "迈出第一步", "hero.scroll": "向下滑动",

    "about.eyebrow": "01 / 关于我",
    "about.title": "我才刚刚起步，但已经在动手创造。",
    "about.text1": "我是一名小小程序员，刚刚入行。我在动手创作和每天的练习中学习。",
    "rule.title": "一切都从字母 A 开始",
    "rule.text": "我做的一切都以一个红色的 A 开头，这是我的标志。",

    "cta.title": "想关注项目进展吗？",
    "cta.text": "在 GitHub 上关注我，告诉我你的想法。",
    "cta.btn": "查看 GitHub",

    "prj.title": "我的项目",
    "prj.lead": "目前还没有发布任何内容，欢迎稍后再来。",
    "prj.soon.title": "即将推出",
    "prj.soon.text": "我正在准备新的东西，等它准备好，你会在这里看到。",
    "prj.back": "返回首页",

    "mas.title": "我的社交账号",
    "mas.lead": "你可以在这里找到我。关注我，也欢迎给我提建议。",
    "mas.ghdesc": "我的代码与进展。",
    "mas.soonlabel": "即将推出",
    "mas.soon": "更多平台",

    "e404.text": "这个页面不存在。我们回到首页吧。",
    "e404.btn": "返回首页",

    "ft.blurb": "独立开发者。",
    "ft.pages": "页面",
    "ft.social": "社交",
    "ft.made": "手工打造。",

    "snd.on": "声音：开",
    "snd.off": "声音：关",
    "thm.toLight": "切换到浅色模式",
    "thm.toDark": "切换到深色模式"
  };

  /* ---------- Idioma ---------- */
  var STORE_KEY = "adgb-lang";
  var translatable = [].slice.call(d.querySelectorAll("[data-i18n]"));
  var metaDesc = d.querySelector('meta[name="description"]');
  var ogTitle = d.querySelector('meta[property="og:title"]');
  var ogDesc = d.querySelector('meta[property="og:description"]');

  // El español original se guarda desde el HTML
  var ES = {};
  var esTitle = d.title;
  var esDesc = metaDesc ? metaDesc.getAttribute("content") : "";
  translatable.forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in ES)) ES[k] = el.innerHTML;
  });

  // Textos que no están en el HTML (etiquetas del botón de sonido)
  ES["snd.on"] = "Sonido: activado";
  ES["snd.off"] = "Sonido: desactivado";
  ES["thm.toLight"] = "Cambiar a modo claro";
  ES["thm.toDark"] = "Cambiar a modo oscuro";

  var DICTS = { es: ES, en: EN, zh: ZH };
  var currentLang = "es";

  function readStoredLang() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function storeLang(l) { try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* sin almacenamiento */ } }

  function applyLang(lang) {
    currentLang = lang;
    var dict = DICTS[lang] || ES;

    translatable.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });

    html.lang = lang === "zh" ? "zh-CN" : lang;
    d.title = lang === "es" ? esTitle : (dict["t." + PAGE] || esTitle);
    var desc = lang === "es" ? esDesc : (dict["d." + PAGE] || esDesc);
    if (metaDesc) metaDesc.setAttribute("content", desc);
    if (ogTitle) ogTitle.setAttribute("content", d.title);
    if (ogDesc) ogDesc.setAttribute("content", desc);

    [].forEach.call(d.querySelectorAll(".lang__btn"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    updateSoundUI();
    updateThemeUI();
  }

  function setLang(lang) {
    if (lang === currentLang) return;
    storeLang(lang);
    if (reduceMotion) { applyLang(lang); return; }
    body.classList.add("lang-switching");
    setTimeout(function () {
      applyLang(lang);
      body.classList.remove("lang-switching");
    }, 260);
  }

  [].forEach.call(d.querySelectorAll(".lang__btn"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ---------- Enlaces antiguos (#proyectos, #mas) -> páginas nuevas ---------- */
  if (PAGE === "home" && location.hash) {
    var LEGACY = { proyectos: "projects/", mas: "more/" };
    var legacyKey = "";
    try { legacyKey = decodeURIComponent(location.hash.slice(1)).toLowerCase(); } catch (e) { legacyKey = ""; }
    if (LEGACY[legacyKey]) { location.replace(LEGACY[legacyKey]); return; }
  }

  /* ---------- Cortina roja entre páginas ---------- */
  var wipe = d.getElementById("wipe");
  var leaving = false;
  var EASE = "cubic-bezier(.7,0,.2,1)";

  function resetWipe() {
    if (wipe) {
      if (wipe.getAnimations) wipe.getAnimations().forEach(function (a) { a.cancel(); });
      wipe.style.display = "none";
    }
    html.classList.remove("is-arriving");
    leaving = false;
    try { sessionStorage.removeItem("adgb-wipe"); } catch (e) { /* sin almacenamiento */ }
  }

  function leave(href) {
    if (leaving) return;
    leaving = true;
    try { sessionStorage.setItem("adgb-wipe", "1"); } catch (e) { /* sin almacenamiento */ }
    var navigated = false;
    function navigate() { if (navigated) return; navigated = true; location.href = href; }
    if (reduceMotion || !wipe || !wipe.animate) { navigate(); return; }
    wipe.style.display = "flex";
    var anim = wipe.animate(
      [{ transform: "translateX(-101%)" }, { transform: "translateX(0)" }],
      { duration: 420, easing: EASE, fill: "forwards" }
    );
    anim.onfinish = navigate;
    setTimeout(navigate, 1000); // por si la animación no termina
  }

  // Al llegar desde otra página, la cortina ya cubre la pantalla y se retira
  var arriving = html.classList.contains("is-arriving");
  if (arriving) {
    try { sessionStorage.removeItem("adgb-wipe"); } catch (e) { /* sin almacenamiento */ }
    if (reduceMotion || !wipe || !wipe.animate) {
      resetWipe();
    } else {
      setTimeout(function () {
        var out = wipe.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(101%)" }],
          { duration: 480, easing: EASE, fill: "forwards" }
        );
        out.onfinish = resetWipe;
      }, 80);
    }
  }

  // Si el navegador restaura la página desde la memoria (botón "atrás"), se limpia la cortina
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) resetWipe();
  });

  // Todos los enlaces internos pasan por la cortina
  d.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

    if (a.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }

    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;

    if (url.pathname === location.pathname && url.search === location.search) {
      if (url.hash) return; // salto a un ancla dentro de la misma página
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    e.preventDefault();
    leave(url.href);
  });

  /* ---------- Pantalla de carga ---------- */
  var loader = d.getElementById("loader");
  var revealed = false;
  var skipLoader = html.classList.contains("skip-loader") || arriving || !loader;

  function finishLoading() {
    if (revealed) return;
    revealed = true;
    if (loader) loader.classList.add("is-done");
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    try { sessionStorage.setItem("adgb-seen", "1"); } catch (e) { /* sin almacenamiento */ }
  }

  if (arriving) {
    // Los textos empiezan a aparecer justo cuando la cortina se retira
    setTimeout(finishLoading, reduceMotion ? 0 : 140);
  } else if (skipLoader) {
    finishLoading();
  } else {
    body.classList.add("is-loading");
    var minWait = new Promise(function (res) { setTimeout(res, reduceMotion ? 0 : 1300); });
    var pageLoaded = new Promise(function (res) {
      if (d.readyState === "complete") res(); else window.addEventListener("load", res);
    });
    Promise.all([minWait, pageLoaded]).then(finishLoading);
    setTimeout(finishLoading, 3500); // por si algo tarda de más
  }

  /* ---------- Idioma inicial ---------- */
  var saved = readStoredLang();
  var navLang = (navigator.language || "es").toLowerCase();
  var initial = (saved && Object.prototype.hasOwnProperty.call(DICTS, saved)) ? saved
    : (navLang.indexOf("zh") === 0 ? "zh" : (navLang.indexOf("en") === 0 ? "en" : "es"));

  /* ---------- Barra de progreso ---------- */
  var progress = d.getElementById("progress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = d.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Revelado al hacer scroll ---------- */
  var revealEls = [].slice.call(d.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Menú móvil ---------- */
  var burger = d.getElementById("burger");
  var nav = d.getElementById("nav");
  var navLinks = [].slice.call(d.querySelectorAll(".nav a"));

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.forEach(function (a) { a.addEventListener("click", closeMenu); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    // En el celular: tocar fuera del menú lo cierra
    d.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
  }

  /* ---------- Cursor luminoso ---------- */
  var glow = d.getElementById("cursorGlow");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (finePointer && !reduceMotion && glow) {
    var tx = 0, ty = 0, cx = 0, cy = 0, moving = false;

    var follow = function () {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(follow);
      else moving = false;
    };

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add("is-on");
      if (!moving) { moving = true; requestAnimationFrame(follow); }
    });
    d.addEventListener("mouseleave", function () { glow.classList.remove("is-on"); });
  }

  /* ============================================================
     Fondo animado: esferas que rebotan, cuadros flotando y una
     cuadrícula que se enciende al paso de las esferas y del cursor.
     Los colores salen del CSS (--red), así que cambian con la marca.
     ============================================================ */

  function parseHex(str, fallback) {
    var m = /^#?([0-9a-f]{6})$/i.exec((str || "").trim());
    if (!m) return fallback;
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
  }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

  // Escala de la interfaz: 1 en celular (100 %), 0.75 en PC. Sale del tamaño de letra raíz del CSS,
  // así el fondo animado (esferas, cuadros, cuadrícula) crece y se achica junto con el resto del sitio.
  var UI = 1;
  function readUI() {
    var fs = 16;
    try { fs = parseFloat(getComputedStyle(html).fontSize) || 16; } catch (e) { fs = 16; }
    UI = fs / 16;
  }
  readUI();

  var cssRed = "";
  try { cssRed = getComputedStyle(html).getPropertyValue("--red"); } catch (e) { cssRed = ""; }
  var RED = parseHex(cssRed, [225, 6, 0]);
  var RED_HI = mix(RED, [255, 72, 52], 0.85);   // brillo de las esferas: rojo más vivo, nunca rosado
  var RED_DEEP_DARK = mix(RED, [0, 0, 0], 0.72);    // borde de las esferas sobre fondo negro
  var RED_DEEP_LIGHT = mix(RED, [0, 0, 0], 0.18);   // sobre fondo blanco: sigue siendo rojo, nunca casi negro
  var RED_DEEP = RED_DEEP_DARK, INK_K = 1;
  var WHITE = [255, 255, 255];

  // Color de las líneas neutras del fondo (cuadrícula, contornos): blanco tenue en oscuro, negro tenue en claro
  var INK = [255, 255, 255];
  function readInk() {
    var v = "";
    try { v = getComputedStyle(html).getPropertyValue("--ink"); } catch (e) { v = ""; }
    var m = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(v || "");
    INK = m ? [+m[1], +m[2], +m[3]] : [255, 255, 255];
    var inverted = INK[0] < 128;                       // modo invertido (fondo blanco)
    RED_DEEP = inverted ? RED_DEEP_LIGHT : RED_DEEP_DARK;
    INK_K = inverted ? 0.5 : 1;                        // cuadros grises más suaves sobre blanco
  }
  readInk();
  d.addEventListener("adgb:theme", readInk);   // se registra antes que las escenas, así ellas ya ven el color nuevo

  function Scene(canvas) {
    var host = canvas.parentNode;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var soft = canvas.getAttribute("data-scene") === "soft";
    var inten = soft ? 0.6 : 1;           // intensidad general (más suave en páginas internas)
    var TAU = Math.PI * 2;

    var W = 0, H = 0, dpr = 1, cell = 64, cols = 0, rows = 0;
    var heat = new Float32Array(0);
    var spheres = [], squares = [], gridLayer = null, cellSprite = null, cellPad = 0;
    var mouse = { x: -9999, y: -9999, on: false }, mglow = 0;
    var running = false, onScreen = true, last = 0, raf = 0, clock = 0;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function build() {
      var k = Math.min(2.1, Math.max(0.55, (W * H) / (1280 * 760 * UI * UI)));
      var small = W < 600;
      var nS = Math.round((soft ? 8 : 15) * k * (small ? 0.75 : 1));
      var nQ = Math.round((soft ? 10 : 20) * k * (small ? 0.75 : 1));
      var rScale = (small ? 0.7 : 1) * UI;
      var i;

      spheres = [];
      for (i = 0; i < nS; i++) {
        var r = (8 + Math.pow(Math.random(), 2.2) * (soft ? 60 : 90)) * rScale;
        var vx = rnd(-0.3, 0.3) * UI, vy = rnd(-0.24, 0.24) * UI;
        spheres.push({                     // todas las esferas son bolas rojas rellenas
          x: rnd(0, W), y: rnd(0, H), r: r,
          vx: vx, vy: vy, bx: vx, by: vy,
          ph: rnd(0, TAU), a: rnd(0.8, 0.98) * (soft ? 0.9 : 1)
        });
      }

      squares = [];
      for (i = 0; i < nQ; i++) {
        var s = (10 + Math.pow(Math.random(), 1.8) * 90) * rScale;
        squares.push({
          x: rnd(0, W), y: rnd(0, H), s: s,
          rot: rnd(0, TAU), vr: rnd(-0.004, 0.004),
          vx: rnd(-0.18, 0.18) * UI, vy: rnd(-0.3, -0.04) * UI,
          fill: Math.random() < 0.45, red: Math.random() < 0.5
        });
      }
    }

    function resize() {
      var r = host.getBoundingClientRect();
      var w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
      var widthChanged = Math.abs(w - W) > 1;
      var heightChanged = Math.abs(h - H) > 80;
      readUI();
      dpr = Math.min(window.devicePixelRatio || 1, 2);   // pantalla nítida: hasta 2x también en celulares
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = w; H = h;
      cell = (W < 600 ? 44 : 64) * UI;
      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(H / cell) + 1;
      heat = new Float32Array(cols * rows);
      buildGrid();
      buildSprite();
      if (!spheres.length || widthChanged || heightChanged) build();
      if (reduceMotion || !running) { step(0.016); draw(); }
    }

    // Cuadrícula difuminada: trazo ancho y tenue + trazo fino, y se desvanece hacia los bordes
    // (se dibuja una sola vez en una capa aparte y se vuelve a hacer al cambiar de tema)
    function buildGrid() {
      gridLayer = d.createElement("canvas");
      gridLayer.width = canvas.width; gridLayer.height = canvas.height;
      var g = gridLayer.getContext("2d");
      if (!g) { gridLayer = null; return; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      var c, r;
      g.beginPath();
      for (c = 0; c <= cols; c++) { g.moveTo(c * cell + 0.5, 0); g.lineTo(c * cell + 0.5, H); }
      for (r = 0; r <= rows; r++) { g.moveTo(0, r * cell + 0.5); g.lineTo(W, r * cell + 0.5); }
      g.lineWidth = 6; g.strokeStyle = rgba(INK, 0.016); g.stroke();
      g.lineWidth = 3; g.strokeStyle = rgba(INK, 0.024); g.stroke();
      g.lineWidth = 1; g.strokeStyle = rgba(INK, 0.04); g.stroke();
      g.globalCompositeOperation = "destination-in";
      var fade = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.72);
      fade.addColorStop(0, "rgba(0,0,0,1)");
      fade.addColorStop(1, "rgba(0,0,0,0.15)");
      g.fillStyle = fade; g.fillRect(0, 0, W, H);
    }

    // Casilla encendida con el borde desenfocado: se dibuja una vez y se reutiliza en cada casilla
    function buildSprite() {
      cellPad = Math.round(cell * 0.5);
      var size = cell + cellPad * 2;
      cellSprite = d.createElement("canvas");
      cellSprite.width = Math.round(size * dpr); cellSprite.height = Math.round(size * dpr);
      var g = cellSprite.getContext("2d");
      if (!g) { cellSprite = null; return; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Solo se dibuja la sombra del cuadro (el cuadro queda fuera del lienzo): borde 100 % difuminado
      var off = size + 40;
      g.shadowColor = rgba(RED, 0.62);
      g.shadowBlur = cell * 0.42 * dpr;
      g.shadowOffsetX = off * dpr;
      g.fillStyle = "#000";
      g.fillRect(cellPad + 6 - off, cellPad + 6, cell - 12, cell - 12);
    }

    // Enciende las casillas dentro de un radio (la fuerza baja hacia el borde)
    function lit(cx0, cy0, rad, power) {
      var c0 = Math.max(0, Math.floor((cx0 - rad) / cell)), c1 = Math.min(cols - 1, Math.floor((cx0 + rad) / cell));
      var r0 = Math.max(0, Math.floor((cy0 - rad) / cell)), r1 = Math.min(rows - 1, Math.floor((cy0 + rad) / cell));
      for (var r = r0; r <= r1; r++) {
        for (var c = c0; c <= c1; c++) {
          var dx = (c + 0.5) * cell - cx0, dy = (r + 0.5) * cell - cy0;
          var dd = Math.sqrt(dx * dx + dy * dy);
          if (dd < rad) {
            var v = Math.min(1, (1 - dd / rad) * 1.7) * power;
            var idx = r * cols + c;
            if (v > heat[idx]) heat[idx] = v;
          }
        }
      }
    }

    function step(dt) {
      var f = dt * 60, i, s;
      clock += dt;

      for (i = 0; i < spheres.length; i++) {
        s = spheres[i];

        if (mouse.on) {
          var dx = s.x - mouse.x, dy = s.y - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var R = s.r + 150 * UI;
          if (dist < R && dist > 0.01) {
            var push = (1 - dist / R) * 1.3 * f;
            s.vx += (dx / dist) * push;
            s.vy += (dy / dist) * push;
          }
        }

        // Vuelven poco a poco a su velocidad tranquila
        s.vx += (s.bx - s.vx) * 0.02 * f;
        s.vy += (s.by - s.vy) * 0.02 * f;
        s.x += (s.vx + Math.sin(clock * 0.8 + s.ph) * 0.12 * UI) * f;
        s.y += (s.vy + Math.cos(clock * 0.7 + s.ph) * 0.12 * UI) * f;

        // Rebotan en los bordes (pueden asomarse un poco)
        var m = s.r * 0.25;
        if (s.x < -m && s.vx < 0) { s.vx = -s.vx; s.bx = Math.abs(s.bx); }
        if (s.x > W + m && s.vx > 0) { s.vx = -s.vx; s.bx = -Math.abs(s.bx); }
        if (s.y < -m && s.vy < 0) { s.vy = -s.vy; s.by = Math.abs(s.by); }
        if (s.y > H + m && s.vy > 0) { s.vy = -s.vy; s.by = -Math.abs(s.by); }

        lit(s.x, s.y, s.r + cell * 0.8, 0.9 * inten);
      }

      for (i = 0; i < squares.length; i++) {
        var q = squares[i];
        q.x += q.vx * f; q.y += q.vy * f; q.rot += q.vr * f;
        var b = q.s;
        if (q.x < -b) q.x = W + b; else if (q.x > W + b) q.x = -b;
        if (q.y < -b) q.y = H + b; else if (q.y > H + b) q.y = -b;
      }

      mglow += ((mouse.on ? 1 : 0) - mglow) * Math.min(1, 0.14 * f);   // la luz del cursor entra y sale suave
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var i, c, r;

      // Cuadrícula difuminada (capa ya dibujada)
      if (gridLayer) ctx.drawImage(gridLayer, 0, 0, W, H);

      // Casillas encendidas (y su desvanecimiento)
      var decay = running ? 0.955 : 1;
      for (r = 0; r < rows; r++) {
        for (c = 0; c < cols; c++) {
          var idx = r * cols + c, h = heat[idx];
          if (h < 0.03) { heat[idx] = 0; continue; }
          // Casilla con el borde difuminado (sin contorno duro)
          if (cellSprite) {
            ctx.globalAlpha = h > 1 ? 1 : h;
            ctx.drawImage(cellSprite, c * cell - cellPad, r * cell - cellPad, cell + cellPad * 2, cell + cellPad * 2);
            ctx.globalAlpha = 1;
          }
          heat[idx] = h * decay;
        }
      }

      // Luz redonda y suave en el cursor (en lugar de casillas cuadradas)
      if (mglow > 0.01) {
        var R = (soft ? 120 : 170) * UI, mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, R);
        mg.addColorStop(0, rgba(RED, (0.16 * inten * mglow).toFixed(3)));
        mg.addColorStop(0.45, rgba(RED, (0.08 * inten * mglow).toFixed(3)));
        mg.addColorStop(1, rgba(RED, 0));
        ctx.fillStyle = mg;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, R, 0, TAU); ctx.fill();
      }

      // Cuadros flotantes (rojos y neutros)
      for (i = 0; i < squares.length; i++) {
        var q = squares[i], hs = q.s / 2;
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(q.rot);
        if (q.fill) {
          ctx.fillStyle = q.red ? rgba(RED, (0.12 * inten + 0.02).toFixed(3)) : rgba(INK, (0.035 * INK_K).toFixed(3));
          ctx.fillRect(-hs, -hs, q.s, q.s);
        }
        ctx.lineWidth = 5;                      // halo suave alrededor del borde
        ctx.strokeStyle = q.red ? rgba(RED, (0.1 * inten).toFixed(3)) : rgba(INK, (0.03 * INK_K).toFixed(3));
        ctx.strokeRect(-hs, -hs, q.s, q.s);
        ctx.lineWidth = 1;
        ctx.strokeStyle = q.red ? rgba(RED, (0.5 * inten).toFixed(3)) : rgba(INK, (0.15 * INK_K).toFixed(3));
        ctx.strokeRect(-hs, -hs, q.s, q.s);
        ctx.restore();
      }

      // Esferas: bolas rojas con brillo
      for (i = 0; i < spheres.length; i++) {
        var s = spheres[i], a = s.a, g;
        if (s.r > 22) {
          g = ctx.createRadialGradient(s.x, s.y, s.r * 0.6, s.x, s.y, s.r * 2.3);
          g.addColorStop(0, rgba(RED, (0.2 * a).toFixed(3)));
          g.addColorStop(1, rgba(RED, 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.3, 0, TAU); ctx.fill();
        }
        g = ctx.createRadialGradient(s.x - s.r * 0.35, s.y - s.r * 0.4, s.r * 0.08, s.x, s.y, s.r);
        g.addColorStop(0, rgba(RED_HI, a.toFixed(3)));
        g.addColorStop(0.45, rgba(RED, (a * 0.92).toFixed(3)));
        g.addColorStop(1, rgba(RED_DEEP, (a * 0.92).toFixed(3)));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
      }
    }

    function frame(ts) {
      raf = 0;
      if (!running) return;
      var dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
      last = ts;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function update() { if (onScreen && !d.hidden) start(); else stop(); }

    // Ratón / dedo
    function setMouse(e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    }
    if (!reduceMotion) {
      host.addEventListener("pointermove", setMouse, { passive: true });
      host.addEventListener("pointerdown", setMouse, { passive: true });
      host.addEventListener("pointerleave", function () { mouse.on = false; });
      host.addEventListener("pointercancel", function () { mouse.on = false; });
      host.addEventListener("pointerup", function (e) {
        if (e.pointerType && e.pointerType !== "mouse") setTimeout(function () { mouse.on = false; }, 450);
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        update();
      }, { threshold: 0 }).observe(host);
    }
    d.addEventListener("visibilitychange", update);
    d.addEventListener("adgb:theme", function () { buildGrid(); if (reduceMotion || !running) draw(); });

    if ("ResizeObserver" in window) {
      var pending = 0;
      new ResizeObserver(function () {
        if (pending) cancelAnimationFrame(pending);
        pending = requestAnimationFrame(function () { pending = 0; resize(); });
      }).observe(host);
    } else {
      window.addEventListener("resize", resize);
    }

    resize();
    update();
  }

  [].forEach.call(d.querySelectorAll("canvas.scene"), Scene);

  /* ---------- Sonido de clics (se puede activar y desactivar) ---------- */
  var SOUND_KEY = "adgb-sound";
  var soundBtn = d.getElementById("sound");
  var soundOn = false;
  var audioCtx = null;

  try { soundOn = localStorage.getItem(SOUND_KEY) === "1"; } catch (e) { soundOn = false; }

  // Actualiza el aspecto y las etiquetas del botón según el estado y el idioma
  function updateSoundUI() {
    var btn = d.getElementById("sound");
    if (!btn) return;
    var dict = DICTS[currentLang] || ES;
    var label = dict[soundOn ? "snd.on" : "snd.off"] || "";
    btn.classList.toggle("is-on", !!soundOn);
    btn.setAttribute("aria-pressed", soundOn ? "true" : "false");
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function getAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { audioCtx = new AC(); } catch (e) { return null; }
    }
    if (audioCtx.state === "suspended" && audioCtx.resume) audioCtx.resume();
    return audioCtx;
  }

  // Un pitido corto de onda cuadrada (combina con el estilo cuadrado del sitio)
  function blip(type, f0, f1, dur, vol, delay) {
    var ctx = getAudio();
    if (!ctx) return;
    var t = ctx.currentTime + (delay || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  var SFX = {
    tick: function () { blip("square", 880, 620, 0.06, 0.035); },
    nav:  function () { blip("square", 300, 520, 0.07, 0.04); blip("square", 520, 780, 0.08, 0.035, 0.06); },
    on:   function () { blip("square", 520, 520, 0.07, 0.04); blip("square", 780, 780, 0.1, 0.04, 0.08); },
    off:  function () { blip("square", 780, 780, 0.07, 0.04); blip("square", 440, 440, 0.1, 0.04, 0.08); },
    nope: function () { blip("sawtooth", 140, 90, 0.14, 0.035); }
  };

  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      if (soundOn) {
        SFX.off();               // suena antes de apagarse
        soundOn = false;
      } else {
        soundOn = true;
        SFX.on();                // confirma que ya está activado
      }
      try { localStorage.setItem(SOUND_KEY, soundOn ? "1" : "0"); } catch (e) { /* sin almacenamiento */ }
      updateSoundUI();
    });
  }

  // Sonido al apretar cualquier botón o enlace (si el sonido está activado)
  d.addEventListener("click", function (e) {
    if (!soundOn || !e.target || !e.target.closest) return;
    var el = e.target.closest("a, button");
    if (!el || el.id === "sound") return;
    if (el.getAttribute("aria-disabled") === "true") { SFX.nope(); return; }
    if (el.matches(".nav a, .logo, .footer__list a, .hero__foot a, .crumbs a, .btn-row a, .notfound a")) SFX.nav();
    else SFX.tick();
  }, true);

  /* ---------- Modo oscuro / claro ---------- */
  var THEME_KEY = "adgb-theme";
  var theme = html.getAttribute("data-theme") === "light" ? "light" : "dark";
  var themeTimer = 0;

  // Etiqueta del botón: dice a qué modo se pasa al apretarlo (y se traduce)
  function updateThemeUI() {
    var btn = d.getElementById("theme");
    if (!btn) return;
    var dict = DICTS[currentLang] || ES;
    var label = dict[theme === "light" ? "thm.toDark" : "thm.toLight"] || "";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  // Aplica el tema: atributo, color de la barra del navegador, almacenamiento y aviso a las escenas
  function applyTheme() {
    html.setAttribute("data-theme", theme);
    var mc = d.querySelector('meta[name="theme-color"]');
    var cs = d.querySelector('meta[name="color-scheme"]');
    if (mc) mc.setAttribute("content", theme === "light" ? "#f5f5f5" : "#0a0a0a");
    if (cs) cs.setAttribute("content", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* sin almacenamiento */ }
    updateThemeUI();
    d.dispatchEvent(new CustomEvent("adgb:theme"));
  }

  // Efecto de inversión: el tema nuevo aparece dentro de un círculo que crece desde el botón.
  // Sin View Transitions se usa un fundido suave; con "reducir movimiento" el cambio es directo.
  function setTheme(t) {
    var next = t === "light" ? "light" : "dark";
    if (next === theme) return;
    theme = next;
    if (reduceMotion) { applyTheme(); return; }
    var btn = d.getElementById("theme");
    if (btn) { btn.classList.remove("is-spin"); void btn.offsetWidth; btn.classList.add("is-spin"); }
    var rc = btn ? btn.getBoundingClientRect() : null;
    var x = rc ? rc.left + rc.width / 2 : window.innerWidth - 40, y = rc ? rc.top + rc.height / 2 : 40;
    var r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    if (typeof d.startViewTransition === "function") {
      var vt = d.startViewTransition(applyTheme);
      vt.ready.then(function () {
        html.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + Math.ceil(r) + "px at " + x + "px " + y + "px)"] },
          { duration: 850, easing: "cubic-bezier(.2,.7,.1,1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(function () { /* transición cancelada: el tema ya quedó aplicado */ });
    } else {
      html.classList.add("theme-switching");
      clearTimeout(themeTimer);
      themeTimer = setTimeout(function () { html.classList.remove("theme-switching"); }, 480);
      applyTheme();
    }
  }

  var themeBtn = d.getElementById("theme");
  if (themeBtn) themeBtn.addEventListener("click", function () { setTheme(theme === "light" ? "dark" : "light"); });

  /* ---------- La A grande (y las otras letras) reaccionan al ratón y al dedo ---------- */
  var bigword = d.querySelector(".bigword");
  if (bigword) {
    var letters = [].slice.call(bigword.querySelectorAll(".bl"));
    letters.forEach(function (l) { l.setAttribute("data-t", l.textContent); });   // copia para el destello partido (CSS: .bl::after)
    var cool = 0;

    var lightUp = function (e) {
      var el = d.elementFromPoint(e.clientX, e.clientY);
      letters.forEach(function (l) { l.classList.toggle("is-hot", l === el); });
    };
    var calm = function (delay) {
      clearTimeout(cool);
      cool = setTimeout(function () { letters.forEach(function (l) { l.classList.remove("is-hot"); }); }, delay);
    };

    bigword.addEventListener("pointerdown", function (e) { clearTimeout(cool); lightUp(e); });
    bigword.addEventListener("pointermove", function (e) { clearTimeout(cool); lightUp(e); });
    // Con el dedo, "pointerleave" llega justo al soltar: ahí manda el retraso de pointerup
    bigword.addEventListener("pointerleave", function (e) { if (!e.pointerType || e.pointerType === "mouse") calm(0); });
    bigword.addEventListener("pointercancel", function () { calm(0); });
    // Con el dedo, la letra se queda encendida un momento después de soltar
    bigword.addEventListener("pointerup", function (e) { if (e.pointerType && e.pointerType !== "mouse") calm(650); });
  }

  // iOS solo activa :active (efecto al tocar) si la página escucha el toque
  d.addEventListener("touchstart", function () {}, { passive: true });

  /* ============================================================
     Capa avanzada: cursor, magnetismo y foco
     ============================================================ */
  var T = function (es, en, zh) { return currentLang === "en" ? en : currentLang === "zh" ? zh : es; };
  var FX = !reduceMotion;
  if (FX) html.classList.add("fx");

  // Pantalla de carga con porcentaje
  if (FX && loader && !skipLoader) {
    var pct = d.createElement("div"); pct.className = "loader__pct"; loader.appendChild(pct);
    (function tick(t0, now) {
      var p = Math.min(100, Math.round((now - t0) / 12));
      pct.textContent = ("00" + p).slice(-3) + " %";
      if (p < 100 && !revealed) requestAnimationFrame(function (n) { tick(t0, n); });
    })(performance.now(), performance.now());
  }

  // Cabecera inteligente y cinta que se inclina con la velocidad del scroll
  var header = d.getElementById("header"), lastY = 0, skewV = 0, skewT = 0, mq = d.querySelector(".marquee");
  var heroInner = d.querySelector(".hero__inner");
  window.addEventListener("scroll", function () {
    var y = window.scrollY || 0, dy = y - lastY; lastY = y;
    if (header) {
      header.classList.toggle("is-stuck", y > 24);
      if (y < 300 || dy < -4) header.classList.remove("is-hidden");
      else if (dy > 4 && !(nav && nav.classList.contains("is-open"))) header.classList.add("is-hidden");
    }
    if (heroInner && FX && !reduceMotion && y < 2) heroInner.classList.remove("is-par");   // arriba del todo: sin capa ni transformación
    else if (heroInner && FX && !reduceMotion && y < window.innerHeight * 1.3) {   // la portada sube más lento y se desvanece
      heroInner.classList.add("is-par");
      heroInner.style.setProperty("--hp", Math.round(y * 0.16));
      heroInner.style.setProperty("--hf", Math.min(1, y / (window.innerHeight * 0.85)).toFixed(3));
    }
    if (mq && FX) {
      skewV += (Math.max(-8, Math.min(8, dy * -0.25)) - skewV) * 0.5;
      mq.classList.add("is-skew");
      mq.style.setProperty("--sk", skewV.toFixed(2) + "deg");
      clearTimeout(skewT); skewT = setTimeout(function () {
        skewV = 0; mq.style.setProperty("--sk", "0deg");
        setTimeout(function () { if (!skewV) mq.classList.remove("is-skew"); }, 200);   // sin transformación al reposar
      }, 120);
    }
  }, { passive: true });

  // Pestaña en segundo plano
  var realTitle = "";
  d.addEventListener("visibilitychange", function () {
    if (d.hidden) { realTitle = d.title; d.title = "A.D.G.B · " + T("sigo aquí", "still here", "我还在"); }
    else if (realTitle) d.title = realTitle;
  });

  // Cursor, foco e inclinación en tarjetas, magnetismo y texto que se "descifra"
  if (FX && finePointer) {
    var ring = d.createElement("div"), dot = d.createElement("div");
    ring.className = "cur"; dot.className = "cur-dot";
    ring.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true");
    body.appendChild(ring); body.appendChild(dot);
    var rx = 0, ry = 0, px = 0, py = 0, seen = false, ringRaf = 0, lit = null, mag = null, bw = d.querySelector(".bigword"), tiltT = 0;
    // El aro redondo sigue al punto con suavidad y solo se anima mientras se mueve
    var ringStep = function () {
      rx += (px - rx) * 0.2; ry += (py - ry) * 0.2;
      ring.style.translate = rx.toFixed(1) + "px " + ry.toFixed(1) + "px";
      ringRaf = (Math.abs(px - rx) > 0.1 || Math.abs(py - ry) > 0.1) ? requestAnimationFrame(ringStep) : 0;
    };
    var unlit = function () { if (lit) { lit.classList.remove("is-lit"); lit.style.removeProperty("--rx"); lit.style.removeProperty("--ry"); lit = null; } };
    var unmag = function () { if (mag) { mag.style.removeProperty("--tx"); mag.style.removeProperty("--ty"); mag = null; } };
    window.addEventListener("pointermove", function (e) {
      var tg = e.target; if (!tg || !tg.closest) return;
      px = e.clientX; py = e.clientY;
      if (!seen) { seen = true; rx = px; ry = py; html.classList.add("has-cur"); }   // el cursor del sistema se oculta cuando el nuevo ya está en pantalla
      dot.style.translate = px + "px " + py + "px";
      if (!ringRaf) ringRaf = requestAnimationFrame(ringStep);
      ring.classList.add("is-on"); dot.classList.add("is-on");
      var hot = !!tg.closest("a,button,.card,.bl");
      ring.classList.toggle("is-link", hot); dot.classList.toggle("is-link", hot);
      var c = tg.closest(".card");
      if (lit && lit !== c) unlit();
      if (c) {
        var r = c.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        lit = c; c.classList.add("is-lit");
        c.style.setProperty("--mx", (nx * 100).toFixed(1) + "%"); c.style.setProperty("--my", (ny * 100).toFixed(1) + "%");
        c.style.setProperty("--rx", ((0.5 - ny) * 10).toFixed(2) + "deg"); c.style.setProperty("--ry", ((nx - 0.5) * 12).toFixed(2) + "deg");
      }
      var m = tg.closest(".btn:not(.btn--disabled),.sound,.theme");
      if (mag && mag !== m) unmag();
      if (m) {
        var b = m.getBoundingClientRect(); mag = m;
        m.style.setProperty("--tx", ((e.clientX - b.left - b.width / 2) * 0.22).toFixed(1) + "px");
        m.style.setProperty("--ty", ((e.clientY - b.top - b.height / 2) * 0.3).toFixed(1) + "px");
      }
      if (bw) {
        bw.classList.add("is-tilt");
        bw.style.setProperty("--hx", ((e.clientX / window.innerWidth - 0.5) * 8).toFixed(2) + "deg");
        bw.style.setProperty("--hy", ((0.5 - e.clientY / window.innerHeight) * 6).toFixed(2) + "deg");
        clearTimeout(tiltT);   // si el mouse se queda quieto, la palabra vuelve a su sitio y se quita la transformación
        tiltT = setTimeout(function () {
          bw.style.setProperty("--hx", "0deg"); bw.style.setProperty("--hy", "0deg");
          tiltT = setTimeout(function () { bw.classList.remove("is-tilt"); }, 500);
        }, 1600);
      }
    }, { passive: true });
    d.addEventListener("pointerdown", function () { ring.classList.add("is-down"); dot.classList.add("is-down"); });
    d.addEventListener("pointerup", function () { ring.classList.remove("is-down"); dot.classList.remove("is-down"); });
    d.addEventListener("mouseleave", function () { ring.classList.remove("is-on"); dot.classList.remove("is-on"); unlit(); unmag(); });

    var G = "ABCDEFGHJKLMNPRSTUVXYZ#%&/<>_";
    d.addEventListener("pointerover", function (e) {
      var el = e.target.closest ? e.target.closest(".nav a,.btn:not(.btn--disabled)") : null;
      if (!el || el._s || el.children.length || !/^[\x20-\x7E¿¡áéíóúñÁÉÍÓÚÑ]+$/.test(el.textContent)) return;
      var txt = el.textContent, i = 0;
      el.style.minWidth = el.offsetWidth + "px";
      el._s = setInterval(function () {
        el.textContent = txt.split("").map(function (ch, k) { return k < i || ch === " " ? ch : G.charAt(Math.floor(Math.random() * G.length)); }).join("");
        if (++i > txt.length) { clearInterval(el._s); el._s = 0; el.textContent = txt; el.style.minWidth = ""; }
      }, 28);
    });
  }

  // Onda y chispas al hacer clic o tocar
  if (FX) {
    d.addEventListener("pointerdown", function (e) {
      if (e.button > 0) return;
      var x = e.clientX, y = e.clientY, made = [], i, a, k, el;
      el = d.createElement("i"); el.className = "ripple";
      el.style.left = x + "px"; el.style.top = y + "px";
      body.appendChild(el); made.push(el);
      for (i = 0; i < 6; i++) {
        a = (Math.PI * 2 * i) / 6 + Math.random() * 0.6; k = 26 + Math.random() * 28;
        el = d.createElement("i"); el.className = "spark";
        el.style.left = x + "px"; el.style.top = y + "px";
        el.style.setProperty("--dx", (Math.cos(a) * k).toFixed(1) + "px");
        el.style.setProperty("--dy", (Math.sin(a) * k).toFixed(1) + "px");
        body.appendChild(el); made.push(el);
      }
      setTimeout(function () { made.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); }); }, 850);
    }, { passive: true });
  }

  /* ---------- Año del pie ---------- */
  var year = d.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Aplicar idioma al final, cuando todo lo demás ya existe ---------- */
  if (initial !== "es") applyLang(initial);
  updateSoundUI();
  updateThemeUI();
})();

/* Abrir el sitio desde una carpeta del computador (file://): los enlaces a carpetas necesitan index.html */
(function () {
  if (location.protocol !== "file:") return;
  [].forEach.call(document.querySelectorAll("a[href]"), function (a) {
    var h = a.getAttribute("href");
    if (/^(https?:|mailto:|#)/.test(h)) return;
    if (h === "" || /\/$/.test(h)) a.setAttribute("href", h + "index.html");
  });
})();
