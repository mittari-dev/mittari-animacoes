import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Celular, Destaque, Papel, Rotulo, Titulo, useEntrada } from "../../../marcas/mittari/base";
import { cor, fonte } from "../../../marcas/mittari/tema";

const CONVERSAS = ["Ana", "Pedro", "Bruno", "Carla", "João", "Mariana", "Lucas", "Beatriz", "Rafael"];

// Cena 1 — o problema: o WhatsApp do corretor não para.
export const C1Mensagens: React.FC = () => {
  const frame = useCurrentFrame();
  const cel = useEntrada(4);
  const contador = Math.round(interpolate(frame, [20, 130], [3, 47], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <Papel>
      <div style={{ position: "absolute", left: 140, top: 330 }}>
        <Rotulo em={0}>Corretor de imóveis</Rotulo>
        <div style={{ height: 28 }} />
        <Titulo em={6} linhas={["Seu WhatsApp", <Destaque key="d">não para.</Destaque>]} />
      </div>

      <Celular x={1220} y={60} entrada={cel}>
        <div style={{ padding: "80px 28px 0" }}>
          <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 18 }}>Conversas</div>
          {CONVERSAS.map((nome, i) => (
            <Linha key={nome} nome={nome} em={16 + i * 11} />
          ))}
        </div>
      </Celular>

      {/* contador de mensagens sem resposta */}
      <div
        style={{
          position: "absolute",
          left: 1640,
          top: 40,
          minWidth: 120,
          height: 120,
          borderRadius: 60,
          background: cor.laranja,
          color: cor.papel,
          fontFamily: fonte.titulo,
          fontWeight: 800,
          fontSize: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          boxSizing: "border-box",
          opacity: cel,
          transform: `scale(${1 + 0.06 * Math.sin(frame / 3)})`,
        }}
      >
        {contador}
      </div>
    </Papel>
  );
};

const Linha: React.FC<{ nome: string; em: number }> = ({ nome, em }) => {
  const p = useEntrada(em);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: `1px solid ${cor.linha}`, opacity: p, transform: `translateX(${(1 - p) * 40}px)` }}>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: cor.laranjaClaro, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24 }}>{nome[0]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{nome}</div>
        <div style={{ fontSize: 22, color: cor.cinza }}>Oi, ainda está disponível?</div>
      </div>
      <div style={{ width: 16, height: 16, borderRadius: 8, background: cor.laranja }} />
    </div>
  );
};
