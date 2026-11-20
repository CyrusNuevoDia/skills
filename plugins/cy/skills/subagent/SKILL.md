---
name: subagent
description: Delegate codebase exploration or scripted actions to a non-interactive Codex exec run (codex exec / codex e). Use when you want a subagent to read lots of code or take actions without human interaction, and you can accept CLI output and optional file changes as the result.
---

# Subagent

## When to use
- Delegate large codebase reading, searching, or multi-step actions to a non-interactive exec run.
- Offload scripted or CI-style tasks that should finish without questions.

## Inputs / outputs
- Inputs: a prompt string; common flags `--model gpt-6.1-sol|gpt-6-luna`, `--cd PATH`, `--sandbox <mode>`, `-c model_reasoning_effort=<medium|high|xhigh>`, `--enable fast_mode`, `--output-last-message PATH`, `--json`.
- Outputs: CLI output from the exec run; possible file edits in the target repo.
- For long prompts, write the prompt to a temp file and pass `"$(cat /tmp/prompt.txt)"` rather than inlining — avoids shell-quoting breakage.

## Prompt template
Use a structured prompt to keep exec runs focused:

```
Goal:
Scope/paths:        # allowed files / file ownership — builders touch ONLY these
Do NOT:             # locked decisions, forbidden moves (no commits, no new deps, no schema changes…)
Spec:               # numbered, decision-complete steps
Verification:       # exact commands the run must pass before reporting done
Deliverables:       # end with a COPY-PASTE-READY report contract
Context:            # empirical repo facts the run can't discover cheaply
```

- Prompts must be self-contained: the exec run has no session hooks and no conversation history — embed repo facts (build commands, conventions, paths) rather than assuming them.
- Default to "do not commit"; the orchestrator reviews the diff and commits.
- For research/scoring delegations, state the ranking axis as who-buys/who-has-access with explicit disqualifiers, not a topic ("people who sell to labs or work at labs", not "AI people").
- Never paste tokens/PATs/secrets into prompts — prompt text persists in transcripts and gets forwarded to subagents. Pass secrets via env and instruct agents never to print them.

## Steps
1. Decide the task and repo root; include constraints and expected deliverables in the prompt.
2. **Model & effort:** use `--model gpt-6-luna -c model_reasoning_effort=high` for lighter multi-file edits and reads and other routine, bulk, or clear-spec work, raising Luna to `xhigh` before reaching for Sol. Use `--model gpt-6.1-sol -c model_reasoning_effort=high` for complex work, including architecture, integration, or stubborn repair tasks; Sol takes `low|medium|high`. Valid efforts are `none|minimal|low|medium|high|xhigh`. Do not dispatch GPT-5.x or Terra runs; Terra is deprecated. Confirm any other `--model` name is available on this account before using it.
3. **Fast mode (optional opt-in):** Codex has a stable `fast_mode` feature (quicker GPT responses). Turn it on per run with `--enable fast_mode` (equivalently `-c features.fast_mode=true`); turn it off with `--disable fast_mode`. It's already effective in some installs — check with `codex features list | rg fast_mode` (third column is the effective state). Use it for speed-sensitive runs; leave it off if you suspect it's degrading output.
4. Run `codex exec` with flags; for workspace edits use `--sandbox workspace-write` (`--full-auto` is deprecated). Capture the final summary with `--output-last-message /tmp/run.out.txt`. Attach images with `-i/--image`; use `--skip-git-repo-check` outside a Git repo.
5. **When the run needs `--sandbox danger-full-access` (or `--yolo`):** `workspace-write` blocks three things a run may legitimately need — (a) **git commits/pushes** (`.git` is excluded from the writable roots, so `git commit` fails), (b) **paths outside the workdir** (another repo, `~/.config`, submodule remotes), (c) **plugin dirs** holding `.codex-plugin`/`.claude-plugin` markers (e.g. `.agents/`), which are read-only even inside the workdir. If the task requires any of these, launch with `--sandbox danger-full-access` (or `--yolo`, which also skips approvals) up front — don't let the run hit the wall and resume. Compensate with a tight prompt: exact allowed paths, exact git operations, "do not touch anything else."
6. **Resume** when the follow-up builds on the same context (providers after a repo overview, reviewing verbose test output, continuing a multi-step run). Flags go BEFORE the subcommand: `codex exec [OPTIONS] resume <SESSION_ID> "<prompt>"`. Start a fresh run when the task changes repos, needs clean context, or should branch (e.g., exploring unrelated areas in parallel).
7. Long runs: launch in the background and read `--output-last-message` on completion rather than blocking. Wait for completion; review output and any file changes.
8. If the task references a plan directory, update `learnings.md` in that plan directory with key findings and decisions.

## Exec mechanics (hard-won; each cost a real debugging session)
- Close stdin on background runs — `codex exec … < /dev/null` — or the run hangs waiting for EOF.
- `--output-last-message` must point at a path writable from inside the sandbox; under `--sandbox read-only` an unwritable path fails silently (empty file).
- Non-interactive exec runs fire NO SessionStart hooks — anything a hook would inject (e.g. `capn context`) must go into the prompt.
- Instant `EXIT 1` with no output = quota exhaustion, not a prompt bug; retryable after backoff.
- Under a sandbox, point tool caches at the workspace (e.g. `UV_CACHE_DIR=.uv-cache`) — default caches live outside the writable root. Heredocs can fail under read-only zsh; prefer `"$(cat file)"`.
- Never launch parallel exec builders in the same Bun repo — the lockfile race SIGKILLs them; serialize or stagger. More generally: never run two delegates that mutate the same files; parallelize only across disjoint file scopes.

## Result checklist
- Did it identify the right files and entry points?
- Are key decisions and rationale explicit?
- Are edits (if any) listed clearly?
- Are tests or verification steps noted?

## Session tracking
- Always copy the exec `session id` into the main thread for resuming.

## Safety
- Prefer `--sandbox workspace-write` for plain in-workdir edits; escalate to `danger-full-access` or `--yolo` when the task includes git commits, writes outside the workdir, or plugin dirs (see step 5). Escalated runs get a tighter prompt, not a looser one: name the exact paths and git operations allowed, and forbid everything else explicitly.
- `--yolo` = no sandbox AND no approvals; `danger-full-access` = no sandbox but approval policy still applies. Either is fine for trusted delegations in your own repos; don't use them on prompts that ingest untrusted content (web pages, third-party issues).
- Keep prompts specific about allowed paths and operations.
- Codex makes incidental edits it may not report — review the full `git diff`, not just the run's summary, and revert anything out of scope.

## Resources
- `resources/references/codex-exec.md` includes flags, model selection, and code-reading guidance.
