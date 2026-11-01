# Context and output guidelines

## stdout and stderr contract

In machine mode:

- stdout is for data only.
- stderr is for logs, warnings, progress, and human-readable hints.
- Do not interleave progress bars with JSON.
- Do not print banners before JSON.
- Do not print “success!” after JSON.

Bad:

```text
Loading...
Done!
{"id":"123"}
```

Good:

```json
{"id":"123"}
```

## Structured errors

Return parseable error objects in machine mode. Include stable codes and enough detail for an agent to repair the call.

Recommended fields:

- `code`
- `message`
- `field`
- `received`
- `expected`
- `retryable`
- `docs` or `schemaCommand`

## Field masks

Support response shaping on list/get commands.

Examples:

```bash
my-cli files list --fields 'files(id,name,mimeType),nextPageToken' --output json
my-cli messages get --params '{"id":"msg_123","fields":"id,threadId,subject"}' --output json
```

## Pagination

Support explicit pagination and streaming.

Recommended flags:

- `--limit <n>`
- `--page-token <token>`
- `--page-all`
- `--output ndjson`

For `--page-all --output ndjson`, emit one object per page or one object per resource. Pick one and document it.

Example page-level NDJSON:

```jsonl
{"page":1,"items":[{"id":"1","name":"A"}],"nextPageToken":"abc"}
{"page":2,"items":[{"id":"2","name":"B"}],"nextPageToken":null}
```

Example item-level NDJSON:

```jsonl
{"id":"1","name":"A"}
{"id":"2","name":"B"}
```

## Compact defaults

For list commands, default to compact summaries:

- ID.
- Display name/title.
- Type/status.
- Last modified timestamp.
- Owner or parent when useful.
- Pagination metadata.

Do not return heavy fields by default:

- Full document bodies.
- Full email bodies.
- Attachments.
- Binary blobs.
- Large nested permission trees.
- Audit logs unless requested.

## Token-aware examples

Always include field masks in agent-facing examples. Unsafe examples become cargo cults.
