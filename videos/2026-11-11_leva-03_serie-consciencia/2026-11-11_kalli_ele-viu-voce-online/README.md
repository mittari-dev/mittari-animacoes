# Ele viu você online

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | E07 |
| **Pronto em** | 11/11/2026 |
| **Para quem** | Corretor que atende vários clientes ao mesmo tempo |
| **Onde usar** | Reels (série Você não viu, 5 de 5, a que leva para o teste) |
| **Duração** | 28,4 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

O cliente mandou mensagem e, em cima da conversa, apareceu "online". O corretor estava respondendo outro cliente, mas isso ele não vê. O que ele vê é: está aí e não me respondeu. Para ele não é demora, é desinteresse. Ele não reclama, só chama o próximo.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Ele viu que você estava online.** |
| 2 | Som no quadro 1 | notificação e vibração, com o "online" pulsando em close |
| 3 | Sempre tem trilha | ElevenLabs Music: *tense minimal electronic beat, 104 BPM, pulsing single-note synth bass, sharp percussive hits* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

Manda "teste" no direct que eu libero 7 dias pra você

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- A porta pede direct com a palavra TESTE: alguém precisa responder cada direct com o link do teste de 7 dias, de preferência na hora.
- O balão da resposta mostra "Kalli · em nome do Rafael". Conferir se a Kalli se identifica assim para o cliente ou se responde como o próprio corretor, e ajustar o rótulo se for o caso.
- "A Kalli consegue" (responder todo mundo na mesma hora) está coberto pela conferência da E02: 44 mensagens respondidas em menos de 1 minuto.
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: `_ferramentas/render.sh <pasta do vídeo> <nome do arquivo>` na pasta da leva. A cena fica em `trabalho/cena.html`, `cena.css`, `cena.js` e `cena.json`; a base comum da série, em `_ferramentas/kit.css` e `kit.js`.
