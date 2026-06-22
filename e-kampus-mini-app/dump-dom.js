const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:8085', { waitUntil: 'networkidle0' });
  
  // Dump the DOM structure to see what's blocking
  const dom = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  
  const fs = require('fs');
  fs.writeFileSync('dom.html', dom);
  
  await browser.close();
})();
