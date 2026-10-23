import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { c, fonts } from "../theme";

/** 0→1 com mola, começando no frame `at`. */
export const useIn = (at: number, damping = 18) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping, mass: 0.6 } });
};

/** 0→1 linear-suave entre dois frames. */
export const useProgress = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
};

/** Fundo do app: preto, grade sutil (como o /auth) e brilho verde desfocado (como o hero). */
export const Stage: React.FC<{ children: React.ReactNode; tone?: "dark" | "paper" }> = ({ children, tone = "dark" }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 30;
  const paper = tone === "paper";
  return (
    <AbsoluteFill style={{ background: paper ? c.paper : c.bg, fontFamily: fonts.body, color: paper ? "#000" : c.fg }}>
      {!paper && (
        <>
          <AbsoluteFill
            style={{
              backgroundImage: `linear-gradient(${c.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${c.borderSoft} 1px, transparent 1px)`,
              backgroundSize: "96px 96px",
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -260 + drift,
              left: 380,
              width: 840,
              height: 840,
              borderRadius: "50%",
              background: "rgba(184,255,79,0.10)",
              filter: "blur(200px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -300,
              right: 200 - drift,
              width: 640,
              height: 640,
              borderRadius: "50%",
              background: "rgba(184,255,79,0.05)",
              filter: "blur(180px)",
            }}
          />
        </>
      )}
      {children}
    </AbsoluteFill>
  );
};

/** Rótulo em maiúsculas espaçadas, com a bolinha pulsando do selo do hero. */
export const Eyebrow: React.FC<{ children: React.ReactNode; at?: number; paper?: boolean }> = ({ children, at = 0, paper }) => {
  const p = useIn(at);
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 18px",
        border: `1px solid ${paper ? "#c7c7bc" : "#2a2a2a"}`,
        background: paper ? "transparent" : "#111111",
        borderRadius: 4,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 99, background: c.lime, opacity: 0.5 + pulse * 0.5, boxShadow: `0 0 ${8 + pulse * 10}px ${c.lime}` }} />
      <span style={{ fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: paper ? c.paperMuted : c.muted, fontWeight: 600 }}>{children}</span>
    </div>
  );
};

export const Title: React.FC<{ children: React.ReactNode; at?: number; size?: number; paper?: boolean }> = ({ children, at = 0, size = 76, paper }) => {
  const p = useIn(at + 4);
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.04,
        letterSpacing: -2,
        color: paper ? "#000" : c.fg,
        opacity: p,
        transform: `translateY(${(1 - p) * 28}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Lime: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: c.lime }}>{children}</span>;

/** Pedaço de código real do repositório, no estilo de chip. */
export const Code: React.FC<{ children: React.ReactNode; tone?: "lime" | "muted" | "orange"; size?: number }> = ({ children, tone = "muted", size = 20 }) => (
  <span
    style={{
      fontFamily: fonts.mono,
      fontSize: size,
      padding: "4px 10px",
      borderRadius: 4,
      border: `1px solid ${tone === "lime" ? "rgba(184,255,79,0.35)" : tone === "orange" ? "rgba(255,107,43,0.4)" : c.border}`,
      background: tone === "lime" ? "rgba(184,255,79,0.08)" : tone === "orange" ? "rgba(255,107,43,0.08)" : c.surface,
      color: tone === "lime" ? c.lime : tone === "orange" ? c.orange : c.muted,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

/** Legenda de rodapé que troca de frase ao longo da cena. */
export const Caption: React.FC<{ steps: { at: number; text: React.ReactNode }[] }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const current = [...steps].reverse().find((st) => frame >= st.at);
  if (!current) return null;
  const local = frame - current.at;
  const o = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 120, right: 120, bottom: 70, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          opacity: o,
          transform: `translateY(${(1 - o) * 10}px)`,
          fontSize: 30,
          color: c.fg,
          background: "rgba(10,10,9,0.92)",
          border: `1px solid ${c.border}`,
          borderRadius: 4,
          padding: "16px 28px",
          maxWidth: 1500,
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {current.text}
      </div>
    </div>
  );
};
