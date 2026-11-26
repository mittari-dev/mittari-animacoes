#!/usr/bin/env python3
"""Keep a hooks library you can search, score and learn from.

  python3 hook_bank.py init hooks.csv
  python3 hook_bank.py add hooks.csv --hook "We cut month-end close from 9 days to 3" \\
      --source "own post" --platform x --metric saves_per_1k --value 14
  python3 hook_bank.py check hooks.csv
  python3 hook_bank.py score "We cut month-end close from 9 days to 3"
  python3 hook_bank.py find hooks.csv --type outcome-first --platform x
  python3 hook_bank.py patterns hooks.csv --min 3
  python3 hook_bank.py pattern "Most cafes lose $400 a month to card fees"

Columns: date, source, platform, hook_type, hook, pattern, why, metric, value.
  hook_type  one of the types in references/hook-types.md (guessed if empty)
  pattern    the hook with its specifics swapped for slots: [N], [$N],
             [TIME], [THING]. Filled in for you if empty; edit it (or pass
             --pattern) so hooks built on the same frame share one pattern
  metric     what you measured (saves_per_1k, replies, completion, ...),
             value is the number. Leave both empty for hooks you only saw

score   rates one line 0-10 on specificity, length, tension and bait, with
        the reasons. It is a filter for obvious misses, not a verdict.
check   FAIL on a missing hook, a bad date, an unknown type, a duplicate
        hook or a non-numeric value. WARN on bait in a hook.
patterns groups rows by pattern (or --by type) and prints the ones used at least --min
        times with their median value, best first. Those are the
        candidates to promote to your "proven" list.
Standard library only.
"""
import argparse
import csv
import datetime
import os
import re
import statistics
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # Windows consoles default to a legacy code page

COLS = ["date", "source", "platform", "hook_type", "hook", "pattern", "why", "metric", "value"]
TYPES = {
    "time-transformation": r"\b(used to|from \S+ (days?|hours?|weeks?|minutes?) to|in \d+ (days?|hours?|minutes?|weeks?)|took me \d+)",
    "pain-mirror": r"\b(you're|you are|if you|tired of|still|every time you|sick of)\b",
    "market-bomb": r"\b(just|now|launched|released|changed|new rule|this week|banned|shut down)\b",
    "outcome-first": r"\b(we|i)\b.*\b(cut|grew|saved|made|doubled|went from|closed|got)\b",
    "barrier-removal": r"\b(without|no need|you don't need|even if|no code|no budget|zero)\b",
    "anti-pattern": r"\b(stop|don't|mistake|wrong|never|quit|myth|overrated)\b",
    "exclusion": r"\b(only for|not for|if you're not|most people|nobody|99%)\b",
    "story-open": r"^(last|yesterday|in \d{4}|on monday|on tuesday|on friday|my first|three years ago|i was)\b",
    "question": r"\?\s*$",
}
BAIT = ["you won't believe", "thoughts?", "agree?", "let that sink in", "read that again", "here's what i learned",
        "nobody talks about this", "this will change your life", "game-changer", "game changer", "must-read"]
VAGUE = ["things", "stuff", "tips", "secrets", "hacks", "amazing", "incredible", "powerful", "ultimate", "everything you need"]
TENSION = ["but", "without", "instead", "stop", "mistake", "wrong", "nobody", "most", "never", "only", "still", "actually"]


def guess_type(hook):
    low = hook.lower().strip()
    for t, rx in TYPES.items():
        if re.search(rx, low):
            return t
    return ""


def pattern_of(hook):
    p = re.sub(r"[$€£]\s?\d[\d,.]*\s?[kKmM]?", "[$N]", hook)
    p = re.sub(r"\b\d[\d,.]*\s?(%|percent)", "[N]%", p)
    p = re.sub(r"\b\d[\d,.]*\s?(seconds?|minutes?|hours?|days?|weeks?|months?|years?)\b", "[TIME]", p, flags=re.I)
    p = re.sub(r"\b\d[\d,.]*\b", "[N]", p)
    words = p.split(" ")
    out = []
    for i, w in enumerate(words):
        core = re.sub(r"[^\w']", "", w)
        starts = i == 0 or re.search(r"[.!?:]$", words[i - 1])
        if not starts and core[:1].isupper() and core.lower() not in ("i", "i'm", "i've") and not core.isupper():
            out.append(w.replace(core, "[THING]"))
        else:
            out.append(w)
    p = " ".join(out)
    return re.sub(r"(\[THING\]\s*){2,}", "[THING] ", p).strip()


def score(hook):
    low = hook.lower()
    words = re.findall(r"[\w'$%]+", hook)
    pts, why = 5, []
    if re.search(r"\d", hook):
        pts += 2
        why.append("+2 has a number")
    if "[THING]" in pattern_of(hook):
        pts += 1
        why.append("+1 names a specific thing")
    if 5 <= len(words) <= 14:
        pts += 1
        why.append("+1 length %d words" % len(words))
    elif len(words) > 20:
        pts -= 2
        why.append("-2 %d words, too long for a first line" % len(words))
    t = [x for x in TENSION if re.search(r"\b%s\b" % x, low)]
    if t:
        pts += 1
        why.append("+1 tension word (%s)" % t[0])
    b = [x for x in BAIT if x in low]
    if b:
        pts -= 3
        why.append("-3 bait (%s)" % b[0])
    v = [x for x in VAGUE if re.search(r"\b%s\b" % re.escape(x), low)]
    if v:
        pts -= 2
        why.append("-2 vague word (%s)" % v[0])
    if re.match(r"^(did you know|have you ever|what if)\b", low):
        pts -= 1
        why.append("-1 opens with a stock question")
    if "—" in hook or "–" in hook:
        pts -= 1
        why.append("-1 dash")
    return max(0, min(10, pts)), why


def read(path):
    if not os.path.exists(path):
        sys.exit("no such file: %s (run: hook_bank.py init %s)" % (path, path))
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def write(path, rows):
    with open(path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=COLS)
        w.writeheader()
        for r in rows:
            w.writerow({c: r.get(c, "") for c in COLS})


def cmd_check(rows):
    fails, warns, seen = 0, 0, {}
    for i, r in enumerate(rows, 2):
        hook = (r.get("hook") or "").strip()
        if not hook:
            print("FAIL line %d: empty hook" % i)
            fails += 1
            continue
        key = re.sub(r"\W+", " ", hook.lower()).strip()
        if key in seen:
            print("FAIL line %d: duplicate of line %d: %r" % (i, seen[key], hook[:50]))
            fails += 1
        seen[key] = i
        try:
            datetime.date.fromisoformat(r.get("date", ""))
        except ValueError:
            print("FAIL line %d: date %r is not YYYY-MM-DD" % (i, r.get("date")))
            fails += 1
        ht = r.get("hook_type", "")
        if ht and ht not in TYPES:
            print("FAIL line %d: unknown hook_type %r" % (i, ht))
            fails += 1
        v = (r.get("value") or "").strip()
        if v:
            try:
                float(v)
            except ValueError:
                print("FAIL line %d: value %r is not a number" % (i, v))
                fails += 1
            if not (r.get("metric") or "").strip():
                print("WARN line %d: value without a metric name" % i)
                warns += 1
        if any(b in hook.lower() for b in BAIT):
            print("WARN line %d: bait in the hook; keep it only as an anti-example" % i)
            warns += 1
    print("\n%s: %d rows, %d fail(s), %d warning(s)" % ("BLOCKED" if fails else "OK", len(rows), fails, warns))
    return 1 if fails else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("init", help="create an empty hooks.csv")
    p.add_argument("csv")
    p = sub.add_parser("add", help="append one hook")
    p.add_argument("csv")
    p.add_argument("--hook", required=True)
    p.add_argument("--source", default="")
    p.add_argument("--platform", default="")
    p.add_argument("--type", default="", help="hook type; guessed if empty")
    p.add_argument("--why", default="")
    p.add_argument("--pattern", default="", help="shared frame for similar hooks; auto-filled if empty")
    p.add_argument("--metric", default="")
    p.add_argument("--value", default="")
    p.add_argument("--date", default=datetime.date.today().isoformat())
    p = sub.add_parser("check", help="validate the file")
    p.add_argument("csv")
    p = sub.add_parser("score", help="score one hook line 0-10")
    p.add_argument("hook")
    p = sub.add_parser("pattern", help="print the slot pattern of one hook")
    p.add_argument("hook")
    p = sub.add_parser("find", help="search the library")
    p.add_argument("csv")
    p.add_argument("--type")
    p.add_argument("--platform")
    p.add_argument("--q", help="words that must appear in the hook or pattern")
    p = sub.add_parser("patterns", help="patterns used at least --min times, best median first")
    p.add_argument("csv")
    p.add_argument("--min", type=int, default=3)
    p.add_argument("--by", choices=["pattern", "type"], default="pattern", help="group by slot pattern or by hook type")
    a = ap.parse_args()

    if a.cmd == "init":
        if os.path.exists(a.csv):
            sys.exit("%s exists; not overwriting" % a.csv)
        write(a.csv, [])
        print("created %s" % a.csv)
    elif a.cmd == "add":
        rows = read(a.csv)
        t = a.type or guess_type(a.hook)
        rows.append({"date": a.date, "source": a.source, "platform": a.platform, "hook_type": t, "hook": a.hook,
                     "pattern": a.pattern or pattern_of(a.hook), "why": a.why, "metric": a.metric, "value": a.value})
        write(a.csv, rows)
        s, _ = score(a.hook)
        print("added (%s, score %d/10): %s" % (t or "untyped", s, a.pattern or pattern_of(a.hook)))
    elif a.cmd == "check":
        sys.exit(cmd_check(read(a.csv)))
    elif a.cmd == "score":
        s, why = score(a.hook)
        print("%d/10  %s" % (s, a.hook))
        for w in why:
            print("  " + w)
        print("  type: %s" % (guess_type(a.hook) or "none matched"))
        print("  pattern: %s" % pattern_of(a.hook))
    elif a.cmd == "pattern":
        print(pattern_of(a.hook))
    elif a.cmd == "find":
        n = 0
        for r in read(a.csv):
            t = r.get("hook_type") or guess_type(r.get("hook", ""))
            if a.type and t != a.type:
                continue
            if a.platform and r.get("platform", "").lower() != a.platform.lower():
                continue
            hay = (r.get("hook", "") + " " + r.get("pattern", "")).lower()
            if a.q and not all(w in hay for w in a.q.lower().split()):
                continue
            n += 1
            val = (" [%s %s]" % (r.get("metric"), r.get("value"))) if r.get("value") else ""
            print("%s  %-20s %s%s" % (r.get("date", ""), t or "-", r.get("hook", ""), val))
        print("\n%d match(es)" % n)
    elif a.cmd == "patterns":
        groups = {}
        for r in read(a.csv):
            if a.by == "type":
                pat = r.get("hook_type") or guess_type(r.get("hook", "")) or "untyped"
            else:
                pat = r.get("pattern") or pattern_of(r.get("hook", ""))
            groups.setdefault(pat, []).append(r)
        ranked = []
        for pat, rs in groups.items():
            vals = []
            for r in rs:
                try:
                    vals.append(float(r.get("value")))
                except (TypeError, ValueError):
                    pass
            ranked.append((statistics.median(vals) if vals else float("-inf"), len(rs), pat, len(vals)))
        ranked.sort(key=lambda x: (x[0], x[1]), reverse=True)
        shown = 0
        for med, n, pat, nv in ranked:
            if n < a.min:
                continue
            shown += 1
            print("%3d uses  median %s  %s" % (n, ("%g (%d measured)" % (med, nv)) if nv else "n/a", pat))
        if not shown:
            print("no pattern used %d+ times yet; keep logging, or lower --min" % a.min)


if __name__ == "__main__":
    main()
