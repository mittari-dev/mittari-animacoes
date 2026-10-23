import React from "react";
import { AbsoluteFill, Composition, interpolate, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { FPS, s } from "./theme";
import { S1Abertura } from "./scenes/S1Abertura";
import { S2Mapa } from "./scenes/S2Mapa";
import { S3Jornada } from "./scenes/S3Jornada";
import { S4Banco } from "./scenes/S4Banco";
import { S5Tela } from "./scenes/S5Tela";
import { S6Relogio } from "./scenes/S6Relogio";
import { S7Fecho } from "./scenes/S7Fecho";

const SCENES: { C: React.FC; dur: number }[] = [
  { C: S1Abertura, dur: s(5) },
  { C: S2Mapa, dur: s(10) },
  { C: S3Jornada, dur: s(17) },
  { C: S4Banco, dur: s(13) },
  { C: S5Tela, dur: s(13) },
  { C: S6Relogio, dur: s(9.5) },
  { C: S7Fecho, dur: s(5) },
];

const TOTAL = SCENES.reduce((a, b) => a + b.dur, 0);

/** Entrada e saída em fade de cada cena. */
const Fade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: o, background: "#000" }}>{children}</AbsoluteFill>;
};

const ComoFunciona: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Series>
      {SCENES.map(({ C, dur }, i) => (
        <Series.Sequence key={i} durationInFrames={dur}>
          <Fade>
            <C />
          </Fade>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);

export const ImobiflowComoFunciona: React.FC = () => (
  <Composition
    id="ImobiflowComoFunciona"
    component={ComoFunciona}
    durationInFrames={TOTAL}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
