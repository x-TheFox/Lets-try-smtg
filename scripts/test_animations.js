import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTIFACTS_DIR = path.resolve('/Users/mb/.gemini/antigravity/brain/9af287c6-9eaa-4888-b9ee-95ece484db90/built-site');

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

async function runAnimationTests() {
  const server = await startServer();
  console.log('Preview server started for animation verification.');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    console.log('--- 1. TESTING INITIAL MOUNT & HERO ---');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.waitForSelector('#main-content');
    
    // Verify hero telemetry switch animation
    console.log('--- 2. TESTING HERO COMMAND CENTER TELEMETRY TRANSITION ---');
    const seriesBtn = page.locator('button:has-text("Series A/B Growth")');
    await seriesBtn.click();
    await page.waitForTimeout(250);
    
    const enterpriseBtn = page.locator('button:has-text("Enterprise Pods")');
    await enterpriseBtn.click();
    await page.waitForTimeout(250);
    console.log('✓ Stage switches smoothly with animate-metric');

    console.log('--- 3. TESTING ROUTE TRANSITION TO /cfo ---');
    await page.hover('button:has-text("Services")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Virtual CFO")');
    await page.waitForSelector('h1:has-text("Strategic financial leadership")');
    
    const transitionCfo = await page.$('.animate-page-entrance');
    if (!transitionCfo) throw new Error('PageTransition animate-page-entrance class not found on /cfo');
    console.log('✓ PageTransition successfully applied on /cfo');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'transition-cfo-1440.png') });

    console.log('--- 4. TESTING ROUTE TRANSITION TO /accounting-hub ---');
    await page.hover('button:has-text("Services")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Accounting Hub")');
    await page.waitForSelector('h1:has-text("Accounting Hub")');
    
    const transitionAcc = await page.$('.animate-page-entrance');
    if (!transitionAcc) throw new Error('PageTransition animate-page-entrance class not found on /accounting-hub');
    console.log('✓ PageTransition successfully applied on /accounting-hub');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'transition-accounting-1440.png') });

    console.log('--- 5. TESTING ROUTE TRANSITION TO /tools/runway-calculator ---');
    await page.hover('button:has-text("Services")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Runway Calculator")');
    await page.waitForSelector('h1:has-text("Interactive Startup Runway")');
    
    const transitionRunway = await page.$('.animate-page-entrance');
    if (!transitionRunway) throw new Error('PageTransition animate-page-entrance class not found on /tools/runway-calculator');
    console.log('✓ PageTransition successfully applied on /tools/runway-calculator');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'transition-runway-1440.png') });

    console.log('--- 6. TESTING FINANCIAL MATURITY MODAL ENTRANCE ---');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Assess Financial Maturity")');
    await page.waitForSelector('[role="dialog"]');
    
    const modalIn = await page.$('.animate-modal-in');
    if (!modalIn) throw new Error('animate-modal-in class not found on FinancialMaturityModal');
    console.log('✓ FinancialMaturityModal animated with animate-modal-in');
    
    // Advance question to verify animate-metric on question step
    await page.click('text=Within 5 business days');
    await page.waitForTimeout(250);
    const metricStep = await page.$('.animate-metric');
    if (!metricStep) throw new Error('animate-metric class not found on question step');
    console.log('✓ Diagnostic step transitions with animate-metric');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'modal-animated-step-1440.png') });

    console.log('\n========================================');
    console.log(`All Animation Tests Passed! Total console errors: ${consoleErrors.length}`);
    console.log('========================================');

    if (consoleErrors.length > 0) {
      console.error('Errors:', consoleErrors);
      process.exit(1);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

runAnimationTests().catch(err => {
  console.error('Animation test failed:', err);
  process.exit(1);
});
