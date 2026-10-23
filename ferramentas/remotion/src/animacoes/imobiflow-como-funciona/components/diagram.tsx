import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { c, fonts } from "../theme";
import { useIn } from "./primitives";

export type Pt = [number, number];

/** Caixa de um componente do sistema, posicionada pelo centro. */
export const Node: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  icon?: React.ReactNode;
  at?: number;
  /** frames em que a caixa acende (o pacote está passando por ela) */
  activeFrom?: number;
  activeTo?: number;
  accent?: "lime" | "orange";
}> = ({ x, y, w = 280, h = 110, title, sub, icon, at = 0, activeFrom, activeTo, accent = "lime" }) => {
  const frame = useCurrentFrame();
  const p = useIn(at);
  const active =
    activeFrom !== undefined && activeTo !== undefined
      ? interpolate(frame, [activeFrom, activeFrom + 6, activeTo, activeTo + 12], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const color = accent === "lime" ? c.lime : c.orange;
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        opacity: p,
        transform: `scale(${0.9 + p * 0.1 + active * 0.04})`,
        background: c.card,
        border: `1px solid ${active > 0.05 ? color : c.border}`,
        boxShadow: active > 0.05 ? `0 0 ${40 * active}px ${accent === "lime" ? "rgba(184,255,79,0.35)" : "rgba(255,107,43,0.35)"}` : "none",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 22px",
        boxSizing: "border-box",
      }}
    >
      {icon && (
        <div
          style={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: 4,
            border: `1px solid ${active > 0.05 ? color : c.border}`,
            background: active > 0.05 ? color : "#0a0a0a",
            color: active > 0.05 ? "#000" : color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 26, color: c.fg, letterSpacing: -0.5, lineHeight: 1.1 }}>{title}</div>
        {sub && <div style={{ fontSize: 17, color: c.muted, marginTop: 6, lineHeight: 1.25 }}>{sub}</div>}
      </div>
    </div>
  );
};

const segLengths = (pts: Pt[]) => pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));

export const pointAt = (pts: Pt[], t: number): Pt => {
  const lens = segLengths(pts);
  const total = lens.reduce((a, b) => a + b, 0);
  let d = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const k = lens[i] === 0 ? 0 : d / lens[i];
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= lens[i];
  }
  return pts[pts.length - 1];
};

/**
 * Fio entre componentes. Desenha-se a partir de `drawAt`; se `packetFrom/To` vierem,
 * um pacote de dado percorre o fio nesse intervalo (com `label` opcional grudado nele).
 */
export const Wire: React.FC<{
  pts: Pt[];
  drawAt?: number;
  drawDur?: number;
  packetFrom?: number;
  packetTo?: number;
  label?: string;
  color?: string;
  dashed?: boolean;
}> = ({ pts, drawAt = 0, drawDur = 18, packetFrom, packetTo, label, color = c.lime, dashed }) => {
  const frame = useCurrentFrame();
  const total = segLengths(pts).reduce((a, b) => a + b, 0);
  const draw = interpolate(frame, [drawAt, drawAt + drawDur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const hasPacket = packetFrom !== undefined && packetTo !== undefined;
  const t = hasPacket ? interpolate(frame, [packetFrom!, packetTo!], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const visible = hasPacket && frame >= packetFrom! && frame <= packetTo! + 4;
  const [px, py] = pointAt(pts, t);
  // fio vertical: rótulo ao lado do pacote; horizontal: acima das caixas
  const [ax, ay] = pointAt(pts, Math.min(1, t + 0.01));
  const [bx, by] = pointAt(pts, Math.max(0, t - 0.01));
  const vertical = Math.abs(ay - by) > Math.abs(ax - bx);
  const lx = vertical ? px + 26 : px - 20;
  const ly = vertical ? py - 22 : py - 104;
  const layer = (z: number): React.CSSProperties => ({ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: z });
  return (
    <>
    <svg width={1920} height={1080} style={layer(0)}>
      <path d={d} fill="none" stroke={c.border} strokeWidth={2} strokeDasharray={dashed ? "8 10" : undefined} opacity={draw > 0 ? 1 : 0} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeDasharray={total}
        strokeDashoffset={total * (1 - draw)}
      />
    </svg>
    {/* o pacote fica numa camada acima das caixas, para o rótulo nunca sumir atrás delas */}
    <svg width={1920} height={1080} style={layer(10)}>
      {visible && (
        <g>
          <circle cx={px} cy={py} r={20} fill={color} opacity={0.18} />
          <circle cx={px} cy={py} r={9} fill={color} />
          {label && (
            <foreignObject x={lx} y={ly} width={560} height={44}>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: fonts.mono,
                  fontSize: 18,
                  color: "#000",
                  background: color,
                  padding: "4px 10px",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            </foreignObject>
          )}
        </g>
      )}
    </svg>
    </>
  );
};
