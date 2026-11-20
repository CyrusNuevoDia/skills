---
name: calldiff
description: "Explain, plan, implement, or review code changes through behavioral call-graph diffs: who calls whom before and after. Use for refactors, feature additions, code removal, function moves or extraction, dependency changes, control-flow changes, and reviews where a line diff obscures runtime effects. Run Calldiff for supported-language repositories when call flow materially changes, then interpret its diff, tree, reachability, source-location, or structured output."
---

# Calldiff

Describe code changes as changes in execution structure. Center the explanation on meaningful entrypoints, callees, conditional branches, side effects, and newly or no-longer reachable behavior instead of narrating edited lines.

## Inspect the call flow

Run Calldiff from the repository root. Prefer Bun and pin execution to the latest published CLI:

```bash
# Compare HEAD with the working tree
bunx calldiff@latest diff

# Compare a base ref with the working tree
bunx calldiff@latest diff <base>

# Compare two commits or branches
bunx calldiff@latest diff <from> <to>

# Focus the comparison on meaningful entrypoints and paths
bunx calldiff@latest diff <from> <to> -e <function-or-Class.method> <path...>

# Inspect one snapshot while planning or investigating
bunx calldiff@latest tree [ref] -e <entry> <path...>

# Find every call path from an entrypoint to a target
bunx calldiff@latest reach [ref] -e <entry> --to <target> <path...>
```

Use the repository's actual comparison base instead of assuming `main`. Start `diff` without `--entry` so Calldiff can infer changed exported entrypoints, then add repeated `-e` flags when inference is noisy or misses relevant behavior. Use trailing path filters to keep large repositories focused. Use `--format json` when structured output is easier to analyze reliably than ASCII. The upstream README documents `--locs` for call-site locations; check the relevant subcommand's `--help` before using it because a published package may lag the README.

Calldiff supports TypeScript, TSX, JavaScript, JSX, Python, Go, Rust, Java, Ruby, C, C++, C#, PHP, Kotlin, Swift, Scala, Lua, Elixir, Bash, Haskell, Zig, Solidity, and OCaml. Its Tree-sitter grammars may install into `~/.cache/calldiff/grammars` on first use.

## Build the behavioral diff

1. Identify the user-facing, exported, scheduled, event-driven, or otherwise meaningful entrypoints affected by the change.
2. Trace the relevant calls before and after. Include only the part of the tree needed to explain the runtime effect.
3. Preserve Calldiff's direction: `-` existed in the source state and disappeared; `+` is new in the destination state. Show pure additions and removals even when there is no one-to-one replacement.
4. Explain what now runs, no longer runs, moved beneath a condition, changed order, gained a dependency, or lost a side effect.
5. Distinguish structural movement from behavioral change. If extraction or relocation preserves the reachable calls and ordering, say so directly.

Use a compact tree when it clarifies the change:

```text
handleRequest(input)
- ├─ validateLegacy(input)
- └─ save(input)
+ ├─ parseInput(input)
+ ├─ if (parsed.valid)
+ │  └─ save(parsed.value)
+ └─ emitAuditEvent(parsed)
```

Follow the tree with prose stating the runtime consequence. When supported by the installed CLI, use `--locs` to tie nodes to root definitions and child call sites when reviewing or explaining exact code locations.

## Plan unimplemented changes

Use `tree` to capture the current call shape, then write an explicitly projected before/after tree showing calls to add, remove, reorder, or place behind conditions. After implementation, run `diff` and reconcile the actual tree with the projection; investigate meaningful differences instead of rewriting the explanation to hide them. Use `reach` when a plan depends on whether an entrypoint can invoke a sensitive effect, such as persistence, billing, deletion, or message delivery.

## Verify beyond the graph

Treat Calldiff as syntactic AST evidence, not proof of semantic equivalence. Read the code and run relevant tests for changes involving arguments, return values, mutation, async ordering, errors, dynamic dispatch, dependency injection, callbacks, higher-order functions, aliases, runtime configuration, or framework wiring. Report empty or incomplete results honestly and supplement them with a manually traced call diff.

## Present the result

Lead with the behavioral outcome. Include the smallest useful call-tree diff, then explain consequences, preserved invariants, and uncertainties Calldiff cannot resolve. Avoid line-by-line summaries unless a particular expression changes data or control flow in a way the call tree cannot show.
