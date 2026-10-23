---
tags: [mittari, conteúdo, animação, kalli, w02, produto, 3d, stack-2]
tipo: animação
projeto: Kalli
historia: W02 — O Curioso e o Comprador (demonstração)
stack: Stack 2.0 + Three.js (3D real) · ElevenLabs v4 (voz Sandro Dutra, Scribe, efeitos, música, fotos)
status: pronta
formato: 16:9 + 9:16 (corretor)
duracao: 60,0 s (corretor) · 65,2 s (imobiliária)
criado: 2026-10-07
---

# 🎬 A12 — W02 O Curioso e o Comprador (3D)

← [[../Hub de Conteúdo|Hub de Conteúdo]] · Roteiro: [[../01 Roteiros/W02 — O Curioso e o Comprador|W02]]

> **Aprovado pelo fundador em 07/10:** *"WOW. Isso ficou muito bom mesmo!!!!"*. Primeiro vídeo da casa com **3D de verdade** (Three.js dentro do HyperFrames), **voz brasileira nativa** e **trilha original**.

## Final v2 (07/10, noite)

O fundador pediu um motivo a mais no fim: *"no final deixou a desejar no sentido de gerar curiosidade"*. Ele aprovou o texto abaixo, **sem oferta extra**. Os recursos citados existem hoje (conferido no [[../../Inbox/Retorno do chat de código — W02, o que a Kalli faz hoje (07-10-2026)|retorno do código de 07/10]]).

| Versão | O que entra depois de "paga N anos de Kalli" |
|---|---|
| **Corretor** | *"E ela ainda responde às dez da noite de sábado, lembra o cliente da visita e monta o seu site. O próximo comprador pode chamar hoje à noite."* |
| **Imobiliária** | *"…lembra o cliente da visita e, se um corretor não atende, passa para o próximo. O próximo comprador pode chamar hoje à noite."* |

**Na tela:**
- O celular volta, e cada recurso aparece na sua própria tela:
  - conversa às 22:04;
  - lembrete da visita;
  - **Meu site** com QR Code (corretor) ou **repasse** de Rafael para Júlia (imobiliária).
- Cada recurso **sai da tela como um cartão em 3D**.
- No "hoje à noite", aparece a tela de bloqueio às **22:04**, com um cliente novo chegando e a Kalli respondendo. É o mesmo "sábado, 22h" do [[../03 Peças Estáticas/C01 — Toda Venda Começa com uma Chave|C01]].

**Também em 07/10:**
- A música baixou de 0,6 para 0,45.
- A trilha foi estendida para cobrir o final mais longo: é a mesma música, com uma emenda em cruzamento.
- A voz do trecho novo é o Sandro, emendado na narração já aprovada.

## As versões

| Versão | Para quem | Fim | Arquivo (`D:\dev\projects\mittari-videos\W02-curioso-e-comprador\`) |
|---|---|---|---|
| **Corretor · site** | Corretor autônomo | Botão "Começar o teste grátis" | `w02-corretor-site.mp4` |
| **Corretor · WhatsApp** | Corretor, resposta a "pode mandar" | "Responda esta mensagem e eu ativo o seu teste" | `w02-corretor-whatsapp.mp4` · leve: `w02-corretor-whatsapp-leve.mp4` |
| **Imobiliária · site** | Dono de imobiliária | Botão, "na sua imobiliária" | `w02-imobiliaria-site.mp4` |
| **Imobiliária · WhatsApp** | Dono, Leva Kalli 01 | Responder a mensagem | `w02-imobiliaria-whatsapp.mp4` · leve: `w02-imobiliaria-whatsapp-leve.mp4` |
| **Corretor · Reels (em pé, 9:16)** | Feed do Instagram | "Teste grátis: link na bio" | `w02-corretor-reels.mp4` · leve: `w02-corretor-reels-leve.mp4` |

**O que muda na versão imobiliária:** o comprador espera *"no WhatsApp de quem estiver livre"* · a visita é marcada *"com o corretor certo"* e *"você vê tudo"* (coluna "quem atende", PR #16) · *"sua equipe só fala com quem já quer ver o imóvel"* · a conta é **R$ 24 mil ÷ R$ 697 = 34 meses, quase 3 anos** (34 cubos) · *"Teste na sua imobiliária"*.

## Como foi feito

| | |
|---|---|
| **Cena** | Celular 3D (vidro e metal, reflexo de ambiente); a **tela é desenhada em tempo real** (conversas, chat com fotos, clientes, agenda, aviso, "Assumir conversa", tela de bloqueio); torre de perguntas em 3D com a câmera subindo até o comprador; fotos, cartões de cliente e da visita saindo da tela; grade de cubos dos meses; símbolo |
| **Voz** | ElevenLabs v4, **Sandro Dutra** (voz oficial desde 07/10), direção de emoção por frase |
| **Sincronia** | A cena foi desenhada no tempo da voz antiga; o `build.py` alinha as palavras (Scribe) e remapeia todos os tempos para a voz de cada versão |
| **Trilha** | ElevenLabs Music, instrumental: tensa até o corte, abre no "Agora, com a Kalli", resolve no "de graça". *Ducking* automático sob a voz, −14 LUFS |
| **Fotos** | Sala, cozinha e varanda geradas no ElevenLabs (decisão do fundador) |
| **Fonte** | `C:\dev\estudio\hyperframes\w02-3d\` · `python _dev\build.py [corretor\|imob] [site\|whatsapp\|reels]` · todas de uma vez: `bash _dev\render_all.sh` |
| **Em pé** | A mesma cena 3D, com outra câmera: mais aberta, e o objeto sobe para o terço de cima. A letra fica embaixo, fora da faixa da legenda do Reels. O trilho de passos sai |

> ⚠️ Lição técnica: o compilador de render do HyperFrames embute `url(...)` como dados dentro de strings de JavaScript e quebra o script. Fontes no canvas: `document.fonts.load(...)`, nunca `new FontFace(..., "url(...)")`. O Three.js fica local em `assets\vendor\`.

## Legenda (Reels, versão corretor em pé)

```text
Quantas vezes você respondeu "ainda está disponível?" hoje?

A maioria pergunta e some. Estava só olhando, e tudo bem.

O problema é quem já quer visitar no sábado. Ele manda mensagem no meio da pilha e espera junto com todo mundo. Às vezes às 22h, quando você já parou.

A Kalli responde cada um com os dados do imóvel e pergunta o que importa: onde, até quanto, para quando. Quando aparece alguém pronto, ela marca a visita e te avisa no WhatsApp.

Você não perdeu a venda no preço. Perdeu na fila.

Qual pergunta você mais responde por dia? Conta aqui.

Teste grátis de 7 dias, no seu número. Link na bio.

#corretordeimoveis #mercadoimobiliario #corretor #imoveis #whatsapp
```

## Onde foi usada

| Canal | Data | Resultado (48 h) |
|---|---|---|
| Instagram (Reels) | ⏳ sex 09/10 (corretor) | |
| WhatsApp: Leva Kalli 01 | ⏳ (imobiliária) | |
| WhatsApp: follow-up dos corretores | ⏳ (corretor) | |
