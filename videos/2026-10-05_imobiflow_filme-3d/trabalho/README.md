# ImobiFlow — Product Film

Filme de produto independente do frontend, criado a partir do fluxo real do ImobiFlow. Tudo deste projeto fica nesta pasta do disco D:.

## Entregas

| Arquivo | Formato | Duração |
| --- | --- | ---: |
| `deliverables/ImobiFlow_ProductFilm_16x9_1080p.mp4` | 1920×1080, paisagem, 24 fps, H.264 + AAC estéreo | 12 s |
| `deliverables/ImobiFlow_ProductFilm_9x16_1080x1920.mp4` | 1080×1920, retrato, 24 fps, H.264 + AAC estéreo | 12 s |

## Estrutura

- `project/` — cenas e câmera editáveis em arquivos `.blend`.
- `src/blender/` — constrói a cena 3D e renderiza cinco keyframes em cada formato.
- `src/python/` — finaliza os filmes com movimentos, transições, trilha e codificação via FFmpeg.
- `previews/` — keyframes usados pelo filme, separados por formato.
- `assets/audio/` — trilha estéreo original sintetizada para este filme.
- `deliverables/` — MP4s finais.
- `docs/` — briefing, storyboard, decisões técnicas e verificação.

## Recriar os arquivos

Os comandos abaixo executam as ferramentas já instaladas neste computador e gravam os resultados em D:. O Blender deve ser o executável `D:\dev\.tools\blender.exe`. O FFmpeg portátil verificado fica em `D:\dev\.tools\ffmpeg\`.

```powershell
$root = 'D:\dev\.tools\product-film\imobiflow'
$blender = 'D:\dev\.tools\blender.exe'
$python = 'D:\dev\.tools\5.2\python\bin\python.exe'
& $blender --background --python "$root\src\blender\build_product_film.py" -- --format all
& $python "$root\src\python\compose_product_films.py" --format all
```

O render Blender recria os keyframes e o áudio quando eles não existem. O compositor FFmpeg lê esses arquivos e recria os dois MP4s.

## Créditos e dependências

Modelos, composição, keyframes e trilha sonora são originais e procedurais. Não há imagens ou música de terceiros. O FFmpeg portátil é uma ferramenta local separada do material entregue; origem, versão e hash verificado estão em `docs/technical.md`.

Leia [`docs/brief.md`](docs/brief.md), [`docs/storyboard.md`](docs/storyboard.md) e [`docs/technical.md`](docs/technical.md) para detalhes.
