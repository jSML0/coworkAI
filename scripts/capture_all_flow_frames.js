import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=2']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 1200, deviceScaleFactor: 2 });

  if (!fs.existsSync('frames_mobile')) {
    fs.mkdirSync('frames_mobile', { recursive: true });
  }

  // 1. Step 1 Team
  console.log('Capturing Step 1: Team...');
  await page.goto('http://localhost:4173/?step=1&tab=team&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  let phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step1_team.png' });

  // 2. Step 1 Hub
  console.log('Capturing Step 1: Hub & Date...');
  await page.goto('http://localhost:4173/?step=1&tab=hub&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step1_hub.png' });

  // 3. Step 1 Resources & Catering
  console.log('Capturing Step 1: Resources & Catering...');
  await page.goto('http://localhost:4173/?step=1&tab=resources&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step1_resources.png' });

  // 4. Step 2 Approve Match
  console.log('Capturing Step 2: AI Match Hub...');
  await page.goto('http://localhost:4173/?step=2&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step2_match.png' });

  // 5. Step 2 Floor Cluster Map
  console.log('Capturing Step 2: Floor Cluster Map...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 380;
  });
  await new Promise(r => setTimeout(r, 700));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step2_floor_map.png' });

  // 6. Step 3 Pay Breakdown & Checkout
  console.log('Capturing Step 3: Cost Authorization & Pay...');
  await page.goto('http://localhost:4173/?step=3&paid=false&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step3_pay_checkout.png' });

  // 7. Step 3 Pay Scrolled (Corporate billing & Pay button)
  console.log('Capturing Step 3: Corporate Billing & Pay Button...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 340;
  });
  await new Promise(r => setTimeout(r, 700));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/step3_pay_button.png' });

  // 8. Dashboard - Mobile Top (Active Booking & Attendance)
  console.log('Capturing Dashboard Mobile: Top...');
  await page.goto('http://localhost:4173/?dashboard=true&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/dashboard_mobile_top.png' });

  // 9. Dashboard - Mobile Scrolled to Heatmap & Cost
  console.log('Capturing Dashboard Mobile: Heatmap & Cost...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 360;
  });
  await new Promise(r => setTimeout(r, 700));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/dashboard_mobile_heatmap.png' });

  // 10. Dashboard - Mobile Scrolled to AI Space Advisory
  console.log('Capturing Dashboard Mobile: Upgrade Advisory...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 700;
  });
  await new Promise(r => setTimeout(r, 700));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/dashboard_mobile_advisory.png' });

  // 11. Dashboard - Tablet Wide View
  console.log('Capturing Dashboard Tablet View...');
  await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/?dashboard=true&view=tablet&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  const tablet = await page.$('.max-w-\\[740px\\]');
  if (tablet) await tablet.screenshot({ path: 'frames_mobile/dashboard_tablet.png' });

  // 12. Dashboard - Desktop Expanded View
  console.log('Capturing Dashboard Desktop View...');
  await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/?dashboard=true&view=desktop&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  const desktop = await page.$('.max-w-5xl');
  if (desktop) await desktop.screenshot({ path: 'frames_mobile/dashboard_desktop.png' });

  await browser.close();
  console.log('All captures completed successfully!');
}

captureAll().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
