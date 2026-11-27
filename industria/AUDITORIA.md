---
tipo: auditoria
criado: 2026-11-26
de: Central
---

# Auditoria do repositório (26/11)

A lista de problemas que o agy não fez. Cada ponto foi medido no clone de `D:\dev\projects\mittari-animacoes`, em dia com o `origin/main`.

## 1. Espaço e LFS

| Medida | Valor |
|---|---|
| `.git` | 1,1 GB |
| `videos/` | 1,4 GB |
| Arquivos no LFS (mp4, mov, wav, blend) | 44, somando **~1.115 MB** |

- **O LFS passou de 1 GB.** No plano grátis do GitHub, o limite costumava ser 1 GB de armazenamento e 1 GB de download por mês. Não conferi o limite atual nem o uso da conta. Os envios continuam passando. **Conferir em Settings → Billing da conta `mittari-dev`** antes da próxima leva, porque o PC remoto baixa tudo a cada clone novo.
- **mp3, png e jpg ficam fora do LFS**, no histórico normal do Git. Hoje são ~65 MB, e crescem a cada vídeo.

## 2. Repetição entre vídeos

Cada vídeo HyperFrames copia os mesmos arquivos para o seu `trabalho/assets/`. Mesmo arquivo, byte a byte:

| Arquivo | Cópias |
|---|---|
| `fonts/archivo-latin.woff2` | 28 |
| `fonts/inter-latin.woff2` | 27 |
| `grao.png` | 26 |
| `fonts/instrument-serif-italic-latin.woff2` | 26 |
| `simbolo-lima.png` | 23 |
| `sfx-whoosh.mp3` | 23 |
| `sfx-tick.mp3` | 22 |
| `sfx-notif.mp3` | 21 |
| `sfx-pop.mp3` | 20 |
| `sfx-vibra.mp3`, `sfx-snap.mp3`, `sfx-impacto.mp3`, `sfx-digitando.mp3`, `sfx-enviada.mp3` | 8 a 17 |
| `trilha-b-longa.mp3` (3 MB) | 6, no mesmo vídeo (`curioso-e-comprador-3d`) |

**O que fazer:** criar `marcas/kalli/kit/` com as fontes, os sons, o grão e o símbolo, e uma base de cena HyperFrames em `ferramentas/hyperframes/`. Vídeo novo usa o kit. Os vídeos antigos ficam como estão, porque mexer neles não traz nada.

## 3. O que o rascunho do agy dizia que existe e não existe

O `SKILL.md` do agy (a "Stack 2.0") manda montar as cenas com `WhatsAppChat`, `NotificationBanner`, `CounterComissao`, `useCardIn3D` e `EffectFilmGrain`. **Nenhum desses existe no repositório.** O Remotion de `ferramentas/` tem só as duas animações do ImobiFlow e a base da marca Mittari, de setembro. Os vídeos de novembro foram feitos em HyperFrames, cada um com o seu `index.html` de 280 a 420 linhas.

O rascunho também lê a grade 2-3-2-3-2 como 4 temas que somam 10 Reels. Isso briga com o Playbook, que vale (decisão de 26/11).

## 4. Arquivos de trabalho no Git

- Pastas `_dev/` versionadas: 5 montagens de `curioso-e-comprador-3d` com 22 arquivos cada, mais as de `nunca-responda-so-sim` e de outros vídeos.
- `render.log` versionado.
- `videos/2026-09-30_imobiflow_cliente-das-23h/trabalho/` tem 673 arquivos, e `curioso-e-comprador-3d` tem 325.

**O que fazer:**
- `render.log` e as pastas temporárias de render (`.render-bruto.hf-transaction-*`) foram para o `.gitignore`.
- **A `_dev/` fica no Git.** Ela guarda o `words.json`, com o tempo de cada palavra da narração, e o `index.html` usa esse arquivo (correção de 26/11).

## 5. Organização

- **A galeria do README é HTML feito à mão.** Cada peça nova obriga a editar a tabela. Um script pode gerá-la a partir do `README.md` de cada vídeo.
- **31 vídeos têm README**, mas no formato antigo, sem a ficha de `modelos/`. Os `planejamento/` variam: `plano-e-roteiro.md`, `BRIEF.md`, `STORYBOARD.md`.
- **`conteudo/` é cópia manual da pasta 18 da Central.** Com a Central no GitHub (`mittari-dev/central`), a cópia pode virar leitura direta. Decisão no plano.
- **A voz depende dos créditos do ElevenLabs.** A H5 parou por isso. A etapa 9 precisa de um caminho para quando faltar crédito (voz gravada pelo fundador, ou vídeo só com texto e trilha).
