const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (['node_modules', '.next', '.git', 'docs'].includes(item.name)) continue;
      results = results.concat(getAllFiles(fullPath, ext));
    } else if (ext.some(e => item.name.endsWith(e))) {
      results.push(fullPath);
    }
  }
  return results;
}

const root = process.cwd();
const files = getAllFiles(root, ['.tsx', '.ts']);

const skipFiles = ['temp-update.js', 'temp-update-all.js', 'temp-update2.js'];

for (const filePath of files) {
  const basename = path.basename(filePath);
  if (skipFiles.includes(basename)) continue;
  if (filePath.includes(path.sep + 'admin' + path.sep)) continue; // skip admin
  if (basename === 'opengraph-image.tsx') continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Replace remaining dark backgrounds
  content = content.replace(/bg-\[#06080f\]/gi, 'bg-[#F5F1E8]');
  content = content.replace(/text-\[#06080f\]/gi, 'text-[#F5F1E8]');
  content = content.replace(/_#06080f\]/gi, '_#171717]');

  // Invert white alpha layers to black alpha layers for light theme
  content = content.replace(/border-white\/10/g, 'border-black/10');
  content = content.replace(/border-white\/15/g, 'border-black/15');
  content = content.replace(/border-white\/20/g, 'border-black/20');
  
  content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-black/[0.02]');
  content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-black/[0.03]');
  content = content.replace(/bg-white\/\[0\.05\]/g, 'bg-black/[0.05]');
  content = content.replace(/bg-white\/5/g, 'bg-black/5');
  content = content.replace(/bg-white\/10/g, 'bg-black/10');
  content = content.replace(/bg-white\/15/g, 'bg-black/15');

  // Some text might have been left as #7c8aa0 or similar
  content = content.replace(/text-\[#7c8aa0\]/gi, 'text-[#77736D]');
  
  // Replace text-[#171717]/90 with full opacity or just keep it, 
  // but if it says text-white/90 somewhere, it should be text-[#171717]/90
  content = content.replace(/text-white\/90/g, 'text-[#171717]/90');
  content = content.replace(/text-white\/80/g, 'text-[#171717]/80');
  content = content.replace(/text-white\/70/g, 'text-[#171717]/70');
  content = content.replace(/text-white\/60/g, 'text-[#171717]/60');
  content = content.replace(/text-white\/40/g, 'text-[#171717]/40');
  
  // Specific fix for the counter outline
  content = content.replace(/stroke:1px_#06080f/gi, 'stroke:1px_#171717');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed transparency/colors in:', path.relative(root, filePath));
  }
}
