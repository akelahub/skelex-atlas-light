import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const index = join(dist, 'index.html');

if (!existsSync(index)) {
  console.error('dist/index.html is missing. Run `npx expo export --platform web` first.');
  process.exit(1);
}

// Jekyll skips folders that start with an underscore, including Expo's `_expo/`.
writeFileSync(join(dist, '.nojekyll'), '');

// Unknown paths (and SPA mode, which has no per-route HTML) fall back to the app.
copyFileSync(index, join(dist, '404.html'));

console.log('Prepared dist/ for GitHub Pages (.nojekyll, 404.html).');
