import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Caption, Code, Eyebrow, Stage, Title, useIn } from "../components/primitives";
import { c, fonts } from "../theme";

// Todos os gatilhos agendados do sistema: os do workflow n8n e o pg_cron do banco.
const JOBS: { every: string; name: string; where: "n8n" | "pg_cron" }[] = [
  { every: "a cada 5 min", name: "Saúde do WhatsApp", where: "n8n" },
  { every: "a cada 15 min", name: "Lembretes de visita (D-1 e H-1)", where: "n8n" },
  { every: "a cada 15 min", name: "Distribuição de leads · prazo", where: "pg_cron" },
  { every: "a cada 30 min", name: "Pós-visita: pergunta e avisa", where: "n8n" },
  { every: "todo dia 9h", name: "Cruzamento leilão × lead", where: "n8n" },
  { every: "todo dia 10h", name: "Follow-up de leads parados", where: "n8n" },
  { every: "segunda 8h", name: "Resumo semanal no WhatsApp", where: "n8n" },
];

const CX = 520;
const CY = 590;
const R = 250;

export const S6Relogio: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [20, 250], [-90, 270], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring = useIn(0);
  const loop = useIn(150);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 60 }}>
        <Eyebrow>Enquanto ninguém está olhando</Eyebrow>
        <div style={{ height: 18 }} />
        <Title size={54}>O sistema trabalha sozinho no relógio.</Title>
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={c.border} strokeWidth={2} opacity={ring} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * (R - 18)}
              y1={CY + Math.sin(a) * (R - 18)}
              x2={CX + Math.cos(a) * R}
              y2={CY + Math.sin(a) * R}
              stroke={c.dim}
              strokeWidth={2}
              opacity={ring}
            />
          );
        })}
        {JOBS.map((_, i) => {
          const a = (-90 + (i + 0.5) * (360 / JOBS.length)) * (Math.PI / 180);
          const lit = angle >= -90 + (i + 0.5) * (360 / JOBS.length);
          return <circle key={i} cx={CX + Math.cos(a) * R} cy={CY + Math.sin(a) * R} r={lit ? 12 : 8} fill={lit ? c.lime : c.card} stroke={lit ? c.lime : c.border} strokeWidth={2} />;
        })}
        <line
          x1={CX}
          y1={CY}
          x2={CX + Math.cos((angle * Math.PI) / 180) * (R - 40)}
          y2={CY + Math.sin((angle * Math.PI) / 180) * (R - 40)}
          stroke={c.lime}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r={10} fill={c.lime} />
      </svg>

      <div style={{ position: "absolute", left: 960, top: 290, width: 840, display: "flex", flexDirection: "column", gap: 12 }}>
        {JOBS.map((j, i) => {
          const lit = angle >= -90 + (i + 0.5) * (360 / JOBS.length);
          return (
            <div
              key={j.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "12px 18px",
                border: `1px solid ${lit ? "rgba(184,255,79,0.45)" : c.border}`,
                background: lit ? "rgba(184,255,79,0.06)" : c.card,
                borderRadius: 4,
                opacity: lit ? 1 : 0.4,
              }}
            >
              <span style={{ fontFamily: fonts.mono, fontSize: 18, color: lit ? c.lime : c.dim, width: 170 }}>{j.every}</span>
              <span style={{ fontSize: 23, fontWeight: 600, flex: 1 }}>{j.name}</span>
              <Code tone={j.where === "pg_cron" ? "orange" : "muted"} size={16}>
                {j.where}
              </Code>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 960, top: 800, opacity: loop, display: "flex", gap: 12, alignItems: "center" }}>
        <Code tone="lime">GET /corretores-ativos</Code>
        <span style={{ color: c.muted, fontSize: 20 }}>→</span>
        <Code tone="lime">Split In Batches</Code>
        <span style={{ color: c.muted, fontSize: 20 }}>um corretor por vez</span>
      </div>

      <Caption
        steps={[
          { at: 20, text: "Lembretes, follow-up, leilões e resumo: tudo agendado." },
          { at: 150, text: "Cada rotina busca os corretores ativos e roda um de cada vez." },
        ]}
      />
    </Stage>
  );
};
