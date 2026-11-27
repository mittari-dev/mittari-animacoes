# Custos: tokens e créditos por vídeo

Onde a fábrica gasta, e as regras para gastar menos sem cair a qualidade.

## Onde se gasta

| Recurso | Onde | O que mais pesa |
|---|---|---|
| **Tokens do Claude** | Etapas 6 a 10 | Escrever o `index.html` do zero (280 a 420 linhas por vídeo, até a Leva 02). Ler skill inteira sem precisar. Reescrever roteiro depois que a voz já foi gerada |
| **Créditos do ElevenLabs** | Etapa 9 | Narração regenerada inteira por causa de uma frase. Trilha nova a cada vídeo (34 trilhas até hoje, nenhuma reaproveitada). Tempo por palavra pelo Scribe. A H5 parou porque os créditos acabaram |
| **Tempo do PC remoto** | Etapa 9 | Render completo para corrigir uma cena |
| **LFS do GitHub** | Repositório | Vídeos finais. Já passou de 1 GB (ver `AUDITORIA.md`) |

## As regras

**Tokens**
1. **Vídeo novo parte do `ferramentas/hyperframes/modelo-cena/`** e escreve só a cena. O kit e o montador não são reescritos.
2. **Ler só o que a etapa pede:** o `SKILL.md` da skill da etapa, e as referências dela só quando o passo mandar.
3. **O roteiro só sai da etapa 7 depois do portão 1.** Mudar roteiro depois da voz paga duas vezes: tokens e créditos.
4. **Corrigir só a camada ou a cena que reprovou** (portão 3), e não refazer o vídeo.
5. **Para várias peças iguais, fazer em lote:** o mesmo kit, a mesma cena-base, e só os textos e os tempos mudando (como a Leva 03).

**ElevenLabs**
1. **A voz só é gerada depois do portão 1 e do `beat_board.py` dizer FITS.** Uma tomada.
2. **Frase ruim é regenerada sozinha** e emendada com o `ffmpeg`, nunca a narração inteira.
3. **Trilha: procurar primeiro no inventário** (`industria/biblioteca/inventario.md`). Uma trilha de 35 s serve a vários vídeos do mesmo clima. Trilha nova vai para `industria/biblioteca/trilhas/` com o prompt.
4. **Efeito sonoro: só do kit ou da biblioteca.** Gerar efeito novo só quando nenhum serve, e ele entra na biblioteca.
5. **Tempo por palavra:** o `faster-whisper` faz no PC, sem crédito. O Scribe fica para quando o whisper errar.
6. **Sem crédito, a peça não para:** o dono grava a narração no celular, ou sai uma versão só com texto e trilha.

**PC remoto**
1. **Prévia antes do render** (`npm run dev`). O portão 3 é feito na prévia.
2. **O render roda uma vez por versão aprovada**, e o `render.sh` já confere o resultado (portão 4).

## Anotar na ficha

Em cada peça, anotar quantos créditos do ElevenLabs gastou (voz e trilha), quantas tomadas de voz, quantas rodadas de render e se partiu do modelo de cena. Depois de 10 peças, dá para saber o custo médio de um vídeo e onde ele escapa.
