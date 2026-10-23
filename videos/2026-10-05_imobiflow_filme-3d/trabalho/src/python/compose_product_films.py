"""Turn Blender's five 3D keyframes into two finished social videos with FFmpeg."""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
PREVIEWS = ROOT / "previews"
DELIVERABLES = ROOT / "deliverables"
AUDIO = ROOT / "assets" / "audio" / "imobiflow_original_score.wav"
FPS = 24
OUTPUT_SECONDS = 12
SHOT_FRAMES = 68
SHOT_SECONDS = SHOT_FRAMES / FPS
XFADE_SECONDS = 0.5
FORMATS = {
    "landscape": (1920, 1080, "ImobiFlow_ProductFilm_16x9_1080p.mp4"),
    "portrait": (1080, 1920, "ImobiFlow_ProductFilm_9x16_1080x1920.mp4"),
}


def ffmpeg_executable(override: str | None) -> str:
    if override:
        return override
    tool_root = Path(r"D:\dev\.tools\ffmpeg")
    matches = sorted(tool_root.glob("*/bin/ffmpeg.exe"))
    if not matches:
        raise FileNotFoundError(
            f"FFmpeg not found under {tool_root}. Pass --ffmpeg with its full path."
        )
    return str(matches[-1])


def create_filter(width: int, height: int) -> str:
    parts: list[str] = []
    for index in range(5):
        shot_filter = (
            f"[{index}:v]"
            f"scale={width}:{height}:flags=lanczos,"
            f"zoompan=z='1+0.045*on/{SHOT_FRAMES - 1}':"
            "x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':"
            f"d={SHOT_FRAMES}:s={width}x{height}:fps={FPS},"
        )
        if index == 4 and height > width:
            # Preserve the Blender-built 3D mark and finish the vertical end
            # card with clean typography after clearing residual stage geometry.
            shot_filter += (
                "drawbox=x=0:y=0:w=iw:h=680:color=black:t=fill,"
                "drawbox=x=0:y=980:w=iw:h=520:color=black:t=fill,"
                "drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='IMOBIFLOW':"
                "fontcolor=white:fontsize=104:x=(w-text_w)/2:y=1015,"
                "drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':"
                "text='DO PRIMEIRO OI À PRÓXIMA VISITA':fontcolor=0xB7F15A:"
                "fontsize=42:x=(w-text_w)/2:y=1145,"
                "drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':"
                "text='WhatsApp  ·  IA  ·  CRM  ·  AGENDA':fontcolor=0xD7DADD:"
                "fontsize=38:x=(w-text_w)/2:y=1232,"
                "drawbox=x=280:y=1300:w=520:h=4:color=0xB7F15A:t=fill,"
                "drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':"
                "text='IMÓVEIS EM MOVIMENTO.':fontcolor=white:"
                "fontsize=42:x=(w-text_w)/2:y=1370,"
            )
        shot_filter += "setsar=1,settb=1/24,setpts=PTS-STARTPTS,format=yuv420p"
        shot_filter += f"[shot{index}]"
        parts.append(shot_filter)

    current = "shot0"
    for index in range(1, 5):
        next_label = f"mix{index}"
        offset = index * (SHOT_SECONDS - XFADE_SECONDS)
        parts.append(
            f"[{current}][shot{index}]"
            f"xfade=transition=fade:duration={XFADE_SECONDS}:offset={offset:.6f}"
            f"[{next_label}]"
        )
        current = next_label

    parts.append(
        f"[{current}]tpad=stop_mode=clone:stop_duration=0.15,"
        f"trim=duration={OUTPUT_SECONDS},setpts=PTS-STARTPTS,"
        "fade=t=in:st=0:d=0.35,fade=t=out:st=11.35:d=0.65,"
        "format=yuv420p,setsar=1[v]"
    )
    parts.append(
        f"[5:a]atrim=duration={OUTPUT_SECONDS},asetpts=PTS-STARTPTS,"
        "afade=t=in:st=0:d=0.35,afade=t=out:st=11.2:d=0.8,"
        "volume=0.9[a]"
    )
    return ";".join(parts)


def render_one(ffmpeg: str, mode: str, width: int, height: int, filename: str):
    stills = [PREVIEWS / mode / f"shot_{i:02d}.png" for i in range(1, 6)]
    missing = [str(path) for path in stills if not path.is_file()]
    if missing:
        raise FileNotFoundError("Missing Blender keyframes:\n  " + "\n  ".join(missing))
    if not AUDIO.is_file():
        raise FileNotFoundError(f"Original sound design not found: {AUDIO}")

    output = DELIVERABLES / filename
    output.parent.mkdir(parents=True, exist_ok=True)
    cmd = [ffmpeg, "-hide_banner", "-y", "-loglevel", "warning"]
    for still in stills:
        cmd += ["-loop", "1", "-framerate", str(FPS), "-t", f"{SHOT_SECONDS:.9f}", "-i", str(still)]
    cmd += ["-i", str(AUDIO)]
    cmd += [
        "-filter_complex", create_filter(width, height),
        "-map", "[v]", "-map", "[a]",
        "-frames:v", str(FPS * OUTPUT_SECONDS),
        "-r", str(FPS), "-fps_mode", "cfr",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
        "-profile:v", "high", "-level:v", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
        "-movflags", "+faststart",
        "-metadata", "title=ImobiFlow — Do primeiro oi à próxima visita",
        "-metadata", "comment=Blender 3D keyframes + original sound design + FFmpeg motion finishing",
        str(output),
    ]
    print(f"Encoding {mode}: {width}x{height}, {FPS} fps, {OUTPUT_SECONDS}s", flush=True)
    subprocess.run(cmd, check=True, cwd=str(ROOT))
    print(f"Created: {output} ({output.stat().st_size / (1024 * 1024):.1f} MiB)", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--format", choices=("all", *FORMATS), default="all")
    parser.add_argument("--ffmpeg", help="FFmpeg executable path; otherwise find the local D: build")
    args = parser.parse_args()
    ffmpeg = ffmpeg_executable(args.ffmpeg)
    formats = FORMATS if args.format == "all" else {args.format: FORMATS[args.format]}
    for mode, (width, height, filename) in formats.items():
        render_one(ffmpeg, mode, width, height, filename)


if __name__ == "__main__":
    main()
