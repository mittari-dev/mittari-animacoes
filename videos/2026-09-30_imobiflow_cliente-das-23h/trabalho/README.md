# Material de produção

Tudo o que foi usado para montar o vídeo, do jeito que o `/brag` deixou. Os nomes não foram mudados, porque o `capture.js` e o `video.html` procuram os arquivos por eles.

| Arquivo ou pasta | O que é |
|---|---|
| `video.html` | A animação. Abra no navegador para ver; `window.render(t)` desenha o quadro do segundo `t` |
| `capture.js` | Grava a animação: `node capture.js frames` gera todos os quadros; `node capture.js stills 3,10,17` gera imagens soltas para conferir |
| `package.json` | Configuração do Node para o `capture.js` |
| `imobiflow.png`, `imobiflow-2.png` | Tentativa de baixar as telas do site. Apesar do nome, são páginas HTML e não imagens, porque as telas do site estavam quebradas. A animação não usa esses arquivos |
| `mix.wav` | Trilha final, com música e efeitos já misturados |
| `raw.mp4` | Vídeo completo, com som, antes da versão final |
| `poster.png` | Imagem de capa em tamanho cheio (1920×1080) |
| `f0000.orig.png` | Primeiro quadro, guardado para comparação |
| `sheet1.png` a `sheet3.png` | Folhas de conferência com várias cenas lado a lado |
| `stills/` | Imagens soltas usadas na conferência (`t3.00.png` = segundo 3) |
| `frames/` | Os 648 quadros do vídeo (21,6 s × 30 por segundo) |

## Para gerar o vídeo de novo

O `capture.js` aponta para o Playwright e o Chromium instalados no computador da Herika. Em outro computador, troque os dois caminhos no começo do arquivo.

```bash
node capture.js frames
ffmpeg -framerate 30 -i frames/f%04d.png -i mix.wav -c:v libx264 -pix_fmt yuv420p -crf 16 -c:a aac -shortest raw.mp4
```

O comando do `ffmpeg` é o caminho padrão para juntar quadros e som. O comando exato usado em 30/09/2026 não foi guardado.
