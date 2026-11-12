// gancho escrito desde o quadro 1
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">Ele</span><span class="w">viu</span><span class="w">que</span></div><div class="row big"><span class="w">você</span><span class="w">estava</span></div><div class="row big"><span class="w lm">online.</span></div>';
$("#type").appendChild(h1);
const ANEL = (at, n = 3) => F("#anel", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.12, duration: 0.22, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, at);
const TROCA = (de, para, at) => { HIDE(de, at, 0.01); SHOW(para, at, 0.01); PULSE("#rel", at, 1.12); };

// ato 1 (0–2,3 s): close no "online"
gsap.set("#phone", { scale: 1.3, transformOrigin: "40% 6%" });
SHAKE("#phone", 0.02, 13, 8);
ANEL(0.05, 4);
PULSE("#h1 .lm", W(1.48), 1.1, "0% 60%");
OUT("#h1", W(2.25));
F("#phone", { scale: 1.3 }, { scale: 1, duration: 0.55, ease: "power3.inOut" }, W(2.3));

// ato 2 (2,4–6,5 s): o que apareceu em cima da conversa
const a = lines(190, [["sm", [["O", W(2.38)], ["cliente", W(2.48)], ["mandou", W(2.88)], ["mensagem,", W(3.36)]]], ["sm", [["e", W(3.96)], ["em", W(4.12)], ["cima", W(4.29)], ["da", W(4.48)], ["conversa", W(4.68)]]], ["sm", [["apareceu:", W(5.12)]]], ["huge lm", [["online.", W(6.08)]]]]);
BUB("#m1", W(3.36));
ANEL(W(6.08), 3); SHAKE("#world", W(6.08), 5, 10);
OUT(a, W(6.95));

// ato 3 (6,8–10,2 s): o que estava acontecendo de verdade
const b = lines(190, [["sm", [["Você", W(7.15)], ["estava", W(7.28)], ["respondendo", W(7.72)]]], ["big", [["outro", W(8.24)]]], ["big", [["cliente.", W(8.56)]]], ["serif rd", [["Ele", W(9.58)], ["não", W(9.68)], ["sabe", W(9.92)], ["disso.", W(10.24)]]]]);
F("#outro", { opacity: 0, x: 300, rotation: 6 }, { opacity: 1, x: 0, rotation: -3, duration: 0.45, ease: "back.out(1.5)" }, W(7.72));
F("#outro .d", { opacity: 1 }, { opacity: 0.35, duration: 0.3, repeat: 7, yoyo: true }, W(8.2));
OUT(b, W(10.9));
F("#outro", { opacity: 1, x: 0 }, { opacity: 0, x: 300, duration: 0.3, ease: "power2.in" }, W(10.9));

// ato 4 (10,3–13,7 s): o que ele vê, com o tempo passando
const c = lines(190, [["sm", [["O", W(11.03)], ["que", W(11.12)], ["ele", W(11.28)], ["vê:", W(11.52)]]], ["big", [["“Está", W(12.96)], ["aí.", W(13.2)]]], ["big rd", [["E", W(13.64)], ["não", W(13.84)], ["me", W(14.0)]]], ["big rd", [["respondeu.”", W(14.2)]]]]);
POP("#rel", W(11.52)); SHOW("#t1", W(11.52), 0.01);
TROCA("#t1", "#t2", W(12.6)); TROCA("#t2", "#t3", W(13.84));
F("#rel", { borderColor: "#3A3B36", color: "#ECECE4" }, { borderColor: "#FF5A5E", color: "#FF5A5E", duration: 0.2 }, W(13.84));
ANEL(W(12.96), 3);
SHAKE("#world", W(14.2), 5, 12);
OUT(c, W(14.95));

// ato 5 (14–16,9 s): como ele lê a espera
const d = lines(190, [["sm", [["Pra", W(15.07)], ["ele,", W(15.2)], ["não", W(15.76)], ["é", W(15.92)], ["demora.", W(16.12)]]], ["big", [["É", W(16.87)]]], ["big rd", [["desinteresse.", W(17.04)]]]]);
F("#screen", { filter: "grayscale(0) brightness(1)" }, { filter: "grayscale(0.9) brightness(0.7)", duration: 0.5 }, W(17.04));
SHAKE("#world", W(17.04), 7, 14);
OUT(d, W(18.3));

// ato 6 (17–19,1 s): ele só chama o próximo
const e = lines(190, [["sm", [["E", W(18.38)], ["ele", W(18.48)], ["não", W(18.64)], ["reclama.", W(18.8)]]], ["big", [["Só", W(19.59)], ["chama", W(19.76)]]], ["big rd", [["o", W(19.96)], ["próximo.", W(20.08)]]]]);
const VIRA = (at, fn) => {
  F("#phone", { rotationY: 0, x: 0 }, { rotationY: 70, x: 120, duration: 0.18, ease: "power2.in" }, at);
  fn(at + 0.18);
  F("#phone", { rotationY: -70, x: -120 }, { rotationY: 0, x: 0, duration: 0.32, ease: "back.out(1.4)" }, at + 0.19);
};
VIRA(W(19.59), (t) => { tl.set("#cA", { opacity: 0 }, t); tl.set("#cB", { opacity: 1 }, t); tl.set("#nm1", { opacity: 0 }, t); tl.set("#nm2", { opacity: 1 }, t); tl.set("#av1", { opacity: 0 }, t); tl.set("#av2", { opacity: 1 }, t); tl.set("#rel", { opacity: 0 }, t); tl.set("#screen", { filter: "grayscale(0) brightness(1)" }, t); });
BUB("#m3", W(20.08));
OUT(e, W(20.85));

// ato 7 (19,4–23,5 s): a virada
const f = lines(190, [["sm", [["Responder", W(22.0)], ["todo", W(22.64)], ["mundo", W(22.96)]]], ["sm", [["na", W(23.28)], ["mesma", W(23.44)], ["hora?", W(23.76)]]], ["big lm", [["A", W(24.4)], ["Kalli", W(24.56)]]], ["big lm", [["consegue.", W(24.88)]]]]);
VIRA(W(20.9), (t) => { tl.set("#cA", { opacity: 1 }, t); tl.set("#cB", { opacity: 0 }, t); tl.set("#nm1", { opacity: 1 }, t); tl.set("#nm2", { opacity: 0 }, t); tl.set("#av1", { opacity: 1 }, t); tl.set("#av2", { opacity: 0 }, t); tl.set("#t3", { opacity: 0 }, t); tl.set("#rel", { borderColor: "#B8FF4F", color: "#B8FF4F", top: 640 }, t); });
BUB("#m2", W(24.4), "0% 100%");
F("#m2", { boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { boxShadow: "0 0 80px 20px rgba(184,255,79,0.5)", duration: 0.4, yoyo: true, repeat: 1 }, W(24.5));
POP("#rel", W(24.88)); SHOW("#t4", W(24.88), 0.01);

// a porta
porta(W(25.75), "direct", "<span style=\"font-size:108px\">Manda “teste”<br/>no direct</span>", "e eu libero 7 dias pra você.");
