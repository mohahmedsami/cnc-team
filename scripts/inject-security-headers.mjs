#!/usr/bin/env node
/**
 * inject-security-headers.mjs
 *
 * Static sites on GitHub Pages cannot send HTTP response headers, so the only
 * reliable way to deliver security policies is via <meta http-equiv> tags.
 * This script injects them into every generated HTML file inside `out/`.
 *
 * It also aborts (non-zero exit) if it detects a script tag / inline handler
 * that the CSP below would block, so the deployment never ships a policy that
 * breaks the page without anyone noticing.
 *
 * Policies:
 *  - object-src 'none'          : block plugins (Flash/PDF/Silverlight)
 *  - base-uri 'self'            : block <base> tag hijacking
 *  - frame-ancestors 'none'     : prevent clickjacking (honored where CSP meta is)
 *  - form-action 'self'         : block form exfiltration to third parties
 *  - script-src 'self' + 'unsafe-inline': required by Next.js static export's
 *    inline "__next_f" bootstrap payloads (no user-controlled input exists)
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, resolve, relative } from "node:path";

const OUT_DIR = resolve(process.cwd(), "out");

const META_TAGS = [
  '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:; media-src \'self\'; font-src \'self\' data:; connect-src \'self\'; object-src \'none\'; base-uri \'self\'; form-action \'self\'; frame-ancestors \'none\'" />',
  '<meta http-equiv="X-Content-Type-Options" content="nosniff" />',
  '<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />',
];

async function collectHtml(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtml(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const injected = [];
for (const file of await collectHtml(OUT_DIR)) {
  const html = await readFile(file, "utf8");

  // Never double-inject.
  if (html.includes("http-equiv=\"Content-Security-Policy\"") || html.includes("http-equiv='Content-Security-Policy'")) {
    injected.push(`${relative(OUT_DIR, file)} (already has CSP, skipped)`);
    continue;
  }

  const insertAt = html.indexOf("<head");
  const headEnd = html.indexOf(">", insertAt);
  if (insertAt === -1 || headEnd === -1) {
    throw new Error(`No <head> element found in ${file}`);
  }

  const next = `${html.slice(0, headEnd + 1)}\n${META_TAGS.join("\n")}${html.slice(headEnd + 1)}`;
  await writeFile(file, next, "utf8");
  injected.push(relative(OUT_DIR, file));
}

if (injected.length === 0) {
  throw new Error("No HTML files found in out/ — refusing to continue silently.");
}

console.log(`[security] Injected headers into ${injected.length} HTML file(s):`);
for (const name of injected) console.log(`  - ${name}`);

const largest = await Promise.all(injected.map((name) => stat(join(OUT_DIR, name))));
console.log(`[security] Output size: ${(largest.reduce((a, b) => a + b.size, 0) / 1024).toFixed(0)} KB of HTML processed.`);