import fs from 'fs';
import path from 'path';

const directory = './src';

const replacements: Record<string, string> = {
  '--color-brand-cream': '--color-bg-main',
  '--color-brand-gray': '--color-text-main',
  '--color-brand-green-dark': '--color-green-5',
  '--color-brand-green-mid': '--color-green-3',
  '--color-brand-green-light': '--color-green-1',
  '--color-brand-orange': '--color-green-4',
  '--color-brand-yellow': '--color-green-2',
  '--color-brand-teal': '--color-green-3',
  'hover:bg-orange-600': 'hover:bg-[var(--color-green-5)]',
  'hover:bg-yellow-500': 'hover:bg-[var(--color-green-4)]',
  'hover:bg-green-700': 'hover:bg-[#3a8237]',
  'border-green-700': 'border-[#3a8237]',
  'text-green-100': 'text-[var(--color-green-1)]',
  'text-green-200': 'text-[var(--color-green-2)]',
};

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
