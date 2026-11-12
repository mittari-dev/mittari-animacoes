#!/usr/bin/env bash
# Monta, renderiza em 60 fps e fecha um vídeo da série. uso: render.sh <pasta do vídeo> <nome do arquivo> [segundo da capa]
set -e
cd "$(dirname "$0")/.."
node _ferramentas/montar.mjs "$1"
( cd "$1/trabalho" && rm -rf _dev/snap && npx --yes hyperframes@0.8.206 render -f 60 -q high -o _dev/render-bruto.mp4 > render.log 2>&1 )
./_ferramentas/finalizar.sh "$1" "$2" "${3:-1.0}"
