import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SOURCE = resolve(root, 'public/product-1.avif');
const OUTPUT = resolve(root, 'public/og-image.jpg');

const W = 1200;
const H = 630;

const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.25" cy="0.5" r="0.7">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.85" cy="1" r="0.6">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <text x="60" y="100" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="#10b981" letter-spacing="2">CHARGEBASE UA</text>
  <text x="60" y="190" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">Портативна</text>
  <text x="60" y="255" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">станція</text>
  <text x="60" y="335" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="#10b981">2400W LiFePO4</text>
  <text x="60" y="400" font-family="Arial, sans-serif" font-size="22" font-weight="400" fill="#cbd5e1">3500+ циклів · Чиста синусоїда</text>
  <text x="60" y="435" font-family="Arial, sans-serif" font-size="22" font-weight="400" fill="#cbd5e1">Доставка в Україну без розмитнення</text>
  <rect x="60" y="495" width="240" height="70" rx="35" fill="#10b981"/>
  <text x="180" y="540" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#020617" text-anchor="middle">22 950 ₴</text>
  <text x="320" y="540" font-family="Arial, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" text-decoration="line-through">37 383 ₴</text>
</svg>
`;

async function main() {
  console.log(`Reading source: ${SOURCE}`);
  const sourceBuffer = await readFile(SOURCE);

  // Decode AVIF, resize and place on the right side
  const PRODUCT_W = 460;
  const PRODUCT_H = 460;
  const productImage = await sharp(sourceBuffer)
    .resize({ width: PRODUCT_W, height: PRODUCT_H, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const finalBuffer = await sharp(Buffer.from(overlay))
    .composite([
      { input: productImage, left: W - PRODUCT_W - 50, top: Math.round((H - PRODUCT_H) / 2) },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  await writeFile(OUTPUT, finalBuffer);
  const stat = finalBuffer.length;
  console.log(`Wrote ${OUTPUT} (${(stat / 1024).toFixed(1)} KB, ${W}x${H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
