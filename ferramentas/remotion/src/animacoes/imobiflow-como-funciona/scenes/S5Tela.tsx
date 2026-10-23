import React from "react";
import { Check, Globe, KeyRound, Server } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { Caption, Code, Eyebrow, Stage, Title, useIn } from "../components/primitives";
import { Node, Wire } from "../components/diagram";
import { c, fonts } from "../theme";

const Y = 360;

const Gate: React.FC<{ at: number; label: string }> = ({ at, label }) => {
  const frame = useCurrentFrame();
  const on = frame >= at;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: fonts.mono, fontSize: 18, color: on ? c.lime : c.dim }}>
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          border: `1px solid ${on ? c.lime : c.border}`,
          background: on ? c.lime : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {on && <Check size={16} color="#000" />}
      </span>
      {label}
    </div>
  );
};

const Scope: React.FC<{ y: number; who: string; sql: string; hot: number; at: number }> = ({ y, who, sql, hot, at }) => {
  const p = useIn(at);
  return (
    <div
      style={{
        position: "absolute",
        left: 1520,
        top: y,
        width: 330,
        opacity: p * (0.4 + hot * 0.6),
        background: c.card,
        border: `1px solid ${hot > 0.1 ? c.lime : c.border}`,
        boxShadow: hot > 0.1 ? `0 0 ${36 * hot}px rgba(184,255,79,0.3)` : "none",
        borderRadius: 4,
        padding: "12px 16px",
      }}
    >
      <div style={{ fontSize: 19, fontWeight: 600, color: hot > 0.1 ? c.fg : c.muted }}>{who}</div>
      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: hot > 0.1 ? c.lime : c.dim, marginTop: 4 }}>{sql}</div>
    </div>
  );
};

const COLS = ["Novo", "Em conversa", "Qualificado", "Visita agendada", "Proposta", "Fechado"];

const Kanban: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const p = useIn(at);
  const move = interpolate(frame, [at + 40, at + 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cards: Record<string, string[]> = {
    Novo: ["Ana Lima"],
    "Em conversa": ["Bruno Martins"],
    Qualificado: ["João Faria"],
    "Visita agendada": [],
    Proposta: ["Mariana Costa"],
    Fechado: [],
  };
  const colW = 262;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 640,
        width: 1680,
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px)`,
        border: `1px solid ${c.borderSoft}`,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <div style={{ background: "#0a0a0a", borderBottom: `1px solid ${c.borderSoft}`, padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: 99, background: "#2a2a2a" }} />
        ))}
        <span style={{ marginLeft: 14, fontFamily: fonts.mono, fontSize: 16, color: c.dim }}>imobiflow.mittari.com.br/pipeline</span>
      </div>
      <div style={{ position: "relative", background: "#000", padding: 16, display: "flex", gap: 16, height: 190 }}>
        {COLS.map((col) => (
          <div key={col} style={{ width: colW, flexShrink: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: col === "Qualificado" ? c.lime : "rgba(232,232,224,0.2)" }} />
              {col}
            </div>
            {cards[col].map((n) => (
              <Card key={n} name={n} />
            ))}
          </div>
        ))}
        {/* Carla entra em Novo e desliza para Qualificado */}
        <div style={{ position: "absolute", top: 16 + 28 + 56, left: 16 + (colW + 16) * 2 * move, width: colW }}>
          <Card name="Carla Dias" hot />
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ name: string; hot?: boolean }> = ({ name, hot }) => (
  <div
    style={{
      background: c.paper,
      color: "#000",
      borderRadius: 4,
      padding: "10px 12px",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 10,
      outline: hot ? `2px solid ${c.lime}` : "none",
      boxShadow: hot ? "0 0 30px rgba(184,255,79,0.35)" : "none",
    }}
  >
    <span style={{ width: 26, height: 26, borderRadius: 4, background: "#000", color: c.lime, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {name
        .split(" ")
        .map((w) => w[0])
        .join("")}
    </span>
    <span style={{ fontSize: 16, fontWeight: 600 }}>{name}</span>
  </div>
);

export const S5Tela: React.FC = () => {
  const frame = useCurrentFrame();
  const hot = interpolate(frame, [205, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gates = useIn(40);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 60 }}>
        <Eyebrow>Do outro lado: a tela do corretor</Eyebrow>
        <div style={{ height: 18 }} />
        <Title size={54}>Cada um vê só o que é seu.</Title>
      </div>

      <Wire pts={[[330, Y], [420, Y]]} drawAt={20} packetFrom={30} packetTo={50} />
      <Wire pts={[[700, Y], [790, Y]]} drawAt={24} packetFrom={100} packetTo={125} label="createServerFn" />
      <Wire pts={[[1070, Y], [1160, Y]]} drawAt={28} packetFrom={128} packetTo={155} label="Bearer <JWT>" />
      <Wire pts={[[1440, Y], [1480, Y], [1480, 280], [1520, 280]]} drawAt={160} />
      <Wire pts={[[1480, Y], [1480, 400], [1520, 400]]} drawAt={164} />
      <Wire pts={[[1480, 400], [1480, 520], [1520, 520]]} drawAt={168} packetFrom={180} packetTo={205} />

      <Node x={200} y={Y} w={260} title="Navegador" sub="/pipeline" icon={<Globe size={28} />} activeFrom={20} activeTo={40} />

      {/* portões do beforeLoad */}
      <div
        style={{
          position: "absolute",
          left: 420,
          top: Y - 95,
          width: 280,
          height: 190,
          opacity: gates,
          background: c.card,
          border: `1px solid ${frame > 50 && frame < 100 ? c.lime : c.border}`,
          borderRadius: 4,
          padding: "16px 20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 24 }}>beforeLoad</div>
        <Gate at={55} label="sessão Supabase" />
        <Gate at={70} label="onboarding feito" />
        <Gate at={85} label="assinatura ativa" />
      </div>

      <Node x={930} y={Y} w={280} title="Server function" sub="leads.functions.ts" icon={<Server size={28} />} activeFrom={96} activeTo={128} />
      <Node x={1300} y={Y} w={280} title="backend-go" sub="userAuth · valida sessão" icon={<KeyRound size={28} />} activeFrom={150} activeTo={180} />

      <div style={{ position: "absolute", left: 1520, top: 200, opacity: useIn(158) }}>
        <Code tone="lime" size={18}>
          ResolveDataScope()
        </Code>
      </div>
      <Scope at={160} y={250} who="Corretor autônomo" sql="owner_id = $1" hot={0} />
      <Scope at={164} y={370} who="Dono da imobiliária" sql="agency_id = $1" hot={0} />
      <Scope at={168} y={490} who="Corretor da equipe" sql="agency_id AND assigned_to" hot={hot} />

      <Kanban at={240} />

      <Caption
        steps={[
          { at: 20, text: "O corretor abre o funil. Antes de mostrar a tela, o app confere sessão, onboarding e assinatura." },
          { at: 96, text: "A tela chama uma função no servidor, que repassa o login dele ao backend Go." },
          { at: 160, text: "O backend descobre quem está pedindo e monta o filtro da consulta." },
          { at: 250, text: "No funil, a Carla já aparece como qualificada, sem ninguém ter digitado nada." },
        ]}
      />
    </Stage>
  );
};
