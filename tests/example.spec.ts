import { test, expect } from '@playwright/test';

test('wikipedia test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

  await page.waitForTimeout(2000)

  await page.getByRole('link', { name: 'English 7,121,000+ articles' }).click()

  await page.waitForTimeout(2000)

await page.getByRole('link', { name: 'Log in' }).click()

await page.waitForTimeout(2000)

await page.getByRole('textbox', { name: 'Username' }).fill('fake_username')

await page.waitForTimeout(1000)

await page.getByRole('textbox', { name: 'Password' }).fill('face_pass')

await page.waitForTimeout(1000)

await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()

});