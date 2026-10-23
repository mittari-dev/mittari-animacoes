# Estúdio de Animações

Todas as animações da Mittari, num só projeto Remotion (React + TypeScript).
As dependências ficam instaladas uma vez só em `node_modules`. Animação nova é só uma pasta nova.

## Ligar as ferramentas (qualquer PC com este disco como D:)

```powershell
. D:\dev\estudio.ps1          # só nesta janela
D:\dev\estudio.ps1 -Fixar     # para sempre neste usuário do Windows
```

Node, FFmpeg, Blender e os navegadores do Playwright vêm de `D:\dev\.tools`. Nada é instalado no PC.

## Usar

```powershell
Set-Location D:\dev\projects\estudio-animacoes
npm run studio                                              # editor ao vivo no navegador
npm run render -- ImobiflowComoFunciona out/imobiflow.mp4   # gera o vídeo
npm run still  -- ImobiflowComoFunciona out/q.png --frame=300   # um quadro só
```

## Estrutura

```
src/
  index.ts           registra o Root
  Root.tsx           uma linha por animação
  animacoes/
    imobiflow-como-funciona/
      Composicao.tsx  cenas em sequência + <Composition id="...">
      theme.ts        cores e fontes da marca daquela peça
      components/     peças reutilizáveis (caixas, fios, títulos)
      scenes/         S1…S7, uma cena por arquivo
out/                 vídeos e quadros renderizados (fora do git)
```

## Criar uma animação nova

1. Copie uma pasta de `src/animacoes/` com um nome novo (ex.: `clinos-apresentacao`).
2. Em `Composicao.tsx`, troque o `id` da `<Composition>` e o nome do componente exportado.
3. Acrescente uma linha em `src/Root.tsx`.
4. `npm run studio` e edite as cenas.

Precisa de um pacote novo? `npm install <pacote>` aqui na raiz. Vale para todas as animações.

## Ferramentas portáteis (em `D:\dev\.tools`)

| Ferramenta | Onde |
|---|---|
| Node 24 (com npm) | `D:\dev\.tools\node` |
| FFmpeg 9 | `D:\dev\.tools\ffmpeg\...\bin` |
| Blender 5.2.2 | `D:\dev\.tools\blender.exe` |
| Navegadores do Playwright | `D:\dev\.tools\.playwright\browsers` |
| Cache do npm | `D:\dev\.tools\npm-cache` |

`D:\dev\estudio.ps1` coloca tudo isso no PATH. DaVinci Resolve não é portátil: precisa ser instalado em cada PC.

## Cuidados

- **Disco D: ligado por USB é lento para arquivos pequenos** (≈0,35 s por arquivo no PC onde isto foi montado). `npm install` direto nele leva horas. Se precisar reinstalar, instale numa pasta do C:, renderize lá e copie para o D: com `robocopy <origem> <destino> /MIR /MT:16`.
- Não rode dois `npm install` na mesma pasta ao mesmo tempo (dá `ECOMPROMISED`).
- Confira o visual com `npm run still` antes de renderizar o vídeo inteiro.
- A pasta antiga `D:\dev\projects\imobiflow-animacoes` ficou quebrada e foi substituída por esta.

> **Movido em 05/10/2026:** este estúdio agora fica em `C:\dev\estudio\remotion` (o D: é exFAT). A cópia antiga do D: está em `D:\dev\_quarentena-2026-10-05`. As ferramentas continuam vindo de `D:\dev\.tools`.
