# Base HyperFrames da casa

Veio da Leva 03 (série "Você não viu", feita no PC remoto em 11/11) e foi generalizada para qualquer marca em 26/11. A Leva 03 continua com a cópia dela em `_ferramentas/` e não precisa mudar.

**Por que existe:** antes, cada vídeo tinha um `index.html` de 280 a 420 linhas escrito do zero, e era aí que ia a maior parte dos tokens. Com a base, o vídeo escreve só a cena dele (`cena.css`, `cena.html` e `cena.js`, uns 150 linhas), e o resto vem pronto.

| Arquivo | O que faz |
|---|---|
| `kit.js` | Atalhos de animação: `F`, `SHOW`, `HIDE`, `OUT`, `POP`, `BUB`, `PULSE`, `SHAKE`, `MARK`, `lines()` (letra palavra por palavra), `typeWords()`, `porta()` e `fim()` (câmera que nunca para e grão). `W(t)` converte o tempo do `words.json` para a voz 10% mais rápida |
| `montar.mjs` | Junta `kit.js`, o `kit.css` da marca e a cena num `index.html`. Copia o kit da marca para `trabalho/assets/kit/` |
| `mix.sh` | Áudio: voz 10% mais rápida, trilha cortada no tamanho e abaixada quando a voz entra |
| `render.sh` | Monta, renderiza em 60 qps, fecha (−14 LUFS, capa, tira de conferência) e roda o portão 4 |
| `finalizar.sh` | Chamado pelo `render.sh` |
| `modelo-cena/` | O ponto de partida de um vídeo novo: gancho, uma frase e a porta |

O visual de cada marca (cores, fontes, celular, balões, porta) fica em `marcas/<marca>/kit/kit.css`, e o nome e o logo em `marcas/<marca>/kit/marca.json`. As cores da porta e dos ícones vêm de `--acento` e `--fundo`.

## Vídeo novo

1. Copiar `ferramentas/hyperframes/modelo-cena/` para `videos/<data>_<marca>_<nome>/`.
2. Ajustar o `cena.json`: `marca`, `dur`, `selo` e os sons. Os sons do kit são `kit/sons/<arquivo>`, e a narração e a trilha ficam em `assets/`.
3. Escrever a cena seguindo `planejamento/storyboard.md`.
4. Prévia: `node ferramentas/hyperframes/montar.mjs <pasta>` e depois `npm run dev` dentro de `trabalho/` (copie o `package.json` e o `hyperframes.json` de um vídeo da Leva 03).
5. Final: `ferramentas/hyperframes/render.sh <pasta> <marca>_<nome>`.

**Testado em 26/11:** "A aba aberta" montado com esta base gera os mesmos pixels que o original, conferidos no Chrome em 1 s e em 33 s. O modelo de cena monta e mostra o gancho, a frase e a porta. **Não testei o render completo neste notebook**, porque ele baixa o HyperFrames. O render é feito no PC remoto.
