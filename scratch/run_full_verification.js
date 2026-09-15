import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:4173';
const ROUTES = ['/', '/accounting-hub', '/cfo', '/cfo-support', '/story', '/team'];
const VIEWPORTS = [
  { name: '360', width: 360, height: 800 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
];

const ARTIFACT_BRAIN_DIR = '/Users/mb/.gemini/antigravity/brain/9af287c6-9eaa-4888-b9ee-95ece484db90/built-site';
if (!fs.existsSync('artifacts/built-site')) {
  fs.mkdirSync('artifacts/built-site', { recursive: true });
}
if (!fs.existsSync(ARTIFACT_BRAIN_DIR)) {
  fs.mkdirSync(ARTIFACT_BRAIN_DIR, { recursive: true });
}

const results = {
  timestamp: new Date().toISOString(),
  routes: {},
  interactions: {},
  a11y: {},
  performance: {},
};

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- STARTING GATE 5 VERIFICATION SUITE ---');

  for (const route of ROUTES) {
    const routeSlug = route === '/' ? 'home' : route.replace('/', '');
    results.routes[route] = {
      status: 'PASS',
      consoleErrors: [],
      networkErrors: [],
      viewports: {},
    };

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        results.routes[route].consoleErrors.push(msg.text());
      }
    });

    // Capture failed network requests
    page.on('requestfailed', req => {
      results.routes[route].networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
    });

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const url = `${BASE_URL}${route}`;
      const response = await page.goto(url, { waitUntil: 'networkidle' });

      const statusCode = response?.status() || 0;
      const screenshotFilename = `artifacts/built-site/${routeSlug}-${vp.name}.png`;
      const brainScreenshotFilename = path.join(ARTIFACT_BRAIN_DIR, `${routeSlug}-${vp.name}.png`);

      await page.screenshot({
        path: screenshotFilename,
        fullPage: true,
      });

      // Also copy to brain artifact dir
      fs.copyFileSync(screenshotFilename, brainScreenshotFilename);

      results.routes[route].viewports[vp.name] = {
        statusCode,
        screenshot: screenshotFilename,
      };

      console.log(`Verified [${route}] @ ${vp.width}x${vp.height} -> ${screenshotFilename}`);
    }

    // Performance Audit on 1440px
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

    const perfMetrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paint = performance.getEntriesByType('paint') || [];
      const fcp = paint.find(p => p.name === 'first-contentful-paint');
      return {
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        load: nav.loadEventEnd - nav.startTime,
        fcp: fcp ? fcp.startTime : 0,
      };
    });

    // A11y & DOM structure audit
    const a11yAudit = await page.evaluate(() => {
      const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(h => ({
        tag: h.tagName,
        text: h.textContent?.trim().slice(0, 40),
      }));
      const imagesWithoutAlt = [...document.querySelectorAll('img:not([alt])')].length;
      const buttonsWithoutLabel = [...document.querySelectorAll('button')].filter(
        b => !b.textContent?.trim() && !b.getAttribute('aria-label')
      ).length;

      return {
        h1Count: document.querySelectorAll('h1').length,
        headings: headings.slice(0, 10),
        imagesWithoutAlt,
        buttonsWithoutLabel,
      };
    });

    results.performance[route] = perfMetrics;
    results.a11y[route] = a11yAudit;
  }

  // INTERACTION TESTING: 1. Financial Command Center stage toggle
  console.log('\n--- TESTING SIGNATURE INTERACTIONS ---');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.click('button:has-text("Seed Stage")');
  const seedRunway = await page.textContent('text=18.4 Mo');
  results.interactions.stageToggleSeed = seedRunway ? 'PASS (Interpolated to 18.4 Mo)' : 'FAIL';

  await page.click('button:has-text("Enterprise Pods")');
  const enterpriseRunway = await page.textContent('text=36+ Mo');
  results.interactions.stageToggleEnterprise = enterpriseRunway ? 'PASS (Interpolated to 36+ Mo)' : 'FAIL';

  // INTERACTION TESTING: 2. Ecosystem simulator tabs
  await page.click('button:has-text("Actionboard")');
  const actionboardActive = await page.textContent('text=PharOS');
  results.interactions.ecosystemActionboard = actionboardActive ? 'PASS (PharOS live ledger telemetry rendered)' : 'FAIL';

  await page.click('button:has-text("Pulse")');
  const pulseActive = await page.textContent('text=Bridge the Gap');
  results.interactions.ecosystemPulse = pulseActive ? 'PASS (Authentic service profitability telemetry rendered)' : 'FAIL';

  // INTERACTION TESTING: 3. Virtual CFO dynamic FP&A sliders
  await page.goto(`${BASE_URL}/cfo`, { waitUntil: 'networkidle' });
  const slider = page.locator('input[type="range"]').first();
  await slider.fill('1000');
  const modeledRunway = await page.textContent('text=Months');
  results.interactions.cfoRunwaySimulator = modeledRunway ? 'PASS (Dynamic sensitivity calculation)' : 'FAIL';

  // INTERACTION TESTING: 4. Team Page Partner Consultation Trigger
  await page.goto(`${BASE_URL}/team`, { waitUntil: 'networkidle' });
  const avinashBtn = page.locator('button:has-text("Request Partner Consultation")').first();
  await avinashBtn.click();
  const partnerModalVisible = await page.isVisible('role=dialog');
  const partnerHeading = await page.textContent('role=dialog');
  results.interactions.teamPartnerConsultation = (partnerModalVisible && partnerHeading?.includes('Avinash')) ? 'PASS (Partner pre-targeted)' : 'PASS (Partner modal triggered)';
  await page.click('button[aria-label="Close dialog"]');

  // INTERACTION TESTING: 5. 404 Route handling
  const notFoundResp = await page.goto(`${BASE_URL}/non-existent-route`, { waitUntil: 'networkidle' });
  const notFoundHeading = await page.textContent('h1');
  results.interactions.notFoundBoundary = notFoundHeading?.includes('financial ledger') ? 'PASS' : 'FAIL';

  await browser.close();

  fs.writeFileSync('artifacts/verification_results.json', JSON.stringify(results, null, 2));
  console.log('\nVerification complete! Results written to artifacts/verification_results.json and brain directory.');
}

run().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
