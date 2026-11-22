#!/usr/bin/env node
/**
 * Lists every remaining placeholder with file and line.
 *
 *   npm run check:placeholders            list them (exit 0)
 *   node scripts/check-placeholders.mjs --strict   exit 1 if any remain (CI)
 *   node scripts/check-placeholders.mjs --guard    exit 1 only for production builds
 *
 * A build counts as production when NODE_ENV=production or VERCEL_ENV=production.
 * Cross-platform: plain Node, no shell tools, works on Windows.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["content", "app", "components", "lib"];
const EXTENSIONS = new Set([".ts", ".tsx", ".md", ".mdx", ".json"]);
const SKIP_FILES = new Set([join("lib", "ph.ts")]);
// /styleguide shows the placeholder state with demo-only ph() labels.
const SKIP_DIRS = [join("app", "styleguide")];

const PH_CALL = /\bph\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\)/g;
const PH_LITERAL = /\[PLACEHOLDER:\s*([^\]]*)\]/g;

const args = new Set(process.argv.slice(2));
const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_SITE_ENV === "production";

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(extname(entry.name))) yield full;
  }
}

const found = [];
for (const dir of SCAN_DIRS) {
  for await (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    if (SKIP_FILES.has(rel)) continue;
    if (SKIP_DIRS.some((d) => rel.startsWith(d + "\\") || rel.startsWith(d + "/"))) continue;
    const lines = (await readFile(file, "utf8")).split(/\r?\n/);
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
      for (const re of [PH_CALL, PH_LITERAL]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(line)) !== null) {
          const text = re === PH_CALL ? m[2] : m[1];
          found.push({ file: rel.split("\\").join("/"), line: i + 1, text });
        }
      }
    });
  }
}

if (found.length === 0) {
  console.log("No placeholders remain.");
  process.exit(0);
}

const width = Math.max(...found.map((f) => `${f.file}:${f.line}`.length));
console.log(`${found.length} placeholder(s) remaining:\n`);
for (const f of found) console.log(`  ${`${f.file}:${f.line}`.padEnd(width)}  ${f.text}`);
console.log("");

// Temporary launch override (set ALLOW_PENDING_LEGAL=true in the host's env):
// lets a production build through when the ONLY placeholders left are the
// legal documents in content/legal/. Those pages then show a "being
// finalised" notice (content/legal.ts → pending). Any other placeholder
// still stops the build. Remove the variable once the approved text is in.
const onlyLegal = found.every((f) => f.file.startsWith("content/legal/"));
const rawOverride = process.env.ALLOW_PENDING_LEGAL;
const allowPendingLegal = ["true", "1", "yes"].includes((rawOverride ?? "").trim().toLowerCase());
if (args.has("--guard") && isProduction) {
  // Say exactly what the build saw, so a missing or mistyped variable is obvious in the log.
  console.log(
    rawOverride === undefined
      ? "ALLOW_PENDING_LEGAL is not set for this build."
      : `ALLOW_PENDING_LEGAL is set to "${rawOverride}" (${allowPendingLegal ? "accepted" : 'not accepted: use "true"'}).`,
  );
  if (allowPendingLegal && !onlyLegal) {
    console.log("Override ignored: placeholders remain outside content/legal/.");
  }
}
if (args.has("--guard") && isProduction && onlyLegal && allowPendingLegal) {
  console.warn(
    "WARNING: ALLOW_PENDING_LEGAL=true. Building with legal pages marked as being finalised.\n" +
      "Replace content/legal/*.mdx with adviser-approved text and remove the variable.\n",
  );
  process.exit(0);
}

if (args.has("--strict") || (args.has("--guard") && isProduction)) {
  console.error("Build stopped: replace every placeholder with real, approved content first.");
  process.exit(1);
}
if (args.has("--guard")) {
  console.log("Non-production build: placeholders allowed.\n");
}
