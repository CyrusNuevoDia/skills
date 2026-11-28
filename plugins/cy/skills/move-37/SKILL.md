---
name: move-37
description: >
  Step back from a proposed solution to the underlying problem, surface the
  hidden assumptions baked into the request, and generate three structurally
  distinct approaches—including a non-obvious "Move 37" option a human
  practitioner would rarely reach for first. Stops for the user to choose
  before executing. USE WHEN: /move-37, "give me a Move 37", "reframe this
  problem", "what am I missing here", "propose unconventional approaches",
  "don't just implement my first idea". NOT FOR: routine mechanical edits,
  formatting, or tasks where the approach is already settled.
---

# Move 37

Named after AlphaGo's 37th move against Lee Sedol—a move no human expert
would have played, that reshaped the board. Most of the time, we hand agents
a preconceived solution and ask them to execute faster. This skill flips the
frame: bring the problem, drop the preconceived path, and leave room for a
solution you would not have thought of yourself.

## Input

The problem or proposed task is whatever follows `/move-37`. If nothing
follows, use the user's most recent request in this conversation. If there
is none, ask for the problem in one line and stop.

If you are working inside a codebase or project, inspect the relevant files
briefly before proposing options so every move is grounded in what actually
exists.

## Steps

### 1. Restate the real problem (not the proposed solution)

In two or three sentences, separate the **underlying outcome** the user
actually wants from the **implementation** they suggested.

### 2. Surface 2–3 hidden assumptions

Name the unspoken constraints or defaults baked into the current framing
(e.g., "assumes this has to happen at request time," "assumes the data model
can't change," "assumes the user has to configure this manually").

### 3. Propose three structurally distinct moves

Each move must differ in *architecture or mechanism*, not just polish or
parameters.

1. **The Direct Move (Baseline)** — The cleanest, strongest version of the
   conventional approach. This anchors the comparison so novelty is earned.
2. **The Upstream / Elimination Move** — Solve or dissolve the problem by
   changing something else upstream, deleting a layer, or removing the
   condition that creates the problem in the first place.
3. **Move 37 (The Non-Obvious Move)** — A genuinely surprising, structurally
   different approach—borrowing a mechanism from another discipline, inverting
   the control flow, or exploiting a capability of the medium (including AI
   agents, formal specs, or code generation) that wasn't practical five years
   ago.

For each of the three moves, include:
- **Core move:** What you actually build or change, in concrete terms.
- **Assumption it breaks:** *(for Moves 2 and 3)* Which default it rejects.
- **Why it wins:** The specific leverage it unlocks over the baseline.
- **Biggest risk:** The sharpest way this could fail or backfire.
- **First cheap test:** One concrete check or prototype to validate it before
  committing.

### Rules for Move 37

- **Surprising, not absurd.** Move 37 was legal, grounded, and won the game.
  Do not propose sci-fi hand-waving, massive rewrites without payoff, or
  novelty for its own sake.
- **Concrete, not vague.** Name real files, mechanisms, libraries, or
  workflows—never generic advice like "use AI to rethink the UX."
- **Honest about tradeoffs.** If the Direct Move is genuinely better for this
  problem, say so in your recommendation.

### 4. Recommend and stop

Give a two-sentence recommendation on which move (or hybrid) you would pick
and why.

Stop there. Ask which move the user wants to pursue; do not write code or
start executing until they choose.
