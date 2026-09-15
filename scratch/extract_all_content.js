const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'scratch/home.html', route: '/' },
  { file: 'scratch/_accounting-hub.html', route: '/accounting-hub' },
  { file: 'scratch/_cfo.html', route: '/cfo' },
  { file: 'scratch/_cfo-support.html', route: '/cfo-support' },
  { file: 'scratch/_story.html', route: '/story' },
  { file: 'scratch/_team.html', route: '/team' }
];

const results = {};

for (const p of pages) {
  if (!fs.existsSync(p.file)) {
    console.log(`Missing file ${p.file}`);
    continue;
  }
  const html = fs.readFileSync(p.file, 'utf8');

  // Title
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) || [])[1] || '';

  // Extract text from main container
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  const mainContent = mainMatch ? mainMatch[0] : html;

  // Extract all sections
  const sections = [];
  const sectionMatches = [...mainContent.matchAll(/<section[\s\S]*?<\/section>/gi)];

  if (sectionMatches.length > 0) {
    for (const sec of sectionMatches) {
      const secHtml = sec[0];
      const headings = [...secHtml.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(h => ({
        level: h[1],
        text: h[2].replace(/<[^>]+>/g, '').trim()
      }));
      const paragraphs = [...secHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(p => 
        p[1].replace(/<[^>]+>/g, '').trim()
      ).filter(Boolean);
      const listItems = [...secHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(li =>
        li[1].replace(/<[^>]+>/g, '').trim()
      ).filter(Boolean);
      const links = [...secHtml.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(a => ({
        href: a[1],
        text: a[2].replace(/<[^>]+>/g, '').trim()
      })).filter(l => l.text);

      sections.push({
        headings,
        paragraphs,
        listItems,
        links
      });
    }
  }

  // Extract all team members if team page
  const teamMembers = [];
  if (p.route === '/team') {
    // Find team cards
    const cardMatches = [...html.matchAll(/<div[^>]*class="[^"]*rounded-[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi)];
    for (const card of cardMatches) {
      const cardHtml = card[0];
      const nameMatch = cardHtml.match(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/i);
      const roleMatch = cardHtml.match(/<p[^>]*class="[^"]*text-teal-[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      const descMatch = cardHtml.match(/<p[^>]*class="[^"]*text-slate-600[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      const imgMatch = cardHtml.match(/src=["']([^"']*)["']/i);
      if (nameMatch) {
        teamMembers.push({
          name: nameMatch[1].replace(/<[^>]+>/g, '').trim(),
          role: roleMatch ? roleMatch[1].replace(/<[^>]+>/g, '').trim() : '',
          bio: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '',
          image: imgMatch ? imgMatch[1] : ''
        });
      }
    }
  }

  results[p.route] = {
    route: p.route,
    title: title.trim(),
    description: desc.trim(),
    sections,
    teamMembers
  };
}

fs.writeFileSync('scratch/all_content.json', JSON.stringify(results, null, 2));
console.log('Harvested content across all routes saved to scratch/all_content.json');
