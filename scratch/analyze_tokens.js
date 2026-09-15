const fs = require('fs');

const raw = fs.readFileSync('/Users/mb/.gemini/antigravity/brain/9af287c6-9eaa-4888-b9ee-95ece484db90/.system_generated/steps/62/output.txt', 'utf8');
const match = raw.match(/### Result\s*([\s\S]*?)(?:\n### Ran Playwright|$)/);
if (!match) {
  console.error("No JSON match found");
  process.exit(1);
}
const data = JSON.parse(match[1].trim());

const colors = new Set();
const bgColors = new Set();
const fontFamilies = new Set();
const fontSizes = new Set();
const typeRoles = [];

for (const el of data.elements) {
  if (el.c && el.c !== 'rgba(0, 0, 0, 0)') colors.add(el.c);
  if (el.bg && el.bg !== 'rgba(0, 0, 0, 0)') bgColors.add(el.bg);
  if (el.ff) fontFamilies.add(el.ff);
  if (el.fs) fontSizes.add(el.fs);
  if (['H1', 'H2', 'H3', 'BUTTON'].includes(el.t) || (el.t === 'A' && el.bg !== 'rgba(0, 0, 0, 0)')) {
    typeRoles.push({
      tag: el.t,
      text: el.text,
      c: el.c,
      bg: el.bg,
      fs: el.fs,
      lh: el.lh,
      ls: el.ls
    });
  }
}

const summary = {
  fontFamilies: [...fontFamilies],
  fontSizes: [...fontSizes].sort((a,b) => parseFloat(a) - parseFloat(b)),
  colors: [...colors],
  bgColors: [...bgColors],
  sampleKeyElements: typeRoles.slice(0, 30)
};

fs.writeFileSync('scratch/token_summary.json', JSON.stringify(summary, null, 2));
console.log('Token analysis complete. Font families:', summary.fontFamilies);
console.log('Font sizes:', summary.fontSizes);
console.log('Colors:', summary.colors);
console.log('Background colors:', summary.bgColors);
