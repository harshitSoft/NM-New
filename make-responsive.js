import fs from 'fs';
import path from 'path';

const dirsToProcess = [
  path.join(process.cwd(), 'src', 'pages'),
  path.join(process.cwd(), 'src', 'components')
];

const replacements = [
  { regex: /px-6 md:px-12/g, replacement: 'px-4 md:px-8 lg:px-12' },
  { regex: /py-24/g, replacement: 'py-16 lg:py-24' },
  { regex: /p-12 md:p-24/g, replacement: 'p-8 lg:p-24' },
  { regex: /p-10/g, replacement: 'p-6 md:p-10' },
  { regex: /gap-16/g, replacement: 'gap-10 lg:gap-16' },
  { regex: /gap-12/g, replacement: 'gap-8 lg:gap-12' },
  { regex: /mb-16/g, replacement: 'mb-10 lg:mb-16' },
  { regex: /mb-12/g, replacement: 'mb-8 lg:mb-12' },
  { regex: /h-24/g, replacement: 'h-20 lg:h-24' },
  { regex: /pt-24/g, replacement: 'pt-16 lg:pt-24' },
  { regex: /pb-32/g, replacement: 'pb-20 lg:pb-32' },
  { regex: /pt-32/g, replacement: 'pt-24 lg:pt-32' },
  { regex: /pb-48/g, replacement: 'pb-24 lg:pb-48' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      // Additional mobile menu fix for Navbar.jsx
      if (file === 'Navbar.jsx') {
         content = content.replace(
           /lg:hidden absolute top-full left-0 w-full bg-brand-ink shadow-xl py-6 flex flex-col items-center space-y-6/g,
           'lg:hidden absolute top-full left-0 w-full bg-brand-ink shadow-xl py-6 flex flex-col items-center space-y-6 h-screen overflow-y-auto pb-32'
         );
      }

      // Fix large font sizes in Hero.jsx
      if (file === 'Hero.jsx') {
         content = content.replace(
           /text-4xl md:text-6xl lg:text-\[\5rem\]/g,
           'text-4xl md:text-5xl lg:text-[5rem]'
         );
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of dirsToProcess) {
  processDirectory(dir);
}
console.log('Responsiveness pass complete.');
