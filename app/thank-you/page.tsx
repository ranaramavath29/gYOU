import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ThankYouMessage } from "@/components/forms/ThankYouMessage";
import { Button, Container, SectionHeading } from "@/components/ui";
import { thankYouCopy as copy } from "@/content/forms";

// Conversion page: never indexed, never in the sitemap.
export const metadata: Metadata = {
  title: copy.metaTitle,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section
      aria-labelledby="thanks-title"
      className="relative overflow-hidden py-[clamp(5rem,3rem+7vw,10rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[520px] w-[min(1000px,140%)] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
      />
      <Container className="relative flex flex-col gap-10">
        <SectionHeading as="h1" id="thanks-title" size="hero" {...copy.heading} />
        <Suspense fallback={<p className="max-w-[46ch] text-body text-fg-muted">{copy.default}</p>}>
          <ThankYouMessage />
        </Suspense>
        <div className="flex flex-col gap-4">
          <p className="text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
            {copy.next}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {copy.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button href="/" variant="outline">
            {copy.home}
          </Button>
        </div>
      </Container>
    </section>
  );
}
