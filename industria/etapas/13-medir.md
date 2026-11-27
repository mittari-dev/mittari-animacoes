# Etapa 13: Medir e voltar

| | |
|---|---|
| **Entra** | Números da semana |
| **Sai** | `producoes/<marca>/<semana>-resultado.md`: o que repetir e o que cortar |
| **Skill** | `ig-audit` (o que funcionou nas postagens da marca), `hook-library` (os ganchos com o resultado de cada um). No banco: `performance-analyzer-sms`, `content-pattern-analyzer-sms` (servem quando houver muito mais posts) |
| **Portão** | A nota existe e a etapa 4 da semana seguinte a leu |

## Como fazer

1. **Toda semana, puxar os números de cada post:** alcance, envios, salvamentos, comentários com a palavra-chave, a parte do alcance que veio de quem não segue o perfil e o gráfico de retenção do melhor e do pior Reels.
2. **Ler `industria/skills/ig-audit/SKILL.md`** e fazer o pós-morte: o que funcionou, por quê e o que parar de fazer. Comparar só com a própria marca.
3. **Registrar o gancho de cada peça** em `marcas/<marca>/ganchos.csv` (`hook-library`):
   `python industria/skills/hook-library/scripts/hook_bank.py add marcas/<marca>/ganchos.csv --hook "..." --platform instagram --metric ... --value ...`
4. **Uma vez por mês, rodar `patterns --min 3`.** O que tiver 3 usos ou mais e resultado acima da mediana vai para o topo da etapa 7.
5. **Gravar `producoes/<marca>/<AAAA-semana>-resultado.md`:** o que repetir e o que cortar. A etapa 4 da semana seguinte lê essa nota.

## Calibrar a previsão

Cada peça postada ganha uma linha em `marcas/<marca>/resultados.csv`, com as notas e o resultado de 48 h. A cada 20 peças, `python ferramentas/calibrar.py marcas/<marca>/resultados.csv` ([portão 5](../qualidade/5-prontidao.md)).

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
