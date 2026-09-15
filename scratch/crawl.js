const fs = require('fs');

async function main() {
  const res = await fetch('https://www.agrya.in/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
  });
  const html = await res.text();
  fs.writeFileSync('scratch/home.html', html);

  const linkMatches = [...html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  const imgMatches = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const metaMatches = [...html.matchAll(/<meta\s+([^>]+)>/gi)].map(m => m[1]);

  console.log('--- FOUND LINKS (' + linkMatches.length + ') ---');
  console.log([...new Set(linkMatches)].sort());

  console.log('--- FOUND IMAGES/SCRIPTS (' + imgMatches.length + ') ---');
  console.log([...new Set(imgMatches)].sort());

  console.log('--- JSON-LD ---');
  console.log(jsonLdMatches);

  console.log('--- META TAGS ---');
  console.log(metaMatches);
}

main().catch(console.error);
