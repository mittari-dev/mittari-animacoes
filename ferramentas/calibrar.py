"""A previsão da Indústria de Postagem: a nota de prontidão acompanha o resultado real?

Uso:
  python ferramentas/calibrar.py marcas/<marca>/resultados.csv
  python ferramentas/calibrar.py --teste

Lê o CSV (uma linha por peça postada) e calcula a correlação de Spearman entre cada nota
(prontidao, roteiro, animacao) e cada resultado (ret3s, envios, salvamentos, alcance, porta).
Com menos de 20 peças com resultado, diz quantas faltam e não conclui nada.
"""
import csv, sys

MINIMO = 20
NOTAS = ["prontidao", "roteiro", "animacao"]
RESULTADOS = ["ret3s", "envios", "salvamentos", "alcance", "porta"]

def postos(xs):
    ordem = sorted(range(len(xs)), key=lambda i: xs[i])
    r = [0.0] * len(xs)
    i = 0
    while i < len(ordem):
        j = i
        while j + 1 < len(ordem) and xs[ordem[j + 1]] == xs[ordem[i]]:
            j += 1
        for k in range(i, j + 1):
            r[ordem[k]] = (i + j) / 2 + 1  # empate: média dos postos
        i = j + 1
    return r

def spearman(a, b):
    ra, rb = postos(a), postos(b)
    n = len(a)
    ma, mb = sum(ra) / n, sum(rb) / n
    cov = sum((x - ma) * (y - mb) for x, y in zip(ra, rb))
    va = sum((x - ma) ** 2 for x in ra) ** 0.5
    vb = sum((y - mb) ** 2 for y in rb) ** 0.5
    return cov / (va * vb) if va and vb else 0.0

def leitura(r):
    if r >= 0.5: return "acompanha bem"
    if r >= 0.3: return "acompanha um pouco"
    if r > -0.3: return "não acompanha"
    return "vai ao contrário (critério errado)"

def numero(v):
    try:
        return float(str(v).replace(",", ".").replace("%", ""))
    except ValueError:
        return None

def calibrar(caminho):
    linhas = list(csv.DictReader(open(caminho, encoding="utf-8")))
    for res in RESULTADOS:
        for nota in NOTAS:
            pares = [(numero(l.get(nota)), numero(l.get(res))) for l in linhas]
            pares = [(a, b) for a, b in pares if a is not None and b is not None]
            if len(pares) < MINIMO:
                if nota == "prontidao":
                    print(f"{res}: {len(pares)} peças com nota e resultado. Faltam {MINIMO - len(pares)} para concluir algo.")
                continue
            r = spearman([a for a, _ in pares], [b for _, b in pares])
            print(f"{res} x {nota}: {r:+.2f} ({leitura(r)}, {len(pares)} peças)")

def teste():
    assert postos([10, 20, 20, 30]) == [1, 2.5, 2.5, 4]
    assert round(spearman([1, 2, 3, 4], [10, 20, 30, 40]), 6) == 1.0
    assert round(spearman([1, 2, 3, 4], [4, 3, 2, 1]), 6) == -1.0
    assert spearman([1, 1, 1], [1, 2, 3]) == 0.0
    assert numero("44%") == 44.0 and numero("0,5") == 0.5 and numero("") is None
    print("teste ok")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        sys.exit(__doc__)
    teste() if sys.argv[1] == "--teste" else calibrar(sys.argv[1])
