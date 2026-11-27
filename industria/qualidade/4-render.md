# Portão 4: render

**Quando:** logo depois do `npm run render`.

**Como:**
```
python ferramentas/conferir-render.py <peça>/final/<video>.mp4 --capturas <peça>/revisao
```
Ele usa o ffmpeg do PATH, da variável `FFMPEG_DIR` ou de `D:\dev\.tools\ffmpeg\*\bin`.

| Conferência | Obrigatória | Passa quando |
|---|---|---|
| Tamanho | Sim | Igual ao da grade (Reels: 1080×1920) |
| Quadros por segundo | Sim | 30 ou mais. **60 é o padrão da casa** (aviso abaixo disso) |
| Codec | Sim | H.264 |
| Áudio | Sim | Tem faixa de áudio |
| Volume | Sim | −14 LUFS, com folga de 2 |
| Som no quadro 1 | Sim | Pico acima de −40 dB nos primeiros 0,15 s |
| Nada parado | Sim | Nenhum trecho de 2 s ou mais sem mudança na imagem |
| Distorção | Aviso | Pico máximo até −1 dB |
| Capturas | Para o portão 3 | Uma imagem a cada 2 s em `revisao/` |

**Reprovou:**
- **Volume ou distorção:** ajustar o volume da trilha e dos efeitos e renderizar de novo. Não mexe em cena.
- **Trecho parado:** o script diz o segundo exato. Volte ao storyboard nesse ponto e ponha um corte, zoom ou elemento entrando a cada 1,5 a 2 s.
- **Tamanho ou quadros por segundo:** conferir o `hyperframes.json` e o comando de render.

## O que o script já achou (26/11)

| Vídeo | Resultado |
|---|---|
| `kalli_cliente-do-feriado` (02/10) | **Reprovado:** −18,8 LUFS, 30 qps, e três trechos parados (o maior: 3,2 s logo depois do gancho, a partir de 1,6 s) |
| `kalli_nunca-responda-so-sim_v2` (Leva 01, v2) | **Aprovado.** Pico de 0 dB no começo (aviso de distorção) |
