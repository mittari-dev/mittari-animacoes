// gancho escrito desde o quadro 1
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">Isso</span><span class="w">não</span><span class="w">é</span></div><div class="row big"><span class="w rd">uma</span><span class="w rd">pergunta.</span></div>';
$("#type").appendChild(h1);

// ato 1 (0–4,9 s): a mensagem chega, em close
gsap.set("#phone", { scale: 1.2, transformOrigin: "50% 30%" });
SHAKE("#phone", 0.02, 15, 8);
PULSE("#q", W(0.14), 1.06, "0% 50%");
F("#q", { boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { boxShadow: "0 0 0 6px rgba(184,255,79,0.45)", duration: 0.25, yoyo: true, repeat: 1 }, W(0.72));
PULSE("#h1 .rd", W(3.12), 1.07, "0% 60%");
PULSE("#h1", W(4.4), 1.08, "0% 60%"); SHAKE("#world", W(4.4), 5, 12);
F("#phone", { scale: 1.2 }, { scale: 1, duration: 0.6, ease: "power3.inOut" }, W(4.95));
OUT("#h1", W(5.3));

// ato 2 (5,3–10,5 s): ele já abriu o anúncio
const a = lines(190, [["sm", [["Pra", W(5.5)], ["mandar", W(5.6)], ["isso,", W(6.0)]]], ["big", [["ele", W(6.6)], ["já", W(6.8)], ["abriu", W(6.96)]]], ["big lm", [["o", W(7.32)], ["anúncio.", W(7.44)]]]]);
F("#anun", { opacity: 0, y: 700 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" }, W(6.6));
OUT(a, W(8.15));
const b = lines(190, [["mid", [["Já", W(8.31)], ["viu", W(8.4)], ["as", W(8.64)], ["fotos.", W(8.8)]]], ["mid", [["O", W(9.48)], ["preço.", W(9.6)]]], ["mid", [["O", W(10.36)], ["bairro.", W(10.64)]]]]);
POP("#ck1", W(8.8)); PULSE(".fotos", W(8.8), 1.04);
POP("#ck2", W(9.6)); PULSE(".ap", W(9.6), 1.1, "0% 50%");
POP("#ck3", W(10.64)); PULSE(".ab", W(10.64), 1.1, "0% 50%");
OUT(b, W(11.2));
F("#anun", { opacity: 1, y: 0 }, { opacity: 0, y: 700, duration: 0.35, ease: "power2.in" }, W(11.2));

// ato 3 (10,6–14,8 s): o que ele quer saber de verdade
const c = lines(190, [["sm", [["Ele", W(11.33)], ["não", W(11.44)], ["quer", W(11.68)], ["saber", W(11.84)]]], ["sm", [["se", W(12.2)], ["está", W(12.32)], ["disponível.", W(12.56)]]]]);
OUT(c, W(13.6));
const c2 = lines(190, [["big", [["Quer", W(13.76)], ["saber", W(13.92)]]], ["big lm", [["se", W(14.4)], ["pode", W(14.72)]]], ["big lm", [["ir", W(15.12)], ["ver.", W(15.28)]]]]);
F("#phone", { scale: 1 }, { scale: 1.12, duration: 0.5, ease: "power2.out" }, W(13.7));
HIDE("#qa", W(14.6)); SHOW("#qb", W(14.72));
F("#q", { backgroundColor: "#1E1F1C", boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { backgroundColor: "#243A12", boxShadow: "0 0 70px 14px rgba(184,255,79,0.45)", duration: 0.35 }, W(14.72));
OUT(c2, W(15.9));

// ato 4 (14,8–17 s): o nome da coisa
const d = lines(190, [["sm", [["É", W(15.98)], ["um", W(16.04)]]], ["huge", [["pedido", W(16.16)]]], ["huge", [["de", W(16.6)], ["visita", W(16.72)]]], ["serif lm", [["disfarçado.", W(17.32)]]]]);
SHAKE("#world", W(16.16), 5, 12);
PULSE("#q", W(17.32), 1.08, "0% 50%");
OUT(d, W(18.3));
F("#phone", { scale: 1.12 }, { scale: 1, duration: 0.4, ease: "power2.inOut" }, W(18.3));
HIDE("#qb", W(18.3)); SHOW("#qa", W(18.45));
F("#q", { backgroundColor: "#243A12", boxShadow: "0 0 70px 14px rgba(184,255,79,0.45)" }, { backgroundColor: "#1E1F1C", boxShadow: "0 0 0 0 rgba(184,255,79,0)", duration: 0.3 }, W(18.3));

// ato 5 (17–19,4 s): a resposta errada
const e = lines(190, [["sm", [["Então", W(18.4)], ["não", W(18.88)], ["responde", W(19.12)]]], ["huge rd", [["“está", W(19.84)]]], ["huge rd", [["sim”.", W(20.32)]]]]);
BUB("#no", W(19.84)); MARK("#no", W(20.45));
OUT(e, W(20.95));
F("#no", { filter: "brightness(1)" }, { filter: "brightness(0.45)", duration: 0.3 }, W(21.6));

// ato 6 (19,5–24,5 s): a resposta certa, com dois horários
const f = lines(190, [["sm", [["Responde", W(21.09)]]], ["big lm", [["com", W(21.9)], ["dois", W(22.48)]]], ["big lm", [["horários.", W(23.04)]]]]);
BUB("#ok", W(21.7));
typeWords("#okt", [["Está,", W(21.76)], ["e", W(22.48)], ["dá", W(22.59)], ["pra", W(22.72)], ["ver", W(22.88)], ["amanhã", W(23.04)], ["às", W(23.4)], ["10h", W(23.8)], ["ou", W(24.08)], ["sábado", W(24.4)], ["de", W(24.76)], ["manhã.", W(24.88)], ["Qual", W(25.44)], ["fica", W(25.64)], ["melhor?", W(25.92)]]);
F("#ok", { boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { boxShadow: "0 0 80px 20px rgba(184,255,79,0.5)", duration: 0.4, yoyo: true, repeat: 1 }, W(25.92));
MARK("#ok", W(26.3));

// a porta (24,6 s até o fim)
porta(W(26.75), "comenta", "Testa hoje.", "E comenta aqui o que ele respondeu.");
