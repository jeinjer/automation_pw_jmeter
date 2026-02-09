import { test, expect } from '@playwright/test';

test('ui: checkboxes toggle', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com//checkboxes');

  const boxes = page.locator('input[type="checkbox"]');
  await expect(boxes).toHaveCount(2);

  const first = boxes.nth(0);
  const second = boxes.nth(1);

  await first.check();
  await expect(first).toBeChecked();

  await second.uncheck();
  await expect(second).not.toBeChecked();
});

test('test', async ({ page }) => {
  await page.goto('/checkboxes');
  
  await page.getByRole('checkbox').first().check();
  await page.getByRole('checkbox').nth(1).uncheck();

  await expect(page.getByRole('checkbox').first()).toBeVisible();
  await page.getByRole('checkbox').first().uncheck();
  await page.getByRole('checkbox').nth(1).check();

});