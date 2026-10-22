import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure base directories exist
const dirs = [
  path.join(publicDir, 'fonts'),
  path.join(imagesDir, 'programs', 'hips', '2023'),
  path.join(imagesDir, 'programs', 'hips', '2024'),
  path.join(imagesDir, 'programs', 'hips', '2025'),
  path.join(imagesDir, 'programs', 'hips', '2026'),
  path.join(imagesDir, 'programs', 'career-dinner', '2023'),
  path.join(imagesDir, 'programs', 'career-dinner', '2024'),
  path.join(imagesDir, 'programs', 'career-dinner', '2025'),
  path.join(imagesDir, 'programs', 'talk-table', 'abj-1'),
  path.join(imagesDir, 'programs', 'talk-table', 'abj-3'),
  path.join(imagesDir, 'programs', 'talk-table', 'abj-4'),
  path.join(imagesDir, 'hero'),
  path.join(imagesDir, 'founder'),
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy Acorn Fonts
const acornSrc = path.join(rootDir, 'Acorn');
if (fs.existsSync(acornSrc)) {
  const fontFiles = fs.readdirSync(acornSrc);
  for (const file of fontFiles) {
    if (file.endsWith('.otf') || file.endsWith('.ttf') || file.endsWith('.woff2')) {
      fs.copyFileSync(path.join(acornSrc, file), path.join(publicDir, 'fonts', file));
    }
  }
  console.log(`Copied ${fontFiles.length} fonts to public/fonts`);
}

// Helper to copy curated images
function copyCurated(sourceRelative, targetRelative, max = 8) {
  const src = path.join(rootDir, sourceRelative);
  const dest = path.join(publicDir, targetRelative);
  if (!fs.existsSync(src)) {
    console.log(`Source does not exist: ${sourceRelative}`);
    return [];
  }
  const files = fs.readdirSync(src).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });

  const copied = [];
  const selected = files.slice(0, max);
  selected.forEach((file, idx) => {
    // Sanitize destination filename
    const cleanName = `photo-${idx + 1}.jpg`;
    fs.copyFileSync(path.join(src, file), path.join(dest, cleanName));
    copied.push(path.join('/', targetRelative, cleanName).replace(/\\/g, '/'));
  });
  console.log(`Copied ${copied.length} images from ${sourceRelative} to ${targetRelative}`);
  return copied;
}

const manifest = {
  hips: {
    '2023': copyCurated('ALL HIPS/2023', 'images/programs/hips/2023', 8),
    '2024': copyCurated('ALL HIPS/2024', 'images/programs/hips/2024', 8),
    '2025': copyCurated('ALL HIPS/2025', 'images/programs/hips/2025', 8),
    '2026': copyCurated('ALL HIPS/2026', 'images/programs/hips/2026', 8),
  },
  careerDinner: {
    '2023': copyCurated('ALL CAREER DINNER/2023', 'images/programs/career-dinner/2023', 8),
    '2024': copyCurated('ALL CAREER DINNER/2024', 'images/programs/career-dinner/2024', 8),
    '2025': copyCurated('ALL CAREER DINNER/2025', 'images/programs/career-dinner/2025', 8),
  },
  talkTable: {
    'abj-1': copyCurated('ALL TALK TABLE/ABJ 1', 'images/programs/talk-table/abj-1', 8),
    'abj-3': copyCurated('ALL TALK TABLE/ABJ 3', 'images/programs/talk-table/abj-3', 8),
    'abj-4': copyCurated('ALL TALK TABLE/ABJ 4', 'images/programs/talk-table/abj-4', 8),
  }
};

// Also copy top hero and founder featured images from HIPS 2026 and Talk Table
if (manifest.hips['2026'].length > 0) {
  fs.copyFileSync(
    path.join(publicDir, manifest.hips['2026'][0]),
    path.join(imagesDir, 'hero', 'keynote-main.jpg')
  );
  if (manifest.hips['2026'].length > 1) {
    fs.copyFileSync(
      path.join(publicDir, manifest.hips['2026'][1]),
      path.join(imagesDir, 'founder', 'njuara-njama.jpg')
    );
  }
}

// Write the media gallery manifest to src/data/mediaManifest.json
const srcDataDir = path.join(rootDir, 'src', 'data');
if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(srcDataDir, 'mediaManifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Successfully generated media manifest and copied curated assets.');
