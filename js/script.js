"use strict";

const SITE = window.SITE;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const CATEGORIES = {
    oyun: { label: "Oyun", c1: "#8fb4e6", c2: "#3a6db5" },
    masaustu: { label: "Masaüstü", c1: "#e8c39e", c2: "#c8805a" },
    veri: { label: "Veri & Algoritma", c1: "#9fd6d2", c2: "#2f8a8a" },
    web: { label: "Web", c1: "#e5b3a7", c2: "#b4624f" }
};


const ICONS = {
    email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    location: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>'
};

function esc(str) {
    return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

/* ===========================
   KİŞİSEL BİLGİLER
=========================== */
(function profileModule() {
    const firstName = SITE.name.split(" ")[0];

    $$("[data-name]").forEach(el => { el.textContent = SITE.name; });
    $$("[data-name-logo]").forEach(el => { el.innerHTML = esc(firstName) + "<span>.</span>"; });
    $$("[data-role]").forEach(el => { el.textContent = SITE.role; });
    $$("[data-location]").forEach(el => { el.textContent = SITE.location.split(",")[0]; });
    document.title = `${SITE.name} | Portfolyo`;

    // Fotoğraf: yoksa baş harf görünür
    const img = $("#profileImg");
    const initial = $("#profileInitial");
    initial.textContent = firstName.charAt(0).toLocaleUpperCase("tr");
    img.alt = `${SITE.name} fotoğrafı`;
    img.hidden = true;
    if (SITE.photo) {
        img.addEventListener("load", () => { img.hidden = false; initial.hidden = true; });
        img.src = SITE.photo;
    }

    const cvBtn = $("#cvButton");
    if (SITE.cv) { cvBtn.href = SITE.cv; cvBtn.hidden = false; }

    const repos = $("[data-github-repos]");
    if (repos && SITE.social.github) repos.href = SITE.social.github + "?tab=repositories";

    $("#year").textContent = new Date().getFullYear();
})();

/* ===========================
   İÇERİĞİ OLUŞTUR
=========================== */
(function renderModule() {
    // Yetenekler
    $("#skillsList").innerHTML = SITE.skills.map(s => `<li class="skill">${esc(s)}</li>`).join("");

    // Projeler
    $("#projectsGrid").innerHTML = SITE.projects.map((p, i) => {
        const cat = CATEGORIES[p.category] || CATEGORIES.web;
        return `
        <button class="project-card card" data-index="${i}" data-category="${esc(p.category)}" aria-label="${esc(p.title)} detaylarını aç">
            <div class="project-thumb">
                ${thumb(p)}
                ${p.demo ? '<span class="badge live">Canlı</span>' : ""}
            </div>
            <div class="project-info">
                <span class="project-cat">${esc(cat.label)}</span>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.short)}</p>
                <ul class="tags">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
            </div>
        </button>`;
    }).join("");

    // Yolculuk
    $("#timeline").innerHTML = SITE.timeline.map(t => `
        <li class="timeline-item card">
            <span class="timeline-date">${esc(t.date)}</span>
            <h3>${esc(t.title)}</h3>
            <p class="timeline-place">${esc(t.place)}</p>
            ${t.text ? `<p>${esc(t.text)}</p>` : ""}
        </li>`).join("");

    // İletişim kartları
    const s = SITE.social;
    const cards = [
        s.email && { icon: ICONS.email, label: "E-posta", value: s.email, href: "mailto:" + s.email },
        s.github && { icon: ICONS.github, label: "GitHub", value: s.github.replace(/^https?:\/\//, ""), href: s.github },
        s.linkedin && { icon: ICONS.linkedin, label: "LinkedIn", value: SITE.name, href: s.linkedin },
        SITE.location && { icon: ICONS.location, label: "Konum", value: SITE.location }
    ].filter(Boolean);

    $("#contactCards").innerHTML = cards.map(c => {
        const tag = c.href ? "a" : "div";
        const attrs = c.href ? ` href="${esc(c.href)}"${c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}` : "";
        return `<${tag} class="contact-card card"${attrs}>
            <span class="contact-icon">${c.icon}</span>
            <span><small>${esc(c.label)}</small><strong>${esc(c.value)}</strong></span>
        </${tag}>`;
    }).join("");
})();

function thumb(p) {
    if (p.image) return `<img src="${esc(p.image)}" alt="${esc(p.title)} ekran görüntüsü" loading="lazy" />`;
    const cat = CATEGORIES[p.category] || CATEGORIES.web;
    return `<div class="thumb-art" style="--c1:${cat.c1};--c2:${cat.c2}"><span aria-hidden="true">${p.icon || "💻"}</span></div>`;
}

/* ===========================
   TEMA (AÇIK / KOYU)
=========================== */
(function themeModule() {
    const root = document.documentElement;
    const toggle = $("#themeToggle");
    const meta = $('meta[name="theme-color"]');

    const sync = () => {
        const dark = root.getAttribute("data-theme") === "dark";
        toggle.setAttribute("aria-pressed", String(dark));
        if (meta) meta.content = dark ? "#0e1522" : "#3a6db5";
    };
    sync();

    toggle.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        if (next === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
        try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* gizli sekme */ }
        sync();
    });
})();

/* ===========================
   MOBİL NAVİGASYON
=========================== */
(function mobileNavModule() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    const setOpen = (open) => {
        links.classList.toggle("open", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    };

    toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    $$("a", links).forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
})();

/* ===========================
   SCROLL: HEADER + PROGRESS + AKTİF LINK + BACK-TO-TOP
=========================== */
(function scrollModule() {
    const header = $("#header");
    const progress = $("#scrollProgress");
    const backToTop = $("#backToTop");
    const navLinks = $$(".nav-link");
    const sections = navLinks.map(a => $(a.getAttribute("href"))).filter(Boolean);

    let ticking = false;
    function update() {
        ticking = false;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        header.classList.toggle("scrolled", y > 20);
        backToTop.classList.toggle("visible", y > 600);
    }
    window.addEventListener("scroll", () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = "#" + entry.target.id;
            navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => observer.observe(s));
})();

/* ===========================
   YAZI MAKİNESİ EFEKTİ
=========================== */
(function typingModule() {
    const el = $("#typed");
    const words = SITE.typing;
    if (!el || !words.length) return;

    if (reduceMotion) { el.textContent = words[0]; return; }

    let w = 0, c = 0, deleting = false;
    (function tick() {
        const word = words[w];
        c += deleting ? -1 : 1;
        el.textContent = word.slice(0, c);

        let delay = deleting ? 35 : 70;
        if (!deleting && c === word.length) { deleting = true; delay = 1800; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        setTimeout(tick, delay);
    })();
})();

/* ===========================
   MIKNATIS BUTONLAR + KART TILT
=========================== */
(function pointerFxModule() {
    if (reduceMotion || !finePointer) return;

    $$(".magnetic").forEach(btn => {
        btn.addEventListener("mousemove", e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.35}px)`;
        });
        btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });

    $$(".project-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `rotateX(${py * -7}deg) rotateY(${px * 7}deg) translateY(-6px)`;
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
})();

/* ===========================
   PROJE FİLTRELERİ
=========================== */
(function filterModule() {
    const buttons = $$(".filter");
    const cards = $$(".project-card");

    buttons.forEach(btn => btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        buttons.forEach(b => {
            const on = b === btn;
            b.classList.toggle("active", on);
            b.setAttribute("aria-selected", String(on));
        });
        cards.forEach(card => {
            const show = f === "all" || card.dataset.category === f;
            card.classList.toggle("hide", !show);
            if (show && !reduceMotion) {
                card.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }],
                    { duration: 450, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
            }
        });
    }));
})();

/* ===========================
   PROJE MODALI
=========================== */
(function modalModule() {
    const modal = $("#projectModal");
    let lastFocus = null;

    function open(i) {
        const p = SITE.projects[i];
        const cat = CATEGORIES[p.category] || CATEGORIES.web;

        $("#modalMedia").innerHTML = thumb(p);
        $("#modalCat").textContent = cat.label;
        $("#modalTitle").textContent = p.title;
        $("#modalDesc").textContent = p.description;
        $("#modalTech").innerHTML = p.tech.map(t => `<li>${esc(t)}</li>`).join("");
        $("#modalActions").innerHTML = [
            p.demo && `<a class="btn btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Canlı Demo ↗</a>`,
            p.github && `<a class="btn btn-outline" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub'da İncele</a>`
        ].filter(Boolean).join("");

        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.classList.add("modal-open");
        $(".modal-close", modal).focus();
    }

    function close() {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
        if (lastFocus) lastFocus.focus();
    }

    $("#projectsGrid").addEventListener("click", e => {
        const card = e.target.closest(".project-card");
        if (card) open(Number(card.dataset.index));
    });

    modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });

    document.addEventListener("keydown", e => {
        if (modal.hidden) return;
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
   SCROLL-REVEAL
=========================== */
(function revealModule() {
    const targets = $$("section:not(#hero) h2, .section-subtitle, .about-block, .skill, .filters, .project-card, .timeline-item, .contact-card, .contact-form");
    targets.forEach(el => el.classList.add("reveal"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
        targets.forEach(el => el.classList.add("in-view"));
        return;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add("in-view");
            // Giriş animasyonu bitince gecikmeyi kaldır; hover efektleri beklemesin
            setTimeout(() => { e.target.style.transitionDelay = ""; }, 1200);
            obs.unobserve(e.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(el => {
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
        el.style.transitionDelay = (Math.min(siblings.indexOf(el), 4) * 80) + "ms";
        obs.observe(el);
    });
})();

/* ===========================
   İLETİŞİM FORMU
=========================== */
(function contactFormModule() {
    const form = $("#contactForm");
    const status = $("#contactStatus");
    const submit = $("#contactSubmit");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setStatus = (msg, type = "") => { status.textContent = msg; status.className = "form-status " + type; };

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
        if (!ok) { setStatus("Lütfen tüm alanları doğru şekilde doldur.", "error"); return; }

        // Formspree adresi yoksa ziyaretçinin e-posta uygulamasını aç
        if (!SITE.formEndpoint) {
            const subject = encodeURIComponent(`Portfolyo üzerinden mesaj — ${data.name}`);
            const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
            window.location.href = `mailto:${SITE.social.email}?subject=${subject}&body=${body}`;
            setStatus("E-posta uygulaman açılıyor…", "success");
            return;
        }

        submit.disabled = true;
        setStatus("Gönderiliyor…");
        try {
            const res = await fetch(SITE.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ ...data, _subject: `Portfolyo mesajı — ${data.name}` })
            });
            if (!res.ok) throw new Error();
            form.reset();
            setStatus("Mesajın gönderildi, teşekkürler! En kısa sürede dönüş yapacağım.", "success");
        } catch {
            setStatus("Mesaj gönderilemedi. Lütfen doğrudan e-posta ile ulaş.", "error");
        } finally {
            submit.disabled = false;
        }
    });
})();
