# 🚨 O Dossiê dos 21 Gargalos da Máquina de Conteúdo & Indústria de Postagem (Kalli)

Este documento registra a autópsia das Levas 01, 02 e 03 e estabelece as regras de blindagem definitivas para a esteira 2-3-2-3-2.

---

## 🎨 BLOCO 2: Engenharia de Animação & Motion no Remotion
* **8. Falta de movimento constante de câmera (Camera Drift 3D):** Proibido planos estáticos estilo PowerPoint. Toda cena deve ter um leve *camera drift* contínuo em 3D (perspectiva sutil, zoom lento ou rotação angular de 1-2 graus).
* **9. Falta de profundidade real (Tudo chapado em 2D):** Todo vídeo deve ser composto obrigatoriamente em **3 camadas**:
  1. *Fundo:* Escuro texturizado com grão de filme dinâmico (`EffectFilmGrain` / mesh gradient sutil).
  2. *Meio:* UI real do app / mockup do celular em perspectiva angular 3D com sombra difusa e luz especular (`useCardIn3D` / Three.js).
  3. *Frente:* Tipografia cinética flutuante e badges de destaque.
* **10. Tipografia em blocos inteiros de texto:** Proibido soltar parágrafos ou frases inteiras na tela para o espectador "ler". O texto deve ser estritamente cinético, entrando palavra por palavra sincronizada com a sílaba tônica via arquivo `words.json` (gerado da voz do Sandro Dutra no ElevenLabs).
* **11. Áudio frágil e trilhas aleatórias:**
  - Som obrigatório no frame 0.0s (vibração, clique seco, pop, alerta) onde o cérebro decide se pula ou assiste.
  - Proibido trilhas com vocais cantados. Apenas bases instrumentais rítmicas e percussivas.
  - Mixagem com compressão lateral (*sidechain ducking*) automática: a trilha deve abaixar instantaneamente quando a locução entra e subir nos respiros.
* **12. Falta de componentes reutilizáveis:** Proibido recriar telas do zero em HTML. Padronizar e reutilizar o trio de ouro: `WhatsAppChat`, `NotificationBanner` e `CounterComissao`.

---

## 🌪️ BLOCO 3: Estratégia de Distribuição & Funil
* **13. A ilusão do ponto único de contato:** Um Reels de 30s não fecha um software de R$ 397/mês sozinho. O Reels é apenas o ponto de impacto. Todo Reels precisa puxar para uma conversa no Direct, para o WhatsApp e para os Stories.
* **14. A armadilha do Cold Start algorítmico:** Postar numa conta nova com poucos seguidores e esperar entrega orgânica gera alcance de 15 pessoas. **Regra de Semeadura:** Todo post deve receber tração nos primeiros 15 minutos via semeadura ativa (grupos segmentados de WhatsApp, envio direto a 5-10 corretores parceiros) para ensinar o cluster ao algoritmo do Instagram.
* **15. Mistura de públicos no mesmo funil:**
  - *Dono de Imobiliária:* Quer governança, controle de equipe, fim do desperdício de R$ 3k em portais → CTA para **Call / DEMO**.
  - *Corretor Autônomo:* Quer alívio imediato no WhatsApp pessoal, não quer falar com vendedor → CTA para **Teste Grátis de 7 Dias sem Cartão**.
* **16. O vácuo nas Portas da Leva 03:** Se o roteiro manda comentar "HORA" ou "TESTE", **DEVE existir automação de Direct ativa (ManyChat/Webhook/API)** para entregar o link em até 12 segundos. Se responder no dia seguinte, a promessa da Kalli morre no marketing.
* **17. LinkedIn falando com o público errado:** Parar de falar com engenheiros de software e bancos de São Paulo. No LinkedIn, o tom deve ser de tese de gestão imobiliária, governança de leads e economia de portais para atrair donos e diretores de imobiliárias.
* **18. Dark Stories zerados:** Ativar o playbook diário de Stories sem rosto (enquetes, prints de bastidores, caixas de perguntas, dores do dia a dia) para reter quem chega pelo feed e alimentar as DMs.

---

## ⚙️ BLOCO 4: Operação & Postagem
* **19. O gargalo do celular no cabo USB:** Nunca mais depender de postar no dedo via celular com cabo ADB ocupado.
* **20. Subutilização da Meta BM Verificada (Marco P-030):** Aproveitar a aprovação oficial da **Meta BM ("Arko BM")** para agendar em lote pelo Meta Business Suite, ou via servidor MCP (**Postiz / TryPost**), eliminando a rotina de alarme de relógio.
* **21. Desconexão entre Conteúdo e Vendas:** O conteúdo produzido deve alimentar a prospecção 1-a-1 no WhatsApp imediatamente (como o W02 que abriu a conversa com o Ezequiel). Vídeo renderizado é munição de vendas na mão do time de SDR/outbound.
