/*
 * 2human website: behaviour, in plain JavaScript (the React build's hooks, framer-motion and Radix, ported).
 * - reveals: [data-m] elements animate in when their [data-inview] group is 100px inside the viewport (once), or on load
 * - header: glass bar after 50px of scroll; mobile menu; smooth scroll to sections; the logo goes home / to the top
 * - Mission diagram: the connecting lines draw in; tooltips on its four boxes (Radix Tooltip, 700 ms delay, above)
 * - FAQ: one open answer at a time (Radix Accordion, single + collapsible)
 * - Contact: the 3-step form (render.js contactInner), sent by contact.js to the admin hub's CRM inbox
 */
(function () {
  var R = window.TWOHUMAN_RENDER, T = window.TWOHUMAN_I18N.en;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- reveals ------------------------------------------------------------------------------------------------------
  function done(el) {   // after the reveal, Tailwind's own transitions (hover etc.) apply again
    var ms = (parseFloat(el.style.getPropertyValue("--m-d")) || 0.3) * 1000 + (parseFloat(el.style.getPropertyValue("--m-t")) || 0) * 1000 + 60;
    clearTimeout(el._mDone); el._mDone = setTimeout(function () { if (el.classList.contains("m-in")) el.classList.add("m-done"); }, ms);
  }
  function show(el) { el.classList.add("m-in"); done(el); }
  function hide(el) { clearTimeout(el._mDone); el.classList.remove("m-done", "m-in"); }
  function members(group) {
    return $$("[data-m]", group).concat(group.hasAttribute("data-m") ? [group] : []).filter(function (el) {
      return el.getAttribute("data-m") !== "mount" && (el.closest("[data-inview]") === group || el === group);
    });
  }
  function revealGroup(group, on) {
    members(group).forEach(on ? show : hide);
    if (on && group.id !== "contact") $$(".line-base", group).forEach(function (l, i) { l.setAttribute("class", "line-base line-animate" + (i ? " delay-" + i : "")); });
  }
  function initReveals(root) {
    var mount = $$('[data-m="mount"]', root);
    requestAnimationFrame(function () { requestAnimationFrame(function () { mount.forEach(show); }); });
    $$("[data-inview]", root).forEach(function (g) {
      var mode = g.getAttribute("data-inview"), repeat = mode === "repeat";
      if (!("IntersectionObserver" in window) || reduce) { revealGroup(g, true); return; }
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { revealGroup(g, true); if (!repeat) io.disconnect(); }
          else if (repeat) revealGroup(g, false);
        });
      }, { rootMargin: mode === "0" ? "0px" : "-100px" });
      io.observe(g);
    });
  }

  // ---- header, menu, scrolling --------------------------------------------------------------------------------------
  var header = $("[data-header]"), menu = $("[data-menu]"), toggle = $("[data-menu-toggle]"), open = false;
  function onScroll() {
    var s = window.scrollY > 50;
    if (header.hasAttribute("data-header-v2")) { header.classList.toggle("is-scrolled", s); return; }
    header.classList.toggle("glass", s); header.classList.toggle("border-b", s); header.classList.toggle("border-border", s);
    header.classList.toggle("shadow-soft", s); header.classList.toggle("py-3", s);
    header.classList.toggle("bg-transparent", !s); header.classList.toggle("py-5", !s);
  }
  function setMenu(o) {
    open = o;
    menu.style.height = o ? menu.scrollHeight + "px" : menu.offsetHeight + "px";
    if (!o) { menu.offsetHeight; menu.style.height = "0px"; }   // from its height back to 0
    menu.style.opacity = o ? "1" : "0";
    toggle.innerHTML = R.icon(o ? "x" : "menu"); toggle.setAttribute("aria-expanded", String(o));
  }
  if (menu) menu.addEventListener("transitionend", function (e) { if (e.propertyName === "height" && open) menu.style.height = "auto"; });
  if (header) { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!open); });

  function goTo(id) {
    var home = location.pathname === "/" || location.pathname === "/index.html";
    var el = document.getElementById(id);
    if (!home && (id === "contact" || !el)) { location.href = "/#" + id; return; }   // the header off the home page
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (open) setMenu(false);
  }
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-goto]");
    if (g) { goTo(g.getAttribute("data-goto")); return; }
    var h = e.target.closest("[data-home]");
    if (h) {
      e.preventDefault();
      if (location.pathname !== "/") location.href = "/"; else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // ---- tooltips (Radix: delayDuration 700, side top, sideOffset 4) ----------------------------------------------------
  var tipEl = null, tipTimer = null;
  function tipShow(trigger) {
    tipHide();
    var wrap = document.createElement("div");
    wrap.setAttribute("data-radix-popper-content-wrapper", "");
    wrap.style.cssText = "position: fixed; left: 0px; top: 0px; min-width: max-content; z-index: 50;";
    wrap.innerHTML = '<div data-side="top" data-align="center" data-state="delayed-open" class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" role="tooltip"><p>' +
      R.esc(trigger.getAttribute("data-tooltip")) + "</p></div>";
    document.body.appendChild(wrap);
    var r = trigger.getBoundingClientRect(), w = wrap.offsetWidth, h = wrap.offsetHeight;
    wrap.style.transform = "translate(" + Math.round(r.left + r.width / 2 - w / 2) + "px, " + Math.round(r.top - h - 4) + "px)";
    tipEl = wrap;
  }
  function tipHide() { clearTimeout(tipTimer); if (tipEl) { tipEl.remove(); tipEl = null; } }
  $$("[data-tooltip]").forEach(function (t) {
    t.addEventListener("mouseenter", function () { clearTimeout(tipTimer); tipTimer = setTimeout(function () { tipShow(t); }, 700); });
    t.addEventListener("mouseleave", tipHide);
    t.addEventListener("focus", function () { tipShow(t); });
    t.addEventListener("blur", tipHide);
    t.addEventListener("click", tipHide);
  });
  window.addEventListener("scroll", tipHide, { passive: true });

  // ---- FAQ accordion ------------------------------------------------------------------------------------------------
  function setItem(item, on) {
    var trig = $("[data-acc-trigger]", item), content = $("[data-acc-content]", item), h3 = $("h3", item), st = on ? "open" : "closed";
    [item, h3, trig, content].forEach(function (x) { x.setAttribute("data-state", st); });
    trig.setAttribute("aria-expanded", String(on));
    if (on) {
      content.hidden = false;
      content.style.setProperty("--radix-collapsible-content-height", content.scrollHeight + "px");
      content.style.setProperty("--radix-collapsible-content-width", content.scrollWidth + "px");
    } else {
      content.style.setProperty("--radix-collapsible-content-height", content.scrollHeight + "px");
      var end = function () { if (content.getAttribute("data-state") === "closed") content.hidden = true; content.removeEventListener("animationend", end); };
      content.addEventListener("animationend", end);
      if (reduce) end();
    }
  }
  $$("[data-acc-trigger]").forEach(function (trig) {
    trig.addEventListener("click", function () {
      var item = trig.closest("[data-acc-item]"), wasOpen = item.getAttribute("data-state") === "open";
      $$("[data-acc-item]", trig.closest("[data-accordion]")).forEach(function (it) { if (it !== item && it.getAttribute("data-state") === "open") setItem(it, false); });
      setItem(item, !wasOpen);
    });
  });

  // ---- contact form -------------------------------------------------------------------------------------------------
  var C = T.contact, root = $("[data-contact-root]"), v2 = !!root && root.getAttribute("data-contact-skin") === "v2";
  var inner = v2 ? R.contactInner2 : R.contactInner;
  var st = { step: "intro", data: {}, errors: {}, consent: false, submitting: false };
  function draw(prevPct) {
    st.prevPct = prevPct;
    root.innerHTML = inner(T, st);
    initReveals(root);
    var bar = $("[data-progress]", root);
    if (bar) requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = bar.getAttribute("data-progress") + "%"; }); });
    var f = $("[data-contact-field]", root); if (f && st.step !== "intro" && st.step !== "done" && document.activeElement && document.activeElement.closest && document.activeElement.closest("[data-contact-root]")) f.focus();
    syncNext();
  }
  function pct() { var bar = $("[data-progress]", root); return bar ? parseFloat(bar.getAttribute("data-progress")) : 0; }
  function canProceed() {
    if (st.step === "details") return C.fields.every(function (f) { return !f.required || (st.data[f.name] || "").trim() !== ""; }) && st.consent;
    var q = C.questions[st.step]; return !!q && (st.data[q.name] || "").trim() !== "";
  }
  function syncNext() { var n = $('[data-contact="next"]', root); if (n) n.disabled = st.submitting || !canProceed(); }
  function validate() {
    var errs = {};
    C.fields.forEach(function (f) {
      var v = (st.data[f.name] || "").trim();
      if (f.required && !v) { errs[f.name] = C.required.replace("{label}", f.label); return; }
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.name] = C.invalidEmail;
    });
    return errs;
  }
  function toast() {   // shadcn Toast, destructive variant (the home page: its own)
    if (v2) {
      var t2 = document.createElement("div"); t2.className = "toast-box"; t2.setAttribute("role", "status");
      t2.innerHTML = "<b>" + R.esc(C.failedTitle) + "</b>" + R.esc(C.failedText);
      document.body.appendChild(t2); setTimeout(function () { t2.parentNode && t2.parentNode.removeChild(t2); }, 5000); return;
    }
    var box = document.createElement("ol");
    box.className = "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]";
    box.innerHTML = '<li role="status" data-state="open" class="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full destructive border-destructive bg-destructive text-destructive-foreground"><div class="grid gap-1"><div class="text-sm font-semibold">' +
      R.esc(C.failedTitle) + '</div><div class="text-sm opacity-90">' + R.esc(C.failedText) + "</div></div></li>";
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 5000);
  }
  function submit() {
    var errs = validate(); st.errors = errs;
    if (Object.keys(errs).length || $("[data-contact-honeypot]", root).value) { draw(pct()); return; }
    st.submitting = true; draw(pct());
    var d = st.data, q = C.questions;
    var message = q.map(function (x) { return x.label + "\n" + (d[x.name] || "").trim(); }).join("\n\n");
    window.TWOHUMAN_CONTACT.submit({
      name: ((d.first_name || "").trim() + " " + (d.last_name || "").trim()).trim(),
      email: (d.email || "").trim(), organization: (d.organization || "").trim(), message: message, consent: st.consent
    }).then(function () {
      st.firstName = (d.first_name || "").trim(); st.step = "done"; st.submitting = false; draw();
    }, function (err) {
      if (window.console) console.error("Error submitting form:", err);
      st.submitting = false; draw(pct()); toast();
    });
  }
  if (root) {
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-contact]"); if (!b || b.disabled) return;
      var a = b.getAttribute("data-contact"), was = pct();
      if (a === "start") { st.step = 0; draw(0); }
      else if (a === "exit") { st = { step: "intro", data: {}, errors: {}, consent: false, submitting: false }; draw(); }
      else if (a === "back") { st.errors = {}; st.step = st.step === "details" ? C.questions.length - 1 : Math.max(0, st.step - 1); draw(was); }
      else if (a === "next") {
        if (st.step === "details") submit();
        else { st.step = st.step + 1 >= C.questions.length ? "details" : st.step + 1; draw(was); }
      }
    });
    root.addEventListener("input", function (e) {
      var f = e.target;
      if (f.hasAttribute("data-contact-field")) {
        st.data[f.name] = f.value;
        if (st.errors[f.name]) {   // the error goes as soon as the field changes
          delete st.errors[f.name];
          var p = f.parentNode.querySelector(v2 ? ".err" : ".text-destructive"); if (p) p.parentNode.removeChild(p);
          if (v2) f.classList.toggle("bad", false); else { f.classList.toggle("border-destructive", false); f.classList.add("border-border"); }
        }
      }
      if (f.hasAttribute("data-contact-consent")) st.consent = f.checked;
      syncNext();
    });
    root.addEventListener("change", function (e) { if (e.target.hasAttribute("data-contact-consent")) { st.consent = e.target.checked; syncNext(); } });
  }

  // ---- first-touch attribution for the CRM (docs/contact-inbox.md): kept in this tab only, sent with the form ------
  try {
    if (!sessionStorage.getItem("attribution")) {
      var p = new URLSearchParams(location.search), a = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(function (k) { if (p.get(k)) a[k] = p.get(k).slice(0, 200); });
      a.landing = (location.pathname + location.search).slice(0, 500);
      if (document.referrer) a.referrer = document.referrer.slice(0, 500);
      sessionStorage.setItem("attribution", JSON.stringify(a));
    }
  } catch (e) { /* storage blocked: the form still works without attribution */ }

  // the home page's loop figure: light each step in turn, in time with the runner (8 s a round)
  var nodes = $$("[data-loop-node]");
  if (nodes.length && !reduce) { var k = 0; nodes[0].classList.add("on"); setInterval(function () { nodes[k].classList.toggle("on", false); k = (k + 1) % nodes.length; nodes[k].classList.add("on"); }, 2000); }
  // the team's "Read more": hide the short preview while the full text is open
  $$(".person details").forEach(function (d) { d.addEventListener("toggle", function () { var c = d.parentNode.querySelector(".clip"); if (c) c.classList.toggle("hide", d.open); }); });

  var y = $("[data-year]"); if (y) y.textContent = T.footer.copyright.replace("{year}", new Date().getFullYear());
  initReveals(document);
})();
