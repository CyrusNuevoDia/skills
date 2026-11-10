# Skills

Personal skills for Codex and Claude Code. Install them with the [skills CLI](https://github.com/vercel-labs/skills), using either `bunx` or `npx`.

## Restore on a new computer

Clone this repository and run the installer with Bun.

```sh
git clone https://github.com/CyrusNuevoDia/skills.git
cd skills
bun run install.mjs
```

If you use Node.js and npm, run `node install.mjs` instead. Add `--dry-run` to see the install commands before running them. The installer uses the skills CLI to copy the packages into the global Codex and Claude Code skill directories. It restores the custom variants from [the catalog](catalog.json) and fetches the [third-party collection](upstream.json) at pinned Git revisions. Rerunning replaces copies of the skills listed in those files, so save any edits you made to an installed copy first.

The installer adds the Scrawl skill when it detects the Hex app. If you install Hex later, rerun the installer to add the skill.

## Install selected custom skills

Use the Codex source for Codex and the Claude source for Claude-specific variants. Use `--copy` so the two agents can keep different versions of the same skill.

```sh
bunx skills add CyrusNuevoDia/skills/codex -g -a codex --skill coderlm --copy
bunx skills add CyrusNuevoDia/skills/claude -g -a claude-code --skill coderlm --copy
```

Replace `bunx` with `npx` to use npm. Use `--list` to preview a collection and `bunx skills ls -g` to inspect installed skills. The catalog lists the agents supported by each package.

Use the explicit `codex/` and `claude/` source paths. The CLI deduplicates skills by their frontmatter name, so a repository-root install keeps only one of two agent-specific variants. The `--agent` flag chooses the destination; it doesn't choose a source variant.

To pin a source revision, use a full Git commit SHA:

```sh
bunx skills add 'CyrusNuevoDia/skills/codex#COMMIT_SHA' -g -a codex
```

For a local checkout, replace the GitHub source with `./codex` or `./claude`. Each installed copy stays at the version you installed until you run the installer again.

## Attribution and licenses

The `wat` and `coderlm` packages retain their MIT license files and originate in [agent-wat](https://github.com/CyrusNuevoDia/agent-wat) and [coderlm](https://github.com/CyrusNuevoDia/coderlm). The installed agent-specific customizations are preserved here.

The `cli` package adapts Justin Poehnelt's [You Need to Rewrite Your CLI for AI Agents](https://justin.poehnelt.com/posts/rewrite-your-cli-for-ai-agents/) under CC BY-SA 4.0; its frontmatter and source notes retain that attribution. The `heartbeat-loop` package retains its source attribution in the skill. No repository-wide license overrides these package-specific terms.
