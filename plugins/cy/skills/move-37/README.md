# Move 37

A small skill from [Attention Heads](https://www.attentionheads.ai/?utm_source=github&utm_medium=readme&utm_campaign=move-37) ([skill homepage](https://www.attentionheads.ai/move-37?utm_source=github&utm_medium=readme&utm_campaign=move-37)). Give it a problem or a task you're about to hand an agent, and before writing any code it steps back to find solutions you wouldn't have thought of yourself.

Inspired by AlphaGo's Move 37 and Tobi Lütke's framing of AI as a musical instrument—bringing real problems with an openness to unexpected solutions rather than just accelerating a preconceived task.

## What it does

Before implementing anything, it:

1. Separates the **underlying problem** from your proposed implementation.
2. Surfaces the **hidden assumptions** baked into your current framing.
3. Proposes **three structurally distinct moves**:
   - **The Direct Move** — the strongest conventional baseline.
   - **The Upstream / Elimination Move** — dissolving the problem by changing something else upstream.
   - **Move 37** — a grounded, non-obvious approach a human practitioner would rarely reach for first.
4. Gives the sharpest risk and a cheap validation test for each, makes a recommendation, and stops so you can choose before it builds.

## Examples

```text
/move-37 Add a caching layer in front of our reporting queries because dashboards are taking 8 seconds to load.
```

```text
/move-37 Build a permissions UI so team admins can configure 40 different feature flags per role.
```

## Install

Point your agent at the folder:

```text
Install the AI agent skill at https://github.com/DannyMac180/skills/tree/main/move-37
```

Or copy `move-37/` into your agent's skills directory (for Claude Code, `~/.claude/skills/`).
