import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cor, fonte } from "./tema";

// Peças visuais da Mittari para qualquer animação. Uma ideia por tela, letra grande.

/** 0→1 com mola suave a partir do quadro `em`. */
export const useEntrada = (em: number, amortecimento = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - em, fps, config: { damping: amortecimento, mass: 0.7 }, durationInFrames: 22 });
};

/** 0→1 entre dois quadros, com aceleração natural. */
export const useTrecho = (de: number, ate: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [de, ate], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
};

/** O símbolo: três arcos, como um mostrador de medida. `desenho` 0→1 anima o traço. */
export const Simbolo: React.FC<{ tamanho?: number; corTraco?: string; desenho?: number }> = ({ tamanho = 80, corTraco = cor.preto, desenho = 1 }) => {
  const comp = 260;
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 200 200" fill="none">
      <path d="M86 104 V76 A34 34 0 0 1 154 76 V150" stroke={corTraco} strokeWidth={26} strokeDasharray={comp} strokeDashoffset={comp * (1 - desenho)} />
      <path d="M30 182 V146 A34 34 0 0 1 98 146 V182" stroke={corTraco} strokeWidth={26} strokeDasharray={comp} strokeDashoffset={comp * (1 - desenho)} />
    </svg>
  );
};

/** Fundo de papel com uma régua discreta embaixo (a marca pede elementos de medida). */
export const Papel: React.FC<{ children: React.ReactNode; fundo?: string; regua?: boolean }> = ({ children, fundo = cor.papel, regua = true }) => {
  const frame = useCurrentFrame();
  const escuro = fundo !== cor.papel;
  const deslize = (frame * 0.6) % 40;
  return (
    <AbsoluteFill style={{ background: fundo, fontFamily: fonte.titulo, color: escuro ? cor.papel : cor.preto, overflow: "hidden" }}>
      {regua && (
        <svg width={1920} height={60} style={{ position: "absolute", left: 0, bottom: 40, opacity: escuro ? 0.35 : 0.5 }}>
          {Array.from({ length: 52 }).map((_, i) => {
            const x = i * 40 - deslize;
            const alto = i % 5 === 0 ? 34 : 16;
            return <line key={i} x1={x} x2={x} y1={60 - alto} y2={60} stroke={escuro ? cor.papel : cor.cinza} strokeWidth={2} />;
          })}
        </svg>
      )}
      {children}
    </AbsoluteFill>
  );
};

/** Rótulo pequeno em maiúsculas (IBM Plex Mono), como a marca pede para detalhes. */
export const Rotulo: React.FC<{ children: React.ReactNode; em?: number; corTexto?: string }> = ({ children, em = 0, corTexto = cor.laranja }) => {
  const p = useEntrada(em);
  return (
    <div style={{ fontFamily: fonte.detalhe, fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: corTexto, fontWeight: 500, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
      {children}
    </div>
  );
};

/** Título grande. Cada linha entra um pouco depois da anterior. */
export const Titulo: React.FC<{ linhas: React.ReactNode[]; em?: number; tamanho?: number; corTexto?: string }> = ({ linhas, em = 0, tamanho = 110, corTexto = cor.preto }) => (
  <div style={{ fontFamily: fonte.titulo, fontWeight: 800, fontSize: tamanho, lineHeight: 1.02, letterSpacing: -3, color: corTexto }}>
    {linhas.map((l, i) => (
      <Linha key={i} em={em + i * 7}>
        {l}
      </Linha>
    ))}
  </div>
);

const Linha: React.FC<{ em: number; children: React.ReactNode }> = ({ em, children }) => {
  const p = useEntrada(em);
  return (
    <div style={{ overflow: "hidden", paddingBottom: 8 }}>
      <div style={{ transform: `translateY(${(1 - p) * 110}%)` }}>{children}</div>
    </div>
  );
};

export const Destaque: React.FC<{ children: React.ReactNode; corTexto?: string }> = ({ children, corTexto = cor.laranja }) => <span style={{ color: corTexto }}>{children}</span>;

/** Celular simples (preto, cantos arredondados) para mostrar conversas. */
export const Celular: React.FC<{ children: React.ReactNode; x: number; y: number; escala?: number; entrada?: number }> = ({ children, x, y, escala = 1, entrada = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 520,
      height: 1000,
      transform: `translateY(${(1 - entrada) * 80}px) scale(${escala})`,
      transformOrigin: "top left",
      opacity: entrada,
      background: cor.preto,
      borderRadius: 64,
      padding: 18,
      boxSizing: "border-box",
    }}
  >
    <div style={{ width: "100%", height: "100%", borderRadius: 48, background: "#F4F4EE", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 16, left: "50%", width: 120, height: 30, marginLeft: -60, borderRadius: 20, background: cor.preto, zIndex: 5 }} />
      {children}
    </div>
  </div>
);

/** Balão de conversa de WhatsApp. `lado`: "cliente" à esquerda, "resposta" à direita. */
export const Balao: React.FC<{ lado: "cliente" | "resposta"; em: number; children: React.ReactNode }> = ({ lado, em, children }) => {
  const p = useEntrada(em);
  const cliente = lado === "cliente";
  return (
    <div style={{ display: "flex", justifyContent: cliente ? "flex-start" : "flex-end", opacity: p, transform: `translateY(${(1 - p) * 20}px) scale(${0.96 + p * 0.04})`, transformOrigin: cliente ? "left bottom" : "right bottom" }}>
      <div
        style={{
          maxWidth: "82%",
          background: cliente ? "#FFFFFF" : cor.laranja,
          color: cliente ? cor.preto : cor.papel,
          fontSize: 30,
          lineHeight: 1.3,
          padding: "16px 20px",
          borderRadius: 24,
          borderBottomLeftRadius: cliente ? 6 : 24,
          borderBottomRightRadius: cliente ? 24 : 6,
          fontWeight: 500,
          boxShadow: "0 2px 0 rgba(16,16,16,0.06)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Troca de cena: entra deslizando e some no fim, sem corte seco. */
export const Transicao: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const entra = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const sai = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return <AbsoluteFill style={{ opacity: Math.min(entra, sai), transform: `translateX(${(1 - entra) * 40}px)` }}>{children}</AbsoluteFill>;
};
