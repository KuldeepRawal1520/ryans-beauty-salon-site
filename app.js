(() => {
  "use strict";
  const cfg = window.SALON_CONFIG || {};
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safeInit = (name, init) => { try { init(); } catch (error) { console.error("[Ryan's Salon] " + name + " initialization failed:", error); } };

  safeInit("mobile navigation", () => {
    const nav = one(".nav-wrap"), toggle = one(".menu-toggle");
    if (!nav || !toggle) return;
    const close = () => { nav.classList.remove("menu-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation menu"); };
    const open = () => { nav.classList.add("menu-open"); toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Close navigation menu"); };
    toggle.addEventListener("click", () => nav.classList.contains("menu-open") ? close() : open());
    nav.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (link && link.matches(".nav-links a")) close();
    });
    document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
    document.addEventListener("click", event => { if (!nav.contains(event.target)) close(); });
    window.addEventListener("resize", () => { if (window.matchMedia("(min-width: 768px)").matches) close(); });
  });

  safeInit("booking and contact links", () => {
    const bookingUrl = typeof cfg.bookingUrl === "string" ? cfg.bookingUrl.trim() : "";
    const phoneDigits = String(cfg.phone || "6476182685").replace(/\D/g, "");
    const tel = "tel:+" + (phoneDigits.length === 10 ? "1" + phoneDigits : phoneDigits);
    all("[data-booking-link]").forEach(link => {
      link.href = bookingUrl || tel;
      if (bookingUrl) { link.textContent = "Book Now"; link.target = "_blank"; link.rel = "noopener"; }
      else { link.textContent = "Call to Book"; link.removeAttribute("target"); link.removeAttribute("rel"); }
    });
    const note = one("#booking-note"); if (note) note.hidden = Boolean(bookingUrl);
    const call = one("#call-button"); if (call) { call.href = tel; call.hidden = !phoneDigits; }
    all(".mobile-cta a:first-child").forEach(link => { link.href = tel; link.hidden = !phoneDigits; });
  });

  safeInit("smooth navigation", () => {
    all('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
      const target = one(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", link.getAttribute("href"));
    }));
  });

  safeInit("review expansion", () => {
    all(".review-card").forEach(card => {
      const text = one(".review-text", card), button = one(".review-expand", card);
      if (!text || !button) return;
      text.classList.add("clamped");
      requestAnimationFrame(() => {
        if (text.scrollHeight > text.clientHeight + 2) button.hidden = false;
      });
      button.addEventListener("click", () => {
        const expanded = text.classList.toggle("expanded");
        button.textContent = expanded ? "Read less" : "Read more";
        button.setAttribute("aria-expanded", String(expanded));
      });
    });
  });

  safeInit("service filters", () => {
    const tabs = all(".service-tab"), groups = all(".service-group");
    if (!tabs.length || !groups.length) return;
    const select = tab => {
      const index = Number(tab.dataset.category);
      groups.forEach((group, i) => { group.hidden = i !== index; });
      tabs.forEach(item => { const active = item === tab; item.classList.toggle("active", active); item.setAttribute("aria-selected", String(active)); });
    };
    tabs.forEach(tab => tab.addEventListener("click", () => select(tab)));
    select(tabs.find(tab => tab.getAttribute("aria-selected") === "true") || tabs[0]);
  });

  safeInit("gallery filters and lightbox", () => {
    const gallery = one(".gallery-grid"), lightbox = one("#lightbox");
    const image = one("#lightbox-image"), caption = one("#lightbox-caption");
    if (!gallery) return;
    let currentCard = null, touchStartX = null;
    const cards = () => all(".gallery-card", gallery);
    const visibleCards = () => cards().filter(card => !card.hidden);
    const close = () => { if (!lightbox) return; lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); };
    const show = card => {
      if (!card || !image || !lightbox) return;
      currentCard = card;
      const src = card.dataset.photo || "", alt = card.dataset.alt || "Salon hair or beauty service";
      image.style.display = "block"; image.parentElement.classList.remove("fallback-tile");
      image.onerror = () => { image.style.display = "none"; image.parentElement.classList.add("fallback-tile"); };
      image.src = src; image.alt = alt;
      const ash = src.includes("ash-blonde-balayage");
      image.style.aspectRatio = ash ? "1 / 1" : "3 / 4";
      image.style.objectFit = ash ? "cover" : "contain";
      image.style.objectPosition = ash ? "top" : "center";
      if (caption) caption.textContent = card.dataset.gallery || alt;
      lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false");
    };
    const move = step => {
      const visible = visibleCards(); if (!visible.length) return;
      let index = visible.indexOf(currentCard); if (index < 0) index = 0;
      show(visible[(index + step + visible.length) % visible.length]);
    };
    gallery.addEventListener("click", event => {
      const card = event.target.closest(".gallery-card");
      if (card && gallery.contains(card) && !card.hidden) show(card);
    });
    all(".gallery-filter").forEach(button => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      all(".gallery-filter").forEach(item => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
      cards().forEach(card => { card.hidden = card.dataset.category !== filter; });
      close();
    }));
    const closeButton = one(".lightbox-close", lightbox), previous = one(".lightbox-prev", lightbox), next = one(".lightbox-next", lightbox);
    if (closeButton) closeButton.addEventListener("click", close);
    if (previous) previous.addEventListener("click", () => move(-1));
    if (next) next.addEventListener("click", () => move(1));
    if (lightbox) {
      lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
      lightbox.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0]?.clientX ?? null; }, { passive: true });
      lightbox.addEventListener("touchend", event => {
        if (touchStartX === null) return;
        const dx = event.changedTouches[0].clientX - touchStartX; touchStartX = null;
        if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1);
      }, { passive: true });
    }
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") close();
      if (!lightbox?.classList.contains("open")) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });
    const colour = one('.gallery-filter[data-filter="colour"]');
    if (colour) colour.click();
  });

  safeInit("local-time opening status", () => {
    const year = one("#year"); if (year) year.textContent = String(new Date().getFullYear());
    const status = one("#open-status"); if (!status) return;
    const hours = Array.isArray(cfg.hours) ? cfg.hours : [];
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: cfg.timezone || "America/Toronto", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[values.weekday], minutes = Number(values.hour) * 60 + Number(values.minute);
    const today = hours.find(item => Array.isArray(item.dayIndexes) && item.dayIndexes.includes(day));
    const parse = time => { const [h, m] = String(time || "").split(":").map(Number); return (h || 0) * 60 + (m || 0); };
    status.textContent = today && minutes >= parse(today.open) && minutes < parse(today.close) ? "Open now" : "Closed now";
    status.setAttribute("aria-label", status.textContent + ", local salon time");
  });

  safeInit("hero motion", () => {
    const hero = one(".hero"), heroImage = one(".hero-bg");
    if (!hero || !heroImage || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 767px)").matches) return;
    hero.addEventListener("pointermove", event => {
      const rect = hero.getBoundingClientRect(), x = (event.clientX - rect.left) / rect.width - .5, y = (event.clientY - rect.top) / rect.height - .5;
      heroImage.style.transform = `scale(1.04) translate3d(${-x * 8}px,${-y * 6}px,0)`;
    });
    hero.addEventListener("pointerleave", () => { heroImage.style.transform = "scale(1.025)"; });
  });
})();