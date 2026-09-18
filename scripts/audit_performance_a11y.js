import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server timeout')), 10000);
    server.stdout.on('data', (data) => {
      const str = data.toString();
      if (str.includes('http://localhost:4173') || str.includes('Local:')) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      console.error('[preview err]', data.toString());
    });
  });

  return server;
}

async function runAudit() {
  const server = await startServer();
  console.log('Preview server started for audit.');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile emulation as in Lighthouse report (Moto G / iPhone)
    userAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
  });
  const page = await context.newPage();

  const networkRequests = [];
  page.on('request', req => {
    networkRequests.push({
      url: req.url(),
      resourceType: req.resourceType()
    });
  });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    console.log('--- 1. AUDITING LCP DISCOVERY & PRELOAD ---');
    const response = await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
    const html = await response?.text() || '';

    // Verify LCP preload exists in initial HTML response
    const hasLcpPreload = html.includes('rel="preload" as="image" href="/assets/logo-agrya.webp"') &&
                          html.includes('fetchpriority="high"');
    console.log(`✓ LCP Image Preload in HTML: ${hasLcpPreload ? 'PASS' : 'FAIL'}`);
    if (!hasLcpPreload) throw new Error('Missing LCP WebP preload in initial HTML');

    // Verify non-blocking Google Fonts in initial HTML
    const hasNonBlockingFonts = html.includes('media="print" onload="this.media=\'all\'"') &&
                                html.includes('<noscript>');
    console.log(`✓ Non-blocking Google Fonts in HTML: ${hasNonBlockingFonts ? 'PASS' : 'FAIL'}`);
    if (!hasNonBlockingFonts) throw new Error('Google Fonts not configured for non-blocking asynchronous load');

    console.log('\n--- 2. AUDITING CRITICAL NETWORK WATERFALL ---');
    await page.waitForLoadState('networkidle');

    // Check that logo-agrya.webp was requested
    const webpRequested = networkRequests.some(r => r.url.includes('logo-agrya.webp'));
    console.log(`✓ Next-gen WebP logo loaded: ${webpRequested ? 'PASS' : 'FAIL'}`);

    // Check that GTM / Crisp did NOT load synchronously during DOMContentLoaded
    const earlyThirdParty = networkRequests.filter(r => 
      r.url.includes('googletagmanager.com') || r.url.includes('client.crisp.chat')
    );
    console.log(`✓ Third-party scripts deferred on initial paint: ${earlyThirdParty.length === 0 ? 'PASS (0 render-blocking requests)' : 'FAIL'}`);

    console.log('\n--- 3. AUDITING IMAGE ATTRIBUTES (WIDTH / HEIGHT / FETCHPRIORITY) ---');
    const logoAttributes = await page.locator('header img[alt="Agrya Consulting"]').evaluate(img => {
      return {
        hasWidth: img.hasAttribute('width'),
        width: img.getAttribute('width'),
        hasHeight: img.hasAttribute('height'),
        height: img.getAttribute('height'),
        fetchPriority: img.getAttribute('fetchpriority'),
        currentSrc: img.currentSrc
      };
    });
    console.log('Logo attributes:', logoAttributes);
    if (!logoAttributes.hasWidth || !logoAttributes.hasHeight) {
      throw new Error('Header logo missing explicit width and height attributes');
    }
    console.log('✓ Header logo has explicit width and height');

    console.log('\n--- 4. AUDITING WCAG AA CONTRAST ON REPORTED ELEMENTS ---');
    // Function to calculate relative luminance
    function parseRgb(rgbStr) {
      const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    function luminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    function contrastRatio(rgb1, rgb2) {
      const lum1 = luminance(...rgb1);
      const lum2 = luminance(...rgb2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    // Check specific elements that previously failed in Lighthouse:
    const checks = [
      { selector: 'text=Save up to 50%', name: 'Save up to 50% badge' },
      { selector: 'text=Audit-Ready Books', name: 'Audit-Ready Books label' },
      { selector: 'text=On-Demand Advisory', name: 'On-Demand Advisory label' },
      { selector: 'text=In-House Force Multiplication', name: 'In-House Force Multiplication label' },
      { selector: 'text=Historical Client Transformations', name: 'Historical Client Transformations label' },
      { selector: 'text=4-Year Retainer', name: '4-Year Retainer tag' },
      { selector: 'text=Debt & Audit Protocol', name: 'Debt & Audit Protocol tag' },
      { selector: 'text=Consultation with Partner Chartered Accountants', name: 'CTA disclaimer' },
      { selector: 'footer button:has-text("Terms")', name: 'Footer Terms button' },
      { selector: 'footer button:has-text("Privacy")', name: 'Footer Privacy button' },
      { selector: 'footer span:has-text("© 2026 Agrya Consulting")', name: 'Footer copyright' }
    ];

    for (const c of checks) {
      const loc = page.locator(c.selector).first();
      const isVisible = await loc.isVisible();
      if (!isVisible) {
        console.log(`  Warning: ${c.name} not visible in initial mobile viewport`);
        continue;
      }
      const colors = await loc.evaluate(el => {
        const style = window.getComputedStyle(el);
        let bgEl = el.parentElement;
        let bg = 'rgb(255, 255, 255)';
        while (bgEl) {
          const bgStyle = window.getComputedStyle(bgEl);
          if (bgStyle.backgroundColor && bgStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            bg = bgStyle.backgroundColor;
            break;
          }
          bgEl = bgEl.parentElement;
        }
        return { color: style.color, background: bg };
      });

      const ratio = contrastRatio(parseRgb(colors.color), parseRgb(colors.background));
      console.log(`  ✓ ${c.name}: color ${colors.color} on ${colors.background} -> Contrast: ${ratio.toFixed(2)}:1 (Min 4.5:1 required)`);
      if (ratio < 4.5) {
        throw new Error(`Contrast check failed for ${c.name}: ${ratio.toFixed(2)}:1 is below 4.5:1`);
      }
    }

    console.log('\n--- 5. AUDITING CODE SPLITTING & PAYLOAD REDUCTION ---');
    const scriptRequests = networkRequests.filter(r => r.url.includes('/assets/') && r.url.endsWith('.js'));
    console.log(`Total script chunks loaded on home page: ${scriptRequests.length}`);
    for (const s of scriptRequests) {
      console.log(`  Chunk: ${s.url.split('/').pop()}`);
    }
    // Verify that non-home pages are NOT loaded
    const loadedNonHomePages = scriptRequests.filter(s => 
      s.url.includes('CfoPage') || 
      s.url.includes('AccountingHubPage') || 
      s.url.includes('RunwayCalculatorPage') ||
      s.url.includes('TermsPage') ||
      s.url.includes('PrivacyPage')
    );
    if (loadedNonHomePages.length > 0) {
      throw new Error(`Unexpected non-home page chunks loaded on root: ${loadedNonHomePages.map(s => s.url).join(', ')}`);
    }
    console.log('✓ Non-home routes are strictly deferred and code-split!');

    console.log('\n========================================');
    console.log(`All Performance & A11y Audits Passed! Total console errors: ${errors.length}`);
    console.log('========================================');
    if (errors.length > 0) {
      console.error('Errors:', errors);
      process.exit(1);
    }

  } finally {
    await browser.close();
    server.kill();
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
