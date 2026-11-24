#!/usr/bin/env bun
// Copies skills from ~/.agents/skills into the CyrusNuevoDia/skills repo under codex/<name>/, records
// their file hashes in catalog.json, and regenerates the cy plugin. It never commits.
//
// Usage: bun publish.mjs <name> [<name>...]   (repo from $SKILLS_REPO, default ~/Git/CyrusNuevoDia/skills)
import { createHash } from 'node:crypto';
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const names = process.argv.slice(2);
if (names.length === 0) fail('Usage: bun publish.mjs <name> [<name>...]');

const repo = process.env.SKILLS_REPO ?? join(homedir(), 'Git/CyrusNuevoDia/skills');
const catalogPath = join(repo, 'catalog.json');
if (!existsSync(catalogPath)) fail(`${repo} has no catalog.json; set SKILLS_REPO to your skills repo clone`);
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const upstream = JSON.parse(readFileSync(join(repo, 'upstream.json'), 'utf8'));

// Matches vendor.mjs, minus Finder litter that .gitignore would drop anyway.
const files = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.DS_Store')
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

for (const name of names) {
  const source = join(homedir(), '.agents/skills', name);
  const skillMd = join(source, 'SKILL.md');
  if (!existsSync(skillMd)) fail(`${skillMd} does not exist`);
  if (readFileSync(skillMd, 'utf8').match(/^---\n[\s\S]*?^name:\s*["']?([\w-]+)/m)?.[1] !== name) {
    fail(`${skillMd} frontmatter name must be ${name}`);
  }
  if (upstream.skills.some((skill) => skill.name === name)) fail(`${name} is pinned in upstream.json; rerun vendor.mjs instead`);
  if (catalog.skills.some((skill) => skill.name === name && skill.source === `claude/${name}`)) {
    fail(`${name} has a Claude-specific variant in claude/${name}; update the variants by hand`);
  }

  const target = join(repo, 'codex', name);
  rmSync(target, { recursive: true, force: true });
  cpSync(source, target, { recursive: true, filter: (path) => !path.endsWith('.DS_Store') });

  const hashes = Object.fromEntries(
    files(target).map((file) => [file, createHash('sha256').update(readFileSync(join(target, file))).digest('hex')]),
  );
  const existing = catalog.skills.find((skill) => skill.source === `codex/${name}`);
  if (existing) {
    existing.files = hashes;
  } else {
    catalog.skills.push({ name, source: `codex/${name}`, agents: ['codex', 'claude-code'], files: hashes });
  }
  console.log(`${name}: ${existing ? 'updated' : 'added'} codex/${name} with ${Object.keys(hashes).length} files`);
}

// Custom packages stay sorted by name ahead of the vendored ones, as vendor.mjs expects.
const vendored = catalog.skills.filter(({ source }) => source.startsWith('upstream/'));
const custom = catalog.skills.filter(({ source }) => !source.startsWith('upstream/'));
custom.sort((a, b) => a.name.localeCompare(b.name) || a.source.localeCompare(b.source));
catalog.skills = [...custom, ...vendored];
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

for (const args of [['run', 'plugin.mjs'], ['run', 'plugin.mjs', '--check']]) {
  const result = spawnSync('bun', args, { cwd: repo, stdio: 'inherit' });
  if (result.status !== 0) fail(`bun ${args.join(' ')} failed`);
}
