import * as THREE from "three";
import { RoundedBoxGeometry } from "./assets/vendor/RoundedBoxGeometry.js";
import { RoomEnvironment } from "./assets/vendor/RoomEnvironment.js";
// ---------------- Three.js ----------------
const canvas = $("#gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.05, 100);
const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(-2, 4, 3); scene.add(key);
const rim = new THREE.PointLight(0xb8ff4f, 6, 7); rim.position.set(1.6, 1.2, -1.2); scene.add(rim);
const LIMA = "#B8FF4F";

// chão escuro (dá profundidade à fila)
const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: 0x0b0c0b, roughness: 0.55, metalness: 0.3 }));
floor.rotation.x = -Math.PI / 2; floor.position.set(0, -0.02, -2); scene.add(floor);

// ---------------- desenho 2D ----------------
function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function wrap(c, text, maxW) { const words = text.split(" "); const lines = []; let cur = ""; words.forEach((w) => { const t = cur ? cur + " " + w : w; if (c.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }); if (cur) lines.push(cur); return lines; }
function textTex(w, h, draw) { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const c = cv.getContext("2d"); draw(c, w, h); const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx; }
function cardMesh(tex, wU, hU) { const m = new THREE.Mesh(new THREE.PlaneGeometry(wU, hU), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, depthWrite: false })); scene.add(m); m.visible = false; return m; }
function place(m, p, s, op) { m.visible = s > 0.001 && op > 0.001; m.position.set(p[0], p[1], p[2]); m.scale.setScalar(Math.max(s, 0.0001)); m.material.opacity = op; m.quaternion.copy(camera.quaternion); }

// a marca no chão: quem está aqui é atendido agora
const spot = new THREE.Mesh(new THREE.RingGeometry(0.17, 0.2, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, toneMapped: false }));
spot.rotation.x = -Math.PI / 2; spot.position.set(-0.07, 0.003, 0); scene.add(spot);
// ---------------- os pacientes ----------------
const HEX = { r: 0xE5383B, o: 0xF28C28, y: 0xF5C518, g: 0x2FBF71, b: 0x2D7FF9 };
const PAT = ["g", "b", "y", "r", "g", "o", "b", "y", "g", "o"];   // ordem de chegada
const PRI = { r: 0, o: 1, y: 2, g: 3, b: 4 };
const ST = [9.68, 12.08, 14.7, 17.2];                              // as cores entram na voz
function orderAt(k) { // k = quantas cores já foram chamadas (0..4)
  const idx = PAT.map((c, i) => i);
  const called = idx.filter((i) => PRI[PAT[i]] < k || (k >= 4)).sort((a, b) => PRI[PAT[a]] - PRI[PAT[b]] || a - b);
  const rest = idx.filter((i) => !called.includes(i));
  return called.concat(rest);
}
const ORD = [0, 1, 2, 3, 4].map(orderAt);
const slot = (i) => [(i % 2 ? 0.07 : -0.07), 0, -i * 0.5];
const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xcfd2cc, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });
const pats = PAT.map((c, i) => {
  const g = new THREE.Group(); scene.add(g);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.115, 0.3, 8, 20), bodyMat); body.position.y = 0.27; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.088, 24, 16), bodyMat); head.position.y = 0.6; g.add(head);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.122, 0.026, 14, 48), new THREE.MeshStandardMaterial({ color: HEX[c], emissive: HEX[c], emissiveIntensity: 0.45, roughness: 0.3, metalness: 0.1 }));
  band.rotation.x = Math.PI / 2; band.position.y = 0.25; g.add(band);
  return { g, band, c, i };
});

// ---------------- celular ----------------
const phone = new THREE.Group(); scene.add(phone);
phone.add(new THREE.Mesh(new RoundedBoxGeometry(0.78, 1.64, 0.09, 8, 0.1), new THREE.MeshPhysicalMaterial({ color: 0x151515, metalness: 0.75, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12 })));
const SW = 720, SH = 1560;
const sc = document.createElement("canvas"); sc.width = SW; sc.height = SH; const sx = sc.getContext("2d");
const stex = new THREE.CanvasTexture(sc); stex.colorSpace = THREE.SRGBColorSpace; stex.anisotropy = 8;
const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 1.56), new THREE.MeshBasicMaterial({ map: stex, transparent: true, toneMapped: false }));
screen.position.z = 0.0462; phone.add(screen);

// ---------------- recursos ----------------
const imgs = {}; let ready = false; const objs = {};
const loadImg = (k, src) => new Promise((res) => { const im = new Image(); im.onload = () => { imgs[k] = im; res(); }; im.onerror = () => res(); im.src = src; });
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady["u03"] = (async () => {
  await Promise.all(["500 30px Inter", "700 34px Inter", "800 34px Inter", "900 60px Archivo", "800 150px Archivo"].map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  await loadImg("sym", "assets/simbolo-lima.png");
  build(); ready = true; renderAt(window.__hfThreeTime || 0);
})();
function build() {
  // senhas acima das cabeças
  objs.tix = pats.map((p) => cardMesh(textTex(300, 120, (c) => { rr(c, 4, 4, 292, 112, 30); c.fillStyle = "#1A1A18"; c.fill(); c.lineWidth = 3; c.strokeStyle = "#3A3A36"; c.stroke(); c.fillStyle = "#8E8E86"; c.font = "700 26px Inter"; c.fillText("SENHA", 28, 50); c.fillStyle = "#ECECE4"; c.font = "900 60px Archivo"; c.fillText(String(41 + p.i).padStart(3, "0"), 128, 84); }), 0.21, 0.084));
  // anéis que saem do celular na triagem
  objs.rings = ["r", "o", "y", "g", "b"].map((c) => { const m = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 12, 40), new THREE.MeshStandardMaterial({ color: HEX[c], emissive: HEX[c], emissiveIntensity: 0.5, roughness: 0.3 })); scene.add(m); m.visible = false; return m; });
  const st = new THREE.Texture(imgs.sym); st.colorSpace = THREE.SRGBColorSpace; st.needsUpdate = true;
  const ar = imgs.sym ? imgs.sym.height / imgs.sym.width : 1;
  objs.sym = cardMesh(st, 0.7, 0.7 * ar);
}

// ---------------- telas do celular ----------------
const CSS = { r: "#E5383B", o: "#F28C28", y: "#F5C518", g: "#2FBF71", b: "#2D7FF9" };
const ROWS = [
  ["Bruno", "Ainda está disponível?", "08:02", "g"],
  ["Carla", "Qual o preço?", "08:05", "b"],
  ["Diego", "Tem foto da cozinha?", "08:11", "y"],
  ["Erika", "Aceita financiamento?", "08:14", "y"],
  ["Fábio", "Ainda tem?", "08:20", "b"],
  ["Ana", "Quero visitar no sábado!", "08:23", "r"],
  ["Gabi", "Qual o bairro?", "08:31", "g"],
  ["Hugo", "Tem vaga?", "08:40", "b"],
];
const SORTED = ROWS.map((r, i) => i).sort((a, b) => PRI[ROWS[a][3]] - PRI[ROWS[b][3]] || a - b);
const T_TAG = 34.0, T_SORT = 37.68, T_AV = 40.08, T_RESP = 41.36;
function inbox(c, t) {
  c.fillStyle = "#ECECE4"; c.font = "800 52px Inter"; c.fillText("Conversas", 44, 175);
  c.fillStyle = "#8E8E86"; c.font = "500 26px Inter"; c.fillText(t < T_TAG + 0.6 ? "por ordem de chegada" : "triagem da Kalli", 44, 220);
  const so = ease(seg(t, T_SORT, T_SORT + 0.7));
  let rspN = 0;
  ROWS.forEach(([n, msg, hh, col], i) => {
    const rank = SORTED.indexOf(i);
    const y = 250 + lerp(i, rank, so) * 152;
    const tg = seg(t, T_TAG + rank * 0.12, T_TAG + rank * 0.12 + 0.3);
    const hot = col === "r";
    rr(c, 24, y, SW - 48, 136, 24); c.fillStyle = hot && tg > 0.5 ? "#1E1414" : "#151513"; c.fill();
    if (tg > 0) { c.save(); rr(c, 24, y, SW - 48, 136, 24); c.clip(); c.fillStyle = CSS[col]; c.fillRect(24, y, 12 * eOut(tg), 136); c.restore(); }
    // número da ordem de chegada
    const lit = t >= 32.14 + i * 0.13 && t < T_TAG + 0.4;
    c.fillStyle = lit ? LIMA : "#2A2A27"; c.beginPath(); c.arc(84, y + 68, 30, 0, 7); c.fill();
    c.fillStyle = lit ? "#0A0A0A" : "#9A9A92"; c.font = "800 26px Inter"; const num = (i + 1) + "º"; c.fillText(num, 84 - c.measureText(num).width / 2, y + 77);
    c.fillStyle = "#ECECE4"; c.font = "700 31px Inter"; c.fillText(n, 136, y + 56);
    c.fillStyle = "#6E6E68"; c.font = "500 22px Inter"; c.fillText(hh, SW - 110, y + 52);
    const answered = !hot && t >= T_RESP + rspN * 0.16; if (!hot) rspN++;
    if (answered) { c.fillStyle = LIMA; c.font = "700 25px Inter"; c.fillText("✓ Kalli respondeu", 136, y + 100); }
    else { c.fillStyle = hot ? "#ECECE4" : "#9A9A92"; c.font = (hot ? "600 " : "500 ") + "26px Inter"; c.fillText(msg, 136, y + 100); }
    if (tg > 0) {
      const tag = hot ? "Qualificado" : "Nutrir"; c.save(); c.font = "800 20px Inter"; const tw = c.measureText(tag).width + 28; const s = backOut(tg); c.translate(SW - 56 - tw / 2, y + 102); c.scale(s, s);
      rr(c, -tw / 2, -18, tw, 36, 18); c.fillStyle = hot ? LIMA : "#2E2E2A"; c.fill(); c.fillStyle = hot ? "#0A0A0A" : "#B8B8B0"; c.fillText(tag, -tw / 2 + 14, 7); c.restore();
    }
  });
  // aviso de cliente pronto
  const b = eOut(seg(t, T_AV, T_AV + 0.4));
  if (b > 0) {
    const y = -250 + b * 330; rr(c, 22, y, SW - 44, 220, 34); c.fillStyle = "#1C1C1A"; c.fill(); c.lineWidth = 4; c.strokeStyle = LIMA; c.stroke();
    c.fillStyle = LIMA; c.beginPath(); c.arc(80, y + 60, 25, 0, 7); c.fill(); c.fillStyle = "#0A0A0A"; c.font = "900 28px Inter"; c.fillText("✓", 69, y + 70);
    c.fillStyle = "#8E8E86"; c.font = "600 22px Inter"; c.fillText("KALLI · agora", 124, y + 52);
    c.fillStyle = "#ECECE4"; c.font = "800 34px Inter"; c.fillText("Cliente pronto: Ana", 124, y + 94);
    c.fillStyle = "#B8B8B0"; c.font = "500 25px Inter"; wrap(c, "Quer visitar no sábado · já tem carta de crédito · Apto 2 quartos, Braga", SW - 170).forEach((l, k) => c.fillText(l, 124, y + 136 + k * 34));
  }
}
function drawScreen(t) {
  const c = sx; c.clearRect(0, 0, SW, SH);
  c.save(); rr(c, 0, 0, SW, SH, 92); c.clip(); c.fillStyle = "#0D0D0C"; c.fillRect(0, 0, SW, SH);
  c.fillStyle = "#ECECE4"; c.font = "600 30px Inter"; c.textBaseline = "alphabetic"; c.fillText("08:41", 60, 70);
  c.fillStyle = "#000"; rr(c, 260, 22, 200, 56, 28); c.fill(); c.fillStyle = "#ECECE4"; rr(c, 600, 48, 54, 26, 7); c.fill();
  inbox(c, t);
  if (t > T_TAG - 0.3 && t < T_TAG + 1.0) { const k = seg(t, T_TAG - 0.3, T_TAG + 1.0); c.fillStyle = `rgba(184,255,79,${Math.sin(k * Math.PI) * 0.18})`; c.fillRect(0, 0, SW, SH); }
  c.restore(); stex.needsUpdate = true;
}

// ---------------- câmera ----------------
const CK = [
  { t: 0, p: [0.5, 0.75, 1.55], l: [0.0, 0.42, -0.8] },
  { t: 4.4, p: [0.75, 1.15, 2.0], l: [0.0, 0.35, -1.2] },
  { t: 9.3, p: [0.4, 2.8, 1.75], l: [-0.02, 0.15, -1.55] },
  { t: 19.5, p: [0.3, 3.0, 1.5], l: [0.02, 0.1, -1.75] },
  { t: 24.2, p: [0.8, 2.2, 2.6], l: [0.0, 0.1, -0.6] },
  { t: 25.6, p: [0.0, 0.02, 4.5], l: [0.0, 0.02, 0.9] },
  { t: 33.8, p: [0.06, 0.04, 4.4], l: [0.0, 0.02, 0.9] },
  { t: 44.2, p: [-0.04, 0.0, 4.3], l: [0.0, 0.02, 0.9] },
  { t: 49.6, p: [0.0, 0.0, 4.45], l: [0.0, 0.02, 0.9] },
];
const PHONE = [0, 0.02, 0.9];
const origin = new THREE.Vector3();
function renderAt(t) {
  if (!ready) return;
  const ck = keys(CK, t);
  const P = [ck.p[0] + Math.sin(t * 0.4) * 0.035, ck.p[1] + Math.cos(t * 0.33) * 0.025, ck.p[2]], Lk = ck.l;
  const oyk = lerp(0.15, 0.34, ease(seg(t, 8.8, 9.8)) * (1 - ease(seg(t, 24.0, 25.4))));
  const oy = oyk * Math.hypot(P[0] - Lk[0], P[1] - Lk[1], P[2] - Lk[2]);  // objeto no terço de cima, letra embaixo
  camera.position.set(P[0], P[1] - oy, P[2]); camera.lookAt(Lk[0], Lk[1] - oy, Lk[2]);
  // celular: sobe no "agora, olha o seu WhatsApp" e desce no fim
  const up = ease(seg(t, 24.35, 25.4)) * (1 - ease(seg(t, 44.3, 45.1)));
  phone.position.set(PHONE[0], lerp(-2.6, PHONE[1], up), PHONE[2]);
  let vib = t > T_AV && t < T_AV + 0.8 ? Math.sin(t * 95) * 0.035 * (1 - seg(t, T_AV, T_AV + 0.8)) : 0;
  phone.rotation.set(Math.sin(t * 0.37) * 0.03 + (1 - up) * 0.6, -0.12 + Math.sin(t * 0.5) * 0.05, vib);
  phone.visible = up > 0.001; phone.updateMatrixWorld(true); screen.getWorldPosition(origin);
  rim.intensity = 6 + (t > T_AV && t < T_AV + 1.2 ? Math.sin(seg(t, T_AV, T_AV + 1.2) * Math.PI) * 18 : 0);
  if (phone.visible) drawScreen(t);
  // a fila: reordena por cor e depois entra no celular
  const stage = ST.filter((s) => t >= s).length;
  const k = stage > 0 ? ease(seg(t, ST[stage - 1], ST[stage - 1] + 0.9)) : 0;
  pats.forEach((p, n) => {
    const a = slot(ORD[Math.max(0, stage - 1)].indexOf(n)), b = slot(ORD[stage].indexOf(n));
    let pos = stage > 0 ? L3(a, b, k) : slot(n);
    // quem passa à frente dá um pulinho para o lado
    const moving = stage > 0 && a[2] !== b[2] ? Math.sin(k * Math.PI) : 0;
    pos = [pos[0] + moving * (b[2] > a[2] ? 0.32 : -0.0), pos[1], pos[2]];
    let s = 1;
    const fly = ease(seg(t, 24.4 + n * 0.05, 25.2 + n * 0.05));
    if (fly > 0) { pos = L3(pos, [origin.x, origin.y - 0.2, origin.z], fly); s = 1 - fly; }
    p.g.visible = s > 0.01; p.g.position.set(pos[0], pos[1], pos[2]); p.g.scale.setScalar(Math.max(s, 0.001));
    p.g.rotation.y = Math.sin(t * 0.6 + n) * 0.15;
    const bs = backOut(seg(t, 8.3 + n * 0.07, 8.75 + n * 0.07)); p.band.scale.setScalar(Math.max(bs, 0.001)); p.band.visible = bs > 0.01;
    // a senha: aparece na chegada, some quando a pulseira manda
    const to = eOut(seg(t, 0.2 + n * 0.12, 0.6 + n * 0.12)) * (1 - seg(t, 19.0, 19.6));
    place(objs.tix[n], [pos[0], pos[1] + 0.8 * s, pos[2]], s, to);
    // quem tem a cor chamada acende
    const called = stage > 0 && PRI[p.c] < stage;
    p.band.material.emissiveIntensity = 0.45 + (called ? 0.5 + Math.sin(t * 5) * 0.15 : 0);
  });
  spot.material.opacity = 0.5 * seg(t, 9.4, 9.9) * (1 - seg(t, 23.8, 24.4)); spot.material.color.set(t > 9.68 ? 0xE5383B : 0xffffff);
  // anéis saem da tela na triagem e voltam
  objs.rings.forEach((m, j) => {
    const a = T_TAG + j * 0.1; const p = eOut(seg(t, a, a + 0.5)); const back = ease(seg(t, 36.2 + j * 0.05, 36.7 + j * 0.05));
    const tgt = [0.55, 0.62 - j * 0.2, 1.3];
    const pos = L3(L3([origin.x, origin.y, origin.z], tgt, p), [origin.x, origin.y, origin.z], back);
    m.visible = p > 0 && back < 1; m.position.set(pos[0], pos[1], pos[2]); m.scale.setScalar(Math.max(backOut(seg(t, a, a + 0.45)) * (1 - back), 0.001));
    m.rotation.set(t * 1.3 + j, t * 0.9, 0);
  });
  // símbolo
  { const p = backOut(seg(t, 44.8, 45.6), 1.4); place(objs.sym, [0, 0.12, 0.9], p, 1); objs.sym.rotateY(Math.sin(t * 0.8) * 0.12); }
  renderer.render(scene, camera);
}
const clock = { t: 0 };
tl0.to(clock, { t: DUR, duration: DUR, ease: "none", onUpdate: () => renderAt(clock.t) }, 0);
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
