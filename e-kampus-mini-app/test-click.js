const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:8085', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot1.png' });
  
  console.log('Taking screenshot. Checking for clickable elements...');
  
  // Find the menu button (first Ionicons)
  const menuBtn = await page.$('div[dir="auto"]'); // Just trying to see if we can click anything
  if (menuBtn) {
    try {
      await menuBtn.click();
      console.log('Clicked menu btn');
    } catch (e) {
      console.log('Error clicking:', e.message);
    }
  } else {
    console.log('Menu btn not found');
  }

  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot2.png' });

  await browser.close();
})();
