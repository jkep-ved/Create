import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('User can Open English Wikipedia', async({ page }) => {
    await page.goto('https://www.wikipedia.org/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/wikipedia\.org/);

    const englishLanguageLink = page.locator('#js-link-box-en');

    await expect(englishLanguageLink).toBeVisible();
    await englishLanguageLink.click();
    await expect(page).toHaveURL(/https:\/\/en\.wikipedia\.org/);

    const loginLinc = page.getByRole('link',{ name: 'Log in' }).first();

    await expect(loginLinc).toBeVisible();
    await loginLinc.click();
    
    const usernameInput = page.locator('#wpName1');
    const passwordInput = page.locator('#wpPassword1');
    const loginBoutton = page.locator('#wpLoginAttempt');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginBoutton).toBeVisible();

    await usernameInput.fill(process.env.WIKI_USERNAME ?? '');

    console.log('PASSWORD length:', (process.env.WIKI_PASSWORD ?? '').length);

    await passwordInput.fill(process.env.WIKI_PASSWORD ?? '');
    await expect(usernameInput).toHaveValue(process.env.WIKI_USERNAME ?? '')
    await loginBoutton.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('link', { name: 'Log in' })).toHaveCount(0);
})