"""Aplica o final v2 (recursos) e o formato em pé ao scene-module.js (a partir do v1)."""
p = "_dev/scene-module.v1.js"
s = open(p, encoding="utf-8").read()

def rep(a, b):
    global s
    assert a in s, a[:60]
    s = s.replace(a, b, 1)

rep('renderer.setPixelRatio(1); renderer.setSize(1920, 1080, false);',
    'const VW = FMT === "v" ? 1080 : 1920, VH = FMT === "v" ? 1920 : 1080;\nrenderer.setPixelRatio(1); renderer.setSize(VW, VH, false);')
rep('const camera = new THREE.PerspectiveCamera(32, 1920 / 1080, 0.05, 100);',
    'const camera = new THREE.PerspectiveCamera(FMT === "v" ? 54 : 32, VW / VH, 0.05, 100);')

# cartões dos recursos
rep('''  // símbolo
  const st = new THREE.Texture(imgs.sym);''', '''  // cartões dos recursos (final v2)
  const FC = [["22h", "Sábado, 22h", "responde na hora"], ["1d", "Lembrete", "1 dia e 1 hora antes"],
    AUD === "imob" ? ["→", "Repasse", "passa para o próximo"] : ["QR", "Seu site", "com QR Code"]];
  objs.fcards = FC.map(([ic, ti, su]) => cardMesh(textTex(960, 300, (c) => {
    rr(c, 6, 6, 948, 288, 50); c.fillStyle = "#141413"; c.fill(); c.lineWidth = 5; c.strokeStyle = LIMA; c.stroke();
    c.fillStyle = LIMA; c.beginPath(); c.arc(150, 150, 92, 0, 7); c.fill();
    c.fillStyle = "#0A0A0A";
    if (ic === "→") { c.lineWidth = 14; c.lineCap = "round"; c.strokeStyle = "#0A0A0A"; c.beginPath(); c.moveTo(108, 150); c.lineTo(192, 150); c.moveTo(160, 116); c.lineTo(194, 150); c.lineTo(160, 184); c.stroke(); }
    else { c.font = "900 62px Archivo"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(ic, 150, 155); c.textAlign = "left"; }
    c.textBaseline = "alphabetic"; c.fillStyle = "#ECECE4"; c.font = "800 66px Inter"; c.fillText(ti, 280, 138);
    c.fillStyle = "#9A9A92"; c.font = "500 42px Inter"; c.fillText(su, 280, 210);
  }), 0.54, 0.169));
  // símbolo
  const st = new THREE.Texture(imgs.sym);''')

rep('function status(c) {\n  c.fillStyle = "#ECECE4"; c.font = "600 30px Inter"; c.textBaseline = "alphabetic"; c.fillText("10:42", 60, 70);',
    'function status(c, clk = "10:42") {\n  c.fillStyle = "#ECECE4"; c.font = "600 30px Inter"; c.textBaseline = "alphabetic"; c.fillText(clk, 60, 70);')
rep('function chat(c, t, msgs, typing) {\n  header(c, "Ana", "cliente · Apto 2 quartos, Braga");',
    'function chat(c, t, msgs, typing, title = "Ana", sub = "cliente · Apto 2 quartos, Braga") {\n  header(c, title, sub);')

# telas do trecho novo
rep('function drawScreen(t) {', r'''// ---------------- telas do final v2 (tempo real) ----------------
const inFeat = (tn) => tn >= FEAT.G0 && tn < FEAT.G1 + 0.6;
const QRP = Array.from({ length: 441 }, (_, i) => ((i * 7919 + (i % 21) * 31) % 17) < 8);
function night(c, tn) {
  chat(c, tn, [{ t: FEAT.B1 - 0.05, side: "in", text: "Oi! A casa ainda está disponível?" }, { t: FEAT.B1 + 1.25, side: "out", text: "Está sim! Casa de 3 quartos no Centro, R$ 520 mil. Quer ver as fotos?" }], [FEAT.B1 + 0.35, FEAT.B1 + 1.25], "Novo cliente", "sábado, 22:04");
}
function remind(c, tn) {
  chat(c, tn, [{ t: FEAT.B2 + 0.05, side: "out", text: "Oi, Ana! Passando para lembrar: sua visita é amanhã, sábado, às 10h. Apto 2 quartos, Braga." }, { t: FEAT.B2 + 1.35, side: "in", text: "Confirmado! Até amanhã." }], null, "Ana", "lembrete automático · 1 dia antes");
}
function cover(c, k, x, y, w, h, r) { c.save(); rr(c, x, y, w, h, r); c.clip(); const im = imgs[k]; if (im) { const s = Math.max(w / im.width, h / im.height); c.drawImage(im, x + (w - im.width * s) / 2, y + (h - im.height * s) / 2, im.width * s, im.height * s); } c.restore(); }
function site(c, tn) {
  const ap = (k) => eOut(seg(tn, FEAT.B3 + k * 0.14, FEAT.B3 + k * 0.14 + 0.35));
  c.globalAlpha = ap(0); rr(c, 40, 104, SW - 80, 64, 32); c.fillStyle = "#1A1A18"; c.fill(); c.fillStyle = LIMA; c.beginPath(); c.arc(84, 136, 10, 0, 7); c.fill(); c.fillStyle = "#B8B8B0"; c.font = "600 26px Inter"; c.fillText("Meu site · no ar", 108, 145);
  c.globalAlpha = ap(1); cover(c, "f1", 30, 196, SW - 60, 460, 36);
  const gr = c.createLinearGradient(0, 470, 0, 656); gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,0.75)"); c.fillStyle = gr; rr(c, 30, 196, SW - 60, 460, 36); c.fill();
  c.fillStyle = "#FFFFFF"; c.font = "800 40px Inter"; c.fillText("Apto 2 quartos · Braga", 66, 590); c.fillStyle = LIMA; c.font = "700 32px Inter"; c.fillText("R$ 380 mil", 66, 632);
  c.globalAlpha = ap(2); c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(92, 740, 48, 0, 7); c.fill();
  c.fillStyle = "#ECECE4"; c.font = "700 36px Inter"; c.fillText("Seu nome", 160, 732); c.fillStyle = "#8E8E86"; c.font = "500 25px Inter"; c.fillText("Corretor de imóveis · CRECI", 160, 772);
  c.globalAlpha = ap(3);
  [["f2", "Casa · Centro", "R$ 520 mil", 30], ["f3", "Apto · Mar", "R$ 690 mil", 372]].forEach(([k, a, b, x]) => { rr(c, x, 830, 318, 300, 28); c.fillStyle = "#171715"; c.fill(); cover(c, k, x, 830, 318, 190, 28); c.fillStyle = "#ECECE4"; c.font = "700 28px Inter"; c.fillText(a, x + 20, 1062); c.fillStyle = LIMA; c.font = "700 26px Inter"; c.fillText(b, x + 20, 1102); });
  c.globalAlpha = ap(4); rr(c, 30, 1166, SW - 60, 100, 50); c.fillStyle = LIMA; c.fill(); c.fillStyle = "#0A0A0A"; c.font = "800 34px Inter"; const bt = "Chamar no WhatsApp"; c.fillText(bt, (SW - c.measureText(bt).width) / 2, 1228);
  c.globalAlpha = ap(5); rr(c, 30, 1296, SW - 60, 210, 30); c.fillStyle = "#1A1A18"; c.fill();
  rr(c, 56, 1318, 166, 166, 12); c.fillStyle = "#ECECE4"; c.fill(); c.fillStyle = "#0A0A0A";
  for (let i = 0; i < 441; i++) { const x = i % 21, y = Math.floor(i / 21); const fd = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); const on = fd ? (x % 6 === 0 || y % 6 === 0 || x === 20 || y === 20 || ((x % 14 >= 2 && x % 14 <= 4) && (y % 14 >= 2 && y % 14 <= 4))) : QRP[i]; if (on) c.fillRect(66 + x * 7, 1328 + y * 7, 7, 7); }
  c.fillStyle = "#ECECE4"; c.font = "700 30px Inter"; c.fillText("QR Code do seu site", 248, 1378); c.fillStyle = "#8E8E86"; c.font = "500 25px Inter"; c.fillText("Para a placa, a bio", 248, 1420); c.fillText("e o cartão.", 248, 1454);
  c.globalAlpha = 1;
}
function repasse(c, tn) {
  c.fillStyle = "#ECECE4"; c.font = "800 52px Inter"; c.fillText("Conversas", 44, 175);
  c.fillStyle = "#8E8E86"; c.font = "500 26px Inter"; c.fillText("quem atende cada uma", 44, 222);
  const sw = seg(tn, FEAT.SW, FEAT.SW + 0.35);
  const rows = [["Ana", "Apto 2 quartos · Braga", "Rafael"], ["Bruno", "Casa · Centro", "Júlia"], ["Carla", "Apto · Mar", "Marcos"], ["Diego", "Terreno · Norte", "Rafael"]];
  rows.forEach(([n, im, who], k) => {
    const y = 262 + k * 200; rr(c, 30, y, SW - 60, 180, 28); c.fillStyle = "#171715"; c.fill();
    if (k === 0) { c.lineWidth = 4; c.strokeStyle = sw >= 0.5 ? LIMA : "#E0703A"; c.stroke(); }
    c.fillStyle = "#2c2c28"; c.beginPath(); c.arc(98, y + 74, 42, 0, 7); c.fill();
    c.fillStyle = "#ECECE4"; c.font = "700 32px Inter"; c.fillText(n, 160, y + 66); c.fillStyle = "#8E8E86"; c.font = "500 25px Inter"; c.fillText(im, 160, y + 106);
    let tag = "atende: " + who, bg = "#2E2E2A", fg = "#B8B8B0", sc = 1;
    if (k === 0) { if (sw < 0.5) { tag = "Rafael · sem resposta há 15 min"; bg = "#3A2318"; fg = "#FFB088"; } else { tag = "Júlia · atendendo agora"; bg = LIMA; fg = "#0A0A0A"; sc = backOut(seg(tn, FEAT.SW + 0.17, FEAT.SW + 0.5)); } }
    c.save(); c.font = "800 22px Inter"; const tw = c.measureText(tag).width + 34; c.translate(160 + tw / 2, y + 140); c.scale(sc, sc); rr(c, -tw / 2, -20, tw, 40, 20); c.fillStyle = bg; c.fill(); c.fillStyle = fg; c.fillText(tag, -tw / 2 + 17, 8); c.restore();
  });
  const q = eOut(seg(tn, FEAT.SW + 0.35, FEAT.SW + 0.75));
  if (q > 0) { c.globalAlpha = q; rr(c, 40, 1100, SW - 80, 150, 26); c.fillStyle = "#1B2410"; c.fill(); c.lineWidth = 2; c.strokeStyle = LIMA; c.stroke(); c.fillStyle = "#ECECE4"; c.font = "500 26px Inter"; wrap(c, "Rafael não atendeu no prazo. A Kalli passou a conversa para a Júlia.", SW - 140).forEach((l, i) => c.fillText(l, 70, 1155 + i * 36)); c.globalAlpha = 1; }
}
function lockN(c, tn) {
  c.fillStyle = "#ECECE4"; c.font = "800 150px Archivo"; const s = "22:04"; c.fillText(s, (SW - c.measureText(s).width) / 2, 380);
  c.fillStyle = "#8E8E86"; c.font = "500 30px Inter"; const d = "sábado, 10 de outubro"; c.fillText(d, (SW - c.measureText(d).width) / 2, 440);
  const p = eOut(seg(tn, FEAT.B5, FEAT.B5 + 0.4));
  if (p > 0) { c.globalAlpha = p; const y = 600 + (1 - p) * 40; rr(c, 34, y, SW - 68, 190, 34); c.fillStyle = "#1C1C1A"; c.fill(); c.lineWidth = 3; c.strokeStyle = "#3A3A36"; c.stroke(); c.fillStyle = "#8E8E86"; c.font = "600 22px Inter"; c.fillText("WHATSAPP · agora", 74, y + 52); c.fillStyle = "#ECECE4"; c.font = "800 34px Inter"; c.fillText("Novo cliente", 74, y + 100); c.fillStyle = "#B8B8B0"; c.font = "500 26px Inter"; c.fillText("Oi! Ainda está disponível?", 74, y + 145); c.globalAlpha = 1; }
  const q = eOut(seg(tn, FEAT.B5 + 0.7, FEAT.B5 + 1.1));
  if (q > 0) { c.globalAlpha = q; const y = 816 + (1 - q) * 40; rr(c, 34, y, SW - 68, 150, 34); c.fillStyle = "#1B2410"; c.fill(); c.lineWidth = 3; c.strokeStyle = LIMA; c.stroke(); c.fillStyle = LIMA; c.font = "800 22px Inter"; c.fillText("KALLI · IA", 74, y + 52); c.fillStyle = "#ECECE4"; c.font = "700 32px Inter"; c.fillText("Respondendo agora…", 74, y + 104); c.globalAlpha = 1; }
}
function drawFeat(c, tn) {
  const st = [[-1, "night", "22:04"], [FEAT.B2 - 0.15, "remind", "10:00"], [FEAT.B3 - 0.15, AUD === "imob" ? "repasse" : "site", "10:42"], [FEAT.B4 - 0.15, "lockN", "22:04"]];
  let si = 0; st.forEach((x, i) => { if (tn >= x[0]) si = i; });
  const [s0, mode, clk] = st[si];
  status(c, clk); c.textBaseline = "alphabetic";
  c.globalAlpha = si === 0 ? 1 : eOut(seg(tn, s0, s0 + 0.3));
  if (mode === "night") night(c, tn);
  if (mode === "remind") remind(c, tn);
  if (mode === "site") site(c, tn);
  if (mode === "repasse") repasse(c, tn);
  if (mode === "lockN") lockN(c, tn);
  c.globalAlpha = 1;
}
function drawScreen(t, tn) {''')
rep('''  status(c); c.textBaseline = "alphabetic";
  const modes''', '''  if (inFeat(tn)) { drawFeat(c, tn); c.restore(); stex.needsUpdate = true; return; }
  status(c); c.textBaseline = "alphabetic";
  const modes''')

# câmera em pé
rep('const tmpV = new THREE.Vector3(), origin = new THREE.Vector3();', '''const DXK = [[0, 0.18], [3.2, 0.3], [6.6, 0.55], [8.3, 0.4], [12.7, 0.4], [14.4, 0.3], [16.3, 0.62], [999, 0.62]];
const ZK = [[0, 1.0], [3.2, 1.1], [6.6, 1.15], [8.3, 1.4], [12.7, 1.3], [14.4, 1.0], [999, 1.0]];
const OYK = [[0, 0.3], [3.2, 0.25], [6.6, 0.17], [999, 0.17]];
const pl = (K, t) => { for (let i = 0; i < K.length - 1; i++) if (t <= K[i + 1][0]) return lerp(K[i][1], K[i + 1][1], ease(seg(t, K[i][0], K[i + 1][0]))); return K[K.length - 1][1]; };
function vcam(p, l, t, up) {
  const dx = lerp(pl(DXK, t), 0.66, up), z = lerp(pl(ZK, t), 1.0, up);
  const P = [l[0] + (p[0] - l[0]) * z, l[1] + (p[1] - l[1]) * z, l[2] + (p[2] - l[2]) * z];
  const oy = lerp(pl(OYK, t), 0.17, up) * Math.hypot(P[0] - l[0], P[1] - l[1], P[2] - l[2]);
  return [[P[0] + dx, P[1] - oy, P[2]], [l[0] + dx, l[1] - oy, l[2]]];
}
const tmpV = new THREE.Vector3(), origin = new THREE.Vector3();''')

rep('''function renderAt(t) {
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
  drawScreen(t);''', '''function renderAt(tn) {
  if (!ready) return;
  const t = MI(tn);
  // o trecho dos recursos: o celular volta e a câmera anda devagar
  const up = ease(seg(tn, FEAT.G0, FEAT.G0 + 0.8)) * (1 - ease(seg(tn, FEAT.G1 - 0.25, FEAT.G1 + 0.45)));
  if (!CK) CK = camKeys();
  // câmera
  const ck = keys(CK, t);
  let cp = [ck.p[0] + Math.sin(t * 0.4) * 0.04, ck.p[1] + Math.cos(t * 0.33) * 0.03, ck.p[2]], cl = ck.l.slice();
  if (up > 0) { const g = seg(tn, FEAT.G0, FEAT.G1); cp = L3(cp, [Math.sin(tn * 0.5) * 0.08 - 0.05, 0.03 + Math.cos(tn * 0.4) * 0.03, FMT === "v" ? lerp(3.85, 3.45, g) : lerp(3.45, 3.0, g)], up); cl = L3(cl, [0.05, 0, 0], up); }
  if (FMT === "v") [cp, cl] = vcam(cp, cl, t, up);
  camera.position.set(cp[0], cp[1], cp[2]);
  camera.lookAt(cl[0], cl[1], cl[2]);
  // celular
  const pk = keys(PK, t);
  let pp = pk.p.slice(), pr = pk.r;
  if (FMT === "v") pp[1] -= 2.2 * seg(t, 40.0, 40.9);
  if (up > 0) { pp = L3(pp, [FMT === "v" ? 0.42 : 0.62, 0, 0], up); pr = L3(pr, [Math.sin(tn * 0.37) * 0.03, -0.22 + Math.sin(tn * 0.5) * 0.05, 0], up); }
  phone.position.set(pp[0], pp[1], pp[2]);
  let vib = 0; if (t > 31.8 && t < 32.6) vib = Math.sin(t * 95) * 0.035 * (1 - seg(t, 31.8, 32.6));
  if (tn > FEAT.B5 && tn < FEAT.B5 + 0.8) vib += Math.sin(tn * 95) * 0.035 * (1 - seg(tn, FEAT.B5, FEAT.B5 + 0.8));
  const drift = t > 16.2 && t < 40 ? 1 : 0;
  phone.rotation.set(pr[0] + drift * Math.sin(t * 0.37) * 0.03, pr[1] + drift * Math.sin(t * 0.5) * 0.05, pr[2] + vib);
  phone.updateMatrixWorld(true);
  screen.getWorldPosition(origin);
  rim.intensity = 8 + (t > 31.8 && t < 33 ? Math.sin(seg(t, 31.8, 33) * Math.PI) * 20 : 0) + (tn > FEAT.B5 && tn < FEAT.B5 + 1.2 ? Math.sin(seg(tn, FEAT.B5, FEAT.B5 + 1.2) * Math.PI) * 20 : 0);
  drawScreen(t, tn);
  // cartões dos recursos
  objs.fcards.forEach((m, k) => {
    const a = [FEAT.B1, FEAT.B2, FEAT.B3][k] + 0.35;
    const p = eOut(seg(tn, a, a + 0.5)), s = backOut(seg(tn, a, a + 0.45));
    const back = ease(seg(tn, FEAT.B4 - 0.1 + k * 0.05, FEAT.B4 + 0.35 + k * 0.05));
    const tgt = FMT === "v" ? [1.1, 0.42 - k * 0.24, 0.6] : [1.12, 0.4 - k * 0.27, 0.5];
    const pos = L3(L3([origin.x, origin.y, origin.z], tgt, p), [origin.x, origin.y, origin.z], back);
    place(m, pos, s * (1 - back) * (FMT === "v" ? 0.85 : 1), 1);
  });''')

rep('''    x = lerp(x, 0.62, k); y = lerp(y, 0.05, k); sc2 *= 1 - k;''', '''    x = lerp(x, 0.62, k); y = lerp(y, 0.05, k); sc2 *= 1 - k;
    const kill = tn < FEAT.G0 ? 0 : ease(seg(tn, FEAT.G0, FEAT.G0 + 0.5 + (i % 12) * 0.02)); y -= kill * 1.2; sc2 *= 1 - kill;''')
open("_dev/scene-module.js", "w", encoding="utf-8").write(s)
print("ok")
