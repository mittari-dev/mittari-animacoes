// usage: node capture.js stills 0.5,2,5 | node capture.js frames
const { chromium } = require('C:/Users/Usuário/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const FPS = 30, DUR = 21.6;
(async () => {
  const mode = process.argv[2];
  const browser = await chromium.launch({ executablePath: 'C:/Users/Usuário/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file:///' + path.resolve(__dirname, 'video.html').replace(/\\/g, '/'));
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(500);
  const ok = await page.evaluate(() => document.fonts.check('800 40px Archivo') && document.fonts.check('500 20px "IBM Plex Mono"'));
  console.log('fonts loaded:', ok);
  if (mode === 'stills') {
    fs.mkdirSync(path.join(__dirname, 'stills'), { recursive: true });
    for (const t of process.argv[3].split(',').map(Number)) {
      await page.evaluate(t => window.render(t), t);
      await page.screenshot({ path: path.join(__dirname, 'stills', `t${t.toFixed(2)}.png`) });
    }
  } else {
    const dir = path.join(__dirname, 'frames'); fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(DUR * FPS);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.render(t), i / FPS);
      await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.png`) });
      if (i % 60 === 0) console.log('frame', i, '/', n);
    }
  }
  await browser.close();
})();
