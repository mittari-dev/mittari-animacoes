import React from "react";
import { ImobiflowComoFunciona } from "./animacoes/imobiflow-como-funciona/Composicao";
import { ImobiflowEm30s } from "./animacoes/imobiflow-em-30s/Composicao";

// Uma linha por animação. Para criar uma nova, ver LEIA-ME.md.
export const Root: React.FC = () => (
  <>
    <ImobiflowEm30s />
    <ImobiflowComoFunciona />
  </>
);
