"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ArrowUpRightIcon, ChevronDownIcon } from "@/components/icons";
import { servicesMenu, type NavMenu, type NavSection } from "@/content/navMenus";
import { primaryNav, uiLabels, type NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const itemBase =
  "relative inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,transform] duration-200 active:scale-[0.96] xl:px-4";

/** Current page: raised pill (the hover glow is one shared element, see HoverPill). */
function ActivePill() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 rounded-full bg-bg-raised-2 shadow-[0_6px_16px_-8px_rgb(0_0_0/0.12)] ring-1 ring-ink/10 ring-inset"
    />
  );
}

type PillBox = { x: number; y: number; w: number; h: number };
type PillState = { box: PillBox | null; last: PillBox | null; glide: boolean };

/**
 * Soft glow that glides between hovered items. One element, moved with a CSS
 * transform (compositor-only); it fades in where it first appears instead of
 * sliding in from its last spot, and fades out where it was.
 */
function HoverPill({ pill }: { pill: PillState }) {
  const b = pill.box ?? pill.last;
  if (!b) return null;
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 left-0 rounded-full bg-ink/[0.04] ease-[cubic-bezier(0.22,1,0.36,1)]",
        pill.glide
          ? "transition-[transform,width,height,opacity] duration-300"
          : "transition-opacity duration-200",
      )}
      style={{
        width: b.w,
        height: b.h,
        transform: `translate(${b.x}px, ${b.y}px)`,
        opacity: pill.box ? 1 : 0,
      }}
    />
  );
}

function ActiveDot({ active }: { active: boolean }) {
  return active ? (
    <span
      aria-hidden
      className="relative size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(15_94_122/0.55)]"
    />
  ) : null;
}

/**
 * Desktop pill navigation (lg and up).
 * - Hovering Services opens a card panel with every service; each card links
 *   to that service's page. Other items are plain links.
 * - Clicking the item itself still opens the page.
 * - Services has a chevron button (aria-expanded) for keyboard and touch;
 *   Esc closes the panel and returns focus to the chevron.
 * - Current page: raised pill with a glowing lime dot (aria-current="page").
 */
export function DesktopNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [pill, setPill] = useState<PillState>({ box: null, last: null, glide: false });
  const closeTimer = useRef<number | undefined>(undefined);

  // Glow follows the item under the pointer (or opened by keyboard), never the
  // current page. Measured in event handlers, relative to the <ul>.
  const movePill = (el: HTMLElement | null, active = false) =>
    setPill((prev) => {
      const box =
        el && !active
          ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }
          : null;
      return { box, last: box ?? prev.last, glide: prev.box !== null && box !== null };
    });

  const show = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(href);
  };
  // Small delay so the pointer can travel from the pill into the panel.
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  const close = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(null);
  };

  // Every link in a panel calls `close` on click, so no route-change effect is needed.
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <nav aria-label={uiLabels.primaryNav} className="hidden lg:block">
      <ul
        onMouseLeave={() => {
          movePill(null);
          hideSoon();
        }}
        className="relative flex items-center gap-0.5"
      >
        <HoverPill pill={pill} />
        {primaryNav.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            menu={item.href === "/services" ? servicesMenu : undefined}
            active={isActive(pathname, item.href)}
            open={open === item.href}
            onEnter={(el) => {
              movePill(el, isActive(pathname, item.href));
              show(item.href);
            }}
            onToggle={(el) => {
              if (open === item.href) {
                close();
              } else {
                movePill(el, isActive(pathname, item.href));
                show(item.href);
              }
            }}
            onClose={close}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({
  item,
  menu,
  active,
  open,
  onEnter,
  onToggle,
  onClose,
}: {
  item: NavLink;
  menu: NavMenu | undefined;
  active: boolean;
  open: boolean;
  onEnter: (el: HTMLElement | null) => void;
  onToggle: (el: HTMLElement | null) => void;
  onClose: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelId = `nav-panel-${item.href.replace(/\W+/g, "") || "home"}`;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      onClose();
      buttonRef.current?.focus();
    }
  };
  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
  };

  return (
    // Not `relative`: the panel is positioned against the whole pill (<ul>,
    // which is relative), so every panel opens centred under the nav.
    <li onMouseEnter={() => onEnter(rowRef.current)} onKeyDown={onKeyDown} onBlur={onBlur}>
      <div ref={rowRef} className="relative flex items-center">
        {active ? <ActivePill /> : null}
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={onClose}
          className={cn(
            itemBase,
            menu && "pr-1 xl:pr-1",
            active || open ? "text-fg" : "text-fg-muted hover:text-fg",
          )}
        >
          <ActiveDot active={active} />
          <span className="relative">{item.label}</span>
        </Link>
        {menu ? (
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`Show ${item.label} sections`}
            onClick={() => onToggle(rowRef.current)}
            className={cn(
              "relative mr-1.5 grid size-7 place-items-center rounded-full transition-colors",
              open ? "text-fg" : "text-fg-subtle hover:text-fg",
            )}
          >
            <ChevronDownIcon
              size={15}
              className={cn("transition-transform duration-300", open && "rotate-180")}
            />
          </button>
        ) : null}
      </div>

      {menu ? <MenuPanel id={panelId} menu={menu} open={open} onNavigate={onClose} /> : null}
    </li>
  );
}

/**
 * Services hover panel, editorial style: serif title with a lime italic
 * accent, then a two-column list with italic serif numbers and hairline
 * dividers. Hovering or focusing a row fills it with lime.
 */
function MenuPanel({
  id,
  menu,
  open,
  onNavigate,
}: {
  id: string;
  menu: NavMenu;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    // Always rendered; `invisible` when closed removes it from the tab order
    // and pointer events, so a fading-out panel can never be clicked or focused.
    <div
      id={id}
      className={cn(
        "absolute top-full left-1/2 z-50 w-[min(820px,calc(100vw-8rem))] -translate-x-1/2 pt-4",
        "transition-[opacity,translate,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <div className="rounded-[24px] border border-line bg-bg-raised px-7 pt-6 pb-4 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.16)]">
        <div className="mb-3 flex items-baseline justify-between gap-6">
          <span className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.02em] text-fg">
            {menu.title} {menu.accent ? <em className="accent-word">{menu.accent}</em> : null}
          </span>
          <span className="text-small text-fg-subtle">
            {menu.sections.length} {menu.countLabel}
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-x-8">
          {menu.sections.map((s, i) => (
            <li key={s.href} className="border-t border-line">
              <ServiceRow section={s} index={i} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServiceRow({
  section,
  index,
  onNavigate,
}: {
  section: NavSection;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={section.href}
      onClick={onNavigate}
      className="group -mx-3 my-1 flex items-start gap-4 rounded-xl px-3 py-3 transition-colors duration-200 [--focus-ring:var(--ink)] hover:bg-paper focus-visible:bg-paper"
    >
      <span
        aria-hidden
        className="w-7 shrink-0 pt-0.5 font-display text-lg leading-none text-fg-subtle italic transition-colors group-hover:text-ink group-focus-visible:text-ink"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-semibold text-fg transition-colors group-hover:text-ink group-focus-visible:text-ink">
          {section.label}
        </span>
        <span className="line-clamp-2 text-small leading-snug text-fg-muted transition-colors group-hover:text-ink-muted group-focus-visible:text-ink-muted">
          {section.description}
        </span>
      </span>
      <ArrowUpRightIcon
        size={15}
        className="mt-1 shrink-0 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </Link>
  );
}
