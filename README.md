# Skills

Personal skills for Codex and Claude Code. Install them with the [skills CLI](https://github.com/vercel-labs/skills), using either `bunx` or `npx`.

## Install

Install the Codex collection:

```sh
bunx skills add CyrusNuevoDia/skills/codex -g -a codex
```

For Claude Code, install the portable skills first, then the Claude-specific collection:

```sh
bunx skills add CyrusNuevoDia/skills/codex -g -a claude-code --skill cli heartbeat-loop wat
bunx skills add CyrusNuevoDia/skills/claude -g -a claude-code
```

Replace `bunx` with `npx` to use npm. Add `--list` to preview a collection without installing, or `--skill NAME` to select one skill. Run `bunx skills ls -g` to inspect installed skills.

Use the explicit `codex/` and `claude/` source paths. The CLI deduplicates skills by their frontmatter name, so a repository-root install keeps only one of two agent-specific variants. The `--agent` flag chooses the destination; it doesn't choose a source variant.

To pin a source revision, use a full Git commit SHA:

```sh
bunx skills add 'CyrusNuevoDia/skills/codex#COMMIT_SHA' -g -a codex
```

For a local checkout, replace the GitHub source with `./codex` or `./claude`. Normal CLI installs copy the source into the installed skill directory; editing this checkout doesn't update that copy automatically. The private setup repository can instead link individual skill directories to this checkout.

## Contents

| Skill | Purpose | Agents |
| --- | --- | --- |
| `cli` | Design command-line interfaces that agents can use reliably. | Codex and Claude Code |
| `coderlm` | Explore large codebases with bounded output and recursive decomposition. | Separate Codex and Claude Code variants |
| `heartbeat-loop` | Run resumable research across recurring heartbeats. | Codex and Claude Code, when scheduling tools are available |
| `wat` | Write clear prose for humans while keeping agent instructions precise. | Codex and Claude Code |

[`catalog.json`](catalog.json) maps each source directory to its supported agents and records provenance, licenses, and file hashes. Third-party skills installed without substantive customization belong in setup's upstream installation manifest rather than this collection.

## Attribution and licenses

The `wat` and `coderlm` packages retain their MIT license files and originate in [agent-wat](https://github.com/CyrusNuevoDia/agent-wat) and [coderlm](https://github.com/CyrusNuevoDia/coderlm). The installed agent-specific customizations are preserved here.

The `cli` package adapts Justin Poehnelt's [You Need to Rewrite Your CLI for AI Agents](https://justin.poehnelt.com/posts/rewrite-your-cli-for-ai-agents/) under CC BY-SA 4.0; its frontmatter and source notes retain that attribution. The `heartbeat-loop` package retains its source attribution in the skill. No repository-wide license overrides these package-specific terms.
