import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, lstatSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// Copies each third-party skill in upstream.json into upstream/<name>/ at its pinned commit and records it
// in catalog.json, so installs and the Claude plugin need nothing from the network. The repository's own
// license file comes along when the skill folder has none. To update a skill, change its pin and rerun.
const usage = 'Usage: bun run vendor.mjs (or node vendor.mjs)';
if (process.argv.length > 2) {
  console[process.argv[2] === '--help' ? 'log' : 'error'](usage);
  process.exit(process.argv[2] === '--help' ? 0 : 1);
}

const root = fileURLToPath(new URL('./', import.meta.url));
const upstream = JSON.parse(readFileSync(join(root, 'upstream.json'), 'utf8'));
const catalogPath = join(root, 'catalog.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const fail = (message) => {
  console.error(message);
  process.exit(1);
};
const git = (cwd, ...args) => {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) fail(`git ${args.join(' ')} failed in ${cwd}: ${result.stderr.trim()}`);
  return result.stdout;
};
const files = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();
const nameOf = (skillMd) => readFileSync(skillMd, 'utf8').match(/^---\n[\s\S]*?^name:\s*["']?([\w-]+)/m)?.[1];

// Names the license from its file's opening lines, or returns undefined for an unfamiliar one.
function licenseName(text) {
  const head = text.slice(0, 600);
  if (/MIT License|Permission is hereby granted, free of charge/i.test(head)) return 'MIT';
  if (/Apache License/i.test(head)) return 'Apache-2.0';
  if (/BSD/i.test(head)) return 'BSD';
  if (/Creative Commons/i.test(head)) return 'CC';
  return undefined;
}

const checkouts = new Map();
const temp = mkdtempSync(join(tmpdir(), 'skills-upstream-'));
const vendored = [];
try {
  for (const { name, source, agents } of upstream.skills) {
    const [, owner, repo, path, ref] = source.match(/^([^/]+)\/([^/#]+)\/?([^#]*)#([0-9a-f]{40})$/) ?? [];
    if (!ref) fail(`${name}: source must look like owner/repo/path#<40-character commit>`);

    const key = `${owner}/${repo}@${ref}`;
    if (!checkouts.has(key)) {
      const dir = join(temp, `${owner}-${repo}-${ref.slice(0, 12)}`);
      git(temp, 'init', '-q', dir);
      git(dir, 'fetch', '-q', '--depth', '1', `https://github.com/${owner}/${repo}.git`, ref);
      git(dir, 'checkout', '-q', 'FETCH_HEAD');
      checkouts.set(key, dir);
    }
    const checkout = checkouts.get(key);
    const base = join(checkout, path);
    if (!existsSync(base)) fail(`${name}: ${path} does not exist in ${owner}/${repo} at ${ref}`);

    // The skills CLI accepts a skill folder or a folder that holds it, so find the SKILL.md with this name.
    // Some upstreams spell it skill.md; the copy is renamed to SKILL.md, which Claude Code requires.
    const skillMd = files(base)
      .filter((file) => /(^|\/)skill\.md$/i.test(file))
      .sort((a, b) => a.split('/').length - b.split('/').length)
      .map((file) => join(base, file))
      .find((file) => nameOf(file) === name);
    if (!skillMd) fail(`${name}: no SKILL.md named ${name} under ${path} in ${owner}/${repo}`);
    const skillDir = dirname(skillMd);

    const target = join(root, 'upstream', name);
    rmSync(target, { recursive: true, force: true });
    cpSync(skillDir, target, { recursive: true, dereference: true, filter: (from) => !from.split('/').includes('.git') });
    const copiedSkillMd = files(target).find((file) => file.toLowerCase() === 'skill.md');
    if (copiedSkillMd !== 'SKILL.md') renameSync(join(target, copiedSkillMd), join(target, 'SKILL.md'));
    for (const file of files(target)) {
      if (lstatSync(join(target, file)).isSymbolicLink()) fail(`${name}: ${file} is a symlink`);
    }

    let licenseFile = files(target).find((file) => /^(LICENSE|LICENCE|COPYING)(\.\w+)?$/i.test(file));
    if (!licenseFile) {
      const rootLicense = readdirSync(checkout).find((file) => /^(LICENSE|LICENCE|COPYING)(\.\w+)?$/i.test(file));
      if (rootLicense) {
        cpSync(join(checkout, rootLicense), join(target, rootLicense));
        licenseFile = rootLicense;
      }
    }
    const license = licenseFile ? licenseName(readFileSync(join(target, licenseFile), 'utf8')) ?? 'See license file' : undefined;

    const hashes = Object.fromEntries(
      files(target).map((file) => [file, createHash('sha256').update(readFileSync(join(target, file))).digest('hex')]),
    );
    const repoPath = relative(checkout, skillDir);
    vendored.push({
      name,
      source: `upstream/${name}`,
      agents,
      origin: `https://github.com/${owner}/${repo}${repoPath ? `/tree/${ref}/${repoPath}` : ''}`,
      upstreamRef: ref,
      ...(license ? { license } : { licenseNote: 'No license file upstream.' }),
      files: hashes,
    });
    console.log(`${name}: ${owner}/${repo}${repoPath ? `/${repoPath}` : ''} at ${ref.slice(0, 12)}${license ? ` (${license})` : ' (no license)'}`);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}

// Replace earlier vendored entries, and drop folders for skills no longer pinned.
const names = new Set(vendored.map(({ name }) => name));
for (const dir of existsSync(join(root, 'upstream')) ? readdirSync(join(root, 'upstream')) : []) {
  if (!names.has(dir)) rmSync(join(root, 'upstream', dir), { recursive: true, force: true });
}
catalog.skills = [...catalog.skills.filter(({ source }) => !source.startsWith('upstream/')), ...vendored];
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Vendored ${vendored.length} skills into upstream/`);
