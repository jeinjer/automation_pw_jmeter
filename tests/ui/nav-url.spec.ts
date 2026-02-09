import { test, expect } from '@playwright/test';

test('nav: go to /abtest and validate URL', async ({ page }) => {
  await page.goto('/abtest');
  await expect(page).toHaveURL(/\/abtest$/);
});

test('nav: click A/B Testing link and validate heading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  await expect(page.getByRole('heading')).toContainText('A/B Test');
});

test('nav: back and forward', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();
  await expect(page).toHaveURL(/\/checkboxes$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);

  await page.goForward();
  await expect(page).toHaveURL(/\/checkboxes$/);
});