# Working in this repository

This public repository contains personally authored or customized skills, plus third-party skills vendored at pinned revisions so installs and the Claude plugin need nothing from the network. Do not add credentials, authentication state, conversation history, private project instructions, or machine-specific paths.

Keep complete skill packages under `codex/<name>/` or `claude/<name>/`, and vendored third-party packages under `upstream/<name>/`. Use real directories: the skills CLI skips directory symlinks during discovery. Each package needs `SKILL.md` with a string `name` and `description` in YAML frontmatter. Supporting scripts and references stay inside the package.

Portable skills have one canonical source under `codex/`, with both agents listed in `catalog.json`. A real Claude-specific variant lives under `claude/`. Preserve intentional behavior differences between variants. Every agent/name pair in the catalog must be unique.

Update `catalog.json` when a package changes, including its relative file paths and SHA-256 hashes. Then run `bun run plugin.mjs` to regenerate the Claude plugin in `plugins/cy` and `.claude-plugin/marketplace.json`; `--check` verifies they match the catalog. Never edit the generated plugin by hand. Keep descriptions free of `<` and `>`, which claude.ai rejects. Preserve upstream attribution and license terms. If provenance is unclear, resolve it before adding the source to this public repository; private setup snapshots can preserve restoration coverage meanwhile.

Verify discovery with `skills add ./codex --list`, `skills add ./claude --list` and `skills add ./upstream --list` using the installed skills CLI. Listing must not install or alter global skills. Check that all supporting resources exist, all catalog hashes match, and no secrets or private paths appear in the staged diff. Do not add package installation hooks or generated runtime files. The Claude plugin is the one generated output kept in the repository.

Pin third-party skills in `upstream.json` with public source paths, full Git commits, and explicit destination agents. Run `bun run vendor.mjs` after changing it: it copies each skill into `upstream/<name>/` at its pin, brings the upstream repository's license file along when the skill folder has none, and records the skill in `catalog.json`. Don't edit vendored copies by hand; change the pin and rerun, then run `bun run plugin.mjs`. Use `bun run install.mjs --dry-run` to review the restore commands without changing the machine.

This codebase is yours: what it's for and how it's built are your call, and you'll keep building on it.
