/**
 * Build-time script that copies the prebuilt Stockfish engine files
 * (bin/*.js, *.wasm) from node_modules/stockfish into public/stockfish
 * so the browser worker can load them as static assets at runtime.
 * Runs via postinstall/predev/prebuild; does nothing if the package
 * is missing.
 */
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, '../node_modules/stockfish/bin');
const dest = path.join(__dirname, '../public/stockfish');

if (!existsSync(src)) {
  console.warn('Stockfish package not found in node_modules, skipping copy');
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

for (const file of readdirSync(src)) {
  copyFileSync(path.join(src, file), path.join(dest, file));
}

console.log(
  `Stockfish files copied to public/stockfish (${readdirSync(dest).length} files)`
);
