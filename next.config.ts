import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV !== "production";

// Origin of an external lead endpoint, if one is configured (otherwise /api/lead).
const leadOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "").origin;
  } catch {
    return "";
  }
})();

// Allows the site itself plus the consent-gated Google Tag Manager tags described in
// the Privacy Policy (Google Analytics, Google Ads, Meta Pixel). 'unsafe-inline' is
// needed for Next's inline bootstrap scripts on statically rendered pages.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.google-analytics.com https://*.googleadservices.com https://*.doubleclick.net https://www.google.com https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self'",
  `connect-src 'self' ${leadOrigin} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.doubleclick.net https://*.google.com https://www.facebook.com`.replace(
    /\s+/g,
    " ",
  ),
  "frame-src https://www.googletagmanager.com https://*.doubleclick.net https://www.facebook.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: csp },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves listed qualities. MediaFrame uses 75 so variants stay under 100 KB.
    qualities: [75, 90],
  },
  // Static media in public/ is otherwise served with max-age=0. Industry photos are
  // versioned by filename (-v4, -v6); other files keep a week of caching with revalidation.
  async headers() {
    const cache = "public, max-age=604800, stale-while-revalidate=86400";
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: cache }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: cache }] },
    ];
  },
  // 301 redirect map.
  async redirects() {
    return [
      // The separate Cookie Policy was folded into the Privacy Policy (25 Nov 2026).
      { source: "/cookie-policy", destination: "/privacy-policy#cookies", permanent: true },
      // Services retired 24 Nov 2026 that Google still has indexed.
      { source: "/services/branding-creative-design", destination: "/services", permanent: true },
      {
        source: "/services/video-content-production",
        destination: "/services/social-media-marketing",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
