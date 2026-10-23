(function () {
  // ---------- utilidades ----------
  let seed = 20261005;
  const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const $ = (s) => document.querySelector(s);
  const NS = "http://www.w3.org/2000/svg";
  const tl = gsap.timeline({ paused: true });
  const T = (target, vars, at) => tl.to(target, vars, at);
  const show = (target, at, vars) => tl.to(target, Object.assign({ opacity: 1, duration: 0.5, ease: "power2.out" }, vars || {}), at);
  const hide = (target, at, vars) => tl.to(target, Object.assign({ opacity: 0, duration: 0.35, ease: "power2.in" }, vars || {}), at);

  gsap.set(".ctr", { xPercent: -50, yPercent: -50 });

  // ---------- relógio de 24 h ----------
  const ticks = $("#ticks");
  for (let h = 0; h < 24; h++) {
    const a = (h / 24) * Math.PI * 2, major = h % 6 === 0;
    const r1 = major ? 192 : 204, r2 = 222;
    const l = document.createElementNS(NS, "line");
    l.setAttribute("x1", (Math.sin(a) * r1).toFixed(1)); l.setAttribute("y1", (-Math.cos(a) * r1).toFixed(1));
    l.setAttribute("x2", (Math.sin(a) * r2).toFixed(1)); l.setAttribute("y2", (-Math.cos(a) * r2).toFixed(1));
    l.setAttribute("stroke", "currentColor"); l.setAttribute("stroke-width", major ? 7 : 4); l.setAttribute("stroke-linecap", "round");
    ticks.appendChild(l);
  }
  const face = $("#face"); const faceLen = 2 * Math.PI * 230;
  gsap.set(face, { attr: { "stroke-dasharray": faceLen, "stroke-dashoffset": faceLen } });
  gsap.set("#hand", { rotation: -60, svgOrigin: "0 0" });
  gsap.set(["#m05", "#m17"], { opacity: 0.25 });
  gsap.set(["#xmark", "#ck05", "#ck17"], { opacity: 0 });
  gsap.set("#xmark", { scale: 2, svgOrigin: "-169 45.3" });
  gsap.set("#ticks line, #nums", { opacity: 0 });

  // ---------- mapa estilizado da Região dos Lagos ----------
  const coast = [[0,250],[150,262],[300,272],[450,282],[560,302],[610,342],[630,420],[645,470],[662,432],[672,352],[690,292],[720,262],[770,250],[820,214],[850,150],[880,120],[905,136],[930,96],[960,80]];
  const cd = "M" + coast.map(p => p.join(" ")).join(" L");
  $("#coast").setAttribute("d", cd);
  $("#land").setAttribute("d", cd + " L960 0 L0 0 Z");
  const coastLen = $("#coast").getTotalLength();
  gsap.set("#coast", { attr: { "stroke-dasharray": coastLen, "stroke-dashoffset": coastLen } });
  const coastY = (x) => { for (let i = 0; i < coast.length - 1; i++) { const [x1,y1] = coast[i], [x2,y2] = coast[i+1]; if (x >= x1 && x <= x2) return y1 + (y2 - y1) * (x - x1) / (x2 - x1); } return 250; };
  const dotsG = $("#dots"); const dots = [];
  for (let i = 0; i < 58; i++) {
    const x = 30 + rnd() * 920; const y = coastY(x) - 14 - rnd() * (x > 600 ? 70 : 120);
    if (x > 150 && x < 510 && y > 145 && y < 235) { i--; continue; }
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); c.setAttribute("r", (5 + rnd() * 4).toFixed(1));
    c.setAttribute("fill", "#B8FF4F"); c.setAttribute("opacity", "0");
    dotsG.appendChild(c); dots.push(c);
  }

  // ---------- gráfico ----------
  ["#chLine", "#chDrop"].forEach(s => { const p = $(s), L = p.getTotalLength(); gsap.set(p, { attr: { "stroke-dasharray": L, "stroke-dashoffset": L } }); });
  const bub = $("#bubPath"), bubLen = bub.getTotalLength();
  gsap.set(bub, { attr: { "stroke-dasharray": bubLen, "stroke-dashoffset": bubLen } });
  gsap.set("#bubDots circle", { scale: 0, transformOrigin: "50% 50%" });

  // ---------- letra cinética (tempos de cada palavra, ElevenLabs Scribe) ----------
  const LINES = [
    { a: 0.0, b: 3.72, rows: [["sm", [["Uma",.069],["vaca",.28],["leiteira",.56],["é",1.2],["ordenhada",1.44]]], ["big", [["duas",2.0],["vezes",2.4],["por",2.72],["dia.",2.88]]]] },
    { a: 3.9, b: 7.05, rows: [["sm", [["nem",3.96],["no",4.3]]], ["big", [["feriado.",4.88,"or"]]]] },
    { a: 7.15, b: 8.62, top: 210, rows: [["huge", [["todo",7.2],["dia.",7.52]]]] },
    { a: 8.75, b: 11.5, rows: [["sm", [["Se",8.784],["uma",8.88],["ordenha",9.08],["falha,",9.44]]], ["big", [["o",10.04],["leite",10.16],["não",10.56],["espera.",10.72]]]] },
    { a: 11.55, b: 14.2, rows: [["serif", [["Ele",11.6],["acumula…",11.76]]], ["big", [["a",12.76],["produção",12.92],["cai.",13.44,"or"]]]] },
    { a: 14.28, b: 16.84, strike: 16.45, rows: [["sm", [["No",14.32],["campo,",14.6],["ninguém",15.08],["pergunta",15.44]]], ["big", [["se",15.88],["é",15.96],["feriado.",16.08]]]] },
    { a: 16.86, b: 18.62, rows: [["sm", [["Pergunta",16.88]]], ["big", [["que",17.28],["horas",17.44],["são.",17.8]]]] },
    { a: 19.3, b: 21.42, rows: [["sm", [["O",19.36],["seu",19.43],["WhatsApp",19.5]]], ["big", [["funciona",19.88]]], ["serif", [["igual.",20.24]]]] },
    { a: 21.55, b: 24.35, rows: [["sm", [["No",21.584],["feriado,",21.68]]], ["big", [["a",22.36],["Região",22.48],["dos",22.88],["Lagos",23.04],["enche.",23.52,"lm"]]]] },
    { a: 24.4, b: 26.72, rows: [["sm", [["O",24.44],["lead",24.56],["chega",24.88],["às",25.2]]], ["big", [["22h",25.44],["de",26.0],["sábado.",26.16]]]] },
    { a: 26.76, b: 30.1, rows: [["sm", [["olha",26.8],["três",27.2],["anúncios",27.48]]], ["big", [["e",28.08],["manda",28.24],["para",28.92],["os",29.04],["três.",29.2]]]] },
    { a: 30.15, b: 32.7, rows: [["sm", [["Quem",30.229],["responde",30.32],["primeiro",30.84]]], ["big", [["marca",31.2],["a",31.48],["visita.",31.6,"lm"]]]] },
    { a: 33.2, b: 35.33, rows: [["sm", [["A",33.28],["Kalli",33.52,"lm"]]], ["big", [["não",33.92],["tira",34.24],["feriado.",34.48,"lm"]]]] },
    { a: 35.37, b: 38.82, rows: [["sm", [["Responde",35.4],["em",35.76],["segundos",35.92],["e",36.64],["te",36.76],["entrega",36.88]]], ["big", [["a",37.24],["visita",37.36],["marcada.",37.68]]]] },
    { a: 38.88, b: 99, top: 520, rows: [["serifxl", [["Você",38.92],["tira",39.12],["o",39.32],["seu.",39.44]]]] },
  ];
  const typeEl = $("#type");
  LINES.forEach((L) => {
    const ln = document.createElement("div"); ln.className = "ln"; if (L.top) ln.style.top = L.top + "px";
    L.rows.forEach(([cls, words]) => {
      const row = document.createElement("div"); row.className = "row " + cls;
      words.forEach(([w, t, extra]) => {
        const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w;
        row.appendChild(s);
        const isBig = cls !== "sm";
        tl.fromTo(s, { opacity: 0, yPercent: isBig ? 55 : 40, scale: isBig ? 0.92 : 1, filter: "blur(10px)" },
          { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration: isBig ? 0.55 : 0.4, ease: isBig ? "back.out(1.5)" : "expo.out", immediateRender: false }, Math.max(0, t - 0.04));
      });
      if (L.strike && cls === "big") { row.style.display = "inline-block"; const k = document.createElement("div"); k.className = "strike"; row.appendChild(k); tl.to(k, { scaleX: 1, duration: 0.35, ease: "power3.inOut" }, L.strike); }
      ln.appendChild(row);
    });
    typeEl.appendChild(ln);
    if (L.b < 90) tl.to(ln, { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, L.b - 0.3);
  });

  // ---------- câmera (nunca para) e camadas ----------
  tl.fromTo("#stage", { scale: 1, rotationX: 4, rotationY: -2 }, { scale: 1.045, rotationX: 0, rotationY: 1, duration: 8.7, ease: "none" }, 0);
  T("#stage", { scale: 1.085, rotationX: -2, rotationY: -1, duration: 9.0, ease: "none" }, 8.7);
  T("#stage", { scale: 3.6, rotationX: 0, rotationY: 0, duration: 1.58, ease: "power3.in" }, 17.7);
  tl.set("#stage", { scale: 1.14 }, 19.28);
  T("#stage", { scale: 1, duration: 1.6, ease: "expo.out" }, 19.28);
  T("#stage", { scale: 1.05, rotationY: 2, rotationX: 2, duration: 11.0, ease: "none" }, 21.5);
  tl.set("#stage", { scale: 1, rotationX: 0, rotationY: 0 }, 32.9);
  T("#stage", { scale: 1.06, rotationX: -2, duration: 8.7, ease: "none" }, 32.9);
  tl.fromTo("#typeCam", { y: 14 }, { y: -14, duration: 41.6, ease: "none", immediateRender: false }, 0);

  // ---------- ATO 1: a ordenha (0–8.7) ----------
  show("#gh365", 3.9, { duration: 1.2 });
  T("#cow", { clipPath: "inset(0 0% 0 0)", duration: 2.5, ease: "power2.inOut" }, 0.1);
  gsap.set("#clockWrap", { x: 330, y: -280 });
  tl.fromTo("#clockWrap", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 0.42, duration: 0.8, ease: "back.out(1.6)", immediateRender: false }, 0.25);
  T(face, { attr: { "stroke-dashoffset": 0 }, duration: 1.1, ease: "power2.inOut" }, 0.3);
  T("#ticks line", { opacity: 1, duration: 0.2, stagger: 0.035 }, 0.45);
  show("#nums", 1.0, { duration: 0.3 });
  T("#hand", { rotation: 75, duration: 1.6, ease: "power2.inOut" }, 0.4);
  T("#m05", { opacity: 1, duration: 0.2 }, 2.0);
  tl.fromTo("#m05 circle", { attr: { r: 15 } }, { attr: { r: 24 }, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 2.0);
  T("#hand", { rotation: 255, duration: 0.45, ease: "power3.inOut" }, 2.0);
  T("#m17", { opacity: 1, duration: 0.2 }, 2.42);
  tl.fromTo("#m17dot", { attr: { r: 15 } }, { attr: { r: 24 }, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, 2.42);
  T("#hand", { rotation: 435, duration: 1.4, ease: "power1.inOut" }, 2.9);
  // vaca vai para o fundo, calendário entra na frente
  T("#cow", { opacity: 0.13, scale: 0.9, y: 40, filter: "blur(5px)", duration: 0.6, ease: "power2.out" }, 3.85);
  [["#c1", 205, 3.96], ["#c2", 540, 4.88], ["#c3", 875, 5.92]].forEach(([s, x, t]) => {
    gsap.set(s, { left: x });
    tl.fromTo(s, { opacity: 0, y: 140, rotationX: -55, scale: 0.9 }, { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)", immediateRender: false }, t - 0.06);
    T(s + " .pill", { opacity: 1, duration: 0.25, stagger: 0.12 }, t + 0.3);
  });
  show("#counter", 6.5);
  const cnt = { v: 0 };
  tl.to(cnt, { v: 730, duration: 1.6, ease: "power2.out", onUpdate: () => { $("#num").textContent = Math.round(cnt.v); } }, 6.55);
  T("#hand", { rotation: 795, duration: 2.6, ease: "none" }, 4.3);

  // ---------- ATO 2: a falha (8.7–19.28) ----------
  T(["#c1", "#c2", "#c3"], { opacity: 0, y: -80, duration: 0.35, stagger: 0.05, ease: "power2.in" }, 8.55);
  hide("#counter", 8.55); hide("#cow", 8.6); hide("#gh365", 8.6);
  T("#clockWrap", { x: -90, y: 0, scale: 1, duration: 0.8, ease: "expo.inOut" }, 8.7);
  T("#hand", { rotation: 975, duration: 0.7, ease: "power3.inOut" }, 8.75);
  T("#xmark", { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)" }, 9.42);
  T("#m17dot", { fill: "#C2410C", duration: 0.2 }, 9.42);
  show("#src", 9.6);
  tl.fromTo("#gauge", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out", immediateRender: false }, 10.1);
  show("#glbl", 10.3);
  T("#gfill", { scaleY: 1, duration: 2.4, ease: "power1.in" }, 10.2);
  show("#chart", 12.55, { duration: 0.3 });
  T("#chLine", { attr: { "stroke-dashoffset": 0 }, duration: 0.35, ease: "power1.inOut" }, 12.6);
  T("#chMark", { opacity: 1, duration: 0.2 }, 12.95);
  T("#chDrop", { attr: { "stroke-dashoffset": 0 }, duration: 0.55, ease: "power2.in" }, 12.95);
  hide(["#gauge", "#glbl", "#chart"], 14.2, { duration: 0.45 });
  T("#clockWrap", { x: 0, duration: 0.8, ease: "expo.inOut" }, 14.2);
  hide("#xmark", 16.86, { duration: 0.25 });
  T("#m17dot", { fill: "currentColor", duration: 0.2 }, 16.86);
  T("#hand", { rotation: 975 + 1080, duration: 2.4, ease: "power2.in" }, 16.88);
  hide("#src", 17.6);
  // a ponte: o mostrador enche de lima
  T(["#ticks", "#nums", "#m05", "#m17", "#hand"], { opacity: 0, duration: 0.25 }, 18.95);
  T("#faceFill", { opacity: 1, duration: 0.3, ease: "power2.in" }, 18.98);

  // ---------- ATO 3: corte casado (19.28) ----------
  tl.set("#bg", { backgroundColor: "#0A0A0A" }, 19.28);
  tl.set("#root", { backgroundColor: "#0A0A0A" }, 19.28);
  tl.set("#clockWrap", { opacity: 0 }, 19.28);
  tl.set("#type", { color: "#ECECE4", "--sm": "#8E8E86" }, 19.28);
  tl.set("#badge", { opacity: 1, scale: 1 }, 19.28);
  T("#badge", { scale: 0.08, x: 168, y: -140, duration: 0.7, ease: "expo.inOut" }, 19.28);
  T("#badge b", { opacity: 1, duration: 0.2 }, 19.86);
  show("#bubble", 19.5, { duration: 0.2 });
  T(bub, { attr: { "stroke-dashoffset": 0 }, duration: 0.8, ease: "power2.inOut" }, 19.5);
  T("#bubDots circle", { scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" }, 20.1);
  show("#glow", 19.4, { duration: 1 });
  hide(["#bubble", "#badge"], 21.35, { duration: 0.35, scale: 0.85 });

  // ---------- ATO 4: o mundo do corretor (21.5–32.9) ----------
  show("#gh2204", 21.6, { duration: 1 });
  show("#mapWrap", 21.55, { duration: 0.2 });
  T("#coast", { attr: { "stroke-dashoffset": 0 }, duration: 1.1, ease: "power2.inOut" }, 21.6);
  T("#land", { opacity: 1, duration: 0.8 }, 22.2);
  T("#lagoa", { opacity: 1, duration: 0.6 }, 22.3);
  tl.fromTo("#places text", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.12, immediateRender: false }, 22.4);
  tl.fromTo("#mapClock", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }, 21.7);
  dots.forEach((d, i) => {
    const t = i < 18 ? 22.5 + i * 0.055 : 23.5 + (i - 18) * 0.016;
    tl.fromTo(d, { attr: { opacity: 0, r: 0 } }, { attr: { opacity: 1, r: d.getAttribute("r") }, duration: 0.3, ease: "back.out(3)", immediateRender: false }, t);
  });
  T("#mapWrap", { opacity: 0.22, scale: 0.86, filter: "blur(6px)", duration: 0.7, ease: "power2.out" }, 24.4);
  hide("#mapClock", 24.4);
  tl.fromTo("#p2", { opacity: 0, rotationY: -38, z: -500, y: 60 }, { opacity: 1, rotationY: -10, z: 0, y: 0, duration: 0.9, ease: "expo.out", immediateRender: false }, 24.45);
  tl.fromTo("#p2m", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.7)", immediateRender: false }, 24.86);
  T("#p2", { rotationY: 0, scale: 0.54, y: -10, duration: 0.8, ease: "expo.inOut" }, 26.75);
  gsap.set("#p1", { left: 200, scale: 0.54, top: 1080 }); gsap.set("#p3", { left: 880, scale: 0.54, top: 1080 });
  tl.fromTo("#p1", { opacity: 0, x: -320 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", immediateRender: false }, 27.05);
  tl.fromTo("#p3", { opacity: 0, x: 320 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", immediateRender: false }, 27.15);
  T(["#pl1", "#pl2", "#pl3"], { opacity: 1, duration: 0.4, stagger: 0.08 }, 27.4);
  tl.fromTo("#p1m", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: false }, 28.38);
  tl.fromTo("#p3m", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)", immediateRender: false }, 28.9);
  T(["#p1s", "#p3s"], { opacity: 1, duration: 0.3 }, 30.25);
  T(["#p1", "#p3"], { opacity: 0.38, duration: 0.5 }, 30.3);
  T(["#pl1", "#pl3"], { opacity: 0.35, duration: 0.5 }, 30.3);
  T("#pl2", { color: "#B8FF4F", duration: 0.3 }, 30.3);
  show("#p2typ", 30.25, { duration: 0.15 });
  T("#p2typ i", { y: -8, duration: 0.18, stagger: 0.09, yoyo: true, repeat: 3, ease: "sine.inOut" }, 30.27);
  tl.set("#p2typ", { display: "none" }, 30.82);
  tl.fromTo("#p2r", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.7)", immediateRender: false }, 30.84);
  show("#watch", 30.23, { duration: 0.2 });
  const wt = { v: 0 };
  tl.to(wt, { v: 42, duration: 0.6, ease: "none", onUpdate: () => { $("#watch").textContent = "00:" + String(Math.round(wt.v)).padStart(2, "0"); } }, 30.24);
  tl.fromTo("#visit1", { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, 31.2);
  hide(["#p1", "#p2", "#p3", "#pl1", "#pl2", "#pl3", "#watch", "#visit1", "#mapWrap", "#gh2204"], 32.6, { duration: 0.4 });

  // ---------- ATO 5: o pouso (33.2–41.6) ----------
  tl.set("#clockWrap", { x: 0, y: 0, color: "#B8FF4F" }, 33.0);
  tl.set("#faceFill", { opacity: 0 }, 33.0);
  tl.set(["#ticks", "#nums", "#hand"], { opacity: 1 }, 33.0);
  tl.set("#hand", { rotation: 0 }, 33.0);
  tl.set(["#m05", "#m17"], { opacity: 1 }, 33.0);
  tl.set("#m17dot", { fill: "currentColor" }, 33.0);
  tl.fromTo("#clockWrap", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out", immediateRender: false }, 33.2);
  T(["#ck05", "#ck17"], { opacity: 1, duration: 0.3, stagger: 0.15 }, 34.4);
  T("#hand", { rotation: 720, duration: 5.7, ease: "none" }, 33.2);
  tl.fromTo("#chipResp", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", immediateRender: false }, 35.38);
  const rt = { v: 0 };
  tl.to(rt, { v: 4, duration: 0.6, ease: "none", onUpdate: () => { $("#resp").textContent = "00:0" + Math.round(rt.v); } }, 35.45);
  tl.fromTo("#visit2", { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, 37.34);
  T(["#clockWrap", "#chipResp", "#visit2"], { opacity: 0, scale: 0.9, filter: "blur(8px)", duration: 0.45, ease: "power2.in" }, 38.7);
  tl.fromTo("#endSym img", { opacity: 0, scale: 0.6, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.4)", immediateRender: false }, 39.9);
  tl.fromTo("#endWord", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }, 40.25);
  tl.fromTo("#endTag", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", immediateRender: false }, 40.5);

  // ---------- grão de filme (muda 12 vezes por segundo) ----------
  for (let i = 0; i < 41.6 * 12; i++) tl.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);

  tl.set({}, {}, 41.6);
  window.__timelines["main"] = tl;
})();

