import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, PlayIcon } from "@/components/icons";
import {
  Accordion,
  ArrowCircle,
  ArrowLink,
  Button,
  Card,
  Container,
  Marquee,
  MediaFrame,
  Pill,
  Reveal,
  Section,
  SectionHeading,
  SelectField,
  Textarea,
  TextField,
} from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";
import { services } from "@/content/services";
import { ph } from "@/lib/ph";
import { colorTokens, contrastRatio, type ColorToken } from "@/lib/tokens";
import { FormDemo } from "./FormDemo";

/*
 * Internal design-system reference. Not linked from the site, noindex,
 * and must stay out of app/sitemap.ts (Phase 8).
 * Copy here is demo text only, never business content. Placeholders in
 * this folder are skipped by scripts/check-placeholders.mjs.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches: Array<{ token: ColorToken; use: string }> = [
  { token: "bg", use: "Warm page background" },
  { token: "bg-raised", use: "White cards" },
  { token: "bg-raised-2", use: "Inputs, nav pill active" },
  { token: "fg", use: "Primary text" },
  { token: "fg-muted", use: "Body copy" },
  { token: "fg-subtle", use: "Labels, captions" },
  { token: "line", use: "Borders, dividers" },
  { token: "line-strong", use: "Outline buttons" },
  { token: "accent", use: "Tomato: CTA fills, dots, active states" },
  { token: "on-accent", use: "Text and icons on tomato" },
  { token: "sage", use: "Secondary accent: tiles, work cards" },
  { token: "peach", use: "Accent words on ink cards" },
  { token: "paper", use: "Process section" },
  { token: "ink", use: "Text on paper" },
  { token: "ink-muted", use: "Body on paper" },
  { token: "danger", use: "Errors" },
  { token: "danger-on-paper", use: "Errors on paper (added)" },
];

const pairs: Array<{ fg: ColorToken; bg: ColorToken; large?: boolean }> = [
  { fg: "fg", bg: "bg" },
  { fg: "fg-muted", bg: "bg" },
  { fg: "fg-subtle", bg: "bg" },
  { fg: "fg-subtle", bg: "bg-raised-2" },
  { fg: "accent", bg: "bg" },
  { fg: "on-accent", bg: "accent" },
  { fg: "on-accent", bg: "sage" },
  { fg: "ink", bg: "peach" },
  { fg: "bg", bg: "fg" },
  { fg: "ink", bg: "paper" },
  { fg: "ink-muted", bg: "paper" },
  { fg: "danger", bg: "bg" },
  { fg: "danger", bg: "bg-raised-2" },
  { fg: "danger-on-paper", bg: "paper" },
  { fg: "line-strong", bg: "bg", large: true },
];

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="border-t border-line py-14 [.tone-paper_&]:border-ink/15">
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="text-small font-semibold tracking-[0.12em] uppercase">{title}</h2>
        {note ? (
          <p className="max-w-[70ch] text-small text-fg-subtle [.tone-paper_&]:text-ink-muted">
            {note}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div>
      <Container className="pt-12 pb-6">
        <Pill dot>Design system</Pill>
        <div className="mt-10">
          <SectionHeading
            as="h1"
            size="hero"
            lead="Editorial"
            accent="Luxe"
            trail="styleguide."
            description="Every token and component in the gYOU UI kit. Internal page: noindex, not in the sitemap. All copy below is demo text."
          />
        </div>
      </Container>

      <Container>
        <Block
          title="Wordmark"
          note="The supplied full gYOU Digital logo is used in the header and footer. The favicon uses the standalone brand mark."
        >
          <div className="flex items-center gap-10">
            <Wordmark />
            <Wordmark className="text-[2.5rem]" />
          </div>
        </Block>

        <Block title="Colour tokens">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map(({ token, use }) => (
              <li key={token} className="overflow-hidden rounded-2xl border border-line">
                <div className="h-20" style={{ background: colorTokens[token] }} />
                <div className="flex flex-col gap-0.5 p-3 text-small">
                  <code className="font-semibold text-fg">--{token}</code>
                  <span className="text-fg-subtle">{colorTokens[token]}</span>
                  <span className="text-fg-subtle">{use}</span>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          title="Contrast check"
          note="WCAG 2.x ratios. Text needs 4.5:1 (3:1 at 24px+). --line-strong is a non-text border and needs 3:1 only where it is the sole indicator."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-small">
              <thead className="text-fg-subtle">
                <tr>
                  <th className="py-2 pr-4 font-semibold">Sample</th>
                  <th className="py-2 pr-4 font-semibold">Text / background</th>
                  <th className="py-2 pr-4 font-semibold">Ratio</th>
                  <th className="py-2 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map(({ fg, bg, large }) => {
                  const ratio = contrastRatio(colorTokens[fg], colorTokens[bg]);
                  const pass =
                    ratio >= 4.5
                      ? "AA"
                      : ratio >= 3
                        ? large
                          ? "Non-text 3:1"
                          : "Large text only"
                        : "Fail";
                  return (
                    <tr key={`${fg}-${bg}`} className="border-t border-line">
                      <td className="py-2 pr-4">
                        <span
                          className="inline-block rounded-lg px-3 py-1 font-semibold"
                          style={{ color: colorTokens[fg], background: colorTokens[bg] }}
                        >
                          Aa
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        <code>--{fg}</code> on <code>--{bg}</code>
                      </td>
                      <td className="py-2 pr-4 tabular-nums">{ratio.toFixed(2)}:1</td>
                      <td className="py-2">{pass}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-small text-fg-subtle">
            Tomato on the warm paper is{" "}
            {contrastRatio(colorTokens.accent, colorTokens.paper).toFixed(2)}:1, so long text stays
            ink; tomato is for fills (with white text), dots and short links.
          </p>
        </Block>

        <Block
          title="Typography"
          note="Bricolage Grotesque 600 for headings, accent words plain (peach only on dark cards). Inter 400/500/600 for everything else. Sizes use clamp()."
        >
          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-2 text-small text-fg-subtle">Hero · 132 → 52px · -0.035em</p>
              <p className="font-display text-hero font-semibold">
                Headline with <em className="accent-word">accent</em> word
              </p>
            </div>
            <div>
              <p className="mb-2 text-small text-fg-subtle">Section H2 · 72 → 40px · -0.03em</p>
              <p className="font-display text-h2 font-semibold">
                Section <em className="accent-word">heading</em>
              </p>
            </div>
            <div>
              <p className="mb-2 text-small text-fg-subtle">Card title · 40 → 24px</p>
              <p className="font-display text-title font-semibold">
                Card title in Bricolage Grotesque
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-small text-fg-subtle">Body · 20 → 17px · --fg-muted</p>
                <p className="text-body text-fg-muted">
                  Body copy is set in Inter with a comfortable line height for long reading. It sits
                  in muted ink on the warm background.
                </p>
              </div>
              <div>
                <p className="mb-2 text-small text-fg-subtle">Small · 15 → 13px · --fg-subtle</p>
                <p className="text-small text-fg-subtle">
                  Captions, labels, metadata and tags use the small size.
                </p>
              </div>
            </div>
          </div>
        </Block>

        <Block
          title="Buttons"
          note="Pills, minimum 44px tall. Solid light, outline (with the play icon), accent. Rendered as links when given an href."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="solid">Solid button</Button>
              <Button variant="outline" icon={<PlayBadge />}>
                Outline with play
              </Button>
              <Button variant="accent" icon={<ArrowUpRightIcon />} iconPosition="end">
                Accent button
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="solid" size="lg">
                Large solid
              </Button>
              <Button variant="outline" size="lg" icon={<PlayBadge />}>
                Large outline
              </Button>
              <Button variant="accent" size="lg">
                Large accent
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/styleguide" variant="solid">
                Link as button
              </Button>
              <Button variant="solid" disabled>
                Disabled
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </Block>

        <Block title="Pills and links">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Pill dot>Eyebrow with dot</Pill>
              <Pill>Outline tag</Pill>
              <Pill variant="raised">Raised tag</Pill>
              <Pill variant="accent">Accent tag</Pill>
              <Pill dot variant="chip">
                Eyebrow chip
              </Pill>
            </div>
            <div className="flex flex-wrap items-center gap-10">
              <ArrowLink href="/styleguide">Arrow link</ArrowLink>
              <ArrowLink href="/styleguide" variant="text">
                Text link
              </ArrowLink>
            </div>
            <a
              href="#rows"
              className="group flex items-center justify-between gap-6 border-t border-b border-line py-6"
            >
              <span className="flex items-baseline gap-5">
                <span className="text-small text-fg-subtle tabular-nums">01</span>
                <span className="font-display text-title font-semibold">
                  Numbered row (hover me)
                </span>
              </span>
              <span className="flex items-center gap-6">
                <span className="hidden text-small text-fg-subtle md:inline">Tag · Tag · Tag</span>
                <ArrowCircle />
              </span>
            </a>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-display text-title font-semibold">Raised card</p>
              <p className="mt-3 text-small text-fg-muted">White card on the warm page.</p>
            </Card>
            <Card className="flex flex-col justify-between gap-10">
              <Pill>Category</Pill>
              <p className="font-display text-title font-semibold">
                Card with <em className="accent-word">accent</em>
              </p>
            </Card>
            <Card>
              <p className="text-small text-fg-subtle">Radius 24px · padding 24 → 32px</p>
            </Card>
          </div>
        </Block>

        <Block
          title="Media frames"
          note="Placeholder state until real media is supplied. Tiles float (7s) and tilt; work cards zoom slowly on hover."
        >
          <div className="grid grid-cols-3 items-center gap-4 py-8 md:gap-10">
            <MediaFrame placeholder={ph("Demo still image")} tint="olive" tilt={-5} float />
            <MediaFrame
              placeholder={ph("Demo showreel video")}
              tint="graphite"
              aspect="1/1"
              float
              className="[animation-delay:-2s]"
            />
            <MediaFrame
              placeholder={ph("Demo still image")}
              tint="rust"
              tilt={5}
              float
              className="[animation-delay:-4s]"
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="group">
              <MediaFrame
                placeholder={ph("Demo project visual")}
                tint="navy"
                aspect="16/9"
                zoomOnHover
              />
              <p className="mt-3 font-display text-xl font-semibold">Hover to zoom</p>
            </div>
            <div className="group">
              <MediaFrame
                placeholder={ph("Demo project visual")}
                tint="olive"
                aspect="16/9"
                zoomOnHover
              />
              <p className="mt-3 font-display text-xl font-semibold">Second frame</p>
            </div>
          </div>
        </Block>
      </Container>

      <Block title="Marquee">
        <Marquee items={services.map((s) => s.shortName)} label="Services" tilted />
        <Container>
          <p className="mt-4 text-small text-fg-subtle">
            30s linear loop, pauses on hover, static under reduced motion. Labels come from
            content/services.ts.
          </p>
        </Container>
      </Block>

      <Container>
        <Block
          title="Reveal"
          note="Fade + 16px rise once per section. Scroll this block into view. Instant under reduced motion."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 0.1, 0.2].map((delay) => (
              <Reveal key={delay} delay={delay}>
                <Card>
                  <p className="font-display text-title font-semibold">Reveal</p>
                  <p className="mt-2 text-small text-fg-muted">Delay {delay}s</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Block>
      </Container>

      <Section tone="paper" aria-labelledby="paper-demo">
        <SectionHeading
          id="paper-demo"
          lead="Paper section."
          accent="Accent turns ink"
          trail="here."
          description="Light background with 40px top corners, for the process and testimonial sections."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["One", "Two", "Three", "Four"].map((label, i) => (
            <Card
              as="li"
              key={label}
              tone={i === 3 ? "ink" : "paper"}
              className="flex min-h-56 flex-col justify-between"
            >
              <span className="font-display text-[3rem] leading-none text-[var(--heading-accent)] italic opacity-90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-semibold">Step {label.toLowerCase()}</span>
                <span
                  className={i === 3 ? "text-small text-fg-muted" : "text-small text-ink-muted"}
                >
                  Short demo description.
                </span>
              </span>
            </Card>
          ))}
        </ol>
        <blockquote className="mt-16 max-w-[24ch] font-display text-h2 italic">
          “Large italic serif quote style for testimonials.”
        </blockquote>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <ArrowLink href="/styleguide">Arrow link on paper</ArrowLink>
          <ArrowLink href="/styleguide" variant="text">
            Text link on paper
          </ArrowLink>
        </div>
      </Section>

      <Container>
        <Block
          title="FAQ accordion"
          note="Native details/summary: keyboard operable, works without JavaScript. Used on service pages once real FAQs are supplied."
        >
          <Accordion
            items={[
              {
                question: "Demo question one?",
                answer: "Demo answer text. Real questions and answers come from gYOU.",
              },
              {
                question: "Demo question two, a little longer to show wrapping?",
                answer: "Another demo answer.",
              },
            ]}
          />
        </Block>

        <Block
          title="Form fields — states"
          note="Labels always visible. Errors are linked with aria-describedby and marked aria-invalid."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Default" placeholder="Placeholder text" />
            <TextField label="With hint" hint="Helper text sits under the field." optional />
            <TextField
              label="Error"
              defaultValue="not-an-email"
              error="Enter a valid email address."
            />
            <TextField label="Disabled" disabled defaultValue="Disabled value" />
            <SelectField
              label="Select"
              placeholderOption="Choose one"
              options={[{ value: "x", label: "Choice" }]}
            />
            <TextField label="Pill shape" shape="pill" placeholder="Pill field (final CTA)" />
            <Textarea label="Textarea" wrapperClassName="md:col-span-2" placeholder="Longer text" />
          </div>
        </Block>

        <Block
          title="Form fields — live demo"
          note="react-hook-form + zod. Submit empty to see validation, including the chip group."
        >
          <FormDemo />
        </Block>
      </Container>

      <div className="h-24" />
    </div>
  );
}

function PlayBadge() {
  return (
    <span className="grid size-6 place-items-center rounded-full bg-accent text-on-accent">
      <PlayIcon size={11} />
    </span>
  );
}
