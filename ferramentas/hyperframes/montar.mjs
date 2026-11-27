// Monta o index.html de um vídeo a partir da base da casa (kit.js), do kit da marca e da cena do vídeo.
// Veio do montador da Leva 03 (11/11), agora para qualquer marca.
//
// uso: node ferramentas/hyperframes/montar.mjs <pasta do vídeo>
//
// <pasta do vídeo>/trabalho/cena.json:
//   { "marca": "kalli", "dur": 35.2, "seed": 20261203, "selo": "VOCÊ NÃO VIU", "assinatura": "...",
//     "css": "cena.css", "html": "cena.html", "js": "cena.js",
//     "audio": [[arquivo, início, duração, volume], ...] }
// "marca" é opcional (padrão: kalli). css, html e js são arquivos dentro de trabalho/.
//
// O kit da marca (marcas/<marca>/kit/: kit.css, marca.json, fontes, sons, grão, logo) é copiado para
// trabalho/assets/kit/. Essa pasta fica fora do Git (.gitignore): o original está em marcas/.
// Os sons do kit entram no "audio" como "kit/sons/sfx-pop.mp3".
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(aqui, "..", "..");
if (!process.argv[2]) { console.error("uso: node ferramentas/hyperframes/montar.mjs <pasta do vídeo>"); process.exit(1); }
const dir = path.join(path.resolve(process.argv[2]), "trabalho");
const arqCena = path.join(dir, "cena.json");
if (!fs.existsSync(arqCena)) { console.error("não achei " + arqCena); process.exit(1); }
const c = JSON.parse(fs.readFileSync(arqCena, "utf8"));
for (const k of ["dur", "seed", "css", "html", "js", "audio"]) if (c[k] === undefined) { console.error(`cena.json sem "${k}"`); process.exit(1); }

const marca = c.marca || "kalli";
const kitDir = path.join(raiz, "marcas", marca, "kit");
if (!fs.existsSync(path.join(kitDir, "kit.css"))) { console.error("a marca não tem kit: " + kitDir); process.exit(1); }
const m = JSON.parse(fs.readFileSync(path.join(kitDir, "marca.json"), "utf8"));
fs.cpSync(kitDir, path.join(dir, "assets", "kit"), { recursive: true });

const rd = (f) => fs.readFileSync(path.join(dir, f), "utf8");
const kitCss = fs.readFileSync(path.join(kitDir, "kit.css"), "utf8");
const kitJs = fs.readFileSync(path.join(aqui, "kit.js"), "utf8");
for (const [f] of c.audio) if (!fs.existsSync(path.join(dir, "assets", f))) { console.error("áudio não encontrado: assets/" + f); process.exit(1); }
const audio = c.audio.map(([f, s, d, v], i) => `  <audio id="a${i}" src="assets/${f}" data-start="${s}" data-duration="${d}" data-volume="${v}"></audio>`).join("\n");
const W = m.largura || 1080, H = m.altura || 1920, FPS = m.fps || 60;

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
${kitCss}
${rd(c.css)}
</style></head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="${W}" data-height="${H}" data-duration="${c.dur}" data-fps="${FPS}">
  <div id="bg"></div>
  <div id="glow"></div>
  <div id="stage" data-layout-allow-overlap>
    <div id="world" data-layout-allow-overlap>
${rd(c.html)}
    </div>
    <div id="selo"><i></i>${c.selo || ""}</div>
    <div id="type"></div>
  </div>
  <div id="porta">
    <div id="pIco"></div>
    <div id="pL1"></div>
    <div id="pL2"></div>
    <svg id="pSeta" viewBox="0 0 120 120"><path d="M60 10 V96 M24 62 L60 100 L96 62" fill="none" style="stroke:var(--acento)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div id="pK"><img src="assets/kit/${m.logo}" alt="" />${m.nome}<span>${c.assinatura ?? m.assinatura_padrao ?? ""}</span></div>
  </div>
  <div id="grain"></div>
  <div id="vig"></div>
${audio}
</div>
<script>
const DUR = ${c.dur};
const SEED = ${c.seed};
${kitJs}
${rd(c.js)}
fim();
</script>
</body></html>
`;
fs.writeFileSync(path.join(dir, "index.html"), html);
console.log("montado:", path.join(dir, "index.html"), `(marca ${marca})`);
