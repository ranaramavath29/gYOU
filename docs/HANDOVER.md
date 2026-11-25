# gYOU Digital website — launch handover (Phase 11)

Everything needed to take the site live on Vercel at gyoudigital.com and keep its content up to date.

---

## 1. Launch blockers (must be done first)

| # | Item | Where | Why |
|---|---|---|---|
| 1 | Legal review of the Privacy Policy and Terms and Conditions (drafted 25 Nov 2026 at gYOU's request; cookies are covered in the Privacy Policy, no separate Cookie Policy) | `content/legal/*.mdx`, then update `lastUpdated` in `content/legal.ts` | The drafts follow India's Digital Personal Data Protection Act, 2023 and describe the site's real forms and consent-gated GTM; an adviser should confirm them, including the legal entity name and grievance contact. |
| 2 | Lead endpoint | `NEXT_PUBLIC_LEAD_ENDPOINT` env var | Without it, forms show success but **send nothing**. |
| 3 | GTM container (optional but recommended) | `NEXT_PUBLIC_GTM_ID` env var | Enables GA4, Meta Pixel and Google Ads via GTM, plus the cookie banner. |
| 4 | Review working copy | see section 7 | Default copy and settings chosen while business answers were pending. |

Check at any time:

```powershell
node scripts/check-placeholders.mjs --strict
```

---

## 2. Environment variables

Set in Vercel → Project → Settings → Environment Variables. See `.env.example`.

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://gyoudigital.com` | preview URL or `https://gyoudigital.com` | Canonical URLs, OG, JSON-LD, sitemap |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | your form endpoint | same or a test endpoint | Receives a JSON POST: `{ form, fields, page }` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | empty (recommended) | Empty = no tags and no cookie banner |
| `NEXT_PUBLIC_SITE_ENV` | leave empty on Vercel | leave empty | Only needed on non-Vercel hosts to mark production. On Vercel, `VERCEL_ENV=production` is set automatically. |

**Form endpoint options.** Formspree, Basin, HubSpot Forms (via its submit API), a Google Apps Script web app that appends to a Sheet, or your own API. The endpoint must accept a cross-origin JSON POST from gyoudigital.com and return 2xx on success. Email notifications are configured in that service. Form names sent: `enquiry` (3-step contact form), `consultation` (email field in closing sections; `fields.source` says which page), `audit` (website + email).

---

## 3. Vercel and domain setup

1. Install Git and push this folder to a private GitHub repository (Phases 1–11 are not yet committed because Git was not installed during the build):

   ```powershell
   winget install --id Git.Git -e
   ```

2. Vercel → Add New Project → import the repository. Framework: Next.js (auto-detected). Build command `npm run build`, install `npm install`. Node 20.9+ (Vercel default is fine).
3. Add the environment variables above.
4. Deploy. Preview deployments are automatically `noindex`.
5. Domains → add `gyoudigital.com` and `www.gyoudigital.com`. Set `gyoudigital.com` as primary and redirect `www` → `gyoudigital.com` (Vercel offers this in the domain settings).
6. At your DNS provider, add the records Vercel shows (typically an `A` record for the apex and a `CNAME` for `www`). HTTPS certificates are issued automatically.
7. After DNS resolves, confirm: `https://gyoudigital.com/robots.txt` shows `Allow: /` and a sitemap line; view-source on the homepage shows `<meta name="robots" content="index, follow">`.

---

## 4. Analytics (GTM) setup

The site pushes these `dataLayer` events (see `lib/track.ts`). GTM only loads after the visitor clicks **Accept**, and Google Consent Mode v2 is set to denied by default and updated to granted on Accept.

| Event | When | Parameters |
|---|---|---|
| `cta_click` | Click on any link to `/contact` (primary CTA, nav CTA) | `label`, `location` |
| `whatsapp_click` / `phone_click` / `email_click` | Click on `wa.me` / `tel:` / `mailto:` links | `location` |
| `form_start` | First focus inside a form | `form` |
| `form_step` | Enquiry form moves to the next step | `form`, `step`, `step_name` |
| `form_submit_success` | **Only** on `/thank-you` after a confirmed submission (not on button click, not on reload) | `form` |
| `consultation_request` | With `form_submit_success` for `enquiry` and `consultation` | `form` |
| `service_page_view` | Service page load | `service` |
| `case_study_view` | Case study page load | `case_study` |

In GTM:

1. **GA4 Configuration tag** (Google tag) with your Measurement ID, trigger: All Pages.
2. **GA4 Event tags** for the events above (Custom Event triggers, pass parameters as event parameters). Mark `form_submit_success` as a key event (conversion) in GA4.
3. **Google Ads Conversion tag** (conversion ID + label) on `form_submit_success`.
4. **Meta Pixel** via a template (e.g. "Facebook Pixel" community template): PageView on All Pages, `Lead` on `form_submit_success`.
5. Use GTM **Preview** mode to verify each tag fires only after Accept.

**Search Console:** add a Domain property for `gyoudigital.com` and verify with the DNS TXT record (recommended; covers http/https and www). Then submit `https://gyoudigital.com/sitemap.xml`. Also create/claim the Google Business Profile for the Madhapur office and add its URL to the site (see section 7).

---

## 5. Editing content (no developer needed for most changes)

All content lives in `/content`. Components never contain business data.

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, address, socials, footer line | `content/site.ts` |
| Navigation, nav CTA, show Our Work / Insights in the menu | `content/navigation.ts` (`showOurWorkInNav`, `showInsightsInNav`) |
| Homepage copy, stats, client logos, testimonial | `content/home.ts` (empty lists stay hidden until filled) |
| A service page (copy, deliverables, FAQs, audit form) | `content/services/<service>.ts` |
| Services order / names / SEO titles | `content/services/index.ts` |
| Industries | `content/industries.ts` |
| About page, team (only people who consent) | `content/about.ts` |
| Form options (budget bands), consent text, WhatsApp messages | `content/forms.ts` |
| Cookie banner text | `content/consent.ts` |

**Add a case study:** copy `content/case-studies/example-case-study.mdx` to a new file (the file name becomes the URL), fill every field with real, approved information, add images to `public/case-studies/`, set `draft: false` and `permissionConfirmed: true`. Results need a `period` and `measuredBy` or the build fails. Then set `showOurWorkInNav = true`. It appears on `/our-work`, the homepage and matching service pages automatically.

**Add an Insights post:** copy `content/insights/example-post.mdx`, write the article, set a category from `content/insights.ts`, set `draft: false`. Then set `showInsightsInNav = true`. Reading time, related posts, share links, sitemap and Article schema are automatic.

**Add a service FAQ:** add `{ question, answer }` to the `faqs` list in the service file. FAQ schema updates automatically.

Preview drafts locally with `npm run dev` (drafts show in development only).

---

## 6. First 30 days after launch

- Day 1: submit one real enquiry, consultation and audit request; confirm they arrive and notifications are sent. Check GA4 Realtime and GTM Preview for `form_submit_success`.
- Day 1: confirm `robots.txt`, `sitemap.xml`, and that the homepage is indexable. Submit the sitemap in Search Console.
- Week 1: run PageSpeed Insights (mobile) on Home, one service page and Contact; fix anything below target.
- Week 1: share a page on LinkedIn/WhatsApp to check the preview card.
- Week 2: review Search Console coverage (no unexpected noindex/404s).
- Weeks 2–4: publish the first case study and first Insights posts; switch on their nav links.
- Week 4: review GA4: top pages, CTA clicks, form starts vs. successes; adjust copy or forms where people drop off.
- Ongoing: monitor broken links (`node scripts/check-links.mjs https://gyoudigital.com`) monthly.

---

## 7. Defaults set without business answers (review these)

These were chosen when gYOU asked to proceed without waiting for each PAUSE. None of them invents a business fact, but several are commitments or choices only gYOU can confirm.

- **Copy:** hero headline (brief), section intros, service challenges/approaches, all 26 service FAQ answers, About values, industry descriptions, footer line, form and thank-you messages. Marked "working copy" / "draft" in the files.
- **Commitments in copy:** "you approve the ad budget before any campaign goes live", "we agree response guidelines" (social), "we share a proposal after a free consultation", "transparent communication". Confirm each matches how the team works.
- **Engagement models:** monthly retainer, project fee, campaign management; no prices shown.
- **Budget bands (₹):** under 50k, 50k–1L, 1L–3L, 3L–5L, above 5L, not sure.
- **Consent text** on the enquiry form: needs legal review.
- **WhatsApp messages:** default, per-service and contact-page wording in `content/forms.ts`.
- **No response-time promise** is made anywhere.
- **SEO titles** use "… in Hyderabad" from the brief's keyword ideas; validate search volumes.
- **Hidden until content exists:** client logos, stats beyond "6 services / Hyderabad", case studies, testimonials, team, Insights.
- **Not yet supplied:** Google Business Profile URL (add to `content/site.ts` socials so it appears in `sameAs`), discovery-call booking link (`bookingUrl` in `content/contact.ts`), Instagram/LinkedIn if they exist.
- **Email:** consider a domain address (e.g. hello@gyoudigital.com) instead of Gmail for credibility.

---

## 8. Hosting confirmation still needed (PAUSE 11)

- Vercel account access (who owns the project and billing)
- DNS provider for gyoudigital.com and who can edit records
- Go-live date
