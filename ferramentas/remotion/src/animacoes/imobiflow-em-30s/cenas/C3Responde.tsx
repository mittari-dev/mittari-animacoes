import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Balao, Celular, Destaque, Papel, Rotulo, Titulo, useEntrada } from "../../../marcas/mittari/base";
import { cor, fonte } from "../../../marcas/mittari/tema";

// Cena 3 — o ImobiFlow responde na hora e faz as perguntas certas.
export const C3Responde: React.FC = () => {
  const frame = useCurrentFrame();
  const cel = useEntrada(0);
  const digitando = frame >= 40 && frame < 70;
  const selo = useEntrada(76);
  return (
    <Papel>
      <div style={{ position: "absolute", left: 140, top: 300, width: 900 }}>
        <Rotulo em={0}>A qualquer hora</Rotulo>
        <div style={{ height: 28 }} />
        <Titulo em={4} tamanho={100} linhas={["O ImobiFlow", <Destaque key="d">responde na hora.</Destaque>]} />
        <div style={{ marginTop: 40, fontSize: 38, lineHeight: 1.35, color: cor.cinza, fontWeight: 500, opacity: useEntrada(24) }}>
          E faz as perguntas que você faria.
        </div>
      </div>

      <Celular x={1220} y={60} entrada={cel}>
        <div style={{ padding: "90px 22px 0", display: "flex", flexDirection: "column", gap: 18 }}>
          <Balao lado="cliente" em={14}>
            Oi! Vi o apartamento do Centro. Ainda está disponível?
          </Balao>
          {digitando && <Digitando />}
          <Balao lado="resposta" em={70}>
            Está sim! Você pensa em comprar em quanto tempo?
          </Balao>
          <Balao lado="cliente" em={130}>
            Uns dois meses. Já tenho a entrada.
          </Balao>
          <Balao lado="resposta" em={175}>
            Perfeito! Quer visitar no sábado?
          </Balao>
        </div>
      </Celular>

      <div
        style={{
          position: "absolute",
          left: 140,
          top: 740,
          background: cor.preto,
          color: cor.papel,
          borderRadius: 18,
          padding: "16px 24px",
          fontFamily: fonte.detalhe,
          fontSize: 26,
          letterSpacing: 2,
          opacity: selo,
          transform: `scale(${0.8 + selo * 0.2})`,
        }}
      >
        RESPONDEU EM 3 SEGUNDOS
      </div>
    </Papel>
  );
};

const Digitando: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ background: cor.laranjaClaro, borderRadius: 24, padding: "18px 22px", display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: cor.laranjaEscuro, opacity: interpolate(Math.sin((frame - i * 4) / 3), [-1, 1], [0.3, 1]) }} />
        ))}
      </div>
    </div>
  );
};
