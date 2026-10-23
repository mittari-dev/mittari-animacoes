import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Tokens copiados de frontend/src/styles.css do ImobiFlow — a animação fala a
// mesma língua visual do app.
export const c = {
  bg: "#000000",
  surface: "#0a0a09",
  card: "#121211",
  border: "#2b2b27",
  borderSoft: "#1a1a1a",
  fg: "#e8e8e0",
  muted: "#888880",
  dim: "#555550",
  lime: "#b8ff4f",
  orange: "#ff6b2b",
  paper: "#e8e8e0",
  paperMuted: "#4f4f48",
};

export const fonts = {
  display: loadArchivo("normal", { weights: ["700", "800"], subsets: ["latin", "latin-ext"] }).fontFamily,
  body: loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] }).fontFamily,
  mono: loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily,
};

export const FPS = 30;
export const s = (seconds: number) => Math.round(seconds * FPS);
