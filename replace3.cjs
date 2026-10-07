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
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Hardcoded backgrounds to brand-base
  newContent = newContent.replace(/bg-\[\#050505\]/g, 'bg-brand-base');
  newContent = newContent.replace(/bg-\[\#1a1a1a\]/g, 'bg-brand-surface-alt');
  newContent = newContent.replace(/bg-\[\#000000\]/g, 'bg-brand-base');
  
  // Hardcoded text colors to brand-text
  newContent = newContent.replace(/text-gray-100/g, 'text-brand-text opacity-90');
  newContent = newContent.replace(/text-gray-200/g, 'text-brand-text opacity-80');
  newContent = newContent.replace(/text-gray-300/g, 'text-brand-text opacity-80');
  newContent = newContent.replace(/text-gray-400/g, 'text-brand-text opacity-70');
  newContent = newContent.replace(/text-gray-500/g, 'text-brand-text opacity-60');

  // Some text-white instances in generic content should be brand-text so they invert properly
  // But we have to be careful not to break specific elements.
  // We'll leave text-white alone unless it's a huge issue, since inverse is #FAFAF7.

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated backgrounds/text in', file);
  }
});
