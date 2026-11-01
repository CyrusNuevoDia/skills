# Agent CLI design principles

## 1. Agents are not humans with faster fingers

Agents do not need colors, animations, or clever interactive prompts. They need stable contracts, predictable output, and safe failure modes.

Design for:

- Machine readability.
- Deterministic behavior.
- Runtime discoverability.
- Minimal token overhead.
- Explicit permissions and side effects.
- Input rejection before side effects.

## 2. Human DX and agent DX are orthogonal

Keep human-friendly affordances, but do not let them be the only interface. A single binary can serve both audiences if the agent path is explicit and first-class.

Recommended split:

| Human mode | Agent mode |
| --- | --- |
| Pretty tables | JSON / NDJSON |
| Interactive prompts | Explicit flags / dry-run / confirm tokens |
| Convenience flags | Raw JSON payloads |
| Long prose docs | Runtime schema introspection |
| Full object dumps | Field masks and pagination |

## 3. One source of truth

Create a typed command registry or API method registry. Use it for:

- CLI flag generation.
- JSON schema introspection.
- MCP tool generation.
- Validation.
- Examples.
- Help output.
- Tests.

Do not hand-maintain separate command definitions for every surface.

## 4. The shell is a bad API boundary

Agents are error-prone at shell construction. Reduce ambiguity by supporting structured invocation:

- JSON payload files.
- `--json` request bodies.
- `--params` method parameters.
- MCP tools for typed invocation where possible.

When shell invocation is unavoidable, make errors explicit and safe.

## 5. Bounded context is a feature

Large responses make agents dumber. Design list/get commands to return compact data by default and require explicit opt-in for full payloads.

Good defaults:

- `id`, `name`, `type`, `updatedAt`, and pagination tokens.
- No huge body/content fields unless requested.
- No raw binary or large blobs on stdout.

## 6. Safety is part of the developer experience

A safe CLI is easier for agents to use because it turns hallucinations into early, structured failures.

Prefer failing before side effects over attempting to “do what the agent meant.”
