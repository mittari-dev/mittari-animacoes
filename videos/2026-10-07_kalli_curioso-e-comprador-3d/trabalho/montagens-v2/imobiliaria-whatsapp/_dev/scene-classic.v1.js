const DUR = /*DUR*/;
const MAPO = /*MAPO*/, MAPN = /*MAPN*/;
const interp = (x, A, B) => { if (x <= A[0]) return B[0] + (x - A[0]); for (let i = 0; i < A.length - 1; i++) { if (x <= A[i + 1]) { const k = (x - A[i]) / ((A[i + 1] - A[i]) || 1); return B[i] + (B[i + 1] - B[i]) * k; } } return B[B.length - 1] + (x - A[A.length - 1]); };
const M = (x) => interp(x, MAPO, MAPN), MI = (x) => interp(x, MAPN, MAPO);
const VARIANT = "/*VARIANT*/";
const AUD = "/*AUD*/";
const IMOB = /*IMOB*/;
const COUNT = AUD === "imob" ? 34 : 60;

// ---------------- utilidades ----------------
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
let seed = 20261007;
const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const $ = (s) => document.querySelector(s);

// ---------------- timeline GSAP (texto, trilho, grão) ----------------
const tl0 = gsap.timeline({ paused: true });
const tl = { to: (a, b, c) => tl0.to(a, b, c === undefined ? c : M(c)), fromTo: (a, b, d, c) => tl0.fromTo(a, b, d, c === undefined ? c : M(c)), set: (a, b, c) => tl0.set(a, b, c === undefined ? c : M(c)) };
const F = (target, from, to, at) => tl.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
const F0 = (target, from, to, at) => tl0.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
const LINES = [
  { a: 0.6, b: 4.55, rows: [["big", [["Quantas", 0.7], ["dessas", 1.0]]], ["serif", [["você", 1.5], ["respondeu", 1.7], ["hoje?", 2.0, "lm"]]]] },
  { a: 4.8, b: 7.05, rows: [["sm", [["A", 4.84], ["maioria", 4.96], ["está", 5.4]]], ["big", [["só", 5.68], ["olhando.", 5.92]]]] },
  { a: 7.15, b: 12.85, rows: [["sm", [["Mas,", 7.2], ["no", 7.52], ["meio", 7.68], ["delas,", 8.04]]], ["big", [["o", 8.64], ["comprador", 9.04, "lm"]]], ["serif", [["espera", 10.64], ["na", 10.88], ["mesma", 11.24], ["fila.", 11.6]]]] },
  { a: 13.95, b: 16.3, rows: [["big", [["Agora,", 14.08]]], ["serif", [["com", 14.88], ["a", 15.0], ["Kalli.", 15.12, "lm"]]]] },
  { a: 16.4, b: 21.0, rows: [["sm", [["A", 16.46], ["Kalli", 16.56], ["responde", 16.8]]], ["big", [["com", 18.44], ["os", 18.56], ["dados", 18.8], ["do", 19.0], ["imóvel", 19.16]]], ["serif", [["e", 19.76], ["manda", 19.92], ["as", 20.08], ["fotos.", 20.2, "lm"]]]] },
  { a: 21.06, b: 26.5, rows: [["sm", [["Pergunta", 21.12], ["o", 21.47], ["que", 21.52], ["importa:", 21.6]]], ["big", [["onde,", 22.68], ["até", 23.12], ["quanto,", 23.36], ["para", 24.8], ["quando.", 24.96, "lm"]]]] },
  { a: 26.58, b: 29.7, rows: [["sm", [["Separa", 26.64]]], ["big", [["quem", 27.08], ["está", 27.28], ["pronto", 27.6, "lm"]]], ["serif", [["de", 28.0], ["quem", 28.11], ["está", 28.24], ["pesquisando.", 28.56]]]] },
  { a: 29.62, b: 33.1, rows: [["sm", [["E", 29.66], ["marca", 29.84], ["a", 30.04], ["visita.", 30.2]]], ["big", [["você", 31.8], ["recebe", 32.04], ["esse.", 32.48, "lm"]]]] },
  { a: 33.15, b: 36.4, rows: [["serif", [["E,", 33.2], ["se", 33.44], ["quiser,", 33.6]]], ["big", [["você", 34.2], ["assume.", 34.64, "lm"]]]] },
  { a: 36.9, b: 40.1, rows: [["big", [["Você", 37.15], ["só", 37.36], ["fala", 37.68], ["com", 38.08], ["quem", 38.24]]], ["serif", [["já", 38.56], ["quer", 38.8], ["ver", 39.04], ["o", 39.2], ["imóvel.", 39.28, "lm"]]]] },
  { a: 40.2, b: 44.85, rows: [["sm", [["Uma", 40.32], ["venda", 40.48], ["que", 40.8], ["não", 41.04], ["se", 41.2], ["perde", 41.44], ["na", 41.72], ["fila", 42.24]]], ["big", [["paga", 42.64], ["5", 43.12, "lm"], ["anos", 43.6, "lm"], ["de", 43.84], ["Kalli.", 43.96]]]] },
  { a: 44.95, b: 99, rows: [["big", [["Teste", 45.0], ["no", 45.12], ["seu", 45.24], ["número.", 45.4]]], ["serif", [["Sete", 46.2], ["dias,", 46.48], ["de", 47.0], ["graça.", 47.12, "lm"]]]] },
];
const typeEl = $("#type");
LINES.forEach((Ln0, idx) => {
  const Ln = (AUD === "imob" && IMOB[idx]) ? IMOB[idx] : Ln0;
  const FF = Ln.abs ? F0 : F, TT = Ln.abs ? tl0 : tl;
  const ln = document.createElement("div"); ln.className = "ln";
  Ln.rows.forEach(([cls, words]) => {
    const row = document.createElement("div"); row.className = "row " + cls;
    words.forEach(([w, t, extra]) => {
      const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w; row.appendChild(s);
      const big = cls !== "sm";
      FF(s, { opacity: 0, yPercent: big ? 50 : 40, filter: "blur(10px)" }, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: big ? 0.5 : 0.4, ease: big ? "back.out(1.4)" : "expo.out" }, Math.max(0, t - 0.04));
    });
    ln.appendChild(row);
  });
  typeEl.appendChild(ln);
  if (Ln.b < 90) TT.to(ln, { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.3, ease: "power2.in" }, Ln.b - 0.3);
});
F("#typeCam", { x: 0 }, { x: -18, duration: DUR, ease: "none" }, 0);
// trilho de passos
F("#rail", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, 16.5);
[17.25, 21.12, 26.64, 29.84, 31.8, 33.2].forEach((t, i) => {
  tl.to(`#s${i}`, { color: "#ECECE4", duration: 0.25 }, t);
  tl.to(`#s${i} i`, { backgroundColor: "#B8FF4F", borderColor: "#B8FF4F", color: "#0A0A0A", duration: 0.25 }, t);
  F(`#s${i} i`, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, t);
});
tl.to("#rail", { opacity: 0, duration: 0.4 }, 36.3);
// a conta
F("#foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 41.2);
F("#count", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 40.9);
const cnt = { v: 0 };
tl.to(cnt, { v: COUNT, duration: COUNT === 60 ? 2.1 : 1.2, ease: "none", onUpdate: () => { $("#count").textContent = Math.round(cnt.v) + " meses"; } }, 40.95);
tl.to(["#foot", "#count"], { opacity: 0, duration: 0.35 }, 44.6);
F("#cta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 47.35);
if (VARIANT === "site") F("#cta .btn", { scale: 1 }, { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }, 48.7);
F("#word", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 46.1);
for (let i = 0; i < DUR * 12; i++) tl.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);


tl0.set({}, {}, DUR);
window.__timelines["main"] = tl0;
