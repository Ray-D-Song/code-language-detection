import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

function clearNodeFetch() {
  const libDir = path.resolve('dist/lib');
  const workerDir = path.resolve('dist/worker');
  const dirs = [libDir, workerDir];
  for (const dir of dirs) {
    const files = readdirSync(dir);
    for (const fileOrDir of files) {
      const stats = statSync(path.resolve(dir, fileOrDir));
      if (stats.isFile()) {
        const content = readFileSync(path.resolve(dir, fileOrDir), 'utf8');
        if (content.includes('node-fetch')) {
          writeFileSync(path.resolve(dir, fileOrDir), content.replace('() => require("node-fetch")', "'good'"));
        }
      }
    }
  }
}

clearNodeFetch();