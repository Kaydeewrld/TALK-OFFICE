import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/images/qr');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const qrList = [
  {
    name: 'career-dinner-page-qr',
    url: 'https://thetalkoffice.com/career-dinner',
    title: 'The Talk Office Career Dinner 2026 Dedicated Page'
  },
  {
    name: 'career-dinner-event-qr',
    url: 'https://paystack.shop/pay/careerdinner26',
    title: 'The Talk Office Career Dinner 2026 Ticket Checkout'
  },
  {
    name: 'career-dinner-1m-celebration-qr',
    url: 'https://paystack.shop/pay/careerdinner26t1',
    title: 'Celebration Table (₦1,000,000)'
  },
  {
    name: 'career-dinner-3m-signature-qr',
    url: 'https://paystack.shop/pay/careerdinner26t2',
    title: 'Signature Table (₦3,000,000)'
  },
  {
    name: 'career-dinner-5m-executive-qr',
    url: 'https://paystack.shop/pay/careerdinner26t3',
    title: 'Executive Table (₦5,000,000)'
  }
];

async function generateQRCodes() {
  console.log('Generating high-resolution QR codes for Career Dinner 2026...');

  for (const item of qrList) {
    const pngPath = path.join(targetDir, `${item.name}.png`);
    const svgPath = path.join(targetDir, `${item.name}.svg`);

    // High resolution PNG with brand teal color
    await QRCode.toFile(pngPath, item.url, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: 1024,
      margin: 2,
      color: {
        dark: '#0C7C7B', // Brand Teal
        light: '#FFFFFF'
      }
    });

    // Crisp Vector SVG
    const svgString = await QRCode.toString(item.url, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#0C7C7B',
        light: '#FFFFFF'
      }
    });
    fs.writeFileSync(svgPath, svgString);

    console.log(`Generated: ${item.name}.png and ${item.name}.svg -> ${item.url}`);
  }

  // Copy main QR codes to public/images for convenient direct reference
  fs.copyFileSync(
    path.join(targetDir, 'career-dinner-page-qr.png'),
    path.resolve(__dirname, '../public/images/career-dinner-page-qr.png')
  );
  fs.copyFileSync(
    path.join(targetDir, 'career-dinner-page-qr.svg'),
    path.resolve(__dirname, '../public/images/career-dinner-page-qr.svg')
  );
  fs.copyFileSync(
    path.join(targetDir, 'career-dinner-event-qr.png'),
    path.resolve(__dirname, '../public/images/career-dinner-qr.png')
  );
  fs.copyFileSync(
    path.join(targetDir, 'career-dinner-event-qr.svg'),
    path.resolve(__dirname, '../public/images/career-dinner-qr.svg')
  );

  console.log('All QR codes generated successfully!');
}

generateQRCodes().catch(console.error);
