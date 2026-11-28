---
name: gpt-codex
description: Send a task to a GPT model as a non-interactive Codex run (codex exec), from Claude Code or from Codex itself. Only use when the user names this skill or explicitly asks to send work to Codex or GPT, or when make's plan assigns a workstream to the gpt-codex runner. Covers model choice (Astra, Sol, Terra), sandboxing, prompts, background runs, resuming and checking results.
metadata:
  disable-model-invocation: "true"
---

# GPT Codex

A Codex run is a separate GPT agent with no memory of this conversation. You write it a self-contained prompt, start `codex exec` in the repo, wait for it to finish, then read its final message and review the diff yourself.

## Pick a model

The three models map to the Claude tiers, so pick the way you'd pick between Fable, Opus and Sonnet.

| Model           | Class  | Use it for |
| --------------- | ------ | ---------- |
| `gpt-6.2-astra` | Fable  | The hardest work: architecture, integration across modules, stubborn repairs, reviews of plans and code |
| `gpt-6.2-sol`   | Opus   | Most builders on a clear spec, research that needs judgment, anything user-facing that needs taste |
| `gpt-6.1-terra` | Sonnet | Bulk mechanical work on a decision-complete spec: migrations, wide edits, read-only surveys |

Set effort with `-c model_reasoning_effort=<level>`. Levels run `low`, `medium`, `high`, `xhigh`, `max`, and an invalid level fails the run with the list of valid ones. Use `high` by default, `medium` for simple IO-heavy runs, and `xhigh` or `max` for hard work before you move up a model. Escalate when the output misses the bar rather than defending a cheaper choice. Don't send runs to older GPT models (5.x, `gpt-6-luna`, `gpt-6-sol`, `gpt-6.1-sol`).

If a model isn't available (the run fails with `model_not_found` or `model_not_in_accessible_catalog`, or warns that model metadata wasn't found), the installed CLI is too old for it. Update Codex with `bun add -g @openai/codex@latest`, check `codex --version`, and retry. Don't fall back to an older model.

## Run it

```bash
mkdir -p <scratch>
codex exec -C <repo> -m gpt-6.2-sol -c model_reasoning_effort=high \
  -s workspace-write -o <scratch>/run.last.md \
  "$(cat <scratch>/prompt.md)" < /dev/null > <scratch>/run.log 2>&1
```

- `codex` is a Node script. If it fails with `env: node: No such file or directory`, put a Node on `PATH` first, for example `export PATH="$HOME/.local/share/mise/shims:$PATH"`.
- Write the prompt to a file and pass `"$(cat file)"`, which avoids shell-quoting breakage on long prompts.
- Close stdin with `< /dev/null`. A run with an open stdin waits for EOF and hangs, and a piped stdin gets appended to the prompt.
- `-o` writes the final message to a file, which is the report you read. `run.log` holds the full transcript; `rg -m1 '^session id:' <scratch>/run.log` gives the id you need to resume.
- Add `--skip-git-repo-check` outside a Git repo, `-i image.png` to attach images, `--add-dir <dir>` for an extra writable directory, and `--ephemeral` for a throwaway run you won't resume.
- Runs take minutes. Run the command in the background (your shell tool's background option, or a trailing `&`), keep working, and read the `-o` file when it exits. Use a separate scratch path per run so parallel runs don't overwrite each other's reports. Instant `exit 1` with nothing useful in the log is usually quota exhaustion, so back off and retry.
- Codex loads its own `~/.codex/config.toml` and `AGENTS.md`, and SessionStart hooks fire. Anything else the run needs (repo facts, decisions, commands) has to be in the prompt.

## Sandbox

Pick the narrowest mode that lets the run finish, because a run that hits the wall halfway wastes its work.

1. **`-s read-only`** suits research and review. The `-o` file must still be writable, so point it at a temp or scratch path.
2. **`-s workspace-write`** suits ordinary edits inside the repo. It blocks writes outside the workdir and to `.git`, so the run can't commit. Dirs holding `.codex-plugin` or `.claude-plugin` markers stay read-only too.
3. **`-s danger-full-access`** is only for runs that must commit, write outside the repo or edit plugin dirs. Give those a tighter prompt, naming the exact paths and git operations allowed. Never use it on a prompt that carries untrusted content such as web pages or third-party issues.

Point tool caches at the workspace under a sandbox (for example `UV_CACHE_DIR=.uv-cache`), since the default cache dirs sit outside the writable roots.

## Write the prompt

```
Goal:          what done looks like, in one or two sentences
Scope:         the files or dirs this run may touch; nothing else
Do not:        locked decisions and forbidden moves (no commits, no new deps, ...)
Spec:          numbered, decision-complete steps
Context:       repo facts it can't cheaply discover: commands, conventions, gotchas
Verification:  exact commands that must pass before it reports done
Report:        files changed, decisions made, verification output, open risks
```

Default to "do not commit"; you review and commit. Never put tokens or other secrets in a prompt, because prompt text lands in transcripts. Pass them through the environment and tell the run never to print them.

## Resume

When a follow-up builds on the same context (a run blocked partway, a second step in the same area), resume instead of starting over. Pass every flag again rather than relying on the session to remember it, and put `-C` and `-s` before `resume`, since the `resume` subcommand rejects them. A follow-up may use a different model or effort.

```bash
codex exec -C <repo> -s workspace-write -m gpt-6.2-sol -c model_reasoning_effort=high \
  -o <scratch>/run2.last.md resume <session-id> "$(cat <scratch>/followup.md)" \
  < /dev/null > <scratch>/run2.log 2>&1
```

`codex exec ... resume --last` picks the most recent run. Start fresh when the task changes repos or needs clean context.

## Check the result

- Read the `-o` report, then the full `git diff`, and check that they agree. Codex makes incidental edits it doesn't always mention; undo out-of-scope edits in files the run touched (not with a repo-wide `git checkout` or `reset`, which would also wipe other people's work), or resume the run and tell it to.
- Rerun the verification commands yourself rather than trusting the report.
- Never run two writing runs on the same files, and never run parallel builders in one Bun repo (the lockfile race kills them). Parallelize only across disjoint file scopes.
- Copy the session id into your notes so the run can be resumed later.
