#!/usr/bin/env bash
# Reabre um vídeo pronto: cola a abertura de 1,5 s na frente e põe uma trilha audível por baixo de tudo.
# Não mexe na narração. uso: reabrir.sh <abertura.mp4> <video original.mp4> <trilha nova.mp3> <saida.mp4> <n notificações>
set -e
AB="$1"; OR="$2"; TR="$3"; OUT="$4"; N="${5:-3}"
SFX="$(dirname "$0")/../_audio"; NOTIF="$(dirname "$0")/../2026-11-09_kalli_tres-mensagens/trabalho/assets/sfx-notif.mp3"; WH="$(dirname "$0")/../2026-11-09_kalli_tres-mensagens/trabalho/assets/sfx-whoosh.mp3"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OR"); TOT=$(awk "BEGIN{print $D+1.5}"); FO=$(awk "BEGIN{print $TOT-1.2}")
IN="-i $AB -i $OR -i $TR -i $SFX/sfx-vibra-mesa.mp3 -i $WH"; FC=""; MIX="[vb][wh]"; K=5
for i in $(seq 0 $((N-1))); do IN="$IN -i $NOTIF"; MS=$(awk "BEGIN{print int($i*1000*1.0/$N)}"); FC="$FC[$K:a]adelay=$MS|$MS,volume=0.8[n$i];"; MIX="$MIX[n$i]"; K=$((K+1)); done
ffmpeg -y -v error $IN -filter_complex "
[0:v]fps=60,format=yuv420p,setsar=1[v0];[1:v]fps=60,format=yuv420p,setsar=1[v1];[v0][v1]concat=n=2:v=1:a=0[v];
[3:a]volume=0.9[vb];[4:a]adelay=1250|1250,volume=0.5[wh];$FC
[1:a]adelay=1500|1500,apad=whole_dur=$TOT,asplit=2[or1][or2];
[2:a]atrim=0:$TOT,volume=-6dB[m];[m][or1]sidechaincompress=threshold=0.015:ratio=4:attack=15:release=420:makeup=1,afade=t=out:st=$FO:d=1.2[md];
${MIX}[or2][md]amix=inputs=$((N+4)):normalize=0,loudnorm=I=-14:TP=-1:LRA=9[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 16 -c:a aac -b:a 192k -movflags +faststart -t $TOT "$OUT"
echo "$(basename $OUT) $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s $(ffmpeg -hide_banner -i "$OUT" -af ebur128=framelog=quiet -f null - 2>&1 | grep -E '^\s+I:' | tail -1)"
