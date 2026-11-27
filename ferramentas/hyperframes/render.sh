#!/usr/bin/env bash
# Monta, renderiza em 60 qps, fecha e confere um vídeo (portão 4).
# uso (da raiz do repositório): ferramentas/hyperframes/render.sh <pasta do vídeo> <nome-do-arquivo> [segundo da capa]
# Precisa de node, npx e ffmpeg no PATH. A versão do HyperFrames fica fixa aqui.
set -e
AQUI="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(cd "$AQUI/../.." && pwd)"
V="$(cd "$1" && pwd)"; N="$2"; C="${3:-1.0}"
[ -n "$N" ] || { echo "uso: render.sh <pasta do vídeo> <nome-do-arquivo> [segundo da capa]"; exit 1; }
mkdir -p "$V/final" "$V/trabalho/_dev"
node "$AQUI/montar.mjs" "$V"
( cd "$V/trabalho" && rm -rf _dev/snap && npx --yes hyperframes@0.8.206 render -f 60 -q high -o _dev/render-bruto.mp4 > render.log 2>&1 )
"$AQUI/finalizar.sh" "$V" "$N" "$C"
python "$RAIZ/ferramentas/conferir-render.py" "$V/final/${N}_60fps.mp4" --capturas "$V/revisao"
