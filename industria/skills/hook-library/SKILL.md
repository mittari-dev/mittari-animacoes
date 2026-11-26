---
name: hook-library
description: Builds and uses a hooks library - a CSV of first lines from your own posts and saved posts, each tagged with one of nine hook types, a slot pattern ([N], [TIME], [THING]), why it worked and one metric. A script adds rows, guesses types, abstracts patterns, scores a draft line 0 to 10 with reasons (specificity, length, tension, bait, vague words), searches by type, platform or words, and ranks frames used 3 or more times by median result so the best ones get promoted. Use when the user says "build a hook library", "swipe file for hooks", "write me hooks", "score this hook", "which hooks work for me", "first line for this post", "log this post's results", or when a plan needs a hook type per platform.
---

> **Na Indústria de Postagem da Mittari** (etapa 13: banco dos próprios ganchos, com resultado)
> - **A saída é sempre em português do Brasil.** O texto desta skill fica no original.
> - **As regras de `marcas/<marca>/regras.md` vencem as desta skill.** As regras universais estão em `industria/SKILL.md`.
> - **Gravar a saída onde a etapa manda:** `industria/etapas/`.
> - **Quando esta skill citar outra que não está em `industria/skills/`, ignore.** Siga o guia.


# Hook library

Most people pick hooks from memory or from a list of "100 viral hooks" written for someone else's audience. A library of your own first lines with one number each tells you, after a few months, which frames your readers stop for. This skill sets that up, keeps it clean and uses it when writing.

## Inputs

- `atoms/hooks.csv`, created with `python3 scripts/hook_bank.py init atoms/hooks.csv` (or copied from `templates/hooks.csv`).
- Your past posts with one metric each, and posts by others that stopped you.

## Procedure

### Set up and fill

1. **Create the file** with `init`. Columns: date, source, platform, hook_type, hook, pattern, why, metric, value.
2. **Pick one metric per platform** with the table in [references/collecting.md](references/collecting.md) and keep it.
3. **Add rows:**
   ```
   python3 scripts/hook_bank.py add atoms/hooks.csv --hook "We cut close from 9 days to 3" --platform x --metric replies --value 11 --why "number and a before state"
   ```
   The type is guessed from keywords and the pattern is filled in. Correct both when they are wrong; pass `--pattern` so hooks on the same frame share one.
4. **Check** with `python3 scripts/hook_bank.py check atoms/hooks.csv`: duplicates, bad dates, unknown types, values that are not numbers.

### Write hooks for a piece

1. Look up the hook type the plan gave this platform in [references/hook-types.md](references/hook-types.md).
2. Pull your best rows of that type: `python3 scripts/hook_bank.py find atoms/hooks.csv --type outcome-first --platform x`.
3. Write five to ten candidates on the best frames, filled with the source's real numbers. Run the So-What test on each.
4. Score them: `python3 scripts/hook_bank.py score "line"`. Drop anything under 6 or with bait; pick from the rest by reading them aloud.

### Learn from results

Monthly: `python3 scripts/hook_bank.py patterns atoms/hooks.csv --min 3` lists frames used three or more times by median value. Frames with 3 or more uses and an above-median result go to the top of your list. `--by type` compares hook types.

## Hard rules

- Only your own posts carry a metric. Saved posts from others get a `why`, not a number you guessed.
- Fill hooks with numbers from the source. A borrowed frame with invented numbers is a false claim.
- The score is a filter for obvious misses. Your results decide what works.
- Keep anti-examples (bait, vague lines) only with `why` saying so.

## Output

An up-to-date `atoms/hooks.csv`, and for a piece, a short list of scored candidate hooks with the one you picked.

## Files

- [references/hook-types.md](references/hook-types.md): nine types with examples, the So-What test, how scoring works
- [references/collecting.md](references/collecting.md): what to collect, metrics per platform, weekly routine, promotion
- `scripts/hook_bank.py`: init, add, check, score, pattern, find, patterns (`--help`)
