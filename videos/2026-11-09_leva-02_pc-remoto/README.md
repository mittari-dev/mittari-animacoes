# Leva 02, feita no PC remoto (10 e 11/11/2026)

Vídeos da Leva 02 (`conteudo/05 Ideias/Leva 02 — Roteiros para a S10 (09-11).md`): a correção do gancho aplicada a três vídeos novos e a três vídeos da Leva 01 que ainda não tinham sido postados. Voz, trilha, efeitos e as ilustrações do churrasco foram gerados no ElevenLabs. A animação é HyperFrames.

Todos estão **em aprovação**. Nenhum foi postado.

| Roteiro | Vídeo | Duração | Situação |
|---|---|---|---|
| T03 | [Três mensagens que esfriam o cliente](2026-11-09_kalli_tres-mensagens/) | 31 s | Pronto |
| O02 | [O cliente não espera segunda-feira](2026-11-09_kalli_cliente-nao-espera-segunda/) | 22,8 s | Pronto |
| U10 | [O churrasco de sábado](2026-11-09_kalli_churrasco-de-sabado/) | 32,6 s | Pronto |
| O01 | [Você não precisa de mais clientes, v2](../2026-10-26_leva-01_pc-remoto/2026-10-26_kalli_voce-nao-precisa-de-mais-clientes/) | 29,9 s | Reaberto |
| T02 | [Nunca responda só "sim", v2](../2026-10-26_leva-01_pc-remoto/2026-10-26_kalli_nunca-responda-so-sim/) | 34,5 s | Reaberto |
| U09 | [A torre de controle, v2](../2026-10-26_leva-01_pc-remoto/2026-10-26_kalli_torre-de-controle/) | 48,5 s | Reaberto |

## Os três reabertos

A versão nova fica ao lado da original, na pasta `final/` de cada vídeo da Leva 01, com `_v2` no nome. A narração e a animação não mudaram. Mudou:

- **Um começo novo de 1,5 s**, com vibração e notificações desde o primeiro quadro e uma cena com hora ou número: *"Ontem: 8 conversas. 6 sem resposta."* (O01), *"14h32. Ele perguntou. Você disse 'sim'. Ele sumiu."* (T02) e *"Sexta, 18h. 5 clientes chamando ao mesmo tempo."* (U09). Os projetos estão em `2026-11-11_ajuste-gancho_o01-t02-u09/`.
- **Uma trilha nova por baixo do vídeo todo.** As antigas eram ambiente sem batida e ficavam inaudíveis; aumentar o volume não resolvia.

## Em cada pasta de vídeo

- `final/`: o vídeo em 60 fps, a capa e a legenda.
- `trabalho/`: o projeto HyperFrames (`index.html`), a narração, a trilha tratada e a original, os efeitos e o registro do render.
- `README.md`: a ficha, com as 5 regras do gancho conferidas e o que falta conferir antes de postar.

## Ferramentas da leva

| Arquivo | O que faz |
|---|---|
| `_ferramentas/mix.sh` | Deixa a narração 10% mais rápida sem mudar o tom, corta a trilha no tamanho do vídeo e faz ela abaixar sozinha quando a voz entra |
| `_ferramentas/finalizar.sh` | Leva o som para perto de −14 LUFS, tira a capa e a tira de conferência |
| `_ferramentas/reabrir.sh` | Cola a abertura de 1,5 s na frente de um vídeo pronto e põe a trilha nova por baixo |
| `_audio/` | O que saiu do ElevenLabs sem tratamento: vozes, trilhas, efeitos e o tempo de cada palavra |

## O que falta

- Assistir no celular, com som. Conferi as regras nos quadros renderizados, mas não consigo ouvir.
- Ouvir se alguma trilha tem voz cantada (foram geradas com a opção "instrumental" desligada).
- U10: conferir o texto do aviso de cliente pronto (ver a ficha).
- Central: criar as fichas A em `02 Animações`. Os roteiros já estão em `01 Roteiros`.
