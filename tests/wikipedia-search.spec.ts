import { test, expect } from '@playwright/test';

test('Wikipedia: can open English and type into search', async ({ page }) => {
  // 1) Arrange: відкриваємо головну сторінку Wikipedia
  await page.goto('https://www.wikipedia.org/');

  // 2) Act: переходимо на англійську версію
  await page.getByRole('link', { name: /English/i }).click();

  // 3) Assert: перевіряємо, що ми на en.wikipedia.org
  await expect(page).toHaveURL(/en\.wikipedia\.org/);

  // 4) Arrange: знаходимо поле пошуку (стабільний селектор по id)
  const searchInput = page.locator('#searchInput');

  // 5) Assert: поле видно (Playwright сам почекає)
  await expect(searchInput).toBeVisible();

  // 6) Act: вводимо текст
  await searchInput.fill('Playwright');

  // 7) Assert: перевіряємо, що текст справді ввівся
  await expect(searchInput).toHaveValue('Playwright');
});