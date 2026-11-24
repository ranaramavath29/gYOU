"use client";

import { motion, MotionConfig } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, MailIcon, MenuIcon } from "@/components/icons";
import { PhoneWhatsApp } from "@/components/sections/PhoneWhatsApp";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/Wordmark";
import { whatsappMessages } from "@/content/forms";
import { navCta, primaryNav, uiLabels } from "@/content/navigation";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { mailHref } from "@/lib/contact";
import { DesktopNav, isActive } from "./DesktopNav";

/** Header CTA: lime pill whose arrow badge turns on hover and presses in on click. */
function HeaderCta({ onClick, full = false }: { onClick?: () => void; full?: boolean }) {
  return (
    <Link
      href={navCta.href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-11 items-center gap-3 rounded-full bg-accent pr-1.5 pl-5 text-sm font-semibold whitespace-nowrap text-on-accent",
        "shadow-[0_8px_24px_-12px_rgb(200_65_44/0.55)] transition-[box-shadow,transform,background-color] duration-200",
        "hover:bg-accent-hover hover:shadow-[0_12px_32px_-10px_rgb(200_65_44/0.6)] active:scale-[0.97]",
        "[--focus-ring:var(--fg)]",
        full && "h-13 w-full justify-between text-base",
      )}
    >
      {navCta.label}
      <span className="grid size-8 place-items-center rounded-full bg-on-accent text-accent transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRightIcon size={15} />
      </span>
    </Link>
  );
}

/**
 * Sticky header. Transparent at the top of the page; once scrolled it becomes
 * a compact frosted bar. Desktop: centred pill nav (DesktopNav). Below lg: a
 * full-screen menu in a native modal <dialog> (focus stays inside, Esc closes,
 * focus returns to the menu button).
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    setMenuOpen(true);
    closeButtonRef.current?.focus();
  };

  const closeMenu = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const onDialogClose = () => {
    document.documentElement.style.overflow = "";
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // Close the menu after client-side navigation.
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const email = mailHref(site.email);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled ? "border-line bg-bg/90 backdrop-blur-xl" : "border-line bg-bg",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr]",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Link
            href="/"
            aria-label={uiLabels.homeLink}
            className="inline-flex min-h-11 items-center justify-self-start transition-opacity hover:opacity-80"
          >
            <Wordmark className="text-[1.75rem]" />
          </Link>

          <DesktopNav pathname={pathname} />

          <div className="flex items-center gap-2 justify-self-end">
            <div className="hidden sm:block">
              <HeaderCta />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-bg-raised/80 text-fg backdrop-blur-xl transition-[background-color,transform] hover:bg-bg-raised-2 active:scale-95 lg:hidden"
            >
              <MenuIcon size={20} />
              <span className="sr-only">{uiLabels.openMenu}</span>
            </button>
          </div>
        </Container>

        {/* Mobile / tablet menu */}
        <dialog
          ref={dialogRef}
          id="mobile-menu"
          aria-label={uiLabels.menu}
          onClose={onDialogClose}
          className="m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden bg-bg p-0 text-fg backdrop:bg-bg open:flex lg:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-20%] h-[420px] w-[520px] rounded-full bg-accent/10 blur-[120px]"
          />
          <Container className="relative flex h-20 shrink-0 items-center justify-between">
            <Link
              href="/"
              aria-label={uiLabels.homeLink}
              onClick={closeMenu}
              className="inline-flex min-h-11 items-center"
            >
              <Wordmark className="text-[1.75rem]" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="grid size-11 place-items-center rounded-full border border-line bg-bg-raised transition-transform active:scale-95"
            >
              <CloseIcon size={20} />
              <span className="sr-only">{uiLabels.closeMenu}</span>
            </button>
          </Container>

          <Container className="relative flex flex-1 flex-col gap-10 overflow-y-auto pt-4 pb-8">
            {menuOpen ? (
              <nav aria-label={uiLabels.primaryNav}>
                <ul className="flex flex-col">
                  {primaryNav.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-line"
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className="group flex min-h-16 items-center gap-4 py-2 transition-transform active:scale-[0.99]"
                        >
                          <span
                            className={cn(
                              "w-7 text-small tabular-nums",
                              active ? "text-fg" : "text-fg-subtle",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "flex-1 font-display text-[clamp(1.75rem,7vw,2.75rem)] font-semibold tracking-[-0.03em] transition-colors",
                              active ? "accent-word" : "group-hover:text-fg-muted",
                            )}
                          >
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                              active
                                ? "border-accent bg-accent text-on-accent"
                                : "border-line-strong text-fg-subtle group-hover:border-fg-subtle group-hover:text-fg",
                            )}
                          >
                            <ArrowUpRightIcon size={15} />
                          </span>
                        </Link>
                        {item.href === "/services" ? (
                          <ul className="flex flex-wrap gap-2 pb-5 pl-11">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={serviceHref(s.slug)}
                                  onClick={closeMenu}
                                  aria-current={
                                    pathname === serviceHref(s.slug) ? "page" : undefined
                                  }
                                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-bg-raised-2 px-4 text-small font-semibold text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg aria-[current=page]:border-accent aria-[current=page]:text-fg"
                                >
                                  {s.shortName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}

            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-auto flex flex-col gap-6"
              >
                <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-bg-raised p-5">
                  <p className="text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                    {uiLabels.menuContact}
                  </p>
                  <PhoneWhatsApp
                    variant="buttons"
                    message={whatsappMessages.default}
                    location="mobile-menu"
                  />
                  {email ? (
                    <a
                      href={email}
                      className="inline-flex min-h-11 w-fit items-center gap-2 text-small text-fg-muted hover:text-fg"
                    >
                      <MailIcon size={16} />
                      {site.email}
                    </a>
                  ) : null}
                  <SocialLinks />
                </div>
                <HeaderCta onClick={closeMenu} full />
              </motion.div>
            ) : null}
          </Container>
        </dialog>
      </header>
    </MotionConfig>
  );
}
