# Nunca responda só "sim"

| | |
|---|---|
| **Produto** | Kalli |
| **Pronto em** | 26/10/2026 |
| **Para quem** | Corretores que recebem cliente de portal e de anúncio |
| **Onde usar** | Reels (conhecimento prático, peça para circular) |
| **Duração** | 33 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (Stack 2.0: câmera em perspectiva, letra sincronizada por palavra, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

"Ainda está disponível?" respondido com "sim" encerra a conversa: o cliente agradece e some. Responder com três coisas (a confirmação, um detalhe que ele não perguntou e uma pergunta) dá a ele um motivo para continuar. A Kalli só aparece escrita no fim, porque esta é uma peça para o corretor repassar.

Roteiro: `conteudo/01 Roteiros/T02 — Nunca Responda Só Sim.md` (leva 01, S08).

## Roteiro

| # | Tempo | Texto na tela |
|---|---|---|
| 1 | 0–5 s | **Nunca responda só "sim".** No celular, chega "Ainda está disponível?" (escrito desde o primeiro quadro) |
| 2 | 5–9 s | **"Sim" = fim.** O corretor manda "Sim", o cliente responde "Ok, obrigado!", a conversa apaga: *…e some.* |
| 3 | 9–16 s | **Responda com 3 coisas:** 1 Confirma · 2 Um detalhe · 3 Uma pergunta |
| 4 | 16–23 s | A resposta se escreve no balão, no tempo da voz, e cada parte ganha um sublinhado na cor da etiqueta |
| 5 | 23–26 s | O cliente aparece "digitando…" · **Agora ele tem um motivo pra te responder.** |
| 6 | 26–33 s | **Manda esse vídeo pro corretor que responde "sim" o dia inteiro.** · símbolo da Kalli · *A Kalli responde assim, sozinha, em segundos.* · Teste 7 dias · link na bio |

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. O vermelho `#FF5A5E` marca o erro ("sim", "fim").
- **Letras:** Archivo Black (títulos), Inter (interface e apoio), Instrument Serif itálico (frases de respiro).
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro. Tempo de cada palavra pelo Scribe (`trabalho/_dev/words.json`).
- **Música:** ElevenLabs Music, lo-fi house a 112 BPM, abaixada automaticamente quando a voz entra.
- **Efeitos:** notificação, vibração, mensagem enviada, digitação, impacto grave, whoosh e pops (os novos foram gerados no ElevenLabs).

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames (`index.html`), narração, trilha, efeitos e o registro da geração (`render.log`) |

Para refazer: dentro de `trabalho/`, `npm run check` e `npm run render`. O áudio final passa por normalização para −14 LUFS (o padrão dos Reels).
