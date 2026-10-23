import React from "react";
import { Papel, Simbolo, Titulo, useEntrada, useTrecho } from "../../../marcas/mittari/base";
import { cor, fonte } from "../../../marcas/mittari/tema";

// Cena 5 — fechamento em laranja (cor dominante da marca) com a assinatura.
export const C5Final: React.FC = () => {
  const assinatura = useEntrada(40);
  const traco = useTrecho(34, 70);
  return (
    <Papel fundo={cor.laranja}>
      <div style={{ position: "absolute", left: 140, top: 280 }}>
        <Titulo em={4} tamanho={124} corTexto={cor.papel} linhas={["Você fala com", "quem quer comprar."]} />
      </div>
      <div style={{ position: "absolute", left: 140, bottom: 160, display: "flex", alignItems: "center", gap: 28, opacity: assinatura }}>
        <Simbolo tamanho={90} corTraco={cor.papel} desenho={traco} />
        <div>
          <div style={{ fontSize: 48, fontWeight: 800, color: cor.papel }}>ImobiFlow</div>
          <div style={{ fontFamily: fonte.detalhe, fontSize: 24, letterSpacing: 3, color: cor.papel, opacity: 0.85 }}>UM PRODUTO MITTARI</div>
        </div>
      </div>
    </Papel>
  );
};
