const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.agrya.in';
const visited = new Set();
const queue = ['/', '/accounting-hub', '/cfo', '/cfo-support', '/story', '/team'];
const allAssets = new Set();
const routeData = {};

async function fetchPage(urlPath) {
  const fullUrl = new URL(urlPath, baseUrl).href;
  try {
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
    });
    if (!res.ok) {
      console.log(`Failed to fetch ${fullUrl}: ${res.status}`);
      return null;
    }
    const html = await res.text();
    return html;
  } catch (err) {
    console.error(`Error fetching ${fullUrl}:`, err);
    return null;
  }
}

async function run() {
  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    console.log(`Crawling: ${current}`);
    const html = await fetchPage(current);
    if (!html) continue;

    const safeName = current === '/' ? 'home' : current.replace(/[^a-zA-Z0-9_-]/g, '_');
    fs.writeFileSync(`scratch/${safeName}.html`, html);

    // Extract links
    const linkMatches = [...html.matchAll(/href=["']([^"'#]+)["']/g)].map(m => m[1]);
    for (const link of linkMatches) {
      if (link.startsWith('/') && !link.startsWith('//') && !link.startsWith('/_astro') && !link.startsWith('/images')) {
        const cleanLink = link.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
        if (!visited.has(cleanLink) && !queue.includes(cleanLink)) {
          queue.push(cleanLink);
          console.log(`  Discovered internal link: ${cleanLink}`);
        }
      }
    }

    // Extract assets
    const imgMatches = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
    const cssMatches = [...html.matchAll(/href=["']([^"']+\.css[^"']*)["']/g)].map(m => m[1]);
    const fontMatches = [...html.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]);

    [...imgMatches, ...cssMatches, ...fontMatches].forEach(a => allAssets.add(a));

    routeData[current] = {
      path: current,
      title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '',
      description: (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] || '',
      headings: [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(h => ({ level: h[1], text: h[2].replace(/<[^>]+>/g, '').trim() })),
      forms: [...html.matchAll(/<form[\s\S]*?<\/form>/gi)].map(f => f[0]),
    };
  }

  fs.writeFileSync('scratch/crawled_routes.json', JSON.stringify(routeData, null, 2));
  fs.writeFileSync('scratch/crawled_assets.json', JSON.stringify([...allAssets].sort(), null, 2));
  console.log(`Finished. Crawled ${visited.size} routes. Found ${allAssets.size} total assets.`);
}

run();
