// Trilha sintetizada, determinística: pad em lá menor + pulso grave, 110 BPM, 22s.
import { writeFileSync } from "fs";
const SR = 44100, DUR = 22, N = SR * DUR, BPM = 110, beat = 60 / BPM;
const L = new Float32Array(N), R = new Float32Array(N);
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
// acordes (meia nota = 2 batidas): Am, F, C, G em loop
const chords = [[57,60,64],[53,57,60],[48,55,60],[55,59,62]];
const bars = beat * 4;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  // envelope geral: entra suave, cai no bloqueio (2.6–3.4s), volta, fade final
  let g = Math.min(1, t / 1.5);
  if (t > 2.6 && t < 3.6) g *= Math.max(0.08, Math.abs(t - 3.1) / 0.5);
  g *= Math.min(1, (DUR - t) / 1.8);
  const ci = Math.floor(t / bars) % 4, ch = chords[ci];
  const tin = (t % bars) / bars;
  const swell = 0.6 + 0.4 * Math.sin(Math.PI * tin);
  let pl = 0, pr = 0;
  for (const m of ch) {
    const f = midi(m);
    pl += Math.sin(2 * Math.PI * f * t) * 0.6 + Math.sin(2 * Math.PI * f * 1.003 * t) * 0.4;
    pr += Math.sin(2 * Math.PI * f * t) * 0.6 + Math.sin(2 * Math.PI * f * 0.997 * t) * 0.4;
  }
  pl *= 0.045 * swell; pr *= 0.045 * swell;
  // pulso grave em colcheias, só depois do hook
  const eighth = beat / 2, te = t % eighth;
  const bassF = midi(ch[0] - 12);
  const bass = t > 3.4 ? Math.sin(2 * Math.PI * bassF * t) * Math.exp(-te * 9) * 0.16 : 0;
  // bumbo suave em cada tempo
  const tb = t % beat;
  const kick = t > 3.4 ? Math.sin(2 * Math.PI * (48 + 90 * Math.exp(-tb * 30)) * tb) * Math.exp(-tb * 12) * 0.28 : 0;
  L[i] = (pl + bass + kick) * g; R[i] = (pr + bass + kick) * g;
}
// normaliza e grava WAV 16-bit estéreo
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const k = 0.7 / peak, buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(L[i] * k * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * k * 32767), 46 + i * 4); }
writeFileSync("assets/trilha.wav", buf);
console.log("ok");
