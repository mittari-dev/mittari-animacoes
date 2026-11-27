# Portão 5: nota de prontidão (e a previsão)

## A nota (0 a 100)

| Parte | Peso | Como vira número |
|---|---|---|
| Roteiro (portão 1) | 40 | `nota / 20 × 40` |
| Animação (portão 3) | 40 | `média das 10 camadas / 5 × 40` |
| Render (portão 4) | 20 | 20 se passou sem aviso, 15 com aviso |

**Só existe nota se os portões 1 a 4 passaram.** Abaixo de 70, a peça não vai ao dono. Ela volta para a parte de menor nota.

Anotar na ficha da peça: as notas de cada portão, a nota de prontidão e em quantas rodadas o humanizer passou.

## A previsão

**Hoje a casa não consegue prever resultado.** Há poucos posts medidos. A Leva 01 ficou entre 0% e 44% de pessoas passando dos 3 segundos, e as Levas 02 e 03 não foram postadas. Qualquer previsão agora seria inventada.

O que dá para fazer é **calibrar**:
1. **Toda peça postada ganha uma linha** em `marcas/<marca>/resultados.csv`, com as notas de antes de postar e o resultado de 48 h depois:
   ```
   data,peca,roteiro,animacao,render,prontidao,humanizer_rodadas,ret3s,envios,salvamentos,alcance,nao_seguidores,porta
   ```
   `ret3s` é o % que passou dos 3 s. `porta` é quantos comentários ou mensagens com a palavra-chave chegaram.
2. **Com 20 peças ou mais**, rodar:
   ```
   python ferramentas/calibrar.py marcas/<marca>/resultados.csv
   ```
   Ele diz, para cada resultado, se a nota acompanha (correlação de Spearman).
3. **Ler o resultado:**
   - **A nota acompanha** (+0,5 ou mais): ela passa a servir de previsão. Peça com nota alta tende a ir melhor, e isso pode decidir qual peça entra primeiro na grade.
   - **Não acompanha:** os critérios estão errados para essa marca. Ver qual parte (roteiro ou animação) acompanha menos e mudar os critérios **junto com o dono**.
   - **Vai ao contrário:** algum critério premia o que o público rejeita. Achar qual.
4. **Repetir a cada 20 peças novas.**

Isso é uma hipótese em teste, e não uma garantia. Uma correlação com 20 peças ainda é fraca. Com 50, começa a valer.
