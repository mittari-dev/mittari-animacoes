# Você é um número sem nome

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | E04 |
| **Pronto em** | 11/11/2026 |
| **Para quem** | Corretor autônomo |
| **Onde usar** | Reels (série Você não viu, 2 de 5) |
| **Duração** | 29 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

No celular do cliente, o corretor não tem nome: é um número desconhecido entre cinco, com cinco conversas iguais. Amanhã, quando ele decidir visitar, não vai lembrar qual era qual. Lembra de quem disse o nome na primeira mensagem e mandou algo que valia guardar.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **No celular dele, você não tem nome.** |
| 2 | Som no quadro 1 | celular vibrando na mesa e a notificação |
| 3 | Sempre tem trilha | ElevenLabs Music: *moody minimal trap-influenced beat, 100 BPM, deep 808 bass, sparse dark synth plucks* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

Manda pro corretor que nunca se apresenta

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- "Cinco corretores" é cena ilustrativa, não dado.
- Os números de telefone na tela são inventados e mascarados.
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: `_ferramentas/render.sh <pasta do vídeo> <nome do arquivo>` na pasta da leva. A cena fica em `trabalho/cena.html`, `cena.css`, `cena.js` e `cena.json`; a base comum da série, em `_ferramentas/kit.css` e `kit.js`.
