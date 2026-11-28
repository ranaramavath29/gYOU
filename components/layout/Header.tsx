"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
        "shadow-[0_8px_24px_-12px_rgb(15_94_122/0.55)] transition-[box-shadow,transform,background-color] duration-200",
        "hover:bg-accent-hover hover:shadow-[0_12px_32px_-10px_rgb(15_94_122/0.6)] active:scale-[0.97]",
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
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-line transition-colors duration-300",
          // Constant height: shrinking a sticky header reflows the whole page mid-scroll.
          scrolled ? "bg-bg/90 backdrop-blur-md" : "bg-bg",
        )}
      >
        <Container
          className={cn(
            "flex h-[4.5rem] items-center justify-between gap-4 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr]",
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
          <Container className="relative flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
            <Link
              href="/"
              aria-label={uiLabels.homeLink}
              onClick={closeMenu}
              className="inline-flex min-h-11 items-center"
            >
              <Wordmark className="text-[1.6rem]" />
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

          {/* Scrollable links and contact; the CTA stays pinned below. */}
          <div className="relative flex-1 [scrollbar-width:none] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
            <Container className="flex min-h-full flex-col gap-8 pt-2 pb-6">
              {menuOpen ? (
                <nav aria-label={uiLabels.primaryNav}>
                  <ul className="flex flex-col">
                    {primaryNav.map((item, i) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li
                          key={item.href}
                          style={{ "--i": i } as CSSProperties}
                          className="menu-in border-b border-line"
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className="group flex min-h-14 items-center gap-3 py-1.5 transition-transform active:scale-[0.99]"
                          >
                            <span
                              className={cn(
                                "w-6 text-xs tabular-nums",
                                active ? "text-accent" : "text-fg-subtle",
                              )}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "flex-1 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] transition-colors sm:text-[1.875rem]",
                                active ? "text-accent" : "group-hover:text-fg-muted",
                              )}
                            >
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "grid size-9 shrink-0 place-items-center rounded-full border transition-colors",
                                active
                                  ? "border-accent bg-accent text-on-accent"
                                  : "border-line text-fg-subtle group-hover:border-fg-subtle group-hover:text-fg",
                              )}
                            >
                              <ArrowUpRightIcon size={14} />
                            </span>
                          </Link>
                          {item.href === "/services" ? (
                            <ul className="grid grid-cols-2 gap-2 pb-4 pl-9">
                              {services.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={serviceHref(s.slug)}
                                    onClick={closeMenu}
                                    aria-current={
                                      pathname === serviceHref(s.slug) ? "page" : undefined
                                    }
                                    className="flex min-h-11 items-center justify-center rounded-full border border-line bg-bg-raised px-3 text-center text-small font-semibold text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg aria-[current=page]:border-accent aria-[current=page]:text-accent"
                                  >
                                    {s.shortName}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ) : null}

              {menuOpen ? (
                <div
                  style={{ "--i": 6 } as CSSProperties}
                  className="menu-in mt-auto flex flex-col gap-3"
                >
                  <p className="text-xs font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                    {uiLabels.menuContact}
                  </p>
                  <PhoneWhatsApp
                    variant="pills"
                    inline
                    className="justify-between gap-x-2 gap-y-1"
                    numberClassName="text-small"
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
              ) : null}
            </Container>
          </div>

          <div className="relative shrink-0 border-t border-line bg-bg pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Container>
              <HeaderCta onClick={closeMenu} full />
            </Container>
          </div>
        </dialog>
      </header>
    </>
  );
}
