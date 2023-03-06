const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const puppeteer = require('puppeteer')
const screenshot = 'instagram.png';
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', {
        waitUntil: 'networkidle2'
    })

    // email
    await page.waitForSelector("[name='username']")
    await page.type("[name='username']", process.env.INSTAGRAM_USER)

    // password
    await page.keyboard.down('Tab')
    await page.keyboard.type(process.env.INSTAGRAM_PWD)

    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')]
        btns.forEach(function (btn) {
            if (btn.innerText === 'Entrar') { btn.click() }
        })
    })

    await page.screenshot({ path: screenshot })

    //   browser.close()
    console.log('See screenshot: ' + screenshot)
})()