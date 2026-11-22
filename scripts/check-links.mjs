#!/usr/bin/env node
/**
 * Broken-link check (Phase 10). Crawls every same-origin page reachable from
 * the homepage on a running server and reports any link that does not return
 * 200. External links are listed but not fetched (to avoid hammering them).
 *
 *   node scripts/check-links.mjs                 # http://localhost:3000
 *   node scripts/check-links.mjs http://localhost:3100
 *
 * Cross-platform: plain Node 20+, no dependencies.
 */
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const queue = ["/"];
const seen = new Set();
const broken = [];
const external = new Set();

const hrefRe = /href="([^"]+)"/g;

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  let res;
  try {
    res = await fetch(new URL(path, base), { redirect: "manual" });
  } catch (err) {
    broken.push({ path, status: `fetch failed: ${err.message}` });
    continue;
  }
  if (res.status !== 200) {
    broken.push({ path, status: res.status });
    continue;
  }
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) continue;

  const html = await res.text();
  for (const [, raw] of html.matchAll(hrefRe)) {
    const href = raw.replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|#|javascript:)/.test(href)) continue;
    const url = new URL(href, new URL(path, base));
    if (url.origin !== base.origin) {
      external.add(url.origin + url.pathname);
      continue;
    }
    // Skip build assets; they are covered by the build itself.
    if (url.pathname.startsWith("/_next/")) continue;
    const next = url.pathname + url.search;
    if (!seen.has(next)) queue.push(next);
  }
}

console.log(`Checked ${seen.size} internal URL(s) on ${base.origin}.`);
console.log(`External links found (not fetched): ${external.size}`);
for (const e of [...external].sort()) console.log(`  ${e}`);

if (broken.length) {
  console.error(`\n${broken.length} broken link(s):`);
  for (const b of broken) console.error(`  ${b.status}  ${b.path}`);
  process.exit(1);
}
console.log("\nNo broken internal links.");
