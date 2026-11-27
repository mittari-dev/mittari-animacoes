#!/usr/bin/env bash
# Fecha um vídeo: som em -14 LUFS (padrão dos Reels), capa e tira de conferência. Chamado pelo render.sh.
# uso: finalizar.sh <pasta do vídeo> <nome-do-arquivo sem extensão> <segundo da capa>
set -e
D="$1"; N="$2"; C="${3:-1.5}"
ffmpeg -y -v error -i "$D/trabalho/_dev/render-bruto.mp4" -c:v copy -af "loudnorm=I=-14:TP=-1:LRA=9" -c:a aac -b:a 192k -movflags +faststart "$D/final/${N}_60fps.mp4"
ffmpeg -y -v error -ss "$C" -i "$D/final/${N}_60fps.mp4" -frames:v 1 -q:v 3 "$D/final/${N}_capa.jpg"
ffmpeg -y -v error -i "$D/final/${N}_60fps.mp4" -vf "fps=1/2.5,scale=216:-1,tile=14x1" -frames:v 1 "$D/trabalho/_dev/tira.jpg"
echo "$N $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$D/final/${N}_60fps.mp4") s $(ffmpeg -hide_banner -i "$D/final/${N}_60fps.mp4" -af ebur128=framelog=quiet -f null - 2>&1 | grep -E '^\s+I:' | tail -1)"
