# O cliente não espera segunda-feira

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | O02 |
| **Pronto em** | 10/11/2026 |
| **Para quem** | Corretor que desliga no fim de semana |
| **Onde usar** | Reels (provocação, peça para comentar) |
| **Duração** | 22,8 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

Sábado, 16h12: o cliente manda mensagem. Domingo, ele manda para mais dois corretores. Segunda, 9h, você responde, e ele já marcou com outro. O celular em cima da mesa abre e fecha o vídeo: no fim, ele responde sozinho.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Sábado, 16h12. Seu cliente mandou mensagem.** |
| 2 | Som no quadro 1 | celular vibrando alto na mesa de madeira e a notificação chegando |
| 3 | Sempre tem trilha | ElevenLabs Music: *tense minimal electronic beat, 100 BPM, ticking hi-hat, deep pulsing sub bass. Corta seco antes da porta (silêncio de 0,5 s) e volta em seguida* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

7 dias grátis, link na bio

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- "Domingo, ele mandou pra mais dois corretores" é cena ilustrativa, não dado.
- A cena da semana (sábado e domingo com mais mensagens) é ilustração da frase "muita gente tem tempo de procurar", sem estatística por trás. Se alguém ler como gráfico, trocar por outra imagem.
- O ângulo da noite e do fim de semana está marcado como gasto no Banco de Ângulos (06/10). O roteiro veio pronto da Central; vale decidir se abre peça.
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: dentro de `trabalho/`, `npm run render`, e depois `_ferramentas/finalizar.sh` na pasta da leva.
