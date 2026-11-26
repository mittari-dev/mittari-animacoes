# Hook types

Nine types cover most first lines that work. `hook_bank.py` guesses the type from keywords when you leave it empty; the guess is a starting point, so correct it in the CSV when it is wrong. The ids in the left column are the values `hook_bank.py check` accepts.

| id | What it does | Example (invented business) |
|---|---|---|
| time-transformation | before and after in time | "14 shops used to close their books 9 days late. Now it takes 3." |
| pain-mirror | describes the reader's situation back to them | "If you see last month's numbers in the middle of this month, this is for you." |
| market-bomb | news or a change the reader has not caught yet | "Card processors changed their refund fees this week. Here is what it costs a small cafe." |
| outcome-first | the result you got, with a number | "We cut supplier late fees at Acme Coffee from $400 a month to zero." |
| barrier-removal | removes the reason they think they cannot | "Close the month in 3 days without new software." |
| anti-pattern | names a common mistake | "Stop doing your books at month end." |
| exclusion | says who it is not for | "Not for shops with an accountant on staff." |
| story-open | starts in a moment | "Last March a bakery owner called me from the stockroom." |
| question | a real question the reader has asked | "Should a five-person shop close the books before every receipt is in?" |

## Picking a type per platform

Give each platform in a plan a different type. The same source can open as outcome-first on X, story-open in a newsletter, barrier-removal on a carousel and anti-pattern in a video. `plan_check.py` warns when two platforms share a type.

## The So-What test

Read the hook and ask "so what?" three times. Each answer should get more specific to the reader.

1. "We changed four habits." So what?
2. "Our clients close in 3 days instead of 9." So what?
3. "The owner sees the numbers while there is still time to act on them."

The third answer is often a better hook than the first line you wrote. Use it, or put it in the second line.

## Scoring a line

`hook_bank.py score "your line"` gives a rough 0 to 10 with the reasons: points for a number, a named thing, a length of 5 to 14 words and a tension word; penalties for bait, vague words ("tips", "secrets", "things"), over 20 words, a stock opener ("Did you know") and dashes. Use it to catch obvious misses. A line that scores 9 can still be boring; only your results tell you what works.
