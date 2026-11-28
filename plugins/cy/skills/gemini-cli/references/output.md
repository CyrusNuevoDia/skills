# Output, parsing, and errors

## Formats

- Default `pretty`: text commands print the answer; media/transcribe/files-upload print only a path or ID.
- `-o json|yaml|table|toon`; `--jq EXPR` filters (raw strings by default, like `jq -r`).
- `--agent-mode` / `GEMINI_CLI_AGENT_MODE=1`: structured JSON errors on stderr and TOON on stdout unless `-o json`.
- `--dry-run`: human preview on stderr; with `-o json` or `--jq`, one JSON object per request on stdout
  (`{"dry_run":true,"request":{method,url,headers,body}}`, credentials redacted).
- `-d/--debug` logs request/response diagnostics to stderr; `--include-headers` adds response headers.
- `--no-interactive` disables every prompt/TUI; `--timeout 5m` sets the HTTP timeout.

## Interaction JSON shape

A non-streaming interaction looks like:

```json
{
  "id": "v1_…", "model": "gemini-3.5-flash-lite", "object": "interaction", "status": "completed",
  "steps": [
    {"type": "thought", "signature": "…"},
    {"type": "model_output", "content": [{"type": "text", "text": "Ok"}]}
  ],
  "usage": {…}
}
```

Recipes:

```bash
# Model text only
--jq '[.steps[] | select(.type=="model_output") | .content[] | select(.type=="text") | .text] | join("")'

# Interaction ID (for --previous-interaction-id or agent status)
--jq .id

# Media artifact metadata (image/music/video/tts with --out and -o json)
#   {"kind":"image","mime_type":"image/jpeg","path":"/abs/path.jpg","size_bytes":…,"status":"completed"}
--jq .path

# Image edit chaining: ID of the turn that produced the image
gemini-api image "…" --out a.jpg -o json --jq .response_id
```

## Errors and exit codes

| Exit | Meaning | What to do |
|---|---|---|
| 0 | Success | — |
| 1 | Runtime/API failure (network, 4xx/5xx, rate limit) | Read `error_type` + `hints`; retry with backoff only for `rate_limit_error`/5xx |
| 2 | Usage/validation error | Fix flags or body; check `--help`/`--schema`; don't retry unchanged |
| 3 | Auth failure | `gemini-api whoami`; ask the user to configure a key |

With `-o json`, API errors come back as:

```json
{"error":{"code":"too_many_requests","message":"…"},"error_type":"rate_limit_error",
 "exit_code":1,"hints":["Rate limited — retry after a delay"],"status_code":429}
```
