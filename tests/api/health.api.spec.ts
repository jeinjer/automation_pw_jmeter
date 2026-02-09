import { test, expect } from '@playwright/test';
import { ENV } from '../../src/config/env';
import { HttpClient } from '../../src/api/clients/httpClient';

test('API SMOKE: GET /status/200 returns 200', async () => {
  const client = new HttpClient();
  await client.init(ENV.apiTestBaseUrl);

  const res = await client.get('/status/200');
  expect(res.status()).toBe(200);

  await client.dispose();
});
