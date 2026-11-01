# Implementation checklist

## Phase 1 — Machine-readable baseline

- [ ] Add `--output json`.
- [ ] Add `--output ndjson` for streaming lists or page-all operations.
- [ ] Add `OUTPUT_FORMAT=json` environment-variable override.
- [ ] Auto-enable machine-safe defaults when stdout is not a TTY, if compatible with existing users.
- [ ] Move logs, spinners, and progress bars to stderr.
- [ ] Standardize exit codes.
- [ ] Standardize error objects.

Suggested error shape:

```json
{
  "error": {
    "code": "INVALID_RESOURCE_ID",
    "message": "Resource IDs must not contain query strings or fragments.",
    "details": {
      "field": "fileId",
      "received": "abc123?fields=name"
    },
    "retryable": false
  }
}
```

## Phase 2 — Structured inputs

- [ ] Add `--json` for request bodies.
- [ ] Add `--json-file` for large payloads.
- [ ] Add `--params` for path/query/method params.
- [ ] Validate against schema before execution.
- [ ] Keep convenience flags as wrappers over the same normalized request object.

## Phase 3 — Runtime introspection

- [ ] Add `schema` or `describe` command.
- [ ] Emit machine-readable method metadata.
- [ ] Include auth requirements.
- [ ] Include mutation/destructive markers.
- [ ] Include dry-run availability.
- [ ] Include examples.
- [ ] Generate from the command registry or upstream API schema.

## Phase 4 — Context discipline

- [ ] Add `--fields` or field masks.
- [ ] Add `--limit`.
- [ ] Add `--page-token`.
- [ ] Add `--page-all` with NDJSON.
- [ ] Default list responses to compact fields.
- [ ] Avoid returning full message/document/body fields unless explicitly requested.

## Phase 5 — Input hardening

- [ ] Centralize validators.
- [ ] Reject control characters.
- [ ] Reject path traversal.
- [ ] Canonicalize file paths.
- [ ] Sandbox output paths to the working directory unless explicitly overridden.
- [ ] Reject embedded query strings and fragments in resource IDs.
- [ ] Reject unsafe pre-encoded path/resource values.
- [ ] Encode URL path segments at the HTTP layer, not in user input.

## Phase 6 — Safety rails

- [ ] Add `--dry-run` for mutating commands.
- [ ] Add previews for destructive actions.
- [ ] Add `--confirm <expected-target>` for deletes/shares/sends.
- [ ] Add idempotency support where possible.
- [ ] Add response sanitization for untrusted content sources.
- [ ] Add agent guidance requiring dry-run before mutation.

## Phase 7 — Multi-surface support

- [ ] Expose MCP tools from the same registry.
- [ ] Support headless auth via environment variables or service-account credentials.
- [ ] Ship extension metadata where relevant.
- [ ] Ensure all surfaces share validators and schemas.

## Phase 8 — Agent guidance package

- [ ] Ship `AGENTS.md` or `CONTEXT.md`.
- [ ] Ship task-specific `SKILL.md` files where useful.
- [ ] Include safe recipes.
- [ ] Include “always/never” rules.
- [ ] Include examples with field masks and dry-run.
