import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('SMOKE: file download triggers and saves file', async ({ page }) => {
  await page.goto('/download');

  const firstFileLink = page.locator('div.example a').first();
  await expect(firstFileLink).toBeVisible();

  const linkText = (await firstFileLink.textContent())?.trim() ?? '';
  expect(linkText.length).toBeGreaterThan(0);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    firstFileLink.click(),
  ]);

  const suggested = download.suggestedFilename();
  expect(suggested.length).toBeGreaterThan(0);

  const filePath = `test-results/downloads/${suggested}`;
  await download.saveAs(filePath);

  expect(fs.existsSync(filePath)).toBeTruthy();
  const stat = fs.statSync(filePath);
  expect(stat.size).toBeGreaterThan(0);
});
