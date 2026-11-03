import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicLogoDir = path.resolve(__dirname, '../public/images/logo');

async function processLogos() {
  console.log('Processing official full brand lockup logos...');

  const inputWhite = path.join(publicLogoDir, 'tto-logo-white.jpeg');
  const inputGreen = path.join(publicLogoDir, 'tto-logo-green.jpeg');

  // 1. Trim tto-logo-white.jpeg
  const trimmedWhite = await sharp(inputWhite)
    .trim({ background: '#000000', threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const { data: rawWhite, info: infoWhite } = await sharp(trimmedWhite.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Create White transparent version for dark backgrounds (footers, dark modals, hero)
  const whiteTransparent = Buffer.from(rawWhite);
  for (let i = 0; i < whiteTransparent.length; i += 4) {
    const r = whiteTransparent[i];
    const g = whiteTransparent[i + 1];
    const b = whiteTransparent[i + 2];
    const maxVal = Math.max(r, g, b);
    if (maxVal < 15) {
      whiteTransparent[i + 3] = 0;
    } else if (maxVal < 60) {
      whiteTransparent[i + 3] = Math.round(((maxVal - 15) / 45) * 255);
    } else {
      whiteTransparent[i + 3] = 255;
    }
  }

  const whiteOutPath = path.join(publicLogoDir, 'talk-office-full-white.png');
  await sharp(whiteTransparent, {
    raw: { width: infoWhite.width, height: infoWhite.height, channels: 4 }
  })
    .png()
    .toFile(whiteOutPath);
  console.log('Created:', whiteOutPath);

  // 2. Create Teal / Dark version for light backgrounds (navbar, white cards)
  // Text is rendered in rich brand teal #0C7C7B (r: 12, g: 124, b: 123)
  // Divider is rendered in gold/ochre #D99B26 or teal
  // Emblem retains its rich brand teal ripples
  const tealTransparent = Buffer.from(whiteTransparent);
  for (let i = 0; i < tealTransparent.length; i += 4) {
    const a = tealTransparent[i + 3];
    if (a > 0) {
      const r = tealTransparent[i];
      const g = tealTransparent[i + 1];
      const b = tealTransparent[i + 2];

      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      if (diff < 35 && r > 90) {
        // Text & Divider line: Deep luxury Teal #0C7C7B
        const factor = r / 255;
        tealTransparent[i] = Math.round(12 * factor);
        tealTransparent[i + 1] = Math.round(124 * factor);
        tealTransparent[i + 2] = Math.round(123 * factor);
      } else {
        // Emblem ripples: Rich teal/emerald
        tealTransparent[i] = Math.round(r * 0.45);
        tealTransparent[i + 1] = Math.round(g * 0.75);
        tealTransparent[i + 2] = Math.round(b * 0.75);
      }
    }
  }

  const tealOutPath = path.join(publicLogoDir, 'talk-office-full-teal.png');
  await sharp(tealTransparent, {
    raw: { width: infoWhite.width, height: infoWhite.height, channels: 4 }
  })
    .png()
    .toFile(tealOutPath);
  console.log('Created:', tealOutPath);

  // Also copy to root public for universal access
  fs.copyFileSync(tealOutPath, path.resolve(__dirname, '../public/talk-office-logo.png'));
  fs.copyFileSync(whiteOutPath, path.resolve(__dirname, '../public/talk-office-logo-white.png'));

  console.log('Finished processing logos!');
}

processLogos().catch((err) => {
  console.error(err);
  process.exit(1);
});
