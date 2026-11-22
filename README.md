# gYOU website

Production website for gYOU (rozento.in). Next.js App Router, TypeScript (strict), Tailwind CSS v4, Motion, MDX, react-hook-form + zod, Playwright.

## Requirements

Node.js 20.9 or newer (22 LTS recommended) and npm.

## First run

```bash
npm install
cp .env.example .env.local      # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Commands

| Command                      | What it does                                          |
| ---------------------------- | ----------------------------------------------------- |
| `npm run dev`                | Start the dev server                                  |
| `npm run build`              | Production build. Runs the placeholder guard first    |
| `npm run start`              | Serve the production build                            |
| `npm run typecheck`          | TypeScript check, no output files                     |
| `npm run lint`               | ESLint                                                |
| `npm run format`             | Format all files with Prettier                        |
| `npm run check:placeholders` | List every remaining placeholder with file and line   |
| `npm run test:e2e:install`   | One-time: download the Playwright browser             |
| `npm run test:e2e`           | Playwright smoke tests (starts the dev server itself) |
| `npm run check:links`        | Broken-link crawl of a running server (default :3000) |

Run the tests against a production build with an installed browser (no download):

```powershell
$env:PORT = "3100"; $env:PW_CHANNEL = "msedge"; npm run test:e2e
```

## Project documents

- `docs/BUILD_PROMPT.md`: the binding build specification
- `docs/brief.pdf`, `docs/homepage-mockup.png`: strategy brief and visual reference
- `docs/HANDOVER.md`: launch steps, environment variables, GTM setup, how to edit content, 30-day checklist
- `docs/QA-REPORT.md`: Phase 10 QA results and what still needs checking

## Placeholders

Business facts we do not have yet are written in `/content` as:

```ts
import { ph } from "@/lib/ph";
email: ph("Business enquiry email"),
```

This renders as `[PLACEHOLDER: Business enquiry email]`. In development, components that use `PlaceholderText` draw a dashed outline around it.

`npm run build` stops with an error when any placeholder remains and the build is a production build (`NODE_ENV=production` or `VERCEL_ENV=production`, which Vercel sets for production deployments). Preview deployments and plain local builds are allowed through so work in progress can still be reviewed.

To force the strict check anywhere, for example in CI:

```bash
node scripts/check-placeholders.mjs --strict
```

## Folder structure

```
app/          Routes (App Router)
components/   Reusable UI. No business data hard-coded here
content/      All copy, services, case studies, FAQs, contact details (typed)
lib/          Helpers (ph, form adapter, tracking)
public/       Static files: logo, favicon, images
scripts/      Project scripts (placeholder check)
tests/        Playwright tests
```

## Rules for content

Never add a client name, logo, number, testimonial, price or contact detail that gYOU has not confirmed in writing. Use `ph()` instead.
