# Storyboard

Cinco quadros 3D compõem uma sequência de 12 segundos. As imagens-chave ficam em `previews/`; o movimento de câmera é acrescentado pelo FFmpeg durante a finalização.

| Janela | Estação | Ação / imagem | Texto na tela |
| --- | --- | --- | --- |
| 0,0–2,4 s | Chegada | Telefone escuro; mensagem de disponibilidade entra no WhatsApp tarde da noite. | “O lead chega no WhatsApp.” / “Mesmo quando o corretor está offline.” |
| 2,4–4,8 s | Qualificação | Núcleo 3D do agente, órbitas de dados e confirmação do próximo passo. | “A IA faz as perguntas certas.” / “O corretor entra na conversa na hora certa.” |
| 4,8–7,2 s | CRM | Cartão de Ana se move da coluna Novo para Qualificado. | “Conversa organizada no CRM.” / “Histórico, interesse e qualificação juntos.” |
| 7,2–9,6 s | Visita | Casa 3D e cartão de calendário confirmado. | “Da conversa à visita.” / “Agenda e acompanhamento no mesmo fluxo.” |
| 9,6–12,0 s | Assinatura | Símbolo de porta, nome do produto e encerramento. | “ImobiFlow” / “Do primeiro oi à próxima visita.” |

Os quatro pontos sonoros coincidem com as transições entre as estações. Uma aproximação discreta move cada keyframe enquanto as dissolvências conectam as cenas.

## Enquadramento

- **Paisagem 16:9:** 1920×1080. Texto e objetos distribuídos horizontalmente.
- **Retrato 9:16:** 1080×1920. As mesmas cenas são compostas em coluna vertical, em vez de cortar a versão horizontal.
- Ambas usam `AgX` na cena Blender, 24 fps, faixa de 12 segundos e trilha original estéreo.
