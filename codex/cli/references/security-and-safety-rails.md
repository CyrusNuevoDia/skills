# Security and safety rails

## Threat model

AI agents can produce inputs that are syntactically plausible and semantically dangerous. Common failures include hallucinated paths, malformed resource IDs, accidental query strings, double encoding, and unsafe assumptions about returned content.

Treat the agent as an untrusted caller.

## Input validation matrix

| Input type | Risk | Validation rule |
| --- | --- | --- |
| Output paths | Path traversal or overwrite | Canonicalize and sandbox to CWD by default. Reject `..` traversal and absolute paths unless explicitly allowed. |
| Resource IDs | Embedded params or fragments | Reject `?`, `#`, control characters, and unexpected separators. |
| URL path segments | Double encoding or traversal | Accept raw identifiers; encode only at HTTP layer. Reject unsafe `%` encodings where appropriate. |
| Text fields | Invisible control chars | Reject ASCII control chars below `0x20` except allowed whitespace. Normalize Unicode if needed. |
| JSON payloads | Unknown fields | Validate against schema with `additionalProperties: false` for strict agent mode. |
| Booleans/nulls | Ambiguous string values | Prefer real JSON booleans/nulls over string coercion. |
| File reads | Secret exfiltration | Require explicit paths, sandbox reads, and never follow symlinks without policy. |
| Deletes/shares/sends | Data loss or disclosure | Require dry-run plus explicit confirmation. |

## Dry-run contract

A dry-run should:

- Parse and validate the input.
- Normalize the request.
- Show the resolved target resource if known.
- Show whether the command is mutating or destructive.
- Not perform the side effect.
- Return machine-readable output.

Suggested dry-run output:

```json
{
  "dryRun": true,
  "valid": true,
  "command": "files.delete",
  "mutates": true,
  "destructive": true,
  "normalizedRequest": {
    "params": {"fileId": "abc123"}
  },
  "confirmationRequired": {
    "flag": "--confirm abc123",
    "reason": "Deleting a file is destructive."
  }
}
```

## Destructive command pattern

Recommended execution sequence for agents:

1. Call schema/introspection.
2. Build raw params/body.
3. Run with `--dry-run --output json`.
4. Show the dry-run result to the user when human approval is required.
5. Execute with explicit confirmation.

Example:

```bash
my-cli files delete --params '{"fileId":"abc123"}' --dry-run --output json
my-cli files delete --params '{"fileId":"abc123"}' --confirm abc123 --output json
```

## Response sanitization

Returned content can contain malicious instructions. High-risk sources include:

- Email bodies.
- Chat messages.
- Issue comments.
- Documents.
- Web pages.
- Logs from untrusted systems.
- User-uploaded files.

Defenses:

- Keep untrusted content inside explicit fields such as `content.text`.
- Add metadata such as `untrusted: true`.
- Escape or strip control characters.
- Provide a `--sanitize` hook for policy-based filtering.
- Never let returned content change CLI execution behavior.

## Auth for agents

Browser-based OAuth is awkward for headless agents. Prefer:

- Environment variable tokens.
- Credential file env vars.
- Service accounts where appropriate.
- Scoped tokens with least privilege.
- Clear auth errors that explain required scopes.

Never print tokens or credentials in machine-readable output unless the command is explicitly a credential-export operation.
