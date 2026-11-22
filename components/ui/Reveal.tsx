"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  as?: "div" | "li" | "section";
  delay?: number;
  className?: string;
  children: ReactNode;
};

const components = { div: motion.div, li: motion.li, section: motion.section } as const;

/**
 * One reveal per section: fade + 16px rise when scrolled into view, once.
 * Under reduced motion the content appears instantly (zero-duration
 * transition), so server and client markup still match.
 * Without JavaScript, a <noscript> rule in the root layout shows it.
 */
export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = components[as];
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
