import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QUEUE_DIR = join(ROOT, 'queue');
const COMMITS_FILE = join(QUEUE_DIR, 'commits.json');
const CHANGELOG = join(ROOT, 'CHANGELOG.md');

function log(msg) {
  console.log(`[auto-commit] ${msg}`);
}

function getNextEntry(entries) {
  return entries.find(entry => {
    const queuePath = join(QUEUE_DIR, entry.file);
    return existsSync(queuePath);
  });
}

function updateChangelog(entry) {
  const today = new Date().toISOString().slice(0, 10);
  const existing = readFileSync(CHANGELOG, 'utf8');
  const line = `- **${today}** — ${entry.message} (\`${entry.dest}\`)\n`;
  writeFileSync(CHANGELOG, existing + line, 'utf8');
}

async function run() {
  if (!existsSync(COMMITS_FILE)) {
    log('commits.json not found, nothing to do');
    process.exit(0);
  }

  const entries = JSON.parse(readFileSync(COMMITS_FILE, 'utf8'));
  const entry = getNextEntry(entries);

  if (!entry) {
    log('queue is empty — all commits done');
    process.exit(0);
  }

  const srcPath = join(QUEUE_DIR, entry.file);
  const destPath = join(ROOT, entry.dest);
  const destDir = dirname(destPath);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  renameSync(srcPath, destPath);
  log(`moved ${entry.file} → ${entry.dest}`);

  updateChangelog(entry);
  log(`updated CHANGELOG.md`);

  const git = simpleGit(ROOT);

  await git.add([entry.dest, 'CHANGELOG.md']);
  await git.commit(entry.message);
  await git.push();

  log(`committed and pushed: "${entry.message}"`);
}

run().catch(err => {
  console.error('[auto-commit] error:', err.message);
  process.exit(1);
});
