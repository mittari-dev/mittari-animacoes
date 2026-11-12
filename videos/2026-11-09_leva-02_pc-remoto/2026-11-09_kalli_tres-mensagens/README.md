# Três mensagens que esfriam o cliente

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | T03 |
| **Pronto em** | 10/11/2026 |
| **Para quem** | Corretor que responde rápido, mas a conversa não anda |
| **Onde usar** | Reels (conhecimento prático, peça para salvar) |
| **Duração** | 31 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

Três frases que todo corretor manda e que deixam a conversa morrer, cada uma com a troca certa: dizer a hora em vez de "te retorno", responder e devolver uma pergunta em vez de só mandar o link, e terminar perguntando o dia da visita em vez de "estou à disposição". O balão de WhatsApp congela a cada erro e descongela com a troca.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Para de mandar isso pro seu cliente.** |
| 2 | Som no quadro 1 | o "tum" de mensagem enviada e o estalo de gelo, com o balão congelando em close |
| 3 | Sempre tem trilha | ElevenLabs Music: *upbeat minimal electronic beat, 110 BPM, punchy kick and crisp claps, plucky synth bass* |
| 4 | Nada parado mais de 2 s | Corte, texto novo ou elemento entrando a cada 1,5 a 2 s; voz 10% mais rápida |
| 5 | Os 3 primeiros segundos funcionam no mudo | Gancho escrito no terço de cima desde o quadro 1 |

Conferi as regras nos quadros renderizados. **Falta a conferência no celular, com som**: não consigo ouvir o áudio.

## A porta

Salva pro próximo atendimento · 7 dias grátis, link na bio

## Visual e som

- **Cores:** as da Kalli: preto, verde-lima `#B8FF4F` e laranja `#FF8A3D`. Vermelho `#FF5A5E` no erro e na perda.
- **Letras:** Archivo Black, Inter e Instrument Serif itálico.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro, acelerada em 10% sem mudar o tom. Tempo de cada palavra em `trabalho/_dev/words.json`.
- **Trilha:** mais alta que na Leva 01 (lá ela ficava inaudível). Abaixa sozinha quando a voz entra. O arquivo sem tratamento está em `trabalho/assets/trilha-original.mp3`.
- **Volume final:** normalizado para perto de −14 LUFS, o padrão dos Reels.

## Para conferir antes de postar

- A frase "A Kalli responde assim no seu WhatsApp" está conferida no roteiro (ela responde a pergunta e devolve pergunta de qualificação).
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: dentro de `trabalho/`, `npm run render`, e depois `_ferramentas/finalizar.sh` na pasta da leva.
