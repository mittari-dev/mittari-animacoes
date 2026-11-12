// gancho escrito desde o quadro 1
const h1 = document.createElement("div"); h1.className = "ln"; h1.id = "h1";
h1.innerHTML = '<div class="row big"><span class="w">Ele</span><span class="w">não</span><span class="w">está</span></div><div class="row big"><span class="w rd">te</span><span class="w rd">esperando.</span></div>';
$("#type").appendChild(h1);

// ato 1 (0–2,6 s): o anúncio aberto
gsap.set("#ab0", { scale: 1.75, transformOrigin: "50% 30%" });
SHAKE("#ab0", 0.02, 11, 8);
F("#ab0", { boxShadow: "0 0 0 0 rgba(184,255,79,0)" }, { boxShadow: "0 0 90px 16px rgba(184,255,79,0.5)", duration: 0.3, yoyo: true, repeat: 5 }, 0.02);
F("#ab0 .on i", { scale: 1 }, { scale: 1.8, duration: 0.3, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0);
PULSE("#h1 .rd", W(1.76), 1.07, "0% 60%");
OUT("#h1", W(3.05));

// ato 2 (3,2–5,2 s): aberto na mão
const a = lines(190, [["sm", [["Ele", W(3.2)], ["está", W(3.36)], ["com", W(3.6)], ["o", W(3.7)], ["anúncio", W(3.76)]]], ["big lm", [["aberto", W(4.28)]]], ["big lm", [["na", W(4.68)], ["mão.", W(4.8)]]]]);
OUT(a, W(5.5));

// ato 3 (5,5–12,6 s): como qualquer pessoa procura
const b = lines(190, [["sm", [["Pensa", W(5.67)], ["em", W(6.04)], ["como", W(6.28)], ["você", W(6.48)], ["procura", W(6.8)]]], ["sm", [["qualquer", W(7.28)], ["coisa", W(7.84)], ["na", W(8.12)], ["internet:", W(8.24)]]], ["mid", [["Senta.", W(9.2)]]], ["mid", [["Abre", W(10.0)], ["várias", W(10.28)], ["abas.", W(10.8)]]], ["mid lm", [["Manda", W(11.36)], ["pra", W(12.16)], ["todos.", W(12.4)]]]]);
F("#ab0", { scale: 1.75 }, { scale: 1.45, duration: 0.5, ease: "power3.inOut" }, W(9.2));
[["#ab1", 10.0], ["#ab2", 10.2], ["#ab3", 10.4], ["#ab4", 10.6]].forEach(([c, t]) => F(c, { opacity: 0, scale: 0.4, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, W(t)));
F("#ab0", { scale: 1.45, opacity: 1, x: 0, y: 0 }, { scale: 1, opacity: 0, x: 230, y: -120, duration: 0.3, ease: "power2.in" }, W(10.0));
["#ab1", "#ab2", "#ab3", "#ab4"].forEach((c, i) => {
  F(c + " .msg", { opacity: 0, scale: 0, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "back.out(2.6)", transformOrigin: "100% 0%" }, W(11.36) + i * 0.4);
  PULSE(c, W(11.36) + i * 0.4, 1.05);
});
OUT(b, W(13.4));

// ato 4 (12,6–15 s): fecha o celular
const c = lines(190, [["big", [["Depois", W(13.57)], ["fecha", W(13.92)]]], ["big", [["o", W(14.2)], ["celular", W(14.36)]]], ["serif", [["e", W(14.96)], ["volta", W(15.12)], ["pra", W(15.44)], ["vida.", W(15.6)]]]]);
F("#apaga", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" }, W(14.36));
SHAKE("#world", W(14.4), 5, 10);
OUT(c, W(16.25));

// ato 5 (15,2–16,5 s): seu cliente faz igual
const d = lines(190, [["huge", [["Seu", W(16.37)]]], ["huge", [["cliente", W(16.48)]]], ["serif lm", [["faz", W(16.96)], ["igual.", W(17.2)]]]]);
OUT(d, W(17.85));
F("#abas", { opacity: 1, y: 0 }, { opacity: 0, y: 120, duration: 0.25, ease: "power2.in" }, W(17.85));

// ato 6 (16,6–21,8 s): a janela
const e = lines(190, [["sm", [["Responde", W(18.16)], ["enquanto", W(18.72)], ["ele", W(19.12)], ["está", W(19.6)], ["ali:", W(19.84)]]], ["big lm", [["conversa.", W(20.4)]]], ["sm", [["Responde", W(21.56)], ["depois:", W(22.04)]]], ["big rd", [["interrompe.", W(22.92)]]]]);
F("#janela", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, W(17.99));
F("#jv", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power1.out" }, W(18.16));
F("#p1", { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, W(20.4));
F("#p2", { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, W(22.92));
SHAKE("#janela", W(22.92), 5, 10);
OUT(e, W(23.7));
F("#janela", { opacity: 1, y: 0 }, { opacity: 0, y: -80, duration: 0.25, ease: "power2.in" }, W(23.7));

// ato 7 (21,9–31 s): a pesquisa
const f = lines(190, [["sm", [["Uma", W(23.82)], ["pesquisa", W(24.0)], ["americana,", W(24.4)]]], ["sm", [["com", W(25.12)], ["mais", W(25.28)], ["de", W(25.52)]]], ["big", [["1", W(25.8)], ["milhão", W(26.0)]]], ["big", [["de", W(26.4)], ["contatos.", W(26.64)]]]]);
tl.set("#pesq", { opacity: 1 }, W(23.82));
F("#rel", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, W(23.9));
F("#rel i", { rotation: 0 }, { rotation: 360, duration: W(30.2) - W(24.4), ease: "none" }, W(24.4));
F("#fonte", { opacity: 0 }, { opacity: 1, duration: 0.3 }, W(24.4));
OUT(f, W(27.95));
const g = lines(190, [["sm", [["Responder", W(28.2)], ["na", W(28.72)]]], ["big lm", [["primeira", W(28.88)]]], ["big lm", [["hora", W(29.44)], ["dá", W(29.76)]]]]);
F("#rel", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power2.in" }, W(30.25));
F("#sete", { opacity: 0, scale: 0.5, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.8)", transformOrigin: "0% 50%" }, W(30.4));
SHAKE("#world", W(30.48), 7, 14);
PULSE("#sete b", W(31.44), 1.05, "0% 50%"); PULSE("#sete b", W(33.04), 1.05, "0% 50%");

// a porta
porta(W(33.9), "comenta", "Comenta “hora”", "que eu te mando a pesquisa.");
