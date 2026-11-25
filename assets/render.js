/*
 * 2human website: page templates.
 * Ported 1:1 from the live Lovable site (2-human.com, the 2-human/2h-stack React build, 25 Nov 2026): same markup and
 * the same Tailwind class strings as the rendered components, styled by the live build's compiled CSS (app.css,
 * unchanged). Words come from i18n.js. Used by tools/build-website.mjs to prerender every page, and by site.js for the
 * contact form's steps.
 *
 * Motion: framer-motion's initial/animate pairs become data-m attributes (site.js + site.css): the element starts at
 * its offset (--m-x/--m-y/--m-s/--m-sx) and transparent, and moves to rest when its group comes into view. A group is
 * the nearest [data-inview] ancestor (framer's useInView ref: once, 100px inside the viewport), or "mount" for the
 * animations that run on load.
 */
(function (root) {
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  // fill {{key}} placeholders in an escaped copy string with ready-made HTML
  var fill = function (text, parts) {
    return esc(text).replace(/\{\{(\w+)\}\}/g, function (_, k) { return parts[k] != null ? parts[k] : ""; });
  };

  // BEGIN EXTRACTED SVG (copied from the live 2-human.com DOM on 25 Nov 2026; lucide-react v0.462.0 bodies)
  var ICON_BODY = {
    "menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"></line><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"></line><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"></line>",
    "arrow-right": "<path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path>",
    "search": "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><path d=\"m21 21-4.3-4.3\"></path>",
    "target": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle>",
    "building2": "<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\"></path><path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"></path><path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\"></path><path d=\"M10 6h4\"></path><path d=\"M10 10h4\"></path><path d=\"M10 14h4\"></path><path d=\"M10 18h4\"></path>",
    "package": "<path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\"></path><path d=\"M12 22V12\"></path><path d=\"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7\"></path><path d=\"m7.5 4.27 9 5.15\"></path>",
    "book-open": "<path d=\"M12 7v14\"></path><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\"></path>",
    "gem": "<path d=\"M6 3h12l4 6-10 13L2 9Z\"></path><path d=\"M11 3 8 9l4 13 4-13-3-6\"></path><path d=\"M2 9h20\"></path>",
    "lightbulb": "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"></path><path d=\"M9 18h6\"></path><path d=\"M10 22h4\"></path>",
    "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
    "rocket": "<path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z\"></path><path d=\"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z\"></path><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0\"></path><path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\"></path>",
    "linkedin": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>",
    "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"></path><path d=\"M2 12h20\"></path>",
    "chevron-down": "<path d=\"m6 9 6 6 6-6\"></path>",
    "bot": "<path d=\"M12 8V4H8\"></path><rect width=\"16\" height=\"12\" x=\"4\" y=\"8\" rx=\"2\"></rect><path d=\"M2 14h2\"></path><path d=\"M20 14h2\"></path><path d=\"M15 13v2\"></path><path d=\"M9 13v2\"></path>",
    "shopping-cart": "<circle cx=\"8\" cy=\"21\" r=\"1\"></circle><circle cx=\"19\" cy=\"21\" r=\"1\"></circle><path d=\"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12\"></path>",
    "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"></path>",
    "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"></path>",
    "trending-up": "<polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\"></polyline><polyline points=\"16 7 22 7 22 13\"></polyline>",
    "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"m9 12 2 2 4-4\"></path>",
    "x": "<path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path>",
    "arrow-left": "<path d=\"m12 19-7-7 7-7\"></path><path d=\"M19 12H5\"></path>",
    "check": "<path d=\"M20 6 9 17l-5-5\"></path>",
    "loader-circle": "<path d=\"M21 12a9 9 0 1 1-6.219-8.56\"></path>"
    };
  var icon = function (name, cls, size) {
    var s = size || 24;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-' +
      name + (cls ? " " + cls : "") + '">' + ICON_BODY[name] + "</svg>";
  };

  // data-m: one framer-motion initial -> animate pair. o: { x, y, s (scale), sx (scaleX), o (start opacity, default 0),
  // d (duration s), t (delay s), e ('out' | 'inOut'), g ('mount' starts on load) }; style: the element's own inline style
  var m = function (o, style) {
    var v = [];
    if (o.x) v.push("--m-x:" + o.x + "px");
    if (o.y) v.push("--m-y:" + o.y + "px");
    if (o.s != null) v.push("--m-s:" + o.s);
    if (o.sx != null) v.push("--m-sx:" + o.sx);
    if (o.o != null) v.push("--m-o:" + o.o);
    v.push("--m-d:" + (o.d != null ? o.d : 0.3) + "s");
    if (o.t) v.push("--m-t:" + o.t + "s");
    if (o.e) v.push("--m-e:var(--ease-" + o.e + ")");
    if (style) v.push(style);
    var moves = o.x || o.y || o.s != null || o.sx != null;   // transform only where framer moved it (keeps Tailwind's own)
    return ' data-m' + (o.g ? '="' + o.g + '"' : "") + (moves ? " data-mt" : "") + ' style="' + v.join(";") + '"';
  };

  // shadcn Button class strings exactly as rendered (cva + tailwind-merge resolved), by use
  var BTN_BASE = "items-center justify-center gap-2 whitespace-nowrap";
  var BTN_RING = "ring-offset-background";
  var BTN_FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  var BTN = {
    headerCta: BTN_BASE + " text-sm font-semibold " + BTN_RING + " transition-all duration-200 " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/85 shadow-elevated hover:shadow-soft active:scale-[0.98] h-9 rounded-sm px-3 hidden sm:flex",
    mobileCta: "inline-flex " + BTN_BASE + " text-sm font-semibold " + BTN_RING + " transition-all duration-200 " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/85 shadow-elevated hover:shadow-soft active:scale-[0.98] h-10 px-4 py-2 rounded-sm w-full mt-4",
    mission: "inline-flex " + BTN_BASE + " " + BTN_RING + " transition-all duration-200 " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-full px-8 py-6 text-base font-medium",
    contactStart: "inline-flex " + BTN_BASE + " font-semibold " + BTN_RING + " " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/85 shadow-elevated hover:shadow-soft active:scale-[0.98] h-12 rounded-sm px-8 text-base group mb-6 transition-all duration-300 hover:scale-105",
    contactNext: "inline-flex " + BTN_BASE + " font-semibold " + BTN_RING + " " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/85 shadow-elevated hover:shadow-soft active:scale-[0.98] h-12 rounded-sm px-8 text-base group transition-all duration-200 hover:scale-105",
    contactBack: "inline-flex " + BTN_BASE + " text-sm font-semibold " + BTN_RING + " " + BTN_FOCUS + " hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-sm group transition-all duration-200 hover:scale-105",
    heroPrimary: "inline-flex " + BTN_BASE + " font-semibold " + BTN_RING + " transition-all duration-200 " + BTN_FOCUS + " bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-sm px-8 text-base",
    heroOutline: "inline-flex " + BTN_BASE + " font-semibold " + BTN_RING + " transition-all duration-200 " + BTN_FOCUS + " border-2 border-foreground bg-transparent text-foreground hover:bg-foreground/5 h-12 rounded-sm px-8 text-base"
  };

  // the round "2h" mark (the live Logo component; sm size), default = primary, light = for the dark footer
  var logo = function (variant) {
    var bg = variant === "light" ? "bg-background" : "bg-primary", fg = variant === "light" ? "text-foreground" : "text-primary-foreground";
    return '<div tabindex="0" class="logo-mark"><div class="w-10 h-10 ' + bg + ' rounded-full flex items-center justify-center shadow-elevated relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div><span class="font-display text-lg ' + fg + ' font-semibold tracking-tight -space-x-0.5 flex items-baseline relative z-10"><span>2</span><span class="italic opacity-90">h</span></span></div></div>';
  };

  // ---- shared parts -------------------------------------------------------------------------------------------------
  var header = function (t) {
    var N = t.nav;
    return '<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-5" data-header' + m({ y: -20, d: 0.6, g: "mount" }) + '>' +
      '<div class="container mx-auto px-6 flex items-center justify-between"><a href="/" class="flex items-center gap-3" data-home>' + logo() +
      '<span class="font-display text-xl font-medium text-foreground hidden sm:block">' + esc(N.brand) + '</span></a>' +
      '<nav class="hidden md:flex items-center gap-10">' + N.items.map(function (i) {
        return '<button class="text-sm text-muted-foreground hover:text-foreground transition-colors font-body relative group" data-goto="' + esc(i.id) + '">' + esc(i.label) +
          '<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></button>';
      }).join("") + '</nav>' +
      '<div class="flex items-center gap-4"><button class="' + BTN.headerCta + '" data-goto="contact">' + esc(N.cta) + '</button>' +
      '<button class="md:hidden p-2 text-foreground" data-menu-toggle aria-label="Menu" aria-expanded="false">' + icon("menu") + '</button></div></div>' +
      '<div class="md:hidden overflow-hidden glass border-t border-border" data-menu style="height: 0px; opacity: 0;"><div class="container mx-auto px-6 py-6 space-y-4">' +
      N.items.map(function (i) { return '<button class="block w-full text-left py-2 text-foreground font-body" data-goto="' + esc(i.id) + '">' + esc(i.label) + '</button>'; }).join("") +
      '<button class="' + BTN.mobileCta + '" data-goto="contact">' + esc(N.cta) + '</button></div></div></header>';
  };

  var footer = function (t) {
    var F = t.footer;
    return '<footer class="py-12 bg-foreground text-background"><div class="container mx-auto px-6"><div class="flex flex-col md:flex-row items-center justify-between gap-8">' +
      '<div class="flex items-center gap-4" data-inview="0"' + m({ d: 0.6 }) + '>' + logo("light") + '<span class="font-display text-xl text-background">' + esc(F.brand) + '</span></div>' +
      '<div class="text-sm text-background/60 font-body" data-inview="0"' + m({ d: 0.6, t: 0.1 }) + '><span data-year>' + esc(F.copyright.replace("{year}", new Date().getFullYear())) + '</span></div>' +
      '</div></div></footer>';
  };

  // ---- home page (redesign, 25 Nov 2026): its own markup and styles (home.css) -------------------------------------
  // BEGIN MARK (logo round 1, concept 4: brand/logo-round-1; colours follow --mark-ink / --mark-accent)
  var MARK = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"568 562 915 929\"><path transform=\"translate(0,0)\" fill=\"var(--mark-ink, #14201D)\" d=\"M 832.936 1470.22 C 759.45 1469 690.414 1440.2 643.464 1382.3 C 601.236 1329.82 581.77 1262.61 589.405 1195.69 C 600.988 1092.1 678.311 1007.83 778.173 982.516 C 828.014 970.939 867.115 977.768 910.471 943.715 C 967.662 898.795 983.696 814.769 935.58 756.707 C 913.153 729.966 880.998 713.26 846.224 710.283 C 789.818 705.474 739.562 738.66 720.054 791.412 C 709.941 819.558 713.728 852.343 688.04 873.139 C 663.081 893.345 621.826 888.853 602.005 863.42 C 587.226 844.456 586.53 824.039 589.119 801.223 C 596.24 738.485 629.661 677.073 679.33 637.971 C 732.95 595.396 801.368 576.032 869.346 584.192 C 935.608 592.528 995.114 629.862 1035.63 682.331 C 1077.9 736.713 1096.37 805.878 1086.85 874.091 C 1072.56 980.921 988.639 1066.42 885.687 1093.85 C 839.46 1106.17 804.59 1093.76 763.874 1125.8 C 737.066 1146.9 719.443 1174.45 715.514 1208.7 C 711.611 1241.02 720.913 1273.54 741.311 1298.91 C 761.949 1324.34 789.274 1337.97 821.613 1341.26 C 826.309 1341.68 830.156 1341.97 834.865 1342.05 C 796.324 1360.15 780.656 1399.04 797.41 1440.4 C 805.227 1459.7 817.154 1461.45 832.936 1470.22 z\"/> <path transform=\"translate(0,0)\" fill=\"var(--mark-ink, #14201D)\" d=\"M 947.66 1262.71 C 951.257 1239.3 950.993 1216.35 955.089 1193.52 C 967.379 1128.23 1003.94 1070.02 1057.42 1030.6 C 1175.29 944.79 1332.52 973.436 1414.4 1090.67 C 1467.84 1167.2 1463.06 1240.64 1461.98 1329.58 C 1461.65 1357.85 1463.82 1388.41 1460.61 1416.95 C 1454.28 1473.27 1379.69 1490.97 1347.44 1445.55 C 1333.4 1425.77 1335.88 1398.92 1335.88 1375.53 L 1335.96 1289.09 C 1335.96 1265.22 1337.15 1238.52 1333.46 1215.22 C 1325.26 1163.43 1285.3 1120.35 1233.52 1110.71 C 1158.85 1096.8 1092.04 1142.07 1079.17 1217.1 C 1076.4 1233.2 1076.28 1250.11 1073.5 1265.84 C 1072.98 1264.93 1072.8 1264.76 1072.53 1263.74 C 1060.37 1218.27 987.678 1209.21 959.645 1243.93 C 955.187 1249.45 952.584 1255.18 948.778 1261.01 L 947.66 1262.71 z\"/> <path transform=\"translate(0,0)\" fill=\"var(--mark-accent, #E8A33D)\" d=\"M 947.66 1262.71 L 948.778 1261.01 C 952.584 1255.18 955.187 1249.45 959.645 1243.93 C 987.678 1209.21 1060.37 1218.27 1072.53 1263.74 C 1072.8 1264.76 1072.98 1264.93 1073.5 1265.84 C 1061.42 1334.26 1025.82 1388.47 968.81 1428.29 C 935.682 1451.87 896.849 1466.16 856.337 1469.68 C 852.006 1470.07 836.488 1471.2 832.936 1470.22 C 817.154 1461.45 805.227 1459.7 797.41 1440.4 C 780.656 1399.04 796.324 1360.15 834.865 1342.05 C 830.156 1341.97 826.309 1341.68 821.613 1341.26 C 882.326 1341.03 927.796 1324.54 947.66 1262.71 z\"/></svg>";
  // END MARK
  var mark = function (cls) { return MARK.replace("<svg ", '<svg class="mark' + (cls ? " " + cls : "") + '" aria-hidden="true" focusable="false" '); };
  var glyph = function (body) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>"; };
  var GLYPHS = [
    '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M2 9h20"/><path d="M6 6.5h.01"/><path d="M9 6.5h.01"/>',
    '<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/>'
  ];
  var arrow = glyph('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
  var head = function (eyebrow, title, lead, cls) {
    return '<div class="section-head' + (cls ? " " + cls : "") + '"' + m({ y: 24, d: 0.7 }) + '><span class="eyebrow">' + esc(eyebrow) + '</span><h2>' + esc(title) + '</h2>' + (lead ? '<p>' + esc(lead) + '</p>' : "") + '</div>';
  };

  var header2 = function (t) {
    var N = t.nav;
    return '<a class="skip" href="#main">Skip to content</a><header class="hd" data-header data-header-v2><div class="wrap">' +
      '<a href="/" class="brand" data-home aria-label="' + esc(N.brand) + '">' + mark() + '<span>' + esc(N.brand) + '</span></a>' +
      '<nav aria-label="Main">' + N.items.map(function (i) { return '<button type="button" data-goto="' + esc(i.id) + '">' + esc(i.label) + '</button>'; }).join("") + '</nav>' +
      '<button type="button" class="btn btn-primary btn-sm cta" data-goto="contact">' + esc(N.cta) + '</button>' +
      '<button type="button" class="menu-btn" data-menu-toggle aria-label="Menu" aria-expanded="false">' + icon("menu") + '</button></div>' +
      '<div class="mm" data-menu style="height: 0px; opacity: 0;"><div class="wrap">' + N.items.map(function (i) { return '<button type="button" data-goto="' + esc(i.id) + '">' + esc(i.label) + '</button>'; }).join("") +
      '<button type="button" class="btn btn-primary" data-goto="contact">' + esc(N.cta) + '</button></div></div></header>';
  };

  // the loop figure: four steps on a ring, a runner going round (SVG animateMotion), the current step lit by site.js
  var loopFig = function (names, label) {
    var P = [[200, 50], [350, 200], [200, 350], [50, 200]];   // Discovery top, then clockwise
    return '<div class="loop-fig"' + m({ s: 0.92, d: 1, t: 0.3, g: "mount" }) + '><svg viewBox="0 0 400 400" role="img" aria-label="' + esc(names.join(", ")) + '">' +
      '<circle class="ring" cx="200" cy="200" r="150"/>' +
      '<circle class="arc" cx="200" cy="200" r="150" transform="rotate(-90 200 200)"><animateTransform attributeName="transform" type="rotate" from="-90 200 200" to="270 200 200" dur="8s" repeatCount="indefinite"/></circle>' +
      '<circle class="runner" r="7"><animateMotion dur="8s" repeatCount="indefinite" path="M200,50 a150,150 0 1,1 0,300 a150,150 0 1,1 0,-300"/></circle>' +
      names.map(function (n, i) { return '<g class="node" data-loop-node="' + i + '"><circle cx="' + P[i][0] + '" cy="' + P[i][1] + '" r="50"/><text x="' + P[i][0] + '" y="' + P[i][1] + '">' + esc(n) + '</text></g>'; }).join("") +
      '<text class="core" x="200" y="192">2human</text><text class="core-sub" x="200" y="226">' + esc(label || "") + '</text></svg></div>';
  };

  var home2 = function (t, base) {
    var H = t.hero, E = t.end, L = t.loop, B = t.build, W = t.how, O = t.who, T = t.team, Q = t.faq;
    var title = H.accent ? esc(H.title).replace(esc(H.accent), "<em>" + esc(H.accent) + "</em>") : esc(H.title);
    var link = function (url, label) { return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + arrow + '</a>'; };
    return header2(t) + '<main id="main">' +
      // hero
      '<section class="hero"><div class="wrap"><div>' +
      '<span class="eyebrow"' + m({ y: 16, d: 0.6, t: 0.1, g: "mount" }) + '>' + esc(H.eyebrow) + '</span>' +
      '<h1' + m({ y: 28, d: 0.9, t: 0.2, g: "mount" }) + '>' + title + '</h1>' +
      '<p class="lead"' + m({ y: 20, d: 0.8, t: 0.4, g: "mount" }) + '>' + esc(H.lead) + '</p>' +
      '<div class="ctas"' + m({ y: 16, d: 0.7, t: 0.55, g: "mount" }) + '><button type="button" class="btn btn-primary" data-goto="contact">' + esc(H.primary) + arrow + '</button><button type="button" class="btn btn-ghost" data-goto="approach">' + esc(H.secondary) + '</button></div>' +
      '</div>' + loopFig(H.loop, H.loopLabel) + '</div><div class="scroll-cue" aria-hidden="true"></div></section>' +
      // the end
      '<section class="end" data-inview><div class="wrap"><span class="eyebrow"' + m({ y: 16, d: 0.6 }) + '>' + esc(E.eyebrow) + '</span><h2' + m({ y: 24, d: 0.8, t: 0.1 }) + '>' + esc(E.title) + '</h2><p' + m({ y: 20, d: 0.8, t: 0.25 }) + '>' + esc(E.text) + '</p></div></section>' +
      // approach: the loop
      '<section id="approach" class="section" data-inview><div class="wrap">' + head(L.eyebrow, L.title, L.lead) + '<div class="steps">' + L.steps.map(function (s, i) {
        return '<article class="step"' + m({ y: 28, d: 0.7, t: +(0.1 + i * 0.12).toFixed(2) }) + '><span class="n">0' + (i + 1) + '</span><h3>' + esc(s.name) + '</h3><p class="line">' + esc(s.line) + '</p><ul>' + s.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></article>';
      }).join("") + '</div></div></section>' +
      // what we build
      '<section id="build" class="section build" data-inview><div class="wrap">' + head(B.eyebrow, B.title, B.lead) + '<div class="cards">' + B.items.map(function (c, i) {
        return '<article class="card"' + m({ y: 28, d: 0.7, t: +(0.1 + i * 0.12).toFixed(2) }) + '><div class="glyph">' + glyph(GLYPHS[i]) + '</div><h3>' + esc(c.name) + '</h3><p class="line">' + esc(c.line) + '</p><p class="text">' + esc(c.text) + '</p><ul>' + c.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></article>';
      }).join("") + '</div></div></section>' +
      // how we work
      '<section id="how" class="section" data-inview><div class="wrap">' + head(W.eyebrow, W.title) + '<div class="principles">' + W.items.map(function (p, i) {
        return '<div class="principle"' + m({ y: 20, d: 0.6, t: +(0.08 * i).toFixed(2) }) + '><span class="n">' + (i + 1) + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.text) + '</p></div>';
      }).join("") + '</div></div></section>' +
      // who we work with
      '<section id="who" class="section who" data-inview><div class="wrap">' + head(O.eyebrow, O.title) + '<div class="audiences">' + O.items.map(function (a, i) {
        return '<div class="audience"' + m({ y: 24, d: 0.7, t: +(0.1 + i * 0.12).toFixed(2) }) + '><h3>' + esc(a.name) + '</h3><p>' + esc(a.text) + '</p></div>';
      }).join("") + '</div></div></section>' +
      // team
      '<section id="team" class="section" data-inview><div class="wrap">' + head(T.eyebrow, T.title, T.lead) + '<div class="people">' + T.founders.map(function (f, i) {
        return '<article class="person"' + m({ y: 24, d: 0.7, t: +(0.1 + i * 0.12).toFixed(2) }) + '><div class="top"><img src="' + base + 'assets/img/' + esc(f.photo) + '" alt="' + esc(f.name) + '" width="92" height="92" loading="lazy"><div><h3>' + esc(f.name) + '</h3><p class="role">' + esc(f.role) + '</p></div></div>' +
          '<details><summary>Read more</summary><p class="bio">' + esc(f.description) + '</p></details><p class="clip">' + esc(f.description) + '</p>' +
          '<div class="links">' + link(f.linkedinUrl, T.linkedin) + (f.websiteUrl ? link(f.websiteUrl, T.website) : "") + '</div></article>';
      }).join("") + '</div></div></section>' +
      // faq
      '<section id="faq" class="section build" data-inview><div class="wrap">' + head(Q.eyebrow, Q.title) + '<div class="faq-list"' + m({ y: 20, d: 0.7, t: 0.1 }) + '>' + Q.items.map(function (f) {
        return '<details><summary>' + esc(f.question) + '</summary><p>' + esc(f.answer) + '</p></details>';
      }).join("") + '</div></div></section>' +
      // contact
      '<section id="contact" class="section contact"><div class="wrap" data-contact-root data-contact-skin="v2">' + contactInner2(t, { step: "intro", data: {}, errors: {} }) + '</div></section>' +
      '</main><footer class="ft"><div class="wrap"><a href="/" class="brand" data-home>' + mark() + '<span>' + esc(t.footer.brand) + '</span></a><span data-year>' + esc(t.footer.copyright.replace("{year}", new Date().getFullYear())) + '</span></div></footer>';
  };

  // the contact form in the home page's design: same steps and data-* hooks as contactInner (site.js drives both)
  var contactInner2 = function (t, st) {
    var C = t.contact;
    if (st.step === "done") {
      return '<div class="done"' + m({ s: 0.94, d: 0.5, g: "mount" }) + '><div class="tick">' + glyph('<path d="M20 6 9 17l-5-5"/>') + '</div><h3>' + esc(C.thanks + (st.firstName ? ", " + st.firstName : "")) + '</h3><p>' + esc(C.success) + '</p></div>';
    }
    if (st.step === "intro") {
      return '<div data-inview><span class="eyebrow"' + m({ y: 16, d: 0.6 }) + '>' + esc(C.eyebrow) + '</span><h2' + m({ y: 24, d: 0.7, t: 0.08 }) + '>' + esc(C.title) + '</h2><p class="lead"' + m({ y: 20, d: 0.7, t: 0.16 }) + '>' + esc(C.lead) + '</p>' +
        '<div class="start"' + m({ y: 16, d: 0.6, t: 0.24 }) + '><button type="button" class="btn btn-primary" data-contact="start">' + esc(C.start) + arrow + '</button><p class="note">' + esc(C.responseTime) + '</p></div></div>';
    }
    var Q = C.questions, total = Q.length + 1, idx = st.step === "details" ? Q.length : st.step, pct = (idx + 1) / total * 100, body;
    if (st.step === "details") {
      body = '<div data-contact-pane' + m({ x: 20, d: 0.3, g: "mount" }) + '><h3>' + esc(C.detailsTitle) + '</h3><p class="hint">' + esc(C.detailsLead) + '</p><div class="fields">' + C.fields.map(function (f) {
        var err = st.errors[f.name];
        return '<label class="f"><span>' + esc(f.label) + (f.required ? " *" : "") + '</span><input name="' + f.name + '" type="' + (f.type === "email" ? "email" : "text") + '" maxlength="' + (f.type === "email" ? 255 : 100) + '" value="' + esc(st.data[f.name] || "") + '" data-contact-field' + (err ? ' class="bad"' : "") + (f.type === "email" ? ' autocomplete="email"' : "") + '>' + (err ? '<span class="err">' + esc(err) + '</span>' : "") + '</label>';
      }).join("") + '</div><label class="consent"><input type="checkbox" name="consent" data-contact-consent' + (st.consent ? " checked" : "") + '><span>' +
        fill(C.consent, { privacy: '<a href="' + esc(C.privacyUrl) + '" target="_blank" rel="noopener">' + esc(C.privacy) + '</a>' }) + '</span></label>' +
        '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" data-contact-honeypot style="position:absolute;left:-10000px;width:1px;height:1px;opacity:0"></div>';
    } else {
      var q = Q[idx];
      body = '<div data-contact-pane' + m({ x: 20, d: 0.3, g: "mount" }) + '><h3>' + esc(q.label) + '</h3>' + (q.placeholder ? '<p class="hint">' + esc(q.placeholder) + '</p>' : "") +
        '<textarea name="' + q.name + '" placeholder="' + esc(C.typeHere) + '" rows="5" maxlength="2000" data-contact-field aria-label="' + esc(q.label) + '">' + esc(st.data[q.name] || "") + '</textarea></div>';
    }
    return '<div class="form"><div class="bar"><span>' + esc(C.step.replace("{n}", idx + 1).replace("{total}", total)) + ' · ' + Math.round(pct) + '%</span><button type="button" aria-label="' + esc(C.exit) + '" data-contact="exit">' + icon("x", "", 20) + '</button></div>' +
      '<div class="track"><div data-progress="' + pct + '" style="width: ' + (st.prevPct != null ? st.prevPct : 0) + '%;"></div></div>' + body +
      '<div class="nav"><button type="button" class="back" data-contact="back"' + (idx === 0 ? " disabled" : "") + '>' + glyph('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>') + esc(C.back) + '</button>' +
      '<button type="button" class="btn btn-primary" data-contact="next"' + (st.submitting ? " disabled" : "") + '>' +
      (st.submitting ? glyph('<path d="M21 12a9 9 0 1 1-6.219-8.56"/>').replace("<svg ", '<svg class="spin" ') + esc(C.submitting) : esc(st.step === "details" ? C.submit : C.next) + arrow) + '</button></div></div>';
  };
  var STEP_COLORS = [["rgb(179, 148, 209)", "rgb(235, 226, 243)"], ["rgb(83, 172, 172)", "rgb(223, 236, 236)"], ["rgb(145, 179, 77)", "rgb(232, 238, 221)"], ["rgb(224, 189, 82)", "rgb(247, 238, 212)"]];
  var timeline = function (steps) {
    return '<div class="relative">' + steps.map(function (s, i) {
      var c = STEP_COLORS[i], n = STEP_COLORS[i + 1];
      return '<div class="flex gap-6 md:gap-8 pb-12 md:pb-16 last:pb-0"' + m({ y: 30, d: 0.6, t: +(0.1 + i * 0.15).toFixed(2) }) + '><div class="relative flex-shrink-0">' +
        '<div class="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display text-lg md:text-xl" style="background-color: ' + c[1] + '; color: ' + c[0] + ';">' + (i + 1) + '</div>' +
        (i < steps.length - 1 ? '<div class="absolute left-1/2 -translate-x-1/2 top-10 md:top-12 w-px h-full" style="background: linear-gradient(' + c[1] + ', ' + n[1] + ');"></div>' : "") +
        '</div><div class="flex-1 pt-1"><h3 class="font-display text-xl md:text-2xl text-foreground mb-3">' + esc(s.title) + '</h3><p class="text-muted-foreground font-body text-base md:text-lg leading-relaxed">' + esc(s.description) + '</p></div></div>';
    }).join("") + '</div>';
  };

  // ---- contact form (the 3-step "pebble" form) ----------------------------------------------------------------------
  // state: { step: 'intro' | number (question index) | 'details' | 'done', data, errors, consent, submitting, firstName }
  var contactInner = function (t, st) {
    var C = t.contact;
    if (st.step === "done") {
      return '<div class="max-w-4xl mx-auto text-center"><div' + m({ s: 0.9, d: 0.5, g: "mount" }) + '>' +
        '<div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">' + icon("check", "w-10 h-10 text-primary") + '</div>' +
        '<h2 class="font-display text-4xl md:text-5xl text-foreground mb-6">' + esc(C.thanks + (st.firstName ? ", " + st.firstName : "")) + '</h2>' +
        '<p class="text-muted-foreground font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">' + esc(C.success) + '</p></div></div>';
    }
    if (st.step === "intro") {
      return '<div class="max-w-4xl mx-auto" data-inview><div' + m({ y: 20, d: 0.6 }) + '>' +
        '<h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">' + esc(C.title) + '</h2>' +
        '<p class="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-12">' + esc(C.lead) + '</p>' +
        '<button class="' + BTN.contactStart + '" data-contact="start"><span>' + esc(C.start) + '</span>' + icon("arrow-right", "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform") + '</button>' +
        '<p class="text-sm text-muted-foreground/70 font-body">' + esc(C.responseTime) + '</p></div></div>';
    }
    var Q = C.questions, total = Q.length + 1, idx = st.step === "details" ? Q.length : st.step, pct = (idx + 1) / total * 100;
    var body;
    if (st.step === "details") {
      body = '<div data-contact-pane' + m({ x: 20, d: 0.3, g: "mount" }) + '><h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">' + esc(C.detailsTitle) + '</h2>' +
        '<p class="text-muted-foreground font-body text-lg mb-10">' + esc(C.detailsLead) + '</p><div class="grid md:grid-cols-2 gap-6">' + C.fields.map(function (f) {
          var err = st.errors[f.name];
          return '<div><label class="block text-sm font-body text-muted-foreground mb-2" for="cf-' + f.name + '">' + esc(f.label) + ' ' + (f.required ? "*" : "") + '</label>' +
            '<input id="cf-' + f.name + '" name="' + f.name + '" type="' + (f.type === "email" ? "email" : "text") + '" maxlength="' + (f.type === "email" ? 255 : 100) + '" value="' + esc(st.data[f.name] || "") + '" data-contact-field class="w-full px-4 py-3 text-base border rounded-lg bg-transparent focus:outline-none focus:border-primary transition-colors font-body ' + (err ? "border-destructive" : "border-border") + '">' +
            (err ? '<p class="text-sm text-destructive mt-1">' + esc(err) + '</p>' : "") + '</div>';
        }).join("") + '</div>' +
        '<label class="flex items-start gap-3 mt-8 text-sm font-body text-muted-foreground"><input type="checkbox" name="consent" data-contact-consent class="mt-1 accent-[hsl(var(--primary))]"' + (st.consent ? " checked" : "") + '><span>' +
        fill(C.consent, { privacy: '<a href="' + esc(C.privacyUrl) + '" class="text-primary hover:underline" target="_blank" rel="noopener">' + esc(C.privacy) + '</a>' }) + '</span></label>' +
        '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" data-contact-honeypot style="position:absolute;left:-10000px;width:1px;height:1px;opacity:0"></div>';
    } else {
      var q = Q[idx];
      body = '<div data-contact-pane' + m({ x: 20, d: 0.3, g: "mount" }) + '><h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">' + esc(q.label) + '</h2>' +
        (q.placeholder ? '<p class="text-muted-foreground/70 font-body text-base md:text-lg mb-8">' + esc(q.placeholder) + '</p>' : "") +
        '<textarea name="' + q.name + '" placeholder="' + esc(C.typeHere) + '" rows="5" maxlength="2000" data-contact-field aria-label="' + esc(q.label) + '" class="w-full px-0 py-4 text-lg border-0 border-b border-border bg-transparent focus:outline-none focus:border-primary transition-colors font-body placeholder:text-muted-foreground/50 resize-none">' + esc(st.data[q.name] || "") + '</textarea></div>';
    }
    var isDetails = st.step === "details";
    return '<div class="max-w-4xl mx-auto"><div class="mb-12"><div class="flex items-center justify-between mb-2">' +
      '<span class="text-sm font-body text-muted-foreground">' + esc(C.step.replace("{n}", idx + 1).replace("{total}", total)) + '</span>' +
      '<div class="flex items-center gap-4"><span class="text-sm font-body text-muted-foreground">' + Math.round(pct) + '%</span>' +
      '<button class="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="' + esc(C.exit) + '" data-contact="exit">' + icon("x", "w-5 h-5") + '</button></div></div>' +
      '<div class="h-1 bg-border rounded-full overflow-hidden"><div class="h-full bg-primary contact-progress" data-progress="' + pct + '" style="width: ' + (st.prevPct != null ? st.prevPct : 0) + '%;"></div></div></div>' +
      body +
      '<div class="flex items-center justify-between mt-12">' +
      '<button class="' + BTN.contactBack + (idx === 0 ? " invisible" : "") + '" data-contact="back"' + (idx === 0 ? " disabled" : "") + '>' + icon("arrow-left", "mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform") + esc(t.contact.back) + '</button>' +
      '<button class="' + BTN.contactNext + '" data-contact="next"' + (st.submitting ? " disabled" : "") + '>' +
      (st.submitting ? icon("loader-circle", "mr-2 w-5 h-5 animate-spin") + '<span>' + esc(C.submitting) + '</span>'
        : '<span>' + esc(isDetails ? C.submit : C.next) + '</span>' + icon("arrow-right", "ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform")) +
      '</button></div></div>';
  };
  var contact = function (t) {
    return '<section id="contact" class="py-24 md:py-32 bg-background"><div class="container mx-auto px-6" data-contact-root>' + contactInner(t, { step: "intro", data: {}, errors: {} }) + '</div></section>';
  };

  // ---- pages --------------------------------------------------------------------------------------------------------

  var STAT_COLORS = ["rgb(224, 82, 82)", "rgb(77, 179, 77)", "rgb(64, 149, 191)"];
  var MEANS_ICONS = ["shopping-cart", "zap", "shield", "trending-up"];
  var agentic = function (t) {
    var A = t.agentic, H = A.hero, S = A.shift, W = A.means, P = A.approach, R = A.readiness;
    var eyebrow = function (x) { return '<span class="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">' + esc(x) + '</span>'; };
    var h2 = function (x) { return '<h2 class="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">' + esc(x) + '</h2>'; };
    return '<div class="min-h-screen bg-background">' + header(t) + '<main>' +
      '<section class="relative py-24 md:py-32 overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-background"></div><div class="container mx-auto px-6 relative"><div class="max-w-4xl mx-auto text-center" data-inview>' +
      '<div class="mb-6"' + m({ y: 20, d: 0.6 }) + '><span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">' + icon("bot", "w-4 h-4") + esc(H.badge) + '</span></div>' +
      '<h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight"' + m({ y: 20, d: 0.6, t: 0.1 }) + '>' + fill(H.title, { accent: '<span class="text-primary">' + esc(H.accent) + '</span>' }) + '</h1>' +
      '<p class="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto"' + m({ y: 20, d: 0.6, t: 0.2 }) + '>' + esc(H.lead) + '</p>' +
      '<div class="flex flex-col sm:flex-row gap-4 justify-center"' + m({ y: 20, d: 0.6, t: 0.3 }) + '><a class="' + BTN.heroPrimary + '" href="#contact">' + esc(H.primary) + icon("arrow-right", "ml-2 h-4 w-4") + '</a><a class="' + BTN.heroOutline + '" href="#how-we-help">' + esc(H.secondary) + '</a></div>' +
      '</div></div></section>' +
      '<section class="py-24 md:py-32 bg-muted/30"><div class="container mx-auto px-6"><div class="max-w-4xl mx-auto" data-inview>' +
      '<div class="mb-12"' + m({ y: 20, d: 0.6 }) + '>' + eyebrow(S.eyebrow) + h2(S.title) + '</div>' +
      '<div class="prose prose-lg max-w-none"' + m({ y: 20, d: 0.6, t: 0.1 }) + '><p class="text-muted-foreground font-body text-lg leading-relaxed mb-6">' + fill(S.p1, { ucp: '<strong class="text-foreground">' + esc(S.ucp) + '</strong>' }) + '</p>' +
      '<p class="text-muted-foreground font-body text-lg leading-relaxed mb-8">' + esc(S.p2) + '</p></div>' +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-6"' + m({ y: 30, d: 0.6, t: 0.2 }) + '>' + S.stats.map(function (s, i) {
        return '<div class="bg-background rounded-xl p-6 border border-border"><p class="font-display text-4xl md:text-5xl mb-2" style="color: ' + STAT_COLORS[i] + ';">' + esc(s.stat) + '</p><p class="text-sm text-muted-foreground">' + esc(s.label) + '</p></div>';
      }).join("") + '</div></div></div></section>' +
      '<section class="py-24 md:py-32 bg-background"><div class="container mx-auto px-6"><div class="max-w-4xl mx-auto" data-inview>' +
      '<div class="mb-16"' + m({ y: 20, d: 0.6 }) + '>' + eyebrow(W.eyebrow) + h2(W.title) + '<p class="text-lg text-muted-foreground font-body">' + esc(W.lead) + '</p></div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">' + W.items.map(function (it, i) {
        return '<div class="flex gap-4 p-6 rounded-xl bg-muted/30 border border-border/50"' + m({ y: 20, d: 0.5, t: +(0.1 + i * 0.1).toFixed(1) }) + '><div class="flex-shrink-0"><div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">' + icon(MEANS_ICONS[i], "w-6 h-6 text-primary") + '</div></div>' +
          '<div><h3 class="font-display text-lg text-foreground mb-2">' + esc(it.title) + '</h3><p class="text-muted-foreground font-body text-sm">' + esc(it.description) + '</p></div></div>';
      }).join("") + '</div></div></div></section>' +
      '<section id="how-we-help" class="py-24 md:py-32 bg-muted/30"><div class="container mx-auto px-6"><div class="max-w-4xl mx-auto" data-inview>' +
      '<div class="mb-16"' + m({ y: 20, d: 0.6 }) + '>' + eyebrow(P.eyebrow) + h2(P.title) + '<p class="text-lg text-muted-foreground font-body">' + esc(P.lead) + '</p></div>' + timeline(P.steps) +
      '</div></div></section>' +
      '<section class="py-24 md:py-32 bg-background"><div class="container mx-auto px-6"><div class="max-w-4xl mx-auto" data-inview>' +
      '<div class="mb-12"' + m({ y: 20, d: 0.6 }) + '>' + eyebrow(R.eyebrow) + h2(R.title) + '</div>' +
      '<div class="bg-muted/30 rounded-2xl p-8 md:p-10 border border-border/50"' + m({ y: 20, d: 0.6, t: 0.1 }) + '><p class="text-muted-foreground font-body mb-6">' + esc(R.question) + '</p><ul class="space-y-4">' + R.items.map(function (it, i) {
        return '<li class="flex items-start gap-3 text-foreground font-body"' + m({ x: -10, d: 0.4, t: +(0.2 + i * 0.05).toFixed(2) }) + '>' + icon("circle-check", "w-5 h-5 text-primary mt-0.5 flex-shrink-0") + esc(it) + '</li>';
      }).join("") + '</ul>' +
      '<div class="mt-8 pt-6 border-t border-border"' + m({ d: 0.6, t: 0.5 }) + '><p class="text-muted-foreground font-body text-sm">' + esc(R.note) + '</p></div></div>' +
      '</div></div></section>' +
      contact(t) + '</main>' + footer(t) + '</div>';
  };

  var notFound = function (t) {
    var N = t.notFound;
    return '<div class="flex min-h-screen items-center justify-center bg-muted"><div class="text-center"><h1 class="mb-4 text-4xl font-bold">' + esc(N.code) + '</h1><p class="mb-4 text-xl text-muted-foreground">' + esc(N.text) + '</p><a href="/" class="text-primary underline hover:text-primary/90">' + esc(N.home) + '</a></div></div>';
  };

  // the published pages: id -> [path, template]
  var PAGES = { home: ["", home2], agentic: ["services/agentic-ecommerce/", agentic], "404": ["404.html", notFound] };

  var api = { esc: esc, fill: fill, icon: icon, PAGES: PAGES, contactInner: contactInner, contactInner2: contactInner2, page: function (id, t, base) { return PAGES[id][1](t, base || "/"); } };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.TWOHUMAN_RENDER = api;
})(typeof window !== "undefined" ? window : globalThis);
