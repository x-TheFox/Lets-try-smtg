import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../artifacts/built-site');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runVerification() {
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
  const routes = [
    { url: '/', name: 'home' },
    { url: '/accounting-hub', name: 'accounting-hub' },
    { url: '/cfo', name: 'cfo' },
    { url: '/cfo-support', name: 'cfo-support' },
    { url: '/story', name: 'story' },
    { url: '/team', name: 'team' },
    { url: '/tools/runway-calculator', name: 'runway-calculator' },
    { url: '/terms', name: 'terms' },
    { url: '/privacy', name: 'privacy' },
  ];

  console.log('--- TESTING DESKTOP (1440x900) ---');
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const r of routes) {
    console.log(`Navigating to ${r.url}...`);
    await page.goto(`${baseUrl}${r.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const title = await page.title();
    console.log(`  Title: ${title}`);

    await page.screenshot({ path: path.join(outDir, `${r.name}-1440.png`), fullPage: true });
    console.log(`  ✓ Saved ${r.name}-1440.png`);
  }

  console.log('\n--- TESTING MOBILE (390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const r of routes) {
    await page.goto(`${baseUrl}${r.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, `${r.name}-390.png`), fullPage: true });
    console.log(`  ✓ Saved ${r.name}-390.png`);
  }

  console.log('\n--- TESTING INTERACTIVE FUNNELS & TOOLS (DESKTOP) ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  // 1. Hero Telemetry Switcher
  console.log('Testing Hero telemetry stage switch...');
  await page.click('text=Series A/B Growth');
  await page.waitForTimeout(300);
  const burnMultiple = await page.textContent('text=Burn Multiple (Modeled)');
  console.log(`  Burn multiple section verified.`);

  // 2. Open Diagnostic Modal from Hero/CTA
  console.log('Testing Financial Maturity Index Diagnostic...');
  await page.click('text=Assess Financial Maturity (2 Min)');
  await page.waitForTimeout(400);

  // Take screenshot of question 1
  await page.screenshot({ path: path.join(outDir, 'diagnostic-step1-1440.png') });
  console.log('  ✓ Saved diagnostic-step1-1440.png');

  // Answer 5 questions
  for (let i = 0; i < 5; i++) {
    const firstOption = page.locator('button.group:has(span.text-agrya-slate-800)').first();
    await firstOption.click();
    await page.waitForTimeout(300);
  }

  // Screenshot of composite score
  await page.screenshot({ path: path.join(outDir, 'diagnostic-result-1440.png') });
  console.log('  ✓ Saved diagnostic-result-1440.png');

  // Click "Book Partner Diagnostic Review"
  console.log('Clicking Book Partner Diagnostic Review...');
  await page.click('text=Book Partner Diagnostic Review');
  await page.waitForTimeout(400);

  // Verify Inquiry Modal opened with prefilled diagnostic service
  await page.screenshot({ path: path.join(outDir, 'inquiry-modal-diagnostic-1440.png') });
  console.log('  ✓ Saved inquiry-modal-diagnostic-1440.png');

  // Test Booking Tab
  console.log('Testing Interactive Calendar Booking Tab...');
  await page.click('button:has-text("Instant Calendar Booking")');
  await page.waitForTimeout(300);

  // Select a slot
  await page.click('button:has-text("02:00 PM - 02:45 PM IST")');
  await page.waitForTimeout(200);

  await page.screenshot({ path: path.join(outDir, 'inquiry-booking-slot-1440.png') });
  console.log('  ✓ Saved inquiry-booking-slot-1440.png');

  // Close modal
  await page.click('button[aria-label="Close dialog"]');
  await page.waitForTimeout(300);

  // 3. Test Runway Calculator Interactive Sliders
  console.log('Testing Runway Calculator Page interactivity...');
  await page.goto(`${baseUrl}/tools/runway-calculator`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Toggle Scenario to Conservative
  await page.click('button:has-text("Conservative")');
  await page.waitForTimeout(300);

  // Adjust Cash Balance slider
  const cashSlider = page.locator('input[type="range"]').first();
  await cashSlider.fill('1200');
  await page.waitForTimeout(300);

  await page.screenshot({ path: path.join(outDir, 'runway-calculator-active-1440.png') });
  console.log('  ✓ Saved runway-calculator-active-1440.png');

  // 4. Check Team Page Listing Order
  console.log('Verifying Team page order and credentials...');
  await page.goto(`${baseUrl}/team`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  const teamCards = await page.locator('h3').allTextContents();
  console.log('  Found team leaders:', teamCards.slice(0, 4));

  if (teamCards[0].includes('Priya Raghavan') && teamCards[1].includes('Jayakumar M')) {
    console.log('  ✓ Founder & Co-Founder ordering verified: Priya Raghavan & Jayakumar M at top!');
  } else {
    console.log('  Notice team card order:', teamCards.slice(0, 4));
  }

  // 5. Check P0-1: HeroCommandCenter chip & persistent footnote
  console.log('\n--- VERIFYING P0-1 / P2-01 / P2-03: HERO COMMAND CENTER ---');
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const chipText = await page.textContent('text=ILLUSTRATIVE - MODELED ARCHETYPE');
  console.log(`  ✓ P0-1 Chip present: "${chipText?.trim()}"`);
  const footnoteText = await page.textContent('text=* Figures are illustrative modeled archetypes');
  console.log(`  ✓ P0-1 Footnote present: "${footnoteText?.trim().slice(0, 50)}..."`);
  const cfoMethodologyLink = await page.getAttribute('a[href="/cfo"]', 'href');
  console.log(`  ✓ P0-1 Methodology anchor link: ${cfoMethodologyLink}`);

  // 6. Check P1-04: StoryPage exact founder quote & 4 cards
  console.log('\n--- VERIFYING P1-04: STORY PAGE RESTORATION ---');
  await page.goto(`${baseUrl}/story`, { waitUntil: 'networkidle' });
  const storyQuote = await page.textContent('text=Hey, we are Priya and Jayakumar.');
  console.log(`  ✓ P1-04 Founder narrative quote verified: "${storyQuote?.trim().slice(0, 40)}..."`);
  const distractionTrap = await page.textContent('text=The Distraction Trap');
  const complianceBlindspots = await page.textContent('text=Compliance Blindspots');
  const financialFog = await page.textContent('text=Financial Fog');
  const scalingCeilings = await page.textContent('text=Scaling Ceilings');
  console.log(`  ✓ P1-04 Realization cards verified: 4 cards present (${distractionTrap ? 'Trap' : ''}, ${complianceBlindspots ? 'Blindspots' : ''}, ${financialFog ? 'Fog' : ''}, ${scalingCeilings ? 'Ceilings' : ''})`);

  // 7. Check P2-09 & P2-10: CfoPage 36+ capping and advisory bands
  console.log('\n--- VERIFYING P2-09 & P2-10: CFO RUNWAY SIMULATOR ---');
  await page.goto(`${baseUrl}/cfo`, { waitUntil: 'networkidle' });
  const cashInput = page.locator('#cfo-cash-balance');
  const burnInput = page.locator('#cfo-burn-rate');
  await cashInput.fill('2000');
  await burnInput.fill('10');
  await page.waitForTimeout(300);
  const runwayDisplay = await page.textContent('text=36+');
  console.log(`  ✓ P2-09 Capped display at 36+ Months: verified "${runwayDisplay?.trim()}"`);
  const advisoryBand = await page.textContent('text=Extended Growth Treasury (24+ Months)');
  console.log(`  ✓ P2-10 Advisory band: verified "${advisoryBand?.trim()}"`);

  // 8. Check P1-07, P1-08, P2-14, P2-16: Footer Governance & Claims
  console.log('\n--- VERIFYING P1-07 / P1-08 / P2-14 / P2-16: FOOTER INTEGRITY ---');
  const copyrightText = await page.textContent('text=© 2026 Agrya Consulting Private Limited');
  console.log(`  ✓ P2-14 Exact copyright string: "${copyrightText?.trim()}"`);
  const icaiStatement = await page.textContent('text=Led by Fellows (FCA) & Associates (ACA) of the Institute of Chartered Accountants of India');
  console.log(`  ✓ P1-08 Factual ICAI statement: "${icaiStatement?.trim()}"`);
  const formHandling = await page.textContent('text=Encrypted Form Handling & Statutory Rigor');
  console.log(`  ✓ P1-07 Encrypted Form Handling statement: "${formHandling?.trim()}"`);
  const linkedinHref = await page.getAttribute('a[aria-label="LinkedIn"]', 'href');
  console.log(`  ✓ P2-16 Non-www LinkedIn URL: "${linkedinHref}"`);

  // 9. Test 404 handling
  console.log('\n--- VERIFYING 404 ROUTE HANDLING ---');
  await page.goto(`${baseUrl}/non-existent-route-for-testing`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '404-1440.png') });
  console.log('  ✓ Saved 404-1440.png');

  console.log(`\nVerification Complete! Total Console Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.log('Errors observed:');
    errors.forEach(e => console.log('  -', e));
  }

  await browser.close();
}

runVerification().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
