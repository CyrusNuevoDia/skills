---
name: gemini-agy
description: Send a task to a Gemini agent through the Antigravity CLI (agy -p), from Claude Code or Codex. Only use when the user names this skill or explicitly asks to send work to Gemini or agy, or when make's plan assigns a workstream to the gemini-agy runner. Covers model choice (Hydrogen, Neon), permissions, prompts, background runs, resuming and checking results. For image, audio, video or Deep Research API calls, use the gemini skill instead.
metadata:
  disable-model-invocation: "true"
---

# Gemini agy

An `agy -p` run is a separate Gemini agent with no memory of this conversation. It works in the directory you start it from, edits files and runs shell commands on its own, then prints one JSON result. You write it a self-contained prompt, run it, then check its result and review the diff yourself.

## Pick a model

The two models map to the Claude tiers, so pick the way you'd pick between Fable and Opus. There's no Sonnet-class Gemini here; for bulk mechanical work use a Sonnet-class runner (a Claude `sonnet` subagent or `gpt-6.1-terra` through gpt-codex).

| Model               | Class | Use it for |
| ------------------- | ----- | ---------- |
| `gemini-4-hydrogen` | Fable | The hardest work: architecture, integration across modules, stubborn repairs, reviews of plans and code |
| `gemini-4-neon`     | Opus  | Most builders on a clear spec, research that needs judgment, anything user-facing that needs taste |

Pass the model with `--model` and the effort with `--effort low|medium|high|xhigh`. Use `high` by default, `medium` for simple runs and `xhigh` for hard ones before you move up a model. Model IDs with the effort baked in (`gemini-4-neon-high`) also work; `agy models` lists them all. Escalate when the output misses the bar rather than defending a cheaper choice.

## Run it

`agy` has no working-directory flag, so `cd` into the repo first:

```bash
mkdir -p <scratch>
cd <repo> && agy -p "$(cat <scratch>/prompt.md)" \
  --model gemini-4-neon --effort high --output-format json \
  < /dev/null > <scratch>/run.json 2> <scratch>/run.err
```

- Write the prompt to a file and pass `"$(cat file)"`, which avoids shell-quoting breakage on long prompts.
- Close stdin with `< /dev/null` so the run never waits on it.
- `--output-format json` prints one object: `conversation_id`, `status`, `response` (the final message), `usage` and `denied_actions`. Read it with `jq -r .response <scratch>/run.json`.
- Add `--add-dir <dir>` to give the run a second directory and `--print-timeout 20m` to cap a run's length.
- Runs take minutes. Run the command in the background (your shell tool's background option, or a trailing `&`), keep working, and read the JSON when it exits. Use a separate output file per run so runs don't overwrite each other.
- The run gets no SessionStart hooks or conversation context from you. Repo facts, decisions and commands it needs go in the prompt.

## Permissions

In its default mode a run edits files and runs shell commands without asking, and nothing confines its writes to the starting directory: a run told to write `../elsewhere/file` will do it. Scope it through the prompt, and check the diff afterwards.

For a tighter run, use `--mode accept-edits`, which allows file edits but denies shell commands unless you allow them for that run with `--settings` (it applies to that run only and is never saved):

```bash
agy -p "..." --mode accept-edits \
  --settings '{"permissions":{"allow":["command(bun)","command(rg)"]}}' ...
```

Allow by executable name. A narrower rule such as `command(bun test)` failed to match in testing, because the run doesn't always issue the command exactly as written (it may add a `cd`, flags or a pipe).

A denied action doesn't fail the run. It still ends with `"status": "SUCCESS"`, often with an empty `response`, and `denied_actions` lists only the kind of action refused (`command`), not the command. Stderr doesn't name the command either, so allow every executable the task will need up front (its build, test and search tools). Check `denied_actions` on every run, and when it isn't empty, resume the conversation with the missing executables allowed rather than redoing the work.

Don't use `--mode plan` for research. It writes a plan into agy's own state directory and asks for approval, so it neither answers nor edits.

Don't reach for `--dangerously-skip-permissions`. Default mode already lets a run edit and run commands, and `accept-edits` plus an allowlist covers the narrower case.

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

Continue a run with its `conversation_id` when a follow-up builds on the same context:

```bash
cd <repo> && agy -p "$(cat <scratch>/followup.md)" --conversation <conversation-id> \
  --model gemini-4-neon --effort high --output-format json \
  < /dev/null > <scratch>/run2.json 2> <scratch>/run2.err
```

Pass `--model`, `--effort`, `--mode` and `--settings` again on every resume; permissions don't carry over from the earlier run.

`--continue` picks the most recent conversation instead. Start fresh when the task changes repos or needs clean context.

## Check the result

- Note `git status` before the run so you can tell its edits from existing work.
- Check `denied_actions` first, then read `response`, then the full `git diff`, and check that they agree. Undo out-of-scope edits in files the run touched (not with a repo-wide `git checkout` or `reset`, which would also wipe other people's work), or resume the run and tell it to.
- Rerun the verification commands yourself rather than trusting the report.
- Never run two writing runs on the same files. Parallelize only across disjoint file scopes.
- Keep the `conversation_id` so the run can be resumed later.
