const { test, expect } = require('@playwright/test');



test('verify "All Books" link is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})


test('verify "Login" button is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
})

test('verify "Register" button is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
})

test('verify "All Books" link is visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test('verify "add Books" link is visible after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const addBooksLink = await page.$('a[href="/create"]');
    const isAddButtonVisible = await addBooksLink.isVisible();
    expect(isAddButtonVisible).toBe(true);
})



test('Login with valid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
})

test('Login with empty fields', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})

test('Register with valid credentials', async ({page}) => {
    const uniqueEmail = `user_${Math.floor(Math.random() * 1000000)}@example.com`;
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

})

test('Register with empty fields', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('Register with empty email and valid password and confirm password', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})


test('Register with valid email and different password and confirm password', async ({page}) => {
    const uniqueEmail = `user_${Math.floor(Math.random() * 1000000)}@example.com`;
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '1234567');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    })
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})
