import { test, expect } from '@playwright/test';
import { BASIC_AUTH } from '../../src/data/basicAuth';

test('SMOKE: basic auth allows access', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: BASIC_AUTH.username,
      password: BASIC_AUTH.password,
    },
  });

  const page = await context.newPage();
  await page.goto('/basic_auth');

  await expect(page.locator('div.example p')).toContainText(
    'Congratulations! You must have the proper credentials.',
  );

  await context.close();
});
