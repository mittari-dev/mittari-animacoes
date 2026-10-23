import * as THREE from "three";
import { RoundedBoxGeometry } from "./assets/vendor/RoundedBoxGeometry.js";
import { RoomEnvironment } from "./assets/vendor/RoomEnvironment.js";
// ---------------- Three.js ----------------
const canvas = $("#gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(1920, 1080, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(32, 1920 / 1080, 0.05, 100);
const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-2, 3, 4); scene.add(key);
const rim = new THREE.PointLight(0xb8ff4f, 8, 6); rim.position.set(1.7, 0.8, -1.0); scene.add(rim);

// celular
const phone = new THREE.Group(); scene.add(phone);
const body = new THREE.Mesh(new RoundedBoxGeometry(0.78, 1.64, 0.09, 8, 0.1),
  new THREE.MeshPhysicalMaterial({ color: 0x151515, metalness: 0.75, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12 }));
phone.add(body);
const SW = 720, SH = 1560;
const sc = document.createElement("canvas"); sc.width = SW; sc.height = SH;
const sx = sc.getContext("2d");
const stex = new THREE.CanvasTexture(sc); stex.colorSpace = THREE.SRGBColorSpace; stex.anisotropy = 8;
const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 1.56), new THREE.MeshBasicMaterial({ map: stex, transparent: true, toneMapped: false }));
screen.position.z = 0.0462; phone.add(screen);

// ---------------- desenho 2D ----------------
function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function wrap(c, text, maxW) {
  const words = text.split(" "); const lines = []; let cur = "";
  words.forEach((w) => { const test = cur ? cur + " " + w : w; if (c.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; });
  if (cur) lines.push(cur); return lines;
}
const LIMA = "#B8FF4F";
function textTex(w, h, draw) {
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const c = cv.getContext("2d"); draw(c, w, h);
  const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx;
}
function cardMesh(tex, wU, hU) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(wU, hU), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false }));
  scene.add(m); m.visible = false; return m;
}

// ---------------- recursos (fontes e fotos) ----------------
const imgs = {};
const loadImg = (k, src) => new Promise((res) => { const im = new Image(); im.onload = () => { imgs[k] = im; res(); }; im.onerror = () => res(); im.src = src; });
let ready = false;
const objs = {};
window.__hf = window.__hf || {};
window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady["w02-3d"] = (async () => {
  await Promise.all(["500 30px Inter", "600 46px Inter", "700 34px Inter", "800 34px Inter", "900 120px Archivo", "800 150px Archivo"].map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  await Promise.all([loadImg("f1", "assets/foto-sala.png"), loadImg("f2", "assets/foto-cozinha.png"), loadImg("f3", "assets/foto-varanda.png"), loadImg("sym", "assets/simbolo-lima.png")]);
  build();
  ready = true;
  renderAt(window.__hfThreeTime || 0);
})();

// ---------------- a torre de perguntas ----------------
const Q = ["Ainda está disponível?", "Qual o valor?", "Quantos quartos?", "Onde fica?", "Tem foto?", "Aceita financiamento?", "Tem vaga?", "Quanto é o condomínio?", "Aceita pet?", "Ainda tem?", "Qual o bairro?", "Tem varanda?", "Pode baixar?", "Quero visitar no sábado.", "Tem mais fotos?", "É perto da praia?", "Qual o IPTU?", "Aceita permuta?", "Tem elevador?", "Ainda está à venda?", "Quanto fica a entrada?", "Tem área de lazer?", "É mobiliado?", "Qual o andar?", "Aceita FGTS?", "Tem portaria?", "Dá pra negociar?", "Qual o tamanho?", "Tem suíte?", "Ainda disponível?", "Tem garagem?", "Valor final?", "Aceita proposta?", "Manda o endereço?"];
const EXTRA = ["Oi?", "Tem algum mais barato?", "Ainda tem??", "Qual o valor mesmo?", "Me liga?", "Tem vídeo?"];
const BUY = 13;
const TX = 1.22, TZ = -0.25;
const bubbles = [];
function bubbleTex(text, lime) {
  const c0 = document.createElement("canvas").getContext("2d"); c0.font = "600 46px Inter";
  const w = Math.ceil(c0.measureText(text).width) + 90, h = 116;
  return { tex: textTex(w, h, (c) => { rr(c, 4, 4, w - 8, h - 8, 44); c.fillStyle = lime ? LIMA : "#232321"; c.fill(); if (!lime) { c.strokeStyle = "#3a3a36"; c.lineWidth = 3; c.stroke(); } c.font = "600 46px Inter"; c.fillStyle = lime ? "#0A0A0A" : "#E6E6DE"; c.textBaseline = "middle"; c.fillText(text, 45, h / 2 + 2); }), w, h };
}
function build() {
  // emissão: as 3 primeiras na voz, depois acelerando
  const em = [0.08, 2.0, 3.4]; let t = 3.9, dt = 0.3;
  while (em.length < Q.length) { em.push(t); t += dt; dt = Math.max(0.06, dt * 0.88); }
  Q.forEach((q, i) => {
    const a = i === BUY ? Math.PI / 2 : i * 0.92;
    const slot = [TX + Math.cos(a) * 0.5, 0.55 + i * 0.16, TZ + Math.sin(a) * 0.5];
    const g = bubbleTex(q, false); const m = cardMesh(g.tex, g.w / 1000, g.h / 1000);
    const b = { m, slot, e: em[i], i };
    if (i === BUY) { const gl = bubbleTex(q, true); b.lime = cardMesh(gl.tex, gl.w / 1000, gl.h / 1000); }
    bubbles.push(b);
  });
  const B = bubbles[BUY].slot;
  EXTRA.forEach((q, k) => {
    const g = bubbleTex(q, false); const m = cardMesh(g.tex, g.w / 1000, g.h / 1000);
    const slot = [B[0] + (k % 2 ? 0.28 : -0.3) + (rnd() - 0.5) * 0.1, B[1] - 0.12 + k * 0.08, B[2] + 0.12 + rnd() * 0.18];
    bubbles.push({ m, slot, e: 10.6 + k * 0.14, fall: true, i: 40 + k });
  });
  objs.B = new THREE.Vector3(...B);
  // fotos em 3D
  objs.photos = ["f1", "f2", "f3"].map((k) => {
    const tex = textTex(600, 600, (c) => { rr(c, 0, 0, 600, 600, 40); c.save(); c.clip(); if (imgs[k]) { const im = imgs[k]; const s = Math.max(600 / im.width, 600 / im.height); c.drawImage(im, (600 - im.width * s) / 2, (600 - im.height * s) / 2, im.width * s, im.height * s); } c.restore(); });
    return cardMesh(tex, 0.36, 0.36);
  });
  // cartões de cliente
  const CL = [["Ana", "Qualificado", "Quer comprar · Braga · até R$ 400 mil · 3 meses", true], ["Bruno", "Nutrir", "Só olhando fotos · sem prazo", false], ["Diego", "Nutrir", "Pesquisando preço", false], ["Carla", "Desqualificado", "Procura aluguel", false]];
  objs.leads = CL.map(([n, tag, why, hot]) => {
    const tex = textTex(1240, 300, (c) => {
      rr(c, 6, 6, 1228, 288, 46); c.fillStyle = hot ? "#1B2410" : "#1A1A18"; c.fill(); c.lineWidth = hot ? 6 : 3; c.strokeStyle = hot ? LIMA : "#3A3A36"; c.stroke();
      c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(110, 150, 62, 0, 7); c.fill();
      c.fillStyle = "#ECECE4"; c.font = "700 56px Inter"; c.textBaseline = "alphabetic"; c.fillText(n, 210, 128);
      c.font = "500 38px Inter"; c.fillStyle = "#8E8E86"; c.fillText(why, 210, 200);
      c.font = "800 34px Inter"; const tw = c.measureText(tag).width + 50; rr(c, 1200 - tw, 44, tw, 62, 31); c.fillStyle = hot ? LIMA : "#2E2E2A"; c.fill(); c.fillStyle = hot ? "#0A0A0A" : "#B8B8B0"; c.fillText(tag, 1225 - tw, 88);
    });
    return cardMesh(tex, 0.62, 0.15);
  });
  // cartão da agenda
  objs.agenda = cardMesh(textTex(1000, 420, (c) => {
    rr(c, 6, 6, 988, 408, 54); c.fillStyle = LIMA; c.fill();
    c.fillStyle = "#0A0A0A"; c.font = "800 44px Inter"; c.fillText("SÁB · 10 DE OUTUBRO", 60, 110);
    c.font = "900 120px Archivo"; c.fillText("10:00", 60, 250);
    c.font = "700 46px Inter"; c.fillText("Visita com Ana · Apto 2 quartos, Braga", 60, 340);
  }), 0.6, 0.252);
  // grade dos 60 meses
  const geo = new THREE.BoxGeometry(0.085, 0.085, 0.085);
  const mat = new THREE.MeshStandardMaterial({ color: 0xb8ff4f, emissive: 0x4f7a12, emissiveIntensity: 0.7, roughness: 0.35, metalness: 0.1 });
  objs.grid = new THREE.InstancedMesh(geo, mat, 60); objs.grid.frustumCulled = false; scene.add(objs.grid);
  objs.dummy = new THREE.Object3D();
  // símbolo
  const st = new THREE.Texture(imgs.sym); st.colorSpace = THREE.SRGBColorSpace; st.needsUpdate = true;
  const ar = imgs.sym ? imgs.sym.height / imgs.sym.width : 1;
  objs.sym = cardMesh(st, 0.8, 0.8 * ar);
}

// ---------------- telas do celular ----------------
const NAMES = ["Ana", "Bruno", "Carla", "Diego", "Erika", "Fábio", "Gabi", "Hugo", "Iara", "João", "Karen", "Lucas", "Marta", "Nina", "Otávio", "Paula", "Rafa", "Sara", "Téo", "Vera"];
function status(c) {
  c.fillStyle = "#ECECE4"; c.font = "600 30px Inter"; c.textBaseline = "alphabetic"; c.fillText("10:42", 60, 70);
  c.fillStyle = "#000"; rr(c, 260, 22, 200, 56, 28); c.fill();
  c.fillStyle = "#ECECE4"; rr(c, 600, 48, 54, 26, 7); c.fill();
}
function header(c, title, sub) {
  c.fillStyle = "#ECECE4"; c.font = "800 34px Inter"; c.fillText("‹", 36, 170);
  c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(120, 158, 38, 0, 7); c.fill();
  c.fillStyle = "#ECECE4"; c.font = "700 34px Inter"; c.fillText(title, 176, 152);
  c.fillStyle = "#8E8E86"; c.font = "500 24px Inter"; c.fillText(sub, 176, 186);
  c.fillStyle = "#1E1E1C"; c.fillRect(0, 222, SW, 2);
}
function inbox(c, t) {
  const n = bubbles.length ? bubbles.filter((b) => !b.fall && t >= b.e).length : 0;
  c.fillStyle = "#ECECE4"; c.font = "800 52px Inter"; c.fillText("Conversas", 44, 175);
  c.font = "800 30px Inter"; const tw = c.measureText(String(n)).width + 40; rr(c, 330, 135, tw, 52, 26); c.fillStyle = LIMA; c.fill(); c.fillStyle = "#0A0A0A"; c.fillText(String(n), 350, 172);
  const shown = Math.min(n, 9);
  for (let k = 0; k < shown; k++) {
    const idx = n - 1 - k; const q = Q[idx] || ""; const y = 235 + k * 146;
    c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(90, y + 70, 44, 0, 7); c.fill();
    c.fillStyle = "#ECECE4"; c.font = "700 32px Inter"; c.fillText(NAMES[idx % NAMES.length], 156, y + 58);
    c.fillStyle = "#9A9A92"; c.font = "500 27px Inter"; c.fillText(q.length > 26 ? q.slice(0, 25) + "…" : q, 156, y + 100);
    c.fillStyle = "#6E6E68"; c.font = "500 22px Inter"; c.fillText("agora", 600, y + 56);
    rr(c, 618, y + 76, 50, 36, 18); c.fillStyle = LIMA; c.fill(); c.fillStyle = "#0A0A0A"; c.font = "800 22px Inter"; c.fillText(String(1 + (idx % 3)), 636, y + 102);
  }
}
const MSGS = [
  { t: 15.7, side: "in", text: "Oi! Ainda está disponível? Qual o valor?" },
  { t: 17.25, side: "out", text: "Está sim! Apartamento de 2 quartos no Braga, 68 m², 1 vaga. R$ 380 mil." },
  { t: 20.15, side: "out", photos: true },
  { t: 21.15, side: "out", text: "Pra te ajudar: em qual região quer morar, até quanto pode investir e pra quando pensa em se mudar?" },
  { t: 24.1, side: "in", text: "Braga ou Centro. Até R$ 400 mil. Em até 3 meses." },
];
function chat(c, t, msgs, typing) {
  header(c, "Ana", "cliente · Apto 2 quartos, Braga");
  c.save(); c.beginPath(); c.rect(0, 226, SW, SH - 226); c.clip();
  c.font = "500 35px Inter";
  const items = msgs.map((m) => {
    if (m.photos) return { m, h: 200 };
    const lines = wrap(c, m.text, 500); return { m, lines, h: lines.length * 47 + 50 + (m.side === "out" ? 34 : 0) };
  });
  let total = 0; items.forEach((it) => { const p = eOut(seg(t, it.m.t, it.m.t + 0.35)); total += (it.h + 22) * p; });
  if (typing && t >= typing[0] && t < typing[1]) total += 90;
  const areaTop = 250, areaH = SH - 250 - 60; const off = Math.max(0, total - areaH);
  let y = areaTop - off;
  items.forEach((it) => {
    const p = eOut(seg(t, it.m.t, it.m.t + 0.35)); if (p <= 0) return;
    c.globalAlpha = p; const out = it.m.side === "out";
    if (it.m.photos) {
      ["f1", "f2", "f3"].forEach((k, j) => { const x = 160 + j * 180; c.save(); rr(c, x, y, 168, 168, 22); c.clip(); const im = imgs[k]; if (im) { const s = Math.max(168 / im.width, 168 / im.height); c.drawImage(im, x + (168 - im.width * s) / 2, y + (168 - im.height * s) / 2, im.width * s, im.height * s); } c.restore(); });
    } else {
      let yy = y;
      if (out) { c.fillStyle = LIMA; c.font = "800 20px Inter"; c.fillText("KALLI · IA", SW - 40 - 150, yy + 22); yy += 34; }
      c.font = "500 35px Inter"; const bw = Math.max(...it.lines.map((l) => c.measureText(l).width)) + 52; const bh = it.lines.length * 47 + 36;
      const bx = out ? SW - 40 - bw : 40;
      rr(c, bx, yy, bw, bh, 26); c.fillStyle = out ? LIMA : "#232321"; c.fill();
      c.fillStyle = out ? "#0A0A0A" : "#ECECE4"; it.lines.forEach((l, k) => c.fillText(l, bx + 26, yy + 54 + k * 47));
    }
    c.globalAlpha = 1; y += (it.h + 22) * p;
  });
  if (typing && t >= typing[0] && t < typing[1]) {
    rr(c, SW - 40 - 130, y, 130, 66, 33); c.fillStyle = "#2a2a26"; c.fill();
    for (let k = 0; k < 3; k++) { c.fillStyle = "#B8B8B0"; c.beginPath(); c.arc(SW - 40 - 100 + k * 34, y + 33 + Math.sin(t * 12 - k) * 5, 8, 0, 7); c.fill(); }
  }
  c.restore();
}
function clients(c, t) {
  c.fillStyle = "#ECECE4"; c.font = "800 52px Inter"; c.fillText("Clientes", 44, 175);
  if (t < 29.5) { for (let k = 0; k < 4; k++) { rr(c, 30, 240 + k * 190, SW - 60, 170, 28); c.fillStyle = "#141413"; c.fill(); } c.fillStyle = "#6E6E68"; c.font = "500 26px Inter"; c.fillText("4 conversas novas", 44, 222); return; }
  const rows = [["Ana", "Qualificado", "Quer comprar · até R$ 400 mil", true, 27.0], ["Bruno", "Nutrir", "Só olhando fotos", false, 27.4], ["Diego", "Nutrir", "Pesquisando preço", false, 28.0], ["Carla", "Desqualificado", "Procura aluguel", false, 28.4]];
  rows.forEach(([n, tag, why, hot, tt], k) => {
    const y = 240 + k * 190;
    rr(c, 30, y, SW - 60, 170, 28); c.fillStyle = "#171715"; c.fill();
    if (hot && t > 27.6) { c.lineWidth = 4; c.strokeStyle = LIMA; c.stroke(); }
    c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(100, y + 85, 42, 0, 7); c.fill();
    c.fillStyle = "#ECECE4"; c.font = "700 32px Inter"; c.fillText(n, 160, y + 72);
    c.fillStyle = "#8E8E86"; c.font = "500 25px Inter"; c.fillText(why, 160, y + 116);
    const p = backOut(seg(t, tt, tt + 0.35)); if (p > 0) { c.save(); c.font = "800 22px Inter"; const tw = c.measureText(tag).width + 34; const tx = SW - 50 - tw, ty = y + 26; c.translate(tx + tw / 2, ty + 22); c.scale(p, p); rr(c, -tw / 2, -22, tw, 44, 22); c.fillStyle = hot ? LIMA : "#2E2E2A"; c.fill(); c.fillStyle = hot ? "#0A0A0A" : "#B8B8B0"; c.fillText(tag, -tw / 2 + 17, 8); c.restore(); }
  });
}
function agenda(c, t) {
  c.fillStyle = "#ECECE4"; c.font = "800 52px Inter"; c.fillText("Agenda", 44, 175);
  c.fillStyle = "#8E8E86"; c.font = "500 28px Inter"; c.fillText("Sábado, 10 de outubro", 44, 222);
  ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].forEach((h, k) => { const y = 300 + k * 170; c.fillStyle = "#6E6E68"; c.font = "500 24px Inter"; c.fillText(h, 44, y + 8); c.fillStyle = "#1E1E1C"; c.fillRect(140, y, SW - 180, 2); });
  const p = backOut(seg(t, 30.0, 30.45));
  if (p > 0) { c.save(); c.translate(150 + 265, 470 + 140); c.scale(p, p); rr(c, -265, -140, 530, 280, 30); c.fillStyle = LIMA; c.fill(); c.fillStyle = "#0A0A0A"; c.font = "800 34px Inter"; c.fillText("10:00 · Visita com Ana", -235, -70); c.font = "500 26px Inter"; c.fillText("Apto 2 quartos · Braga", -235, -28); rr(c, -235, 30, 230, 50, 25); c.fillStyle = "#0A0A0A"; c.fill(); c.fillStyle = LIMA; c.font = "800 22px Inter"; c.fillText("Visita agendada", -215, 63); c.restore(); }
  const b = eOut(seg(t, 31.8, 32.2));
  if (b > 0) {
    const y = -260 + b * 360; rr(c, 24, y, SW - 48, 230, 34); c.fillStyle = "#1C1C1A"; c.fill(); c.lineWidth = 4; c.strokeStyle = LIMA; c.stroke();
    c.fillStyle = LIMA; c.beginPath(); c.arc(84, y + 62, 26, 0, 7); c.fill(); c.fillStyle = "#0A0A0A"; c.font = "900 30px Inter"; c.fillText("✓", 72, y + 73);
    c.fillStyle = "#8E8E86"; c.font = "600 22px Inter"; c.fillText("KALLI · agora", 128, y + 54);
    c.fillStyle = "#ECECE4"; c.font = "800 34px Inter"; c.fillText(AUD === "imob" ? "Visita marcada: Ana" : "Cliente pronto: Ana", 128, y + 96);
    c.fillStyle = "#B8B8B0"; c.font = "500 25px Inter"; wrap(c, AUD === "imob" ? "Com Rafael (corretor) · sáb 10h · Apto 2 quartos, Braga · até R$ 400.000" : "Quer comprar · apartamento · Braga · até R$ 400.000 · em até 3 meses", SW - 190).forEach((l, k) => c.fillText(l, 128, y + 140 + k * 34));
  }
}
function assume(c, t) {
  chat(c, t, [{ t: 0, side: "in", text: "Braga ou Centro. Até R$ 400 mil. Em até 3 meses." }, { t: 0, side: "out", text: "Perfeito, Ana! Visita marcada no sábado, às 10h." }], null);
  const pressed = t >= 34.6; const k = pressed ? 1 - Math.sin(seg(t, 34.6, 34.8) * Math.PI) * 0.06 : 1;
  c.save(); c.translate(SW / 2, 1420); c.scale(k, k); rr(c, -300, -50, 600, 100, 50);
  c.fillStyle = pressed ? LIMA : "transparent"; c.fill(); c.lineWidth = 4; c.strokeStyle = LIMA; c.stroke();
  c.fillStyle = pressed ? "#0A0A0A" : LIMA; c.font = "800 32px Inter"; const s = pressed ? "Você está na conversa" : "Assumir conversa"; c.fillText(s, -c.measureText(s).width / 2, 12); c.restore();
  const q = eOut(seg(t, 34.85, 35.2));
  if (q > 0) { c.globalAlpha = q; rr(c, 40, 1150, SW - 80, 150, 26); c.fillStyle = "#1B2410"; c.fill(); c.lineWidth = 2; c.strokeStyle = LIMA; c.stroke(); c.fillStyle = "#ECECE4"; c.font = "500 26px Inter"; wrap(c, "Você está no controle. A Kalli não responde enquanto a conversa estiver com você.", SW - 140).forEach((l, i) => c.fillText(l, 70, 1205 + i * 36)); c.globalAlpha = 1; }
}
function lock(c, t) {
  c.fillStyle = "#ECECE4"; c.font = "800 150px Archivo"; const s = "10:42"; c.fillText(s, (SW - c.measureText(s).width) / 2, 380);
  c.fillStyle = "#8E8E86"; c.font = "500 30px Inter"; const d = "sábado, 10 de outubro"; c.fillText(d, (SW - c.measureText(d).width) / 2, 440);
  const p = eOut(seg(t, 37.3, 37.7));
  if (p > 0) { c.globalAlpha = p; const y = 600 + (1 - p) * 40; rr(c, 34, y, SW - 68, 190, 34); c.fillStyle = "#1C1C1A"; c.fill(); c.lineWidth = 3; c.strokeStyle = LIMA; c.stroke(); c.fillStyle = "#8E8E86"; c.font = "600 22px Inter"; c.fillText("KALLI · agora", 74, y + 52); c.fillStyle = "#ECECE4"; c.font = "800 34px Inter"; c.fillText(AUD === "imob" ? "Visita marcada: Ana" : "Cliente pronto: Ana", 74, y + 100); c.fillStyle = "#B8B8B0"; c.font = "500 26px Inter"; c.fillText(AUD === "imob" ? "Com Rafael · sáb 10h · Apto 2 quartos" : "Visita sáb 10h · Apto 2 quartos, Braga", 74, y + 145); c.globalAlpha = 1; }
}
function drawScreen(t) {
  const c = sx; c.clearRect(0, 0, SW, SH);
  c.save(); rr(c, 0, 0, SW, SH, 92); c.clip(); c.fillStyle = "#0D0D0C"; c.fillRect(0, 0, SW, SH);
  status(c); c.textBaseline = "alphabetic";
  const modes = [[0, "inbox"], [15.45, "chat"], [26.6, "clients"], [29.8, "agenda"], [33.15, "assume"], [36.9, "lock"]];
  let mi = 0; modes.forEach((m, i) => { if (t >= m[0]) mi = i; });
  const [t0, mode] = modes[mi];
  const fade = mi === 0 ? 1 : eOut(seg(t, t0, t0 + 0.3));
  c.globalAlpha = fade;
  if (mode === "inbox") inbox(c, t);
  if (mode === "chat") chat(c, t, MSGS, [16.5, 17.25]);
  if (mode === "clients") clients(c, t);
  if (mode === "agenda") agenda(c, t);
  if (mode === "assume") assume(c, t);
  if (mode === "lock") lock(c, t);
  c.globalAlpha = 1;
  if (t > 13.4 && t < 15.45) { const k = seg(t, 13.4, 15.45); c.fillStyle = `rgba(184,255,79,${Math.sin(k * Math.PI) * 0.85})`; c.fillRect(0, 0, SW, SH); }
  c.restore();
  stex.needsUpdate = true;
}

// ---------------- poses e câmera ----------------
const PK = [
  { t: 0, p: [0.8, -0.55, 0.1], r: [-0.78, -0.15, 0.22] },
  { t: 13.5, p: [0.8, -0.55, 0.1], r: [-0.78, -0.15, 0.22] },
  { t: 16.2, p: [0.62, 0.0, 0.0], r: [0.0, -0.26, 0.0] },
  { t: 36.8, p: [0.62, 0.0, 0.0], r: [0.0, -0.2, 0.0] },
  { t: 40.0, p: [0.62, 0.0, 0.0], r: [0.0, -0.18, 0.0] },
  { t: 40.9, p: [0.62, -2.8, -0.6], r: [0.5, -0.3, 0.0] },
  { t: 49.8, p: [0.62, -2.8, -0.6], r: [0.5, -0.3, 0.0] },
];
let CK = null;
function camKeys() {
  const B = objs.B;
  return [
    { t: 0, p: [0.5, 0.25, 2.6], l: [0.62, -0.25, 0] },
    { t: 3.2, p: [0.45, 0.6, 3.0], l: [0.55, 0.3, 0] },
    { t: 6.6, p: [0.3, 1.5, 3.6], l: [0.4, 1.35, 0] },
    { t: 8.3, p: [B.x - 0.4, B.y + 0.15, B.z + 2.1], l: [B.x - 0.4, B.y, B.z] },
    { t: 10.2, p: [B.x - 0.33, B.y + 0.05, B.z + 1.25], l: [B.x - 0.33, B.y, B.z] },
    { t: 12.7, p: [B.x - 0.42, B.y + 0.3, B.z + 2.3], l: [B.x - 0.42, B.y, B.z] },
    { t: 14.4, p: [0.3, 0.9, 3.9], l: [0.6, 0.0, 0] },
    { t: 16.3, p: [0.0, 0.0, 3.1], l: [0, 0, 0] },
    { t: 26.5, p: [0.1, 0.04, 3.0], l: [0.04, 0, 0] },
    { t: 36.8, p: [0.0, 0.0, 3.15], l: [0, 0, 0] },
    { t: 44.5, p: [0.0, 0.05, 3.65], l: [0, 0, 0] },
    { t: 49.8, p: [0.0, 0.0, 3.35], l: [0, 0, 0] },
  ];
}
const tmpV = new THREE.Vector3(), origin = new THREE.Vector3();
function place(m, p, s, op) { m.visible = s > 0.001 && op > 0.001; m.position.set(p[0], p[1], p[2]); m.scale.setScalar(Math.max(s, 0.0001)); m.material.opacity = op; m.quaternion.copy(camera.quaternion); }

function renderAt(t) {
  if (!ready) return;
  t = MI(t);
  if (!CK) CK = camKeys();
  // câmera
  const ck = keys(CK, t);
  camera.position.set(ck.p[0] + Math.sin(t * 0.4) * 0.04, ck.p[1] + Math.cos(t * 0.33) * 0.03, ck.p[2]);
  camera.lookAt(ck.l[0], ck.l[1], ck.l[2]);
  // celular
  const pk = keys(PK, t);
  phone.position.set(pk.p[0], pk.p[1], pk.p[2]);
  let vib = 0; if (t > 31.8 && t < 32.6) vib = Math.sin(t * 95) * 0.035 * (1 - seg(t, 31.8, 32.6));
  const drift = t > 16.2 && t < 40 ? 1 : 0;
  phone.rotation.set(pk.r[0] + drift * Math.sin(t * 0.37) * 0.03, pk.r[1] + drift * Math.sin(t * 0.5) * 0.05, pk.r[2] + vib);
  phone.updateMatrixWorld(true);
  screen.getWorldPosition(origin);
  rim.intensity = 8 + (t > 31.8 && t < 33 ? Math.sin(seg(t, 31.8, 33) * Math.PI) * 20 : 0);
  drawScreen(t);
  // torre de perguntas
  bubbles.forEach((b) => {
    const slot = b.slot;
    if (t < b.e || t > 15.9) { b.m.visible = false; if (b.lime) b.lime.visible = false; return; }
    let pos, s;
    if (b.fall) { const p = eOut(seg(t, b.e, b.e + 0.55)); pos = [slot[0], lerp(slot[1] + 2.2, slot[1], p), slot[2]]; s = 1; }
    else { const p = eOut(seg(t, b.e, b.e + 0.7)); pos = L3([origin.x, origin.y, origin.z], slot, p); s = backOut(seg(t, b.e, b.e + 0.4)); }
    const cs = b.i * 0.008; const k = ease(seg(t, 13.55 + (b.i % 40) * 0.012, 14.75 + (b.i % 40) * 0.012));
    if (k > 0) { pos = L3(pos, [origin.x, origin.y, origin.z], k); s *= 1 - k; }
    let op = 1;
    if (b.i !== BUY && t > 8.64 && t < 13.5) op = 0.55;
    place(b.m, pos, s, op);
    if (b.lime) { const L = seg(t, 8.64, 8.9); place(b.lime, [pos[0], pos[1], pos[2] + 0.002], s * (1 + Math.sin(seg(t, 8.64, 9.2) * Math.PI) * 0.12), L); }
  });
  // o comprador volta no alívio
  if (bubbles[BUY] && t > 37.1) {
    const p = backOut(seg(t, 37.1, 37.55)); const o = 1 - seg(t, 39.7, 40.1);
    place(bubbles[BUY].lime, [0.32, 0.66 + Math.sin(t * 1.3) * 0.015, 0.42], p, o);
  }
  // fotos saindo da tela
  objs.photos.forEach((m, j) => {
    const a = 20.15 + j * 0.08; const out = eOut(seg(t, a, a + 0.5)); const back = ease(seg(t, 21.5 + j * 0.05, 21.95 + j * 0.05));
    const tgt = [0.24 + j * 0.38, 0.04 + (j === 1 ? 0.06 : 0), 0.48 + (j === 1 ? 0.1 : 0)];
    const pos = L3(L3([origin.x, origin.y, origin.z], tgt, out), [origin.x, origin.y - 0.4, origin.z], back);
    place(m, pos, out * (1 - back), 1);
    m.rotation.z = (j - 1) * -0.08 * (1 - back);
  });
  // clientes separados
  objs.leads.forEach((m, j) => {
    const a = 26.7 + j * 0.12; const p = eOut(seg(t, a, a + 0.45));
    let pos = [0.62, 0.42 - j * 0.28, 0.06 + p * 0.3]; let s = p, op = 1;
    if (j === 0) { const h = ease(seg(t, 27.6, 28.0)); pos = [0.62 - h * 0.05, pos[1] + h * 0.04, pos[2] + h * 0.25]; s *= 1 + h * 0.12; }
    else { const r = ease(seg(t, 28.5 + j * 0.06, 29.1 + j * 0.06)); pos = [pos[0] + r * 0.55, pos[1], pos[2] - r * 1.1]; op = 1 - r * 0.75; }
    const g = ease(seg(t, 29.4, 29.85)); pos = L3(pos, [origin.x, origin.y, origin.z], g); s *= 1 - g;
    place(m, pos, s, op);
  });
  // a visita marcada sai da tela
  { const p = backOut(seg(t, 30.0, 30.5)); const g = ease(seg(t, 31.45, 31.85)); const pos = L3(L3([origin.x, origin.y, origin.z], [0.5, 0.18, 0.62], eOut(seg(t, 30.0, 30.5))), [origin.x, origin.y, origin.z], g); place(objs.agenda, pos, p * (1 - g), 1); }
  // grade dos 60 meses
  const D = objs.dummy;
  const NR = Math.ceil(COUNT / 12);
  for (let i = 0; i < 60; i++) {
    const c = i % 12, r = Math.floor(i / 12);
    const tx = 0.62 + (c - 5.5) * 0.105, ty = ((NR - 1) / 2 - r) * 0.105 + 0.02;
    const s0 = 40.95 + i * 0.035; const p = seg(t, s0, s0 + 0.45);
    const k = ease(seg(t, 44.9 + (Math.abs(c - 5.5) + Math.abs(r - 2)) * 0.03, 45.6 + (Math.abs(c - 5.5) + Math.abs(r - 2)) * 0.03));
    let x = tx, y = ty + (1 - backOut(p, 1.3)) * 1.6, sc2 = p > 0 && i < COUNT ? 1 : 0;
    x = lerp(x, 0.62, k); y = lerp(y, 0.05, k); sc2 *= 1 - k;
    D.position.set(x, y, 0); D.rotation.set((1 - p) * 2.4, (1 - p) * 1.6 + t * 0.2 * (p >= 1 ? 0 : 1), 0); D.scale.setScalar(Math.max(sc2, 0.0001));
    D.updateMatrix(); objs.grid.setMatrixAt(i, D.matrix);
  }
  objs.grid.instanceMatrix.needsUpdate = true;
  // símbolo
  { const p = backOut(seg(t, 45.25, 46.05), 1.4); place(objs.sym, [0.62, 0.12, 0], p, 1); objs.sym.rotateY(Math.sin(t * 0.8) * 0.12); }
  renderer.render(scene, camera);
}

const clock = { t: 0 };
tl0.to(clock, { t: DUR, duration: DUR, ease: "none", onUpdate: () => renderAt(clock.t) }, 0);
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
