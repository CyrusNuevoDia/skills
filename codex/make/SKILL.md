---
name: make
description: |
  Full-stack feature builder. Shapes requirements with the human via /shaping
  and /build, researches codebase with Codex, plans implementation, then
  orchestrates parallel Codex agents to write the code.
  Codex thinks, Codex builds.
---

# Make

Codex elicits. Codex researches. Codex plans. Codex builds. Codex verifies.

## Model policy

Delegated Codex runs use one of these models and reasoning efforts:

- **Luna** for routine, bulk, mechanical, or clear-spec research and builders.
- **Sol** for complex research and builders, architecture, integration, or stubborn repair work.

Use the current project's model policy and the runtime's native agent tool. If model selection is unavailable, inherit the parent model.

## Roles

| Role     | Actor                 | Purpose                                   |
| -------- | --------------------- | ----------------------------------------- |
| Elicitor | Codex + Human         | Shape requirements, resolve ambiguity     |
| Subagent | Native subagent       | Research codebase, gather context         |
| Planner  | Codex                 | Decompose into parallelizable workstreams |
| Builder  | Native subagent       | Write the code                            |
| Verifier | Codex                 | Tests, lint, typecheck, review            |

## Phase 1: Shape

Invoke sub-skills to collaboratively define the problem and solution with the human.

### Step 1: Shape the solution

Use `shaping` if installed. Work with the human to:

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

**Delegate codebase exploration through the runtime's native agent tool.** Give the researcher a self-contained prompt and consume its report.

Delegate context gathering directly to the subagent: do not pre-gather paths, run exploratory searches for it, or embed file contents. Give it the shaped requirements and the questions it must answer, then let it inspect the repo.

Include the goal, scope, constraints, deliverables, and context in the research prompt.

The research prompt must include:

1. The shaped requirements from Phase 1 (summarized)
2. Specific questions: existing patterns to reuse, types to extend, entry points to hook into, gotchas
3. An instruction to inspect the repository directly and gather all needed context itself
4. An instruction to return a structured report that Phase 3/4 can feed directly into Builder Codex prompts

The subagent's report must include, for each relevant area:

- **File paths** (absolute or repo-relative) — the exact files Builders will need
- **Excerpts** — the specific functions, types, or blocks Builders should see, quoted inline
- **Patterns to reuse** — named conventions with a pointer to a canonical example
- **Gotchas** — invariants, ordering constraints, or non-obvious coupling

The shape of this report matters: Codex will paste chunks of it verbatim into Builder prompts, so it should be copy-paste-ready rather than prose.

### Summarize findings

Present the subagent's analysis to the user. Highlight:

- Existing patterns and utilities to reuse
- Types and schemas to extend
- Entry points to hook into
- Potential gotchas or conflicts

## Phase 3: Plan

Decompose the implementation into independent, parallelizable workstreams.

### Workstream spec

Each workstream must define:

| Field         | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| **Scope**     | What this workstream builds (1-2 sentences)                                               |
| **Files**     | Exact files to create or modify                                                           |
| **Context**   | Paths, excerpts, and patterns from the Phase 2 subagent report that this workstream needs |
| **Standards** | Coding patterns and conventions to follow                                                 |
| **Success**   | How to verify this workstream is correct                                                  |

### Conflict prevention

**Workstreams MUST touch non-overlapping files.** If two workstreams need to modify the same file, they must run sequentially — mark the dependency explicitly.

Before dispatching, validate:

- No two parallel workstreams share a file
- Sequential dependencies are ordered correctly
- Each workstream is self-contained (has all context it needs)

### Present plan to user

Show the workstream breakdown and ask for approval before dispatching. The user must see:

- How many workstreams and which are parallel vs sequential
- What each workstream does
- Which files each touches

## Phase 4: Execute

Dispatch Codex agents to implement each workstream.

Use the runtime's native agent tool for each builder. Include the task, allowed files, constraints, and deliverables in the workstream prompt.

### Workstream prompt template

The prompt to each codex agent must include:

1. **Task** — What to build (from workstream scope)
2. **Context** — Relevant paths, excerpts, patterns, and gotchas from the Phase 2 subagent report
3. **Standards** — Coding conventions from AGENTS.md (no semicolons, Biome, arrow functions, etc.)
4. **Constraints** — Files this agent may touch (nothing else), patterns to reuse
5. **Success criteria** — What "done" looks like

### Dispatch strategy

- **Independent workstreams** — Launch in parallel when the current environment supports concurrent subagent runs
- **Sequential workstreams** — Wait for dependencies to complete before dispatching
- **Monitor** — Collect output from each agent as it completes

### If a workstream fails

1. Read the error output
2. Diagnose: missing context? wrong file? bad assumption?
3. Re-dispatch with corrected prompt — do NOT fix it manually

## Phase 5: Verify

After all codex agents complete, Codex verifies the full integration.

### Verification checklist

Run these in order:

1. **Typecheck** — `bunx tsc --noEmit`
2. **Lint** — `bun run lint`
3. **Format** — `bun run fmt`
4. **Test** — `bun test`
5. **Review** — Read all changed files, check for quality and integration issues

### Handling failures

- **Type errors** — Re-dispatch a codex agent with the error context and affected files
- **Lint/format** — Run `bun run fmt` to auto-fix, only re-dispatch if structural issues
- **Test failures** — Re-dispatch with test file + implementation file + error output
- **Quality issues** — Re-dispatch with specific feedback

### Done

Present the user with:

- Summary of what was built
- Files created or modified
- Verification results
- Any remaining concerns

## Notes

- **The orchestrator never writes code during execution.** Builder subagents write code; the orchestrator plans, verifies, and re-dispatches.
- **Codex never explores the codebase.** Codebase exploration runs in Codex subagents, not in the orchestrator. If you catch yourself reaching for `rg`/`fd`/`cat` to understand the repo, stop and dispatch a Codex subagent instead.
- **Context quality matters.** The better the prompt, the better the output. Invest time in Phase 2.
- **Parallelism is the point.** The whole reason to decompose into workstreams is to run them concurrently.
- **Re-dispatch, don't patch.** If codex output is wrong, fix the prompt and re-run — don't manually edit.
