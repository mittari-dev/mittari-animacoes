# Mittari — Animações

Todos os vídeos animados e as peças gráficas da Mittari: o arquivo pronto, o roteiro e o projeto de cada um.

## Vídeos

| Data | Vídeo | Produto | Duração | Formato | Vídeo pronto? |
|---|---|---|---|---|---|
| 30/09/2026 | [ImobiFlow em 30 segundos](videos/2026-09-30_imobiflow_em-30-segundos/) | ImobiFlow | 30 s | 16:9 | Sim |
| 30/09/2026 | [Como o ImobiFlow funciona por dentro](videos/2026-09-30_imobiflow_como-funciona-por-dentro/) (teste, uso interno) | ImobiFlow | 72,5 s | 16:9 | Sim |
| 30/09/2026 | [O cliente das 23h](videos/2026-09-30_imobiflow_cliente-das-23h/) | ImobiFlow | 21,6 s | 16:9 | Sim |
| 02/10/2026 | [O cliente do feriado](videos/2026-10-02_kalli_cliente-do-feriado/) | Kalli | 36 s | 9:16 | Sim |
| 02/10/2026 | [Número bloqueado](videos/2026-10-02_kalli_numero-bloqueado/) | Kalli | 30 s | 9:16 | Não, só o projeto |
| 04/10/2026 | [O número que caiu](videos/2026-10-04_kalli_numero-que-caiu/) | Kalli | 22 s e 32,6 s | 9:16 | Não, só o projeto |
| 05/10/2026 | [Filme 3D do ImobiFlow](videos/2026-10-05_imobiflow_filme-3d/) | ImobiFlow | 12 s | 16:9 e 9:16 | Não, só o projeto |
| 05/10/2026 | [A vaca do feriado](videos/2026-10-05_kalli_vaca-do-feriado/) | Kalli | 41,6 s | 9:16 | Sim |
| 06/10/2026 | [Pit stop](videos/2026-10-06_kalli_pit-stop/) | Kalli | 47 s | 9:16 | Sim |
| 07/10/2026 | [Curioso e comprador](videos/2026-10-07_kalli_curioso-e-comprador/) (primeira versão) | Kalli | 24 s | 16:9 | Sim |
| 07/10/2026 | [Curioso e comprador, filme 3D](videos/2026-10-07_kalli_curioso-e-comprador-3d/) | Kalli | 50 a 65 s | 16:9 e 9:16 | Sim, sem a trilha final |
| 08/10/2026 | [Triagem](videos/2026-10-08_kalli_triagem/) | Kalli | 49,6 s | 9:16 | Sim |

O ImobiFlow passou a se chamar **Kalli** em 02/10/2026. Os vídeos anteriores ainda mostram o nome antigo.

## Peças gráficas

Foto de perfil, imagem de compartilhamento do site, capas dos destaques do Instagram e dois carrosséis. Lista completa em [pecas/](pecas/).

## Como está organizado

```
videos/
  AAAA-MM-DD_produto_nome-do-video/
    README.md        ficha do vídeo: para quem, ideia, roteiro, cores, som
    final/           o que se usa: vídeo, capa e texto para postar
    planejamento/    plano e roteiro aprovados antes de animar (quando existem)
    trabalho/        o projeto, para refazer ou ajustar o vídeo
pecas/               imagens e carrosséis, no mesmo padrão
ferramentas/
  remotion/          estúdio Remotion compartilhado pelas animações de setembro
modelos/
  ficha-de-video.md  modelo da ficha para cada vídeo novo
```

A pasta `trabalho/` guarda o projeto como ele foi feito, com os nomes originais dos arquivos, para que continue funcionando.

## Regras de nome

- **Pasta:** data, produto e nome curto, tudo em minúsculas, sem acento, com hífen entre palavras e sublinhado entre as partes. Exemplo: `2026-10-08_kalli_triagem`.
- **Arquivos finais:** `produto_nome-do-video.mp4`, `produto_nome-do-video_capa.jpg` e `legenda-para-postar.txt`.
- **Variações** vão no fim do nome: `_60fps`, `_whatsapp-leve`, `_9x16`, `_v2`.
- **Versões novas:** o Git guarda o histórico. Para trocar um vídeo, substitua o arquivo e registre a mudança na ficha.

## Vídeo novo

1. Crie a pasta em `videos/` seguindo a regra de nome.
2. Copie `modelos/ficha-de-video.md` para dentro dela como `README.md` e preencha.
3. Coloque os arquivos em `final/`, `planejamento/` e `trabalho/`.
4. Acrescente uma linha na tabela **Vídeos** acima.

## Arquivos grandes

Vídeos, áudios em WAV e cenas do Blender (`.mp4`, `.mov`, `.wav`, `.blend`) ficam no **Git LFS**, o espaço do GitHub para arquivos grandes. Para baixar tudo, instale o Git LFS antes de clonar (`git lfs install`). Sem ele, esses arquivos chegam como textos curtos no lugar do vídeo.

## Regras de marca

- **Vídeo da Mittari:** laranja `#C2410C`, off-white `#E8E8E0` e preto `#101010`. Nunca verde-limão.
- **Vídeo do Kalli:** cores do próprio app (preto, verde-lima e laranja), não as da Mittari.
- **Vídeo para cliente:** uma história com o contexto real do cliente, não uma lista de funções.
- Sem robô, cérebro, engrenagem ou circuito. Sem termo técnico na tela.

O passo a passo completo está na Central da Mittari, em `13 Animações`.
