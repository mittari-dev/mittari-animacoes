# Biblioteca

O que a fábrica já tem para montar um vídeo sem gerar tudo de novo: sons, trilhas, vozes, imagens, telas reais e objetos 3D.

**O inventário completo** (cada arquivo, a duração e quantas cópias existem) está em [`inventario.md`](inventario.md). Ele é gerado por `python ferramentas/catalogo.py`. Rode de novo depois de acrescentar qualquer coisa.

## O que existe hoje (26/11)

| Tipo | Quantos | Onde pegar | Observação |
|---|---|---|---|
| **Efeitos sonoros** | 41 diferentes | `marcas/kalli/kit/sons/` (os 11 mais usados) | whoosh, tick, notif, pop, vibra, snap, impacto, digitando, enviada, porta, vibra-mesa. O whoosh aparece em 24 lugares |
| **Trilhas** | 34 diferentes | `videos/<peça>/trabalho/assets/trilha*.mp3` | Geradas no ElevenLabs Music, **uma por vídeo, e nenhuma reaproveitada**. Prompt base na Leva 02: *"upbeat minimal electronic beat, punchy, modern, no vocals, loopable, for a 30 second social video"*, de 100 a 120 BPM |
| **Vozes** | 1 voz: **Sandro Dutra** (ElevenLabs, `qPfM2laM0pRL4rrZtBGl`), oficial da Kalli desde 07/10 | `marcas/kalli/visual.md` | Na Leva 02: estabilidade baixa, velocidade 1,1. 34 narrações já geradas |
| **Tempo por palavra** | 1 por narração (`*-words.json`) | `_dev/` ou `_audio/` da peça | Hoje sai do ElevenLabs Scribe, que gasta crédito. O `faster-whisper` faz o mesmo de graça, no PC |
| **Texturas** | Grão e símbolo | `marcas/kalli/kit/` | Vinheta e brilho são CSS, no `index.html` da Leva 03 |
| **Imagens** | 406 diferentes, 22 reaproveitadas | Inventário | Fotos de imóvel (cozinha, sala, varanda) no `curioso-e-comprador-3d` |
| **Telas reais do app** | **Nenhuma** | — | Hoje as telas são desenhadas em HTML. Ver "Telas reais" abaixo |
| **Objetos 3D** | 2 cenas do Blender (ImobiFlow, filme de produto, deitado e em pé) | `videos/2026-10-05_imobiflow_filme-3d/trabalho/project/` | **Não existe ainda o celular 3D da Kalli**, que a Stack 2.0 pede |

## Como acrescentar

1. **Pôr o arquivo em `industria/biblioteca/<tipo>/`** (`sons/`, `trilhas/`, `vozes/`, `telas/`, `3d/`, `imagens/`) se ele serve a qualquer marca, ou em `marcas/<marca>/kit/` se é só da marca.
2. **Escrever uma linha em `industria/biblioteca/<tipo>/FONTES.md`:** o arquivo, de onde veio, a licença e onde funciona bem.
3. **Rodar `python ferramentas/catalogo.py`.**

**Licença:** efeito ou trilha de banco grátis só com licença que permite uso comercial (CC0 é a mais simples). Do ElevenLabs, conferir se o plano libera uso comercial. A Leva 02 deixou isso em aberto.

## Trilhas: gerar uma vez, usar muitas

Uma trilha boa de 30 a 40 s serve a vários vídeos do mesmo tom. A regra passa a ser:
1. **Antes de gerar, procurar no inventário** uma trilha do mesmo BPM e clima.
2. **Trilha nova vai para `industria/biblioteca/trilhas/`** com o nome dizendo o clima e o BPM (`tensa-110bpm-35s.mp3`) e o prompt em `FONTES.md`.

## Telas reais do app

Dá para pôr telas de verdade do app nos vídeos:
1. **Capturar** com o Chrome, sempre na **conta de demonstração**, nunca com dado de cliente real. Tamanho do celular (por exemplo, 390×844 com escala 3).
2. **Gravar em `marcas/<marca>/telas/<tela>-<data>.png`.** A data importa: quando o app muda, a tela velha sai.
3. **No vídeo,** a tela entra como imagem dentro do celular (HTML) ou como textura do celular 3D.

A gravação de tela em vídeo (R03 e R04, pendentes desde a Leva 01) segue o mesmo cuidado: só conta de demonstração.

## 3D sem gastar token a cada vídeo

O token se gasta **uma vez**, para escrever o script do Blender. Depois, cada render é trabalho do processador, e não do Claude.
1. **Modelar uma vez:** um script `cena.py` para o Blender (já instalado, versão 5.2) monta o objeto (o celular da Kalli, com a tela como textura) e a luz.
2. **Renderizar por linha de comando:** `blender -b cena.blend -P render.py -- --tela marcas/kalli/telas/x.png --saida trabalho/3d/` gera uma sequência de PNG com fundo transparente.
3. **O HyperFrames põe a sequência na cena** como imagem, com a letra e o resto por cima.
4. **Vídeo novo troca só a tela e o movimento** (parâmetros do `render.py`). O objeto, a luz e o material não são reescritos.
5. **Guardar em `industria/biblioteca/3d/`:** o `.blend` (no LFS), o `render.py` e um `LEIA.md` com os parâmetros.

**Ainda não existe nenhum objeto 3D reaproveitável da Kalli.** Fazer o celular 3D é uma tarefa à parte, que precisa do PC com Blender e da aprovação do dono.
