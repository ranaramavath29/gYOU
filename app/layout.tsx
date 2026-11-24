import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { uiLabels } from "@/content/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { IS_PRODUCTION_SITE } from "@/lib/env";
import { organizationLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  // Only the production site is indexable; local, preview and staging are noindex.
  robots: IS_PRODUCTION_SITE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F2F0EA",
};

// Without JavaScript, Reveal never runs, so show its content anyway.
const NO_JS_REVEAL = "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: NO_JS_REVEAL }} />
        <JsonLd data={organizationLd()} />
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {uiLabels.skipToContent}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
