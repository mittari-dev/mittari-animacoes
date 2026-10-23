#!/bin/bash
# Renderiza as versões do W02 (final v2) em cópias separadas do projeto, em paralelo.
set -u
export npm_config_cache="$TEMP/npx-cache"
P=/c/dev/estudio/hyperframes/w02-3d
O=/d/dev/projects/mittari-videos/W02-curioso-e-comprador
B=/c/dev/estudio/hyperframes/_w02-builds
mkdir -p $B
# trilha estendida (a mesma trilha, emendada com cruzamento de 3 s)
ffmpeg -v error -y -i $P/assets/trilha-b.mp3 -i $P/assets/trilha-b.mp3 -filter_complex "[0:a]atrim=0:52[a];[1:a]atrim=8:54,asetpts=PTS-STARTPTS[b];[a][b]acrossfade=d=3[o]" -map "[o]" -b:a 256k $P/assets/trilha-b-longa.mp3

one() { # aud cta saida atempo trim
  local D=$B/$1-$2
  rm -rf $D; mkdir -p $D
  cp -r $P/assets $P/_dev $P/hyperframes.json $P/meta.json $P/package.json $D/
  cd $D && python _dev/build.py $1 $2 >/dev/null || return 1
  npx --yes hyperframes@0.8.113 render --fps 60 -o raw.mp4 --quiet > render.log 2>&1; tail -2 render.log
  ffmpeg -v error -y -i raw.mp4 -i $P/assets/trilha-b-longa.mp3 -filter_complex "[1:a]atempo=$4,atrim=start=$5,asetpts=PTS-STARTPTS,volume=0.45,afade=t=in:st=0:d=0.8,aresample=48000[m];[0:a]aresample=48000,asplit=2[v][sc];[m][sc]sidechaincompress=threshold=0.025:ratio=5:attack=25:release=400:makeup=1[md];[v][md]amix=inputs=2:duration=first:normalize=0,afade=t=out:st=$(python -c "import subprocess;d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','raw.mp4']));print(round(d-1.2,2))"):d=1.2,loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$O/$3.mp4"
  echo "pronto $3"
}
one corretor site w02-corretor-site 1 1.9 &
one corretor whatsapp w02-corretor-whatsapp 1 1.9 &
one corretor reels w02-corretor-reels 1 1.9 &
wait
one imob site w02-imobiliaria-site 0.93 2.2 &
one imob whatsapp w02-imobiliaria-whatsapp 0.93 2.2 &
wait
for a in corretor imobiliaria; do ffmpeg -v error -y -i "$O/w02-$a-whatsapp.mp4" -vf "fps=30,scale=1280:-2" -c:v libx264 -preset slow -crf 25 -c:a aac -b:a 160k -movflags +faststart "$O/w02-$a-whatsapp-leve.mp4"; done
ffmpeg -v error -y -i "$O/w02-corretor-reels.mp4" -vf "fps=30,scale=720:-2" -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 160k -movflags +faststart "$O/w02-corretor-reels-leve.mp4"
ls -la $O/*.mp4
