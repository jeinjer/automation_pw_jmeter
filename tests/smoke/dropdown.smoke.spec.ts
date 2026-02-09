import { test, expect } from '@playwright/test';

test('SMOKE: dropdown select option 2', async ({ page }) => {
  await page.goto('/dropdown');

  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('2');

  await expect(dropdown).toHaveValue('2');
});
