"""Gera o index.html do U03 (9:16). Uso: python _dev/build.py"""
h = open("_dev/head.html", encoding="utf-8").read()
c = open("_dev/scene-classic.js", encoding="utf-8").read()
m = open("_dev/scene-module.js", encoding="utf-8").read()
open("index.html", "w", encoding="utf-8").write(h.replace("/*CLASSIC*/", c).replace("/*MODULE*/", m))
print("ok")
