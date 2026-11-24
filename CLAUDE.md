# gYOU website — working rules

Production site for gYOU (rozento.in), a digital marketing and growth agency.
Binding spec: `docs/BUILD_PROMPT.md`. Strategy: `docs/brief.pdf`. Visual reference: `docs/homepage-mockup.png`.
Read BUILD_PROMPT.md before starting any phase. These rules condense it; the spec wins if they differ.

## Phases and PAUSE points

- Work one phase at a time (Phase 0–11 in BUILD_PROMPT.md). Never start the next phase uninvited.
- Every phase ends with `⏸ PAUSE`. Ask all of that PAUSE's questions in ONE message, then stop and wait.
- Never guess, continue past a PAUSE, or fill gaps with "realistic" sample data.
- End of every phase: run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check:placeholders`;
  fix your own errors; report results, files changed and the URL to view; commit with a clear message.
- Status (21 Nov 2026): all phases 0–11 built. gYOU asked to finish 7–11 without PAUSE stops; defaults
  chosen then are listed in `docs/HANDOVER.md` §7. Launch blockers: legal text, lead endpoint (HANDOVER §1).
  Ongoing work = content updates; still never invent facts. QA: `docs/QA-REPORT.md`.

## Never invent facts

- No made-up clients, logos, stats, testimonials, awards, prices, addresses, phone numbers, team members,
  certifications, response-time promises or results.
- Every missing value lives in `/content` as `ph("Short description")` (from `lib/ph.ts`), which renders
  `[PLACEHOLDER: ...]` with a dashed outline in development (`PlaceholderText`, `data-placeholder`).
- Mockup text in square brackets ([Client], [Showreel], [Name], +91 XXXXX) is placeholder content. Never turn
  it into real-looking data.
- `npm run check:placeholders` lists them; the `prebuild` guard fails production builds if any remain.
- Legal copy is supplied by gYOU's adviser; never ship generated legal text as final.

## Content separate from components

- All copy, services, case studies, FAQs, testimonials, nav and contact details live in typed files under
  `/content` (MDX for posts and case-study long-form). Components never hard-code business data.
- Exception: the `/styleguide` route may use obvious demo labels to show components.

## Original work only

- SwiperClick, 8Views and Digital Mojo are structural inspiration only. Never copy their copy, branding,
  pricing models, lead guarantees or design assets. No pay-per-lead or guarantee model.

## Conflicts and scope

- If the spec, brief and mockup conflict, or something conflicts with good practice, flag it and suggest a fix.
  Do not silently change scope or pick a winner. List open conflicts at the relevant PAUSE.

## Design source of truth

- Visuals: the "Studio Daylight" design system in BUILD_PROMPT.md (tokens in `app/globals.css`); the mockup is layout reference only.
- Copy, nav labels, routes, CTAs: BUILD_PROMPT.md and the brief. Build with the spec's wording.
- Known differences to raise (not decide): hero headline (mockup "We make brands impossible to scroll past." vs
  brief "Your Growth Deserves More Than Just Marketing."); nav (mockup 5 items vs spec 7); nav CTA (mockup
  "Let's talk" vs spec "Let's Discuss Your Project"); hero secondary CTA (brief "Explore Our Services" vs spec
  "Explore Our Work").
- Accent: cobalt blue `#1F5FD1` with white text (hover `#1A4FB0`; `sky` `#C5D4EF` ice blue, with a silver-to-steel gradient on accent words on ink for accent words on ink). Changed from tomato `#C8412C` at gYOU's request, 24 Nov 2026. Logo: `public/brand/gyou-logo.svg` (vector; PNG copy for the OG image) (gYOU artwork recoloured charcoal + tomato for the cream site, approved Nov 2026); favicon `app/icon.png` is the logo's "g" and arrow.
- Accessibility: 4.5:1 contrast (3:1 for 24px+), 44px targets, visible focus, all motion off under
  `prefers-reduced-motion`.

## Stack (already set up — build on it, don't redo)

Next.js 16 App Router, TypeScript strict + noUncheckedIndexedAccess, Tailwind v4 (@tailwindcss/postcss, tokens
via `@theme`), `motion` (import from `motion/react`), @next/mdx, react-hook-form + zod, ESLint 9 flat config,
Prettier + Tailwind plugin, Playwright (desktop + mobile). Root metadata stays `noindex` until Phase 8.
Check official docs / web search for version-specific Next 16, Tailwind v4 or Motion behaviour; don't trust memory.

## Environment

- Windows, PowerShell, npm. Use cross-platform Node scripts only.
- No `rm -rf`, no `cp`, no inline `VAR=value` in npm scripts.
