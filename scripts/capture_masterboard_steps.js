import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureSteps() {
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

  // ================= STEP 1: SETUP =================
  console.log('1. Capturing Step 1: Setup Team...');
  await page.goto('http://localhost:5173/?step=1&tab=team&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  let phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s1_team.png' });

  console.log('2. Capturing Step 1: Setup Resources (Privacy Pods Add-On)...');
  await page.goto('http://localhost:5173/?step=1&tab=resources&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s1_pods.png' });

  console.log('3. Capturing Step 1: Click on Schedule...');
  // Add a visual cursor / click indicator over Schedule button
  await page.evaluate(() => {
    const btn = document.querySelector('button.bg-\\[\\#21B5FF\\], button:has(span)');
    // Find bottom action button
    const buttons = Array.from(document.querySelectorAll('button'));
    const schedBtn = buttons.find(b => b.textContent.includes('Schedule'));
    if (schedBtn) {
      schedBtn.style.outline = '3px solid #21B5FF';
      schedBtn.style.boxShadow = '0 0 20px #21B5FF';
      schedBtn.style.transform = 'scale(0.97)';
    }
  });
  await new Promise(r => setTimeout(r, 500));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s1_schedule_click.png' });

  // ================= STEP 2: APPROVE =================
  console.log('4. Capturing Step 2: Approve AI Match Hub...');
  await page.goto('http://localhost:5173/?step=2&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s2_match.png' });

  console.log('5. Capturing Step 2: Multiple Matches & Selection...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 420;
  });
  await new Promise(r => setTimeout(r, 600));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s2_alt_matches.png' });

  console.log('6. Capturing Step 2: Click on Approve...');
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 0;
    const buttons = Array.from(document.querySelectorAll('button'));
    const appBtn = buttons.find(b => b.textContent.includes('Approve'));
    if (appBtn) {
      appBtn.style.outline = '3px solid #0099FF';
      appBtn.style.boxShadow = '0 0 20px #0099FF';
      appBtn.style.transform = 'scale(0.97)';
    }
  });
  await new Promise(r => setTimeout(r, 500));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s2_approve_click.png' });

  // ================= STEP 3: PAY =================
  console.log('7. Capturing Step 3: Cost & Payment Split...');
  await page.goto('http://localhost:5173/?step=3&paid=false&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s3_payment_split.png' });

  console.log('8. Capturing Step 3: Click on Pay...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const payBtn = buttons.find(b => b.textContent.includes('Pay'));
    if (payBtn) {
      payBtn.style.outline = '3px solid #F59E0B';
      payBtn.style.boxShadow = '0 0 25px #F59E0B';
      payBtn.style.transform = 'scale(0.97)';
    }
  });
  await new Promise(r => setTimeout(r, 500));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s3_pay_click.png' });

  console.log('9. Capturing Step 3 Post-Pay: Dashboard & Recommendation...');
  await page.goto('http://localhost:5173/?dashboard=true&view=mobile&standalone=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  phone = await page.$('.max-w-\\[420px\\]');
  if (phone) await phone.screenshot({ path: 'frames_mobile/mb_s3_dashboard.png' });

  await browser.close();
  console.log('All Master Board frames captured successfully!');
}

captureSteps().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
