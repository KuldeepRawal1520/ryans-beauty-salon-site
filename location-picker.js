/* Location chooser: progressive enhancement only, preview branch. */
(function(){
"use strict";
const root=document.documentElement, cfg=window.SALON_CONFIG||{}, locations=Array.isArray(cfg.locations)?cfg.locations:[];
const valid=id=>id==="albion"||id==="woodbridge";
const byId=id=>locations.find(x=>x.id===id);
const get=()=>valid(root.dataset.location)?root.dataset.location:null;
const icon='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const all=(s,r=document)=>Array.from(r.querySelectorAll(s));
const one=(s,r=document)=>r.querySelector(s);
const safe=(label,fn)=>{try{fn()}catch(e){console.error("[Ryan's Salon] "+label+" failed:",e)}};
const setText=(s,v)=>{const n=one(s);if(n)n.textContent=v};
const setLink=(s,href)=>{const n=one(s);if(n)n.setAttribute("href",href)};
let chooser=null,returnFocus=null,opening=false;
function status(loc){
 try{
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Toronto",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
  const value=k=>(parts.find(p=>p.type===k)||{}).value||"";
  const day=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(value("weekday"));
  const minutes=Number(value("hour"))*60+Number(value("minute"));
  const item=Array.isArray(loc.weekly)?loc.weekly.find(x=>x.day===day):null;
  if(!item)return null;
  if(item.closed)return "Closed now";
  const mins=x=>{const a=x.split(":").map(Number);return a[0]*60+a[1]};
  return minutes>=mins(item.open)&&minutes<mins(item.close)?"Open now":"Closed now";
 }catch(e){return null}
}
function apply(){
 const id=get(),loc=byId(id);
 if(!loc)return;
 safe("location contact",()=>{
  all(".location-change-name").forEach(n=>n.textContent=loc.label);
  all(".nav-book,.mobile-menu-book,.mobile-cta a,.footer-main a[data-booking-link],.service-call,.hero-primary-cta").forEach(n=>n.setAttribute("href","tel:"+loc.tel));
  all(".nav-call-desktop-label").forEach(n=>n.textContent="Call "+loc.phone);
  all(".hero-call-desktop-label").forEach(n=>{const svg=one("svg",n);n.textContent="Call "+loc.phone;if(svg)n.prepend(svg)});
  const eyebrow=one(".hero-copy .eyebrow");if(eyebrow){const dot=one(".hero-eyebrow-dot",eyebrow);eyebrow.textContent=loc.address;if(dot)eyebrow.prepend(dot);}
  const foot=one(".footer-main p");if(foot){foot.textContent="Bold hair. Beautiful details.";foot.appendChild(document.createElement("br"));foot.appendChild(document.createTextNode(loc.address));}
  const label=one(".footer-bottom > span:last-of-type");if(label)label.textContent=loc.label.toUpperCase();
  const mobile=one(".hero-call-mobile-label");if(mobile)mobile.textContent="Call "+loc.phone;
  setLink(".service-barbers",id==="albion"?"/albion-barbers.html":"/barbers.html");
  const prodCall=one(".products-booking .button");if(prodCall)prodCall.href="tel:"+loc.tel;
  setText(".products-phone-note",loc.label+": "+loc.phone);
  const statusText=status(loc);if(statusText)setText("#open-status",statusText);const meta=one(".hero-meta > span:last-child");if(meta)meta.textContent=loc.address.split(",")[0];
 });
 safe("location services",()=>{
  const independent=one('#services .service-tab[data-category="2"]');
  if(independent)independent.hidden=id==="woodbridge";
  const panel=one("#services .independent-panel");
  if(panel&&id==="woodbridge")panel.hidden=true;
  const tabs=all("#services .service-tab");
  if(id==="woodbridge"&&tabs[2]&&tabs[2].classList.contains("active"))tabs[0].click();
  const men=tabs[0];if(men&&id==="woodbridge"&&tabs[2]&&tabs[2].getAttribute("aria-selected")==="true")men.click();
 });
 safe("location visit",()=>{
  const tabs=one(".location-tabs");if(tabs)tabs.hidden=true;
  all(".location-panel").forEach(p=>{const match=p.dataset.locationPanel===id;p.hidden=!match;p.classList.toggle("active",match);if(match){const f=one("iframe[data-src]",p);if(f&&!f.src)f.src=f.dataset.src;}});
  const note=one(".hours-note");if(note)note.hidden=id!=="albion";
 });
}
function setLocation(id){
 if(!valid(id)||!byId(id))return;
 try{sessionStorage.setItem("ryanSalonLocation",id)}catch(e){}
 root.dataset.location=id;apply();
 window.scrollTo({top:0,behavior:"instant"});
 const hero=one(".hero");if(hero){hero.classList.remove("location-hero-enter");void hero.offsetWidth;hero.classList.add("location-hero-enter");}
 closeChooser(true);
}
function closeChooser(chosen){
 if(!chooser)return;
 const node=chooser;chooser=null;opening=false;
 node.classList.add("is-closing");
 const finish=()=>{node.remove();document.body.classList.remove("location-chooser-open");const main=one("main");if(main)main.removeAttribute("inert");const header=one("header");if(header)header.removeAttribute("inert");if(!chosen&&returnFocus&&returnFocus.isConnected)returnFocus.focus();};
 window.setTimeout(finish,window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:500);
}
function openChooser(force){
 if(chooser||!locations.length)return;
 try{
  opening=true;returnFocus=document.activeElement;
  const node=document.createElement("div");node.className="location-chooser";node.setAttribute("role","dialog");node.setAttribute("aria-modal","true");node.setAttribute("aria-label","Choose your salon");
  const title=document.createElement("div");title.className="location-chooser-inner";
  title.innerHTML='<img class="location-chooser-logo" src="/logo-ryans.png" alt="Ryan\'s Beauty Salon" width="1000" height="300"><p class="eyebrow">Welcome</p><h1>Which salon are you visiting?</h1><p class="location-chooser-subtitle">Choose your location to see hours, barbers and contact details.</p><div class="location-chooser-cards"></div>';
  const grid=one(".location-chooser-cards",title);
  locations.filter(x=>valid(x.id)).forEach(loc=>{
   const btn=document.createElement("button");btn.type="button";btn.className="location-choice-card";btn.dataset.choice=loc.id;
   const heading=document.createElement("strong");heading.textContent=loc.label;
   const address=document.createElement("span");address.textContent=loc.address.split(",").slice(0,2).join(",").replace(" Unit 131","");
   const arrow=document.createElement("span");arrow.innerHTML=icon;arrow.setAttribute("aria-hidden","true");
   btn.append(heading,address,arrow);btn.addEventListener("click",()=>setLocation(loc.id));
   if(window.matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)").matches){
    btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;btn.style.transform="perspective(800px) rotateY("+(x*16)+"deg) rotateX("+(-y*16)+"deg)";btn.style.setProperty("--sheen-x",((x+.5)*100)+"%");});
    btn.addEventListener("pointerleave",()=>{btn.style.transform="";btn.style.removeProperty("--sheen-x")});
   }
   grid.appendChild(btn);
  });
  node.appendChild(title);
  node.addEventListener("keydown",e=>{
   if(e.key==="Escape"&&get()){e.preventDefault();closeChooser(false);return;}
   if(e.key!=="Tab")return;
   const focusable=all("button",node),first=focusable[0],last=focusable[focusable.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
  chooser=node;document.body.appendChild(node);document.body.classList.add("location-chooser-open");
  const main=one("main"),header=one("header");if(main)main.setAttribute("inert","");if(header)header.setAttribute("inert","");
  const first=one("button",node);if(first)first.focus();
  window.setTimeout(()=>{if(chooser===node&&!node.isConnected){chooser=null;document.body.classList.remove("location-chooser-open");if(main)main.removeAttribute("inert");if(header)header.removeAttribute("inert");}},4500);
 }catch(e){
  console.error("[Ryan's Salon] location chooser failed:",e);
  if(chooser)chooser.remove();chooser=null;opening=false;document.body.classList.remove("location-chooser-open");
  const main=one("main"),header=one("header");if(main)main.removeAttribute("inert");if(header)header.removeAttribute("inert");
 }
}
safe("location boot",()=>{
 const id=get();if(id)apply();
 all(".location-change").forEach(btn=>btn.addEventListener("click",()=>{if(location.pathname==="/"||location.pathname.endsWith("/index.html"))openChooser(true);else location.assign("/?change=1")}));
 if(!one("#home"))return;
 const params=new URLSearchParams(location.search),change=params.get("change")==="1";
 if(!id||change){
  const intro=one(".neon-intro");
  if(intro&&intro.isConnected){const observer=new MutationObserver(()=>{if(!intro.isConnected){observer.disconnect();openChooser(change)}});observer.observe(document.body,{childList:true,subtree:true});window.setTimeout(()=>{observer.disconnect();openChooser(change)},4200);}
  else openChooser(change);
 }
});
})();
