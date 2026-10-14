"use strict";

const SITE = window.SITE;
const I18N = window.I18N;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// CSS'teki --ease-out ile aynı eğri
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const CATEGORY_ORDER = ["oyun", "web", "veri", "masaustu"];

// Kapak ikonları: ince çizgili, 24x24
const COVER_ICONS = {
    shield: '<path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    grid: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/>',
    castle: '<path d="M4 21V9h3V6h2v3h2V6h2v3h2V6h2v3h3v12"/><path d="M10 21v-4a2 2 0 0 1 4 0v4M3 21h18"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8.7-8.7M16 6l2.5 2.5M14 8l2 2"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    graph: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="12" cy="17" r="2.2"/><circle cx="19" cy="18" r="1.6"/><path d="m8 6.8 7.8.1M7.2 8l3.6 7M16.6 8.8l-3.4 6.4M14.2 17.3l3.3.5"/>',
    chart: '<path d="M4 20h16"/><path d="M7 16v-5M12 16V7M17 16v-8"/><path d="m5 9 5-4 4 3 6-5"/>',
    radar: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12 18 6"/><circle cx="16" cy="14.5" r="0.8" fill="currentColor"/><circle cx="9" cy="9" r="0.8" fill="currentColor"/>',
    terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="m7 10 3 2.5L7 15M12.5 15H17"/>'
};

const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn" };

function esc(str) {
    return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function coverHTML(p, i) {
    const c = p.cover || { icon: "terminal", hue: 260 };
    return `
        <span class="cover-num mono">${String(i + 1).padStart(2, "0")}</span>
        ${p.demo ? `<span class="cover-live">${esc(t("liveBadge"))}</span>` : ""}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${COVER_ICONS[c.icon] || COVER_ICONS.terminal}</svg>`;
}

/* ===========================
   DİL (TR / EN)
=========================== */
const LANGS = ["tr", "en"];
const LANG_KEY = "portfolio-lang";

let lang = (function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
        const stored = localStorage.getItem(LANG_KEY);
        if (LANGS.includes(stored)) return stored;
    } catch (e) { /* gizli sekme */ }
    return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
})();

// Arayüz metni: t("anahtar", { name: "..." })
function t(key, vars = {}) {
    const str = (I18N[lang] && I18N[lang][key]) ?? I18N.tr[key] ?? key;
    return str.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");
}

// İçerik metni: { tr, en } nesnesi ya da düz metin
function L(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) return value[lang] ?? value.tr;
    return value;
}

const categoryLabel = (cat) => t("cat_" + cat);

/* ===========================
   SABİT METİNLER + KİŞİSEL BİLGİLER
=========================== */
function applyStaticText() {
    document.documentElement.lang = lang;
    document.title = `${SITE.name} | ${t("pageTitle")}`;

    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-attr]").forEach(el => {
        el.dataset.i18nAttr.split(";").forEach(pair => {
            const [attr, key] = pair.split(":");
            el.setAttribute(attr.trim(), t(key.trim()));
        });
    });

    $$("[data-name]").forEach(el => { el.textContent = SITE.name; });
    $$("[data-role]").forEach(el => { el.textContent = L(SITE.role); });
    $$("[data-location]").forEach(el => { el.textContent = L(SITE.location); });

    const cv = L(SITE.cv);
    const cvBtn = $("#cvButton");
    cvBtn.hidden = !cv;
    if (cv) cvBtn.href = cv;

    $("#langToggle").textContent = lang === "tr" ? "EN" : "TR";
}

(function staticModule() {
    const repos = $("[data-github-repos]");
    if (repos && SITE.social.github) repos.href = SITE.social.github + "?tab=repositories";
    $("#yearFooter").textContent = new Date().getFullYear();

    $("#heroSocials").innerHTML = ["github", "linkedin"]
        .filter(k => SITE.social[k])
        .map(k => `<a href="${esc(SITE.social[k])}" target="_blank" rel="noopener">${SOCIAL_LABELS[k]} ↗</a>`)
        .join("");
})();

/* ===========================
   İÇERİĞİ OLUŞTUR
=========================== */
let activeFilter = "all";

function renderFilters() {
    const counts = SITE.projects.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
    const cats = CATEGORY_ORDER.filter(c => counts[c]);
    const btn = (key, label, n) => `
        <button class="filter${activeFilter === key ? " active" : ""}" data-filter="${key}" role="tab" aria-selected="${activeFilter === key}">
            ${esc(label)}<sup>${n}</sup>
        </button>`;
    $("#filters").innerHTML = btn("all", t("filterAll"), SITE.projects.length) +
        cats.map(c => btn(c, categoryLabel(c), counts[c])).join("");
}

function renderContent() {
    // Projeler: üretilen kapaklı kartlar
    renderFilters();
    $("#projectsGrid").innerHTML = SITE.projects.map((p, i) => {
        const hidden = activeFilter !== "all" && p.category !== activeFilter;
        const c = p.cover || { icon: "terminal", hue: 260 };
        return `
        <li class="${hidden ? "hide" : ""}" data-category="${esc(p.category)}">
            <button class="project" data-index="${i}" aria-label="${esc(t("openDetails", { title: L(p.title) }))}">
                <span class="cover" style="--h:${c.hue ?? 260}" aria-hidden="true">
                    <span class="cover-num mono">${String(i + 1).padStart(2, "0")}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${COVER_ICONS[c.icon] || COVER_ICONS.terminal}</svg>
                </span>
                <span class="project-body">
                    <span class="project-title">${esc(L(p.title))}${p.demo ? `<span class="live">${esc(t("liveBadge"))}</span>` : ""}</span>
                    <span class="project-sub">${esc(categoryLabel(p.category))} · ${esc(p.tech.slice(0, 3).map(L).join(", "))}</span>
                    <span class="project-short">${esc(L(p.short))}</span>
                    <span class="read-more">${esc(t("readMore"))}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
                </span>
            </button>
        </li>`;
    }).join("");

    // Yetenekler
    $("#skillsList").innerHTML = SITE.skills.map(x => `<li>${esc(L(x))}</li>`).join("");

    // Yolculuk
    $("#timeline").innerHTML = SITE.timeline.map(item => `
        <li>
            <span class="journey-date mono">${esc(L(item.date))}</span>
            <span class="journey-title">${esc(L(item.title))}</span>
            <span class="journey-place">${esc(L(item.place))}${item.text ? `<span class="journey-note">${esc(L(item.text))}</span>` : ""}</span>
        </li>`).join("");

    // İletişim bağlantıları
    const s = SITE.social;
    const cv = L(SITE.cv);
    const links = [
        s.email && { label: t("labelEmail"), value: s.email, href: "mailto:" + s.email },
        s.linkedin && { label: "LinkedIn", value: "↗", href: s.linkedin },
        s.github && { label: "GitHub", value: "↗", href: s.github },
        cv && { label: "CV", value: "PDF ↓", href: cv, download: true },
        SITE.location && { label: t("labelLocation"), value: L(SITE.location) }
    ].filter(Boolean);
    $("#contactCards").innerHTML = links.map(c => {
        if (!c.href) return `<li><div><small>${esc(c.label)}</small><strong>${esc(c.value)}</strong></div></li>`;
        const ext = c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
        return `<li><a href="${esc(c.href)}"${ext}${c.download ? " download" : ""}><small>${esc(c.label)}</small><strong>${esc(c.value)}</strong></a></li>`;
    }).join("");
}

applyStaticText();
renderContent();

/* ===========================
   DİL DEĞİŞTİRME
=========================== */
const langListeners = [];
let switchingLang = false;

async function setLang(next) {
    if (next === lang || switchingLang) return;
    switchingLang = true;

    // İçerik aniden değişmesin: kısa bir solma, metin değişimi, yeniden belirme
    const targets = [$("main"), $(".footer"), $("#navLinks")].filter(Boolean);
    const outs = targets.map(el => el.animate([{ opacity: 1 }, { opacity: 0 }],
        { duration: 150, easing: EASE_OUT, fill: "forwards" }));
    // Solma bitmese de (ör. arka plandaki sekme) metin en geç 250ms içinde değişir
    await Promise.race([
        Promise.all(outs.map(a => a.finished.catch(() => {}))),
        new Promise(resolve => setTimeout(resolve, 250))
    ]);

    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* gizli sekme */ }

    // Paylaşılabilir adres: İngilizcede ?lang=en
    const url = new URL(location.href);
    if (lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);

    applyStaticText();
    renderContent();
    langListeners.forEach(fn => fn());

    targets.forEach(el => el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: EASE_OUT }));
    outs.forEach(a => a.cancel());
    switchingLang = false;
}

$("#langToggle").addEventListener("click", () => setLang(lang === "tr" ? "en" : "tr"));

/* ===========================
   TEMA (varsayılan koyu, isteğe bağlı açık)
=========================== */
(function themeModule() {
    const root = document.documentElement;
    const toggle = $("#themeToggle");
    const meta = $('meta[name="theme-color"]');

    const sync = () => {
        const light = root.getAttribute("data-theme") === "light";
        toggle.setAttribute("aria-pressed", String(!light));
        if (meta) meta.content = light ? "#f6f6f7" : "#0b0b0d";
    };
    sync();

    toggle.addEventListener("click", () => {
        const light = root.getAttribute("data-theme") !== "light";
        if (light) root.setAttribute("data-theme", "light");
        else root.removeAttribute("data-theme");
        try { localStorage.setItem("portfolio-theme", light ? "light" : "dark"); } catch (e) { /* gizli sekme */ }
        sync();
    });
})();

/* ===========================
   ÜST BAR + MOBİL MENÜ + AKTİF BAĞLANTI
=========================== */
(function navModule() {
    const header = $("#header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = $("#navToggle");
    const nav = $(".nav");
    const setOpen = (open) => {
        nav.classList.toggle("open", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen"));
    };
    setOpen(false);
    langListeners.push(() => setOpen(nav.classList.contains("open")));
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    $$(".nav-link").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });

    const links = $$(".nav-link");
    const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = "#" + entry.target.id;
            links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => observer.observe(s));
})();

/* ===========================
   PROJE FİLTRELERİ
=========================== */
$("#filters").addEventListener("click", e => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$(".filter").forEach(b => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
    });

    let shown = 0;
    $$("#projectsGrid > li").forEach(li => {
        const show = activeFilter === "all" || li.dataset.category === activeFilter;
        li.classList.toggle("hide", !show);
        if (!show) return;
        const from = reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" };
        const to = reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "none" };
        li.animate([from, to], { duration: 320, delay: Math.min(shown++, 8) * 40, easing: EASE_OUT, fill: "backwards" });
    });
});

/* ===========================
   HERO: 360° dönüş videosundan çıkarılmış karelerle dönen 3D karakter
=========================== */
(function heroModule() {
    const tt = $("#turntable");
    if (!tt) return;
    const scene = $("#scene");
    const hint = $(".drag-hint", scene);
    const FRAMES = Number(tt.dataset.frames);
    const COLS = Number(tt.dataset.cols);
    const ROWS = Math.ceil(FRAMES / COLS);

    // Kare numarası (ondalıklı) -> sprite içindeki konum
    let pos = 0;
    let shown = -1;
    const render = () => {
        const f = ((Math.round(pos) % FRAMES) + FRAMES) % FRAMES;
        if (f === shown) return;
        shown = f;
        const c = f % COLS, r = Math.floor(f / COLS);
        tt.style.backgroundPosition = `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`;
    };

    // Sprite yüklenince karakter belirir
    const img = new Image();
    img.onload = () => {
        tt.style.backgroundImage = `url("${tt.dataset.src}")`;
        render();
        tt.classList.add("ready");
    };
    img.src = tt.dataset.src;

    if (reduceMotion) { render(); return; }

    const BASE = 6;          // kare/saniye: videodaki gibi ~10 sn'de bir tur
    let vel = BASE;
    let dragging = false;
    let lastX = 0, lastT = 0;
    let visible = true;
    let prev = performance.now();

    const tick = now => {
        const dt = Math.min((now - prev) / 1000, 0.05);
        prev = now;
        if (!dragging) {
            // Savrulunca yavaşlayarak sakin dönüş hızına iner (savrulduğu yönde)
            const target = BASE * (vel < 0 ? -1 : 1);
            vel = target + (vel - target) * Math.exp(-dt * 2.4);
            pos += vel * dt;
        }
        render();
        if (visible) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Ekranda değilken boşuna çizmesin
    new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was) { prev = performance.now(); requestAnimationFrame(tick); }
    }).observe(scene);

    // Sürükleyerek çevirme: 6 piksel ≈ bir kare
    const PX_PER_FRAME = 6;
    tt.addEventListener("pointerdown", e => {
        dragging = true;
        lastX = e.clientX;
        lastT = performance.now();
        vel = 0;
        tt.setPointerCapture(e.pointerId);
        tt.classList.add("dragging");
        if (hint) hint.classList.add("gone");
    });
    tt.addEventListener("pointermove", e => {
        if (!dragging) return;
        const now = performance.now();
        const df = -(e.clientX - lastX) / PX_PER_FRAME;   // sağa çekince karakter sağa döner
        pos += df;
        vel = df / Math.max((now - lastT) / 1000, 0.008);
        lastX = e.clientX;
        lastT = now;
        render();
    });
    const release = () => {
        if (!dragging) return;
        dragging = false;
        if (performance.now() - lastT > 80) vel = BASE * Math.sign(vel || 1);   // bırakmadan önce durduysa sakin hıza dön
        vel = Math.max(-90, Math.min(90, vel));
        tt.classList.remove("dragging");
    };
    tt.addEventListener("pointerup", release);
    tt.addEventListener("pointercancel", release);
})();

/* ===========================
   PROJE MODALI
=========================== */
(function modalModule() {
    const modal = $("#projectModal");
    let lastFocus = null;
    let current = -1;
    let hideTimer = null;

    function fill(i) {
        const p = SITE.projects[i];
        const cover = $("#modalCover");
        cover.style.setProperty("--h", (p.cover && p.cover.hue) ?? 260);
        cover.innerHTML = coverHTML(p, i);
        $("#modalCat").textContent = categoryLabel(p.category);
        $("#modalTitle").textContent = L(p.title);
        $("#modalDesc").textContent = L(p.description);
        $("#modalTech").innerHTML = p.tech.map(x => `<li>${esc(L(x))}</li>`).join("");
        $("#modalActions").innerHTML = [
            p.demo && `<a class="btn solid" href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(t("liveDemo"))}</a>`,
            p.github && `<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">${esc(t("viewGithub"))}</a>`
        ].filter(Boolean).join("");
    }

    function open(i) {
        clearTimeout(hideTimer);
        current = i;
        fill(i);
        lastFocus = document.activeElement;
        modal.hidden = false;
        modal.getBoundingClientRect();          // başlangıç durumunu çizdir, sonra geçişi başlat
        modal.setAttribute("data-open", "");
        document.body.classList.add("modal-open");
        $(".modal-close", modal).focus();
    }

    function close() {
        if (current < 0) return;
        current = -1;
        modal.removeAttribute("data-open");     // açıldığı gibi kapanır (250ms)
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => { modal.hidden = true; }, 260);
        document.body.classList.remove("modal-open");
        if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    }

    langListeners.push(() => { if (current >= 0) fill(current); });

    $("#projectsGrid").addEventListener("click", e => {
        const card = e.target.closest(".project");
        if (card) open(Number(card.dataset.index));
    });
    modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });

    document.addEventListener("keydown", e => {
        if (current < 0) return;
        if (e.key === "Escape") close();
        if (e.key === "Tab") {
            // Odağı modal içinde tut
            const focusables = $$("a, button", modal).filter(el => !el.closest("[hidden]"));
            const first = focusables[0], last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
})();

/* ===========================
   KAYDIRMA GEÇİŞLERİ (GSAP + ScrollTrigger)
   Sakin ve kısa; hareketi azalt açıksa hiçbiri kurulmaz.
=========================== */
(function motionModule() {
    if (!window.gsap || !window.ScrollTrigger) return;   // CDN yüklenmezse site yine çalışır
    gsap.registerPlugin(ScrollTrigger);

    const splitWords = el => {
        el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(" ");
        return $$(".w", el);
    };

    let mm = null;

    function build() {
        mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Hakkımda: okudukça kelimeler sönükten parlağa döner
            const lead = $(".lead");
            gsap.fromTo(splitWords(lead), { opacity: 0.18 }, {
                opacity: 1, stagger: 0.06, ease: "none",
                scrollTrigger: { trigger: lead, start: "top 80%", end: "bottom 55%", scrub: true }
            });

            // Sahne ve noktalı zemin farklı hızlarda kayar, derinlik kazanır
            [[".scene", 60], [".hero-bg", 100]].forEach(([sel, y]) => {
                gsap.to(sel, { y, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
            });

            // Kısa, sakin girişler
            const cards = ".section .label, .about-cols > div, #projectsGrid > li, .skills li, .journey li, .contact-sub, .contact-links, .contact-form";
            gsap.set(cards, { opacity: 0, y: 24 });
            ScrollTrigger.batch(cards, {
                start: "top 90%",
                once: true,
                onEnter: items => gsap.to(items, {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05, clearProps: "transform,opacity"
                })
            });
        });
    }

    build();

    // Dil değişince metinler yeniden yazıldığı için tetikleyiciler yeniden kurulur
    langListeners.push(() => {
        mm.revert();
        build();
        ScrollTrigger.refresh();
    });
    window.addEventListener("load", () => ScrollTrigger.refresh());
})();

/* ===========================
   İLETİŞİM FORMU
=========================== */
(function contactFormModule() {
    const form = $("#contactForm");
    const status = $("#contactStatus");
    const submit = $("#contactSubmit");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Son mesaj anahtar olarak tutulur ki dil değişince o da çevrilsin
    let lastStatus = null;
    const setStatus = (key, type = "", animate = true) => {
        lastStatus = key ? { key, type } : null;
        status.textContent = key ? t(key) : "";
        status.className = "form-status " + type;
        if (key && animate) {
            const from = reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(4px)" };
            status.animate([from, { opacity: 1, transform: "none" }], { duration: 200, easing: EASE_OUT });
        }
    };
    langListeners.push(() => { if (lastStatus) setStatus(lastStatus.key, lastStatus.type, false); });

    form.addEventListener("input", e => e.target.closest(".field")?.classList.remove("invalid"));

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        let ok = true;
        [["name", !!data.name], ["email", emailRe.test(data.email)], ["message", data.message.length >= 5]].forEach(([key, valid]) => {
            form[key].closest(".field").classList.toggle("invalid", !valid);
            if (!valid) ok = false;
        });
        if (!ok) { setStatus("formInvalid", "error"); return; }

        const subject = t("mailSubject", { name: data.name });

        // Formspree adresi yoksa ziyaretçinin e-posta uygulamasını aç
        if (!SITE.formEndpoint) {
            const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
            window.location.href = `mailto:${SITE.social.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
            setStatus("formMailto", "success");
            return;
        }

        submit.disabled = true;
        setStatus("formSending");
        try {
            const res = await fetch(SITE.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ ...data, _subject: subject })
            });
            if (!res.ok) throw new Error();
            form.reset();
            setStatus("formSuccess", "success");
        } catch {
            setStatus("formError", "error");
        } finally {
            submit.disabled = false;
        }
    });
})();
