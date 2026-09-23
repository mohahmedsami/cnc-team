# Security Policy for CNC TEAM

## Reporting a vulnerability

If you believe you have found a security vulnerability in this repository or the
deployed site (https://mohahmedsami.github.io/cnc-team/), please report it
privately instead of opening a public issue:

- **Email:** hello@cnc-team.dev
- Include the affected URL/page, a description of the issue, and (if possible) a
  minimal reproduction.

Please allow up to 7 days for a first response. Do not test attacks against the
live site — this is a public marketing page with no accounts, forms, or user data.

## What is in place

- **Build pipeline** — all GitHub Actions are SHA-pinned; npm resolves only from
  registry.npmjs.org; the lockfile is verified by `npm ci` on every deploy.
- **Shipped pages** — CSP (`object-src 'none'`, `base-uri 'self'`,
  `frame-ancestors 'none'`, `form-action 'self'`), `nosniff`, and
  `strict-origin-when-cross-origin` are stamped into every HTML file by
  `scripts/inject-security-headers.mjs`.
- **Secrets hygiene** — no `.env`, keys, or credentials are committed; GitHub
  secret scanning and Dependabot are enabled.
- **Branch protection** — `main` rejects force-pushes and deletion.

## Scope

This policy covers the `cnc-team` repository. The related private repositories
(`beup-app`) are outside this policy.