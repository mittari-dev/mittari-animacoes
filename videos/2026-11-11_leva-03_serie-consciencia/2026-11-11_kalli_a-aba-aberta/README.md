# A aba aberta

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | E05 |
| **Pronto em** | 11/11/2026 |
| **Para quem** | Corretor que responde "quando dá" |
| **Onde usar** | Reels (série Você não viu, 3 de 5) |
| **Duração** | 35,2 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

O cliente não está esperando o corretor: está com o anúncio aberto na mão. Todo mundo procura de uma vez: senta, abre várias abas, manda mensagem para todos, fecha o celular e volta para a vida. Quem responde enquanto ele ainda está ali conversa; quem responde depois interrompe. A pesquisa da HBR mede isso.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Ele não está te esperando.** |
| 2 | Som no quadro 1 | notificação e vibração, com o anúncio aberto pulsando |
| 3 | Sempre tem trilha | ElevenLabs Music: *energetic minimal electronic beat, 120 BPM, fast ticking hi-hats, bright synth stabs* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

Comenta "hora" que eu te mando a pesquisa

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- Número e redação iguais aos já conferidos na E02: Oldroyd, McElheran e Elkington, "The Short Life of Online Sales Leads", Harvard Business Review, março de 2011 (1,25 milhão de contatos de 42 empresas dos EUA). A fonte aparece escrita na tela.
- A porta pede comentário com a palavra HORA: alguém precisa responder cada comentário com o link ou o resumo da pesquisa. Sem isso, a promessa do vídeo não se cumpre.
- "Seu cliente faz igual" é observação, não dado.
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: `_ferramentas/render.sh <pasta do vídeo> <nome do arquivo>` na pasta da leva. A cena fica em `trabalho/cena.html`, `cena.css`, `cena.js` e `cena.json`; a base comum da série, em `_ferramentas/kit.css` e `kit.js`.
