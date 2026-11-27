# Portão 3: animação

**Quando:** na prévia (`npm run dev` do HyperFrames), **antes do render final**. Refazer uma camada na prévia não custa render.

**Como:**
1. Tirar uma captura a cada 2 s e uma em cada troca de cena. O `conferir-render.py --capturas` faz isso depois do render. Na prévia, faça à mão.
2. Dar nota de 0 a 5 a cada camada, olhando as capturas e o vídeo inteiro no celular.
3. Anotar as 10 notas na ficha.

**Aprovado: nenhuma camada abaixo de 3.** Camada abaixo de 3 é refeita sozinha. O resto do vídeo não se mexe.

Origem: o diagnóstico de 05/10 na Central (`18 Conteúdo/00 Manual/Animação — Diagnóstico Técnico e Stack 2.0`), que comparou os nossos vídeos A07 e A08 com a Zirtuno. Lá a nota foi 1 ou 2 em quase tudo. A causa: "montamos o vídeo como um site, e não como um filme".

| # | Camada | 1 (como um site) | 3 (passa) | 5 (como um filme) | Como subir |
|---|---|---|---|---|---|
| 1 | **Câmera** | Quadro parado, só os elementos entram e saem | Empurrão lento constante (2 a 4% por cena) | A câmera anda: aproxima, gira em volta, atravessa | Toda cena dentro de um `.camera` com `perspective`. O GSAP move `z`, `rotateX/Y` e `scale` |
| 2 | **Profundidade** | Tudo no mesmo plano | Dois planos (fundo desfocado e frente) | Três planos: fundo com grão, objeto, letra | Fundo com `blur`, frente sem. Grão por cima |
| 3 | **Objeto central** | Celular de CSS pequeno (40% da largura) | Objeto ocupa 60% do quadro | Objeto 3D com material e luz | Objeto da biblioteca (`industria/biblioteca/`): celular 3D do Blender, com a tela do app como textura |
| 4 | **Letra** | Frase inteira aparece em bloco | Entra por frase, no tempo da voz | Cada palavra entra na sílaba dela, e o peso muda na ênfase | `words.json` (tempo por palavra) e `kinetic-typography` |
| 5 | **Movimento** | Fade e deslize, easing padrão | `expo.out` para entrar | Peso: passa do ponto e volta (`back.out(1.4)`), com rastro | Nunca `linear` fora de contador |
| 6 | **Composição** | Metade do quadro vazia, texto encostado | Centrado, sem espaço morto | Quadro cheio, com respiro calculado e o foco num terço | `shot-composition` (banco) para o caso difícil |
| 7 | **Textura e luz** | Fundo liso | Grão e vinheta | Grão, vinheta, brilho nas partes claras e varredura de luz no objeto | `grao.png` do kit, vinheta em CSS |
| 8 | **Transição** | Corte seco ou fade em tudo | Corte com som | Corte casado, máscara ou virada de tema | `beat-sync-editing`: cortar na frase musical |
| 9 | **Som** | Só a narração | Narração e trilha | Trilha, mais um efeito em **todo** corte e em toda entrada importante | Sons da biblioteca. Som no quadro 1 |
| 10 | **Ritmo** | Algo parado mais de 2 s | Muda algo a cada 1,5 a 2 s | Ritmo que acelera até o ponto alto e respira depois | O `conferir-render.py` acha os trechos parados |

## O que a marca acrescenta

`marcas/<marca>/visual.md` pode mudar o que vale 5. Exemplo: uma marca calma pede menos câmera. Mas não pode deixar nenhuma camada abaixo de 3.

## Referências do dono

A galeria de vídeos bons e ruins, com a nota e o porquê de cada um, fica em `marcas/<marca>/galeria.md`. **Quem dá a nota da galeria é o dono.** Quando a nota do agente e a do dono discordarem, vale a do dono, e a tabela acima é que muda.
