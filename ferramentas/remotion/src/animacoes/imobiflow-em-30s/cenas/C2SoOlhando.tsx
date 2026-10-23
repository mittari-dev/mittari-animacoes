import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Destaque, Papel, Titulo, useEntrada } from "../../../marcas/mittari/base";
import { cor, fonte } from "../../../marcas/mittari/tema";

// Cena 2 — a maioria só está olhando; poucos querem comprar.
const PESSOAS = ["Ana", "Pedro", "Bruno", "Carla", "João", "Mariana", "Lucas", "Beatriz", "Rafael", "Júlia"];
const COMPRADORES = new Set(["Carla", "Lucas"]);

export const C2SoOlhando: React.FC = () => {
  const frame = useCurrentFrame();
  const separa = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Papel>
      <div style={{ position: "absolute", left: 140, top: 150 }}>
        <Titulo em={0} tamanho={96} linhas={["Mas a maioria", <Destaque key="d">só está olhando.</Destaque>]} />
      </div>
      <div style={{ position: "absolute", left: 140, top: 520, display: "grid", gridTemplateColumns: "repeat(5, 300px)", gap: 24 }}>
        {PESSOAS.map((nome, i) => (
          <Cartao key={nome} nome={nome} em={10 + i * 4} comprador={COMPRADORES.has(nome)} separa={separa} />
        ))}
      </div>
    </Papel>
  );
};

const Cartao: React.FC<{ nome: string; em: number; comprador: boolean; separa: number }> = ({ nome, em, comprador, separa }) => {
  const p = useEntrada(em);
  const apaga = comprador ? 0 : separa;
  const acende = comprador ? separa : 0;
  return (
    <div
      style={{
        height: 150,
        borderRadius: 20,
        background: acende > 0.5 ? cor.laranja : "#F4F4EE",
        border: `2px solid ${acende > 0.5 ? cor.laranja : cor.linha}`,
        color: acende > 0.5 ? cor.papel : cor.preto,
        opacity: p * (1 - apaga * 0.7),
        transform: `translateY(${(1 - p) * 30}px) scale(${1 + acende * 0.06})`,
        padding: "22px 26px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 800 }}>{nome}</div>
      <div style={{ fontFamily: fonte.detalhe, fontSize: 20, letterSpacing: 2, textTransform: "uppercase", opacity: separa }}>
        {comprador ? "quer comprar" : "só olhando"}
      </div>
    </div>
  );
};
