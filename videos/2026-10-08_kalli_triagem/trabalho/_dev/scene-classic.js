const DUR = 49.6;
// ---------------- utilidades (também usadas pelo módulo 3D) ----------------
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eOut = (x) => 1 - Math.pow(1 - x, 3);
const backOut = (x, s = 1.7) => { const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
const seg = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, x) => a + (b - a) * x;
const L3 = (a, b, x) => [lerp(a[0], b[0], x), lerp(a[1], b[1], x), lerp(a[2], b[2], x)];
function keys(K, t) {
  if (t <= K[0].t) return K[0];
  for (let i = 0; i < K.length - 1; i++) {
    const a = K[i], b = K[i + 1];
    if (t <= b.t) { const x = ease((t - a.t) / (b.t - a.t)); const o = {}; for (const k in a) if (k !== "t") o[k] = L3(a[k], b[k], x); return o; }
  }
  return K[K.length - 1];
}
let seed = 20261008;
const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const $ = (s) => document.querySelector(s);

// ---------------- timeline GSAP (letra, cores, fim) ----------------
const tl0 = gsap.timeline({ paused: true });
const F = (target, from, to, at) => tl0.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
// tempos de cada palavra: ElevenLabs Scribe (voz Sandro Dutra)
const LINES = [
  { a: 0.05, b: 4.25, rows: [["sm", [["Num", 0.08], ["pronto-socorro,", 0.24]]], ["big", [["ninguém", 1.44], ["é", 1.96], ["atendido", 2.08]]], ["serif", [["por", 2.64], ["ordem", 2.92], ["de", 3.16], ["chegada.", 3.28, "rd"]]]] },
  { a: 4.5, b: 9.45, rows: [["sm", [["Na", 4.53], ["porta,", 4.64], ["a", 5.28], ["enfermeira", 5.36], ["faz", 5.92], ["a", 6.12]]], ["big", [["triagem.", 6.24, "lm"]]], ["serif", [["Cada", 7.2], ["paciente", 7.52], ["ganha", 8.16], ["uma", 8.4], ["pulseira.", 8.56]]]] },
  { a: 19.75, b: 24.15, rows: [["sm", [["É", 19.82], ["o", 19.88]]], ["big", [["Protocolo", 20.0], ["de", 20.48], ["Manchester.", 20.64, "lm"]]], ["serif", [["Hospitais", 21.88], ["do", 22.44], ["Brasil", 22.56], ["e", 23.2], ["do", 23.28], ["mundo.", 23.44]]]] },
  { a: 24.35, b: 26.8, rows: [["big", [["Agora,", 24.4], ["olha", 25.36], ["o", 25.6], ["seu", 25.68]]], ["serif", [["WhatsApp.", 25.84, "lm"]]]] },
  { a: 26.95, b: 31.95, rows: [["sm", [["Quem", 27.02], ["quer", 27.2], ["visitar", 27.36], ["no", 27.84], ["sábado", 28.0]]], ["big", [["espera", 28.56], ["na", 29.04], ["mesma", 29.28], ["fila", 29.76]]], ["serif", [["de", 30.04], ["quem", 30.16], ["só", 30.4], ["perguntou", 30.64], ["o", 31.12], ["preço.", 31.28]]]] },
  { a: 32.1, b: 33.7, rows: [["big", [["Por", 32.14], ["ordem", 32.24]]], ["serif", [["de", 32.56], ["chegada.", 32.72, "rd"]]]] },
  { a: 33.8, b: 36.3, rows: [["sm", [["A", 33.82], ["Kalli", 34.0], ["faz", 34.56], ["a", 34.84]]], ["big", [["triagem", 34.96]]], ["serif", [["por", 35.52], ["você.", 35.64, "lm"]]]] },
  { a: 36.35, b: 41.15, rows: [["sm", [["Pergunta", 36.39], ["o", 36.76], ["que", 36.84], ["importa,", 37.12]]], ["big", [["separa", 37.68], ["quem", 38.24], ["está", 38.4], ["pronto", 38.72, "lm"]]], ["serif", [["e", 39.8], ["te", 39.92], ["avisa", 40.08], ["primeiro.", 40.56, "lm"]]]] },
  { a: 41.25, b: 44.35, rows: [["sm", [["O", 41.28], ["resto,", 41.36]]], ["big", [["ela", 42.08], ["atende", 42.24]]], ["serif", [["enquanto", 42.76], ["você", 43.2], ["vende.", 43.52, "lm"]]]] },
  { a: 44.5, b: 999, rows: [["big", [["Teste", 44.52], ["7", 44.8, "lm"], ["dias", 45.2]]], ["serif", [["de", 45.8], ["graça.", 45.92, "lm"]]]] },
];
const typeEl = $("#type");
LINES.forEach((Ln) => {
  const ln = document.createElement("div"); ln.className = "ln";
  Ln.rows.forEach(([cls, words]) => {
    const row = document.createElement("div"); row.className = "row " + cls;
    words.forEach(([w, t, extra]) => {
      const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w; row.appendChild(s);
      const big = cls !== "sm";
      F(s, { opacity: 0, yPercent: big ? 50 : 40, filter: "blur(10px)" }, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: big ? 0.5 : 0.4, ease: big ? "back.out(1.4)" : "expo.out" }, Math.max(0, t - 0.04));
    });
    ln.appendChild(row);
  });
  typeEl.appendChild(ln);
  if (Ln.b < 90) tl0.to(ln, { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, Ln.b - 0.3);
});
// as cores do protocolo (uma linha por cor, no tempo da voz)
const CORES = [["#E5383B", "Vermelho", "atende agora", 9.68], ["#F28C28", "Laranja", "até 10 minutos", 12.08], ["#F5C518", "Amarelo", "até 1 hora", 14.7], ["#2FBF71", "Verde", "pode esperar", 17.2], ["#2D7FF9", "Azul", "pode esperar", 17.68]];
const cores = document.createElement("div"); cores.className = "ln"; cores.style.top = "1150px";
CORES.forEach(([c, n, d, t]) => {
  const r = document.createElement("div"); r.className = "cr";
  r.innerHTML = '<i style="background:' + c + '"></i><b style="color:' + c + '">' + n + "</b><span>" + d + "</span>";
  cores.appendChild(r);
  F(r, { opacity: 0, x: -40, filter: "blur(8px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.4)" }, t - 0.04);
});
typeEl.appendChild(cores);
tl0.to(cores, { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, 19.45);
F("#src", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 20.6);
tl0.to("#src", { opacity: 0, duration: 0.3 }, 23.9);
F("#typeCam", { x: 0 }, { x: -14, duration: DUR, ease: "none" }, 0);
F("#word", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 45.4);
F("#cta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 46.7);
F("#cta .btn", { scale: 1 }, { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }, 47.6);
for (let i = 0; i < DUR * 12; i++) tl0.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);
tl0.set({}, {}, DUR);
window.__timelines["main"] = tl0;
