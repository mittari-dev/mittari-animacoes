# Etapa 8: Direção e storyboard

| | |
|---|---|
| **Entra** | Roteiro, `marcas/<marca>/visual.md` |
| **Sai** | `<peça>/planejamento/storyboard.md`: quadro a quadro, com tempo, tela e som |
| **Skill** | `motion-art-direction` (linguagem de movimento e notas por cena), `video-beat-board` (a conta do tempo). No banco: `shot-composition`, `video-shotcraft`, `motion-video-director`, `video-animatic` |
| **Portão** | Nada parado mais de 2 s. Som desde o quadro 1 |

## Como fazer

**Uma vez por marca: a linguagem de movimento**
1. **Ler `industria/skills/motion-art-direction/SKILL.md`** e preencher a tabela de linguagem: uma curva de easing, uma unidade de tempo, um tipo de transição, um ritmo de escalonamento e uma intensidade.
2. **Gravar a tabela em `marcas/<marca>/visual.md`.** Toda peça da marca segue essa tabela. Trocar de linguagem no meio de uma peça é a causa mais comum de "parece amador".

**Por peça: a conta do tempo**
1. **Escrever `planejamento/brief.json`**:
   `{"title": "...", "aspect": "9:16", "duration_s": 30, "lane": "motion-only"}`
2. **Escrever `planejamento/beats.json`** com um item por frase da narração: `vo`, `on_screen` e `visual`.
3. **Rodar a conta:**
   `python industria/skills/video-beat-board/scripts/beat_board.py --brief planejamento/brief.json --beats planejamento/beats.json --out planejamento/scene.json`
   - **FITS:** segue.
   - **DOES-NOT-FIT:** corte as palavras que o script pedir. Não aumente a duração sem o dono.
4. **Uma frase de narração pode ter vários cortes de imagem.** A regra "nada parado mais de 2 s" vale dentro de cada frase.

**Por peça: o storyboard**
1. **Gravar `planejamento/storyboard.md`:** quadro a quadro, com tempo, o que aparece, o texto na tela, o som e o movimento (das notas de direção da skill).
2. **Conferir o portão:** som no quadro 1, nada parado mais de 2 s, texto fora das áreas cobertas pela interface do Instagram.

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
