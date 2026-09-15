const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.agrya.in';
const assets = [
  '/images/logo.png',
  '/images/actionboard-logo.png',
  '/images/effortless-logo.png',
  '/images/accounting.jpg',
  '/images/cfo-support.jpg',
  '/images/virtual-cfo.jpg',
  '/images/vcfo-hero.jpg',
  '/images/team/avinash.png',
  '/images/team/hrishi.jpeg',
  '/images/team/jayakumar.png',
  '/images/team/manoj.png',
  '/images/team/mrudula.jpeg',
  '/images/team/priya.png',
  '/images/team/ramprakash.png',
  '/images/team/saichand.jpg'
];

async function downloadAssets() {
  const meta = [];
  for (const assetPath of assets) {
    const url = baseUrl + assetPath;
    const dest = path.join('public/assets/original', assetPath.replace(/^\/images\//, ''));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!res.ok) {
        console.log(`Failed to download ${url}: ${res.status}`);
        meta.push({ url, status: res.status, dest: null });
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Downloaded ${assetPath} (${buffer.length} bytes) -> ${dest}`);
      meta.push({
        url,
        status: 200,
        dest,
        bytes: buffer.length,
        contentType: res.headers.get('content-type')
      });
    } catch (e) {
      console.error(`Error downloading ${url}:`, e);
      meta.push({ url, error: e.message });
    }
  }
  fs.writeFileSync('scratch/downloaded_assets_meta.json', JSON.stringify(meta, null, 2));
}

downloadAssets();
