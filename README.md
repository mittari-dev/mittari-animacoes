# Mittari — Animações

Todos os vídeos animados da Mittari: o arquivo pronto, o roteiro aprovado e o material de produção de cada um.

## Vídeos

| Data | Vídeo | Produto | Para quem | Duração | Formato | Pasta |
|---|---|---|---|---|---|---|
| 30/09/2026 | O cliente das 23h | ImobiFlow (hoje Kalli) | Corretor de imóveis, cliente em potencial | 21,6 s | 16:9 · 1920×1080 | [abrir](videos/2026-09-30_imobiflow_cliente-das-23h/) |

### Ainda fora do repositório

Estes vídeos estão na lista da Central da Mittari, mas os arquivos não estão neste computador. Quando forem encontrados, entram em `videos/` seguindo o mesmo padrão.

| Data | Vídeo | Onde estava |
|---|---|---|
| 30/09/2026 | ImobiFlow em 30 segundos (modelo de referência) | `estudio-animacoes\out\imobiflow-em-30s.mp4` |
| 30/09/2026 | Como o ImobiFlow funciona por dentro (teste técnico, uso interno) | `estudio-animacoes\out\imobiflow-como-funciona.mp4` |
| 02/10/2026 | O cliente do feriado (Kalli, visual do app) | `C:\dev\projects\videos\cliente-do-feriado\brag-output\` |

## Como está organizado

```
videos/
  AAAA-MM-DD_produto_nome-do-video/
    README.md        ficha do vídeo: para quem, ideia, roteiro, cores, som
    final/           o que se usa: vídeo, capa e texto para postar
    planejamento/    plano e roteiro aprovados antes de animar
    trabalho/        material de produção, para refazer ou ajustar o vídeo
modelos/
  ficha-de-video.md  modelo da ficha para cada vídeo novo
```

## Regras de nome

- **Pasta do vídeo:** data em que ficou pronto, produto e nome curto, tudo em minúsculas, sem acento, com hífen entre palavras e sublinhado entre as partes. Exemplo: `2026-09-30_imobiflow_cliente-das-23h`.
- **Arquivos finais:** `produto_nome-do-video.mp4`, `produto_nome-do-video_capa.jpg` e `legenda-para-postar.txt`.
- **Versões:** quando um vídeo mudar, o novo arquivo final ganha `_v2`, `_v3`. O histórico do Git guarda as versões anteriores.
- **Formato diferente** (em pé para story, quadrado para feed): mesmo vídeo, mesma pasta, com o formato no nome. Exemplo: `kalli_cliente-do-feriado_9x16.mp4`.

## Vídeo novo

1. Crie a pasta em `videos/` seguindo a regra de nome.
2. Copie `modelos/ficha-de-video.md` para dentro dela como `README.md` e preencha.
3. Coloque os arquivos em `final/`, `planejamento/` e `trabalho/`.
4. Acrescente uma linha na tabela **Vídeos** acima.

## Regras de marca

- **Vídeo da Mittari:** laranja `#C2410C`, off-white `#E8E8E0` e preto `#101010`. Nunca verde-limão.
- **Vídeo de um app (como o Kalli):** cores do próprio app (preto, verde-lima e laranja), não as da Mittari.
- **Vídeo para cliente:** uma história com o contexto real do cliente, não uma lista de funções.
- Sem robô, cérebro, engrenagem ou circuito. Sem termo técnico na tela.

O passo a passo completo está na Central da Mittari, em `13 Animações`.
