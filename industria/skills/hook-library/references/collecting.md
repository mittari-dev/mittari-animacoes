# Building the library

A hooks library is a CSV of first lines you have seen work, with why you think they worked and, for your own posts, a number. After a few months it tells you which frames your audience responds to. Before that, it is a swipe file with labels.

## What to collect

- **Your own posts.** Every post, with its first line and one metric. These are the only rows with real evidence.
- **Saved posts from others in your field.** Only the ones that stopped you. Write why in the `why` column the day you save it; you will not remember later.
- **Anti-examples.** Bait and vague lines, marked as such in `why`. They are useful when someone asks what not to do.

## Which metric

Pick one per platform and keep it. Mixing likes and saves in one column makes the median meaningless.

| Platform | Metric that tracks the hook | Why |
|---|---|---|
| X, Threads | replies, or profile clicks | the 2023 X ranker weighted replies 27 times a like |
| LinkedIn | comments per 1,000 impressions | |
| Instagram carousel | saves per 1,000 reach | saves are a signal the platform says it uses |
| Short video | 3-second hold rate, or average watch time | the hook is the first 3 seconds |
| Newsletter | open rate on the subject line | |

Write the metric name in `metric` and the number in `value`. Normalize per 1,000 views when you can, so a big post does not swamp the median.

## Weekly routine, 15 minutes

1. Add last week's posts with their numbers: `hook_bank.py add hooks.csv --hook "..." --platform x --metric replies --value 11`.
2. Add up to five saved hooks from others, with `why` filled in.
3. Fix the `pattern` column so hooks on the same frame share one pattern. The script fills in a first guess by swapping numbers, times and names for `[N]`, `[TIME]` and `[THING]`; edit it into a frame like `[N] [WHO] used to [PAIN] [TIME] late`, or pass `--pattern` when you add.
4. Run `hook_bank.py check hooks.csv`.

## Monthly promotion

Run `hook_bank.py patterns hooks.csv --min 3`. It lists frames used three or more times with their median value, best first. A frame that has 3 or more uses and a median above your overall median is a candidate for your "proven" list. Move it to the top of the file you open when you write, and keep logging it: proven frames wear out.

`hook_bank.py patterns hooks.csv --by type` does the same per hook type, which tells you whether outcome-first or story-open works better for your audience.

## Limits

Three uses is a small sample. A frame with a high median from three posts may have ridden a news day. Treat promotion as "use more and keep measuring", not as a rule.
