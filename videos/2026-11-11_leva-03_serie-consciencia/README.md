# Leva 03: série "Você não viu" (11/11/2026)

Cinco vídeos de consciência, criados e montados no PC remoto a pedido do fundador em 11/11. Cada um mostra ao corretor uma coisa que ele não tinha visto sobre o próprio atendimento, e **termina com uma porta**: um pedido só, no último cartão. O plano da série, as fontes e o que cada porta exige de quem responde estão em `conteudo/05 Ideias/Leva 03 — Série Você Não Viu (11-11).md`.

Todos estão **em aprovação**. Nenhum foi postado, e os roteiros não passaram pelo fundador antes de virar vídeo.

| Roteiro | Vídeo | Duração | A porta |
|---|---|---|---|
| E03 | [Pedido de visita disfarçado](2026-11-11_kalli_pedido-de-visita-disfarcado/) | 28,6 s | Comentar o que o cliente respondeu |
| E04 | [Você é um número sem nome](2026-11-11_kalli_numero-sem-nome/) | 29 s | Mandar para um colega |
| E05 | [A aba aberta](2026-11-11_kalli_a-aba-aberta/) | 35,2 s | Comentar "hora" para receber a pesquisa |
| E06 | [O funil que você nunca contou](2026-11-11_kalli_o-funil-que-voce-nunca-contou/) | 28 s | Fazer a conta e comentar as visitas |
| E07 | [Ele viu você online](2026-11-11_kalli_ele-viu-voce-online/) | 28,4 s | Mandar "teste" no direct |

## A cara da série

Todos trazem o selo **VOCÊ NÃO VIU** no canto, o gancho escrito no terço de cima desde o primeiro quadro, som no quadro 1, trilha, e o mesmo cartão final: um ícone, o pedido em lima, a seta para baixo e a assinatura pequena da Kalli. A base comum fica em `_ferramentas/kit.css` e `_ferramentas/kit.js`; mudar ali muda os cinco.

## Para refazer um vídeo

```bash
./_ferramentas/render.sh 2026-11-11_kalli_numero-sem-nome kalli_numero-sem-nome
```

A cena de cada vídeo está em `trabalho/cena.html`, `cena.css`, `cena.js` e `cena.json` (duração e lista de sons). O `index.html` é montado a partir deles e não se edita à mão.

## Antes de postar

- **Três portas prometem uma resposta nossa** (E05, E07 e os comentários da E03 e da E06). Sem alguém respondendo no mesmo dia, a série ensina o público a não comentar.
- Assistir no celular, com som, e ouvir se alguma trilha tem voz cantada.
- E07: conferir como a Kalli se identifica para o cliente (o balão mostra "Kalli · em nome do Rafael").
- E06: os números 40, 22 e 6 são exemplo, e estão marcados assim na tela.
