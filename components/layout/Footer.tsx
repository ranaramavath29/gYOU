import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/analytics/Analytics";
import { ArrowUpRightIcon } from "@/components/icons";
import { PlaceholderText } from "@/components/PlaceholderText";
import { Button, Container } from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";
import { footerNav, navCta, uiLabels, type NavLink } from "@/content/navigation";
import { site } from "@/content/site";
import { PhoneWhatsApp } from "@/components/sections/PhoneWhatsApp";
import { isSameNumber, mailHref, telHref, whatsappHref } from "@/lib/contact";
import { isPlaceholder } from "@/lib/ph";

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
      {children}
    </h2>
  );
}

function LinkList({ links }: { links: readonly NavLink[] }) {
  return (
    <ul className="flex flex-col">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="inline-flex min-h-9 items-center text-small text-fg-muted transition-colors hover:text-fg"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** One contact line: a link once the value is real, placeholder text until then. */
function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="text-small text-fg-subtle">{label}</span>
      {href ? (
        <a href={href} className="text-fg hover:text-accent">
          {value}
        </a>
      ) : (
        <PlaceholderText value={value} className="text-small text-fg-muted" />
      )}
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { address, socials } = site;

  return (
    <footer className="border-t border-line bg-bg">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_1.8fr_1.1fr] lg:gap-10">
        <div className="flex flex-col items-start gap-6">
          <Link
            href="/"
            aria-label={uiLabels.homeLink}
            className="inline-flex min-h-11 items-center"
          >
            <Wordmark className="text-[2rem]" />
          </Link>
          <PlaceholderText
            as="p"
            value={site.footerDescription}
            className="max-w-[34ch] text-small text-fg-muted"
          />
          <Button
            href={navCta.href}
            variant="outline"
            icon={<ArrowUpRightIcon />}
            iconPosition="end"
          >
            {navCta.label}
          </Button>
        </div>

        <nav aria-label={uiLabels.footerNav} className="grid grid-cols-2 gap-10">
          <div>
            <ColumnTitle>{footerNav.quickLinksTitle}</ColumnTitle>
            <LinkList links={footerNav.quickLinks} />
          </div>
          <div>
            <ColumnTitle>{footerNav.servicesTitle}</ColumnTitle>
            <LinkList links={footerNav.services} />
          </div>
        </nav>

        <div className="flex flex-col gap-10">
          <div>
            <ColumnTitle>{footerNav.contactTitle}</ColumnTitle>
            <ul className="flex flex-col gap-4">
              <ContactItem label={uiLabels.email} value={site.email} href={mailHref(site.email)} />
              {isSameNumber(site.phone, site.whatsapp) ? (
                // Same number for calls and WhatsApp: show it once with both actions.
                <li className="flex flex-col gap-2">
                  <span className="text-small text-fg-subtle">{uiLabels.phoneAndWhatsapp}</span>
                  <PhoneWhatsApp location="footer" />
                </li>
              ) : (
                <>
                  <ContactItem
                    label={uiLabels.phone}
                    value={site.phone}
                    href={telHref(site.phone)}
                  />
                  <ContactItem
                    label={uiLabels.whatsappShort}
                    value={site.whatsapp}
                    href={whatsappHref(site.whatsapp)}
                  />
                </>
              )}
              {address === null ? null : (
                <li className="flex flex-col gap-0.5">
                  <span className="text-small text-fg-subtle">{uiLabels.address}</span>
                  {isPlaceholder(address) ? (
                    <PlaceholderText value={address} className="text-small text-fg-muted" />
                  ) : (
                    <address className="text-small text-fg-muted not-italic">
                      {address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  )}
                </li>
              )}
            </ul>
          </div>
          <div>
            <ColumnTitle>{footerNav.socialTitle}</ColumnTitle>
            {isPlaceholder(socials) ? (
              <PlaceholderText value={socials} className="text-small text-fg-muted" />
            ) : (
              <ul className="flex flex-wrap gap-x-5">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center text-small text-fg-muted hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-small text-fg-subtle">{uiLabels.copyright(year, site.name)}</p>
        <nav aria-label={uiLabels.legalNav}>
          <ul className="flex flex-wrap gap-x-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-9 items-center text-small text-fg-subtle hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="inline-flex min-h-9 items-center text-small text-fg-subtle hover:text-fg" />
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
