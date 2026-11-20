import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// Builds the `cy` Claude plugin in plugins/cy from catalog.json: a plugin.json manifest and a copy of
// each Claude Code skill under skills/<name>/, the layout claude.ai and Cowork accept. Each copy's
// SKILL.md frontmatter keeps the keys the skills spec allows; any other key moves into metadata as a
// string. The version ends in a hash of the skills, so it changes whenever a skill does.
const usage = 'Usage: bun run plugin.mjs [--check]';
const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && !['--check', '--help'].includes(args[0]))) {
  console.error(usage);
  process.exit(1);
}
if (args[0] === '--help') {
  console.log(usage);
  process.exit(0);
}
if (!globalThis.Bun?.YAML) {
  console.error('plugin.mjs reads SKILL.md frontmatter with Bun.YAML. Run it with Bun 1.2.21 or later.');
  process.exit(1);
}

const root = fileURLToPath(new URL('./', import.meta.url));
const pluginPath = 'plugins/cy';
const catalog = JSON.parse(readFileSync(join(root, 'catalog.json'), 'utf8'));
const fail = (message) => {
  console.error(message);
  process.exit(1);
};

// Skills gated on a local app stay out: a plugin can't check for the app before it loads.
const skills = catalog.skills
  .filter(({ agents, requiresHex }) => agents.includes('claude-code') && !requiresHex)
  .sort((a, b) => a.name.localeCompare(b.name));
const names = skills.map(({ name }) => name);
const duplicate = names.find((name, index) => names.indexOf(name) !== index);
if (duplicate) fail(`catalog.json lists more than one Claude Code skill named ${duplicate}`);

const allowedKeys = new Set(['name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility']);
const asString = (value) => (Array.isArray(value) ? value.join(', ') : String(value));

// Flattens a frontmatter value into string metadata entries, joining nested keys with hyphens.
function metadataEntries(key, value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([child, inner]) => metadataEntries(`${key}-${child}`, inner));
  }
  return [[key, asString(value)]];
}

function pluginSkillMd(source, name) {
  const text = readFileSync(join(root, source, 'SKILL.md'), 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) fail(`${source}/SKILL.md has no YAML frontmatter`);
  const frontmatter = Bun.YAML.parse(match[1]);
  if (frontmatter.name !== name) fail(`${source}/SKILL.md is named ${frontmatter.name}, not ${name}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(`${name} is not a valid skill name`);
  const description = String(frontmatter.description ?? '').trim();
  if (!description || description.length > 1024 || /[<>]/.test(description)) {
    fail(`${source}/SKILL.md needs a description of 1 to 1024 characters with no angle brackets`);
  }

  // Keep allowed keys as written. Each top-level key starts a block that runs to the next one.
  const blocks = [];
  for (const line of match[1].split('\n')) {
    const key = line.match(/^([A-Za-z][\w-]*):/)?.[1];
    if (key) blocks.push({ key, lines: [line] });
    else blocks.at(-1).lines.push(line);
  }
  const moved = Object.entries(frontmatter).filter(([key]) => !allowedKeys.has(key));
  if (moved.length === 0) return text;

  const metadata = [
    ...Object.entries(frontmatter.metadata ?? {}).flatMap(([key, value]) => metadataEntries(key, value)),
    ...moved.flatMap(([key, value]) => metadataEntries(key, value)),
  ];
  const kept = blocks.filter(({ key }) => allowedKeys.has(key) && key !== 'metadata').flatMap(({ lines }) => lines);
  const metadataLines = ['metadata:', ...metadata.map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)];
  return `---\n${[...kept, ...metadataLines].join('\n')}\n---\n${text.slice(match[0].length)}`;
}

// Lists every file under a directory as a path relative to it.
const files = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
        .sort()
    : [];

function build(outDir) {
  const owner = { name: 'Cyrus', url: 'https://github.com/CyrusNuevoDia' };
  const description = "Cyrus's personal Claude Code skills, the same set install.mjs puts in ~/.claude/skills.";
  const out = join(outDir, pluginPath);
  const hash = createHash('sha256');
  for (const { name, source } of skills) {
    const target = join(out, 'skills', name);
    cpSync(join(root, source), target, { recursive: true });
    writeFileSync(join(target, 'SKILL.md'), pluginSkillMd(source, name));
  }
  for (const file of files(join(out, 'skills'))) {
    hash.update(`${file}\0`).update(readFileSync(join(out, 'skills', file))).update('\0');
  }
  const plugin = {
    name: 'cy',
    version: `1.0.0-${hash.digest('hex').slice(0, 12)}`,
    description,
    author: owner,
    homepage: 'https://github.com/CyrusNuevoDia/skills',
    repository: 'https://github.com/CyrusNuevoDia/skills',
  };
  const marketplace = {
    name: 'cyrus-skills',
    description: "Cyrus's personal Claude Code skills as one plugin.",
    owner,
    plugins: [{ name: 'cy', source: `./${pluginPath}`, description }],
  };

  mkdirSync(join(out, '.claude-plugin'), { recursive: true });
  writeFileSync(join(out, '.claude-plugin/plugin.json'), `${JSON.stringify(plugin, null, 2)}\n`);
  mkdirSync(join(outDir, '.claude-plugin'), { recursive: true });
  writeFileSync(join(outDir, '.claude-plugin/marketplace.json'), `${JSON.stringify(marketplace, null, 2)}\n`);
}

const generated = [pluginPath, '.claude-plugin'];
if (args[0] === '--check') {
  const temp = mkdtempSync(join(tmpdir(), 'cy-plugin-'));
  try {
    build(temp);
    const stale = generated.flatMap((path) => {
      const want = files(join(temp, path));
      const have = files(join(root, path));
      return [...new Set([...want, ...have])].filter((file) => {
        const [a, b] = [join(temp, path, file), join(root, path, file)];
        return !existsSync(a) || !existsSync(b) || !readFileSync(a).equals(readFileSync(b));
      }).map((file) => join(path, file));
    });
    if (stale.length) fail(`The plugin is out of date (${stale.join(', ')}). Run: bun run plugin.mjs`);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
  console.log(`${pluginPath} has ${skills.length} skills and matches catalog.json`);
} else {
  for (const path of generated) rmSync(join(root, path), { recursive: true, force: true });
  build(root);
  console.log(`Wrote ${pluginPath} with ${skills.length} skills`);
}
