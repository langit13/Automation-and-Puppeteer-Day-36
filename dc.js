const puppeteer = require('puppeteer');

const BASE_URL = 'https://discord.com';

const discord = {
    browser: null,
    page: null,

    initialize: async () => {
        console.log('Launching browser...');
        discord.browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        discord.page = await discord.browser.newPage();

        console.log('Navigating to Discord...');
        await discord.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 0 });
        console.log('Navigation successful.');
    },

    login: async () => {
        console.log('Looking for login button...');
        await discord.page.waitForSelector('a[href="/login"]', { timeout: 10000 });

        let loginButton = await discord.page.$('a[href="/login"]');
        if (loginButton) {
            console.log('Clicking login button...');
            await loginButton.click();
            await discord.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 });
            console.log('Login navigation successful.');
        } else {
            console.log('Login button not found.');
            return;
        }

        console.log('Filling login form...');
        // Tunggu hingga input email termuat
        const emailSelector = 'input[aria-label="Email or Phone Number"]';
        await discord.page.waitForSelector(emailSelector, { timeout: 20000 });
        await discord.page.type(emailSelector, 'muhammadazminuriman5@gmail.com', { delay: 50 });

        // Tunggu hingga input password termuat
        const passwordSelector = 'input[name="password"]';
        await discord.page.waitForSelector(passwordSelector, { timeout: 20000 });
        await discord.page.type(passwordSelector, 'Langit13@.$', { delay: 50 });

        console.log('Looking for "Log In" button...');
        const loginSelector = 'button[type="submit"]';
        await discord.page.waitForSelector(loginSelector, { timeout: 10000 });

        loginButton = await discord.page.$(loginSelector);
        if (loginButton) {
            console.log('Clicking "Log In" button...');
            await loginButton.click();
            await discord.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 });
            console.log('Login successful.');
        } else {
            console.log('"Log In" button not found.');
        }
    },
    moveTo: async (serverID, channelID) => {
        console.log(`Navigating to server ${serverID} and channel ${channelID}...`);
        await discord.page.goto(`https://discord.com/channels/${serverID}/${channelID}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
        // Tunggu hingga elemen input pesan muncul
        const messageInputSelector = 'div[role="textbox"][contenteditable="true"]';
        await discord.page.waitForSelector(messageInputSelector, { timeout: 40000 });
        console.log('Navigation complete.');
    },
    
    textMsg: async (txt) => {
        console.log(`Sending message: ${txt}`);
    
        // Tunggu hingga elemen input pesan tersedia
        const messageInputSelector = 'div[role="textbox"][contenteditable="true"]';
        await discord.page.waitForSelector(messageInputSelector, { timeout: 40000 });
        console.log('Message input found.');
    
        // Klik untuk memastikan input fokus
        await discord.page.click(messageInputSelector);
    
        // Ketik pesan
        await discord.page.type(messageInputSelector, txt, { delay: 100 });
    
        // Tekan Enter pertama kali
        console.log('Pressing Enter (first time)...');
        await discord.page.keyboard.press('Enter');
    
        // Tunggu sejenak sebelum menekan Enter lagi
        await new Promise(resolve => setTimeout(resolve, 500));
    
        // Tekan Enter kedua kali
        console.log('Pressing Enter (second time)...');
        await discord.page.keyboard.press('Enter');
    
        console.log('Message sent.');
    },         

};

module.exports = discord;
