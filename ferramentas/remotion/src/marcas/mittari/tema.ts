import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

// Identidade da Mittari — fonte: "01 A Marca/Identidade Visual e Contatos" (Central da Mittari).
// Regra da marca: uma cor dominante por peça, nunca branco puro, nunca verde-limão.
export const cor = {
  laranja: "#C2410C", // a cor da marca
  laranjaEscuro: "#9A340A",
  laranjaClaro: "#E9A585", // só fundo, nunca texto
  papel: "#E8E8E0", // off-white: fundo padrão
  preto: "#101010", // texto e traço
  pretoClaro: "#1C1C1A",
  cinza: "#6B6B63", // texto secundário
  linha: "#C9C9BF", // bordas finas sobre o papel
};

export const fonte = {
  titulo: loadArchivo("normal", { weights: ["500", "700", "800"], subsets: ["latin", "latin-ext"] }).fontFamily,
  detalhe: loadPlexMono("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] }).fontFamily,
};

export const FPS = 30;
/** segundos → quadros */
export const seg = (s: number) => Math.round(s * FPS);
