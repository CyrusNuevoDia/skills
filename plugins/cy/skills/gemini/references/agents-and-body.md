# Managed agents, `--body`, and advanced resources

## Background runs

`agent run` streams by default. For anything long (Deep Research, Antigravity), pass `--background`: the CLI
returns one interaction object immediately and you poll it.

```bash
ID=$(gemini-api agent run "Compare EU vs US battery recycling policy, cite sources" \
  --agent deep-research-preview-04-2026 --background --jq .id)

gemini-api agent status "$ID" -o json --jq .status
gemini-api agent status "$ID" --stream            # replay/stream events live
gemini-api agent cancel "$ID"
gemini-api agent delete-interaction "$ID"         # remove the stored interaction
```

Status values: `queued`, `in_progress`, `requires_action`, `requires_continuation`, `completed`, `failed`,
`cancelled`, `incomplete`, `budget_exceeded`. Poll on a slow cadence (30–60 s) for research agents, since a
run can take many minutes. Pull the final text with the jq recipe in `output.md`.

Agent IDs and interaction IDs are different things: `agent status` takes an interaction ID, `agent get` takes
an agent definition ID.

## Custom agent definitions

```bash
gemini-api agent create --base-agent antigravity-preview-09-2026 --id research-assistant \
  --system-instruction "…" --description "…" --tools '[{"type":"google_search"}]'
gemini-api agent list | get ID | delete ID
```

## Multi-turn

Interactions are stored server-side by default (`"store": true`), so you can continue one by ID. Grab
`.id` from a `--stream=false` call and pass it forward:

```bash
T1=$(gemini-api generate "Propose 3 indexing strategies for a time-series log table" --stream=false --jq .id)
gemini-api generate "Compare #2 and #3 for write-heavy loads" --previous-interaction-id "$T1"
```

`analyze` and `transcribe` don't store requests, so they can't be continued. Set `"store": false` in a body
when the content is sensitive and you don't need continuation.

## `--schema` → `--body`

Intent flags cover common cases; `--body` exposes the whole Interactions API request. It merges with flags and
rejects duplicate keys, so don't set `model` in both. Accepts inline JSON, `@file.json`, or `@-` (stdin).

```bash
gemini-api agent run --schema > /tmp/schema.json       # JSON Schema 2020-12, top-level oneOf(Model|Agent)
gemini-api agent run --body @req.json --dry-run -o json  # validate offline
```

Model-interaction fields: `model`, `input`, `system_instruction`, `tools`, `response_format`,
`response_mime_type`, `response_modalities`, `generation_config`, `previous_interaction_id`, `store`, `stream`,
`background`, `cached_content`, `safety_settings`, `service_tier`, `labels`, `environment`, `webhook_config`.

`generation_config`: `temperature`, `top_p`, `seed`, `max_output_tokens`, `stop_sequences`,
`thinking_level` (`minimal|low|medium|high|xhigh`), `thinking_summaries`, `tool_choice`, plus
`image_config` / `speech_config` / `video_config` / `transcription_config`.

### Structured JSON output (verified)

```json
{
  "model": "gemini-4-hydrogen",
  "input": "Extract the vendors and totals from this invoice",
  "response_format": {
    "type": "text",
    "mime_type": "application/json",
    "schema": {"type": "object", "properties": {"vendors": {"type": "array", "items": {"type": "string"}}}, "required": ["vendors"]}
  },
  "generation_config": {"thinking_level": "low"},
  "stream": false
}
```

The model text comes back as a JSON string; pipe it through `jq` again to use it.

### Built-in tools

`tools` is an array of `{"type": …}` objects: `google_search`, `url_context`, `code_execution`, `file_search`,
`google_maps`, `mcp_server`, `function`, `computer_use`, `retrieval`, `tool_search`. Grounded search may need a
paid tier; a 429 `rate_limit_error` on a tool call usually means quota, not a malformed request. Check
`--schema` for each tool's extra properties before using it.

### Media via body

`image`, `music`, and `video` also take `--body`; `response_format` selects the output type, e.g.
`{"type":"image","aspect_ratio":"16:9","image_size":"2K"}`. Keep `--out` so the CLI still writes the file.

## Advanced resources

These manage managed-agent infrastructure; reach for them only when the user asks.

- `environments` — sandbox environments (`create/list/get/delete`, `files list|upload|download`), plus
  `connect`/`poll`/`serve` to run self-hosted workers (see the repo's `docs/self-hosted/`).
- `credentials` — server-side bearer/OAuth2/env credentials that agents inject into outgoing requests.
- `triggers` — cron schedules that run managed agents (`list/get/update/run/list-executions/delete`).
- `webhooks` — event delivery endpoints and signing secrets (`create/ping/rotate-signing-secret/…`).

All of these mutate remote state; confirm with the user before creating or deleting, and use `--dry-run` first.
