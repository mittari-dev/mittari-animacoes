---
name: industria-de-postagem
description: A Indústria de Postagem da Mittari. Guia de ponta a ponta para produzir conteúdo de qualquer marca, do perfil da marca ao vídeo postado e medido, chamando a skill certa em cada etapa. Use para planejar, roteirizar, produzir, revisar, postar ou medir conteúdo (Reels, carrossel, Stories, LinkedIn) da Kalli, da Mittari ou de qualquer marca com pasta em marcas/.
---

# Indústria de Postagem

Este guia não produz nada sozinho. Em cada etapa, ele diz o que entra, que skill chamar, o que sai e o que precisa estar certo para seguir.

## Antes de começar

1. **Qual marca?** Abra `marcas/<marca>/`. Se a pasta não existe, copie `marcas/_modelo/` e rode as etapas 0 a 4 com o dono antes de qualquer peça.
2. **Leia `marcas/<marca>/regras.md` inteiro.** As regras da marca valem em todas as etapas e vencem qualquer skill.
3. **Em que etapa a peça está?** Siga a tabela a partir dela. Não pule portão.

## As etapas

As etapas 0 a 4 rodam uma vez por marca e são revistas a cada ciclo. As etapas 5 a 13 rodam toda semana.

| # | Etapa | Sai | Portão |
|---|---|---|---|
| 0 | [Perfil da marca](etapas/00-perfil.md) | `marcas/<marca>/perfil.md` | Cada recurso citado foi conferido no produto ou com o dono. O que não existe está escrito como não existe |
| 1 | [Público](etapas/01-publico.md) | `marcas/<marca>/publico.md` | A dor vem de conversa real (print, call, comentário), não de suposição |
| 2 | [Onde está e como chegar](etapas/02-canais.md) | `marcas/<marca>/funis.md` | Cada funil tem um fundo que funciona hoje (call, cadastro, compra) |
| 3 | [Mensagem e oferta](etapas/03-oferta.md) | `marcas/<marca>/oferta.md` | Nada promete o que o perfil diz que não existe |
| 4 | [Estratégia e grade](etapas/04-grade.md) | `marcas/<marca>/grade.md` | O dono aprovou a grade |
| 5 | [Ideias e ângulos](etapas/05-ideias.md) | `producoes/<marca>/<semana>.md` | Nenhum ângulo repete na semana. Cada peça tem funil e porta |
| 6 | [Roteiro](etapas/06-roteiro.md) | `<peça>/planejamento/roteiro.md` | Passa pelas regras da marca e pelo /humanizer. O dono aprovou |
| 7 | [Gancho](etapas/07-gancho.md) | 3 opções no roteiro, uma marcada | Funciona com o som desligado e no primeiro segundo |
| 8 | [Direção e storyboard](etapas/08-direcao.md) | `<peça>/planejamento/storyboard.md` | Nada parado mais de 2 s. Som desde o quadro 1 |
| 9 | [Produção](etapas/09-producao.md) | O vídeo em `<peça>/final/` | Renderizado no formato da grade. Sem crédito de voz: voz gravada ou versão só com texto e trilha |
| 10 | [Revisão](etapas/10-revisao.md) | Checklist preenchido na ficha (`modelos/ficha-de-video.md`) | Assistido inteiro no celular, com e sem som. Nenhuma promessa fora do perfil |
| 11 | [Pacote de postagem](etapas/11-pacote.md) | `<peça>/final/legenda-para-postar.txt`, capa e Stories do dia | A palavra-chave da porta bate com a resposta-padrão da marca |
| 12 | [Publicação e distribuição](etapas/12-publicacao.md) | Agendado. Cold start feito | Alguém pode responder a porta no mesmo dia, dentro do horário da marca |
| 13 | [Medir e voltar](etapas/13-medir.md) | `producoes/<marca>/<semana>-resultado.md` | A nota existe e a etapa 4 da semana seguinte a leu |

Para chamar a skill de uma etapa, leia `industria/skills/<nome>/SKILL.md`. Só use skill que esteja em `industria/skills/`. As outras estão listadas em `industria/banco.md` e não foram lidas.

## Regras universais (todas as marcas)

- **Só prometer o que existe.** Confira no `perfil.md` da marca.
- **Gancho no primeiro segundo.** Sem cumprimento e sem apresentação.
- **Som desde o quadro 1** e nada parado na tela mais de 2 s.
- **Toda peça tem uma porta no fim**: comentar uma palavra, mandar para alguém ou chamar no direct. Alguém precisa responder a porta no mesmo dia.
- **Todo texto passa por /humanizer** antes de ir ao dono.
- **Número só com fonte.** Uma conta pode ser usada como conta, nunca como fato.
- **O dono aprova o roteiro antes da produção**, e o vídeo antes de postar.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Uma peça | `videos/<data>_<marca>_<nome>/` (ou `pecas/`), com `planejamento/`, `trabalho/` e `final/` |
| O plano e o resultado da semana | `producoes/<marca>/` |
| Fontes, sons e logos da marca | `marcas/<marca>/kit/` |
| Modelos de ficha e roteiro | `modelos/` |
| Spec, plano e auditoria desta fábrica | `industria/ESPEC.md`, `industria/PLANO.md`, `industria/AUDITORIA.md` |
