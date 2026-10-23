# Implementação e operação

## Pipeline

1. `src/blender/build_product_film.py` constrói os objetos, materiais, caminho de dados, keyframes de câmera e som original em Blender 5.2.2.
2. O motor Workbench foi escolhido após medir o computador de render: Intel Celeron N4020 (2 núcleos) e Intel UHD 600. Em EEVEE, uma única imagem Full HD levou mais de cinco minutos. O pipeline renderiza cinco placas por formato a 50% de resolução e as amplia com Lanczos na finalização.
3. `src/python/compose_product_films.py` aplica zoompan, quatro dissolvências, fade de entrada/saída e a trilha no FFmpeg. No encerramento vertical, a tipografia final é composta sobre o símbolo 3D para manter o end card livre das cenas empilhadas do formato 9:16. O resultado é CFR H.264/AAC a 24 fps, 1080p e 12 s.
4. Os dois arquivos `.blend`, keyframes, trilha, código e MP4s vivem em pastas separadas desta árvore.

## Requisitos locais

- Blender 5.2.2 em `D:\dev\.tools\blender.exe`.
- Python do Blender em `D:\dev\.tools\5.2\python\bin\python.exe`.
- FFmpeg essentials para Windows, versão **9.0.2**, extraído em `D:\dev\.tools\ffmpeg\` e executado por caminho explícito. O binário não altera o PATH.

O executável FFmpeg não estava no PATH nem nos locais de instalação pesquisados. A versão portátil foi baixada do mirror de builds Windows para o qual o site oficial do FFmpeg aponta. O SHA-256 esperado no arquivo `.sha256` oficial foi `60f467265b1e312373dbcd92200c2618a74850f98d3d078e94296bb3fa2047ba`; o ZIP foi conferido antes da extração. As builds estáticas desse distribuidor são GPLv3. O executável não é copiado para `deliverables/` nem incorporado aos vídeos.

## Arquivos

```text
D:\dev\.tools\product-film\imobiflow\
├── README.md
├── assets\audio\imobiflow_original_score.wav
├── deliverables\
├── docs\
├── previews\landscape\shot_01.png ... shot_05.png
├── previews\portrait\shot_01.png ... shot_05.png
├── project\ImobiFlow_ProductFilm_landscape.blend
├── project\ImobiFlow_ProductFilm_portrait.blend
└── src\
    ├── blender\build_product_film.py
    └── python\compose_product_films.py
```

## Verificação de entrega

Para cada MP4, confirmar com `ffprobe`:

- resolução exatamente 1920×1080 ou 1080×1920;
- vídeo H.264, 24 fps, pixels `yuv420p`;
- áudio AAC, 44,1 kHz, dois canais;
- duração aproximada de 12 segundos e arquivo reproduzível.

O render Blender salva cinco keyframes por formato. O comando de render não sobrescreve nem apaga fontes do projeto; re-renderizar os MP4s sobrescreve somente os dois nomes de saída definidos no script.
