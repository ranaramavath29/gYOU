import { ctas } from "./home";

/** Copy for the 404 page (app/not-found.tsx). */
export const notFoundCopy = {
  metaTitle: "Page Not Found",
  eyebrow: "404",
  heading: { lead: "This page", accent: "isn’t here." },
  body: "The link may be out of date, or the page may have moved. These pages can help you find what you need.",
  links: [
    { label: "Our services", href: "/services" },
    { label: "Industries we serve", href: "/industries" },
    { label: "About gYOU Digital", href: "/about-us" },
  ],
  primary: { label: "Back to home", href: "/" },
  secondary: ctas.primary,
} as const;
