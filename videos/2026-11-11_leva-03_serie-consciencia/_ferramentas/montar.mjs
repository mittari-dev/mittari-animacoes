// Monta o index.html de um vídeo da série a partir da base comum (kit.css, kit.js) e da cena do vídeo.
// uso: node _ferramentas/montar.mjs <pasta do vídeo>
// A pasta tem trabalho/cena.json: { dur, seed, selo, css, html, js, audio: [[arquivo, início, duração, volume], ...] }
// (css, html e js são nomes de arquivos dentro de trabalho/)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(process.argv[2], "trabalho");
const c = JSON.parse(fs.readFileSync(path.join(dir, "cena.json"), "utf8"));
const rd = (f) => fs.readFileSync(path.join(dir, f), "utf8");
const kitCss = fs.readFileSync(path.join(here, "kit.css"), "utf8");
const kitJs = fs.readFileSync(path.join(here, "kit.js"), "utf8");
const audio = c.audio.map(([f, s, d, v], i) => `  <audio id="a${i}" src="assets/${f}" data-start="${s}" data-duration="${d}" data-volume="${v}"></audio>`).join("\n");
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
${kitCss}
${rd(c.css)}
</style></head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1080" data-height="1920" data-duration="${c.dur}" data-fps="60">
  <div id="bg"></div>
  <div id="glow"></div>
  <div id="stage" data-layout-allow-overlap>
    <div id="world" data-layout-allow-overlap>
${rd(c.html)}
    </div>
    <div id="selo"><i></i>${c.selo}</div>
    <div id="type"></div>
  </div>
  <div id="porta">
    <div id="pIco"></div>
    <div id="pL1"></div>
    <div id="pL2"></div>
    <svg id="pSeta" viewBox="0 0 120 120"><path d="M60 10 V96 M24 62 L60 100 L96 62" fill="none" stroke="#B8FF4F" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div id="pK"><img src="assets/simbolo-lima.png" alt="" />Kalli<span>${c.assinatura || ""}</span></div>
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
console.log("montado:", path.join(dir, "index.html"));
