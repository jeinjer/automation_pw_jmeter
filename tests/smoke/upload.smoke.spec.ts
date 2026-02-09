import { test, expect } from '@playwright/test';
import path from 'node:path';

test('SMOKE: file upload (observable behavior)', async ({ page }) => {

  await page.goto('/upload');

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'files',
    'sample.txt',
  );

  const fileInput = page.locator('#file-upload');
  await fileInput.setInputFiles(filePath);

  const filesCount = await fileInput.evaluate((el: HTMLInputElement) => el.files?.length ?? 0);
  expect(filesCount).toBe(1);

  await page.locator('#file-submit').click();

  await expect(
    page.getByRole('heading', { name: /File Uploaded!/i }),
  ).toBeVisible();
});
