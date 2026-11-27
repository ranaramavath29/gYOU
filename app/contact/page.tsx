import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, ChatIcon } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button, Reveal, Section, SectionHeading } from "@/components/ui";
import { contactPage as copy, mapsHref } from "@/content/contact";
import { formCopy } from "@/content/forms";
import { uiLabels } from "@/content/navigation";
import { site } from "@/content/site";
import { PhoneWhatsApp } from "@/components/sections/PhoneWhatsApp";
import { whatsappMessages } from "@/content/forms";
import { cn } from "@/lib/cn";
import { isSameNumber, mailHref, telHref, whatsappHref } from "@/lib/contact";
import { isPlaceholder } from "@/lib/ph";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: copy.seoTitle,
  description: copy.metaDescription,
  path: "/contact",
});

type Method = {
  title: string;
  detail: ReactNode;
  action: string;
  href?: string;
  external?: boolean;
};

export default function ContactPage() {
  const address = site.address && !isPlaceholder(site.address) ? site.address : null;
  // Same number for calls and WhatsApp → one combined card with both actions.
  const combined = isSameNumber(site.phone, site.whatsapp);
  const methods: Method[] = [
    ...(combined
      ? []
      : [
          {
            title: copy.methods.whatsapp.title,
            detail: site.whatsapp,
            action: copy.methods.whatsapp.action,
            href: whatsappHref(site.whatsapp, whatsappMessages.contact),
            external: true,
          },
          {
            title: copy.methods.phone.title,
            detail: site.phone,
            action: copy.methods.phone.action,
            href: telHref(site.phone),
          },
        ]),
    {
      title: copy.methods.email.title,
      detail: site.email,
      action: copy.methods.email.action,
      href: mailHref(site.email),
    },
  ];
  if (address) {
    methods.push({
      title: copy.methods.office.title,
      detail: (
        <address className="not-italic">
          {address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
      action: copy.methods.office.action,
      href: mapsHref(address),
      external: true,
    });
  }

  const localBusiness = localBusinessLd();
  return (
    <>
      {localBusiness ? <JsonLd data={localBusiness} /> : null}
      <PageHero
        id="contact-title"
        heading={copy.heading}
        supporting={copy.supporting}
        breadcrumb={{
          label: uiLabels.breadcrumb,
          items: [{ label: uiLabels.home, href: "/" }],
          current: copy.metaTitle,
          currentHref: "/contact",
        }}
        actions={
          whatsappHref(site.whatsapp) ? (
            <Button
              href={whatsappHref(site.whatsapp, whatsappMessages.contact)!}
              variant="accent"
              size="lg"
              icon={<ChatIcon size={18} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.methods.whatsapp.action}
            </Button>
          ) : undefined
        }
      />

      <Section aria-labelledby="contact-methods" className="border-t border-line">
        <SectionHeader
          id="contact-methods"
          heading={copy.methodsHeading}
          intro={copy.methodsIntro}
        />
        <Reveal>
          <ul
            className={cn(
              "grid gap-4 sm:grid-cols-2",
              // Columns follow the number of cards, so no empty slot is left (e.g. no office).
              {
                2: "lg:grid-cols-2",
                3: "lg:grid-cols-3",
              }[methods.length + (combined ? 1 : 0)] ?? "lg:grid-cols-4",
            )}
          >
            {combined ? (
              <li className="sm:col-span-2 lg:col-span-1">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line bg-bg-raised p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.16)] md:p-8">
                  <span className="flex flex-col gap-3">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                      {copy.methods.combined.title}
                    </h3>
                    <span className="text-small text-fg-muted">{copy.methods.combined.detail}</span>
                  </span>
                  <PhoneWhatsApp
                    variant="buttons"
                    message={whatsappMessages.contact}
                    location="contact-card"
                  />
                </div>
              </li>
            ) : null}
            {methods.map((m) => (
              <li key={m.title}>
                {m.href ? (
                  <a
                    href={m.href}
                    {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line bg-bg-raised p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.16)] transition-[border-color,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_2px_4px_rgb(0_0_0/0.04),0_30px_60px_-28px_rgb(0_0_0/0.22)] md:p-8"
                  >
                    <span className="flex flex-col gap-3">
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                        {m.title}
                      </h3>
                      <span className="[overflow-wrap:anywhere] text-fg-muted">{m.detail}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-small font-semibold text-fg-muted">
                      {m.action}
                      <ArrowUpRightIcon
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <span className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                {copy.followHeading}
              </h3>
              <span className="text-small text-ink-muted">{copy.followIntro}</span>
            </span>
            <SocialLinks size="lg" />
          </div>
        </Reveal>
      </Section>

      <Section id="enquiry" aria-labelledby="contact-form" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <SectionHeading
            id="contact-form"
            {...formCopy.enquiry.heading}
            description={formCopy.enquiry.intro}
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <div className="relative flex flex-col gap-6 rounded-[var(--radius-media)] border border-line bg-bg-raised p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_40px_-24px_rgb(0_0_0/0.18)] md:p-10">
            {/* Lime edge-light along the top of the form panel. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
            <EnquiryForm />
            {copy.bookingUrl ? (
              <Button
                href={copy.bookingUrl}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.bookingLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
