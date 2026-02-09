import { test, expect } from '@playwright/test';

test('ui: dropdown select', async ({ page }) => {
  await page.goto('/dropdown');

  const dd = page.locator('#dropdown');

  await dd.selectOption('1');
  await dd.selectOption('2');
  await dd.selectOption('1');

  await expect(dd).toHaveValue('1');
});

