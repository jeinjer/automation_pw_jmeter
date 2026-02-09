import { test, expect } from '@playwright/test';

test('SMOKE: multiple windows opens new page with expected heading', async ({ page }) => {
  await page.goto('/windows');

  const results = await Promise.all([
  page.context().waitForEvent('page'),
  page.getByRole('link', { name: 'Click Here' }).click(),
  ]);

  const newPage = results[0];

  await newPage.waitForLoadState();

  await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();
});
