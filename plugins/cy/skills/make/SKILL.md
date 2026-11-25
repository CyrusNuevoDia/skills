---
name: make
description: |
  Full-stack feature builder. Shapes requirements with the human via /shaping
  and /build, researches the codebase with Claude subagents, plans the
  implementation, then orchestrates parallel Claude subagents to write the code.
  Claude models only: never dispatches GPT or Codex.
---

# Make

You orchestrate; Claude subagents research, build and verify. Every delegation goes through the Agent tool
(or a Workflow, when the user opted into one) with an explicit `model`. Never dispatch GPT models, Codex,
`codex exec` or the `subagent` skill from this skill. The Codex copy of `make` in `~/.agents/skills/make`
is the GPT version and stays separate.

## Model policy

Pick by the work, not the price; escalate without asking when output misses the bar.

| Model    | Use for |
| -------- | ------- |
| `fable`  | Hard or ambiguous work: architecture, integration across modules, stubborn repairs, plan and implementation reviews, anything user-facing that needs taste |
| `opus`   | Most builders on a clear spec, research that needs judgment, reviews when fable is not warranted |
| `sonnet` | Bulk mechanical edits on a decision-complete spec, migrations, wide read-only surveys |
| `haiku`  | Only trivial, fully specified lookups (list files, grep and summarise); never code that ships |

Anything user-facing that is not mechanical (docs, UI, copy) needs `opus` or `fable`. Reviews of plans and
implementations use `fable` or `opus`.

## Roles

| Role     | Actor                                    | Purpose                                   |
| -------- | ---------------------------------------- | ----------------------------------------- |
| Elicitor | You + Human                              | Shape requirements, resolve ambiguity     |
| Research | Claude subagent (`Explore` or general)   | Read the codebase, gather context         |
| Planner  | You (optionally a `Plan` agent)          | Decompose into parallelizable workstreams |
| Builder  | Claude subagent (`general-purpose`)      | Write the code                            |
| Verifier | You, plus a `fable`/`opus` reviewer      | Tests, lint, typecheck, review            |

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

**Exit criteria:** A shaped pitch with clear requirements, a selected shape, and zero open questions.

## Phase 2: Research

Delegate codebase exploration to a Claude subagent rather than sweeping the repo yourself: main-thread
context is the scarce resource. Use the `Explore` agent (`sonnet`, or `opus` when the questions need
judgment) for locating code, and a `general-purpose` agent when it must run commands. Don't pre-gather paths
for it; give it the shaped requirements and the questions it must answer.

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

| Field         | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| **Scope**     | What this workstream builds (1-2 sentences)                                 |
| **Files**     | Exact files to create or modify                                             |
| **Model**     | `fable`, `opus` or `sonnet`, per the model policy                            |
| **Context**   | Paths, excerpts, and patterns from the research report this workstream needs |
| **Standards** | Coding patterns and conventions to follow                                   |
| **Success**   | How to verify this workstream is correct                                    |

### Conflict prevention

**Workstreams MUST touch non-overlapping files.** If two need the same file, run them sequentially and mark
the dependency. When builders could collide anyway, give each `isolation: "worktree"`.

Before dispatching, validate:

- No two parallel workstreams share a file
- Sequential dependencies are ordered correctly
- Each workstream is self-contained (has all context it needs)

### Present plan to user

Show the workstream breakdown and ask for approval before dispatching: how many workstreams, which run in
parallel, what each does, which files and which model each uses.

## Phase 4: Execute

Dispatch one Claude subagent per workstream with the Agent tool (`subagent_type: "general-purpose"`, an
explicit `model`). Launch independent workstreams in a single message so they run concurrently.

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
2. Diagnose: missing context? wrong file? bad assumption? model too weak?
3. Continue the same agent with SendMessage when it has useful context, or re-dispatch with a corrected
   prompt (escalating the model if the output missed the bar) — do NOT patch it by hand

## Phase 5: Verify

After all builders complete, verify the full integration yourself:

1. **Typecheck** — `bunx tsc --noEmit`
2. **Lint** — `bun run lint`
3. **Format** — `bun run fmt`
4. **Test** — `bun test`
5. **Review** — read every changed file (the full diff, not the agents' summaries), and for non-trivial work
   dispatch a `fable` or `opus` reviewer given the code, not your conclusions

Use the repo's own commands where they differ from these.

### Handling failures

- **Type errors** — Re-dispatch a builder with the error context and affected files
- **Lint/format** — Run the formatter to auto-fix, re-dispatch only for structural issues
- **Test failures** — Re-dispatch with test file + implementation file + error output
- **Quality issues** — Re-dispatch with specific feedback

### Done

Present the user with a summary of what was built, the files created or modified, the verification results,
and any remaining concerns.

## Notes

- **The orchestrator never writes code during execution.** Builders write code; you plan, verify, and
  re-dispatch.
- **Claude models only.** No GPT, no Codex, no `codex exec`, no `subagent` skill.
- **Context quality matters.** The better the prompt, the better the output. Invest time in Phase 2.
- **Parallelism is the point.** Decompose so independent workstreams run concurrently.
- **Re-dispatch, don't patch.** If a builder's output is wrong, fix the prompt and re-run.
