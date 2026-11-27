"""Portão 4 da Indústria de Postagem: conferência técnica de um vídeo renderizado.

Uso:
  python ferramentas/conferir-render.py <video.mp4> [--tamanho 1080x1920] [--capturas <pasta>] [--json]
  python ferramentas/conferir-render.py --teste      (confere os leitores com saídas de exemplo, sem ffmpeg)

Confere: tamanho, quadros por segundo, codec, áudio, volume integrado (LUFS), som no quadro 1
e trechos parados por mais de 2 s. Com --capturas, salva uma imagem a cada 2 s para o portão 3.
Sai com código 1 se alguma conferência obrigatória falhar.
Precisa do ffmpeg: no PATH, na variável FFMPEG_DIR, ou em D:/dev/.tools/ffmpeg/*/bin.
"""
import glob, json, os, re, shutil, subprocess, sys

LUFS_ALVO, LUFS_FOLGA = -14.0, 2.0
SOM_INICIO_DB = -40.0      # o primeiro 0,15 s precisa ter pico acima disso
PARADO_S = 2.0

def achar(exe):
    d = os.environ.get("FFMPEG_DIR")
    if d and os.path.exists(os.path.join(d, exe + ".exe")):
        return os.path.join(d, exe + ".exe")
    if shutil.which(exe):
        return shutil.which(exe)
    achados = glob.glob(f"D:/dev/.tools/ffmpeg/*/bin/{exe}.exe")
    if achados:
        return achados[0]
    sys.exit(f"{exe} não encontrado. Instale o ffmpeg ou defina FFMPEG_DIR.")

def rodar(args):
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")

# ---- leitores (puros, testados em --teste) ----
def ler_lufs(stderr):
    m = re.findall(r"I:\s+(-?\d+(?:\.\d+)?) LUFS", stderr)
    return float(m[-1]) if m else None

def ler_pico(stderr):
    m = re.search(r"max_volume:\s+(-?(?:\d+(?:\.\d+)?|inf)) dB", stderr)
    if not m:
        return None
    return float("-inf") if "inf" in m.group(1) else float(m.group(1))

def ler_parados(stderr):
    ini = [float(x) for x in re.findall(r"freeze_start:\s*([\d.]+)", stderr)]
    dur = [float(x) for x in re.findall(r"freeze_duration:\s*([\d.]+)", stderr)]
    return [(round(a, 2), round(b, 2)) for a, b in zip(ini, dur)]

def ler_fps(txt):
    n, d = txt.split("/") if "/" in txt else (txt, "1")
    return round(float(n) / float(d), 2) if float(d) else 0.0

# ---- conferência ----
def conferir(video, tamanho="1080x1920", capturas=None):
    if not os.path.isfile(video):
        sys.exit(f"Arquivo não encontrado: {video}")
    ffprobe, ffmpeg = achar("ffprobe"), achar("ffmpeg")
    sonda = rodar([ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", video])
    if sonda.returncode != 0:
        sys.exit(f"O ffprobe não conseguiu ler o vídeo: {sonda.stderr.strip()[:300]}")
    info = json.loads(sonda.stdout or "{}")
    v = next((s for s in info.get("streams", []) if s.get("codec_type") == "video"), {})
    a = next((s for s in info.get("streams", []) if s.get("codec_type") == "audio"), None)
    dur = float(info.get("format", {}).get("duration", 0) or 0)
    r = []  # (nome, ok, obrigatória, detalhe)
    w, h = (int(x) for x in tamanho.split("x"))
    r.append(("tamanho", (v.get("width"), v.get("height")) == (w, h), True, f"{v.get('width')}x{v.get('height')} (pede {tamanho})"))
    fps = ler_fps(v.get("r_frame_rate", "0/1"))
    r.append(("quadros por segundo", fps >= 29.9, True, f"{fps} qps (ideal 60)"))
    r.append(("60 qps", fps >= 59.9, False, "recomendado pela Stack 2.0"))
    r.append(("codec H.264", v.get("codec_name") == "h264", True, str(v.get("codec_name"))))
    r.append(("tem áudio", a is not None, True, a.get("codec_name") if a else "sem faixa de áudio"))
    if a is not None:
        lufs = ler_lufs(rodar([ffmpeg, "-hide_banner", "-nostats", "-i", video, "-af", "ebur128", "-f", "null", "-"]).stderr)
        ok = lufs is not None and abs(lufs - LUFS_ALVO) <= LUFS_FOLGA
        r.append(("volume", ok, True, f"{lufs} LUFS (alvo {LUFS_ALVO} ± {LUFS_FOLGA})"))
        pico = ler_pico(rodar([ffmpeg, "-hide_banner", "-nostats", "-t", "0.15", "-i", video, "-af", "volumedetect", "-f", "null", "-"]).stderr)
        r.append(("som no quadro 1", pico is not None and pico > SOM_INICIO_DB, True, f"pico de {pico} dB nos primeiros 0,15 s"))
        cheio = ler_pico(rodar([ffmpeg, "-hide_banner", "-nostats", "-i", video, "-af", "volumedetect", "-f", "null", "-"]).stderr)
        r.append(("sem distorção", cheio is not None and cheio <= -1.0, False, f"pico máximo {cheio} dB (acima de -1 dB pode estourar no celular)"))
    fz = rodar([ffmpeg, "-hide_banner", "-nostats", "-i", video, "-vf", f"freezedetect=n=-60dB:d={PARADO_S}", "-map", "0:v:0", "-f", "null", "-"])
    parados = ler_parados(fz.stderr)
    det = "; ".join(f"parado em {s}s por {d}s" for s, d in parados) or "ok"
    r.append(("nada parado mais de 2 s", fz.returncode == 0 and not parados, True, det if fz.returncode == 0 else "o ffmpeg falhou ao ler os quadros"))
    if capturas:
        os.makedirs(capturas, exist_ok=True)
        rodar([ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", video, "-vf", "fps=1/2,scale=360:-1", os.path.join(capturas, "cap_%03d.jpg")])
        r.append(("capturas", True, False, f"{len(glob.glob(os.path.join(capturas, 'cap_*.jpg')))} imagens em {capturas}"))
    return {"video": video, "duracao_s": round(dur, 2), "itens": r, "aprovado": all(ok for _, ok, obr, _ in r if obr)}

def teste():
    assert ler_lufs("Summary:\n  Integrated loudness:\n    I:         -14.3 LUFS\n") == -14.3
    assert ler_lufs("nada") is None
    assert ler_pico("[Parsed_volumedetect_0] max_volume: -3.2 dB") == -3.2
    assert ler_pico("max_volume: -inf dB") == float("-inf")
    s = "lavfi.freezedetect.freeze_start: 4.5\nlavfi.freezedetect.freeze_duration: 2.75\nlavfi.freezedetect.freeze_end: 7.25"
    assert ler_parados(s) == [(4.5, 2.75)]
    assert ler_fps("60/1") == 60.0 and ler_fps("30000/1001") == 29.97
    print("teste ok")

if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        sys.exit(__doc__)
    if args[0] == "--teste":
        teste(); sys.exit(0)
    opc = lambda k, pad=None: args[args.index(k) + 1] if k in args else pad
    res = conferir(args[0], opc("--tamanho", "1080x1920"), opc("--capturas"))
    if "--json" in args:
        print(json.dumps(res, ensure_ascii=False, indent=2))
    else:
        print(f"{res['video']} ({res['duracao_s']} s)")
        for nome, ok, obr, det in res["itens"]:
            print(f"  {'OK ' if ok else ('FALHA' if obr else 'aviso')}  {nome}: {det}")
        print("APROVADO" if res["aprovado"] else "REPROVADO: voltar à etapa 9")
    sys.exit(0 if res["aprovado"] else 1)
