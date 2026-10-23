import React from "react";
import { Check, Home, UserRound } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { Caption, Code, Eyebrow, Stage, Title, useIn } from "../components/primitives";
import { c, fonts } from "../theme";

const Field: React.FC<{ at: number; k: string; v: string }> = ({ at, k, v }) => {
  const p = useIn(at);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderTop: `1px solid ${c.borderSoft}`, opacity: 0.25 + p * 0.75 }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 19, color: c.muted }}>{k}</span>
      <span style={{ fontSize: 21, color: p > 0.5 ? c.fg : c.dim, fontWeight: 600 }}>{p > 0.5 ? v : "—"}</span>
    </div>
  );
};

const Badge: React.FC<{ label: string; on: number; tone: "lime" | "muted" | "orange"; note: string }> = ({ label, on, tone, note }) => {
  const color = tone === "lime" ? c.lime : tone === "orange" ? c.orange : c.muted;
  return (
    <div
      style={{
        border: `1px solid ${on > 0.1 ? color : c.border}`,
        background: on > 0.1 ? `rgba(184,255,79,${0.08 * on})` : c.card,
        borderRadius: 4,
        padding: "22px 26px",
        boxShadow: on > 0.1 ? `0 0 ${50 * on}px rgba(184,255,79,0.25)` : "none",
        opacity: 0.45 + on * 0.55,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 12, height: 12, borderRadius: 99, background: on > 0.1 ? color : c.dim }} />
        <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 32, color: on > 0.1 ? color : c.muted }}>{label}</span>
      </div>
      <div style={{ fontSize: 18, color: c.muted, marginTop: 8 }}>{note}</div>
    </div>
  );
};

const Imovel: React.FC<{ at: number; title: string; meta: string; x: number }> = ({ at, title, meta, x }) => {
  const p = useIn(at);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 790,
        width: 300,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        background: c.paper,
        color: "#000",
        borderRadius: 4,
        padding: "16px 18px",
        display: "flex",
        gap: 14,
        alignItems: "center",
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 4, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Home size={24} color={c.lime} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 20 }}>{title}</div>
        <div style={{ fontSize: 16, color: c.paperMuted }}>{meta}</div>
      </div>
    </div>
  );
};

export const S4Banco: React.FC = () => {
  const frame = useCurrentFrame();
  const req1 = frame >= 40;
  const req2 = frame >= 70;
  const qualif = interpolate(frame, [150, 165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rules = useIn(20);
  const dist = useIn(290);
  const matchLabel = useIn(200);

  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 60 }}>
        <Eyebrow>Quem decide é o banco</Eyebrow>
        <div style={{ height: 18 }} />
        <Title size={54}>O agente anota. A regra classifica.</Title>
      </div>

      {/* ficha do lead */}
      <div style={{ position: "absolute", left: 120, top: 250, width: 520, background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, padding: "22px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 4, background: c.lime, color: "#000", fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>CD</div>
          <div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 28 }}>Carla Dias</div>
            <div style={{ fontSize: 17, color: c.muted }}>tabela leads</div>
          </div>
        </div>
        <Field at={40} k="prazo_compra" v="até 3 meses" />
        <Field at={70} k="formas_pagamento" v="financiamento" />
        <Field at={95} k="regiao" v="Centro" />
        <Field at={115} k="price_max" v="R$ 420 mil" />
      </div>

      {/* regras */}
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 250,
          width: 520,
          opacity: rules,
          background: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: 4,
          padding: "22px 26px",
          fontFamily: fonts.mono,
          fontSize: 19,
          lineHeight: 1.7,
          color: c.muted,
        }}
      >
        <div style={{ color: c.dim }}>-- regras_de_prontidao (padrão)</div>
        <div>{"{"}</div>
        <div style={{ paddingLeft: 20 }}>"exigencias_para_qualificar": [</div>
        <div style={{ paddingLeft: 44, color: req1 ? c.lime : c.muted }}>
          "prazo_compra", {req1 && <Check size={18} style={{ verticalAlign: "middle" }} />}
        </div>
        <div style={{ paddingLeft: 44, color: req2 ? c.lime : c.muted }}>
          "formas_pagamento" {req2 && <Check size={18} style={{ verticalAlign: "middle" }} />}
        </div>
        <div style={{ paddingLeft: 20 }}>],</div>
        <div style={{ paddingLeft: 20 }}>"efeitos": {"{"}</div>
        <div style={{ paddingLeft: 44 }}>"sem_prazo": <span style={{ color: c.orange }}>"nutrir"</span>,</div>
        <div style={{ paddingLeft: 44 }}>"precisa_vender_antes": <span style={{ color: c.orange }}>"nutrir"</span></div>
        <div style={{ paddingLeft: 20 }}>{"}"}</div>
        <div>{"}"}</div>
      </div>

      {/* classificação */}
      <div style={{ position: "absolute", left: 1290, top: 250, width: 510, display: "flex", flexDirection: "column", gap: 16 }}>
        <Badge label="Qualificado" on={qualif} tone="lime" note={qualif > 0.5 ? "motivos: prazo até 3 meses · financiamento" : "pronto para o corretor"} />
        <Badge label="Nutrir" on={0} tone="orange" note="interesse real, mas sem pressa" />
        <Badge label="Desqualificado" on={0} tone="muted" note="fora do perfil, com o motivo escrito" />
      </div>

      {/* cruzamento */}
      <div style={{ position: "absolute", left: 120, top: 730, opacity: matchLabel, display: "flex", gap: 12, alignItems: "center" }}>
        <Code tone="lime">trg_cruzar_lead</Code>
        <span style={{ color: c.muted, fontSize: 20 }}>→ property_lead_matches · exige dois sinais</span>
      </div>
      <Imovel at={214} x={120} title="Apê 2q · Centro" meta="R$ 395 mil · venda" />
      <Imovel at={226} x={440} title="Apê 2q · Centro" meta="R$ 410 mil · venda" />
      <Imovel at={238} x={760} title="Studio · Centro" meta="R$ 360 mil · venda" />

      {/* distribuição */}
      <div
        style={{
          position: "absolute",
          left: 1140,
          top: 730,
          width: 660,
          opacity: dist,
          transform: `translateX(${(1 - dist) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <Code tone="lime">trg_zz_distribuir_lead</Code>
          <span style={{ color: c.muted, fontSize: 20 }}>→ corretor_da_vez</span>
        </div>
        <div style={{ background: c.card, border: `1px solid ${c.lime}`, borderRadius: 4, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <UserRound size={30} color={c.lime} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>Pedro Souza recebe o lead</div>
            <div style={{ color: c.muted, fontSize: 17 }}>menos leads em andamento · prazo de 2h para agir</div>
          </div>
        </div>
      </div>

      <Caption
        steps={[
          { at: 30, text: "O agente só anota o que ouviu: prazo, forma de pagamento, região, orçamento." },
          { at: 130, text: "Uma regra no banco decide, e o corretor pode editar essa regra." },
          { at: 200, text: "Com o lead qualificado, um gatilho cruza os dados com o catálogo de imóveis." },
          { at: 290, text: "Em imobiliária, outro gatilho entrega o lead ao corretor da vez." },
        ]}
      />
    </Stage>
  );
};
