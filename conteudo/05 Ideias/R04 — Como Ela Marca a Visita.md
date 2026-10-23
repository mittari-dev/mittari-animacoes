---
tags: [mittari, kalli, roteiro, ideia, resposta, destaque, como-funciona, leva-01]
tipo: roteiro
formato_roteiro: R
formato: 9:16
duracao: ~20 s
criado: 2026-10-23
status: ideia, roteiro escrito, espera a gravação de tela
---

# 📅 R04 — "Como ela marca a visita?"

← [[Leva 01 — Roteiros para a S08 (23-10)|Leva 01]] · [[../03 Peças Estáticas/Kalli — Vídeos dos Destaques (Lista)|Vídeos dos Destaques]] (destaque **Como funciona**) · [[../Hub de Conteúdo|Hub de Conteúdo]]

| | |
|---|---|
| **Responde** | *"Como ela marca a visita?"* |
| **Onde vai** | Destaque **Como funciona** do @kalli.app |
| **Regras do R** | Pergunta escrita no 1º segundo · 15 a 25 s · funciona sem som · **tela real** |
| **Status** | ✍️ Roteiro · ⏳ Gravação de tela (a mesma da R03) · ⏳ Voz · ⏳ Render |

## O primeiro segundo

A pergunta, escrita: **"Como a Kalli marca a visita?"**. O balão do cliente já na tela: *"Dá pra ver no sábado?"*

## Para colar no ElevenLabs (v4, Sandro Dutra)

```text
[conversational] O cliente pergunta: "dá pra ver no sábado?" [pause] A Kalli confirma o dia e o horário com ele... [short pause] e a visita entra na sua agenda. [pause] O cliente passa pra "Visita agendada", [short pause] e recebe um lembrete um dia antes, e outro uma hora antes. [pause] [warmly] Você só aparece. [pause] [friendly] Teste sete dias, de graça. Link na bio.
```

## VOZ × TELA

| Tempo | VOZ | TELA (gravação real) | Escrito na tela |
|---|---|---|---|
| 0–3 s | *O cliente pergunta…* | "Dá pra ver no sábado?" | **Como a Kalli marca a visita?** |
| 3–8 s | *A Kalli confirma o dia e o horário…* | A troca de mensagens até a confirmação | *Sábado, 10h ✓* |
| 8–12 s | *…e a visita entra na sua agenda.* | `/agenda`: a visita aparecendo no dia | *Na sua agenda* |
| 12–17 s | *O cliente passa pra "Visita agendada"…* | `/pipeline`: o cartão do cliente mudando de coluna; um sino com "1 dia antes · 1 hora antes" | *Lembrete automático* |
| 17–20 s | *Você só aparece.* | Símbolo da Kalli | *Teste grátis de 7 dias · link na bio* |

## Fontes e conferências

| Afirmação | Situação |
|---|---|
| A visita entra na agenda da Kalli e o cliente passa para "Visita agendada" | ✅ [[../../Inbox/Retorno do chat de código — W02, o que a Kalli faz hoje (07-10-2026)\|Retorno do código, 07/10]], item 4 |
| Lembrete 1 dia e 1 hora antes | ✅ item 4 |
| Google Agenda | ❌ **Não mostrar.** A visita do agente não vai sozinha para o Google (precisa tocar em "Sincronizar") |
| A Kalli pergunta "quando pode visitar"? | Não por padrão: ela marca **quando o cliente propõe a data**. Por isso a cena começa com o cliente pedindo |

## Legenda

> O cliente pediu para ver no sábado. A Kalli confirmou o horário, pôs a visita na sua agenda e lembra o cliente um dia antes e uma hora antes.
>
> Você só aparece.
>
> Teste grátis de 7 dias, link na bio.

## Produção

- **Tipo:** gravação de tela real + letra cinética
- **Pasta no repositório:** `videos/2026-10-2X_kalli_r04-como-marca-a-visita/`
