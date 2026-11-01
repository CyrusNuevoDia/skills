---
name: cli
version: 1.0.0
description: Use this skill when designing, auditing, or retrofitting command-line interfaces that AI agents will invoke. Best for API-wrapping CLIs, developer tools, internal ops tools, MCP-backed tools, and headless automation surfaces.
license: CC-BY-SA-4.0
source:
  title: You Need to Rewrite Your CLI for AI Agents
  author: Justin Poehnelt
  url: https://justin.poehnelt.com/posts/rewrite-your-cli-for-ai-agents/
  published: 2026-03-04
---

# CLI

## Use this when

Use this skill when the task involves any of the following:

- Designing a new CLI that will be called by AI agents.
- Retrofitting an existing human-first CLI for agent use.
- Wrapping a structured API in a CLI, MCP server, extension, or other agent surface.
- Reviewing a CLI for deterministic output, schema introspection, context-window efficiency, input safety, dry-run behavior, or prompt-injection resistance.
- Writing `AGENTS.md`, `CONTEXT.md`, `SKILL.md`, examples, or tests for agent-facing command usage.

## Core thesis

Human DX optimizes for forgiveness, discoverability, and interactive ergonomics. Agent DX optimizes for predictability, explicit contracts, bounded context, and defense in depth.

Do not assume an AI agent is a trusted operator. Treat agent-generated input like adversarial input that happens to arrive through a shell.

## Desired outcome

A good agent-facing CLI should provide:

1. Deterministic, machine-readable output.
2. Raw payload input paths that map directly to the underlying API or command model.
3. Runtime schema introspection so the agent can ask the CLI what it accepts.
4. Response shaping and pagination to protect the agent's context window.
5. Input validation designed around agent-specific mistakes and hallucinations.
6. Dry-run and preview paths for mutating operations.
7. Response sanitization for untrusted data returned to an agent.
8. A single source of truth reused across CLI, MCP, extension, and environment-variable surfaces.
9. Agent-specific usage guidance shipped beside the binary.

## Non-negotiable design rules

### Keep stdout parseable

- When `--output json`, `OUTPUT_FORMAT=json`, or non-TTY mode is active, stdout must contain only machine-readable payloads.
- Put logs, progress bars, warnings, and human hints on stderr.
- Use stable exit codes.
- Emit structured error objects with a stable shape.
- Never require an agent to scrape prose tables for critical data.

### Make raw payloads first-class

Support a direct, schema-aligned input path:

```bash
my-cli resource create --json '{"name":"Example","settings":{"enabled":true}}'
```

Convenience flags are fine for humans, but they should compile into the same internal request object as the raw payload path.

Prefer:

- `--json` for request bodies.
- `--params` for query parameters, path options, and method-level options.
- `--output json` for response format selection.
- `--fields` or field masks for response shaping.

Avoid building a fragile custom flag universe for every nested API field.

### Let the CLI describe itself

Agents should not need a giant preloaded manual. Add a schema/introspection command such as:

```bash
my-cli schema users.create
my-cli describe users.create --output json
my-cli users create --help --json
```

The response should include:

- Command or method name.
- Input schema.
- Required and optional fields.
- Supported params and flags.
- Output schema.
- Required auth scopes or permissions.
- Whether the command mutates state.
- Idempotency behavior.
- Dry-run support.
- Examples.
- Known hazards.

When the CLI wraps an API, generate this from the same discovery document, OpenAPI schema, protobuf descriptors, or internal command registry used by execution.

### Protect the context window

Agents pay for irrelevant bytes with degraded reasoning. Always provide ways to reduce response size:

- `--fields` / field masks.
- `--limit` and cursor pagination.
- `--page-all` with NDJSON output for page-by-page processing.
- Sensible compact defaults for list/get commands.
- Optional verbose mode for humans.

For list commands, prefer returning only IDs, names, types, and pagination metadata by default unless the user asks for full objects.

### Harden inputs for hallucinations

Validate inputs centrally before touching the filesystem, network, or API.

Defend against at least:

- Path traversal such as `../` and absolute paths where not allowed.
- Pre-encoded or double-encoded path segments such as `%2e%2e`.
- Query strings accidentally embedded in resource IDs such as `abc123?fields=name`.
- Fragments accidentally embedded in resource IDs such as `abc123#section`.
- Control characters and invisible Unicode surprises.
- Shell-sensitive characters where shell invocation is expected.
- Mixed identifier formats.
- Ambiguous booleans and nulls.

The CLI should be the final line of defense. The agent is not the security boundary.

### Require dry-run for dangerous mutations

For create/update/delete/send/share/export commands:

- Implement `--dry-run` or `--preview`.
- Validate inputs locally.
- Show the exact normalized request that would be sent.
- Show the resource that would be affected when known.
- Avoid hitting the API in dry-run mode unless the operation is explicitly read-only validation.
- Encourage agent instructions to dry-run before executing mutating commands.

For destructive commands, add one or more of:

- `--confirm <resource-id-or-name>`.
- `--yes` only after a dry-run has been shown to the user.
- Idempotency keys.
- Soft-delete defaults.
- Explicit scope warnings.

### Sanitize untrusted responses

Data returned by APIs, files, emails, tickets, documents, web pages, and logs can contain prompt injection. For agent-facing paths:

- Treat returned content as untrusted data.
- Separate metadata from user-controlled content.
- Strip or escape control characters.
- Offer `--sanitize` or an equivalent policy hook for high-risk sources.
- Mark untrusted text fields clearly in structured responses.

### One core, many surfaces

Do not create separate logic for every interface. Build a typed core command registry and expose it through:

- Human CLI.
- Agent-oriented JSON/NDJSON CLI.
- MCP stdio tools.
- Agent extension surfaces.
- Headless environment-variable auth.

All surfaces should reuse the same schemas, validators, auth declarations, examples, and execution paths.

## Agent-DX retrofit workflow

When asked to improve an existing CLI, use this order:

1. **Inventory the command surface**
   - List commands.
   - Mark each as read-only or mutating.
   - Identify API-backed commands.
   - Identify commands that touch files, credentials, messages, permissions, or destructive resources.

2. **Stabilize output**
   - Add `--output json`.
   - Ensure stdout is parseable.
   - Move logs/progress to stderr.
   - Add structured errors.

3. **Add raw input paths**
   - Add `--json` for request bodies.
   - Add `--params` for method options.
   - Keep human convenience flags as wrappers.

4. **Add runtime introspection**
   - Add `schema`, `describe`, or `--help --json`.
   - Generate schemas from the command registry/API schema where possible.

5. **Constrain output size**
   - Add `--fields`, `--limit`, `--page-token`, and NDJSON pagination.
   - Make compact list defaults.

6. **Harden inputs**
   - Centralize validation.
   - Canonicalize paths.
   - Reject control characters, embedded query strings/fragments, and unsafe encodings.
   - Add tests for agent-hallucinated inputs.

7. **Add dry-run and previews**
   - Start with all mutating operations.
   - Normalize and display the request.
   - Require explicit confirmation for destructive actions.

8. **Package agent guidance**
   - Ship `AGENTS.md`, `CONTEXT.md`, or skill files.
   - Encode non-obvious invariants and safe recipes.

9. **Expose typed agent surfaces**
   - Add MCP if the CLI wraps a structured API.
   - Reuse the same registry and validators.

10. **Test with agent-like failures**
    - Fuzz malformed resource IDs, paths, encodings, field masks, payloads, and prompt-injection strings.
    - Verify dry-run catches failures before side effects.

## Review checklist

Before calling a CLI agent-safe, verify:

- [ ] `--output json` exists and is stable.
- [ ] stdout is machine payload only in machine mode.
- [ ] stderr carries logs and progress.
- [ ] Errors are structured and typed.
- [ ] Nested payloads can be passed as raw JSON.
- [ ] Runtime schema introspection exists.
- [ ] Mutating commands support dry-run or preview.
- [ ] Destructive commands require explicit confirmation.
- [ ] Field masks or response shaping exist.
- [ ] Pagination is explicit and stream-friendly.
- [ ] Inputs are validated centrally.
- [ ] File paths are canonicalized and sandboxed.
- [ ] Resource IDs reject embedded `?`, `#`, and unsafe `%` encodings.
- [ ] Control characters are rejected or escaped.
- [ ] Untrusted response content is sanitized or clearly isolated.
- [ ] Headless auth works without browser interaction.
- [ ] MCP/extension surfaces reuse the same schemas and validators.
- [ ] Agent guidance files ship with the CLI.
- [ ] Tests cover hallucinated inputs and prompt-injection payloads.

## Common command patterns

### Machine-readable output

```bash
my-cli users list --output json --fields 'users(id,name,email),nextPageToken'
```

### Raw request body

```bash
my-cli users create --json '{"name":"Ada Lovelace","email":"ada@example.com"}'
```

### Raw params

```bash
my-cli files list --params '{"fields":"files(id,name,mimeType)","pageSize":50}' --output json
```

### Schema introspection

```bash
my-cli schema files.create --output json
```

### Dry-run mutation

```bash
my-cli files delete --params '{"fileId":"abc123"}' --dry-run --output json
```

### NDJSON pagination

```bash
my-cli messages list --page-all --output ndjson --fields 'messages(id,threadId,subject)'
```

## Output quality bar

When producing a design or audit, include:

- A concise diagnosis of the current CLI state.
- The highest-risk agent failure modes.
- A prioritized implementation sequence.
- Specific command/API changes.
- Concrete validation rules.
- Suggested tests.
- Any `AGENTS.md`, `CONTEXT.md`, or `SKILL.md` guidance the CLI should ship.

## References

- `references/source-notes.md` — source attribution and distilled article notes.
- `references/agent-cli-design-principles.md` — core design principles.
- `references/implementation-checklist.md` — practical retrofit checklist.
- `references/schema-introspection-contract.md` — suggested JSON shape for command introspection.
- `references/context-output-guidelines.md` — stdout/stderr, field masks, pagination, and context-window guidance.
- `references/security-and-safety-rails.md` — validation, dry-run, destructive actions, and response sanitization.
- `references/agent-cli-test-plan.md` — tests for agent-safe CLIs.
