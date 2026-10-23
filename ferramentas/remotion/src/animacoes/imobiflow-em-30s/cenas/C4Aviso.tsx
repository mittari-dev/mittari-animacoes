import React from "react";
import { Destaque, Papel, Titulo, useEntrada } from "../../../marcas/mittari/base";
import { cor, fonte } from "../../../marcas/mittari/tema";

// Cena 4 — o corretor só recebe o aviso de quem está pronto.
export const C4Aviso: React.FC = () => {
  const aviso = useEntrada(26, 14);
  const detalhe = useEntrada(50);
  return (
    <Papel>
      <div style={{ position: "absolute", left: 140, top: 150 }}>
        <Titulo em={0} tamanho={96} linhas={["E só chama você", <Destaque key="d">quando vale a pena.</Destaque>]} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 140,
          top: 540,
          width: 1640,
          background: cor.preto,
          color: cor.papel,
          borderRadius: 32,
          padding: "36px 44px",
          display: "flex",
          gap: 32,
          alignItems: "center",
          opacity: aviso,
          transform: `translateY(${(1 - aviso) * -60}px)`,
        }}
      >
        <div style={{ width: 96, height: 96, borderRadius: 24, background: cor.laranja, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 44 }}>C</div>
        <div>
          <div style={{ fontFamily: fonte.detalhe, fontSize: 22, letterSpacing: 3, color: cor.laranjaClaro }}>IMOBIFLOW · AGORA</div>
          <div style={{ fontSize: 58, fontWeight: 800, marginTop: 6 }}>Carla está pronta para comprar.</div>
          <div style={{ fontSize: 38, marginTop: 10, color: "#BDBDB3", opacity: detalhe }}>Entrada guardada · visita marcada no sábado, 10h.</div>
        </div>
      </div>
    </Papel>
  );
};
