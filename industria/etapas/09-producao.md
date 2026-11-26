# Etapa 9: Produção

| | |
|---|---|
| **Entra** | Storyboard, `marcas/<marca>/kit/`, `ferramentas/` |
| **Sai** | O vídeo em `<peça>/final/` |
| **Skill** | HyperFrames (o motor da casa, versão fixada no `package.json` de cada vídeo), `kinetic-typography` (texto animado), `beat-sync-editing` (cortes no ritmo). No banco: `remotion-video`, `remotion-kinetic-kit`, `caption-animation`, `gsap-web` |
| **Portão** | Renderizado no formato da grade. Sem crédito de voz: voz gravada ou versão só com texto e trilha |

## Como fazer

1. **Copiar a base:** um vídeo recente da marca (na Kalli, um da Leva 03) para `videos/<data>_<marca>_<nome>/trabalho/`. Quando existir `ferramentas/hyperframes/` e `marcas/<marca>/kit/` (T6), copiar de lá.
2. **Montar as cenas no `index.html`** seguindo `planejamento/storyboard.md`:
   - **texto:** `industria/skills/kinetic-typography/SKILL.md`. Por palavra para gancho e frase de efeito, por linha no resto;
   - **cortes:** `industria/skills/beat-sync-editing/SKILL.md`. Pegar o BPM da trilha e cortar nas frases musicais (2, 4 ou 8 batidas), com a imagem mais forte no ponto alto.
3. **Voz:** ElevenLabs, com a voz de `marcas/<marca>/visual.md`. **Sem crédito**, há dois caminhos:
   - o dono grava a narração no celular;
   - uma versão só com texto na tela e trilha.

   A peça não para por isso.
4. **Conferir e renderizar:** `npm run check`, depois `npm run render`. O resultado vai para `final/`.
5. **Skills do HyperFrames:** a máquina que renderiza precisa das skills oficiais da HeyGen (`npx skills add heygen-com/hyperframes`). O PC remoto já usou ("authoringSkill": "general-video"). Neste PC ainda não estão instaladas.

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
