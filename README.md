# QA Automation Lab (Playwright + TypeScript + JMeter)

## Suites
- UI Smoke: `tests/smoke`
- API Tests: `tests/api`
- Performance (JMeter): `performance/jmeter`

## Run locally
### UI Smoke
npm run test:smoke

### API
npm run test:api

### Performance Smoke (JMeter + HTML report)
npm run perf:smoke

### Performance Load (JMeter + HTML report)
npm run perf:load

## Reports
- Playwright HTML: `playwright-report/`
- JMeter HTML: `performance/jmeter/reports/`

## CI
GitHub Actions runs:
- UI smoke
- API tests
- JMeter perf smoke
Uploads reports as artifacts.
