import React from "react";
import { Zap } from "lucide-react";
import { c, fonts } from "../theme";
import { Lime, Stage, Title, useIn } from "../components/primitives";

export const S7Fecho: React.FC = () => {
  const foot = useIn(40);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 160, top: 330 }}>
        <Title size={124}>
          WhatsApp vira lead.
          <br />
          <Lime>Automaticamente.</Lime>
        </Title>
      </div>
      <div style={{ position: "absolute", left: 160, bottom: 120, display: "flex", alignItems: "center", gap: 16, opacity: foot }}>
        <div style={{ width: 48, height: 48, background: c.lime, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={26} color="#000" fill="#000" />
        </div>
        <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 30 }}>ImobiFlow</span>
        <span style={{ fontSize: 22, color: c.dim }}>um produto Mittari · imobiflow.mittari.com.br</span>
      </div>
    </Stage>
  );
};
