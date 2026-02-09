import 'dotenv/config';

function mustGet(name: string): string {
  const v = process.env[name];
  if (!v || v.trim().length === 0) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const ENV = {
  baseUrl: mustGet('BASE_URL'),
  apiBaseUrl: mustGet('API_BASE_URL'),
  apiTestBaseUrl: mustGet('API_TEST_BASE_URL'),
  envName: process.env.ENV ?? 'local',
};
