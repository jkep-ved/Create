import { test, expect } from '@playwright/test';

test('UI Autotest: Search product on EVA.ua', async ( { page } ) => {

await page.goto('https://eva.ua/', { waitUntile: 'domcontentloaded'});
const query = 'шампунь';
await expect(page).toHaveURL(/eva\.ua/);

const searchInput = page.locator ('input.m-search-bar__input').first();
await expect(searchInput). toBeVisible();
await searchInput.fill(query);
await searchInput.press('Enter');
const productCards = page.locator('.products__grid-col','');
await expect(productCards.first()).toBeVisible();
const count = await productCards.count();
expect(count).toBeGreaterThan(0);
});