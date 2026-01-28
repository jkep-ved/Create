import { test, expect } from '@playwright/test';

test('12345', async ({ page }) => {
  const snackbar = page.getByText('Thanks for your purchase. Please check your email for payment.');
  const checkout = page.locator('[data-test="checkout"]');

  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await checkout.click();
  await page.getByRole('textbox', { name: 'Name' }).fill('vika');
  await page.getByRole('textbox', { name: 'Email' }).fill('v@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(snackbar).toBeEnabled();
  await expect(checkout).toHaveText('Total: $0.00');
});