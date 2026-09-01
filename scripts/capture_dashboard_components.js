import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureDashboard() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=2']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1400, deviceScaleFactor: 2 });

  if (!fs.existsSync('frames_dashboard')) {
    fs.mkdirSync('frames_dashboard', { recursive: true });
  }

  console.log('1. Loading Dashboard in Standalone View...');
  await page.goto('http://localhost:5173/?dashboard=true&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Full Mobile Frame
  let phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_dashboard/db_mobile_full.png' });

  // Capture Individual Cards by evaluating DOM elements
  console.log('2. Capturing Individual Dashboard Cards...');
  const cardHandles = await page.$$('.relative.bg-white.border.border-slate-200.rounded-3xl, .relative.bg-white.border.border-\\[\\#21B5FF\\]\\/40.rounded-3xl, .relative.p-4.rounded-3xl.bg-white');
  console.log(`Found ${cardHandles.length} card elements`);

  // Card 1: Attendance Stats
  if (cardHandles[0]) {
    await cardHandles[0].screenshot({ path: 'frames_dashboard/card1_attendance.png' });
    console.log('Saved card1_attendance.png');
  }

  // Card 2: Utilization Heatmap
  if (cardHandles[1]) {
    await cardHandles[1].screenshot({ path: 'frames_dashboard/card2_utilization.png' });
    console.log('Saved card2_utilization.png');
  }

  // Card 3: Cost Summary
  if (cardHandles[2]) {
    await cardHandles[2].screenshot({ path: 'frames_dashboard/card3_cost.png' });
    console.log('Saved card3_cost.png');
  }

  // Card 4: Space Advisory (Upgrade Plan)
  if (cardHandles[3]) {
    await cardHandles[3].screenshot({ path: 'frames_dashboard/card4_advisory.png' });
    console.log('Saved card4_advisory.png');
  }

  // Also capture Tablet Dashboard Frame
  console.log('3. Capturing Tablet Dashboard Frame...');
  await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/?dashboard=true&view=tablet&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  const tablet = await page.$('.max-w-\\[740px\\]');
  if (tablet) await tablet.screenshot({ path: 'frames_dashboard/db_tablet_frame.png' });

  await browser.close();
  console.log('Dashboard capture completed successfully!');
}

captureDashboard().catch(err => {
  console.error('Error during dashboard capture:', err);
  process.exit(1);
});
