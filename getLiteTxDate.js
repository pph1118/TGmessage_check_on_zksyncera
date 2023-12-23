const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function getLiteLatestTransactionDate(walletAddress) {
  const url = `https://zkscan.io/explorer/accounts/${walletAddress}`;
  const browser = await puppeteer.launch({
    // 按需使用
    // executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    // args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto(url);
  try {
    await page.waitForSelector('time', {
      timeout: 10000, // 10 秒超时
    });
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const dateStr = $('time').attr('datetime');

    return dateStr;
  } catch (err) {
    await browser.close();
    return undefined;
  }
}
module.exports = {
  getLiteLatestTransactionDate,
}
