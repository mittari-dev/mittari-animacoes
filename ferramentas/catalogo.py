"""Inventário da biblioteca: sons, trilhas, narrações, imagens e 3D que já existem no repositório.

Uso: python ferramentas/catalogo.py   (escreve industria/biblioteca/inventario.md)

Junta arquivos iguais (mesmo conteúdo) numa linha só e conta em quantas peças cada um aparece.
Duração dos áudios pelo ffprobe, se houver (PATH, FFMPEG_DIR ou D:/dev/.tools/ffmpeg/*/bin).
"""
import glob, hashlib, os, shutil, subprocess, sys
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TIPOS = {
    "Trilhas": lambda n, e: e in (".mp3", ".wav") and ("trilha" in n or "music" in n or "bgm" in n),
    "Narrações (vozes)": lambda n, e: e in (".mp3", ".wav") and ("narra" in n or "take" in n or "voz" in n or "vo-" in n),
    "Efeitos sonoros": lambda n, e: e in (".mp3", ".wav"),
    "Objetos 3D": lambda n, e: e in (".blend", ".glb", ".gltf", ".obj", ".fbx"),
    "Imagens": lambda n, e: e in (".png", ".jpg", ".jpeg", ".webp", ".svg") and "cap_" not in n and "frame-" not in n,
}
PULAR = ("node_modules", ".git", "final", "revisao", "snapshots", ".github", "galeria")

def ffprobe():
    d = os.environ.get("FFMPEG_DIR")
    if d: return os.path.join(d, "ffprobe.exe")
    return shutil.which("ffprobe") or next(iter(glob.glob("D:/dev/.tools/ffmpeg/*/bin/ffprobe.exe")), None)

def duracao(fp, arq):
    if not fp: return ""
    r = subprocess.run([fp, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", arq], capture_output=True, text=True)
    try: return f"{float(r.stdout.strip()):.1f} s"
    except ValueError: return ""

def eh_ponteiro_lfs(arq):
    if os.path.getsize(arq) > 300: return False
    with open(arq, "rb") as f: return f.read(40).startswith(b"version https://git-lfs")

def peca(rel):
    p = rel.replace("\\", "/").split("/")
    return "/".join(p[:3]) if p[0] == "videos" and "leva" in p[1] else "/".join(p[:2])

def main():
    fp = ffprobe()
    grupos = {t: {} for t in TIPOS}
    for base in ("videos", "pecas", "marcas"):
        for raiz, dirs, arqs in os.walk(os.path.join(RAIZ, base)):
            dirs[:] = [d for d in dirs if d not in PULAR]
            for a in arqs:
                n, e = a.lower(), os.path.splitext(a)[1].lower()
                tipo = next((t for t, f in TIPOS.items() if f(n, e)), None)
                if not tipo: continue
                arq = os.path.join(raiz, a)
                if eh_ponteiro_lfs(arq): continue
                h = hashlib.md5(open(arq, "rb").read()).hexdigest()
                rel = os.path.relpath(arq, RAIZ).replace("\\", "/")
                g = grupos[tipo].setdefault(h, {"nome": a, "primeiro": rel, "pecas": set(), "kit": None})
                g["pecas"].add(rel)
                if rel.startswith("marcas/"): g["kit"] = rel
    out = ["# Inventário da biblioteca", "", "Gerado por `python ferramentas/catalogo.py`. Arquivos iguais aparecem numa linha só. Não edite à mão: rode o script de novo.", ""]
    for tipo, itens in grupos.items():
        lista = sorted(itens.values(), key=lambda g: (-len(g["pecas"]), g["nome"]))
        total = len(lista)
        if tipo == "Imagens":  # shortcut: só as reaproveitadas; as de uma peça só ficam na pasta da peça
            lista = [g for g in lista if len(g["pecas"]) > 1 or g["kit"]]
        out += [f"## {tipo} ({total} diferentes" + (f", {len(lista)} reaproveitadas abaixo" if tipo == "Imagens" else "") + ")", "", "| Arquivo | Duração | Cópias no repositório | Onde pegar |", "|---|---|---|---|"]
        for g in lista:
            dur = duracao(fp, os.path.join(RAIZ, g["kit"] or g["primeiro"])) if tipo != "Imagens" and tipo != "Objetos 3D" else ""
            onde = g["kit"] or g["primeiro"]
            out.append(f"| `{g['nome']}` | {dur} | {len(g['pecas'])} | `{onde}` |")
        out.append("")
    os.makedirs(os.path.join(RAIZ, "industria/biblioteca"), exist_ok=True)
    open(os.path.join(RAIZ, "industria/biblioteca/inventario.md"), "w", encoding="utf-8", newline="\n").write("\n".join(out))
    print({t: len(i) for t, i in grupos.items()})

if __name__ == "__main__":
    main()
