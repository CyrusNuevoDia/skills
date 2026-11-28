---
name: make
description: |
  Full-stack feature builder. Shapes requirements with the human via /shaping
  and /build, researches the codebase with subagents, plans the implementation,
  then orchestrates parallel subagents to write the code. The user names the
  runner for every delegation: Codex subagents, gemini-agy or gpt-codex.
---

# Make

You orchestrate; subagents research, build and verify. Every delegation goes to a runner the user named, with an explicit model.

## Runners

Before the first delegation (Phase 2), the user must have named the runner: one for the whole build, or one per role or workstream. If they haven't, stop and ask, listing the three runners below. Never pick a runner yourself or fall back to one, and don't switch runners mid-build without asking. Once a runner is named, choosing its model per task is your call.

| Runner       | How you dispatch | What it's good at |
| ------------ | ---------------- | ----------------- |
| `codex`      | Codex's native subagents, with an explicit model | Results come back inside this session, and subagents share your config, tools and sandbox |
| `gemini-agy` | Read `../gemini-agy/SKILL.md` (next to this skill's directory) and follow it | A second model family with its own quota, useful for independent builders and for reviews that shouldn't share GPT's blind spots |
| `gpt-codex`  | Read `../gpt-codex/SKILL.md` and follow it | A separate `codex exec` process with its own sandbox mode and a resumable session, for runs that need a different sandbox than yours or should run in the background |

`gemini-agy` and `gpt-codex` are set to manual-only, so they won't load on their own; read their `SKILL.md` files directly. Both runners are separate CLIs: they see only the prompt you write, report through a file or JSON, and make edits you must review in the diff.

### Models by class

Pick the class by the work, then take the named runner's model for that class; the runner's skill says how to set effort. Escalate without asking when output misses the bar.

| Class  | Use for | `codex` and `gpt-codex` | `gemini-agy` |
| ------ | ------- | ----------------------- | ------------ |
| Fable  | Hard or ambiguous work: architecture, integration across modules, stubborn repairs, plan and implementation reviews, user-facing work that needs taste | `gpt-6.2-astra` | `gemini-4-hydrogen` |
| Opus   | Most builders on a clear spec, research that needs judgment | `gpt-6.2-sol` | `gemini-4-neon` |
| Sonnet | Bulk mechanical edits on a decision-complete spec, migrations, wide read-only surveys | `gpt-6.1-terra` | none; use `gemini-4-neon` at `medium` effort |

Anything user-facing that isn't mechanical (docs, UI, copy) needs Opus or Fable class. Don't use older GPT models (5.x, `gpt-6-luna`, `gpt-6-sol`, `gpt-6.1-sol`).

## Roles

| Role     | Actor                                     | Purpose                                   |
| -------- | ----------------------------------------- | ----------------------------------------- |
| Elicitor | You + Human                               | Shape requirements, resolve ambiguity     |
| Research | Subagent on the named runner              | Read the codebase, gather context         |
| Planner  | You                                       | Decompose into parallelizable workstreams |
| Builder  | Subagent on the named runner              | Write the code                            |
| Verifier | You, plus a Fable-class reviewer          | Tests, lint, typecheck, review            |

## Phase 1: Shape

### Step 1: Shape the solution

Use the Skill tool to invoke `shaping`. Work with the human to:

- Define requirements (R0, R1, R2...)
- Explore solution shapes (A, B, C...)
- Run fit checks
- Select and detail a shape
- Breadboard into concrete affordances

### Step 2: Lock in implementation decisions

Use the Skill tool to invoke `/build`. Work with the human to:

- Surface remaining questions one at a time
- Provide recommendations with confidence levels
- Lock in each decision before moving to the next
- Resolve all ambiguity

**Exit criteria:** A shaped pitch with clear requirements, a selected shape, zero open questions, and a named runner.

## Phase 2: Research

Delegate codebase exploration to the named runner rather than sweeping the repo yourself: main-thread context is the scarce resource. On `codex`, spawn a native research subagent. On `gemini-agy` or `gpt-codex`, send a read-only research run. Don't pre-gather paths for it; give it the shaped requirements and the questions it must answer.

The research prompt must include:

1. The shaped requirements from Phase 1 (summarized)
2. Specific questions: existing patterns to reuse, types to extend, entry points to hook into, gotchas
3. An instruction to inspect the repository directly and gather all needed context itself
4. An instruction to write its report to a file (in the scratchpad or a plan directory) and return a short
   summary, so Builder prompts can point at the file instead of pasting it

The report must include, for each relevant area:

- **File paths** (repo-relative) — the exact files Builders will need
- **Excerpts** — the specific functions, types, or blocks Builders should see, quoted inline
- **Patterns to reuse** — named conventions with a pointer to a canonical example
- **Gotchas** — invariants, ordering constraints, or non-obvious coupling

### Summarize findings

Present the analysis to the user. Highlight:

- Existing patterns and utilities to reuse
- Types and schemas to extend
- Entry points to hook into
- Potential gotchas or conflicts

## Phase 3: Plan

Decompose the implementation into independent, parallelizable workstreams.

### Workstream spec

| Field         | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| **Scope**     | What this workstream builds (1-2 sentences)                                  |
| **Files**     | Exact files to create or modify                                              |
| **Runner**    | `codex`, `gemini-agy` or `gpt-codex`, as the user named it                   |
| **Model**     | The runner's model for the class this work needs                             |
| **Context**   | Paths, excerpts, and patterns from the research report this workstream needs |
| **Standards** | Coding patterns and conventions to follow                                    |
| **Success**   | How to verify this workstream is correct                                     |

### Conflict prevention

**Workstreams MUST touch non-overlapping files.** If two need the same file, run them sequentially and mark the dependency. In a Bun repo, never run two CLI builders at once, since their concurrent installs race on the lockfile and kill each other.

Before dispatching, validate:

- No two parallel workstreams share a file
- Sequential dependencies are ordered correctly
- Each workstream is self-contained (has all context it needs)

### Present plan to user

Show the workstream breakdown and ask for approval before dispatching: how many workstreams, which run in parallel, what each does, which files, and which runner and model each uses.

## Phase 4: Execute

Dispatch one subagent per workstream on its runner. For `codex`, spawn native subagents with an explicit model and launch independent workstreams together so they run concurrently. For `gemini-agy` and `gpt-codex`, follow that skill's run instructions and start independent runs in the background.

### Workstream prompt template

1. **Task** — What to build (from workstream scope)
2. **Context** — Relevant paths, excerpts, patterns, and gotchas, or the path of the research report
3. **Standards** — Conventions from the repo's AGENTS.md / CLAUDE.md
4. **Constraints** — Files this agent may touch (nothing else), patterns to reuse, no commits
5. **Success criteria** — What "done" looks like, with the exact verification commands
6. **Report contract** — files changed, decisions it made, test output, risks

Prompts are self-contained: the subagent sees only what you write. Never paste secrets into a prompt.

### If a workstream fails

1. Read the error output
2. Diagnose: missing context? wrong file? bad assumption? model too weak? permissions denied?
3. Continue the same agent when it has useful context (a follow-up message on `codex`, resume on the CLI runners), or re-dispatch with a corrected prompt, escalating the model if the output missed the bar. Do NOT patch it by hand

## Phase 5: Verify

After all builders complete, verify the full integration yourself:

1. **Typecheck** — `bunx tsc --noEmit`
2. **Lint** — `bun run lint`
3. **Format** — `bun run fmt`
4. **Test** — `bun test`
5. **Review** — read every changed file (the full diff, not the agents' summaries), and unless the change is a few
   lines, dispatch a Fable-class reviewer on the named runner, given the code, not your conclusions

Use the repo's own commands where they differ from these.

### Handling failures

- **Type errors** — Re-dispatch a builder with the error context and affected files
- **Lint/format** — Run the formatter to auto-fix, re-dispatch only for structural issues
- **Test failures** — Re-dispatch with test file + implementation file + error output
- **Quality issues** — Re-dispatch with specific feedback

### Done

Present the user with a summary of what was built, the files created or modified, the runners and models used, the verification results, and any remaining concerns.

## Notes

- **The orchestrator never writes code during execution.** Builders write code; you plan, verify, and re-dispatch.
- **The user names the runner.** No runner named means ask, not default.
- **Context quality matters.** The better the prompt, the better the output. Invest time in Phase 2.
- **Parallelism is the point.** Decompose so independent workstreams run concurrently.
- **Re-dispatch, don't patch.** If a builder's output is wrong, fix the prompt and re-run.
