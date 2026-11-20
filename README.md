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

## Install as a Claude Code plugin

The repository is also a Claude plugin marketplace. Its one plugin, `cy`, bundles the Claude Code skills from [the catalog](catalog.json), using the `claude/` variant where one exists. On claude.ai, add `CyrusNuevoDia/skills` as a marketplace and install `cy`. In Claude Code, run:

```sh
/plugin marketplace add CyrusNuevoDia/skills
/plugin install cy@cyrus-skills
```

From a shell, use `claude plugin marketplace add CyrusNuevoDia/skills` and `claude plugin install cy@cyrus-skills`. Plugin skills are namespaced, so `ceo` runs as `/cy:ceo`.

The plugin leaves out the [third-party collection](upstream.json), which isn't stored here, and Scrawl, which needs the Hex app on the same machine. Use the installer for those.

The plugin's version ends in a hash of its skills, so it changes whenever a skill does. Auto-update is off by default for third-party marketplaces. Turn it on in `/plugin` under Marketplaces, or run `claude plugin marketplace update cyrus-skills` and then `claude plugin update cy@cyrus-skills`. Restart Claude Code to load the update.

A plugin installed this way stays on that machine. Cloud sessions, including Claude Code on the web, don't load plugins installed on your machine or ones a repository's `.claude/settings.json` turns on.

The plugin in `plugins/cy` and `.claude-plugin/marketplace.json` are generated from the catalog: don't edit them by hand. After you change a skill or `catalog.json`, run `bun run plugin.mjs` and commit the result. `bun run plugin.mjs --check` fails when the plugin is out of date. The script needs Bun, because it reads frontmatter with `Bun.YAML`.

claude.ai accepts only the frontmatter keys the skills spec allows (`name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`), and no `<` or `>` in a description. The plugin's copy of each skill moves any other key into `metadata` as a string. Claude Code doesn't read keys there, so `disable-model-invocation` has no effect in the plugin's copies of `ui-prototype` and `writing-great-skills`.

## Attribution and licenses

The `wat` and `coderlm` packages retain their MIT license files and originate in [agent-wat](https://github.com/CyrusNuevoDia/agent-wat) and [coderlm](https://github.com/CyrusNuevoDia/coderlm). The installed agent-specific customizations are preserved here.

The `cli` package adapts Justin Poehnelt's [You Need to Rewrite Your CLI for AI Agents](https://justin.poehnelt.com/posts/rewrite-your-cli-for-ai-agents/) under CC BY-SA 4.0; its frontmatter and source notes retain that attribution. The `heartbeat-loop` package retains its source attribution in the skill. No repository-wide license overrides these package-specific terms.
