// Trilha eletrônica limpa, 110 BPM, sintetizada de forma determinística.
// Seção A (0–7.3s, lá menor, rotina) → corte seco no bloqueio → silêncio →
// seção B (14.6–26s, dó maior, virada) → acorde final decaindo até 30s.
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 44100;
const DUR = 30;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);

const BPM = 110;
const BEAT = 60 / BPM;
const A_START = 0, A_CUT = 7.3;
const B_START = 14.6, B_END = 26.0;

let seed = 1337;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

function add(t0, buf, gain = 1, pan = 0) {
  const s0 = Math.round(t0 * SR);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < buf.length; i++) {
    const j = s0 + i;
    if (j < 0 || j >= N) continue;
    L[j] += buf[i] * gl;
    R[j] += buf[i] * gr;
  }
}

function kick() {
  const n = Math.round(0.42 * SR), b = new Float32Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 45 + 95 * Math.exp(-t * 28);
    ph += (2 * Math.PI * f) / SR;
    b[i] = Math.sin(ph) * Math.exp(-t * 7.5) * (1 - Math.exp(-t * 900));
  }
  return b;
}
function hat(len = 0.05) {
  const n = Math.round(len * 1.6 * SR), b = new Float32Array(n);
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const x = rnd();
    const hp = x - prev; prev = x;
    b[i] = hp * Math.exp(-(i / SR) / len * 4) * 0.5;
  }
  return b;
}
function clap() {
  const n = Math.round(0.3 * SR), b = new Float32Array(n);
  let lp = 0, prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const x = rnd();
    lp += 0.35 * (x - lp);
    const bp = lp - prev; prev = lp;
    const burst = t < 0.03 ? (Math.floor(t / 0.01) % 2 === 0 ? 1 : 0.4) : 1;
    b[i] = bp * burst * Math.exp(-t * 16) * 1.6;
  }
  return b;
}
function pluck(midi, len, bright) {
  const n = Math.round(len * SR), b = new Float32Array(n), f = mtof(midi);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const ph = (t * f) % 1;
    const saw = 2 * ph - 1;
    const tri = 1 - 4 * Math.abs(ph - 0.5);
    const x = saw * 0.45 + tri * 0.55;
    const cut = bright * Math.exp(-t * 9) + 0.04;
    lp += cut * (x - lp);
    b[i] = lp * Math.exp(-t * 6) * (1 - Math.exp(-t * 400));
  }
  return b;
}
function bass(midi, len) {
  const n = Math.round(len * SR), b = new Float32Array(n), f = mtof(midi);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = (1 - Math.exp(-t * 300)) * Math.min(1, (len - t) * 40) * (0.55 + 0.45 * Math.min(1, t * 6));
    b[i] = (Math.sin(2 * Math.PI * f * t) + 0.18 * Math.sin(4 * Math.PI * f * t)) * env;
  }
  return b;
}
function pad(midis, len, att = 0.4, rel = 1.2) {
  const n = Math.round(len * SR), b = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let x = 0;
    for (const m of midis) for (const d of [-0.09, 0.08]) x += 2 * ((t * mtof(m + d)) % 1) - 1;
    x /= midis.length * 2;
    lp += 0.03 * (x - lp);
    const env = Math.min(1, t / att) * Math.min(1, Math.max(0, (len - t) / rel));
    b[i] = lp * env;
  }
  return b;
}

// Acordes (raiz para baixo, notas para pad/arpejo)
const A_CHORDS = [ [45, [57, 60, 64]], [45, [57, 60, 64]], [41, [57, 60, 65]], [43, [55, 59, 62]] ]; // Am Am F G
const B_CHORDS = [ [36, [60, 64, 67]], [43, [59, 62, 67]], [45, [60, 64, 69]], [41, [60, 65, 69]] ]; // C G Am F
const BAR = BEAT * 4;
const K = kick(), H = hat(0.04), HO = hat(0.12), C = clap();

function section(t0, t1, chords, bright, full) {
  const bars = Math.ceil((t1 - t0) / BAR);
  for (let bi = 0; bi < bars; bi++) {
    const [root, notes] = chords[bi % chords.length];
    const bt = t0 + bi * BAR;
    add(bt, pad(notes, BAR + 0.6, 0.3, 0.6), full ? 0.16 : 0.12, 0);
    for (let s = 0; s < 16; s++) {
      const t = bt + (s * BEAT) / 4;
      if (t >= t1) break;
      // arpejo em semicolcheias com eco pontuado
      const arp = [0, 1, 2, 1, 2, 0, 1, 2][s % 8];
      const m = notes[arp] + (s % 8 === 4 ? 12 : 0);
      const p = pluck(m, 0.4, bright);
      const pan = s % 2 ? 0.35 : -0.35;
      add(t, p, 0.16, pan);
      add(t + BEAT * 0.75, p, 0.06, -pan);
      if (s % 2 === 0) add(t, bass(root, BEAT / 2 - 0.02), 0.32, 0);
    }
    for (let q = 0; q < 4; q++) {
      const t = bt + q * BEAT;
      if (t >= t1) break;
      if (!(bi === 0 && t0 === A_START)) add(t, K, 0.75, 0); // intro do primeiro compasso sem bumbo
      add(t + BEAT / 2, q === 3 && full ? HO : H, 0.22, 0.2);
      if (full && (q === 1 || q === 3)) add(t, C, 0.32, 0);
    }
  }
}

section(A_START, A_CUT, A_CHORDS, 0.12, false);
// corte seco no bloqueio (fade de 6 ms só para evitar clique)
const cut = Math.round(A_CUT * SR), fade = Math.round(0.006 * SR);
for (let i = cut - fade; i < N; i++) {
  const g = i < cut ? (cut - i) / fade : 0;
  L[i] *= g; R[i] *= g;
}

section(B_START, B_END, B_CHORDS, 0.3, true);
// limpa qualquer cauda além do fim da seção B antes do final
// final: bumbo + acorde de dó aberto decaindo até 30s
add(B_END, K, 0.8, 0);
add(B_END, pad([48, 55, 60, 64, 67], DUR - B_END, 0.05, 3.6), 0.3, 0);
add(B_END, pluck(72, 2.5, 0.25), 0.2, -0.2);
add(B_END + BEAT * 0.75, pluck(79, 2.5, 0.2), 0.1, 0.3);

// normaliza e grava WAV 16-bit
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const g = 0.89 / peak;
const out = Buffer.alloc(44 + N * 4);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVE", 8);
out.write("fmt ", 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34);
out.write("data", 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const sl = Math.max(-1, Math.min(1, Math.tanh(L[i] * g * 1.1)));
  const sr = Math.max(-1, Math.min(1, Math.tanh(R[i] * g * 1.1)));
  out.writeInt16LE(Math.round(sl * 32767), 44 + i * 4);
  out.writeInt16LE(Math.round(sr * 32767), 46 + i * 4);
}
mkdirSync(new URL("../assets/audio/", import.meta.url), { recursive: true });
writeFileSync(new URL("../assets/audio/trilha.wav", import.meta.url), out);
console.log("ok peak", peak.toFixed(3));
