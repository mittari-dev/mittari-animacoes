# O funil que você nunca contou

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | E06 |
| **Pronto em** | 11/11/2026 |
| **Para quem** | Corretor que mede só o que vendeu |
| **Onde usar** | Reels (série Você não viu, 4 de 5) |
| **Duração** | 28 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

Quanto vendeu no mês, todo corretor sabe. Quantas conversas recebeu, quantas respondeu no mesmo dia e quantas viraram visita, quase ninguém conta. É nesses vãos que a venda some: não no fechamento, no caminho. A conta de uma semana mostra onde.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Quanto você vendeu, você sabe.** |
| 2 | Som no quadro 1 | impacto grave e um pop, com a barra de vendas acendendo |
| 3 | Sempre tem trilha | ElevenLabs Music: *groovy minimal funk-house beat, 110 BPM, handclaps, bouncy bassline, muted guitar chops* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

Faz a conta e comenta quantas visitas você marcou

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- Os números 40, 22 e 6 são um exemplo inventado e estão marcados na tela como "EXEMPLO · UMA SEMANA". Não citar como dado.
- É a peça da série que mais conversa com o problema do funil da própria Kalli: quem comenta um número de visitas baixo é um contato quente para chamar no direct.
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: `_ferramentas/render.sh <pasta do vídeo> <nome do arquivo>` na pasta da leva. A cena fica em `trabalho/cena.html`, `cena.css`, `cena.js` e `cena.json`; a base comum da série, em `_ferramentas/kit.css` e `kit.js`.
