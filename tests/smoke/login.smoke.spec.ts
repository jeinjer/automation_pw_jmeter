import { test, expect } from '@playwright/test';
import { USERS } from '../../src/data/users';

test('SMOKE: login and logout', async ({ page }) => {
  await page.goto('/login');

  await page.locator('#username').fill(USERS.valid.username);
  await page.locator('#password').fill(USERS.valid.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/secure$/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
});
