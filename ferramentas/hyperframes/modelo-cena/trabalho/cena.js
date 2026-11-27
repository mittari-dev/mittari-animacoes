// Modelo mínimo: gancho no quadro 1, uma frase entrando palavra por palavra e a porta.
// Com narração, troque os tempos por W(t), em que t é o tempo da palavra no words.json.

// gancho, escrito desde o quadro 1 (som no quadro 1 vem do cena.json)
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">O gancho</span></div><div class="row big"><span class="w lm">aqui.</span></div>';
$("#type").appendChild(h1);
PULSE("#h1 .lm", 0.6, 1.07);
OUT("#h1", 2.9);

// uma frase, palavra por palavra (lines: [classe da linha, [[palavra, tempo], ...]])
const a = lines(190, [["sm", [["Uma", 3.2], ["linha", 3.4], ["pequena", 3.6]]], ["big lm", [["e", 4.1], ["forte.", 4.3]]]]);
OUT(a, 7.6);

// a porta: ícone (comenta, manda ou direct), linha 1, linha 2
porta(8.0, "comenta", "COMENTA<br>“PALAVRA”", "e eu te mando o que prometi.");
