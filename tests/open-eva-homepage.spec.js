import { test, expect } from '@playwright/test';

test('Open EVA Homepage', async ({ page }) => {

    await page.goto('https://eva.ua/', { waitUntil: 'domcontentloaded' });

    const acceptCookis = page.getByRole('button', { name: /прийняти|accept|згоден|ok/i });
    if (await acceptCookis.first().isVisible().catch(() => false )){
        await acceptCookis.first().click();
    }
    await expect(page).toHaveURL(/eva\.ua/);
    await expect(page).toHaveTitle(/EVA|ЄВА/i);

    const logo = page.locator('.o-logo img[alt="EVA.UA"]').first();;
    await expect(logo).toBeVisible();
    const searchInput = page.locator('input[type="search"], input[name*="search" i], input[placeholder*="пошук" i]').first();
    await expect(searchInput).toBeVisible();

    const cart = page.locator('button:has(span.m-icon-action__icon-counter)').first();
    await expect(cart).toBeAttached();
    
});