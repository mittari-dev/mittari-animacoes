(function () {
  let seed = 20261006;
  const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const $ = (s) => document.querySelector(s);
  const tl = gsap.timeline({ paused: true });
  const T = (target, vars, at) => tl.to(target, vars, at);
  const F = (target, from, to, at) => tl.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
  const show = (target, at, vars) => tl.to(target, Object.assign({ opacity: 1, duration: 0.5, ease: "power2.out" }, vars || {}), at);
  const hide = (target, at, vars) => tl.to(target, Object.assign({ opacity: 0, duration: 0.35, ease: "power2.in" }, vars || {}), at);
  const count = (el, from, to, dur, at, fmt) => { const o = { v: from }; tl.to(o, { v: to, duration: dur, ease: "none", onUpdate: () => { el.textContent = fmt(o.v); } }, at); };
  const virg = (v) => v.toFixed(2).replace(".", ",");

  gsap.set(".ctr", { xPercent: -50, yPercent: -50 });

  // ---------- equipe do box: 20 pessoas em volta do carro ----------
  const crewG = $("#crewG"); const crew = [];
  const pos = [];
  for (let i = 0; i < 6; i++) { pos.push([-130, 110 + i * 128]); pos.push([547, 110 + i * 128]); }
  for (let i = 0; i < 4; i++) { pos.push([20 + i * 126, -90]); pos.push([20 + i * 126, 950]); }
  pos.forEach(([x, y]) => { const d = document.createElement("div"); d.className = "crew"; d.style.left = x + "px"; d.style.top = y + "px"; crewG.appendChild(d); crew.push(d); });

  // ---------- letra cinética (tempos do ElevenLabs Scribe) ----------
  const LINES = [
    { a: 0.0, b: 3.95, rows: [["sm", [["Um",.137],["pit",.4],["stop",.76],["de",.96],["Fórmula",1.12],["1",1.68],["dura",1.84]]], ["big", [["menos",2.16],["de",2.48],["2",2.64],["segundos.",2.88]]]] },
    { a: 4.15, b: 7.3, top: 160, rows: [["sm", [["O",4.2],["recorde",4.32],["é",4.8],["da",4.92],["McLaren:",5.04]]]] },
    { a: 7.4, b: 11.95, rows: [["sm", [["Cerca",7.44],["de",7.8],["vinte",7.973],["pessoas,",8.16],["quatro",9.16],["pneus…",9.52]]], ["big", [["ninguém",10.56],["pode",11.04],["errar.",11.28,"rd"]]]] },
    { a: 12.4, b: 16.3, rows: [["sm", [["Um",12.44],["segundo",12.56],["a",12.88],["mais,",12.96],["e",13.467],["o",13.52],["carro",13.68]]], ["big", [["volta",13.92],["para",14.28],["trás.",15.0,"rd"]]]] },
    { a: 17.6, b: 20.2, rows: [["sm", [["No",17.64],["seu",17.76],["WhatsApp,",17.92]]], ["big", [["a",18.6],["corrida",18.72],["é",19.013],["igual.",19.12,"lm"]]]] },
    { a: 20.3, b: 24.85, rows: [["sm", [["Uma",20.384],["pesquisa",20.6],["da",20.96],["Harvard",21.12],["Business",21.52],["Review,",21.84]]], ["big", [["1,25",22.88],["milhão",23.04],["de",23.44],["leads.",23.6]]]] },
    { a: 24.9, b: 32.35, rows: [["sm", [["quem",24.92],["responde",25.16],["na",25.6],["primeira",25.84],["hora",26.24],["tem",26.56]]], ["big", [["quase",26.76],["7×",27.2,"lm"],["mais",28.0],["chance.",28.32]]]] },
    { a: 32.7, b: 35.4, rows: [["sm", [["O",32.72],["cliente",32.8],["não",33.227],["espera.",33.52]]], ["big", [["ele",34.32],["compara.",34.48,"lm"]]]] },
    { a: 36.4, b: 38.7, rows: [["sm", [["A",36.48],["Kalli",36.64,"lm"]]], ["big", [["faz",37.04],["o",37.24],["pit",37.36],["stop",37.52],["por",37.84],["você.",38.0,"lm"]]]] },
    { a: 38.76, b: 42.55, rows: [["sm", [["Responde",38.8],["em",39.2],["segundos,",39.4],["qualifica",40.16],["e",40.96],["marca",41.12],["a",41.4],["visita.",41.52]]]] },
    { a: 42.6, b: 99, top: 300, rows: [["serifxl", [["Você",42.72],["só",43.12],["volta",43.36],["para",43.72],["a",43.813],["pista.",43.92]]]] },
  ];
  const typeEl = $("#type");
  LINES.forEach((L) => {
    const ln = document.createElement("div"); ln.className = "ln"; if (L.top) ln.style.top = L.top + "px";
    L.rows.forEach(([cls, words]) => {
      const row = document.createElement("div"); row.className = "row " + cls;
      words.forEach(([w, t, extra]) => {
        const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w; row.appendChild(s);
        const isBig = cls !== "sm";
        F(s, { opacity: 0, yPercent: isBig ? 55 : 40, scale: isBig ? 0.92 : 1, filter: "blur(10px)" },
          { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration: isBig ? 0.55 : 0.4, ease: isBig ? "back.out(1.5)" : "expo.out" }, Math.max(0, t - 0.04));
      });
      ln.appendChild(row);
    });
    typeEl.appendChild(ln);
    if (L.b < 90) tl.to(ln, { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, L.b - 0.3);
  });

  // ---------- câmera ----------
  F("#stage", { scale: 1, rotationX: 4, rotationY: -2 }, { scale: 1.05, rotationX: 0, rotationY: 1, duration: 16.4, ease: "none" }, 0);
  T("#stage", { scale: 2.6, rotationX: 0, rotationY: 0, duration: 1.52, ease: "power3.in" }, 16.4);
  tl.set("#stage", { scale: 1.12 }, 17.92);
  T("#stage", { scale: 1, duration: 1.6, ease: "expo.out" }, 17.92);
  T("#stage", { scale: 1.05, rotationY: 2, rotationX: 2, duration: 16.0, ease: "none" }, 19.6);
  tl.set("#stage", { scale: 1, rotationX: 0, rotationY: 0 }, 35.6);
  T("#stage", { scale: 1.06, rotationX: -2, duration: 11.4, ease: "none" }, 35.6);
  F("#typeCam", { y: 14 }, { y: -14, duration: 47, ease: "none" }, 0);

  // ---------- ATO 1: o box (0–16.4) ----------
  F("#carWrap", { y: -1700, filter: "blur(14px)" }, { y: 0, filter: "blur(0px)", duration: 1.3, ease: "expo.out" }, 0.05);
  F("#box", { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, 0.9);
  show("#ghBox", 4.0, { duration: 1 });
  // o cronômetro conta o recorde em tempo real: 1,80 s
  F("#timer", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 4.7);
  count($("#tv"), 0, 1.80, 1.80, 4.92, virg);
  T("#timer", { color: "#D7261E", duration: 0.15 }, 6.72);
  F("#timer", { scale: 1.08 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, 6.72);
  show("#rec", 6.8, { duration: 0.4 });
  T(".ring", { opacity: 1, duration: 0.12, stagger: 0.18, yoyo: true, repeat: 1 }, 5.0);
  hide(["#timer", "#rec"], 7.2);
  F("#chip", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 7.3);
  gsap.set("#chip", { top: 1585 });
  crew.forEach((d, i) => F(d, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 7.97 + i * 0.05));
  T(".ring", { opacity: 1, duration: 0.25, stagger: 0.1 }, 9.2);
  F(".ring", { scale: 1.3 }, { scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, 9.2);
  T(crew[3], { backgroundColor: "#D7261E", scale: 1.5, duration: 0.25 }, 11.28);
  // um segundo a mais
  count($("#chipv"), 1.80, 2.80, 0.84, 12.56, virg);
  T("#chip", { color: "#D7261E", borderColor: "#D7261E", duration: 0.2 }, 12.56);
  T(["#carWrap", "#box"], { opacity: 0.12, scale: 0.9, filter: "blur(6px)", duration: 0.6, ease: "power2.out" }, 13.6);
  hide("#chip", 13.6);
  T(["#pl1", "#pl2"], { opacity: 1, duration: 0.3 }, 13.7);
  F(["#tr1", "#tr2"], { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "expo.out" }, 13.75);
  T("#tr1", { y: 140, duration: 0.6, ease: "power3.inOut" }, 14.95);
  T("#tr2", { y: -140, duration: 0.6, ease: "power3.inOut" }, 14.95);
  T(["#g1a", "#g2a"], { opacity: 0, duration: 0.2 }, 15.0);
  T(["#g1b", "#g2b"], { opacity: 1, duration: 0.2 }, 15.2);
  T("#g1b", { color: "#D7261E", duration: 0.2 }, 15.2);
  hide("#ghBox", 16.2);

  // ---------- PONTE: a tabela vira a caixa de entrada (17.92) ----------
  tl.set(["#bg", "#root"], { backgroundColor: "#0A0A0A" }, 17.92);
  tl.set("#type", { color: "#ECECE4", "--sm": "#8E8E86" }, 17.92);
  tl.set(["#tower", "#carWrap", "#box"], { opacity: 0 }, 17.92);
  show("#glow", 17.95, { duration: 1 });
  F(["#cr1", "#cr2", "#cr3"], { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "expo.out" }, 17.95);
  T("#cr1", { borderColor: "#B8FF4F", duration: 0.3 }, 19.12);
  hide(["#cr1", "#cr2", "#cr3"], 20.2, { duration: 0.35, scale: 0.92 });

  // ---------- ATO 4: o dado (20.3–35.6) ----------
  show("#ghHbr", 24.9, { duration: 1 });
  show("#src", 21.2);
  show("#hbr", 25.0, { duration: 0.3 });
  T("#b1", { scaleY: 1, duration: 1.1, ease: "back.out(1.2)" }, 26.2);
  F("#bv1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, 27.2);
  T("#b2", { scaleY: 1, duration: 0.6, ease: "power2.out" }, 30.7);
  F("#bv2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 31.0);
  hide(["#hbr", "#src", "#ghHbr"], 32.4, { duration: 0.4 });
  F(["#cr1", "#cr2", "#cr3"], { opacity: 0, x: -80, scale: 1 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "expo.out" }, 32.72);
  T(["#cr2", "#cr3"], { opacity: 0.35, duration: 0.4 }, 34.48);
  F("#cr1", { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 34.48);
  hide(["#cr1", "#cr2", "#cr3"], 35.6, { duration: 0.4 });

  // ---------- ATO 5: o pit stop da Kalli (36.4–47) ----------
  F("#k1", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.8)" }, 38.78);
  count($("#kv"), 0, 4, 0.6, 38.85, (v) => "00:0" + Math.round(v));
  F("#k2", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.8)" }, 40.14);
  F("#k3", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: "back.out(1.8)" }, 41.1);
  hide(["#k1", "#k2", "#k3"], 42.4, { duration: 0.35, x: -40 });
  tl.set("#carTinta", { opacity: 0 }, 42.5);
  tl.set("#carLima", { opacity: 1 }, 42.5);
  tl.set(".ring, .crew", { opacity: 0 }, 42.5);
  F("#carWrap", { opacity: 0, y: 200, scale: 0.8, filter: "blur(0px)" }, { opacity: 1, y: 160, scale: 0.8, duration: 0.5, ease: "expo.out" }, 42.55);
  T("#carWrap", { y: -1900, filter: "blur(10px)", duration: 1.0, ease: "power3.in" }, 43.35);
  F("#endSym img", { opacity: 0, scale: 0.6, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.4)" }, 44.4);
  F("#endWord", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 44.75);
  F("#endTag", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 45.0);

  for (let i = 0; i < 47 * 12; i++) tl.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);
  tl.set({}, {}, 47);
  window.__timelines["main"] = tl;
})();
