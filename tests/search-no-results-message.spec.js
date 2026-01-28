import { test, expect } from '@playwright/test';

test('Search: user searches and gets', async ({ page }) => {
  await page.goto('https://eva.ua/ua/', { waitUntil: 'domcontentloaded' });

  const acceptCookies = page.getByRole('button', { name: /прийняти|accept|згоден|ok/i }).first();
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  const searchInput = page.locator('header input.m-search-bar__input[type="search"]').first();
  await expect(searchInput).toBeVisible();

  const query = `qwerty123456_${Date.now()}`;
  await searchInput.click();
  await searchInput.fill(query);

  const showAllResultsLink = page.getByRole('link', { name: /показати всі результати пошуку/i }).first();

  if (await showAllResultsLink.isVisible().catch(() => false)) {
    await showAllResultsLink.click();
  } else {
    await searchInput.press('Enter');
  }

  const noResultsMessage = page.locator('p.page-title__no-products-found');
  await expect(noResultsMessage).toBeVisible({ timeout: 15000 });
  await expect(noResultsMessage).toHaveText(/нічого не знайдено/i);

  const productCards = page.locator(
    'div.products__grid-col.products__product-card:not([banner-data])'
  );
  await expect(productCards).toHaveCount(0, { timeout: 15000 });
  await expect.poll(() => page.url(), { timeout: 15000 }).toMatch(/\/ua\/search\/\?q=/i);
});