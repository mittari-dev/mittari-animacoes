# Qualidade: o que é um vídeo pronto para postar

Cada peça passa por cinco portões, nesta ordem. A ordem segue o custo: errar no roteiro custa minutos, e errar depois do render custa crédito de voz, tokens e horas.

| # | Portão | Quando | Nota | Reprovou? |
|---|---|---|---|---|
| 1 | [Roteiro](1-roteiro.md) | Fim da etapa 7, **antes** de gerar voz | 0 a 20, com 3 eliminatórios | Volta para a etapa 6 (ou 5). Nada vai para produção |
| 2 | [Humanizer](2-humanizer.md) | Narração, texto da tela e legenda | Passa ou não passa | No máximo 2 reescritas. Na 3ª, o problema é a ideia: volta para o ângulo |
| 3 | [Animação](3-animacao.md) | Prévia, antes do render final | 10 camadas, de 0 a 5 | Refaz **só** a camada abaixo de 3 |
| 4 | [Render](4-render.md) | Depois do render | Conferência técnica automática | Re-renderiza. Se a falha for de cena, só a cena |
| 5 | [Prontidão](5-prontidao.md) | Antes de ir ao dono | 0 a 100 | Abaixo de 70 não vai ao dono |

## O mapa das falhas

| O que deu errado | Sintoma | Volta para | Custo de voltar |
|---|---|---|---|
| Ideia fraca | Não sai gancho em 3 s. O humanizer reprova 3 vezes | Etapa 5 (ângulo) | Baixo |
| Roteiro ruim | Nota do roteiro abaixo de 15, ou um eliminatório | Etapa 6 | Baixo |
| Não cabe no tempo | `beat_board.py` diz DOES-NOT-FIT | Etapa 6: cortar palavras | Baixo |
| Promessa que não existe | Recurso fora de `perfil.md` | Etapa 6. **Eliminatório** | Baixo |
| Animação fraca | Camada com nota abaixo de 3 | Etapa 9, só a camada | Médio |
| Render quebrado | `conferir-render.py` falha | Etapa 9: re-render | Médio (máquina, sem token) |
| Voz ruim | Pronúncia, ritmo | Regenerar **só a frase**, nunca a narração inteira | Crédito do ElevenLabs |
| Postou e foi mal | Retenção dos 3 s abaixo da mediana da marca | Etapa 13: diagnóstico (`viral-instagram-reels/references/diagnose-flop.md`) | Nenhum: vira aprendizado |

## Regra de ouro

**Nenhuma peça é "quase boa" para postar.** Ou passa nos cinco portões, ou volta. Quem decide se uma regra está errada é o dono, e a regra muda aqui, nunca na peça.
