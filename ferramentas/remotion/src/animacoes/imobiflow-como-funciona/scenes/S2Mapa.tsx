import React from "react";
import { Bot, Database, LayoutDashboard, MessageCircle, Radio, Server } from "lucide-react";
import { Caption, Code, Eyebrow, Stage, Title, useIn } from "../components/primitives";
import { Node, Wire } from "../components/diagram";
import { c } from "../theme";

// O diagrama do README do repositório, montado peça por peça.
export const S2Mapa: React.FC = () => {
  const lock = useIn(200);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 70 }}>
        <Eyebrow>O mapa</Eyebrow>
        <div style={{ height: 20 }} />
        <Title size={60}>Seis peças. Um só caminho de dado.</Title>
      </div>

      <Wire pts={[[340, 390], [470, 390]]} drawAt={40} />
      <Wire pts={[[750, 390], [860, 390], [860, 480]]} drawAt={62} />
      <Wire pts={[[1110, 560], [1330, 560], [1330, 440]]} drawAt={96} />
      <Wire pts={[[1110, 610], [1330, 610], [1330, 760]]} drawAt={120} />
      <Wire pts={[[610, 830], [810, 830], [810, 640]]} drawAt={150} />

      <Node x={210} y={390} w={260} title="Cliente" sub="WhatsApp" icon={<MessageCircle size={28} />} at={20} />
      <Node x={610} y={390} w={280} title="Evolution API" sub="Baileys · api.mittari" icon={<Radio size={28} />} at={40} />
      <Node x={960} y={580} w={330} h={150} title="backend-go" sub="Vercel · net/http + pgx ~130 rotas" icon={<Server size={28} />} at={62} />
      <Node x={1470} y={390} w={300} title="n8n + Claude" sub="1 workflow, todos os corretores" icon={<Bot size={28} />} at={96} />
      <Node x={1470} y={810} w={300} title="Supabase" sub="Postgres · regras em gatilho" icon={<Database size={28} />} at={120} />
      <Node x={460} y={830} w={300} title="Frontend" sub="TanStack Start · React 19" icon={<LayoutDashboard size={28} />} at={150} />

      <div
        style={{
          position: "absolute",
          left: 1350,
          top: 690,
          opacity: lock,
          transform: `translateY(${(1 - lock) * 10}px)`,
          display: "flex",
          gap: 10,
          alignItems: "center",
          color: c.muted,
          fontSize: 20,
        }}
      >
        <Code tone="orange">RLS on · 0 políticas</Code>
      </div>

      <Caption
        steps={[
          { at: 20, text: "O cliente fala no WhatsApp do corretor. A Evolution API conecta esse número ao sistema." },
          { at: 96, text: "Um único workflow n8n atende todos os corretores. O agente é o Claude." },
          { at: 160, text: "O frontend não fala com o banco: chama funções no servidor, que chamam o backend Go." },
          { at: 220, text: <>O backend Go é o <b style={{ color: c.lime }}>único</b> caminho de dado. Ninguém lê o Postgres direto.</> },
        ]}
      />
    </Stage>
  );
};
