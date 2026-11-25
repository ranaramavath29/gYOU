# gYOU Digital website — QA report (Phase 10)

Date: 21 November 2026 · Build: Next.js 16.4.6 production build, served locally on port 3100.

## Summary

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass (0 errors, 0 warnings) |
| `npm run format:check` | Pass |
| `npm run build` | Pass (24 routes) |
| `npm run check:placeholders` | **3 remaining: the three legal documents.** Production builds are blocked until they are replaced (intended). |
| Playwright smoke tests (desktop + mobile, 50 tests) | **50 / 50 pass** |
| Broken-link check (`scripts/check-links.mjs`) | Pass: no broken internal links |
| Responsive (360, 768, 1024, 1440 px × 10 key pages) | Pass: no horizontal scroll |
| Lighthouse | **Not run** (see below) |

## What the smoke tests cover

- Every route returns 200 with exactly one `<h1>` and no console errors (17 routes).
- Unknown service, draft case study and draft post return 404.
- `robots.txt` and `sitemap.xml` respond.
- Navigation: desktop pill nav; mobile full-screen menu opens, closes with Esc, and navigates.
- Enquiry form: each step validates, step heading receives focus, consent is required, mock submission reaches `/thank-you?form=enquiry`, and `form_submit_success` is pushed to the dataLayer.
- Visiting `/thank-you` directly does **not** fire `form_submit_success`.
- Consultation (email) form and audit request form validate and reach the thank-you page.

## Manual checks performed

- **Keyboard:** mobile menu focus trap (Tab cycles inside, Esc closes, focus returns to the menu button); FAQ accordion opens with Space; filter buttons expose `aria-pressed`; form errors linked via `aria-describedby`.
- **SEO output:** unique titles and descriptions, canonical URLs, Open Graph and Twitter cards on every page; dynamic OG image renders (1200×630 PNG); JSON-LD parses (Organization, ProfessionalService/LocalBusiness, Service, FAQPage, BreadcrumbList, Article).
- **Indexing:** non-production builds are `noindex` with `Disallow: /`. A production-mode build (`NEXT_PUBLIC_SITE_ENV=production`) is indexable, lists 14 URLs in the sitemap, and keeps `/our-work`, `/insights` (while empty), `/thank-you` and `/styleguide` noindex.
- **Consent:** with a test GTM ID, the banner shows, GTM does not load before consent, Reject stores the choice and keeps tags off, "Cookie settings" reopens the banner, Accept updates Consent Mode to granted and only then loads GTM.
- **Reduced motion:** all CSS animations/transitions are disabled by a global `prefers-reduced-motion` rule; Reveal uses zero-duration transitions.

## Fixed during QA

1. **Enquiry form click-through bug:** after a failed "Continue", the error message only cleared on blur, so the layout shifted as the visitor clicked and the click missed the button. Fields with an error now re-validate as they change.
2. `robots.txt` blocked `/og`, which would stop social platforms fetching share images. Removed.
3. Homepage share image repeated "| gYOU" next to the wordmark. Trimmed.
4. The placeholder guard now also treats `NEXT_PUBLIC_SITE_ENV=production` as production.

## Not done / needs a decision

- **Lighthouse not run.** It is not installed and installing it downloads a large package. Run it on the deployed preview instead: Chrome DevTools → Lighthouse (mobile) on Home, one service page, Contact; or https://pagespeed.web.dev once the site is public. Targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 (SEO will read lower on a noindex preview; that is expected).
- **Image weights:** the site currently ships no photographs (only CSS gradients and SVG). Re-check when real images are added; use `next/image` with proper `sizes` (already wired).
- **Real form delivery** is untested: `NEXT_PUBLIC_LEAD_ENDPOINT` is not set, so forms run in mock mode. Test one real submission per form after setting it.
- **GTM tags** (GA4, Meta Pixel, Google Ads) need to be configured and verified in GTM Preview mode once the container exists.
- Screen-reader testing with NVDA/VoiceOver was not performed; structure and ARIA were checked programmatically.

## How to re-run

```powershell
npm run build
npx next start -p 3100
```

In a second terminal:

```powershell
$env:PORT = "3100"; $env:PW_CHANNEL = "msedge"; npm run test:e2e
```

```powershell
node scripts/check-links.mjs http://localhost:3100
```
