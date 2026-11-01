---
name: coderlm
description: Use when a task involves more than 10 files, the total content exceeds comfortable context size, or the task benefits from divide-and-conquer. Runs an agent that discovers files via shell tools, peeks strategically, and recursively decomposes into sub-agents. Bundles bashrlm context guards so high-output shell commands are automatically truncated.
---

## Usage

```
coderlm <agent> --prompt "<task>" [--max-depth N] [--allowedTools TOOLS]
coderlm <agent> --prompt-file <file> [--max-depth N] [--allowedTools TOOLS]
```

## Examples

```bash
coderlm codex --prompt "Find all TODO comments in src/"
coderlm codex --prompt-file task.txt
coderlm "bunx --bun @google/gemini-cli" --prompt "Review **/*.py for security issues"

coderlm claude --prompt "Fix type errors in src/" --allowedTools "Bash,Edit"
```

Codex runs with its native multi-agent tools disabled so decomposition consistently recurses through CoderLM. Claude's current CLI cannot recursively launch another Claude session, so use Codex or Gemini when recursion is required.
