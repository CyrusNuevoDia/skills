# Codex exec guide

Use `codex exec` (or `codex e`) for non-interactive runs.

## Codex CLI features (context)
Interactive mode:
- `codex` launches the full-screen UI for conversational workflows.
- `codex "Explain this codebase to me"` starts with an initial prompt.
- Use `/exit` or Ctrl+C to close.

Resume sessions:
- `codex resume` opens the picker for interactive sessions.
- `codex resume --all` shows sessions across directories.
- `codex resume --last` jumps to the most recent session.
- `codex resume <SESSION_ID>` targets a specific run.
- `codex exec [OPTIONS] resume --last "<prompt>"` resumes the most recent non-interactive run.
- `codex exec [OPTIONS] resume <SESSION_ID> "<prompt>"` resumes by ID.
- **Flag ordering matters:** `--sandbox`, `--cd`, `-c`, `--output-last-message`, etc. must come BEFORE the `resume` subcommand. Putting them after the session id fails with `error: unexpected argument '--sandbox' found`.
- A resumed session keeps the prior run's context (files it already changed, decisions). Use it to finish a run that was blocked partway (e.g. a sandbox block) without re-doing completed work.

Models and reasoning:
- Use `--model gpt-6-luna` for routine work and `--model gpt-6.1-sol` for
  complex work (see Model selection below).
- Switch mid-session with `/model` or specify on launch: `codex --model <name>`.

Image inputs:
- `codex -i screenshot.png "Explain this error"`
- `codex --image img1.png,img2.jpg "Summarize these diagrams"`

## Common flags
- `--cd PATH` set workspace root for the run
- `--json` output newline-delimited JSON events
- `--model NAME` override model (see Model selection — usually omit)
- `--sandbox read-only|workspace-write|danger-full-access` set sandbox (`--full-auto` is deprecated; it warns and maps to workspace-write)
- `-c model_reasoning_effort=low|medium|high` set reasoning effort (config override, works with the default model)
- `--output-last-message PATH` write final message to a file (read this for the run's summary)
- `--skip-git-repo-check` allow running outside a Git repo
- `[OPTIONS] resume <SESSION_ID>` continue a prior exec session (options before `resume`)

Use `--yolo` or `--sandbox danger-full-access` when the run must commit to git or write outside the workdir (see Sandbox & writable paths); otherwise stick to `workspace-write`.

## Model selection
Pass `--model` explicitly on every run:

- `codex exec --model gpt-6-luna -c model_reasoning_effort=high ...` for
  lighter multi-file reads, straightforward edits, and routine, bulk, or
  clear-spec builders.
- `codex exec --model gpt-6.1-sol -c model_reasoning_effort=high ...` for
  complex research, implementation, debugging, and review, and for
  architecture, difficult integration, and stubborn repair work.

Do not dispatch GPT-5.x or Terra runs; Terra is deprecated. Confirm any model outside this policy is available
on the active account before using it.

Control difficulty with reasoning effort (valid values: `none, minimal, low, medium, high,
xhigh` — an invalid value errors and lists these):
- `high` with Luna — multi-file reading, straightforward edits, light refactors; raise to `xhigh` before reaching for Sol.
- `high` with Sol — complex reasoning, tricky bugs, broader changes, architecture, integration, and stubborn repairs. Sol takes `low|medium|high`.

Only pass a different `--model` after confirming the name is available on the active account
(a quick throwaway run shows it in the header). Mostly-IO tasks: low effort + a compact prompt.

## Fast mode (optional opt-in)
Codex exposes a **stable `fast_mode` feature** for quicker GPT responses. Toggle it per run:
- enable: `--enable fast_mode` (equivalently `-c features.fast_mode=true`)
- disable: `--disable fast_mode` (equivalently `-c features.fast_mode=false`)

Check the effective state with `codex features list | rg fast_mode` (columns: name, stage,
effective state) — on some installs it is already `true` globally, so enabling is a no-op
there and the flag mainly matters for forcing it on/off explicitly. It composes with
`--model`/`-c model_reasoning_effort`. Prefer it for speed-sensitive runs; disable it if you
suspect it is degrading output quality on a hard task.

## Sandbox & writable paths
- `workspace-write` makes the workdir (plus `/tmp`, `$TMPDIR`) writable — the default for edits.
- `.git` is **excluded** from the writable roots under `workspace-write`, so `git commit`/`git push`
  fail inside the sandbox. If the run should commit, launch with `--sandbox danger-full-access`
  (or `--yolo`, which also skips approvals) and spell out the exact git operations allowed.
- Writes **outside the workdir** (another repo, `~/.config`, etc.) are likewise blocked; same
  escalation applies — name the exact external paths in the prompt.
- Dirs containing `.codex-plugin`/`.claude-plugin` markers (e.g. `.agents/plugins/...`) are
  treated as **read-only even inside the workdir**; `apply_patch`/`test -w` there fail. To edit
  them, run with `--sandbox danger-full-access` (or add the dir to writable roots) and keep the
  prompt's scope tight.

## Code reading workflow
Start with discovery:
- `rg --files` to get a quick file list.
- `rg -n \"<keyword>\" -S` to find relevant locations.
- Read `AGENTS.md`/`CLAUDE.md`/`README.md` if present.

Minimize context bloat:
- Open only the files needed for the current step.
- Prefer small, targeted excerpts over whole files.
- Summarize long files instead of copying them wholesale.

When asked to change code:
- Locate the narrowest owning module.
- Trace call sites before editing.
- Note any tests or scripts affected.
