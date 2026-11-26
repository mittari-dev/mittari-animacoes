# Etapa 13: Medir e voltar

| | |
|---|---|
| **Entra** | Números da semana |
| **Sai** | `producoes/<marca>/<semana>-resultado.md`: o que repetir e o que cortar |
| **Skill** | `hook-library` (banco dos próprios ganchos, com o resultado de cada um). A confirmar: `performance-analyzer-sms`, `content-pattern-analyzer-sms` |
| **Portão** | A nota existe e a etapa 4 da semana seguinte a leu |

## Como fazer

1. **Registrar o gancho de cada peça postada** em `marcas/<marca>/ganchos.csv`, com uma métrica fixa por plataforma (`references/collecting.md` da `hook-library`):
   `python industria/skills/hook-library/scripts/hook_bank.py add marcas/<marca>/ganchos.csv --hook "..." --platform instagram --metric ... --value ...`
2. **Uma vez por mês, rodar `patterns --min 3`.** O que tiver 3 usos ou mais e resultado acima da mediana vai para o topo da etapa 7.
3. **Escrever a nota da semana** em `producoes/<marca>/`: o que repetir e o que cortar. A etapa 4 da semana seguinte lê essa nota.

O resto desta etapa (análise do conjunto de posts) espera a leitura das duas skills de análise.

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
