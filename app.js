(() => {
  "use strict";
  const cfg = window.SALON_CONFIG || {};
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const safeInit = (name, init) => { try { init(); } catch (error) { console.error("[Ryan's Salon] " + name + " initialization failed:", error); } };


  safeInit("neon intro", () => {
    const overlay = one(".neon-intro");
    if (document.body.classList.contains("barbers-document")) { if (overlay) overlay.remove(); return; }
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
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = () => mobileQuery.matches;
    let active=0,timer=0,pauseUntil=0,drag=null,raf=0,visible=true;
    let hintsSeen=false; try { hintsSeen=sessionStorage.getItem("ryanSalonMobileSwipeSeen")==="1"; } catch (_) {}
    if(hintsSeen) gallery.classList.add("hints-hidden");
    const wrap=n=>(n%cards.length+cards.length)%cards.length;
    const signedOffset=i=>{let d=wrap(i-active);if(d>cards.length/2)d-=cards.length;return d;};
    const apply=(dragPx=0,live=false)=>{
      cards.forEach((card,i)=>{
        const d=signedOffset(i),ad=Math.abs(d),dragProgress=live?dragPx/Math.max(1,gallery.clientWidth):0;
        const effective=d-dragProgress,ae=Math.abs(effective);
        const x=effective*58, z=-ae*90, ry=reducedQuery.matches?0:effective*-38, scale=1-ae*.1;
        card.classList.toggle("is-active",i===active);
        card.style.setProperty("--slot-x",(d*58)+"%");
        card.style.setProperty("--drag-x",live?dragPx+"px":"0px");
        card.style.setProperty("--slot-z",z+"px");
        card.style.setProperty("--slot-ry",ry+"deg");
        card.style.setProperty("--slot-scale",String(scale));
        card.style.opacity=ad===0?"1":ad===1?".85":ad===2?".5":"0";
        card.style.visibility=ad>2?"hidden":"visible";
        card.style.zIndex=String(20-ad);
        card.style.willChange=(ad===0||(live&&ad===1))?"transform, opacity":"auto";
        if(reducedQuery.matches){card.style.setProperty("--slot-x",d===0?"0%":"0%");card.style.setProperty("--slot-z","0px");card.style.setProperty("--slot-ry","0deg");card.style.opacity=d===0?"1":"0";card.style.visibility=d===0?"visible":"hidden";}
      });
      dots.forEach((dot,i)=>{dot.classList.toggle("active",i===active);dot.setAttribute("aria-current",i===active?"true":"false");});
    };
    const pause=()=>{pauseUntil=Date.now()+8000;};
    const advance=step=>{active=wrap(active+step);apply();};
    const stop=()=>{if(timer){clearInterval(timer);timer=0;}};
    const start=()=>{stop();if(!mobile()||reducedQuery.matches)return;timer=setInterval(()=>{if(visible&&Date.now()>=pauseUntil)advance(1);},3200);};
    const hideHints=()=>{gallery.classList.add("hints-hidden");try{sessionStorage.setItem("ryanSalonMobileSwipeSeen","1");}catch(_){}};
    dots.forEach(dot=>dot.addEventListener("click",()=>{pause();active=wrap(Number(dot.dataset.heroDot)||0);apply();}));
    const prev=one(".mobile-carousel-prev",gallery),next=one(".mobile-carousel-next",gallery);
    if(prev)prev.addEventListener("click",()=>{pause();advance(-1);});
    if(next)next.addEventListener("click",()=>{pause();advance(1);});
    gallery.addEventListener("pointerdown",e=>{if(!mobile()||e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastT:performance.now(),velocity:0,moved:false};pause();try{gallery.setPointerCapture(e.pointerId);}catch(_){};});
    gallery.addEventListener("pointermove",e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.abs(dx)<6&&Math.abs(dy)>Math.abs(dx))return;if(Math.abs(dx)>5)drag.moved=true;const now=performance.now(),dt=Math.max(1,now-drag.lastT);drag.velocity=(e.clientX-drag.lastX)/dt;drag.lastX=e.clientX;drag.lastT=now;if(!drag.moved||reducedQuery.matches)return;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;apply(dx,true);});});
    const finish=e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,velocity=drag.velocity,wasDrag=drag.moved;drag=null;if(wasDrag){hideHints();if(!reducedQuery.matches){let step=Math.round(-dx/Math.max(1,gallery.clientWidth*.58));if(Math.abs(velocity)>.45)step=velocity<0?Math.max(1,step):Math.min(-1,step);if(step===0&&Math.abs(dx)>30)step=dx<0?1:-1;if(step)advance(step);}else{active=wrap(active+(dx<0?1:dx>0?-1:0));apply();}}else{const card=e.target.closest(".hero-photo-card");if(card){const idx=Number(card.dataset.heroCard);if(Number.isFinite(idx)&&idx!==active){active=wrap(idx);apply();}}}apply();};
    gallery.addEventListener("pointerup",finish);gallery.addEventListener("pointercancel",finish);
    gallery.addEventListener("click",e=>{if(drag)return;const card=e.target.closest(".hero-photo-card");if(card&&Number(card.dataset.heroCard)!==active){pause();active=wrap(Number(card.dataset.heroCard));apply();}});
    if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>{visible=Boolean(entries[0]&&entries[0].isIntersecting);});observer.observe(gallery);}
    else visible=true;
    window.addEventListener("resize",()=>{apply();start();});
    if(reducedQuery.addEventListener)reducedQuery.addEventListener("change",()=>{apply();start();});
    apply();start();
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
    const phoneDigits = String(cfg.phone || "4167411721").replace(/\D/g, "");
    const tel = "tel:+" + (phoneDigits.length === 10 ? "1" + phoneDigits : phoneDigits);
    all("[data-booking-link]").forEach(link => {
      link.href = bookingUrl || tel;
      if (bookingUrl) {
        if (link.matches(".hero-primary-cta")) {
          const mobileLabel = one(".hero-call-mobile-label", link), desktopLabel = one(".hero-call-desktop-label", link);
          if (mobileLabel) mobileLabel.textContent = "Book Now";
          if (desktopLabel) { const icon = one("svg", desktopLabel); desktopLabel.replaceChildren(...(icon ? [icon, document.createTextNode("Book Now")] : [document.createTextNode("Book Now")])); }
        } else link.textContent = "Book Now";
        link.target = "_blank"; link.rel = "noopener";
      } else {
        if (link.matches(".hero-primary-cta")) {
          const mobileLabel = one(".hero-call-mobile-label", link), desktopLabel = one(".hero-call-desktop-label", link);
          if (mobileLabel) mobileLabel.textContent = "Call to Book";
          if (desktopLabel) { const icon = one("svg", desktopLabel); desktopLabel.replaceChildren(...(icon ? [icon, document.createTextNode("Call (416) 741-1721")] : [document.createTextNode("Call (416) 741-1721")])); }
        } else link.textContent = "Call to Book";
        link.removeAttribute("target"); link.removeAttribute("rel");
      }
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
    const formatClock = value => {
      const [h, m] = String(value || "09:00").split(":").map(Number);
      const hour = h % 12 || 12;
      return hour + (m ? ":" + String(m).padStart(2, "0") : "") + (h >= 12 ? " PM" : " AM");
    };
    const nextOpen = () => {
      for (let offset = 1; offset <= 7; offset++) {
        const dayIndex = (day + offset) % 7;
        const next = hours.find(item => Array.isArray(item.dayIndexes) && item.dayIndexes.includes(dayIndex));
        if (next) return offset === 1 ? "tomorrow " + formatClock(next.open) : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] + " " + formatClock(next.open);
      }
      return "soon";
    };
    const isOpen = Boolean(today && minutes >= parse(today.open) && minutes < parse(today.close));
    status.textContent = isOpen ? "Open now · until " + formatClock(today.close) : "Closed · opens " + (today && minutes < parse(today.open) ? formatClock(today.open) : nextOpen());
    status.setAttribute("aria-label", status.textContent + ", local salon time");
    const meta = status.closest(".hero-meta"); if (meta) meta.classList.toggle("is-closed", !isOpen);
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

  safeInit("desktop wall motion", () => {
    const wall=one(".desktop-photo-wall"),tilt=one(".desktop-photo-wall .wall-tilt"),hero=one(".hero");
    if(!wall||!tilt||!hero||!window.matchMedia("(min-width:768px)").matches)return;
    all(".desktop-photo-wall .wall-column").forEach(column=>{const img=column.querySelector(".wall-card:not([aria-hidden='true']) img");if(img)img.loading="eager";});
    if(window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;
    try{
      if(window.matchMedia("(pointer:fine)").matches){
        let raf=0,px=0,py=0;
        wall.addEventListener("pointermove",event=>{const r=wall.getBoundingClientRect();px=((event.clientX-r.left)/Math.max(1,r.width)-.5)*24;py=((event.clientY-r.top)/Math.max(1,r.height)-.5)*16;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;tilt.style.setProperty("--wall-x",px+"px");tilt.style.setProperty("--wall-y",py+"px");});},{passive:true});
        wall.addEventListener("pointerleave",()=>{tilt.style.setProperty("--wall-x","0px");tilt.style.setProperty("--wall-y","0px");});
        let spotRaf=0,spotX=50,spotY=50;
        hero.addEventListener("pointermove",event=>{const r=hero.getBoundingClientRect();spotX=((event.clientX-r.left)/Math.max(1,r.width))*100;spotY=((event.clientY-r.top)/Math.max(1,r.height))*100;if(spotRaf)return;spotRaf=requestAnimationFrame(()=>{spotRaf=0;hero.style.setProperty("--spot-x",spotX+"%");hero.style.setProperty("--spot-y",spotY+"%");});},{passive:true});
        const cta=one(".hero-primary-cta");if(cta){cta.addEventListener("pointermove",event=>{const r=cta.getBoundingClientRect(),x=(event.clientX-r.left)/Math.max(1,r.width)-.5;cta.style.setProperty("--mag-x",x*12+"px");cta.style.setProperty("--mag-y",Math.abs(x)*-3+"px");},{passive:true});cta.addEventListener("pointerleave",()=>{cta.style.setProperty("--mag-x","0px");cta.style.setProperty("--mag-y","0px");});}
      }
    }catch(error){console.error("[Ryan's Salon] desktop pointer motion failed:",error);}
    try{let raf=0;const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<window.innerHeight){const y=window.scrollY*.12;tilt.style.transform="rotateY(-14deg) rotateZ(5deg) scale(1.08) translate3d(var(--wall-x,0px),calc(var(--wall-y,0px) + "+y+"px),0)";}});};window.addEventListener("scroll",onScroll,{passive:true});}catch(error){console.error("[Ryan's Salon] desktop scroll parallax failed:",error);}
  });


  safeInit("location tabs and deferred map", () => {
    const tabs=all("[data-location-tab]"),panels=all("[data-location-panel]");document.body.classList.add("locations-ready");
    const select=id=>{tabs.forEach(tab=>{const active=tab.dataset.locationTab===id;tab.classList.toggle("active",active);tab.setAttribute("aria-selected",String(active));});panels.forEach(panel=>{const active=panel.dataset.locationPanel===id;panel.hidden=!active;panel.classList.toggle("active",active);if(active){const frame=one("iframe[data-src]",panel);if(frame&&!frame.getAttribute("src"))frame.setAttribute("src",frame.dataset.src);}});};
    tabs.forEach(tab=>tab.addEventListener("click",()=>select(tab.dataset.locationTab)));
    if(window.matchMedia("(min-width:768px)").matches){panels.forEach(panel=>{panel.hidden=false;const frame=one("iframe[data-src]",panel);if(frame&&!frame.getAttribute("src"))frame.setAttribute("src",frame.dataset.src);});}else select("albion");
  });
  safeInit("owner portrait motion", () => {
    const panel=one(".owner-photo-panel"),portrait=one(".owner-photo-panel img");
    if(!panel||!portrait)return;
    if(window.matchMedia("(prefers-reduced-motion:reduce)").matches){panel.classList.add("is-visible");return;}
    try{if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){panel.classList.add("is-visible");observer.disconnect();}}),{threshold:.18});observer.observe(panel);}else panel.classList.add("is-visible");}catch(error){panel.classList.add("is-visible");console.error("[Ryan's Salon] owner reveal failed:",error);}
    try{if(window.matchMedia("(pointer:fine)").matches){panel.addEventListener("pointermove",event=>{const r=panel.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;panel.style.setProperty("--tilt-x",(-y*6)+"deg");panel.style.setProperty("--tilt-y",(x*6)+"deg");portrait.style.transform="translate3d("+(-x*5)+"px,"+(-y*4)+"px,0)";});panel.addEventListener("pointerleave",()=>{panel.style.setProperty("--tilt-x","0deg");panel.style.setProperty("--tilt-y","0deg");portrait.style.transform="translate3d(0,0,0)";});}}catch(error){console.error("[Ryan's Salon] owner pointer motion failed:",error);}
  });

  safeInit("progressive scroll reveal", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = all(".barbers-page .barbers-heading,.barbers-page .barber-card,.barbers-page .barber-closing,.section-heading,.service,.review-card");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove("motion-pending"); entry.target.classList.add("motion-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    targets.forEach(target => { target.classList.add("motion-reveal","motion-pending"); observer.observe(target); });
  });
  safeInit("desktop card tilt", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer:fine) and (min-width:1200px)").matches) return;
    const cards = all(".barber-card,.service,.review-card");
    cards.forEach(card => {
      if (!card) return;
      card.addEventListener("pointermove", event => {
        const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/Math.max(1,r.width)-.5,y=(event.clientY-r.top)/Math.max(1,r.height)-.5;
        card.style.setProperty("--card-tilt-x",(-y*8)+"deg");card.style.setProperty("--card-tilt-y",(x*8)+"deg");
        card.style.setProperty("--sheen-shift",(((x+.5)*200)-100)+"%");
      },{passive:true});
      card.addEventListener("pointerleave",()=>{card.style.setProperty("--card-tilt-x","0deg");card.style.setProperty("--card-tilt-y","0deg");card.style.setProperty("--sheen-shift","-100%");});
    });
  });
  safeInit("desktop side ornaments", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer:fine) and (min-width:1200px)").matches) return;
    const freeMargin=(window.innerWidth-1160)/2;if(freeMargin<120)return;
    const layer=document.createElement("div");layer.className="side-ornaments";layer.setAttribute("aria-hidden","true");
    layer.innerHTML='<span class="ornament left-one"></span><span class="ornament left-two shard"></span><span class="ornament right-one shard"></span><span class="ornament right-two"></span>';
    document.body.appendChild(layer);
    const shapes=all(".ornament",layer);let raf=0;
    const update=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const y=window.scrollY*.08;shapes.forEach((shape,i)=>{const direction=i%2? -1:1;shape.style.setProperty("--parallax-y",(y*direction)+"px");});});};
    update();window.addEventListener("scroll",update,{passive:true});
  });

})();