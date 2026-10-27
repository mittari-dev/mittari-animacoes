---
tags: [mittari, conteúdo, manual, convenções, siglas]
criado: 2026-10-05
---

# 📏 Siglas e Convenções do Conteúdo

← [[../Hub de Conteúdo|Hub de Conteúdo]]

## 1. As siglas

| Sigla | O que é | Exemplo | Playbook |
|---|---|---|---|
| **H** + número | **História**: uma cena real da vida do corretor (Cena → Mas → Portanto). Uma história vira uma ou várias animações | H2 = o número que caiu | [[../../05 Playbooks/Playbook — Animações de Produto (História Primeiro)#3-o-banco-de-histórias\|Animações de Produto §3]] |
| **E** + dois dígitos | **Explicativo**: um fato curioso do mundo do cliente, sem vender | E01 = por que o WhatsApp derruba números | [[../../05 Playbooks/Playbook — Vídeo Explicativo Narrado\|Vídeo Explicativo]] |
| **U** + dois dígitos | **Ponte**: um **u**niverso de fora → o corretor → a Kalli | U01 = a vaca não tira feriado | [[../../05 Playbooks/Playbook — Conteúdo de Ponte (Outro Universo → Corretor → Kalli)\|Conteúdo de Ponte]] |
| **W** + dois dígitos | **Site** (*web*): vídeo deitado, 16:9. Letra no fim para variações (W01a, W01b) | W01 = Kalli no site | — |
| **C** + dois dígitos | **Carrossel** do Instagram, 4:5 | C01 = toda venda começa com uma chave | [[../../05 Playbooks/Playbook — Carrossel (Um Objeto, Uma Ideia por Lâmina)\|Carrossel]] |
| **R** + dois dígitos | **Resposta**: vídeo curto (10 a 25 s, 9:16) que responde **a pergunta de um destaque** do Instagram. Uma pergunta por vídeo, escrita na tela no primeiro segundo | R03 = o que acontece quando um cliente me chama | [[../03 Peças Estáticas/Kalli — Vídeos dos Destaques (Lista)\|Vídeos dos Destaques]] (aprovada em 06/10) |
| **T** + dois dígitos | **Técnica de atendimento**: conhecimento prático que o corretor usa no próximo atendimento, sem precisar da Kalli (aprovada em 26/10) | T02 = nunca responda só "sim" | [[../../05 Playbooks/Playbook — Máquina Semanal de Conteúdo (Produção em Lote)\|Máquina Semanal]] |
| **O** + dois dígitos | **Opinião ou provocação** (aprovada em 26/10) | O01 = você não precisa de mais clientes | [[../../05 Playbooks/Playbook — Máquina Semanal de Conteúdo (Produção em Lote)\|Máquina Semanal]] |
| **A** + dois dígitos | **Animação pronta**, o vídeo renderizado, na ordem em que foi feita, de qualquer tipo | A07 = a H2 narrada | — |

**H, E, U, W e R são o roteiro (a ideia). A é o vídeo que saiu dele.** A H2 virou a A04, a A05, a A06 e a A07. Quando a U01 for renderizada, vira a próxima A.

### Siglas de fora do conteúdo que aparecem junto

| Sigla | O que é | Onde |
|---|---|---|
| **S** + dois dígitos | **Semana** do ciclo (S05 = 05/10 a 11/10). Por isso o vídeo do site é **W**, e não S | `12 Planejamentos` |
| **E0 a E3** | **Estágio** da distribuição da Kalli (Prova, Base, Escala, Pool). Um dígito só, para não confundir com E01 | [[../../16 Distribuição/00 Controle/Kalli — O Plano de Distribuição\|Plano de Distribuição]] |
| **D1 a D8** | **Decisões** de marca e site pendentes com o fundador | [[../../01 Identidade da Marca/Direção Visual — Sólido e Vivo\|Direção Visual]] |
| **DEC** | Entrada do Decision Log | `08 Estratégia e Decisões` |

## 2. As pastas

| Pasta | O que vai nela | Nome do arquivo |
|---|---|---|
| `00 Manual/` | Como fazemos: siglas, régua técnica, modelos | — |
| `01 Roteiros/` | Um roteiro por nota, com o texto da narração e a tabela VOZ × TELA | `U01 — Título.md` (a sigla ordena sozinha: E, H, U, W) |
| `02 Animações/` | Uma ficha por vídeo pronto | `A10 — Título.md` |
| `03 Peças Estáticas/` | Perfil, capas, destaques, carrosséis | `Projeto — Peça.md` |
| `04 Publicações/` | O registro de onde cada peça foi parar e o que rendeu | Uma nota só |
| `05 Ideias/` | Levas de roteiros prontos para produzir no PC remoto (desde 23/10). Quando vira vídeo, a nota passa para `01 Roteiros/` | `Leva 01 — ….md` (índice) + uma nota por roteiro |

**Os bancos de ideias ficam nos playbooks**, não aqui: histórias (H) no de Animações, pautas (E) no Explicativo e universos (U) no de Ponte. Quando uma ideia vira roteiro, ela ganha nota em `01 Roteiros/`, e o banco aponta para ela.

## 3. Os arquivos fora do vault

| O quê | Onde | Por quê |
|---|---|---|
| **Vídeos finais** | `D:\dev\projects\mittari-videos\A10-nome\`, uma pasta por peça, mais `estaticas\` | Só o que vai para fora |
| **Fontes** (onde se edita e renderiza) | `C:\dev\estudio\` → `hyperframes\`, `remotion\`, `blender\` | O D: (exFAT) não roda HyperFrames nem Remotion |
| **Quarentena** | `D:\dev\_quarentena-2026-10-05\` e `C:\dev\_quarentena-2026-10-05\`, com `MANIFESTO.txt` | O fundador confere e apaga |

## 4. O caminho de uma peça

```
💡 Ideia (banco do playbook) → ✍️ Roteiro (01 Roteiros) → 🎙️ Voz (Miguel, ElevenLabs)
→ 🎬 Render (Central) → 📇 Ficha A (02 Animações) → 📣 Publicada (04 Publicações) → 📊 48 h medido
```

| Status da ficha | Quer dizer |
|---|---|
| **rascunho** | Em produção |
| **em uso** | É a versão que sai para fora hoje |
| **alternativa** | Pronta, mas não é a principal |
| **substituída** | Uma versão nova tomou o lugar (a ficha aponta para ela) |
| **aposentada** | Não sai mais |

## 5. Regras

1. **Narração em todo vídeo** desde 04/10 ([[../../05 Playbooks/Playbook — Animações de Produto (História Primeiro)#21-narração-a-voz-conduz-a-história-04102026|Playbook §2.1]])
2. **Régua técnica:** [[Animação — Diagnóstico Técnico e Stack 2.0|Stack 2.0]]. Nota abaixo de 3 em qualquer camada, não sai
3. **Versão nova ganha número novo** e aponta para a anterior. Nunca sobrescrever um A
4. **Roteiro sem a coluna TELA não sai da Central**
5. **Todo número dito tem fonte** anotada no roteiro
6. **Voz: ElevenLabs `eleven_v4`, sempre** (pedido do fundador, 05/10). Voz da Kalli, **oficial desde 07/10**: **Sandro Dutra** (`qPfM2laM0pRL4rrZtBGl`), narrador brasileiro nativo, com direção de emoção por frase (`[conversational]`, `[warmly]`, `[confident]`…). A Mark (americana, `1SM7GgM6IMuvQlz2BwM3`) soava robótica em português e ficou só na A07, A10 e A11. **Todo vídeo narrado leva trilha** (ElevenLabs Music, instrumental, com a curva do roteiro) mixada com *ducking* sob a voz, e grão leve (≤ 5%). O v4 **não lê `<break>`**: pausa é `[short pause]`, `[pause]`, `[long pause]` ou reticências. A Central gera a voz, os efeitos e as imagens pelo conector do ElevenLabs, e o tempo de cada palavra pelo Scribe
