const puppeteer = require('puppeteer');

var main = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.goto('http://gamemarket.jp/boothlist/');

  const ret = await page.evaluate(() => {
    var list = [];
    document.querySelectorAll('#subarea8 tbody>tr>td').forEach(element => {
      if (element.children.length > 0 && element.children[0].getAttribute('src').indexOf('new') >= 0) {
        const a = element.querySelector('a[href]');
        if (a) list.push({href: a.getAttribute('href'), name: a.innerText});
      }

    });
    return JSON.stringify(list); 
  });

  console.log(ret);

  browser.close();
};

main();

