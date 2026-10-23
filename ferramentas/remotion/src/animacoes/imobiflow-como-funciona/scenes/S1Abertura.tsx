import React from "react";
import { Zap } from "lucide-react";
import { c, fonts } from "../theme";
import { Eyebrow, Lime, Stage, Title, useIn } from "../components/primitives";

export const S1Abertura: React.FC = () => {
  const logo = useIn(0, 12);
  const sub = useIn(34);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 160, top: 250, width: 1500 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 56, opacity: logo, transform: `scale(${0.8 + logo * 0.2})`, transformOrigin: "left center" }}>
          <div style={{ width: 72, height: 72, background: c.lime, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={40} color="#000" fill="#000" />
          </div>
          <div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, letterSpacing: -1 }}>ImobiFlow</div>
            <div style={{ fontSize: 20, color: c.dim }}>Connect · um produto Mittari</div>
          </div>
        </div>
        <Eyebrow at={10}>Por dentro do código</Eyebrow>
        <div style={{ height: 36 }} />
        <Title at={16} size={104}>
          Como uma mensagem
          <br />
          vira <Lime>lead qualificado.</Lime>
        </Title>
        <div style={{ marginTop: 40, fontSize: 32, color: c.muted, maxWidth: 1100, lineHeight: 1.45, opacity: sub, transform: `translateY(${(1 - sub) * 14}px)` }}>
          Um passeio pelo caminho real do dado: WhatsApp, ponte em Go, agente no n8n, regras no Postgres e a tela do corretor.
        </div>
      </div>
    </Stage>
  );
};
