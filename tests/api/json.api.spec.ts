import { test, expect } from '@playwright/test';
import { ENV } from '../../src/config/env';
import { HttpClient } from '../../src/api/clients/httpClient';

test('API SMOKE: GET /json returns JSON with slideshow', async () => {
  const client = new HttpClient();
  await client.init(ENV.apiTestBaseUrl);

  const res = await client.get('/json');
  expect(res.status()).toBe(200);

  const body = (await res.json()) as { slideshow?: unknown };
  expect(body).toHaveProperty('slideshow');

  await client.dispose();
});
