import { test, expect } from '@playwright/test';

test('SMOKE: geolocation shows coordinates and google maps link', async ({ browser }) => {

  const latitude = -34.6037;
  const longitude = -58.3816;

  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude, longitude },
  });

  const page = await context.newPage();
  await page.goto('/geolocation');

  await page.getByRole('button', { name: 'Where am I?' }).click();

  const latText = page.locator('#lat-value');
  const longText = page.locator('#long-value');

  await expect(latText).toBeVisible();
  await expect(longText).toBeVisible();

  await expect(latText).toContainText(String(latitude));
  await expect(longText).toContainText(String(longitude));

  const mapsLink = page.getByRole('link', { name: 'See it on Google' });
  await expect(mapsLink).toBeVisible();

  const href = await mapsLink.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href!).toContain('http://maps.google.com');

  await context.close();
});
