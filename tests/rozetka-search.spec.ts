import { test, expect } from '@playwright/test';

test('Rozetka: user can type text into search field', async ({ page }) => {
  // 1. Відкрити головну сторінку
  await page.goto('https://rozetka.com.ua/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Поле пошуку (реальний стабільний локатор)
  const searchInput = page.locator('input[name="search"]');

  // 3. Перевірити, що поле видно
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // 4. Ввести текст
  const query = 'iphone';
  await searchInput.fill(query);

  // 5. Перевірити, що текст реально введений
  await expect(searchInput).toHaveValue(query);
});