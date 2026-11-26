---
tipo: spec
criado: 2026-11-26
de: Central
status: rascunho para o fundador aprovar. Nada é construído antes disso.
---

# Indústria de Postagem: spec

## 1. O que é

Uma fábrica de conteúdo dentro deste repositório. Ela leva qualquer marca da **etapa 0** (quem somos e o que existe de verdade) até a **etapa final** (o vídeo pronto, postado e medido).

O centro é a **mega skill `industria-de-postagem`**. Ela é um guia e não produz nada sozinha. Em cada etapa, ela diz:
- o que entra;
- qual skill chamar;
- o que sai;
- o que precisa estar certo para passar à próxima etapa (o portão).

**Serve para qualquer marca.** A Kalli é a primeira. A Mittari, o ClinOS e um cliente futuro entram do mesmo jeito: ganham uma pasta em `marcas/`.

**Pronto quando:**
1. Um Reels da Kalli sai do zero, passando por todas as etapas, sem que ninguém precise abrir outro documento além do guia e da pasta da marca.
2. Uma peça de uma segunda marca (a Mittari) sai pelo mesmo caminho. Isso prova que o guia é universal.

## 2. Decisões do fundador (26/11)

| Decisão | |
|---|---|
| Tudo no `mittari-animacoes`, sem repositório novo | 26/11 |
| A mega skill é um guia que usa skills que já existem | 26/11 |
| De 20 a 35 skills escolhidas, cada uma com uma etapa. As outras ficam num banco | 26/11 |
| Universal: serve para qualquer marca, e melhora a indústria da Kalli | 26/11 |
| Grade da Kalli 2-3-2-3-2. Dark Stories todo dia | 23/11, confirmada em 26/11 |

## 3. Pastas

```
industria/
  SKILL.md                  o guia: as etapas, a ordem e as regras universais
  ESPEC.md                  este arquivo
  etapas/                   uma nota por etapa (00-perfil.md … 13-medir.md)
  skills/<nome>/            as escolhidas, lidas e adaptadas, cada uma com ORIGEM.md
  banco.md                  as outras: nome, para que serve, onde está
  referencias/              os 21 gargalos do agy e o que mais vier
marcas/
  _modelo/                  a pasta que se copia para uma marca nova
  kalli/                    perfil, público, oferta, funis, regras, ângulos, grade, visual e som
  mittari/
modelos/                    ficha de vídeo (já existe), ficha de carrossel, roteiro, pacote de postagem
ferramentas/                remotion (já existe), base do HyperFrames, script de instalação
videos/  pecas/             como hoje: <data>_<marca>_<nome>/ com planejamento/, trabalho/ e final/
conteudo/                   cópia da pasta 18 da Central (ver §8)
```

**O que é universal e o que é da marca:**
- **No guia (todas as marcas):**
  - gancho no primeiro segundo;
  - nada parado mais de 2 s;
  - som desde o quadro 1;
  - só prometer o que existe;
  - todo texto passa por /humanizer;
  - toda peça tem uma porta no fim;
  - o portão de cada etapa.
- **Na pasta da marca:** o que só vale para ela. Na Kalli:
  - nunca dizer "lead" para corretor;
  - nunca abrir com dia e hora;
  - os dois funis;
  - o Banco de Ângulos;
  - a grade 2-3-2-3-2;
  - mostrar o método manual quebrando, em vez de ensinar a consertar à mão;
  - a lista do que existe e do que não existe no app.

## 4. As etapas

Cada etapa grava o que produz na pasta `planejamento/` da peça, ou na pasta da marca quando o resultado vale para muitas peças. A etapa seguinte lê de lá.

| # | Etapa | Entra | Sai | Portão |
|---|---|---|---|---|
| 0 | **Perfil da marca** | Conversa com o dono, site, app | `marcas/<marca>/perfil.md`: o que vende, preço, o que existe e o que não existe | Cada recurso citado foi conferido |
| 1 | **Público** | Perfil | `publico.md`: quem é, a dor em palavras do próprio público, o que já tentou | A dor vem de conversa real, não inventada |
| 2 | **Onde está e como chegar** | Público | `funis.md` e `canais.md`: funis de baixo para cima, canais e pontos de contato | Cada funil tem um fundo que existe hoje |
| 3 | **Mensagem e oferta** | 0–2 | `oferta.md`: promessa, objeções e respostas | Nada promete o que o perfil diz que não existe |
| 4 | **Estratégia e grade** | 0–3 | `grade.md`: quantas peças de cada tipo, para qual funil, em que dia | O dono aprovou a grade |
| 5 | **Ideias e ângulos** | Grade, `angulos.md` | Lista da semana: uma linha por peça, com funil e ângulo | Nenhum ângulo repete na semana |
| 6 | **Roteiro** | A ideia | `roteiro.md` no modelo da casa | Passa pelas regras da marca e pelo /humanizer. O dono aprova |
| 7 | **Gancho** | Roteiro | 3 opções de gancho, uma escolhida | Funciona com o som desligado |
| 8 | **Direção e storyboard** | Roteiro, `visual.md` | Quadro a quadro: tempo, tela, som | Nada parado mais de 2 s |
| 9 | **Produção** | Storyboard | O vídeo em `final/` (Remotion ou HyperFrames, voz, trilha, legenda) | Renderizado em 1080×1920 |
| 10 | **Revisão** | O vídeo | Checklist assinado na ficha | Assistido inteiro, no celular, com e sem som |
| 11 | **Pacote de postagem** | Vídeo e roteiro | `legenda-para-postar.txt`, capa, Stories do dia | A palavra-chave da porta bate com a resposta-padrão |
| 12 | **Publicação e distribuição** | Pacote | Agendado. Cold start feito | Alguém pode responder no mesmo dia, até as 20h |
| 13 | **Medir e voltar** | Números da semana | Uma nota da semana: o que repetir e o que cortar | Volta para a etapa 4 |

As etapas 0 a 4 rodam **uma vez por marca** e são revistas por ciclo. As etapas 5 a 13 rodam **toda semana**.

## 5. As skills

**Como entram:**
1. A Central lê o `SKILL.md` inteiro de cada candidata.
2. Fica **uma skill por função**. Quando duas fazem a mesma coisa, fica a melhor e a outra vai para o banco. Exemplo: legenda tem 3 candidatas (`ig-caption-writer`, `ig-caption` e `caption-writer-sms`).
3. A skill escolhida é copiada para `industria/skills/<nome>/` e adaptada:
   - o que for de serviço pago ou de outra plataforma sai;
   - a regra que brigar com o guia sai;
   - o texto de exemplo vai para o português.
4. Cada uma ganha um `ORIGEM.md` com o repositório de onde veio, a licença e o que foi mudado.

**Candidatas** (36, umas 53 mil palavras no total; a lista final sai da leitura):

| Etapa | Candidatas |
|---|---|
| 0 | `brand-context`, `brand-voice` |
| 1 | `target-audience`, `customer-research` |
| 2 | `platform-strategy-sms`, `funnel-content-strategy` |
| 3 | `brand-messaging`, `hormozi-offer`, `objection-destroyer` |
| 4 | `content-strategy`, `content-calendar-sms` |
| 5 | `viral-short-form-ideas`, `reverse-engineer-marketing` |
| 6 | `spotlight-short-script`, `milo-video-script-writer`, `storytelling-conversion` |
| 7 | `hook-library`, `hormozi-hooks`, `viral-hooks` |
| 8 | `motion-art-direction`, `video-beat-board`, `video-shotcraft` |
| 9 | `remotion-video`, `remotion-kinetic-kit`, `caption-animation`, `beat-sync-editing` |
| 10 | `video-delivery-specs`, `accessible-animation` (o /humanizer já existe) |
| 11 | `ig-caption-writer`, `ig-caption`, `caption-writer-sms`, `ig-carousel-planner`, `ig-story` |
| 12 | `postiz-mcp` |
| 13 | `performance-analyzer-sms`, `content-pattern-analyzer-sms` |

**Licenças:** das 36, só 7 trazem a licença junto (5 dizem MIT, 3 têm arquivo LICENSE). As outras não dizem de onde vieram. Num repositório privado, só da Mittari, copiar é aceitável. **Antes de entregar a fábrica a outra empresa**, cada `ORIGEM.md` sem licença confirmada tem que ser resolvido: ou se acha a licença, ou se reescreve a skill com palavras próprias.

**O banco (`banco.md`):** as outras ~215, com uma linha cada. Elas continuam no disco, em `D:\dev\.tools\claude\skills`. Uma skill do banco só entra no guia depois de lida.

## 6. Instalação

- Um script em `ferramentas/` liga `industria/` (sem copiar) a:
  - `C:\ClaudeCache\skills\industria-de-postagem`: o Claude Code da Central;
  - `~/.claude/skills/industria-de-postagem`;
  - a pasta de skills do agy.
- O rascunho do agy que está hoje em `~/.claude/skills/industria-de-postagem` sai de lá e vai para `industria/referencias/`. Nada se perde.
- No PC remoto: clonar o repositório e rodar o mesmo script.

## 7. Publicação (etapa 12)

| Agora | Depois |
|---|---|
| Agendar à mão no **Meta Business Suite**, sem cabo USB | API da Meta, quando sair a revisão do app (Ciclo 02) |
| **A conferir:** o Metricool, que tem conector ligado na Central e agenda pelo app dele, já aprovado pela Meta. Falta ver se a conta da Kalli está conectada e quanto custa | `postiz-mcp`, se a API ou o Metricool não servirem |

## 8. Melhorias no repositório

A primeira tarefa do plano é a **auditoria do repositório**: a lista de problemas que o agy não fez. Pontos já vistos, a confirmar:
- O README tem a galeria montada à mão. Cada peça nova obriga a editar o HTML.
- O `conteudo/` é uma cópia manual da pasta 18 da Central. **A Central está no GitHub desde 26/11** (`mittari-dev/central`, privado), então a cópia pode virar uma leitura direta. A decidir no plano.
- O Remotion de `ferramentas/` é de setembro. Os vídeos de novembro usam HyperFrames, com um projeto inteiro dentro de cada `trabalho/`. Ver o que pode virar base comum.
- Pastas `_dev` e `render.log` dentro de `trabalho/`: ver se deveriam estar no Git.
- A voz depende dos créditos do ElevenLabs. A H5 parou por isso. A etapa 9 precisa de um caminho para quando faltar crédito.

## 9. Fora desta spec

- Gravar a tela real do app (R03 e R04).
- Tráfego pago.
- As metas do Ciclo 02, que estão no rascunho da máquina de distribuição na Central.

## 10. Riscos

| Risco | O que fazer |
|---|---|
| Uma skill escolhida traz regra que briga com a marca | O guia manda: a regra da marca vence e a da skill é apagada na adaptação |
| Ler 36 skills leva tempo | Ler por etapa, na ordem do uso. As etapas 6, 7 e 11 primeiro, porque a semana de 04/01 depende delas |
| A Central e o agy mexem no mesmo arquivo | Um só escreve em `industria/` de cada vez. Quem chega puxa o repositório antes |
