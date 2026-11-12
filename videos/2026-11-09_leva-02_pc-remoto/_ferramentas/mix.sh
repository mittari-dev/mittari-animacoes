#!/usr/bin/env bash
# Prepara o áudio de um vídeo da Leva 02.
# uso: mix.sh <voz-original.mp3> <trilha-original.mp3> <pasta assets> <duração do vídeo em s> [atraso da voz em s] [filtro extra da trilha]
# - narração 10% mais rápida (regra 4), sem mudar o tom
# - trilha cortada no tamanho do vídeo, abaixada sozinha quando a voz entra, com saída suave no fim
set -e
VOZ="$1"; TRILHA="$2"; OUT="$3"; DUR="$4"; OFF="${5:-0.3}"; EXTRA="${6:-anull}"
MS=$(awk "BEGIN{print int($OFF*1000)}")
FO=$(awk "BEGIN{print $DUR-1.2}")
ffmpeg -y -v error -i "$VOZ" -af "atempo=1.1,loudnorm=I=-16:TP=-1.5:LRA=7" -ar 44100 -b:a 192k "$OUT/narracao.mp3"
cp "$TRILHA" "$OUT/trilha-original.mp3"
ffmpeg -y -v error -i "$TRILHA" -i "$OUT/narracao.mp3" -filter_complex \
 "[0:a]atrim=0:$DUR,volume=-6dB,$EXTRA[m];[1:a]adelay=$MS|$MS,apad=whole_dur=$DUR[v];[m][v]sidechaincompress=threshold=0.015:ratio=4:attack=15:release=420:makeup=1,afade=t=out:st=$FO:d=1.2[o]" \
 -map "[o]" -ar 44100 -b:a 192k "$OUT/trilha.mp3"
for f in narracao trilha; do echo "$f $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$f.mp3") $(ffmpeg -hide_banner -i "$OUT/$f.mp3" -af volumedetect -f null - 2>&1 | grep mean_volume | sed 's/.*] //')"; done
