# Rozento Website — Frontend Build Prompt

Paste everything below into your coding agent (Claude Code recommended). It builds the site phase by phase and stops at every point where real business data is needed.

---

## ROLE

You are a senior frontend engineer building the production website for **Rozento**, a digital marketing and growth agency (rozento.in). You write clean, typed, accessible code and you never invent business facts.

## WORKING RULES (follow for the whole project)

1. **Work in phases.** Complete one phase, show me what you built (files changed, how to view it), then stop.
2. **PAUSE points are mandatory.** When a phase ends with `⏸ PAUSE`, ask me the listed questions in one clear message and wait. Do not continue, guess or fill in "realistic" sample data.
3. **Never invent facts.** No made-up client names, logos, stats, testimonials, awards, prices, addresses, phone numbers or team members. Until I supply real data, use the placeholder system below.
4. **Placeholder system.** Every missing value lives in `/content` and is wrapped as `ph("Short description")`, which returns a string like `[PLACEHOLDER: Client logo]`. In development, placeholders render with a dashed outline so they are easy to spot. Add `npm run check:placeholders`, which lists every remaining placeholder with file and line. `npm run build` must fail when `NODE_ENV=production` and any placeholder remains.
5. **Content stays separate from components.** All copy, services, case studies, FAQs, testimonials and contact details live in typed files under `/content`. Components never hard-code business data.
6. **Original work only.** The brief references SwiperClick, 8Views and Digital Mojo for structure and inspiration. Do not copy their copy, branding, pricing models, guarantees or design assets.
7. If something in this prompt conflicts with good practice or is unclear, say so and suggest a fix rather than silently changing scope.

## TECH STACK (frontend only, no custom backend)

- Next.js, current stable release, App Router, TypeScript in `strict` mode
- Tailwind CSS v4 with design tokens as CSS variables
- `next/font/google` for Playfair Display and Manrope
- `motion` (Framer Motion) for animation; every animation respects `prefers-reduced-motion`
- MDX for Insights (blog) posts and case-study long-form content
- `react-hook-form` + `zod` for forms
- ESLint + Prettier; Playwright for smoke tests
- Deploy target: Vercel (confirm at Phase 11)

Forms submit through a single adapter (`lib/submitLead.ts`) that posts to `NEXT_PUBLIC_LEAD_ENDPOINT`. While that is unset, the adapter runs in mock mode: it logs the payload in development and shows the real success state. No secrets in client code.

## DESIGN SYSTEM — "Editorial Luxe" (warm ivory)

**Type**
- Display / headings: Playfair Display, weight 600, letter-spacing -0.03em (hero -0.035em), line-height 0.9–0.95 on large sizes
- Accent words inside headings: Playfair Display italic 400, coloured with the accent
- Body, nav, buttons, forms: Manrope 400/500/600
- Scale (desktop → mobile): hero 132px → 52px, section H2 72px → 40px, card titles 24–40px, body 17–20px, small 13–15px. Use `clamp()`.

**Colour tokens**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F2F0EA` | Warm ivory page background |
| `--bg-raised` | `#FFFFFF` | Cards and raised surfaces |
| `--bg-raised-2` | `#FFFFFF` | Inputs and active navigation |
| `--fg` | `#0C0C0B` | Primary text |
| `--fg-muted` | `#55534F` | Body copy |
| `--fg-subtle` | `#6D6B65` | Labels, captions |
| `--line` | `#E2E0DA` | Borders, dividers |
| `--line-strong` | `#88867F` | Accessible outlines |
| `--accent` | `#D6FF5C` | CTA fills, decorative highlights, marquee band (text on it is `--ink`) |
| `--paper` | `#F2F0EA` | Warm ivory surface |
| `--ink` | `#0C0C0B` | Primary dark text and contrast cards |
| `--ink-muted` | `#45443E` | Secondary text on warm surfaces |
| `--danger` | `#B42318` | Error messages |

Check every text/background pair for 4.5:1 contrast (3:1 for 24px+).

**Shape and spacing**
- Buttons and nav: fully rounded pills (`999px`), min height 44px
- Cards and media: radius 22–28px; light section top corners 40px
- Container max-width 1320px, side padding 32px (20px on mobile)
- Section vertical padding 120–140px desktop, 72–88px mobile

**Signature elements**
- Floating nav pill with an active-state background
- Hero: oversized serif headline with one italic accent word, supporting line, two CTAs (solid light pill + outline pill with a play icon)
- Three gently floating, slightly rotated media tiles under the hero (showreel in the centre)
- Tilted accent-colour marquee band listing the four services
- Large numbered service rows with a circular arrow button
- Staggered "Selected work" grid with a slow image zoom on hover
- White cards on warm ivory, with an occasional dark contrast card; italic serif numerals and headings
- Closing section: very large "Ready for your *next move?*" with a single pill email field and soft accent glow

**Motion**: one reveal per section (fade + 16px rise), marquee 30s linear, tile float 7s ease-in-out. Nothing that blocks reading. All disabled under reduced motion.

## SITEMAP AND ROUTES

```
/                                   Home
/about-us
/services                           Overview
/services/social-media-marketing
/services/seo-content-marketing
/services/performance-marketing
/services/website-design-development
/our-work                           Portfolio grid with filters
/case-studies/[slug]                Case study detail
/industries                         (+ /industries/[slug] if content supports it)
/insights                           Blog index
/insights/[slug]                    Blog post (MDX)
/contact
/thank-you                          Confirmed submission page (used for conversion tracking)
/privacy-policy  /terms-and-conditions  /cookie-policy
```

Primary nav: Home · About Us · Services · Our Work · Industries · Insights · Contact Us. Nav CTA: "Let’s Discuss Your Project". Primary CTA site-wide: "Get a Free Marketing Consultation". Secondary: "Explore Our Work".

---

## PHASE 0 — Setup

Create the project, install the stack, set up strict TypeScript, linting, the folder structure (`app/`, `components/`, `content/`, `lib/`, `public/`, `tests/`), the `ph()` helper and the placeholder check script. Add a `README.md` with run commands.

### ⏸ PAUSE 0 — ask me:
1. Package manager preference (npm, pnpm or yarn)?
2. Node version on my machine?
3. Do I have the Rozento logo (SVG preferred), favicon and any brand colour that must override the accent `#D6FF5C`?

---

## PHASE 1 — Design system and UI kit

Build tokens, fonts, and reusable components: `Button` (solid, outline, accent), `Container`, `Section`, `SectionHeading` (supports an italic accent word), `Pill`, `Card`, `MediaFrame` (image/video with placeholder state), `Marquee`, `Reveal` (motion wrapper), `ArrowLink`, form fields (`TextField`, `SelectField`, `ChipGroup`, `Textarea`) with labels and error states. Create a `/styleguide` route (excluded from sitemap and `noindex`) showing every component.

### ⏸ PAUSE 1 — ask me to review `/styleguide` and confirm the type, colours and buttons before building pages.

---

## PHASE 2 — Global layout

Header (floating pill nav, sticky, collapses to an accessible full-screen menu on mobile with focus trap and Esc to close), footer (logo, short intro, quick links, service links, contact block, social links, legal links, copyright), floating WhatsApp button, skip-to-content link.

### ⏸ PAUSE 2 — ask me for:
1. Official business phone number and WhatsApp number (with country code)
2. Business email for enquiries
3. Office address (or confirm no address is shown)
4. Social profile URLs (Instagram, LinkedIn, Facebook, YouTube, X — only the ones that exist)
5. One-line company description for the footer
6. Is Hyderabad the primary target market?

---

## PHASE 3 — Homepage

Build all sections in this order, with content from `/content/home.ts`:

1. Hero
2. Floating work tiles / showreel
3. Services marquee band
4. Agency introduction ("More Than Marketing. A Partner in Your Growth.")
5. Client credibility (logo strip)
6. Business challenges → matching service (six challenge cards from the brief)
7. Services list (six numbered rows linking to service pages)
8. Process (Discover, Strategise, Execute, Optimise) on the paper section
9. Selected work (three case-study cards)
10. Industries we serve
11. Why choose Rozento
12. Testimonial(s)
13. Latest insights (three posts)
14. Final CTA with email capture + WhatsApp

Build with placeholders first so I can review layout.

### ⏸ PAUSE 3 — ask me for:
1. Final hero headline and supporting line (or approve the brief’s: “Your Growth Deserves More Than Just Marketing.”)
2. Verified agency facts: years in business, projects completed, industries served, team size — only what I can prove
3. Client logos I have written permission to show (files + company names)
4. Showreel video file or link, plus three still images for the floating tiles
5. Certifications or partner badges actually held (Google Partner, Meta Business Partner, etc.)
6. Confirm the industries list: Real Estate, Healthcare & Wellness, Education, Fintech & Financial Services, E-commerce & Retail, Technology & SaaS, Hospitality & Lifestyle
7. "Why choose Rozento" points I want to keep, cut or add

---

## PHASE 4 — Service pages

One reusable template driven by `/content/services/*.ts`, used for all six routes. Sections: service hero, introduction, business challenges, solutions, deliverables grid, process, related case studies, FAQs (accessible accordion), final enquiry CTA. Plus a `/services` overview page.

Start with **Performance Marketing** as the reference page, then the other five.

### ⏸ PAUSE 4 — for each service, ask me for:
1. Deliverables list (approve or edit the brief’s list)
2. Any service I do not want to offer at launch
3. 4–6 real FAQs with my answers
4. Engagement model and whether to show pricing: retainer, project fee, campaign fee or custom quote (never copy a pay-per-lead or guarantee model)
5. Which case studies to link

---

## PHASE 5 — Our Work and case studies

`/our-work` grid with industry and service filters (URL-synced, keyboard accessible). `/case-studies/[slug]` detail template: client, industry, objective, challenge, strategy, services delivered, creative gallery, results, testimonial, next-project link. Content in MDX with typed frontmatter.

### ⏸ PAUSE 5 — ask me for, per case study:
1. Client name and confirmation I have permission to publish
2. Industry, objective, challenge, strategy, services
3. Results with numbers, the time period and how they were measured (if a number can’t be verified, it is left out)
4. Images/videos I can use
5. Should any case study be anonymised ("A Hyderabad real-estate developer")?

---

## PHASE 6 — About, Industries, Insights, Contact, Legal

- **About Us**: story, approach, values, team (optional), CTA
- **Industries**: overview + per-industry blocks (or pages if content allows)
- **Insights**: index with categories, MDX posts, reading time, author, related posts, share links
- **Contact**: full enquiry form, WhatsApp, click-to-call, email, optional map, optional booking link
- **Legal**: privacy, terms, cookies pages rendering MDX

### ⏸ PAUSE 6 — ask me for:
1. About page story, founding year, founder/team names, photos and roles (only those who agree to be shown)
2. Any industry pages I want at launch vs later
3. At least three blog posts (or approve publishing Insights later and hiding the homepage section until then)
4. Discovery-call booking link (Calendly, Cal.com, etc.) or skip
5. Legal text reviewed by my legal adviser — I will provide it; do not generate legal copy as final

---

## PHASE 7 — Forms and conversion

- **Main enquiry form** (Contact page + homepage CTA): three steps with a progress bar
  1. What do you need? (service chips, multi-select)
  2. About your business: company, website (optional), industry, monthly budget band, project details
  3. Contact: full name, business email, phone/WhatsApp, consent checkbox
- **Quick forms**: free consultation, website/marketing audit request (email + URL)
- Validation with `zod`, inline errors, disabled submit while sending, honeypot field, keyboard and screen-reader friendly
- On confirmed success, redirect to `/thank-you?form=<name>`
- WhatsApp links with a pre-filled message per page; `tel:` and `mailto:` links

### ⏸ PAUSE 7 — ask me for:
1. Where submissions should go: CRM (which one), form service (Formspree, Basin, HubSpot forms, etc.), Google Sheet via webhook, or my own API URL later
2. Monthly budget bands to show (in ₹)
3. Who receives email notifications (handled by the chosen service)
4. Pre-filled WhatsApp message text
5. Response-time promise I am comfortable stating publicly (or none)

---

## PHASE 8 — SEO

- `generateMetadata` on every route: unique title and description, canonical URL, Open Graph and Twitter cards
- Dynamic OG images with `next/og` in the warm ivory, ink and lime palette
- `app/sitemap.ts` and `app/robots.ts`; non-production deployments are `noindex`
- JSON-LD: `Organization`, `LocalBusiness` (only with a real address), `Service`, `BreadcrumbList`, `Article`, `FAQPage` (only where FAQs are visible on the page)
- One H1 per page, logical H2/H3 order, descriptive alt text, internal links between services, case studies and posts
- `next/image` everywhere, correct `sizes`, AVIF/WebP
- 301 redirect map in `next.config` (empty until needed)

### ⏸ PAUSE 8 — ask me for:
1. Final keyword targets per page (the brief lists starting ideas; I will validate search volumes)
2. Google Business Profile URL
3. Preferred site name format in titles (e.g. "Performance Marketing Agency in Hyderabad | Rozento")

---

## PHASE 9 — Analytics and consent

- Google Tag Manager as the single loader; GA4, Meta Pixel and Google Ads tags configured through GTM
- Cookie consent banner with Google Consent Mode v2; no marketing tags fire before consent
- `lib/track.ts` pushes typed `dataLayer` events:
  `cta_click`, `whatsapp_click`, `phone_click`, `email_click`, `form_start`, `form_step`, `form_submit_success` (fires only on the `/thank-you` page or confirmed success, never on button click), `consultation_request`, `service_page_view`, `case_study_view`
- All IDs from environment variables

### ⏸ PAUSE 9 — ask me for:
1. GTM container ID, GA4 measurement ID, Meta Pixel ID, Google Ads conversion ID/label
2. Whether to show a full cookie-preferences panel or a simple accept/reject banner

---

## PHASE 10 — Quality assurance

Run and report:

- `npm run check:placeholders` — must be empty
- Type check, lint, production build
- Playwright smoke tests: every route returns 200, nav works on desktop and mobile, forms validate and reach the success state in mock mode, no console errors
- Lighthouse on Home, one service page, one case study and Contact (mobile): target Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- Broken-link check, image weights, reduced-motion check, keyboard-only walkthrough
- Responsive check at 360, 768, 1024, 1440px

Fix what fails, then give me a short QA report.

### ⏸ PAUSE 10 — show me the QA report and list anything that needs my decision.

---

## PHASE 11 — Launch handover

- Production environment variables list
- Vercel project setup steps, custom domain `rozento.in` with `www` redirect, HTTPS
- Search Console verification method
- How to add a blog post, case study or service FAQ by editing `/content`
- Post-launch checklist for the first 30 days

### ⏸ PAUSE 11 — ask me to confirm hosting account access, DNS provider, and the go-live date.

---

Start with **Phase 0** now.
