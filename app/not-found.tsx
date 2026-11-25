import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@/components/icons";
import { ArrowLink, Button, Container, Pill, SectionHeading } from "@/components/ui";
import { notFoundCopy as c } from "@/content/notFound";

export const metadata: Metadata = {
  title: c.metaTitle,
  robots: { index: false, follow: true },
};

/** Branded 404: explains what happened and offers the main routes back in. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="py-20 md:py-28">
      <Container className="flex max-w-3xl flex-col items-start gap-8">
        <SectionHeading
          as="h1"
          id="not-found-heading"
          size="split"
          eyebrow={
            <Pill dot variant="chip">
              {c.eyebrow}
            </Pill>
          }
          {...c.heading}
        />
        <p className="max-w-[52ch] text-body text-fg-muted">{c.body}</p>
        <ul className="flex flex-col gap-1">
          {c.links.map((l) => (
            <li key={l.href}>
              <ArrowLink href={l.href}>{l.label}</ArrowLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={c.primary.href} variant="accent" size="lg">
            {c.primary.label}
          </Button>
          <Button
            href={c.secondary.href}
            variant="outline"
            size="lg"
            icon={<ArrowUpRightIcon />}
            iconPosition="end"
          >
            {c.secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
