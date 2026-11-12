# O churrasco de sábado

| | |
|---|---|
| **Produto** | Kalli |
| **Roteiro** | U10 |
| **Pronto em** | 10/11/2026 |
| **Para quem** | Corretor autônomo que trabalha sozinho |
| **Onde usar** | Reels (situação, peça para marcar um colega) |
| **Duração** | 32,6 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (letra sincronizada por palavra, câmera em perspectiva, grão e vinheta) |
| **Situação** | Em aprovação |

## A ideia

O corretor no churrasco da família ignora o celular vibrando no bolso: uma, duas, quatro vezes. Na tela dividida, o cliente queria visitar no domingo, perguntou o preço, mandou o bairro, disse que tinha carta de crédito, esperou e chamou outro. Na repetição, a Kalli responde e o corretor só recebe o aviso de cliente pronto.

## As 5 regras do gancho (Leva 02)

| # | Regra | Neste vídeo |
|---|---|---|
| 1 | Primeira frase é uma cena, com detalhe concreto | **Esse cliente vai fechar hoje. Só não com você.** |
| 2 | Som no quadro 1 | carne chiando na grelha com a vibração do celular por cima |
| 3 | Sempre tem trilha | ElevenLabs Music: *relaxed summer groove, 105 BPM, funky electric guitar, round bass. Fica abafada (filtro passa-baixa) enquanto o cliente espera e volta limpa na virada* |
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

- As três ilustrações (grelha, bolso, corretor de costas) foram geradas no ElevenLabs (gpt-image-2.5). Saíram deitadas, em 1280×720, e entram recortadas.
- O aviso usa só as duas primeiras linhas do texto conferido na U09 ("Cliente pronto: Ana" e "Quer comprar · apartamento · Braga · até R$ 450.000"). A linha de prazo e pagamento ficou de fora, porque a história fala em carta de crédito e não sei como o app escreve isso. Conferir antes de postar.
- Mesmo ângulo gasto da O02 (fim de semana).
- A trilha foi gerada com a opção "instrumental" desligada no ElevenLabs, apesar do pedido de "sem vocais". Ouvir se tem voz cantada.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames, narração, trilha, efeitos e o registro do render |

Para refazer: dentro de `trabalho/`, `npm run render`, e depois `_ferramentas/finalizar.sh` na pasta da leva.
