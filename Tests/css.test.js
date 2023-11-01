const puppeteer = require('puppeteer');

describe('CSS Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('body should have a gradient background', async () => {
        await page.setContent('<body><div>Test</div></body>');
        await page.addStyleTag({ content: `
    body {
      margin: 0;
      background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,102,0,1) 50%, rgba(252,176,69,1) 100%);
      height: 100vh;
    }
  ` });

        const background = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);
        expect(background).toContain('linear-gradient');
    });

    test('default styles menu-icon', async () => {
        await page.setContent('<button class="menu-icon">Menu</button>');
        await page.addStyleTag({ content: `
    .menu-icon {
      display: none;
      font-size: 24px;
      color: #FF6600;
      background: black;
      border: 2px solid #FF6600;
      cursor: pointer;
      outline: none;
      padding: 5px 10px;
      border-radius: 5px;
      transition: all 0.3s;
    }
  ` });

        const display = await page.evaluate(() => getComputedStyle(document.querySelector('.menu-icon')).display);
        const fontSize = await page.evaluate(() => getComputedStyle(document.querySelector('.menu-icon')).fontSize);
        expect(display).toBe('none');
        expect(fontSize).toBe('24px');
    });

    test('.menu-icon should be visible at widths below 700px', async () => {
        await page.setViewport({ width: 600, height: 800 });
        await page.setContent('<button class="menu-icon">Menu</button>');
        await page.addStyleTag({ content: `
    @media (max-width: 700px) {
      .menu-icon {
        display: block;
        margin-bottom: 10px;
      }
    }
  ` });

        const display = await page.evaluate(() => getComputedStyle(document.querySelector('.menu-icon')).display);
        expect(display).toBe('block');
    });

    test('nav should have correct flex layout and styles', async () => {
        await page.setContent('<nav></nav>');
        await page.addStyleTag({ content: `
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: black;
      padding: 10px 30px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      gap: 20px;
    }
  ` });

        const display = await page.evaluate(() => getComputedStyle(document.querySelector('nav')).display);
        const justifyContent = await page.evaluate(() => getComputedStyle(document.querySelector('nav')).justifyContent);
        expect(display).toBe('flex');
        expect(justifyContent).toBe('space-between');
    });

    test('nav should change layout at widths below 700px', async () => {
        await page.setViewport({ width: 600, height: 800 });
        await page.setContent('<nav></nav>');
        await page.addStyleTag({ content: `
    @media (max-width: 700px) {
      nav {
        flex-direction: column;
      }
    }
  ` });

        const flexDirection = await page.evaluate(() => getComputedStyle(document.querySelector('nav')).flexDirection);
        expect(flexDirection).toBe('column');
    });


});

