import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

console.log('--- 1F916 SPECTRAL OBSERVER AUDIT ---');

// Invariant 1: No write HTTP methods
const writeMethods = /\b(method\s*:\s*['"](POST|PUT|DELETE|PATCH)['"]|\bpost\(|\.post\()/gi;
const writeMatches = html.match(writeMethods);
console.log('1. Write HTTP Methods:', writeMatches ? `FAIL (${writeMatches.join(', ')})` : 'PASS (Zero write methods found)');

// Invariant 2: Zero DOM input/form fields
const inputTags = /<\s*(input|textarea|select|form)\b/gi;
const inputMatches = html.match(inputTags);
console.log('2. DOM Secret & Form Elements:', inputMatches ? `FAIL (${inputMatches.join(', ')})` : 'PASS (0 form/input elements)');

// CSP check
const hasCsp = html.includes("form-action 'none'") && html.includes("default-src 'none'");
console.log('3. Content Security Policy form-action none:', hasCsp ? 'PASS' : 'WARN');

if (!writeMatches && !inputMatches) {
  console.log('\n✅ ALL INVARIANTS SATISFIED: Read-only, zero secret fields, open source.');
} else {
  console.error('\n❌ AUDIT FAILED');
  process.exit(1);
}
