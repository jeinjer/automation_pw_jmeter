import { test, expect } from '@playwright/test';

test('SMOKE: home shows example links', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('ul li a');
  const count = await links.count();
  expect(count).toBeGreaterThan(20);
});
