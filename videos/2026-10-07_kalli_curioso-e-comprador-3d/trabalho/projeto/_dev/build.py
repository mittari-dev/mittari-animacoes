"""Gera o index.html do W02.

Uso: python _dev/build.py [corretor|imob] [site|whatsapp|reels]

A cena foi desenhada no tempo da narração antiga (Mark). Cada versão tem a sua
narração (Sandro Dutra); o script alinha as palavras das duas e remapeia todos
os tempos da cena para a voz da versão. As falas que só existem na versão
imobiliária entram com o tempo real (IMOB, `abs: true`).

Final v2 (07/10): depois de "paga N anos de Kalli" entra o trecho dos recursos
("responde às 22h, lembra o cliente da visita, monta o seu site / passa para o
próximo" + "o próximo comprador pode chamar hoje à noite"). No tempo antigo esse
trecho não existe: o mapa segura o tempo antigo em HOLD enquanto o tempo novo
anda de G0 a G1, e a cena dos recursos (FEAT) é desenhada em tempo real.

`reels` = versão em pé (1080×1920), com o fim "link na bio".
"""
import json, re, sys, difflib

AUD = sys.argv[1] if len(sys.argv) > 1 else "corretor"
CTA_V = sys.argv[2] if len(sys.argv) > 2 else "site"
FMT = "v" if CTA_V == "reels" else "h"

h = open("_dev/head.html", encoding="utf-8").read().replace("#word { position:absolute; left:1100px", "#word { position:absolute; left:998px")
c = open("_dev/scene-classic.js", encoding="utf-8").read()
m = open("_dev/scene-module.js", encoding="utf-8").read()

def words(p):
    d = json.load(open(p, encoding="utf-8"))["words"]
    return [w for w in d if w["type"] == "word" and not w["text"].startswith("[") and not w["text"].endswith("]")]
norm = lambda s: re.sub(r"[^\wà-ú]", "", s.lower())

OLD = words("_dev/old-words.json")
NEW = words("_dev/new-words-v2.json" if AUD == "corretor" else "_dev/imob-words-v2.json")
FS0 = 45.60 if AUD == "corretor" else 48.81   # onde começa o trecho novo na narração emendada
OLD_DUR = 49.8
DUR = round(NEW[-1]["end"] + 2.04, 2)

def T(word, nth=1, after=0.0):
    """Tempo real (voz da versão) da n-ésima ocorrência de uma palavra depois de `after`."""
    k = 0
    for w in NEW:
        if w["start"] >= after and norm(w["text"]) == norm(word):
            k += 1
            if k == nth:
                return round(w["start"], 3)
    raise SystemExit(f"palavra não achada: {word}")

sm = difflib.SequenceMatcher(None, [norm(w["text"]) for w in OLD], [norm(w["text"]) for w in NEW], autojunk=False)
MO, MN = [0.0], [0.0]
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        o, n = OLD[blk.a + k]["start"], NEW[blk.b + k]["start"]
        if o > MO[-1] and n > MN[-1]:
            MO.append(o); MN.append(n)
MO.append(OLD_DUR); MN.append(DUR)

# o trecho dos recursos: segura o tempo antigo em HOLD
HOLD = 44.5
fs = T("e", after=FS0 - 0.1)
TESTE = T("teste", after=FS0)
G0, G1 = round(fs - 0.35, 3), round(TESTE - 0.55, 3)
pairs = [(o, n) for o, n in zip(MO, MN) if not (HOLD - 0.01 < o < 45.0)]
pairs += [(HOLD, G0), (HOLD + 0.0005, G1)]
pairs.sort()
MO, MN = [p[0] for p in pairs], [p[1] for p in pairs]
assert all(MN[i] < MN[i + 1] for i in range(len(MN) - 1)), "mapa novo fora de ordem"

def M(x):
    for i in range(len(MO) - 1):
        if x <= MO[i + 1]:
            k = (x - MO[i]) / ((MO[i + 1] - MO[i]) or 1)
            return MN[i] + (MN[i + 1] - MN[i]) * k
    return MN[-1] + (x - MO[-1])

# ---------------- falas do trecho novo (tempo real) ----------------
t = lambda w, after=fs - 0.05, nth=1: T(w, nth, after)
B1, B2 = fs, t("lembra")
B3 = T("e", after=t("visita"))
L1 = {"a": fs - 0.05, "b": B2 - 0.12, "rows": [
    ["sm", [["E", fs], ["ela", t("ela")], ["ainda", t("ainda")]]],
    ["big", [["responde", t("responde")]]],
    ["serif", [["às", t("às")], ["22h", t("dez"), "lm"], ["de", t("de", after=t("noite"))], ["sábado.", t("sábado")]]]]}
L2 = {"a": B2 - 0.05, "b": B3 - 0.12, "rows": [
    ["big", [["lembra", B2], ["o", t("o", after=B2)], ["cliente", t("cliente")]]],
    ["serif", [["da", t("da", after=t("cliente"))], ["visita.", t("visita"), "lm"]]]]}
if AUD == "corretor":
    p3 = t("site")
    L3rows = [["sm", [["e", B3]]],
              ["big", [["monta", t("monta")], ["o", t("o", after=t("monta"))], ["seu", t("seu", after=t("monta"))], ["site.", p3, "lm"]]]]
    SW = 0
else:
    p3 = t("próximo", after=t("passa"))
    L3rows = [["sm", [["e,", B3], ["se", t("se", after=B3)], ["um", t("um", after=B3)], ["corretor", t("corretor", after=B3)], ["não", t("não", after=B3)], ["atende,", t("atende")]]],
              ["big", [["passa", t("passa")], ["para", t("para", after=t("passa"))], ["o", t("o", after=t("passa"))], ["próximo.", p3, "lm"]]]]
    SW = t("passa")
B4 = T("o", after=p3 + 0.1)
L3 = {"a": B3 - 0.05, "b": B4 - 0.12, "rows": L3rows}
B5 = T("chamar", after=B4)
L4 = {"a": B4 - 0.05, "b": TESTE - 0.3, "rows": [
    ["sm", [["O", B4], ["próximo", T("próximo", after=B4)], ["comprador", T("comprador", after=B4)]]],
    ["big", [["pode", T("pode", after=B4)], ["chamar", B5]]],
    ["serif", [["hoje", T("hoje", after=B4), "lm"], ["à", T("à", after=B4)], ["noite.", T("noite", after=B4), "lm"]]]]}
FEAT = {"G0": G0, "G1": G1, "B1": B1, "B2": B2, "B3": B3, "B4": B4, "B5": B5, "SW": SW, "LINES": [L1, L2, L3, L4]}

IMOB = {}
if AUD == "imob":
    IMOB = {
        2: {"abs": True, "a": T("mas") - 0.05, "b": T("agora") - 0.15, "rows": [
            ["sm", [["Mas,", T("mas")], ["no", T("no")], ["meio", T("meio")], ["delas,", T("delas")]]],
            ["big", [["o", T("alguém")], ["comprador", T("pronto"), "lm"]]],
            ["serif", [["espera", T("espera")], ["na", T("na", after=T("espera"))], ["fila,", T("fila")]]],
            ["sm", [["no", T("no", after=T("fila"))], ["WhatsApp", T("whatsapp")], ["de", T("de", after=T("whatsapp"))], ["quem", T("quem", after=T("whatsapp"))], ["estiver", T("estiver")], ["livre.", T("livre")]]]]},
        7: {"abs": True, "a": T("marca") - 0.3, "b": T("se", after=T("tudo")) - 0.35, "rows": [
            ["sm", [["E", T("marca") - 0.12], ["marca", T("marca")], ["a", T("a", after=T("marca"))], ["visita,", T("visita")], ["com", T("com", after=T("pronto", 2))], ["o", T("o", after=T("pronto", 2))], ["corretor", T("corretor")], ["certo.", T("certo")]]],
            ["big", [["você", T("você", after=T("certo"))], ["vê", T("vê")], ["tudo.", T("tudo"), "lm"]]]]},
        9: {"abs": True, "a": T("sua", after=T("conversa")) - 0.05, "b": T("uma", after=T("equipe")) - 0.2, "rows": [
            ["big", [["Sua", T("sua", after=T("conversa"))], ["equipe", T("equipe")], ["só", T("só", after=T("equipe"))], ["fala", T("fala")]]],
            ["serif", [["com", T("com", after=T("fala"))], ["quem", T("quem", after=T("fala"))], ["já", T("já", after=T("fala"))], ["quer", T("quer", after=T("fala"))], ["ver", T("ver", after=T("fala"))], ["o", T("o", after=T("ver", after=T("fala")))], ["imóvel.", T("imóvel", after=T("fala")), "lm"]]]]},
        10: {"abs": True, "a": T("uma", after=T("equipe")) - 0.08, "b": G0 + 0.3, "rows": [
            ["sm", [["Uma", T("uma", after=T("equipe"))], ["venda", T("venda")], ["que", T("que", after=T("venda"))], ["não", T("não", after=T("venda"))], ["se", T("se", after=T("venda"))], ["perde", T("perde")], ["na", T("no", after=T("perde"))], ["fila", T("fila", after=T("perde"))]]],
            ["big", [["paga", T("paga")], ["quase", T("quase")], ["3", T("três"), "lm"], ["anos", T("anos"), "lm"], ["de", T("de", after=T("anos"))], ["Kalli.", T("kalli", after=T("anos"))]]]]},
        11: {"abs": True, "a": TESTE - 0.05, "b": 999, "rows": [
            ["big", [["Teste", TESTE], ["na", T("na", after=TESTE)], ["sua", T("sua", after=TESTE)], ["imobiliária.", T("imobiliária", after=TESTE)]]],
            ["serif", [["Sete", T("sete", after=TESTE)], ["dias,", T("dias", after=TESTE)], ["de", T("de", after=T("dias", after=TESTE))], ["graça.", T("graça"), "lm"]]]]},
    }

voz = "assets/narracao-sandro-v2.mp3" if AUD == "corretor" else "assets/narracao-sandro-imob-v2.mp3"
vdur = "57.84" if AUD == "corretor" else "63.05"
h = h.replace('data-duration="49.8"', f'data-duration="{DUR}"')
h = re.sub(r'<audio id="a-voz" src="[^"]+" data-start="0" data-duration="[0-9.]+"', f'<audio id="a-voz" src="{voz}" data-start="0" data-duration="{vdur}"', h)
h = re.sub(r'(<audio id="a-(?!voz)[^"]+" src="[^"]+" data-start=")([0-9.]+)', lambda mm: mm.group(1) + "%.2f" % M(float(mm.group(2))), h)
# efeitos do trecho novo (tempo real)
sfx = [("f1", "sfx-pop", B1 + 0.35, 0.6), ("f2", "sfx-pop", B2 + 0.35, 0.6), ("f3", "sfx-pop", B3 + 0.35, 0.6),
       ("fw", "sfx-whoosh", B4 - 0.25, 0.45), ("fn", "sfx-notif", B5 + 0.05, 0.8), ("fv", "sfx-vibra", B5 + 0.05, 0.6)]
if AUD == "imob": sfx.append(("ft", "sfx-tick", SW, 0.6))
extra = "".join(f'\n  <audio id="a-{i}" src="assets/{f}.mp3" data-start="{s:.2f}" data-duration="{1 if f in ("sfx-vibra", "sfx-whoosh") else 0.5}" data-volume="{v}"></audio>' for i, f, s, v in sfx)
h = h.replace('\n</div>\n<script>', extra + '\n</div>\n<script>', 1)
if AUD == "imob":
    h = h.replace("<i>✓</i>marcou a visita</div>", "<i>✓</i>marcou com o corretor certo</div>")
    h = h.replace("<i>✓</i>avisou você</div>", "<i>✓</i>você vê tudo</div>")
    h = h.replace("÷ <b>R$ 397</b> por mês de Kalli = <b>60 meses</b>", "÷ <b>R$ 697</b> por mês (plano Imobiliária) = <b>34 meses</b>")
sub = "na sua imobiliária" if AUD == "imob" else "no seu número"
CTA = {"site": f'<div class="btn">Começar o teste grátis →</div><div class="ctasub">7 dias · {sub} · kalli.mittari.com.br</div>',
       "whatsapp": f'<div class="wa">Responda esta mensagem<br>e eu <b>ativo o seu teste</b>.</div><div class="ctasub">7 dias · {sub}</div>',
       "reels": f'<div class="btn">Teste grátis: link na bio</div><div class="ctasub">7 dias · {sub}</div>'}
if FMT == "v":
    h = h.replace('data-width="1920" data-height="1080"', 'data-width="1080" data-height="1920"')
    h = h.replace('<canvas id="gl" width="1920" height="1080"', '<canvas id="gl" width="1080" height="1920"')
    h = h.replace("</style>", """
#root { width:1080px; height:1920px; }
#bg { background:radial-gradient(ellipse 80% 55% at 50% 30%, #15180f 0%, #0a0a0a 55%, #060606 100%); }
#glow { left:90px; top:110px; }
#gl { width:1080px; height:1920px; }
.ln { left:70px; width:940px; top:1150px; }
.big { font-size:84px; }
.serif { font-size:74px; }
#rail { display:none; }
#foot { left:70px; top:1400px; width:940px; }
#count { left:70px; top:1500px; }
#cta { left:70px; top:1420px; }
#word { left:0px !important; width:1080px; top:850px; }
#vig { background:radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%); }
</style>""", 1)
c = c.replace("/*DUR*/", str(DUR)).replace("/*MAPO*/", json.dumps(MO)).replace("/*MAPN*/", json.dumps(MN))
c = c.replace("/*VARIANT*/", CTA_V).replace("/*AUD*/", AUD).replace("/*IMOB*/", json.dumps(IMOB, ensure_ascii=False))
c = c.replace("/*FMT*/", FMT).replace("/*FEAT*/", json.dumps(FEAT, ensure_ascii=False))
out = h.replace("/*CTA*/", CTA[CTA_V]).replace("/*CLASSIC*/", c).replace("/*MODULE*/", m)
open("index.html", "w", encoding="utf-8").write(out)
print(AUD, CTA_V, FMT, "DUR", DUR, "G0", G0, "G1", G1, "B", B1, B2, B3, B4, B5)
