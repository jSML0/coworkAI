import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureDetailed() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=2']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 1100, deviceScaleFactor: 2 });

  if (!fs.existsSync('frames_mobile')) {
    fs.mkdirSync('frames_mobile', { recursive: true });
  }

  // 1. Step 1 Setup - Team Tab
  console.log('Capturing Step 1 Team...');
  await page.goto('http://localhost:4173/?step=1&tab=team&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  let phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f1_setup_team.png' });

  // 2. Step 1 Setup - Hub & Date Tab
  console.log('Capturing Step 1 Hub & Date...');
  await page.goto('http://localhost:4173/?step=1&tab=hub&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f2_setup_hub.png' });

  // 3. Step 1 Setup - Resources & Catering Tab
  console.log('Capturing Step 1 Resources & F&B...');
  await page.goto('http://localhost:4173/?step=1&tab=resources&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f3_setup_resources.png' });

  // 4. Step 2 Approve - AI Matching Hub & Cluster
  console.log('Capturing Step 2 Approve...');
  await page.goto('http://localhost:4173/?step=2&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f4_approve_match.png' });

  // 4b. Step 2 Approve - Scrolled to Floor Cluster Visualizer
  console.log('Capturing Step 2 Approve (Floor Cluster Map)...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 380;
  });
  await new Promise(r => setTimeout(r, 600));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f5_approve_cluster_map.png' });

  // 5. Step 3 Pay - Pre-Payment Cost & Payment Authorization with Pay button
  console.log('Capturing Step 3 Pay (Cost Breakdown & Pay Button)...');
  await page.goto('http://localhost:4173/?step=3&paid=false&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f6_pay_cost_checkout.png' });

  // 6. Step 3 Pay - Post-Payment Dashboard (Cost & Utilization)
  console.log('Capturing Step 3 Pay (Dashboard: Cost & Utilization)...');
  await page.goto('http://localhost:4173/?step=3&paid=true&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f7_pay_dashboard_utilization.png' });

  // 6b. Step 3 Pay - Scrolled to Recommend Upgrade Plan Advisory
  console.log('Capturing Step 3 Pay (Dashboard: Recommend Upgrade Plan)...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 500;
  });
  await new Promise(r => setTimeout(r, 600));
  phone = await page.$('.max-w-\\[420px\\]');
  await phone.screenshot({ path: 'frames_mobile/f8_pay_upgrade_advisory.png' });

  await browser.close();
  console.log('All detailed frames captured successfully!');
}

captureDetailed().catch(err => {
  console.error(err);
  process.exit(1);
});
