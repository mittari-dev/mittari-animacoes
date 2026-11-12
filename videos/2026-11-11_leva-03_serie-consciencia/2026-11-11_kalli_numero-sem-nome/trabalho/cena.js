// gancho escrito desde o quadro 1
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">No</span><span class="w">celular</span><span class="w">dele,</span></div><div class="row big"><span class="w rd">você</span><span class="w rd">não</span></div><div class="row big"><span class="w rd">tem</span><span class="w rd">nome.</span></div>';
$("#type").appendChild(h1);

// ato 1 (0–3,6 s): a sua conversa, vista do celular do cliente
gsap.set("#phone", { scale: 1.0, transformOrigin: "50% 48%" });
SHAKE("#phone", 0.02, 15, 8);
F("#eu", { backgroundColor: "#0D0E0C" }, { backgroundColor: "#1A1B18", duration: 0.2, yoyo: true, repeat: 3 }, 0.05);
PULSE("#h1 .rd", W(2.4), 1.07, "0% 60%");
OUT("#h1", W(3.65));

// ato 2 (3,8–5,3 s): você é um número
const a = lines(190, [["sm", [["Você", W(3.84)], ["é", W(4.04)]]], ["huge", [["um", W(4.12)]]], ["huge rd", [["número.", W(4.24)]]]]);
PULSE("#eu .n", W(4.24), 1.14, "0% 50%");
F("#eu .n", { color: "#ECECE4" }, { color: "#FF5A5E", duration: 0.2 }, W(4.24));
SHAKE("#world", W(4.24), 5, 12);
OUT(a, W(5.5));
F("#phone", { scale: 1.12 }, { scale: 1, duration: 0.5, ease: "power3.inOut" }, W(5.4));
F("#phone", { scale: 1 }, { scale: 1.12, duration: 0.3, ease: "back.out(2)" }, W(4.0));

// ato 3 (5,5–10,9 s): cinco corretores, cinco conversas iguais
const b = lines(190, [["big", [["5", W(6.4), "lm"], ["corretores", W(6.72)]]], ["sm", [["hoje.", W(7.44)]]], ["serif", [["5", W(8.24)], ["números", W(8.56)]]], ["serif", [["desconhecidos.", W(8.96)]]], ["serif rd", [["5", W(10.24)], ["conversas", W(10.56)], ["iguais.", W(11.12)]]]]);
[["#r0", 6.4], ["#r1", 6.7], ["#r3", 7.0], ["#r4", 7.3]].forEach(([r, t]) => F(r, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.6)" }, W(t)));
F("#eu .n", { color: "#FF5A5E" }, { color: "#ECECE4", duration: 0.3 }, W(7.4));
$$(".cr .n").forEach((n, i) => PULSE(n, W(8.56) + i * 0.1, 1.08, "0% 50%"));
$$(".cr .p").forEach((n, i) => F(n, { color: "#8E8E86" }, { color: "#FF5A5E", duration: 0.2, yoyo: true, repeat: 1 }, W(10.56) + i * 0.08));
SHAKE("#lista", W(11.12), 5, 10);
OUT(b, W(12.1));

// ato 4 (11,4–16,3 s): amanhã ele não lembra qual era você
const c = lines(190, [["sm", [["Amanhã,", W(12.31)], ["quando", W(12.88)], ["ele", W(13.12)]]], ["sm", [["decidir", W(13.32)], ["visitar,", W(13.68)]]]]);
OUT(c, W(15.55));
const c2 = lines(190, [["big", [["não", W(15.76)], ["vai", W(16.0)]]], ["big", [["lembrar", W(16.16)]]], ["big rd", [["qual", W(16.56)], ["era", W(16.8)], ["você.", W(16.96)]]]]);
// as conversas se embaralham
const ORD = [["#r0", 292], ["#r1", 584], ["#eu", 0], ["#r3", 146], ["#r4", 438]];
const BASE = { "#r0": 0, "#r1": 146, "#eu": 292, "#r3": 438, "#r4": 584 };
ORD.forEach(([r, y]) => F(r, { y: 0 }, { y: y - BASE[r], duration: 0.5, ease: "power2.inOut" }, W(14.56)));
const ORD2 = [["#r0", 584], ["#r1", 0], ["#eu", 438], ["#r3", 292], ["#r4", 146]];
ORD2.forEach(([r, y], i) => F(r, { y: ORD[i][1] - BASE[r] }, { y: y - BASE[r], duration: 0.5, ease: "power2.inOut" }, W(15.5)));
F("#lista .cr", { filter: "blur(0px)" }, { filter: "blur(7px)", duration: 0.5 }, W(16.0));
POP("#qm", W(16.56)); SHAKE("#world", W(16.56), 5, 12);
OUT(c2, W(17.75));

// ato 5 (16,6–21,7 s): quem ele lembra
const d = lines(190, [["sm", [["Quem", W(17.96)], ["ele", W(18.16)], ["lembra?", W(18.4)]]], ["big lm", [["Quem", W(19.24)], ["disse", W(19.44)]]], ["big lm", [["o", W(19.72)], ["nome.", W(19.84)]]], ["serif", [["E", W(21.48)], ["mandou", W(21.64)], ["algo", W(21.92)]]], ["serif", [["que", W(22.52)], ["valia", W(22.64)], ["guardar.", W(23.04)]]]]);
HIDE("#qm", W(18.9));
F("#lista .cr", { filter: "blur(7px)" }, { filter: "blur(0px)", duration: 0.4 }, W(19.0));
F("#eu", { y: 438 - 292 }, { y: 0 - 292, duration: 0.5, ease: "back.out(1.3)" }, W(19.24));
F("#r1", { y: 0 - 146 }, { y: 438 - 146, duration: 0.5, ease: "power2.inOut" }, W(19.24));
HIDE("#eu .n", W(19.7)); SHOW("#eu .n2", W(19.84)); HIDE("#eu .av", W(19.7)); POP("#eu .av2", W(19.84));
F("#eu", { backgroundColor: "#0D0E0C", boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { backgroundColor: "#16230C", boxShadow: "0 0 70px 6px rgba(184,255,79,0.35)", duration: 0.4 }, W(19.84));
["#r0", "#r1", "#r3", "#r4"].forEach((r) => F(r, { opacity: 1 }, { opacity: 0.3, duration: 0.4 }, W(19.84)));
HIDE("#eu .p", W(21.5)); SHOW("#eu .p2", W(21.64));
PULSE("#eu", W(23.04), 1.04);
OUT(d, W(23.8));

// ato 6 (22,1–24,7 s): a pergunta para quem assiste
const e = lines(190, [["sm", [["Abre", W(23.98)], ["a", W(24.11)], ["sua", W(24.16)], ["última", W(24.36)], ["conversa.", W(24.72)]]], ["huge", [["Você", W(25.72)], ["se", W(25.88)]]], ["huge rd", [["apresentou?", W(26.0)]]]]);
gsap.set("#tx" + _ln + " .huge", { fontSize: 116 });
SHAKE("#world", W(26.0), 5, 12);

// a porta
porta(W(26.95), "manda", "Manda pro corretor", "que nunca se apresenta.");
