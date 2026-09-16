import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html does not exist!');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const routes = [
  {
    path: '/',
    title: 'Agrya | The Financial OS for Modern Business',
    description: 'Agrya empowers growth-focused companies with expert Virtual CFO, Accounting, and financial intelligence services.',
    canonical: 'https://www.agrya.in/',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/accounting-hub',
    title: 'Accounting Hub | Agrya Consulting',
    description: 'Agrya’s Accounting Hub delivers real-time financial tracking, automated reconciliation, and audit-ready books.',
    canonical: 'https://www.agrya.in/accounting-hub',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/cfo',
    title: 'Virtual CFO Services | Agrya Consulting',
    description: 'Get the vision, discipline, and strategic clarity of an experienced Chief Financial Officer at a fraction of the cost.',
    canonical: 'https://www.agrya.in/cfo',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/cfo-support',
    title: 'CFO Support & Execution Pods | Agrya Consulting',
    description: 'Power your in-house finance team with expert execution. High-velocity financial modeling, compliance audits, and specialized project support.',
    canonical: 'https://www.agrya.in/cfo-support',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/story',
    title: 'Our Story | Agrya Consulting',
    description: 'Built by finance leaders for founders who build. The origin story and philosophy of Agrya Consulting.',
    canonical: 'https://www.agrya.in/story',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/team',
    title: 'Leadership & Team | Agrya Consulting',
    description: 'Meet the experienced Fellows and Associates of ICAI leading Agrya’s Virtual CFO and accounting advisory practice.',
    canonical: 'https://www.agrya.in/team',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/tools/runway-calculator',
    title: 'Runway & Burn Sensitivity Modeling Tool | Agrya Consulting',
    description: 'Simulate cash runway, burn multiples, and revenue sensitivity scenarios for venture-backed and growth-stage companies.',
    canonical: 'https://www.agrya.in/tools/runway-calculator',
    ogImage: 'https://www.agrya.in/assets/og-image.png'
  },
  {
    path: '/404',
    title: 'Page Not Found | Agrya Consulting',
    description: 'The requested page could not be found. Return to Agrya Consulting home.',
    canonical: 'https://www.agrya.in/404',
    ogImage: 'https://www.agrya.in/assets/og-image.png',
    is404: true
  }
];

function injectMeta(html, route) {
  let modified = html;

  // Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Canonical
  if (modified.includes('<link rel="canonical"')) {
    modified = modified.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${route.canonical}">`);
  } else {
    modified = modified.replace('</head>', `  <link rel="canonical" href="${route.canonical}">\n</head>`);
  }

  // Meta Description
  if (modified.includes('<meta name="description"')) {
    modified = modified.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${route.description}">`);
  } else {
    modified = modified.replace('</head>', `  <meta name="description" content="${route.description}">\n</head>`);
  }

  // OG Title
  if (modified.includes('<meta property="og:title"')) {
    modified = modified.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${route.title}">`);
  } else {
    modified = modified.replace('</head>', `  <meta property="og:title" content="${route.title}">\n</head>`);
  }

  // OG Description
  if (modified.includes('<meta property="og:description"')) {
    modified = modified.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${route.description}">`);
  } else {
    modified = modified.replace('</head>', `  <meta property="og:description" content="${route.description}">\n</head>`);
  }

  // OG URL
  if (modified.includes('<meta property="og:url"')) {
    modified = modified.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${route.canonical}">`);
  } else {
    modified = modified.replace('</head>', `  <meta property="og:url" content="${route.canonical}">\n</head>`);
  }

  // OG Image
  if (modified.includes('<meta property="og:image"')) {
    modified = modified.replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${route.ogImage}">`);
  } else {
    modified = modified.replace('</head>', `  <meta property="og:image" content="${route.ogImage}">\n</head>`);
  }

  // Twitter Title
  if (modified.includes('<meta name="twitter:title"')) {
    modified = modified.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${route.title}">`);
  }

  // Twitter Description
  if (modified.includes('<meta name="twitter:description"')) {
    modified = modified.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${route.description}">`);
  }

  return modified;
}

console.log('Generating route-specific prerendered HTML files in dist/ ...');

routes.forEach((route) => {
  const content = injectMeta(template, route);

  if (route.is404) {
    fs.writeFileSync(path.join(distDir, '404.html'), content, 'utf8');
    console.log(`✓ Generated dist/404.html`);
    return;
  }

  if (route.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), content, 'utf8');
    console.log(`✓ Updated dist/index.html (root)`);
    return;
  }

  const targetDir = path.join(distDir, route.path.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated ${path.relative(distDir, filePath)}`);
});

// Verify _redirects exists in dist
const redirectsSrc = path.resolve(__dirname, '../public/_redirects');
const redirectsDist = path.join(distDir, '_redirects');
if (fs.existsSync(redirectsSrc) && !fs.existsSync(redirectsDist)) {
  fs.copyFileSync(redirectsSrc, redirectsDist);
  console.log(`✓ Copied _redirects to dist/`);
}

console.log('Static prerendering complete.');
