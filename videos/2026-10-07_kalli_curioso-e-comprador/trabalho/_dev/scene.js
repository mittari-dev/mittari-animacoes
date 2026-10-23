(function () {
  // W02 — O Curioso e o Comprador · NÚCLEO (18–42 s do vídeo final), 24 s.
  // Tempos da letra são ESTIMADOS: trocar pelos do ElevenLabs Scribe quando a voz existir.
  let seed = 20261007;
  const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const $ = (s) => document.querySelector(s);
  const tl = gsap.timeline({ paused: true });
  const T = (target, vars, at) => tl.to(target, vars, at);
  const F = (target, from, to, at) => tl.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
  const show = (target, at, vars) => tl.to(target, Object.assign({ opacity: 1, duration: 0.45, ease: "power2.out" }, vars || {}), at);
  const hide = (target, at, vars) => tl.to(target, Object.assign({ opacity: 0, duration: 0.3, ease: "power2.in" }, vars || {}), at);
  const count = (el, from, to, dur, at, fmt) => { const o = { v: from }; tl.to(o, { v: to, duration: dur, ease: "none", onUpdate: () => { el.textContent = fmt(o.v); } }, at); };
  const pop = (sel, at) => F(sel, { opacity: 0, y: 26, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.7)" }, at);
  const passo = (sel, at) => { tl.set(sel, { attr: { class: "pz on" } }, at); F(sel, { scale: 1.12 }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, at); };

  // ---------- letra cinética ----------
  const LINES = [
    { a: 0.2, b: 1.75, rows: [["sm", ["Agora,", "com", "a"]], ["big", ["Kalli.|lm"]]] },
    { a: 1.9, b: 5.75, rows: [["sm", ["Ela", "responde", "as", "perguntas", "de", "sempre"]], ["big", ["com", "os", "dados", "do", "imóvel.|lm"]]] },
    { a: 6.0, b: 10.75, rows: [["sm", ["Pergunta", "o", "que", "importa:"]], ["big", ["onde,", "quanto", "e", "quando.|lm"]]] },
    { a: 11.0, b: 13.95, rows: [["sm", ["Separa", "quem", "está", "pronto"]], ["big", ["de", "quem", "está", "pesquisando.|lm"]]] },
    { a: 14.2, b: 16.95, rows: [["sm", ["E", "marca", "a", "visita"]], ["big", ["de", "quem", "está", "pronto.|lm"]]] },
    { a: 17.2, b: 19.15, rows: [["big", ["Você", "recebe", "esse.|lm"]]] },
    { a: 19.35, b: 99, rows: [["sm", ["Quer", "falar", "você", "mesmo?"]], ["big", ["É", "só", "assumir.|lm"]]] },
  ];
  const typeEl = $("#type");
  LINES.forEach((L) => {
    const ln = document.createElement("div"); ln.className = "ln";
    let total = 0; L.rows.forEach(([, ws]) => { total += ws.length; });
    const span = Math.min(L.b - L.a - 0.6, total * 0.32);
    let k = 0;
    L.rows.forEach(([cls, words]) => {
      const row = document.createElement("div"); row.className = "row " + cls;
      words.forEach((raw) => {
        const [w, extra] = raw.split("|");
        const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w; row.appendChild(s);
        const t = L.a + (total > 1 ? (span * k) / (total - 1) : 0); k++;
        const isBig = cls === "big";
        F(s, { opacity: 0, yPercent: isBig ? 55 : 40, scale: isBig ? 0.92 : 1, filter: "blur(10px)" },
          { opacity: 1, yPercent: 0, scale: 1, filter: "blur(0px)", duration: isBig ? 0.5 : 0.36, ease: isBig ? "back.out(1.5)" : "expo.out" }, t);
      });
      ln.appendChild(row);
    });
    typeEl.appendChild(ln);
    if (L.b < 90) tl.to(ln, { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.28, ease: "power2.in" }, L.b - 0.28);
  });

  // ---------- câmera: o celular em 3D, sempre andando ----------
  F("#phoneRig", { opacity: 0, y: 80, scale: 0.9, rotationY: -26, rotationX: 8 }, { opacity: 1, y: 0, scale: 1, rotationY: -16, rotationX: 5, duration: 0.9, ease: "expo.out" }, 0);
  T("#phoneRig", { rotationY: -9, rotationX: 2, scale: 1.04, duration: 9.8, ease: "none" }, 0.9);
  T("#phoneRig", { rotationY: -18, rotationX: 4, scale: 0.98, duration: 0.7, ease: "power3.inOut" }, 10.7);
  T("#phoneRig", { rotationY: -8, rotationX: 2, scale: 1.04, duration: 8, ease: "none" }, 11.4);
  T("#phoneRig", { rotationY: -14, rotationX: 3, scale: 1.08, duration: 4.6, ease: "power1.inOut" }, 19.4);

  // ---------- 1. responde com os dados do imóvel ----------
  show("#sChat", 0.3, { duration: 0.3 });
  pop("#m1", 1.9);
  show("#crono", 2.0, { duration: 0.3 });
  count($("#cv"), 0, 4, 1.2, 2.0, (v) => "00:0" + Math.round(v));
  show("#ty1", 2.4, { duration: 0.2 });
  [1, 2, 3].forEach((n) => F(`#ty1 i:nth-child(${n})`, { y: 0 }, { y: -6, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.3 + n * 0.1));
  tl.set("#ty1", { display: "none" }, 3.2);
  pop("#m2", 3.2);
  passo("#p1", 3.3);
  [["#f1", 4.4], ["#f2", 4.6], ["#f3", 4.8]].forEach(([s, t]) => F(s, { opacity: 0, scale: 0.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, t));
  hide("#crono", 5.9);

  // ---------- 2. pergunta o que importa ----------
  pop("#m3", 6.4);
  pop("#m4", 8.9);
  passo("#p2", 9.0);

  // ---------- 3. separa ----------
  T("#sChat", { opacity: 0, x: -50, duration: 0.3, ease: "power2.in" }, 10.75);
  show("#sLista", 10.95, { duration: 0.25 });
  F(["#l1", "#l2", "#l3", "#l4"], { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.38, stagger: 0.09, ease: "expo.out" }, 11.0);
  T("#l3", { top: 150, duration: 0.6, ease: "power3.inOut" }, 12.3);
  T("#l1", { top: 282, duration: 0.6, ease: "power3.inOut" }, 12.3);
  T("#l2", { top: 414, duration: 0.6, ease: "power3.inOut" }, 12.3);
  T("#l3", { borderColor: "#B8FF4F", backgroundColor: "#151a0f", duration: 0.3 }, 12.6);
  T(["#l1", "#l2", "#l4"], { opacity: 0.4, duration: 0.4 }, 12.8);
  passo("#p3", 12.4);

  // ---------- 4. marca a visita ----------
  T("#sLista", { opacity: 0, x: -50, duration: 0.3, ease: "power2.in" }, 13.95);
  show("#sAgenda", 14.15, { duration: 0.25 });
  F("#visita", { opacity: 0, y: -140, scale: 1.12 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 14.85);
  passo("#p4", 14.9);

  // ---------- 5. avisa (plano B: o sininho do app) ----------
  hide(["#sAgenda .ttl", "#sAgenda .dia"], 17.15, { duration: 0.2 });
  F("#aviso", { opacity: 0, y: -150 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, 17.2);
  passo("#p5", 17.3);
  T("#aviso", { opacity: 0, y: -150, duration: 0.35, ease: "power2.in" }, 19.0);

  // ---------- 6. você assume quando quiser ----------
  T("#sAgenda", { opacity: 0, x: -50, duration: 0.3, ease: "power2.in" }, 19.2);
  show("#sAssumir", 19.4, { duration: 0.25 });
  tl.set("#toque", { left: 140, top: 190 }, 0);
  F("#toque", { opacity: 1, scale: 0.4 }, { opacity: 0, scale: 1.6, duration: 0.55, ease: "power2.out" }, 20.1);
  F("#btn", { scale: 0.94 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 20.1);
  show("#btn .b2", 20.2, { duration: 0.2 });
  tl.set("#btn", { color: "#E8E8E0", backgroundColor: "#1b1b19" }, 20.4);
  F("#faixa", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 20.45);
  T("#m5", { opacity: 0.45, duration: 0.4 }, 20.45);

  for (let i = 0; i < 24 * 12; i++) tl.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);
  tl.set({}, {}, 24);
  window.__timelines["main"] = tl;
})();
