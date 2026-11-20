---
name: ui-hillclimb
description: Iteratively improve UI design using a read-only review council, or optimize prompts and tool descriptions with a two-phase evaluation and compression loop. Use for hill climbing UI, review councils, or optimizing tool descriptions.
---

# Hill-climb UI and prompts

Choose the visual mode for UI/UX polish and the programmatic mode for prompts, agent routing rules, MCP tool descriptions, or CLI help. Respect the user's scope, repository instructions, available tools and authorization. Do not create a worktree or commit unless the user authorizes it. Use the current checkout otherwise.

## Visual mode: review council

The orchestrator edits the UI, captures before and after screenshots, and records each round. Reviewers are read-only: they inspect screenshots and relevant diffs, report regressions and actionable fixes, and never edit files. Use three independent frontier models from different providers when available and authorized. If unavailable, state the limitation and use the independent reviewers actually available; do not claim a three-provider review occurred. An optional fourth, experimental reviewer can offer unconventional ideas in a separate Jester Notes section; exclude its scores from gates.

Capture a baseline and screenshots of 1–3 relevant, high-quality reference applications. Compare the target and references on the same rubric. If references cannot be obtained, explain the limitation instead of inventing benchmarks. Reviewers must not be told the stopping threshold: this reduces pressure to inflate scores. Ask them to score each category and the overall UI from 1.0 to 10.0 in 0.1 increments, and give 3–5 prioritized, concrete fixes:

1. Typography: pairing, weight, line height, tracking and appropriate numeric alignment.
2. Visual hierarchy: primary and secondary actions, focal points and scannability.
3. Spacing and alignment: rhythm, padding, grids and breathing room.
4. Border radius and affordances: nested radii and recognizable interactive controls.
5. Iconography: consistent stroke, optical sizing, alignment and purpose.
6. Color and contrast: intentional accent and semantic colors, legibility and appropriate contrast.

Check for flat, washed-out surfaces and weak affordances, but respect intentional brand choices rather than penalizing grayscale by itself. Review the actual states affected, including responsive and interactive states where relevant.

Use a default internal threshold of 9.2, or 9.5 when high polish is requested. Stage reviews to conserve resources: iterate with reviewer 1 until its categories and overall score meet the threshold, add reviewer 2 until both meet it, then add reviewer 3. At the full gate, all three overall scores must meet the threshold and no category may fall below threshold minus 0.3. Scores are subjective signals, not proof of quality. Stop when the gate is met or further iterations cease to produce useful improvements; report unmet gates, unavailable reviewers, and verification limits rather than claiming success.

For high-polish work, a fresh reviewer or orchestrator context can reduce attachment to earlier decisions. Only use a separate worktree or commit a baseline when the user has explicitly authorized it.

After each round, record the stage, each reviewer's scores, benchmark scores, optional ungated Jester score, and changes made. At completion, provide the progression table and an annotated before/after visual comparison or a structured callout identifying the affected regions and changes.

Reviewer brief:

> You are a read-only design reviewer. Do not modify files. Compare the target before and after screenshots with the supplied reference screenshots. Score each UI on typography, visual hierarchy, spacing and alignment, border radius and affordances, iconography, and color and contrast, from 1.0 to 10.0 in 0.1 increments. Identify regressions and weak contrast or affordances, then give 3–5 prioritized, concrete visual fixes.

For an optional Jester reviewer, use the same screenshots and read-only constraint; ask for candid critique and 2–3 unconventional visual ideas. Keep its score separate from gating.

## Programmatic mode: accuracy then compression

Before editing, collect real historical failure cases when available, such as incorrect tool selection, malformed arguments or invented parameters. Build or reuse a fast evaluation harness that reports case outcomes and exact token or character counts. Model-based evaluations can be nondeterministic: fix inputs and scoring where practical, run repeated trials when appropriate, and report variability. Do not invent historical cases or call a probabilistic model deterministic.

1. **Accuracy:** Establish a baseline, inspect failures, and make targeted changes until the suite passes or further improvement stalls. Record the strongest passing version as a checkpoint. Commit only if authorized.
2. **Compression:** Starting from the passing checkpoint, remove redundant wording in small steps, re-running the same suite after each. Keep changes that preserve performance; undo only the specific unsuccessful edit without discarding unrelated work. Aim for substantial reduction, potentially around 60%, but do not sacrifice behavior to meet a fixed reduction target.

Track iteration, phase, pass rate, token or character count, change from the peak, action and outcome. Report the final accuracy, size, cases and limitations. A perfect score on a finite historical suite does not prove general accuracy; include representative held-out cases when available.
