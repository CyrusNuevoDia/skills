# Source notes

Primary source: Justin Poehnelt, “You Need to Rewrite Your CLI for AI Agents,” published March 4, 2026.

URL: https://justin.poehnelt.com/posts/rewrite-your-cli-for-ai-agents/

License noted on the source page: CC BY-SA 4.0. This skill package is an adapted, paraphrased derivative and preserves attribution.

## Distilled argument

The article argues that CLIs used by AI agents need different defaults from CLIs designed only for humans. Human-facing CLIs can prioritize forgiving flags, interactive prompts, colored tables, and prose help. Agent-facing CLIs need deterministic machine-readable IO, schema-aligned input payloads, runtime introspection, context-window control, strong input validation, and dry-run/sanitization safety rails.

## Key patterns adapted into this skill

- Prefer raw JSON payloads over custom flag layers for nested API objects.
- Keep human convenience flags, but make the raw payload path first-class.
- Let agents query schemas at runtime instead of relying on stale prompt-bundled docs.
- Use field masks and stream-friendly pagination to avoid overwhelming the model context.
- Harden inputs around agent hallucinations, not only human typos.
- Add dry-run support for mutating operations.
- Sanitize untrusted responses before returning them to an agent.
- Ship skill/context files containing non-obvious invariants and safe usage recipes.
- Reuse one command registry across CLI, MCP, extension, and environment-variable surfaces.

## Attribution language

This package is based on ideas from Justin Poehnelt’s article “You Need to Rewrite Your CLI for AI Agents.” It has been reorganized into an operational skill for designing and auditing agent-facing CLIs.
