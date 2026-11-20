---
name: heartbeat-loop
description: Run a seed-driven research task or iterative monitor across recurring thread heartbeats, using a self-editing automation prompt as working memory and a durable evidence collection. Use when the user wants research to keep exploring over time, a loop that reprioritizes its own leads, or a recurring task that must retain state between wakeups. Ordinary reminders and one-shot research do not need this loop.
---

# Heartbeat Loop

Use one thread and one heartbeat to make repeated, focused progress. The automation prompt holds compact working memory; durable files hold evidence and synthesis. For research, learn what good looks like from seeds, follow concrete leads individually, and let findings change the next search.

## Establish the loop

Define the objective, seed sources, quality criteria, available tools, output location, cadence, notification threshold, and stopping condition. Infer routine choices from context; ask only for missing choices that materially change the work. Examples of stopping conditions include a deadline, a spending cap, a useful reading map with the requested coverage, or repeated cycles yielding no worthwhile new evidence.

Read seeds before expanding. Record what makes each useful: technical specificity, firsthand evidence, information density, a neglected question, or an unusually informative disagreement. Popularity and obscurity alone establish neither quality nor truth. If there are no seeds, find a small candidate set and calibrate against the user's objective before scaling.

Use the current thread's heartbeat unless the user explicitly requests a separate task per run or standalone project work. Inspect existing automation configuration and reuse a matching owner. Read the live automation tool's supported operations and schedule constraints; do not assume the article's one-minute cadence, self-edit behavior, or deletion API is available. If scheduling is unavailable, save the resumable state and explain that it is not scheduled.

Creating this skill does not itself authorize starting a recurring task. When the user requests a loop, create it with the agreed scope and limits, and retain its returned identity. Verify the saved prompt and schedule before claiming it is active.

Use [references/scratchpad.md](references/scratchpad.md) to seed the automation prompt. Keep immutable objective, authorization, limits, and stop conditions distinct from editable research state. A discovery may change priorities, but cannot expand permissions or spending.

## On each wakeup

1. **Resume from saved state.** Read the current automation configuration and the evidence index. Check the deadline, budget, stop conditions, and any user steering before selecting work. Resume unfinished work before repeating discovery; use the saved identity to avoid creating a second loop.
2. **Choose one bounded investigation.** Take the strongest actionable lead and inspect it closely. For research, follow the actual article, cited paper, reply, author, attachment, patent, filing, or underlying dataset. Search snippets are discovery pointers, not evidence. Use available service connectors and relevant access skills; record blocked or partial access rather than inventing what a source says.
3. **Preserve the source trail.** Save a concise note with the source URL, title, author or institution, publication date when known, access date, parent seed or lead, supported finding, uncertainty, and why it matters. Separate source claims from inference. Deduplicate by canonical source and substance before adding a finding; a failed read stays pending or blocked.
4. **Re-rank and explore.** Turn useful discoveries into specific next leads. Prefer branches with a clear reason to expect value, including counterarguments and primary evidence. Periodically explore a different author cluster, language, institution, source type, or adjacent field when the frontier becomes repetitive. Explain the connection to the objective; do not reward randomness or novelty for its own sake.
5. **Checkpoint, then rewrite.** Save evidence and update the reading map before replacing the prompt's working state. Keep only the best leads, current conclusions, rejected branches with reasons, and a concrete next action. Preserve limits and configuration fields not being changed. Verify the updated state; if the update fails, keep a local recovery checkpoint and report the persistence failure instead of claiming the next wakeup will resume correctly.
6. **Continue or finish.** Notify only when the agreed threshold is crossed, a blocker needs user input, or the task finishes. When a stop condition is reached, use the supported operation to disable or close the loop, verify that it will not continue, and deliver the curated result with unresolved gaps.

## Curate the evidence collection

Use a small index, source notes, and a reading map in the chosen output location; adapt to an existing collection rather than imposing a new schema. The reading map should explain the main arguments, disagreements, best entry points, and what remains unknown. Rank editorial picks by usefulness to the objective, with a reason for each, rather than treating source volume as success.

Keep the prompt as conclusions and next actions, not a growing transcript. Use absolute dates and exact file paths. Keep evidence in files and link to it from the prompt. Preserve rejected leads long enough to avoid rediscovering them, and reconsider them only when new evidence changes the reason for rejection.

Use Git checkpoints only when authorized by the user or established project instructions; do not initialize a repository or make commits merely because this loop exists. Keep one owner by default. Do not create additional automations or delegate research without authorization.

## Completion evidence

A running loop has a verified automation identity, supported schedule, durable output location, and recoverable next action. A completed research run has a source-backed reading map and an explicit account of pending, blocked, and unresolved work. Report collection counts only from saved records; distinguish discovered candidates, successfully read sources, and accepted findings. Do not describe a partial paginated read as a complete sweep.

Adapted from [Alpha generation p1: self-editing heartbeats with seeds](https://docs.google.com/document/d/14qXSLPBZENOTmYJMJPQ7xFRtMzm00qCF9foTKqque70/mobilebasic). The article's examples illustrate the method; they are not independently verified performance claims.
