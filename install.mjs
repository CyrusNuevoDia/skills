import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && !['--dry-run', '--help'].includes(args[0]))) {
  console.error('Usage: bun run install.mjs [--dry-run] (or node install.mjs)');
  process.exit(1);
}
if (args[0] === '--help') {
  console.log('Usage: bun run install.mjs [--dry-run] (or node install.mjs)');
  process.exit(0);
}

const catalog = JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
const upstream = JSON.parse(readFileSync(new URL('./upstream.json', import.meta.url), 'utf8'));
const installations = [
  ...upstream.skills,
  ...catalog.skills.map(({ source, name, agents }) => ({
    source: fileURLToPath(new URL(source, import.meta.url)),
    name,
    agents,
  })),
];
const [runner, ...runnerArgs] = process.versions.bun ? ['bunx'] : ['npx', '--yes'];

for (const { source, name, agents } of installations) {
  // Claude must have its own copy when its skill shares a name with a different Codex variant.
  const command = [
    ...runnerArgs, 'skills@1.7.6', 'add', source,
    '--global', '--agent', ...agents, '--skill', name, '--yes', '--copy',
  ];
  if (args[0] === '--dry-run') {
    console.log(JSON.stringify([runner, ...command]));
    continue;
  }
  const result = spawnSync(runner, command, { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`Could not install ${name}: ${result.error?.message ?? `exit ${result.status ?? result.signal}`}`);
    process.exit(1);
  }
}
