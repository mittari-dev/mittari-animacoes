// Junta _dev/head.html + _dev/scene.js em index.html (o padrão do estúdio).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const dev = path.dirname(fileURLToPath(import.meta.url));
const head = fs.readFileSync(path.join(dev, "head.html"), "utf8");
const scene = fs.readFileSync(path.join(dev, "scene.js"), "utf8");
fs.writeFileSync(path.join(dev, "..", "index.html"), head.replace("/*SCENE*/", () => scene));
console.log("index.html ok");
