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

  // Background replacements
  newContent = newContent.replace(/bg-brand-white/g, 'bg-brand-base');
  newContent = newContent.replace(/bg-brand-ink/g, 'bg-brand-surface');
  newContent = newContent.replace(/bg-brand-cream/g, 'bg-brand-surface-alt');
  
  // Text replacements
  newContent = newContent.replace(/text-brand-white/g, 'text-brand-text');
  newContent = newContent.replace(/text-brand-ink/g, 'text-brand-text');
  
  // Specific button overrides to maintain contrast (gold bg + base text)
  newContent = newContent.replace(/bg-brand-gold text-brand-text/g, 'bg-brand-gold text-brand-base');
  newContent = newContent.replace(/text-brand-text(.*?bg-brand-gold)/g, 'text-brand-base$1');

  // Border replacements
  newContent = newContent.replace(/border-brand-ink/g, 'border-brand-surface');
  newContent = newContent.replace(/border-brand-white/g, 'border-brand-base');
  newContent = newContent.replace(/border-brand-cream/g, 'border-brand-surface-alt');
  
  // Fill/Ring replacements
  newContent = newContent.replace(/fill-brand-ink/g, 'fill-brand-surface');
  newContent = newContent.replace(/fill-brand-white/g, 'fill-brand-base');
  newContent = newContent.replace(/ring-brand-ink/g, 'ring-brand-surface');
  newContent = newContent.replace(/ring-brand-white/g, 'ring-brand-base');
  newContent = newContent.replace(/from-brand-ink/g, 'from-brand-surface');
  newContent = newContent.replace(/to-brand-ink/g, 'to-brand-surface');
  newContent = newContent.replace(/via-brand-ink/g, 'via-brand-surface');
  newContent = newContent.replace(/from-brand-white/g, 'from-brand-base');
  newContent = newContent.replace(/to-brand-white/g, 'to-brand-base');
  newContent = newContent.replace(/via-brand-white/g, 'via-brand-base');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
  }
});
