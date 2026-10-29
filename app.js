(() => {
  "use strict";
  const cfg = window.SALON_CONFIG || {};
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safeInit = (name, init) => { try { init(); } catch (error) { console.error("[Ryan's Salon] " + name + " initialization failed:", error); } };


  safeInit("neon intro", () => {
    const overlay = one(".neon-intro");
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { if (overlay) overlay.remove(); return; }
    let seen = false;
    try { seen = sessionStorage.getItem("ryanSalonNeonIntroSeen") === "1"; } catch (_) {}
    const remove = () => { overlay.classList.add("is-wiping"); window.setTimeout(() => { overlay.classList.add("is-hidden"); overlay.remove(); document.body.classList.remove("intro-playing"); }, 520); };
    if (seen) { overlay.remove(); return; }
    document.body.classList.add("intro-playing");
    try { sessionStorage.setItem("ryanSalonNeonIntroSeen", "1"); } catch (_) {}
    overlay.addEventListener("click", remove, { once: true });
    window.setTimeout(remove, 2200);
    window.setTimeout(() => { if (overlay.isConnected) { overlay.classList.add("is-hidden"); overlay.remove(); document.body.classList.remove("intro-playing"); } }, 3500);
  });
  safeInit("hero coverflow", () => {
    const gallery = one(".hero-gallery"); if (!gallery) return;
    const cards = all(".hero-photo-card", gallery), dots = all("[data-hero-dot]", gallery);
    if (!cards.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = 0, timer = 0, touchedAt = 0, pointerStart = null;
    const mobile = () => window.matchMedia("(max-width: 767px)").matches;
    const apply = () => {
      cards.forEach((card,i) => {
        const rel = (i-active+cards.length)%cards.length;
        card.classList.toggle("is-active",i===active);
        if(mobile()) {
          const offsets=[0,1,-1,2,-2]; const pos=offsets.indexOf(rel);
          const x=pos===0?0:pos===1?56:pos===2?-56:pos===3?100:-100;
          const scale=pos===0?1:pos===1||pos===2?.82:.68;
          const rot=pos===0?0:pos===1?12:pos===2?-12:pos===3?22:-22;
          card.style.setProperty("--tx",x+"%");card.style.setProperty("--cs",scale);card.style.setProperty("--rz",rot+"deg");
          card.style.opacity=pos<3?"1":".72";card.style.zIndex=String(8-pos);
        } else {
          const positions=[{x:-68,z:45,s:1,r:-7},{x:138,z:-100,s:.78,r:9},{x:92,z:-35,s:.87,r:-2},{x:-126,z:-95,s:.76,r:4},{x:25,z:-145,s:.7,r:3}];
          const p=positions[i];card.style.setProperty("--tx",p.x+"px");card.style.setProperty("--tz",p.z+"px");card.style.setProperty("--cs",p.s);card.style.setProperty("--rz",p.r+"deg");card.style.opacity="1";
        }
      });
      dots.forEach((dot,i)=>dot.classList.toggle("active",i===active));
    };
    const advance=()=>{if(Date.now()-touchedAt<6000)return;active=(active+1)%cards.length;apply();};
    const start=()=>{if(timer)clearInterval(timer);if(!reduced)timer=setInterval(advance,mobile()?3000:3500);};
    dots.forEach(dot=>dot.addEventListener("click",()=>{active=Number(dot.dataset.heroDot)||0;touchedAt=Date.now();apply();}));
    gallery.addEventListener("touchstart",e=>{pointerStart=e.changedTouches[0]?.clientX??null;touchedAt=Date.now();},{passive:true});
    gallery.addEventListener("touchend",e=>{if(pointerStart===null)return;const dx=e.changedTouches[0].clientX-pointerStart;pointerStart=null;if(Math.abs(dx)>35){active=(active+(dx<0?1:cards.length-1))%cards.length;apply();}touchedAt=Date.now();},{passive:true});
    gallery.addEventListener("mouseenter",()=>{if(timer)clearInterval(timer);});
    gallery.addEventListener("mouseleave",start);
    window.addEventListener("resize",apply);
    apply();start();
    if(window.matchMedia("(hover:hover) and (pointer:fine) and (min-width:768px)").matches&&!reduced){
      gallery.addEventListener("pointermove",e=>{const r=gallery.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gallery.style.transform="rotateY("+(-x*8)+"deg) rotateX("+(y*5)+"deg)";});
      gallery.addEventListener("pointerleave",()=>{gallery.style.transform="";});
    }
  });
  safeInit("rotating hero reviews", () => {
    const line=one(".hero-review-line");if(!line)return;
    const items=[
      {quote:"The color turned out exactly how I imagined, I love it so much.",name:"Mary Joy R."},
      {quote:"The best in the city!",name:"Viraj P."},
      {quote:"Excellent service.",name:"Naman G."}
    ];
    let index=0;const q=one(".hero-review-quote",line),n=one(".hero-review-name",line);if(!q||!n)return;
    window.setInterval(()=>{line.classList.add("is-fading");window.setTimeout(()=>{index=(index+1)%items.length;q.textContent="“"+items[index].quote+"”";n.textContent=items[index].name;line.classList.remove("is-fading");},260);},4000);
  });
  safeInit("sticky call bar visibility", () => {
    const bar=one(".mobile-cta"),heroButtons=one(".hero-actions");if(!bar||!heroButtons)return;
    if(!("IntersectionObserver" in window)){bar.classList.remove("cta-hidden");return;}
    bar.classList.add("cta-hidden");
    const observer=new IntersectionObserver(entries=>{bar.classList.toggle("cta-hidden",entries[0].isIntersecting);});
    observer.observe(heroButtons);
  });
  safeInit("header scroll state", () => {
    const header=one(".nav-wrap");if(!header)return;
    const update=()=>header.classList.toggle("scrolled",window.scrollY>40);
    update();window.addEventListener("scroll",update,{passive:true});
  });
\n  safeInit("mobile navigation", () => {
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