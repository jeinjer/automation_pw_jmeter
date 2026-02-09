import { test, expect } from '@playwright/test';

test('smoke: homepage loads and key content is visible', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByRole('heading', { name: 'Welcome to the-internet' });
  await expect(heading).toBeVisible();

  await expect(page.getByText('Available Examples')).toBeVisible();
});
