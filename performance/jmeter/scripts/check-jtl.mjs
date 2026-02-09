import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

const jtlPath = process.argv[2];
if (!jtlPath) {
  console.error('Usage: node check-jtl.mjs <path-to-jtl> [maxErrorRate]');
  process.exit(2);
}

const maxErrorRate = Number(process.argv[3] ?? '0');
if (Number.isNaN(maxErrorRate) || maxErrorRate < 0 || maxErrorRate > 1) {
  console.error('maxErrorRate must be a number between 0 and 1');
  process.exit(2);
}

if (!fs.existsSync(jtlPath)) {
  console.error(`JTL not found: ${jtlPath}`);
  process.exit(2);
}

const raw = fs.readFileSync(jtlPath, 'utf-8');
const records = parse(raw, { columns: true, skip_empty_lines: true });

if (!records.length) {
  console.error('JTL has no records');
  process.exit(2);
}

let total = 0;
let errors = 0;

for (const r of records) {
  total += 1;
  const success = String(r.success).toLowerCase() === 'true';
  if (!success) errors += 1;
}

const errorRate = errors / total;

console.log(`Total samples: ${total}`);
console.log(`Errors: ${errors}`);
console.log(`Error rate: ${(errorRate * 100).toFixed(2)}%`);

if (errorRate > maxErrorRate) {
  console.error(
    `FAIL: errorRate ${(errorRate * 100).toFixed(2)}% > max ${(maxErrorRate * 100).toFixed(2)}%`,
  );
  process.exit(1);
}

console.log('PASS');
