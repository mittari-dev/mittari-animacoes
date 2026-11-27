# Etapa 0: Perfil da marca

| | |
|---|---|
| **Entra** | Conversa com o dono, site, app, notas da marca |
| **Sai** | `marcas/<marca>/perfil.md`: o que vende, preços, o que existe e o que não existe |
| **Skill** | `brand-context` (perfil), `brand-voice` (voz) |
| **Portão** | Cada recurso citado foi conferido no produto ou com o dono. O que não existe está escrito como não existe |

## Como fazer

1. **Copiar `marcas/_modelo/` para `marcas/<marca>/`** se a marca é nova.
2. **Perfil:** seguir `industria/skills/brand-context/SKILL.md` com o dono. Gravar em `perfil.md`:
   - o que vende e quanto custa;
   - **o que existe no produto hoje e o que não existe.**
   Esta lista é a mais importante da pasta: é ela que impede o roteiro de prometer o que não há.
3. **Voz:** seguir `industria/skills/brand-voice/SKILL.md`. Gravar o tom, as palavras que a marca usa e as que nunca usa em `regras.md`.
4. **Conferir cada recurso da lista "existe"** abrindo o produto, ou com o dono.

As skills mandam gravar em `.agents/` ou `.claude/`. Aqui, grave sempre em `marcas/<marca>/`.

## Regras da marca que pesam aqui

Ler `marcas/<marca>/regras.md`. Quando a regra da marca e a da skill brigarem, vale a da marca.
