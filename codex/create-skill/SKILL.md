---
name: create-skill
description: Create a new personal skill (or update one) and ship it everywhere it belongs, writing it to ~/.agents/skills/NAME, symlinking it into ~/.claude/skills, adding it to the CyrusNuevoDia/skills repo with catalog hashes and the regenerated cy plugin, then committing and pushing. Use when the user says "create a skill", "make a skill for X", "add this as a skill", "turn this into a skill", "publish/push my skill", or types /create-skill.
---

# Create skill

A personal skill lives in three places, and this skill keeps them in step:

1. `~/.agents/skills/<name>/` holds the real files. This is the copy you edit.
2. `~/.claude/skills/<name>` is a relative symlink to it, so Claude Code loads it.
3. The `CyrusNuevoDia/skills` repo holds the published copy under `codex/<name>/`, listed in `catalog.json` and built into the `cy` plugin, so every other machine and claude.ai get it.

## 1. Write the skill

Pick a short kebab-case name and check it's free: `~/.agents/skills/<name>`, `~/.claude/skills/<name>` and the repo's `catalog.json` and `upstream.json` should not already have it (if they do, you're updating that skill, so edit it in place).

Write `~/.agents/skills/<name>/SKILL.md` with YAML frontmatter holding a `name` that matches the folder and a `description`. The description is what decides when the skill fires, so say what it does and then list the phrases a user would actually type ("Use when the user says..."). Keep it under 1024 characters and free of `<` and `>`, which claude.ai rejects. If the user gave you the skill's text, keep their words as the heart of the body and add only what a model needs to carry it out. For deeper guidance on writing a good skill, load the `writing-great-skills` skill.

Supporting files (scripts, references) go inside the same folder. Never put credentials, private project details, or absolute paths like `/Users/...` in it, because the repo is public.

## 2. Link it for Claude Code

```bash
ln -s ../../.agents/skills/<name> ~/.claude/skills/<name>
```

Skip this if the link already exists. If `~/.claude/skills/<name>` is a real directory, stop and ask the user, since that's an older copy that would otherwise shadow the new one.

## 3. Publish to the skills repo

The repo is the local clone of `github.com/CyrusNuevoDia/skills`, usually `~/Git/CyrusNuevoDia/skills`; set `SKILLS_REPO` if it lives elsewhere. Read its `AGENTS.md` before the first change in a session, because it's the source of truth for the repo's rules.

```bash
git -C "${SKILLS_REPO:-$HOME/Git/CyrusNuevoDia/skills}" pull --ff-only
```

```bash
bun ~/.agents/skills/create-skill/scripts/publish.mjs <name> [<name>...]
```

The script copies each skill into `codex/<name>/`, records its files and SHA-256 hashes in `catalog.json` for both Codex and Claude Code, and regenerates `plugins/cy` and `.claude-plugin/marketplace.json` with `plugin.mjs`. It refuses a skill that has a Claude-specific variant under `claude/` or is pinned in `upstream.json`, because those follow different paths in the repo (see its `AGENTS.md`).

Only publish skills the user wrote or customized. A third-party skill gets pinned in `upstream.json` and vendored with `bun run vendor.mjs` instead, and a skill whose origin or license is unclear stays out of the repo until the user settles it.

## 4. Commit and push

Look at `git status` and `git diff --stat` in the repo, then check the staged diff for secrets and machine paths. Stage only the paths for the skills you published, plus `catalog.json`, `plugins/cy` and `.claude-plugin/marketplace.json`, and leave anything else that's uncommitted alone, since it may be another session's work. Commit with a message like `Add explain skill`, pull again, and push to `main`.

Tell the user the skill's name, where it lives, and the commit you pushed.
