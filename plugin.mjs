import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Builds the Claude plugin marketplace manifest from catalog.json, so Claude Code can install
// the Claude Code skills as one plugin. The entry has no version, so each commit is a new one.
const usage = 'Usage: bun run plugin.mjs [--check] (or node plugin.mjs)';
const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && !['--check', '--help'].includes(args[0]))) {
  console.error(usage);
  process.exit(1);
}
if (args[0] === '--help') {
  console.log(usage);
  process.exit(0);
}

const root = new URL('./', import.meta.url);
const manifestUrl = new URL('.claude-plugin/marketplace.json', root);
const catalog = JSON.parse(readFileSync(new URL('catalog.json', root), 'utf8'));

// Skills gated on a local app stay out: a plugin can't check for the app before it loads.
const skills = catalog.skills.filter(({ agents, requiresHex }) => agents.includes('claude-code') && !requiresHex);
const names = skills.map(({ name }) => name);
const duplicate = names.find((name, index) => names.indexOf(name) !== index);
if (duplicate) {
  console.error(`catalog.json lists more than one Claude Code skill named ${duplicate}`);
  process.exit(1);
}
for (const { source } of skills) {
  if (!existsSync(new URL(`${source}/SKILL.md`, root))) {
    console.error(`${source}/SKILL.md does not exist`);
    process.exit(1);
  }
}

const owner = { name: 'Cyrus', url: 'https://github.com/CyrusNuevoDia' };
const manifest = {
  name: 'cyrus-skills',
  description: "Cyrus's personal Claude Code skills as one plugin.",
  owner,
  plugins: [
    {
      name: 'cyrus-skills',
      source: '.',
      description: "Cyrus's personal Claude Code skills, the same set install.mjs puts in ~/.claude/skills.",
      author: owner,
      homepage: 'https://github.com/CyrusNuevoDia/skills',
      repository: 'https://github.com/CyrusNuevoDia/skills',
      skills: skills.map(({ source }) => `./${source}`).sort(),
    },
  ],
};
const json = `${JSON.stringify(manifest, null, 2)}\n`;

if (args[0] === '--check') {
  const current = existsSync(manifestUrl) ? readFileSync(manifestUrl, 'utf8') : '';
  if (current !== json) {
    console.error('.claude-plugin/marketplace.json is out of date. Run: bun run plugin.mjs');
    process.exit(1);
  }
  console.log(`.claude-plugin/marketplace.json lists ${skills.length} skills and matches catalog.json`);
} else {
  mkdirSync(dirname(fileURLToPath(manifestUrl)), { recursive: true });
  writeFileSync(manifestUrl, json);
  console.log(`Wrote .claude-plugin/marketplace.json with ${skills.length} skills`);
}
