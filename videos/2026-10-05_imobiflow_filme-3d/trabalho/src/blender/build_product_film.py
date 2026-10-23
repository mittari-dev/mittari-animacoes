"""Build and render the ImobiFlow product film in Blender.

All generated files stay inside this project directory. Run with:
  blender.exe --background --python build_product_film.py -- --format all
"""

from __future__ import annotations

import math
import random
import struct
import sys
import wave
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
DELIVERABLES = ROOT / "deliverables"
PROJECTS = ROOT / "project"
AUDIO_DIR = ROOT / "assets" / "audio"
PREVIEWS = ROOT / "previews"
FPS = 24
FRAME_END = 288
DURATION_SECONDS = FRAME_END / FPS
LIME = (0.60, 1.00, 0.18, 1.0)
LIME_SOFT = (0.31, 0.74, 0.10, 1.0)
PAPER = (0.91, 0.92, 0.86, 1.0)
MUTED = (0.47, 0.52, 0.50, 1.0)
INK = (0.018, 0.025, 0.025, 1.0)
CARD = (0.045, 0.064, 0.065, 1.0)
TEAL = (0.12, 0.74, 0.68, 1.0)
BLUE = (0.16, 0.42, 0.61, 1.0)


FORMATS = {
    "landscape": {
        "width": 1920,
        "height": 1080,
        "step": 8.1,
        "ortho": 9.4,
        "axis": "X",
        "filename": "ImobiFlow_ProductFilm_16x9_1080p.mp4",
    },
    "portrait": {
        "width": 1080,
        "height": 1920,
        "step": 3.55,
        "ortho": 9.7,
        "axis": "Y",
        "filename": "ImobiFlow_ProductFilm_9x16_1080x1920.mp4",
    },
}


def parse_format() -> str:
    if "--" not in sys.argv:
        return "all"
    args = sys.argv[sys.argv.index("--") + 1 :]
    for index, arg in enumerate(args):
        if arg == "--format" and index + 1 < len(args):
            value = args[index + 1].lower()
            if value in {"all", *FORMATS}:
                return value
    return "all"


def srgb_channel(value: float) -> float:
    return value / 12.92 if value < 0.04045 else ((value + 0.055) / 1.055) ** 2.4


def hex_color(value: str, alpha: float = 1.0):
    raw = value.lstrip("#")
    rgb = [srgb_channel(int(raw[i : i + 2], 16) / 255) for i in (0, 2, 4)]
    return (*rgb, alpha)


def make_material(name: str, color, *, metallic=0.0, roughness=0.4, emission=0.0):
    material = bpy.data.materials.new(name)
    material.diffuse_color = color
    material.use_nodes = True
    shader = material.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    if emission:
        shader.inputs["Emission Color"].default_value = color
        shader.inputs["Emission Strength"].default_value = emission
    return material


def assign(obj, material):
    obj.data.materials.append(material)
    return obj


def bevel_cube(name, location, dimensions, material, bevel=0.08, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    assign(obj, material)
    if bevel:
        modifier = obj.modifiers.new("Soft machined edges", "BEVEL")
        modifier.width = min(bevel, min(dimensions) * 0.24)
        modifier.segments = 3
        normal = obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")
        normal.keep_sharp = True
    if parent:
        obj.parent = parent
    return obj


def sphere(name, location, radius, material, parent=None, scale=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, radius=radius, location=location)
    obj = bpy.context.object
    obj.name = name
    assign(obj, material)
    bpy.ops.object.shade_smooth()
    if scale:
        obj.scale = scale
    if parent:
        obj.parent = parent
    return obj


def torus(name, location, major, minor, material, parent=None, rotation=None):
    bpy.ops.mesh.primitive_torus_add(
        major_segments=72,
        minor_segments=12,
        location=location,
        major_radius=major,
        minor_radius=minor,
    )
    obj = bpy.context.object
    obj.name = name
    assign(obj, material)
    bpy.ops.object.shade_smooth()
    if rotation:
        obj.rotation_euler = rotation
    if parent:
        obj.parent = parent
    return obj


def text_object(body, location, size, material, *, parent=None, align="CENTER", extrude=0.003):
    data = bpy.data.curves.new(f"Type — {body[:24]}", "FONT")
    data.body = body
    data.size = size
    data.align_x = align
    data.align_y = "CENTER"
    data.extrude = extrude
    data.bevel_depth = 0.0015
    data.bevel_resolution = 1
    obj = bpy.data.objects.new(body[:40], data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    assign(obj, material)
    if parent:
        obj.parent = parent
    return obj


def empty_group(name, anchor, mode, stage_index):
    group = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(group)
    group.location = anchor
    group.empty_display_type = "CIRCLE"
    group.empty_display_size = 0.4
    start = 1 + stage_index * 57
    group.scale = (0.001, 0.001, 0.001)
    group.keyframe_insert(data_path="scale", frame=max(1, start - 6))
    group.scale = (1.0, 1.0, 1.0)
    group.keyframe_insert(data_path="scale", frame=start + 8)
    return group


def local_anchor(mode: str, index: int):
    step = FORMATS[mode]["step"]
    if mode == "landscape":
        return (step * index, 0.0, 0.0)
    return (0.0, step * (2 - index), 0.0)


def setup_world(mode):
    scene = bpy.context.scene
    scene.world = bpy.data.worlds.new("Deep graphite studio")
    scene.world.color = hex_color("#080C12")[:3]


def create_camera(mode):
    cfg = FORMATS[mode]
    data = bpy.data.cameras.new(f"ImobiFlow — {mode} camera")
    camera = bpy.data.objects.new(data.name, data)
    bpy.context.collection.objects.link(camera)
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = cfg["ortho"]
    camera.location = local_anchor(mode, 0)
    camera.location.z = 24
    bpy.context.scene.camera = camera

    for index in range(5):
        start = 1 + index * 57
        camera.location = local_anchor(mode, index)
        camera.location.z = 24
        camera.keyframe_insert(data_path="location", frame=start)
        next_start = start + 57
        if next_start <= FRAME_END:
            camera.keyframe_insert(data_path="location", frame=max(start + 1, next_start - 18))
    return camera


def make_track(mode, materials):
    anchors = [local_anchor(mode, i) for i in range(5)]
    points = []
    for i in range(4):
        a = Vector(anchors[i])
        b = Vector(anchors[i + 1])
        for j in range(12):
            t = j / 12
            pos = a.lerp(b, t)
            if mode == "landscape":
                pos.y += math.sin(t * math.pi) * 0.32
            else:
                pos.x += math.sin(t * math.pi) * 0.32
            pos.z = -0.72
            points.append(pos)
    points.append(Vector(anchors[-1]) + Vector((0, 0, -0.72)))

    curve = bpy.data.curves.new("The lead flow | lime filament", "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 2
    curve.bevel_depth = 0.027
    curve.bevel_resolution = 3
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for point, vec in zip(spline.points, points):
        point.co = (*vec, 1)
    rail = bpy.data.objects.new("A single path from message to visit", curve)
    bpy.context.collection.objects.link(rail)
    assign(rail, materials["flow"])

    for index, anchor in enumerate(anchors):
        center = Vector(anchor)
        center.z = -0.68
        torus(f"Flow waypoint {index + 1}", center, 0.22, 0.022, materials["flow"])
        sphere(f"Flow waypoint core {index + 1}", center, 0.075, materials["spark"])

    bead = sphere("A qualified lead moving through the flow", (0, 0, -0.48), 0.10, materials["spark"])
    total = 4 * 30
    for frame in range(1, FRAME_END + 1, 3):
        progress = ((frame - 8) / total) % 1.0
        segment = min(3, int(progress * 4))
        fraction = progress * 4 - segment
        a = Vector(anchors[segment])
        b = Vector(anchors[segment + 1])
        point = a.lerp(b, fraction)
        if mode == "landscape":
            point.y += math.sin(fraction * math.pi) * 0.32
        else:
            point.x += math.sin(fraction * math.pi) * 0.32
        point.z = -0.48
        bead.location = point
        bead.keyframe_insert(data_path="location", frame=frame)


def stage_label(group, headline, subline, mode, index, materials, y=1.82):
    font_size = 0.34 if mode == "landscape" else 0.39
    sub_size = 0.19 if mode == "landscape" else 0.23
    text_object(headline, (0, y, 0.46), font_size, materials["paper"], parent=group)
    text_object(subline, (0, y - 0.37, 0.46), sub_size, materials["muted"], parent=group)


def make_phone(mode, materials):
    group = empty_group("01 — WhatsApp inquiry", local_anchor(mode, 0), mode, 0)
    phone_y = -0.05 if mode == "landscape" else 0.2
    bevel_cube("Graphite phone frame", (0, phone_y, 0.0), (2.25, 3.45, 0.23), materials["metal"], 0.18, group)
    bevel_cube("Edge-to-edge screen", (0, phone_y, 0.135), (2.04, 3.20, 0.025), materials["screen"], 0.14, group)
    # Phone status and conversation use generous typesetting so the film reads
    # at its final social-media size, including the vertical cut.
    text_object("WhatsApp", (-0.72, phone_y + 1.23, 0.20), 0.19, materials["paper"], parent=group, align="LEFT")
    sphere("WhatsApp status dot", (-0.84, phone_y + 1.23, 0.23), 0.045, materials["lime_glow"], group)
    bevel_cube("Incoming chat bubble", (-0.18, phone_y + 0.53, 0.21), (1.55, 0.62, 0.045), materials["chat_in"], 0.10, group)
    text_object("Oi! Vi o imóvel.", (-0.80, phone_y + 0.61, 0.25), 0.14, materials["ink"], parent=group, align="LEFT")
    text_object("Ainda está disponível?", (-0.80, phone_y + 0.39, 0.25), 0.105, materials["ink"], parent=group, align="LEFT")
    bevel_cube("Agent reply bubble", (0.20, phone_y - 0.26, 0.21), (1.42, 0.68, 0.045), materials["chat_out"], 0.10, group)
    text_object("Olá! Está sim.\nPosso te ajudar a", (-0.43, phone_y - 0.17, 0.25), 0.105, materials["ink"], parent=group, align="LEFT")
    text_object("encontrar o ideal?", (-0.43, phone_y - 0.42, 0.25), 0.105, materials["ink"], parent=group, align="LEFT")
    text_object("AGORA", (0.70, phone_y - 0.83, 0.22), 0.09, materials["muted"], parent=group, align="RIGHT")
    text_object("UM NOVO LEAD", (0, 1.96, 0.4), 0.22, materials["lime_glow"], parent=group)
    text_object("23:48  ·  ATENDIMENTO EM ANDAMENTO", (0, 1.63, 0.4), 0.13, materials["muted"], parent=group)
    stage_label(group, "O lead chega no WhatsApp.", "Mesmo quando o corretor está offline.", mode, 0, materials, y=-1.98 if mode == "landscape" else -2.15)
    return group


def make_ai(mode, materials):
    group = empty_group("02 — AI lead qualification", local_anchor(mode, 1), mode, 1)
    sphere("ImobiFlow AI | polished core", (0, -0.05, 0.0), 0.74, materials["ai_core"], group)
    torus("AI orbit | equatorial", (0, -0.05, 0.03), 1.06, 0.026, materials["lime_glow"], group, (math.radians(8), 0, 0))
    torus("AI orbit | rising", (0, -0.05, 0.03), 1.25, 0.017, materials["teal_glow"], group, (math.radians(72), 0, 0))
    torus("AI orbit | falling", (0, -0.05, 0.04), 1.38, 0.014, materials["lime_glow"], group, (math.radians(-58), math.radians(20), 0))
    for index in range(12):
        angle = index * math.tau / 12
        radius = 1.48 + 0.08 * math.sin(index * 2.1)
        particle = sphere(
            f"AI orbiting data point {index + 1}",
            (math.cos(angle) * radius, -0.05 + math.sin(angle) * radius, 0.08),
            0.035 if index % 3 else 0.055,
            materials["spark"] if index % 3 == 0 else materials["flow"],
            group,
        )
        particle.rotation_euler.z = angle

    text_object("AGENTE DE IA", (0, 1.93, 0.44), 0.20, materials["lime_glow"], parent=group)
    text_object("ENTENDE  ·  PERGUNTA  ·  QUALIFICA", (0, 1.61, 0.44), 0.125, materials["muted"], parent=group)
    bevel_cube("Qualification status plate", (0, -1.69, 0.17), (3.3, 0.48, 0.12), materials["panel"], 0.15, group)
    torus("Qualified indicator", (-1.39, -1.69, 0.27), 0.075, 0.02, materials["lime_glow"], group)
    text_object("PRONTO PARA O PRÓXIMO PASSO", (0.05, -1.69, 0.26), 0.13, materials["paper"], parent=group)
    stage_label(group, "A IA faz as perguntas certas.", "O corretor entra na conversa na hora certa.", mode, 1, materials, y=-2.12)
    return group


def make_crm(mode, materials):
    group = empty_group("03 — Lead enters the CRM", local_anchor(mode, 2), mode, 2)
    width = 5.8 if mode == "landscape" else 4.48
    height = 2.72 if mode == "landscape" else 3.0
    bevel_cube("CRM board | satin graphite", (0, 0.0, -0.10), (width, height, 0.18), materials["panel"], 0.16, group)
    text_object("PIPELINE DE LEADS", (-width * 0.43, 1.02, 0.03), 0.16 if mode == "landscape" else 0.18, materials["muted"], parent=group, align="LEFT")
    text_object("HOJE  ·  09:41", (width * 0.43, 1.02, 0.03), 0.12, materials["muted"], parent=group, align="RIGHT")

    col_gap = 0.16
    col_w = (width - 0.54) / 2
    col_h = 1.92
    x_new = -col_w / 2 - col_gap / 2
    x_ready = col_w / 2 + col_gap / 2
    for x, name, count in ((x_new, "NOVO", "02"), (x_ready, "QUALIFICADO", "01")):
        bevel_cube(f"CRM column {name}", (x, -0.31, 0.015), (col_w, col_h, 0.065), materials["column"], 0.11, group)
        text_object(name, (x, 0.36, 0.065), 0.105 if mode == "landscape" else 0.12, materials["muted"], parent=group)
        text_object(count, (x + col_w * 0.39, 0.36, 0.068), 0.09, materials["lime_glow"], parent=group, align="RIGHT")

    source = bevel_cube("Lead card | incoming", (x_new, -0.42, 0.14), (col_w - 0.22, 0.94, 0.11), materials["lead_card"], 0.095, group)
    text_object("Ana Lima", (x_new, -0.24, 0.21), 0.17 if mode == "landscape" else 0.15, materials["ink"], parent=group)
    text_object("2 quartos  ·  Centro", (x_new, -0.51, 0.21), 0.095 if mode == "landscape" else 0.088, materials["ink"], parent=group)
    text_object("FAIXA COMPATÍVEL", (x_new, -0.69, 0.21), 0.075, materials["ink"], parent=group)

    # The lead card travels to the qualified lane as the camera arrives.
    source.location.x = x_new
    source.keyframe_insert(data_path="location", frame=131)
    source.location.x = x_ready
    source.keyframe_insert(data_path="location", frame=151)
    torus("Lead qualified check ring", (x_ready + col_w * 0.37, -0.80, 0.26), 0.085, 0.025, materials["lime_glow"], group)

    text_object("TUDO NO MESMO LUGAR", (0, 1.90, 0.44), 0.21, materials["lime_glow"], parent=group)
    stage_label(group, "Conversa organizada no CRM.", "Histórico, interesse e qualificação juntos.", mode, 2, materials, y=-1.92)
    return group


def make_house(group, materials, center):
    x, y = center
    bevel_cube("Property | plaster walls", (x, y, 0.10), (1.76, 1.32, 0.92), materials["house_wall"], 0.05, group)
    bevel_cube("Property | shadow plinth", (x, y - 0.73, 0.03), (2.14, 0.16, 1.12), materials["metal"], 0.07, group)
    # Two deep, bevelled roof planes make a clean gabled silhouette.
    left_roof = bevel_cube("Roof | left pitch", (x - 0.48, y + 0.91, 0.08), (1.12, 0.15, 1.12), materials["roof"], 0.04, group)
    left_roof.rotation_euler.z = math.radians(36)
    right_roof = bevel_cube("Roof | right pitch", (x + 0.48, y + 0.91, 0.08), (1.12, 0.15, 1.12), materials["roof"], 0.04, group)
    right_roof.rotation_euler.z = math.radians(-36)

    # Door and lit windows face camera (+Z).
    bevel_cube("Entry | walnut door", (x + 0.40, y - 0.28, 0.58), (0.39, 0.76, 0.055), materials["door"], 0.035, group)
    sphere("Entry | door handle", (x + 0.27, y - 0.28, 0.62), 0.035, materials["lime_glow"], group)
    for offset in (-0.48, 0.94):
        bevel_cube("Window frame", (x + offset, y - 0.08, 0.59), (0.41, 0.43, 0.07), materials["window_frame"], 0.04, group)
        bevel_cube("Window | dusk blue glass", (x + offset, y - 0.08, 0.635), (0.31, 0.33, 0.025), materials["window"], 0.025, group)
        bevel_cube("Window mullion | vertical", (x + offset, y - 0.08, 0.655), (0.025, 0.33, 0.02), materials["paper"], 0.006, group)
        bevel_cube("Window mullion | horizontal", (x + offset, y - 0.08, 0.655), (0.31, 0.025, 0.02), materials["paper"], 0.006, group)


def make_visit(mode, materials):
    group = empty_group("04 — Viewing scheduled", local_anchor(mode, 3), mode, 3)
    if mode == "landscape":
        house_center = (-1.62, -0.18)
        card_x, card_y = 1.70, -0.10
    else:
        house_center = (0.0, 0.75)
        card_x, card_y = 0.0, -2.05
    make_house(group, materials, house_center)

    card_w = 3.18 if mode == "landscape" else 4.18
    card_h = 2.12
    bevel_cube("Calendar confirmation | dark glass", (card_x, card_y, 0.03), (card_w, card_h, 0.15), materials["panel"], 0.17, group)
    bevel_cube("Calendar lime date tile", (card_x - card_w * 0.32, card_y + 0.29, 0.15), (0.66, 0.75, 0.08), materials["lime_glow"], 0.11, group)
    text_object("QUI", (card_x - card_w * 0.32, card_y + 0.42, 0.22), 0.12, materials["ink"], parent=group)
    text_object("18", (card_x - card_w * 0.32, card_y + 0.14, 0.22), 0.22, materials["ink"], parent=group)
    text_object("VISITA AGENDADA", (card_x + 0.24, card_y + 0.52, 0.20), 0.15, materials["lime_glow"], parent=group, align="LEFT")
    text_object("15:30  ·  VISITA AO IMÓVEL", (card_x + 0.24, card_y + 0.15, 0.20), 0.12, materials["paper"], parent=group, align="LEFT")
    text_object("LEMBRETE PROGRAMADO", (card_x + 0.24, card_y - 0.22, 0.20), 0.09, materials["muted"], parent=group, align="LEFT")
    stage_label(group, "Da conversa à visita.", "Agenda e acompanhamento no mesmo fluxo.", mode, 3, materials, y=3.55 if mode == "portrait" else 1.98)
    return group


def make_brand(mode, materials):
    group = empty_group("05 — ImobiFlow end card", local_anchor(mode, 4), mode, 4)
    # Clear the previous stations before the final card, especially in 9:16,
    # where vertically stacked scenes would otherwise remain inside frame.
    for previous in bpy.data.objects:
        if previous.type == "EMPTY" and previous.name[:2] in {"01", "02", "03", "04"}:
            previous.scale = (1.0, 1.0, 1.0)
            previous.keyframe_insert(data_path="scale", frame=232)
            previous.scale = (0.001, 0.001, 0.001)
            previous.keyframe_insert(data_path="scale", frame=242)
    # A simple architectural mark, machined from the product's lime accent.
    bevel_cube("ImobiFlow mark | lime tile", (0, 0.55, 0.0), (0.94, 0.94, 0.24), materials["lime_glow"], 0.16, group)
    bevel_cube("ImobiFlow mark | doorway", (0, 0.48, 0.16), (0.33, 0.50, 0.04), materials["ink"], 0.08, group)
    bevel_cube("ImobiFlow mark | lintel", (0, 0.79, 0.18), (0.48, 0.09, 0.05), materials["ink"], 0.045, group)
    text_object("IMOBIFLOW", (0, -0.43, 0.14), 0.55, materials["paper"], parent=group, extrude=0.008)
    text_object("DO PRIMEIRO OI À PRÓXIMA VISITA", (0, -1.10, 0.14), 0.16, materials["lime_glow"], parent=group)
    text_object("WhatsApp  ·  IA  ·  CRM  ·  AGENDA", (0, -1.52, 0.14), 0.13, materials["muted"], parent=group)
    text_object("IMÓVEIS EM MOVIMENTO.", (0, -2.20, 0.14), 0.18, materials["paper"], parent=group)
    # Thin 3D underline echoes the animated signal that crossed the film.
    bevel_cube("End card signal rule", (0, -1.80, 0.13), (2.85, 0.023, 0.035), materials["flow"], 0.01, group)
    return group


def make_soundtrack(path: Path):
    """A short original, license-safe tonal bed with four restrained cues."""
    sample_rate = 44100
    count = int(sample_rate * DURATION_SECONDS)
    cue_times = (2.35, 4.72, 7.08, 9.43)
    cue_notes = (659.25, 783.99, 987.77, 1174.66)
    rng = random.Random(42)
    noise_state = 0.0
    samples = bytearray()
    for i in range(count):
        t = i / sample_rate
        fade_in = min(1.0, t / 0.6)
        fade_out = min(1.0, max(0.0, (DURATION_SECONDS - t) / 0.75))
        breath = 0.68 + 0.32 * math.sin(math.tau * 0.095 * t) ** 2
        pad = (
            0.027 * math.sin(math.tau * 110.0 * t)
            + 0.019 * math.sin(math.tau * 164.81 * t + 0.2)
            + 0.014 * math.sin(math.tau * 220.0 * t + 0.7)
            + 0.009 * math.sin(math.tau * 329.63 * t + 1.1)
        ) * breath
        ping = 0.0
        for cue_time, note in zip(cue_times, cue_notes):
            elapsed = t - cue_time
            if 0.0 <= elapsed < 0.82:
                envelope = math.exp(-elapsed * 5.5)
                ping += envelope * (
                    0.095 * math.sin(math.tau * note * elapsed)
                    + 0.034 * math.sin(math.tau * note * 2.01 * elapsed)
                    + 0.014 * math.sin(math.tau * note * 3.0 * elapsed)
                )
        # A near-inaudible filtered texture gives the pad a soft cinematic edge.
        raw_noise = rng.uniform(-1.0, 1.0)
        noise_state += 0.035 * (raw_noise - noise_state)
        texture = noise_state * 0.009
        value = (pad + ping + texture) * fade_in * fade_out
        value = max(-0.8, min(0.8, value))
        packed = struct.pack("<h", int(value * 32767))
        samples.extend(packed)
        samples.extend(packed)
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as sound_file:
        sound_file.setnchannels(2)
        sound_file.setsampwidth(2)
        sound_file.setframerate(sample_rate)
        sound_file.writeframes(samples)


def setup_render(mode, soundtrack):
    cfg = FORMATS[mode]
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_WORKBENCH"
    shading = scene.display.shading
    shading.light = "STUDIO"
    shading.studio_light = "paint.sl"
    shading.color_type = "MATERIAL"
    shading.background_type = "WORLD"
    shading.show_shadows = False
    shading.show_cavity = True
    shading.cavity_type = "WORLD"
    shading.curvature_ridge_factor = 1.3
    shading.curvature_valley_factor = 1.1
    shading.show_specular_highlight = True
    scene.display.render_aa = "8"
    scene.render.resolution_x = cfg["width"]
    scene.render.resolution_y = cfg["height"]
    scene.render.resolution_percentage = 100
    scene.render.fps = FPS
    scene.render.fps_base = 1.0
    scene.frame_start = 1
    scene.frame_end = FRAME_END
    scene.render.film_transparent = False
    scene.render.image_settings.media_type = "VIDEO"
    scene.render.image_settings.file_format = "FFMPEG"
    scene.render.ffmpeg.format = "MPEG4"
    scene.render.ffmpeg.codec = "H264"
    scene.render.ffmpeg.audio_codec = "AAC"
    scene.render.ffmpeg.audio_mixrate = 44100
    scene.render.ffmpeg.audio_channels = "STEREO"
    scene.render.ffmpeg.audio_bitrate = 192
    scene.render.ffmpeg.constant_rate_factor = "HIGH"
    scene.render.ffmpeg.ffmpeg_preset = "GOOD"
    scene.render.use_sequencer = True
    scene.render.use_compositing = False
    scene.render.filepath = str(DELIVERABLES / cfg["filename"])
    scene.render.image_settings.color_mode = "RGB"
    scene.view_settings.view_transform = "AgX"
    try:
        scene.view_settings.look = "AgX - Medium High Contrast"
    except TypeError:
        pass
    scene.camera.data.lens = 50
    scene.frame_set(1)

    editor = scene.sequence_editor_create()
    strip = editor.strips.new_sound("Original ImobiFlow sound design", str(soundtrack), 1, 1)
    strip.volume = 0.82


def build_materials():
    return {
        "paper": make_material("01 | Warm paper", PAPER, roughness=0.38),
        "muted": make_material("02 | Soft sage type", MUTED, roughness=0.45),
        "ink": make_material("03 | Obsidian ink", INK, roughness=0.35),
        "panel": make_material("04 | Graphite UI", hex_color("#182021"), metallic=0.28, roughness=0.31),
        "column": make_material("05 | Raised CRM lane", hex_color("#252E2D"), metallic=0.10, roughness=0.4),
        "metal": make_material("06 | Dark titanium", hex_color("#303B3C"), metallic=0.78, roughness=0.24),
        "screen": make_material("07 | Deep screen", hex_color("#0D1516"), metallic=0.18, roughness=0.25),
        "chat_in": make_material("08 | Incoming message", hex_color("#E5EAE2"), roughness=0.54),
        "chat_out": make_material("09 | Agent reply", hex_color("#B8E986"), roughness=0.49),
        "lime_glow": make_material("10 | ImobiFlow lime", hex_color("#B8FF4F"), metallic=0.16, roughness=0.28, emission=0.72),
        "flow": make_material("11 | Signal filament", hex_color("#85D63C"), metallic=0.12, roughness=0.25, emission=0.95),
        "spark": make_material("12 | Signal highlight", hex_color("#DAFF9D"), roughness=0.20, emission=2.2),
        "teal_glow": make_material("13 | AI teal accent", hex_color("#53C6B5"), roughness=0.24, emission=0.95),
        "ai_core": make_material("14 | AI glass heart", hex_color("#527F62"), metallic=0.38, roughness=0.19, emission=0.32),
        "lead_card": make_material("15 | Qualified lead card", hex_color("#DCE8D5"), roughness=0.38),
        "house_wall": make_material("16 | Property plaster", hex_color("#DCE1D7"), roughness=0.76),
        "roof": make_material("17 | Deep green roof", hex_color("#253B34"), metallic=0.22, roughness=0.32),
        "door": make_material("18 | Warm wood door", hex_color("#895F3B"), roughness=0.56),
        "window_frame": make_material("19 | Window frames", hex_color("#233432"), metallic=0.34, roughness=0.28),
        "window": make_material("20 | Dusk glass", hex_color("#42747B"), metallic=0.45, roughness=0.16, emission=0.20),
    }


def build_scene(mode: str):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = f"ImobiFlow Product Film | {mode}"
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.render.resolution_x = FORMATS[mode]["width"]
    scene.render.resolution_y = FORMATS[mode]["height"]
    scene.render.resolution_percentage = 100
    scene.render.fps = FPS
    scene.frame_end = FRAME_END

    materials = build_materials()
    camera = create_camera(mode)
    setup_world(mode)
    make_track(mode, materials)
    make_phone(mode, materials)
    make_ai(mode, materials)
    make_crm(mode, materials)
    make_visit(mode, materials)
    make_brand(mode, materials)
    setup_render(mode, AUDIO_DIR / "imobiflow_original_score.wav")
    scene.frame_set(1)
    return scene


def main():
    DELIVERABLES.mkdir(parents=True, exist_ok=True)
    PROJECTS.mkdir(parents=True, exist_ok=True)
    PREVIEWS.mkdir(parents=True, exist_ok=True)
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    soundtrack = AUDIO_DIR / "imobiflow_original_score.wav"
    if not soundtrack.exists():
        make_soundtrack(soundtrack)

    requested = parse_format()
    modes = list(FORMATS) if requested == "all" else [requested]
    for mode in modes:
        print(f"\n=== Building {mode} master ===", flush=True)
        scene = build_scene(mode)
        blend_path = PROJECTS / f"ImobiFlow_ProductFilm_{mode}.blend"
        bpy.ops.wm.save_as_mainfile(filepath=str(blend_path))
        scene.render.image_settings.media_type = "IMAGE"
        scene.render.image_settings.file_format = "PNG"
        scene.render.use_sequencer = False
        # Render the 3D plates at 50%; FFmpeg upscales them with Lanczos during
        # the zoom-pan pass to the required full-HD social deliverables.
        scene.render.resolution_percentage = 50
        if "--outro-only" in sys.argv:
            shot_frames = [248]
        else:
            shot_frames = [20] if "--preview" in sys.argv else [20, 78, 152, 191, 248]
        shot_numbers = [5] if "--outro-only" in sys.argv else list(range(1, len(shot_frames) + 1))
        shot_dir = PREVIEWS / mode
        shot_dir.mkdir(parents=True, exist_ok=True)
        for shot_number, frame in zip(shot_numbers, shot_frames):
            scene.render.filepath = str(shot_dir / f"shot_{shot_number:02d}.png")
            scene.frame_set(frame)
            print(f"Rendering {mode} shot {shot_number}/{len(shot_frames)} at frame {frame}", flush=True)
            bpy.ops.render.render(write_still=True)
        print(f"Saved editable Blender project: {blend_path}", flush=True)


if __name__ == "__main__":
    main()
