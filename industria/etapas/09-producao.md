# Etapa 9: Produção

| | |
|---|---|
| **Entra** | Storyboard, `marcas/<marca>/kit/`, `ferramentas/` |
| **Sai** | O vídeo em `<peça>/final/` |
| **Skill** | HyperFrames (o motor da casa, versão fixada no `package.json` de cada vídeo), `kinetic-typography` (texto animado), `beat-sync-editing` (cortes no ritmo). No banco: `remotion-video`, `remotion-kinetic-kit`, `caption-animation`, `gsap-web` |
| **Portão** | Renderizado no formato da grade. Sem crédito de voz: voz gravada ou versão só com texto e trilha |

## Como fazer

1. **Partir da base da casa** ([`ferramentas/hyperframes/`](../../ferramentas/hyperframes/LEIA-ME.md)): copiar `modelo-cena/` para `videos/<data>_<marca>_<nome>/` e escrever só a cena (`cena.json`, `cena.css`, `cena.html`, `cena.js`). O `kit.js` e o kit da marca não são reescritos.
2. **Montar as cenas no `index.html`** seguindo `planejamento/storyboard.md`:
   - **texto:** `industria/skills/kinetic-typography/SKILL.md`. Por palavra para gancho e frase de efeito, por linha no resto;
   - **cortes:** `industria/skills/beat-sync-editing/SKILL.md`. Pegar o BPM da trilha e cortar nas frases musicais (2, 4 ou 8 batidas), com a imagem mais forte no ponto alto.
3. **Voz:** antes de gerar, ler [`industria/custos.md`](../custos.md). ElevenLabs, com a voz de `marcas/<marca>/visual.md`. **Sem crédito**, há dois caminhos:
   - o dono grava a narração no celular;
   - uma versão só com texto na tela e trilha.

   A peça não para por isso.
4. **Áudio:** `ferramentas/hyperframes/mix.sh` (voz 10% mais rápida, trilha abaixada sob a voz).
5. **Prévia e render:** `node ferramentas/hyperframes/montar.mjs <pasta>` e `npm run dev` para a prévia (portão 3). Aprovada, rodar `ferramentas/hyperframes/render.sh <pasta> <marca>_<nome>`, que monta, renderiza, fecha e roda o portão 4.
6. **Skills do HyperFrames:** a máquina que renderiza precisa das skills oficiais da HeyGen (`npx skills add heygen-com/hyperframes`). O PC remoto já usou ("authoringSkill": "general-video"). Neste PC ainda não estão instaladas.

## Portões

- **Na prévia:** [portão 3, animação](../qualidade/3-animacao.md). Nenhuma camada abaixo de 3.
- **Depois do render:** [portão 4](../qualidade/4-render.md), com `python ferramentas/conferir-render.py <video> --capturas <peça>/revisao`.
- **Voz:** gerar só depois do portão 1, em uma tomada. Frase ruim é regenerada sozinha, nunca a narração inteira (ver `industria/custos.md`).

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
