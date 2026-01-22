import { test, expect } from '@playwright/test';

test('Rozetka: user can type text into search field', async ({ page }) => {
  // 1. Відкрити головну сторінку
  await page.goto('https://rozetka.com.ua/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Поле пошуку (реальний стабільний локатор)
  const searchInput = page.locator("//input[@data-testid='search-suggest-input']");

  // 3. Перевірити, що поле видно
  await expect(searchInput).toBeVisible({ timeout: 10000 });


  // 4. Ввести текст
  const query = 'iphone';
  await searchInput.fill(query);

  await page.waitForTimeout(1000)

  // 5. Перевірити, що текст реально введений
  await expect(searchInput).toHaveValue(query);
});







test('Перевірка сайту розетка пo крокам', async ({ page }) => {
  
  await page.goto('https://rozetka.com.ua/');
  await page.waitForLoadState('domcontentloaded');

  const searchInput = page.locator("//input[@data-testid='search-suggest-input']");

  await expect(searchInput).toBeVisible({ timeout: 3000 });

  const query = 'телефони';
  await searchInput.fill(query);

  await expect(searchInput).toHaveValue(query);
  
  const searchButon = page.locator("//button[@data-testid='search-suggest-submit']");
  await searchButon.click
  
  const title = page.locator("//h1[@class='catalog-heading']")

await expect (title).toHaveText("Мобільні телефони");

});