---
tags: [mittari, kalli, conteúdo, animação, qualidade, stack, zirtuno, hyperframes, blender]
criado: 2026-10-05
---

# 🔧 Animação — Diagnóstico Técnico e Stack 2.0

← [[Hub de Conteúdo|Hub de Conteúdo]] · [[../../05 Playbooks/Playbook — Animações de Produto (História Primeiro)|Playbook de Animações]] · Régua: [[../../02 Público e Mercado/Zirtuno — Dossiê do Concorrente#a-linguagem-dos-vídeos|a linguagem dos vídeos da Zirtuno]] · [[../../08 Estratégia e Decisões/Plano de Nível — Site, Marca e Conteúdo|Plano de Nível]]

> **Pergunta do fundador em 05/10/2026:** *"como tá o novo jeito de fazer animação? Não o ângulo nem o roteiro: a qualidade técnica. A Zirtuno tá fazendo melhor."*
>
> **Resposta curta: está. A nossa história é melhor, mas a imagem é de apresentação de slides animada.** O que falta não é ideia, são sete camadas técnicas que eles têm e nós não. Todas dá para fazer aqui, sem pagar nada, com o que já está instalado (HyperFrames, Blender 5.2, ffmpeg).

---

## 1. O diagnóstico: A07 e A08 lado a lado com a Zirtuno

Lido quadro a quadro, a cada 3 s, em 05/10.

| # | Camada | A07 / A08 (nós) | Zirtuno | Nota (0–5) |
|---|---|---|---|---|
| 1 | **Câmera** | Parada e de frente. O quadro nunca se mexe; só os elementos entram e saem | Câmera que anda: aproxima, gira em volta do objeto, atravessa a cena | **1** |
| 2 | **Profundidade** | Tudo no mesmo plano. Um celular chapado e texto em cima | Três planos (fundo desfocado, objeto, texto na frente), luz de estúdio, sombra | **1** |
| 3 | **Objeto central** | Um celular desenhado em CSS, pequeno (40% da largura) | Um objeto 3D com material e brilho, ocupando o quadro | **1** |
| 4 | **Letra cinética** | Frases inteiras aparecem em bloco, sincronizadas **por frase** (silêncios) | Cada palavra entra **na sílaba exata** da voz; tamanho e peso mudam pela ênfase | **2** |
| 5 | **Movimento** | Entra com fade e desliza; easing padrão; nada passa do ponto | Movimento com peso: passa um pouco e volta (*overshoot*), com rastro de velocidade (*motion blur*) | **2** |
| 6 | **Composição** | Muito espaço morto: a metade de baixo vazia na A07 e o texto encostado à esquerda | Quadro cheio e centrado no objeto, com respiro calculado | **2** |
| 7 | **Textura e luz** | Fundo liso com um brilho radial. Nenhum grão | Grão de filme, vinheta, *bloom* nas partes claras, varredura de luz | **1** |
| 8 | **Transições** | Corte seco ou fade | Corte casado, máscara, virada de tema | **2** |
| 9 | **Som** | Narração e nada mais (A07); trilha sintetizada (A08) | Cama musical + efeito em cada corte (*whoosh*, clique, impacto) | **2** |
| 10 | **Render** | 30 fps, H.264 padrão | 60 fps, bitrate alto | **3** |

**O que já está no nível ou acima:** a história (Cena → Mas → Portanto), as telas fiéis ao app (o `/brag` lê o código), a narração e a coerência de cor da Kalli.

> **A causa raiz:** montamos o vídeo **como um site**, com elementos HTML aparecendo numa página parada. A Zirtuno monta **como um filme**, com câmera, luz e objeto. O HyperFrames consegue as duas coisas, mas nós só usamos a primeira.

## 2. A Stack 2.0

O HyperFrames continua como **maestro**: linha do tempo, telas do app, letra e sincronia. Em volta dele entram quatro peças:

| Camada | Ferramenta | Como | Custo |
|---|---|---|---|
| **Câmera e profundidade** | CSS 3D dentro do HyperFrames | Toda cena dentro de um `.camera` com `perspective`; GSAP move `z`, `rotateX/Y` e `scale`. **Empurrão lento constante** (a câmera nunca está parada). Fundo com `blur` e plano da frente sem, para ter profundidade de campo | Zero |
| **Objeto 3D** | **Blender 5.2** (já instalado), em linha de comando (`blender -b -P cena.py`) | O celular modelado em 3D, com **a tela real do app como textura** e luz de estúdio. Renderiza sequência PNG com fundo transparente, que o HyperFrames compõe por cima e por baixo | Zero; ~5–15 min de render por plano de 3 s |
| **Letra por palavra** | `faster-whisper` (Python, local) ou o alinhamento do próprio ElevenLabs | Tempo de cada palavra da narração → cada palavra entra no tempo dela | Zero |
| **Textura, luz e acabamento** | Camada de cima no HTML + passe de ffmpeg | Grão animado (SVG `feTurbulence`), vinheta, *bloom* nos lima, varredura de luz no objeto. **Motion blur:** render a 60 fps e mistura de quadros no ffmpeg | Zero |
| **Som** | Biblioteca de efeitos + cama musical | Um efeito em **todo** corte e em toda entrada importante. Efeitos gerados no ElevenLabs (Sound Effects) pelo Miguel ou de biblioteca livre | Zero a baixo |

### As regras que passam a valer

1. **A câmera nunca para.** Mesmo em tela de texto, há um empurrão de 2 a 4% por cena
2. **Três planos em toda cena:** fundo (desfocado, com grão), meio (objeto ou tela), frente (letra)
3. **O objeto ocupa pelo menos 60% do quadro** quando está em cena
4. **Easing com peso:** `expo.out` para entrar, `back.out(1.4)` para o que precisa de impacto, nunca `linear` fora de contador
5. **Nenhum corte sem som** e nenhum fade como transição principal
6. **Render a 60 fps, CRF 16**, com volume a −14 LUFS
7. **Conferência quadro a quadro** antes do render (snapshot a cada 2 s + nas trocas) contra esta tabela, dando nota para as 10 camadas. Abaixo de 3 em qualquer uma, não sai

## 3. O teste

A primeira peça na Stack 2.0 é a [[../01 Roteiros/W01 — Kalli no Site|W01, o vídeo do site]]: deitada, com o celular em 3D no centro. Se ficar no nível, a A07 é refeita na 2.0 em seguida, reaproveitando a narração que já existe.

| Etapa | Tempo estimado (PC do Miguel) |
|---|---|
| Modelo do celular no Blender (uma vez só, reaproveitado em tudo) | 1 sessão |
| Cenas e câmera no HyperFrames | 1 sessão |
| Render (Blender + HyperFrames + acabamento) | 30–60 min de máquina |

## Ver também
- [[../../05 Playbooks/Playbook — Animações de Produto (História Primeiro)#81-tempo-de-produção|Tempo de produção]]
- [[../../01 Identidade da Marca/Direção Visual — Sólido e Vivo|Direção Visual — Sólido e Vivo]]
- [[../../01 Identidade da Marca/Marca — Onde Subir de Nível|Marca — Onde Subir de Nível]]
