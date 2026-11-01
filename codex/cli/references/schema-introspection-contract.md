# Schema introspection contract

A schema/introspection command lets the agent ask the CLI what it accepts at runtime.

## Example command

```bash
my-cli schema files.create --output json
```

## Suggested response shape

```json
{
  "command": "files.create",
  "description": "Create a file resource.",
  "stability": "stable",
  "mutates": true,
  "destructive": false,
  "supportsDryRun": true,
  "auth": {
    "scopes": ["files.write"],
    "headlessSupported": true,
    "env": ["MY_CLI_TOKEN", "MY_CLI_CREDENTIALS_FILE"]
  },
  "input": {
    "paramsSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "parentId": {"type": "string"},
        "fields": {"type": "string"}
      }
    },
    "bodySchema": {
      "type": "object",
      "required": ["name"],
      "additionalProperties": false,
      "properties": {
        "name": {"type": "string"},
        "mimeType": {"type": "string"}
      }
    }
  },
  "output": {
    "schema": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "mimeType": {"type": "string"}
      }
    },
    "defaultFields": ["id", "name", "mimeType"]
  },
  "examples": [
    {
      "description": "Create a file using a raw JSON payload.",
      "command": "my-cli files create --json '{\"name\":\"Roadmap\",\"mimeType\":\"text/markdown\"}' --dry-run --output json"
    }
  ],
  "hazards": [
    "This command creates a remote resource.",
    "Use --dry-run before execution.",
    "Use --fields to limit response size."
  ]
}
```

## Required fields

At minimum, include:

- Command name.
- Description.
- Whether it mutates state.
- Whether it is destructive.
- Whether dry-run is supported.
- Input schema.
- Output schema or output summary.
- Auth requirements.
- Examples.

## Design notes

- Prefer JSON Schema, OpenAPI fragments, protobuf descriptors, or another standard schema format.
- Make the introspection endpoint versioned.
- Include deprecation information.
- Include defaults so agents do not have to infer them.
- Include allowed enum values.
- Include examples that are safe by default.
