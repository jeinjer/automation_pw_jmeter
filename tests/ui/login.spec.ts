import { test, expect } from '@playwright/test';

test('ui: valid login demo', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

test('ui: invalid login demo', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', {name: 'username'}).fill('invalidUser');
    await page.getByRole('textbox', {name: 'password'}).fill('invalidUser');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
}
)