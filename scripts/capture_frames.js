import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=2']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 1000, deviceScaleFactor: 2 });

  if (!fs.existsSync('frames_mobile')) {
    fs.mkdirSync('frames_mobile', { recursive: true });
  }

  const steps = [
    { name: 'step1_setup_team', url: 'http://localhost:4173/?step=1&tab=team&view=mobile&standalone=true' },
    { name: 'step1_setup_hub', url: 'http://localhost:4173/?step=1&tab=hub&view=mobile&standalone=true' },
    { name: 'step1_setup_resources', url: 'http://localhost:4173/?step=1&tab=resources&view=mobile&standalone=true' },
    { name: 'step2_approve_match', url: 'http://localhost:4173/?step=2&view=mobile&standalone=true' },
    { name: 'step3_pay_checkout', url: 'http://localhost:4173/?step=3&paid=false&view=mobile&standalone=true' },
    { name: 'step3_pay_dashboard', url: 'http://localhost:4173/?step=3&paid=true&view=mobile&standalone=true' },
  ];

  for (const s of steps) {
    console.log(`Navigating to ${s.name}: ${s.url}`);
    await page.goto(s.url, { waitUntil: 'networkidle0', timeout: 15000 });
    // Wait for animations and fonts to settle
    await new Promise(r => setTimeout(r, 1200));

    // Find the mobile device frame element
    const phoneElement = await page.$('.max-w-\\[420px\\]');
    if (phoneElement) {
      await phoneElement.screenshot({
        path: `frames_mobile/${s.name}.png`,
        omitBackground: false
      });
      console.log(`Saved frames_mobile/${s.name}.png`);
    } else {
      await page.screenshot({ path: `frames_mobile/${s.name}.png` });
      console.log(`Fallback saved full page for ${s.name}`);
    }
  }

  await browser.close();
  console.log('Capture finished successfully!');
}

capture().catch(err => {
  console.error('Error capturing frames:', err);
  process.exit(1);
});
