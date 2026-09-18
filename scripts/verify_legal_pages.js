import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localOutDir = path.resolve(__dirname, '../artifacts/built-site');
const brainOutDir = '/Users/mb/.gemini/antigravity/brain/9af287c6-9eaa-4888-b9ee-95ece484db90/built-site';

for (const dir of [localOutDir, brainOutDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function saveDualScreenshot(srcPath, destFilename) {
  fs.copyFileSync(srcPath, path.join(localOutDir, destFilename));
  fs.copyFileSync(srcPath, path.join(brainOutDir, destFilename));
}

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

async function verify() {
  const server = await startServer();
  console.log('Preview server started on http://localhost:4173');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  const baseUrl = 'http://localhost:4173';

  try {
    // 1. Desktop /terms
    console.log('--- TESTING /terms (1440x900) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/terms`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const termsTitle = await page.title();
    console.log(`Terms title: "${termsTitle}"`);

    const tempTerms1440 = path.join(localOutDir, 'temp_terms_1440.png');
    await page.screenshot({ path: tempTerms1440, fullPage: true });
    saveDualScreenshot(tempTerms1440, 'terms-1440.png');
    fs.unlinkSync(tempTerms1440);
    console.log('✓ terms-1440.png saved');

    // Test SCROLL SPY on /terms
    console.log('\n--- TESTING SCROLL SPY ON /terms ---');
    // Check initial active item
    let activeText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Initial active clause: "${activeText?.trim()}"`);
    if (!activeText?.includes('01.')) {
      throw new Error(`Expected clause 01 to be active initially, got ${activeText}`);
    }

    // Scroll to clause-3
    console.log('Scrolling down to Clause 03...');
    await page.evaluate(() => {
      const el = document.getElementById('clause-3');
      el?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(400);
    activeText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active clause after scroll to 03: "${activeText?.trim()}"`);
    if (!activeText?.includes('03.')) {
      throw new Error(`Expected clause 03 to be active, got ${activeText}`);
    }

    // Scroll to clause-6
    console.log('Scrolling down to Clause 06...');
    await page.evaluate(() => {
      const el = document.getElementById('clause-6');
      el?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(400);
    activeText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active clause after scroll to 06: "${activeText?.trim()}"`);
    if (!activeText?.includes('06.')) {
      throw new Error(`Expected clause 06 to be active, got ${activeText}`);
    }

    // Scroll to bottom
    console.log('Scrolling to very bottom...');
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(400);
    activeText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active clause at bottom: "${activeText?.trim()}"`);
    if (!activeText?.includes('07.')) {
      throw new Error(`Expected clause 07 to be active at bottom, got ${activeText}`);
    }

    // Test clicking TOC button
    console.log('Clicking Clause 02 button in TOC...');
    await page.click('nav button:has-text("02.")');
    await page.waitForTimeout(600);
    activeText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active clause after TOC click: "${activeText?.trim()}"`);
    if (!activeText?.includes('02.')) {
      throw new Error(`Expected clause 02 to be active after click, got ${activeText}`);
    }
    console.log('✓ Terms page scroll spy and click navigation fully verified!');

    // 2. Mobile /terms
    console.log('\n--- TESTING /terms (390x844) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/terms`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const tempTerms390 = path.join(localOutDir, 'temp_terms_390.png');
    await page.screenshot({ path: tempTerms390, fullPage: true });
    saveDualScreenshot(tempTerms390, 'terms-390.png');
    fs.unlinkSync(tempTerms390);
    console.log('✓ terms-390.png saved');

    // 3. Test Segmented Switch from Terms to Privacy
    console.log('\nTesting segmented switch from Terms to Privacy...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/terms`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Privacy Policy")');
    await page.waitForTimeout(400);
    const currentUrl = page.url();
    console.log(`Navigated via segmented switch to: ${currentUrl}`);
    if (!currentUrl.includes('/privacy')) {
      throw new Error(`Expected URL to include /privacy, got ${currentUrl}`);
    }
    console.log('✓ Segmented switch to /privacy succeeded');

    // 4. Desktop /privacy
    console.log('\n--- TESTING /privacy (1440x900) ---');
    const tempPriv1440 = path.join(localOutDir, 'temp_privacy_1440.png');
    await page.screenshot({ path: tempPriv1440, fullPage: true });
    saveDualScreenshot(tempPriv1440, 'privacy-1440.png');
    fs.unlinkSync(tempPriv1440);
    console.log('✓ privacy-1440.png saved');

    // Test SCROLL SPY on /privacy
    console.log('\n--- TESTING SCROLL SPY ON /privacy ---');
    let privActiveText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Initial active privacy section: "${privActiveText?.trim()}"`);
    if (!privActiveText?.includes('01.')) {
      throw new Error(`Expected section 01 to be active initially, got ${privActiveText}`);
    }

    // Scroll to privacy-4 (TLS 1.3)
    console.log('Scrolling down to Section 04 (TLS 1.3)...');
    await page.evaluate(() => {
      const el = document.getElementById('privacy-4');
      el?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(400);
    privActiveText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active section after scroll to 04: "${privActiveText?.trim()}"`);
    if (!privActiveText?.includes('04.')) {
      throw new Error(`Expected section 04 to be active, got ${privActiveText}`);
    }

    // Scroll to bottom
    console.log('Scrolling to bottom of privacy page...');
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(400);
    privActiveText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active section at bottom: "${privActiveText?.trim()}"`);
    if (!privActiveText?.includes('06.')) {
      throw new Error(`Expected section 06 to be active at bottom, got ${privActiveText}`);
    }

    // Click Section 03 (Lawful Grounds) in TOC
    console.log('Clicking Section 03 button in TOC...');
    await page.click('nav button:has-text("03.")');
    await page.waitForTimeout(600);
    privActiveText = await page.locator('nav button.bg-agrya-teal-50').textContent();
    console.log(`Active section after click: "${privActiveText?.trim()}"`);
    if (!privActiveText?.includes('03.')) {
      throw new Error(`Expected section 03 to be active, got ${privActiveText}`);
    }
    console.log('✓ Privacy page scroll spy and click navigation fully verified!');

    // 5. Mobile /privacy
    console.log('\n--- TESTING /privacy (390x844) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/privacy`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const tempPriv390 = path.join(localOutDir, 'temp_privacy_390.png');
    await page.screenshot({ path: tempPriv390, fullPage: true });
    saveDualScreenshot(tempPriv390, 'privacy-390.png');
    fs.unlinkSync(tempPriv390);
    console.log('✓ privacy-390.png saved');

    // 6. Test Switch back to Terms
    console.log('\nTesting segmented switch back from Privacy to Terms...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/privacy`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Terms of Service")');
    await page.waitForTimeout(400);
    const returnUrl = page.url();
    console.log(`Navigated back to: ${returnUrl}`);
    if (!returnUrl.includes('/terms')) {
      throw new Error(`Expected URL to include /terms, got ${returnUrl}`);
    }
    console.log('✓ Segmented switch back to /terms succeeded');

    // 7. Test Consultation Modal trigger on legal page
    console.log('\nTesting legal consultation modal trigger...');
    await page.click('text=Initiate Strategic Partner Briefing');
    await page.waitForTimeout(400);
    const modalVisible = await page.locator('div[role="dialog"]').isVisible();
    console.log(`Inquiry modal opened on legal page: ${modalVisible}`);
    if (!modalVisible) {
      throw new Error('Inquiry modal failed to open from legal CTA');
    }
    await page.click('button[aria-label="Close dialog"]');
    await page.waitForTimeout(300);
    console.log('✓ Legal consultation modal verified');

    console.log(`\n========================================`);
    console.log(`All verifications passed! Total console errors: ${errors.length}`);
    console.log(`========================================`);
    if (errors.length > 0) {
      console.error('Errors:', errors);
      process.exit(1);
    }

  } finally {
    await browser.close();
    server.kill();
  }
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
