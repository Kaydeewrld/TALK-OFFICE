import fs from 'fs';
import path from 'path';

function findFiles(dir, matchFn) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(findFiles(fullPath, matchFn));
        } else if (matchFn(file, fullPath)) {
          results.push({ fullPath, file, size: stat.size });
        }
      } catch (e) {}
    }
  } catch (e) {}
  return results;
}

const logoMatches = findFiles(process.cwd(), (file) => {
  const lower = file.toLowerCase();
  return (
    lower.includes('logo') ||
    lower.includes('brand') ||
    lower.includes('icon') ||
    lower.endsWith('.svg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.ai')
  );
});

console.log('Matches found:', JSON.stringify(logoMatches, null, 2));
