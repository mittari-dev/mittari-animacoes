// gancho escrito desde o quadro 1
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">Quanto</span><span class="w">você</span></div><div class="row big"><span class="w">vendeu,</span></div><div class="row big"><span class="w lm">você</span><span class="w lm">sabe.</span></div>';
$("#type").appendChild(h1);
const ASK = (f, at) => {
  F(f, { borderColor: "#2A2B27" }, { borderColor: "#FF5A5E", duration: 0.2 }, at);
  F(f + " .q", { backgroundColor: "#2A2B27", color: "#8E8E86", scale: 1 }, { backgroundColor: "#FF5A5E", color: "#FFFFFF", scale: 1.25, duration: 0.2, ease: "back.out(3)" }, at);
  F(f + " .q", { scale: 1.25 }, { scale: 1, duration: 0.25 }, at + 0.22);
  F(f + " .l", { color: "#B4B4AC" }, { color: "#ECECE4", duration: 0.2 }, at);
  SHAKE(f, at, 5, 10);
};

// ato 1 (0–3,4 s): a única conta que todo mundo faz
gsap.set("#funil", { scale: 1.06, transformOrigin: "50% 0%" });
F("#funil", { scale: 1.06 }, { scale: 1, duration: 3.2, ease: "power1.out" }, 0);
F("#f4", { boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { boxShadow: "0 0 90px 20px rgba(184,255,79,0.55)", duration: 0.3, yoyo: true, repeat: 3 }, 0.02);
PULSE("#f4", 0.02, 1.1); PULSE("#f4", W(2.72), 1.08);
PULSE("#h1 .lm", W(2.72), 1.08, "0% 60%");
OUT("#h1", W(3.6));

// ato 2 (3,7–10,1 s): as três que ninguém faz
const a = lines(190, [["sm", [["Agora", W(3.74)], ["me", W(3.92)], ["diz:", W(4.08)]]], ["mid", [["Conversas?", W(5.12), "rd"]]], ["mid", [["Respostas", W(7.8), "rd"], ["no", W(8.28), "rd"], ["dia?", W(8.72), "rd"]]], ["mid", [["Visitas?", W(10.28), "rd"]]]]);
ASK("#f1", W(5.12)); ASK("#f2", W(7.8)); ASK("#f3", W(10.28));
OUT(a, W(11.15));

// ato 3 (10,6–15,7 s): onde a venda some
const b = lines(190, [["sm", [["Se", W(11.33)], ["você", W(11.44)], ["não", W(11.76)], ["sabe,", W(12.0)]]], ["big rd", [["é", W(12.64)], ["aí", W(12.8)], ["que", W(13.12)]]], ["big rd", [["a", W(13.24)], ["venda", W(13.36)], ["some.", W(13.76)]]]]);
// as gotas escapam pelos vãos entre as barras
const VAOS = [158, 338, 518];
for (let i = 0; i < 27; i++) {
  const g = document.createElement("i"); g.className = "gota"; const v = VAOS[i % 3]; const lado = i % 2 ? 1 : -1;
  g.style.top = v + "px"; g.style.left = (540 + lado * (120 + rnd() * 260)) + "px"; $("#funil").appendChild(g);
  const at = W(13.36) + rnd() * 3.0;
  F(g, { opacity: 0, x: 0, y: 0, scale: 0.6 }, { opacity: 1, duration: 0.05 }, at);
  F(g, { x: 0, y: 0, opacity: 1, scale: 0.6 }, { x: lado * (140 + rnd() * 220), y: 260 + rnd() * 420, opacity: 0, scale: 1.2, duration: 0.8 + rnd() * 0.4, ease: "power1.in" }, at + 0.05);
}
SHAKE("#world", W(13.76), 5, 12);
OUT(b, W(14.45));
const b2 = lines(190, [["serif", [["Não", W(14.56)], ["no", W(14.8)], ["fechamento.", W(14.96)]]], ["huge lm", [["No", W(16.06)]]], ["huge lm", [["caminho.", W(16.16)]]]]);
F("#f4", { opacity: 1 }, { opacity: 0.3, duration: 0.3 }, W(14.96));
["#f1", "#f2", "#f3"].forEach((f, i) => PULSE(f, W(16.16) + i * 0.12, 1.05));
OUT(b2, W(17.05));

// ato 4 (15,9–20,3 s): a conta de uma semana
const c = lines(190, [["sm", [["Uma", W(18.0)], ["semana", W(18.16)], ["só.", W(18.56)]]], ["big", [["Faz", W(17.18)], ["a", W(17.36)]]], ["big lm", [["conta.", W(17.52)]]]]);
F("#f4", { opacity: 0.3 }, { opacity: 1, duration: 0.3 }, W(17.2));
POP("#ex", W(18.56), "0% 50%");
[["#f1", 19.33], ["#f2", 20.16], ["#f3", 21.16]].forEach(([f, t]) => {
  HIDE(f + " .q", W(t), 0.1);
  F(f + " .v", { opacity: 0, scale: 2, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(2)", transformOrigin: "100% 50%" }, W(t));
  F(f, { borderColor: "#FF5A5E" }, { borderColor: "#ECECE4", duration: 0.2 }, W(t));
});
OUT(c, W(21.95));

// ato 5 (20,4–23,5 s): o número que mais cai
const d = lines(190, [["sm", [["O", W(22.07)], ["número", W(22.12)], ["que", W(22.48)], ["mais", W(22.72)], ["cai", W(23.04)]]], ["big", [["mostra", W(23.44)], ["onde", W(24.0)]]], ["big rd", [["você", W(24.32)], ["perde.", W(24.88)]]]]);
POP("#queda", W(23.04)); SHAKE("#world", W(23.04), 5, 12);
F("#f3", { borderColor: "#ECECE4", boxShadow: "0 0 0 0 rgba(255,90,94,0)" }, { borderColor: "#FF5A5E", boxShadow: "0 0 70px 10px rgba(255,90,94,0.45)", duration: 0.3 }, W(23.04));
F("#f3 .v", { color: "#ECECE4" }, { color: "#FF5A5E", duration: 0.3 }, W(23.04));
PULSE("#queda", W(24.88), 1.15);

// a porta
porta(W(25.72), "comenta", "Faz a conta.", "E comenta quantas visitas você marcou.");
