import { test, expect } from '@playwright/test';
import { ENV } from '../../src/config/env';
import { HttpClient } from '../../src/api/clients/httpClient';

const cases = [
  { name: 'simple payload', payload: { a: 1, b: 'x' } },
  { name: 'nested payload', payload: { user: { id: 10, role: 'admin' } } },
];

for (const c of cases) {
  test(`API SMOKE: POST /post echoes payload (${c.name})`, async () => {
    const client = new HttpClient();
    await client.init(ENV.apiTestBaseUrl);

    const res = await client.post('/post', c.payload);
    expect(res.status()).toBe(200);

    const body = (await res.json()) as { json?: unknown };
    expect(body.json).toEqual(c.payload);

    await client.dispose();
  });
}
