import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

const stitchApiKey = process.env.STITCH_API_KEY;

if (!stitchApiKey) {
  console.error('Missing STITCH_API_KEY in .env');
  process.exit(1);
}

const response = await fetch('https://api.stitch.design/v1/export', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.STITCH_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const raw = await response.text();

if (!response.ok) {
  console.error(`Stitch export failed: ${response.status} ${response.statusText}`);
  console.error(raw);
  process.exit(1);
}

const outputDir = path.resolve('scripts');
const outputPath = path.join(outputDir, 'stitch-export.json');

await fs.writeFile(outputPath, raw, 'utf8');

console.log(`Stitch export saved to ${outputPath}`);
