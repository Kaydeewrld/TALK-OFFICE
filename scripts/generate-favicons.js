import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const logoDir = path.resolve(publicDir, 'images/logo');

async function generateFavicons() {
  console.log('Generating transparent brand favicons...');

  // Base image: tto-logo-icon-3.jpeg (pure black background with crisp teal emblem)
  const inputIcon = path.join(logoDir, 'tto-logo-icon-3.jpeg');

  const trimmed = await sharp(inputIcon)
    .trim({ background: '#000000', threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const { data: raw, info } = await sharp(trimmed.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const transparentBuf = Buffer.from(raw);
  for (let i = 0; i < transparentBuf.length; i += 4) {
    const r = transparentBuf[i];
    const g = transparentBuf[i + 1];
    const b = transparentBuf[i + 2];
    const maxVal = Math.max(r, g, b);
    if (maxVal < 15) {
      transparentBuf[i + 3] = 0; // Pure transparent
    } else if (maxVal < 50) {
      transparentBuf[i + 3] = Math.round(((maxVal - 15) / 35) * 255); // Smooth anti-aliased edge
    } else {
      transparentBuf[i + 3] = 255;
    }
  }

  // Master 512x512 transparent emblem image
  const masterEmblem = await sharp(transparentBuf, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Save 512x512
  await sharp(masterEmblem).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  await sharp(masterEmblem).toFile(path.join(publicDir, 'talk-logo.png')); // overwrite legacy
  await sharp(masterEmblem).toFile(path.join(logoDir, 'talk-logo.png'));
  await sharp(masterEmblem).toFile(path.join(logoDir, 'tto-emblem-transparent.png'));

  // 192x192
  await sharp(masterEmblem)
    .resize(192, 192)
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

  // 180x180 (Apple touch icon)
  await sharp(masterEmblem)
    .resize(180, 180)
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 48x48
  await sharp(masterEmblem)
    .resize(48, 48)
    .toFile(path.join(publicDir, 'favicon-48x48.png'));

  // 32x32
  await sharp(masterEmblem)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // 16x16
  await sharp(masterEmblem)
    .resize(16, 16)
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // Standard favicon.png & favicon.ico
  await sharp(masterEmblem)
    .resize(48, 48)
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(masterEmblem)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All transparent favicon variations generated successfully!');
}

generateFavicons().catch((err) => {
  console.error(err);
  process.exit(1);
});
