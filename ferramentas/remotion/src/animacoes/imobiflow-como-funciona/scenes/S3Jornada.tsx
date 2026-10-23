import React from "react";
import { Bot, Database, MessageCircle, Radio, Server, Workflow } from "lucide-react";
import { Caption, Code, Eyebrow, Stage, Title, useIn } from "../components/primitives";
import { Node, Wire } from "../components/diagram";
import { c } from "../theme";

const Y = 380;
const Y2 = 790;

const Bubble: React.FC<{ at: number; side: "in" | "out"; x: number; y: number; children: React.ReactNode }> = ({ at, side, x, y, children }) => {
  const p = useIn(at, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        maxWidth: 470,
        opacity: p,
        transform: `translateY(${(1 - p) * 14}px) scale(${0.95 + p * 0.05})`,
        transformOrigin: "left bottom",
        background: side === "in" ? c.paper : c.lime,
        color: "#000",
        fontSize: 23,
        lineHeight: 1.35,
        padding: "14px 18px",
        borderRadius: 4,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
};

const Chips: React.FC<{ at: number; x: number; y: number; items: { t: string; tone?: "lime" | "muted" | "orange" }[] }> = ({ at, x, y, items }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
    {items.map((it, i) => (
      <ChipIn key={it.t} at={at + i * 6}>
        <Code tone={it.tone ?? "lime"} size={18}>
          {it.t}
        </Code>
      </ChipIn>
    ))}
  </div>
);

const ChipIn: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useIn(at);
  return <div style={{ opacity: p, transform: `translateX(${(1 - p) * -12}px)` }}>{children}</div>;
};

export const S3Jornada: React.FC = () => {
  return (
    <Stage>
      <div style={{ position: "absolute", left: 120, top: 60 }}>
        <Eyebrow>A jornada de uma mensagem</Eyebrow>
      </div>
      <div style={{ position: "absolute", right: 120, top: 62 }}>
        <Title size={44}>
          Ida e volta em <span style={{ color: c.lime }}>segundos.</span>
        </Title>
      </div>

      <Bubble at={16} side="in" x={60} y={170}>
        Oi! Vi o apê de 2 quartos no Centro. Aceita financiamento?
      </Bubble>

      {/* ida */}
      <Wire pts={[[320, Y], [390, Y]]} drawAt={6} packetFrom={40} packetTo={70} label="mensagem" />
      <Wire pts={[[670, Y], [730, Y]]} drawAt={10} packetFrom={72} packetTo={102} label="POST /evolution/webhook" />
      <Wire pts={[[1010, Y], [1070, Y]]} drawAt={14} packetFrom={104} packetTo={134} label="formato Meta" />
      <Wire pts={[[1350, Y], [1460, Y]]} drawAt={18} packetFrom={180} packetTo={210} label="contexto + histórico" />
      <Wire pts={[[1690, Y + 55], [1690, Y2 - 55]]} drawAt={22} packetFrom={250} packetTo={285} label="upsert_lead" />
      <Wire pts={[[1460, Y2], [1360, Y2]]} drawAt={26} packetFrom={288} packetTo={318} label="UPSERT leads" />
      {/* volta */}
      <Wire
        pts={[[1540, Y + 55], [1540, 580], [190, 580], [190, Y + 55]]}
        drawAt={30}
        drawDur={30}
        packetFrom={380}
        packetTo={455}
        label="POST /evolution/messages"
        dashed
      />

      <Node x={190} y={Y} w={260} title="Cliente" sub="WhatsApp" icon={<MessageCircle size={28} />} activeFrom={30} activeTo={45} />
      <Node x={530} y={Y} w={280} title="Evolution" sub="instância do corretor" icon={<Radio size={28} />} activeFrom={66} activeTo={76} />
      <Node x={870} y={Y} w={280} title="Ponte Go" sub="evolution.go" icon={<Server size={28} />} activeFrom={98} activeTo={108} />
      <Node x={1210} y={Y} w={280} title="n8n" sub="Resolver Corretor" icon={<Workflow size={28} />} activeFrom={130} activeTo={182} />
      <Node x={1610} y={Y} w={300} title="Claude" sub="claude-sonnet-5" icon={<Bot size={28} />} activeFrom={206} activeTo={252} />
      <Node x={1610} y={Y2} w={300} title="API do n8n" sub="/api/public/n8n/*" icon={<Server size={28} />} activeFrom={280} activeTo={292} />
      <Node x={1210} y={Y2} w={300} title="Postgres" sub="Supabase" icon={<Database size={28} />} activeFrom={314} activeTo={372} />

      <Chips at={136} x={1072} y={450} items={[{ t: "GET /corretor-by-phone" }, { t: "espera terminar de escrever", tone: "muted" }]} />
      <div style={{ position: "absolute", left: 1040, top: 200, width: 720, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "flex-end" }}>
        {([{ t: "upsert_lead" }, { t: "search_properties" }, { t: "schedule_visit" }, { t: "web_search", tone: "muted" }] as { t: string; tone?: "lime" | "muted" }[]).map((it, i) => (
          <ChipIn key={it.t} at={214 + i * 6}>
            <Code tone={it.tone ?? "lime"} size={18}>
              {it.t}
            </Code>
          </ChipIn>
        ))}
      </div>
      <Chips at={322} x={760} y={730} items={[{ t: "trg_resolver_conversa" }, { t: "trg_cruzar_lead" }, { t: "classificar prontidão", tone: "orange" }]} />

      <Bubble at={452} side="out" x={60} y={660}>
        Aceita sim, Carla! E você pensa em comprar em quanto tempo?
      </Bubble>

      <Caption
        steps={[
          { at: 20, text: "Uma cliente escreve para o WhatsApp do corretor." },
          { at: 72, text: "A Evolution avisa o backend, e a ponte em Go traduz tudo para o formato oficial da Meta." },
          { at: 134, text: "O n8n descobre de qual corretor é esse número e espera a pessoa terminar de escrever." },
          { at: 206, text: "O Claude lê o histórico e decide o que fazer, usando ferramentas." },
          { at: 285, text: "Cada ferramenta vira uma chamada ao backend, que grava no Postgres. Lá, gatilhos rodam sozinhos." },
          { at: 380, text: "A resposta volta pelo mesmo caminho, com uma pergunta de qualificação." },
        ]}
      />
    </Stage>
  );
};
