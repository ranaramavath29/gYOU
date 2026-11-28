import { Button, Container, Reveal, SectionHeading } from "@/components/ui";
import { finalCta, type Heading } from "@/content/home";
import { site } from "@/content/site";
import { isSameNumber, mailHref, telHref, whatsappHref } from "@/lib/contact";
import { EmailCapture } from "./EmailCapture";
import { PhoneWhatsApp } from "./PhoneWhatsApp";

type FinalCtaProps = {
  /** Defaults to the homepage closing heading and copy. */
  heading?: Heading;
  supporting?: string;
  /** Lead form name and page path, sent with the submission. */
  form: string;
  page: string;
  /** "h2" where this is the page's only section (empty listing pages). */
  as?: "h2" | "h3";
};

/** Closing CTA with email capture, WhatsApp, email and phone. */
export function FinalCta({
  heading = finalCta.heading,
  supporting = finalCta.supporting,
  form,
  page,
  as,
}: FinalCtaProps) {
  type ContactLink = { label: string; href: string | undefined; external?: boolean };
  const combined = isSameNumber(site.phone, site.whatsapp);
  const candidates: ContactLink[] = [
    { label: site.email, href: mailHref(site.email) },
    // When phone and WhatsApp share one number, PhoneWhatsApp shows both actions instead.
    ...(combined
      ? []
      : [
          { label: finalCta.whatsappLabel, href: whatsappHref(site.whatsapp), external: true },
          { label: site.phone, href: telHref(site.phone) },
        ]),
  ];
  // Contact values that are still placeholders produce no href and are skipped.
  const links = candidates.filter((l): l is ContactLink & { href: string } => Boolean(l.href));

  // "Studio Daylight" closing band: dark rounded panel, heading left, actions right.
  return (
    <section aria-labelledby="cta-heading" className="py-[clamp(2.5rem,1.8rem+2vw,4rem)]">
      <Container>
        <Reveal className="tone-ink relative overflow-hidden rounded-[var(--radius-sheet)] bg-ink px-6 py-12 text-bg md:px-12 md:py-16 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[520px] rounded-full bg-accent/15 blur-[120px]"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <SectionHeading
              as={as}
              id="cta-heading"
              eyebrow={
                <span className="text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                  {finalCta.eyebrow}
                </span>
              }
              {...heading}
              description={supporting}
              headingClassName="max-w-[16ch]"
            />
            <div className="flex flex-col gap-6">
              <EmailCapture form={form} page={page} />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button href={finalCta.secondaryCta.href} variant="outline">
                  {finalCta.secondaryCta.label}
                </Button>
                <p className="text-small text-fg-subtle">{finalCta.supportingLine}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-fg-muted">
                  {links.map((link, i) => (
                    <li key={link.label} className="flex items-center gap-3">
                      {i > 0 ? <span aria-hidden>·</span> : null}
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-11 items-center underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {combined ? (
                  <>
                    <span aria-hidden className="hidden h-5 w-px bg-line-strong sm:block" />
                    <PhoneWhatsApp inline className="text-small" location="closing-cta" />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
