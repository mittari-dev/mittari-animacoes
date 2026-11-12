// Base comum da série "Você não viu". Cada vídeo define DUR e SEED antes deste bloco.
// A narração entra 0,3 s depois do som do quadro 1 e toca 10% mais rápida:
// W() converte o tempo de cada palavra medido no áudio original (Scribe, _dev/words.json).
const W = (t) => 0.3 + t / 1.1;
let seed = SEED;
const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const tl = gsap.timeline({ paused: true });
const F = (target, from, to, at) => tl.fromTo(target, from, Object.assign({ immediateRender: false }, to), at);
const OUT = (el, at) => F(el, { opacity: 1, y: 0, filter: "blur(0px)" }, { opacity: 0, y: -40, filter: "blur(10px)", duration: 0.25, ease: "power2.in" }, at);
const SHOW = (el, at, d = 0.15) => F(el, { opacity: 0 }, { opacity: 1, duration: d }, at);
const HIDE = (el, at, d = 0.15) => F(el, { opacity: 1 }, { opacity: 0, duration: d }, at);
const POP = (el, at, o = "50% 50%") => F(el, { opacity: 0, scale: 0.5, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(2)", transformOrigin: o }, at);
const BUB = (el, at, side = "100% 100%") => POP(el, at, side);
const PULSE = (el, at, s = 1.08, o = "50% 50%") => F(el, { scale: 1 }, { scale: s, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: o }, at);
const SHAKE = (el, at, n = 5, px = 12) => F(el, { x: 0 }, { x: px, duration: 0.05, repeat: n, yoyo: true, ease: "sine.inOut" }, at);
const MARK = (sel, at) => F(sel + " .mk", { opacity: 0, scale: 0, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.5)" }, at);
let _ln = 0;
function lines(top, rows) {
  const ln = document.createElement("div"); ln.className = "ln"; ln.id = "tx" + (++_ln); ln.style.top = top + "px";
  rows.forEach(([cls, words]) => {
    const row = document.createElement("div"); row.className = "row " + cls;
    words.forEach(([w, t, extra]) => {
      const s = document.createElement("span"); s.className = "w" + (extra ? " " + extra : ""); s.textContent = w; row.appendChild(s);
      const big = !cls.startsWith("sm");
      F(s, { opacity: 0, yPercent: big ? 45 : 35, filter: "blur(10px)" }, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: big ? 0.42 : 0.34, ease: big ? "back.out(1.5)" : "expo.out" }, Math.max(0, t - 0.04));
    });
    ln.appendChild(row);
  });
  $("#type").appendChild(ln);
  return ln;
}
function typeWords(sel, words) {
  const el = $(sel);
  words.forEach(([w, t], i) => {
    const s = document.createElement("span"); s.className = "ww"; s.textContent = w; el.appendChild(s);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    F(s, { opacity: 0 }, { opacity: 1, duration: 0.1 }, t - 0.03);
  });
}
const ICONES = {
  comenta: '<svg viewBox="0 0 120 120"><path d="M14 22 H106 V84 H58 L34 106 V84 H14 Z" fill="#0A0A0A"/></svg>',
  manda: '<svg viewBox="0 0 120 120"><path d="M10 58 L110 12 L78 108 L56 68 Z" fill="#0A0A0A"/><path d="M56 68 L110 12" stroke="#B8FF4F" stroke-width="6"/></svg>',
  direct: '<svg viewBox="0 0 120 120"><rect x="10" y="24" width="100" height="72" rx="12" fill="#0A0A0A"/><path d="M16 32 L60 66 L104 32" fill="none" stroke="#B8FF4F" stroke-width="8" stroke-linejoin="round"/></svg>',
};
// A porta: toda peça da série termina pedindo uma coisa só.
function porta(at, icone, l1, l2) {
  $("#pIco").innerHTML = ICONES[icone]; $("#pL1").innerHTML = l1; $("#pL2").innerHTML = l2;
  F("#stage", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.94, duration: 0.22, ease: "power2.in" }, at - 0.24);
  tl.set("#porta", { opacity: 1 }, at);
  F("#pIco", { opacity: 0, scale: 0, rotation: -60 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.2)" }, at);
  F("#pL1", { opacity: 0, y: 50, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "back.out(1.5)" }, at + 0.1);
  F("#pL2", { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }, at + 0.3);
  F("#pSeta", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, at + 0.55);
  F("#pSeta", { y: 0 }, { y: 26, duration: 0.3, repeat: 9, yoyo: true, ease: "sine.inOut" }, at + 0.85);
  F("#pK", { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.7);
  PULSE("#pIco", at + 1.2, 1.12); PULSE("#pIco", at + 2.2, 1.12);
}
function fim() {
  F("#type", { x: 0 }, { x: -14, duration: DUR, ease: "none" }, 0);
  F("#world", { transformPerspective: 2400, rotationY: -3, rotationX: 2 }, { rotationY: 3, rotationX: -1.5, duration: DUR, ease: "none" }, 0);
  for (let i = 0; i < DUR * 12; i++) tl.set("#grain", { x: Math.round(rnd() * 200 - 100), y: Math.round(rnd() * 200 - 100) }, i / 12);
  tl.set({}, {}, DUR);
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
}
