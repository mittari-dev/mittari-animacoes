# A torre de controle

| | |
|---|---|
| **Produto** | Kalli |
| **Pronto em** | 26/10/2026 |
| **Para quem** | Corretores de imóveis |
| **Onde usar** | Reels (situação real, pela ponte) |
| **Duração** | 47 s, com narração |
| **Formato** | 9:16 · 1080×1920 · 60 quadros por segundo |
| **Feito com** | HyperFrames (radar e aviões calculados quadro a quadro, corte casado do oval para o "digitando…", letra sincronizada por palavra) |
| **Situação** | Em aprovação |

## A ideia

No aeroporto, quem chega com a pista ocupada entra em espera e sabe que vai pousar. No WhatsApp do corretor, quem chega durante a visita não recebe resposta e vai embora. A Kalli é o controle: responde todo mundo, segura cada conversa e chama o corretor quando um cliente está pronto.

Roteiro: `conteudo/05 Ideias/U09 — A Torre de Controle.md` (leva 01, S08).

## Conferências feitas

| Item | Resultado |
|---|---|
| Retas de 1 minuto | Regra da ICAO (PANS-OPS, Doc 8168): perna de aproximação de 1 minuto até 14.000 pés, 1,5 minuto acima. A voz mantém "retas de um minuto" |
| Texto do aviso "cliente pronto" | Conferido no código do app (`backend-go/pkg/handlers/avisos.go`, `textoDoClientePronto`): "✅ Cliente pronto: Ana / Quer comprar · apartamento · Braga · até R$ 450.000 / Prazo: em até 3 meses · Pagamento: financiamento, FGTS". O cartão do vídeo usa exatamente esse formato |

## Roteiro

| # | Tempo | Texto na tela |
|---|---|---|
| 1 | 0–4 s | Radar em off-white, três aviões no oval · **Por que eles andam em círculo?** (escrito desde o primeiro quadro) |
| 2 | 4–14 s | Um avião pousa na pista; outro entra em espera · **Espera.** · o oval acende, o ponto fixo, "1:00" em cada reta · *retas de 1 min.* |
| 3 | 14–21 s | **Sabe que vai pousar.** O primeiro da fila sai do oval e pousa |
| 4 | 21–25 s | Corte casado: o radar se fecha no oval, que vira o "digitando…"; virada para o preto · **WhatsApp** *enquanto você está numa visita.* |
| 5 | 25–31 s | Lista "Conversas · você: em visita": 5 clientes **sem resposta**; um a um saem · "Juliana foi embora." · **Vão embora.** |
| 6 | 31–41 s | **A Kalli é o seu controle.** As 5 conversas giram num oval lima com "✓ respondido"; a Ana sai do oval e chega o aviso **Cliente pronto: Ana** · **Você pousa** *um de cada vez.* |
| 7 | 41–47 s | O radar volta em lima com o símbolo · **Teste 7 dias** *de graça.* · Link na bio |

## Visual e som

- **Cores:** off-white e traço preto com laranja no universo da aviação; preto, verde-lima `#B8FF4F` e laranja no mundo do corretor. Vermelho nas conversas sem resposta.
- **Voz:** ElevenLabs v4, Sandro Dutra, texto exato do roteiro (44,6 s).
- **Música:** ElevenLabs Music, ambiente de controle de tráfego que cresce na cena do WhatsApp, abaixada sob a voz.
- **Efeitos:** ping de radar, avião pousando, conversa indo embora (gerados no ElevenLabs), notificação, vibração, impacto, whoosh.

## Arquivos

| Pasta | O que tem |
|---|---|
| `final/` | O vídeo, a capa e o texto para postar junto |
| `trabalho/` | O projeto HyperFrames (`index.html`), narração, trilha, efeitos e o registro da geração (`render.log`) |

## Versão 2 (11/11/2026)

Reaberto na Leva 02 para a correção do gancho. O arquivo novo é `final/kalli_torre-de-controle_v2_60fps.mp4` (48,5 s); o original continua na pasta.

- **Começo novo de 1,5 s:** *"Sexta, 18h. 5 clientes chamando ao mesmo tempo."*, com cinco notificações em cascata. Tem som desde o primeiro quadro.
- **Trilha nova por baixo do vídeo todo**, com batida. A antiga era ambiente e ficava inaudível.
- A narração e a animação não mudaram.

O projeto da abertura está em `videos/2026-11-09_leva-02_pc-remoto/2026-11-11_ajuste-gancho_o01-t02-u09/`.
