import { test, expect } from '@playwright/test';

test('SMOKE: checkboxes toggle states', async ({ page }) => {
  await page.goto('/checkboxes');

  const boxes = page.locator('input[type="checkbox"]');
  await expect(boxes).toHaveCount(2);

  const first = boxes.nth(0);
  const second = boxes.nth(1);

  await first.check();
  await second.uncheck();

  await expect(first).toBeChecked();
  await expect(second).not.toBeChecked();
});
