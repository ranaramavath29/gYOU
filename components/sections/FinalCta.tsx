import { Container, Reveal, SectionHeading } from "@/components/ui";
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
};

/** Closing CTA with email capture, WhatsApp, email and phone. */
export function FinalCta({
  heading = finalCta.heading,
  supporting = finalCta.supporting,
  form,
  page,
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

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-[clamp(5rem,3rem+7vw,10rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[520px] w-[min(1000px,140%)] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
      />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-10 text-center">
          <SectionHeading
            id="cta-heading"
            size="hero"
            align="center"
            {...heading}
            description={supporting}
            headingClassName="max-w-[16ch]"
          />
          <EmailCapture form={form} page={page} />
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-small text-fg-muted">
              {links.map((link, i) => (
                <li key={link.label} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden>·</span> : null}
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-9 items-center underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {combined ? (
              <>
                <span aria-hidden className="hidden h-5 w-px bg-line-strong sm:block" />
                <PhoneWhatsApp
                  inline
                  className="justify-center text-small"
                  location="closing-cta"
                />
              </>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
