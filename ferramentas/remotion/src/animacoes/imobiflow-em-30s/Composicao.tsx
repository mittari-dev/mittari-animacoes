import React from "react";
import { AbsoluteFill, Composition, Series } from "remotion";
import { Transicao } from "../../marcas/mittari/base";
import { FPS, cor, seg } from "../../marcas/mittari/tema";
import { C1Mensagens } from "./cenas/C1Mensagens";
import { C2SoOlhando } from "./cenas/C2SoOlhando";
import { C3Responde } from "./cenas/C3Responde";
import { C4Aviso } from "./cenas/C4Aviso";
import { C5Final } from "./cenas/C5Final";

// ImobiFlow em 30 segundos — para cliente em potencial (corretor). Linguagem simples, nada técnico.
// Roteiro: o WhatsApp não para → a maioria só olha → o ImobiFlow responde → avisa quem está pronto → assinatura.
const CENAS: { C: React.FC; duracao: number }[] = [
  { C: C1Mensagens, duracao: seg(5) },
  { C: C2SoOlhando, duracao: seg(5.5) },
  { C: C3Responde, duracao: seg(8.5) },
  { C: C4Aviso, duracao: seg(6) },
  { C: C5Final, duracao: seg(5) },
];

const TOTAL = CENAS.reduce((soma, c) => soma + c.duracao, 0);

const Video: React.FC = () => (
  <AbsoluteFill style={{ background: cor.papel }}>
    <Series>
      {CENAS.map(({ C, duracao }, i) => (
        <Series.Sequence key={i} durationInFrames={duracao}>
          <Transicao>
            <C />
          </Transicao>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);

export const ImobiflowEm30s: React.FC = () => (
  <Composition id="ImobiflowEm30s" component={Video} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
);
