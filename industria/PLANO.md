---
tipo: plano
criado: 2026-11-26
spec: industria/ESPEC.md
---

# Indústria de Postagem: plano

Cada tarefa termina num commit no `main`. Quem pegar no meio olha os `[x]` abaixo e o `git log`, e continua de onde parou.

## T1. Auditoria do repositório
- [x] Medir LFS, repetição, código citado pelo agy e arquivos de trabalho → `industria/AUDITORIA.md`

## T2. Esqueleto
- [x] `industria/SKILL.md`: o guia, com as 14 etapas, as regras universais e a ordem
- [x] `industria/etapas/00…13`: uma nota por etapa (entra, sai, skill, portão). A skill fica "a definir" até T3
- [x] `marcas/_modelo/`: perfil, publico, funis, oferta, regras, angulos, grade e visual, em branco
- [x] `marcas/kalli/`: preenchida a partir da Central (pastas 16 e 18 e o Playbook), com link para a nota de origem
- [x] `industria/referencias/agy-rascunho/`: o rascunho do agy (renomeado `RASCUNHO.md`, para não ser lido como skill) e os 21 gargalos

## T3. Leitura das skills, por etapa
Para cada etapa: ler as candidatas inteiras, ficar com uma por função, copiar para `industria/skills/<nome>/`, adaptar, escrever o `ORIGEM.md` e preencher a etapa.
- [x] Etapas 6, 7 e 11: roteiro, gancho e pacote. A semana de 04/01 depende delas
  - 6: `viral-short-form` + `storytelling-conversion` · 7: `viral-hooks` · 11: `viral-captions-and-ctas`, `ig-carousel`, `ig-story` · 13 (adiantada): `hook-library`
  - Para o banco: `spotlight-short-script`, `milo-video-script-writer`, `hormozi-hooks`, `ig-caption`, `ig-caption-writer`, `caption-writer-sms`, `ig-carousel-planner`, `carousel-writer-sms`
- [x] Etapas 8, 9 e 10: direção, produção e revisão
  - 8: `motion-art-direction` + `video-beat-board` · 9: HyperFrames + `kinetic-typography` + `beat-sync-editing` · 10: `video-delivery-specs` + /humanizer
  - Para o banco: `shot-composition`, `video-shotcraft`, `motion-video-director`, `video-animatic`, `remotion-video`, `remotion-kinetic-kit`, `caption-animation`, `gsap-web`, `accessible-animation`, `content-humanizer`, `mic-check`
- [x] Etapas 4, 5, 12 e 13: grade, ideias, publicação e medição
  - 4: `ig-content-planner` · 5: `viral-short-form-ideas` · 12: `viral-instagram-reels` + `ig-plan` · 13: `ig-audit` + `hook-library`
  - Para o banco: `content-strategy`, `content-calendar-sms`, `reverse-engineer-marketing`, `postiz-mcp`, `trypost-mcp`, `performance-analyzer-sms`, `content-pattern-analyzer-sms`
- [x] Etapas 0 a 3: perfil, público, canais e oferta
  - 0: `brand-context` + `brand-voice` · 1: `customer-research` · 2: `platform-strategy-sms` · 3: `brand-messaging` + `hormozi-offer` + `objection-destroyer`
  - Para o banco: `target-audience`, `funnel-content-strategy`
  - **Total: 24 skills escolhidas** (a meta era de 20 a 35)
- [ ] Ler também as que o agy citou e não estão na spec: `remotion-scenes` e `create-remotion-geist` (`mic-check`, `content-humanizer` e `trypost-mcp` lidas: banco)

**Decisões da Central na T3:**
- **O texto das skills fica no original, e a saída é em português.** Traduzir dezenas de milhares de palavras não muda o resultado. Se estiver errado, custa uma tradução depois, skill por skill.
- **Skill que aponta para arquivo que não veio junto vai para o banco.** É o caso de `ig-carousel-planner` e `ig-caption-writer` (`../../references`) e de `caption-writer-sms` e `carousel-writer-sms` (`.agents/`).

## T4. Banco
- [ ] `industria/banco.md`: as outras skills, com uma linha cada

## T5. Instalação
- [ ] `ferramentas/instalar-industria.ps1`: liga `industria/` às pastas de skills da Central, do `~/.claude` e do agy
- [ ] Tirar o rascunho do agy de `~/.claude/skills/industria-de-postagem`, já guardado em `referencias/`

## T6. Kit da Kalli e melhorias do repositório
- [ ] `marcas/kalli/kit/`: as fontes, os sons, o grão e o símbolo que hoje se repetem em até 28 vídeos
- [ ] `ferramentas/hyperframes/`: base de cena a partir do melhor vídeo da Leva 03
- [ ] `.gitignore`: `_dev/` e `render.log`
- [ ] Script que gera a galeria do README
- [ ] Decidir com o fundador: `conteudo/` como cópia ou leitura da Central no GitHub
- [ ] Conferir a cota do LFS (fundador, em Billing)

## T7. Publicação
- [ ] Conferir o Metricool: a conta da Kalli está conectada? Quanto custa?

## T8. Prova
- [ ] Um Reels da Kalli do zero, só com o guia e `marcas/kalli/`
- [ ] Uma peça da Mittari pelo mesmo caminho
- [ ] Corrigir no guia tudo o que travou nas duas
