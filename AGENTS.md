# Working in this repository

This public repository contains personally authored or substantively customized skills. Do not add credentials, authentication state, conversation history, private project instructions, machine-specific paths, or unmodified third-party collections.

Keep complete skill packages under `codex/<name>/` or `claude/<name>/`. Use real directories: the skills CLI skips directory symlinks during discovery. Each package needs `SKILL.md` with a string `name` and `description` in YAML frontmatter. Supporting scripts and references stay inside the package.

Portable skills have one canonical source under `codex/`, with both agents listed in `catalog.json`. A real Claude-specific variant lives under `claude/`. Preserve intentional behavior differences between variants. Every agent/name pair in the catalog must be unique.

Update `catalog.json` when a package changes, including its relative file paths and SHA-256 hashes. Preserve upstream attribution and license terms. If provenance is unclear, resolve it before adding the source to this public repository; private setup snapshots can preserve restoration coverage meanwhile.

Verify discovery with `skills add ./codex --list` and `skills add ./claude --list` using the installed skills CLI. Listing must not install or alter global skills. Check that all supporting resources exist, all catalog hashes match, and no secrets or private paths appear in the staged diff. Do not add package installation hooks or generated runtime files.

This codebase is yours: what it's for and how it's built are your call, and you'll keep building on it.
