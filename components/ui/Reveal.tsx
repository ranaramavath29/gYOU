"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  as?: "div" | "li" | "section";
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * One reveal per section: fade + 16px rise when scrolled into view, once.
 * The transition is plain CSS ([data-reveal] in globals.css, compositor-only
 * opacity/transform); a single shared IntersectionObserver flips
 * data-revealed. Under reduced motion the CSS shows content instantly.
 * Without JavaScript, a <noscript> rule in the root layout shows it.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el);
  }, []);

  return (
    <Tag
      // Callback ref keeps one ref type across the three tags.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-reveal=""
      className={cn(className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

// One observer for every Reveal on the page.
let observer: IntersectionObserver | undefined;

function observe(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    el.dataset.revealed = "";
    return;
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}
