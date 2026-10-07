const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Gold to Accent
  newContent = newContent.replace(/brand-gold/g, 'brand-accent');
  
  // Specific button overrides to maintain contrast (accent bg + surface text)
  // Previously we used text-brand-base on gold buttons. Base is now warm white.
  // We want text-brand-surface (deep teal) on accent buttons (lime).
  newContent = newContent.replace(/bg-brand-accent text-brand-base/g, 'bg-brand-accent text-brand-surface');
  newContent = newContent.replace(/text-brand-base(.*?bg-brand-accent)/g, 'text-brand-surface\$1');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated Gold->Accent in', file);
  }
});
